import React from "react";
import logo from "/img/Steerline_Adil-UK_SuperX_CJ___Tommy_on_a_Date-removebg-preview.png";

const Navbar = () => {
  return (
    <header>
      <div className="logo">
        <a href="/">
          <img src={logo} alt="Control Customs Logo" />
        </a>
      </div>

      <nav>
        <ul>
          <li>
            <a href="/" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="/about">About us</a>
          </li>
          <li>
            <a href="/design">Design</a>
          </li>
          <li>
            <a href="/realisations">Realisations</a>
          </li>
          <li>
            <a href="/partners">Partners</a>
          </li>
          <li>
            <a href="/shop">Shop</a>
          </li>
        </ul>
      </nav>

      <a href="#" className="cta">
        Get A Quote
      </a>

      <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Navbar;
