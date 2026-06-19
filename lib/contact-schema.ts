import { z } from 'zod';

/**
 * Esquema de validación del formulario de contacto.
 * Se valida tanto en el cliente (opcional) como en el servidor (obligatorio).
 *
 * El campo `website` es un HONEYPOT: un campo invisible para humanos.
 * Los bots tienden a rellenar todos los campos, así que si viene con
 * contenido, descartamos la solicitud como spam.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre es demasiado corto')
    .max(100, 'El nombre es demasiado largo'),
  email: z
    .string()
    .trim()
    .email('El correo electrónico no es válido')
    .max(150, 'El correo es demasiado largo'),
  phone: z
    .string()
    .trim()
    .max(40, 'El teléfono es demasiado largo')
    .optional()
    .or(z.literal('')),
  eventType: z
    .string()
    .trim()
    .min(1, 'Seleccioná un tipo de evento')
    .max(60),
  eventDate: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal('')),
  guestCount: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .max(3000, 'El mensaje es demasiado largo')
    .optional()
    .or(z.literal('')),
  language: z.enum(['es', 'en', 'pt']).optional().default('es'),
  // Honeypot anti-spam: debe venir vacío.
  website: z.string().optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
