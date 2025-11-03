import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "../src/assets/css/style.css";
import HeroSlider from "./components/HeroSlider";
import WhatsappIcon from "./components/WhatsappIcon";
import ControlSection from "./components/ControlSection";
import ImageCards from "./components/ImageCards";
import ProjectComparison from "./components/ProjectComparison";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import AboutSection from "./components/AboutSection";
import AccessoriesPage from "./components/AccessoriesPage";
import Customization from "./components/Customization";

//pages
import About from "./pages/About.jsx";
import Design from "./pages/Design.jsx";
import Realisations from "./pages/Realisation.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ✅ Home Page */}
        <Route
          path="/home"
          element={
            <>
              <HeroSlider />
              <ControlSection />
              <ImageCards />
              <ProjectComparison />
              <AboutSection />
              <Footer />
              <WhatsappIcon />
              <BackToTop />
            </>
          }
        />
        <Route path="/customization" element={<Customization />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/design" element={<Design />} />
        <Route path="/realisations" element={<Realisations />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </Router>
  );
};

export default App;
