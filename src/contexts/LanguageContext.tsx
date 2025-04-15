
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SupportedLanguage = "en" | "es" | "fr" | "de" | "zh";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const defaultLanguage: SupportedLanguage = "en";

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.books": "Books",
    "nav.categories": "Categories",
    "nav.cart": "Cart",
    "nav.sell": "Sell Books",
    "nav.community": "Community",
    "nav.about": "About",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    "nav.latefees": "Late Fees",
    "welcome": "Welcome to BookNest",
    "footer.copyright": "© 2025 BookNest. All rights reserved.",
    // Add more translations here
  },
  es: {
    "nav.home": "Inicio",
    "nav.books": "Libros",
    "nav.categories": "Categorías",
    "nav.cart": "Carrito",
    "nav.sell": "Vender Libros",
    "nav.community": "Comunidad",
    "nav.about": "Acerca de",
    "nav.login": "Iniciar Sesión",
    "nav.register": "Registrarse",
    "nav.logout": "Cerrar Sesión",
    "nav.latefees": "Multas por Retraso",
    "welcome": "Bienvenido a BookNest",
    "footer.copyright": "© 2025 BookNest. Todos los derechos reservados.",
    // Add more translations here
  },
  fr: {
    "nav.home": "Accueil",
    "nav.books": "Livres",
    "nav.categories": "Catégories",
    "nav.cart": "Panier",
    "nav.sell": "Vendre des Livres",
    "nav.community": "Communauté",
    "nav.about": "À Propos",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "nav.logout": "Déconnexion",
    "nav.latefees": "Frais de Retard",
    "welcome": "Bienvenue à BookNest",
    "footer.copyright": "© 2025 BookNest. Tous droits réservés.",
    // Add more translations here
  },
  de: {
    "nav.home": "Startseite",
    "nav.books": "Bücher",
    "nav.categories": "Kategorien",
    "nav.cart": "Warenkorb",
    "nav.sell": "Bücher Verkaufen",
    "nav.community": "Gemeinschaft",
    "nav.about": "Über Uns",
    "nav.login": "Anmelden",
    "nav.register": "Registrieren",
    "nav.logout": "Abmelden",
    "nav.latefees": "Säumnisgebühren",
    "welcome": "Willkommen bei BookNest",
    "footer.copyright": "© 2025 BookNest. Alle Rechte vorbehalten.",
    // Add more translations here
  },
  zh: {
    "nav.home": "首页",
    "nav.books": "图书",
    "nav.categories": "分类",
    "nav.cart": "购物车",
    "nav.sell": "卖书",
    "nav.community": "社区",
    "nav.about": "关于",
    "nav.login": "登录",
    "nav.register": "注册",
    "nav.logout": "登出",
    "nav.latefees": "逾期费用",
    "welcome": "欢迎来到 BookNest",
    "footer.copyright": "© 2025 BookNest. 保留所有权利。",
    // Add more translations here
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const savedLanguage = localStorage.getItem("language") as SupportedLanguage;
    return savedLanguage || defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
