'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';

export function SearchForm() {
  const router = useRouter();
  const [listingType, setListingType] = useState<'buy' | 'rent'>('buy');
  const [location, setLocation] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('type', listingType);
    if (location) {
      params.set('location', location);
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {/* Toggle */}
      <div className="flex justify-center mb-6">
        <Toggle
          options={[
            { value: 'buy', label: 'Comprar' },
            { value: 'rent', label: 'Alquilar' },
          ]}
          value={listingType}
          onChange={(v) => setListingType(v as 'buy' | 'rent')}
        />
      </div>

      {/* Search input */}
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`
            flex items-center gap-3 bg-white rounded-full p-2 pl-6 shadow-xl
            transition-all duration-200
            ${isFocused ? 'ring-2 ring-accent ring-offset-2 ring-offset-transparent' : ''}
          `}
        >
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-muted"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            placeholder="Busca por barrio, zona o dirección..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent text-text placeholder:text-muted outline-none text-base py-2"
          />

          <Button type="submit" size="md" className="rounded-full px-8">
            Buscar
          </Button>
        </div>
      </motion.div>

      {/* Popular searches */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-white/50 text-sm">Popular:</span>
        {['Salamanca', 'Chamberí', 'Malasaña', 'Retiro'].map((neighborhood) => (
          <button
            key={neighborhood}
            type="button"
            onClick={() => setLocation(neighborhood)}
            className="px-3 py-1 text-sm text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            {neighborhood}
          </button>
        ))}
      </div>
    </form>
  );
}
