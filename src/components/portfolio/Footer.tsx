import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-elevated/40 hairline-t py-10">
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="text-sm text-muted-foreground">
          © 2025 César Rogel · <span className="font-mono">Built with React · Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/C5ROGEL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-hairline text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/césar-rogel-0aa644142/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-hairline text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};
