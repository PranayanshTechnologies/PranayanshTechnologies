import { Link } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E0E0E0] bg-[#F4F4F4] dark:border-[#2D2D2D] dark:bg-[#121212] transition-colors">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div>
            <BrandLogo size="md" />
            <p className="mt-4 text-xs leading-relaxed text-[#525252] dark:text-[#A8A8A8] max-w-sm font-sans">
              Custom software engineering and dedicated technical squads. Deployed remotely or on-premise at client facilities with 48h talent matching and up to 45-day risk-free trial.
            </p>
          </div>

          {/* Col 2: Software Dev */}
          <div>
            <h3 className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">
              Software Development
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">
              <li>
                <Link to="/services" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Custom Web &amp; SaaS Platforms
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Cloud, DevOps &amp; Microservices
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Mobile App Engineering (Flutter)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Applied AI &amp; Intelligent Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Consulting & Squads */}
          <div>
            <h3 className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">
              Consulting &amp; Squads
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">
              <li>
                <Link to="/services" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Dedicated Engineering Pods
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Specialized Technical Consultants
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Remote &amp; On-Premise Squads
                </Link>
              </li>
              <li>
                <Link to="/get-a-quote" className="text-[#FF462D] font-bold dark:text-[#FF7561] hover:underline">
                  Scope &amp; Rate Planner →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h3 className="kicker-mono text-xs font-bold text-[#161616] dark:text-[#F4F4F4]">
              Company &amp; Governance
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#525252] dark:text-[#A8A8A8] font-sans">
              <li>
                <Link to="/about" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  About Pranayansh
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Case Studies &amp; Architecture
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Join Talent Network
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Contact &amp; Discovery
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#FF462D] dark:hover:text-[#FF7561] transition">
                  Privacy Policy &amp; Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E0E0E0] pt-6 text-xs text-[#525252] dark:border-[#2D2D2D] dark:text-[#8D8D8D]">
          <p>&copy; {year} Pranayansh Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-[#FF462D]">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#FF462D]">Security Standards</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-[#FF462D]">SLA Guarantees</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
