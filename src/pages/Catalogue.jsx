import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../assets/css/Catalogue.css";
import { ShoppingCart } from "lucide-react";

const categories = {
  Catalogue: [
    {
      id: 1,
      name: "Keyrings",
      image: "/img/keychains/10.png",
      price: 9.99,
      discountPrice: "£9.99",
      originalPrice: "£14.99",
    },
    {
      id: 2,
      name: "Badges",
      image: "/img/accessories/28.png",
      price: 7.99,
      discountPrice: "£7.99",
      originalPrice: "£12.99",
    },
    {
      id: 3,
      name: "Diffusers",
      image: "/img/accessories/1.png",
      price: 14.99,
      discountPrice: "£14.99",
      originalPrice: "£19.99",
    },
    {
      id: 4,
      name: "Steering",
      image: "/img/before-and-after/before-after 1 (2).jpg",
      price: 24.99,
      discountPrice: "£24.99",
      originalPrice: "£34.99",
    },
  ],
};

// Color variants for different products
const keyringVariants = [
  { id: 1, color: "#2F2F2F", name: "Dark Grey" },
  { id: 2, color: "#FF3B3B", name: "Red" },
  { id: 3, color: "#1B3A52", name: "Navy Blue" },
  { id: 4, color: "#A8D5D5", name: "Light Blue" },
  { id: 5, color: "#D9D9D9", name: "Silver" },
  { id: 6, color: "#00FF00", name: "Green" },
  { id: 7, color: "#FFA500", name: "Orange" },
  { id: 8, color: "#CD7F32", name: "Bronze" },
];

const badgeVariants = [
  { id: 1, color: "#000000", name: "Full Black" },
  { id: 2, color: "#E6E6E6", name: "LT Black White" },
  { id: 3, color: "#FF0000", name: "Red Carbon" },
  { id: 4, color: "#1C1C1C", name: "Black Carbon" },
  { id: 5, color: "#003366", name: "Blue Carbon" },
];

const diffuserVariants = [
  { id: 1, color: "#000000", name: "Black" },
  { id: 2, color: "#FFFFFF", name: "White" },
  { id: 3, color: "#C0C0C0", name: "Silver" },
  { id: 4, color: "#FFD700", name: "Gold" },
];

