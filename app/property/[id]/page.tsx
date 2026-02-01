'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/shared/Navigation';
import { HeartButton } from '@/components/shared/HeartButton';
import { ImageGallery } from '@/components/property/ImageGallery';
import { PropertyStats } from '@/components/property/PropertyStats';
import { TrustIndicators } from '@/components/property/TrustIndicators';
import { PropertyMap } from '@/components/property/PropertyMap';
import { Button } from '@/components/ui/Button';
import { properties } from '@/data/properties';
import { formatPrice, formatPricePerMeter } from '@/lib/utils';

export default function PropertyPage() {
  const params = useParams();
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Inicio
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={`/search?type=${property.listingType}`}
                  className="hover:text-accent transition-colors"
                >
                  {property.listingType === 'buy' ? 'Comprar' : 'Alquilar'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-text">{property.neighborhood}</li>
            </ol>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ImageGallery images={property.images} title={property.title} />
              </motion.div>

              {/* Title and price (mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-semibold text-text mb-2">
                      {property.title}
                    </h1>
                    <p className="text-muted">
                      {property.address}, {property.neighborhood}
                    </p>
                  </div>
                  <HeartButton propertyId={property.id} size="lg" />
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-semibold text-text">
                    {formatPrice(property.price, property.listingType)}
                  </div>
                  <div className="text-sm text-muted">
                    {formatPricePerMeter(property.pricePerMeter)}
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PropertyStats property={property} />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-text">Descripción</h2>
                <p className="text-muted leading-relaxed">{property.description}</p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-text">
                  Características
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 bg-gray-100 text-muted text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <TrustIndicators lastUpdated={property.lastUpdated} />
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <PropertyMap
                  address={property.address}
                  neighborhood={property.neighborhood}
                  coordinates={property.coordinates}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:sticky lg:top-24 space-y-6"
              >
                {/* Price card (desktop) */}
                <div className="hidden lg:block bg-surface rounded-md shadow-sm p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-3xl font-semibold text-text">
                        {formatPrice(property.price, property.listingType)}
                      </div>
                      <div className="text-sm text-muted">
                        {formatPricePerMeter(property.pricePerMeter)}
                      </div>
                    </div>
                    <HeartButton propertyId={property.id} size="md" />
                  </div>

                  <h1 className="text-xl font-semibold text-text mb-2">
                    {property.title}
                  </h1>
                  <p className="text-sm text-muted mb-6">
                    {property.address}, {property.neighborhood}
                  </p>

                  <div className="space-y-3">
                    <Button fullWidth>Contactar</Button>
                    <Button variant="outline" fullWidth>
                      Solicitar visita
                    </Button>
                  </div>
                </div>

                {/* Affirmation banner */}
                <div className="bg-gradient-to-br from-accent/10 to-orange-100 rounded-md p-6 text-center">
                  <div className="text-4xl mb-3">🏠</div>
                  <h3 className="font-semibold text-text mb-2">
                    Tu próximo hogar te espera
                  </h3>
                  <p className="text-sm text-muted">
                    Estás a un paso de encontrar el lugar perfecto. No dejes pasar esta oportunidad.
                  </p>
                </div>

                {/* Similar properties placeholder */}
                <div className="bg-surface rounded-md shadow-sm p-6">
                  <h3 className="font-semibold text-text mb-4">
                    Propiedades similares
                  </h3>
                  <div className="space-y-4">
                    {properties
                      .filter(
                        (p) =>
                          p.id !== property.id &&
                          p.neighborhood === property.neighborhood &&
                          p.listingType === property.listingType
                      )
                      .slice(0, 3)
                      .map((p) => (
                        <Link
                          key={p.id}
                          href={`/property/${p.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-text group-hover:text-accent transition-colors truncate">
                              {formatPrice(p.price, p.listingType)}
                            </div>
                            <div className="text-xs text-muted truncate">
                              {p.size} m² · {p.bedrooms === 0 ? 'Estudio' : `${p.bedrooms} hab`}
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile CTA */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 lg:hidden"
          >
            <div className="flex items-center gap-4 max-w-lg mx-auto">
              <div className="flex-1">
                <div className="text-lg font-semibold text-text">
                  {formatPrice(property.price, property.listingType)}
                </div>
                <div className="text-xs text-muted">
                  {formatPricePerMeter(property.pricePerMeter)}
                </div>
              </div>
              <Button>Contactar</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
