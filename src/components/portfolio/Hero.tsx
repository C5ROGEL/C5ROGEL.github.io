import { useEffect, useState, useRef } from "react";
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

const useNameTypewriter = (fullName: string, delay: number = 0) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    const current = fullName;
    const speed = isDeleting ? 30 : 80;
    
    const t = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setIsDeleting(false);
          setText("");
        }
      }
    }, speed);
    
    return () => clearTimeout(t);
  }, [text, isDeleting, started, fullName]);

  return text;
};

const badges = ["C#", ".NET Core", "React", "SQL Server", "Alpine.js", "Tailwind CSS"];

const AnimatedName = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const typedLastName = useNameTypewriter("Rogel Pleites", 900);
  const rafRef = useRef<number | null>(null);
  const lastMoveRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    lastMoveRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const { x, y } = lastMoveRef.current;
      setTilt({ x: x * 8, y: -y * 8 });
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setTilt({ x: 0, y: 0 });
  };

  const firstName = "César Eduardo".split("");

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="transition-transform duration-200 ease-out"
    >
      <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.92] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-balance">
        {/* First Name - Letters float up with stagger */}
        <span className="inline-flex" style={{ transform: `translateZ(${20}px)` }}>
          {firstName.map((letter, i) => (
            <span
              key={i}
              className={`relative inline-block transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${150 + i * 50}ms`,
                animation: isVisible ? `letterFloat 3s ease-in-out ${150 + i * 50}ms infinite` : "none",
                transform: `translateZ(${i * 2}px)`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
        
        <br />
        
        {/* Last Name - Typewriter effect with gradient */}
        <span className="relative inline-flex" style={{ transform: `translateZ(${30}px)` }}>
          <span
            className="relative z-10 bg-gradient-to-r from-primary via-teal-500 via-70% to-primary bg-[length:300%_100%] bg-clip-text text-transparent animate-shimmer"
            style={{
              animation: isVisible ? `gradientShift 3s ease-in-out infinite` : "none",
            }}
          >
            {typedLastName}
            <span
              className="inline-block w-0.5 h-[0.85em] bg-primary ml-0.5 align-middle animate-pulse"
              style={{ 
                animation: typedLastName.length > 0 ? "blink 0.8s step-end infinite" : "none" 
              }}
            />
          </span>
          <span
            className="absolute inset-0 blur-lg bg-gradient-to-r from-primary/20 via-teal-500/20 to-primary/20"
            style={{
              animation: isVisible ? "textGlowPulse 2s ease-in-out infinite" : "none",
            }}
          />
        </span>

        {/* Animated underline with wave effect */}
        <span
          className="absolute -bottom-3 left-0 h-1.5 w-full"
          style={{
            animation: isVisible ? "underlineWave 2s ease-in-out 1s infinite" : "none",
            transform: `translateZ(${10}px)`,
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-gradient-x" />
          <span className="absolute inset-0 bg-primary blur-sm opacity-60" />
        </span>
      </h1>
    </div>
  );
};

const particlesData = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  x: Math.random() * 100,
  delay: Math.random() * 3,
  duration: Math.random() * 4 + 5,
  opacity: Math.random() * 0.4 + 0.2,
}));

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particlesData.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: "-20px",
            background: `linear-gradient(135deg, hsl(var(--primary) / ${p.opacity}), hsl(180 60% 50% / ${p.opacity}))`,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 2}px hsl(var(--primary) / ${p.opacity * 0.5})`,
          }}
        />
      ))}
    </div>
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
          <div className="md:col-span-9">
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
            href="/Cesar Rogel  CV.pdf"
            download="Cesar_Rogel_CV.pdf"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-hairline text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Download size={16} /> {t("hero.downloadCV")}
          </a>
          <a
            href="https://wa.me/50379323336"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-[#25D366]/30 text-foreground hover:border-[#25D366] hover:text-[#25D366] transition-colors"
          >
            <MessageCircle size={16} /> {t("hero.whatsapp")}
          </a>
          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-hairline text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Mail size={16} /> {t("hero.contactMe")}
          </button>
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
