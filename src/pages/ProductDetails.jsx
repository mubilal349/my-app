import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/ProductDetails.css"; // ✅ import external CSS

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  if (!data) return <p className="loading-text">Loading...</p>;

  const product = data.categories
    .flatMap((cat) => cat.products)
    .find((p) => p.id === parseInt(id));

  if (!product) return <h2 className="not-found-text">Product not found</h2>;

  const colorOptions = ["black", "white", "blue", "grey"];

  const handleAddToCart = () => {
    alert(`${product.title} (${selectedColor}) x${quantity} added to cart!`);
  };
  // ✅ Makes sure quantity never goes below 1
  const increaseQuantity = () => {
    setQuantity((prev) => (prev < 1 ? 1 : prev + 1));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  return (
    <div className="product-details">
      {/* Image Section */}
      <div className="image-section">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />

        {/* Color Options */}
        <div className="color-options">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`color-btn ${
                selectedColor === color ? "active-color" : ""
              }`}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
        <p className="selected-color" style={{ color: "#fff" }}>
          Selected: {selectedColor}
        </p>
      </div>

      {/* Details Section */}
      <div className="details-section">
        <h2 className="product-title" style={{ color: "#fff" }}>
          {product.title}
        </h2>
        <p className="original-price">{product.originalPrice}</p>
        <p className="discount-price">{product.discountPrice}</p>

        {/* ✅ Brief Description */}
        <p className="product-description">
          {product.description ||
            "This product is made with high-quality materials and designed to offer durability, comfort, and a stylish look. Perfect for everyday use and gifting."}
        </p>

        {/* Quantity */}
        <div className="quantity-box">
          <button onClick={decreaseQuantity} className="qty-btn">
            -
          </button>
          <span className="qty-value" style={{ color: "#fff" }}>
            {quantity}
          </span>
          <button onClick={increaseQuantity} className="qty-btn">
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      {/* ✅ Related Products */}
      <div className="related-products">
        <h3 className="related-title">Buyers bought these:</h3>
        <div className="related-images">
          <img src="/img/img-1.png" alt="Related 1" />
          <img src="/img/img-3.jpg" alt="Related 2" />
          <img src="/img/img-4.webp" alt="Related 3" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
