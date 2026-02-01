'use client';

import { motion } from 'framer-motion';
import { WizardFormData } from '@/types/property';
import { cn } from '@/lib/utils';

interface TypeStepProps {
  data: WizardFormData;
  onUpdate: (data: Partial<WizardFormData>) => void;
}

const propertyTypes = [
  {
    value: 'apartment',
    label: 'Apartamento',
    icon: '🏢',
    description: 'Piso en edificio residencial',
  },
  {
    value: 'house',
    label: 'Casa',
    icon: '🏠',
    description: 'Vivienda unifamiliar independiente',
  },
  {
    value: 'studio',
    label: 'Estudio',
    icon: '🛏️',
    description: 'Espacio compacto sin habitaciones separadas',
  },
  {
    value: 'penthouse',
    label: 'Ático',
    icon: '🌆',
    description: 'Última planta con terraza',
  },
];

const listingTypes = [
  { value: 'buy', label: 'Vender', description: 'Poner a la venta' },
  { value: 'rent', label: 'Alquilar', description: 'Poner en alquiler' },
];

export function TypeStep({ data, onUpdate }: TypeStepProps) {
  return (
    <div className="space-y-8">
      {/* Property Type */}
      <div>
        <h2 className="text-xl font-semibold text-text mb-2">
          ¿Qué tipo de propiedad es?
        </h2>
        <p className="text-muted mb-6">
          Selecciona el tipo que mejor describe tu propiedad
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {propertyTypes.map((type, index) => (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() =>
                onUpdate({ type: type.value as WizardFormData['type'] })
              }
              className={cn(
                'p-4 rounded-md border-2 text-left transition-all',
                data.type === type.value
                  ? 'border-accent bg-accent-soft'
                  : 'border-border hover:border-gray-300'
              )}
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <div className="font-medium text-text">{type.label}</div>
              <div className="text-xs text-muted mt-1">{type.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Listing Type */}
      <div>
        <h2 className="text-xl font-semibold text-text mb-2">
          ¿Qué quieres hacer?
        </h2>
        <p className="text-muted mb-6">
          Indica si quieres vender o alquilar tu propiedad
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          {listingTypes.map((type, index) => (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() =>
                onUpdate({ listingType: type.value as WizardFormData['listingType'] })
              }
              className={cn(
                'p-4 rounded-md border-2 text-center transition-all',
                data.listingType === type.value
                  ? 'border-accent bg-accent-soft'
                  : 'border-border hover:border-gray-300'
              )}
            >
              <div className="font-medium text-text">{type.label}</div>
              <div className="text-xs text-muted mt-1">{type.description}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
