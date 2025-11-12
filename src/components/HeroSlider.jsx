import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/HeroSlider.css";

const HeroSlider = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products/steeringwheel");
  };

  return (
    <section
      className="hero-slider single-image"
      style={{
        backgroundImage: `url('/img/cover.jpg')`,
      }}
      onClick={handleClick}
    >
      <div className="overlay"></div>
    </section>
  );
};

export default HeroSlider;
