import { useEffect, useRef } from "react";
import { Calendar, MapPin, Users, Mic, Wrench } from "lucide-react";
import { useGetUpcomingEvents } from "../hooks/useQueries";
import type { Event } from "../hooks/useQueries";

function formatEventDate(timestamp: bigint): { day: string; month: string; year: string; time: string } {
  const ms = Number(timestamp) / 1_000_000;
  const date = new Date(ms);
  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    year: date.getFullYear().toString(),
    time: date.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
  };
}

function EventTypeBadge({ type }: { type: string }) {
  const isSeminar = type === "seminar";
  return (
    <span
      className="flex items-center gap-1 text-[0.6rem] px-2 py-0.5 tracking-wider"
      style={{
        background: isSeminar ? "oklch(0.55 0.2 265 / 0.1)" : "oklch(0.75 0.2 60 / 0.1)",
        border: `1px solid ${isSeminar ? "oklch(0.55 0.2 265 / 0.4)" : "oklch(0.75 0.2 60 / 0.4)"}`,
        color: isSeminar ? "oklch(0.7 0.15 265)" : "oklch(0.75 0.2 60)",
        fontFamily: "Space Mono, monospace",
        borderRadius: "2px",
      }}
    >
      {isSeminar ? <Mic className="w-2.5 h-2.5" /> : <Wrench className="w-2.5 h-2.5" />}
      {type.toUpperCase()}
    </span>
  );
}

function EventCard({ event, delay }: { event: Event; delay: number }) {
  const { day, month, year, time } = formatEventDate(event.date);
  const isSeminar = event.eventType === "seminar";
  const accentColor = isSeminar ? "oklch(0.55 0.2 265)" : "oklch(0.75 0.2 60)";

  return (
    <div
      className="reveal cyber-card p-0 overflow-hidden flex flex-col sm:flex-row"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Date block */}
      <div
        className="shrink-0 flex flex-col items-center justify-center p-6 sm:w-24 sm:min-h-full"
        style={{
          background: `${accentColor.replace(")", " / 0.08)")}`,
          borderRight: `1px solid ${accentColor.replace(")", " / 0.2)")}`,
          minHeight: "100px",
        }}
      >
        <span
          className="text-3xl font-bold leading-none"
          style={{ fontFamily: "Rajdhani, sans-serif", color: accentColor }}
        >
          {day}
        </span>
        <span
          className="text-xs tracking-wider"
          style={{ color: accentColor, fontFamily: "Space Mono, monospace", opacity: 0.8 }}
        >
          {month}
        </span>
        <span
          className="text-[0.6rem] tracking-wider mt-1"
          style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
        >
          {year}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <EventTypeBadge type={event.eventType} />
          <span
            className="text-[0.6rem] terminal-text"
            style={{ color: "oklch(0.55 0.04 220)" }}
          >
            {time}
          </span>
        </div>

        <h3
          className="font-bold mb-2 leading-snug"
          style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.88 0.02 160)", fontSize: "1rem" }}
        >
          {event.title}
        </h3>

        <p
          className="text-xs leading-relaxed mb-3"
          style={{ color: "oklch(0.58 0.04 220)", lineHeight: "1.6" }}
        >
          {event.description.length > 130
            ? event.description.slice(0, 130) + "..."
            : event.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1" style={{ color: "oklch(0.55 0.04 220)" }}>
            <MapPin className="w-3 h-3" />
            <span className="text-xs terminal-text">{event.location}</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: "oklch(0.55 0.04 220)" }}>
            <Users className="w-3 h-3" />
            <span className="text-xs terminal-text">{event.capacity.toString()} seats</span>
          </div>
        </div>
      </div>

      {/* Register button */}
      <div
        className="flex items-center justify-center p-4 sm:border-l"
        style={{ borderColor: "oklch(0.22 0.04 250 / 0.4)" }}
      >
        <button
          type="button"
          className="text-[0.65rem] px-3 py-2 transition-all duration-200 tracking-wider whitespace-nowrap terminal-text"
          style={{
            background: "transparent",
            border: `1px solid ${accentColor.replace(")", " / 0.5)")}`,
            color: accentColor,
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `${accentColor.replace(")", " / 0.1)")}`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}

function EventSkeletons() {
  return (
    <>
      {Array.from({ length: 4 }, (_, i) => `ev-skel-${i}`).map((key) => (
        <div key={key} className="cyber-card p-0 overflow-hidden flex animate-pulse" style={{ minHeight: "110px" }}>
          <div className="w-24 shrink-0" style={{ background: "oklch(0.14 0.02 250)" }} />
          <div className="flex-1 p-5 space-y-2">
            <div className="h-3 w-16 rounded" style={{ background: "oklch(0.18 0.02 250)" }} />
            <div className="h-4 w-3/4 rounded" style={{ background: "oklch(0.18 0.02 250)" }} />
            <div className="h-3 w-full rounded" style={{ background: "oklch(0.16 0.02 250)" }} />
            <div className="h-3 w-2/3 rounded" style={{ background: "oklch(0.16 0.02 250)" }} />
          </div>
        </div>
      ))}
    </>
  );
}

export function EventsSection() {
  const { data: events, isLoading } = useGetUpcomingEvents();
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
      id="events"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.08 0.01 250)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.55 0.2 265 / 0.3), transparent)",
        }}
      />

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: "oklch(0.55 0.2 265 / 0.04)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label mb-3 flex items-center justify-center gap-2">
            <Calendar className="w-3 h-3" />
            {"// Events & Workshops"}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
          >
            UPCOMING{" "}
            <span style={{ color: "oklch(0.55 0.2 265)" }}>SEMINARS</span> &amp;{" "}
            <span style={{ color: "oklch(0.75 0.2 60)" }}>WORKSHOPS</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.6 0.04 220)" }}
          >
            Join our expert-led events to stay ahead of emerging threats.
            Limited seats — register early to secure your spot.
          </p>
        </div>

        {/* Event list */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <EventSkeletons />
          ) : !events || events.length === 0 ? (
            <div
              className="py-20 text-center"
              style={{ color: "oklch(0.55 0.04 220)" }}
            >
              <Calendar
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "oklch(0.3 0.03 250)" }}
              />
              <p className="terminal-text text-sm">
                No upcoming events. Check back soon.
              </p>
            </div>
          ) : (
            events.map((event, i) => (
              <EventCard key={event.id.toString()} event={event} delay={i * 80} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
