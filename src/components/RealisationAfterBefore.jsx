import React, { useState, useRef, useEffect } from "react";
import "../assets/css/ProjectComparison.css"; // We'll define this below

const ProjectComparison = () => {
  // Sample image URLs (replace with your actual images for before/after steering wheels)
  const wheels = [
    {
      before: "/img/before-and-after/before-after 2.jpg",
      after: "/img/before-and-after/before-after 2 02.jpg",
      alt: "Steering Wheel 1",
    },
    {
      before: "/img/before-and-after/before-after 3.jpg",
      after: "/img/before-and-after/before-after 3 02.jpg",
      alt: "Steering Wheel 2",
    },
    {
      before: "/img/before-and-after/before-after 5.jpg",
      after: "/img/before-and-after/before-after 5 02.jpg",
      alt: "Steering Wheel 3",
    },
  ];

  return (
    <div className="slider-container">
      <h2>Before & After Customization</h2>
      <div className="wheels-grid">
        {wheels.map((wheel, index) => (
          <BeforeAfterSlider
            key={index}
            before={wheel.before}
            after={wheel.after}
            alt={wheel.alt}
          />
        ))}
      </div>
    </div>
  );
};

const BeforeAfterSlider = ({ before, after, alt }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="slider-wrapper">
      <div
        className="slider"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <img src={before} alt={`${alt} Before`} className="image before" />
        <img
          src={after}
          alt={`${alt} After`}
          className="image after"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        />
        <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
          <div className="handle-line"></div>
          <div className="handle-circle">
            <span className="arrow left"> ⮚</span>
            <span className="arrow right">⮘</span>
          </div>
        </div>
      </div>
      <div className="labels">
        <span>Before</span>
        <span>After</span>
      </div>
    </div>
  );
};

export default ProjectComparison;
