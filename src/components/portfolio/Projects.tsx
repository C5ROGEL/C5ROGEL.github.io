import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

type Project = {
  name: string;
  role: string;
  stack: string[];
  bullets: string[];
  num: string;
  url: string;
  gallery?: string[];
};



const electronicInvoicingImages = [
  "/src/img/Electronic Invoicing System/casos de uso -en.png",
  "/src/img/Electronic Invoicing System/casos de uso- es.png",
  "/src/img/Electronic Invoicing System/Creacion de doc, nota debito.png",
  "/src/img/Electronic Invoicing System/Dashboard de Facturas realizadas por emisor.png",
  "/src/img/Electronic Invoicing System/diagrama de proceso -en.png",
  "/src/img/Electronic Invoicing System/Diagrama de proceso -es.png",
  "/src/img/Electronic Invoicing System/documento a crear por emitir.png",
  "/src/img/Electronic Invoicing System/Documento Tributario Final (PDF).png",
  "/src/img/Electronic Invoicing System/Seleccion de emisor.png",
  "/src/img/Electronic Invoicing System/Seleccionador de tipo de receptor.png",
  "/src/img/Electronic Invoicing System/Visor de Documentos tributarios electronicos.png",
];

const clinicImages = [
  "/src/img/Clinic Management System/Inicio.png",
  "/src/img/Clinic Management System/Dashboard.png",
  "/src/img/Clinic Management System/Agregar medicamento a la lista de compras.png",
  "/src/img/Clinic Management System/Consulta de empleados.png",
  "/src/img/Clinic Management System/Creacion de nueva receta.png",
  "/src/img/Clinic Management System/Crear nuevo lote.png",
  "/src/img/Clinic Management System/Gestion de lista de compras.png",
  "/src/img/Clinic Management System/Gestion de lotes.png",
  "/src/img/Clinic Management System/Gestion de recetas.png",
  "/src/img/Clinic Management System/Inventario Medicamento.png",
  "/src/img/Clinic Management System/Modal crear medicamento + Lote.png",
];

const cinemaImages = [
  "/src/img/Cinema Management Platform/cine-.jpeg",
  "/src/img/Cinema Management Platform/Movie Interfaces.mp4",
  "/src/img/Cinema Management Platform/pelicula compartida por link directo.png",
  "/src/img/Cinema Management Platform/seleccioanr pelicula.png",
  "/src/img/Cinema Management Platform/trailer de pelicula.png",
];

const publicGatewayImages = [
  "/src/img/Maestra Publica/login.png",
  "/src/img/Maestra Publica/dashboard como usuario admin.png",
  "/src/img/Maestra Publica/datos para agregar nueva pelicula.png",
  "/src/img/Maestra Publica/gestion de banner de la web del cine.png",
  "/src/img/Maestra Publica/gestion de menus.png",
  "/src/img/Maestra Publica/gestion de peliculas.png",
  "/src/img/Maestra Publica/gestion de usuarios y perfiles ademas de permisos.png",
  "/src/img/Maestra Publica/menu lateral.png",
  "/src/img/Maestra Publica/permisos de menus por tipo de perfil usuario.png",
];

const multiTenantAuthImages = [
  "/src/img/Multi-Tenant Auth & Authorization System/clinic-api-token auth.png",
  "/src/img/Multi-Tenant Auth & Authorization System/clinic-endpoints.png",
  "/src/img/Multi-Tenant Auth & Authorization System/endpoints expanded.png",
  "/src/img/Multi-Tenant Auth & Authorization System/get categorias con bearer token.png",
  "/src/img/Multi-Tenant Auth & Authorization System/get-active-movies.png",
  "/src/img/Multi-Tenant Auth & Authorization System/swagger-version.png",
];

const pingMonitorImages = [
  "/src/img/PingMonitor/Dahsboard Principal.png",
  "/src/img/PingMonitor/agregar nueva ip.png",
  "/src/img/PingMonitor/gestion de marcadores (ips).png",
  "/src/img/PingMonitor/ip seleccionada con marca de 1H.png",
  "/src/img/PingMonitor/Latencia en tiempo real.png",
  "/src/img/PingMonitor/Linea temporal completa 1H seleccionada.png",
  "/src/img/PingMonitor/Notificaciones de alertas por correo.png",
];

