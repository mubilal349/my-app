import React, { useState, useRef, useCallback, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/ProjectComparison.css";

const ProjectComparison = () => {
  // Slider positions (0–100)
  const [sliderPosition1, setSliderPosition1] = useState();
  const [sliderPosition2, setSliderPosition2] = useState();
  const [sliderPosition3, setSliderPosition3] = useState();

  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  const [isDragging, setIsDragging] = useState(null);

  // Initialize AOS (no animation delay)
  useEffect(() => {
    AOS.init({
      duration: 0,
      once: true,
      mirror: false,
      startEvent: "DOMContentLoaded",
    });
  }, []);

  // Smoothly update the slider
  const updateSliderPosition = useCallback(
    (clientX, containerRef, setPosition) => {
      if (!containerRef?.current) return;
      const { left, width } = containerRef.current.getBoundingClientRect();
      let newX = ((clientX - left) / width) * 100;
      newX = Math.max(0, Math.min(newX, 100));
      window.requestAnimationFrame(() => setPosition(newX));
    },
    []
  );

  const handleStartDrag = (e, id) => {
    e.preventDefault();
    setIsDragging(id);
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    const ref =
      id === 1 ? containerRef1 : id === 2 ? containerRef2 : containerRef3;
    const setPos =
      id === 1
        ? setSliderPosition1
        : id === 2
        ? setSliderPosition2
        : setSliderPosition3;
    if (clientX != null) updateSliderPosition(clientX, ref, setPos);
  };

  const handleStopDrag = () => setIsDragging(null);

  const handleDragMove = useCallback(
    (e) => {
      if (isDragging == null) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      const ref =
        isDragging === 1
          ? containerRef1
          : isDragging === 2
          ? containerRef2
          : containerRef3;
      const setPos =
        isDragging === 1
          ? setSliderPosition1
          : isDragging === 2
          ? setSliderPosition2
          : setSliderPosition3;
      if (clientX != null) updateSliderPosition(clientX, ref, setPos);
    },
    [isDragging, updateSliderPosition]
  );

  // Event listeners while dragging
  useEffect(() => {
    if (isDragging != null) {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleStopDrag);
      document.addEventListener("touchmove", handleDragMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleStopDrag);
    }
    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleStopDrag);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleStopDrag);
    };
  }, [isDragging, handleDragMove]);

  // Single comparison card
  const ComparisonCard = ({ id, position, containerRef, before, after }) => {
    const beforeSrc = before || "/img/before-and-after/default-before.jpg";
    const afterSrc = after || "/img/before-and-after/default-after.jpg";

    return (
      <div
        className="comparison-container"
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          marginBottom: "40px",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Before Image */}
        <img
          src={beforeSrc}
          alt={`Before ${id}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          draggable={false}
        />

        {/* After Overlay */}
        <div
          className="comparison-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${position}%`,
            overflow: "hidden",
            transition: "width 0.15s linear",
          }}
        >
          <img
            src={afterSrc}
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

        {/* === Center Divider Line === */}
        <div
          className="slider-line"
          style={{
            position: "absolute",
            top: 0,
            left: `${position}%`,
            transform: "translateX(-50%)",
            width: "3px",
            height: "100%",
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.2)",
            boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            cursor: "ew-resize",
            zIndex: 5,
            userSelect: "none",
          }}
          onMouseDown={(e) => handleStartDrag(e, id)}
          onTouchStart={(e) => handleStartDrag(e, id)}
        >
          {/* Handle Circle */}
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
          id={1}
          position={sliderPosition1}
          containerRef={containerRef1}
          before="/img/before-and-after/before-after 1.jpg"
          after="/img/before-and-after/before-after 1 (2).jpg"
        />
        <ComparisonCard
          id={2}
          position={sliderPosition2}
          containerRef={containerRef2}
          before="/img/before-and-after/before-after 4.jpg"
          after="/img/before-and-after/before-after 4 02.jpg"
        />
        <ComparisonCard
          id={3}
          position={sliderPosition3}
          containerRef={containerRef3}
          before="/img/before-and-after/before-after 5.jpg"
          after="/img/before-and-after/before-after 5 02.jpg"
        />
      </div>
    </section>
  );
};

export default ProjectComparison;
