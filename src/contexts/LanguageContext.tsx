import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

/* eslint-disable react-refresh/only-export-components */

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T = string>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "es") return saved;
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith("es") ? "es" : "en";
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = useCallback(<T = string>(key: string): T => {
    const keys = key.split(".");
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    return (value || key) as unknown as T;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    navbar: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      location: "El Salvador · Available remote worldwide",
      currently: "Currently",
      viewWork: "View My Work",
      contactMe: "Contact Me",
      downloadCV: "Download CV",
      whatsapp: "WhatsApp",
      role: "Analyst Programmer",
      company: "@ MOPT, El Salvador",
    },
    about: {
      eyebrow: "01 / About",
      title: "Engineering software that organizations depend on.",
      paragraph1: "I'm a developer at the Ministerio de Obras Públicas y Transporte (MOPT) in El Salvador, building institutional software — web forms, electronic invoicing systems, backend APIs and PDF generation tools — using C#, .NET MVC, SQL Server, Alpine.js and React.",
      paragraph2: "I'm passionate about clean architecture, data integrity, and building tools that real organizations rely on every day.",
      stats: {
        years: "Years building production systems",
        systems: "Institutional systems shipped",
        english: "English proficiency",
      },
      sidebar: {
        statusLabel: "Status",
        pillarsLabel: "Core Pillars",
        status: "Available for Remote Worldwide",
        pillars: {
          reliability: {
            title: "Institutional Reliability",
            desc: "Building systems that handle critical government data with precision."
          },
          architecture: {
            title: "Scalable Architecture",
            desc: "Designing for growth and long-term maintainability from day one."
          },
          integrity: {
            title: "Data Integrity",
            desc: "Focusing on secure development for fiscal and administrative systems."
          }
        }
      }
    },
    skills: {
      eyebrow: "02 / Skills",
      title: "The toolkit I reach for.",
      backend: "Backend & Database",
      frontend: "Frontend & Tools",
    },
    projects: {
      eyebrow: "03 / Projects",
      title: "Selected work.",
      subtitle: "A curated selection of projects I've built — from institutional systems to personal experiments. This is not everything, just the highlights.",
      viewProject: "View Project",
      viewRepo: "View Repository",
      items: {
        p01: {
          role: "Full-Stack Developer · MOPT",
          bullets: [
            "Electronic Invoicing (DTE): Engineered a robust system for Electronic Tax Documents (DTE), handling tax receipts and withholdings in full compliance with government regulations.",
            "Reactive UX Optimization: Built high-performance Alpine.js modules that reduced administrative processing time by 40% through reactive client-side state management.",
            "Backend & API Integration: Implemented complex C# fiscal logic and secure REST API integrations for real-time JSON document validation and automated iTextSharp PDF generation.",
          ],
        },
        p02: {
          role: "Full-Stack Developer · MOPT",
          bullets: [
            "Complete Pharmacy Lifecycle: From lot management and expiration tracking to automated purchase lists.",
            "Integrated Prescription System: Real-time creation, validation, and issuance of medical prescriptions.",
            "Staff & Patient Dashboard: Centralized view of medical metrics, patient intake, and daily operational status.",
            "Multi-Module Architecture: Scalable system handling medical records, inventory, and administrative security roles.",
          ],
        },
        p03: {
          role: "Full-Stack Developer",
          bullets: [
            "Decoupled API Architecture: Engineered a high-performance RESTful API using .NET Core to serve as the primary backend for the entire platform.",
            "Real-Time Booking Engine: Implemented a seat reservation system with instantaneous availability updates and concurrent booking prevention.",
            "Automated Billing & Auditing: Integrated movie scheduling, financial billing, and comprehensive auditing modules with automated PDF generation.",
            "Secure Content Sharing: Developed a secure direct-link system for movie sharing and high-definition trailer playback integration.",
          ],
        },
        p04: {
          role: "Full-Stack Developer",
          bullets: [
            "Designed a JWT-based authentication system supporting role-based access control (RBAC).",
            "Multi-tenant architecture supporting multiple organizations from a single deployment.",
            "Encrypted credential management and secure session handling.",
          ],
        },
        p05: {
          role: "Full-Stack Developer",
          bullets: [
            "Unified Access Architecture: Built a secure API gateway designed to centralize and manage external citizen access for 'Cine Nocturno' and future public-facing institutional services.",
            "External User Onboarding: Implemented a robust registration and authentication workflow tailored for users outside the institutional network.",
            "Scalable Master Data Management: Centralized core data entities (Maestras) to provide consistent and synchronized information across multiple public applications.",
            "Cross-Platform Sync: Optimized data synchronization protocols to ensure real-time consistency between internal ministry databases and the public portal.",
          ],
        },
        p06: {
          role: "Full-Stack Developer · MOPT",
          bullets: [
            "Real-Time ICMP Monitoring: Background service pings every registered IP each minute, logging latency and status (UP/DOWN) with sub-second precision.",
            "Automated Email Alerting: Sends critical HTML alerts via SMTP when a device stays offline for 2+ cycles, plus consolidated 10-minute summary reports to network admins.",
            "Interactive Analytics Dashboard: Premium dark-mode UI with Chart.js-powered latency graphs, status timelines, availability donut charts, and configurable time ranges (1H–7D).",
            "Full Device Management: CRUD interface for managing monitored endpoints with SweetAlert2 modals, department grouping, real-time search, and stored procedure-backed data access.",
          ],
        },
        p07: {
          role: "Backend Developer · MOPT",
          bullets: [
            "Containerized Microservices: Engineered and deployed institutional utility APIs (e.g., MOPT Emails) using Docker containers for consistent deployment.",
            "Mass Email & Batch Processing: Implemented a robust system for sending bulk emails in batches, optimizing performance and preventing server timeouts during large institutional mailouts.",
            "Cross-Platform Environment: Configured Docker Compose to orchestrate SQL Server and .NET Core API containers locally and in production.",
            "Scalable Configuration: Leveraged appsettings and environment variables within Docker to securely manage connection strings and SMTP credentials.",
          ],
        },
      },
      gallery: {
        titles: {
          "Seleccion de emisor": "Issuer Selection",
          "Dashboard de Facturas realizadas por emisor": "Issuer Billing Dashboard",
          "Seleccionador de tipo de receptor": "Receiver Type Selector",
          "documento a crear por emitir": "Pending Document Creation",
          "Creacion de doc, nota debito": "Debit Note Document Creation",
          "casos de uso -en": "Use Case Architecture (EN)",
          "casos de uso- es": "Use Case Architecture (ES)",
          "diagrama de proceso -en": "BPMN Process Flow (EN)",
          "Diagrama de proceso -es": "BPMN Process Flow (ES)",
          "Documento Tributario Final (PDF)": "Final Electronic Tax Document (PDF)",
          "Visor de Documentos tributarios electronicos": "Electronic Tax Document Viewer",
          "Inicio": "Home",
          "Dashboard": "Admin Dashboard",
          "Gestion de recetas": "Prescription Management",
          "Creacion de nueva receta": "New Prescription",
          "Inventario Medicamento": "Medicine Inventory",
          "Gestion de lotes": "Batch Management",
          "Crear nuevo lote": "New Batch Registration",
          "Consulta de empleados": "Employee Directory",
          "Gestion de lista de compras": "Purchase List Management",
          "Agregar medicamento a la lista de compras": "Replenishment Management",
          "Modal crear medicamento + Lote": "Quick Entry",
          "cine-": "Movie Billboard",
          "seleccioanr pelicula": "Movie Selection",
          "trailer de pelicula": "Movie Trailer",
          "pelicula compartida por link directo": "Direct Sharing",
          "login": "Authentication Gateway",
          "dashboard como usuario admin": "Admin Dashboard",
          "menu lateral": "Dynamic Navigation",
          "gestion de peliculas": "Content Management",
          "datos para agregar nueva pelicula": "Content Ingestion",
          "gestion de banner de la web del cine": "Billboard Management",
          "gestion de menus": "Navigation Schema",
          "permisos de menus por tipo de perfil usuario": "RBAC Settings",
          "Movie Interfaces": "User Interface Demo",
          "clinic-endpoints": "Clinic API — Endpoint Overview",
          "endpoints expanded": "Clinic API — CRUD Routes",
          "clinic-api-token auth": "Bearer Token Configuration",
          "get categorias con bearer token": "Authenticated API Response",
          "swagger-version": "Cinema API — Swagger Documentation",
          "get-active-movies": "Cinema API — Active Movies Query",
          "Dahsboard Principal": "Main Dashboard",
          "ip seleccionada con marca de 1H": "Device Analysis — 1H Range",
          "Latencia en tiempo real": "Real-Time Latency Modal",
          "Linea temporal completa 1H seleccionada": "Full Timeline Modal",
          "gestion de marcadores (ips)": "Device Management",
          "agregar nueva ip": "New Device Registration",
          "Notificaciones de alertas por correo": "Alert Notification Settings",
          "Principal Dashboard": "Utilities Dashboard",
          "api correos pt1": "Email API Configuration (Part 1)",
          "apicorreos pt2": "Email API Configuration (Part 2)",
          "docker running": "Docker Containers in Execution",
          "endpoint en postman": "Postman API Testing",
          "Email Send History ": "Email Send History",
          "emails send successfully": "Bulk Email Delivery Success"
        },
        captions: {
          "Seleccion de emisor": "Interface for selecting the issuing entity for the electronic invoice, ensuring proper association with institutional departments.",
          "Dashboard de Facturas realizadas por emisor": "Analytics dashboard displaying the total volume and status of electronic invoices generated by the selected issuer.",
          "Seleccionador de tipo de receptor": "UI component to select the recipient's tax classification, automatically adapting the required fields for the invoice.",
          "documento a crear por emitir": "Preview and configuration screen for a pending electronic tax document before final signature and submission.",
          "Creacion de doc, nota debito": "Form interface for generating specialized tax documents such as debit notes with real-time validation.",
          "casos de uso -en": "UML Use Case diagram illustrating the main interactions between the Issuer, Ministry of Finance, and Receiver within the core billing system.",
          "casos de uso- es": "UML Use Case diagram illustrating the main interactions between the Issuer, Ministry of Finance, and Receiver within the core billing system.",
          "diagrama de proceso -en": "BPMN diagram detailing the asynchronous orchestration between the Issuer, Internal System (SEDTE), and Ministry of Finance for document validation and authorization.",
          "Diagrama de proceso -es": "BPMN diagram detailing the asynchronous orchestration between the Issuer, Internal System (SEDTE), and Ministry of Finance for document validation and authorization.",
          "Documento Tributario Final (PDF)": "The final generated PDF representation of the Electronic Tax Document, ready for official distribution and printing.",
          "Visor de Documentos tributarios electronicos": "Dedicated UI for viewing and verifying generated electronic tax documents and their digital signatures.",
          "Inicio": "Main entry point and welcome screen for the MOPT Clinic ecosystem.",
          "Dashboard": "Comprehensive control panel featuring key metrics, patient statistics, and daily activity overview.",
          "Gestion de recetas": "Centralized management module for tracking and controlling issued medical prescriptions.",
          "Creacion de nueva receta": "Optimized interface for prescribing medications with real-time stock validation.",
          "Inventario Medicamento": "Detailed pharmaceutical stock control, enabling efficient search and classification.",
          "Gestion de lotes": "Comprehensive batch tracking, ensuring traceability and strict expiration date control.",
          "Crear nuevo lote": "Registration process for adding new supplies and medications to the central inventory.",
          "Consulta de empleados": "Directory and management of medical and administrative staff linked to the system.",
          "Gestion de lista de compras": "Planning tool for the automated generation of purchase requirements.",
          "Agregar medicamento a la lista de compras": "Feature for managing critical replenishment of low-stock pharmaceuticals.",
          "Modal crear medicamento + Lote": "Dual-purpose form for swift registration of new pharmaceutical products and their initial batch.",
          "cine-": "Main movie billboard showing currently playing films and upcoming premieres.",
          "seleccioanr pelicula": "Interactive movie selection interface with detailed synopsis and showtime information.",
          "trailer de pelicula": "Integrated HD trailer player for an immersive movie discovery experience.",
          "pelicula compartida por link directo": "Direct link sharing feature, allowing users to invite others to specific movie screenings.",
          "login": "Secure login interface for administrative staff, utilizing encrypted JWT tokens for session management.",
          "dashboard como usuario admin": "Centralized overview for administrators to monitor system-wide activity and public service status.",
          "menu lateral": "Intuitive and responsive navigation menu tailored to specific user roles and permissions.",
          "gestion de peliculas": "Comprehensive interface for managing the public movie catalog, including descriptions, ratings, and availability.",
          "datos para agregar nueva pelicula": "Detailed data entry module for adding new films, ensuring all metadata is correctly synchronized with the public portal.",
          "gestion de banner de la web del cine": "Module for controlling the public website's billboard and promotional banners, allowing for real-time marketing updates.",
          "gestion de menus": "Tool for defining and structuring application menus across different public-facing platforms.",
          "permisos de menus por tipo de perfil usuario": "Advanced permission mapping system that dynamically adjusts application menus based on the user's specific profile.",
          "Movie Interfaces": "Complete walkthrough of the cinema management interface showing seat booking, movie selection, and admin panel features.",
          "clinic-endpoints": "Swagger UI overview of the MOPT Clinic API (OAS 3.0), displaying all available resource groups including Categorias, Doctores, Lotes, Medicamentos, Recetas, and more.",
          "endpoints expanded": "Expanded view of the Clinic API's RESTful CRUD endpoints for Doctores and Lotes, showcasing the full HTTP verb coverage (GET, POST, PUT, DELETE) with specialized search routes.",
          "clinic-api-token auth": "Postman configuration showing Bearer Token authentication setup for accessing the protected Clinic API endpoints.",
          "get categorias con bearer token": "Successful authenticated GET request to /api/Categorias returning a 200 OK JSON response with pharmaceutical categories (Antibióticos, Analgésicos, Antigripales) in 12ms.",
          "swagger-version": "Swagger UI documentation for CineNocturnoMagicoAPI v1 (OAS 3.0), exposing Auditoria, Banners, and Peliculas resources with full CRUD and specialized operations.",
          "get-active-movies": "Postman response from /api/Peliculas/activas on the Cinema API, returning active movie listings with full metadata including titles, showtimes, poster URLs, and trailer links.",
          "Dahsboard Principal": "Full PingMonitor dashboard showing 23 monitored devices across MOPT offices, with summary cards (total, online, offline, latency), a device table with real-time status dots, a 78% uptime donut chart, device detail panel, and Chart.js-powered latency and connectivity graphs.",
          "ip seleccionada con marca de 1H": "Dashboard with BASCULA ZACATECOLUCA selected, showing its ONLINE status at 3ms latency, along with latency chart (Min: 2ms, Max: 5ms, Avg: 2ms over 24 samples), 100% uptime connectivity bar, and full timeline — all in the 1H time range.",
          "Latencia en tiempo real": "Expanded modal view of real-time latency for BASCULA ZACATECOLUCA (192.168.13.30), displaying a detailed cyan line chart with min/max/avg statistics (2ms/5ms/2ms) over 24 data points, with time range selectors (1H–7D) and auto-refresh every 30 seconds.",
          "Linea temporal completa 1H seleccionada": "Full timeline modal for BASCULA ZACATECOLUCA showing latency history over 1 hour. Color-coded data points (green = UP, red = DOWN) with 100% uptime, 42 pings OK, and 0 failures. Auto-updates every 30 seconds.",
          "gestion de marcadores (ips)": "Device management module listing all 23+ monitored endpoints with their names, IP addresses, department locations, and active status. Features search filtering and action buttons for editing and deleting each device.",
          "agregar nueva ip": "SweetAlert2 modal for registering a new monitored device with fields for device name, IP address, and department/location. Non-intrusive overlay that preserves the underlying device table context.",
          "Notificaciones de alertas por correo": "Email notification configuration page showing alert recipients with their names, institutional email addresses (@mop.gob.sv), active/inactive toggle switches, and edit/delete actions for managing who receives outage and recovery alerts.",
          "Principal Dashboard": "Main dashboard interface for managing institutional utilities and viewing system status.",
          "api correos pt1": "Configuration and code details for the bulk email sending functionality.",
          "apicorreos pt2": "Additional configuration showing SMTP and environment variable setups.",
          "docker running": "Docker environment running the containerized services securely and efficiently.",
          "endpoint en postman": "Testing the utility API endpoints via Postman, showing a successful response.",
          "Email Send History ": "Dashboard view displaying the log and history of processed and sent emails.",
          "emails send successfully": "Visual confirmation of successfully delivered emails from the batch processing system."
        }
      }
    },
    experience: {
      eyebrow: "04 / Experience",
      title: "A path through engineering and support.",
      education: "05 / Education",
      educationTitle: "Universidad Tecnológica de El Salvador (UTEC)",
      educationSubtitle: "B.S. in Computer Systems Engineering · 2021 – Present · Expected 2027",
      jobs: [
        {
          company: "MOPT (Ministerio de Obras Públicas y Transporte)",
          role: "Analyst Programmer Technician",
          period: "Jul 2024 — Present",
          desc: "Institutional software development: web forms, backend APIs, SQL databases, IIS deployment, GitHub/TortoiseSVN version control, cybersecurity compliance.",
        },
        {
          company: "Direct English",
          role: "English Coach",
          period: "Feb 2024 — Jul 2024",
          desc: "Online English coaching across Latin America. Advanced communication and teaching skills.",
        },
        {
          company: "Concentrix",
          role: "IT Support — HP SmartFriend",
          period: "Mar 2022 — Feb 2024",
          desc: "Resolved complex software issues for private applications. Bilingual technical support.",
        },
        {
          company: "Teleperformance",
          role: "Tech Support — Choice Hotels Property",
          period: "Jan 2022 — Mar 2022",
          desc: "Property support for Choice Hotels.",
        },
      ],
    },
    contact: {
      eyebrow: "06 / Contact",
      title: "Let's build something together.",
      description: "Available for interesting projects and remote opportunities. Drop me a message and I'll get back to you as soon as possible.",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      subjectLabel: "Subject",
      messageLabel: "Message",
      sendButton: "Send Message",
      sending: "Sending...",
      success: "Message sent! I'll get back to you soon.",
      error: "Something went wrong. Please try again.",
      formTitle: "Send a Message",
    },
  },
  es: {
    navbar: {
      about: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      experience: "Experiencia",
      contact: "Contacto",
    },
    hero: {
      location: "El Salvador · Disponible para trabajar remotamente",
      currently: "Actualmente",
      viewWork: "Ver mi trabajo",
      contactMe: "Contáctame",
      downloadCV: "Descargar CV",
      whatsapp: "WhatsApp",
      role: "Técnico Programador",
      company: "@ MOPT, El Salvador",
    },
    about: {
      eyebrow: "01 / Sobre mí",
      title: "Ingeniería de software en la que dependen las organizaciones.",
      paragraph1: "Soy desarrollador en el Ministerio de Obras Públicas y Transporte (MOPT) en El Salvador, construyendo software institucional — formularios web, sistemas de facturación electrónica, APIs backend y herramientas de generación de PDF — usando C#, .NET MVC, SQL Server, Alpine.js y React.",
      paragraph2: "Me apasiona la arquitectura limpia, la integridad de datos y construir herramientas en las que las organizaciones reales confían todos los días.",
      stats: {
        years: "Años construyendo sistemas en producción",
        systems: "Sistemas institucionales entregados",
        english: "Nivel de inglés",
      },
      sidebar: {
        statusLabel: "Estado",
        pillarsLabel: "Pilares Clave",
        status: "Disponible para trabajo remoto",
        pillars: {
          reliability: {
            title: "Confiabilidad Institucional",
            desc: "Construyendo sistemas que manejan datos gubernamentales críticos con precisión."
          },
          architecture: {
            title: "Arquitectura Escalable",
            desc: "Diseñando para el crecimiento y el mantenimiento a largo plazo desde el primer día."
          },
          integrity: {
            title: "Integridad de Datos",
            desc: "Enfocado en el desarrollo seguro para sistemas fiscales y administrativos."
          }
        }
      }
    },
    skills: {
      eyebrow: "02 / Habilidades",
      title: "Las herramientas que utilizo.",
      backend: "Backend y Base de Datos",
      frontend: "Frontend y Herramientas",
    },
    projects: {
      eyebrow: "03 / Proyectos",
      title: "Trabajo seleccionado.",
      subtitle: "Una selección de proyectos que he construido — desde sistemas institucionales hasta experimentos personales. Esto no es todo, solo lo más destacado.",
      viewProject: "Ver Proyecto",
      viewRepo: "Ver Repositorio",
      items: {
        p01: {
          role: "Desarrollador Full-Stack · MOPT",
          bullets: [
            "Facturación Electrónica (DTE): Diseñé un sistema robusto de Documentos Tributarios Electrónicos (DTE) para créditos fiscales y retenciones, cumpliendo con todas las normativas gubernamentales.",
            "Optimización de UX Reactiva: Construí módulos en Alpine.js que redujeron el tiempo de procesamiento administrativo en un 40% mediante gestión de estado reactiva en el cliente.",
            "Integración Backend y API: Implementé lógica fiscal en C# e integraciones con APIs REST para validación de documentos JSON en tiempo real y generación automatizada de PDFs con iTextSharp.",
          ],
        },
        p02: {
          role: "Desarrollador Full-Stack · MOPT",
          bullets: [
            "Ciclo completo de farmacia: Desde gestión de lotes y seguimiento de caducidad hasta listas de compra automatizadas.",
            "Sistema integrado de recetas: Creación, validación y emisión de recetas médicas en tiempo real.",
            "Panel de empleados y pacientes: Vista centralizada de métricas médicas, ingreso de pacientes y estado operativo diario.",
            "Arquitectura multi-módulo: Sistema escalable que maneja registros médicos, inventario y roles de seguridad administrativos.",
          ],
        },
        p03: {
          role: "Desarrollador Full-Stack",
          bullets: [
            "Arquitectura API desacoplada: Diseñé una API RESTful de alto rendimiento con .NET Core como backend principal de toda la plataforma.",
            "Motor de reservas en tiempo real: Implementé un sistema de reserva de asientos con actualizaciones instantáneas y prevención de reservas concurrentes.",
            "Facturación y auditoría automatizada: Integré programación de películas, facturación financiera y módulos de auditoría con generación automática de PDF.",
            "Compartición segura de contenido: Desarrollé un sistema de enlaces directos seguros para compartir películas e integración de trailers en HD.",
          ],
        },
        p04: {
          role: "Desarrollador Full-Stack",
          bullets: [
            "Diseñé un sistema de autenticación basado en JWT con control de acceso por roles (RBAC).",
            "Arquitectura multi-tenant que soporta múltiples organizaciones desde un solo despliegue.",
            "Gestión de credenciales encriptadas y manejo seguro de sesiones.",
          ],
        },
        p05: {
          role: "Desarrollador Full-Stack",
          bullets: [
            "Arquitectura de acceso unificado: Construí un API gateway seguro para centralizar y gestionar el acceso ciudadano externo a 'Cine Nocturno' y futuros servicios institucionales públicos.",
            "Incorporación de usuarios externos: Implementé un flujo robusto de registro y autenticación adaptado para usuarios fuera de la red institucional.",
            "Gestión escalable de datos maestros: Centralicé entidades de datos (Maestras) para proveer información consistente y sincronizada entre múltiples aplicaciones públicas.",
            "Sincronización multiplataforma: Optimicé protocolos de sincronización de datos para garantizar consistencia en tiempo real entre las bases de datos internas del ministerio y el portal público.",
          ],
        },
        p06: {
          role: "Desarrollador Full-Stack · MOPT",
          bullets: [
            "Monitoreo ICMP en tiempo real: Servicio en segundo plano que hace ping a cada IP registrada cada minuto, registrando latencia y estado (UP/DOWN) con precisión de sub-segundo.",
            "Alertas automáticas por correo: Envía alertas HTML críticas vía SMTP cuando un dispositivo permanece offline por 2+ ciclos, más reportes consolidados cada 10 minutos a los administradores de red.",
            "Dashboard analítico interactivo: Interfaz premium con modo oscuro, gráficos de latencia con Chart.js, líneas temporales de estado, gráfico donut de disponibilidad y rangos de tiempo configurables (1H–7D).",
            "Gestión completa de dispositivos: Interfaz CRUD para administrar endpoints monitoreados con modales SweetAlert2, agrupación por departamento, búsqueda en tiempo real y acceso a datos por stored procedures.",
          ],
        },
        p07: {
          role: "Desarrollador Backend · MOPT",
          bullets: [
            "Microservicios Contenerizados: Diseñé e implementé APIs de utilidades institucionales (ej. MOPT Correos) utilizando contenedores Docker para despliegues consistentes.",
            "Envío Masivo y por Lotes: Implementé un sistema robusto para el envío de correos masivos por lotes, optimizando el rendimiento y evitando saturación del servidor SMTP institucional.",
            "Entorno Multiplataforma: Configuré Docker Compose para orquestar contenedores de SQL Server y .NET Core API tanto localmente como en producción.",
            "Configuración Escalable: Utilicé appsettings y variables de entorno dentro de Docker para gestionar de forma segura las cadenas de conexión y credenciales SMTP.",
          ],
        },
      },
      gallery: {
        titles: {
          "Seleccion de emisor": "Selección de Emisor",
          "Dashboard de Facturas realizadas por emisor": "Dashboard de Facturación por Emisor",
          "Seleccionador de tipo de receptor": "Selector de Tipo de Receptor",
          "documento a crear por emitir": "Creación de Documento Pendiente",
          "Creacion de doc, nota debito": "Creación de Documento: Nota de Débito",
          "casos de uso -en": "Arquitectura de Casos de Uso (EN)",
          "casos de uso- es": "Arquitectura de Casos de Uso (ES)",
          "diagrama de proceso -en": "Flujo de Proceso BPMN (EN)",
          "Diagrama de proceso -es": "Flujo de Proceso BPMN (ES)",
          "Documento Tributario Final (PDF)": "Documento Tributario Electrónico Final (PDF)",
          "Visor de Documentos tributarios electronicos": "Visor de Documentos Tributarios Electrónicos",
          "Inicio": "Inicio",
          "Dashboard": "Panel de Control",
          "Gestion de recetas": "Gestión de Recetas",
          "Creacion de nueva receta": "Nueva Receta",
          "Inventario Medicamento": "Inventario de Medicamentos",
          "Gestion de lotes": "Gestión de Lotes",
          "Crear nuevo lote": "Registro de Nuevo Lote",
          "Consulta de empleados": "Directorio de Empleados",
          "Gestion de lista de compras": "Gestión de Lista de Compras",
          "Agregar medicamento a la lista de compras": "Gestión de Reabastecimiento",
          "Modal crear medicamento + Lote": "Entrada Rápida",
          "cine-": "Cartelera de Cine",
          "seleccioanr pelicula": "Selección de Película",
          "trailer de pelicula": "Tráiler de Película",
          "pelicula compartida por link directo": "Compartir Directo",
          "login": "Portal de Autenticación",
          "dashboard como usuario admin": "Panel de Administración",
          "menu lateral": "Navegación Dinámica",
          "gestion de peliculas": "Gestión de Contenido",
          "datos para agregar nueva pelicula": "Ingreso de Contenido",
          "gestion de banner de la web del cine": "Gestión de Cartelera",
          "gestion de menus": "Esquema de Navegación",
          "permisos de menus por tipo de perfil usuario": "Configuración de RBAC",
          "Movie Interfaces": "Demo de Interfaz de Usuario",
          "clinic-endpoints": "API Clínica — Vista General de Endpoints",
          "endpoints expanded": "API Clínica — Rutas CRUD",
          "clinic-api-token auth": "Configuración de Bearer Token",
          "get categorias con bearer token": "Respuesta de API Autenticada",
          "swagger-version": "API Cine — Documentación Swagger",
          "get-active-movies": "API Cine — Consulta de Películas Activas",
          "Dahsboard Principal": "Dashboard Principal",
          "ip seleccionada con marca de 1H": "Análisis de Dispositivo — Rango 1H",
          "Latencia en tiempo real": "Modal de Latencia en Tiempo Real",
          "Linea temporal completa 1H seleccionada": "Modal de Línea Temporal Completa",
          "gestion de marcadores (ips)": "Gestión de Dispositivos",
          "agregar nueva ip": "Registro de Nuevo Dispositivo",
          "Notificaciones de alertas por correo": "Configuración de Notificaciones",
          "Principal Dashboard": "Dashboard de Utilidades",
          "api correos pt1": "Configuración de API de Correos (Parte 1)",
          "apicorreos pt2": "Configuración de API de Correos (Parte 2)",
          "docker running": "Contenedores Docker en Ejecución",
          "endpoint en postman": "Pruebas de API en Postman",
          "Email Send History ": "Historial de Correos Enviados",
          "emails send successfully": "Envío de Lote Exitoso"
        },
        captions: {
          "Seleccion de emisor": "Interfaz para seleccionar la entidad emisora de la factura electrónica, asegurando la correcta asociación departamental.",
          "Dashboard de Facturas realizadas por emisor": "Panel analítico que muestra el volumen y estado de las facturas electrónicas generadas por el emisor seleccionado.",
          "Seleccionador de tipo de receptor": "Componente para clasificar al receptor fiscalmente, adaptando automáticamente los campos requeridos para la factura.",
          "documento a crear por emitir": "Pantalla de previsualización y configuración de un documento tributario electrónico antes de su firma y envío.",
          "Creacion de doc, nota debito": "Interfaz de formulario para la generación de documentos tributarios especializados como notas de débito con validación en tiempo real.",
          "casos de uso -en": "Diagrama de casos de uso ilustrando las interacciones principales de los actores (Emisor, Ministerio de Hacienda y Receptor) con el núcleo del sistema de facturación.",
          "casos de uso- es": "Diagrama de casos de uso ilustrando las interacciones principales de los actores (Emisor, Ministerio de Hacienda y Receptor) con el núcleo del sistema de facturación.",
          "diagrama de proceso -en": "Diagrama BPMN detallando la orquestación asíncrona entre el Emisor, el Sistema Interno (SEDTE) y el Ministerio de Hacienda para la validación y autorización de documentos.",
          "Diagrama de proceso -es": "Diagrama BPMN detallando la orquestación asíncrona entre el Emisor, el Sistema Interno (SEDTE) y el Ministerio de Hacienda para la validación y autorización de documentos.",
          "Documento Tributario Final (PDF)": "Representación final en PDF del Documento Tributario Electrónico generado, listo para su distribución e impresión oficial.",
          "Visor de Documentos tributarios electronicos": "Interfaz de usuario dedicada a la visualización y verificación de los documentos tributarios electrónicos generados y sus firmas digitales.",
          "Inicio": "Punto de entrada principal y pantalla de bienvenida para el ecosistema de la Clínica MOPT.",
          "Dashboard": "Panel de control integral que presenta métricas clave, estadísticas de pacientes y resumen de actividad diaria.",
          "Gestion de recetas": "Módulo de gestión centralizado para el seguimiento y control de las recetas médicas emitidas.",
          "Creacion de nueva receta": "Interfaz optimizada para prescribir medicamentos con validación de stock en tiempo real.",
          "Inventario Medicamento": "Control detallado de stock farmacéutico, permitiendo búsquedas y clasificación eficientes.",
          "Gestion de lotes": "Seguimiento integral de lotes, garantizando trazabilidad y un control estricto de fechas de vencimiento.",
          "Crear nuevo lote": "Proceso de registro para añadir nuevos suministros y medicamentos al inventario central.",
          "Consulta de empleados": "Directorio y gestión del personal médico y administrativo vinculado al sistema.",
          "Gestion de lista de compras": "Herramienta de planificación para la generación automatizada de requerimientos de compra.",
          "Agregar medicamento a la lista de compras": "Función para gestionar el reabastecimiento crítico de productos farmacéuticos con poco stock.",
          "Modal crear medicamento + Lote": "Formulario de doble propósito para el registro rápido de nuevos productos farmacéuticos y su lote inicial.",
          "cine-": "Cartelera principal que muestra las películas en reproducción actual y los próximos estrenos.",
          "seleccioanr pelicula": "Interfaz interactiva de selección de películas con sinopsis detallada e información de horarios.",
          "trailer de pelicula": "Reproductor de tráiler en HD integrado para una experiencia inmersiva de descubrimiento de películas.",
          "pelicula compartida por link directo": "Función de compartir enlaces directos, permitiendo a los usuarios invitar a otros a funciones específicas.",
          "login": "Interfaz de inicio de sesión segura para el personal administrativo, utilizando tokens JWT encriptados para la gestión de sesiones.",
          "dashboard como usuario admin": "Resumen centralizado para que los administradores monitoreen la actividad de todo el sistema y el estado de los servicios públicos.",
          "menu lateral": "Menú de navegación intuitivo y responsivo adaptado a roles y permisos de usuario específicos.",
          "gestion de peliculas": "Interfaz completa para gestionar el catálogo público de películas, incluyendo descripciones, calificaciones y disponibilidad.",
          "datos para agregar nueva pelicula": "Módulo de entrada de datos detallado para añadir nuevas películas, asegurando que todos los metadatos estén correctamente sincronizados con el portal público.",
          "gestion de banner de la web del cine": "Módulo para controlar la cartelera del sitio web público y los banners promocionales, permitiendo actualizaciones de marketing en tiempo real.",
          "gestion de menus": "Herramienta para definir y estructurar los menús de la aplicación en diferentes plataformas orientadas al público.",
          "permisos de menus por tipo de perfil usuario": "Sistema avanzado de mapeo de permisos que ajusta dinámicamente los menús de la aplicación según el perfil específico del usuario.",
          "Movie Interfaces": "Recorrido completo por la interfaz de gestión de cine mostrando reserva de asientos, selección de películas y panel de administración.",
          "clinic-endpoints": "Vista general en Swagger UI de la API Clínica MOPT (OAS 3.0), mostrando todos los grupos de recursos disponibles incluyendo Categorías, Doctores, Lotes, Medicamentos, Recetas y más.",
          "endpoints expanded": "Vista expandida de los endpoints CRUD RESTful de la API Clínica para Doctores y Lotes, mostrando la cobertura completa de verbos HTTP (GET, POST, PUT, DELETE) con rutas de búsqueda especializadas.",
          "clinic-api-token auth": "Configuración en Postman mostrando la autenticación con Bearer Token para acceder a los endpoints protegidos de la API Clínica.",
          "get categorias con bearer token": "Solicitud GET autenticada exitosa a /api/Categorias devolviendo una respuesta JSON 200 OK con categorías farmacéuticas (Antibióticos, Analgésicos, Antigripales) en 12ms.",
          "swagger-version": "Documentación Swagger UI para CineNocturnoMagicoAPI v1 (OAS 3.0), exponiendo los recursos de Auditoría, Banners y Películas con operaciones CRUD completas y especializadas.",
          "get-active-movies": "Respuesta de Postman desde /api/Peliculas/activas de la API de Cine, devolviendo listados de películas activas con metadatos completos incluyendo títulos, horarios, URLs de pósters y enlaces de tráilers.",
          "Dahsboard Principal": "Dashboard completo de PingMonitor mostrando 23 dispositivos monitoreados en oficinas del MOPT, con tarjetas resumen (total, en línea, fuera de línea, latencia), tabla de dispositivos con indicadores de estado en tiempo real, gráfico donut de 78% de uptime, panel de detalle del dispositivo, y gráficas de latencia y conectividad con Chart.js.",
          "ip seleccionada con marca de 1H": "Dashboard con BASCULA ZACATECOLUCA seleccionada, mostrando su estado ONLINE a 3ms de latencia, junto con gráfico de latencia (Mín: 2ms, Máx: 5ms, Avg: 2ms en 24 muestras), barra de conectividad al 100% de uptime, y línea temporal completa — todo en el rango de 1H.",
          "Latencia en tiempo real": "Vista modal ampliada de latencia en tiempo real para BASCULA ZACATECOLUCA (192.168.13.30), mostrando un gráfico de línea cyan detallado con estadísticas mín/máx/avg (2ms/5ms/2ms) sobre 24 puntos de datos, con selectores de rango de tiempo (1H–7D) y auto-actualización cada 30 segundos.",
          "Linea temporal completa 1H seleccionada": "Modal de línea temporal completa para BASCULA ZACATECOLUCA mostrando el historial de latencia en 1 hora. Puntos de datos codificados por color (verde = UP, rojo = DOWN) con 100% de uptime, 42 pings OK, y 0 fallos. Se actualiza automáticamente cada 30 segundos.",
          "gestion de marcadores (ips)": "Módulo de gestión de dispositivos listando los 23+ endpoints monitoreados con sus nombres, direcciones IP, ubicaciones de departamento y estado activo. Incluye filtrado por búsqueda y botones de acción para editar y eliminar cada dispositivo.",
          "agregar nueva ip": "Modal SweetAlert2 para registrar un nuevo dispositivo monitoreado con campos para nombre del dispositivo, dirección IP y departamento/ubicación. Superposición no intrusiva que preserva el contexto de la tabla de dispositivos.",
          "Notificaciones de alertas por correo": "Página de configuración de notificaciones por correo mostrando los destinatarios de alertas con sus nombres, correos institucionales (@mop.gob.sv), interruptores de activo/inactivo, y acciones de editar/eliminar para gestionar quién recibe las alertas de caídas y recuperaciones.",
          "Principal Dashboard": "Interfaz del dashboard principal para la gestión de las utilidades institucionales y visualización de estado.",
          "api correos pt1": "Detalles de configuración y código para la funcionalidad de envío masivo de correos.",
          "apicorreos pt2": "Configuración adicional mostrando ajustes de SMTP y variables de entorno.",
          "docker running": "Entorno Docker ejecutando los servicios en contenedores de forma segura y eficiente.",
          "endpoint en postman": "Pruebas de los endpoints de la API de utilidades mediante Postman, mostrando una respuesta exitosa.",
          "Email Send History ": "Vista del dashboard mostrando el registro e historial de los correos procesados y enviados.",
          "emails send successfully": "Confirmación visual de correos entregados exitosamente desde el sistema de envío por lotes."
        }
      }
    },
    experience: {
      eyebrow: "04 / Experiencia",
      title: "Un camino a través de la ingeniería y el soporte.",
      education: "05 / Educación",
      educationTitle: "Universidad Tecnológica de El Salvador (UTEC)",
      educationSubtitle: "Licenciatura en Ingeniería de Sistemas Computacionales · 2021 – Presente · Graduación esperada 2027",
      jobs: [
        {
          company: "MOPT (Ministerio de Obras Públicas y Transporte)",
          role: "Técnico Programador Analista",
          period: "Jul 2024 — Presente",
          desc: "Desarrollo de software institucional: formularios web, APIs backend, bases de datos SQL, despliegue en IIS, control de versiones GitHub/TortoiseSVN, cumplimiento de ciberseguridad.",
        },
        {
          company: "Direct English",
          role: "Coach de Inglés",
          period: "Feb 2024 — Jul 2024",
          desc: "Coaching de inglés en línea en toda América Latina. Habilidades avanzadas de comunicación y enseñanza.",
        },
        {
          company: "Concentrix",
          role: "Soporte IT — HP SmartFriend",
          period: "Mar 2022 — Feb 2024",
          desc: "Resolución de problemas complejos de software para aplicaciones privadas. Soporte técnico bilingüe.",
        },
        {
          company: "Teleperformance",
          role: "Soporte Técnico — Choice Hotels Property",
          period: "Ene 2022 — Mar 2022",
          desc: "Soporte de propiedad para Choice Hotels.",
        },
      ],
    },
    contact: {
      eyebrow: "06 / Contacto",
      title: "Construyamos algo juntos.",
      description: "Disponible para proyectos interesantes y oportunidades remotas. Envíame un mensaje y te responderé lo antes posible.",
      email: "Correo",
      github: "GitHub",
      linkedin: "LinkedIn",
      nameLabel: "Tu Nombre",
      emailLabel: "Correo Electrónico",
      subjectLabel: "Asunto",
      messageLabel: "Mensaje",
      sendButton: "Enviar Mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado! Te responderé pronto.",
      error: "Algo salió mal. Por favor intenta de nuevo.",
      formTitle: "Enviar un Mensaje",
    },
  },
};
