
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = localStorage.getItem("user");
    
    if (storedIsLoggedIn && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with a backend
    // For demo purposes, we'll simulate a successful login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { email };
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user));
    
    setIsLoggedIn(true);
    setUser(user);
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would create a user account with a backend
    // For demo purposes, we'll simulate a successful registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { name, email };
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user));
    
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
