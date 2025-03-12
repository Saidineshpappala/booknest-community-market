
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  quantity: number;
  condition: "new" | "used" | "rare";
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart data:", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems(prevItems => {
      // Check if item is already in cart
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Increment quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        toast.success(`Added another copy of "${item.title}" to your cart`);
        return updatedItems;
      } else {
        // Add new item with quantity 1
        toast.success(`Added "${item.title}" to your cart`);
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast.info(`Removed "${itemToRemove.title}" from your cart`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart has been cleared");
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subTotal = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
