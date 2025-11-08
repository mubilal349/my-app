import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { color } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const { addToCart } = useCart();

  const productVariants_1 = [
    { id: 1, color: "#2F2F2F", name: "Dark Grey" },
    { id: 2, color: "#FF3B3B", name: "Red" },
    { id: 3, color: "#1B3A52", name: "Navy Blue" },
    { id: 4, color: "#A8D5D5", name: "Light Blue" },
    { id: 5, color: "#D9D9D9", name: "silver " },
    { id: 6, color: "#00FF00", name: "green" },
    { id: 7, color: "#FFA500", name: "orange " },
    { id: 8, color: "#CD7F32", name: "bronze " },
  ];

  // Handle resize for responsive layout
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch product data
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  // Set selected product based on ID
  useEffect(() => {
    if (!data) return;
    const allProducts = data.categories.flatMap((cat) => cat.products);
    const mainProduct = allProducts.find((p) => p.id === parseInt(id));
    if (!mainProduct) return;
    const variants = allProducts.filter((p) => p.title === mainProduct.title);
    setSelectedProduct(variants[0]);
    setSelectedColor(variants[0]?.id || 1);
  }, [data, id]);

  if (!data || !selectedProduct) return <div>Loading...</div>;

  const handleAddToCart = (product) => {
    addToCart({ ...product, selectedColor, quantity });
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));

  const selectedColorName =
    productVariants_1.find((v) => v.id === selectedColor)?.name || "Dark Grey";

  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#000",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "20px",
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            width: isDesktop ? "50%" : "100%",
            // backgroundColor: "#f5f5f5",
          }}
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            style={{
              width: "100%",
              height: isDesktop ? "450px" : "350px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* DETAILS */}
        <div
          style={{
            width: isDesktop ? "50%" : "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: isDesktop ? "flex-start" : "center",
            textAlign: isDesktop ? "left" : "center",
            padding: isDesktop ? "40px" : "20px",
          }}
        >
          <h1
            style={{
              fontFamily: '"Montserrat", "sans-serif"',
              fontSize: "24px",
              fontWeight: "900",
              marginBottom: "10px",
              textTransform: "uppercase",
              color: "#1187cf",
            }}
          >
            {selectedProduct.title}
          </h1>

          {/* PRICE */}
          <p
            style={{
              fontFamily: '"Montserrat", "sans-serif"',
              fontSize: "18px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "120px",
            }}
          >
            <strong style={{ color: "#666" }}>
              ${selectedProduct.discountPrice}
            </strong>
            <span
              style={{
                textDecoration: "line-through",
                color: "#666",
                fontSize: "14px",
              }}
            >
              ${selectedProduct.originalPrice}
            </span>
          </p>

          {/* COLORS */}
          <div
            style={{
              marginBottom: "25px",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <p
              style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}
            >
              COLOUR: {selectedColorName}
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: isDesktop ? "flex-start" : "center",
              }}
            >
              {productVariants_1.map((variant) => (
                <div
                  key={variant.id}
                  onClick={() => setSelectedColor(variant.id)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: variant.color,
                    cursor: "pointer",
                    border:
                      selectedColor === variant.id
                        ? "3px solid #000"
                        : "1px solid #ddd",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isDesktop ? "flex-start" : "center",
              gap: "10px",
              marginBottom: "20px",
              marginTop: isDesktop ? "0px" : "30px",
            }}
          >
            <button
              onClick={decreaseQuantity}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "6px",
                border: "1px solid #000",
                backgroundColor: "#1187cf",
                color: "#fff",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              -
            </button>
            <span
              style={{
                fontSize: "16px",
                minWidth: "25px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "6px",
                border: "1px solid #000",
                backgroundColor: "#1187cf",
                color: "#fff",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => handleAddToCart(selectedProduct)}
            style={{
              fontFamily: '"Montserrat", "sans-serif"',
              width: "100%",
              padding: "15px",
              backgroundColor: "#1187cf",
              color: "#fff",
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "4px",
              letterSpacing: "1px",
              marginBottom: "30px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#000")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1187cf")}
          >
            ADD TO CART
          </button>

          {/* DESCRIPTION */}
          <div
            style={{
              fontFamily: '"Montserrat", "sans-serif"',
              fontWeight: "900",
              fontSize: "24px",
              borderTop: "1px solid #e0e0e0",
              paddingTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: isDesktop ? "flex-start" : "center",
              textAlign: isDesktop ? "left" : "center",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "900",
                marginBottom: "10px",
                color: "#1187cf",
              }}
            >
              DESCRIPTION
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#fefefe",
                lineHeight: "1.5",
                opacity: 0.8,
              }}
            >
              {selectedProduct.description ||
                "This product is made with high-quality materials and modern design."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
