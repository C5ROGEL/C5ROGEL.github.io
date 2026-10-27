---
target: portfolio (Index.tsx)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-10-27T15-13-33Z
slug: src-pages-index-tsx
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Contact form status is clear; gallery autoplay/pause state is invisible |
| 2 | Match System / Real World | 3 | Browser-chrome mockups and terminal motifs fit a dev portfolio |
| 3 | User Control and Freedom | 2 | No way to pause hero animations; language toggle label shows target, not current, language |
| 4 | Consistency and Standards | 3 | Section numbering mostly consistent, minor overload as pseudo-IA |
| 5 | Error Prevention | 3 | Zod validation on contact form, inline errors present |
| 6 | Recognition Rather Than Recall | 3 | Navbar persists; toggle icons have no text label |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode showcase site, not a power-user tool |
| 8 | Aesthetic and Minimalist Design | 2 | Hero stacks 5+ simultaneous animations on first paint, over-decorated |
| 9 | Error Recovery | 3 | Form errors are field-specific and clear |
| 10 | Help and Documentation | n/a | Portfolio surface, self-explanatory by convention |
| **Total** | | **22/32** | **Acceptable-to-Good (69%)** |

# Design Specificity Verdict

**LLM assessment**: Content layer is clearly authored for Cesar specifically: real MOPT government project names, real screenshots (DTE invoicing, clinic/pharmacy system, cinema booking, PingMonitor), real stack details per project, real WhatsApp/CV/contact links, full bilingual ES/EN copy with El Salvador-specific institutional terms. The chrome around that content (typewriter name animation, floating particles, tilt-on-hover browser-frame mockups, "Transmission Log" terminal motif) is assembled from recognizable "AI-portfolio" tropes. Net: bespoke, credible content wrapped in template-grade motion design.

**Deterministic scan**: 2 findings, both "slop" category, both warning/advisory severity:
- `gradient-text` at `src/components/portfolio/Hero.tsx:156` (bg-clip-text gradient heading)
- `codex-grid-background` at `src/index.css:124` (two-axis grid-line background)

Neither is a false positive mechanically, both patterns are literally present. The grid background may be intentional given the site's terminal/CLI theme; flagged for human judgment rather than an automatic fix.

**Visual overlays**: no browser injection run this pass; browser evidence came from direct screenshot/console/network inspection instead, not the detect.js overlay script.

# Overall Impression

A portfolio with genuinely strong, differentiated substance (real production screenshots, full bilingual coverage, solid form engineering) undercut by a hero section that over-performs and a few shipped rough edges (inverted language-toggle label, one untranslated string, a mobile overlap, a hardcoded API key). The biggest opportunity: let the real screenshots and real projects carry the first impression instead of animation density.

# What's Working

- **Projects section content depth**: per-project real screenshot galleries with bilingual captions, fake-URL browser chrome tied to each project's actual domain (`factura.mopt.gob.sv/dte/ccf`), specific and credible, well above template-portfolio norms.
- **Bilingual completeness**: every string, including dozens of gallery captions, is translated both directions, a real investment most portfolios skip.
- **Contact form robustness**: zod + react-hook-form validation, distinct loading/success/error states, playful on-brand "transmission log" status copy without adding risk.

# Priority Issues

**[P1] Hero motion overload competes with first-impression legibility**
- Why it matters: Hero.tsx's AnimatedName stacks letter-float, typewriter, gradient-shimmer, blur-glow, underline-wave, plus 25 floating particles, all firing on load, splitting attention across 6 competing motions in the first 2 seconds, reading as an animation demo rather than a confident intro to a skeptical recruiter.
- Fix: Keep 1-2 motion moments max (name fade-in + typewriter subtitle); drop or defer particles to an idle/secondary state.
- Suggested command: /impeccable quieter

**[P1] Hero CTA row has 4 equal-weight actions, no clear primary path**
- Why it matters: View My Work / Download CV / WhatsApp / Contact Me render as four buttons, only one filled, violates the <=4-choices guidance at the exact moment it matters most; a first-time visitor doesn't know what to do first.
- Fix: Keep "View My Work" as sole filled primary; demote WhatsApp to a small icon-only secondary near Contact.
- Suggested command: /impeccable layout

**[P2] Language toggle shows the target language, not the current one**
- Why it matters: Confirmed in both source review and live browser testing, button reads "ES" while content is English, and "EN" while content is Spanish, both desktop and mobile. Users must infer current state is the complement of the label.
- Fix: Show the current language (or switch to a flag/explicit "Espanol <-> English" dropdown).
- Suggested command: /impeccable clarify

**[P2] Untranslated status string + mobile ScrollToTop overlap**
- Why it matters: "READY FOR TRANSMISSION - LINK STANDBY" in the Contact status strip stays in English regardless of language toggle. Separately, at 375px width the new ScrollToTop button overlaps the "IIS Deployment" tag text in the Skills section.
- Fix: Route that string through t() in LanguageContext; nudge ScrollToTop's mobile position or adjust the Skills tag grid's bottom padding so they don't collide.
- Suggested command: /impeccable harden

**[P2] Hardcoded Web3Forms access key committed in source**
- Why it matters: Contact.tsx:44 has access_key hardcoded in plain text. Domain-restricted so lower risk than a true secret, but still a scrapable credential whose rotation requires a redeploy.
- Fix: Move to a Vite env var (import.meta.env.VITE_WEB3FORMS_KEY).
- Suggested command: /impeccable harden

# Persona Red Flags

**Jordan (First-Timer recruiter, scanning fast)**: Lands on Hero, must parse 4 equal CTA buttons plus a role/company block before finding "View My Work." The typewriter name effect delays legibility of "Cesar Eduardo Rogel Pleites" by ~1-2s, costly for a 5-second scan.

**Casey (Distracted mobile user)**: Hero CTA row (flex-wrap, 4 buttons) wraps to 2-3 rows at 375px, breaking baseline rhythm. AnimatedName's mouse-tilt handler and floating particles deliver zero value on touch but still render/animate, costing battery for pure visual noise. ScrollToTop button overlaps the Skills "IIS Deployment" tag on mobile.

**Riley (Stress tester)**: Project gallery's isOpen/isPaused are separate state flags; rapidly hovering while opening the lightbox could desync the autoplay interval; worth a manual check even though not confirmed broken in this pass.

# Minor Observations

- Stray debug comment "// Re-triggering type inference for portfolio components" left in Index.tsx:2.
- about.stats keys named "years"/"systems" but display ".NET / C#" / "React / APIs", key naming no longer matches content, confusing for future maintenance.
- CV download path has a double space in the filename, fragile if the file is ever renamed.
- t() fallback returns the raw key string if a translation is missing, safe, but would show ugly dotted keys in production if ever missed.
- Theme and language toggles are icon-only with no text label, relying on title attribute alone.
- One benign 206 Partial Content ERR_ABORTED on the Cinema project's video preload, immediately followed by a successful retry, not a real bug.

# Questions to Consider

- What if the Hero dropped every animation except the typewriter subtitle, would visitors convert faster, or does the current version exist to prove animation skill to a developer audience?
- What if the real project screenshots were foregrounded even more, promoted into the Hero itself as a rotating showcase, since that's the most differentiated, non-templated asset on the site?
- What if the four Hero CTAs were tested as one primary + an overflow/secondary row, would WhatsApp/CV see more engagement once no longer competing visually?
