import { useEffect, useRef } from "react";

export const Reveal = ({ children, delay = 0, as: As = "div", className = "" }: {
  children: React.ReactNode;
  delay?: number;
  as?: any;
  className?: string;
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <As ref={ref as any} className={`reveal ${className}`}>
      {children}
    </As>
  );
};
