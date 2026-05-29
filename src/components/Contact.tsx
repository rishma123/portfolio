import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20" data-testid="section-contact">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid md:grid-cols-[200px_1fr] gap-12">
            <div>
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest pt-1" data-testid="heading-contact">
                Contact
              </h2>
            </div>

            <div>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-xl" data-testid="text-contact-desc">
                Available for full-time software engineering positions and technical discussions.
              </p>

              <div className="space-y-3" data-testid="contact-links">
                <a
                  href="mailto:merkajenanaiah@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group w-fit"
                  data-testid="button-email"
                >
                  <Mail className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  merkajenanaiah@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/rishma97/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group w-fit"
                  data-testid="button-linkedin"
                >
                  <Linkedin className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  linkedin.com/in/rishma97
                </a>
                <a
                  href="https://github.com/rishma123"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group w-fit"
                  data-testid="button-github"
                >
                  <Github className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  github.com/rishma123
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-border/40">
                <p className="text-sm font-mono text-muted-foreground" data-testid="text-phone">
                  +49 176 25649321
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
