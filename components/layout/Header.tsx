"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('NavigationBar');

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-deep-charcoal">
              AWE
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-hopeful-clay px-3 py-2 rounded-md text-sm font-medium">{t('about')}</Link>
              <Link href="/work" className="text-gray-600 hover:text-hopeful-clay px-3 py-2 rounded-md text-sm font-medium">{t('work')}</Link>
              <Link href="/stories" className="text-gray-600 hover:text-hopeful-clay px-3 py-2 rounded-md text-sm font-medium">{t('stories')}</Link>
              <Link href="/get-involved" className="text-gray-600 hover:text-hopeful-clay px-3 py-2 rounded-md text-sm font-medium">{t('getInvolved')}</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Link href="/donate" className="bg-hopeful-clay text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-hopeful-clay/90">
              {t('donate')}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}