import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/ProjectComparison.css";

const ProjectComparison = () => {
  // Start with after hidden but line in center
  const [positions, setPositions] = useState([0, 0, 0]);
  const containerRefs = [useRef(null), useRef(null), useRef(null)];
  const activeIndex = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 0, once: true });
  }, []);

  const startDrag = (e, index) => {
    e.preventDefault();
    activeIndex.current = index;
    document.body.style.userSelect = "none";
    // when drag starts, reveal after image slightly
    setPositions((prev) =>
      prev.map((p, i) => (i === index && p === 0 ? 0.1 : p))
    );
  };

  const stopDrag = () => {
    activeIndex.current = null;
    document.body.style.userSelect = "auto";
  };

  const onPointerMove = (e) => {
    if (activeIndex.current === null) return;
    const container = containerRefs[activeIndex.current].current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    let percent = ((clientX - left) / width) * 100;
    percent = Math.max(0, Math.min(percent, 100));

    // 👇 Update both overlay width and handle line position
    setPositions((prev) =>
      prev.map((p, i) => (i === activeIndex.current ? percent : p))
    );
  };

  useEffect(() => {
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", stopDrag);
    document.addEventListener("touchmove", onPointerMove, { passive: false });
    document.addEventListener("touchend", stopDrag);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", stopDrag);
      document.removeEventListener("touchmove", onPointerMove);
      document.removeEventListener("touchend", stopDrag);
    };
  }, []);

  const ComparisonCard = ({ id, before, after }) => {
    const position = positions[id];
    return (
      <div
        ref={containerRefs[id]}
        className="comparison-container"
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          marginBottom: "40px",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          touchAction: "none",
        }}
      >
        {/* Before Image */}
        <img
          src={before}
          alt={`Before ${id}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          draggable={false}
        />

        {/* After Overlay - starts hidden */}
        <div
          className="comparison-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${position}%`,
            overflow: "hidden",
            transition: "width 0.1s linear",
          }}
        >
          <img
            src={after}
            alt={`After ${id}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            draggable={false}
          />
        </div>

        {/* Draggable Line (follows overlay position) */}
        <div
          className="slider-line"
          style={{
            position: "absolute",
            top: 0,
            left: position === 0 ? "50%" : `${position}%`,
            transform: "translateX(-50%)",
            width: "3px",
            height: "100%",
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.2)",
            boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            cursor: "ew-resize",
            zIndex: 5,
            userSelect: "none",
            transition: activeIndex.current === id ? "none" : "left 0.15s ease",
          }}
          onPointerDown={(e) => startDrag(e, id)}
          onTouchStart={(e) => startDrag(e, id)}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "24px",
              height: "24px",
              backgroundColor: "#3b82f6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "14px",
              boxShadow: "0 0 8px rgba(0,0,0,0.3)",
            }}
          >
            ↔
          </div>
        </div>
      </div>
    );
  };

  return (
    <section style={{ backgroundColor: "#fff" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 className="aft-1">Projects</h2>
        <h2 className="aft-2">See Our Realisations</h2>
        <p>
          We guarantee the highest quality of the materials we use and a high
          standard of service.
        </p>
      </div>

      <div className="comparison-wrapper" style={{ padding: "29px 4%" }}>
        <ComparisonCard
          id={0}
          before="/img/before-and-after/before-after 1.jpg"
          after="/img/before-and-after/before-after 1 (2).jpg"
        />
        <ComparisonCard
          id={1}
          before="/img/before-and-after/before-after 4.jpg"
          after="/img/before-and-after/before-after 4 02.jpg"
        />
        <ComparisonCard
          id={2}
          before="/img/before-and-after/before-after 5.jpg"
          after="/img/before-and-after/before-after 5 02.jpg"
        />
      </div>
    </section>
  );
};

export default ProjectComparison;
