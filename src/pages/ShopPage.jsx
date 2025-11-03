import React, { useEffect, useState } from "react";
import "../assets/css/ShopPage.css";
import { useCart } from "../context/CartContext";
import WhatsappIcon from "../components/WhatsappIcon";
import BackToTop from "../components/BackToTop";

const ShopPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    // Start loading
    setLoading(true);

    // 1️⃣ First fetch: local JSON
    fetch("/data/products.json")
      .then((res) => res.json())
      .then(async (data) => {
        // --- Your existing logic (unchanged) ---
        const all = data.categories.flatMap((cat) =>
          cat.products.map((p) => ({
            ...p,
            category: cat.title,
            price: parseFloat(p.discountPrice.replace("$", "")), // numeric price
            originalPriceNum: parseFloat(p.originalPrice.replace("$", "")), // optional
          }))
        );

        // 2️⃣ Second fetch: backend API
        try {
          const apiRes = await fetch(
            "https://cornflowerblue-gaur-794659.hostingersite.com/api/getProducts.php"
          );
          const apiData = await apiRes.json();

          // Match backend structure to your frontend
          const backendProducts = apiData.map((p) => ({
            id: p.id,
            title: p.title,
            image: p.image.startsWith("http")
              ? p.image
              : `https://cornflowerblue-gaur-794659.hostingersite.com${p.image}`,
            price: parseFloat(p.discountPrice.replace("$", "")),
            originalPriceNum: parseFloat(p.originalPrice.replace("$", "")),
          }));

          // Combine both product lists
          const combined = [...all, ...backendProducts];

          setAllProducts(combined);
          setFilteredProducts(combined);
          setCategories([
            "All",
            ...new Set([...data.categories.map((cat) => cat.title), "Backend"]),
          ]);
        } catch (apiError) {
          console.error("Backend API error:", apiError);
          setAllProducts(all);
          setFilteredProducts(all);
          setCategories(["All", ...data.categories.map((cat) => cat.title)]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Local JSON error:", err);
        setLoading(false);
      });
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") setFilteredProducts(allProducts);
    else
      setFilteredProducts(
        allProducts.filter((product) => product.category === category)
      );
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <section className="shop-section">
      <div className="container">
        <h2 className="shop-title">Our Products</h2>

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
            filteredProducts.map((product) => (
              <div key={product.id} className="shop-card">
                <div className="image-wrapper">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="shop-image"
                  />
                  <button
                    className="shop-btn"
                    onClick={() => addToCart(product)}
                  >
                    Shop Now
                  </button>
                </div>
                <div className="shop-info">
                  <h3 className="shop-name">{product.title}</h3>
                  <p className="shop-category">{product.category}</p>
                  <div className="shop-prices">
                    <span className="discount">{product.discountPrice}</span>
                    <span className="original">{product.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))
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
