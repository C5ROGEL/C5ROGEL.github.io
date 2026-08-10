import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "../../contexts/LanguageContext";

export const About = ({ variant }: { variant?: "default" | "muted" }) => {
  const { t } = useLanguage();

  const stats = [
    { value: "2+", label: t("about.stats.years") },
    { value: "7+", label: t("about.stats.systems") },
    { value: "Advanced", label: t("about.stats.english") },
  ];

  return (
    <Section id="about" eyebrow={t("about.eyebrow")} title={t("about.title")} variant={variant}>
      <div className="grid md:grid-cols-12 gap-8 relative">
        {/* Decorative Sidebar - Fills the empty space on the left */}
        <Reveal className="hidden md:block md:col-span-4 border-r border-hairline/60 pr-8">
          <div className="sticky top-32 space-y-12">
            {/* Live Status Indicator */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/60">{t("about.sidebar.statusLabel")}</span>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600/80 uppercase tracking-widest leading-none">
                  {t("about.sidebar.status")}
                </span>
              </div>
            </div>

            {/* Core Pillars Section */}
            <div className="relative space-y-6 ">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/60 relative z-10 ">{t("about.sidebar.pillarsLabel")}</span>
              
              {/* Large Decorative Watermark behind pillars */}
              <div className="absolute -top-16 -left-12 opacity-[0.03] select-none pointer-events-none z-0">
                <span className="font-display font-black text-[20rem] leading-none tracking-tighter text-primary rotate-90 ">
                  01
                </span>
              </div>

              <div className="relative z-10 space-y-6">
                {[
                  { 
                    title: t("about.sidebar.pillars.reliability.title"), 
                    desc: t("about.sidebar.pillars.reliability.desc") 
                  },
                  { 
                    title: t("about.sidebar.pillars.architecture.title"), 
                    desc: t("about.sidebar.pillars.architecture.desc") 
                  },
                  { 
                    title: t("about.sidebar.pillars.integrity.title"), 
                    desc: t("about.sidebar.pillars.integrity.desc") 
                  }
                ].map((pillar) => (
                  <div key={pillar.title} className="group cursor-default ">
                    <div className="flex items-center gap-2 mb-1.5">
                       <span className="h-px w-2 bg-primary group-hover:w-4 transition-all duration-300" />
                       <span className="text-xs md:text-[16px] font-display font-bold uppercase tracking-wider text-foreground/80 ">{pillar.title}</span>
                    </div>
                    <p className="text-[11px] md:text-xs leading-relaxed text-muted-foreground/70 pl-4 border-l border-hairline/60 ml-1 ">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Main Content Area */}
        <Reveal className="md:col-span-8 space-y-10">
          <div className="space-y-6 ">
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed ">
              {t("about.paragraph1")}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              {t("about.paragraph2")}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden shadow-sm">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-6 group hover:bg-muted/30 transition-colors duration-300">
                <div className="font-display font-extrabold text-3xl md:text-4xl text-primary tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                  {s.value}
                </div>
                <div className="mt-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