const utilitiesApiImages = [
  "/src/img/Utilities API/Principal Dashboard.jpeg",
  "/src/img/Utilities API/Email Send History .png",
  "/src/img/Utilities API/emails send successfully.png",
  "/src/img/Utilities API/api correos pt1.jpeg",
  "/src/img/Utilities API/apicorreos pt2.jpeg",
  "/src/img/Utilities API/docker running.png",
  "/src/img/Utilities API/endpoint en postman.png",
];

const projectNames = {
  "01": { en: "Electronic Invoicing System", es: "Sistema de Facturación Electrónica" },
  "02": { en: "Clinic Management System", es: "Sistema de Gestión de Clínica" },
  "03": { en: "Outdoor Movie Theater Management Platform", es: "Plataforma de Gestión de Cine al Aire Libre" },
  "04": { en: "Multi-Tenant Auth & Authorization System", es: "Sistema de Autenticación y Autorización Multi-Tenant" },
  "05": { en: "Unified Public Services Gateway", es: "Portal Unificado de Servicios Públicos" },
  "06": { en: "Network Monitoring System", es: "Sistema de Monitoreo de Red" },
  "07": { en: "Dockerized Institutional Utilities API", es: "API de Utilidades Institucionales Contenerizada" },
};

const projectStacks: Record<string, string[]> = {
  "01": ["C#", "ASP.NET WebForms", "MS SQL Server", "Crystal Reports", "WCF Services", "Syncfusion EJ", "jQuery"],
  "02": ["C#", ".NET MVC", "MS SQL Server", "Alpine.js", "JWT", "Tailwind CSS"],
  "03": ["C#", ".NET Core", "REST API", "MS SQL Server", "React.js", "Tailwind CSS"],
  "04": ["C#", ".NET Core", "JWT", "MS SQL Server"],
  "05": ["C#", ".NET Core", "JWT", "MS SQL Server", "React.js", "Tailwind CSS"],
  "06": ["C#", ".NET 10", "EF Core", "MS SQL Server", "Alpine.js", "Chart.js", "MailKit"],
  "07": ["C#", ".NET Core", "Docker", "Docker Compose", "REST API", "SMTP"],
};

const buildProjects = (t: <T = string>(key: string) => T, language: "en" | "es"): Project[] => [
  {
    num: "01",
    name: projectNames["01"][language],
    role: t("projects.items.p01.role"),
    url: "factura.mopt.gob.sv/dte/ccf",
    stack: projectStacks["01"],
    bullets: [
      t("projects.items.p01.bullets.0"),
      t("projects.items.p01.bullets.1"),
      t("projects.items.p01.bullets.2"),
    ],
    gallery: electronicInvoicingImages,
  },
  {
    num: "02",
    name: projectNames["02"][language],
    role: t("projects.items.p02.role"),
    url: "clinica-mopt.gob.sv/farmacia/inventario",
    stack: projectStacks["02"],
    bullets: [
      t("projects.items.p02.bullets.0"),
      t("projects.items.p02.bullets.1"),
      t("projects.items.p02.bullets.2"),
      t("projects.items.p02.bullets.3"),
    ],
    gallery: clinicImages,
  },
  {
    num: "03",
    name: projectNames["03"][language],
    role: t("projects.items.p03.role"),
    url: "cinepass.app/sala-3/funcion",
    stack: projectStacks["03"],
    bullets: [
      t("projects.items.p03.bullets.0"),
      t("projects.items.p03.bullets.1"),
      t("projects.items.p03.bullets.2"),
      t("projects.items.p03.bullets.3"),
    ],
    gallery: cinemaImages,
  },
  {
    num: "04",
    name: projectNames["04"][language],
    role: t("projects.items.p04.role"),
    url: "auth.platform.io/admin/roles",
    stack: projectStacks["04"],
    bullets: [
      t("projects.items.p04.bullets.0"),
      t("projects.items.p04.bullets.1"),
      t("projects.items.p04.bullets.2"),
    ],
    gallery: multiTenantAuthImages,
  },
  {
    num: "05",
    name: projectNames["05"][language],
    role: t("projects.items.p05.role"),
    url: "public.mopt.gob.sv/portal",
    stack: projectStacks["05"],
    bullets: [
      t("projects.items.p05.bullets.0"),
      t("projects.items.p05.bullets.1"),
      t("projects.items.p05.bullets.2"),
      t("projects.items.p05.bullets.3"),
    ],
    gallery: publicGatewayImages,
  },
  {
    num: "06",
    name: projectNames["06"][language],
    role: t("projects.items.p06.role"),
    url: "monitor.mopt.gob.sv/dashboard",
    stack: projectStacks["06"],
    bullets: [
      t("projects.items.p06.bullets.0"),
      t("projects.items.p06.bullets.1"),
      t("projects.items.p06.bullets.2"),
      t("projects.items.p06.bullets.3"),
    ],
    gallery: pingMonitorImages,
  },
  {
    num: "07",
    name: projectNames["07"][language],
    role: t("projects.items.p07.role"),
    url: "api.mopt.gob.sv/utilidades",
    stack: projectStacks["07"],
    bullets: [
      t("projects.items.p07.bullets.0"),
      t("projects.items.p07.bullets.1"),
      t("projects.items.p07.bullets.2"),
    ],
    gallery: utilitiesApiImages,
  },
];

