import React from "react";
import Navbar from "./components/Navbar";
import "../src/assets/css/style.css";
import HeroSlider from "./components/HeroSlider";
import WhatsappIcon from "./components/WhatsappIcon";
import ControlSection from "./components/ControlSection";
import ImageCards from "./components/ImageCards";
import ProjectComparison from "./components/ProjectComparison";
import Footer from "./components/Footer";
import HowWeOperate from "./components/HowWeOperate";

const App = () => {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <ControlSection />
      <ImageCards />
      <HowWeOperate />
      <ProjectComparison />
      <Footer />
      <WhatsappIcon />
    </>
  );
};

export default App;
