# Spec: Clinic Management System Modernization

**Topic**: Modernizing the "Selected Work" section for the MOPT Clinic System using real screenshots and high-end interactive effects.
**Date**: 2026-05-06
**Status**: Draft

## 1. Overview
The goal is to replace the current static mock for the "Clinic Management System" in the portfolio with a dynamic, professional showcase featuring 11 real screenshots. The presentation will use a 3D tilt effect and an automated smart-fading carousel.

## 2. Goals & Success Criteria
- **Visual WOW Factor**: The project card must feel premium, reactive, and high-end.
- **Content Breadth**: Effectively showcase all 11 images without cluttering the UI.
- **Technical Accuracy**: Update the project metadata (stack, bullets) to match the real implementation details shown in the screenshots.
- **Privacy**: Ensure internal system images are presented in a way that highlights the "product" rather than raw data (though the user has provided the images already).
1pr
## 3. Implementation Details

### 3.1 Components
- **`ProjectGallery`**: A new React component to be integrated into `Projects.tsx`.
  - Props: `images: string[]`, `interval: number`.
  - State: `currentIndex` (tracks active image).
  - Logic: `useEffect` with `setInterval` to cycle images. Pause on hover.
  - Animation: CSS `transition: opacity 0.8s ease-in-out`.
- **`TiltFrame` (Enhancement to `BrowserFrame`)**:
  - Adds mouse-tracking logic.
  - Applies `transform: perspective(1000px) rotateX(...) rotateY(...)`.
  - Adds a dynamic "shine" overlay that moves with the mouse.

### 3.2 Assets
Images located in `src/img/`:
1. `Inicio.png`
2. `Dashboard.png`
3. `Gestion de recetas.png`
4. `Creacion de nueva receta.png`
5. `Inventario Medicamento.png`
6. `Gestion de lotes.png`
7. `Crear nuevo lote.png`
8. `Consulta de empleados.png`
9. `Gestion de lista de compras.png`
10. `Agregar medicamento a la lista de compras.png`
11. `Modal crear medicamento + Lote.png`

### 3.3 Metadata Update (Clinic Management System)
- **Stack**: C#, .NET MVC, MS SQL Server, Alpine.js, Tailwind CSS, JWT.
- **Bullets**:
  - Complete Pharmacy Lifecycle: From lot management and expiration tracking to automated purchase lists.
  - Integrated Prescription System: Real-time creation, validation, and issuance of medical prescriptions.
  - Staff & Patient Dashboard: Centralized view of medical metrics, patient intake, and daily operational status.
  - Multi-Module Architecture: Scalable system handling medical records, inventory, and administrative security roles.

## 4. User Approval Required
- [ ] Approval of the "Cross-fade" transition style.
- [ ] Approval of the "3D Tilt" sensitivity.
- [ ] Final list of technical bullets.
