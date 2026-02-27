import { useEffect, useRef, useState } from "react";
import { Shield, Lock, ChevronDown } from "lucide-react";

// Matrix rain characters - mix of Latin, Japanese katakana, and hex
const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF0123456789!@#$%^&*";

function useMatrixRain(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const fontSize = 14;
    let columns: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const numCols = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: numCols }, () =>
        Math.floor(Math.random() * canvas.height / fontSize)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(6, 8, 20, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        // Head character (bright)
        ctx.fillStyle = "rgba(200, 255, 200, 0.9)";
        ctx.font = `${fontSize}px 'Space Mono', monospace`;
        ctx.fillText(char, x, y);

        // Trail characters (green gradient)
        const trailLength = 20;
        for (let j = 1; j < trailLength; j++) {
          const trailY = (columns[i] - j) * fontSize;
          if (trailY < 0) continue;
          const alpha = (1 - j / trailLength) * 0.5;
          ctx.fillStyle = `rgba(0, 200, 80, ${alpha})`;
          const trailChar = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          ctx.fillText(trailChar, x, trailY);
        }

        // Reset column
        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i]++;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

const TYPING_TEXTS = [
  "Securing Your Digital Future",
  "Defending Against Cyber Threats",
  "Training Tomorrow's Security Experts",
  "Building Resilient Organizations",
];

function useTypingEffect(texts: string[], speed = 80, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return displayText;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMatrixRain(canvasRef);
  const typedText = useTypingEffect(TYPING_TEXTS);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.04 0.005 250)" }}
    >
      {/* Matrix canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.35 }}
      />

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, oklch(0.08 0.01 250 / 0) 0%, oklch(0.04 0.005 250 / 0.7) 70%)",
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.82 0.22 145 / 0.4), transparent)",
          animation: "scanMove 6s linear infinite",
        }}
      />

      {/* Decorative hex elements */}
      <div className="hex-bg absolute -left-16 top-1/4 w-48 h-48 opacity-20" />
      <div className="hex-bg absolute -right-8 top-1/3 w-32 h-32 opacity-15" style={{ animationDelay: "2s" }} />
      <div className="hex-bg absolute left-1/4 bottom-1/4 w-24 h-24 opacity-10" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status badge */}
        <div className="flex items-center justify-center mb-8">
          <div
            className="flex items-center gap-2 px-4 py-1.5 text-xs terminal-text"
            style={{
              background: "oklch(0.82 0.22 145 / 0.08)",
              border: "1px solid oklch(0.82 0.22 145 / 0.3)",
              borderRadius: "2px",
              color: "oklch(0.82 0.22 145)",
              letterSpacing: "0.15em",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "oklch(0.82 0.22 145)",
                boxShadow: "0 0 8px oklch(0.82 0.22 145)",
                animation: "pulseGlow 2s infinite",
              }}
            />
            SYSTEM ONLINE — THREAT MONITORING ACTIVE
          </div>
        </div>

        {/* Main headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.92 0.02 160)" }}
        >
          <span style={{ color: "oklch(0.92 0.02 160)" }}>CYBER</span>
          <span style={{ color: "oklch(0.82 0.22 145)" }}>SHIELD</span>
          <br />
          <span
            className="text-3xl sm:text-4xl lg:text-5xl font-normal"
            style={{ color: "oklch(0.7 0.04 220)" }}
          >
            SECURITY SOLUTIONS
          </span>
        </h1>

        {/* Typing text */}
        <div className="h-16 flex items-center justify-center mb-8">
          <p
            className="text-xl sm:text-2xl lg:text-3xl typing-cursor"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "oklch(0.82 0.22 145)",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            {typedText}
          </p>
        </div>

        {/* Description */}
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: "oklch(0.6 0.04 220)" }}
        >
          India's premier cybersecurity training institute and IT consulting firm.
          We conduct seminars, workshops, and certification courses — both online
          and offline — to build the next generation of security professionals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            type="button"
            onClick={() => handleScroll("#courses")}
            className="cyber-btn-primary text-sm"
            style={{ minWidth: "180px" }}
          >
            Explore Courses
          </button>
          <button
            type="button"
            onClick={() => handleScroll("#events")}
            className="cyber-btn-outline text-sm"
            style={{ minWidth: "180px" }}
          >
            View Events
          </button>
        </div>

        {/* Floating shield icon */}
        <div className="relative flex justify-center mb-8">
          <div className="hero-float">
            <div
              className="relative w-24 h-24 flex items-center justify-center"
              style={{
                background: "oklch(0.82 0.22 145 / 0.05)",
                border: "1px solid oklch(0.82 0.22 145 / 0.3)",
                borderRadius: "50%",
                boxShadow: "0 0 40px oklch(0.82 0.22 145 / 0.2)",
              }}
            >
              <Shield
                className="w-12 h-12"
                style={{ color: "oklch(0.82 0.22 145)" }}
              />
              <Lock
                className="w-5 h-5 absolute bottom-4"
                style={{ color: "oklch(0.72 0.18 195)" }}
              />
            </div>
          </div>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
          {[
            { value: "500+", label: "Clients Protected" },
            { value: "50+", label: "Security Experts" },
            { value: "10+", label: "Years Experience" },
            { value: "1000+", label: "Courses Delivered" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                padding: "0.5rem 1.25rem",
                background: "oklch(0.1 0.015 250 / 0.8)",
                border: "1px solid oklch(0.22 0.04 250 / 0.5)",
              }}
            >
              <div
                className="text-xl font-bold"
                style={{ color: "oklch(0.82 0.22 145)", fontFamily: "Rajdhani, sans-serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[0.65rem] tracking-wider"
                style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
              >
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => handleScroll("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
        style={{ color: "oklch(0.55 0.04 220)" }}
      >
        <span className="text-[0.6rem] terminal-text tracking-widest">SCROLL</span>
        <ChevronDown
          className="w-5 h-5"
          style={{ animation: "float 2s ease-in-out infinite" }}
        />
      </button>
    </section>
  );
}
