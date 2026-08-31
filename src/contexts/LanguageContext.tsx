import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/locales/en.json";
import ta from "@/locales/ta.json";
import ml from "@/locales/ml.json";
import hi from "@/locales/hi.json";

const TRANSLATIONS = { en, ta, ml, hi };
export type Language = "en" | "ta" | "ml" | "hi";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved === "en" || saved === "ta" || saved === "ml" || saved === "hi") {
      setLangState(saved as Language);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
