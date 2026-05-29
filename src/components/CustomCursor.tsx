import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice()) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onHoverStart = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [data-cursor-hover]")) setHovering(true);
    };
    const onHoverEnd = () => setHovering(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);

    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
    };
  }, [visible]);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? "10px" : "6px",
          height: hovering ? "10px" : "6px",
          marginLeft: hovering ? "-5px" : "-3px",
          marginTop: hovering ? "-5px" : "-3px",
          borderRadius: "50%",
          backgroundColor: "hsl(173 65% 42%)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s, width 0.15s, height 0.15s, margin 0.15s, background-color 0.15s",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />
      {/* Ring — lerps behind */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? "44px" : clicking ? "28px" : "36px",
          height: hovering ? "44px" : clicking ? "28px" : "36px",
          marginLeft: hovering ? "-22px" : clicking ? "-14px" : "-18px",
          marginTop: hovering ? "-22px" : clicking ? "-14px" : "-18px",
          borderRadius: "50%",
          border: `1px solid hsl(173 65% 42% / ${hovering ? "0.7" : "0.4"})`,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s",
          willChange: "transform",
          backdropFilter: hovering ? "blur(2px)" : "none",
        }}
      />
    </>
  );
}
