import React from "react";

const ImageCards = () => {
  return (
    <section className="steering-wheel-offer">
      <div className="container">
        <p className="aft-1">OFFER</p>
        <h2 className="aft-2">Design your own steering wheel</h2>
        <p className="hashtag">#drivewithcontrol</p>
        <p className="description">
          Take a look at our offer dedicated specifically to people with
          passion.
        </p>
        <p className="sub-description">Design your own steering wheel.</p>

        <div className="offer-cards">
          {/* Card 1: Carbon Fiber */}
          <div className="card">
            {/* Remember to handle the image src correctly in React (import or public folder path) */}
            <img src="/img/img-10.jpg" alt="Carbon fiber steering wheel" />
            <div className="card-content">
              <h2>Carbon fiber</h2>
              <a href="#" className="btn">
                Design Your Steering Wheel
              </a>
            </div>
          </div>

          {/* Card 2: Steering Wheel Re-trims */}
          <div className="card">
            <img src="/img/img-10.jpg" alt="Steering wheel re-trims" />
            <div className="card-content">
              <h2>Steering wheel re-trims</h2>
              <a href="#" className="btn">
                Design Your Steering Wheel
              </a>
            </div>
          </div>

          {/* Card 3: Airbag Covers */}
          <div className="card">
            <img src="/img/img-10.jpg" alt="Airbag covers" />
            <div className="card-content">
              <h2>Airbag covers</h2>
              <a href="#" className="btn">
                Design Your Airbag Cover
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCards;
