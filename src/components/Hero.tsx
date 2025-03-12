
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-booknest-100">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-booknest-900">
              Find Your Next Literary Adventure
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Discover new and used books from a community of passionate readers. Buy, sell, and connect with book lovers around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-booknest-600 hover:bg-booknest-700 text-white">
                <Link to="/books">Explore Books</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sell">Sell Your Books</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Join thousands of book lovers already enjoying our community.
            </p>
          </div>
          <div className="relative hidden md:block">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Stack of books" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute bottom-0 left-0 z-0 rounded-lg overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-5/6">
              <img 
                src="https://images.unsplash.com/photo-1553545204-4f7d339aa06a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                alt="Open book on table" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
