import { useEffect, useRef } from "react";
import {
  Crosshair,
  Network,
  Search,
  Zap,
  Cloud,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  {
    Icon: Crosshair,
    title: "Penetration Testing",
    description:
      "Authorized simulated cyberattacks to identify vulnerabilities before real attackers do. Web, network, mobile, and API pentesting.",
    color: "oklch(0.82 0.22 145)",
    tags: ["OWASP", "OSCP", "Red Team"],
  },
  {
    Icon: Network,
    title: "Network Security",
    description:
      "Comprehensive network architecture review, firewall configuration, intrusion detection, and traffic analysis to fortify your infrastructure.",
    color: "oklch(0.72 0.18 195)",
    tags: ["Firewall", "IDS/IPS", "SIEM"],
  },
  {
    Icon: Search,
    title: "Security Audits",
    description:
      "Thorough examination of your IT environment against ISO 27001, NIST, and industry standards. Detailed gap analysis and remediation roadmap.",
    color: "oklch(0.55 0.2 265)",
    tags: ["ISO 27001", "NIST", "PCI-DSS"],
  },
  {
    Icon: Zap,
    title: "Incident Response",
    description:
      "Rapid containment, eradication, and recovery when breaches occur. Our 24/7 CSIRT team minimizes damage and ensures business continuity.",
    color: "oklch(0.75 0.2 60)",
    tags: ["24/7 Response", "Forensics", "Recovery"],
  },
  {
    Icon: Cloud,
    title: "Cloud Security",
    description:
      "Secure your AWS, Azure, and GCP workloads with cloud-native security controls, identity management, and compliance frameworks.",
    color: "oklch(0.72 0.18 195)",
    tags: ["AWS", "Azure", "GCP"],
  },
  {
    Icon: Briefcase,
    title: "IT Consulting",
    description:
      "Strategic technology advisory for CISOs and IT leadership. Security roadmaps, vendor evaluation, board-level risk reporting.",
    color: "oklch(0.82 0.22 145)",
    tags: ["CISO Advisory", "Risk", "Strategy"],
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const reveals = section.querySelectorAll(".reveal, .reveal-left, .reveal-right");
            for (const el of Array.from(reveals)) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.08 0.01 250)" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.72 0.18 195 / 0.3), transparent)",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.72 0.18 195 / 0.04)",
          filter: "blur(80px)",
          transform: "translate(30%, -50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label mb-3">{"// Our Services"}</div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
          >
            COMPREHENSIVE{" "}
            <span style={{ color: "oklch(0.72 0.18 195)" }}>SECURITY</span> SOLUTIONS
          </h2>
          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.6 0.04 220)" }}
          >
            End-to-end cybersecurity services tailored to your organization's
            risk profile, industry, and compliance requirements.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ Icon, title, description, color, tags }, i) => (
            <div
              key={title}
              className="reveal cyber-card p-6 group cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300"
                style={{
                  background: `${color.replace(")", " / 0.1)")}`,
                  border: `1px solid ${color.replace(")", " / 0.3)")}`,
                  borderRadius: "2px",
                }}
              >
                <Icon
                  className="w-6 h-6 transition-all duration-300"
                  style={{ color }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold mb-3 transition-colors duration-300"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  color: "oklch(0.88 0.02 160)",
                }}
              >
                {title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "oklch(0.6 0.04 220)", lineHeight: "1.7" }}
              >
                {description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.6rem] px-2 py-0.5 tracking-wider"
                    style={{
                      background: `${color.replace(")", " / 0.08)")}`,
                      border: `1px solid ${color.replace(")", " / 0.25)")}`,
                      color: color,
                      fontFamily: "Space Mono, monospace",
                      borderRadius: "2px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA link */}
              <div
                className="flex items-center gap-1 text-xs transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ color, fontFamily: "Space Mono, monospace" }}
              >
                Learn More <ArrowRight className="w-3 h-3" />
              </div>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
