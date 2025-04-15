
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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

// Reliable book covers that won't break
const bookCovers = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1603162925312-16c138c2d7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80",
  "https://images.unsplash.com/photo-1586339392738-d6ae85b5d5a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
];

const books: BookItem[] = [
  {
    id: "b1",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: bookCovers[0],
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
    cover: bookCovers[1],
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
    cover: bookCovers[2],
    price: 35.99,
    condition: "rare",
    seller: {
      name: "Rare Finds",
      rating: 4.8
    }
  },
  {
    id: "b9",
    title: "Dune",
    author: "Frank Herbert",
    cover: bookCovers[4],
    price: 18.99,
    condition: "new",
    seller: {
      name: "SciFi Store",
      rating: 4.8
    }
  }
];

const FeaturedBooks = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAddToCart = (book: BookItem) => {
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      price: book.price,
      condition: book.condition
    });
    
    toast({
      title: t('books.addedToCart'),
      description: t('books.itemAddedToCart', { title: book.title }),
    });
  };

  // Check if image URLs are valid
  const getBookCover = (url: string, index: number) => {
    // Fallback to a stable image from the bookCovers array
    return url || bookCovers[index % bookCovers.length];
  };

  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{t('home.featuredBooks')}</h2>
          <Link to="/books" className="text-booknest-600 hover:text-booknest-700 font-medium">
            {t('home.viewAll')}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="relative">
                <Link to={`/books/${book.id}`}>
                  <div className="aspect-[2/3] overflow-hidden">
                    <img 
                      src={getBookCover(book.cover, index)} 
                      alt={book.title}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300" 
                      onError={(e) => {
                        // If image fails to load, set a fallback
                        (e.target as HTMLImageElement).src = bookCovers[index % bookCovers.length];
                      }}
                    />
                  </div>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">{t('books.addToWishlist')}</span>
                </Button>
                {book.condition === "rare" && (
                  <Badge className="absolute top-2 left-2 bg-amber-500">{t('books.rareFind')}</Badge>
                )}
                {book.condition === "used" && (
                  <Badge variant="secondary" className="absolute top-2 left-2">{t('books.used')}</Badge>
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
                  {t('books.seller')}: {book.seller.name} ({book.seller.rating})
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  className="w-full bg-booknest-600 hover:bg-booknest-700"
                  onClick={() => handleAddToCart(book)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t('books.addToCart')}
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
