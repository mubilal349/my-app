import React from "react";
import { Link } from "react-router-dom";
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
      name: "Steering Wheels",
      image: "/img/before-and-after/before-after 1 (2).jpg",
    },
  ],
};

const Catalogue = () => {
  return (
    <div className="catalogue-container">
      {Object.keys(categories).map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="subcategories-grid">
            {categories[category].map((subcat) => (
              <Link
                key={subcat.name}
                to={`/category/${category}/${subcat.name}`}
                className="subcategory-card"
              >
                <img src={subcat.image} alt={subcat.name} />
                <p>{subcat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
