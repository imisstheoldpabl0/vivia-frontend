'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

interface SavedPropertiesContextType {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  clearAll: () => void;
}

const SavedPropertiesContext = createContext<SavedPropertiesContextType | null>(
  null
);

const STORAGE_KEY = 'vivia-saved-properties';

export function SavedPropertiesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load saved properties:', error);
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage when savedIds changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
      } catch (error) {
        console.error('Failed to save properties:', error);
      }
    }
  }, [savedIds, isHydrated]);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    );
  }, []);

  const clearAll = useCallback(() => {
    setSavedIds([]);
  }, []);

  return (
    <SavedPropertiesContext.Provider
      value={{ savedIds, isSaved, toggleSaved, clearAll }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  );
}

export function useSavedProperties() {
  const context = useContext(SavedPropertiesContext);
  if (!context) {
    throw new Error(
      'useSavedProperties must be used within a SavedPropertiesProvider'
    );
  }
  return context;
}
