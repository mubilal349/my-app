import React from "react";
import sampleImage from "/img/img-13.jpeg"; // replace with your image path

const AboutSection = () => {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        gap: "40px",
        flexWrap: "wrap",
        backgroundColor: "#fff",
        flexDirection: "row", // default: row for desktop
      }}
    >
      {/* Left: Image */}
      <div
        style={{
          textAlign: "center",
          order: 2, // image comes second on desktop
        }}
      >
        <img
          src={sampleImage}
          alt="About Us"
          style={{
            width: "100%",
            maxWidth: "450px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Right: Text */}
      <div
        style={{
          color: "#000",
          order: 1, // text comes first on desktop
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            color: "#3B82F6",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          About Our Custom Designs
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          We specialize in crafting unique steering wheels and car interiors
          tailored to your preferences. Our expert team uses high-quality
          materials and precision craftsmanship to bring your vision to life.
        </p>
      </div>

      {/* Inline CSS for responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            section {
              flex-direction: column !important;
            }
            div[style*="order: 1"] {
              order: 1 !important; /* text first */
            }
            div[style*="order: 2"] {
              order: 2 !important; /* image second */
            }
          }
        `}
      </style>
    </section>
  );
};

export default AboutSection;
