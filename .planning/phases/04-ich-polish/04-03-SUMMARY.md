---
phase: 4
plan: "04-03"
subsystem: aufgaben-checklist
tags: [canvas-confetti, empty-state, werbebanner, ad-banner, checklist-completion]
dependency_graph:
  requires: [checklistStore (checkedIds, isChecked), TASKS/CATEGORIES/filterTasks, canvas-confetti (already installed)]
  provides: [Werbebanner above checklist, Empty State completion screen]
  affects: [src/app/(main)/aufgaben/page.tsx]
tech_stack:
  added: []
  patterns: [Inline Toast component (matches 04-02 pattern), confettiTriggered ref (prevent re-trigger), isComplete derived from checkedIds vs allTasks.length]
key_files:
  created: []
  modified:
    - src/app/(main)/aufgaben/page.tsx
decisions:
  - "D-13: Inline Toast component used (same as 04-02) — useToast from @/hooks/use-toast not installed in project"
  - "D-14: Werbebanner placed as first child of space-y-3 div (flows with list content, not sticky) — intentional per spec"
  - "D-15: confettiTriggered ref prevents confetti re-firing if checkedIds are re-evaluated"
  - "D-16: FAB guarded by view === 'checklist' && !isComplete — FAB hidden when empty state is shown"
metrics:
  duration: "~4 min"
  completed_date: "2026-05-08"
  tasks_completed: 1
  files_created: 0
  files_modified: 1
---

# Phase 4 Plan 03: Werbebanner + Empty State Summary

**One-liner:** 48px ad banner (X tap → toast, banner persists) above checklist + completion empty state with canvas-confetti, stat line, and CTA stubs — both added to /aufgaben page.tsx.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| T-04-03-01 | Add Werbebanner and Empty State to /aufgaben page | 16b80db | src/app/(main)/aufgaben/page.tsx |

## Implementation Details

### Modification approach to aufgaben/page.tsx

Three additions were made to the existing file:

1. **New imports:** `X` from lucide-react, `confetti` from canvas-confetti
2. **New component:** Inline `Toast` function component (auto-dismisses via `useEffect` + `setTimeout(2200ms)`) — same pattern established in 04-02
3. **New state:** `toastMessage: string | null` for the inline toast
4. **New ref:** `confettiTriggered` (boolean ref, prevents confetti re-firing on re-renders)
5. **Derived state:** `totalCount`, `completedCount`, `isComplete` computed from `allTasks` and `isChecked`
6. **New useEffect:** Confetti animation bounded to 3s using `Date.now()` check (identical to celebration page)

### Where Werbebanner was inserted in JSX tree

The Werbebanner is the first child of the existing `<div className="space-y-3">` in the non-complete checklist branch. It sits above `MustDoSection` and the `CATEGORIES.map(...)` renders. It is inside the scrollable area (not sticky) — it scrolls with the list content, per spec "above first checklist category".

### How isComplete conditional wraps content

```
view === 'checklist' ?
  isComplete ?
    <EmptyState />     ← full-screen centered content
  :
    <div space-y-3>    ← normal checklist with Werbebanner at top
  :
    <Zeitplan />       ← unchanged
```

The outer `<div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">` is unchanged. The `isComplete` branch uses `flex-1 flex-col items-center justify-center` on the inner div to vertically center the empty state within the scroll area.

### confettiTriggered ref pattern

```typescript
const confettiTriggered = useRef(false);

useEffect(() => {
  if (!isComplete || confettiTriggered.current) return;
  confettiTriggered.current = true;
  // ... 3s bounded animation loop
}, [isComplete]);
```

The ref is set to `true` immediately on first confetti trigger. Subsequent re-renders (e.g., from toast state updates) that evaluate `isComplete === true` will exit the effect early via the ref guard — preventing confetti from re-firing.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] useToast not installed — inline Toast component used**
- **Found during:** Task 1
- **Issue:** Plan referenced `import { useToast } from '@/hooks/use-toast'` — this hook does not exist in the project (confirmed by 04-02 SUMMARY)
- **Fix:** Inline `Toast` component with `useEffect` auto-dismiss at 2.2s, controlled via `toastMessage` state — identical pattern to 04-02
- **Files modified:** src/app/(main)/aufgaben/page.tsx
- **Commit:** 16b80db

## Known Stubs

- "32 Aufgaben erledigt in 3 Wochen" — hardcoded stat line (prototype; actual count from `completedCount` and duration from onboarding data could be computed in a future iteration)
- "Teile deinen Erfolg" CTA shows toast stub — no real share API wired
- "Feedback geben" CTA shows toast stub — no real feedback API wired

## Threat Flags

None — all trust boundaries (localStorage-backed isComplete trigger, bounded confetti loop) pre-identified in plan's threat model and accepted as prototype scope.

## Self-Check: PASSED

- src/app/(main)/aufgaben/page.tsx: FOUND (modified)
- Contains "Anzeige: Jetzt Strom vergleichen →": VERIFIED
- Contains "Werbung kann nicht ausgeblendet werden. Upgrade auf Premium.": VERIFIED
- Contains "Geschafft! Willkommen in deinem neuen Zuhause": VERIFIED
- Contains "32 Aufgaben erledigt in 3 Wochen": VERIFIED
- Contains "Teile deinen Erfolg": VERIFIED
- Contains "Feedback geben": VERIFIED
- Contains "canvas-confetti" import: VERIFIED
- Contains "confettiTriggered": VERIFIED
- Contains "isComplete": VERIFIED
- Contains "!isComplete" in FAB condition: VERIFIED
- All existing imports and functionality preserved (MustDoSection, CategorySection, AddItemSheet, TimelineBucketSection present): VERIFIED
- `npm run build` completed without TypeScript errors: VERIFIED
- Commit 16b80db: FOUND in git log
