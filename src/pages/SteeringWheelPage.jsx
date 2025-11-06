import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import WhatsappIcon from "../components/WhatsappIcon";
import BackToTop from "../components/BackToTop";
import "../assets/css/ShopPage.css";

const SteeringWheelPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSteeringWheelProducts = async () => {
      try {
        const res = await fetch("/data/products.json"); // make sure the path is correct
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
            }))
          );
        }
      } catch (err) {
        console.error("Error loading steering wheel products:", err);
      }
    };

    fetchSteeringWheelProducts();
  }, []);

  return (
    <section className="shop-section">
      <div className="container">
        <h2 className="shop-title">Steering Wheels</h2>

        <div className="shop-grid">
          {products.map((product) => (
            <div key={product.id} className="shop-card">
              <div className="image-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="shop-image"
                  onClick={() => setSelectedProduct(product)}
                />
                <button className="shop-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
              <div className="shop-info">
                <h3 className="shop-name">{product.title}</h3>
                <div className="shop-prices">
                  <span className="discount">{product.discountPrice}</span>
                  <span className="original">{product.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
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
                      addToCart(selectedProduct);
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
      </div>

      <WhatsappIcon />
      <BackToTop />
    </section>
  );
};

export default SteeringWheelPage;
