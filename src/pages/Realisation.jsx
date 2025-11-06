import React from "react";
import BackToTop from "../components/BackToTop";
import WhatsappIcon from "../components/WhatsappIcon";
import bg from "/img/img-11.jpeg";

const Realisations = () => {
  return (
    <>
      {/* ✅ Hero Section */}
      <section className="realisation-hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Our Realisations</h1>
        </div>
      </section>

      {/* ✅ Image Section */}
      <section className="realisation-image-section">
        <div className="content-box">
          <img
            src="/img/Our Realisations.jpg"
            alt="Our Realisations"
            className="realisation-image"
          />
        </div>
      </section>

      <WhatsappIcon />
      <BackToTop />

      <style jsx>{`
        /* ✅ Hero Section */
        .realisation-hero {
          background: url(${bg}) center/cover no-repeat;
          background-size: cover;
          background-position: center;
          height: 60vh; /* Hero height */
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }

        /* ✅ Optional dark overlay */
        .hero-overlay {
          background: rgba(0, 0, 0, 0.5); /* dark overlay */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          text-align: center;
          z-index: 2;
        }

        /* ✅ Image Section */
        .realisation-image-section {
          background-color: #000; /* background for bottom part */
          padding: 50px 20px;
          text-align: center;
        }

        .realisation-image {
          width: 100%;
          max-width: 1000px;
          height: auto;
          border-radius: 10px;
        }

        /* ✅ Responsive styles */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
            padding: 0 10px;
          }

          .realisation-hero {
            height: 40vh;
          }

          .realisation-image {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Realisations;
