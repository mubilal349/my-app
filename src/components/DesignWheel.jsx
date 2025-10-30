import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../assets/css/DesignWheel.css";
import BackToTop from "./BackToTop";
import WhatsappIcon from "./WhatsappIcon";

const DesignWheel = () => {
  // State for filters
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [customizeModal, setCustomizeModal] = useState(false);
  const [selectedWheel, setSelectedWheel] = useState(null);

  // Customization states
  const [customization, setCustomization] = useState({
    color: "#00ffff",
    material: "carbon-fiber",
    stitching: "cyan",
    ledLights: true,
    heated: false,
    paddleShifters: true,
    logo: "brand",
    gripStyle: "sport",
    diameter: 14,
    thickness: 30,
  });

  // Sample data for steering wheels
  const steeringWheels = [
    {
      id: 1,
      brand: "BMW",
      size: 'Small (13")',
      color: "Black",
      title: "BMW M Performance Steering Wheel",
      image: "/img/img-1.png",
      price: "$299",
      basePrice: 299,
    },
    {
      id: 2,
      brand: "BMW",
      size: 'Medium (14")',
      color: "Carbon Fiber",
      title: "BMW Carbon Fiber Edition",
      image: "/img/img-2.webp",
      price: "$459",
      basePrice: 459,
    },
    {
      id: 3,
      brand: "Audi",
      size: 'Medium (14")',
      color: "Red",
      title: "Audi Sport Line Steering",
      image: "/img/img-4.webp",
      price: "$329",
      basePrice: 329,
    },
    {
      id: 4,
      brand: "Audi",
      size: 'Large (15")',
      color: "Silver",
      title: "Audi RS Premium Wheel",
      image: "/img/img-9.webp",
      price: "$399",
      basePrice: 399,
    },
    {
      id: 5,
      brand: "Range Rover",
      size: 'Large (15")',
      color: "Black",
      title: "Range Rover Luxury Edition",
      image: "/img/img-5.jpg",
      price: "$499",
      basePrice: 499,
    },
    {
      id: 6,
      brand: "Mercedes Benz",
      size: 'Medium (14")',
      color: "Silver",
      title: "Mercedes Benz",
      image: "/img/Mercedes_Benz.webp",
      price: "$899",
      basePrice: 899,
    },
    {
      id: 7,
      brand: "Porsche",
      size: 'Small (13")',
      color: "Blue",
      title: "Porsche 911 GT3 Wheel",
      image: "/img/img-7.webp",
      price: "$599",
      basePrice: 599,
    },
    {
      id: 8,
      brand: "Porsche",
      size: 'Medium (14")',
      color: "Carbon Fiber",
      title: "Porsche Carbon Sport",
      image: "/img/img-11.jpeg",
      price: "$699",
      basePrice: 699,
    },
  ];

  // Filtered wheels based on selections
  const filteredWheels = steeringWheels.filter((wheel) => {
    return (
      (selectedBrand === "all" || wheel.brand === selectedBrand) &&
      (selectedSize === "all" || wheel.size === selectedSize) &&
      (selectedColor === "all" || wheel.color === selectedColor)
    );
  });

  // Calculate custom price
  const calculateCustomPrice = () => {
    if (!selectedWheel) return 0;

    let price = selectedWheel.basePrice;

    // Material upgrades
    if (customization.material === "carbon-fiber") price += 150;
    if (customization.material === "alcantara") price += 100;
    if (customization.material === "wood") price += 200;

    // Features
    if (customization.ledLights) price += 75;
    if (customization.heated) price += 120;
    if (customization.paddleShifters) price += 90;

    // Size adjustment
    if (customization.diameter !== 14)
      price += Math.abs(customization.diameter - 14) * 25;

    return price;
  };

  const customPrice = calculateCustomPrice();

  // Refs for GSAP animations
  const cardsRef = useRef([]);
  const modalRef = useRef();
  const previewRef = useRef();

  // GSAP animations
  useEffect(() => {
    // Animate cards with stagger effect
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, [filteredWheels]);

  // Modal animations
  useEffect(() => {
    if (customizeModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [customizeModal]);

  // Preview animation on customization change
  useEffect(() => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }
  }, [customization]);

  const handleCustomizeClick = (wheel) => {
    setSelectedWheel(wheel);
    setCustomization({
      color: "#00ffff",
      material: "carbon-fiber",
      stitching: "cyan",
      ledLights: true,
      heated: false,
      paddleShifters: true,
      logo: "brand",
      gripStyle: "sport",
      diameter: parseInt(wheel.size.match(/\d+/)[0]),
      thickness: 30,
    });
    setCustomizeModal(true);
  };

  const handleCustomizationChange = (key, value) => {
    setCustomization((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddToCart = () => {
    // Here you would typically send the customization data to your backend
    alert(
      `Custom ${selectedWheel.brand} wheel added to cart! Total: $${customPrice}`
    );
    setCustomizeModal(false);
  };

  // Initialize card refs
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Hover animation functions
  const handleCardHover = (index) => {
    gsap.to(cardsRef.current[index], {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      boxShadow:
        "0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(147, 51, 234, 0.4)",
    });
  };

  const handleCardLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    });
  };

  // Render customization preview
  const renderCustomizationPreview = () => {
    const materialFilters = {
      "carbon-fiber": "contrast(1.3) brightness(0.9) saturate(1.2)",
      leather: "contrast(1.1) saturate(1.1)",
      alcantara: "contrast(1.2) brightness(0.95)",
      wood: "sepia(0.3) contrast(1.1) brightness(0.9)",
    };

    return (
      <div className="customization-preview" ref={previewRef}>
        <img
          src={selectedWheel?.image || "/img/placeholder-wheel.png"}
          alt="Custom Steering Wheel"
          className="preview-image"
          style={{
            filter: materialFilters[customization.material],
            borderColor: customization.color,
            transform: `scale(${customization.diameter / 14})`,
          }}
        />
        <div
          className="preview-overlay"
          style={{ borderColor: customization.stitching }}
        />
        {customization.ledLights && (
          <div
            className="led-glow"
            style={{ boxShadow: `0 0 20px ${customization.color}` }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="design-wheel-page">
      <div className="page-header">
        <h1 className="neon-title">🚗 Custom Steering Wheels</h1>
        <p className="neon-subtitle">Design your perfect driving experience</p>
      </div>

      <div className="design-layout">
        {/* Sidebar */}
        <aside className="filter-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title neon-cyan">Car Brands</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  selectedBrand === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedBrand("all")}
              >
                All Brands
              </button>
              {["BMW", "Audi", "Range Rover", "Rolls Royce", "Porsche"].map(
                (brand) => (
                  <button
                    key={brand}
                    className={`filter-option ${
                      selectedBrand === brand ? "active" : ""
                    }`}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title neon-purple">Steering Wheel Sizes</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  selectedSize === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedSize("all")}
              >
                All Sizes
              </button>
              {['Small (13")', 'Medium (14")', 'Large (15")'].map((size) => (
                <button
                  key={size}
                  className={`filter-option ${
                    selectedSize === size ? "active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title neon-cyan">Colors</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  selectedColor === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedColor("all")}
              >
                All Colors
              </button>
              {["Black", "Red", "Blue", "Carbon Fiber", "Silver"].map(
                (color) => (
                  <button
                    key={color}
                    className={`filter-option ${
                      selectedColor === color ? "active" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="sidebar-footer">
            <button
              className="reset-filters"
              onClick={() => {
                setSelectedBrand("all");
                setSelectedSize("all");
                setSelectedColor("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="wheels-grid-container">
          <div className="results-info">
            <span className="neon-text">
              Showing {filteredWheels.length} of {steeringWheels.length} wheels
            </span>
          </div>

          <div className="wheels-grid">
            {filteredWheels.map((wheel, index) => (
              <div
                key={wheel.id}
                ref={addToRefs}
                className="wheel-card glass-card"
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardLeave(index)}
              >
                <div className="card-image-container">
                  <img
                    src={wheel.image}
                    alt={wheel.title}
                    className="card-image"
                    onError={(e) => {
                      e.target.src = "/img/placeholder-wheel.png";
                    }}
                  />
                  <div className="card-badge">{wheel.price}</div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{wheel.title}</h3>
                  <div className="card-specs">
                    <span className="spec-tag brand-tag">{wheel.brand}</span>
                    <span className="spec-tag size-tag">{wheel.size}</span>
                    <span className="spec-tag color-tag">{wheel.color}</span>
                  </div>

                  <div className="card-actions">
                    <button className="btn-buy neon-glow">Buy Now</button>
                    <button
                      className="btn-customize"
                      onClick={() => handleCustomizeClick(wheel)}
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWheels.length === 0 && (
            <div className="no-results">
              <h3 className="neon-text">No wheels found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          )}
        </main>
      </div>

      {/* Customization Modal */}
      {customizeModal && selectedWheel && (
        <div className="modal-overlay" onClick={() => setCustomizeModal(false)}>
          <div
            className="customization-modal glass-card"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="neon-title">
                Customize {selectedWheel.brand} Steering Wheel
              </h2>
              <button
                className="close-modal"
                onClick={() => setCustomizeModal(false)}
              >
                ×
              </button>
            </div>

            <div className="customization-content">
              <div className="preview-section">
                {renderCustomizationPreview()}
                <div className="preview-info">
                  <h3>Your Custom Design</h3>
                  <div className="price-display neon-cyan">${customPrice}</div>
                  <button
                    className="btn-add-to-cart neon-glow"
                    onClick={handleAddToCart}
                  >
                    Add to Cart - ${customPrice}
                  </button>
                </div>
              </div>

              <div className="customization-options">
                <div className="option-group">
                  <h4 className="option-title">Material & Finish</h4>
                  <div className="option-buttons">
                    {["carbon-fiber", "leather", "alcantara", "wood"].map(
                      (material) => (
                        <button
                          key={material}
                          className={`option-btn ${
                            customization.material === material ? "active" : ""
                          }`}
                          onClick={() =>
                            handleCustomizationChange("material", material)
                          }
                        >
                          {material.charAt(0).toUpperCase() +
                            material.slice(1).replace("-", " ")}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="option-group">
                  <h4 className="option-title">Main Color</h4>
                  <input
                    type="color"
                    value={customization.color}
                    onChange={(e) =>
                      handleCustomizationChange("color", e.target.value)
                    }
                    className="color-picker"
                  />
                </div>

                <div className="option-group">
                  <h4 className="option-title">Stitching Color</h4>
                  <div className="option-buttons">
                    {["cyan", "red", "white", "yellow", "purple"].map(
                      (color) => (
                        <button
                          key={color}
                          className={`option-btn stitching-${color} ${
                            customization.stitching === color ? "active" : ""
                          }`}
                          onClick={() =>
                            handleCustomizationChange("stitching", color)
                          }
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="option-group">
                  <h4 className="option-title">
                    Diameter: {customization.diameter}"
                  </h4>
                  <input
                    type="range"
                    min="12"
                    max="16"
                    step="0.5"
                    value={customization.diameter}
                    onChange={(e) =>
                      handleCustomizationChange(
                        "diameter",
                        parseFloat(e.target.value)
                      )
                    }
                    className="slider"
                  />
                </div>

                <div className="option-group">
                  <h4 className="option-title">Features</h4>
                  <div className="feature-options">
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={customization.ledLights}
                        onChange={(e) =>
                          handleCustomizationChange(
                            "ledLights",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                      LED Ambient Lighting (+$75)
                    </label>

                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={customization.heated}
                        onChange={(e) =>
                          handleCustomizationChange("heated", e.target.checked)
                        }
                      />
                      <span className="toggle-slider"></span>
                      Heated Grip (+$120)
                    </label>

                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={customization.paddleShifters}
                        onChange={(e) =>
                          handleCustomizationChange(
                            "paddleShifters",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                      Paddle Shifters (+$90)
                    </label>
                  </div>
                </div>

                <div className="option-group">
                  <h4 className="option-title">Grip Style</h4>
                  <div className="option-buttons">
                    {["sport", "comfort", "performance", "luxury"].map(
                      (style) => (
                        <button
                          key={style}
                          className={`option-btn ${
                            customization.gripStyle === style ? "active" : ""
                          }`}
                          onClick={() =>
                            handleCustomizationChange("gripStyle", style)
                          }
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <BackToTop />
      <WhatsappIcon />
    </div>
  );
};

export default DesignWheel;
