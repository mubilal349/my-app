import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // ✅ Global import

const ImageCards = () => {
  return (
    <section className="how-it-works">
      <h2 className="how-title">How It Works</h2>
      <p className="how-subtitle">
        From design to delivery – simple, fast, and customized for you.
      </p>

      <div className="steps">
        {/* Step 1 */}
        <div className="step">
          <div className="icon">
            <i className="fas fa-pencil-ruler"></i>
          </div>
          <h3>Choose Your Design</h3>
          <p>
            Pick from premium leather, Alcantara, carbon fiber, or custom
            stitching. You can also send us your own design idea.
          </p>
        </div>

        {/* Step 2 */}
        <div className="step">
          <div className="icon">
            <i className="fas fa-clock"></i>
          </div>
          <h3>Production Time</h3>
          <p>
            Our standard re-trim and customization process takes{" "}
            <strong>5–7 working days</strong>, depending on design complexity.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step">
          <div className="icon">
            <i className="fas fa-tools"></i>
          </div>
          <h3>Quality Craftsmanship</h3>
          <p>
            We carefully handcraft every detail using OEM-grade materials —
            ensuring your steering wheel feels brand new.
          </p>
        </div>

        {/* Step 4 */}
        <div className="step">
          <div className="icon">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <h3>Delivery & Installation</h3>
          <p>
            Once complete, your wheel is securely shipped or installed locally.
            Ready to drive with a new look and feel!
          </p>
        </div>
      </div>

      {/* Inline styles (or move to external CSS) */}
      <style jsx>{`
        .how-it-works {
          background: #fff;
          padding: 80px 50px;
          color: #000;
          text-align: center;
        }

        .how-title {
          font-size: 2.2rem;
          color: #3b82f6;
          font-weight: 700;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .how-subtitle {
          color: #000;
          margin-bottom: 60px;
          font-size: 1rem;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          justify-content: center;
        }

        .step {
          border-radius: 16px;
          padding: 30px 20px;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
        }

        .step:hover {
          transform: translateY(-10px);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
        }

        .step .icon {
          width: 70px;
          height: 70px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .step .icon i {
          font-size: 1.8rem;
          color: #fff;
        }

        .step h3 {
          color: #3b82f6;
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .step p {
          font-size: 0.95rem;
          color: #000;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .how-it-works {
            padding: 60px 20px;
          }

          .how-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ImageCards;
