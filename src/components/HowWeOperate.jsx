import React from "react";
import "../assets/css/HowWeOperate.css";

const HowWeOperate = () => {
  return (
    <section>
      <div style={{ textAlign: "center" }}>
        <h2 className="aft-1">How do we operate</h2>
        <h2 className="aft-2">The new steering wheel - three possibilities</h2>
        <p>
          We tailor specifically to your needs. You choose how you want your
          steering wheel to look.
        </p>
      </div>

      <div className="options-container">
        <div className="option-card">
          <h2>First option</h2>
          <ul>
            <li>
              Send us your original Steering Wheel® - This will then be modified
              to your exact specifications.
            </li>
            <li>
              Upon completion photographs will be sent to ensure you are
              satisfied before making payment.
            </li>
            <li>
              Once payment has been received your Modified ControlCustomsUK
              Steering Wheel will be sent to you. (+Please note this means you
              will be without a steering wheel for the duration of production)
            </li>
          </ul>
        </div>

        <div className="option-card">
          <h2>Second option</h2>
          <ul>
            <li>
              Pay a holding deposit – A new OEM Wheel will be purchased and
              modified to your exact specifications.
            </li>
            <li>
              Upon completion photographs will be sent to ensure you are
              satisfied before making payment.
            </li>
            <li>
              Once payment has been received your New ControlCustomsUK Wheel
              will be sent to you.
            </li>
            <li>
              Upon installation of your new Wheel, send us your original (as
              well as provide tracking details) and your deposit will be
              released back to you once received.
            </li>
          </ul>
        </div>

        <div className="option-card">
          <h2>Third option</h2>
          <ul>
            <li>
              Keep your original Steering Wheel – Payment up front for a new OEM
              Wheel, which is then modified to your exact specifications.
            </li>
            <li>
              Upon completion photographs will be sent to ensure you are
              satisfied before making payment.
            </li>
            <li>
              Once payment has been received your New ControlCustomsUK Steering
              Wheel will be sent to you.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowWeOperate;
