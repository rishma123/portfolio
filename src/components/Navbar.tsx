import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-5xl">
        <a
          href="#"
          className="text-sm font-semibold text-foreground tracking-tight hover:text-primary transition-colors"
          data-testid="link-home"
        >
          Rishma Merkaje Nanaiah
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="button-theme-toggle"
          >
            <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="button-theme-toggle-mobile"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 py-5 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
              data-testid={`link-mobile-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
