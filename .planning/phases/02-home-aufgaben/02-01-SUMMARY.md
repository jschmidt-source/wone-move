---
phase: 02-home-aufgaben
plan: 01
subsystem: ui
tags: [zustand, typescript, shadcn, tasks, checklist, tdd]

# Dependency graph
requires:
  - phase: 01-shell-brand-onboarding
    provides: OnboardingData types, Zustand+persist pattern, Next.js/Tailwind setup
provides:
  - src/types/checklist.ts — Task, ChecklistCategoryId, TimelineBucketId, Difficulty, FilterRule, CategoryMeta, BucketMeta, CustomItem, GuideStep, Guide types
  - src/lib/tasks.ts — TASKS array (32 items), CATEGORIES, BUCKETS, filterTasks()
  - src/lib/guides.ts — GUIDES map (6 entries, 3 fully authored), cityFromPlz()
  - src/store/checklistStore.ts — useChecklistStore with persist key wone-checklist
  - shadcn primitives: progress, slider, tabs, collapsible
affects: [02-02-home-dashboard, 02-03-aufgaben-checklist, 02-04-anleitungen, 02-05-kostenrechner]

# Tech tracking
tech-stack:
  added: [shadcn progress, shadcn slider, shadcn tabs, shadcn collapsible]
  patterns:
    - Zustand flat persist pattern (no data wrapper) for checklist state
    - filterTasks pure function returning {tasks, preChecked} — no side effects
    - TDD RED/GREEN cycle for data/store layers

key-files:
  created:
    - src/types/checklist.ts
    - src/lib/tasks.ts
    - src/lib/guides.ts
    - src/store/checklistStore.ts
    - src/components/ui/progress.tsx
    - src/components/ui/slider.tsx
    - src/components/ui/tabs.tsx
    - src/components/ui/collapsible.tsx
    - src/__tests__/checklist.test.ts
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "checklistStore uses flat state (no data wrapper) vs onboardingStore which wraps in data: {} — different shapes intentional per plan spec"
  - "shadcn base-nova style (not default/new-york) — project uses @base-ui/react, components generated accordingly"
  - "filterTasks returns {tasks, preChecked} tuple — callers decide how to apply preChecked to store"
  - "GUIDES map keyed by slug string (not ChecklistCategoryId) — allows guide detail pages at /anleitungen/[slug]"

patterns-established:
  - "Pure lib modules (tasks.ts, guides.ts) — no 'use client' directive, importable in Server Components"
  - "Store files use 'use client' directive — consumed only in Client Component trees"
  - "TDD for data/store layers: RED commit (test), GREEN commit (feat) per plan tdd=true tasks"

requirements-completed: [CHK-01, CHK-02, CHK-04, CHK-05, TIME-01, TIME-02, GUIDE-02, GUIDE-03]

# Metrics
duration: 4min
completed: 2026-05-08
---

# Phase 2 Plan 01: Foundation Data Summary

**32-task checklist foundation with typed categories/buckets, filterTasks utility, 6-entry GUIDES map with full Ummeldung content, and Zustand checklistStore — all TDD-verified across 41 tests**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-05-08T13:54:40Z
- **Completed:** 2026-05-08T13:58:30Z
- **Tasks:** 2 (+ TDD RED phase)
- **Files modified:** 9 created, 2 modified

## Accomplishments
- Installed 4 shadcn primitives (progress, slider, tabs, collapsible) in base-nova style
- Created complete type system in `src/types/checklist.ts` with 9 exported types/interfaces
- Built TASKS array (32 items, 5 categories, 3 mustDo) with filterTasks logic for firma/alreadyDone filtering
- Built GUIDES map with full Ummeldung guide (4 steps, 3 docs, warning, cityLink) plus 5 additional guides
- Implemented checklistStore with Zustand persist, toggle/addCustomItem/isChecked/reset actions
- 41 new tests pass (59 total including existing onboarding tests)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install shadcn components and create type definitions** - `54949a8` (feat)
2. **Task 2 RED: Failing tests for TASKS, filterTasks, GUIDES, useChecklistStore** - `61d600f` (test)
3. **Task 2 GREEN: Implement all three data/store files** - `3508e59` (feat)

**Plan metadata:** _(docs commit follows)_

_Note: TDD task has separate test commit (RED) and implementation commit (GREEN)_

## Files Created/Modified
- `src/types/checklist.ts` — 9 exported types: Task, ChecklistCategoryId, TimelineBucketId, Difficulty, FilterRule, CategoryMeta, BucketMeta, CustomItem, GuideStep, Guide
- `src/lib/tasks.ts` — TASKS (32), CATEGORIES (5), BUCKETS (5), filterTasks()
- `src/lib/guides.ts` — GUIDES map (6 entries), cityFromPlz()
- `src/store/checklistStore.ts` — useChecklistStore with wone-checklist persist key
- `src/components/ui/progress.tsx` — shadcn Progress component
- `src/components/ui/slider.tsx` — shadcn Slider component
- `src/components/ui/tabs.tsx` — shadcn Tabs component
- `src/components/ui/collapsible.tsx` — shadcn Collapsible component
- `src/__tests__/checklist.test.ts` — 41 tests for all new modules
- `package.json`, `package-lock.json` — shadcn component installs

## Decisions Made
- checklistStore uses flat state pattern (no `data` wrapper), differing from onboardingStore — follows plan spec explicitly
- shadcn uses base-nova style with @base-ui/react (not Radix UI) — matches existing project components
- filterTasks returns `{tasks, preChecked}` tuple; callers responsible for applying preChecked to store
- GUIDES keyed by slug for direct URL routing to `/anleitungen/[slug]`

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None — no external service configuration required.

## TDD Gate Compliance

- RED gate: `test(02-01)` commit `61d600f` — 41 failing tests before implementation
- GREEN gate: `feat(02-01)` commit `3508e59` — all 41 tests pass after implementation
- REFACTOR gate: Not needed, code clean as written

## Next Phase Readiness
- All Wave 1 outputs delivered: types, tasks, guides, store, shadcn primitives
- Wave 2 plans (02-02 Home Dashboard, 02-03 Aufgaben Checklist) can now import from these modules
- Wave 3 plans (02-04 Anleitungen, 02-05 Kostenrechner) similarly unblocked
- No blockers; `npx tsc --noEmit` exits 0, all 59 tests pass

---
*Phase: 02-home-aufgaben*
*Completed: 2026-05-08*
