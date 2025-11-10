import React, { useState, useEffect } from "react";
import logo from "/img/Steerline_Adil-UK_SuperX_CJ___Tommy_on_a_Date-removebg-preview.png";
import { Menu, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems, addToCart, removeFromCart, calculateTotal } = useCart(); // ✅ works now
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

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleCart = () => setCartOpen((prev) => !prev);

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
            gap: "3px",
            order: 1,
            padding: "4px",
          }}
        >
          {menuOpen ? (
            <X size={22} color="#000" />
          ) : (
            <Menu size={22} color="#000" />
          )}
        </div>
      )}

      {/* LOGO */}
      <div
        className="logo"
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
          width: "18%",
          order: isMobile ? 2 : 1, // Adjust order for mobile
          marginLeft: isMobile ? "10px" : "0",
        }}
      >
        <Link to="/">
          <img src={logo} alt="Control Customs Logo" height="50" />
        </Link>
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
              "Design my wheel",
              "Realisations",
              "Catalogue",
              "Accessories",
              "Shop now",
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={
                    item.toLowerCase() === "home"
                      ? "/"
                      : item.toLowerCase() === "design my wheel"
                      ? "/customization" // 👈 special route
                      : `/${item.toLowerCase().replace(/\s+/g, "")}`
                  }
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {item}
                </Link>
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
        <a
          href="https://wa.me/447598863458"
          target="_blank"
          rel="noopener noreferrer"
          className="cta"
          style={{ shadowStyle, order: 4 }}
        >
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
              "Design my wheel",
              "Realisations",
              "Catalogue",
              "Accessories",
              "Shop now",
              "About us",
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={
                    item.toLowerCase() === "home"
                      ? "/"
                      : item.toLowerCase() === "design my wheel"
                      ? "/customization" // 👈 special route
                      : `/${item.toLowerCase().replace(/\s+/g, "")}`
                  }
                  onClick={() => setMenuOpen(false)} // 👈 CLOSE MENU ON CLICK
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {item}
                </Link>
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
                    alignItems: "center",
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4>
                    <p style={{ margin: 0, color: "#666" }}>
                      £{item.price} x {item.quantity}
                    </p>
                  </div>

                  {/* Subtotal */}
                  <div style={{ fontWeight: "bold" }}>
                    £{item.price * item.quantity}
                    {/* DELETE ICON */}
                    <Trash2
                      size={18}
                      color="#ff4444"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFromCart(item.id)}
                    />
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
                  background: "#111111",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                onClick={() => {
                  const whatsappNumber = "447598863458"; // ✅ no "+" or spaces

                  // ✅ Message header
                  let message =
                    "Hello, I want to order the following items from my cart.%0A%0A";

                  // ✅ Add all cart items with image + name + price
                  message += cartItems
                    .map(
                      (item, index) =>
                        `${index + 1}. ${item.title}%0A💰 Price: ${
                          item.discountPrice
                        }%0A`
                    )

                    .join("%0A");

                  // ✅ Add total at the end
                  message += `%0A----------------------%0A💵 Total: $${calculateTotal()}`;

                  // ✅ Open WhatsApp
                  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
                  window.open(whatsappURL, "_blank");
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
