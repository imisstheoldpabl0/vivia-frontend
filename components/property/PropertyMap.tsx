'use client';

import { motion } from 'framer-motion';

interface PropertyMapProps {
  address: string;
  neighborhood: string;
  coordinates: { lat: number; lng: number };
}

export function PropertyMap({ address, neighborhood, coordinates }: PropertyMapProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text">Ubicación</h3>

      {/* Address */}
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        <div>
          <div className="font-medium text-text">{address}</div>
          <div className="text-sm text-muted">{neighborhood}, Madrid</div>
        </div>
      </div>

      {/* Map placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden"
      >
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="property-map-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#property-map-grid)" />
        </svg>

        {/* Mock streets */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gray-300" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gray-300" />
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gray-300" />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-gray-300" />
        </div>

        {/* Property marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="relative">
              {/* Pulse ring */}
              <div className="absolute inset-0 -m-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full animate-ping" />
              </div>
              {/* Marker */}
              <div className="relative w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Neighborhood labels */}
        <div className="absolute top-4 left-4 text-xs text-gray-400">
          {neighborhood}
        </div>

        {/* Coordinates */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
        </div>
      </motion.div>

      {/* Nearby places */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: '🚇', label: 'Metro', distance: '3 min' },
          { icon: '🛒', label: 'Supermercado', distance: '5 min' },
          { icon: '🏥', label: 'Hospital', distance: '10 min' },
          { icon: '🏫', label: 'Colegio', distance: '7 min' },
        ].map((place) => (
          <div
            key={place.label}
            className="flex items-center gap-2 text-sm text-muted"
          >
            <span>{place.icon}</span>
            <span>{place.label}</span>
            <span className="text-accent font-medium">{place.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
