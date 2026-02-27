import { useEffect, useRef } from "react";
import { useActor } from "./useActor";
import { useGetAllCourses, useGetUpcomingEvents, useGetAllTips } from "./useQueries";

const SAMPLE_COURSES = [
  {
    title: "Ethical Hacking Fundamentals",
    description: "Master penetration testing techniques, vulnerability assessment, and ethical hacking methodologies used by top security professionals.",
    mode: "online",
    duration: 40n,
    price: 199n,
    category: "Penetration Testing",
  },
  {
    title: "Network Security Essentials",
    description: "Deep dive into firewalls, IDS/IPS systems, VPNs, and network monitoring. Hands-on lab environment with real-world scenarios.",
    mode: "offline",
    duration: 24n,
    price: 299n,
    category: "Network Security",
  },
  {
    title: "Web Application Security",
    description: "Learn OWASP Top 10 vulnerabilities, SQL injection, XSS, CSRF and how to defend against modern web-based attacks.",
    mode: "online",
    duration: 30n,
    price: 149n,
    category: "Application Security",
  },
  {
    title: "CISSP Certification Prep",
    description: "Comprehensive preparation course covering all 8 CISSP domains. Includes practice exams, study guides, and expert mentorship.",
    mode: "both",
    duration: 60n,
    price: 499n,
    category: "Certification",
  },
  {
    title: "Cybersecurity for Beginners",
    description: "Start your cybersecurity journey. Understand core concepts, threats, and basic defense strategies with zero prerequisites.",
    mode: "online",
    duration: 12n,
    price: 49n,
    category: "Fundamentals",
  },
  {
    title: "Cloud Security Architecture",
    description: "Secure AWS, Azure, and GCP environments. Identity management, data encryption, compliance, and cloud-native security tools.",
    mode: "online",
    duration: 36n,
    price: 349n,
    category: "Cloud Security",
  },
];

const now = Date.now();
const DAY = 86400000;

const SAMPLE_EVENTS = [
  {
    title: "Annual CyberShield Summit 2026",
    description: "Our flagship annual summit bringing together 500+ security professionals, CISO speakers, and live hacking demonstrations. Network with the best in the industry.",
    date: BigInt(now + 30 * DAY) * 1000000n,
    location: "Mumbai Convention Centre, India",
    eventType: "seminar",
    capacity: 500n,
  },
  {
    title: "Advanced Penetration Testing Workshop",
    description: "Hands-on intensive workshop. Bring your laptop. Tackle real CTF challenges, learn advanced exploitation techniques, and get mentored by OSCP-certified experts.",
    date: BigInt(now + 15 * DAY) * 1000000n,
    location: "CyberShield Training Lab, Delhi",
    eventType: "workshop",
    capacity: 40n,
  },
  {
    title: "Social Engineering Awareness Day",
    description: "Understand how attackers manipulate human psychology. Live phishing simulations, vishing demos, and how to train your organization to resist social attacks.",
    date: BigInt(now + 45 * DAY) * 1000000n,
    location: "Online — Zoom Webinar",
    eventType: "seminar",
    capacity: 1000n,
  },
  {
    title: "Secure Coding Bootcamp",
    description: "2-day intensive for developers. Learn SAST/DAST tools, secure SDLC practices, input validation, authentication patterns, and real code review exercises.",
    date: BigInt(now + 22 * DAY) * 1000000n,
    location: "Bengaluru Tech Hub, India",
    eventType: "workshop",
    capacity: 60n,
  },
];

const SAMPLE_TIPS = [
  {
    title: "Use Strong, Unique Passwords",
    content: "Create passwords with at least 16 characters using a mix of uppercase, lowercase, numbers, and symbols. Never reuse passwords across accounts. Use a reputable password manager like Bitwarden or 1Password to store them securely.",
    category: "Password Security",
  },
  {
    title: "Enable Multi-Factor Authentication",
    content: "Always enable MFA on every account that supports it. Prefer authenticator apps (Google Authenticator, Authy) over SMS codes, as SIM swapping attacks can intercept text messages.",
    category: "Password Security",
  },
  {
    title: "Recognize Phishing Emails",
    content: "Check sender addresses carefully — attackers use lookalike domains. Hover over links before clicking. Legitimate organizations never ask for passwords via email. When in doubt, contact the organization directly through their official website.",
    category: "Phishing",
  },
  {
    title: "Verify Before You Click",
    content: "Phishing attacks often create urgency ('Your account will be suspended!'). Pause, take a breath, and verify through a separate channel. Report suspicious emails to your IT security team immediately.",
    category: "Phishing",
  },
  {
    title: "Secure Your Home Wi-Fi",
    content: "Use WPA3 (or WPA2) encryption with a strong password. Change your router's default admin credentials. Keep firmware updated. Create a separate guest network for IoT devices and visitors.",
    category: "Network Safety",
  },
  {
    title: "Use a VPN on Public Networks",
    content: "Public Wi-Fi (cafes, airports, hotels) is a prime attack vector for man-in-the-middle attacks. Always use a trusted VPN when connecting to public networks to encrypt your traffic.",
    category: "Network Safety",
  },
  {
    title: "Beware of Pretexting Attacks",
    content: "Attackers may pose as IT support, HR, or even your CEO to extract sensitive information. Always verify the identity of anyone requesting sensitive data or access credentials through a separate, trusted communication channel.",
    category: "Social Engineering",
  },
  {
    title: "Think Before You Share Online",
    content: "Information shared on social media can be used to craft convincing spear-phishing attacks. Limit personal details in public profiles. Attackers harvest birthdays, job titles, and relationships to build trust.",
    category: "Social Engineering",
  },
];

export function useSeedData() {
  const { actor, isFetching } = useActor();
  const { data: courses, isSuccess: coursesLoaded } = useGetAllCourses();
  const { data: events, isSuccess: eventsLoaded } = useGetUpcomingEvents();
  const { data: tips, isSuccess: tipsLoaded } = useGetAllTips();
  const seededRef = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || seededRef.current) return;
    if (!coursesLoaded || !eventsLoaded || !tipsLoaded) return;

    const shouldSeedCourses = courses?.length === 0;
    const shouldSeedEvents = events?.length === 0;
    const shouldSeedTips = tips?.length === 0;

    if (!shouldSeedCourses && !shouldSeedEvents && !shouldSeedTips) return;

    seededRef.current = true;

    const seedAll = async () => {
      const promises: Promise<unknown>[] = [];

      if (shouldSeedCourses) {
        for (const course of SAMPLE_COURSES) {
          promises.push(
            actor.createCourse(
              course.title,
              course.description,
              course.mode,
              course.duration,
              course.price,
              course.category
            )
          );
        }
      }

      if (shouldSeedEvents) {
        for (const event of SAMPLE_EVENTS) {
          promises.push(
            actor.createEvent(
              event.title,
              event.description,
              event.date,
              event.location,
              event.eventType,
              event.capacity
            )
          );
        }
      }

      if (shouldSeedTips) {
        for (const tip of SAMPLE_TIPS) {
          promises.push(
            actor.createAwarenessTip(tip.title, tip.content, tip.category)
          );
        }
      }

      await Promise.all(promises);
    };

    seedAll().catch(console.error);
  }, [actor, isFetching, courses, events, tips, coursesLoaded, eventsLoaded, tipsLoaded]);
}
