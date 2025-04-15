
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, User, BookOpen, LogOut } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

const NavbarNew = () => {
  const location = useLocation();
  const { isLoggedIn, user, userProfile, logout } = useAuth();
  const { items } = useCart();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/books", label: t("nav.books") },
    { path: "/categories", label: t("nav.categories") },
    { path: "/sell", label: t("nav.sell") },
    { path: "/community", label: t("nav.community") },
    { path: "/about", label: t("nav.about") },
  ];
  
  const authLinks = isLoggedIn 
    ? [
        { path: "/late-fees", label: t("nav.latefees") },
        { path: "/cart", label: t("nav.cart"), icon: <ShoppingCart className="h-5 w-5" />, badge: totalItems > 0 ? totalItems : null },
        { 
          path: "#", 
          label: t("nav.logout"),
          onClick: (e) => {
            e.preventDefault();
            logout();
          }
        }
      ]
    : [
        { path: "/login", label: t("nav.login") },
        { path: "/register", label: t("nav.register") }
      ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-booknest-600" />
            <span className="font-semibold text-xl text-booknest-600">BookNest</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-booknest-600 ${location.pathname === link.path ? "text-booknest-600" : "text-foreground/80"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <LanguageSelector />
          
          <div className="hidden md:flex items-center gap-4">
            {authLinks.map(link => {
              if (link.icon) {
                return (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    className="relative"
                    onClick={link.onClick}
                  >
                    {link.icon}
                    {link.badge && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                );
              }
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-booknest-600 ${location.pathname === link.path ? "text-booknest-600" : "text-foreground/80"}`}
                  onClick={link.onClick}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {isLoggedIn && (
              <Button size="sm" variant="ghost" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden lg:inline-block">{userProfile?.name?.split(' ')[0] || 'User'}</span>
              </Button>
            )}
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-base font-medium transition-colors hover:text-booknest-600 ${location.pathname === link.path ? "text-booknest-600" : "text-foreground/80"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  <div className="h-px w-full bg-border my-2" />
                  
                  {authLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2 text-base font-medium transition-colors hover:text-booknest-600 ${location.pathname === link.path ? "text-booknest-600" : "text-foreground/80"}`}
                      onClick={link.onClick}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                      {link.badge && (
                        <Badge variant="destructive" className="ml-auto">
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                  
                  {isLoggedIn && (
                    <div className="flex items-center gap-2 text-base font-medium mt-4">
                      <User className="h-4 w-4" />
                      <span>{userProfile?.name || 'User'}</span>
                    </div>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarNew;
