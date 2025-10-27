import React, { useState, useRef, useCallback, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/ProjectComparison.css";

const ProjectComparison = () => {
  const [sliderPosition1, setSliderPosition1] = useState(50);
  const [sliderPosition2, setSliderPosition2] = useState(50);
  const [sliderPosition3, setSliderPosition3] = useState(50);

  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  const [isDragging, setIsDragging] = useState(null);

  // ✅ Initialize AOS only once (no repeat, no delay)
  useEffect(() => {
    AOS.init({
      duration: 0, // disable animation time
      once: true,
      mirror: false,
      startEvent: "DOMContentLoaded",
    });
  }, []);

  // ✅ Update position smoothly using requestAnimationFrame
  const updateSliderPosition = useCallback(
    (clientX, containerRef, setPosition) => {
      if (containerRef.current) {
        const { left, width } = containerRef.current.getBoundingClientRect();
        let newX = ((clientX - left) / width) * 100;
        newX = Math.max(0, Math.min(newX, 100));
        window.requestAnimationFrame(() => setPosition(newX));
      }
    },
    []
  );

  const handleStartDrag = (e, sliderId) => {
    e.preventDefault();
    setIsDragging(sliderId);
    const clientX = e.clientX || e.touches[0].clientX;
    const ref =
      sliderId === 1
        ? containerRef1
        : sliderId === 2
        ? containerRef2
        : containerRef3;
    const setPos =
      sliderId === 1
        ? setSliderPosition1
        : sliderId === 2
        ? setSliderPosition2
        : setSliderPosition3;
    updateSliderPosition(clientX, ref, setPos);
  };

  const handleStopDrag = () => setIsDragging(null);

  const handleDragMove = useCallback(
    (e) => {
      if (isDragging !== null) {
        const clientX = e.clientX ?? e.touches[0].clientX;
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

        updateSliderPosition(clientX, ref, setPos);
      }
    },
    [isDragging, updateSliderPosition]
  );

  // ✅ Event listeners for drag
  useEffect(() => {
    if (isDragging !== null) {
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

  const ComparisonCard = ({ id, position, containerRef }) => {
    return (
      <div className="comparison-container" ref={containerRef}>
        {/* Before Image */}
        <img
          src="/img/DSC04395-scaled.jpg"
          alt="Before"
          className="comparison-before"
        />

        {/* After Image Overlay */}
        <div
          className="comparison-overlay"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src="/img/IMG_4667-1-768x768.jpg"
            alt="After"
            className="comparison-after"
          />
        </div>

        {/* Slider Handle */}
        <div
          className="slider-handle"
          style={{ left: `${position}%` }}
          onMouseDown={(e) => handleStartDrag(e, id)}
          onTouchStart={(e) => handleStartDrag(e, id)}
        >
          <span className="handle-icon">↔</span>
        </div>
      </div>
    );
  };

  return (
    <section style={{ backgroundColor: "#fff" }}>
      <div style={{ textAlign: "center" }}>
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
        />
        <ComparisonCard
          id={2}
          position={sliderPosition2}
          containerRef={containerRef2}
        />
        <ComparisonCard
          id={3}
          position={sliderPosition3}
          containerRef={containerRef3}
        />
      </div>
    </section>
  );
};

export default ProjectComparison;
