import { createContext, useEffect, useState } from "react";
import i18n from "../../i18n"; // Yuxarıdakı i18n faylı

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("lang");
    if (!savedLang) {
      return "az";
    }
    // Handle both JSON string and plain string cases
    try {
      return JSON.parse(savedLang);
    } catch {
      // If it's not valid JSON, treat it as a plain string
      return savedLang;
    }
  });

  // Log to check if lang is being updated correctly
  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(lang));
    i18n.changeLanguage(lang);
  }, [lang]); // This effect runs every time `lang` changes

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
