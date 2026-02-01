'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/shared/Navigation';
import { PropertyGrid } from '@/components/search/PropertyGrid';
import { FilterPanel } from '@/components/search/FilterPanel';
import { ViewToggle } from '@/components/search/ViewToggle';
import { MapView } from '@/components/search/MapView';
import { Toggle } from '@/components/ui/Toggle';
import { Input } from '@/components/ui/Input';
import { useFilters } from '@/context/FilterContext';
import { properties } from '@/data/properties';

function SearchContent() {
  const searchParams = useSearchParams();
  const { filters, setFilters, filterProperties } = useFilters();
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize filters from URL params
  useEffect(() => {
    const type = searchParams.get('type');
    const location = searchParams.get('location');

    if (type === 'buy' || type === 'rent') {
      setFilters({ listingType: type });
    }
    if (location) {
      setFilters({ location });
    }

    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchParams, setFilters]);

  // Filter properties
  const filteredProperties = useMemo(
    () => filterProperties(properties),
    [filterProperties]
  );

  // Get properties for current listing type (for total count)
  const totalForType = useMemo(
    () => properties.filter((p) => p.listingType === filters.listingType).length,
    [filters.listingType]
  );

  return (
    <main className="min-h-screen bg-bg">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-text">
                  Propiedades en Madrid
                </h1>
                <p className="text-muted mt-1">
                  Encuentra tu próximo hogar entre nuestra selección de propiedades
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Toggle
                  options={[
                    { value: 'buy', label: 'Comprar' },
                    { value: 'rent', label: 'Alquilar' },
                  ]}
                  value={filters.listingType}
                  onChange={(v) => setFilters({ listingType: v as 'buy' | 'rent' })}
                />
                <ViewToggle view={view} onChange={setView} />
              </div>
            </div>

            {/* Search bar */}
            <div className="max-w-md">
              <Input
                placeholder="Buscar por barrio o zona..."
                value={filters.location}
                onChange={(e) => setFilters({ location: e.target.value })}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                }
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar filters */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <FilterPanel
                  totalCount={totalForType}
                  filteredCount={filteredProperties.length}
                />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {view === 'grid' ? (
                <PropertyGrid
                  properties={filteredProperties}
                  isLoading={isLoading}
                />
              ) : (
                <MapView properties={filteredProperties} />
              )}

              {/* Load more */}
              {filteredProperties.length > 0 && view === 'grid' && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted">
                    Mostrando {filteredProperties.length} de {filteredProperties.length} propiedades
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-bg">
          <Navigation />
          <div className="pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="h-64 bg-gray-200 rounded" />
                  <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-64 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
