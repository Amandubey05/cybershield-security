import { useEffect, useRef } from "react";
import { Target, Users, Award, Globe, CheckCircle } from "lucide-react";

const STATS = [
  { value: 500, suffix: "+", label: "Clients Protected" },
  { value: 50, suffix: "+", label: "Security Experts" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 1000, suffix: "+", label: "Courses Delivered" },
];

const VALUES = [
  "Zero-compromise security approach",
  "Industry-certified professionals",
  "Cutting-edge curriculum updated quarterly",
  "Hands-on lab environments",
  "24/7 post-training support",
  "Government & enterprise partnerships",
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 2000;
            const start = performance.now();
            const animate = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(eased * target).toLocaleString() + suffix;
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

export function AboutSection() {
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
      id="about"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.06 0.01 250)" }}
    >
      {/* Background accents */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.82 0.22 145 / 0.3), transparent)",
        }}
      />
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.82 0.22 145 / 0.04)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label mb-3">{"// About CyberShield"}</div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
          >
            SECURING THE DIGITAL{" "}
            <span style={{ color: "oklch(0.82 0.22 145)" }}>FRONTIER</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.6 0.04 220)" }}
          >
            Founded in 2015, CyberShield has grown to become India's most trusted
            cybersecurity firm — combining elite consulting with world-class training.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal text-center p-6 cyber-card`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="text-4xl lg:text-5xl font-bold mb-2"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  color: "oklch(0.82 0.22 145)",
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className="text-xs tracking-widest uppercase"
                style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Mission */}
          <div className="reveal-left">
            <div className="section-label mb-3">{"// Our Mission"}</div>
            <h3
              className="text-2xl lg:text-3xl font-bold mb-6"
              style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
            >
              Building a Cyber-Resilient{" "}
              <span style={{ color: "oklch(0.72 0.18 195)" }}>India</span>
            </h3>
            <p
              className="leading-relaxed mb-6"
              style={{ color: "oklch(0.65 0.04 220)", lineHeight: "1.8" }}
            >
              We believe that cybersecurity is not just a technical necessity — it's
              a national imperative. From Fortune 500 enterprises to government
              agencies to individual students, CyberShield delivers the knowledge
              and tools needed to defend against evolving cyber threats.
            </p>
            <p
              className="leading-relaxed mb-8"
              style={{ color: "oklch(0.65 0.04 220)", lineHeight: "1.8" }}
            >
              Our training programs are meticulously designed by OSCP, CISSP, and
              CEH certified professionals who bring real-world incident response
              experience to every session.
            </p>

            {/* Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VALUES.map((val) => (
                <div key={val} className="flex items-start gap-2">
                  <CheckCircle
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.82 0.22 145)" }}
                  />
                  <span className="text-sm" style={{ color: "oklch(0.65 0.04 220)" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cards */}
          <div className="reveal-right grid grid-cols-2 gap-4">
            {[
              {
                Icon: Target,
                title: "Expert-Led Training",
                desc: "All instructors hold active certifications and real-world consulting experience",
              },
              {
                Icon: Users,
                title: "Community Focus",
                desc: "Building a nationwide network of cybersecurity professionals and advocates",
              },
              {
                Icon: Award,
                title: "Certified Excellence",
                desc: "ISO 27001 certified processes. Industry-recognized course completion certificates",
              },
              {
                Icon: Globe,
                title: "Global Reach",
                desc: "Online programs accessible worldwide. Physical labs in 5 major Indian cities",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="cyber-card p-5">
                <Icon
                  className="w-8 h-8 mb-3"
                  style={{ color: "oklch(0.72 0.18 195)" }}
                />
                <h4
                  className="font-semibold mb-2 text-sm"
                  style={{ color: "oklch(0.88 0.02 160)" }}
                >
                  {title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "oklch(0.55 0.04 220)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
