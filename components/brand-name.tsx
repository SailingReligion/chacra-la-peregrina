import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BrandNameProps {
  /**
   * Tamaño de la marca completa (hoja + texto)
   * - xs: texto pequeño (footer secundario, etc.)
   * - sm: footer, menciones pequeñas
   * - md: menciones en párrafos normales
   * - lg: encabezados de secciones
   * - xl: header principal
   * - 2xl: hero, títulos grandes
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  /**
   * Clases adicionales para el contenedor
   */
  className?: string;

  /**
   * Si querés mostrar solo "Peregrina" sin "La"
   */
  shortVersion?: boolean;
}

const sizeConfig = {
  xs: {
    leaf: 'h-3 w-3',
    text: 'text-xs',
    gap: 'gap-1',
  },
  sm: {
    leaf: 'h-4 w-4',
    text: 'text-sm',
    gap: 'gap-1.5',
  },
  md: {
    leaf: 'h-5 w-5',
    text: 'text-base',
    gap: 'gap-2',
  },
  lg: {
    leaf: 'h-6 w-6',
    text: 'text-lg',
    gap: 'gap-2',
  },
  xl: {
    leaf: 'h-8 w-8',
    text: 'text-xl',
    gap: 'gap-2.5',
  },
  '2xl': {
    leaf: 'h-10 w-10 md:h-12 md:w-12',
    text: 'text-2xl md:text-3xl',
    gap: 'gap-3',
  },
};

/**
 * Componente de marca "La Peregrina" con la hojita icónica
 * 
 * Uso:
 * <BrandName size="xl" /> → para headers
 * <BrandName size="2xl" /> → para hero
 * <BrandName size="md" /> → en textos normales
 */
export function BrandName({ 
  size = 'md', 
  className = '',
  shortVersion = false,
}: BrandNameProps) {
  const config = sizeConfig[size];

  return (
    <span className={cn('inline-flex items-center', config.gap, className)}>
      <Leaf 
        className={cn(config.leaf, 'text-primary flex-shrink-0')} 
        strokeWidth={2}
      />
      <span className={cn(config.text, 'font-heading font-bold')}>
        {shortVersion ? 'Peregrina' : 'La Peregrina'}
      </span>
    </span>
  );
}
