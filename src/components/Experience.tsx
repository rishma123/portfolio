import { motion } from "framer-motion";

const experiences = [
  {
    company: "EnBW Energie Baden-Württemberg AG",
    role: "Frontend Developer (Working Student)",
    period: "Jan 2024 – Mar 2026",
    location: "Karlsruhe",
    context: "One of Germany's largest energy companies. Shared UI library used across 7 engineering teams.",
    stack: ["Angular", "TypeScript", "RxJS", "Signals", "SCSS", "Angular Material", "Jasmine", "Karma", "Playwright", "Storybook", "Azure DevOps"],
    achievements: [
      "Built 10+ reusable Angular components with accessibility, responsive layouts and shared design patterns deployed across multiple internal applications",
      "Managed reactive state flows with RxJS, Signals and NgRx across shared components and consuming applications",
      "Published a Storybook catalog with previews, usage notes and API documentation, cutting codebase archaeology time for consuming teams",
      "Added unit and E2E test coverage with Jasmine, Karma and Playwright to catch regressions before staged releases",
    ],
  },
  {
    company: "LIRA Service GmbH",
    role: "Fullstack Developer (Working Student)",
    period: "Nov 2022 – Mar 2023",
    location: "Paderborn",
    context: "Mid-sized B2B logistics management software company.",
    stack: ["Angular", "TypeScript", "RxJS", "SCSS", "Java", "Spring Boot", "REST APIs", "Oracle DB"],
    achievements: [
      "Delivered production features across Angular frontend and Spring Boot backend in a small engineering team",
      "Built REST APIs with Spring Boot and Oracle DB integrated into Angular-based workflow modules",
      "Diagnosed and resolved production issues spanning frontend rendering, API responses and UI state inconsistencies",
      "Owned deployments and production debugging independently in a team without dedicated DevOps support",
    ],
  },
  {
    company: "Bosch Global Software Technologies Pvt Ltd",
    role: "Fullstack Developer",
    period: "Feb 2021 – Nov 2021",
    location: "Bengaluru",
    stack: ["Angular", "TypeScript", "RxJS", "Java", "Spring Boot", "MySQL", "REST APIs"],
    achievements: [
      "Replaced spreadsheet-driven engineering tracking with Angular-based internal tools used daily across teams",
      "Reduced redundant API calls and improved RxJS data fetching performance on high-frequency internal dashboards",
      "Resolved UI rendering and backend integration issues affecting production engineering workflows",
      "Coordinated with backend developers and stakeholders to deliver Angular tooling on schedule",
    ],
  },
  {
    company: "Infopine Pvt Ltd",
    role: "Fullstack Developer",
    period: "Nov 2018 – Aug 2020",
    location: "Mysuru",
    stack: ["JSP", "HTML", "CSS", "JavaScript", "Java", "Spring Boot", "SQL", "Git"],
    achievements: [
      "Delivered production web application features across JSP frontend, Spring Boot services and SQL database layers",
      "Optimised slow SQL queries to reduce response times on frequently used application pages",
      "Resolved frontend and backend production issues across multiple active client projects",
      "Maintained and stabilised legacy JSP and Java applications with recurring performance issues",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 border-b border-border" data-testid="section-experience">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.35 }}>
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest pt-1" style={{ color: "hsl(173 65% 45%)" }} data-testid="heading-experience">
                Experience
              </h2>
            </div>
            <div className="space-y-0">
              {experiences.map((exp, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.3, delay: index * 0.06 }} className="group relative pl-4 pr-4 py-8 -mx-4 rounded-md border border-transparent hover:border-border/60 hover:bg-card/50 transition-all duration-200" data-testid={`experience-card-${index}`}>
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <h3 className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors duration-150" data-testid={`exp-company-${index}`}>{exp.company}</h3>
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap" data-testid={`exp-period-${index}`}>{exp.period}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                    <span className="text-sm text-muted-foreground" data-testid={`exp-role-${index}`}>{exp.role}</span>
                    <span className="text-xs text-muted-foreground/50">{exp.location}</span>
                  </div>
                  {exp.context && <p className="text-xs text-muted-foreground/60 mb-3 italic">{exp.context}</p>}
                  <ul className="space-y-1.5 mb-4">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2.5">
                        <span className="text-primary/50 mt-[5px] shrink-0">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Highlighted tech stack tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs font-medium"
                        style={{
                          color: "hsl(173 65% 45%)",
                          background: "hsl(173 65% 42% / 0.08)",
                          border: "1px solid hsl(173 65% 42% / 0.25)",
                          borderRadius: 5,
                          padding: "2px 8px",
                        }}
                      >
                        {tech}
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
