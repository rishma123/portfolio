import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Angular Component Analyzer",
    description: "AI-powered tool that analyzes Angular component structure and behavior to improve code review quality. Detects missing patterns (EventEmitters, Signals, anti-patterns), generates MDX documentation from component source, and produces a component health score with confidence metrics. Lazy-loaded Next.js app deployed on Vercel.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Groq AI (LLaMA 3.3)", "Vercel"],
    demo: "https://angular-component-analyzer.vercel.app",
    deployment: "Vercel",
    accent: "173 65% 42%",
  },
  {
    title: "HeaderGen: Jupyter Notebook Plugin",
    description: "Jupyter Notebook plugin that automatically generates structured headers to improve readability and organisation of unstructured notebooks. Validated through a between-subjects user study (n=16) using t-tests and non-parametric statistical tests to measure impact on comprehension and efficiency. M.Sc. thesis project.",
    stack: ["Python", "Jupyter", "Statistical Analysis"],
    demo: null,
    deployment: "Thesis / Academic",
    accent: "210 70% 55%",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden border transition-all duration-300 bg-card"
      style={{
        borderColor: hovered ? `hsl(${project.accent} / 0.5)` : "hsl(var(--border))",
        boxShadow: hovered ? `0 8px 32px hsl(${project.accent} / 0.12)` : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid={`project-card-${index}`}
    >
      {/* Top shimmer on hover */}
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0, background: `linear-gradient(90deg, transparent 10%, hsl(${project.accent} / 0.55) 50%, transparent 90%)` }} />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-[15px] font-semibold transition-colors duration-200 text-foreground" style={{ color: hovered ? `hsl(${project.accent})` : undefined }} data-testid={`project-title-${index}`}>
            {project.title}
          </h3>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted-foreground/45 hover:text-primary transition-colors shrink-0 mt-0.5" aria-label="Live demo" data-testid={`project-link-demo-${index}`}>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <span className="inline-block text-xs font-mono mb-3" style={{ color: `hsl(${project.accent} / 0.7)` }} data-testid={`project-deployment-${index}`}>
          {project.deployment}
        </span>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4" data-testid={`project-desc-${index}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2" data-testid={`project-stack-${index}`}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs font-medium"
              style={{
                color: `hsl(${project.accent} / 0.85)`,
                background: `hsl(${project.accent} / 0.08)`,
                border: `1px solid hsl(${project.accent} / 0.25)`,
                borderRadius: 5,
                padding: "2px 8px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 border-b border-border" data-testid="section-projects">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.35 }}>
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest pt-1" style={{ color: "hsl(173 65% 45%)" }} data-testid="heading-projects">
                Projects
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((project, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.35, delay: index * 0.1 }}>
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
