import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Catalogue.css";

const categories = {
  Catalogue: [
    {
      name: "Keyrings",
      image: "/img/keychains/10.png",
    },
    { name: "Badges", image: "/img/accessories/28.png" },
    { name: "Diffusers", image: "/img/accessories/1.png" },
    {
      name: "Steering",
      image: "/img/before-and-after/before-after 1 (2).jpg",
    },
  ],
};

const Catalogue = () => {
  const navigate = useNavigate();

  const handleExploreMore = (e) => {
    e.preventDefault();
    navigate("/accessories");
  };

  return (
    <div className="catalogue-container">
      {Object.keys(categories).map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="subcategories-grid">
            {categories[category].map((subcat) => (
              <div key={subcat.name} className="subcategory-card-wrapper">
                <Link
                  to={`/category/${category}/${subcat.name}`}
                  className="subcategory-card"
                >
                  <img src={subcat.image} alt={subcat.name} />
                  <p>{subcat.name}</p>
                </Link>

                {/* Explore More Button */}
                <button
                  className="explore-more-btn"
                  onClick={handleExploreMore}
                  aria-label="Explore more products"
                >
                  <span className="btn-text">Explore</span>
                  <span className="btn-icon">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
