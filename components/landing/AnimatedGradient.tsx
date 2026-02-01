'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AnimatedGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to gradient position
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['20%', '60%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['40%', '90%']);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1.2]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 0.6, 0.5, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.5, 0.6, 0.4]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Base gradient - white at top fading to light orange */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-orange-50/80" />

      {/* Animated blurry orbs */}
      <motion.div
        className="absolute -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-200/60 to-orange-300/40"
        style={{
          top: y1,
          scale: scale1,
          opacity: opacity1,
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 20, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-100/50 to-amber-200/40"
        style={{
          top: y2,
          scale: scale2,
          opacity: opacity2,
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -30, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-orange-200/40 to-rose-100/30"
        style={{
          top: y3,
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
