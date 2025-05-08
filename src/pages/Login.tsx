
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { login, isLoggedIn } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/books");
    }
  }, [isLoggedIn, navigate]);

  const validatePassword = (pwd: string) => {
    return pwd.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    
    setIsLoading(true);

    try {
      // Use the login method from AuthContext
      await login(email, password);
      
      toast({
        title: "Login successful",
        description: "Welcome back to BookNest!",
      });
      
      // The navigation will happen automatically due to the useEffect
      // that watches isLoggedIn state
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMsg = error instanceof Error 
        ? error.message 
        : "Please check your credentials and try again.";
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMsg,
      });
      
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Add translations for login page
  const loginTranslations = {
    "login.welcome": "Welcome Back",
    "login.enterCredentials": "Enter your credentials to sign in",
    "login.email": "Email",
    "login.password": "Password",
    "login.forgotPassword": "Forgot Password?",
    "login.signIn": "Sign In",
    "login.signingIn": "Signing In...",
    "login.noAccount": "Don't have an account?",
    "login.signUp": "Sign Up"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-booknest-600/10 mb-4">
              <BookOpen className="h-6 w-6 text-booknest-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">{t('login.welcome')}</CardTitle>
            <CardDescription className="text-center">
              {t('login.enterCredentials')}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {errorMessage && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <Link to="/forgot-password" className="text-sm text-booknest-600 hover:underline">
                    {t('login.forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-booknest-600 hover:bg-booknest-700" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('login.signingIn')}
                  </>
                ) : (
                  t('login.signIn')
                )}
              </Button>
              <div className="text-center text-sm">
                {t('login.noAccount')}{" "}
                <Link to="/register" className="text-booknest-600 hover:underline">
                  {t('login.signUp')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
