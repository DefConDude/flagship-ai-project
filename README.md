# Credit Assist — Project Showcase

A sleek, animated single-page showcase for the **Credit Assist AI Agent** (commercial-banking AI, client details generalised).
Built as a portfolio piece to demonstrate a modern, award-style front end: a custom three.js hero,
a cohesive brand design system, smooth motion, and a fully typed, schema-validated content model.

> **Live demo:** https://defcondude.github.io/flagship-ai-project/

![Credit Assist showcase hero](public/images/jacques-van-heerden.jpg)
<!-- Replace the line above with a real screenshot of the hero once deployed. -->

---

## Highlights

- **Custom three.js hero orb** — a finely divided icosphere displaced by layered sine waves in a
  GLSL vertex shader (organic ripple, no noise library), with a fragment shader that blends brand
  purple↔blue, fades the shadow side to navy, and adds a turquoise fresnel rim. Two orbiting
  "data source" cards (SharePoint + credit data) are drawn at runtime on a 2D canvas — no image assets —
  and always face the camera. Sparkles, mouse-tilt parallax, offscreen pause, reduced-motion still
  frame, and a CSS-glow fallback when WebGL is unavailable.
- **Design system** — navy base with plum / purple / azure / turquoise accents, soft glow,
  procedural grain texture, animated gradient text. Light + dark themes (persisted, no flash).
- **Typed, validated content** — every piece of copy lives in one `src/data/content.ts` object,
  validated with **Zod** at load, so the content shape can't silently drift.
- **Accessible, composable UI** — **Radix UI** primitives (`Label`, `Slot`) and a CVA-driven button.

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) · React 19 · TypeScript |
| Styling | Tailwind CSS (custom theme) |
| 3D | three.js (plain, no wrapper) |
| UI primitives | Radix UI (`react-label`, `react-slot`) + class-variance-authority |
| Validation | Zod |
| Fonts | Sora (headings) · Inter (body) |

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, ThemeProvider, pre-paint theme script
│   ├── page.tsx            # assembles the sections
│   └── globals.css         # theme tokens + glow / grain / gradient utilities
├── components/
│   ├── HeroCanvas.tsx      # the three.js hero orb + data-source cards
│   ├── Navbar.tsx          # sticky glass nav + theme toggle
│   ├── ThemeProvider.tsx   # dark / light theme context
│   ├── Reveal.tsx          # scroll-reveal animation wrapper
│   ├── StatCounter.tsx     # count-up stat
│   ├── SectionHeading.tsx  # shared heading (Radix Label)
│   ├── Icon.tsx            # inline SVG icon set
│   ├── ui/Button.tsx       # CVA + Radix Slot button
│   └── sections/           # Hero, About, Steering, Timeline, Architecture,
│                           #   Lessons, Team, Status, Footer
├── data/content.ts         # Zod-validated single source of truth for all content
└── lib/utils.ts            # cn() class-merge helper
```

## Editing Content

Everything the page displays — hero copy, stats, timeline, architecture flows, team, status — is in
`src/data/content.ts` and validated by Zod on load. Team cards show roles only, apart from the author.

## Deploying

The easiest path is **Vercel**: import this repo, accept the Next.js defaults, deploy. No environment
variables are required. Any static/Node host that runs `next build` + `next start` also works.

## Legacy

The original hand-written static site (`legacy/index.html`, `styles.css`, `script.js`) is kept under
`legacy/` for reference. The Next.js app supersedes it.

---

Built with Next.js, three.js, and an unreasonable amount of YAML.
