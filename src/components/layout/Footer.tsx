import { Link } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E0E0E0] bg-[#F4F4F4] dark:border-[#2D2D2D] dark:bg-[#0B0B14] transition-colors">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2">
            <BrandLogo size="md" />
            <p className="mt-4 text-xs leading-relaxed text-[#525252] dark:text-[#A8A8A8] max-w-sm font-sans">
              Innovate. Build. Scale. PRANAYANSH Technologies is a global software engineering and IT consulting partner for custom software, cloud, AI, and digital transformation — serving India, the USA, the Middle East, Europe, and remote-first teams worldwide.
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F6]">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">
              <li>
                <Link to="/services" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/ai-solutions" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link to="/cloud-services" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Cloud Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Dedicated Development Teams
                </Link>
              </li>
              <li>
                <Link to="/get-a-quote" className="text-[#5B47F5] font-bold dark:text-[#7B74FF] hover:underline">
                  Get a Quote →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div>
            <h3 className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F6]">
              Industries
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">
              <li>
                <Link to="/industries" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  FinTech & Banking
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Logistics &amp; Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Resources */}
          <div>
            <h3 className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F6]">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">
              <li>
                <Link to="/about" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  About PRANAYANSH
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#5B47F5] dark:hover:text-[#7B74FF] transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E0E0E0] pt-6 text-xs text-[#525252] dark:border-[#2D2D2D] dark:text-[#8D8D8D]">
          <p>&copy; {year} PRANAYANSH Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-[#5B47F5]">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#5B47F5]">Security Standards</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-[#5B47F5]">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

