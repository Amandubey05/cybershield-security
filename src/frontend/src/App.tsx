import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { CoursesSection } from "./components/CoursesSection";
import { EventsSection } from "./components/EventsSection";
import { AwarenessSection } from "./components/AwarenessSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { useSeedData } from "./hooks/useSeedData";

function AppContent() {
  useSeedData();

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.06 0.01 250)" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CoursesSection />
        <EventsSection />
        <AwarenessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.12 0.015 250)",
            border: "1px solid oklch(0.22 0.04 250 / 0.5)",
            color: "oklch(0.9 0.02 160)",
            fontFamily: "Space Mono, monospace",
            fontSize: "0.8rem",
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
