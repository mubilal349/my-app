import React, { useEffect, useState } from "react";
import "../assets/css/AccessoriesPage.css"; // ✅ linked CSS file
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import WhatsappIcon from "../components/WhatsappIcon";
import BackToTop from "../components/BackToTop";
import { useLocation } from "react-router-dom";

const AccessoriesPage = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [selectedVariants, setSelectedVariants] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isDesktop = window.innerWidth > 768;

  // Filter unique products by title
  const getUniqueProducts = (products) => {
    const unique = [];
    const titles = new Set();

    products.forEach((product) => {
      if (!titles.has(product.title)) {
        titles.add(product.title);
        unique.push(product);
      }
    });

    return unique;
  };

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    if (!product || !product.id) return;

    // Convert price string to number
    const discount =
      parseFloat(product.discountPrice?.replace(/[^\d.]/g, "")) || 0;
    const original =
      parseFloat(product.originalPrice?.replace(/[^\d.]/g, "")) || 0;
    const priceNumber = discount > 0 ? discount : original;

    // Add to cart with numeric price and quantity
    addToCart({
      ...product,
      price: priceNumber, // numeric
      quantity: 1, // default quantity
    });
  };

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
  const productVariants_2 = [
    { id: 1, color: "#000000", name: "Full Black" },
    { id: 2, color: "#E6E6E6", name: "LT Black White" },
    { id: 3, color: "#FF0000", name: "Red Carbon" },
    { id: 4, color: "#1C1C1C", name: "Black Carbon" },
    { id: 5, color: "#003366", name: "Blue Carbon" },
  ];

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="accessories-section">
      {data.categories.map((category, index) => (
        <section key={category.id} className="category-section">
          {/* Header */}
          <div className="category-header">
            <p className="category-subtitle">Collection</p>
            <h2 className="category-title">{category.title}</h2>
            <p className="category-description">{category.description}</p>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {getUniqueProducts(category.products).map((product) => {
              // Get all variants for this product title
              // const productVariants = category.products.filter(
              //   (p) => p.id === product.id
              // );
              const currentVariant = selectedVariants[product.id] || product;

              const currentVariants =
                product.id === 3 ? productVariants_2 : productVariants_1;

              return (
                <div key={product.id} className="product-card">
                  <div
                    className="image-wrapper"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: isDesktop ? "350px" : "250px",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={currentVariant.image}
                      alt={currentVariant.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                      onClick={() =>
                        navigate(`/product/${currentVariant.id}`, {
                          state: {
                            product: currentVariant,
                            variants: currentVariants,
                          },
                        })
                      }
                    />

                    <button
                      style={{
                        position: "absolute",
                        bottom: "15px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "600",
                        overflow: "hidden",
                        transition: "background 0.4s ease",
                        backgroundImage:
                          "linear-gradient(to top, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "bottom",
                        backgroundSize: "100% 0%", // start from bottom
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundSize = "100% 200%")
                      } // grow the wave
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundSize = "100% 0%")
                      } // reset
                      onClick={() => handleAddToCart(currentVariant)}
                    >
                      Shop Now
                    </button>
                  </div>

                  <div className="product-info">
                    <h3 className="product-title">{currentVariant.title}</h3>
                    <div className="price-box">
                      <span className="discount-price">
                        {currentVariant.discountPrice}
                      </span>
                      <span className="original-price">
                        {currentVariant.originalPrice}
                      </span>
                    </div>
                    <span className="badge">Popular</span>
                  </div>
                </div>
              );
            })}
          </div>
          {selectedProduct && (
            <div className="modal-backdrop">
              <div className="modal-card">
                {/* Close button */}
                <button
                  className="modal-close"
                  onClick={() => setSelectedProduct(null)}
                >
                  &times;
                </button>

                {/* Product Image */}
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="modal-image"
                />

                {/* Product Info */}
                <h2 className="modal-title">{selectedProduct.title}</h2>
                <div className="modal-price-box">
                  <span className="modal-price">
                    {selectedProduct.discountPrice}
                  </span>
                  <span className="modal-original">
                    {selectedProduct.originalPrice}
                  </span>
                </div>

                {/* Description */}
                <p className="modal-description">
                  {selectedProduct.description}
                </p>

                {/* Color Selection */}
                <div style={{ margin: "15px 0" }}>
                  <p style={{ marginBottom: "8px", color: "#333" }}>
                    COLOR:{" "}
                    {currentVariants_1.find((v) => v.id === selectedColor)
                      ?.name || "Select"}
                  </p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[
                      { id: 1, color: "#000000", name: "Black" },
                      { id: 2, color: "#FF0000", name: "Red" },
                      { id: 3, color: "#0000FF", name: "Blue" },
                      { id: 4, color: "#00FF00", name: "Green" },
                      { id: 5, color: "#FFFF00", name: "Yellow" },
                    ].map((variant) => (
                      <div
                        key={variant.id}
                        onClick={() => setSelectedColor(variant.id)}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: variant.color,
                          cursor: "pointer",
                          border:
                            selectedColor === variant.id
                              ? "3px solid #1187cf"
                              : "1px solid #ccc",
                          transition: "all 0.2s ease",
                        }}
                        title={variant.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="modal-add-btn"
                  onClick={() => {
                    handleAddToCart({ ...selectedProduct, selectedColor });
                    setSelectedProduct(null);
                  }}
                  style={{
                    marginTop: "15px",
                    padding: "12px 20px",
                    backgroundColor: "#1187cf",
                    color: "#fff",
                    fontWeight: "700",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}

          {/* Divider */}
          {index !== data.categories.length - 1 && (
            <div className="divider"></div>
          )}
          <WhatsappIcon />
          <BackToTop />
        </section>
      ))}
    </div>
  );
};

export default AccessoriesPage;
