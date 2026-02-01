'use client';

import { Navigation } from '@/components/shared/Navigation';
import { AnimatedGradient } from '@/components/landing/AnimatedGradient';
import { Hero } from '@/components/landing/Hero';
import { FeaturedProperties } from '@/components/landing/FeaturedProperties';
import { Neighborhoods } from '@/components/landing/Neighborhoods';
import { HowItWorks } from '@/components/landing/HowItWorks';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedGradient />
      <Navigation variant="solid" />
      <main className="relative z-10">
        <Hero />
        <FeaturedProperties />
        <Neighborhoods />
        <HowItWorks />
      </main>
    </div>
  );
}
