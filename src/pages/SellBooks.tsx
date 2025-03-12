
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { BookPlus, ArrowRight, HelpCircle } from "lucide-react";

const SellBooks = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    condition: "",
    description: "",
    price: "",
    images: [] as File[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setBookData({ ...bookData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setBookData({ ...bookData, images: [...bookData.images, ...filesArray] });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...bookData.images];
    updatedImages.splice(index, 1);
    setBookData({ ...bookData, images: updatedImages });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("Please log in to sell books");
      navigate("/login");
      return;
    }
    
    // Validate form
    if (!bookData.title || !bookData.author || !bookData.category || 
        !bookData.condition || !bookData.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, you would upload images and send data to a server
    setTimeout(() => {
      toast.success("Your book has been listed for sale!");
      setIsSubmitting(false);
      // Reset form or redirect
      setBookData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        condition: "",
        description: "",
        price: "",
        images: []
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold">Sell Your Books</h1>
          <p className="text-muted-foreground mt-2">
            List your books for sale and connect with buyers in our community
          </p>
        </div>
      </div>
      
      <main className="container py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="single">Sell a Single Book</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Listing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookPlus className="h-5 w-5 text-booknest-600" />
                    List Your Book
                  </CardTitle>
                  <CardDescription>
                    Fill in the details about the book you want to sell
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Book Title <span className="text-red-500">*</span></Label>
                        <Input 
                          id="title"
                          name="title"
                          value={bookData.title}
                          onChange={handleChange}
                          placeholder="Enter the book title"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="author">Author <span className="text-red-500">*</span></Label>
                        <Input 
                          id="author"
                          name="author"
                          value={bookData.author}
                          onChange={handleChange}
                          placeholder="Enter the author's name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="isbn">ISBN (Optional)</Label>
                        <Input 
                          id="isbn"
                          name="isbn"
                          value={bookData.isbn}
                          onChange={handleChange}
                          placeholder="Enter ISBN if available"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($) <span className="text-red-500">*</span></Label>
                        <Input 
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0.01"
                          value={bookData.price}
                          onChange={handleChange}
                          placeholder="Enter your asking price"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                        <Select onValueChange={(value) => handleSelectChange("category", value)}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fiction">Fiction</SelectItem>
                            <SelectItem value="nonfiction">Non-Fiction</SelectItem>
                            <SelectItem value="mystery">Mystery & Thriller</SelectItem>
                            <SelectItem value="scifi">Science Fiction</SelectItem>
                            <SelectItem value="romance">Romance</SelectItem>
                            <SelectItem value="biography">Biography</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="children">Children's Books</SelectItem>
                            <SelectItem value="textbooks">Textbooks</SelectItem>
                            <SelectItem value="comics">Comics & Graphic Novels</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition <span className="text-red-500">*</span></Label>
                        <Select onValueChange={(value) => handleSelectChange("condition", value)}>
                          <SelectTrigger id="condition">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="like-new">Like New</SelectItem>
                            <SelectItem value="very-good">Very Good</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="acceptable">Acceptable</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        value={bookData.description}
                        onChange={handleChange}
                        placeholder="Describe the book, its condition, and any other relevant details"
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="images">Book Images</Label>
                      <div className="border border-input rounded-md p-4">
                        <Input 
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                          className="mb-4"
                        />
                        
                        {bookData.images.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                            {bookData.images.map((image, index) => (
                              <div key={index} className="relative group">
                                <img 
                                  src={URL.createObjectURL(image)} 
                                  alt={`Book image ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-muted-foreground mt-2">
                          Upload clear photos of your book. Include front cover, back cover, and any signs of wear if applicable.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={isSubmitting} className="bg-booknest-600 hover:bg-booknest-700">
                        {isSubmitting ? "Listing Book..." : "List Book for Sale"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bulk">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Book Listing</CardTitle>
                  <CardDescription>
                    For sellers who want to list multiple books at once
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                    <div className="bg-muted/50 rounded-full p-4">
                      <HelpCircle className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Bulk Listing Coming Soon</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        We're currently developing a bulk upload feature to make it easier to list multiple books at once. 
                        For now, please use the single listing option.
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => document.querySelector('button[value="single"]')?.click()}
                    >
                      Switch to Single Listing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Selling Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Pricing Tips</h3>
                  <p className="text-sm text-muted-foreground">
                    Research similar books to set a competitive price. Consider the book's condition, rarity, 
                    and demand when setting your price.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Book Condition Guidelines</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li><span className="font-medium">New:</span> Never opened or read, perfect condition</li>
                    <li><span className="font-medium">Like New:</span> Appears unread with no visible wear</li>
                    <li><span className="font-medium">Very Good:</span> May show small signs of wear, no highlighting/notes</li>
                    <li><span className="font-medium">Good:</span> May have some wear, minimal highlighting/notes</li>
                    <li><span className="font-medium">Acceptable:</span> Readable with noticeable wear, may have marks/notes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Shipping & Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll be notified when someone purchases your book. You're responsible for 
                    shipping within 3 business days. Returns are accepted within 14 days if the item description was inaccurate.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 text-sm text-muted-foreground">
              By listing a book, you agree to our seller terms and conditions. BookNest takes a 5% commission on successful sales.
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellBooks;
