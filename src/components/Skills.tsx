import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend",
    skills: ["Angular (Signals)", "TypeScript", "RxJS", "NgRx", "HTML5", "CSS3", "SCSS", "Angular Material", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Java", "Spring Boot", "REST APIs", "Node.js"],
  },
  {
    category: "Databases",
    skills: ["Oracle DB", "MySQL", "SQL"],
  },
  {
    category: "DevOps / Tools",
    skills: ["Git", "GitHub", "Azure DevOps", "AWS", "Docker", "Storybook", "Figma", "VS Code"],
  },
  {
    category: "Testing",
    skills: ["Playwright (E2E)", "Jasmine", "Karma", "JUnit 5"],
  },
  {
    category: "AI Integration",
    skills: ["Groq AI (LLaMA 3.3)", "OpenAI GPT-3.5"],
  },
  {
    category: "Methodology",
    skills: ["Agile", "Scrum", "Code Reviews"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 border-b border-border" data-testid="section-skills">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            <div>
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1" data-testid="heading-skills">
                Skills
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {skillGroups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  data-testid={`skill-group-${index}`}
                >
                  <h3 className="text-xs font-mono text-primary/70 uppercase tracking-widest mb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-default border border-border/60 rounded px-2 py-0.5 bg-muted/40 hover:bg-muted/80"
                        data-testid={`skill-badge-${skill.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
