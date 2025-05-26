'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Course } from '@/types/course';

export interface CartItem extends Omit<Course, 'id'> {
  id: string;
  quantity: number;
  price: number;
  title: string;
  image: string;
  duration: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  updateQuantity: (courseId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to parse cart', e);
          localStorage.removeItem('cart');
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (course: Course) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === course.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...course, quantity: 1 }];
    });
  };

  const removeFromCart = (courseId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(courseId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === courseId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
