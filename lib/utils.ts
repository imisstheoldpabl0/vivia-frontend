import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, listingType: 'buy' | 'rent'): string {
  const formatted = new Intl.NumberFormat('es-ES', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  if (listingType === 'rent') {
    return `€${formatted}/mes`;
  }
  return `€${formatted}`;
}

export function formatSize(size: number): string {
  return `${size} m²`;
}

export function formatPricePerMeter(price: number): string {
  return `€${new Intl.NumberFormat('es-ES').format(price)}/m²`;
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

export function getBedroomLabel(bedrooms: number): string {
  if (bedrooms === 0) return 'Estudio';
  return `${bedrooms} ${pluralize(bedrooms, 'habitación', 'habitaciones')}`;
}

export function getBathroomLabel(bathrooms: number): string {
  return `${bathrooms} ${pluralize(bathrooms, 'baño', 'baños')}`;
}

export function getFloorLabel(floor: number | undefined): string {
  if (floor === undefined) return '';
  if (floor === 0) return 'Planta baja';
  return `Planta ${floor}ª`;
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    apartment: 'Apartamento',
    house: 'Casa',
    studio: 'Estudio',
    penthouse: 'Ático',
  };
  return labels[type] || type;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
