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
  Badges: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Badge ${i + 1}`,
    image: `/img/badges${(i % 4) + 1}.png`,
  })),
  Diffusers: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Diffusers ${i + 1}`,
    image: `/img/diffusers${(i % 4) + 1}.png`,
  })),

  SteeringWheels: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `SteeringWheels ${i + 1}`,
    image: `/img/steeringwheels${(i % 4) + 1}.jpg`,
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
