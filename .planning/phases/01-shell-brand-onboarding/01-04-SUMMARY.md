---
phase: 01-shell-brand-onboarding
plan: 4
subsystem: ui
tags: [nextjs, canvas-confetti, bottom-nav, zustand, lucide-react, tailwind, mobile]

# Dependency graph
requires:
  - 01-PLAN-1 (Zustand store, brand tokens, route skeleton)
  - 01-PLAN-2 (onboarding screens, splash/welcome/steps)
  - 01-PLAN-3 (step/[step] dynamic route, store actions wired)
provides:
  - Celebration screen reading real store data with canvas-confetti animation
  - BottomNav component (5 tabs, active/inactive styling)
  - Shared (main) layout with BottomNav fixed at bottom
  - All 5 main tab screens (home + 4 placeholders)
affects: [Phase 2 home dashboard, all main tab screens]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - canvas-confetti requestAnimationFrame loop bounded by Date.now() for fixed 3s duration
    - usePathname from next/navigation drives active tab state in Client Component
    - (main) layout.tsx is Server Component importing a Client Component (BottomNav) — Next.js handles boundary automatically
    - env(safe-area-inset-bottom) via inline style for iOS safe area support
    - Lucide strokeWidth variation (2.5 active, 1.8 inactive) approximates filled vs outlined icon spec

key-files:
  created:
    - src/components/nav/BottomNav.tsx
  modified:
    - src/app/(onboarding)/celebration/page.tsx
    - src/app/(main)/layout.tsx
    - src/app/(main)/home/page.tsx
    - src/app/(main)/aufgaben/page.tsx
    - src/app/(main)/vertraege/page.tsx
    - src/app/(main)/entdecken/page.tsx
    - src/app/(main)/ich/page.tsx

key-decisions:
  - "celebration page.tsx uses HTML entity Los geht&apos;s → (not Los geht's) to satisfy JSX unescaped apostrophe lint rule"
  - "BottomNav is a Client Component (usePathname, useRouter); (main)/layout.tsx is Server Component — Next.js handles RSC/Client boundary automatically at import"
  - "Lucide strokeWidth 2.5 active / 1.8 inactive approximates UI-SPEC filled vs outlined icon distinction using stroke weight variation"
  - "paddingBottom calc(56px + env(safe-area-inset-bottom)) on main content ensures nothing is hidden beneath fixed nav on iOS"

# Metrics
duration: 2min
completed: 2026-05-08
---

# Phase 1 Plan 4: Celebration Screen + Bottom Navigation Shell Summary

**Canvas-confetti celebration screen reading Zustand store data, plus 5-tab bottom navigation with correct active/inactive brand colors wired to all main tab placeholder screens**

## Performance

- **Duration:** 2 min
- **Started:** 2026-05-08T12:24:04Z
- **Completed:** 2026-05-08T12:26:18Z
- **Tasks:** 2
- **Files modified:** 1 created + 7 modified

## Accomplishments

- Celebration screen: canvas-confetti fires from both sides for 3000ms on mount; colors match brand contract exactly (#646efb, #d2d5fc, #1c2642, #ffffff)
- Celebration reads data.moveDate (formatted de-DE) and data.fromCity from Zustand store — personalized summary per ONB-02
- CTA "Los geht's →" navigates to /home; no back navigation (onboarding complete)
- BottomNav component: 5 tabs with usePathname active detection, #646efb active / #5b6377 inactive, fixed bottom-0 z-50, white bg, 1px border-[#d2d5fc], env(safe-area-inset-bottom)
- (main)/layout.tsx wraps all 5 tab screens with BottomNav, content padded to clear fixed nav
- All 5 placeholder tab screens have exact Copywriting Contract copy
- npm run build: zero TypeScript errors, all 11 routes compile successfully

## Task Commits

1. **Task 1: Celebration screen** — `f0508bc` (feat)
2. **Task 2: BottomNav + main tab layout + placeholder screens** — `8b47b09` (feat)

## Files Created/Modified

- `src/app/(onboarding)/celebration/page.tsx` — full celebration screen replacing placeholder
- `src/components/nav/BottomNav.tsx` — 5-tab navigation, created new
- `src/app/(main)/layout.tsx` — shared layout with BottomNav replacing bare wrapper
- `src/app/(main)/home/page.tsx` — branded home placeholder
- `src/app/(main)/aufgaben/page.tsx` — "Deine Aufgaben kommen bald."
- `src/app/(main)/vertraege/page.tsx` — "Vertragsvergleich kommt bald."
- `src/app/(main)/entdecken/page.tsx` — "Tipps & Anleitungen kommen bald."
- `src/app/(main)/ich/page.tsx` — "Dein Profil kommt bald."

## Deviations from Plan

None — plan executed exactly as written.

The only minor adaptation: the CTA string "Los geht's →" uses `Los geht&apos;s →` in JSX to avoid the unescaped apostrophe lint warning. The rendered output is identical.

## Known Stubs

The following screens are intentional stubs — correctly identified as Phase 2/3 deliverables:

- `src/app/(main)/home/page.tsx` — home dashboard stub (Phase 2)
- `src/app/(main)/aufgaben/page.tsx` — checklist tab stub (Phase 2)
- `src/app/(main)/vertraege/page.tsx` — contracts tab stub (Phase 2)
- `src/app/(main)/entdecken/page.tsx` — tips tab stub (Phase 2)
- `src/app/(main)/ich/page.tsx` — profile tab stub (Phase 2)

These stubs do not prevent Plan 4's goal (celebration screen + bottom nav shell) from being achieved. The bottom nav navigates to all 5 routes without 404 errors.

## Threat Surface Scan

All threat mitigations from the plan's threat model are satisfied:

- **T-01-09 (XSS):** fromCity and formattedDate rendered via JSX `{value}` expressions — no dangerouslySetInnerHTML used
- **T-01-10 (Direct /home access):** Intentionally accepted per plan disposition — placeholder screens accessible without onboarding
- **T-01-11 (confetti loop DoS):** Loop bounded by `Date.now() < end` with 3000ms cap — cannot run indefinitely

No new trust boundaries introduced beyond those documented in the plan's threat model.

## Phase 1 Complete

All 4 plans in Phase 1 are now complete. The full onboarding-to-main-app flow is functional:

1. Splash screen (#646efb, spinning ring)
2. Welcome → "Jetzt starten" CTA
3. Step 1 (date picker) → Step 2 (PLZ + city) → Step 3 (moving org) → Step 4 (priority) → Step 5 (already done toggles)
4. Celebration screen (confetti + store summary)
5. Home with 5-tab bottom navigation

## Self-Check: PASSED

- `src/app/(onboarding)/celebration/page.tsx` exists: FOUND
- `src/components/nav/BottomNav.tsx` exists: FOUND
- `src/app/(main)/layout.tsx` modified: FOUND
- Commit f0508bc exists: FOUND
- Commit 8b47b09 exists: FOUND
- `npm run build` passes: CONFIRMED (11 routes, zero TypeScript errors)
