import React, { createContext, useContext, useState, useEffect } from "react";
import Toast from "../components/Toast/Toast";

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });
  const [toastMessage, setToastMessage] = useState(""); // ✅ for showing the toast
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add product to cart
  // CartContext.jsx
  const addToCart = (product) => {
    if (!product) return;

    // Get numeric price safely
    const priceNumber = product.discountPrice
      ? parseFloat(product.discountPrice.replace(/[£]/, "").trim())
      : parseFloat(product.originalPrice.replace(/[£]/, "").trim()) || 0;

    setCartItems((prev) => {
      // Check if same product + color exists
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id && item.selectedColor === product.selectedColor
      );

      if (existingIndex >= 0) {
        // Update quantity
        const updated = [...prev];
        updated[existingIndex].quantity += product.quantity; // use quantity from details
        return updated;
      }

      // Add new product
      return [...prev, { ...product, price: priceNumber }];
    });

    // Show toast
    setToastMessage("✅ Your product is added successfully!");
  };

  // ✅ Remove product
  const removeFromCart = (id) => {
    console.log("Remove from Cart:", id);

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // ✅ Calculate total
  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const closeToast = () => setToastMessage(""); // hide toast after timeout

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, calculateTotal }}
    >
      {children}
      {toastMessage && (
        <Toast message={toastMessage} onClose={closeToast} />
      )}{" "}
      {/* ✅ global toast */}
    </CartContext.Provider>
  );
};

// ✅ Hook for using cart anywhere
export const useCart = () => useContext(CartContext);
