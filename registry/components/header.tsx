'use client';

import { forwardRef, HTMLAttributes, ReactNode, useState } from 'react';

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  navLinks?: NavLink[];
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  banner?: ReactNode;
  bannerDescription?: string;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ logo, navLinks = [], cta, banner, bannerDescription, className = '', ...props }, ref) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <>
        <header
          ref={ref}
          className={`sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200 ${className}`}
          {...props}
        >
        {/* Optional banner */}
        {(banner || bannerDescription) && (
          <div className="bg-blue-600 text-white text-center text-sm py-2 px-4">
            {bannerDescription || banner}
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              {logo || <span className="text-xl font-bold">Logo</span>}
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {cta && (
                <a
                  href={cta.href || '#'}
                  onClick={cta.onClick}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
                >
                  {cta.label}
                </a>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        </header>

        {/* Mobile drawer (Off-canvas) */}
        <div 
          className={`fixed inset-0 z-[10000] md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Side Panel */}
          <div 
            className={`absolute inset-y-0 left-0 w-64 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}
          >
            <div className="flex flex-col min-h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex-shrink-0">
                  {logo || <span className="text-xl font-bold">Logo</span>}
                </div>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-medium text-gray-800 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {cta && (
                <div className="p-4 border-t mt-auto">
                  <a
                    href={cta.href || '#'}
                    onClick={() => {
                      cta.onClick?.();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
                  >
                    {cta.label}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

Header.displayName = 'Header';
export default Header;
