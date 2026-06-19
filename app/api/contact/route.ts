export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { sendContactEmails } from '@/lib/email';
import { logToSheet } from '@/lib/sheets-log';

export async function POST(request: Request) {
  try {
    // 1. Rate limit por IP: máximo 5 envíos cada 10 minutos.
    const ip = getClientIp(request.headers);
    const { allowed, retryAfterSec } = rateLimit(`contact:${ip}`, {
      max: 5,
      windowMs: 10 * 60 * 1000,
    });
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: 'Demasiadas solicitudes. Intentá de nuevo en unos minutos.' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
      );
    }

    // 2. Parseo + validación con zod.
    const raw = await request?.json?.();
    const parsed = contactSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Datos inválidos',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 3. Honeypot anti-spam: si el campo invisible viene con contenido, es un bot.
    //    Respondemos "success" para no darle pistas, pero NO procesamos nada.
    if (data.website && data.website.trim() !== '') {
      return NextResponse.json({ success: true });
    }

    // 4. Registrar el lead en Google Sheet (no bloquea si falla) y enviar emails.
    const [emailResult] = await Promise.all([
      sendContactEmails(data),
      logToSheet(data),
    ]);

    // El formulario se considera exitoso si al menos se notificó al dueño,
    // o si el proveedor de email no está configurado (modo desarrollo/preview).
    return NextResponse.json({ success: true, provider: emailResult.provider });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
