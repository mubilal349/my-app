import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../assets/css/Catalogue.css";
import {
  ShoppingCart,
  Heart,
  Search,
  Filter,
  Grid,
  List,
  X,
  Star,
  TrendingUp,
  ChevronDown,
  GitCompare,
  Truck,
  Shield,
  Download, // Added Download icon
} from "lucide-react";

const categories = {
  Catalogue: [
    {
      id: 1,
      name: "Keyrings",
      image: "/img/keychains/10.png",
      price: 9.99,
      discountPrice: "£9.99",
      originalPrice: "£14.99",
      rating: 4.5,
      reviews: 127,
      isNew: true,
      isBestseller: false,
      inStock: true,
      description: "Premium quality keyrings with custom designs",
    },
    {
      id: 2,
      name: "Badges",
      image: "/img/accessories/28.png",
      price: 7.99,
      discountPrice: "£7.99",
      originalPrice: "£12.99",
      rating: 4.2,
      reviews: 89,
      isNew: false,
      isBestseller: true,
      inStock: true,
      description: "Stylish badges to personalize your accessories",
    },
    {
      id: 3,
      name: "Diffusers",
      image: "/img/accessories/1.png",
      price: 14.99,
      discountPrice: "£14.99",
      originalPrice: "£19.99",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      isBestseller: true,
      inStock: true,
      description: "Premium car diffusers with long-lasting fragrance",
    },
    {
      id: 4,
      name: "Steering",
      image: "/img/before-and-after/before-after 1 (2).jpg",
      price: 24.99,
      discountPrice: "£24.99",
      originalPrice: "£34.99",
      rating: 4.8,
      reviews: 156,
      isNew: true,
      isBestseller: false,
      inStock: true,
      description:
        "Custom steering wheel covers for enhanced driving experience",
    },
  ],
};

