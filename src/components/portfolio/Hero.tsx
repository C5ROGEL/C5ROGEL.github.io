import { useEffect, useState } from "react";
import { ArrowDown, Mail, Download, MessageCircle } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const phrasesEn = [
  "Full-Stack .NET + React Developer",
  "Building institutional-grade web systems",
  "Open to remote opportunities",
];

const phrasesEs = [
  "Desarrollador Full-Stack .NET + React",
  "Construyendo sistemas web de nivel institucional",
  "Abierto a oportunidades remotas",
];

const useTypewriter = (phrases: string[]) => {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[i % phrases.length];
    const speed = deleting ? 35 : 65;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setI((x) => x + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases]);

  return text;
};

const badges = ["C#", ".NET Core", "React", "SQL Server", "Alpine.js", "Tailwind CSS"];

const AnimatedName = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.92] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-balance">
      <span
        className={`inline-block transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        César Eduardo
      </span>

      <br />

      <span
        className={`relative inline-block bg-gradient-to-r from-primary via-teal-500 to-primary bg-clip-text text-transparent transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "150ms" }}
      >
        Rogel Pleites
      </span>

      <span className="absolute -bottom-3 left-0 h-1.5 w-28 bg-gradient-to-r from-primary to-transparent" />
    </h1>
  );
};

export const Hero = () => {
  const { language, t } = useLanguage();
  const phrases = language === "es" ? phrasesEs : phrasesEn;
  const typed = useTypewriter(phrases);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" aria-hidden="true" />
      <div className="container relative">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-9 relative">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-6 animate-fade-in">
              <span className="inline-block h-px w-8 bg-primary" />
              <span>{t("hero.location")}</span>
            </div>

            <AnimatedName />

            <p className="mt-8 text-lg md:text-xl font-mono text-muted-foreground min-h-[3.5rem] md:min-h-[2.25rem]">
              <span className="text-primary">{">"}</span>{" "}
              <span className="caret text-foreground">{typed}</span>
            </p>
          </div>

          <div className="md:col-span-3 md:text-right text-sm text-muted-foreground space-y-1">
            <div className="hairline-t pt-4 md:border-t-0 md:pt-0">
              <div className="text-foreground font-medium">{t("hero.currently")}</div>
              <div>{t("hero.role")}</div>
              <div>{t("hero.company")}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <button
            onClick={() => scrollTo("#projects")}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            {t("hero.viewWork")} <ArrowDown size={16} />
          </button>
          <a
            href="/Cesar Rogel CV.pdf"
            download="Cesar_Rogel_CV.pdf"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download size={15} /> {t("hero.downloadCV")}
          </a>
          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={15} /> {t("hero.contactMe")}
          </button>
          <a
            href="https://wa.me/50379323336"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("hero.whatsapp")}
            title={t("hero.whatsapp")}
            className="inline-flex items-center justify-center h-11 w-11 rounded-md border border-[#25D366]/30 text-muted-foreground hover:border-[#25D366] hover:text-[#25D366] transition-colors"
          >
            <MessageCircle size={16} />
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {badges.map((b) => (
            <li
              key={b}
              className="font-mono text-xs px-2.5 py-1 rounded border border-hairline text-muted-foreground bg-surface/40"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
