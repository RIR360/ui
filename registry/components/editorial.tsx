'use client';

import Image from 'next/image';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface EditorialProps extends HTMLAttributes<HTMLDivElement> {
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
  imagePosition?: 'left' | 'right';
  children?: ReactNode;
}

const Editorial = forwardRef<HTMLDivElement, EditorialProps>(
  (
    {
      title,
      description,
      cta,
      image,
      imagePosition = 'right',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isImageLeft = imagePosition === 'left';

    return (
      <div
        ref={ref}
        className={`px-4 sm:px-6 lg:px-8 py-12 sm:py-16 ${className}`}
        {...props}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-10 lg:gap-16">
          {/* Image — always first on mobile, conditionally ordered on desktop */}
          {image && (
            <div className={`relative flex-1 w-full aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Text */}
          <div className={`flex-1 w-full ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-current/60 mb-6 text-lg/relaxed leading-relaxed">{description}</p>
            )}
            {children}
            {cta && (
              <a
                href={cta.href || '#'}
                onClick={cta.onClick}
                className="inline-block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Editorial.displayName = 'Editorial';
export default Editorial;
