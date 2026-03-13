'use client';

import Link from 'next/link';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface NavLink {
  label: string;
  href: string;
}

interface QuickLinkSection {
  title: string;
  links: NavLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

interface FooterProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  description?: string;
  quickLinks?: QuickLinkSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
  bottomLinks?: NavLink[];
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      logo,
      description,
      quickLinks = [],
      socialLinks = [],
      copyright = `© ${new Date().getFullYear()} All rights reserved.`,
      bottomLinks = [],
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={`border-t border-gray-200 bg-white ${className}`}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-2">
              <div className="shrink-0 mb-6">
                {logo || <span className="text-2xl font-bold">Logo</span>}
              </div>
              {description && (
                <p className="text-current/60 text-sm max-w-xs mb-6 leading-relaxed">
                  {description}
                </p>
              )}
              {/* Social Links for Brand Column */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-current/50 hover:text-current transition-colors"
                    >
                      {link.icon}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links Sections */}
            {quickLinks.map((section) => (
              <div key={section.title} className="col-span-1">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-current/60 hover:text-current transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-current/50 order-2 md:order-1">{copyright}</p>
            
            {bottomLinks.length > 0 && (
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 order-1 md:order-2">
                {bottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs text-current/50 hover:text-current transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
export default Footer;
