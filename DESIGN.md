---
name: Instrument Panel Portfolio
description: A dark, calibrated control surface for a robotics & software engineer — each section a readout lit by its own signal color.
colors:
  bg: "#0D0D11"
  card: "#131318"
  card-hover: "#1A1A22"
  border: "#1E1E28"
  border-hover: "#2C2C3C"
  faint: "#23232E"
  ink: "#E6E6EE"
  muted: "#54546A"
  signal-steel: "#5B88BC"
  signal-copper: "#C07840"
  signal-sage: "#5A9E7E"
  signal-indigo: "#9080D0"
  signal-amber: "#C4A840"
  status-green: "#5CC47A"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 3.2rem)"
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.55vw, 1.22rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.028em"
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  sm: "5px"
  md: "10px"
  lg: "16px"
  pill: "20px"
spacing:
  gap: "12px"
  card-pad: "28px"
  page-pad: "36px"
components:
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-pad}"
  card-hover:
    backgroundColor: "{colors.card-hover}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  tag:
    textColor: "{colors.signal-steel}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  badge-done:
    backgroundColor: "#0C1C1A"
    textColor: "{colors.signal-sage}"
    rounded: "{rounded.pill}"
    padding: "2px 7px"
  badge-wip:
    backgroundColor: "#1C1008"
    textColor: "{colors.signal-copper}"
    rounded: "{rounded.pill}"
    padding: "2px 7px"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
---

# Design System: Instrument Panel Portfolio

## 1. Overview

**Creative North Star: "The Instrument Panel"**

This is a dark, calibrated control surface, not a marketing page. The home view is a bento grid of readouts — each section (Projects, About, Work, Contact) is a discrete panel lit by its own signal color: steel-blue for engineering, copper for the personal narrative, indigo for the career timeline, sage for outreach. The interface behaves like well-instrumented hardware: monospaced labels, a pulsing "open to work" status LED, a git-tree career timeline, honest `completed` / `ongoing` badges. Nothing decorates; everything reports.

The mood is precise, dark, and calm, with the work front and center. Color is rare and meaningful — the near-black field (`#0D0D11`) holds, and the signal hues appear only where they carry information or respond to touch. Components are **tactile and responsive**: surfaces sit flat at rest, then lift, glow, and shift on hover, so the panel feels alive under the cursor without ever animating for spectacle. Type does the heavy lifting — a tight geometric sans for presence, a mono for the instrumentation voice.

This system explicitly rejects the flashy, over-animated portfolio (no scroll-jacking, no particle fields), the cute or emoji-driven tone, the generic dev-template (no stock hero, no skills progress bars, no identical project-card grid), and cold templated SaaS-marketing energy. Restraint here is the argument: an engineer who doesn't need to shout.

**Key Characteristics:**
- Near-black bento grid of self-contained, single-purpose panels
- One signal color per panel; color is information, not decoration
- Monospace as the instrumentation voice (labels, metadata, status)
- Flat at rest, tactile on hover — glow and lift earned by interaction
- Honest status reporting (live LED, completed/ongoing badges, git-tree timeline)

## 2. Colors

A near-black instrument field carrying a small set of muted signal hues, each assigned to a function.

