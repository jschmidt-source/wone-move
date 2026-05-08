---
phase: 02-home-aufgaben
plan: 02
subsystem: ui
tags: [home, dashboard, next-image, logo, zustand, progress, mvp-vertical-slice]

# Dependency graph
requires:
  - phase: 02-home-aufgaben
    plan: 01
    provides: checklistStore, TASKS, filterTasks, shadcn Progress/Card primitives
  - phase: 01-shell-brand-onboarding
    provides: onboardingStore (moveDate, fromCity), BottomNav layout shell, brand tokens
provides:
  - src/app/(main)/home/page.tsx — Full Home Dashboard (greeting, countdown, progress, next task, tips, quick-actions, deadlines)
  - public/logo.jpg — Wone MOVE brand logo (180x150px, served via next/image)
affects: [02-03-aufgaben-checklist, 02-04-anleitungen, 02-05-kostenrechner]

# Tech tracking
tech-stack:
  added: [next/image for logo rendering]
  patterns:
    - next/image with priority flag for above-the-fold logo
    - JSX text interpolation only for user-supplied data (T-02-03 XSS mitigation)
    - Math.max(0,...) null-guard on date arithmetic (T-02-04 DoS mitigation)

key-files:
  created:
    - public/logo.jpg
  modified:
    - src/app/(main)/home/page.tsx

key-decisions:
  - "Logo placed in welcome section above greeting headline — tasteful brand identity without displacing content hierarchy"
  - "Progress component override uses [&>[data-slot=progress-track]] selector (base-ui/react actual slot names) instead of [&>div] from plan spec — adapts to actual base-nova component structure"
  - "deadlineColor helper receives today as parameter (pure function) to avoid stale closure issues"
  - "WebkitOverflowScrolling cast as React.CSSProperties to avoid TS vendor prefix type error"

# Metrics
duration: 5min
completed: 2026-05-08
---

# Phase 2 Plan 02: Home Dashboard Summary

**Home Dashboard at /home — full vertical slice with brand logo, personalized greeting, live progress bar, next Must-Do task card, 3 tip cards, 3 quick-action tiles, and 2 deadline rows all reading from onboardingStore + checklistStore**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-05-08
- **Completed:** 2026-05-08
- **Tasks:** 1
- **Files modified:** 1 modified + 1 created (logo asset)

## Accomplishments

- Replaced placeholder `/home` page with complete Client Component Dashboard
- All 6 sections implemented and rendered in spec order: welcome, progress, next task, tips, quick-actions, deadlines
- Wone MOVE logo integrated via `next/image` (priority, h-9/auto-width) in the welcome header
- `filterTasks` wired to onboardingStore `data` for personalised visible task list
- Progress bar reflects live `checkedIds.length / visibleTasks.length` ratio
- Nächste Aufgabe card surfaces first unchecked `isMustDo` task and links to its `guideSlug` route
- Date pill color logic: red (past), orange (≤7 days), muted (future)
- `npm run build` exits 0; `/home` listed in route table

## Task Commits

1. **Task 1: Home Dashboard + Logo** — `b8da39a` (feat)

## Files Created/Modified

- `src/app/(main)/home/page.tsx` — Full Home Dashboard implementation (193 lines, 'use client')
- `public/logo.jpg` — Brand logo asset (180×150px JPEG, served via next/image)

## Decisions Made

- Logo placed above greeting headline in welcome section — brand-consistent, small footprint (h-9)
- Progress component Tailwind override uses `[&>[data-slot=progress-track]]` selector matching actual base-nova slot names (not `[&>div]` from plan spec)
- `deadlineColor` accepts `today: Date` as explicit param — avoids stale closure risk in SSR context
- `WebkitOverflowScrolling` cast to `React.CSSProperties` — TypeScript requires explicit cast for vendor-prefix inline style keys

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Progress bar Tailwind selector adjusted for base-nova component structure**
- **Found during:** Task 1 — reading progress.tsx component source
- **Issue:** Plan spec suggests `[&>div]:bg-primary` override, but base-nova Progress renders slots via `data-slot` attributes, not plain `<div>` children
- **Fix:** Used `[&>[data-slot=progress-track]]:bg-[#d2d5fc] [&>[data-slot=progress-indicator]]:bg-primary` selectors matching actual rendered DOM
- **Files modified:** `src/app/(main)/home/page.tsx`
- **Commit:** `b8da39a`

**2. [Rule 2 - Missing critical functionality] Logo file added to git**
- **Found during:** Task 1 — user requirement specified logo at public/logo.jpg but file was untracked
- **Fix:** Staged `public/logo.jpg` alongside page.tsx in the same commit so the asset is available at build time
- **Files modified:** `public/logo.jpg`
- **Commit:** `b8da39a`

## Threat Model Compliance

| Threat ID | Mitigation | Status |
|-----------|------------|--------|
| T-02-03 (XSS via fromCity) | `data.fromCity` rendered as JSX text node `{data.fromCity}` — never dangerouslySetInnerHTML | Mitigated |
| T-02-04 (DoS via malformed moveDate) | `new Date(data.moveDate)` under null-guard; `Math.max(0,...)` clamps NaN; fallback "Bald geht's los" | Mitigated |

## Known Stubs

None — all sections render live data from stores or deterministic computed values.

## Next Phase Readiness

- Wave 2 dependency on 02-01 data foundation fully consumed
- `/aufgaben` link in Schnellzugriff resolves (02-03 builds that page)
- `/anleitungen/ummeldung` link in Nächste Aufgabe resolves (02-04 builds that page)
- `/home/kostenrechner` link returns 404 until 02-05 ships — expected, documented in plan verification section
- `/vertraege` link returns 404 — no plan in phase 2 covers this route; correct graceful behaviour

---
*Phase: 02-home-aufgaben*
*Completed: 2026-05-08*
