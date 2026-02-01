'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-surface shadow-sm',
      elevated: 'bg-surface shadow-md',
      outline: 'bg-surface border border-border',
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-md overflow-hidden',
          variants[variant],
          paddings[padding],
          hoverable && 'cursor-pointer',
          className
        )}
        whileHover={
          hoverable
            ? {
                y: -4,
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
              }
            : undefined
        }
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
