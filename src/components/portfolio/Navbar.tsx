import { useEffect, useState, useMemo } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "../../contexts/LanguageContext";

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = useMemo(() => [
    { href: "#about", label: t("navbar.about") },
    { href: "#skills", label: t("navbar.skills") },
    { href: "#projects", label: t("navbar.projects") },
    { href: "#experience", label: t("navbar.experience") },
    { href: "#contact", label: t("navbar.contact") },
  ], [t]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/75 hairline-b"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Main">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
          aria-label="César Rogel — Home"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="none" stroke="hsl(var(--hairline))" />
            <text
              x="16"
              y="21"
              textAnchor="middle"
              fontFamily="Cabinet Grotesk, sans-serif"
              fontWeight="800"
              fontSize="13"
              fill="hsl(var(--primary))"
              letterSpacing="-0.5"
            >
              CR
            </text>
          </svg>
          <span className="sr-only">César Rogel</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(l.href);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-hairline text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            title={language === "en" ? "ES" : "EN"}
          >
            <span className="font-mono text-xs font-bold">{language === "en" ? "ES" : "EN"}</span>
          </button>
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-hairline text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md border border-hairline"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-background transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="container flex flex-col gap-2 pt-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(l.href);
                }}
                className="block py-4 text-2xl font-display font-semibold hairline-b"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
