"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Locale, defaultLocale } from './i18n';
import { getTranslations } from './translations';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Record<string, any>;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: getTranslations(defaultLocale),
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage?.getItem?.('locale') as Locale | null;
      if (saved && ['es', 'en', 'pt'].includes(saved)) {
        setLocaleState(saved);
      }
    } catch {}
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage?.setItem?.('locale', newLocale);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  }, []);

  const t = getTranslations(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
