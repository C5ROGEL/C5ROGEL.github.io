import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "../../contexts/LanguageContext";

const backend = [
  "C#", ".NET Core", "MVC", "Web API",
  "MS SQL Server", "T-SQL", "Stored Procedures", "Query Optimization",
  "Entity Framework", "Docker", "Docker Compose", "iTextSharp (PDF)", "Crystal Reports",
];

const frontend = [
  "JavaScript (ES6+)", "React.js", "Hooks", "Context API", "React Router",
  "Alpine.js", "jQuery", "HTML5", "Tailwind CSS",
  "Git", "GitHub", "TortoiseSVN", "Visual Studio 2022", "IIS Deployment",
  "jsPDF", "Tom Select",
];

const Pill = ({ label }: { label: string }) => (
  <li className="font-mono text-xs px-3 py-1.5 rounded-full border border-hairline text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors">
    {label}
  </li>
);

const Column = ({ title, items, num }: { title: string; items: string[]; num: string }) => (
  <Reveal className="border border-hairline rounded-lg p-6 md:p-8 bg-surface/30">
    <div className="flex items-baseline justify-between mb-6">
      <h3 className="font-display font-bold text-xl">{title}</h3>
      <span className="font-mono text-xs text-muted-foreground">{num}</span>
    </div>
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => <Pill key={s} label={s} />)}
    </ul>
  </Reveal>
);

export const Skills = ({ variant }: { variant?: "default" | "muted" }) => {
  const { t } = useLanguage();

  return (
    <Section id="skills" eyebrow={t("skills.eyebrow")} title={t("skills.title")} variant={variant}>
      <div className="grid md:grid-cols-2 gap-6">
        <Column title={t("skills.backend")} items={backend} num="/01" />
        <Column title={t("skills.frontend")} items={frontend} num="/02" />
      </div>
    </Section>
  );
};
