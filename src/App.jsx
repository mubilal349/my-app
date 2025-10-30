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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ✅ Home Page */}
        <Route
          path="/"
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
        <Route path="/accessories-page" element={<AccessoriesPage />} />
        <Route path="/customization" element={<Customization />} />
      </Routes>
    </Router>
  );
};

export default App;
