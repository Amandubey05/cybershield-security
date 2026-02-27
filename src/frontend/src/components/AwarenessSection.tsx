import { useEffect, useRef, useState } from "react";
import { ShieldAlert, Key, Mail, Wifi, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useGetAllTips } from "../hooks/useQueries";
import type { AwarenessTip } from "../hooks/useQueries";

const CATEGORY_CONFIG: Record<string, { color: string; Icon: React.FC<{ className?: string }> }> = {
  "Password Security": { color: "oklch(0.82 0.22 145)", Icon: Key },
  "Phishing": { color: "oklch(0.65 0.25 25)", Icon: Mail },
  "Network Safety": { color: "oklch(0.72 0.18 195)", Icon: Wifi },
  "Social Engineering": { color: "oklch(0.75 0.2 60)", Icon: Users },
};

function getConfig(category: string) {
  return CATEGORY_CONFIG[category] ?? { color: "oklch(0.82 0.22 145)", Icon: ShieldAlert };
}

function TipCard({ tip, delay }: { tip: AwarenessTip; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  const { color, Icon } = getConfig(tip.category);

  return (
    <div
      className="reveal cyber-card p-5 cursor-pointer select-none"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="shrink-0 w-10 h-10 flex items-center justify-center"
          style={{
            background: `${color.replace(")", " / 0.1)")}`,
            border: `1px solid ${color.replace(")", " / 0.3)")}`,
            borderRadius: "2px",
          }}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span
              className="text-[0.6rem] tracking-widest uppercase"
              style={{ color, fontFamily: "Space Mono, monospace" }}
            >
              {tip.category}
            </span>
            <button
              type="button"
              className="shrink-0 bg-transparent border-none cursor-pointer p-0"
              style={{ color: "oklch(0.5 0.04 220)" }}
              onClick={(e) => { e.stopPropagation(); setExpanded((ex) => !ex); }}
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <h3
            className="font-semibold text-sm mb-2"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.88 0.02 160)", fontSize: "1rem" }}
          >
            {tip.title}
          </h3>

          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: expanded ? "300px" : "0" }}
          >
            <p
              className="text-xs leading-relaxed pb-1"
              style={{ color: "oklch(0.6 0.04 220)", lineHeight: "1.7" }}
            >
              {tip.content}
            </p>
          </div>

          {!expanded && (
            <p
              className="text-xs"
              style={{ color: "oklch(0.5 0.04 220)", fontFamily: "Space Mono, monospace" }}
            >
              Click to expand...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function TipSkeletons() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => `tip-skel-${i}`).map((key) => (
        <div key={key} className="cyber-card p-5 animate-pulse flex gap-4">
          <div className="w-10 h-10 rounded shrink-0" style={{ background: "oklch(0.16 0.02 250)" }} />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 rounded" style={{ background: "oklch(0.18 0.02 250)" }} />
            <div className="h-4 w-3/4 rounded" style={{ background: "oklch(0.18 0.02 250)" }} />
            <div className="h-3 w-16 rounded" style={{ background: "oklch(0.16 0.02 250)" }} />
          </div>
        </div>
      ))}
    </>
  );
}

export function AwarenessSection() {
  const { data: tips, isLoading } = useGetAllTips();
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ["All", ...Object.keys(CATEGORY_CONFIG)];

  const filtered = activeCategory === "All"
    ? (tips ?? [])
    : (tips ?? []).filter((t) => t.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const reveals = section.querySelectorAll(".reveal");
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
      id="awareness"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.06 0.01 250)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.82 0.22 145 / 0.3), transparent)",
        }}
      />

      <div
        className="absolute top-1/2 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: "oklch(0.82 0.22 145 / 0.04)",
          filter: "blur(70px)",
          transform: "translateY(-50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label mb-3 flex items-center justify-center gap-2">
            <ShieldAlert className="w-3 h-3" />
            {"// Cyber Awareness Hub"}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
          >
            PROTECT YOURSELF FROM{" "}
            <span style={{ color: "oklch(0.82 0.22 145)" }}>CYBER THREATS</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.6 0.04 220)" }}
          >
            Knowledge is your first line of defense. Browse our curated security
            tips across key threat categories.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center reveal">
          {categories.map((cat) => {
            const config = cat === "All" ? null : getConfig(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="text-xs px-4 py-2 transition-all duration-200 terminal-text"
                style={{
                  background: isActive
                    ? config ? config.color : "oklch(0.82 0.22 145)"
                    : "oklch(0.12 0.015 250)",
                  color: isActive
                    ? "oklch(0.06 0.01 250)"
                    : config ? config.color : "oklch(0.6 0.04 220)",
                  border: `1px solid ${
                    isActive
                      ? config ? config.color : "oklch(0.82 0.22 145)"
                      : config ? `${config.color.replace(")", " / 0.3)")}` : "oklch(0.22 0.04 250)"
                  }`,
                  fontFamily: "Space Mono, monospace",
                  letterSpacing: "0.08em",
                  borderRadius: "2px",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tips grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <TipSkeletons />
          ) : filtered.length === 0 ? (
            <div
              className="col-span-full py-20 text-center"
              style={{ color: "oklch(0.55 0.04 220)" }}
            >
              <ShieldAlert
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "oklch(0.3 0.03 250)" }}
              />
              <p className="terminal-text text-sm">
                No tips found for this category.
              </p>
            </div>
          ) : (
            filtered.map((tip, i) => (
              <TipCard key={tip.id.toString()} tip={tip} delay={i * 60} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
