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
          <h3>Pick your style</h3>
          <p style={{ textTransform: "lowercase" }}>
            CHOOSE YOUR BASE, GRIP, COLORS, STITCHING AND TRIMS. MIX IT UP OR
            KEEP IT CLEAN — YOUR WHEEL, YOUR VIBE. YOU CALL THE SHOTS. WE MAKE
            IT HAPPEN.
          </p>
        </div>

        {/* Step 2 */}
        <div className="step">
          <div className="icon">
            <i className="fas fa-clock"></i>
          </div>
          <h3>We build it </h3>
          <p style={{ textTransform: "lowercase" }}>
            ONCE YOU LOCK IN YOUR DESIGN, WE GET TO WORK. EACH WHEEL’S BUILT
            FROM AN OEM BASE FOR PERFECT FITMENT, THEN CUSTOMIZED BY HAND.{" "}
            <strong> 4–6 WEEKS </strong> FROM ORDER TO DONE — WORTH THE WAIT.
          </p>
        </div>

        {/* Step 4 */}
        <div className="step">
          <div className="icon">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <h3 style={{ textTransform: "lowercase" }}>
            DELIVERED & READY TO ROLL
          </h3>
          <p style={{ textTransform: "lowercase" }}>
            YOUR CUSTOM WHEEL SHIPS OUT, READY TO BOLT IN AND FLEX. AFFORDABLE,
            FRESH, AND BUILT TO MAKE YOUR SETUP STAND OUT.
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
