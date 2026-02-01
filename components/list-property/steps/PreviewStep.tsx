'use client';

import { motion } from 'framer-motion';
import { WizardFormData } from '@/types/property';
import { formatPrice, getPropertyTypeLabel } from '@/lib/utils';

interface PreviewStepProps {
  data: WizardFormData;
}

export function PreviewStep({ data }: PreviewStepProps) {
  const pricePerMeter = data.size > 0 ? Math.round(data.price / data.size) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-text mb-2">
          Vista previa de tu anuncio
        </h2>
        <p className="text-muted mb-6">
          Así se verá tu propiedad en Vivia. Revisa que todo esté correcto antes de publicar.
        </p>
      </div>

      {/* Preview card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-md shadow-md overflow-hidden max-w-2xl"
      >
        {/* Main image */}
        {data.images.length > 0 ? (
          <div className="relative aspect-[16/9]">
            <img
              src={data.images[0]}
              alt="Imagen principal"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-text rounded">
                {data.listingType === 'buy' ? 'Venta' : 'Alquiler'}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
              1 / {data.images.length}
            </div>
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
            <p className="text-muted">Sin imágenes</p>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-2xl font-semibold text-text">
                {data.price > 0
                  ? formatPrice(data.price, data.listingType)
                  : '€ --'}
              </div>
              {data.listingType === 'buy' && pricePerMeter > 0 && (
                <div className="text-sm text-muted">€{pricePerMeter.toLocaleString('es-ES')}/m²</div>
              )}
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-5 h-5 text-muted"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted mb-4">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              {data.size || '--'} m²
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              </svg>
              {data.bedrooms === 0 ? 'Estudio' : `${data.bedrooms || '--'} hab`}
            </span>
            <span>{data.bathrooms || '--'} baños</span>
          </div>

          {/* Location */}
          <div className="text-muted mb-4">
            {data.neighborhood || 'Sin barrio'}, Madrid
          </div>

          {/* Type */}
          <div className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-muted">
            {data.type ? getPropertyTypeLabel(data.type) : 'Sin tipo'}
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-md p-6 max-w-2xl">
        <h3 className="font-semibold text-text mb-4">Resumen del anuncio</h3>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted">Tipo de operación</dt>
            <dd className="font-medium text-text">
              {data.listingType === 'buy' ? 'Venta' : 'Alquiler'}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Tipo de propiedad</dt>
            <dd className="font-medium text-text">
              {data.type ? getPropertyTypeLabel(data.type) : '-'}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Dirección</dt>
            <dd className="font-medium text-text">
              {data.address || '-'}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Barrio</dt>
            <dd className="font-medium text-text">
              {data.neighborhood || '-'}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Precio</dt>
            <dd className="font-medium text-text">
              {data.price > 0 ? formatPrice(data.price, data.listingType) : '-'}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Superficie</dt>
            <dd className="font-medium text-text">
              {data.size > 0 ? `${data.size} m²` : '-'}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Habitaciones</dt>
            <dd className="font-medium text-text">
              {data.bedrooms === 0 ? 'Estudio' : data.bedrooms || '-'}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Baños</dt>
            <dd className="font-medium text-text">
              {data.bathrooms || '-'}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted">Características</dt>
            <dd className="font-medium text-text">
              {data.features.length > 0 ? data.features.join(', ') : '-'}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted">Fotos</dt>
            <dd className="font-medium text-text">
              {data.images.length} {data.images.length === 1 ? 'imagen' : 'imágenes'}
            </dd>
          </div>
        </dl>
      </div>

      {/* Confirmation message */}
      <div className="bg-accent-soft border border-orange-100 rounded-md p-6 max-w-2xl">
        <div className="flex gap-4">
          <div className="text-3xl">🎉</div>
          <div>
            <h3 className="font-semibold text-text mb-1">
              ¡Todo listo para publicar!
            </h3>
            <p className="text-sm text-muted">
              Tu anuncio será revisado por nuestro equipo y estará visible en menos de 24 horas.
              Te notificaremos cuando esté activo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
