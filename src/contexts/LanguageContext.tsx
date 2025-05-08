
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SupportedLanguage = "en" | "es" | "fr" | "de" | "zh";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
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
    "books.addedToCart": "Added to Cart",
    "books.itemAddedToCart": "{title} has been added to your cart",
    "login.welcome": "Welcome Back",
    "login.enterCredentials": "Enter your credentials to sign in",
    "login.email": "Email",
    "login.password": "Password",
    "login.forgotPassword": "Forgot Password?",
    "login.signIn": "Sign In",
    "login.signingIn": "Signing In...",
    "login.noAccount": "Don't have an account?",
    "login.signUp": "Sign Up"
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
    "books.addedToCart": "Añadido al Carrito",
    "books.itemAddedToCart": "{title} ha sido añadido a tu carrito",
    "login.welcome": "Bienvenido de nuevo",
    "login.enterCredentials": "Ingresa tus credenciales para iniciar sesión",
    "login.email": "Correo electrónico",
    "login.password": "Contraseña",
    "login.forgotPassword": "¿Olvidaste tu contraseña?",
    "login.signIn": "Iniciar Sesión",
    "login.signingIn": "Iniciando sesión...",
    "login.noAccount": "¿No tienes una cuenta?",
    "login.signUp": "Regístrate"
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
    "books.addedToCart": "Ajouté au Panier",
    "books.itemAddedToCart": "{title} a été ajouté à votre panier",
    "login.welcome": "Bon retour",
    "login.enterCredentials": "Entrez vos identifiants pour vous connecter",
    "login.email": "E-mail",
    "login.password": "Mot de passe",
    "login.forgotPassword": "Mot de passe oublié?",
    "login.signIn": "Se connecter",
    "login.signingIn": "Connexion en cours...",
    "login.noAccount": "Vous n'avez pas de compte?",
    "login.signUp": "S'inscrire"
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
    "books.addedToCart": "Zum Warenkorb Hinzugefügt",
    "books.itemAddedToCart": "{title} wurde Ihrem Warenkorb hinzugefügt",
    "login.welcome": "Willkommen zurück",
    "login.enterCredentials": "Geben Sie Ihre Anmeldedaten ein",
    "login.email": "E-Mail",
    "login.password": "Passwort",
    "login.forgotPassword": "Passwort vergessen?",
    "login.signIn": "Anmelden",
    "login.signingIn": "Anmeldung läuft...",
    "login.noAccount": "Haben Sie kein Konto?",
    "login.signUp": "Registrieren"
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
    "books.addedToCart": "已添加到购物车",
    "books.itemAddedToCart": "{title} 已添加到您的购物车",
    "login.welcome": "欢迎回来",
    "login.enterCredentials": "请输入您的凭据以登录",
    "login.email": "电子邮件",
    "login.password": "密码",
    "login.forgotPassword": "忘记密码？",
    "login.signIn": "登录",
    "login.signingIn": "登录中...",
    "login.noAccount": "没有账户？",
    "login.signUp": "注册"
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

  // Enhanced translation function with parameter support
  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations["en"][key] || key;
    
    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return text;
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
