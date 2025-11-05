import React from "react";
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
  return (
    <Router>
      <AppLayout>
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
              </>
            }
          />
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
          <Route path="/shopnow" element={<ShopPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
