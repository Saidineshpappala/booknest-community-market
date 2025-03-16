
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Science",
  "Self-Help",
  "Children's",
  "Young Adult",
  "Poetry",
  "Reference",
  "Art & Photography",
  "Cookbooks",
];

const conditions = [
  "Brand New",
  "Like New",
  "Very Good",
  "Good",
  "Acceptable",
];

const SellBooks = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      // Create preview URLs
      const newImageUrls = selectedFiles.map(file => URL.createObjectURL(file));
      
      setImages(prev => [...prev, ...selectedFiles]);
      setImageUrls(prev => [...prev, ...newImageUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imageUrls[index]);
    
    setImageUrls(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!bookTitle.trim() || !author.trim() || !price.trim() || !category || !condition || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image of your book",
        variant: "destructive",
      });
      return;
    }
    
    // Submit logic would go here
    // For now, just show a success message
    toast({
      title: "Book Listed Successfully!",
      description: "Your book has been listed for sale.",
      variant: "default",
    });
    
    // Reset form
    setBookTitle("");
    setAuthor("");
    setPrice("");
    setCategory("");
    setCondition("");
    setDescription("");
    setImages([]);
    setImageUrls([]);
    
    // Navigate to home or listings page
    navigate("/");
  };

  const triggerFileInput = () => {
    // Use optional chaining to avoid errors if ref is null
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Sell Your Books</h1>
          <p className="text-muted-foreground mb-8">List your pre-loved books for sale on our marketplace.</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Book Details</CardTitle>
              <CardDescription>Provide information about the book you want to sell.</CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bookTitle">Book Title *</Label>
                    <Input 
                      id="bookTitle" 
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      placeholder="Enter the book title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input 
                      id="author" 
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author's name"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input 
                      id="price" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                      placeholder="0.00"
                      type="text"
                      inputMode="decimal"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={condition} onValueChange={setCondition} required>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((cond) => (
                          <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the book's condition, edition, any marks or highlights, etc."
                    rows={5}
                    required
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Book Images *</Label>
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept="image/*" 
                      multiple
                      onChange={handleFileChange}
                    />
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">
                      Click to upload images of your book<br />
                      <span className="text-xs">
                        Include front cover, back cover, and any notable details
                      </span>
                    </p>
                  </div>
                  
                  {imageUrls.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative group aspect-square">
                          <img 
                            src={url} 
                            alt={`Book image ${index + 1}`}
                            className="rounded-lg object-cover w-full h-full"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit">List Book for Sale</Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-8 bg-muted rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Selling Guidelines</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Be honest about the book's condition - describe any damage, highlights, or wear.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Price your books competitively by checking similar listings.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Include clear, well-lit images of your book from multiple angles.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Respond promptly to buyer inquiries to increase your chances of a sale.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Ship books within 2 business days of receiving payment.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellBooks;

