import { useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroCanvas } from "@/components/HeroCanvas";


function LocationCard() {
  const W = 300, H = 160;
  const ERFURT_CX = 195, ERFURT_CY = 82;
  const gridCols = [60, 120, 180, 240];
  const gridRows = [40, 80, 120];

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      className="border border-border bg-card"
      style={{ width: 320, borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px hsl(0 0% 0% / 0.10)" }}
    >
      {/* Map area */}
      <div className="relative bg-muted/40 border-b border-border" style={{ height: H + 20 }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ display: "block", margin: "10px auto 0" }}>
          {/* Grid lines */}
          {gridCols.map(x => (
            <line key={x} x1={x} y1={0} x2={x} y2={H} stroke="hsl(173 65% 42%)" strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="4 5" />
          ))}
          {gridRows.map(y => (
            <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="hsl(173 65% 42%)" strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="4 5" />
          ))}
          {/* Coord labels */}
          <text x="4" y={H - 4} fontSize="8" fontFamily="monospace" fill="hsl(173 65% 42%)" fillOpacity="0.45">50.97°N</text>
          <text x={W - 38} y={H - 4} fontSize="8" fontFamily="monospace" fill="hsl(173 65% 42%)" fillOpacity="0.45">11.03°E</text>
          {/* Pulse rings */}
          {[20, 36, 54].map((r, i) => (
            <circle key={i} cx={ERFURT_CX} cy={ERFURT_CY} r={r} fill="none" stroke="hsl(173 65% 42%)" strokeWidth="0.8" strokeOpacity="0">
              <animate attributeName="r" values={`${r * 0.3};${r}`} dur={`${2.2 + i * 0.6}s`} begin={`${i * 0.55}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.55;0" dur={`${2.2 + i * 0.6}s`} begin={`${i * 0.55}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Pin */}
          <circle cx={ERFURT_CX} cy={ERFURT_CY} r={6} fill="hsl(173 65% 42%)" fillOpacity="0.15" />
          <circle cx={ERFURT_CX} cy={ERFURT_CY} r={4} fill="none" stroke="hsl(173 65% 42%)" strokeWidth="1.2" strokeOpacity="0.9" />
          <circle cx={ERFURT_CX} cy={ERFURT_CY} r={2.2} fill="hsl(173 65% 42%)" />
          <circle cx={ERFURT_CX} cy={ERFURT_CY} r={1} fill="white" fillOpacity="0.95" />
          {/* Label */}
          <line x1={ERFURT_CX + 4} y1={ERFURT_CY - 4} x2={ERFURT_CX + 18} y2={ERFURT_CY - 18} stroke="hsl(173 65% 42%)" strokeWidth="0.7" strokeOpacity="0.6" />
          <text x={ERFURT_CX + 20} y={ERFURT_CY - 20} fontSize="9" fontFamily="monospace" fill="hsl(173 65% 52%)" fontWeight="600">Erfurt</text>
        </svg>
      </div>

      {/* Card content */}
      <div style={{ padding: "18px 20px 20px" }}>
        <p className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "hsl(173 65% 42% / 0.65)", marginBottom: 4 }}>Based In</p>
        <p className="font-bold text-foreground" style={{ fontSize: 20, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 5 }}>Erfurt, Germany</p>
        <p className="font-mono" style={{ fontSize: 10, color: "hsl(173 65% 42% / 0.6)", letterSpacing: "0.04em", marginBottom: 12 }}>
          50.9787° N, 11.0328° E &nbsp;·&nbsp; CET (UTC+1)
        </p>
        <div style={{ height: 1, background: "linear-gradient(90deg, hsl(173 65% 42% / 0.2), transparent)", marginBottom: 12 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 8px" }}>
          {[{ label: "Status", value: "Open to offers" }, { label: "Eligibility", value: "EU work permit" }, { label: "Languages", value: "DE B1 · EN C1" }].map(({ label, value }) => (
            <div key={label}>
              <p className="font-mono uppercase text-muted-foreground/60" style={{ fontSize: 8, letterSpacing: "0.1em", marginBottom: 3 }}>{label}</p>
              <p className="text-foreground/80" style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.35 }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const aurora1Y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const aurora2Y = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section ref={sectionRef} id="hero" className="relative pt-28 pb-24 border-b border-border overflow-hidden" data-testid="section-hero">
      <motion.div aria-hidden style={{ y: aurora1Y }} className="pointer-events-none absolute -z-10">
        <div style={{ position: "absolute", top: "0px", left: "-10%", width: "70%", height: "70%", background: "radial-gradient(ellipse at 40% 50%, hsl(173 65% 42% / 0.18) 0%, hsl(210 70% 50% / 0.08) 45%, transparent 70%)", filter: "blur(52px)", animation: "aurora-a 9s ease-in-out infinite alternate" }} />
      </motion.div>
      <motion.div aria-hidden style={{ y: aurora2Y }} className="pointer-events-none absolute -z-10">
        <div style={{ position: "absolute", top: "-20px", left: "25%", width: "55%", height: "50%", background: "radial-gradient(ellipse at 50% 50%, hsl(280 55% 55% / 0.07) 0%, transparent 65%)", filter: "blur(64px)", animation: "aurora-b 13s ease-in-out infinite alternate-reverse" }} />
      </motion.div>
      <motion.div aria-hidden style={{ y: gridY }} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <div style={{ height: "320px", backgroundImage: "linear-gradient(hsl(173 65% 42% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(173 65% 42% / 0.06) 1px, transparent 1px)", backgroundSize: "64px 64px", transform: "perspective(600px) rotateX(50deg)", transformOrigin: "50% 100%", maskImage: "linear-gradient(to top, hsl(0 0% 0% / 0.35) 0%, transparent 75%)", WebkitMaskImage: "linear-gradient(to top, hsl(0 0% 0% / 0.35) 0%, transparent 75%)" }} />
      </motion.div>
      <HeroCanvas />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 -z-10" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />

      <motion.div style={{ y: contentY }} className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
            {/* Name + photo */}
            <div className="flex items-center gap-5 mb-5">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="text-[2.6rem] md:text-5xl lg:text-[3.2rem] font-bold tracking-tight text-foreground leading-[1.1] relative"
                data-testid="text-name"
              >
                <span aria-hidden className="absolute inset-0 pointer-events-none blur-2xl opacity-[0.16]" style={{ color: "hsl(173 65% 42%)", WebkitTextStroke: "10px currentColor" }}>
                  Rishma Merkaje Nanaiah
                </span>
                Rishma Merkaje Nanaiah
              </motion.h1>
              <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="shrink-0 hidden md:block">
                <img src="/rishma.jpg" alt="Rishma Merkaje Nanaiah" className="w-20 h-20 rounded-full object-cover object-top border-2" style={{ borderColor: "hsl(173 65% 42% / 0.4)" }} />
              </motion.div>
            </div>

            <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.24 }} className="text-lg md:text-xl font-medium text-muted-foreground mb-5 tracking-tight" data-testid="text-title">
              Frontend Engineer | Angular &amp; Enterprise UI Systems
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="text-[15px] text-muted-foreground leading-relaxed max-w-xl mb-9" data-testid="text-summary">
              5 years delivering production Angular applications and enterprise UI systems. Most recently at EnBW, one of Germany&apos;s largest energy companies, building the shared component library across 7 engineering teams.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.36 }} className="flex flex-wrap items-center gap-3">
              <Button asChild size="default" className="font-medium rounded-sm px-5 h-9 shadow-[0_0_20px_hsl(173_65%_42%/0.25)] hover:shadow-[0_0_32px_hsl(173_65%_42%/0.45)] transition-shadow duration-300" data-testid="button-view-projects">
                <a href="#projects">View Projects <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></a>
              </Button>
              <Button asChild variant="outline" size="default" className="font-medium rounded-sm px-5 h-9 border-border/60 hover:border-primary/50 hover:text-primary transition-colors" data-testid="button-contact">
                <a href="#contact"><Mail className="mr-1.5 h-3.5 w-3.5" /> Contact</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Location Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.28 }} className="hidden lg:flex justify-center">
            <LocationCard />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex lg:hidden justify-center">
            <LocationCard />
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes aurora-a { 0% { transform: translate(0px,0px) scale(1); } 50% { transform: translate(35px,-25px) scale(1.08); } 100% { transform: translate(-25px,18px) scale(0.94); } }
        @keyframes aurora-b { 0% { transform: translate(0px,0px) scale(1); } 50% { transform: translate(-20px,30px) scale(1.06); } 100% { transform: translate(30px,-22px) scale(0.96); } }
      `}</style>
    </section>
  );
}
