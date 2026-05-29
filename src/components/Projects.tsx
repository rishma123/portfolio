import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Angular Component Analyzer",
    description:
      "AI-powered tool that analyzes Angular component structure and behavior to improve code review quality. Detects missing patterns (EventEmitters, Signals, anti-patterns), generates MDX documentation from component source, and produces a component health score with confidence metrics. Lazy-loaded Next.js app deployed on Vercel.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Groq AI (LLaMA 3.3)", "Vercel"],
    demo: "https://angular-component-analyzer.vercel.app",
    deployment: "Vercel",
    accent: "173 65% 42%",
  },
  {
    title: "HeaderGen: Jupyter Notebook Plugin",
    description:
      "Jupyter Notebook plugin that automatically generates structured headers to improve readability and organisation of unstructured notebooks. Validated through a between-subjects user study (n=16) using t-tests and non-parametric statistical tests to measure impact on comprehension and efficiency. M.Sc. thesis project.",
    stack: ["Python", "Jupyter", "Statistical Analysis"],
    demo: null,
    deployment: "Thesis / Academic",
    accent: "210 70% 55%",
  },
];

function GlassCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    /* Animated gradient border wrapper */
    <div
      className="relative rounded-xl p-[1px] overflow-hidden transition-all duration-300"
      style={{
        background: hovered
          ? `conic-gradient(from var(--border-angle, 0deg), hsl(${project.accent} / 0.65), hsl(220 14% 18% / 0.35), hsl(${project.accent} / 0.25), hsl(220 14% 18% / 0.35), hsl(${project.accent} / 0.65))`
          : "hsl(220 14% 13% / 0.5)",
        animation: hovered ? "border-spin 3.5s linear infinite" : "none",
        boxShadow: hovered ? `0 20px 48px hsl(${project.accent} / 0.1)` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`project-card-${index}`}
    >
      {/* Glass inner card */}
      <div
        className="relative rounded-[11px] overflow-hidden"
        style={{
          background: "hsl(220 16% 8% / 0.88)",
          backdropFilter: "blur(14px)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.25s ease-out",
        }}
      >
        {/* Top shimmer line on hover */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0,
            background: `linear-gradient(90deg, transparent 10%, hsl(${project.accent} / 0.55) 50%, transparent 90%)`,
            transition: "opacity 0.25s",
          }}
        />

        {/* Ambient corner glow — static, no cursor tracking */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: "120px",
            height: "120px",
            background: `radial-gradient(circle at top right, hsl(${project.accent} / ${hovered ? "0.1" : "0.04"}), transparent 65%)`,
            transition: "background 0.3s",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3
              className="text-[15px] font-semibold transition-colors duration-200"
              style={{ color: hovered ? `hsl(${project.accent})` : "hsl(var(--foreground))" }}
              data-testid={`project-title-${index}`}
            >
              {project.title}
            </h3>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground/45 hover:text-primary transition-colors shrink-0 mt-0.5"
                aria-label="Live demo"
                data-testid={`project-link-demo-${index}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <span
            className="inline-block text-xs font-mono mb-3"
            style={{ color: `hsl(${project.accent} / 0.6)` }}
            data-testid={`project-deployment-${index}`}
          >
            {project.deployment}
          </span>

          <p
            className="text-sm text-muted-foreground leading-relaxed mb-4"
            data-testid={`project-desc-${index}`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5" data-testid={`project-stack-${index}`}>
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="font-mono text-xs px-2 py-0.5 text-muted-foreground/70 bg-muted/30 border border-border/30"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 border-b border-border" data-testid="section-projects">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            <div>
              <h2
                className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1"
                data-testid="heading-projects"
              >
                Projects
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: index * 0.1 }}
                >
                  <GlassCard project={project} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes border-spin {
          to { --border-angle: 360deg; }
        }
      `}</style>
    </section>
  );
}
