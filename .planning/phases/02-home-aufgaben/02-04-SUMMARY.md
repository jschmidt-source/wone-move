---
phase: 02-home-aufgaben
plan: 04
subsystem: ui
tags: [anleitungen, guide, dynamic-route, GuideStepList]

# Dependency graph
requires:
  - phase: 02-home-aufgaben
    plan: 01
    provides: Guide/GuideStep types, GUIDES map, cityFromPlz, checklistStore, onboardingStore

provides:
  - src/components/guide/GuideStepList.tsx — numbered step list with vertical dashed connector
  - src/app/(main)/anleitungen/page.tsx — Anleitungen browser, 2-column grid of guide cards
  - src/app/(main)/anleitungen/[slug]/page.tsx — dynamic guide detail page with full Ummeldung content

affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - useParams() for dynamic route slug resolution in Client Components
    - GUIDES[slug] lookup with undefined guard (fallback render, no crash)
    - slug→taskId mapping constant for mark-done CTA dispatch

key-files:
  created:
    - src/components/guide/GuideStepList.tsx
    - src/app/(main)/anleitungen/page.tsx
    - src/app/(main)/anleitungen/[slug]/page.tsx
  modified: []

key-decisions:
  - "City link rendered only for slug === 'ummeldung' (not generic cityLink field check) — matches spec D-09/GUIDE-03 exactly"
  - "SLUG_TO_TASK_ID mapping co-located in page.tsx — avoids separate config file for 6 entries"
  - "href='#' with e.preventDefault() on city link — T-02-10 open redirect mitigated, prototype scope"

# Metrics
duration: 5min
completed: 2026-05-08
---

# Phase 2 Plan 04: Anleitungen System Summary

**Anleitungen browser grid (/anleitungen) + dynamic guide detail page (/anleitungen/[slug]) with full Ummeldung guide, GuideStepList component, mark-done CTA wiring, and fallback for unknown slugs**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-05-08T14:05:00Z
- **Completed:** 2026-05-08T14:10:00Z
- **Tasks:** 2
- **Files created:** 3

## Accomplishments

- `GuideStepList` component: numbered circles (24×24, bg-primary), vertical dashed connector (#d2d5fc), step title + body layout
- `/anleitungen` browser page: 2-column grid of all 6 GUIDES entries with category dot, time pill, difficulty pill; preview-only cards at opacity-85
- `/anleitungen/[slug]` detail page: full Ummeldung guide with meta row, Dokumente box, GuideStepList, warning box, city-link ("Zum Bürgeramt München →"), mark-done CTA
- Rundfunkbeitrag + Nachsendeauftrag fully rendered; 3 preview-only guides show "bald verfügbar" placeholder
- Unknown slug fallback: "Anleitung nicht verfügbar" — no crash
- Mark-done CTA: toggles correct task id via `useChecklistStore.toggle(taskId)` then `router.back()`
- All 3 threat mitigations applied: T-02-08 (undefined guard), T-02-09 (JSX-only render), T-02-10 (href='#' + preventDefault)

## Task Commits

1. **Task 1: GuideStepList + Anleitungen browser page** — `5422da3` (feat)
2. **Task 2: Dynamic guide detail page /anleitungen/[slug]** — `7a13e81` (feat)

## Files Created/Modified

- `src/components/guide/GuideStepList.tsx` — presentational, no 'use client', pure prop-driven step list
- `src/app/(main)/anleitungen/page.tsx` — 'use client', Object.values(GUIDES) grid, Link wrapper per card
- `src/app/(main)/anleitungen/[slug]/page.tsx` — 'use client', useParams + useRouter, GUIDES[slug] lookup, full guide render

## Decisions Made

- City link rendered only when `slug === 'ummeldung'` — spec is explicit, avoids overgeneralisation
- SLUG_TO_TASK_ID mapping co-located in page.tsx (6 entries) — no separate config needed at this scale
- `href='#'` with `e.preventDefault()` for city link — T-02-10 mitigated, prototype scope confirmed

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

The following entries in GUIDES have `isFullyAuthored: false` and render only a "bald verfügbar" placeholder on the detail page:
- `hausrat` (Hausratversicherung) — wired to checklistStore id `hausrat-pruefen`
- `strom-wechseln` (Stromanbieter) — wired to checklistStore id `stromanbieter-waehlen`
- `konto-ummelden` (Girokonto) — wired to checklistStore id `girokonto-ummelden`

These stubs are intentional per plan spec. Full authoring is v2 scope.

## Threat Surface

All threats in plan's `<threat_model>` were mitigated during implementation (T-02-08, T-02-09, T-02-10). No new surface introduced.

## Self-Check: PASSED

- `src/components/guide/GuideStepList.tsx` — FOUND
- `src/app/(main)/anleitungen/page.tsx` — FOUND
- `src/app/(main)/anleitungen/[slug]/page.tsx` — FOUND
- Commit `5422da3` — FOUND
- Commit `7a13e81` — FOUND
- `npm run build` exits 0, `/anleitungen` + `/anleitungen/[slug]` in route table — CONFIRMED

---
*Phase: 02-home-aufgaben*
*Completed: 2026-05-08*
