import { useEffect, useRef } from "react";
import { Star, TrendingUp, Shield, Award } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Aditya Sharma",
    role: "CISO, FinTech India",
    quote:
      "CyberShield's penetration testing revealed 12 critical vulnerabilities we had no idea existed. Their remediation guidance was practical and thorough. We've since partnered with them for quarterly assessments.",
    stars: 5,
    initials: "AS",
    color: "oklch(0.82 0.22 145)",
  },
  {
    name: "Priya Mehta",
    role: "Security Engineer, MNC Bangalore",
    quote:
      "The CISSP preparation course was exceptional. The instructors have real-world experience, not just theoretical knowledge. Passed the exam on first attempt. The investment was absolutely worth it.",
    stars: 5,
    initials: "PM",
    color: "oklch(0.72 0.18 195)",
  },
  {
    name: "Rahul Nair",
    role: "IT Director, Healthcare Group",
    quote:
      "After the Social Engineering Awareness workshop, our phishing click rates dropped from 34% to under 3%. CyberShield doesn't just train — they transform your security culture.",
    stars: 5,
    initials: "RN",
    color: "oklch(0.55 0.2 265)",
  },
];

const WHY_US = [
  {
    Icon: TrendingUp,
    title: "99.2% Satisfaction Rate",
    desc: "Measured across 1000+ training completions",
    color: "oklch(0.82 0.22 145)",
  },
  {
    Icon: Shield,
    title: "Zero Breach Record",
    desc: "Clients protected by CyberShield stay protected",
    color: "oklch(0.72 0.18 195)",
  },
  {
    Icon: Award,
    title: "Industry-Recognized Certs",
    desc: "Our certificates are accepted by top employers",
    color: "oklch(0.55 0.2 265)",
  },
];

export function TestimonialsSection() {
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
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.08 0.01 250)" }}
      ref={sectionRef}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.72 0.18 195 / 0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Us bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20 reveal">
          {WHY_US.map(({ Icon, title, desc, color }) => (
            <div
              key={title}
              className="flex items-center gap-4 p-5 cyber-card"
            >
              <div
                className="shrink-0 w-12 h-12 flex items-center justify-center"
                style={{
                  background: `${color.replace(")", " / 0.1)")}`,
                  border: `1px solid ${color.replace(")", " / 0.3)")}`,
                  borderRadius: "2px",
                }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div>
                <div
                  className="font-bold text-sm"
                  style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.88 0.02 160)", fontSize: "0.95rem" }}
                >
                  {title}
                </div>
                <div className="text-xs" style={{ color: "oklch(0.55 0.04 220)" }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label mb-3">{"// What Clients Say"}</div>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
          >
            TRUSTED BY{" "}
            <span style={{ color: "oklch(0.72 0.18 195)" }}>PROFESSIONALS</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, quote, stars, initials, color }, i) => (
            <div
              key={name}
              className="reveal testimonial-card"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: stars }, (_, si) => `star-${si}`).map((key) => (
                  <Star
                    key={key}
                    className="w-3.5 h-3.5 fill-current"
                    style={{ color: "oklch(0.75 0.2 60)" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "oklch(0.65 0.04 220)", lineHeight: "1.8" }}
              >
                {quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid oklch(0.22 0.04 250 / 0.4)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: `${color.replace(")", " / 0.15)")}`,
                    border: `1px solid ${color.replace(")", " / 0.4)")}`,
                    color,
                    fontFamily: "Rajdhani, sans-serif",
                  }}
                >
                  {initials}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.88 0.02 160)", fontFamily: "Rajdhani, sans-serif" }}
                  >
                    {name}
                  </div>
                  <div className="text-xs" style={{ color: "oklch(0.5 0.04 220)" }}>
                    {role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
