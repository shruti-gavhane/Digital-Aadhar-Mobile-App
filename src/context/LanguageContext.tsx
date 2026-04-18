import { createContext, useState } from 'react';

export const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: any) => {
  const [lang, setLang] = useState("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};