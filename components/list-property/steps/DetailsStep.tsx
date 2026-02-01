'use client';

import { WizardFormData } from '@/types/property';
import { Input } from '@/components/ui/Input';
import { propertyFeatures } from '@/data/properties';
import { cn } from '@/lib/utils';

interface DetailsStepProps {
  data: WizardFormData;
  onUpdate: (data: Partial<WizardFormData>) => void;
}

export function DetailsStep({ data, onUpdate }: DetailsStepProps) {
  const toggleFeature = (feature: string) => {
    const newFeatures = data.features.includes(feature)
      ? data.features.filter((f) => f !== feature)
      : [...data.features, feature];
    onUpdate({ features: newFeatures });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-text mb-2">
          Cuéntanos más detalles
        </h2>
        <p className="text-muted mb-6">
          Estos datos ayudarán a los interesados a conocer mejor tu propiedad
        </p>
      </div>

      {/* Basic details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
        <Input
          type="number"
          label="Precio (€)"
          placeholder={data.listingType === 'buy' ? '350.000' : '1.200'}
          value={data.price || ''}
          onChange={(e) =>
            onUpdate({ price: e.target.value ? Number(e.target.value) : 0 })
          }
          suffix={data.listingType === 'rent' ? '/mes' : undefined}
        />

        <Input
          type="number"
          label="Superficie (m²)"
          placeholder="95"
          value={data.size || ''}
          onChange={(e) =>
            onUpdate({ size: e.target.value ? Number(e.target.value) : 0 })
          }
        />

        <Input
          type="number"
          label="Habitaciones"
          placeholder="3"
          value={data.bedrooms || ''}
          onChange={(e) =>
            onUpdate({ bedrooms: e.target.value ? Number(e.target.value) : 0 })
          }
        />

        <Input
          type="number"
          label="Baños"
          placeholder="2"
          value={data.bathrooms || ''}
          onChange={(e) =>
            onUpdate({ bathrooms: e.target.value ? Number(e.target.value) : 0 })
          }
        />

        <Input
          type="number"
          label="Planta"
          placeholder="4"
          value={data.floor || ''}
          onChange={(e) =>
            onUpdate({ floor: e.target.value ? Number(e.target.value) : 0 })
          }
        />
      </div>

      {/* Description */}
      <div className="max-w-2xl">
        <label className="block text-sm font-medium text-text mb-2">
          Descripción
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe tu propiedad: características especiales, estado, reformas recientes, orientación, vistas..."
          rows={5}
          className="flex w-full rounded-sm border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
        />
        <p className="mt-1 text-xs text-muted">
          Mínimo 100 caracteres. Actual: {data.description.length}
        </p>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-text mb-4">
          Características
        </label>
        <div className="flex flex-wrap gap-2">
          {propertyFeatures.map((feature) => (
            <button
              key={feature}
              onClick={() => toggleFeature(feature)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                data.features.includes(feature)
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-muted hover:bg-gray-200'
              )}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
