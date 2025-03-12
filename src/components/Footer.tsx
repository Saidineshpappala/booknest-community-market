
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-muted/40">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-booknest-600" />
              <span className="font-serif text-xl font-bold">BookNest</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your community-driven marketplace for new and used books.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-3">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/books" className="text-muted-foreground hover:text-foreground">Books</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link></li>
              <li><Link to="/authors" className="text-muted-foreground hover:text-foreground">Authors</Link></li>
              <li><Link to="/publishers" className="text-muted-foreground hover:text-foreground">Publishers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-foreground">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-foreground">Returns & Refunds</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t text-sm text-muted-foreground">
          <div>
            <p>&copy; {new Date().getFullYear()} BookNest. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-foreground">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
