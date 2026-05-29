import { useRef, useMemo } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroCanvas } from "@/components/HeroCanvas";

// ─── Europe dot-map generator ──────────────────────────────────────────────
// Map viewport: 320×190px covering roughly lon -12→42°E, lat 35→70°N
const MAP_W = 320;
const MAP_H = 190;
const DOT_SPACING = 9;

// Erfurt: 50.98°N, 11.03°E → map pixel
const ERFURT_X = ((11.03 - -12) / 54) * MAP_W;  // ≈ 136
const ERFURT_Y = ((70 - 50.98) / 35) * MAP_H;   // ≈ 103

function europeOpacity(px: number, py: number): number {
  // Very rough Europe footprint (excludes obvious ocean/empty cells)
  const inBounds =
    px >= 22 && px <= 308 &&
    py >= 6  && py <= 184;

  if (!inBounds) return 0;

  // Carve out Atlantic bottom-left
  if (px < 70 && py > 130) return 0;
  // Carve out far North-East void
  if (px > 275 && py < 40) return 0;
  // Carve out bottom-right (Turkey/Middle East)
  if (px > 255 && py > 150) return 0;
  // North Atlantic gap
  if (px < 40 && py < 80) return 0;

  const dx = px - ERFURT_X;
  const dy = py - ERFURT_Y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const proximity = Math.max(0, 1 - dist / 160);
  return Math.min(0.72, 0.08 + proximity * 0.64);
}

function useDots() {
  return useMemo(() => {
    const dots: { x: number; y: number; op: number }[] = [];
    for (let x = DOT_SPACING / 2; x < MAP_W; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < MAP_H; y += DOT_SPACING) {
        const op = europeOpacity(x, y);
        if (op > 0) dots.push({ x, y, op });
      }
    }
    return dots;
  }, []);
}

