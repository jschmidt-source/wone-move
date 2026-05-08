---
phase: 02-home-aufgaben
plan: 03
subsystem: ui
tags: [aufgaben, checklist, timeline, segmented-control, mvp-vertical-slice]

# Dependency graph
requires:
  - phase: 02-home-aufgaben
    plan: 01
    provides: Task/CategoryMeta/BucketMeta types, TASKS/CATEGORIES/BUCKETS/filterTasks, checklistStore
  - phase: 01-shell-brand-onboarding
    provides: onboardingStore (moveDate, alreadyDone, movingOrg), brand tokens, BottomNav shell

provides:
  - src/components/ui/SegmentedControl.tsx — reusable 2-option toggle
  - src/components/checklist/ChecklistItem.tsx — 56px task row with checkbox, badge, chevron
  - src/components/checklist/CategorySection.tsx — collapsible category block with X/Y count
  - src/components/checklist/MustDoSection.tsx — pinned red-border Must-Do card
  - src/components/checklist/AddItemSheet.tsx — bottom-sheet for custom item creation
  - src/components/timeline/TimelineBucketSection.tsx — time bucket with color-coded left borders
  - src/app/(main)/aufgaben/page.tsx — full Aufgaben tab (toggle, Must-Do, categories, FAB, Zeitplan)

affects: [02-04-anleitungen, 02-05-kostenrechner]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - SegmentedControl: full-width flex, selected button bg-primary, unselected transparent
    - ChecklistItem: separate checkbox button + row button targets for independent tap areas
    - preChecked one-shot sync: useEffect + useRef guard — runs exactly once per mount
    - customItems adapted to Task shape (timelineBucket: 'medium') for seamless rendering
    - bucketRowColor pure function: checked > soon/moving-day within 7 days > after past moveDate > default

key-files:
  created:
    - src/components/ui/SegmentedControl.tsx
    - src/components/checklist/ChecklistItem.tsx
    - src/components/checklist/CategorySection.tsx
    - src/components/checklist/MustDoSection.tsx
    - src/components/checklist/AddItemSheet.tsx
    - src/components/timeline/TimelineBucketSection.tsx
  modified:
    - src/app/(main)/aufgaben/page.tsx

key-decisions:
  - "ChecklistItem uses two separate <button> elements (checkbox + row) for independent tap areas — prevents accidental navigation when tapping checkbox"
  - "customItems adapted to Task with timelineBucket='medium' — simplest approach, no separate rendering path needed"
  - "preChecked sync guarded by useRef — prevents re-toggling on every render cycle when checkedIds changes"
  - "FAB bottom position uses calc(56px + env(safe-area-inset-bottom) + 24px) — safe for iOS notch devices"

# Metrics
duration: 15min
completed: 2026-05-08
---

# Phase 2 Plan 03: Aufgaben Checklist + Zeitplan Summary

**Full Aufgaben tab vertical slice — sticky Checkliste/Zeitplan toggle, Must-Do section, 5 collapsible categories, FAB + AddItemSheet, and color-coded Zeitplan view — all backed by checklistStore and filterTasks**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-05-08T14:10:00Z
- **Completed:** 2026-05-08T14:25:00Z
- **Tasks:** 2
- **Files modified:** 1 modified, 6 created

## Accomplishments

- Created 6 new reusable components: SegmentedControl, ChecklistItem, CategorySection, MustDoSection, AddItemSheet, TimelineBucketSection
- All components use `'use client'` directive, named exports, and Tailwind tokens (no hardcoded `#646efb` in interactive components)
- ChecklistItem implements separate tap areas for checkbox vs. title/guide navigation
- CategorySection starts collapsed, chevron rotates 180° on open, shows live X/Y completion count
- MustDoSection shows red border (#fecaca), red badge (Must-Do) and is always expanded
- AddItemSheet validates empty input with inline German error message, resets state on close
- TimelineBucketSection implements `bucketRowColor()` logic: checked=green, within-7-days=orange, past-after=red, default=muted purple
- /aufgaben page wires all 6 components to checklistStore and filterTasks
- preChecked sync runs exactly once per mount via useRef guard
- Custom items flow as Task-shaped objects into the same category and bucket renders
- `npm run build` exits 0; `/aufgaben` listed in route table

## Task Commits

1. **Task 1: 6 reusable checklist/timeline components** — `b60c223` (feat)
2. **Task 2: Wire up /aufgaben page** — `c73e536` (feat)

## Files Created/Modified

- `src/components/ui/SegmentedControl.tsx` — 2-option toggle, bg-primary active state, 40px height
- `src/components/checklist/ChecklistItem.tsx` — 56px row, checkbox + title buttons, time badge, category dot
- `src/components/checklist/CategorySection.tsx` — collapsible with completion count, chevron animation
- `src/components/checklist/MustDoSection.tsx` — red border card, Must-Do badge, always expanded
- `src/components/checklist/AddItemSheet.tsx` — bottom-sheet, 5 category pills, validation, CTA
- `src/components/timeline/TimelineBucketSection.tsx` — bucket header + color-coded left-border rows
- `src/app/(main)/aufgaben/page.tsx` — full Aufgaben tab, all components wired to stores

## Decisions Made

- Two separate `<button>` elements in ChecklistItem: checkbox target and title/navigate target — prevents accidental navigation when toggling checkbox
- customItems adapted to Task shape with `timelineBucket: 'medium'` — avoids separate rendering path, prototype-sufficient
- `useRef` guard on preChecked sync — prevents toggling on every render when `checkedIds` changes
- FAB `bottom: calc(56px + env(safe-area-inset-bottom) + 24px)` — iOS safe-area-aware clearance

## Deviations from Plan

None — plan executed exactly as written.

## Threat Model Compliance

| Threat ID | Mitigation | Status |
|-----------|------------|--------|
| T-02-05 (XSS via custom titles) | `task.title` rendered as JSX text `{task.title}` in ChecklistItem — never `dangerouslySetInnerHTML`. React auto-escapes. | Mitigated |
| T-02-06 (localStorage disclosure) | Single-user prototype, client-only. Accepted per plan. | Accepted |
| T-02-07 (unbounded customItems) | Manual user action only; no automation surface. Phase 4 may add delete. | Accepted |

## Known Stubs

None — all data flows live from checklistStore and filterTasks. Custom items render with ~0 Min badge (acceptable per plan spec).

## Self-Check: PASSED

- `src/components/ui/SegmentedControl.tsx` — EXISTS
- `src/components/checklist/ChecklistItem.tsx` — EXISTS
- `src/components/checklist/CategorySection.tsx` — EXISTS
- `src/components/checklist/MustDoSection.tsx` — EXISTS
- `src/components/checklist/AddItemSheet.tsx` — EXISTS
- `src/components/timeline/TimelineBucketSection.tsx` — EXISTS
- `src/app/(main)/aufgaben/page.tsx` — EXISTS (modified)
- Commit `b60c223` — FOUND
- Commit `c73e536` — FOUND
- `npm run build` — EXIT 0, `/aufgaben` in route table

---
*Phase: 02-home-aufgaben*
*Completed: 2026-05-08*
