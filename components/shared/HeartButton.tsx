'use client';

import { motion } from 'framer-motion';
import { useSavedProperties } from '@/context/SavedPropertiesContext';
import { cn } from '@/lib/utils';

interface HeartButtonProps {
  propertyId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'overlay';
}

export function HeartButton({
  propertyId,
  className,
  size = 'md',
  variant = 'default',
}: HeartButtonProps) {
  const { isSaved, toggleSaved } = useSavedProperties();
  const saved = isSaved(propertyId);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(propertyId);
      }}
      className={cn(
        'flex items-center justify-center rounded-full transition-colors',
        variant === 'overlay'
          ? 'bg-white/90 hover:bg-white shadow-md'
          : 'bg-gray-100 hover:bg-gray-200',
        sizes[size],
        className
      )}
      whileTap={{ scale: 0.85 }}
      animate={saved ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3 }}
      aria-label={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={cn(
          iconSizes[size],
          saved ? 'text-accent' : 'text-muted'
        )}
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </motion.svg>
    </motion.button>
  );
}
