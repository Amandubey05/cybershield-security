import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    // Observe direct children with reveal class
    const children = Array.from(el.querySelectorAll<Element>(".reveal, .reveal-left, .reveal-right"));
    for (const child of children) {
      observer.observe(child);
    }

    // Also observe the element itself if it has a reveal class
    const hasRevealClass =
      el.classList.contains("reveal") ||
      el.classList.contains("reveal-left") ||
      el.classList.contains("reveal-right");
    if (hasRevealClass) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useCounterAnimation(
  target: number,
  duration = 2000,
  startWhenVisible = true
) {
  const ref = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !startWhenVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            animateCounter(el, target, duration);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, startWhenVisible]);

  return ref;
}

function animateCounter(el: HTMLElement, target: number, duration: number) {
  const start = performance.now();
  const update = (time: number) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