const Catalogue = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, calculateTotal } = useCart();
  const [selectedColors, setSelectedColors] = useState({});
  const [quantities, setQuantities] = useState({});
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Handle resize for responsive layout
  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize selected colors and quantities for each product
  React.useEffect(() => {
    const initialColors = {};
    const initialQuantities = {};

    categories.Catalogue.forEach((product) => {
      // Set default colors
      if (product.name === "Keyrings") {
        initialColors[product.id] = keyringVariants[0].id;
      } else if (product.name === "Badges") {
        initialColors[product.id] = badgeVariants[0].id;
      } else if (product.name === "Diffusers") {
        initialColors[product.id] = diffuserVariants[0].id;
      }

      // Set default quantity for each product (always 1 for Steering)
      initialQuantities[product.id] = 1;
    });

    setSelectedColors(initialColors);
    setQuantities(initialQuantities);
  }, []);

  const handleExploreMore = (e) => {
    e.preventDefault();
    navigate("/accessories");
  };

  const handleImageClick = (product, e) => {
    // Prevent navigation if clicking on interactive elements
    if (e) {
      e.stopPropagation();
    }

    // Map product name to category and subcategory
    const productMapping = {
      Keyrings: { category: "accessories", subcategory: "Keyrings" },
      Badges: { category: "accessories", subcategory: "Badges" },
      Diffusers: { category: "accessories", subcategory: "Diffusers" },
      Steering: { category: "accessories", subcategory: "Steering" },
    };

    const mapping = productMapping[product.name];

    if (mapping) {
      console.log(
        "Navigating to:",
        mapping.category,
        "/",
        mapping.subcategory,
        "with product:",
        product
      );
      navigate(`/category/${mapping.category}/${mapping.subcategory}`, {
        state: { product },
      });
    }
  };

  const handleAddToCart = (product, e) => {
    // Prevent image click when clicking add to cart
    if (e) {
      e.stopPropagation();
    }

    if (!product) return;

    const selectedColorId = selectedColors[product.id];
    const productQuantity = quantities[product.id] || 1;

    // Get selected color name
    let selectedColorName = "";
    if (product.name === "Keyrings") {
      selectedColorName =
        keyringVariants.find((v) => v.id === selectedColorId)?.name ||
        "Dark Grey";
    } else if (product.name === "Badges") {
      selectedColorName =
        badgeVariants.find((v) => v.id === selectedColorId)?.name ||
        "Full Black";
    } else if (product.name === "Diffusers") {
      selectedColorName =
        diffuserVariants.find((v) => v.id === selectedColorId)?.name || "Black";
    } else if (product.name === "Steering") {
      selectedColorName = "Default";
    }

    // Parse price from discountPrice
    const priceNumber = parseFloat(
      (product.discountPrice || product.originalPrice || "0")
        .replace("£", "")
        .trim()
    );

    const cartItem = {
      ...product,
      price: priceNumber,
      quantity: productQuantity,
      selectedColor: selectedColorName,
    };

    console.log("Adding to cart:", cartItem);
    addToCart(cartItem);
  };

  const increaseQuantity = (productId, e) => {
    if (e) e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId, e) => {
    if (e) e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const handleColorChange = (productId, colorId, e) => {
    if (e) e.stopPropagation();
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorId,
    }));
  };

  const getProductVariants = (productName) => {
    switch (productName) {
      case "Keyrings":
        return keyringVariants;
      case "Badges":
        return badgeVariants;
      case "Diffusers":
        return diffuserVariants;
      default:
        return [];
    }
  };

  const getSelectedColorName = (product) => {
    const selectedColorId = selectedColors[product.id];
    const variants = getProductVariants(product.name);
    return variants.find((v) => v.id === selectedColorId)?.name || "";
  };

  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: isDesktop ? "40px 20px" : "20px 10px",
      }}
    >
      {/* Main Catalogue Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {Object.keys(categories).map((category) => (
          <div key={category}>
            <h2
              style={{
                fontSize: isDesktop ? "36px" : "28px",
                fontWeight: "900",
                color: "#1187cf",
                marginBottom: "30px",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {category}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isDesktop
                  ? "repeat(auto-fit, minmax(300px, 1fr))"
                  : "1fr",
                gap: isDesktop ? "30px" : "20px",
                padding: isDesktop ? "0 20px" : "0",
              }}
            >
              {categories[category].map((product) => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(17, 135, 207, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(255,255,255,0.1)";
                  }}
                >
                  {/* Product Image Container - CLICKABLE */}
                  <div
                    style={{
                      width: "100%",
                      height: isDesktop ? "300px" : "250px",
                      backgroundColor: "#0a0a0a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: "20px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={(e) => handleImageClick(product, e)}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                        transform:
                          hoveredProduct === product.id
                            ? "scale(1.05)"
                            : "scale(1)",
                      }}
                    />
                    {/* View Details Overlay */}
                    {hoveredProduct === product.id && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "20px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "rgba(17, 135, 207, 0.95)",
                          color: "#fff",
                          padding: "10px 20px",
                          borderRadius: "6px",
                          fontWeight: "700",
                          fontSize: "14px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          pointerEvents: "none",
                        }}
                      >
                        View Details
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: isDesktop ? "25px" : "20px" }}>
                    <h3
                      style={{
                        fontSize: isDesktop ? "22px" : "20px",
                        fontWeight: "800",
                        color: "#fff",
                        marginBottom: "12px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                      onClick={(e) => handleImageClick(product, e)}
                    >
                      {product.name}
                    </h3>

                    {/* Price Display */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "20px",
                      }}
                    >
                      <strong
                        style={{
                          color: "#1187cf",
                          fontSize: "24px",
                          fontWeight: "900",
                        }}
                      >
                        {product.discountPrice}
                      </strong>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#666",
                          fontSize: "16px",
                        }}
                      >
                        {product.originalPrice}
                      </span>
                    </div>

                    {/* Color Selection */}
                    {product.name !== "Steering" && (
                      <div style={{ marginBottom: "20px" }}>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#ccc",
                            marginBottom: "12px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Colour: {getSelectedColorName(product)}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          {getProductVariants(product.name).map((variant) => (
                            <div
                              key={variant.id}
                              onClick={(e) =>
                                handleColorChange(product.id, variant.id, e)
                              }
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: variant.color,
                                cursor: "pointer",
                                border:
                                  selectedColors[product.id] === variant.id
                                    ? "3px solid #1187cf"
                                    : "2px solid #ddd",
                                transition: "all 0.2s ease",
                                boxShadow:
                                  selectedColors[product.id] === variant.id
                                    ? "0 0 0 4px rgba(17, 135, 207, 0.2)"
                                    : "none",
                              }}
                              title={variant.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity Selector - Hidden for Steering */}
                    {product.name !== "Steering" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "20px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#ccc",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            marginRight: "8px",
                          }}
                        >
                          Quantity:
                        </span>
                        <button
                          onClick={(e) => decreaseQuantity(product.id, e)}
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "6px",
                            border: "2px solid #2a2a2a",
                            backgroundColor: "#2a2a2a",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#1187cf")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#2a2a2a")
                          }
                        >
                          -
                        </button>
                        <span
                          style={{
                            fontSize: "18px",
                            minWidth: "30px",
                            textAlign: "center",
                            color: "#fff",
                            fontWeight: "700",
                          }}
                        >
                          {quantities[product.id] || 1}
                        </span>
                        <button
                          onClick={(e) => increaseQuantity(product.id, e)}
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "6px",
                            border: "2px solid #2a2a2a",
                            backgroundColor: "#2a2a2a",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#1187cf")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#2a2a2a")
                          }
                        >
                          +
                        </button>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {/* ADD TO CART button */}
                      <button
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          backgroundColor: "#1187cf",
                          color: "#fff",
                          border: "none",
                          fontWeight: "700",
                          cursor: "pointer",
                          borderRadius: "8px",
                          letterSpacing: "1px",
                          fontSize: "14px",
                          textTransform: "uppercase",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#000";
                          e.target.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#1187cf";
                          e.target.style.transform = "scale(1)";
                        }}
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        style={{
                          width: "100%",
                          padding: "14px",
                          backgroundColor: "transparent",
                          color: "#1187cf",
                          border: "2px solid #1187cf",
                          fontWeight: "700",
                          cursor: "pointer",
                          borderRadius: "8px",
                          letterSpacing: "1px",
                          fontSize: "14px",
                          textTransform: "uppercase",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#1187cf";
                          e.target.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#1187cf";
                        }}
                        onClick={handleExploreMore}
                      >
                        Explore
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
