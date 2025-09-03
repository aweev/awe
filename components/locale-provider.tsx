// components/locale-provider.tsx
'use client';

import { useEffect, ReactNode } from 'react';

interface LocaleProviderProps {
  locale: string;
  children: ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <>{children}</>;
}