import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../assets/css/SubcategoryPage.css";

const allProducts = {
  Keyrings: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Keyring ${i + 1}`,
    image: `/img/keychains/${10 + i}.png`,
  })),
  Badges: [28, 29].map((num, i) => ({
    id: i + 1,
    name: `Badge ${num}`,
    image: `/img/badges/${num}.png`,
  })),

  Diffusers: [1, 2, 3].map((num, i) => ({
    id: i + 1,
    name: `Diffuser ${num}`,
    image: `/img/Diffuser/${num}.png`,
  })),

  Steering: [1, 2, 5, 6, 7, 8, 9, 10, 11].map((num, i) => ({
    id: i + 1,
    name: `Steering ${num}`,
    image: `/img/steeringwheels/${num}.jpg`,
  })),
};

const SubcategoryPage = () => {
  const { subcategory } = useParams(); // get 'Keyrings' or 'Badges' from URL
  const products = allProducts[subcategory]; // fetch products for that subcategory

  if (!products) {
    return <p>Subcategory not found</p>; // fallback if the subcategory is wrong
  }

  return (
    <div className="subcategory-page">
      <h2>{subcategory}</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/subcategory/${subcategory}/detail`}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
            </Link>
            {/* <p>{product.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryPage;
