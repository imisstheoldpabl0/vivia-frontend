'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Toggle({ options, value, onChange, className }: ToggleProps) {
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  return (
    <div
      className={cn(
        'relative inline-flex p-1 bg-gray-100 rounded-full',
        className
      )}
    >
      <motion.div
        className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm"
        initial={false}
        animate={{
          x: `${selectedIndex * 100}%`,
          width: `${100 / options.length}%`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ width: `calc(${100 / options.length}% - 4px)`, left: 2 }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative z-10 px-4 sm:px-6 py-2 text-sm font-medium rounded-full transition-colors duration-150',
            value === option.value ? 'text-text' : 'text-muted hover:text-text'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
