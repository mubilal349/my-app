import React, { useEffect, useState } from "react";
import "../assets/css/AccessoriesPage.css";
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
  const [activeFilter, setActiveFilter] = useState("all"); // Default to show all products
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isDesktop = window.innerWidth > 768;

  // Filter categories - using more generic IDs that might match the actual data
  const filterCategories = [
    { id: "all", name: "All Products", keywords: [] },
    {
      id: "steering-logos",
      name: "Steering Logos",
      keywords: ["steering", "logo"],
    },
    {
      id: "aromatherapy",
      name: "Aromatherapy Machine",
      keywords: ["aromatherapy", "machine"],
    },
    { id: "keychains", name: "KeyChain", keywords: ["keychain", "key chain"] },
    {
      id: "nos-bottle",
      name: "NOS Bottle Keychain",
      keywords: ["nos", "bottle", "keychain"],
    },
    {
      id: "car-perfume",
      name: "Car Perfume",
      keywords: ["car perfume", "perfume"],
    },
    {
      id: "magnetic-holder",
      name: "Magnetic Phone Holder",
      keywords: ["magnetic", "phone holder", "holder"],
    },
    {
      id: "air-freshener-dispenser",
      name: "Car Air Freshener Dispenser",
      keywords: ["air freshener", "dispenser", "freshener"],
    },
    {
      id: "steering-wheel",
      name: "Steering Wheel",
      keywords: ["steering wheel", "wheel"],
    },
  ];

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((json) => {
        setData(json);

        // Flatten all products from all categories
        const allProducts = [];
        json.categories.forEach((category) => {
          category.products.forEach((product) => {
            allProducts.push({
              ...product,
              categoryId: category.id,
              categoryName: category.title,
            });
          });
        });

        setFilteredProducts(allProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter products when activeFilter changes
  useEffect(() => {
    if (!data) return;

    if (activeFilter === "all") {
      // Flatten all products from all categories
      const allProducts = [];
      data.categories.forEach((category) => {
        category.products.forEach((product) => {
          allProducts.push({
            ...product,
            categoryId: category.id,
            categoryName: category.title,
          });
        });
      });

      setFilteredProducts(allProducts);
    } else {
      // Find the category that matches the active filter
      const category = data.categories.find((cat) => cat.id === activeFilter);
      if (category) {
        const productsWithCategory = category.products.map((product) => ({
          ...product,
          categoryId: category.id,
          categoryName: category.title,
        }));
        setFilteredProducts(productsWithCategory);
      } else {
        // If no exact match, try to find products by keywords
        const filterConfig = filterCategories.find(
          (f) => f.id === activeFilter
        );
        if (filterConfig && filterConfig.keywords.length > 0) {
          const matchedProducts = [];

          data.categories.forEach((category) => {
            category.products.forEach((product) => {
              // Check if any keyword matches the product title or category name
              const isMatch = filterConfig.keywords.some(
                (keyword) =>
                  product.title.toLowerCase().includes(keyword.toLowerCase()) ||
                  category.title
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                  category.id.toLowerCase().includes(keyword.toLowerCase())
              );

              if (isMatch) {
                matchedProducts.push({
                  ...product,
                  categoryId: category.id,
                  categoryName: category.title,
                });
              }
            });
          });

          setFilteredProducts(matchedProducts);
        } else {
          // Fallback: show all products if no matches found
          const allProducts = [];
          data.categories.forEach((category) => {
            category.products.forEach((product) => {
              allProducts.push({
                ...product,
                categoryId: category.id,
                categoryName: category.title,
              });
            });
          });

          setFilteredProducts(allProducts);
        }
      }
    }
  }, [activeFilter, data]);

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

  const handleAddToCart = (product) => {
    if (!product || !product.id) return;

    const discount =
      parseFloat(product.discountPrice?.replace(/[^\d.]/g, "")) || 0;
    const original =
      parseFloat(product.originalPrice?.replace(/[^\d.]/g, "")) || 0;
    const priceNumber = discount > 0 ? discount : original;

    addToCart({
      ...product,
      price: priceNumber,
      quantity: 1,
    });
  };

  const productVariants_1 = [
    { id: 1, color: "#2F2F2F", name: "Dark Grey" },
    { id: 2, color: "#FF3B3B", name: "Red" },
    { id: 3, color: "#1B3A52", name: "Navy Blue" },
    { id: 4, color: "#A8D5D5", name: "Light Blue" },
    { id: 5, color: "#D9D9D9", name: "Silver" },
    { id: 6, color: "#00FF00", name: "Green" },
    { id: 7, color: "#FFA500", name: "Orange" },
    { id: 8, color: "#CD7F32", name: "Bronze" },
  ];

  const productVariants_2 = [
    { id: 1, color: "#000000", name: "Full Black" },
    { id: 2, color: "#E6E6E6", name: "LT Black White" },
    { id: 3, color: "#FF0000", name: "Red Carbon" },
    { id: 4, color: "#1C1C1C", name: "Black Carbon" },
    { id: 5, color: "#003366", name: "Blue Carbon" },
  ];

  // Determine badge type based on product index
  const getBadgeConfig = (index, categoryId) => {
    // Steering Logos - mostly "New"
    if (categoryId === "steering-logos") {
      if (index < 3) return { type: "New", color: "green" };
      if (index < 6) return { type: "Hot", color: "red" };
      return { type: "Sale", color: "pink" };
    }

    // Aromatherapy - mix of badges
    if (categoryId === "aromatherapy") {
      if (index === 0) return { type: "Hot", color: "red" };
      if (index === 1) return { type: "New", color: "green" };
      return { type: "Sale", color: "pink" };
    }

    // KeyChains - rotating badges
    if (categoryId === "keychains") {
      const mod = index % 3;
      if (mod === 0) return { type: "New", color: "green" };
      if (mod === 1) return { type: "Hot", color: "red" };
      return { type: "Sale", color: "pink" };
    }

    // Default rotation for other categories
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

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="accessories-section">
      {/* Filter Section */}
      <div className="filter-section">
        <h2 className="filter-title">Shop by Category</h2>
        <div className="filter-buttons">
          {filterCategories.map((filter) => (
            <button
              key={filter.id}
              className={`filter-button ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid-new">
        {getUniqueProducts(filteredProducts).map((product, idx) => {
          const currentVariant = selectedVariants[product.id] || product;
          const currentVariants =
            product.id === 3 ? productVariants_2 : productVariants_1;

          const badgeConfig = getBadgeConfig(idx, product.categoryId);

          return (
            <div key={product.id} className="product-card-new">
              {/* Badge Indicator */}
              <div className="badge-container">
                <span className={`badge-new badge-${badgeConfig.color}`}>
                  {badgeConfig.type}
                </span>
              </div>

              {/* Product Image */}
              <div
                className="image-wrapper-new"
                onClick={() =>
                  navigate(`/product/${currentVariant.id}`, {
                    state: {
                      product: currentVariant,
                      variants: currentVariants,
                    },
                  })
                }
              >
                <img
                  src={currentVariant.image}
                  alt={currentVariant.title}
                  className="product-image-new"
                />

                {/* Quick Add Button */}
                <button
                  className="quick-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(currentVariant);
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
              <div className="product-info-new">
                <h3 className="product-title-new">{currentVariant.title}</h3>
                <div className="price-box-new">
                  <span className="original-price-new">
                    {currentVariant.originalPrice}
                  </span>
                  <span className="discount-price-new">
                    {currentVariant.discountPrice}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <WhatsappIcon />
      <BackToTop />
    </div>
  );
};

export default AccessoriesPage;
