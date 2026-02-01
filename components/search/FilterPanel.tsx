'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilters } from '@/context/FilterContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  totalCount: number;
  filteredCount: number;
}

export function FilterPanel({ totalCount, filteredCount }: FilterPanelProps) {
  const { filters, setFilters, resetFilters, activeFilterCount } = useFilters();
  const [isExpanded, setIsExpanded] = useState(false);

  const bedroomOptions = [
    { value: null, label: 'Todos' },
    { value: 0, label: 'Estudio' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4+' },
  ];

  const propertyTypes = [
    { value: null, label: 'Todos' },
    { value: 'apartment', label: 'Apartamento' },
    { value: 'house', label: 'Casa' },
    { value: 'studio', label: 'Estudio' },
    { value: 'penthouse', label: 'Ático' },
  ];

  return (
    <div className="bg-surface rounded-md shadow-sm p-4">
      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-text">
            {filteredCount}
          </span>
          <span className="text-muted">
            {filteredCount === 1 ? 'propiedad' : 'propiedades'}
          </span>
          {filteredCount !== totalCount && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-muted"
            >
              de {totalCount}
            </motion.span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Layer 1: Always visible */}
      <div className="space-y-4">
        {/* Price range */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder={filters.listingType === 'buy' ? 'Precio mín.' : 'Desde €/mes'}
            value={filters.priceMin || ''}
            onChange={(e) =>
              setFilters({
                priceMin: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
          <Input
            type="number"
            placeholder={filters.listingType === 'buy' ? 'Precio máx.' : 'Hasta €/mes'}
            value={filters.priceMax || ''}
            onChange={(e) =>
              setFilters({
                priceMax: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Habitaciones
          </label>
          <div className="flex flex-wrap gap-2">
            {bedroomOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => setFilters({ bedrooms: option.value })}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  filters.bedrooms === option.value
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-muted hover:bg-gray-200'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expand button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-accent font-medium mt-4 hover:underline"
      >
        {isExpanded ? 'Menos filtros' : 'Más filtros'}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </motion.svg>
      </button>

      {/* Layer 2: Expandable */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4 border-t border-border mt-4">
              {/* Size range */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Tamaño (m²)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Mín. m²"
                    value={filters.sizeMin || ''}
                    onChange={(e) =>
                      setFilters({
                        sizeMin: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Máx. m²"
                    value={filters.sizeMax || ''}
                    onChange={(e) =>
                      setFilters({
                        sizeMax: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
              </div>

              {/* Property type */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Tipo de propiedad
                </label>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((option) => (
                    <button
                      key={option.label}
                      onClick={() =>
                        setFilters({
                          propertyType: option.value as typeof filters.propertyType,
                        })
                      }
                      className={cn(
                        'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                        filters.propertyType === option.value
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-muted hover:bg-gray-200'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
