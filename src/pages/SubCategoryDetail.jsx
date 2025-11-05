import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/SubcategoryDetail.css";

// Dummy data for slider images and related products
const productDetails = {
  Keyrings: {
    slider: [
      "/img/keychains/10.png",
      "/img/keychains/11.png",
      "/img/keychains/12.png",
      "/img/keychains/13.png",
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
    slider: ["/img/badges1.png", "/img/badges2.png", "/img/badges3.png"],
    description:
      "Custom badges to show off your style. Ideal for jackets, bags, and accessories.",
    related: [
      { image: "/img/badges4.png", name: "Badge 4" },
      { image: "/img/badges5.png", name: "Badge 5" },
      { image: "/img/badges6.png", name: "Badge 6" },
    ],
  },
  Diffusers: {
    slider: [
      "/img/diffusers1.png",
      "/img/diffusers2.png",
      "/img/diffusers3.png",
    ],
    description:
      "Aromatic diffusers for home or office. Eco-friendly and long-lasting scents.",
    related: [
      { image: "/img/diffusers4.png", name: "Diffuser 4" },
      { image: "/img/diffusers5.png", name: "Diffuser 5" },
      { image: "/img/diffusers6.png", name: "Diffuser 6" },
    ],
  },
  SteeringWheels: {
    slider: [
      "/img/steeringwheels1.jpg",
      "/img/steeringwheels2.jpg",
      "/img/steeringwheels3.jpg",
    ],
    description:
      "Premium steering wheels for comfort and style. Upgrade your driving experience.",
    related: [
      { image: "/img/steeringwheels4.jpg", name: "Steering Wheel 4" },
      { image: "/img/steeringwheels5.jpg", name: "Steering Wheel 5" },
      { image: "/img/steeringwheels6.jpg", name: "Steering Wheel 6" },
    ],
  },
};

const SubcategoryDetail = () => {
  const { subcategory } = useParams();
  const data = productDetails[subcategory];

  if (!data) return <p>Subcategory not found</p>;

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.slider.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.slider.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="subcategory-detail">
      <h2>{subcategory}</h2>

      {/* Image slider */}
      <div className="slider">
        <button onClick={prevSlide} className="prev">
          &lt;
        </button>
        <img
          src={data.slider[currentSlide]}
          alt={`${subcategory} ${currentSlide + 1}`}
        />
        <button onClick={nextSlide} className="next">
          &gt;
        </button>
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
