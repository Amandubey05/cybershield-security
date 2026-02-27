import { Shield, Heart, ExternalLink } from "lucide-react";
import { SiGithub, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

const FOOTER_LINKS = {
  Services: [
    "Penetration Testing",
    "Network Security",
    "Security Audits",
    "Incident Response",
    "Cloud Security",
    "IT Consulting",
  ],
  Training: [
    "Ethical Hacking",
    "Network Security",
    "Web App Security",
    "CISSP Prep",
    "Cloud Security",
    "Beginner Course",
  ],
  Company: [
    "About Us",
    "Our Team",
    "Careers",
    "Blog",
    "Press",
    "Contact",
  ],
};

const SOCIAL = [
  { Icon: SiLinkedin, label: "LinkedIn", href: "#" },
  { Icon: SiGithub, label: "GitHub", href: "#" },
  { Icon: SiX, label: "X", href: "#" },
  { Icon: SiYoutube, label: "YouTube", href: "#" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "oklch(0.05 0.008 250)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.82 0.22 145 / 0.4), transparent)",
        }}
      />

      {/* Decorative grid */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-7 h-7" style={{ color: "oklch(0.82 0.22 145)" }} />
              <span
                className="text-xl font-bold tracking-wider"
                style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
              >
                CYBER<span style={{ color: "oklch(0.82 0.22 145)" }}>SHIELD</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "oklch(0.55 0.04 220)", lineHeight: "1.8" }}
            >
              India's premier cybersecurity company. Training professionals,
              protecting enterprises, and building a safer digital world since 2015.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "oklch(0.12 0.015 250)",
                    border: "1px solid oklch(0.22 0.04 250 / 0.5)",
                    color: "oklch(0.55 0.04 220)",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.82 0.22 145)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.82 0.22 145 / 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.55 0.04 220)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.22 0.04 250 / 0.5)";
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Cert badges */}
            <div className="flex gap-2 mt-5 flex-wrap">
              {["ISO 27001", "NASSCOM", "CERT-In"].map((cert) => (
                <span
                  key={cert}
                  className="text-[0.6rem] px-2 py-1 terminal-text"
                  style={{
                    background: "oklch(0.82 0.22 145 / 0.06)",
                    border: "1px solid oklch(0.82 0.22 145 / 0.2)",
                    color: "oklch(0.82 0.22 145 / 0.7)",
                    borderRadius: "2px",
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs tracking-widest mb-4 uppercase"
                style={{ color: "oklch(0.82 0.22 145)", fontFamily: "Space Mono, monospace" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => scrollToSection("#services")}
                      className="text-sm transition-colors duration-200 bg-transparent border-none cursor-pointer p-0 text-left"
                      style={{ color: "oklch(0.5 0.04 220)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.75 0.04 220)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.5 0.04 220)";
                      }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
          style={{ borderTop: "1px solid oklch(0.22 0.04 250 / 0.4)", borderBottom: "1px solid oklch(0.22 0.04 250 / 0.4)" }}
        >
          <div>
            <p
              className="font-bold text-sm mb-0.5"
              style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.88 0.02 160)" }}
            >
              STAY AHEAD OF THREATS
            </p>
            <p className="text-xs" style={{ color: "oklch(0.5 0.04 220)" }}>
              Get weekly cyber threat intelligence and training updates.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="cyber-input text-sm flex-1 sm:w-64"
              style={{ padding: "0.5rem 0.75rem" }}
            />
            <button
              type="button"
              className="cyber-btn-primary whitespace-nowrap"
              style={{ padding: "0.5rem 1rem", fontSize: "0.65rem", clipPath: "none", borderRadius: "2px" }}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: "oklch(0.45 0.04 220)", fontFamily: "Space Mono, monospace" }}
          >
            © 2026 CyberShield Security Solutions. All rights reserved.
          </p>
          <p
            className="text-xs flex items-center gap-1.5"
            style={{ color: "oklch(0.45 0.04 220)", fontFamily: "Space Mono, monospace" }}
          >
            Built with{" "}
            <Heart className="w-3 h-3 fill-current" style={{ color: "oklch(0.65 0.25 25)" }} />{" "}
            using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-0.5 transition-colors duration-200"
              style={{ color: "oklch(0.82 0.22 145)" }}
            >
              caffeine.ai
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
