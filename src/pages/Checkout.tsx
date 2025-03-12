
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CreditCard, Check } from "lucide-react";

type CheckoutStep = "shipping" | "payment" | "confirmation";

const Checkout = () => {
  const { items, subTotal, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Shipping form state
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });
  
  // Payment form state
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    paymentMethod: "credit-card"
  });

  // Handle shipping form input changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle payment form input changes
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  // Proceed to next step
  const proceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo(0, 0);
  };

  // Handle payment submission
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep("confirmation");
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Complete order and return to home
  const completeOrder = () => {
    clearCart();
    toast.success("Your order has been placed successfully!");
    navigate("/");
  };

  // Calculate totals
  const shipping = 4.99;
  const tax = subTotal * 0.08;
  const total = subTotal + shipping + tax;

  // Not logged in - redirect to login
  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  // Empty cart - redirect to books
  if (items.length === 0) {
    navigate("/books");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-muted/20">
        <div className="container py-8">
          {/* Checkout steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "shipping" || step === "payment" || step === "confirmation" ? "bg-booknest-600 text-white" : "bg-muted text-foreground"}`}>
                1
              </div>
              <div className="text-sm font-medium ml-2">Shipping</div>
            </div>
            <div className={`w-16 h-0.5 mx-2 ${step === "payment" || step === "confirmation" ? "bg-booknest-600" : "bg-muted"}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "payment" || step === "confirmation" ? "bg-booknest-600 text-white" : "bg-muted text-foreground"}`}>
                2
              </div>
              <div className="text-sm font-medium ml-2">Payment</div>
            </div>
            <div className={`w-16 h-0.5 mx-2 ${step === "confirmation" ? "bg-booknest-600" : "bg-muted"}`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "confirmation" ? "bg-booknest-600 text-white" : "bg-muted text-foreground"}`}>
                3
              </div>
              <div className="text-sm font-medium ml-2">Confirmation</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              {/* Shipping Information */}
              {step === "shipping" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                    <form onSubmit={proceedToPayment}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={shippingDetails.fullName}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={shippingDetails.email}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={shippingDetails.address}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={shippingDetails.city}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State / Province</Label>
                          <Input
                            id="state"
                            name="state"
                            value={shippingDetails.state}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={shippingDetails.zipCode}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            name="country"
                            value={shippingDetails.country}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-8">
                        <Button type="submit" className="w-full bg-booknest-600 hover:bg-booknest-700">
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Payment Information */}
              {step === "payment" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                    <form onSubmit={handlePaymentSubmit}>
                      <RadioGroup 
                        value={paymentDetails.paymentMethod}
                        onValueChange={(value) => setPaymentDetails(prev => ({ ...prev, paymentMethod: value }))}
                        className="mb-6"
                      >
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit / Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-4 rounded-md mt-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                      </RadioGroup>

                      {paymentDetails.paymentMethod === "credit-card" && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              value={paymentDetails.cardName}
                              onChange={handlePaymentChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={paymentDetails.cardNumber}
                              onChange={handlePaymentChange}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiration">Expiration Date</Label>
                              <Input
                                id="expiration"
                                name="expiration"
                                placeholder="MM/YY"
                                value={paymentDetails.expiration}
                                onChange={handlePaymentChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                type="password"
                                placeholder="123"
                                value={paymentDetails.cvv}
                                onChange={handlePaymentChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-4 mt-8">
                        <Button
                          type="button" 
                          variant="outline"
                          onClick={() => setStep("shipping")}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1 bg-booknest-600 hover:bg-booknest-700"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Place Order"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Order Confirmation */}
              {step === "confirmation" && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
                    <p className="text-muted-foreground mb-8">
                      Thank you for your order. Your order number is #BN{Math.floor(100000 + Math.random() * 900000)}.
                    </p>
                    
                    <div className="text-left mb-8">
                      <h3 className="font-semibold mb-2">Shipping Address:</h3>
                      <p>{shippingDetails.fullName}</p>
                      <p>{shippingDetails.address}</p>
                      <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
                      <p>{shippingDetails.country}</p>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      We've sent a confirmation email to {shippingDetails.email} with your order details.
                    </p>
                    
                    <Button 
                      onClick={completeOrder}
                      className="bg-booknest-600 hover:bg-booknest-700"
                    >
                      Return to Home
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                      {items.map(item => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-12 h-16 overflow-hidden rounded flex-shrink-0">
                            <img 
                              src={item.cover} 
                              alt={item.title}
                              className="object-cover w-full h-full" 
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="text-sm font-medium line-clamp-1">{item.title}</div>
                            <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                            <div className="text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span>${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping:</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax:</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
