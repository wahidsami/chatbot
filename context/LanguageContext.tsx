
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { content } from '../i18n';

type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof content.en;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const t = useMemo(() => {
    // A simple way to merge the deeply nested objects
    // This isn't perfect for all cases but works for this structure
    // A more robust solution would use a deep merge utility
    return JSON.parse(JSON.stringify(content[language]));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
