import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { color, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productVariants_1 = [
    { id: 1, color: "#2F2F2F", name: "Dark Grey" },
    { id: 2, color: "#FF3B3B", name: "Red" },
    { id: 3, color: "#1B3A52", name: "Navy Blue" },
    { id: 4, color: "#A8D5D5", name: "Light Blue" },
    { id: 5, color: "#D9D9D9", name: "silver " },
    { id: 6, color: "#00FF00", name: "green" },
    { id: 7, color: "#FFA500", name: "orange " },
    { id: 8, color: "#CD7F32", name: "bronze " },
  ];
  const productVariants_2 = [
    { id: 1, color: "#000000", name: "Full Black" },
    { id: 2, color: "#E6E6E6", name: "LT Black White" },
    { id: 3, color: "#FF0000", name: "Red Carbon" },
    { id: 4, color: "#1C1C1C", name: "Black Carbon" },
    { id: 5, color: "#003366", name: "Blue Carbon" },
  ];

  const productVariants_32 = [{ id: 1, color: "#000000", name: "Black" }];
  const productVariants_33 = [{ id: 1, color: "#000000", name: "Black" }];
  const productVariants_35 = [{ id: 1, color: "#000000", name: "Black" }];
  const productVariants_36 = [{ id: 1, color: "#000000", name: "Black" }];
  const productVariants_43 = [{ id: 1, color: "#ADD8E6", name: "Blue White" }];
  const productVariants_13 = [
    {
      id: 1,
      color: "#F7C948",
      name: "warm golden yellow:",
    },
    { id: 2, color: "#FFF44F", name: "lemon" },
  ];
  const productVariants_14 = [
    {
      id: 1,
      color: "#F7C948",
      name: "warm golden yellow:",
    },
    { id: 2, color: "#FFF44F", name: "lemon" },
  ];

  // Pick the variant array for colors
  const currentVariants_1 =
    product.id === 3
      ? productVariants_2 // BMW Steering logo
      : product.id === 32
      ? productVariants_32
      : product.id === 33
      ? productVariants_33
      : product.id === 35
      ? productVariants_35 // Product id 35
      : product.id === 36
      ? productVariants_36
      : product.id === 43
      ? productVariants_43
      : product.id === 13
      ? productVariants_13
      : product.id === 14
      ? productVariants_14
      : productVariants_1; // All other accessories
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentVariants, setCurrentVariants] = useState(productVariants_1); // default
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [randomProducts, setRandomProducts] = useState([]);

  const { cartItems, addToCart, removeFromCart, calculateTotal } = useCart(); // ✅ works now

  const { categoryId } = location.state || {};

  const handleProductClick = (product) => {
    setSelectedProduct(product); // store clicked product
    setSelectedColor(null); // reset selected color
  };

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  // Then later in your component
  const selectedCategory = data?.categories?.find((cat) =>
    cat.products?.some((prod) => prod.id === selectedProduct?.id)
  );

  const categoryDescription = selectedCategory?.description || "";

  // After data is loaded, pick selected product and random products
  // After data is loaded, pick selected product and random products
  useEffect(() => {
    if (!data || !data.categories) return;

    // Find the selected category
    const category = data.categories.find((cat) =>
      cat.products.some((p) => p.id === parseInt(id))
    );

    if (!category) return;

    // Set the main product
    const mainProduct = category.products.find((p) => p.id === parseInt(id));
    setSelectedProduct(mainProduct);

    // Pick products for "Buyers bought these"
    const others = category.products.filter((p) => p.id !== mainProduct.id);

    let productsToShow = [];
    if (others.length === 0) {
      // Only one product in category, show it
      productsToShow = [mainProduct];
    } else {
      // Shuffle others and pick up to 3
      productsToShow = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    setRandomProducts(productsToShow);
  }, [data, id]);

  // Determine if selected product belongs to an accessory category
  const isAccessory =
    data &&
    selectedProduct &&
    data.categories.some(
      (cat) =>
        cat.id === "steeringwheel" &&
        cat.products.some((p) => p.id === selectedProduct.id)
    );

  // Handle resize for responsive layout
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch product data
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  // Set selected product based on ID
  // useEffect(() => {
  //   if (!data) return;
  //   const allProducts = data.categories.flatMap((cat) => cat.products);
  //   const mainProduct = allProducts.find((p) => p.id === parseInt(id));
  //   if (!mainProduct) return;
  //   const variants = allProducts.filter((p) => p.title === mainProduct.title);
  //   setSelectedProduct(variants[0]);
  //   setSelectedColor(variants[0]?.id || 1);
  // }, [data, id]);

  if (!data || !selectedProduct) return <div>Loading...</div>;

  const handleAddToCart = (product) => {
    if (!product) return;

    // Convert discountPrice string to number
    const priceNumber = parseFloat(
      (product.discountPrice || product.originalPrice || "0")
        .replace("£", "")
        .trim()
    );

    addToCart({
      ...product,
      price: priceNumber, // numeric price
      quantity, // selected quantity
      selectedColor, // selected color
    });
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));

  const selectedColorName =
    productVariants_1.find((v) => v.id === selectedColor)?.name || "Dark Grey";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // start transparent and slightly below
      animate={{ opacity: 1, y: 0 }} // animate to visible and normal position
      transition={{ duration: 0.6, ease: "easeOut" }} // smooth duration
      style={{
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          maxWidth: "100%",
          margin: "0 auto",
          gap: "20px",
          padding: isDesktop ? "20px" : "0",
          overflow: "hidden",
        }}
      >
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: isDesktop ? "50%" : "100%" }}
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            style={{
              width: "100%",
              height: isDesktop ? "450px" : "350px",
              objectFit: "cover",
              borderRadius: isDesktop ? "10px" : "0",
              display: "block",
            }}
          />
        </motion.div>

        {/* DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            width: isDesktop ? "50%" : "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: isDesktop ? "flex-start" : "center",
            textAlign: isDesktop ? "left" : "center",
            padding: isDesktop ? "40px" : "20px",
          }}
        >
          <h1
            style={{
              fontFamily: '"Montserrat", "sans-serif"',
              fontSize: "24px",
              fontWeight: "900",
              marginBottom: "10px",
              textTransform: "uppercase",
              color: "#1187cf",
            }}
          >
            {selectedProduct.title}
          </h1>

          {/* PRICE */}
          <p
            style={{
              fontFamily: '"Montserrat", "sans-serif"',
              fontSize: "18px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "120px",
            }}
          >
            <strong style={{ color: "#666" }}>
              {selectedProduct.discountPrice}
            </strong>
            <span
              style={{
                textDecoration: "line-through",
                color: "#fefefe",
                fontSize: "14px",
              }}
            >
              {selectedProduct.originalPrice}
            </span>
          </p>

          {/* COLORS */}
          <div
            style={{
              marginBottom: "25px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#fefefe",
                marginBottom: "10px",
              }}
            >
              COLOUR:{" "}
              {currentVariants_1.find((v) => v.id === selectedColor)?.name ||
                "Select"}
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {currentVariants_1.map((variant) => (
                <div
                  key={variant.id}
                  onClick={() => setSelectedColor(variant.id)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: variant.color,
                    cursor: "pointer",
                    border:
                      selectedColor === variant.id
                        ? "3px solid #000"
                        : "1px solid #ddd",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          {!isAccessory && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isDesktop ? "flex-start" : "center",
                gap: "10px",
                marginBottom: "20px",
                marginTop: isDesktop ? "0px" : "30px",
              }}
            >
              <button
                onClick={decreaseQuantity}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "6px",
                  border: "1px solid #000",
                  backgroundColor: "#1187cf",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                -
              </button>
              <span
                style={{
                  fontSize: "16px",
                  minWidth: "25px",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "6px",
                  border: "1px solid #000",
                  backgroundColor: "#1187cf",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                +
              </button>
            </div>
          )}

          {/* ADD TO CART */}
          <button
            onClick={() => {
              if (!selectedProduct) return;

              // Convert price string to number
              const priceNumber = parseFloat(
                (
                  selectedProduct.discountPrice ||
                  selectedProduct.originalPrice ||
                  "0"
                )
                  .replace("£", "")
                  .trim()
              );

              handleAddToCart({
                ...selectedProduct,
                price: priceNumber, // numeric price
                quantity, // quantity selected
                selectedColor, // selected color
              });
            }}
            style={{
              fontFamily: '"Montserrat", "sans-serif"',
              width: "100%",
              padding: "15px",
              backgroundColor: "#1187cf",
              color: "#fff",
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "4px",
              letterSpacing: "1px",
              marginBottom: "30px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#000")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#1187cf")}
          >
            ADD TO CART
          </button>

          {/* DESCRIPTION */}
          {selectedProduct && (
            <div
              style={{
                fontFamily: '"Montserrat", "sans-serif"',
                fontWeight: "900",
                fontSize: "24px",
                borderTop: "1px solid #e0e0e0",
                paddingTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: isDesktop ? "flex-start" : "center",
                textAlign: isDesktop ? "left" : "center",
                maxWidth: "600px",
                width: "100%",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  marginBottom: "10px",
                  color: "#1187cf",
                }}
              >
                DESCRIPTION
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#fefefe",
                  lineHeight: "1.5",
                  opacity: 0.8,
                }}
              >
                {categoryDescription}
              </p>
            </div>
          )}

          {/* Buyers Bought These Section */}
          {/* Buyers Bought These Section */}
          <div
            style={{
              marginTop: "40px",
              width: "100%",
              textAlign: isDesktop ? "left" : "center",
            }}
          >
            <h3
              style={{
                fontFamily: '"Montserrat", "sans-serif"',
                fontWeight: "800",
                fontSize: "22px",
                color: "#1187cf",
                marginBottom: "20px",
              }}
            >
              Buyers bought these
            </h3>

            {randomProducts.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: isDesktop ? "wrap" : "nowrap",
                  paddingBottom: "10px",
                }}
              >
                {randomProducts.map((product, index) => (
                  <img
                    key={index}
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: isDesktop ? "150px" : "115px",
                      height: isDesktop ? "180px" : "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid #333",
                      flex: "0 0 auto",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
