import React, { useEffect, useState } from "react";
import "../assets/css/AccessoriesPage.css"; // ✅ linked CSS file
import { useCart } from "../context/CartContext";
import WhatsappIcon from "../components/WhatsappIcon";
import BackToTop from "../components/BackToTop";

const AccessoriesPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

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
    addToCart(product);
  };
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
            {category.products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-wrapper">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <button
                    className="shop-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Shop Now
                  </button>
                </div>

                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="price-box">
                    <span className="discount-price">
                      {product.discountPrice}
                    </span>
                    <span className="original-price">
                      {product.originalPrice}
                    </span>
                  </div>
                  <span className="badge">Popular</span>
                </div>
              </div>
            ))}
          </div>

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
