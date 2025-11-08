import React from "react";

const ImageCards = () => {
  return (
    <section className="how-it-works" style={{ background: "#000" }}>
      {/* <h2 className="how-title">HOW IT WORKS</h2> */}

      <div className="content-box" style={{ background: "#000" }}>
        <div className="steps">
          {/* Single Image */}
          <div className="step">
            <img
              src="/img/how it works.jpg" // Replace with your image path
              alt="Step Image"
              className="step-image"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .how-it-works {
          text-align: center;
          // font-family: "Arial Black", sans-serif;
        }

        .content-box {
          padding: 20px;
          max-width: 1100px;
          margin: 0 auto;
          border: none;
        }

        .steps {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .step {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0px;
        }

        .step-image {
          width: 100%; /* Full width on mobile */
          max-width: 600px; /* Limit width on desktop */
          height: auto;
        }
        .content-box,
        .step-image,
        .step {
          border: none;
          outline: none;
          box-shadow: none;
        }

        /* Desktop layout */
        @media (min-width: 900px) {
          .steps {
            flex-direction: row;
          }

          .step-image {
            max-width: 100%; /* Can grow wider on desktop if needed */
          }
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .content-box {
            padding: 30px 20px;
          }

          .how-title {
            font-size: 1.8rem;
          }

          .step-image {
            width: 100vw; /* Full width on mobile */
          }
        }
      `}</style>
    </section>
  );
};

export default ImageCards;
