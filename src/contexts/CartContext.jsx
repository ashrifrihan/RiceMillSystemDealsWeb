import React, { createContext, useState, useContext } from 'react';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({
  children
}) => {
  const [items, setItems] = useState([]);
  const addItem = (product, quantity) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item => item.product.id === product.id ? {
          ...item,
          quantity: item.quantity + quantity
        } : item);
      } else {
        return [...prevItems, {
          product,
          quantity
        }];
      }
    });
  };
  const removeItem = productId => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prevItems => prevItems.map(item => item.product.id === productId ? {
      ...item,
      quantity
    } : item));
  };
  const clearCart = () => {
    setItems([]);
  };
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};