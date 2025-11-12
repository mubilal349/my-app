import React, { useEffect, useState } from "react";
import "../assets/css/ShopPage.css";
import { useCart } from "../context/CartContext";
import WhatsappIcon from "../components/WhatsappIcon";
import BackToTop from "../components/BackToTop";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // 1️⃣ Fetch local JSON
        const res = await fetch("/data/products.json");
        const data = await res.json();

        const localJsonProducts = data.categories.flatMap((cat) =>
          cat.products.map((p) => ({
            ...p,
            category: cat.title,
            price: parseFloat(p.discountPrice.replace(/[^\d.]/g, "")),
            originalPriceNum: parseFloat(
              p.originalPrice.replace(/[^\d.]/g, "")
            ),
          }))
        );

        // 2️⃣ Fetch backend
        let backendProducts = [];
        try {
          const apiRes = await fetch(
            "https://cornflowerblue-gaur-794659.hostingersite.com/api/getProducts.php"
          );
          const apiData = await apiRes.json();
          backendProducts = apiData.map((p) => ({
            id: p.id,
            title: p.title,
            image: p.image.startsWith("http")
              ? p.image
              : `https://cornflowerblue-gaur-794659.hostingersite.com${p.image}`,
            discountPrice: p.discountPrice,
            originalPrice: p.originalPrice,
            category: "Backend",
            price: parseFloat(p.discountPrice.replace(/[^\d.]/g, "")),
            originalPriceNum: parseFloat(
              p.originalPrice.replace(/[^\d.]/g, "")
            ),
          }));
        } catch (err) {
          console.error("Backend fetch error:", err);
        }

        // 3️⃣ Fetch admin products
        const adminProducts =
          JSON.parse(localStorage.getItem("products"))?.map((p) => ({
            id: p.id,
            title: p.title,
            image: p.image,
            discountPrice: p.discountPrice || "£0.00",
            originalPrice: p.originalPrice || "£0.00",
            category: "New Products Added",
            price: parseFloat(p.discountPrice?.replace(/[^\d.]/g, "") || 0),
            originalPriceNum: parseFloat(
              p.originalPrice?.replace(/[^\d.]/g, "") || 0
            ),
          })) || [];

        // 4️⃣ Combine all products
        let combinedProducts = [
          ...localJsonProducts,
          ...backendProducts,
          ...adminProducts,
        ];

        // 5️⃣ Remove duplicates
        const uniqueProducts = combinedProducts.filter(
          (product, index, self) => {
            if (product.category.toLowerCase().includes("steering"))
              return true;

            return (
              index ===
              self.findIndex(
                (p) =>
                  p.title.trim().toLowerCase() ===
                  product.title.trim().toLowerCase()
              )
            );
          }
        );

        // 6️⃣ Set state
        setAllProducts(uniqueProducts);
        setFilteredProducts(uniqueProducts);

        setCategories([
          "All",
          ...new Set(uniqueProducts.map((p) => p.category)),
        ]);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") setFilteredProducts(allProducts);
    else
      setFilteredProducts(
        allProducts.filter((product) => product.category === category)
      );
  };

  const handleAddToCart = (product) => {
    const priceNumber =
      parseFloat(product.discountPrice.replace(/[^\d.]/g, "")) || 0;

    addToCart({
      ...product,
      price: priceNumber,
      quantity: 1,
    });
  };

  const getBadgeConfig = (index) => {
    const mod = index % 3;
    if (mod === 0) return { type: "New", color: "green" };
    if (mod === 1) return { type: "Hot", color: "red" };
    return { type: "Sale", color: "pink" };
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <section className="shop-section">
      <div className="shop-container">
        <div className="shop-header">
          <h2 className="shop-title">Our Products</h2>
          <p className="shop-subtitle">Discover premium car accessories</p>
        </div>

        {/* Filter Dropdown */}
        <div className="filter-bar">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => handleFilter(e.target.value)}
            className="filter-dropdown"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="shop-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => {
              const badgeConfig = getBadgeConfig(index);

              return (
                <div key={`${product.id}-${index}`} className="shop-card">
                  {/* Badge */}
                  <div className="badge-container">
                    <span className={`badge-new badge-${badgeConfig.color}`}>
                      {badgeConfig.type}
                    </span>
                  </div>

                  {/* Image Wrapper */}
                  <div
                    className="image-wrapper"
                    onClick={() =>
                      navigate(`/product/${product.id}`, {
                        state: { product },
                      })
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="shop-image"
                    />

                    {/* Cart Button */}
                    <button
                      className="quick-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <svg
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
                  <div className="shop-info">
                    <h3 className="shop-name">{product.title}</h3>
                    <div className="shop-prices">
                      <span className="original">{product.originalPrice}</span>
                      <span className="discount">{product.discountPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-results">No products found for this category.</p>
          )}
        </div>
      </div>

      <WhatsappIcon />
      <BackToTop />
    </section>
  );
};

export default ShopPage;
