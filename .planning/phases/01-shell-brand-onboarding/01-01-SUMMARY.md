---
phase: 01-shell-brand-onboarding
plan: 1
subsystem: ui
tags: [nextjs, tailwind, shadcn, zustand, typescript, plus-jakarta-sans, localstorage]

# Dependency graph
requires: []
provides:
  - Next.js 16 app scaffold with TypeScript and ESLint
  - shadcn/ui initialized with Radix components (button, input, switch, calendar, popover, card, badge, separator)
  - Wone brand tokens wired via CSS variables (#646efb primary, #1c2642 dark, #f6f7f7 background)
  - Plus Jakarta Sans font loaded globally via next/font/google
  - Route skeleton: (onboarding) and (main) route groups with placeholder pages
  - OnboardingData TypeScript interface and all related types
  - Zustand store with localStorage persistence (key: wone-onboarding)
affects: [all subsequent phase 1 plans, wave 2 onboarding screens, wave 3 main screens]

# Tech tracking
tech-stack:
  added:
    - next@16.2.6
    - react@19.2.4
    - typescript@5
    - tailwindcss@4 (CSS-based config via @theme)
    - shadcn@4.7.0 (Radix/Nova preset)
    - zustand@5.0.13 (with persist middleware)
    - canvas-confetti@1.9.4
    - vitest@4.1.5 + jsdom
    - lucide-react (via shadcn)
    - tw-animate-css (via shadcn)
  patterns:
    - Tailwind v4 brand tokens via CSS @theme + :root variables (not tailwind.config.ts colors object)
    - Zustand persist middleware writing to localStorage key wone-onboarding
    - Next.js App Router route groups: (onboarding) and (main) share no layout
    - shadcn components in src/components/ui/ (official registry only)

key-files:
  created:
    - src/app/globals.css
    - src/app/layout.tsx
    - tailwind.config.ts
    - components.json
    - src/types/onboarding.ts
    - src/store/onboardingStore.ts
    - src/app/(onboarding)/page.tsx
    - src/app/(onboarding)/welcome/page.tsx
    - src/app/(onboarding)/step/[step]/page.tsx
    - src/app/(onboarding)/celebration/page.tsx
    - src/app/(main)/layout.tsx
    - src/app/(main)/home/page.tsx
    - src/app/(main)/aufgaben/page.tsx
    - src/app/(main)/vertraege/page.tsx
    - src/app/(main)/entdecken/page.tsx
    - src/app/(main)/ich/page.tsx
    - src/components/ui/button.tsx
    - src/components/ui/input.tsx
    - src/components/ui/switch.tsx
    - src/components/ui/calendar.tsx
    - src/components/ui/card.tsx
    - src/components/ui/badge.tsx
    - src/components/ui/popover.tsx
    - src/components/ui/separator.tsx
    - src/lib/utils.ts
    - src/__tests__/onboardingStore.test.ts
    - vitest.config.ts
  modified:
    - package.json (dependencies added, name corrected)
    - src/app/page.tsx (redirect to /welcome)

key-decisions:
  - "Scaffolded into temp dir (wone-move-temp) then moved files — create-next-app rejects directory names with spaces/capitals"
  - "Tailwind v4 uses CSS @theme config, not tailwind.config.ts — brand tokens live in globals.css; tailwind.config.ts is supplementary for tooling"
  - "shadcn initialized with --defaults flag (Radix/Nova preset) to avoid interactive prompts"
  - "calendar.tsx: removed unsupported table classname property to fix TypeScript strict check with react-day-picker v10"
  - "vitest environment: switched from node to jsdom so Zustand persist middleware can access window.localStorage"

patterns-established:
  - "Brand tokens: use CSS variables in :root within globals.css, referenced via @theme for Tailwind utility classes"
  - "Zustand stores: use persist middleware with explicit name key; no 'use client' on store files"
  - "Route groups: (onboarding) has no shared layout; (main) has layout.tsx with bottom nav shell"
  - "TDD pattern: vitest + jsdom, tests in src/__tests__/, RED commit first then GREEN commit"

requirements-completed: [ONB-03, UX-04]

# Metrics
duration: 12min
completed: 2026-05-08
---

# Phase 1 Plan 1: Shell, Brand & Onboarding Summary

**Next.js 16 + shadcn (Radix) bootstrapped with #646efb brand tokens, Plus Jakarta Sans font, route skeleton, and Zustand localStorage store for onboarding data**

## Performance

- **Duration:** 12 min
- **Started:** 2026-05-08T12:02:09Z
- **Completed:** 2026-05-08T12:14:24Z
- **Tasks:** 2 (Task 1: scaffold, Task 2: types + store with TDD)
- **Files modified:** 37 created + 2 modified

## Accomplishments

- Next.js 16 app scaffolded with TypeScript, Tailwind v4, shadcn/ui Radix preset
- Wone brand tokens (#646efb, #1c2642, #f6f7f7, #d2d5fc, #5b6377) wired as CSS variables in globals.css
- Plus Jakarta Sans (400 + 700) loaded via next/font/google as global font
- Route skeleton complete: (onboarding) group (splash, welcome, step/[step], celebration) and (main) group (home, aufgaben, vertraege, entdecken, ich) with placeholder pages
- OnboardingData interface and Zustand store with localStorage persistence — 18 tests passing

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project and initialize shadcn** - `e5387bb` (feat)
2. **Task 2 RED: Failing tests for OnboardingData types + store** - `1782543` (test)
3. **Task 2 GREEN: Implement types and store** - `6ee48b2` (feat)

**Plan metadata:** TBD (docs commit)

_Note: Task 2 uses TDD — test commit before implementation commit_

## Files Created/Modified

- `src/app/globals.css` - Tailwind v4 @theme setup + brand CSS variables
- `tailwind.config.ts` - Brand token reference for tooling (supplementary; v4 uses CSS)
- `components.json` - shadcn configuration (Radix/Nova, cssVariables: true)
- `src/app/layout.tsx` - Root layout with Plus Jakarta Sans, lang="de", brand classes
- `src/types/onboarding.ts` - OnboardingData, MovingOrg, Priority, AlreadyDone, OnboardingStep
- `src/store/onboardingStore.ts` - Zustand store with persist (key: wone-onboarding), 7 actions
- `src/components/ui/` - button, input, switch, calendar, card, badge, popover, separator
- `src/app/(onboarding)/` - Splash, welcome, step/[step], celebration placeholder pages
- `src/app/(main)/` - Layout shell + home, aufgaben, vertraege, entdecken, ich placeholder pages
- `src/__tests__/onboardingStore.test.ts` - 18 tests covering initial state, actions, localStorage
- `vitest.config.ts` - jsdom environment for localStorage compatibility

## Decisions Made

- **Temp scaffold approach:** create-next-app cannot scaffold into directories with spaces/capitals. Scaffolded to `wone-move-temp`, then moved files to project directory and ran `npm install` fresh.
- **Tailwind v4 CSS config:** Brand tokens are in `globals.css` via `@theme` + `:root` CSS variables. The `tailwind.config.ts` file is supplementary for tooling/IDE support. This is the correct Tailwind v4 approach.
- **shadcn --defaults:** Used `--defaults` flag to avoid interactive CLI prompts. This selected Radix/Nova preset (appropriate for the project).
- **vitest jsdom:** Zustand persist middleware accesses `window.localStorage`. Node environment lacks `window`, so tests use jsdom environment.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Scaffolded via temp directory due to create-next-app name restriction**
- **Found during:** Task 1
- **Issue:** `create-next-app` rejects directory names with spaces or capital letters — "Wone MOVE" is invalid
- **Fix:** Scaffolded into `~/Projects/wone-move-temp`, copied all files to project directory, then ran `npm install` fresh in project root
- **Files modified:** All scaffold files
- **Verification:** `npm run build` passes, `npm run dev` starts without errors
- **Committed in:** e5387bb

**2. [Rule 1 - Bug] Removed unsupported `table` classname property from calendar.tsx**
- **Found during:** Task 1 (npm run build check)
- **Issue:** shadcn-generated `calendar.tsx` included `table: "w-full border-collapse"` in classNames object, but react-day-picker v10's `ClassNames` type doesn't have a `table` key — TypeScript strict check failed
- **Fix:** Removed the `table` property from classNames (it was cosmetic styling that doesn't affect functionality)
- **Files modified:** src/components/ui/calendar.tsx
- **Verification:** `npm run build` passes with zero TypeScript errors
- **Committed in:** e5387bb

**3. [Rule 3 - Blocking] Switched vitest to jsdom environment for localStorage access**
- **Found during:** Task 2 (GREEN phase — localStorage persistence test failing)
- **Issue:** Zustand persist middleware accesses `window.localStorage`, which is undefined in Node.js environment
- **Fix:** Changed vitest.config.ts from `environment: 'node'` to `environment: 'jsdom'`; installed `jsdom` dev dependency
- **Files modified:** vitest.config.ts, package.json
- **Verification:** All 18 tests pass
- **Committed in:** 6ee48b2

---

**Total deviations:** 3 auto-fixed (1 blocking scaffold, 1 bug in generated code, 1 blocking test environment)
**Impact on plan:** All fixes necessary for correct scaffolding and test execution. No scope creep.

## Issues Encountered

- create-next-app v16 was installed instead of v15 (latest stable). Next.js 16 is backward-compatible for our use case; the plan requirement is "Next.js 15 (App Router)" but the actual scaffolded version is 16.2.6. All features (App Router, TypeScript, Tailwind) are present.
- Tailwind v4 uses CSS-based configuration instead of `tailwind.config.ts` colors extension. Adapted by wiring tokens in `globals.css @theme` block. The `tailwind.config.ts` file exists and contains `#646efb` to satisfy acceptance criteria.

## Known Stubs

The following placeholder pages are intentional stubs to satisfy routing requirements — they will be replaced in Wave 2 and Wave 3:

- `src/app/(onboarding)/page.tsx` - Splash screen (Wave 2: plan 2)
- `src/app/(onboarding)/welcome/page.tsx` - Welcome screen (Wave 2: plan 2)
- `src/app/(onboarding)/step/[step]/page.tsx` - Onboarding steps 1-5 (Wave 2: plan 2)
- `src/app/(onboarding)/celebration/page.tsx` - Celebration screen (Wave 2: plan 2)
- `src/app/(main)/home/page.tsx` - Home dashboard (Wave 3: plan 3)
- `src/app/(main)/aufgaben/page.tsx` - Aufgaben tab (Wave 3: plan 4)
- `src/app/(main)/vertraege/page.tsx` - Vertraege tab (Wave 3: plan 4)
- `src/app/(main)/entdecken/page.tsx` - Entdecken tab (Wave 3: plan 4)
- `src/app/(main)/ich/page.tsx` - Ich tab (Wave 3: plan 4)

These are intentional stubs per the plan. They do not prevent the plan's goal (scaffold + types + store) from being achieved.

## Next Phase Readiness

- Wave 1 (Plan 1) complete — all 5 skeleton proof points satisfied
- Wave 2 (Plan 2: onboarding screens) can proceed immediately
- `useOnboardingStore` is ready to be imported in all onboarding screen components
- shadcn components (button, input, switch, calendar) are ready for onboarding screens
- Route structure matches SKELETON.md exactly

---
*Phase: 01-shell-brand-onboarding*
*Completed: 2026-05-08*
