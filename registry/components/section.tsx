'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
  as?: 'section' | 'div' | 'article' | 'aside';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      maxWidth = 'max-w-7xl',
      padding = 'px-4 sm:px-6 lg:px-8 py-12 sm:py-16',
      as: Tag = 'section',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={`mx-auto ${maxWidth} ${padding} ${className}`}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Section.displayName = 'Section';
export default Section;