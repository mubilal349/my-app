import React, { useEffect } from "react";
import "../assets/css/about.css";
import BackToTop from "../components/BackToTop";
import bg from "/img/img-11.jpeg";
import WhatsappIcon from "../components/WhatsappIcon";

const About = () => {
  useEffect(() => {
    // Optional JS (if you have animations or hamburger toggle)
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav ul");

    hamburger?.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    // Add counter animation for stats
    const animateCounter = (element, target) => {
      let count = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          element.textContent =
            target + (element.textContent.includes("+") ? "+" : "");
          clearInterval(timer);
        } else {
          element.textContent =
            Math.floor(count) + (element.textContent.includes("+") ? "+" : "");
        }
      }, 20);
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("counted")
        ) {
          entry.target.classList.add("counted");
          const statNumbers = entry.target.querySelectorAll(".stat h3");
          statNumbers.forEach((stat) => {
            const target = parseInt(stat.textContent);
            animateCounter(stat, target);
          });
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector(".stats");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* ===== About Section ===== */}
      <section className="about">
        <div className="about-content">
          <div className="text">
            <h4>ABOUT US</h4>
            <h2>Market leaders</h2>
            <p>
              Welcome to <strong>Steer Line England</strong>, the premier
              destination for steering wheel re-trimming and customization. We
              understand how important it is for Canadians to have a vehicle
              that looks, feels, and performs perfectly — and nothing transforms
              your driving experience like a custom-crafted steering wheel.
            </p>

            <p>
              At <strong>Steer Line</strong>, we offer premium steering wheels
              built with the finest materials, including carbon fibre and
              Alcantara. Whether you drive through London, our steering wheels
              combine durability, comfort, and a modern sporty look that matches
              your lifestyle.
            </p>

            <p>
              Every wheel we craft is designed to perfection — from unique
              stitching patterns to custom finishes — ensuring your car interior
              feels as exceptional as it performs. Our team is dedicated to
              providing top-quality craftsmanship and professional service from
              consultation to installation.
            </p>

            <ul>
              <li>
                <span className="num">1.</span> Premium materials and
                hand-finished quality
              </li>
              <li>
                <span className="num">2.</span> Custom designs tailored for
                England drivers
              </li>
              <li>
                <span className="num">3.</span> Modification and restoration of
                any steering wheel
              </li>
              <li>
                <span className="num">4.</span> Personalized service and fast
                nationwide shipping
              </li>
            </ul>
          </div>

          <div className="image">
            <img src="/img/img-12.jpg" alt="Steer Line steering wheel" />
          </div>
        </div>
      </section>

      {/* ===== Clients / Map Section ===== */}
      <section className="clients-section">
        <div className="container">
          <div className="map-area">
            <img
              src="/img/global-globalization-world-map-environmental-concservation-concept.jpg"
              alt="World Map"
              className="world-map"
            />
            <div className="dots">
              <span className="dot" style={{ top: "28%", left: "16%" }}></span>
              <span className="dot" style={{ top: "30%", left: "60%" }}></span>
              <span className="dot" style={{ top: "55%", left: "75%" }}></span>
              <span className="dot" style={{ top: "65%", left: "32%" }}></span>
              <span className="dot" style={{ top: "40%", left: "80%" }}></span>
            </div>
          </div>

          <div className="text-area">
            <h5>OUR CLIENTS</h5>
            <h2>We serve customers from all over the world</h2>
            <p>
              Our collaborations extend beyond national borders. We pride
              ourselves on satisfied customers all over the world.
            </p>

            <div className="stats">
              <div className="stat">
                <h3>7K+</h3>
                <p>Satisfied customers</p>
              </div>
              <div className="stat">
                <h3>9K+</h3>
                <p>Customized steering wheel models</p>
              </div>
              <div className="stat">
                <h3>33+</h3>
                <p>Number of brands supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WhatsApp Floating Button ===== */}
      <WhatsappIcon />
      <BackToTop />
    </>
  );
};

export default About;
