import { createContext, useEffect, useState } from "react";
import i18n from "../../i18n"; // Yuxarıdakı i18n faylı

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem("lang")
      ? JSON.parse(localStorage.getItem("lang"))
      : "az" // Əgər localStorage-də dil yoxdursa, "aze" qoyuruq
  );

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
