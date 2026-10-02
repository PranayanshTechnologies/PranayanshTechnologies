import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { StickyContactBar } from "./components/cta/StickyContactBar";
import { DurgotsavRoutes } from "./features/durgotsav";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AiSolutions from "./pages/AiSolutions";
import CloudServices from "./pages/CloudServices";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Portfolio from "./pages/Portfolio";
import Resources from "./pages/Resources";
import GetAQuote from "./pages/GetAQuote";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";

/**
 * Root application component: shared layout (Navbar + Footer + StickyContactBar)
 * with routes for all 13 pages and temporary Durgotsav sub-router.
 */
export default function App() {
  const location = useLocation();
  const isDurgotsav = location.pathname.startsWith("/durgotsav");

  if (isDurgotsav) {
    return (
      <Routes>
        <Route path="/durgotsav/*" element={<DurgotsavRoutes />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ai-solutions" element={<AiSolutions />} />
          <Route path="/cloud-services" element={<CloudServices />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/get-a-quote" element={<GetAQuote />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <StickyContactBar />
      <Footer />
    </div>
  );
}

