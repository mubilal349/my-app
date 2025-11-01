import React, { useEffect } from "react";
import "../assets/css/about.css";
import BackToTop from "../components/BackToTop";
import bg from "/img/img-11.jpeg";

const About = () => {
  useEffect(() => {
    // Optional JS (if you have animations or hamburger toggle)
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav ul");

    hamburger?.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("open");
    });
  }, []);

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section
        className="hero"
        style={{ background: `url(${bg}) center/cover no-repeat` }}
      >
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Control Customs</h1>
          <h2>Group</h2>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section className="about">
        <div className="about-content">
          <div className="text">
            <h4>ABOUT US</h4>
            <h2>Market leaders</h2>
            <p>
              Welcome to <strong>Steer Line Canada</strong>, the premier
              destination for steering wheel re-trimming and customization. We
              understand how important it is for Canadians to have a vehicle
              that looks, feels, and performs perfectly — and nothing transforms
              your driving experience like a custom-crafted steering wheel.
            </p>

            <p>
              At <strong>Steer Line</strong>, we offer premium steering wheels
              built with the finest materials, including carbon fibre and
              Alcantara. Whether you drive through snowy Alberta mornings or the
              streets of downtown Toronto, our steering wheels combine
              durability, comfort, and a modern sporty look that matches your
              lifestyle.
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
                Canadian drivers
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

      {/* ===== What Sets Us Apart ===== */}
      <section className="what-sets-us-apart">
        <div className="container">
          <div className="left-content">
            <p className="subtitle">WHY CONTROL CUSTOMS</p>
            <h1>What sets us apart</h1>
            <p className="description">
              Four key features set us apart: highest quality materials,
              individual order handling, multiple contact options, and the
              ability to modify any steering wheel.
            </p>
            <button className="call-to-action">See Realisations</button>
          </div>

          <div className="right-content">
            <div className="feature-card">
              <h2>Top quality materials</h2>
              <p>
                We focus on quality. Sustainability and customer satisfaction is
                our priority.
              </p>
            </div>
            <div className="feature-card">
              <h2>Individual order handling</h2>
              <p>
                The customer is the most important to us, which is why we devote
                our full attention to each client.
              </p>
            </div>
            <div className="feature-card">
              <h2>We modify every steering wheel</h2>
              <p>
                We are able to help you no matter what kind of steering wheel
                you have.
              </p>
            </div>
            <div className="feature-card">
              <h2>Multiple opportunities for contact</h2>
              <p>You can contact us by phone, email and social media.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">Shipping Policy</a>
          <a href="#">Warranty & Refund Policy</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>

        <div className="footer-socials">
          <a href="#">
            <i className="uil uil-facebook-f"></i>
          </a>
          <a href="#">
            <i className="uil uil-instagram"></i>
          </a>
          <a href="#">
            <i className="uil uil-pinterest"></i>
          </a>
          <a href="#">
            <i className="uil uil-youtube"></i>
          </a>
          <a href="#">
            <i className="uil uil-tiktok"></i>
          </a>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-payments">
          <img src="/img/img-6.avif" alt="PayPal" />
        </div>

        <p className="footer-copy">© 2025 STEER LINE</p>
      </footer>

      {/* ===== WhatsApp Floating Button ===== */}
      <a
        href="https://wa.me/447598863458"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="uil uil-whatsapp"></i>
      </a>
      <BackToTop />
    </>
  );
};

export default About;
