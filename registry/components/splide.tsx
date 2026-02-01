'use client';

import { Children, forwardRef, ReactElement, ReactNode } from 'react';
import { Options } from '@splidejs/splide';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import type { Splide as SplideInstance } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

// remove the CSS import if you don't want to use the default theme
import '@splidejs/react-splide/css';

type CarouselOptions = Options & {
  autoScroll?: false | {
    speed?: number;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
  };
};

interface CarouselProps {
  children: ReactNode;
  ariaLabel?: string;
  options?: CarouselOptions;
}

const defaultOptions: CarouselOptions = {
  type: 'loop',
  perPage: 1,
  gap: '1rem',
  arrows: true,
  pagination: true,
  autoScroll: false,
};

const Carousel = forwardRef<SplideInstance, CarouselProps>(
  ({ children, ariaLabel = 'Carousel', options }, ref) => {

    const slides = Children.toArray(children) as ReactElement[];

    const mergedOptions = { ...defaultOptions, ...options };

    return (
      <Splide
        ref={ref}
        aria-label={ariaLabel}
        options={mergedOptions}
        extensions={mergedOptions.autoScroll ? { AutoScroll } : undefined}
      >
        {slides.map((child, index) => (
          <SplideSlide key={child.key ?? index}>
            {child}
          </SplideSlide>
        ))}
      </Splide>
    );
  }
);

Carousel.displayName = 'Carousel';
export default Carousel;