import React, { useState, useEffect } from "react";
import logo from "/img/Steerline_Adil-UK_SuperX_CJ___Tommy_on_a_Date-removebg-preview.png";

const Navbar = () => {
  const shadowStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    transform: "translateY(0)",
    cursor: "pointer",
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSticky, setIsSticky] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleCart = () => setCartOpen((prev) => !prev);

  // Sample random products
  const sampleProducts = [
    {
      id: 1,
      name: "Custom Steering Wheel",
      price: 299.99,
      image: "/img/wheel.jpg",
    },
    {
      id: 2,
      name: "Carbon Fiber Shift Knob",
      price: 89.99,
      image: "/img/shift-knob.jpg",
    },
    {
      id: 3,
      name: "LED Headlights",
      price: 159.99,
      image: "/img/headlights.jpg",
    },
    {
      id: 4,
      name: "Performance Exhaust",
      price: 449.99,
      image: "/img/exhaust.jpg",
    },
    {
      id: 5,
      name: "Custom Seat Covers",
      price: 129.99,
      image: "/img/seat-covers.jpg",
    },
    { id: 6, name: "Window Tint Kit", price: 79.99, image: "/img/tint.jpg" },
  ];

  // Add random products to cart
  const addRandomToCart = () => {
    const randomCount = Math.floor(Math.random() * 3) + 1; // 1-3 random items
    const shuffled = [...sampleProducts].sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, randomCount);

    setCartItems(
      randomProducts.map((product) => ({
        ...product,
        quantity: Math.floor(Math.random() * 2) + 1, // 1-2 quantity
      }))
    );
  };

  // Detect screen resize for mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-add random products when cart opens
  useEffect(() => {
    if (cartOpen) {
      addRandomToCart();
    }
  }, [cartOpen]);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        position: isSticky ? "fixed" : "relative",
        top: isSticky ? 0 : "auto",
        width: "100%",
        background: "#fff",
        boxShadow: isSticky
          ? "0 4px 10px rgba(0,0,0,0.2)"
          : "0 2px 10px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        zIndex: 1200,
      }}
    >
      {/* HAMBURGER (Mobile only - LEFT SIDE) */}
      {isMobile && (
        <div
          className="hamburger"
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            order: 1, // Force to left side
          }}
        >
          <span
            style={{ width: "25px", height: "3px", background: "#000" }}
          ></span>
          <span
            style={{ width: "25px", height: "3px", background: "#000" }}
          ></span>
          <span
            style={{ width: "25px", height: "3px", background: "#000" }}
          ></span>
        </div>
      )}

      {/* LOGO */}
      <div
        className="logo"
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
          order: isMobile ? 2 : 1, // Adjust order for mobile
          marginLeft: isMobile ? "10px" : "0",
        }}
      >
        <a href="/">
          <img src={logo} alt="Control Customs Logo" height="50" />
        </a>
      </div>

      {/* DESKTOP NAV */}
      {!isMobile && (
        <nav style={{ order: 2 }}>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "30px",
              margin: 0,
              padding: 0,
            }}
          >
            {[
              "Home",
              "About us",
              "Design",
              "Realisations",
              "Partners",
              "Shop",
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={`/${item.toLowerCase().replace(" ", "")}`}
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* CART ICON */}
      <div
        className="cart-icon"
        onClick={toggleCart}
        style={{
          cursor: "pointer",
          order: 3,
          position: "relative",
          padding: "8px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.4 5.2 16.4H17M17 13V16.4M17 16.4C15.8 16.4 14.8 17.4 14.8 18.6C14.8 19.8 15.8 20.8 17 20.8C18.2 20.8 19.2 19.8 19.2 18.6C19.2 17.4 18.2 16.4 17 16.4ZM9 18.6C9 19.8 8 20.8 6.8 20.8C5.6 20.8 4.6 19.8 4.6 18.6C4.6 17.4 5.6 16.4 6.8 16.4C8 16.4 9 17.4 9 18.6Z"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {cartItems.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              background: "#ff4444",
              color: "white",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </div>

      {/* CTA Button */}
      {!isMobile && (
        <a href="#" className="cta" style={{ shadowStyle, order: 4 }}>
          Get A Quote
        </a>
      )}

      {/* MOBILE NAV SLIDE-IN MENU (FROM LEFT) */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: menuOpen ? 0 : "-100%", // Changed from right to left
            width: "70%",
            height: "100vh",
            background: "#fff",
            boxShadow: "2px 0 10px rgba(0,0,0,0.2)", // Shadow on right side now
            transition: "left 0.3s ease-in-out", // Changed from right to left
            display: "flex",
            flexDirection: "column",
            paddingTop: "80px",
            alignItems: "flex-start",
            paddingLeft: "30px",
            zIndex: 1200,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: 0,
              margin: 0,
            }}
          >
            {[
              "Home",
              "About us",
              "Design",
              "Realisations",
              "Partners",
              "Shop",
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={`/${item.toLowerCase().replace(" ", "")}`}
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CART SLIDE-IN */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: isMobile ? "100%" : "400px",
            height: "100vh",
            background: "#fff",
            boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
            transition: "right 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
            zIndex: 1400,
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            <h2>Shopping Cart ({cartItems.length})</h2>
            <button
              onClick={toggleCart}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: "10px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "#f5f5f5",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span>🛒</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                    <p style={{ margin: "0", color: "#666" }}>
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div style={{ fontWeight: "bold" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div
              style={{
                borderTop: "1px solid #eee",
                paddingTop: "15px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "15px",
                }}
              >
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* OVERLAY FOR MENU/CART */}
      {(menuOpen || cartOpen) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 1100,
          }}
          onClick={() => {
            setMenuOpen(false);
            setCartOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Navbar;