const Catalogue = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, calculateTotal } = useCart();
  const [quantities, setQuantities] = useState({});
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // New states for enhanced functionality
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Handle resize for responsive layout
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize quantities for each product
  useEffect(() => {
    const initialQuantities = {};

    categories.Catalogue.forEach((product) => {
      // Set default quantity for each product
      initialQuantities[product.id] = 1;
    });

    setQuantities(initialQuantities);
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...categories.Catalogue];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.discountPrice.replace("£", ""));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.name)
      );
    }

    // Apply tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) => {
        if (selectedTags.includes("new") && product.isNew) return true;
        if (selectedTags.includes("bestseller") && product.isBestseller)
          return true;
        if (selectedTags.includes("inStock") && product.inStock) return true;
        return false;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "priceLowToHigh":
        return filtered.sort(
          (a, b) =>
            parseFloat(a.discountPrice.replace("£", "")) -
            parseFloat(b.discountPrice.replace("£", ""))
        );
      case "priceHighToLow":
        return filtered.sort(
          (a, b) =>
            parseFloat(b.discountPrice.replace("£", "")) -
            parseFloat(a.discountPrice.replace("£", ""))
        );
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return filtered.sort((a, b) => b.reviews - a.reviews);
      case "featured":
      default:
        return filtered.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }
  }, [searchQuery, priceRange, selectedCategories, selectedTags, sortBy]);

  const handleExploreMore = (e) => {
    e.preventDefault();
    navigate("/accessories");
  };

  const handleImageClick = (product, e) => {
    // Navigate to product detail page instead of opening modal
    if (e) {
      e.stopPropagation();
    }

    // Map product name to category and subcategory
    const productMapping = {
      Keyrings: { category: "accessories", subcategory: "Keyrings" },
      Badges: { category: "accessories", subcategory: "Badges" },
      Diffusers: { category: "accessories", subcategory: "Diffusers" },
      Steering: { category: "accessories", subcategory: "Steering" },
    };

    const mapping = productMapping[product.name];

    if (mapping) {
      navigate(`/category/${mapping.category}/${mapping.subcategory}`, {
        state: { product },
      });
    }
  };

  const handleAddToCart = (product, e) => {
    // Prevent image click when clicking add to cart
    if (e) {
      e.stopPropagation();
    }

    if (!product || !product.inStock) return;

    const productQuantity = quantities[product.id] || 1;

    // Parse price from discountPrice
    const priceNumber = parseFloat(
      (product.discountPrice || product.originalPrice || "0")
        .replace("£", "")
        .trim()
    );

    const cartItem = {
      ...product,
      price: priceNumber,
      quantity: productQuantity,
    };

    addToCart(cartItem);
    showNotification(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (product, e) => {
    if (e) e.stopPropagation();

    const isInWishlist = wishlist.some((item) => item.id === product.id);

    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      showNotification(`${product.name} removed from wishlist!`, "info");
    } else {
      setWishlist([...wishlist, product]);
      showNotification(`${product.name} added to wishlist!`, "success");
    }
  };

  const handleToggleCompare = (product, e) => {
    if (e) e.stopPropagation();

    const isInCompareList = compareList.some((item) => item.id === product.id);

    if (isInCompareList) {
      setCompareList(compareList.filter((item) => item.id !== product.id));
      showNotification(`${product.name} removed from comparison!`, "info");
    } else {
      if (compareList.length >= 3) {
        showNotification(
          "You can compare up to 3 products at a time!",
          "warning"
        );
        return;
      }
      setCompareList([...compareList, product]);
      showNotification(`${product.name} added to comparison!`, "success");
    }
  };

  // In your Catalogue component, update the handleCompare function:
  const handleCompare = () => {
    if (compareList.length < 2) {
      // showNotification(
      //   "Please select at least 2 products to compare!",
      //   "warning"
      // );
      return;
    }

    // Store compare list in localStorage
    localStorage.setItem("compareList", JSON.stringify(compareList));

    // Navigate to compare page
    navigate("/compare");
  };

  const increaseQuantity = (productId, e) => {
    if (e) e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId, e) => {
    if (e) e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} fill="#FFD700" color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={14}
          fill="#FFD700"
          color="#FFD700"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} size={14} color="#444" />);
    }

    return stars;
  };

  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#000000",
        minHeight: "100vh",
        padding: isDesktop ? "20px" : "10px",
        color: "#ffffff",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: isDesktop ? "30px" : "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            justifyContent: "space-between",
            alignItems: isDesktop ? "center" : "flex-start",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: isDesktop ? "32px" : "24px",
                fontWeight: "700",
                color: "#ffffff",
                margin: "0 0 10px 0",
              }}
            >
              Our Catalogue
            </h1>
            <p style={{ color: "#cccccc", margin: 0 }}>
              Discover our premium collection of car accessories
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: isDesktop ? "0" : "15px",
            }}
          >
            <button
              onClick={() => setViewMode("grid")}
              style={{
                padding: "8px",
                backgroundColor: viewMode === "grid" ? "#1187cf" : "#333333",
                color: viewMode === "grid" ? "#fff" : "#ffffff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              style={{
                padding: "8px",
                backgroundColor: viewMode === "list" ? "#1187cf" : "#333333",
                color: viewMode === "list" ? "#fff" : "#ffffff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <List size={20} />
            </button>

            {/* Download Catalogue Button */}
            <a
              href="/img/1_Adil Ashraf-20251016.pdf" // Replace with your actual catalogue file path
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 15px",
                backgroundColor: "#1187cf",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#0a6db3";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#1187cf";
              }}
            >
              <Download size={18} />
              <span>Download Catalogue</span>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 40px 12px 15px",
              border: "1px solid #333333",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              backgroundColor: "#222222",
              color: "#ffffff",
            }}
          />
          <Search
            size={20}
            color="#999999"
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </div>

        {/* Filter and Sort Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 15px",
                backgroundColor: "#333333",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              <Filter size={18} />
              Filters
              <ChevronDown
                size={16}
                style={{
                  transform: filterOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s ease",
                }}
              />
            </button>

            {compareList.length > 0 && (
              <button
                onClick={handleCompare}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 15px",
                  backgroundColor: "#1187cf",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Compare ({compareList.length})
              </button>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "#cccccc", fontSize: "14px" }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #333333",
                borderRadius: "8px",
                backgroundColor: "#222222",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              <option value="featured">Featured</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {filterOpen && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#222222",
              borderRadius: "8px",
              border: "1px solid #333333",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
                gap: "20px",
              }}
            >
              {/* Categories Filter */}
              <div>
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  Categories
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {["Keyrings", "Badges", "Diffusers", "Steering"].map(
                    (category) => (
                      <label
                        key={category}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          color: "#ffffff",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          style={{ cursor: "pointer" }}
                        />
                        <span>{category}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Tags Filter */}
              <div>
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  Tags
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      color: "#ffffff",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes("new")}
                      onChange={() => handleTagToggle("new")}
                      style={{ cursor: "pointer" }}
                    />
                    <span>New Arrivals</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      color: "#ffffff",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes("bestseller")}
                      onChange={() => handleTagToggle("bestseller")}
                      style={{ cursor: "pointer" }}
                    />
                    <span>Bestsellers</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      color: "#ffffff",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes("inStock")}
                      onChange={() => handleTagToggle("inStock")}
                      style={{ cursor: "pointer" }}
                    />
                    <span>In Stock</span>
                  </label>
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  Price Range
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#ffffff",
                    }}
                  >
                    <span>£{priceRange[0]}</span>
                    <span>£{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedTags([]);
                  setPriceRange([0, 100]);
                  setSearchQuery("");
                }}
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#333333",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0, color: "#cccccc" }}>
          Showing {filteredAndSortedProducts.length} of{" "}
          {categories.Catalogue.length} products
        </p>
        <div style={{ color: "#cccccc", fontSize: "14px" }}>
          Current View:{" "}
          <span style={{ color: "#1187cf", fontWeight: "bold" }}>
            {viewMode.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main Catalogue Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {Object.keys(categories).map((category) => (
          <div key={category}>
            {/* Product Grid/List */}
            <div
              style={{
                display: viewMode === "grid" ? "grid" : "flex",
                gridTemplateColumns:
                  viewMode === "grid" && isDesktop
                    ? "repeat(auto-fit, minmax(300px, 1fr))"
                    : viewMode === "grid" && !isDesktop
                    ? "1fr"
                    : "none",
                flexDirection: viewMode === "list" ? "column" : "row",
                gap: viewMode === "grid" ? "30px" : "20px",
                padding: isDesktop ? "0" : "0",
              }}
            >
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: viewMode === "list" ? "flex" : "block",
                    height: viewMode === "list" ? "auto" : "auto",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.3)";
                  }}
                >
                  {/* Product Image Container - CLICKABLE */}
                  <div
                    style={{
                      width: viewMode === "list" ? "30%" : "100%",
                      height:
                        viewMode === "list"
                          ? "220px"
                          : isDesktop
                          ? "300px"
                          : "250px",
                      backgroundColor: "#111111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: "20px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={(e) => handleImageClick(product, e)}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                        transform:
                          hoveredProduct === product.id
                            ? "scale(1.05)"
                            : "scale(1)",
                      }}
                    />

                    {/* Product Badges */}
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {product.isNew && (
                        <span
                          style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          NEW
                        </span>
                      )}
                      {product.isBestseller && (
                        <span
                          style={{
                            backgroundColor: "#FF9800",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          BESTSELLER
                        </span>
                      )}
                      {!product.inStock && (
                        <span
                          style={{
                            backgroundColor: "#F44336",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          OUT OF STOCK
                        </span>
                      )}
                    </div>

                    {/* Action Buttons on Hover - Only in Grid View */}
                    {viewMode === "grid" && hoveredProduct === product.id && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "15px",
                          right: "15px",
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={(e) => handleToggleWishlist(product, e)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255,255,255,0.9)",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                          }}
                        >
                          <Heart
                            size={16}
                            color={
                              wishlist.some((item) => item.id === product.id)
                                ? "#F44336"
                                : "#333"
                            }
                            fill={
                              wishlist.some((item) => item.id === product.id)
                                ? "#F44336"
                                : "none"
                            }
                          />
                        </button>
                        <button
                          onClick={(e) => handleToggleCompare(product, e)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: compareList.some(
                              (item) => item.id === product.id
                            )
                              ? "#1187cf"
                              : "rgba(255,255,255,0.9)",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                          }}
                        >
                          <GitCompare
                            size={16}
                            color={
                              compareList.some((item) => item.id === product.id)
                                ? "#fff"
                                : "#333"
                            }
                          />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div
                    style={{
                      padding: isDesktop ? "25px" : "20px",
                      flex: viewMode === "list" ? 1 : "auto",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: isDesktop ? "22px" : "20px",
                        fontWeight: "700",
                        color: "#ffffff",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                      onClick={(e) => handleImageClick(product, e)}
                    >
                      {product.name}
                    </h3>

                    {/* Rating and Reviews */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        {renderStars(product.rating)}
                      </div>
                      <span style={{ color: "#cccccc", fontSize: "14px" }}>
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price Display */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "15px",
                      }}
                    >
                      <strong
                        style={{
                          color: "#1187cf",
                          fontSize: "24px",
                          fontWeight: "700",
                        }}
                      >
                        {product.discountPrice}
                      </strong>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#888888",
                          fontSize: "16px",
                        }}
                      >
                        {product.originalPrice}
                      </span>
                    </div>

                    {/* Product Description - Always show in list view */}
                    <p
                      style={{
                        color: "#cccccc",
                        fontSize: "14px",
                        marginBottom: "15px",
                        display: viewMode === "list" ? "block" : "none",
                      }}
                    >
                      {product.description}
                    </p>

                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "15px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#cccccc",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginRight: "8px",
                        }}
                      >
                        Quantity:
                      </span>
                      <button
                        onClick={(e) => decreaseQuantity(product.id, e)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          border: "1px solid #444444",
                          backgroundColor: "#222222",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "18px",
                          fontWeight: "700",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#333333")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#222222")
                        }
                      >
                        -
                      </button>
                      <span
                        style={{
                          fontSize: "16px",
                          minWidth: "30px",
                          textAlign: "center",
                          color: "#ffffff",
                          fontWeight: "600",
                        }}
                      >
                        {quantities[product.id] || 1}
                      </span>
                      <button
                        onClick={(e) => increaseQuantity(product.id, e)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          border: "1px solid #444444",
                          backgroundColor: "#222222",
                          color: "#ffffff",
                          cursor: "pointer",
                          fontSize: "18px",
                          fontWeight: "700",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#333333")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#222222")
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Shipping and Warranty Info - Always show in list view */}
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "15px",
                        fontSize: "13px",
                        color: "#cccccc",
                        display: viewMode === "list" ? "flex" : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Truck size={14} />
                        <span>Free Shipping</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Shield size={14} />
                        <span>1 Year Warranty</span>
                      </div>
                    </div>

                    {/* Action Buttons - Show in both views */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {/* ADD TO CART button - Always visible, disabled when out of stock */}
                      <button
                        style={{
                          width: "100%",
                          padding: "12px 18px",
                          backgroundColor: product.inStock
                            ? "#1187cf"
                            : "#444444",
                          color: "#fff",
                          border: "none",
                          fontWeight: "600",
                          cursor: product.inStock ? "pointer" : "not-allowed",
                          borderRadius: "8px",
                          letterSpacing: "0.5px",
                          fontSize: "14px",
                          textTransform: "uppercase",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          opacity: product.inStock ? 1 : 0.6,
                        }}
                        onMouseEnter={(e) => {
                          if (product.inStock) {
                            e.target.style.backgroundColor = "#0a6db3";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (product.inStock) {
                            e.target.style.backgroundColor = "#1187cf";
                          }
                        }}
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCart size={16} />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        style={{
                          width: "100%",
                          padding: "12px",
                          backgroundColor: "transparent",
                          color: "#1187cf",
                          border: "1px solid #1187cf",
                          fontWeight: "600",
                          cursor: "pointer",
                          borderRadius: "8px",
                          letterSpacing: "0.5px",
                          fontSize: "14px",
                          textTransform: "uppercase",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#1187cf";
                          e.target.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#1187cf";
                        }}
                        onClick={handleExploreMore}
                      >
                        Explore
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
