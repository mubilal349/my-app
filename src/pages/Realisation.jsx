import React from "react";
import BackToTop from "../components/BackToTop";
import WhatsappIcon from "../components/WhatsappIcon";
import RealisationAferBefore from "../components/RealisationAfterBefore";
const Realisations = () => {
  return (
    <>
      {/* ✅ Main Realisation Section */}
      <section className="realisation-section">
        <div className="content-box">
          <img
            src="/img/Our Realisations.jpg"
            alt="Our Realisations"
            className="realisation-main-image"
          />
        </div>
      </section>

      {/* ✅ Realisation Gallery */}
      <RealisationAferBefore />

      <WhatsappIcon />
      <BackToTop />

      {/* ✅ Styling */}
      <style jsx>{`
        /* --- 🌟 General Section --- */
        .realisation-section {
          background-color: #000;
          text-align: center;
          padding: 50px 110px 30px;
        }

        .realisation-main-image {
          width: 100%;
          max-width: 1000px;
          height: auto;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          transition: transform 0.4s ease;
        }

        .realisation-main-image:hover {
          transform: scale(1.03);
        }

        /* --- 🖼️ Gallery Section --- */
        .realisation-gallery {
          background-color: #0f0f0f;
          padding: 60px 8%;
          text-align: center;
          color: #fff;
        }

        .gallery-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1285d4;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .gallery-item {
          overflow: hidden;
          border-radius: 12px;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
          border-radius: 12px;
        }

        .gallery-item:hover img {
          transform: scale(1.08);
        }

        .gallery-item:hover {
          box-shadow: 0 6px 20px rgba(18, 133, 212, 0.4);
          transform: translateY(-4px);
        }

        /* --- 📱 Responsive --- */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .gallery-title {
            font-size: 1.6rem;
            margin-bottom: 30px;
          }

          .realisation-section {
            padding: 40px 15px 20px;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            gap: 12px;
          }

          .gallery-title {
            font-size: 1.4rem;
          }

          .realisation-main-image {
            border-radius: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Realisations;
