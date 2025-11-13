// src/components/Compare.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft, Check, Star, Truck, Shield } from "lucide-react";

const Compare = () => {
  const navigate = useNavigate();
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load compare list from localStorage
    const savedCompareList = localStorage.getItem("compareList");
    if (savedCompareList) {
      try {
        const parsedList = JSON.parse(savedCompareList);
        setCompareList(parsedList);
      } catch (error) {
        console.error("Error parsing compare list:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleRemoveProduct = (productId) => {
    const updatedList = compareList.filter(
      (product) => product.id !== productId
    );
    setCompareList(updatedList);
    localStorage.setItem("compareList", JSON.stringify(updatedList));
  };

  const handleClearAll = () => {
    setCompareList([]);
    localStorage.removeItem("compareList");
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const formatPrice = (price) => {
    return typeof price === "string" ? price : `£${price.toFixed(2)}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} style={{ color: "#FFD700", fontSize: "16px" }}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: "#FFD700", fontSize: "16px" }}>
          ☆
        </span>
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: "#444", fontSize: "16px" }}>
          ★
        </span>
      );
    }

    return stars;
  };

  const getCompareFeatures = () => {
    if (compareList.length === 0) return [];

    const allFeatures = new Set();
    const uniqueFeatures = [];

    compareList.forEach((product) => {
      Object.keys(product).forEach((key) => {
        if (
          key !== "id" &&
          key !== "image" &&
          key !== "name" &&
          key !== "description" &&
          key !== "inStock"
        ) {
          allFeatures.add(key);
        }
      });
    });

    allFeatures.forEach((feature) => {
      const featureValues = compareList.map((product) => product[feature]);
      const hasDifferentValues = featureValues.some(
        (value) => value !== featureValues[0]
      );

      if (hasDifferentValues) {
        uniqueFeatures.push(feature);
      }
    });

    return uniqueFeatures;
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "'Montserrat', sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            width: "40px",
            height: "40px",
            border: "3px solid #1187cf",
            borderTop: "3px solid transparent",
            borderRight: "3px solid transparent",
            borderBottom: "3px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          Loading comparison...
        </p>
      </div>
    );
  }

  if (compareList.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "'Montserrat', sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          <h1
            style={{ fontSize: "32px", marginBottom: "20px", color: "#1187cf" }}
          >
            No Products to Compare
          </h1>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "30px",
              color: "#cccccc",
              lineHeight: "1.5",
            }}
          >
            Please select at least 2 products from the catalogue to compare
            their features.
          </p>
          <button
            onClick={handleGoBack}
            style={{
              padding: "12px 24px",
              backgroundColor: "#1187cf",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#0a6db3";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#1187cf";
            }}
          >
            ← Back to Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "20px 0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <button
            onClick={handleGoBack}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "1px solid #333333",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#333333";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <ArrowLeft size={20} />
            <span>Back to Catalogue</span>
          </button>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              margin: 0,
              color: "#ffffff",
            }}
          >
            Product Comparison
          </h1>

          <button
            onClick={handleClearAll}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "1px solid #333333",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#333333";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <X size={16} />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Comparison Content */}
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Product Images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${compareList.length}, 1fr)`,
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {compareList.map((product, index) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                border:
                  compareList.length > 1
                    ? "1px solid #333333"
                    : "1px solid transparent",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                  maxWidth: "200px",
                  height: "200px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(220, 53, 69, 0.8)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "rgba(244, 67, 54, 0.9)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "rgba(220, 53, 69, 0.8)";
                  }}
                >
                  <X size={16} color="#ffffff" />
                </button>
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: "15px 0 10px",
                  color: "#ffffff",
                }}
              >
                Product {index + 1}
              </h3>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            padding: "30px",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#ffffff",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#2a2a2a" }}>
                <th
                  style={{
                    padding: "15px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "16px",
                    borderBottom: "2px solid #444444",
                    color: "#ffffff",
                  }}
                >
                  Feature
                </th>
                {compareList.map((product, index) => (
                  <th
                    key={product.id}
                    style={{
                      padding: "15px",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "16px",
                      borderBottom: "2px solid #444444",
                      color: "#ffffff",
                      minWidth: "120px",
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                          borderRadius: "6px",
                        }}
                      />
                      <div>{product.name}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getCompareFeatures().map((feature, featureIndex) => (
                <tr
                  key={feature}
                  style={{
                    backgroundColor:
                      featureIndex % 2 === 0 ? "#1a1a1a" : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "15px",
                      fontWeight: "600",
                      fontSize: "16px",
                      borderBottom: "2px solid #444444",
                      textTransform: "capitalize",
                      color: "#ffffff",
                      width: "150px",
                    }}
                  >
                    {feature.replace(/([A-Z])/g, " $1")}
                  </td>
                  {compareList.map((product, productIndex) => {
                    const value = product[feature];

                    // Handle special cases for display
                    let displayValue = value;
                    if (feature === "price") {
                      displayValue = formatPrice(value);
                    } else if (feature === "rating") {
                      displayValue = (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {renderStars(value)}
                          <span
                            style={{
                              color: "#cccccc",
                              fontSize: "14px",
                              marginLeft: "5px",
                            }}
                          >
                            {value} rating
                          </span>
                        </div>
                      );
                    } else if (feature === "reviews") {
                      displayValue = `${value} reviews`;
                    } else if (feature === "inStock") {
                      displayValue = (
                        <span
                          style={{
                            color: value ? "#4CAF50" : "#F44336",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {value ? "In Stock" : "Out of Stock"}
                        </span>
                      );
                    }

                    return (
                      <td
                        key={product.id}
                        style={{
                          padding: "15px",
                          textAlign: "center",
                          borderBottom: "2px solid #444444",
                          fontWeight: feature === "price" ? "700" : "500",
                          color: feature === "price" ? "#1187cf" : "#ffffff",
                          fontSize: "16px",
                        }}
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {compareList.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                // Add to cart functionality
                const cartItem = {
                  ...product,
                  quantity: 1,
                  price: parseFloat(product.discountPrice.replace("£", "")),
                };
                console.log("Adding to cart:", cartItem);
                // You can dispatch this to your cart context
                // addToCart(cartItem);
              }}
              style={{
                padding: "12px 20px",
                backgroundColor: "#1187cf",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#0a6db3";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#1187cf";
              }}
            >
              Add to Cart
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;
