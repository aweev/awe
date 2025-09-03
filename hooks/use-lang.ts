// hooks/use-lang.ts - Custom hook to set document lang
'use client';
import { useEffect } from 'react';

export function useLang(locale: string) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
}