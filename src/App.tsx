import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { StickyContactBar } from "./components/cta/StickyContactBar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Careers from "./pages/Careers";
import CaseStudies from "./pages/CaseStudies";
import Resources from "./pages/Resources";
import GetAQuote from "./pages/GetAQuote";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";

/**
 * Root application component: shared layout (Navbar + Footer + StickyContactBar)
 * with routes for all 11 pages (FR-015).
 */
export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/case-studies" element={<CaseStudies />} />
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
