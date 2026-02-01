'use client';

import { motion } from 'framer-motion';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';

interface MapViewProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
}

export function MapView({ properties, onSelectProperty }: MapViewProps) {
  // This is a mocked map view - in production, you'd integrate with a mapping library
  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-md overflow-hidden">
      {/* Mock map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Grid lines to simulate map */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Mock street labels */}
        <div className="absolute top-1/4 left-1/3 text-xs text-gray-400 rotate-12">
          Calle de Serrano
        </div>
        <div className="absolute top-1/2 right-1/4 text-xs text-gray-400 -rotate-6">
          Gran Vía
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-xs text-gray-400 rotate-3">
          Paseo de la Castellana
        </div>
      </div>

      {/* Property markers */}
      {properties.slice(0, 15).map((property, index) => {
        // Distribute markers across the map area
        const row = Math.floor(index / 5);
        const col = index % 5;
        const top = 15 + row * 25 + Math.random() * 10;
        const left = 10 + col * 18 + Math.random() * 5;

        return (
          <motion.button
            key={property.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectProperty?.(property)}
            className="absolute group"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <motion.div
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className="relative"
            >
              {/* Marker */}
              <div className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg whitespace-nowrap">
                {formatPrice(property.price, property.listingType)}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white rounded-md shadow-lg p-2 min-w-[150px]">
                  <div className="text-sm font-medium text-text truncate">
                    {property.title}
                  </div>
                  <div className="text-xs text-muted">
                    {property.size} m² · {property.bedrooms === 0 ? 'Estudio' : `${property.bedrooms} hab`}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.button>
        );
      })}

      {/* Map controls placeholder */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-md shadow-md flex items-center justify-center text-muted hover:text-text transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </button>
        <button className="w-10 h-10 bg-white rounded-md shadow-md flex items-center justify-center text-muted hover:text-text transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        Vista de mapa simulada
      </div>
    </div>
  );
}
