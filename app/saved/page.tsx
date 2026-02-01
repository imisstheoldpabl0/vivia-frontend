'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/shared/Navigation';
import { PropertyGrid } from '@/components/search/PropertyGrid';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/Button';
import { useSavedProperties } from '@/context/SavedPropertiesContext';
import { properties } from '@/data/properties';

export default function SavedPage() {
  const { savedIds, clearAll } = useSavedProperties();

  const savedProperties = useMemo(() => {
    return properties.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  return (
    <main className="min-h-screen bg-bg">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text">
                  Propiedades guardadas
                </h1>
                <p className="text-muted mt-1">
                  {savedProperties.length === 0
                    ? 'Aún no has guardado ninguna propiedad'
                    : `${savedProperties.length} ${
                        savedProperties.length === 1
                          ? 'propiedad guardada'
                          : 'propiedades guardadas'
                      }`}
                </p>
              </div>
              {savedProperties.length > 0 && (
                <Button variant="ghost" onClick={clearAll}>
                  Eliminar todas
                </Button>
              )}
            </div>
          </motion.div>

          {/* Content */}
          {savedProperties.length > 0 ? (
            <PropertyGrid properties={savedProperties} />
          ) : (
            <EmptyState
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              }
              title="No tienes propiedades guardadas"
              description="Explora nuestras propiedades y guarda tus favoritas haciendo clic en el corazón. Así podrás acceder a ellas fácilmente cuando quieras."
              action={{
                label: 'Explorar propiedades',
                href: '/search?type=buy',
              }}
            />
          )}

          {/* Tip banner */}
          {savedProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 bg-accent-soft border border-orange-100 rounded-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="font-medium text-text mb-1">
                    Crea una cuenta para no perder tus favoritos
                  </h3>
                  <p className="text-sm text-muted">
                    Tus propiedades guardadas se almacenan localmente en este dispositivo.
                    Crea una cuenta gratuita para sincronizar tus favoritos en todos tus dispositivos
                    y recibir alertas cuando bajen de precio.
                  </p>
                  <button className="mt-3 text-sm font-medium text-accent hover:underline">
                    Crear cuenta gratuita →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
