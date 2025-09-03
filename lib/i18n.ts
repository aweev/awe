// lib/i18n.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'de', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Static import map
const messagesMap: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import('@/messages/en.json').then((m) => m.default),
  de: () => import('@/messages/de.json').then((m) => m.default),
  fr: () => import('@/messages/fr.json').then((m) => m.default),
};

export default getRequestConfig(async ({ locale }) => {
  console.log(`🔍 getRequestConfig called with locale: ${locale}`);
  
  // Safely handle locale validation
  const requestedLocale = (locale as Locale) || defaultLocale;
  const validLocale = locales.includes(requestedLocale) ? requestedLocale : defaultLocale;
  
  if (locale && !locales.includes(locale as Locale)) {
    console.error(`❌ Invalid locale requested: ${locale}, falling back to ${defaultLocale}`);
  }
  
  console.log(`🌐 Loading messages for locale: ${validLocale}`);
  
  try {
    const messages = await messagesMap[validLocale]();
    console.log(`✅ Messages loaded successfully for ${validLocale}, keys:`, Object.keys(messages).slice(0, 5));
    
    return {
      locale: validLocale,
      messages
    };
  } catch (error) {
    console.error(`❌ Failed to load messages for ${validLocale}:`, error);
    
    // Fallback to English if loading fails
    const fallbackMessages = await messagesMap[defaultLocale]();
    return {
      locale: defaultLocale,
      messages: fallbackMessages
    };
  }
});
