import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Heart, ShoppingCart, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

type BookItem = {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  originalPrice?: number;
  condition: "new" | "used" | "rare";
  category: string;
  seller: {
    name: string;
    rating: number;
  };
};

const allBooks: BookItem[] = [
  {
    id: "b1",
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 12.99,
    originalPrice: 16.99,
    condition: "new",
    category: "fiction",
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
    category: "biography",
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
    category: "classics",
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
    category: "non-fiction",
    seller: {
      name: "Book Emporium",
      rating: 4.9
    }
  },
  {
    id: "b5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 8.99,
    condition: "used",
    category: "classics",
    seller: {
      name: "Vintage Books",
      rating: 4.6
    }
  },
  {
    id: "b6",
    title: "1984",
    author: "George Orwell",
    cover: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 10.50,
    condition: "used",
    category: "classics",
    seller: {
      name: "Classic Reads",
      rating: 4.7
    }
  },
  {
    id: "b7",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://images.unsplash.com/photo-1603162925312-16c138c2d7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    price: 32.99,
    condition: "rare",
    category: "classics",
    seller: {
      name: "Rare Finds",
      rating: 4.8
    }
  },
  {
    id: "b8",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80",
    price: 15.99,
    originalPrice: 21.99,
    condition: "new",
    category: "non-fiction",
    seller: {
      name: "Book Emporium",
      rating: 4.9
    }
  },
  {
    id: "b9",
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images.unsplash.com/photo-1586339392738-d6ae85b5d5a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 18.99,
    condition: "new",
    category: "sci-fi",
    seller: {
      name: "SciFi Store",
      rating: 4.8
    }
  },
  {
    id: "b10",
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80",
    price: 13.50,
    originalPrice: 17.99,
    condition: "new",
    category: "fiction",
    seller: {
      name: "Book Emporium",
      rating: 4.9
    }
  },
  {
    id: "b11",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 14.99,
    condition: "new",
    category: "mystery",
    seller: {
      name: "Mystery Books",
      rating: 4.7
    }
  },
  {
    id: "b12",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    cover: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    price: 16.75,
    condition: "used",
    category: "non-fiction",
    seller: {
      name: "Science Books",
      rating: 4.6
    }
  }
];

const Books = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<BookItem[]>(allBooks);
  const [selectedConditions, setSelectedConditions] = useState<{
    new: boolean;
    used: boolean;
    rare: boolean;
  }>({
    new: false,
    used: false,
    rare: false
  });
  const [selectedCategories, setSelectedCategories] = useState<{
    fiction: boolean;
    "non-fiction": boolean;
    mystery: boolean;
    "sci-fi": boolean;
    biography: boolean;
    classics: boolean;
  }>({
    fiction: false,
    "non-fiction": false,
    mystery: false,
    "sci-fi": false,
    biography: false,
    classics: false
  });
  const [sortBy, setSortBy] = useState("relevance");
  const { addItem } = useCart();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");
    if (searchQuery) {
      setSearchValue(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    let result = [...allBooks];

    if (searchValue.trim() !== '') {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    const activeConditions = Object.entries(selectedConditions)
      .filter(([_, isSelected]) => isSelected)
      .map(([condition]) => condition);

    if (activeConditions.length > 0) {
      result = result.filter(book => activeConditions.includes(book.condition));
    }

    const activeCategories = Object.entries(selectedCategories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category);

    if (activeCategories.length > 0) {
      result = result.filter(book => activeCategories.includes(book.category));
    }

    result = result.filter(
      book => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(() => Math.random() - 0.5);
        break;
      case "rating":
        result.sort((a, b) => b.seller.rating - a.seller.rating);
        break;
      default:
        break;
    }

    setFilteredBooks(result);
  }, [searchValue, selectedConditions, selectedCategories, priceRange, sortBy]);

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
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleConditionChange = (condition: "new" | "used" | "rare") => {
    setSelectedConditions(prev => ({
      ...prev,
      [condition]: !prev[condition]
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleApplyFilters = () => {
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    if (searchValue.trim()) {
      queryParams.set("search", searchValue);
    } else {
      queryParams.delete("search");
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold">Browse Books</h1>
          <p className="text-muted-foreground mt-2">
            Discover new and used books from our community of sellers
          </p>
        </div>
      </div>
      <main className="container py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between"
            >
              <span>Filters</span> <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <aside className={`md:w-64 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Search</h3>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search books..." 
                      className="pl-10"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Book Condition</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="condition-new" 
                      checked={selectedConditions.new}
                      onCheckedChange={() => handleConditionChange("new")}
                    />
                    <label htmlFor="condition-new" className="text-sm">New</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="condition-used" 
                      checked={selectedConditions.used}
                      onCheckedChange={() => handleConditionChange("used")}
                    />
                    <label htmlFor="condition-used" className="text-sm">Used</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="condition-rare" 
                      checked={selectedConditions.rare}
                      onCheckedChange={() => handleConditionChange("rare")}
                    />
                    <label htmlFor="condition-rare" className="text-sm">Rare</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <Slider 
                    max={50} 
                    step={1} 
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}+</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Seller Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cat-fiction" 
                      checked={selectedCategories.fiction}
                      onCheckedChange={() => handleCategoryChange("fiction")}
                    />
                    <label htmlFor="cat-fiction" className="text-sm">Fiction</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cat-nonfiction" 
                      checked={selectedCategories["non-fiction"]}
                      onCheckedChange={() => handleCategoryChange("non-fiction")}
                    />
                    <label htmlFor="cat-nonfiction" className="text-sm">Non-Fiction</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cat-mystery" 
                      checked={selectedCategories.mystery}
                      onCheckedChange={() => handleCategoryChange("mystery")}
                    />
                    <label htmlFor="cat-mystery" className="text-sm">Mystery & Thriller</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cat-scifi" 
                      checked={selectedCategories["sci-fi"]}
                      onCheckedChange={() => handleCategoryChange("sci-fi")}
                    />
                    <label htmlFor="cat-scifi" className="text-sm">Science Fiction</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cat-biography" 
                      checked={selectedCategories.biography}
                      onCheckedChange={() => handleCategoryChange("biography")}
                    />
                    <label htmlFor="cat-biography" className="text-sm">Biography</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cat-classics" 
                      checked={selectedCategories.classics}
                      onCheckedChange={() => handleCategoryChange("classics")}
                    />
                    <label htmlFor="cat-classics" className="text-sm">Classics</label>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
            </div>
          </aside>
          
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
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
                      <Button 
                        className="w-full bg-booknest-600 hover:bg-booknest-700"
                        onClick={() => handleAddToCart(book)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No books found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                  <Button variant="outline" onClick={() => {
                    setSearchValue("");
                    setPriceRange([0, 50]);
                    setSelectedConditions({ new: false, used: false, rare: false });
                    setSelectedCategories({ fiction: false, "non-fiction": false, mystery: false, "sci-fi": false, biography: false, classics: false });
                    setSortBy("relevance");
                  }}>
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
            
            {filteredBooks.length > 8 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More Books</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Books;
