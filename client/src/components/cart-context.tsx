import { COUPON_CODE } from "@/constanst";
import React, { createContext, useContext, useState } from "react";

interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  subtotal?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  calculateSubTotal: () => number;
  calculatePurchase: (couponCode?: string) => number;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const value: string | null = localStorage.getItem("EXCLUSIVE_CART");
    return value ? JSON.parse(value) : [];
  });

  // ADD PRODUCT
  const addToCart = (item: CartItem) => {
    const isExistedProduct = cart?.find((p) => p.product === item.product);

    if (isExistedProduct) {
      const newCart = cart.map((cartItem) =>
        cartItem.product === item.product
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(newCart);
      localStorage.setItem("EXCLUSIVE_CART", JSON.stringify(newCart));
    } else {
      const newCart = [...cart, { ...item }];
      setCart(newCart);
      localStorage.setItem("EXCLUSIVE_CART", JSON.stringify(newCart));
    }
  };

  // INCREASE QUANTITY
  const increaseQuantity = (itemId: string) => {
    const newCart = cart.map((item) =>
      item.product === itemId
        ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price,
          }
        : item
    );
    setCart(newCart);
    localStorage.setItem("EXCLUSIVE_CART", JSON.stringify(newCart));
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (itemId: string) => {
    const newCart = cart
      .map((item) =>
        item.product === itemId
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (item.quantity - 1) * item.price,
            }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(newCart);
    localStorage.setItem("EXCLUSIVE_CART", JSON.stringify(newCart));
  };

  // CALCULATE TOTAL
  const calculateSubTotal = () => {
    const total = cart.reduce((total, item) => {
      if (item?.subtotal) {
        return total + item.subtotal;
      } else {
        return total + item.price;
      }
    }, 0);

    return total;
  };

  // CALCULATE PURCHASE
  const calculatePurchase = (couponCode?: string) => {
    const subtotal = calculateSubTotal();

    let discount = 0;
    if (couponCode === COUPON_CODE) {
      discount = subtotal * 0.05;
    }

    const total = subtotal + 10 - discount;

    return total;
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("EXCLUSIVE_CART");
  };

  const value: CartContextType = {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    calculateSubTotal,
    calculatePurchase,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
