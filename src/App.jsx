import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import SubcategoryPage from "./pages/SubCategoryPage.jsx";
import SubcategoryDetail from "./pages/SubCategoryDetail.jsx";
import SteeringWheelPage from "./pages/SteeringWheelPage.jsx";
import ScrollToTop from "./components/ScroolToTop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === "/admin";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsappIcon />}
      {!hideLayout && <BackToTop />}
    </>
  );
};

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          {/* ✅ Home Page */}
          <Route
            path="/"
            element={
              <>
                <motion.div data-aos="fade-up" transition={{ duration: 0.5 }}>
                  <HeroSlider />
                </motion.div>
                <motion.div
                  data-aos="fade-right"
                  transition={{ duration: 0.5 }}
                >
                  <ControlSection />
                </motion.div>
                <motion.div data-aos="fade-left" transition={{ duration: 0.5 }}>
                  <ImageCards />
                </motion.div>
                <motion.div
                  data-aos="fade-right"
                  transition={{ duration: 0.5 }}
                >
                  <ProjectComparison />
                </motion.div>
                <motion.div data-aos="fade-up" transition={{ duration: 0.5 }}>
                  <AboutSection />
                </motion.div>
              </>
            }
          />
          <Route path="/products/:categoryId" element={<SteeringWheelPage />} />
          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/customization" element={<Customization />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/designmywheel" element={<Design />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route
            path="/category/:category/:subcategory"
            element={<SubcategoryPage />}
          />
          <Route
            path="/subcategory/:subcategory/detail"
            element={<SubcategoryDetail />}
          />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/steeringwheelpage" element={<SteeringWheelPage />} />
          <Route path="/shopnow" element={<ShopPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
