import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Years Production\nExperience" },
  { value: "7", label: "Engineering\nTeams Served" },
  { value: "2018", label: "First Production\nShipment" },
  { value: "E2E", label: "Architecture to\nDeployment" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

export function About() {
  return (
    <section
      id="about"
      className="py-24 border-b border-border relative overflow-hidden"
      data-testid="section-about"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10"
        style={{
          top: "10%",
          right: "-8%",
          width: "45%",
          height: "60%",
          background: "radial-gradient(ellipse, hsl(173 65% 42% / 0.055) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section label + title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <p
            className="font-mono text-[11px] uppercase tracking-[0.15em] mb-3"
            style={{ color: "hsl(173 65% 42% / 0.7)" }}
            data-testid="heading-about"
          >
            About
          </p>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Why hire me
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, hsl(173 65% 42% / 0.3), transparent)" }}
            />
          </div>
        </motion.div>

        {/* Main card — theme-aware */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-[20px] border border-border bg-card"
          style={{ padding: "36px 40px" }}
        >
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">

            {/* Copy */}
            <div className="space-y-5 text-[15.5px] text-muted-foreground leading-[1.8]">
              <p data-testid="text-about-1">
                I build production grade frontend systems focused on scalability, maintainability, and long term usability.
                Over the last five years I have worked across Angular applications, enterprise UI platforms, backend integrations, and shared component systems used by multiple engineering teams.
              </p>
              <p data-testid="text-about-2">
                At EnBW I contributed to the shared frontend ecosystem by building reusable UI infrastructure adopted across teams, improving consistency, development speed, and maintainability.
                The component library I helped architect and maintain is now a foundational dependency across seven product teams inside one of Germany&apos;s largest energy companies.
              </p>
              <p data-testid="text-about-3">
                My work focuses on creating interfaces that are not only visually clean but also engineered for performance, accessibility, and real world operational reliability.
                I enjoy solving complex UI problems, improving developer workflows, and building systems that scale beyond a single product or team.
              </p>

              {/* Education block */}
              <div
                className="mt-2 pt-5"
                style={{ borderTop: "1px solid hsl(173 65% 42% / 0.1)" }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3"
                  style={{ color: "hsl(173 65% 42% / 0.55)" }}
                >
                  Education
                </p>
                <div className="space-y-1.5 text-[13.5px]">
                  <p className="text-foreground/80">M.Sc. Computer Science &nbsp;<span className="text-muted-foreground/60">— University of Paderborn</span></p>
                  <p className="text-foreground/80">B.Eng. Computer Science &nbsp;<span className="text-muted-foreground/60">— VVCE Mysuru</span></p>
                </div>
              </div>
            </div>

            {/* Stat cards — theme-aware */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:w-[148px] shrink-0">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={value}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ borderColor: "hsl(173 65% 42% / 0.4)", y: -2 }}
                  className="rounded-xl border border-border bg-muted/60"
                  style={{
                    padding: "14px 16px",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                >
                  <p
                    className="font-bold tracking-tight"
                    style={{ fontSize: 26, color: "hsl(173 65% 42%)", lineHeight: 1 }}
                  >
                    {value}
                  </p>
                  <p
                    className="font-mono mt-1.5 text-muted-foreground"
                    style={{
                      fontSize: 9.5,
                      lineHeight: 1.45,
                      whiteSpace: "pre-line",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
