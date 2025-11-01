import React from "react";
import "../assets/css/design.css";
import BackToTop from "../components/BackToTop";

const Design = () => {
  return (
    <div className="design-page">
      {/* ✅ Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Control Customs</h1>
          <h2>Group</h2>
        </div>
      </section>

      {/*=========== Image Section ============*/}
      <section className="control-section">
        <div className="control-content">
          <div className="image-side">
            <div className="light-overlay"></div>
            <div className="wheel-container">
              <img
                src="/img/img-1.png"
                alt="Steering Wheel"
                className="wheel-img"
              />
              <div
                className="dot"
                style={{ top: "9%", left: "52%" }}
                data-text="Carbon fiber finish"
              ></div>
              <div
                className="dot"
                style={{ top: "46%", left: "70%" }}
                data-text="Premium grip"
              ></div>
              <div
                className="dot"
                style={{ top: "50%", left: "18%" }}
                data-text="Performance buttons"
              ></div>
              <div
                className="dot"
                style={{ top: "68%", left: "45%" }}
                data-text="Hand-stitched leather"
              ></div>
              <div
                className="dot"
                style={{ top: "80%", left: "60%" }}
                data-text="RS badge detail"
              ></div>
            </div>
          </div>

          <div className="text-side">
            <h2>Take control</h2>
            <p>
              Control Customs UK specialize in high-quality steering wheel
              re-trims and carbon fiber upgrades, so you can add an extra touch
              of style or a luxurious look to your car interior.
            </p>
          </div>
        </div>
      </section>

      {/*=========== Offer Cards ===============*/}
      <section className="steering-offer">
        <div className="offer-content">
          <p className="offer-tag">OFFER</p>
          <h2 className="offer-title">Design your own steering wheel</h2>
          <p className="offer-hashtag">#drivewithcontrol</p>
          <p className="offer-desc">
            Take a look at our offer dedicated specifically to people with
            passion.
          </p>
          <p className="offer-sub">Design your own steering wheel.</p>
        </div>

        <div className="offer-grid">
          {[
            {
              title: "Carbon fiber",
              img: "/img/img-10.jpg",
              btn: "Design Your Steering Wheel",
            },
            {
              title: "Steering wheel re-trims",
              img: "/img/img-10.jpg",
              btn: "Design Your Steering Wheel",
            },
            {
              title: "Airbag covers",
              img: "/img/img-10.jpg",
              btn: "Design Your Airbag Cover",
            },
          ].map((item, i) => (
            <div className="offer-card" key={i}>
              <div className="img-wrapper">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="card-info">
                <h3>{item.title}</h3>
                <a href="#" className="btn">
                  {item.btn}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*=========== FAQ Section ===============*/}
      <section className="faqs">
        <div className="faqs-container">
          <p className="faqs-tag">FAQS</p>
          <h2 className="faqs-title">Frequently Asked Questions</h2>

          <div className="faq-items">
            {[
              {
                question: "How much does the modification cost?",
                answer:
                  "Several factors contribute to the price, including the type of modification and the steering wheel model. Work is priced individually.",
              },
              {
                question: "How long does it take to complete the modification?",
                answer:
                  "The process usually takes 7–10 business days depending on the customization level and current workload.",
              },
              {
                question: "Can I ship my steering wheel to you?",
                answer:
                  "Yes, we accept mail-in steering wheels. You can contact us for shipping instructions and packaging tips.",
              },
            ].map((faq, index) => (
              <div className="faq-card" key={index}>
                <div
                  className="faq-header"
                  onClick={(e) => {
                    e.currentTarget.parentElement.classList.toggle("open");
                  }}
                >
                  <h3>{faq.question}</h3>
                  <span className="toggle">+</span>
                </div>
                <div className="faq-body">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*================ Configurator Section ==============*/}
      <section className="configurator">
        <div className="config-wrapper">
          <div className="config-text">
            <p className="config-tag">CONFIGURATOR</p>
            <h2 className="config-title">
              See what your steering wheel can look like
            </h2>
            <p className="config-desc">
              Select the modifications you are interested in, send us a photo of
              your steering wheel, and we will prepare an offer especially for
              you.
            </p>
            <button className="config-btn">I Want To See</button>
          </div>

          <div className="config-image">
            <img src="/img/img-4.webp" alt="Customized steering wheel" />
          </div>
        </div>
      </section>

      {/*======== Footer ==========*/}
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

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/447598863458"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        <i className="uil uil-whatsapp"></i>
      </a>
      <BackToTop />
    </div>
  );
};

export default Design;
