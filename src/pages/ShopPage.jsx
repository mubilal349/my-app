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
  const [selectedProduct, setSelectedProduct] = useState(null);

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
            price: parseFloat(p.discountPrice.replace("$", "")),
            originalPriceNum: parseFloat(p.originalPrice.replace("$", "")),
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
            price: parseFloat(p.discountPrice.replace("$", "")),
            originalPriceNum: parseFloat(p.originalPrice.replace("$", "")),
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
            price: parseFloat(p.discountPrice?.replace("£", "") || 0),
            originalPriceNum: parseFloat(
              p.originalPrice?.replace("£", "") || 0
            ),
          })) || [];

        // 4️⃣ Combine all products
        let combinedProducts = [
          ...localJsonProducts,
          ...backendProducts,
          ...adminProducts,
        ];

        // 5️⃣ Remove duplicate products based on image or title
        // Remove duplicates but keep all steering wheels
        const uniqueProducts = combinedProducts.filter(
          (product, index, self) => {
            // Always include steering wheels
            if (product.category.toLowerCase().includes("steering"))
              return true;

            // Otherwise remove duplicates by title only
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

  // 🔹 Category filter handler
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
                    onClick={() =>
                      navigate(`/product/${product.id}`, {
                        state: { product }, // optional
                      })
                    }
                  />

                  <button
                    className="shop-btn"
                    onClick={() => {
                      const priceNumber =
                        parseFloat(product.discountPrice.replace("$", "")) || 0;

                      addToCart({
                        ...product,
                        price: priceNumber, // numeric price
                        quantity: 1, // default quantity
                      });
                    }}
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
