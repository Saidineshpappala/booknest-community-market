
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

type UserProfile = {
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Update user state based on auth events
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Extract name from user metadata if available
          const userName = currentSession.user.user_metadata?.name || 
                           currentSession.user.user_metadata?.full_name || 
                           '';
          
          setUserProfile({
            name: userName,
            email: currentSession.user.email || "",
          });
          setIsLoggedIn(true);
          
          // Store basic user info in localStorage as fallback
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify({
            name: userName,
            email: currentSession.user.email,
          }));
        } else {
          setUserProfile(null);
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("user");
        }
      }
    );

    // Check for existing session on component mount
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        // Extract name from user metadata if available
        const userName = currentSession.user.user_metadata?.name || 
                         currentSession.user.user_metadata?.full_name || 
                         '';
        
        setUserProfile({
          name: userName,
          email: currentSession.user.email || "",
        });
        setIsLoggedIn(true);
        
        // Store basic user info in localStorage as fallback
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({
          name: userName,
          email: currentSession.user.email,
        }));
      }
    });

    // Check for fallback login state in localStorage
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = localStorage.getItem("user");
    
    if (storedIsLoggedIn && storedUser && !user) {
      setIsLoggedIn(true);
      setUserProfile(JSON.parse(storedUser));
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Session is handled by the onAuthStateChange listener
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      // Session is handled by the onAuthStateChange listener
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local storage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      
      // Clear state
      setIsLoggedIn(false);
      setUser(null);
      setUserProfile(null);
      setSession(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      isLoggedIn, 
      login, 
      register, 
      logout 
    }}>
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
