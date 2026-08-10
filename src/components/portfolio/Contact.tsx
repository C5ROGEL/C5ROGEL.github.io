import { Mail, Github, Linkedin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = ({ variant }: { variant?: "default" | "muted" }) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Using Web3Forms - Simple, modern, and no backend needed.
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "ccb69d0d-f7fa-4499-804b-505e342d91b3", // User provided key
          ...data,
          from_name: data.name,
          subject: `Portfolio Contact: ${data.subject}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        toast.success(t("contact.success"));
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { label: "Email", value: "cesaredu1927@gmail.com", href: "mailto:cesaredu1927@gmail.com", Icon: Mail },
    { label: "GitHub", value: "C5ROGEL", href: "https://github.com/C5ROGEL", Icon: Github },
    { label: "LinkedIn", value: "César Rogel", href: "https://www.linkedin.com/in/césar-rogel-0aa644142/", Icon: Linkedin },
  ];

  return (
    <section id="contact" className={`py-16 md:py-20 hairline-t ${variant === "muted" ? "bg-muted/40" : ""}`}>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Side: Info */}
          <div className="lg:col-span-5 space-y-10">
            <Reveal>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
                {t("contact.eyebrow")}
              </div>
              <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-[-0.02em] text-balance leading-[0.9]">
                {t("contact.title")}
              </h2>
              <p className="mt-8 text-lg text-muted-foreground text-pretty leading-relaxed">
                {t("contact.description")}
              </p>
            </Reveal>

            <div className="space-y-6 pt-6">
              {socialLinks.map((link, i) => (
                <Reveal key={link.label} delay={i * 100}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-lg border border-hairline bg-surface/30 hover:bg-surface/60 transition-all duration-300"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <link.Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">
                        {link.label}
                      </div>
                      <div className="text-sm font-display font-bold group-hover:text-primary transition-colors">
                        {link.value}
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <div className="relative p-6 md:p-10 rounded-2xl border border-hairline bg-surface/20 backdrop-blur-sm overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
                  <Mail size={120} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                        {t("contact.nameLabel")}
                      </label>
                      <input
                        {...register("name")}
                        id="name"
                        className={`w-full px-4 py-3 rounded-md bg-muted/30 border ${
                          errors.name ? "border-red-500/50" : "border-hairline"
                        } focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all text-sm`}
                      />
                      {errors.name && <p className="text-[10px] text-red-500/80 ml-1 font-mono">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                        {t("contact.emailLabel")}
                      </label>
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        className={`w-full px-4 py-3 rounded-md bg-muted/30 border ${
                          errors.email ? "border-red-500/50" : "border-hairline"
                        } focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all text-sm`}
                      />
                      {errors.email && <p className="text-[10px] text-red-500/80 ml-1 font-mono">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                      {t("contact.subjectLabel")}
                    </label>
                    <input
                      {...register("subject")}
                      id="subject"
                      className={`w-full px-4 py-3 rounded-md bg-muted/30 border ${
                        errors.subject ? "border-red-500/50" : "border-hairline"
                      } focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all text-sm`}
                    />
                    {errors.subject && <p className="text-[10px] text-red-500/80 ml-1 font-mono">{errors.subject.message}</p>}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                      {t("contact.messageLabel")}
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-3 rounded-md bg-muted/30 border ${
                        errors.message ? "border-red-500/50" : "border-hairline"
                      } focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all text-sm resize-none`}
                    />
                    {errors.message && <p className="text-[10px] text-red-500/80 ml-1 font-mono">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="group relative w-full flex items-center justify-center gap-2 py-4 px-8 rounded-md bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-xs overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        {t("contact.sending")}
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 size={16} />
                        {t("contact.success")}
                      </>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        {t("contact.sendButton")}
                      </>
                    )}
                  </button>

                  {/* Transmission Log - Signature Element */}
                  <div className="mt-4 flex items-center gap-3 py-3 px-4 rounded-md bg-black/5 dark:bg-white/5 border border-hairline/30 overflow-hidden whitespace-nowrap">
                    <div className="flex gap-1">
                       <div className={`h-1 w-1 rounded-full ${isSubmitting ? 'bg-amber-500 animate-pulse' : isSuccess ? 'bg-emerald-500' : 'bg-primary/40'}`} />
                       <div className={`h-1 w-1 rounded-full ${isSubmitting ? 'bg-amber-500 animate-pulse delay-75' : isSuccess ? 'bg-emerald-500' : 'bg-primary/40'}`} />
                       <div className={`h-1 w-1 rounded-full ${isSubmitting ? 'bg-amber-500 animate-pulse delay-150' : isSuccess ? 'bg-emerald-500' : 'bg-primary/40'}`} />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.2em]">
                       {isSubmitting ? "Uplink active — Transmitting data" : isSuccess ? "Transmission confirmed — 200 OK" : "Ready for transmission — Link standby"}
                    </span>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
