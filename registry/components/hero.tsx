'use client';

import Image from 'next/image';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface HeroProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  image?: {
    src: string;
    alt: string;
  };
  fullBackground?: boolean;
  contentPosition?: 'left' | 'center' | 'right';
  children?: ReactNode;
}

const Hero = forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      title,
      description,
      cta,
      image,
      fullBackground = true,
      contentPosition = 'center',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const positionClasses = {
      left: 'items-start text-left',
      center: 'items-center text-center',
      right: 'items-end text-right',
    };

    const containerPadding = fullBackground ? 'px-4 sm:px-6 lg:px-8 py-20' : '';

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${fullBackground ? 'min-h-[70vh] flex items-center' : 'px-4 sm:px-6 lg:px-8 py-16 sm:py-24'} ${className}`}
        {...props}
      >
        {/* Full Background Image */}
        {fullBackground && image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" /> {/* Overlay for legibility */}
          </div>
        )}

        <div className={`mx-auto max-w-7xl w-full relative z-10 ${containerPadding}`}>
          <div
            className={`flex ${
              fullBackground
                ? `flex-col ${positionClasses[contentPosition]} text-white`
                : 'flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16'
            }`}
          >
            {/* Text */}
            <div className={`flex-1 ${fullBackground ? 'max-w-3xl' : 'text-center lg:text-left'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                {title}
              </h1>
              {description && (
                <p
                  className={`text-lg mb-8 max-w-xl ${
                    fullBackground ? (contentPosition === 'center' ? 'mx-auto' : '') : 'text-current/60 mx-auto lg:mx-0'
                  }`}
                >
                  {description}
                </p>
              )}
              {cta && (
                <a
                  href={cta.href || '#'}
                  onClick={cta.onClick}
                  className={`inline-block rounded-md px-8 py-4 text-base font-semibold shadow transition-colors ${
                    fullBackground
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {cta.label}
                </a>
              )}
              {children}
            </div>

            {/* Side Image (only if not full background) */}
            {!fullBackground && image && (
              <div className="flex-1 w-full relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Hero.displayName = 'Hero';
export default Hero;
