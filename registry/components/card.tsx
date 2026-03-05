'use client';

import Image from 'next/image';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  title?: string;
  description?: string;
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  children?: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ image, title, description, cta, children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden ${className}`}
        {...props}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-5">
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}
          {children}
          {cta && (
            <a
              href={cta.href || '#'}
              onClick={cta.onClick}
              className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {cta.label} &rarr;
            </a>
          )}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
