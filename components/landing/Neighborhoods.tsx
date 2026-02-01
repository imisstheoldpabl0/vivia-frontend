'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const neighborhoods = [
  {
    name: 'Salamanca',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    count: 245,
  },
  {
    name: 'Malasaña',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80',
    count: 189,
  },
  {
    name: 'Chamberí',
    image: 'https://images.unsplash.com/photo-1543832923-44667a44c804?w=600&q=80',
    count: 312,
  },
  {
    name: 'Retiro',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
    count: 178,
  },
  {
    name: 'La Latina',
    image: 'https://images.unsplash.com/photo-1559386484-97dfc0e15539?w=600&q=80',
    count: 156,
  },
  {
    name: 'Chueca',
    image: 'https://images.unsplash.com/photo-1570698473651-b2de99bae12f?w=600&q=80',
    count: 203,
  },
];

export function Neighborhoods() {
  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text mb-3">
            Barrios populares
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Explora los barrios más demandados de Madrid
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {neighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={`/search?location=${encodeURIComponent(neighborhood.name)}`}>
                <motion.div
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                      {neighborhood.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {neighborhood.count} propiedades
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
