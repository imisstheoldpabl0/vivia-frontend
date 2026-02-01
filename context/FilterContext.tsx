'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import { Filters, Property } from '@/types/property';

interface FilterContextType {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  filterProperties: (properties: Property[]) => Property[];
  activeFilterCount: number;
}

const FilterContext = createContext<FilterContextType | null>(null);

const defaultFilters: Filters = {
  listingType: 'buy',
  location: '',
  priceMin: null,
  priceMax: null,
  bedrooms: null,
  sizeMin: null,
  sizeMax: null,
  propertyType: null,
  features: [],
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<Filters>(defaultFilters);

  const setFilters = useCallback((newFilters: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const filterProperties = useCallback(
    (properties: Property[]) => {
      return properties.filter((property) => {
        // Listing type
        if (property.listingType !== filters.listingType) {
          return false;
        }

        // Location
        if (filters.location) {
          const searchTerm = filters.location.toLowerCase();
          const matchesNeighborhood = property.neighborhood
            .toLowerCase()
            .includes(searchTerm);
          const matchesCity = property.city.toLowerCase().includes(searchTerm);
          const matchesAddress = property.address
            .toLowerCase()
            .includes(searchTerm);
          if (!matchesNeighborhood && !matchesCity && !matchesAddress) {
            return false;
          }
        }

        // Price
        if (filters.priceMin !== null && property.price < filters.priceMin) {
          return false;
        }
        if (filters.priceMax !== null && property.price > filters.priceMax) {
          return false;
        }

        // Bedrooms
        if (filters.bedrooms !== null) {
          if (filters.bedrooms === 4) {
            // 4+ bedrooms
            if (property.bedrooms < 4) {
              return false;
            }
          } else if (property.bedrooms !== filters.bedrooms) {
            return false;
          }
        }

        // Size
        if (filters.sizeMin !== null && property.size < filters.sizeMin) {
          return false;
        }
        if (filters.sizeMax !== null && property.size > filters.sizeMax) {
          return false;
        }

        // Property type
        if (
          filters.propertyType !== null &&
          property.type !== filters.propertyType
        ) {
          return false;
        }

        // Features
        if (filters.features.length > 0) {
          const hasAllFeatures = filters.features.every((feature) =>
            property.features.includes(feature)
          );
          if (!hasAllFeatures) {
            return false;
          }
        }

        return true;
      });
    },
    [filters]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin !== null || filters.priceMax !== null) count++;
    if (filters.bedrooms !== null) count++;
    if (filters.sizeMin !== null || filters.sizeMax !== null) count++;
    if (filters.propertyType !== null) count++;
    if (filters.features.length > 0) count++;
    return count;
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        filterProperties,
        activeFilterCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
