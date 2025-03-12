
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  BookOpen, 
  Upload, 
  CheckCircle2,
  CircleDollarSign,
  Truck,
  ShieldCheck
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const SellBooks = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(isLoggedIn ? 1 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    condition: "new",
    description: "",
    price: "",
    images: [] as File[]
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBookDetails({
        ...bookDetails,
        images: Array.from(e.target.files)
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setBookDetails({
      ...bookDetails,
      [name]: value
    });
  };
  
  const handleNextStep = () => {
    if (activeStep === 0 && !isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to list your books for sale.",
      });
      navigate("/login");
      return;
    }
    
    if (activeStep === 1) {
      // Validate book details
      if (!bookDetails.title || !bookDetails.author || !bookDetails.price) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all required fields.",
        });
        return;
      }
    }
    
    setActiveStep(activeStep + 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Book listed successfully",
        description: "Your book has been listed for sale on BookNest.",
      });
      
      setActiveStep(3); // Move to success step
      window.scrollTo(0, 0);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error listing your book. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to sell books on BookNest.
            </p>
            <Button 
              className="bg-booknest-600 hover:bg-booknest-700"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <p className="mt-4 text-sm">
              Don't have an account yet?{" "}
              <a href="/register" className="text-booknest-600 hover:underline">
                Create an Account
              </a>
            </p>
          </div>
        );
      
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Book Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Book Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter book title"
                    value={bookDetails.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    value={bookDetails.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN (optional)</Label>
                  <Input
                    id="isbn"
                    name="isbn"
                    placeholder="e.g., 978-3-16-148410-0"
                    value={bookDetails.isbn}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery & Thriller</SelectItem>
                      <SelectItem value="science-fiction">Science Fiction</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="biography">Biography</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="science">Science & Technology</SelectItem>
                      <SelectItem value="business">Business & Economics</SelectItem>
                      <SelectItem value="children">Children's Books</SelectItem>
                      <SelectItem value="textbooks">Textbooks</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Book Condition *</Label>
                <RadioGroup 
                  defaultValue="new"
                  onValueChange={(value) => handleSelectChange("condition", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="condition-new" />
                    <Label htmlFor="condition-new">New - Never been read, perfect condition</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="like-new" id="condition-like-new" />
                    <Label htmlFor="condition-like-new">Like New - Appears unread, no visible wear</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-good" id="condition-very-good" />
                    <Label htmlFor="condition-very-good">Very Good - Minimal wear, no markings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="condition-good" />
                    <Label htmlFor="condition-good">Good - Some wear, may have markings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="acceptable" id="condition-acceptable" />
                    <Label htmlFor="condition-acceptable">Acceptable - Visible wear, may have markings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rare" id="condition-rare" />
                    <Label htmlFor="condition-rare">Rare - Collectible, special edition, or out-of-print</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your book (condition details, edition, etc.)"
                  className="h-32"
                  value={bookDetails.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={bookDetails.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="images">Upload Images (Max 5)</Label>
                <div className="border-2 border-dashed border-muted rounded-md p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("images")?.click()}
                  >
                    Select Files
                  </Button>
                  {bookDetails.images.length > 0 && (
                    <div className="mt-4 text-sm">
                      {bookDetails.images.length} file(s) selected
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                type="button"
                className="bg-booknest-600 hover:bg-booknest-700"
                onClick={handleNextStep}
              >
                Continue to Shipping & Policies
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">Shipping & Policies</h2>
            <div className="space-y-6">
              <Tabs defaultValue="shipping">
                <TabsList className="mb-4">
                  <TabsTrigger value="shipping">Shipping Options</TabsTrigger>
                  <TabsTrigger value="policies">Seller Policies</TabsTrigger>
                </TabsList>
                
                <TabsContent value="shipping" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="standard-shipping" className="mt-1" defaultChecked />
                      <div>
                        <Label htmlFor="standard-shipping" className="font-medium">Standard Shipping</Label>
                        <p className="text-sm text-muted-foreground">
                          5-7 business days, $3.99 (buyer pays)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="expedited-shipping" className="mt-1" />
                      <div>
                        <Label htmlFor="expedited-shipping" className="font-medium">Expedited Shipping</Label>
                        <p className="text-sm text-muted-foreground">
                          2-3 business days, $8.99 (buyer pays)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="international-shipping" className="mt-1" />
                      <div>
                        <Label htmlFor="international-shipping" className="font-medium">International Shipping</Label>
                        <p className="text-sm text-muted-foreground">
                          7-14 business days, varies by country (buyer pays)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="free-shipping" className="mt-1" />
                      <div>
                        <Label htmlFor="free-shipping" className="font-medium">Free Shipping</Label>
                        <p className="text-sm text-muted-foreground">
                          Offer free shipping (you pay shipping costs)
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="policies" className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md bg-muted/20">
                      <h3 className="font-medium mb-2">Returns & Refunds</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        By listing on BookNest, you agree to our standard 14-day return policy for items not as described.
                      </p>
                      <div className="flex items-start space-x-2 mt-4">
                        <input type="checkbox" id="extended-returns" className="mt-1" />
                        <div>
                          <Label htmlFor="extended-returns" className="font-medium">Offer Extended Returns (Optional)</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow 30-day returns for any reason
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md bg-muted/20">
                      <h3 className="font-medium mb-2">Seller Guarantee</h3>
                      <p className="text-sm text-muted-foreground">
                        You certify that the book is authentic and in the condition described. 
                        Misrepresentation may result in penalties or account suspension.
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md bg-muted/20">
                      <h3 className="font-medium mb-2">Payment Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        BookNest handles payment processing and will deposit funds to your account 
                        after the buyer receives the item (typically 3 business days after delivery).
                        A 10% service fee applies to all sales.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="terms-agreement" className="mt-1" required />
                    <Label htmlFor="terms-agreement" className="text-sm">
                      I have read and agree to the <a href="/terms" className="text-booknest-600 hover:underline">Terms of Service</a> and 
                      <a href="/seller-guidelines" className="text-booknest-600 hover:underline"> Seller Guidelines</a>.
                    </Label>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-booknest-600 hover:bg-booknest-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Listing Book..." : "List Book for Sale"}
                </Button>
              </div>
            </div>
          </form>
        );
      
      case 3:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Book Listed Successfully!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Your book has been listed for sale on BookNest. You'll be notified when someone purchases your book.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-booknest-600 hover:bg-booknest-700"
                onClick={() => {
                  setActiveStep(1);
                  setBookDetails({
                    title: "",
                    author: "",
                    isbn: "",
                    category: "",
                    condition: "new",
                    description: "",
                    price: "",
                    images: []
                  });
                }}
              >
                List Another Book
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/account")}
              >
                View My Listings
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold">Sell Your Books</h1>
          <p className="text-muted-foreground mt-2">
            List your books for sale on BookNest and reach thousands of readers
          </p>
        </div>
      </div>
      
      <main className="container py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            {/* Steps indicator */}
            {isLoggedIn && (
              <div className="mb-8">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 1 ? "bg-booknest-600 text-white" : "bg-muted text-foreground"}`}>
                    1
                  </div>
                  <div className={`w-12 h-0.5 mx-2 ${activeStep >= 2 ? "bg-booknest-600" : "bg-muted"}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 2 ? "bg-booknest-600 text-white" : "bg-muted text-foreground"}`}>
                    2
                  </div>
                  <div className={`w-12 h-0.5 mx-2 ${activeStep >= 3 ? "bg-booknest-600" : "bg-muted"}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 3 ? "bg-booknest-600 text-white" : "bg-muted text-foreground"}`}>
                    3
                  </div>
                </div>
                <div className="flex text-xs mt-2">
                  <div className="w-8 text-center">Details</div>
                  <div className="flex-1"></div>
                  <div className="w-8 text-center">Policies</div>
                  <div className="flex-1"></div>
                  <div className="w-8 text-center">Done</div>
                </div>
              </div>
            )}
            
            {/* Step content */}
            <Card>
              <CardContent className="p-6">
                {renderStepContent()}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Why Sell on BookNest?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="flex gap-3">
                    <CircleDollarSign className="h-5 w-5 text-booknest-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Competitive Fees</h4>
                      <p className="text-xs text-muted-foreground">
                        Only 10% service fee, lower than most marketplaces
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <BookOpen className="h-5 w-5 text-booknest-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Book Enthusiast Community</h4>
                      <p className="text-xs text-muted-foreground">
                        Connect with readers who value your books
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Truck className="h-5 w-5 text-booknest-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Flexible Shipping</h4>
                      <p className="text-xs text-muted-foreground">
                        Choose your preferred shipping methods
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <ShieldCheck className="h-5 w-5 text-booknest-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Secure Payments</h4>
                      <p className="text-xs text-muted-foreground">
                        Payment processing and seller protection
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Selling Tips</CardTitle>
                  <CardDescription>Maximize your sales with these tips</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <p className="text-sm">
                    <span className="font-medium">Quality Photos</span> - Clear, well-lit images from multiple angles.
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Detailed Description</span> - Be honest about condition and include edition details.
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Fair Pricing</span> - Research similar listings to set competitive prices.
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Quick Shipping</span> - Ship promptly and provide tracking information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellBooks;
