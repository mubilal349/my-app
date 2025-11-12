import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import WhatsappIcon from "../components/WhatsappIcon";
import BackToTop from "../components/BackToTop";
import "../assets/css/AccessoriesPage.css";

const SteeringWheelPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSteeringWheelProducts = async () => {
      try {
        const res = await fetch("/data/products.json");
        const data = await res.json();

        // Find the category with id "steeringwheel"
        const steeringWheelCategory = data.categories.find(
          (cat) => cat.id === "steeringwheel"
        );

        if (steeringWheelCategory) {
          setProducts(
            steeringWheelCategory.products.map((p) => ({
              ...p,
              price: parseFloat(p.discountPrice.replace("£", "").trim()),
              originalPriceNum: parseFloat(
                p.originalPrice.replace("£", "").trim()
              ),
              category: "steeringwheel", // Add category for cart context
              quantity: 1, // Add default quantity
            }))
          );
        }
      } catch (err) {
        console.error("Error loading steering wheel products:", err);
      }
    };

    fetchSteeringWheelProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation(); // Prevent the product click event

    // Ensure we have all necessary properties for the cart
    const cartProduct = {
      id: product.id,
      title: product.title,
      price:
        product.price ||
        parseFloat(product.discountPrice.replace("£", "").trim()),
      image: product.image,
      category: product.category || "steeringwheel",
      quantity: 1,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
    };

    addToCart(cartProduct);

    // Optional: Show a success message
    const successMessage = document.createElement("div");
    successMessage.className = "cart-success-message";
    successMessage.textContent = `${product.title} added to cart!`;
    successMessage.style.position = "fixed";
    successMessage.style.bottom = "20px";
    successMessage.style.right = "20px";
    successMessage.style.backgroundColor = "#1d82c4";
    successMessage.style.color = "white";
    successMessage.style.padding = "10px 20px";
    successMessage.style.borderRadius = "4px";
    successMessage.style.zIndex = "1000";
    successMessage.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";

    document.body.appendChild(successMessage);

    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 3000);
  };

  return (
    <section className="accessories-section steering-wheel-page">
      <div className="container">
        {/* Page Title */}
        <h2 className="filter-title">Steering Wheels</h2>

        {/* Product Grid */}
        <div className="product-grid-new">
          {products.map((product) => (
            <div key={product.id} className="product-card-new">
              {/* Badge Container */}
              <div className="badge-container">
                {product.isNew && (
                  <span className="badge-new badge-green">New</span>
                )}
                {product.discount > 20 && (
                  <span className="badge-new badge-red">
                    -{product.discount}%
                  </span>
                )}
                {product.isExclusive && (
                  <span className="badge-new badge-pink">Exclusive</span>
                )}
              </div>

              {/* Image Wrapper */}
              <div className="image-wrapper-new">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image-new"
                  onClick={() => handleProductClick(product)}
                />

                {/* Quick Add Button */}
                <button
                  className="quick-add-btn"
                  onClick={(event) => handleAddToCart(product, event)}
                  title="Add to Cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="product-info-new">
                <h3 className="product-title-new">{product.title}</h3>
                <div className="price-box-new">
                  <span className="discount-price-new">
                    {product.discountPrice}
                  </span>
                  <span className="original-price-new">
                    {product.originalPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <div className="modal-content">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="modal-image"
              />
              <div className="modal-info">
                <h2 className="modal-title">{selectedProduct.title}</h2>
                <div className="modal-price-box">
                  <span className="modal-price">
                    {selectedProduct.discountPrice}
                  </span>
                  <span className="modal-original">
                    {selectedProduct.originalPrice}
                  </span>
                </div>
                <button
                  className="modal-add-btn"
                  onClick={() => {
                    const cartProduct = {
                      id: selectedProduct.id,
                      title: selectedProduct.title,
                      price:
                        selectedProduct.price ||
                        parseFloat(
                          selectedProduct.discountPrice.replace("£", "").trim()
                        ),
                      image: selectedProduct.image,
                      category: selectedProduct.category || "steeringwheel",
                      quantity: 1,
                      originalPrice: selectedProduct.originalPrice,
                      discountPrice: selectedProduct.discountPrice,
                    };

                    addToCart(cartProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <WhatsappIcon />
      <BackToTop />
    </section>
  );
};

export default SteeringWheelPage;
