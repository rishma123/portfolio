import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { GradientBackground } from "@/components/GradientBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30" data-testid="page-home">
      <GradientBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-xs font-mono text-muted-foreground/40" data-testid="footer-text">
            &copy; {new Date().getFullYear()} Rishma Merkaje Nanaiah
          </p>
        </div>
      </footer>
    </div>
  );
}
