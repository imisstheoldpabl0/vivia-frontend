'use client';

import { Navigation } from '@/components/shared/Navigation';
import { Hero } from '@/components/landing/Hero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation variant="transparent" />
      <Hero />
    </main>
  );
}
