---
phase: 01-shell-brand-onboarding
plan: 3
subsystem: ui
tags: [nextjs, tailwind, shadcn, zustand, typescript, onboarding, step-flow]

# Dependency graph
requires:
  - 01-PLAN-1 (scaffold, types, store, shadcn Switch/Input)
  - 01-PLAN-2 (splash + welcome screens — flow entry point)
provides:
  - StepIndicator reusable dot component (5 dots, active/completed/inactive states)
  - WeiterButton reusable CTA button (disabled state, Fertig/Weiter label swap)
  - TileSelect reusable 2x2 single-select tile grid
  - ToggleList reusable toggle row list with shadcn Switch
  - Dynamic route /step/[step] rendering all 5 onboarding steps
  - Full store integration — each step saves to Zustand on proceed
  - PLZ input validation (T-01-06 threat mitigation)
  - Step param clamping (T-01-07 threat mitigation)
affects: [celebration screen, main app navigation, Zustand store data for home/aufgaben tabs]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Dynamic route pattern: single page.tsx handles all steps via useParams
    - Local state → store sync pattern: local useState, persist to Zustand only on Weiter tap
    - Incremental store writes: step 5 toggles write to store on each tap (not batched)
    - CSS transition on tile selection: 150ms ease via className + inline style
    - shadcn Switch color override: data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#d2d5fc]

key-files:
  created:
    - src/components/onboarding/StepIndicator.tsx
    - src/components/onboarding/WeiterButton.tsx
    - src/components/onboarding/TileSelect.tsx
    - src/components/onboarding/ToggleList.tsx
  modified:
    - src/app/(onboarding)/step/[step]/page.tsx

key-decisions:
  - "Dynamic route pattern: single page.tsx for all 5 steps — useParams reads [step] segment, avoids 5 separate page files"
  - "Local state before store: inputs use local useState, only flushed to Zustand store on Weiter tap — prevents partial data on back-navigation"
  - "Step 5 toggles write incrementally: each toggle tap calls store.setAlreadyDone directly (not batched) — toggle state is immediately persisted"
  - "PLZ validation added (T-01-06): regex /^\\d{5}$/ inline, blocks Weiter if invalid, shows copywriting-spec error message"
  - "Step param clamping added (T-01-07): stepParam clamped to 1–5, invalid routes render step 1 silently"

# Metrics
duration: 8min
completed: 2026-05-08
---

# Phase 1 Plan 3: Onboarding Steps 1–5 — Dynamic Route + Components Summary

**4 reusable onboarding components + single dynamic /step/[step] route wiring all 5 steps to Zustand store, with PLZ validation and step param clamping**

## Performance

- **Duration:** 8 min
- **Started:** 2026-05-08
- **Completed:** 2026-05-08
- **Tasks:** 2 (Task 1: 4 components; Task 2: dynamic step page)
- **Files modified:** 4 created (components) + 1 replaced (step page) = 5 total

## Accomplishments

- StepIndicator: 5-dot indicator matching UI-SPEC exactly (12px active #646efb, 8px completed #646efb, 8px inactive #d2d5fc, "Schritt X von 5" label)
- WeiterButton: 52px full-width primary button with disabled:opacity-40, active:scale-[0.97] press feedback
- TileSelect: 2x2 single-select tile grid (88px height, 14px border-radius, selected state #d2d5fc bg + 2px #646efb border)
- ToggleList: 56px toggle rows with shadcn Switch overridden to brand colors (#646efb active, #d2d5fc inactive)
- Dynamic step page renders all 5 steps via useParams, each with exact German copy from Copywriting Contract
- Threat mitigations T-01-06 (PLZ validation) and T-01-07 (step param clamping) implemented
- Build passes with zero TypeScript errors

## Task Commits

1. **Task 1: Build onboarding components** — `f554882` (feat)
2. **Task 2: Dynamic step page** — `d6e2692` (feat)

## Files Created/Modified

- `src/components/onboarding/StepIndicator.tsx` — dot indicator, "Schritt X von 5" text
- `src/components/onboarding/WeiterButton.tsx` — full-width CTA with disabled state
- `src/components/onboarding/TileSelect.tsx` — 2x2 single-select grid
- `src/components/onboarding/ToggleList.tsx` — toggle rows with shadcn Switch
- `src/app/(onboarding)/step/[step]/page.tsx` — replaced placeholder with full implementation

## Decisions Made

- **Dynamic route for all 5 steps:** Single page.tsx reads step from useParams. Avoids 5 separate page files while keeping the component tree clean. Back-navigation and URL sharing work correctly.
- **Local state → store sync on Weiter:** Each step maintains local useState. Data is flushed to Zustand only when Weiter is tapped. This prevents partial data appearing in the store during form editing and correctly handles back-navigation.
- **Step 5 incremental toggle writes:** Each toggle change calls `store.setAlreadyDone` immediately. This is intentional — the user's toggle state is preserved even if they navigate away without tapping Fertig.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Security] Added PLZ validation per threat model T-01-06**
- **Found during:** Task 2 (threat model review before implementation)
- **Issue:** Threat register T-01-06 mandates PLZ validation — regex check for 5 numeric digits, inline error "Bitte gib eine gültige PLZ ein (5 Ziffern).", Weiter blocked if invalid
- **Fix:** Added `plzIsValid` regex check, `showPlzError` derived state, conditional error paragraph, and `isWeiterDisabled` extended for step 2 when PLZ is invalid
- **Files modified:** `src/app/(onboarding)/step/[step]/page.tsx`
- **Commit:** d6e2692

**2. [Rule 2 - Security] Added step param clamping per threat model T-01-07**
- **Found during:** Task 2 (threat model review before implementation)
- **Issue:** Threat register T-01-07 mandates clamping step param — /step/99 or /step/abc must silently render step 1
- **Fix:** `const currentStep = (stepParam >= 1 && stepParam <= 5 ? stepParam : 1) as 1 | 2 | 3 | 4 | 5`
- **Files modified:** `src/app/(onboarding)/step/[step]/page.tsx`
- **Commit:** d6e2692

## Threat Surface Scan

No new threat surface introduced beyond what is documented in the plan's threat model. T-01-06 and T-01-07 mitigations are implemented. T-01-08 (localStorage PII) is accepted per plan.

## Known Stubs

None — all 5 onboarding steps are fully implemented. The celebration screen (`/celebration`) is a placeholder from Plan 1 but that is out of scope for this plan (Plan 4 will implement it).

## Self-Check: PASSED

- `src/components/onboarding/StepIndicator.tsx` — EXISTS
- `src/components/onboarding/WeiterButton.tsx` — EXISTS
- `src/components/onboarding/TileSelect.tsx` — EXISTS
- `src/components/onboarding/ToggleList.tsx` — EXISTS
- `src/app/(onboarding)/step/[step]/page.tsx` — EXISTS (replaced placeholder)
- Commit `f554882` — EXISTS
- Commit `d6e2692` — EXISTS
- `npm run build` — PASSED (TypeScript clean, all 11 routes generated)
