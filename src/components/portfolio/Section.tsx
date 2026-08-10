import { ReactNode } from "react";
import { Reveal } from "./Reveal";

export const Section = ({
  id,
  eyebrow,
  title,
  children,
  variant = "default",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  variant?: "default" | "muted";
}) => (
  <section
    id={id}
    className={`py-14 md:py-20 ${
      variant === "muted" ? "bg-muted/40" : ""
    } hairline-t`}
  >
    <div className="container">
      <Reveal>
        <div className="grid md:grid-cols-12 gap-8 mb-8 md:mb-12">
          <div className="md:col-span-4 relative">
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute right-0 top-0 bottom-0 w-px bg-primary/15"></div>
            <div className="relative flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary">
              <span className="font-mono">{eyebrow}</span>
            </div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-[-0.02em] text-balance">
              {title}
            </h2>
          </div>
        </div>
      </Reveal>
      {children}
    </div>
  </section>
);
