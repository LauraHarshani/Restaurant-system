import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("flame_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("flame_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) { return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i); }
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const removeFromCart = (id) => { setCart((prev) => prev.filter((i) => i.id !== id)); };
  const updateQty = (id, change) => { setCart((prev) => prev.map((item) => { if (item.id === id) { const newQty = item.qty + change; return newQty > 0 ? { ...item, qty: newQty } : item; } return item; })); };
  const clearCart = () => setCart([]);
  
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const subtotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, subtotal }}>{children}</CartContext.Provider>;
}

export function useCart() { return useContext(CartContext); }
