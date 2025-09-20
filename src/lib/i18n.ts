import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import gcf from '@/locales/gcf.json';

export type SupportedLocale = 'fr' | 'en' | 'es' | 'gcf';

const locales = {
  fr,
  en,
  es,
  gcf,
} as const;

export function getLocaleFromPath(pathname: string): SupportedLocale {
  const segments = pathname.split('/');
  const locale = segments[1] as SupportedLocale;
  
  if (locale && locales[locale]) {
    return locale;
  }
  
  return 'fr'; // Default fallback
}

export function getTranslations(locale: SupportedLocale) {
  return locales[locale] || locales.fr;
}

export function getCommonTranslations(locale: SupportedLocale) {
  return getTranslations(locale).common;
}

export function getFlashOffersTranslations(locale: SupportedLocale) {
  return getTranslations(locale).flashOffers;
}

// Helper function to get nested translations with type safety
export function getNestedTranslation(
  obj: any,
  path: string,
  fallback: string = ''
): string {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback;
    }
  }
  
  return typeof current === 'string' ? current : fallback;
}

// Hook for React components
export function useTranslations() {
  const pathname = typeof window !== 'undefined' 
    ? window.location.pathname 
    : '/';
  
  const locale = getLocaleFromPath(pathname);
  const translations = getTranslations(locale);
  
  return {
    locale,
    t: translations,
    common: translations.common,
    flashOffers: translations.flashOffers,
  };
}


