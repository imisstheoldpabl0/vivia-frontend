'use client';

import { WizardFormData } from '@/types/property';
import { Input } from '@/components/ui/Input';
import { neighborhoods } from '@/data/properties';

interface LocationStepProps {
  data: WizardFormData;
  onUpdate: (data: Partial<WizardFormData>) => void;
}

export function LocationStep({ data, onUpdate }: LocationStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-text mb-2">
          ¿Dónde está ubicada?
        </h2>
        <p className="text-muted mb-6">
          La ubicación es clave para encontrar al comprador o inquilino ideal
        </p>
      </div>

      <div className="space-y-6 max-w-lg">
        <Input
          label="Dirección"
          placeholder="Ej: Calle de Serrano 45, 4ºA"
          value={data.address}
          onChange={(e) => onUpdate({ address: e.target.value })}
        />

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Barrio
          </label>
          <select
            value={data.neighborhood}
            onChange={(e) => onUpdate({ neighborhood: e.target.value })}
            className="flex h-11 w-full rounded-sm border border-border bg-surface px-4 py-2 text-base text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Selecciona un barrio</option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood} value={neighborhood}>
                {neighborhood}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Ciudad"
          value={data.city}
          onChange={(e) => onUpdate({ city: e.target.value })}
          placeholder="Madrid"
        />
      </div>

      {/* Map placeholder */}
      <div className="max-w-lg">
        <label className="block text-sm font-medium text-text mb-2">
          Ubicación en el mapa
        </label>
        <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
          <div className="text-center text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mx-auto mb-2"
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
            <p className="text-sm">El mapa se mostrará aquí</p>
          </div>
        </div>
      </div>
    </div>
  );
}