### Primary
- **Signal Steel** (#5B88BC): The engineering blue. Carries the Projects panel (top accent bar, hover glow), the ROS2/C++ tech tags, and the 7DOF manipulation slide. The default "this is technical work" voice.

### Secondary
- **Signal Copper** (#C07840): Warm counterpoint to the steel. Carries the About panel and the personal-narrative slide (Sudoku). Used where the story turns human rather than mechanical.
- **Signal Sage** (#5A9E7E): The autonomy/outreach green. Carries the AMR slide, the Contact hover, and the active "now" node in the work timeline.
- **Signal Indigo** (#9080D0): The career/timeline accent. Carries the Work & Education panel and MoveIt2-class tags.

### Tertiary
- **Signal Amber** (#C4A840): Reserved for "currently excited by" topic tags — the speculative, forward-looking register.
- **Status Green** (#5CC47A): Functional only. The pulsing "open to work" LED. Never used as a surface or text color.

### Neutral
- **Ink** (#E6E6EE): Primary text, headings, and the active hover state of muted elements. The brightest thing on the page after the signals.
- **Muted** (#54546A): Monospace labels, metadata, captions, secondary copy. A cool blue-gray.
- **Field** (#0D0D11): The body background. The dark the whole system reads against.
- **Card** (#131318) / **Card Hover** (#1A1A22): Panel surfaces, one step lifted off the field, lifting again on hover.
- **Border** (#1E1E28) / **Border Hover** (#2C2C3C): Hairline panel strokes and the git-tree trunk.
- **Faint** (#23232E): The resting arrow glyph and other near-invisible UI furniture that only resolves on hover.

### Named Rules
**The One Signal Rule.** Each panel speaks in exactly one signal color. Steel, copper, sage, indigo — never two on the same surface. The signal is the panel's identity; mixing them turns a readout into a swatch sampler.

**The Color-Is-Information Rule.** Saturated color only appears where it reports something: a section's identity, a tech-stack tag, a live status, a hover response. Decorative color on the resting field is forbidden. If a hue isn't carrying meaning, it's wrong.

## 3. Typography

**Display Font:** Space Grotesk (with system-ui, sans-serif fallback)
**Body Font:** Space Grotesk (same family, lighter weights)
**Label/Mono Font:** Space Mono (with monospace fallback)

**Character:** A single geometric sans carries both display and body via weight contrast (600 down to 300), paired against a true monospace for all instrumentation. The mono is the panel's machine voice — labels, dates, status, counts — while Space Grotesk is the human voice. This is a deliberate, committed pairing (display + mono on a contrast axis), not a reflex; identity-preservation keeps it even though both are common defaults.

### Hierarchy
- **Display** (600, clamp(2rem → 3.2rem), 1.0, -0.03em): The hero name on the home view. Tight, set in two stacked lines.
- **Headline** (600, clamp(2.4rem → 4rem), 1.0, -0.04em): Sub-page titles ("About me.", project titles). The most compressed letter-spacing in the system.
- **Title** (600, clamp(1rem → 1.22rem), 1.18, -0.028em): Project-slide titles inside the carousel.
- **Body** (400, clamp(0.95rem → 1.15rem), 1.45): Panel descriptions and narrative paragraphs. Capped at ~40ch on cards, 52–65ch in long-form prose.
- **Label** (400, 9–12px, 0.04–0.16em, lowercase or UPPERCASE): Space Mono. Section labels, metadata, dates, counts, status text. Lowercase for soft labels ("projects"), uppercase + wide tracking for structural markers ("WORK", "EDUCATION").

### Named Rules
**The Mono-Is-Instrumentation Rule.** Space Mono is reserved for machine-voice data: labels, dates, counts, status, tags. It is never used for sentences or narrative. Prose is always Space Grotesk. Mono carrying a full sentence reads as costume, not instrument.

**The Two-Line Name Rule.** The hero name stacks on two lines at -0.03em. Display type stays ≤ ~3.2rem; the page reports, it doesn't shout.

## 4. Elevation

The system is **flat by default with tonal layering**, not drop-shadows. Depth at rest comes from three near-black steps — field (`#0D0D11`) → card (`#131318`) → card-hover (`#1A1A22`) — plus hairline borders. Shadows exist only as a **hover response**, and they are colored: each panel casts a soft glow in its own signal hue (steel, copper, indigo, sage) rather than a neutral drop-shadow. This is the tactile-responsive feel — the panel lifts toward you in its own light.

### Shadow Vocabulary
- **Signal glow — strong** (`box-shadow: 0 0 0 1px rgba(91,136,188,0.14), 0 12px 40px rgba(91,136,188,0.07)`): Projects/About/Work panels on hover. Swap the rgb for the panel's signal hue.
- **Signal glow — soft** (`box-shadow: 0 0 0 1px rgba(90,158,126,0.08), 0 8px 24px rgba(90,158,126,0.04)`): Contact panel and lighter-weight surfaces on hover.
- **LED bloom** (`box-shadow: 0 0 0 1.5px rgba(90,158,126,0.5), 0 0 10px rgba(90,158,126,0.55)`): The live "now" node in the work timeline and the status dot — a literal glowing indicator.

### Named Rules
**The Colored-Shadow Rule.** Hover shadows are never neutral black. They glow in the panel's own signal color at low alpha (0.04–0.14). A gray drop-shadow on this field reads as a 2014 app; the glow is what makes the surface feel instrumented.

**The Flat-At-Rest Rule.** Surfaces carry no shadow until interacted with. Resting depth is tonal (the three near-blacks) and stroke-based (hairline borders) only.

## 5. Components

### Cards (Panels)
- **Character:** Self-contained readouts. Flat at rest, tactile on hover.
- **Corner Style:** Generous 16px radius (`{rounded.lg}`).
- **Background:** `#131318` at rest → `#1A1A22` on hover.
- **Border:** 1px `#1E1E28` → `#2C2C3C` on hover.
- **Shadow Strategy:** None at rest; signal-colored glow on hover (see Elevation).
- **Internal Padding:** 28px.
- **Signature detail:** A 2px signal-colored gradient bar across the panel's top edge (`linear-gradient(90deg, <signal>, transparent)`), plus a near-invisible noise texture overlay at 1.8% opacity. The corner arrow (`↗`) sits at `faint` and resolves to `ink` with a 2px nudge on hover.

### Tags
- **Style:** Mono, 10px, lowercase, 5px radius, 4–10px padding. Tinted-dark fill + signal text + signal-tinted border, color-matched per stack role: green (#5CA899 on #0C1C1A), amber (#C07840 on #1C1008), purple (#9080D0 on #141028), blue (#5B88BC on #0D1624), yellow (#C4A840 on #181500).
- **State:** Static; they label, they don't toggle.

### Badges
- **Done** (`completed`): Sage text (#5CA899) on #0C1C1A, pill radius, 1px sage-tinted border.
- **WIP** (`ongoing`): Copper text (#C07840) on #1C1008, pill radius, 1px copper-tinted border.
- **Rule:** Status is reported honestly. An in-progress project says `ongoing`; never inflate it to `completed`.

### Navigation
- **Style:** Sticky top bar, `rgba(12,12,12,0.9)` with 12px backdrop-blur and a 1px bottom border. Mono links at `muted`, resolving to `ink` on hover. Logo left, "← back" right.

### Status LED
- **Style:** A 7px green dot (#5CC47A) with an infinite 2.4s `ping` ring expanding to 2.8× and fading. Paired with lowercase mono "open to work". The one piece of ambient, always-on motion in the system — it reads as a live indicator, not decoration.

### Project Carousel (Signature Component)
- **Character:** One-at-a-time swipe carousel of full-bleed project photos, each graded into the dark palette (grayscale/contrast/brightness filter) under a left-to-right signal-colored scrim so overlaid text stays legible. A large ghosted mono project number (01/02/03) sits behind the title. Photo scales 1.04× and the grade lifts on hover. Navigation via expanding pill dots (5px → 18px, active brighter). Image-grade transitions use `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint) over 600ms.
- **Note:** The 01/02/03 numbering is legitimate here — it's a real ordered sequence of three projects, not decorative section scaffolding.

### Git-Tree Timeline (Signature Component)
- **Character:** The Work & Education panel renders career history as a vertical git tree: a 1.5px gradient trunk with circular commit nodes (diamond nodes, rotated 45°, for education). The current role's node glows sage (the LED bloom). Roles in Space Grotesk, companies/dates in mono.

## 6. Do's and Don'ts

### Do:
- **Do** keep each panel to one signal color (steel / copper / sage / indigo). Color is the panel's identity — see The One Signal Rule.
- **Do** use Space Mono only for machine-voice data: labels, dates, counts, status, tags. Narrative is always Space Grotesk.
- **Do** keep surfaces flat at rest and earn depth on hover with a signal-colored glow at low alpha (0.04–0.14), never a neutral black shadow.
- **Do** report status honestly — `ongoing` for in-progress work, the live LED only when genuinely open to work.
- **Do** keep the hero name ≤ ~3.2rem on two stacked lines; the page reports, it doesn't shout.
- **Do** grade any project photo into the dark palette (grayscale + reduced brightness) under a signal scrim so overlaid text stays legible.

### Don't:
- **Don't** ship the flashy / over-animated portfolio — no scroll-jacking, particle fields, or gimmicky motion competing with the work. The only always-on motion is the status LED.
- **Don't** go cute or emoji-heavy; nothing that undercuts technical seriousness.
- **Don't** fall into the generic dev-template — no stock hero, no skills progress bars, no identical icon+heading+text card grid.
- **Don't** import cold, templated SaaS-marketing energy (blue-gradient hero, hero-metric template) with no person behind it.
- **Don't** use saturated color decoratively on the resting field. If a hue isn't carrying information, remove it — see The Color-Is-Information Rule.
- **Don't** set body or narrative copy in `muted` (#54546A); reserve it for short mono labels. Long copy belongs in `ink` (#E6E6EE) to clear WCAG AA on the dark field.
- **Don't** use gradient text, decorative glassmorphism, or a colored `border-left` stripe as an accent — the panel's top signal bar and colored hover-glow are the sanctioned accents.
