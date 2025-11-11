import React, { useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import "../assets/css/SubcategoryDetail.css";

// Dummy data for slider images and related products
const productDetails = {
  Keyrings: {
    slider: [
      "/img/keychains/26.png",
      "/img/keychains/22.png",
      "/img/keychains/14.png",
    ],
    description:
      "These keyrings are high-quality, durable, and stylish. Perfect for gifting or personal use. Add a touch of personality to your keys or accessories.",
    related: [
      { image: "/img/keychains/15.png", name: "Keyring 15" },
      { image: "/img/keychains/16.png", name: "Keyring 16" },
      { image: "/img/keychains/17.png", name: "Keyring 17" },
    ],
  },
  Badges: {
    slider: ["/img/badges/29.png", "/img/badges/28.png", "/img/badges/29.png"],
    description:
      "Custom badges to show off your style. Ideal for jackets, bags, and accessories.",
    related: [
      { image: "/img/badges/29.png", name: "Badge 5" },
      { image: "/img/badges/28.png", name: "Badge 4" },
      { image: "/img/badges/29.png", name: "Badge 6" },
    ],
  },
  Diffusers: {
    slider: [
      "/img/images/diffuser.png",
      "/img/Diffuser/1.png",
      "/img/Diffuser/2.png",
    ],
    description:
      "Aromatic diffusers for home or office. Eco-friendly and long-lasting scents.",
    related: [
      { image: "/img/Diffuser/1.png", name: "Diffuser 1" },
      { image: "/img/Diffuser/2.png", name: "Diffuser 2" },
      { image: "/img/Diffuser/3.png", name: "Diffuser 3" },
    ],
  },
  Steering: {
    slider: [
      "/img/steeringwheels/10.jpg",
      "/img/steeringwheels/9.jpg",
      "/img/steeringwheels/11.jpg",
    ],
    description:
      "Premium steering wheels for comfort and style. Upgrade your driving experience.",
    related: [
      { image: "/img/steeringwheels/8.jpg", name: "Steering Wheel 8" },
      { image: "/img/steeringwheels/6.jpg", name: "Steering Wheel 6" },
      { image: "/img/steeringwheels/5.jpg", name: "Steering Wheel 5" },
    ],
  },
};

const SubcategoryDetail = () => {
  const { subcategory } = useParams();
  const data = productDetails[subcategory];

  if (!data) return <p>Subcategory not found</p>;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Manual slide controls
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.slider.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.slider.length - 1 ? 0 : prev + 1));
  };

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3s per slide
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="subcategory-detail">
      <h2>{subcategory}</h2>

      {/* Slider */}
      <div className="slider">
        <button onClick={prevSlide} className="prev">
          <FaCaretLeft size={36} color="#fff" />
        </button>

        <div className="slider-images">
          {data.slider.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${subcategory} ${index + 1}`}
              className={`slide ${index === currentSlide ? "active" : ""}`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="next">
          <FaCaretRight size={36} color="#fff" />
        </button>

        {/* Slider dots */}
        <div className="slider-dots">
          {data.slider.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="description">{data.description}</p>

      {/* Related products */}
      <div className="related-products">
        <h3>Buyers also bought these</h3>
        <div className="related-grid">
          {data.related.map((item, index) => (
            <div key={index} className="related-card">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryDetail;
