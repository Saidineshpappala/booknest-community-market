
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

type BookItem = {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  originalPrice?: number;
  condition: "new" | "used" | "rare";
  seller: {
    name: string;
    rating: number;
  };
};

const books: BookItem[] = [
  {
    id: "b1",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 12.99,
    originalPrice: 16.99,
    condition: "new",
    seller: {
      name: "Book Emporium",
      rating: 4.9
    }
  },
  {
    id: "b2",
    title: "Educated",
    author: "Tara Westover",
    cover: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 9.50,
    condition: "used",
    seller: {
      name: "ReadAgain",
      rating: 4.7
    }
  },
  {
    id: "b3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://images.unsplash.com/photo-1603162925312-16c138c2d7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    price: 35.99,
    condition: "rare",
    seller: {
      name: "Rare Finds",
      rating: 4.8
    }
  },
  {
    id: "b4",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80",
    price: 14.99,
    originalPrice: 19.99,
    condition: "new",
    seller: {
      name: "Book Emporium",
      rating: 4.9
    }
  }
];

const FeaturedBooks = () => {
  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Books</h2>
          <Link to="/books" className="text-booknest-600 hover:text-booknest-700 font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="relative">
                <Link to={`/books/${book.id}`}>
                  <div className="aspect-[2/3] overflow-hidden">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                {book.condition === "rare" && (
                  <Badge className="absolute top-2 left-2 bg-amber-500">Rare Find</Badge>
                )}
                {book.condition === "used" && (
                  <Badge variant="secondary" className="absolute top-2 left-2">Used</Badge>
                )}
              </div>
              <CardContent className="flex-grow flex flex-col pt-4">
                <Link to={`/books/${book.id}`} className="hover:underline underline-offset-2">
                  <h3 className="font-medium line-clamp-2 mb-1">{book.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                <div className="mt-auto flex items-baseline mb-1">
                  <span className="font-medium text-lg">${book.price.toFixed(2)}</span>
                  {book.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Seller: {book.seller.name} ({book.seller.rating})
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-booknest-600 hover:bg-booknest-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
