# Walking Skeleton — Phase 1: Shell, Brand & Onboarding

> Architectural decisions locked here. Subsequent phases build on these without renegotiation.

---

## Stack Decisions

| Layer | Decision | Rationale |
|-------|----------|-----------|
| Framework | Next.js 15 (App Router) | Project requirement — modern RSC, file-based routing |
| Language | TypeScript (strict) | Type safety across state, props, localStorage |
| Styling | Tailwind CSS v3 + shadcn/ui | Project requirement — design tokens via CSS vars |
| State | Zustand (no devtools in prod) | Lightweight, localStorage-friendly, no backend |
| Persistence | localStorage only | No backend per project decision |
| Font | Plus Jakarta Sans via `next/font/google` | Brand requirement |
| Icons | Lucide React (bundled with shadcn) | No extra dependency |
| Confetti | canvas-confetti | Celebration screen animation |
| Package manager | npm | Default Next.js CLI |

---

## Directory Layout

```
src/
  app/
    (onboarding)/          # Route group — no shared layout with main app
      page.tsx             # Splash screen (auto-redirect root)
      welcome/
        page.tsx           # Welcome screen
      step/
        [step]/
          page.tsx         # Steps 1–5 (dynamic segment)
      celebration/
        page.tsx           # Celebration screen
    (main)/                # Route group — has bottom nav layout
      layout.tsx           # Bottom navigation shell
      home/
        page.tsx           # Home placeholder (Phase 2 builds this out)
      aufgaben/
        page.tsx           # Placeholder
      vertraege/
        page.tsx           # Placeholder
      entdecken/
        page.tsx           # Placeholder
      ich/
        page.tsx           # Placeholder
    layout.tsx             # Root layout — font, metadata, globals
    globals.css            # Tailwind directives + CSS variable tokens
  components/
    onboarding/            # Onboarding-specific components
      StepIndicator.tsx
      TileSelect.tsx
      ToggleList.tsx
      WeiterButton.tsx
    nav/
      BottomNav.tsx
    ui/                    # shadcn-generated components land here
  store/
    onboardingStore.ts     # Zustand store with localStorage persistence
  types/
    onboarding.ts          # OnboardingData interface
  lib/
    utils.ts               # shadcn utility (cn helper)
tailwind.config.ts         # Brand tokens wired
components.json            # shadcn config
```

---

## Routing Architecture

| URL | Screen | Route Group |
|-----|--------|-------------|
| `/` | Splash (auto-redirect to `/welcome` after 1500ms) | `(onboarding)` |
| `/welcome` | Welcome screen | `(onboarding)` |
| `/step/1` | Onboarding Step 1 — Umzugsdatum | `(onboarding)` |
| `/step/2` | Onboarding Step 2 — Wohin? | `(onboarding)` |
| `/step/3` | Onboarding Step 3 — Umzugsorganisation | `(onboarding)` |
| `/step/4` | Onboarding Step 4 — Priorität | `(onboarding)` |
| `/step/5` | Onboarding Step 5 — Hast du bereits? | `(onboarding)` |
| `/celebration` | Celebration screen | `(onboarding)` |
| `/home` | Home (placeholder → Phase 2) | `(main)` |
| `/aufgaben` | Aufgaben placeholder | `(main)` |
| `/vertraege` | Verträge placeholder | `(main)` |
| `/entdecken` | Entdecken placeholder | `(main)` |
| `/ich` | Ich placeholder | `(main)` |

Route groups (`(onboarding)` and `(main)`) share no layout. The `(main)` group has a shared `layout.tsx` that renders `BottomNav` below all tab content.

---

## State Architecture

```typescript
// src/types/onboarding.ts
interface OnboardingData {
  moveDate: string | null;        // ISO date string "YYYY-MM-DD"
  targetPlz: string;              // "80331"
  fromCity: string;               // "Hamburg"
  movingOrg: 'alleine' | 'freunde' | 'firma' | 'gemischt' | null;
  priority: 'guenstig' | 'schnell' | 'stressfrei' | 'nachhaltig' | null;
  alreadyDone: {
    newApartment: boolean;
    transport: boolean;
    electricityInternet: boolean;
    ummeldungPrepared: boolean;
  };
  completed: boolean;
}

// src/store/onboardingStore.ts — Zustand with localStorage
// Key: 'wone-onboarding'
// Reads on init, writes on every field update
```

---

## End-to-End Proof Points (Walking Skeleton Completeness)

The skeleton is complete when all five proof points hold simultaneously:

1. **Next.js scaffold** — `npm run dev` starts without errors on port 3000
2. **shadcn wired** — `components.json` exists, `src/components/ui/button.tsx` exists
3. **Brand tokens** — `tailwind.config.ts` contains `#646efb` as primary color, `globals.css` has CSS variables for all 5 brand colors
4. **Routing skeleton** — visiting `/`, `/welcome`, `/step/1`, `/home` each returns a valid React component (no 404)
5. **State read/write** — Step 1 "Weiter" button saves `moveDate` to Zustand store, value persists in localStorage key `wone-onboarding` after page reload

All five must pass before Wave 2 plans execute.

---

## Deployment Target

Development only for Phase 1. `npm run dev` on localhost:3000. No Vercel/production deployment in this phase.

---

## Constraints Carried Forward

- No backend — localStorage is the only persistence mechanism for all phases
- German language throughout — all copy in German
- Mobile-first — 375px primary viewport; max content width 480px centered
- shadcn components only from official registry — no third-party registries
- `canvas-confetti` is the only non-shadcn UI dependency added in Phase 1
