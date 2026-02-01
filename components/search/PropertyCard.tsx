'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Property } from '@/types/property';
import { formatPrice, formatSize, getBedroomLabel } from '@/lib/utils';
import { HeartButton } from '@/components/shared/HeartButton';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/property/${property.id}`}>
        <motion.article
          className="group bg-surface rounded-md overflow-hidden shadow-sm"
          whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
          transition={{ duration: 0.2 }}
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Heart button */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity">
              <HeartButton propertyId={property.id} variant="overlay" size="sm" />
            </div>
            {/* Type badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-text rounded">
                {property.listingType === 'buy' ? 'Venta' : 'Alquiler'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Price */}
            <div className="text-xl font-semibold text-text mb-1">
              {formatPrice(property.price, property.listingType)}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted mb-2">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                {formatSize(property.size)}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                </svg>
                {getBedroomLabel(property.bedrooms)}
              </span>
            </div>

            {/* Location */}
            <div className="text-sm text-muted truncate">
              {property.neighborhood}, {property.city}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
