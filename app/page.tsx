'use client';

import { Navigation } from '@/components/shared/Navigation';
import { Hero } from '@/components/landing/Hero';
import { FeaturedProperties } from '@/components/landing/FeaturedProperties';
import { Neighborhoods } from '@/components/landing/Neighborhoods';
import { HowItWorks } from '@/components/landing/HowItWorks';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="solid" />
      <main>
        <Hero />
        <FeaturedProperties />
        <Neighborhoods />
        <HowItWorks />
      </main>
    </div>
  );
}
