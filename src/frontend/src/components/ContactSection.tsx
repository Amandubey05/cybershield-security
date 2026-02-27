import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, Terminal } from "lucide-react";
import { useSubmitInquiry } from "../hooks/useQueries";
import { toast } from "sonner";

const SUBJECTS = [
  "Penetration Testing Inquiry",
  "Security Audit Request",
  "Course Enrollment",
  "Workshop/Seminar Info",
  "Corporate Training",
  "IT Consulting",
  "General Inquiry",
];

const CONTACT_INFO = [
  {
    Icon: Mail,
    label: "Email",
    value: "contact@cybershield.in",
    color: "oklch(0.82 0.22 145)",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    color: "oklch(0.72 0.18 195)",
  },
  {
    Icon: MapPin,
    label: "HQ",
    value: "Cyber Tower, Sector 44, Gurugram, India",
    color: "oklch(0.55 0.2 265)",
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: submitInquiry, isPending } = useSubmitInquiry();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: SUBJECTS[6],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await submitInquiry(form);
      setSubmitted(true);
      toast.success("Message sent! We'll respond within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: SUBJECTS[6], message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      toast.error("Failed to send. Please try again or email us directly.");
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.06 0.01 250)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.82 0.22 145 / 0.4), transparent)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: "oklch(0.82 0.22 145 / 0.04)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label mb-3 flex items-center justify-center gap-2">
            <Terminal className="w-3 h-3" />
            {"// Contact Us"}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
          >
            INITIATE{" "}
            <span style={{ color: "oklch(0.82 0.22 145)" }}>SECURE</span> CONTACT
          </h2>
          <p
            className="max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.6 0.04 220)" }}
          >
            Ready to strengthen your security posture? Send us a message and our
            team will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 reveal-left">
            <div className="space-y-6 mb-8">
              {CONTACT_INFO.map(({ Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 flex items-center justify-center"
                    style={{
                      background: `${color.replace(")", " / 0.1)")}`,
                      border: `1px solid ${color.replace(")", " / 0.3)")}`,
                      borderRadius: "2px",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <div
                      className="text-[0.65rem] tracking-widest mb-0.5"
                      style={{ color: "oklch(0.5 0.04 220)", fontFamily: "Space Mono, monospace" }}
                    >
                      {label.toUpperCase()}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "oklch(0.75 0.04 220)" }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal decoration */}
            <div
              className="p-4 font-mono text-xs"
              style={{
                background: "oklch(0.08 0.01 250)",
                border: "1px solid oklch(0.22 0.04 250 / 0.5)",
                borderRadius: "2px",
              }}
            >
              <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: "1px solid oklch(0.22 0.04 250 / 0.4)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.65 0.25 25)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.75 0.2 60)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.82 0.22 145)" }} />
                <span style={{ color: "oklch(0.45 0.04 220)", fontSize: "0.65rem", marginLeft: "0.25rem" }}>
                  contact.sh
                </span>
              </div>
              <div style={{ color: "oklch(0.82 0.22 145)" }}>$ ./initiate_contact.sh</div>
              <div style={{ color: "oklch(0.55 0.04 220)" }}># Response time: {"<"} 24hrs</div>
              <div style={{ color: "oklch(0.55 0.04 220)" }}># Encryption: end-to-end</div>
              <div style={{ color: "oklch(0.55 0.04 220)" }}># Status: ONLINE</div>
              <div className="typing-cursor" style={{ color: "oklch(0.82 0.22 145)" }}>
                Awaiting your message
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 reveal-right">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-20 text-center"
                style={{
                  background: "oklch(0.11 0.015 250)",
                  border: "1px solid oklch(0.82 0.22 145 / 0.4)",
                  borderRadius: "2px",
                  boxShadow: "0 0 40px oklch(0.82 0.22 145 / 0.1)",
                }}
              >
                <CheckCircle
                  className="w-16 h-16 mb-4"
                  style={{ color: "oklch(0.82 0.22 145)" }}
                />
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "Rajdhani, sans-serif", color: "oklch(0.9 0.02 160)" }}
                >
                  MESSAGE SENT
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.6 0.04 220)" }}>
                  Our team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div
                  className="p-6"
                  style={{
                    background: "oklch(0.11 0.015 250)",
                    border: "1px solid oklch(0.22 0.04 250 / 0.5)",
                    borderRadius: "2px",
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[0.65rem] tracking-widest mb-1.5"
                        style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
                      >
                        NAME *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="cyber-input"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[0.65rem] tracking-widest mb-1.5"
                        style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
                      >
                        EMAIL *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="cyber-input"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-[0.65rem] tracking-widest mb-1.5"
                        style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
                      >
                        PHONE
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        className="cyber-input"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-[0.65rem] tracking-widest mb-1.5"
                        style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
                      >
                        SUBJECT
                      </label>
                      <select
                        id="contact-subject"
                        className="cyber-input"
                        value={form.subject}
                        onChange={(e) => updateField("subject", e.target.value)}
                        style={{ cursor: "pointer" }}
                      >
                        {SUBJECTS.map((s) => (
                          <option
                            key={s}
                            value={s}
                            style={{ background: "oklch(0.1 0.015 250)", color: "oklch(0.9 0.02 160)" }}
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-5">
                    <label
                      htmlFor="contact-message"
                      className="block text-[0.65rem] tracking-widest mb-1.5"
                      style={{ color: "oklch(0.55 0.04 220)", fontFamily: "Space Mono, monospace" }}
                    >
                      MESSAGE *
                    </label>
                    <textarea
                      id="contact-message"
                      className="cyber-input resize-none"
                      placeholder="Describe your security needs or inquiry..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="cyber-btn-primary w-full flex items-center justify-center gap-2"
                    style={{
                      clipPath: "none",
                      borderRadius: "2px",
                      opacity: isPending ? 0.7 : 1,
                    }}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
