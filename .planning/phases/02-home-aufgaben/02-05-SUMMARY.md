---
phase: 02-home-aufgaben
plan: "05"
subsystem: ui
tags: [kostenrechner, uebergabeprotokoll, slider, tabs, react-state, mvp-vertical-slice]

# Dependency graph
requires:
  - phase: 02-01
    provides: shadcn Slider, Tabs, Input, Card components installed; checklistStore + task data foundation

provides:
  - Reactive Kostenrechner page at /home/kostenrechner with Slider + helper toggle + qm input
  - ConditionToggle component (Gut/Mangel two-button toggle with green/red states)
  - PhotoSlot component (dashed-border Camera placeholder)
  - Übergabeprotokoll page at /aufgaben/uebergabeprotokoll with 5 Zimmer-Tabs, condition fields, photo slots, signatures, Premium export row

affects: [phase-03, phase-04, verification]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Base UI Slider onValueChange receives typed value directly (number | number[]) — cast to number[] for array usage"
    - "Base UI Tabs onValueChange receives TabsTab.Value directly — cast to Room type for typed routing"
    - "Reactive calculation: useState drives derived cost object inline — no useEffect or useCallback needed for simple transforms"
    - "Per-room protocol state: Record<Room, Record<Field, {state, note}>> with functional setState for deep nested updates"

key-files:
  created:
    - src/app/(main)/home/kostenrechner/page.tsx
    - src/components/uebergabe/ConditionToggle.tsx
    - src/components/uebergabe/PhotoSlot.tsx
    - src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx
  modified: []

key-decisions:
  - "Base UI Slider onValueChange: value typed as number | readonly number[] — cast via (v as number[])[0] for single-thumb usage"
  - "Base UI Tabs active state: data-active:* selectors (not data-[state=active]:*) — matches base-nova preset attribute names"
  - "ConditionToggle toggle-off: clicking active button returns state to null (not locked) — allows clearing a selection"
  - "PhotoSlot: mock-only, no actual file input wired — Premium export row signals full functionality is future work"
  - "qm input sanitized via replace(/[^\d]/g,'') per T-02-13 threat mitigation"

patterns-established:
  - "ConditionToggle pattern: two side-by-side buttons with explicit inline style for green/red (Tailwind JIT cannot handle dynamic arbitrary colors)"
  - "Tabs with Base UI: use data-active:* not data-[state=active]:* for active tab styling"

requirements-completed: [GUIDE-05]

# Metrics
duration: 12min
completed: 2026-05-08
---

# Phase 2 Plan 05: Kostenrechner + Übergabeprotokoll Summary

**Reactive moving cost calculator at /home/kostenrechner (Slider + 3-way helper toggle + qm input) and multi-room handover form at /aufgaben/uebergabeprotokoll (5 Zimmer-Tabs, Gut/Mangel toggles, photo slots, Premium export badge)**

## Performance

- **Duration:** 12 min
- **Started:** 2026-05-08T14:15:00Z
- **Completed:** 2026-05-08T14:27:00Z
- **Tasks:** 2
- **Files modified:** 4 (all created new)

## Accomplishments
- Kostenrechner: Slider (10–500 km), 3-option Helfer control, qm input — Ergebnis card updates reactively with no Berechnen button
- Kostenrechner cost formula: Kartons (qm×1.5×1.5 rounded to €5), Transporter (distance/helper branches), Sonstiges €50 flat, Gesamt as range
- ConditionToggle + PhotoSlot components extracted for reuse
- Übergabeprotokoll: 5 Zimmer-Tabs with per-room state preservation, Mangel reveals freitext Input, 3 photo placeholders, 2 signature boxes, Premium export row

## Task Commits

Each task was committed atomically:

1. **Task 1: Kostenrechner page** - `d8a1fcc` (feat)
2. **Task 2: Übergabeprotokoll + components** - `5e35b58` (feat)

**Plan metadata:** (in this commit)

## Files Created/Modified
- `src/app/(main)/home/kostenrechner/page.tsx` - Reactive cost calculator page with Slider, helper toggle, qm input, Ergebnis card
- `src/components/uebergabe/ConditionToggle.tsx` - Two-button Gut/Mangel toggle component with null deselect
- `src/components/uebergabe/PhotoSlot.tsx` - Dashed-border Camera placeholder (mock, no upload)
- `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` - Multi-room handover form with 5 Zimmer-Tabs, condition rows, photo slots, signatures, Premium export

## Decisions Made
- Base UI Slider onValueChange delivers `number | readonly number[]` — cast needed for single-thumb array usage
- Base UI Tabs active state uses `data-active:*` selectors (not Radix's `data-[state=active]:*`)
- ConditionToggle clicking the active button deselects (returns null) — supports "I changed my mind" UX
- PhotoSlot is intentionally mock-only; "Protokoll exportieren" Premium badge signals this is future functionality

## Deviations from Plan

None — plan executed exactly as written. One API clarification applied automatically: Base UI Slider `onValueChange` handler type differs from Radix (value is not wrapped in object), handled with TypeScript cast as documented above.

## Issues Encountered
None — build passed first attempt on both tasks.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- All 5 Phase 2 plans complete: data foundation, Home page, Aufgaben/Zeitplan, Anleitungen, Kostenrechner + Übergabeprotokoll
- Phase 2 surface area fully implemented
- Phase 3 (Vertraege, Entdecken, Ich) can proceed

---
*Phase: 02-home-aufgaben*
*Completed: 2026-05-08*
