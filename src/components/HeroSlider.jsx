import React from "react";
import "../assets/css/style.css";

const HeroSlider = () => {
  return (
    <>
      <section className="hero-slider">
        {/* Slide 1 */}
        <div
          className="slide active"
          style={{ backgroundImage: "url('/img/img-5.jpg')" }} // 'style' is a JS object
        >
          <div className="overlay"></div>
          <div className="content">
            {/* Note: In JSX, <br> is typically self-closing as <br /> but <br> is also accepted */}
            <h1>
              THE HIGHEST
              <br />
              QUALITY
              <br />
              STANDARDS.
            </h1>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          className="slide"
          style={{ backgroundImage: "url('/img/img-5.jpg')" }} // 'style' is a JS object
        >
          <div className="overlay"></div>
          <div className="content">
            <h1>
              INNOVATION
              <br />
              IN EVERY
              <br />
              DETAIL.
            </h1>
          </div>
        </div>

        {/* Slide 3 */}
        <div
          className="slide"
          style={{ backgroundImage: "url('/img/img-5.jpg')" }} // 'style' is a JS object
        >
          <div className="overlay"></div>
          <div className="content">
            <h1>
              ENGINEERED
              <br />
              FOR
              <br />
              PERFORMANCE.
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="navigation">
          <div className="prev">&#10094;</div>
          <div className="next">&#10095;</div>
        </div>
      </section>
    </>
  );
};

export default HeroSlider;
