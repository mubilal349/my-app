import React, { useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
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

const productDetails = {
  Keyrings: {
    slider: [
      "/img/keychains/26.png",
      "/img/keychains/22.png",
      "/img/keychains/14.png",
    ],
    description:
      "These keyrings are high-quality, durable, and stylish. Perfect for gifting or personal use. Add a touch of personality to your keys or accessories.",
    price: 9.99,
    discountPrice: "£9.99",
    originalPrice: "£14.99",
    related: [
      {
        image: "/img/keychains/15.png",
        name: "Keyring 15",
        id: 15,
        discountPrice: "£9.99",
        originalPrice: "£14.99",
      },
      {
        image: "/img/keychains/16.png",
        name: "Keyring 16",
        id: 16,
        discountPrice: "£9.99",
        originalPrice: "£14.99",
      },
      {
        image: "/img/keychains/17.png",
        name: "Keyring 17",
        id: 17,
        discountPrice: "£9.99",
        originalPrice: "£14.99",
      },
    ],
  },
  Badges: {
    slider: ["/img/badges/29.png", "/img/badges/28.png", "/img/badges/29.png"],
    description:
      "Custom badges to show off your style. Ideal for jackets, bags, and accessories.",
    price: 7.99,
    discountPrice: "£7.99",
    originalPrice: "£12.99",
    related: [
      {
        image: "/img/badges/29.png",
        name: "Badge 5",
        id: 5,
        discountPrice: "£7.99",
        originalPrice: "£12.99",
      },
      {
        image: "/img/badges/28.png",
        name: "Badge 4",
        id: 4,
        discountPrice: "£7.99",
        originalPrice: "£12.99",
      },
      {
        image: "/img/badges/29.png",
        name: "Badge 6",
        id: 6,
        discountPrice: "£7.99",
        originalPrice: "£12.99",
      },
    ],
  },
  Diffusers: {
    slider: [
      "/img/images/diffuser.png",
      "/img/Diffuser/1.png",
      "/img/Diffuser/2.png",
    ],
    description:
      "Aromatic diffusers for home or office. Eco-friendly and long-lasting scents.",
    price: 14.99,
    discountPrice: "£14.99",
    originalPrice: "£19.99",
    related: [
      {
        image: "/img/Diffuser/1.png",
        name: "Diffuser 1",
        id: 1,
        discountPrice: "£14.99",
        originalPrice: "£19.99",
      },
      {
        image: "/img/Diffuser/2.png",
        name: "Diffuser 2",
        id: 2,
        discountPrice: "£14.99",
        originalPrice: "£19.99",
      },
      {
        image: "/img/Diffuser/3.png",
        name: "Diffuser 3",
        id: 3,
        discountPrice: "£14.99",
        originalPrice: "£19.99",
      },
    ],
  },
  Steering: {
    slider: [
      "/img/steeringwheels/10.jpg",
      "/img/steeringwheels/9.jpg",
      "/img/steeringwheels/11.jpg",
    ],
    description:
      "Premium steering wheels for comfort and style. Upgrade your driving experience.",
    price: 24.99,
    discountPrice: "£24.99",
    originalPrice: "£34.99",
    related: [
      {
        image: "/img/steeringwheels/8.jpg",
        name: "Steering Wheel 8",
        id: 8,
        discountPrice: "£24.99",
        originalPrice: "£34.99",
      },
      {
        image: "/img/steeringwheels/6.jpg",
        name: "Steering Wheel 6",
        id: 6,
        discountPrice: "£24.99",
        originalPrice: "£34.99",
      },
      {
        image: "/img/steeringwheels/5.jpg",
        name: "Steering Wheel 5",
        id: 5,
        discountPrice: "£24.99",
        originalPrice: "£34.99",
      },
    ],
  },
};

const SubcategoryDetail = () => {
  const { subcategory } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const data = productDetails[subcategory];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [hoveredRelated, setHoveredRelated] = useState(null);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Manual slide controls
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.slider.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.slider.length - 1 ? 0 : prev + 1));
  };

  // Auto-play slider
  useEffect(() => {
    if (!data) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentSlide, data]);

  if (!data) {
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

  const currentVariants = getProductVariants(subcategory);

  const getSelectedColorName = () => {
    return currentVariants.find((v) => v.id === selectedColor)?.name || "";
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    const priceNumber = parseFloat(
      (data.discountPrice || data.originalPrice || "0").replace("£", "").trim()
    );

    let selectedColorName = "";
    if (subcategory === "Keyrings") {
      selectedColorName =
        keyringVariants.find((v) => v.id === selectedColor)?.name ||
        "Dark Grey";
    } else if (subcategory === "Badges") {
      selectedColorName =
        badgeVariants.find((v) => v.id === selectedColor)?.name || "Full Black";
    } else if (subcategory === "Diffusers") {
      selectedColorName =
        diffuserVariants.find((v) => v.id === selectedColor)?.name || "Black";
    } else if (subcategory === "Steering") {
      selectedColorName = "Default";
    }

    const cartItem = {
      id: Date.now(),
      name: subcategory,
      image: data.slider[0],
      price: priceNumber,
      quantity: quantity,
      selectedColor: selectedColorName,
      discountPrice: data.discountPrice,
      originalPrice: data.originalPrice,
    };

    addToCart(cartItem);
  };

  const handleAddRelatedToCart = (item, e) => {
    if (e) e.stopPropagation();

    const priceNumber = parseFloat(
      (item.discountPrice || item.originalPrice || "0").replace("£", "").trim()
    );

    let selectedColorName = "Default";
    if (subcategory !== "Steering") {
      const variants = getProductVariants(subcategory);
      selectedColorName = variants[0]?.name || "Default";
    }

    const cartItem = {
      id: Date.now() + Math.random(),
      name: item.name,
      image: item.image,
      price: priceNumber,
      quantity: 1,
      selectedColor: selectedColorName,
      discountPrice: item.discountPrice,
      originalPrice: item.originalPrice,
    };

    addToCart(cartItem);
  };

  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: isDesktop ? "40px 20px" : "20px 10px",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
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

        {/* Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
            gap: isDesktop ? "50px" : "30px",
            marginBottom: "50px",
          }}
        >
          {/* Slider Section */}
          <div>
            <div
              style={{
                position: "relative",
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
              }}
            >
              {/* Slider Images */}
              <div
                style={{
                  width: "100%",
                  height: isDesktop ? "500px" : "350px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0a0a0a",
                  padding: "20px",
                }}
              >
                {data.slider.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${subcategory} ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: index === currentSlide ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(17, 135, 207, 0.8)",
                  border: "none",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  zIndex: 10,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#1187cf")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgba(17, 135, 207, 0.8)")
                }
              >
                <FaCaretLeft size={30} color="#fff" />
              </button>

              <button
                onClick={nextSlide}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(17, 135, 207, 0.8)",
                  border: "none",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  zIndex: 10,
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#1187cf")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgba(17, 135, 207, 0.8)")
                }
              >
                <FaCaretRight size={30} color="#fff" />
              </button>

              {/* Slider Dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "10px",
                  zIndex: 10,
                }}
              >
                {data.slider.map((_, index) => (
                  <span
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: index === currentSlide ? "30px" : "12px",
                      height: "12px",
                      borderRadius: "6px",
                      backgroundColor:
                        index === currentSlide
                          ? "#1187cf"
                          : "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <strong
                style={{
                  color: "#1187cf",
                  fontSize: isDesktop ? "36px" : "28px",
                  fontWeight: "900",
                }}
              >
                {data.discountPrice}
              </strong>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#666",
                  fontSize: isDesktop ? "24px" : "18px",
                }}
              >
                {data.originalPrice}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: isDesktop ? "16px" : "14px",
                color: "#ccc",
                lineHeight: "1.8",
                marginBottom: "30px",
              }}
            >
              {data.description}
            </p>

            {/* Color Selection - Hidden for Steering */}
            {subcategory !== "Steering" && (
              <div style={{ marginBottom: "25px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#fff",
                    marginBottom: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Colour: {getSelectedColorName()}
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {currentVariants.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedColor(variant.id)}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        backgroundColor: variant.color,
                        cursor: "pointer",
                        border:
                          selectedColor === variant.id
                            ? "3px solid #1187cf"
                            : "2px solid #444",
                        transition: "all 0.2s ease",
                        boxShadow:
                          selectedColor === variant.id
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
                  gap: "15px",
                  marginBottom: "30px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "#fff",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Quantity:
                </span>
                <button
                  onClick={decreaseQuantity}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "8px",
                    border: "2px solid #2a2a2a",
                    backgroundColor: "#2a2a2a",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "22px",
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
                    fontSize: "20px",
                    minWidth: "40px",
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "8px",
                    border: "2px solid #2a2a2a",
                    backgroundColor: "#2a2a2a",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "22px",
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
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: "18px",
                backgroundColor: "#1187cf",
                color: "#fff",
                border: "none",
                fontWeight: "800",
                cursor: "pointer",
                borderRadius: "10px",
                letterSpacing: "2px",
                fontSize: "16px",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
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
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h3
            style={{
              fontSize: isDesktop ? "32px" : "24px",
              fontWeight: "800",
              color: "#1187cf",
              marginBottom: "30px",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Buyers also bought these
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop
                ? "repeat(3, 1fr)"
                : "repeat(auto-fit, minmax(150px, 1fr))",
              gap: isDesktop ? "25px" : "15px",
            }}
          >
            {data.related.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow:
                    hoveredRelated === index
                      ? "0 8px 20px rgba(17, 135, 207, 0.3)"
                      : "0 4px 12px rgba(255,255,255,0.1)",
                  transform:
                    hoveredRelated === index
                      ? "translateY(-5px)"
                      : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredRelated(index)}
                onMouseLeave={() => setHoveredRelated(null)}
              >
                <div
                  style={{
                    width: "100%",
                    height: isDesktop ? "200px" : "150px",
                    backgroundColor: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "15px",
                    position: "relative",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                      transform:
                        hoveredRelated === index ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                </div>
                <div style={{ padding: "15px" }}>
                  <p
                    style={{
                      fontSize: isDesktop ? "16px" : "14px",
                      fontWeight: "700",
                      color: "#fff",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "15px",
                    }}
                  >
                    <strong
                      style={{
                        color: "#1187cf",
                        fontSize: "18px",
                        fontWeight: "800",
                      }}
                    >
                      {item.discountPrice}
                    </strong>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#666",
                        fontSize: "14px",
                      }}
                    >
                      {item.originalPrice}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleAddRelatedToCart(item, e)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#1187cf",
                      color: "#fff",
                      border: "none",
                      fontWeight: "700",
                      cursor: "pointer",
                      borderRadius: "8px",
                      letterSpacing: "1px",
                      fontSize: "13px",
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
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
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryDetail;
