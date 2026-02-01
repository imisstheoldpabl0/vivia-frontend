'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  view: 'grid' | 'map';
  onChange: (view: 'grid' | 'map') => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="relative inline-flex p-1 bg-gray-100 rounded-full">
      <motion.div
        className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm"
        initial={false}
        animate={{
          x: view === 'grid' ? 0 : '100%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ width: 'calc(50% - 4px)', left: 2 }}
      />
      <button
        onClick={() => onChange('grid')}
        className={cn(
          'relative z-10 flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-full transition-colors',
          view === 'grid' ? 'text-text' : 'text-muted hover:text-text'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
            clipRule="evenodd"
          />
        </svg>
        Lista
      </button>
      <button
        onClick={() => onChange('map')}
        className={cn(
          'relative z-10 flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium rounded-full transition-colors',
          view === 'map' ? 'text-text' : 'text-muted hover:text-text'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M8.157 2.176a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.25v10.877a1.5 1.5 0 002.074 1.386l3.51-1.452 4.26 1.762a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.75V3.872a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.762zM7.58 5a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 017.58 5zm5.59 2.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z"
            clipRule="evenodd"
          />
        </svg>
        Mapa
      </button>
    </div>
  );
}
