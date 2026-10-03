import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/3d/LoadingScreen";
import Home from "@/pages/Home";
import Brands from "@/pages/Brands";
import BrandDetail from "@/pages/BrandDetail";
import Phones from "@/pages/Phones";
import PhoneDetail from "@/pages/PhoneDetail";
import Compare from "@/pages/Compare";
import About from "@/pages/About";
import Wishlist from "@/pages/Wishlist";
import NotFound from "@/pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/:brandId" element={<BrandDetail />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/phones/:phoneId" element={<PhoneDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <CompareProvider>
          <HashRouter>
            <LoadingScreen />
            <div className="relative flex min-h-screen flex-col bg-[#06060a]">
              <Navbar />
              <main className="flex-1">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </HashRouter>
        </CompareProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
