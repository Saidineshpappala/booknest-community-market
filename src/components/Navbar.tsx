
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BookOpen, 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  Heart
} from "lucide-react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <div className="flex items-center">
              <Input 
                placeholder="Search books, authors..." 
                className="w-[200px] md:w-[300px]"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
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
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
