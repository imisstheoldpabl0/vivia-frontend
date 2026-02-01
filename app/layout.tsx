import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SavedPropertiesProvider } from '@/context/SavedPropertiesContext';
import { FilterProvider } from '@/context/FilterContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vivia - Find Your Perfect Home in Madrid',
  description: 'Discover apartments, houses, and studios for sale and rent in Madrid. Modern real estate platform with curated listings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SavedPropertiesProvider>
          <FilterProvider>
            {children}
          </FilterProvider>
        </SavedPropertiesProvider>
      </body>
    </html>
  );
}
