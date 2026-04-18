import { createContext, useState } from 'react';
import { Language } from '../services/translations';

export const AppContext = createContext<any>(null);

export const AppProvider: React.FC<{ children: any }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang =
      lang === 'hi' ? 'hi-IN' :
      lang === 'mr' ? 'mr-IN' : 'en-IN';

    window.speechSynthesis.speak(speech);
  };

  return (
    <AppContext.Provider value={{ lang, setLang, speak }}>
      {children}
    </AppContext.Provider>
  );
};