const getCaption = (url: string, t: <T = string>(key: string) => T) => {
  const filename = url.split('/').pop()?.replace(/\.(png|jpeg|jpg|mp4|webm|mov|avi)$/, '') || "";
  return t(`projects.gallery.captions.${filename}`) || filename;
};

const getTitle = (url: string, t: <T = string>(key: string) => T) => {
  const filename = url.split('/').pop()?.replace(/\.(png|jpeg|jpg|mp4|webm|mov|avi)$/, '') || "";
  return t(`projects.gallery.titles.${filename}`) || filename;
};

const isVideo = (url: string): boolean => {
  const ext = url.split('.').pop()?.toLowerCase() || "";
  return ["mp4", "webm", "mov", "avi"].includes(ext);
};

const ProjectGallery = ({ images }: { images: string[] }) => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isPaused || isOpen) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isPaused, isOpen]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, handleNext, handlePrev]);

  return (
    <>
      <div
        className="relative w-full aspect-video overflow-hidden bg-black/60 group/gallery cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => setIsOpen(true)}
      >
        {images.map((item, i) => (
          isVideo(item) ? (
            <video
              key={item}
              src={item}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <img
              key={item}
              src={item}
              alt={getTitle(item, t)}
              className={`absolute inset-0 m-auto max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          )
        ))}
        
        {/* Overlay controls */}
        <div className="absolute inset-0 bg-black/0 group-hover/gallery:bg-black/20 transition-colors duration-300 flex items-center justify-between px-4 opacity-0 group-hover/gallery:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60 border-none"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/80 text-white flex items-center justify-center scale-0 group-hover/gallery:scale-100 transition-transform duration-300">
              <Maximize2 className="h-4 w-4" />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60 border-none"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Dialog - Moved outside to prevent event bubbling issues */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] p-0 overflow-hidden border-none bg-black/90 backdrop-blur-xl flex items-center justify-center">
          <DialogTitle className="sr-only">Project Screenshot Gallery</DialogTitle>
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="relative group/modal max-w-5xl w-full flex flex-col items-center">
              {isVideo(images[index]) ? (
                <video
                  src={images[index]}
                  controls
                  autoPlay
                  className="w-full max-h-[65vh] md:max-h-[70vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10"
                />
              ) : (
                <img
                  src={images[index]}
                  alt={getTitle(images[index], t)}
                  className="w-full max-h-[70vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10"
                />
              )}
              
              {/* Image Info Overlay - Bottom */}
              <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                <h4 className="text-white font-display font-bold text-lg md:text-2xl mb-2 tracking-tight">
                  {getTitle(images[index], t)}
                </h4>
                <p className="text-white/70 text-sm md:text-base max-w-3xl mx-auto leading-relaxed text-pretty px-4">
                  {getCaption(images[index], t)}
                </p>
              </div>
            </div>
            
            {/* Modal Navigation Controls */}
            <div className="absolute inset-x-0 top-[40%] -translate-y-1/2 flex justify-between px-4 md:px-10 pointer-events-none">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md pointer-events-auto transition-all hover:scale-110 active:scale-95"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md pointer-events-auto transition-all hover:scale-110 active:scale-95"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Bottom Controls Container */}
            <div className="mt-auto pt-10 pb-2 flex flex-col items-center gap-4 w-full">
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                IMAGE {index + 1} / {images.length}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const TiltFrame = ({ children }: { children: React.ReactNode }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current || document.querySelector('[role="dialog"]')) {
      setTilt({ x: 0, y: 0 });
      return;
    }
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  useEffect(() => {
    const resetOnModal = () => {
      if (document.querySelector('[role="dialog"]')) {
        setTilt({ x: 0, y: 0 });
      }
    };
    
    // Check periodically or on specific interactions to ensure tilt resets when modal opens
    const interval = setInterval(resetOnModal, 100);
    return () => clearInterval(interval);
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-200 ease-out preserve-3d"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      {children}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${tilt.x * 5 + 50}% ${tilt.y * 5 + 50}%, rgba(255,255,255,0.05) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
};

const BrowserFrame = ({
  url,
  children,
  dark = false,
  className = "",
}: {
  url: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <div
    className={`rounded-lg overflow-hidden border border-hairline ${className}`}
    style={dark ? { background: "#0d0d0f" } : undefined}
  >
    <div
      className={`flex items-center gap-3 px-3 py-2 border-b ${
        dark ? "border-white/5" : "border-hairline bg-surface-elevated/60"
      }`}
    >
      <div className="flex gap-1.5 shrink-0">
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
      </div>
      <div
        className={`flex-1 text-[11px] font-mono px-3 py-1 rounded truncate ${
          dark ? "bg-white/5 text-white/50" : "bg-background/60 text-muted-foreground"
        }`}
      >
        {url}
      </div>
    </div>
    {children}
  </div>
);

/* ---------- Mock 1: Invoicing ---------- */
const MockInvoicing = () => (
  <div
    className="p-5 min-h-[320px]"
    style={{
      background:
        "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02) 60%, transparent)",
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-display font-bold text-sm md:text-base">Comprobante de Crédito Fiscal</h4>
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-dot" /> Activo
      </span>
    </div>

    <div className="rounded-md border border-hairline bg-background/40 overflow-hidden">
      <div className="grid grid-cols-[1fr_70px_90px] text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-3 py-2 border-b border-hairline bg-surface-elevated/40">
        <div>Descripción</div>
        <div className="text-right">Cant.</div>
        <div className="text-right">Monto</div>
      </div>
      <div className="grid grid-cols-[1fr_70px_90px] text-xs px-3 py-2 border-b border-hairline">
        <div>Servicio de consultoría</div>
        <div className="text-right font-mono">2</div>
        <div className="text-right font-mono">$ 450.00</div>
      </div>
      <div className="grid grid-cols-[1fr_70px_90px] text-xs px-3 py-2 border-b border-hairline">
        <div>Licencia anual SaaS</div>
        <div className="text-right font-mono">1</div>
        <div className="text-right font-mono">$ 1,200.00</div>
      </div>
      <div className="grid grid-cols-[1fr_70px_90px] gap-2 px-3 py-2.5 border-b border-hairline">
        <div className="h-3 rounded mock-shimmer" />
        <div className="h-3 rounded mock-shimmer" />
        <div className="h-3 rounded mock-shimmer" />
      </div>
      <div className="grid grid-cols-[1fr_70px_90px] gap-2 px-3 py-2.5">
        <div className="h-3 rounded mock-shimmer" />
        <div className="h-3 rounded mock-shimmer" />
        <div className="h-3 rounded mock-shimmer" />
      </div>
    </div>

    <div className="flex gap-2 mt-4">
      <button className="text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground font-medium">
        Generar PDF
      </button>
      <button className="text-xs px-3 py-1.5 rounded border border-hairline bg-surface-elevated/60 text-muted-foreground">
        Enviar DTE
      </button>
      <button className="text-xs px-3 py-1.5 rounded border border-hairline bg-surface-elevated/60 text-muted-foreground">
        Anular
      </button>
    </div>
  </div>
);

/* ---------- Mock 2: Clinic ---------- */
const MockClinic = () => {
  const nav = [
    { label: "Inicio", icon: "🏥", active: true },
    { label: "Farmacia", icon: "💊" },
    { label: "Recetas", icon: "📋" },
    { label: "Inventario", icon: "📦" },
    { label: "Tickets", icon: "🧾" },
  ];
  return (
    <div className="flex min-h-[320px] bg-surface/40">
      <aside className="w-[80px] shrink-0 border-r border-hairline p-2 space-y-1">
        {nav.map((n) => (
          <div
            key={n.label}
            className={`flex flex-col items-center gap-1 px-1 py-2 rounded text-[10px] ${
              n.active
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-muted-foreground"
            }`}
          >
            <span className="text-base leading-none">{n.icon}</span>
            <span>{n.label}</span>
          </div>
        ))}
      </aside>
      <div className="flex-1 p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md border border-hairline bg-background/40 p-3">
            <div className="font-display font-bold text-2xl">142</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pacientes hoy</div>
          </div>
          <div className="rounded-md border border-hairline bg-background/40 p-3">
            <div className="font-display font-bold text-2xl">38</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Recetas emit.</div>
          </div>
        </div>
        <div className="rounded-md border border-hairline bg-background/40 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-mono text-[10px] text-primary">RX-2025-00142</div>
              <div className="text-xs font-medium">María Hernández · 34 años</div>
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground mb-2">
            Amoxicilina 500mg · 1 cápsula c/8h por 7 días
          </div>
          <div className="flex gap-1.5">
            <button className="text-[10px] px-2 py-1 rounded bg-primary text-primary-foreground font-medium">
              PDF
            </button>
            <button className="text-[10px] px-2 py-1 rounded border border-hairline text-muted-foreground">
              Térmica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Mock 3: Cinema ---------- */
const MockCinema = () => {
  // 4 rows × 10 cols. col 0 and col 9 = unavailable. Selected: row1 c4, c5. Some taken.
  const taken = new Set(["0-2", "0-3", "1-7", "2-1", "2-6", "3-4", "3-5", "3-8"]);
  const selected = new Set(["1-4", "1-5"]);
  const rows = 4;
  const cols = 10;
  return (
    <div className="p-5 min-h-[320px] bg-surface/40 text-foreground transition-colors duration-300">
      <div
        className="h-[3px] mx-auto mb-1 rounded-full"
        style={{
          width: "75%",
          background: "hsl(var(--primary))",
          boxShadow: "0 0 18px 2px hsl(var(--primary) / 0.7)",
        }}
      />
      <div className="text-center text-[9px] font-mono uppercase tracking-[0.3em] text-white/40 mb-4">
        Pantalla
      </div>
      <div className="grid gap-1.5 mx-auto" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: 360 }}>
        {Array.from({ length: rows * cols }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const key = `${r}-${c}`;
          const unavailable = c === 0 || c === cols - 1;
          const isSelected = selected.has(key);
          const isTaken = taken.has(key);
          let bg = "var(--surface-elevated)"; // available
          if (unavailable) bg = "var(--surface)";
          else if (isSelected) bg = "hsl(187 35% 47%)";
          else if (isTaken) bg = "hsl(187 35% 47% / 0.6)";
          return <div key={i} className="aspect-square rounded-sm" style={{ background: bg }} />;
        })}
      </div>
      <div className="flex items-center justify-between mt-5 text-[10px]">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: "var(--surface-elevated)" }} />Libre</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: "hsl(187 35% 47%)" }} />Sel.</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: "hsl(187 35% 47% / 0.6)" }} />Ocup.</span>
        </div>
        <button
          className="text-[10px] font-medium px-3 py-1 rounded-full transition-transform hover:scale-105 active:scale-95"
          style={{ background: "hsl(187 35% 47%)", color: "white" }}
        >
          Confirmar (2)
        </button>
      </div>
    </div>
  );
};

/* ---------- Mock 4: Auth ---------- */
const MockAuth = () => {
  const roles = [
    { name: "ADMIN", perms: [["read", "emerald"], ["write", "blue"], ["admin", "teal"]] },
    { name: "EDITOR", perms: [["read", "emerald"], ["write", "blue"]] },
    { name: "VIEWER", perms: [["read", "emerald"]] },
  ] as const;

  const permClass = (color: string) => {
    switch (color) {
      case "emerald":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-500";
      case "blue":
        return "border-sky-500/30 bg-sky-500/10 text-sky-500";
      default:
        return "border-primary/40 bg-primary/10 text-primary";
    }
  };

  return (
    <div className="p-5 min-h-[320px] bg-surface/40">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded-md bg-primary/15 border border-primary/30 grid place-items-center text-base">
          🔒
        </div>
        <div>
          <div className="font-display font-bold text-sm">Multi-Tenant Auth System</div>
          <div className="text-[10px] font-mono text-muted-foreground">JWT · RBAC · Multi-org</div>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        {roles.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between px-3 py-2 rounded-md border border-hairline bg-background/40"
          >
            <span className="font-mono text-xs">{r.name}</span>
            <div className="flex gap-1">
              {r.perms.map(([p, c]) => (
                <span
                  key={p}
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${permClass(c)}`}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-md border border-hairline bg-background/60 p-2.5 font-mono text-[10px] break-all leading-relaxed">
        <span style={{ color: "#f59e0b" }}>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
        <span className="text-muted-foreground">.</span>
        <span style={{ color: "hsl(187 60% 55%)" }}>eyJzdWIiOiJ1c3JfMDEyIiwidGVuYW50IjoibW9wdCJ9</span>
        <span className="text-muted-foreground">.</span>
        <span style={{ color: "#e879f9" }}>QkF4Z2pZcmF6aXVRRDhBM3RnVmZqWXk4MFhz</span>
      </div>
    </div>
  );
};

const mockFor = (p: Project) => {
  if (p.gallery && p.gallery.length > 0) {
    return <ProjectGallery images={p.gallery} />;
  }
  
  switch (p.num) {
    case "01": return <MockInvoicing />;
    case "03": return <MockCinema />;
    case "04": return <MockAuth />;
    default: return null;
  }
};

const ProjectInfo = ({ p, featured = false }: { p: Project; featured?: boolean }) => {
  const { t } = useLanguage();

  return (
    <div className={`p-6 md:p-8 ${featured ? "flex flex-col justify-center" : ""}`}>
      {featured && (
        <span className="self-start inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-dot" />
          Producción · MOPT
        </span>
      )}
      <div className="font-mono text-xs text-primary mb-2">PROJECT / {p.num}</div>
      <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight">{p.name}</h3>
      <div className="mt-1 text-sm text-muted-foreground">{p.role}</div>

      <ul className="space-y-3 text-muted-foreground text-pretty mt-5">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-3 leading-relaxed">
            <span className="mt-2 h-1 w-3 shrink-0 bg-primary/70 rounded-full" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <li
            key={s}
            className="stack-tag font-mono text-[11px] px-2 py-0.5 rounded border border-hairline text-muted-foreground transition-colors"
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeaturedCard = ({ p }: { p: Project }) => (
  <Reveal
    as="article"
    className="project-card group relative border border-hairline rounded-xl bg-surface/30 overflow-hidden md:col-span-2"
  >
    <div className="grid md:grid-cols-2 gap-0">
      <div className="p-5 md:p-6 md:border-r border-hairline">
        <TiltFrame>
          <BrowserFrame url={p.url}>{mockFor(p)}</BrowserFrame>
        </TiltFrame>
      </div>
      <ProjectInfo p={p} featured />
    </div>
  </Reveal>
);

const StackedCard = ({ p }: { p: Project }) => (
  <Reveal
    as="article"
    className="project-card group relative border border-hairline rounded-xl bg-surface/30 overflow-hidden flex flex-col"
  >
    <div className="p-5 md:p-6 pb-0">
      <TiltFrame>
        <BrowserFrame url={p.url}>{mockFor(p)}</BrowserFrame>
      </TiltFrame>
    </div>
    <ProjectInfo p={p} />
  </Reveal>
);

export const Projects = ({ variant }: { variant?: "default" | "muted" }) => {
  const { language, t } = useLanguage();
  const projects = useMemo(() => buildProjects(t, language), [t, language]);
  const featured = projects[0];
  const rest = projects.slice(1);
  return (
    <Section id="projects" eyebrow={t("projects.eyebrow")} title={t("projects.title")} variant={variant}>
      <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-8 -mt-2 text-pretty">
        {t("projects.subtitle")}
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        <FeaturedCard p={featured} />
        {rest.map((p) => <StackedCard key={p.num} p={p} />)}
      </div>
    </Section>
  );
};
