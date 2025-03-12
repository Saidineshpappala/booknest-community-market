
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subTotal, itemCount } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to proceed to checkout");
      navigate("/login");
      return;
    }
    
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container py-12">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 mb-4 text-muted-foreground">
              <ShoppingCart className="w-16 h-16" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any books to your cart yet.
            </p>
            <Button 
              className="bg-booknest-600 hover:bg-booknest-700"
              onClick={() => navigate("/books")}
            >
              Browse Books
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Your Cart</h1>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCart}
                className="text-muted-foreground"
              >
                Clear cart
              </Button>
            </div>
            
            <div className="space-y-4">
              {items.map(item => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Book cover image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-36 overflow-hidden rounded">
                          <img 
                            src={item.cover} 
                            alt={item.title}
                            className="object-cover w-full h-full" 
                          />
                        </div>
                      </div>
                      
                      {/* Book details */}
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{item.author}</p>
                        <div className="mb-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-muted">
                            {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                          </span>
                        </div>
                        <div className="text-lg font-medium mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      
                      {/* Quantity controls and remove */}
                      <div className="flex sm:flex-col items-center justify-between gap-4">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="md:w-80">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items ({itemCount}):</span>
                      <span>${subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span>$4.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax:</span>
                      <span>${(subTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${(subTotal + 4.99 + (subTotal * 0.08)).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-booknest-600 hover:bg-booknest-700 mt-4"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate("/books")}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
