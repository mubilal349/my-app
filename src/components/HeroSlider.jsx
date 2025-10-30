import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../assets/css/HeroSlider.css";

const HeroSlider = () => {
  const slidesRef = useRef([]);
  const touchStartX = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const animateText = (index) => {
    const slide = slidesRef.current[index];
    if (slide) {
      const text = slide.querySelector(".content h1");
      gsap.fromTo(
        text,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
      const overlay = slide.querySelector(".overlay");
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 0.4, duration: 1 });
    }
  };

  const changeSlide = (direction) => {
    const nextSlide =
      direction === "next"
        ? (currentSlide + 1) % totalSlides
        : (currentSlide - 1 + totalSlides) % totalSlides;

    gsap.to(slidesRef.current[currentSlide], {
      opacity: 0,
      duration: 0.8,
    });

    setCurrentSlide(nextSlide);
  };

  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      slide.style.opacity = index === currentSlide ? 1 : 0;
      slide.style.zIndex = index === currentSlide ? 1 : 0;
    });
    animateText(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => changeSlide("next"), 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const slides = [
    {
      text: (
        <>
          THE HIGHEST
          <br />
          QUALITY
          <br />
          STANDARDS.
        </>
      ),
      img: "/img/banner/steering-1.jpg",
    },
    {
      text: (
        <>
          INNOVATION
          <br />
          IN EVERY
          <br />
          DETAIL.
        </>
      ),
      img: "/img/banner/steering-4.jpg",
    },
    {
      text: (
        <>
          ENGINEERED
          <br />
          FOR
          <br />
          PERFORMANCE.
        </>
      ),
      img: "/img/banner/steering-5.jpg",
    },
  ];

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el)}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="overlay"></div>
          <div className="content">
            <h1>{slide.text}</h1>
          </div>
        </div>
      ))}

      <div className="navigation">
        <div className="prev" onClick={() => changeSlide("prev")}>
          &#10094;
        </div>
        <div className="next" onClick={() => changeSlide("next")}>
          &#10095;
        </div>
      </div>

      {/* Mobile swipe */}
      <div
        className="touch-area"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (!touchStartX.current) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50)
            diff > 0 ? changeSlide("next") : changeSlide("prev");
          touchStartX.current = null;
        }}
      />
    </section>
  );
};

export default HeroSlider;
