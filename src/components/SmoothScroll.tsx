import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Wire Lenis to anchor link clicks so smooth scrolling works for nav
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      e.preventDefault();
      const href = target.getAttribute("href");
      if (!href) return;
      const el = document.querySelector(href);
      if (el) lenis.scrollTo(el as HTMLElement, { offset: -56 });
    };
    document.addEventListener("click", handleAnchorClick);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
