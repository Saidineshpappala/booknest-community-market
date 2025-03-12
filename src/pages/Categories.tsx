
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, BookText, BookMarked, Bookmark } from "lucide-react";

const categories = [
  {
    id: "fiction",
    name: "Fiction",
    subcategories: [
      "Classic Literature",
      "Contemporary Fiction",
      "Mystery & Thriller",
      "Science Fiction",
      "Fantasy",
      "Horror",
      "Romance",
      "Historical Fiction"
    ],
    bookCount: 1248,
    icon: BookOpen
  },
  {
    id: "nonfiction",
    name: "Non-Fiction",
    subcategories: [
      "Biography & Memoir",
      "History",
      "Science & Technology",
      "Self-Help & Personal Development",
      "Business & Economics",
      "Philosophy",
      "Psychology",
      "Religion & Spirituality"
    ],
    bookCount: 983,
    icon: BookText
  },
  {
    id: "academic",
    name: "Academic & Educational",
    subcategories: [
      "Textbooks",
      "Reference",
      "Study Guides",
      "Professional",
      "Research Papers",
      "Journals",
      "Educational Resources"
    ],
    bookCount: 562,
    icon: BookMarked
  },
  {
    id: "special",
    name: "Special Collections",
    subcategories: [
      "Rare Books",
      "First Editions",
      "Signed Copies",
      "Limited Editions",
      "Antique & Vintage",
      "Collectibles",
      "Out-of-Print"
    ],
    bookCount: 327,
    icon: Bookmark
  }
];

const trendingCategories = [
  "Science Fiction",
  "Personal Development",
  "Biography",
  "Rare Books",
  "Fantasy",
  "Business"
];

const Categories = () => {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold">Book Categories</h1>
          <p className="text-muted-foreground mt-2">
            Explore our wide range of book categories and find your next read
          </p>
        </div>
      </div>
      
      <main className="container py-8 flex-grow">
        <div className="flex flex-col gap-8">
          {/* Search and trending categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search categories..."
                  className="pl-10"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Trending Categories</h3>
              <div className="flex flex-wrap gap-2">
                {trendingCategories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary"
                    className="cursor-pointer hover:bg-muted"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Category tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              <TabsTrigger value="fiction">Fiction</TabsTrigger>
              <TabsTrigger value="nonfiction">Non-Fiction</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="special">Special Collections</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-booknest-600/10 flex items-center justify-center">
                          <category.icon className="h-5 w-5 text-booknest-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.bookCount} books</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {category.subcategories.slice(0, 5).map((subcategory) => (
                          <Link 
                            key={subcategory} 
                            to={`/categories/${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block text-sm hover:text-booknest-600 hover:underline underline-offset-2"
                          >
                            {subcategory}
                          </Link>
                        ))}
                        {category.subcategories.length > 5 && (
                          <Link 
                            to={`/categories/${category.id}`}
                            className="block text-sm text-booknest-600 hover:underline underline-offset-2 font-medium"
                          >
                            + {category.subcategories.length - 5} more
                          </Link>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        asChild
                      >
                        <Link to={`/categories/${category.id}`}>
                          Browse {category.name}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.subcategories.map((subcategory) => (
                    <Card key={subcategory} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="font-medium mb-2">{subcategory}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Explore our collection of {subcategory.toLowerCase()} books
                        </p>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          asChild
                        >
                          <Link to={`/categories/${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}>
                            Browse Books
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {/* Popular authors section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Popular Authors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <Link 
                  key={idx} 
                  to={`/authors/${idx}`}
                  className="text-center group"
                >
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 bg-muted">
                    <img 
                      src={`https://i.pravatar.cc/150?img=${idx + 10}`} 
                      alt="Author" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium group-hover:text-booknest-600 transition-colors">
                    {["J.K. Rowling", "Stephen King", "Jane Austen", "George Orwell", "Agatha Christie", "Mark Twain", 
                      "F. Scott Fitzgerald", "Ernest Hemingway", "J.R.R. Tolkien", "Virginia Woolf", 
                      "Charles Dickens", "William Shakespeare"][idx]}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
