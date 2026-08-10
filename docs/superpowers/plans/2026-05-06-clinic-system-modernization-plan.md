# Implementation Plan: Clinic Management System Modernization

**Goal**: Implement a professional 3D-tilting carousel for the Clinic Management System in the portfolio.

## Phase 1: Preparation
- [ ] Verify image paths in `src/img/`.
- [ ] Identify necessary React hooks (`useState`, `useEffect`) and Framer Motion (if already in project) or CSS transitions.

## Phase 2: Component Development
- [ ] **Task 2.1: Create `ProjectGallery` component**
  - Implement state for image cycling.
  - Implement auto-play with pause-on-hover.
  - Add fade transitions using Tailwind/CSS.
- [ ] **Task 2.2: Create `TiltFrame` logic**
  - Implement mouse tracking on the `BrowserFrame`.
  - Calculate `rotateX` and `rotateY` based on mouse position relative to center.
  - Add smooth transition back to neutral state on mouse leave.

## Phase 3: Integration in `Projects.tsx`
- [ ] **Task 3.1: Update `projects` data array**
  - Update Project 02 (Clinic) name, stack, and bullets.
- [ ] **Task 3.2: Modify `mockFor` function**
  - Replace `MockClinic` with the new `ProjectGallery` populated with the 11 screenshots.
- [ ] **Task 3.3: Apply `TiltFrame` to the Clinic card**
  - Wrap the `BrowserFrame` or modify it to support the 3D effect.

## Phase 4: Polish & Validation
- [ ] Adjust transition timing (0.8s fade, 5s interval).
- [ ] Refine tilt sensitivity (max 5-10 degrees).
- [ ] Verify responsiveness on mobile (tilt should be disabled or limited on touch).
- [ ] Run `npm run lint` and verify build.
