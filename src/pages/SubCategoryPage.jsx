import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

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

const allProducts = {
  Keyrings: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Keyring ${i + 1}`,
    image: `/img/keychains/${10 + i}.png`,
    price: 9.99,
    discountPrice: "£9.99",
    originalPrice: "£14.99",
  })),
  Badges: [28, 29].map((num, i) => ({
    id: i + 1,
    name: `Badge ${num}`,
    image: `/img/badges/${num}.png`,
    price: 7.99,
    discountPrice: "£7.99",
    originalPrice: "£12.99",
  })),
  Diffusers: [1, 2, 3].map((num, i) => ({
    id: i + 1,
    name: `Diffuser ${num}`,
    image: `/img/Diffuser/${num}.png`,
    price: 14.99,
    discountPrice: "£14.99",
    originalPrice: "£19.99",
  })),
  Steering: [1, 2, 5, 6, 7, 8, 9, 10, 11].map((num, i) => ({
    id: i + 1,
    name: `Steering ${num}`,
    image: `/img/steeringwheels/${num}.jpg`,
    price: 24.99,
    discountPrice: "£24.99",
    originalPrice: "£34.99",
  })),
};

const SubcategoryPage = () => {
  const { subcategory } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColors, setSelectedColors] = useState({});
  const [quantities, setQuantities] = useState({});
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = allProducts[subcategory];

  // Handle resize for responsive layout
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize selected colors and quantities
  useEffect(() => {
    if (!products) return;

    const initialColors = {};
    const initialQuantities = {};

    products.forEach((product) => {
      if (subcategory === "Keyrings") {
        initialColors[product.id] = keyringVariants[0].id;
      } else if (subcategory === "Badges") {
        initialColors[product.id] = badgeVariants[0].id;
      } else if (subcategory === "Diffusers") {
        initialColors[product.id] = diffuserVariants[0].id;
      }
      initialQuantities[product.id] = 1;
    });

    setSelectedColors(initialColors);
    setQuantities(initialQuantities);
  }, [products, subcategory]);

  if (!products) {
    return (
      <div
        style={{
          backgroundColor: "#000",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <p style={{ fontSize: "24px" }}>Subcategory not found</p>
      </div>
    );
  }

  const getProductVariants = (subcategory) => {
    switch (subcategory) {
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
    const variants = getProductVariants(subcategory);
    return variants.find((v) => v.id === selectedColorId)?.name || "";
  };

  const handleColorChange = (productId, colorId, e) => {
    if (e) e.stopPropagation();
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorId,
    }));
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

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    if (!product) return;

    const selectedColorId = selectedColors[product.id];
    const productQuantity = quantities[product.id] || 1;

    let selectedColorName = "";
    if (subcategory === "Keyrings") {
      selectedColorName =
        keyringVariants.find((v) => v.id === selectedColorId)?.name ||
        "Dark Grey";
    } else if (subcategory === "Badges") {
      selectedColorName =
        badgeVariants.find((v) => v.id === selectedColorId)?.name ||
        "Full Black";
    } else if (subcategory === "Diffusers") {
      selectedColorName =
        diffuserVariants.find((v) => v.id === selectedColorId)?.name || "Black";
    } else if (subcategory === "Steering") {
      selectedColorName = "Default";
    }

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

    addToCart(cartItem);
  };

  const handleProductClick = (product, e) => {
    if (e) e.stopPropagation();
    navigate(`/subcategory/${subcategory}/detail`, {
      state: { product },
    });
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
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Page Title */}
        <h2
          style={{
            fontSize: isDesktop ? "42px" : "32px",
            fontWeight: "900",
            color: "#1187cf",
            marginBottom: "40px",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          {subcategory}
        </h2>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop
              ? "repeat(auto-fill, minmax(320px, 1fr))"
              : "1fr",
            gap: isDesktop ? "30px" : "20px",
            padding: isDesktop ? "0 20px" : "0",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                boxShadow:
                  hoveredProduct === product.id
                    ? "0 8px 25px rgba(17, 135, 207, 0.4)"
                    : "0 4px 12px rgba(255,255,255,0.1)",
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform:
                  hoveredProduct === product.id
                    ? "translateY(-8px)"
                    : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div
                onClick={(e) => handleProductClick(product, e)}
                style={{
                  width: "100%",
                  height: isDesktop ? "320px" : "280px",
                  backgroundColor: "#0a0a0a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "20px",
                  cursor: "pointer",
                  position: "relative",
                }}
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
                        ? "scale(1.08)"
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
                    fontSize: isDesktop ? "20px" : "18px",
                    fontWeight: "800",
                    color: "#fff",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleProductClick(product, e)}
                >
                  {product.name}
                </h3>

                {/* Price */}
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
                      fontSize: "22px",
                      fontWeight: "900",
                    }}
                  >
                    {product.discountPrice}
                  </strong>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#666",
                      fontSize: "15px",
                    }}
                  >
                    {product.originalPrice}
                  </span>
                </div>

                {/* Color Selection - Show only for products with variants */}
                {subcategory !== "Steering" && (
                  <div style={{ marginBottom: "20px" }}>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#ccc",
                        marginBottom: "10px",
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
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      {getProductVariants(subcategory).map((variant) => (
                        <div
                          key={variant.id}
                          onClick={(e) =>
                            handleColorChange(product.id, variant.id, e)
                          }
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: variant.color,
                            cursor: "pointer",
                            border:
                              selectedColors[product.id] === variant.id
                                ? "3px solid #1187cf"
                                : "2px solid #444",
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
                {subcategory !== "Steering" && (
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
                        fontSize: "12px",
                        color: "#ccc",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginRight: "5px",
                      }}
                    >
                      Qty:
                    </span>
                    <button
                      onClick={(e) => decreaseQuantity(product.id, e)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "6px",
                        border: "2px solid #2a2a2a",
                        backgroundColor: "#2a2a2a",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "18px",
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
                        fontSize: "16px",
                        minWidth: "25px",
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
                        width: "36px",
                        height: "36px",
                        borderRadius: "6px",
                        border: "2px solid #2a2a2a",
                        backgroundColor: "#2a2a2a",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "18px",
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

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: "#1187cf",
                    color: "#fff",
                    border: "none",
                    fontWeight: "800",
                    cursor: "pointer",
                    borderRadius: "8px",
                    letterSpacing: "1.5px",
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
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;
