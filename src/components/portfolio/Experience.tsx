import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "../../contexts/LanguageContext";

interface Job {
  company: string;
  role: string;
  period: string;
  desc: string;
}

export const Experience = ({ variant }: { variant?: "default" | "muted" }) => {
  const { t } = useLanguage();
  const jobs = t<Job[]>("experience.jobs");

  return (
    <Section id="experience" eyebrow={t("experience.eyebrow")} title={t("experience.title")} variant={variant}>
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-10 md:col-start-2">
          <ol className="relative border-l border-hairline pl-6 md:pl-10 space-y-10">
            {Array.isArray(jobs) && jobs.map((j, idx) => (
              <Reveal as="li" key={j.company + idx} delay={idx * 60} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] md:-left-[47px] top-2 h-3 w-3 rounded-full bg-background border-2 border-primary"
                />
                <div className="font-mono text-xs text-primary uppercase tracking-widest">{j.period}</div>
                <h3 className="mt-1 font-display font-bold text-xl md:text-2xl">{j.role}</h3>
                <div className="text-muted-foreground text-sm">{j.company}</div>
                <p className="mt-3 text-muted-foreground text-pretty leading-relaxed max-w-2xl">{j.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-24" id="education">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-8 items-baseline">
            <div className="md:col-span-4">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{t("experience.education")}</div>
            </div>
            <div className="md:col-span-8">
              <h3 className="font-display font-bold text-2xl md:text-3xl">
                {t("experience.educationTitle")}
              </h3>
              <div className="mt-2 text-muted-foreground">
                {t("experience.educationSubtitle")}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
