// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setCartItems([...cartItems, { ...item, id: cartItems.length + 1 }]);
  }

  function removeFromCart(itemId) {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  }
  

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
