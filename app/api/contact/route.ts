export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request?.json?.();

    const name = data?.name ?? '';
    const email = data?.email ?? '';
    const phone = data?.phone ?? '';
    const eventType = data?.eventType ?? '';
    const eventDate = data?.eventDate ?? '';
    const guestCount = data?.guestCount ?? '';
    const message = data?.message ?? '';
    const language = data?.language ?? 'es';

    if (!name || !email || !eventType) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Save to database
    await prisma.contactInquiry.create({
      data: { name, email, phone, eventType, eventDate, guestCount, message, language },
    });

    // Send email notification
    const htmlBody = `
      <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f5;">
        <div style="background: #8B7355; padding: 24px 30px;">
          <h1 style="color: white; font-size: 20px; margin: 0; font-family: 'Playfair Display', Georgia, serif;">Chacra La Peregrina</h1>
          <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 4px 0 0;">Nueva Consulta de Evento</p>
        </div>
        <div style="padding: 30px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #8B7355; font-weight: 600; font-size: 13px; width: 130px;">Nombre:</td><td style="padding: 8px 0; color: #333; font-size: 14px;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8B7355; font-weight: 600; font-size: 13px;">Email:</td><td style="padding: 8px 0; color: #333; font-size: 14px;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #8B7355; font-weight: 600; font-size: 13px;">Tel\u00e9fono:</td><td style="padding: 8px 0; color: #333; font-size: 14px;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #8B7355; font-weight: 600; font-size: 13px;">Tipo de Evento:</td><td style="padding: 8px 0; color: #333; font-size: 14px;">${eventType}</td></tr>
            ${eventDate ? `<tr><td style="padding: 8px 0; color: #8B7355; font-weight: 600; font-size: 13px;">Fecha:</td><td style="padding: 8px 0; color: #333; font-size: 14px;">${eventDate}</td></tr>` : ''}
            ${guestCount ? `<tr><td style="padding: 8px 0; color: #8B7355; font-weight: 600; font-size: 13px;">Invitados:</td><td style="padding: 8px 0; color: #333; font-size: 14px;">${guestCount}</td></tr>` : ''}
          </table>
          ${message ? `
          <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #4A90A4;">
            <p style="color: #8B7355; font-weight: 600; font-size: 13px; margin: 0 0 8px;">Mensaje:</p>
            <p style="color: #333; font-size: 14px; margin: 0; line-height: 1.6;">${message}</p>
          </div>` : ''}
          <p style="color: #999; font-size: 11px; margin-top: 20px;">Idioma: ${language?.toUpperCase?.() ?? 'ES'} | Enviado desde chacralaperegrina.com</p>
        </div>
      </div>
    `;

    try {
      const appUrl = process.env.NEXTAUTH_URL || 'https://chacralaperegrina.com';
      let senderDomain = 'mail.abacusai.app';
      try { senderDomain = new URL(appUrl).hostname; } catch {}

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_CONSULTA_DE_EVENTO,
          subject: `Nueva Consulta: ${eventType} - ${name}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'ebarlocco@gmail.com',
          reply_to: email,
          sender_email: `noreply@${senderDomain}`,
          sender_alias: 'Chacra La Peregrina',
        }),
      });
    } catch (emailError: any) {
      console.error('Email notification error:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
