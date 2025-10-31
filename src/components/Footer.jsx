import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Links */}
      <div className="footer-links">
        <a href="#" className=" hover:text-[#3b82f6] transition-colors">
          Shipping Policy
        </a>
        <a href="#" className=" hover:text-[#3b82f6] transition-colors">
          Warranty & Refund Policy
        </a>
        <a href="#" className=" hover:text-[#3b82f6] transition-colors">
          Privacy Policy
        </a>
        <a href="#" className=" hover:text-[#3b82f6] transition-colors">
          Terms of Service
        </a>
      </div>

      {/* Footer Socials (Unicons) */}

      <div className="footer-socials flex gap-4">
        <a href="#">
          <FaFacebookF
            size={24}
            className="text-white hover:text-[#3b82f6] transition-colors"
          />
        </a>
        <a href="#">
          <FaInstagram
            size={24}
            className="text-white hover:text-[#3b82f6] transition-colors"
          />
        </a>
        <a href="#">
          <FaYoutube
            size={24}
            className="text-white hover:text-[#3b82f6] transition-colors"
          />
        </a>
        <a href="#">
          <FaTiktok
            size={24}
            className="text-white hover:text-[#3b82f6] transition-colors"
          />
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
