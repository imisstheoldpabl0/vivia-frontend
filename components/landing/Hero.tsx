'use client';

import { motion } from 'framer-motion';
import { SearchForm } from './SearchForm';

export function Hero() {
  return (
    <section className="relative min-h-screen-mobile flex items-center justify-center overflow-hidden pt-16">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-text tracking-tight mb-4 sm:mb-6">
            Encuentra tu hogar
            <br />
            <span className="text-accent">en Madrid</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
            Descubre apartamentos, casas y estudios en los mejores barrios de la ciudad.
            Tu nuevo hogar te está esperando.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchForm />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 sm:mt-12 flex items-center justify-center gap-6 sm:gap-8 md:gap-12 px-4"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-semibold text-text">2.500+</div>
            <div className="text-xs sm:text-sm text-muted">Propiedades</div>
          </div>
          <div className="w-px h-10 sm:h-12 bg-border" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-semibold text-text">25</div>
            <div className="text-xs sm:text-sm text-muted">Barrios</div>
          </div>
          <div className="w-px h-10 sm:h-12 bg-border" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-semibold text-text">98%</div>
            <div className="text-xs sm:text-sm text-muted">Satisfacción</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
