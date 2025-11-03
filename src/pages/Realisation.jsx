import React from "react";
import "../assets/css/realisation.css";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import WhatsappIcon from "../components/WhatsappIcon";

const Realisations = () => {
  const brands = [
    { name: "Volvo", img: "/img/volvo-removebg-preview.png" },
    { name: "Subaru", img: "/img/subaro-removebg-preview.png" },
    { name: "Tesla", img: "/img/tesla-removebg-preview.png" },
    { name: "Toyota", img: "/img/toyota-removebg-preview.png" },
    { name: "Volkswagen", img: "/img/volkswagen-removebg-preview.png" },
    { name: "Porsche", img: "/img/porsche-removebg-preview.png" },
    { name: "BMW", img: "/img/img-11.jpeg" },
    { name: "Mercedes", img: "/img/Mercedes_Benz.webp" },
    { name: "Audi", img: "/img/img-10.jpg" },
  ];

  return (
    <>
      {/* ✅ Hero Section */}
      <section className="realisation-hero">
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Realised</h1>
          <h2>Projects</h2>
        </div>
      </section>

      {/* ✅ Brands Section */}
      <section className="realisation-section">
        {/* ✅ Realisation Process Section */}
        <div className="realisation-process">
          <h3 className="process-heading">Our Realisation Process</h3>
          <p className="process-subtext">
            Here’s how we turn your vision into a custom steering wheel —
            designed just for you.
          </p>

          <div className="process-steps">
            <div className="step">
              <span className="step-number">1</span>
              <h4>Choose Your Design</h4>
              <p>
                Select your preferred steering wheel model, materials,
                stitching, and colors.
              </p>
            </div>

            <div className="step">
              <span className="step-number">2</span>
              <h4>Upload Your Wheel</h4>
              <p>
                Upload or email a photo of your current steering wheel to
                achieve design perfection.
              </p>
            </div>

            <div className="step">
              <span className="step-number">3</span>
              <h4>Get a Custom Offer</h4>
              <p>
                Our team will prepare a personalized quote and estimated time
                for your modification.
              </p>
            </div>

            <div className="step">
              <span className="step-number">4</span>
              <h4>We Build Your Wheel</h4>
              <p>
                Once confirmed, we handcraft your steering wheel with
                top-quality materials and precision.
              </p>
            </div>

            <div className="step">
              <span className="step-number">5</span>
              <h4>Delivery & Installation</h4>
              <p>
                Your completed wheel is safely shipped to you, ready for easy
                installation in your car.
              </p>
            </div>
          </div>

          {/* ✅ Interactive Brand Grid */}
          <div className="brand-grid">
            {brands.map((brand, index) => (
              <div className="brand-card" key={index}>
                <div className="image-container">
                  <img src={brand.img} alt={brand.name} />
                </div>
                <h3>{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <Footer />

      {/* ✅ WhatsApp Floating Icon */}
      <WhatsappIcon />

      <BackToTop />
    </>
  );
};

export default Realisations;
