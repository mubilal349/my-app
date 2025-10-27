import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Links */}
      <div className="footer-links">
        <a href="#">Shipping Policy</a>
        <a href="#">Warranty & Refund Policy</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>

      {/* Footer Socials (Unicons) */}
      <div className="footer-socials">
        {/* Note: Ensure the Unicons CSS library is linked in your public/index.html */}
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

      {/* Footer Payments */}
      <div className="footer-payments">
        {/* Remember to handle image paths correctly (import or public folder) */}
        <img src="/img/img-6.avif" alt="PayPal" />

        {/* Uncommented the other payment images for completeness, using self-closing tags */}
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png" alt="MasterCard" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Pay" /> */}
      </div>

      <p className="footer-copy">© 2025 STEER LINE</p>
    </footer>
  );
};

export default Footer;
