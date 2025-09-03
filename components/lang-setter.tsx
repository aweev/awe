// components/lang-setter.tsx
'use client';
import { useEffect } from 'react';

interface LangSetterProps {
  locale: string;
}

export function LangSetter({ locale }: LangSetterProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}