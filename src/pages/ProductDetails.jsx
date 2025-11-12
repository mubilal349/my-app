import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Heart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../context/CartContext"; // Import CartContext

const ProductDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  // const [showNotification, setShowNotification] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  // Use CartContext instead of local state
  const { cartItems, addToCart, removeFromCart, calculateTotal } = useCart();

  // Color variants for different products
  const productVariants_1 = [
    { id: 1, color: "#2F2F2F", name: "Dark Grey" },
    { id: 2, color: "#FF3B3B", name: "Red" },
    { id: 3, color: "#1B3A52", name: "Navy Blue" },
    { id: 4, color: "#A8D5D5", name: "Light Blue" },
    { id: 5, color: "#D9D9D9", name: "Silver" },
    { id: 6, color: "#00FF00", name: "Green" },
    { id: 7, color: "#FFA500", name: "Orange" },
    { id: 8, color: "#CD7F32", name: "Bronze" },
  ];

  const productVariants_2 = [
    { id: 1, color: "#000000", name: "Full Black" },
    { id: 2, color: "#E6E6E6", name: "LT Black White" },
    { id: 3, color: "#FF0000", name: "Red Carbon" },
    { id: 4, color: "#1C1C1C", name: "Black Carbon" },
    { id: 5, color: "#003366", name: "Blue Carbon" },
  ];

  const productVariants_single = [{ id: 1, color: "#000000", name: "Black" }];
  const productVariants_13 = [
    { id: 1, color: "#F7C948", name: "Warm Golden Yellow" },
    { id: 2, color: "#FFF44F", name: "Lemon" },
  ];

  // Determine current variants based on product ID
  const currentVariants = selectedProduct
    ? selectedProduct.id === 3 ||
      selectedProduct.id === 2 ||
      selectedProduct.id === 4 ||
      selectedProduct.id === 5 ||
      selectedProduct.id === 6 ||
      selectedProduct.id === 7 ||
      selectedProduct.id === 8 ||
      selectedProduct.id === 9
      ? productVariants_2
      : selectedProduct.id === 32 ||
        selectedProduct.id === 33 ||
        selectedProduct.id === 35 ||
        selectedProduct.id === 36 ||
        selectedProduct.id === 41 ||
        selectedProduct.id === 42 ||
        selectedProduct.id === 43 ||
        selectedProduct.id === 46 ||
        selectedProduct.id === 47 ||
        selectedProduct.id === 48 ||
        selectedProduct.id === 49 ||
        selectedProduct.id === 50 ||
        selectedProduct.id === 51 ||
        selectedProduct.id === 52 ||
        selectedProduct.id === 53 ||
        selectedProduct.id === 54
      ? productVariants_single
      : selectedProduct.id === 13 || selectedProduct.id === 14
      ? productVariants_13
      : productVariants_1
    : productVariants_1;

  // Handle resize for responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load products from JSON
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  // Set selected product and related products
  useEffect(() => {
    if (!data || !data.categories) return;

    const category = data.categories.find((cat) =>
      cat.products.some((p) => p.id === parseInt(id))
    );

    if (!category) return;

    const mainProduct = category.products.find((p) => p.id === parseInt(id));
    setSelectedProduct(mainProduct);
    setSelectedColor(1); // Set default color

    // Get all products from the same category except the current product
    const categoryProducts = category.products.filter(
      (p) => p.id !== mainProduct.id
    );

    // If there are more than 4 products, show 4 random ones
    // Otherwise, show all of them
    let productsToShow = [];

    if (categoryProducts.length > 0) {
      if (categoryProducts.length > 4) {
        // Shuffle and take first 4
        productsToShow = [...categoryProducts]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
      } else {
        // Show all products from this category
        productsToShow = [...categoryProducts];
      }
    }

    setRandomProducts(productsToShow);
  }, [data, id]);

  // Get category description
  const selectedCategory = data?.categories?.find((cat) =>
    cat.products?.some((prod) => prod.id === selectedProduct?.id)
  );
  const categoryDescription = selectedCategory?.description || "";

  // Check if the product is from steering wheel category
  const isSteeringWheel = selectedCategory?.id === "steeringwheel";

  // Updated addToCart function using CartContext
  const handleAddToCart = (item, itemQuantity = 1) => {
    const priceNumber = parseFloat(
      (item.discountPrice || item.originalPrice || "0").replace("£", "").trim()
    );

    const newItem = {
      ...item,
      quantity: isSteeringWheel ? 1 : itemQuantity, // Always set quantity to 1 for steering wheels
      selectedColor:
        currentVariants.find((c) => c.id === selectedColor)?.name ||
        currentVariants[0]?.name,
      price: priceNumber,
    };

    addToCart(newItem); // Use CartContext's addToCart
  };

  const toggleWishlist = (itemId) => {
    setWishlist((prev) =>
      prev.includes(itemId)
        ? prev.filter((item) => item !== itemId)
        : [...prev, itemId]
    );
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!data || !selectedProduct) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#000",
          fontSize: "18px",
          color: "#fff",
        }}
      >
        Loading...
      </div>
    );
  }

  // Generate multiple images if product has only one (for gallery effect)
  const productImages = selectedProduct.image
    ? [selectedProduct.image, selectedProduct.image, selectedProduct.image]
    : [];

  // Calculate discount percentage
  const originalPrice = parseFloat(
    selectedProduct.originalPrice?.replace("£", "") || 0
  );
  const discountPrice = parseFloat(
    selectedProduct.discountPrice?.replace("£", "") || 0
  );
  const discountPercent =
    originalPrice > 0
      ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
      : 0;

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#000",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      {/* Cart Badge - using cartItems from CartContext */}
      <div
        style={{
          position: "fixed",
          top: isMobile ? "10px" : "20px",
          right: isMobile ? "10px" : "20px",
          zIndex: 999,
        }}
      ></div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "60px 16px 20px" : "40px 20px",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            marginBottom: isMobile ? "20px" : "30px",
            fontSize: isMobile ? "12px" : "14px",
            color: "#9ca3af",
          }}
        >
          <span>Home</span> /{" "}
          <span>{selectedCategory?.name || "Products"}</span> /{" "}
          <span style={{ color: "#fff" }}>{selectedProduct.title}</span>
        </div>

        {/* Main Product Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "40px",
            backgroundColor: "#1a1a1a",
            padding: isMobile ? "20px" : "40px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(255,255,255,0.05)",
          }}
        >
          {/* Image Gallery */}
          <div>
            <div
              style={{
                position: "relative",
                marginBottom: isMobile ? "12px" : "20px",
              }}
            >
              <img
                src={productImages[selectedImage] || selectedProduct.image}
                alt={selectedProduct.title}
                style={{
                  width: "100%",
                  height: isMobile ? "300px" : "500px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "1px solid #333",
                }}
              />
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                style={{
                  position: "absolute",
                  top: isMobile ? "12px" : "20px",
                  right: isMobile ? "12px" : "20px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  border: "1px solid #333",
                  borderRadius: "50%",
                  width: isMobile ? "36px" : "44px",
                  height: isMobile ? "36px" : "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Heart
                  size={isMobile ? 18 : 20}
                  fill={
                    wishlist.includes(selectedProduct.id) ? "#ef4444" : "none"
                  }
                  color={
                    wishlist.includes(selectedProduct.id) ? "#ef4444" : "#fff"
                  }
                />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1
              style={{
                fontSize: isMobile ? "24px" : "32px",
                fontWeight: "700",
                marginBottom: "12px",
                color: "#fff",
              }}
            >
              {selectedProduct.title}
            </h1>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={isMobile ? 16 : 18}
                    fill={i < 4 ? "#fbbf24" : "none"}
                    color="#fbbf24"
                  />
                ))}
              </div>
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: isMobile ? "12px" : "14px",
                }}
              >
                4.5 (128 reviews)
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "12px" : "16px",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? "28px" : "36px",
                  fontWeight: "700",
                  color: "#3b82f6",
                }}
              >
                {selectedProduct.discountPrice}
              </span>
              {selectedProduct.originalPrice && (
                <>
                  <span
                    style={{
                      fontSize: isMobile ? "18px" : "24px",
                      color: "#6b7280",
                      textDecoration: "line-through",
                    }}
                  >
                    {selectedProduct.originalPrice}
                  </span>
                  {discountPercent > 0 && (
                    <span
                      style={{
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: isMobile ? "12px" : "14px",
                        fontWeight: "600",
                      }}
                    >
                      {discountPercent}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Stock Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
                color: "#10b981",
                fontSize: isMobile ? "13px" : "14px",
                fontWeight: "500",
              }}
            >
              <Check size={isMobile ? 16 : 18} />
              <span>In Stock - Ready to Ship</span>
            </div>

            {/* Color Selection */}
            {currentVariants.length > 0 && (
              <div style={{ marginBottom: "28px" }}>
                <p
                  style={{
                    fontSize: isMobile ? "13px" : "14px",
                    fontWeight: "600",
                    color: "#fff",
                    marginBottom: "12px",
                  }}
                >
                  COLOR:{" "}
                  {currentVariants.find((v) => v.id === selectedColor)?.name ||
                    currentVariants[0]?.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: isMobile ? "8px" : "12px",
                    flexWrap: "wrap",
                  }}
                >
                  {currentVariants.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedColor(variant.id)}
                      style={{
                        width: isMobile ? "40px" : "48px",
                        height: isMobile ? "40px" : "48px",
                        borderRadius: "8px",
                        backgroundColor: variant.color,
                        cursor: "pointer",
                        border:
                          selectedColor === variant.id
                            ? "3px solid #3b82f6"
                            : "2px solid #333",
                        boxShadow:
                          selectedColor === variant.id
                            ? "0 0 0 4px rgba(59, 130, 246, 0.1)"
                            : "none",
                        transition: "all 0.2s",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title={variant.name}
                    >
                      {selectedColor === variant.id && (
                        <Check
                          size={isMobile ? 16 : 20}
                          color="white"
                          style={{
                            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity - Only show if not a steering wheel */}
            {!isSteeringWheel && (
              <div style={{ marginBottom: "28px" }}>
                <p
                  style={{
                    fontSize: isMobile ? "13px" : "14px",
                    fontWeight: "600",
                    color: "#fff",
                    marginBottom: "12px",
                  }}
                >
                  QUANTITY
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <button
                    onClick={decreaseQuantity}
                    style={{
                      width: isMobile ? "40px" : "44px",
                      height: isMobile ? "40px" : "44px",
                      borderRadius: "8px",
                      border: "1px solid #333",
                      backgroundColor: "#1a1a1a",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#2a2a2a")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#1a1a1a")
                    }
                  >
                    <Minus size={18} color="#fff" />
                  </button>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      minWidth: "40px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    style={{
                      width: isMobile ? "40px" : "44px",
                      height: isMobile ? "40px" : "44px",
                      borderRadius: "8px",
                      border: "1px solid #333",
                      backgroundColor: "#1a1a1a",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#2a2a2a")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#1a1a1a")
                    }
                  >
                    <Plus size={18} color="#fff" />
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button - using handleAddToCart from CartContext */}
            <button
              onClick={() => handleAddToCart(selectedProduct, quantity)}
              style={{
                width: "100%",
                padding: isMobile ? "14px" : "16px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: isMobile ? "15px" : "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                transition: "all 0.2s",
                marginBottom: "16px",
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
              <ShoppingCart size={20} />
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div
          style={{
            marginTop: isMobile ? "24px" : "40px",
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            padding: isMobile ? "20px" : "30px",
            boxShadow: "0 2px 8px rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: isMobile ? "20px" : "30px",
              borderBottom: "2px solid #333",
              marginBottom: isMobile ? "20px" : "30px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setActiveTab("description")}
              style={{
                padding: isMobile ? "10px 0" : "12px 0",
                backgroundColor: "transparent",
                border: "none",
                borderBottom:
                  activeTab === "description" ? "3px solid #3b82f6" : "none",
                color: activeTab === "description" ? "#3b82f6" : "#9ca3af",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "uppercase",
                marginBottom: "-2px",
              }}
            >
              DESCRIPTION
            </button>
          </div>

          {activeTab === "description" && (
            <div
              style={{
                color: "#d1d5db",
                lineHeight: "1.8",
                fontSize: isMobile ? "14px" : "15px",
              }}
            >
              <p>
                {categoryDescription ||
                  selectedProduct.description ||
                  "High-quality product designed for performance and style. Perfect for enhancing your driving experience with superior comfort and durability."}
              </p>
            </div>
          )}
        </div>

        {/* Related Products - Buyers Also Bought */}
        {randomProducts.length > 0 && (
          <div style={{ marginTop: isMobile ? "40px" : "60px" }}>
            <h2
              style={{
                fontSize: isMobile ? "22px" : "28px",
                fontWeight: "700",
                marginBottom: isMobile ? "20px" : "30px",
                color: "#fff",
              }}
            >
              Buyers Also Bought
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : isTablet
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: isMobile ? "16px" : "24px",
              }}
            >
              {randomProducts.map((item) => {
                const itemPrice = parseFloat(
                  (item.discountPrice || item.originalPrice || "0")
                    .replace("£", "")
                    .trim()
                );

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(255,255,255,0.05)",
                      transition: "all 0.3s",
                      cursor: "pointer",
                      position: "relative",
                      border: "1px solid #333",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 16px rgba(59, 130, 246, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(255,255,255,0.05)";
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        height: isMobile ? "250px" : "240px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#0a0a0a",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: isMobile ? "contain" : "cover",
                          transition: "transform 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                        }}
                      />
                    </div>
                    <div
                      style={{
                        padding: isMobile ? "16px" : "20px",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: isMobile ? "15px" : "16px",
                          fontWeight: "600",
                          marginBottom: "12px",
                          color: "#fff",
                          minHeight: isMobile ? "36px" : "40px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                          marginTop: "auto",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: isMobile ? "18px" : "20px",
                              fontWeight: "700",
                              color: "#3b82f6",
                            }}
                          >
                            {item.discountPrice}
                          </span>
                          {item.originalPrice && (
                            <span
                              style={{
                                fontSize: isMobile ? "13px" : "14px",
                                color: "#6b7280",
                                textDecoration: "line-through",
                              }}
                            >
                              {item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item, 1);
                        }}
                        style={{
                          width: "100%",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: isMobile ? "10px 16px" : "12px 16px",
                          cursor: "pointer",
                          fontSize: isMobile ? "13px" : "14px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "all 0.2s",
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
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
