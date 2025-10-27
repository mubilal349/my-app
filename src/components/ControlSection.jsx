import React, { useState, useEffect } from "react";

const ControlSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height, left, top } =
        currentTarget.getBoundingClientRect();
      const x = ((clientX - left) / width - 0.5) * 30;
      const y = ((clientY - top) / height - 0.5) * -30;
      setMousePosition({ x, y });
      setIsAutoRotating(false);
    };

    const imageContainer = document.querySelector(".wheel-container-3d");
    if (imageContainer) {
      imageContainer.addEventListener("mousemove", handleMouseMove);
      imageContainer.addEventListener("mouseleave", () =>
        setIsAutoRotating(true)
      );
    }

    return () => {
      if (imageContainer) {
        imageContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const features = [
    {
      id: 1,
      top: "9%",
      left: "52%",
      text: "Carbon fiber finish",
      color: "#64ffda",
    },
    { id: 2, top: "46%", left: "70%", text: "Premium grip", color: "#ff6b9d" },
    {
      id: 3,
      top: "50%",
      left: "18%",
      text: "Performance buttons",
      color: "#ffd93d",
    },
    {
      id: 4,
      top: "68%",
      left: "45%",
      text: "Hand-stitched leather",
      color: "#a78bfa",
    },
    {
      id: 5,
      top: "80%",
      left: "60%",
      text: "RS badge detail",
      color: "#60a5fa",
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Text Section */}
        <div style={styles.textSide}>
          <div style={styles.textContent}>
            <span style={styles.subtitle}>PREMIUM CRAFTSMANSHIP</span>
            <h2 style={styles.title}>Take Control</h2>
            <p style={styles.description}>
              Control Customs UK specialize in high-quality steering wheel
              re-trims and carbon fiber upgrades, so you can add an extra touch
              of style or a luxurious look to your car interior.
            </p>
            <div style={styles.featuresList}>
              {features.map((feature) => (
                <div
                  key={feature.id}
                  style={{
                    ...styles.featureItem,
                    borderColor:
                      activeFeature === feature.id
                        ? feature.color
                        : "rgba(0,0,0,0.1)",
                    background:
                      activeFeature === feature.id
                        ? `${feature.color}15`
                        : "transparent",
                  }}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <div
                    style={{ ...styles.featureDot, background: feature.color }}
                  ></div>
                  <span style={styles.featureText}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Image Section */}
        <div style={styles.imageSide}>
          <div style={styles.lightOverlay}></div>
          <div
            className="wheel-container-3d"
            style={{
              ...styles.wheelContainer,
              transform: isAutoRotating
                ? "perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)"
                : `perspective(1200px) rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg) scale(1.05)`,
              transition: isAutoRotating
                ? "transform 0.5s ease-out"
                : "transform 0.1s ease-out",
            }}
          >
            <div style={styles.glowEffect}></div>
            <img
              src="/img/img-1.png"
              alt="Steering Wheel"
              style={styles.wheelImg}
            />

            {features.map((feature) => (
              <div
                key={feature.id}
                style={{
                  ...styles.dot,
                  top: feature.top,
                  left: feature.left,
                  background: feature.color,
                  boxShadow:
                    activeFeature === feature.id
                      ? `0 0 30px ${feature.color}, 0 0 60px ${feature.color}40`
                      : `0 0 15px ${feature.color}, 0 0 30px ${feature.color}30`,
                  transform:
                    activeFeature === feature.id ? "scale(1.5)" : "scale(1)",
                }}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div style={styles.dotPulse}></div>
                {activeFeature === feature.id && (
                  <div
                    style={{ ...styles.tooltip, borderColor: feature.color }}
                  >
                    {feature.text}
                  </div>
                )}
              </div>
            ))}

            <svg
              style={styles.svg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {features.map((feature) => (
                <line
                  key={`line-${feature.id}`}
                  x1="50"
                  y1="50"
                  x2={feature.left}
                  y2={feature.top}
                  stroke={
                    activeFeature === feature.id
                      ? feature.color
                      : "rgba(0,0,0,0.1)"
                  }
                  strokeWidth={activeFeature === feature.id ? "0.3" : "0.15"}
                  style={{
                    transition: "all 0.3s ease",
                    filter:
                      activeFeature === feature.id
                        ? `drop-shadow(0 0 5px ${feature.color})`
                        : "none",
                  }}
                />
              ))}
            </svg>
          </div>
          <p style={styles.instruction}>Hover to explore in 3D</p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    minHeight: "100vh",
    background: "#ffffff", // changed to white
    padding: "80px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  container: {
    maxWidth: "1400px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },
  textSide: {
    color: "#000000", // changed text to black
    padding: "40px",
  },
  textContent: {
    maxWidth: "600px",
  },
  subtitle: {
    fontSize: "0.85rem",
    letterSpacing: "3px",
    color: "#1a73e8", // changed to blue accent
    fontWeight: "600",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "15px",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    marginBottom: "25px",
    color: "#3e81f6", // black
    lineHeight: "1.2",
  },
  description: {
    fontSize: "1.15rem",
    lineHeight: "1.8",
    color: "#000000", // black
    marginBottom: "40px",
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  featureDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  featureText: {
    fontSize: "0.95rem",
    color: "#000000",
  },
  imageSide: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  lightOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none",
    animation: "pulse 4s ease-in-out infinite",
  },
  wheelContainer: {
    position: "relative",
    width: "500px",
    height: "500px",
    transformStyle: "preserve-3d",
    cursor: "grab",
  },
  glowEffect: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    background: "radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  wheelImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    pointerEvents: "none",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },
  dot: {
    position: "absolute",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
    zIndex: 2,
    transition: "all 0.3s ease",
    animation: "dotPulse 2s ease-in-out infinite",
  },
  dotPulse: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "inherit",
    opacity: 0.5,
    animation: "ripple 2s ease-out infinite",
  },
  tooltip: {
    position: "absolute",
    bottom: "120%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.9)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
    border: "1px solid",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    pointerEvents: "none",
    animation: "fadeIn 0.2s ease-out",
  },
  instruction: {
    marginTop: "30px",
    color: "rgba(0, 0, 0, 0.5)", // black instruction
    fontSize: "0.9rem",
    fontStyle: "italic",
    textAlign: "center",
  },
};

// CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
  }
  @keyframes dotPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  @keyframes ripple {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(5px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @media (max-width: 1024px) {
    .control-section > div {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default ControlSection;
