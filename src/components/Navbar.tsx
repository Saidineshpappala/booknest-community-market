
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BookOpen, 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  Heart,
  LogOut,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search results page with the query
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Link to="/" className="flex items-center gap-2 py-4">
                <BookOpen className="h-5 w-5 text-booknest-600" />
                <span className="font-serif text-xl font-bold">BookNest</span>
              </Link>
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/books" className="text-muted-foreground hover:text-foreground">Books</Link>
                <Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link>
                <Link to="/sell" className="text-muted-foreground hover:text-foreground">Sell Books</Link>
                <Link to="/community" className="text-muted-foreground hover:text-foreground">Community</Link>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
              </div>
              
              <div className="mt-auto mb-4">
                {isLoggedIn ? (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login">
                      <Button variant="default" className="w-full bg-booknest-600 hover:bg-booknest-700">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" className="w-full">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <Link to="/" className="flex items-center gap-2 mr-4">
          <BookOpen className="h-6 w-6 text-booknest-600" />
          <span className="font-serif text-xl font-bold hidden sm:inline-block">BookNest</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link to="/books" className="transition-colors hover:text-booknest-600">Books</Link>
          <Link to="/categories" className="transition-colors hover:text-booknest-600">Categories</Link>
          <Link to="/sell" className="transition-colors hover:text-booknest-600">Sell Books</Link>
          <Link to="/community" className="transition-colors hover:text-booknest-600">Community</Link>
          <Link to="/about" className="transition-colors hover:text-booknest-600">About</Link>
        </nav>
        
        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background/80 backdrop-blur-sm md:relative md:inset-auto md:bg-transparent md:backdrop-blur-none">
              <div className="relative w-full max-w-lg md:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input 
                  placeholder="Search books, authors..." 
                  className="pr-10 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              <button type="submit" className="sr-only">Search</button>
              <div className="md:hidden fixed inset-0 -z-10" onClick={closeSearch}></div>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          <Link to="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1.5 h-5 min-w-5 bg-booknest-600 font-medium flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.name || user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wishlist">My Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
