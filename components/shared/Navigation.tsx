'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSavedProperties } from '@/context/SavedPropertiesContext';

interface NavigationProps {
  variant?: 'transparent' | 'solid';
}

export function Navigation({ variant = 'solid' }: NavigationProps) {
  const pathname = usePathname();
  const { savedIds } = useSavedProperties();

  const isTransparent = variant === 'transparent';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        isTransparent ? 'bg-transparent' : 'bg-white/60 backdrop-blur-xl border-b border-white/20'
      )}
      style={!isTransparent ? {
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                'text-2xl font-semibold tracking-tight',
                isTransparent ? 'text-white' : 'text-text'
              )}
            >
              vivia
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/search?type=buy"
              className={cn(
                'text-sm font-medium transition-colors',
                isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-muted hover:text-text',
                pathname === '/search' && 'text-accent'
              )}
            >
              Comprar
            </Link>
            <Link
              href="/search?type=rent"
              className={cn(
                'text-sm font-medium transition-colors',
                isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-muted hover:text-text'
              )}
            >
              Alquilar
            </Link>
            <Link
              href="/list-property"
              className={cn(
                'text-sm font-medium transition-colors',
                isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-muted hover:text-text',
                pathname === '/list-property' && 'text-accent'
              )}
            >
              Publicar
            </Link>
            <Link
              href="/saved"
              className={cn(
                'relative text-sm font-medium transition-colors',
                isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-muted hover:text-text',
                pathname === '/saved' && 'text-accent'
              )}
            >
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {savedIds.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-accent rounded-full"
                  >
                    {savedIds.length}
                  </motion.span>
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
