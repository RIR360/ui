'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: string;
}

const colClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
};

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, columns = 3, gap = 'gap-6', className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`grid ${colClasses[columns] || colClasses[3]} ${gap} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
export default Grid;
