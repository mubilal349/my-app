import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  useEffect(() => {
    if (!data) return;

    const allProducts = data.categories.flatMap((cat) => cat.products);
    const mainProduct = allProducts.find((p) => p.id === parseInt(id));
    if (!mainProduct) return;

    const variants = allProducts.filter((p) => p.title === mainProduct.title);
    setSelectedProduct(variants[0]);
  }, [data, id]);

  if (!data || !selectedProduct) {
    return <p>Loading...</p>; // or a spinner
  }

  // Find the main product
  const allProducts = data.categories.flatMap((cat) => cat.products);
  const mainProduct = allProducts.find((p) => p.id === parseInt(id));

  if (!mainProduct)
    return <h2 className="not-found-text">Product not found</h2>;

  // Get all variants with the same title
  const productVariants = allProducts.filter(
    (p) => p.title === mainProduct.title
  );

  // Set default selected product if not already set
  if (!selectedProduct) setSelectedProduct(productVariants[0]);

  const handleAddToCart = () => {
    alert(`${selectedProduct.title} x${quantity} added to cart!`);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));

  return (
    <div className="product-details">
      {/* Image Section */}
      <div className="image-section">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="product-image"
        />

        {/* Color Options */}
        <div className="color-options">
          {productVariants.map((variant) => (
            <img
              key={variant.id}
              src={variant.image}
              alt={variant.title}
              className={`color-thumb ${
                selectedProduct.id === variant.id ? "selected" : ""
              }`}
              onClick={() => setSelectedProduct(variant)}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="details-section">
        <h2 className="product-title">{selectedProduct.title}</h2>
        <p className="original-price">{selectedProduct.originalPrice}</p>
        <p className="discount-price">{selectedProduct.discountPrice}</p>

        <p className="product-description">
          {selectedProduct.description ||
            "This product is made with high-quality materials, durable, and stylish."}
        </p>

        <div className="quantity-box">
          <button onClick={decreaseQuantity} className="qty-btn">
            -
          </button>
          <span className="qty-value">{quantity}</span>
          <button onClick={increaseQuantity} className="qty-btn">
            +
          </button>
        </div>

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {/* Related Products */}
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
