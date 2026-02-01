'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WizardFormData } from '@/types/property';
import { Button } from '@/components/ui/Button';

interface PhotosStepProps {
  data: WizardFormData;
  onUpdate: (data: Partial<WizardFormData>) => void;
}

// Sample images for demo purposes
const sampleImages = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80',
  'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
];

export function PhotosStep({ data, onUpdate }: PhotosStepProps) {
  const [dragOver, setDragOver] = useState(false);

  const addImage = (url: string) => {
    if (!data.images.includes(url)) {
      onUpdate({ images: [...data.images, url] });
    }
  };

  const removeImage = (url: string) => {
    onUpdate({ images: data.images.filter((img) => img !== url) });
  };

  const addSampleImages = () => {
    const newImages = [...new Set([...data.images, ...sampleImages.slice(0, 4)])];
    onUpdate({ images: newImages });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-text mb-2">
          Añade fotos de tu propiedad
        </h2>
        <p className="text-muted mb-6">
          Las buenas fotos aumentan significativamente el interés. Recomendamos al menos 4 imágenes.
        </p>
      </div>

      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          // In a real app, you'd handle file uploads here
        }}
        className={`
          border-2 border-dashed rounded-md p-8 text-center transition-colors
          ${dragOver ? 'border-accent bg-accent-soft' : 'border-border'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-muted mx-auto mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <p className="text-muted mb-2">
          Arrastra y suelta tus fotos aquí
        </p>
        <p className="text-sm text-muted mb-4">o</p>
        <Button variant="outline" onClick={() => {}}>
          Seleccionar archivos
        </Button>
        <p className="text-xs text-muted mt-4">
          JPG, PNG o WEBP. Máximo 10MB por imagen.
        </p>
      </div>

      {/* Demo: Add sample images */}
      <div className="bg-accent-soft border border-orange-100 rounded-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text">Demo: Añadir imágenes de ejemplo</p>
            <p className="text-sm text-muted">
              Haz clic para añadir fotos de demostración
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={addSampleImages}>
            Añadir fotos
          </Button>
        </div>
      </div>

      {/* Image gallery */}
      {data.images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-text">
              Fotos añadidas ({data.images.length})
            </label>
            {data.images.length > 0 && (
              <button
                onClick={() => onUpdate({ images: [] })}
                className="text-sm text-muted hover:text-red-500 transition-colors"
              >
                Eliminar todas
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <AnimatePresence>
              {data.images.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative aspect-[4/3] rounded-md overflow-hidden group"
                >
                  <img
                    src={image}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => removeImage(image)}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Index badge */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <p className="text-xs text-muted mt-4">
            Arrastra las fotos para reordenarlas. La primera será la imagen principal.
          </p>
        </div>
      )}
    </div>
  );
}
