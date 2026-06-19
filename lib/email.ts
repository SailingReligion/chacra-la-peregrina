import { Resend } from 'resend';
import type { ContactInput } from './contact-schema';

/**
 * Módulo de envío de emails.
 *
 * Estrategia de portabilidad:
 *  1. Si existe RESEND_API_KEY  -> usa Resend (funciona en Vercel, Squarespace, etc.)
 *  2. Si no, y existe ABACUSAI_API_KEY -> usa el servicio interno de Abacus (preview)
 *  3. Si no hay ninguno -> no envía, pero no rompe la app (se loguea).
 *
 * Así el sitio funciona en el preview de Abacus HOY, y cuando lo lleves a
 * producción solo tenés que cargar RESEND_API_KEY y listo.
 */

const OWNER_EMAIL = process.env.CONTACT_TO_EMAIL || 'ebarlocco@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Chacra La Peregrina <onboarding@resend.dev>';

const BRAND = '#8B7355';
const ACCENT = '#C8956C';

function row(label: string, value?: string) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 0;color:${BRAND};font-weight:600;font-size:13px;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#333;font-size:14px;">${value}</td>
  </tr>`;
}

/** Email que recibe el dueño (vos) con los datos de la consulta. */
function ownerEmailHtml(d: ContactInput): string {
  return `
  <div style="font-family:'Montserrat',Arial,sans-serif;max-width:600px;margin:0 auto;background:#faf8f5;">
    <div style="background:${BRAND};padding:24px 30px;">
      <h1 style="color:white;font-size:20px;margin:0;font-family:'Playfair Display',Georgia,serif;">Chacra La Peregrina</h1>
      <p style="color:rgba(255,255,255,0.8);font-size:12px;margin:4px 0 0;">Nueva Consulta de Evento</p>
    </div>
    <div style="padding:30px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row('Nombre:', d.name)}
        ${row('Email:', `<a href="mailto:${d.email}">${d.email}</a>`)}
        ${row('Teléfono:', d.phone)}
        ${row('Tipo de Evento:', d.eventType)}
        ${row('Fecha:', d.eventDate)}
        ${row('Invitados:', d.guestCount)}
      </table>
      ${
        d.message
          ? `<div style="margin-top:20px;padding:16px;background:white;border-radius:8px;border-left:4px solid #4A90A4;">
              <p style="color:${BRAND};font-weight:600;font-size:13px;margin:0 0 8px;">Mensaje:</p>
              <p style="color:#333;font-size:14px;margin:0;line-height:1.6;">${d.message}</p>
            </div>`
          : ''
      }
      <p style="color:#999;font-size:11px;margin-top:20px;">Idioma: ${(d.language || 'es').toUpperCase()} · Respondé directamente a este email para contactar a la persona.</p>
    </div>
  </div>`;
}

/** Email de confirmación que recibe el cliente ("recibimos tu solicitud"). */
function clientEmailHtml(d: ContactInput): string {
  const greetings: Record<string, { title: string; body: string; closing: string }> = {
    es: {
      title: `¡Gracias por tu consulta, ${d.name.split(' ')[0]}!`,
      body: `Recibimos tu solicitud${d.eventType ? ` para <strong>${d.eventType}</strong>` : ''} y nos pondremos en contacto a la brevedad. En La Peregrina cada evento es único, y queremos ayudarte a que el tuyo sea inolvidable.`,
      closing: 'Con cariño, el equipo de La Peregrina',
    },
    en: {
      title: `Thank you for your inquiry, ${d.name.split(' ')[0]}!`,
      body: `We received your request${d.eventType ? ` for <strong>${d.eventType}</strong>` : ''} and will get back to you shortly. At La Peregrina every event is unique, and we want to help make yours unforgettable.`,
      closing: 'Warm regards, the La Peregrina team',
    },
    pt: {
      title: `Obrigado pela sua consulta, ${d.name.split(' ')[0]}!`,
      body: `Recebemos a sua solicitação${d.eventType ? ` para <strong>${d.eventType}</strong>` : ''} e entraremos em contato em breve. Na La Peregrina cada evento é único, e queremos ajudar a tornar o seu inesquecível.`,
      closing: 'Com carinho, a equipe La Peregrina',
    },
  };
  const g = greetings[d.language || 'es'] || greetings.es;

  return `
  <div style="font-family:'Montserrat',Arial,sans-serif;max-width:600px;margin:0 auto;background:#faf8f5;">
    <div style="background:${BRAND};padding:28px 30px;text-align:center;">
      <h1 style="color:white;font-size:22px;margin:0;font-family:'Playfair Display',Georgia,serif;">Chacra La Peregrina</h1>
      <p style="color:rgba(255,255,255,0.8);font-size:12px;margin:6px 0 0;letter-spacing:2px;text-transform:uppercase;">Laguna del Sauce · Punta del Este</p>
    </div>
    <div style="padding:36px 30px;">
      <h2 style="color:#2C2420;font-size:20px;margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;">${g.title}</h2>
      <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 24px;">${g.body}</p>
      <div style="background:white;border-radius:10px;padding:20px;border-left:4px solid ${ACCENT};">
        <p style="color:${BRAND};font-weight:600;font-size:12px;margin:0 0 10px;text-transform:uppercase;letter-spacing:1px;">Resumen de tu consulta</p>
        <table style="width:100%;border-collapse:collapse;">
          ${row('Evento:', d.eventType)}
          ${row('Fecha:', d.eventDate)}
          ${row('Invitados:', d.guestCount)}
        </table>
      </div>
      <p style="color:#888;font-size:14px;line-height:1.7;margin:28px 0 0;">${g.closing}</p>
    </div>
    <div style="background:#2C2420;padding:20px 30px;text-align:center;">
      <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:0;">El Pejerrey, Laguna del Sauce · Punta del Este, Uruguay</p>
    </div>
  </div>`;
}

interface SendResult {
  ownerSent: boolean;
  clientSent: boolean;
  provider: 'resend' | 'abacus' | 'none';
}

async function sendViaResend(d: ContactInput): Promise<SendResult> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const ownerRes = await resend.emails.send({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
    replyTo: d.email,
    subject: `Nueva Consulta: ${d.eventType} - ${d.name}`,
    html: ownerEmailHtml(d),
  });

  const clientRes = await resend.emails.send({
    from: FROM_EMAIL,
    to: d.email,
    subject:
      d.language === 'en'
        ? 'We received your inquiry — La Peregrina'
        : d.language === 'pt'
        ? 'Recebemos a sua consulta — La Peregrina'
        : 'Recibimos tu solicitud — La Peregrina',
    html: clientEmailHtml(d),
  });

  return {
    ownerSent: !ownerRes.error,
    clientSent: !clientRes.error,
    provider: 'resend',
  };
}

async function sendViaAbacus(d: ContactInput): Promise<SendResult> {
  const appUrl = process.env.NEXTAUTH_URL || 'https://chacralaperegrina.com';
  let senderDomain = 'mail.abacusai.app';
  try {
    senderDomain = new URL(appUrl).hostname;
  } catch {}

  const post = (recipient: string, subject: string, body: string, replyTo?: string) =>
    fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        app_id: process.env.WEB_APP_ID,
        notification_id: process.env.NOTIF_ID_CONSULTA_DE_EVENTO,
        subject,
        body,
        is_html: true,
        recipient_email: recipient,
        reply_to: replyTo,
        sender_email: `noreply@${senderDomain}`,
        sender_alias: 'Chacra La Peregrina',
      }),
    });

  let ownerSent = false;
  let clientSent = false;

  try {
    const r = await post(OWNER_EMAIL, `Nueva Consulta: ${d.eventType} - ${d.name}`, ownerEmailHtml(d), d.email);
    ownerSent = r.ok;
  } catch (e) {
    console.error('Abacus owner email error:', e);
  }

  try {
    const subject =
      d.language === 'en'
        ? 'We received your inquiry — La Peregrina'
        : d.language === 'pt'
        ? 'Recebemos a sua consulta — La Peregrina'
        : 'Recibimos tu solicitud — La Peregrina';
    const r = await post(d.email, subject, clientEmailHtml(d));
    clientSent = r.ok;
  } catch (e) {
    console.error('Abacus client email error:', e);
  }

  return { ownerSent, clientSent, provider: 'abacus' };
}

/** Punto de entrada: elige el proveedor disponible y envía ambos correos. */
export async function sendContactEmails(d: ContactInput): Promise<SendResult> {
  try {
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(d);
    }
    if (process.env.ABACUSAI_API_KEY) {
      return await sendViaAbacus(d);
    }
    console.warn('[email] No hay proveedor configurado (RESEND_API_KEY / ABACUSAI_API_KEY). No se envió email.');
    return { ownerSent: false, clientSent: false, provider: 'none' };
  } catch (e) {
    console.error('[email] Error enviando emails:', e);
    return { ownerSent: false, clientSent: false, provider: 'none' };
  }
}
