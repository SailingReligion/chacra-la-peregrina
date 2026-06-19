/**
 * Rate limiter simple en memoria (sin dependencias externas).
 *
 * Limita la cantidad de envíos por IP en una ventana de tiempo.
 * Suficiente para un formulario de contacto de bajo volumen.
 *
 * NOTA: al ser en memoria, se reinicia si el servidor se reinicia y no se
 * comparte entre múltiples instancias. Para un venue es más que suficiente.
 * Si algún día necesitás algo distribuido, se puede migrar a Upstash Redis.
 */

type Hit = { count: number; resetAt: number };

const store = new Map<string, Hit>();

interface RateLimitOptions {
  /** Cantidad máxima de solicitudes permitidas en la ventana. */
  max: number;
  /** Duración de la ventana en milisegundos. */
  windowMs: number;
}

export function rateLimit(
  key: string,
  { max, windowMs }: RateLimitOptions
): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  const hit = store.get(key);

  // Limpieza oportunista de entradas vencidas para no crecer infinito.
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (v.resetAt < now) store.delete(k);
    }
  }

  if (!hit || hit.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfterSec: 0 };
  }

  if (hit.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.ceil((hit.resetAt - now) / 1000),
    };
  }

  hit.count += 1;
  store.set(key, hit);
  return { allowed: true, remaining: max - hit.count, retryAfterSec: 0 };
}

/** Extrae la IP del cliente desde los headers habituales de los proxys/CDN. */
export function getClientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return (
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    'unknown'
  );
}
