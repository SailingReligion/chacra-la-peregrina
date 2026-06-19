import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Agrega el basePath a las rutas de imágenes/assets estáticos.
// Necesario porque las etiquetas <img> nativas y los background-image de CSS
// NO heredan automáticamente el basePath de Next.js (a diferencia de next/image).
//
// - En GitHub Pages SIN dominio propio: basePath = '/chacra-la-peregrina'
//   => '/images/foto.jpg' se convierte en '/chacra-la-peregrina/images/foto.jpg'
// - Con dominio propio (raíz): basePath = '' => la ruta queda igual.
//
// Se controla con la variable de entorno NEXT_PUBLIC_BASE_PATH.
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!path.startsWith('/')) return path;
  return `${basePath}${path}`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}