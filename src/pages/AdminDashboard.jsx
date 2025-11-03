import React, { useState, useEffect } from "react";
import "../assets/css/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaBoxOpen,
  FaUsers,
  FaDollarSign,
  FaChartPie,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    originalPrice: "",
    discountPrice: "",
  });
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const ADMIN_USERNAME = "admin_unique_4f8b9";
  const ADMIN_PASSWORD =
    "$2a$12$KIXu1q9Z0xq2A3bF5e6G.O8bH9cJ0kLmN1pQrS2tUV3wXyZ4a5b6";

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products)) || [];
  }, [products]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.username === ADMIN_USERNAME &&
      loginData.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert image to base64 for persistent storage
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload an image!");

    const newProduct = {
      id: products.length + 1,
      title: formData.title,
      image: formData.image,
      originalPrice: formData.originalPrice,
      discountPrice: formData.discountPrice,
    };

    setProducts([...products, newProduct]);
    setFormData({
      title: "",
      image: null,
      originalPrice: "",
      discountPrice: "",
    });
    setActiveTab("Overview"); // <-- Reset to Overview
    alert("✅ Product added successfully!");
  };

  // Add state for editing
  const [editingProductId, setEditingProductId] = useState(null);

  // Handle Edit
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setFormData({
      title: product.title,
      image: product.image,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
    });
  };

  // Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id === editingProductId ? { ...p, ...formData } : p
    );
    setProducts(updatedProducts);
    setEditingProductId(null);
    setFormData({
      title: "",
      image: null,
      originalPrice: "",
      discountPrice: "",
    });
    alert("✅ Product updated successfully!");
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const filteredProducts = products.filter((p) => p.id !== id);
      setProducts(filteredProducts);
    }
  };

  const COLORS = ["#4F46E5", "#22C55E", "#FACC15"];
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
    { name: "Jul", sales: 3490 },
  ];
  const trafficData = [
    { name: "Desktop", value: 63 },
    { name: "Tablet", value: 15 },
    { name: "Phone", value: 22 },
  ];

  // ------------------ LOGIN PAGE ------------------
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-title">Admin Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              required
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
              className="login-input"
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ------------------ DASHBOARD PAGE ------------------
  return (
    <div className="custom-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="sidebar-title">SteerLine</h1>
        <nav className="sidebar-nav">
          <button
            className={`nav-button ${activeTab === "Overview" ? "active" : ""}`}
            onClick={() => setActiveTab("Overview")}
          >
            <FaChartPie /> Overview
          </button>
          <button
            className={`nav-button ${
              activeTab === "Customers" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Customers")}
          >
            <FaUsers /> Customers
          </button>
          <button
            className={`nav-button ${activeTab === "Products" ? "active" : ""}`}
            onClick={() => setActiveTab("Products")}
          >
            <FaBoxOpen /> Products
          </button>
          <button
            className={`nav-button ${activeTab === "Sales" ? "active" : ""}`}
            onClick={() => setActiveTab("Sales")}
          >
            <FaDollarSign /> Sales
          </button>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-container">
        {activeTab !== "Products" && (
          <>
            <h2 className="main-heading">Dashboard Overview</h2>

            {/* Top Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-label">Budget</p>
                <h3 className="stat-value">$24k</h3>
                <p className="stat-change positive">↑ 12% since last month</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Total Customers</p>
                <h3 className="stat-value">1.6k</h3>
                <p className="stat-change negative">↓ 16% since last month</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Task Progress</p>
                <h3 className="stat-value">75.5%</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="stat-card">
                <p className="stat-label">Total Profit</p>
                <h3 className="stat-value">$15k</h3>
              </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
              <div className="chart-card chart-wide">
                <h3 className="chart-title">Sales Overview</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={salesData}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-card">
                <h3 className="chart-title">Traffic Source</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {trafficData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="traffic-legend">
                  <span>🚗 BMW Steering Wheel 63%</span>
                  <span>🚗 Audi Steering Wheel 22%</span>
                  <span>🚗 Volkswagen Steering Wheel 15%</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Add Product */}
        {activeTab === "Products" && (
          <>
            <div className="add-product-card">
              <h3 className="add-product-title">
                <FaPlus />{" "}
                {editingProductId ? "Edit Product" : "Add New Product"}
              </h3>
              <form
                onSubmit={editingProductId ? handleUpdate : handleSubmit}
                className="add-product-form"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Product Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="originalPrice"
                  placeholder="Original Price"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
                <input
                  type="text"
                  name="discountPrice"
                  placeholder="Discount Price"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
                <button type="submit" className="submit-button">
                  {editingProductId ? "Update Product" : "Add Product"}
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    className="submit-button cancel-button"
                    onClick={() => {
                      setEditingProductId(null);
                      setFormData({
                        title: "",
                        image: null,
                        originalPrice: "",
                        discountPrice: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>

            {/* Product List */}
            <div className="product-grid">
              {products.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.image} alt={p.title} className="product-image" />
                  <h3 className="product-title">{p.title}</h3>
                  <p className="product-original">{p.originalPrice}</p>
                  <p className="product-discount">{p.discountPrice}</p>
                  <div className="product-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
