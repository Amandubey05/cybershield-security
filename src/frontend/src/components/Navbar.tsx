import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#courses", label: "Courses" },
  { href: "#events", label: "Events" },
  { href: "#awareness", label: "Awareness" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.06_0.01_250/0.97)] backdrop-blur-md border-b border-[oklch(0.22_0.04_250/0.5)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2 group bg-transparent border-none cursor-pointer p-0"
        >
          <div className="relative w-9 h-9">
            <img
              src="/assets/generated/cybershield-logo-transparent.dim_200x200.png"
              alt="CyberShield Logo"
              className="w-9 h-9 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_oklch(0.82_0.22_145/0.9)]"
            />
          </div>
          <div className="flex flex-col leading-none text-left">
            <span
              className="font-bold text-lg tracking-wider"
              style={{ color: "oklch(0.9 0.02 160)", fontFamily: "Rajdhani, sans-serif", fontWeight: 700 }}
            >
              CYBER<span style={{ color: "oklch(0.82 0.22 145)" }}>SHIELD</span>
            </span>
            <span
              className="text-[0.55rem] tracking-widest"
              style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
            >
              SECURITY SOLUTIONS
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="nav-link bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="cyber-btn-primary text-sm"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 transition-colors bg-transparent border-none cursor-pointer"
          style={{ color: "oklch(0.82 0.22 145)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "oklch(0.06 0.01 250 / 0.98)",
          borderBottom: "1px solid oklch(0.22 0.04 250 / 0.5)",
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid oklch(0.22 0.04 250 / 0.3)" }}>
            <Terminal className="w-3 h-3" style={{ color: "oklch(0.82 0.22 145)" }} />
            <span className="terminal-text text-xs" style={{ color: "oklch(0.55 0.04 220)" }}>
              root@cybershield:~$
            </span>
          </div>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-left px-3 py-3 rounded transition-all bg-transparent border-none cursor-pointer"
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "oklch(0.7 0.04 220)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.82 0.22 145)";
                (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.82 0.22 145 / 0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.7 0.04 220)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <span style={{ color: "oklch(0.82 0.22 145 / 0.5)" }}>→ </span>{link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="cyber-btn-primary mt-4 w-full text-center"
            style={{ fontSize: "0.75rem" }}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </header>
  );
}
