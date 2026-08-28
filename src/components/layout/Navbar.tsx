import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { BrandLogo } from "./BrandLogo";

const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "text-[#FF462D] bg-[#FFF2F0] dark:text-[#FFA699] dark:bg-[#262626] font-semibold"
        : "text-[#525252] hover:text-[#161616] hover:bg-[#F4F4F4] dark:text-[#C6C6C6] dark:hover:text-white dark:hover:bg-[#262626]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E0E0E0] bg-white/95 backdrop-blur-md dark:border-[#2D2D2D] dark:bg-[#121212]/95 transition-colors">
      <nav className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-24 py-3.5">
        {/* Brand Logo */}
        <BrandLogo />

        {/* Desktop Links */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link
            to="/get-a-quote"
            className="inline-flex items-center justify-center rounded-lg bg-[#FF462D] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#E0301E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF462D]"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-[#525252] hover:bg-[#F4F4F4] dark:text-[#C6C6C6] dark:hover:bg-[#262626]"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-[#E0E0E0] px-6 pb-6 pt-3 lg:hidden dark:border-[#2D2D2D] bg-white/98 dark:bg-[#121212]/98">
          <div className="flex flex-col gap-1.5">
            <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-4 pt-4 border-t border-[#E0E0E0] dark:border-[#2D2D2D]">
              <Link
                to="/get-a-quote"
                onClick={() => setOpen(false)}
                className="block w-full rounded-lg bg-[#FF462D] px-5 py-3 text-center text-xs font-semibold text-white shadow-xs hover:bg-[#E0301E]"
              >
                Start a Project / Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
