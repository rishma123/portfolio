import { motion } from "framer-motion";

const skillGroups = [
  { category: "Frontend", skills: ["Angular (Signals)", "TypeScript", "RxJS", "NgRx", "HTML5", "CSS3", "SCSS", "Angular Material", "Next.js", "Tailwind CSS"] },
  { category: "Backend", skills: ["Java", "Spring Boot", "REST APIs", "Node.js"] },
  { category: "Databases", skills: ["Oracle DB", "MySQL", "SQL"] },
  { category: "DevOps / Tools", skills: ["Git", "GitHub", "Azure DevOps", "AWS", "Docker", "Storybook", "Figma", "VS Code"] },
  { category: "Testing", skills: ["Playwright (E2E)", "Jasmine", "Karma", "JUnit 5"] },
  { category: "AI Integration", skills: ["Groq AI (LLaMA 3.3)", "OpenAI GPT-3.5"] },
  { category: "Methodology", skills: ["Agile", "Scrum", "SAFe", "Code Reviews"] },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 border-b border-border" data-testid="section-skills">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.35 }}>
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest pt-1 font-bold" style={{ color: "hsl(173 65% 45%)" }} data-testid="heading-skills">
                Skills
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {skillGroups.map((group, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.3, delay: index * 0.05 }} data-testid={`skill-group-${index}`}>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(173 65% 45%)" }}>
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm font-medium cursor-default transition-all"
                        style={{
                          color: "hsl(var(--foreground))",
                          background: "hsl(173 65% 42% / 0.08)",
                          border: "1px solid hsl(173 65% 42% / 0.25)",
                          borderRadius: 6,
                          padding: "3px 10px",
                        }}
                        onMouseEnter={e => {
                          (e.target as HTMLElement).style.background = "hsl(173 65% 42% / 0.18)";
                          (e.target as HTMLElement).style.borderColor = "hsl(173 65% 42% / 0.6)";
                          (e.target as HTMLElement).style.color = "hsl(173 65% 50%)";
                        }}
                        onMouseLeave={e => {
                          (e.target as HTMLElement).style.background = "hsl(173 65% 42% / 0.08)";
                          (e.target as HTMLElement).style.borderColor = "hsl(173 65% 42% / 0.25)";
                          (e.target as HTMLElement).style.color = "hsl(var(--foreground))";
                        }}
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