// ─── Location Card ─────────────────────────────────────────────────────────
function LocationCard() {
  const dots = useDots();

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 340,
        borderRadius: 24,
        background: "linear-gradient(160deg, hsl(220 25% 9% / 0.92) 0%, hsl(220 20% 6% / 0.96) 100%)",
        border: "1px solid hsl(173 65% 42% / 0.18)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: [
          "0 0 0 1px hsl(173 65% 42% / 0.07)",
          "0 4px 40px hsl(0 0% 0% / 0.55)",
          "0 0 60px hsl(173 65% 42% / 0.07)",
          "inset 0 1px 0 hsl(173 65% 42% / 0.12)",
        ].join(", "),
      }}
      data-testid="location-card"
    >
      {/* ── Map area ─────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: MAP_H + 10,
          overflow: "hidden",
          borderRadius: "24px 24px 0 0",
          background: "hsl(220 22% 7%)",
          borderBottom: "1px solid hsl(173 65% 42% / 0.1)",
        }}
      >
        {/* Ambient map glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: ERFURT_X - 60,
            top: ERFURT_Y - 55,
            width: 120,
            height: 110,
            background: "radial-gradient(ellipse, hsl(173 65% 42% / 0.18) 0%, transparent 70%)",
            filter: "blur(18px)",
            pointerEvents: "none",
          }}
        />

        {/* Dot map */}
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          width={MAP_W}
          height={MAP_H}
          style={{ display: "block", margin: "5px auto 0" }}
        >
          {dots.map(({ x, y, op }, i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={1.4}
              fill="hsl(173 65% 42%)"
              fillOpacity={op}
            />
          ))}

          {/* Radar rings */}
          {[18, 34, 52].map((r, i) => (
            <circle
              key={`ring-${i}`}
              cx={ERFURT_X}
              cy={ERFURT_Y}
              r={r}
              fill="none"
              stroke="hsl(173 65% 42%)"
              strokeWidth="0.6"
              strokeOpacity={0}
            >
              <animate
                attributeName="r"
                values={`${r * 0.3};${r}`}
                dur={`${2.4 + i * 0.7}s`}
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.55;0"
                dur={`${2.4 + i * 0.7}s`}
                begin={`${i * 0.65}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Pin outer glow */}
          <circle cx={ERFURT_X} cy={ERFURT_Y} r={6} fill="hsl(173 65% 42%)" fillOpacity={0.18} />
          {/* Pin ring */}
          <circle cx={ERFURT_X} cy={ERFURT_Y} r={4} fill="none" stroke="hsl(173 65% 42%)" strokeWidth={1.2} strokeOpacity={0.9} />
          {/* Pin core */}
          <circle cx={ERFURT_X} cy={ERFURT_Y} r={2.2} fill="hsl(173 65% 42%)" />
          <circle cx={ERFURT_X} cy={ERFURT_Y} r={1} fill="white" fillOpacity={0.95} />

          {/* HUD corner brackets */}
          {/* top-left */}
          <path d="M8 18 L8 8 L18 8" stroke="hsl(173 65% 42%)" strokeWidth="1" strokeOpacity="0.35" fill="none" />
          {/* top-right */}
          <path d={`M${MAP_W - 18} 8 L${MAP_W - 8} 8 L${MAP_W - 8} 18`} stroke="hsl(173 65% 42%)" strokeWidth="1" strokeOpacity="0.35" fill="none" />
          {/* bottom-left */}
          <path d={`M8 ${MAP_H - 18} L8 ${MAP_H - 8} L18 ${MAP_H - 8}`} stroke="hsl(173 65% 42%)" strokeWidth="1" strokeOpacity="0.35" fill="none" />
          {/* bottom-right */}
          <path d={`M${MAP_W - 18} ${MAP_H - 8} L${MAP_W - 8} ${MAP_H - 8} L${MAP_W - 8} ${MAP_H - 18}`} stroke="hsl(173 65% 42%)" strokeWidth="1" strokeOpacity="0.35" fill="none" />

          {/* Scan line */}
          <line x1={0} y1={ERFURT_Y} x2={MAP_W} y2={ERFURT_Y} stroke="hsl(173 65% 42%)" strokeWidth="0.4" strokeOpacity="0.18" strokeDasharray="4 6" />
          <line x1={ERFURT_X} y1={0} x2={ERFURT_X} y2={MAP_H} stroke="hsl(173 65% 42%)" strokeWidth="0.4" strokeOpacity="0.18" strokeDasharray="4 6" />
        </svg>

        {/* Top-right badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            padding: "2px 8px",
            borderRadius: 4,
            background: "hsl(173 65% 42% / 0.12)",
            border: "1px solid hsl(173 65% 42% / 0.25)",
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.08em",
            color: "hsl(173 65% 52%)",
          }}
        >
          EU · LIVE
        </div>
      </div>

      {/* ── Card content ─────────────────────────── */}
      <div style={{ padding: "20px 22px 22px" }}>
        {/* Label */}
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "hsl(173 65% 42% / 0.6)",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Based In
        </p>

        {/* City */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "hsl(0 0% 96%)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 6,
          }}
        >
          Erfurt, Germany
        </p>

        {/* Coordinates */}
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 10.5,
            color: "hsl(173 65% 42% / 0.65)",
            letterSpacing: "0.04em",
            marginBottom: 14,
          }}
        >
          50.9787° N, 11.0328° E &nbsp;·&nbsp; CET (UTC+1)
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, hsl(173 65% 42% / 0.25), transparent)",
            marginBottom: 14,
          }}
        />

        {/* Meta columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 8px" }}>
          {[
            { label: "Status", value: "Open to offers" },
            { label: "Eligibility", value: "EU work permit" },
            { label: "Languages", value: "DE B1 · EN C1" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 8.5,
                  letterSpacing: "0.1em",
                  color: "hsl(173 65% 42% / 0.5)",
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "hsl(0 0% 82%)",
                  lineHeight: 1.35,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const aurora1Y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const aurora2Y = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative pt-28 pb-24 border-b border-border overflow-hidden"
      data-testid="section-hero"
    >
      {/* Aurora 1 */}
      <motion.div aria-hidden style={{ y: aurora1Y }} className="pointer-events-none absolute -z-10">
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "-10%",
            width: "70%",
            height: "70%",
            background:
              "radial-gradient(ellipse at 40% 50%, hsl(173 65% 42% / 0.18) 0%, hsl(210 70% 50% / 0.08) 45%, transparent 70%)",
            filter: "blur(52px)",
            animation: "aurora-a 9s ease-in-out infinite alternate",
          }}
        />
      </motion.div>

      {/* Aurora 2 */}
      <motion.div aria-hidden style={{ y: aurora2Y }} className="pointer-events-none absolute -z-10">
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "25%",
            width: "55%",
            height: "50%",
            background:
              "radial-gradient(ellipse at 50% 50%, hsl(280 55% 55% / 0.07) 0%, transparent 65%)",
            filter: "blur(64px)",
            animation: "aurora-b 13s ease-in-out infinite alternate-reverse",
          }}
        />
      </motion.div>

      {/* Perspective grid */}
      <motion.div aria-hidden style={{ y: gridY }} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <div
          style={{
            height: "320px",
            backgroundImage:
              "linear-gradient(hsl(173 65% 42% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(173 65% 42% / 0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            transform: "perspective(600px) rotateX(50deg)",
            transformOrigin: "50% 100%",
            maskImage: "linear-gradient(to top, hsl(0 0% 0% / 0.35) 0%, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to top, hsl(0 0% 0% / 0.35) 0%, transparent 75%)",
          }}
        />
      </motion.div>

      <HeroCanvas />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 -z-10"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
      />

      {/* ── Two-column layout ───────────────────── */}
      <motion.div
        style={{ y: contentY }}
        className="container mx-auto px-6 max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2 mb-4"
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.13em",
                  color: "hsl(173 65% 48%)",
                  textTransform: "uppercase",
                }}
              >
                Erfurt, Germany
              </span>
              <span style={{ color: "hsl(173 65% 42% / 0.4)", fontSize: 11 }}>—</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "hsl(173 65% 42% / 0.65)",
                  textTransform: "uppercase",
                }}
              >
                Open to EU Roles
              </span>
            </motion.div>

            {/* Teal divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 36 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="h-px bg-primary mb-6"
            />

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-[2.6rem] md:text-5xl lg:text-[3.2rem] font-bold tracking-tight text-foreground leading-[1.1] mb-5 relative"
              data-testid="text-name"
            >
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none blur-2xl opacity-[0.16]"
                style={{ color: "hsl(173 65% 42%)", WebkitTextStroke: "10px currentColor" }}
              >
                Rishma Merkaje Nanaiah
              </span>
              Rishma Merkaje Nanaiah
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="text-lg md:text-xl font-medium text-muted-foreground mb-5 tracking-tight"
              data-testid="text-title"
            >
              Frontend Engineer | Angular &amp; Enterprise UI Systems
            </motion.h2>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-[15px] text-muted-foreground leading-relaxed max-w-xl mb-9"
              data-testid="text-summary"
            >
              5 years delivering production Angular applications and enterprise UI systems. Most recently at EnBW, one of Germany&apos;s largest energy companies, building the shared component library across 7 engineering teams.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.36 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                size="default"
                className="font-medium rounded-sm px-5 h-9 shadow-[0_0_20px_hsl(173_65%_42%/0.25)] hover:shadow-[0_0_32px_hsl(173_65%_42%/0.45)] transition-shadow duration-300"
                data-testid="button-view-projects"
              >
                <a href="#projects">
                  View Projects <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="default"
                className="font-medium rounded-sm px-5 h-9 border-border/60 hover:border-primary/50 hover:text-primary transition-colors"
                data-testid="button-contact"
              >
                <a href="#contact">
                  <Mail className="mr-1.5 h-3.5 w-3.5" /> Contact
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Location Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="hidden lg:flex justify-center"
          >
            <LocationCard />
          </motion.div>

          {/* Mobile: card below content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex lg:hidden justify-center"
          >
            <LocationCard />
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes aurora-a {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(35px, -25px) scale(1.08); }
          100% { transform: translate(-25px, 18px) scale(0.94); }
        }
        @keyframes aurora-b {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-20px, 30px) scale(1.06); }
          100% { transform: translate(30px, -22px) scale(0.96); }
        }
      `}</style>
    </section>
  );
}
