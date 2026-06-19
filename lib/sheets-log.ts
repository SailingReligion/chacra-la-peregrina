import type { ContactInput } from './contact-schema';

/**
 * Registro de cada consulta en una Google Sheet.
 *
 * Usa el método más simple y portable: un Google Apps Script publicado como
 * "Web App". No requiere service accounts, ni archivos JSON de credenciales,
 * ni librerías pesadas. Solo una URL secreta en la variable de entorno
 * GOOGLE_SHEET_WEBHOOK_URL.
 *
 * Cómo configurarlo (instrucciones completas en el README):
 *  1. Crear una Google Sheet.
 *  2. Extensiones -> Apps Script, pegar el script que está en el README.
 *  3. Implementar como App Web (acceso: "cualquiera").
 *  4. Copiar la URL y ponerla en GOOGLE_SHEET_WEBHOOK_URL.
 *
 * Si la variable no está configurada, simplemente no hace nada (no rompe).
 */
export async function logToSheet(d: ContactInput): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: d.name,
        email: d.email,
        phone: d.phone || '',
        eventType: d.eventType,
        eventDate: d.eventDate || '',
        guestCount: d.guestCount || '',
        message: d.message || '',
        language: d.language || 'es',
      }),
      // Apps Script puede tardar; no queremos colgar la respuesta al usuario.
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch (e) {
    console.error('[sheets] Error registrando lead en Google Sheet:', e);
    return false;
  }
}
