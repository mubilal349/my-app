import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../assets/css/style.css";

const HeroSlider = () => {
  const slidesRef = useRef([]);
  const touchStartX = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Animate slide text and overlay
  const animateText = (index) => {
    const slide = slidesRef.current[index];
    if (slide) {
      const text = slide.querySelector(".content h1");
      gsap.fromTo(
        text,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );
      const overlay = slide.querySelector(".overlay");
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 0.3, duration: 1, ease: "power2.out" }
      );
    }
  };

  // Change slide
  const changeSlide = (direction) => {
    const nextSlide =
      direction === "next"
        ? (currentSlide + 1) % totalSlides
        : (currentSlide - 1 + totalSlides) % totalSlides;

    gsap.to(slidesRef.current[currentSlide], {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    setCurrentSlide(nextSlide);
  };

  // Animate slides on change
  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      slide.style.opacity = index === currentSlide ? 1 : 0;
      slide.style.zIndex = index === currentSlide ? 1 : 0;
    });
    animateText(currentSlide);
  }, [currentSlide]);

  // Auto slide every 5s
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
      img: "/img/img-5.jpg",
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
      img: "/img/img-5.jpg",
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
      img: "/img/img-5.jpg",
    },
  ];

  return (
    <section
      className="hero-slider"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el)}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === 0 ? 1 : 0,
            transition: "opacity 1s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.4)",
            }}
          ></div>

          <div
            className="content"
            style={{
              position: "relative",
              zIndex: 10,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)", // smaller & responsive
              letterSpacing: "1px",
              lineHeight: "1.3",
              padding: "0 20px",
              maxWidth: "900px", // limits width for desktop
              margin: "0 auto",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontWeight: 600,
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              {slide.text}
            </h1>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div
        className="navigation"
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
          zIndex: 20,
        }}
      >
        {["prev", "next"].map((dir) => (
          <div
            key={dir}
            className={dir}
            onClick={() => changeSlide(dir)}
            style={{
              cursor: "pointer",
              fontSize: "clamp(30px, 10vw, 40px)",
              color: "#fff",
              userSelect: "none",
              transition: "transform 0.3s",
              padding: "10px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(2px)",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {dir === "prev" ? "\u276E" : "\u276F"}
          </div>
        ))}
      </div>

      {/* Mobile touch gestures */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 15,
          touchAction: "pan-y",
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (!touchStartX.current) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) changeSlide("next");
            else changeSlide("prev");
          }
          touchStartX.current = null;
        }}
      />
    </section>
  );
};

export default HeroSlider;
