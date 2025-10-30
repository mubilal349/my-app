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
import DesignWheel from "./components/DesignWheel";
import AboutSection from "./components/AboutSection";

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

        {/* ✅ Design Page */}
        <Route path="/design-wheel" element={<DesignWheel />} />
      </Routes>
    </Router>
  );
};

export default App;
