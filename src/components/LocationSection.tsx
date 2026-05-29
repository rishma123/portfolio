import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

function GlobeWireframe() {
  const R = 100;
  const cx = 130;
  const cy = 130;

  // Latitude lines — horizontal ellipses
  const latLines = [-60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map((lat) => {
    const rad = (lat * Math.PI) / 180;
    const ry_vis = R * Math.cos(rad) * 0.28; // foreshortening
    const rx = R * Math.cos(rad);
    const y = cy - R * Math.sin(rad);
    return { rx, ry: ry_vis, cx, cy: y, lat };
  });

  // Longitude lines — vertical ellipses, evenly spaced, some behind
  const lonLines = [-90, -60, -30, 0, 30, 60, 90, 120, 150, 180].map((lon) => {
    const rad = (lon * Math.PI) / 180;
    // For front-facing globe, x-extent is cos(lon), y-extent is 1
    return {
      rx: Math.abs(R * Math.cos(rad)),
      ry: R,
      cx,
      cy,
      lon,
      behind: Math.cos(rad) < 0,
    };
  });

  // Germany position in orthographic projection centered roughly on Europe
  // Germany: 51°N, 10°E — on a globe centered at 45°N, 15°E
  // Relative lat: 51-45=6°N, relative lon: 10-15=-5°W
  const gLat = (6 * Math.PI) / 180;
  const gLon = (-5 * Math.PI) / 180;
  const gx = cx + R * Math.cos(gLat) * Math.sin(gLon);
  const gy = cy - R * Math.sin(gLat);

  return (
    <svg
      viewBox="0 0 260 260"
      className="w-full h-full"
      style={{ maxWidth: 260, maxHeight: 260 }}
    >
      <defs>
        <radialGradient id="globe-surface" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="hsl(173 65% 42%)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="hsl(220 16% 7%)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="globe-edge" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stopColor="transparent" />
          <stop offset="100%" stopColor="hsl(220 16% 7%)" stopOpacity="0.8" />
        </radialGradient>
        <clipPath id="globe-clip">
          <circle cx={cx} cy={cy} r={R} />
        </clipPath>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Globe surface fill */}
      <circle cx={cx} cy={cy} r={R} fill="url(#globe-surface)" />

      {/* Behind longitude lines (dashed, dim) */}
      <g clipPath="url(#globe-clip)">
        {lonLines
          .filter((l) => l.behind)
          .map((l, i) => (
            <ellipse
              key={`lon-back-${i}`}
              cx={l.cx}
              cy={l.cy}
              rx={l.rx}
              ry={l.ry}
              fill="none"
              stroke="hsl(173 65% 42%)"
              strokeWidth="0.5"
              strokeOpacity="0.06"
              strokeDasharray="3 5"
            />
          ))}

        {/* Behind latitude lines */}
        {latLines.map((l, i) => (
          <ellipse
            key={`lat-${i}`}
            cx={l.cx}
            cy={l.cy}
            rx={l.rx}
            ry={l.ry}
            fill="none"
            stroke="hsl(173 65% 42%)"
            strokeWidth="0.6"
            strokeOpacity={l.lat === 0 ? 0.2 : 0.1}
          />
        ))}

        {/* Front longitude lines */}
        {lonLines
          .filter((l) => !l.behind)
          .map((l, i) => (
            <ellipse
              key={`lon-front-${i}`}
              cx={l.cx}
              cy={l.cy}
              rx={l.rx}
              ry={l.ry}
              fill="none"
              stroke="hsl(173 65% 42%)"
              strokeWidth="0.6"
              strokeOpacity="0.14"
            />
          ))}

        {/* Edge vignette */}
        <circle cx={cx} cy={cy} r={R} fill="url(#globe-edge)" />
      </g>

      {/* Globe outline */}
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="hsl(173 65% 42%)"
        strokeWidth="0.8"
        strokeOpacity="0.3"
      />

      {/* Germany pulse rings */}
      <circle
        cx={gx}
        cy={gy}
        r="14"
        fill="none"
        stroke="hsl(173 65% 42%)"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      >
        <animate attributeName="r" values="10;22" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.5;0" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle
        cx={gx}
        cy={gy}
        r="10"
        fill="none"
        stroke="hsl(173 65% 42%)"
        strokeWidth="0.8"
        strokeOpacity="0.3"
      >
        <animate attributeName="r" values="6;18" dur="2.2s" begin="0.7s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.4;0" dur="2.2s" begin="0.7s" repeatCount="indefinite" />
      </circle>

      {/* Germany dot */}
      <circle
        cx={gx}
        cy={gy}
        r="3.5"
        fill="hsl(173 65% 42%)"
        filter="url(#glow)"
      />
      <circle
        cx={gx}
        cy={gy}
        r="1.5"
        fill="white"
        fillOpacity="0.9"
      />

      {/* Label line + text */}
      <line
        x1={gx}
        y1={gy - 4}
        x2={gx + 18}
        y2={gy - 22}
        stroke="hsl(173 65% 42%)"
        strokeWidth="0.7"
        strokeOpacity="0.6"
      />
      <text
        x={gx + 20}
        y={gy - 24}
        fill="hsl(173 65% 42%)"
        fontSize="8"
        fontFamily="monospace"
        fillOpacity="0.8"
      >
        DE
      </text>
    </svg>
  );
}

export function LocationSection() {
  return (
    <section id="location" className="py-20 border-b border-border" data-testid="section-location">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            <div>
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1">
                Location
              </h2>
            </div>

            <div className="relative rounded-xl border border-border/40 overflow-hidden bg-card/20">
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(173 65% 42%) 1px, transparent 1px), linear-gradient(90deg, hsl(173 65% 42%) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative flex flex-col md:flex-row items-center gap-0">
                {/* Globe */}
                <div className="w-full md:w-64 flex items-center justify-center p-6 md:border-r border-border/40">
                  <GlobeWireframe />
                </div>

                {/* Info */}
                <div className="flex-1 p-6 md:p-8 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-mono text-primary uppercase tracking-widest">Based in</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">Erfurt, Germany</h3>
                    <p className="text-sm text-muted-foreground mt-1 font-mono">52.0279° N, 11.0360° E · CET (UTC+1)</p>
                  </div>

                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    Building software for modern products. Available for full-time roles across Germany and the EU: remote, hybrid, or on-site.
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">Status</p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <p className="text-xs text-primary font-medium">Open to offers</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">Eligibility</p>
                      <p className="text-xs text-foreground/80">EU work permit</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">Languages</p>
                      <p className="text-xs text-foreground/80">DE B1 · EN C1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
