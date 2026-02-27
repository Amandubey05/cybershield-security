import { useEffect, useRef, useState } from "react";
import { Clock, DollarSign, BookOpen, Wifi, MapPin, Layers } from "lucide-react";
import { useGetAllCourses } from "../hooks/useQueries";
import type { Course } from "../hooks/useQueries";

type FilterMode = "All" | "online" | "offline" | "both";

const MODE_LABELS: Record<string, string> = {
  online: "ONLINE",
  offline: "OFFLINE",
  both: "HYBRID",
};

function ModeBadge({ mode }: { mode: string }) {
  if (mode === "online") return <span className="badge-online">{MODE_LABELS[mode] ?? mode.toUpperCase()}</span>;
  if (mode === "offline") return <span className="badge-offline">{MODE_LABELS[mode] ?? mode.toUpperCase()}</span>;
  return <span className="badge-both">{MODE_LABELS[mode] ?? mode.toUpperCase()}</span>;
}

function ModeIcon({ mode }: { mode: string }) {
  if (mode === "online") return <Wifi className="w-3.5 h-3.5" style={{ color: "oklch(0.82 0.22 145)" }} />;
  if (mode === "offline") return <MapPin className="w-3.5 h-3.5" style={{ color: "oklch(0.72 0.18 195)" }} />;
  return <Layers className="w-3.5 h-3.5" style={{ color: "oklch(0.7 0.15 265)" }} />;
}

function CourseCard({ course, delay }: { course: Course; delay: number }) {
  return (
    <div
      className="reveal cyber-card p-5 flex flex-col"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Category label */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[0.6rem] tracking-widest uppercase"
          style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
        >
          {course.category}
        </span>
        <ModeBadge mode={course.mode} />
      </div>

      {/* Title */}
      <h3
        className="text-base font-bold mb-2 leading-tight"
        style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.88 0.02 160)", fontSize: "1.05rem" }}
      >
        {course.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4 flex-1"
        style={{ color: "oklch(0.58 0.04 220)", lineHeight: "1.6", fontSize: "0.8rem" }}
      >
        {course.description.length > 120
          ? course.description.slice(0, 120) + "..."
          : course.description}
      </p>

      {/* Meta */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "1px solid oklch(0.22 0.04 250 / 0.4)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" style={{ color: "oklch(0.55 0.04 220)" }}>
            <Clock className="w-3 h-3" />
            <span className="text-xs terminal-text">{course.duration.toString()}hrs</span>
          </div>
          <div className="flex items-center gap-1">
            <ModeIcon mode={course.mode} />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5" style={{ color: "oklch(0.82 0.22 145)" }} />
          <span
            className="font-bold text-sm terminal-text"
            style={{ color: "oklch(0.82 0.22 145)" }}
          >
            {course.price.toString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function CourseSkeletons() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((key) => (
        <div
          key={key}
          className="cyber-card p-5 animate-pulse"
          style={{ minHeight: "220px" }}
        >
          <div className="flex justify-between mb-3">
            <div className="h-3 w-20 rounded" style={{ background: "oklch(0.18 0.02 250)" }} />
            <div className="h-4 w-14 rounded" style={{ background: "oklch(0.18 0.02 250)" }} />
          </div>
          <div className="h-5 w-3/4 rounded mb-2" style={{ background: "oklch(0.18 0.02 250)" }} />
          <div className="space-y-1.5 mb-4">
            <div className="h-3 w-full rounded" style={{ background: "oklch(0.16 0.02 250)" }} />
            <div className="h-3 w-5/6 rounded" style={{ background: "oklch(0.16 0.02 250)" }} />
            <div className="h-3 w-4/6 rounded" style={{ background: "oklch(0.16 0.02 250)" }} />
          </div>
          <div className="flex justify-between pt-3" style={{ borderTop: "1px solid oklch(0.18 0.02 250)" }}>
            <div className="h-3 w-16 rounded" style={{ background: "oklch(0.16 0.02 250)" }} />
            <div className="h-4 w-12 rounded" style={{ background: "oklch(0.16 0.02 250)" }} />
          </div>
        </div>
      ))}
    </>
  );
}

const FILTERS: FilterMode[] = ["All", "online", "offline", "both"];
const FILTER_LABELS: Record<FilterMode, string> = {
  All: "All Courses",
  online: "Online",
  offline: "Offline",
  both: "Hybrid",
};

export function CoursesSection() {
  const { data: courses, isLoading } = useGetAllCourses();
  const [filter, setFilter] = useState<FilterMode>("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "All"
    ? (courses ?? [])
    : (courses ?? []).filter((c) => c.mode === filter);

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
      id="courses"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal">
          <div>
            <div className="section-label mb-3 flex items-center gap-2">
              <BookOpen className="w-3 h-3" />
              {"// Training Programs"}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
            >
              CYBERSECURITY{" "}
              <span style={{ color: "oklch(0.82 0.22 145)" }}>COURSES</span>
            </h2>
          </div>
          <p
            className="text-sm max-w-md leading-relaxed md:text-right"
            style={{ color: "oklch(0.6 0.04 220)" }}
          >
            {filtered.length} course{filtered.length !== 1 ? "s" : ""} available.
            Learn from industry veterans with hands-on lab environments.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="text-xs px-4 py-2 transition-all duration-200 terminal-text tracking-wider"
              style={{
                fontFamily: "Space Mono, monospace",
                letterSpacing: "0.08em",
                background: filter === f ? "oklch(0.82 0.22 145)" : "oklch(0.12 0.015 250)",
                color: filter === f ? "oklch(0.06 0.01 250)" : "oklch(0.6 0.04 220)",
                border: filter === f
                  ? "1px solid oklch(0.82 0.22 145)"
                  : "1px solid oklch(0.22 0.04 250)",
                borderRadius: "2px",
              }}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            <CourseSkeletons />
          ) : filtered.length === 0 ? (
            <div
              className="col-span-full py-20 text-center"
              style={{ color: "oklch(0.55 0.04 220)" }}
            >
              <BookOpen
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "oklch(0.3 0.03 250)" }}
              />
              <p className="terminal-text text-sm">
                No courses found. Data is loading...
              </p>
            </div>
          ) : (
            filtered.map((course, i) => (
              <CourseCard key={course.id.toString()} course={course} delay={i * 60} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
