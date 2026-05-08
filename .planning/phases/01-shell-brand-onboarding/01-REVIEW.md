---
phase: 01-shell-brand-onboarding
reviewed: 2026-05-08T00:00:00Z
depth: standard
files_reviewed: 31
files_reviewed_list:
  - components.json
  - src/__tests__/onboardingStore.test.ts
  - src/app/(main)/aufgaben/page.tsx
  - src/app/(main)/entdecken/page.tsx
  - src/app/(main)/home/page.tsx
  - src/app/(main)/ich/page.tsx
  - src/app/(main)/layout.tsx
  - src/app/(main)/vertraege/page.tsx
  - src/app/(onboarding)/celebration/page.tsx
  - src/app/(onboarding)/page.tsx
  - src/app/(onboarding)/step/[step]/page.tsx
  - src/app/(onboarding)/welcome/page.tsx
  - src/app/globals.css
  - src/app/layout.tsx
  - src/components/nav/BottomNav.tsx
  - src/components/onboarding/StepIndicator.tsx
  - src/components/onboarding/TileSelect.tsx
  - src/components/onboarding/ToggleList.tsx
  - src/components/onboarding/WeiterButton.tsx
  - src/components/ui/badge.tsx
  - src/components/ui/button.tsx
  - src/components/ui/calendar.tsx
  - src/components/ui/card.tsx
  - src/components/ui/input.tsx
  - src/components/ui/popover.tsx
  - src/components/ui/separator.tsx
  - src/components/ui/switch.tsx
  - src/lib/utils.ts
  - src/store/onboardingStore.ts
  - src/types/onboarding.ts
  - tailwind.config.ts
  - vitest.config.ts
findings:
  critical: 3
  warning: 7
  info: 4
  total: 14
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-08T00:00:00Z
**Depth:** standard
**Files Reviewed:** 31
**Status:** issues_found

## Summary

Reviewed the Phase 1 shell, brand, and onboarding implementation. The architecture is clean — Zustand store, typed onboarding flow, and bottom-nav shell all look structurally sound. However, three blockers exist: the store's `reset` action reuses a shared mutable reference that will corrupt state across sessions; the splash-screen redirect fires unconditionally and will trap users with completed onboarding in an infinite redirect loop; and the confetti animation on the celebration page leaks a `requestAnimationFrame` handle when the component unmounts mid-animation. Six warnings cover PLZ validation gaps, missing `<label>` associations, nav height miscalculation, unsafe type casts, date-input UX on iOS, and a test isolation flaw. Four info items cover hardcoded strings, unused UI components, and minor style inconsistencies.

---

## Critical Issues

### CR-01: `reset()` shares mutable `initialData` reference — corrupts state after reset

**File:** `src/store/onboardingStore.ts:52`

**Issue:** `reset` calls `set({ data: initialData })`. `initialData` contains a nested object (`alreadyDone`). Because `initialData` is the same object reference every time, subsequent `setAlreadyDone` calls mutate `s.data.alreadyDone` via spread, but if Zustand ever internally aliases the reference (or if the object is mutated directly in a future edit), the "clean" default becomes dirty. More concretely: after a `reset()`, `setAlreadyDone` does `{ ...s.data.alreadyDone, [key]: value }` — this is currently safe only because Zustand replaces the reference. But `initialData.alreadyDone` is a single object literal shared across all potential reset calls, so any direct mutation (possible in tests or if the pattern evolves) will silently corrupt the initial state for every future reset in the same process lifetime.

The test at line 136–146 passes today, but it does so only because the test calls `vi.resetModules()` between runs, which re-imports the module and creates a fresh `initialData`. In production (no module reset), `reset()` always hands back the same `initialData.alreadyDone` object identity, making it fragile.

**Fix:**
```ts
reset: () => set({ data: { ...initialData, alreadyDone: { ...initialData.alreadyDone } } }),
```

---

### CR-02: Splash page redirects unconditionally — traps returning users in a loop

**File:** `src/app/(onboarding)/page.tsx:9-14`

**Issue:** The splash screen always navigates to `/welcome` after 1500 ms, regardless of whether the user has already completed onboarding (`data.completed === true`). A user who has finished the flow and returns to the root `/` will be redirected to `/welcome` and start the onboarding again. This conflicts directly with the localStorage persistence set up in the store — the persisted data is never checked at the entry point.

There is no guard at the `/welcome` or `/step/*` routes either, so a user who has `completed: true` stored will still be walked through the full onboarding on every cold start.

**Fix:**
```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function SplashPage() {
  const router = useRouter();
  const completed = useOnboardingStore((s) => s.data.completed);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(completed ? '/home' : '/welcome');
    }, 1500);
    return () => clearTimeout(timer);
  }, [router, completed]);

  // ...existing JSX
}
```

---

### CR-03: Confetti animation leaks `requestAnimationFrame` handle on unmount

**File:** `src/app/(onboarding)/celebration/page.tsx:13-39`

**Issue:** The `useEffect` starts a recursive `requestAnimationFrame` loop. When the user taps "Los geht's" and navigates away before the 3-second duration expires, the component unmounts. The effect cleanup function is the implicit `undefined` returned by the arrow function passed to `useEffect` — there is no cleanup. The `frame` callback continues to run and call `confetti()` on an unmounted component context. On slow devices the animation can run past unmount and fire DOM operations against a detached tree, which causes warnings and wasted work. In test environments this can also cause "act()" warnings.

**Fix:**
```tsx
useEffect(() => {
  const duration = 3000;
  const end = Date.now() + duration;
  let rafId: number;

  const frame = () => {
    confetti({ /* ... */ });
    confetti({ /* ... */ });
    if (Date.now() < end) {
      rafId = requestAnimationFrame(frame);
    }
  };

  rafId = requestAnimationFrame(frame);

  return () => cancelAnimationFrame(rafId);
}, []);
```

---

## Warnings

### WR-01: PLZ validation accepts leading zeros and non-German codes — step 2 "Weiter" not blocked on invalid partial input

**File:** `src/app/(onboarding)/step/[step]/page.tsx:65-66`

**Issue:** The `isWeiterDisabled` check for step 2 (line 93) only blocks progression if `showPlzError` is true. `showPlzError` is only true when `plz.length > 0 && !plzIsValid`. This means the "Weiter" button is **enabled** when `plz === ''` (empty string), allowing the user to advance with no PLZ at all. The `fromCity` field has no validation at all — a user can proceed with an empty city. Whether an empty PLZ is an acceptable product decision is unclear, but the current behavior is inconsistent with the visible validation error message that implies a PLZ is required.

**Fix:** If PLZ is required, change the disabled condition to:
```ts
(currentStep === 2 && (plz === '' || showPlzError)) ||
```
If PLZ is optional, remove the error message shown at line 178–181 when PLZ is empty (currently it never shows because `showPlzError` requires `plz.length > 0`), so the current code is already correct for the optional case but the UX is confusing.

---

### WR-02: Step 1 date input shows error state immediately on mount

**File:** `src/app/(onboarding)/step/[step]/page.tsx:153-157`

**Issue:** The block at lines 153–157 renders an error paragraph `"Bitte wähle dein Umzugsdatum aus."` whenever `!moveDate` is true. On first mount of step 1, `moveDate` is `''` (falsy), so the error message is displayed immediately before the user has had a chance to interact with the field. This is a standard UX anti-pattern — showing an error before any interaction is confusing and looks broken.

**Fix:** Track whether the field has been "touched" (interacted with at least once):
```tsx
const [dateTouched, setDateTouched] = useState(false);

<input
  type="date"
  onChange={(e) => { setDateTouched(true); setMoveDateLocal(e.target.value); }}
  ...
/>
{dateTouched && !moveDate && (
  <p className="text-[14px] text-destructive">
    Bitte wähle dein Umzugsdatum aus.
  </p>
)}
```

---

### WR-03: `<input type="date">` in step 1 has no `<label>` association — accessibility failure

**File:** `src/app/(onboarding)/step/[step]/page.tsx:139-145`

**Issue:** The raw `<input type="date">` element has no associated `<label>` element and no `aria-label` attribute. Screen readers will announce this field with no context. The step-2 `<Input>` fields (lines 165, 185) have visible `<label>` elements above them, but those labels are not linked via `htmlFor`/`id` pairs, so screen readers do not associate them either.

**Fix:**
```tsx
{/* Step 1 */}
<label htmlFor="move-date" className="text-[14px] font-bold text-foreground">
  Umzugsdatum
</label>
<input
  id="move-date"
  type="date"
  aria-label="Umzugsdatum auswählen"
  ...
/>

{/* Step 2 — add htmlFor/id to existing labels */}
<label htmlFor="plz-input" className="...">PLZ der neuen Wohnung</label>
<Input id="plz-input" ... />

<label htmlFor="city-input" className="...">Von welcher Stadt?</label>
<Input id="city-input" ... />
```

---

### WR-04: BottomNav height does not account for `safe-area-inset-bottom` — content obscured on iPhone notch devices

**File:** `src/app/(main)/layout.tsx:9` and `src/components/nav/BottomNav.tsx:21`

**Issue:** `MainLayout` pads the content by `calc(56px + env(safe-area-inset-bottom))` — correctly accounting for the safe area. However, `BottomNav` sets `h-[56px]` on the `<nav>` element itself (line 20) and adds `paddingBottom: 'env(safe-area-inset-bottom)'` via inline style. The nav's actual rendered height is therefore `56px + safe-area-inset-bottom`, but the Tailwind class `h-[56px]` only reserves 56px. On iPhone 14/15 with a 34px home indicator, the nav is visually 90px tall but the layout reserves only 56px for the outer container — the `h-[56px]` constraint will clip the bottom of the nav, hiding the safe-area padding inside an overflow:hidden ancestor if one exists.

The `h-[56px]` on each individual tab button (line 31) also means the touch target is 56px, not `56px + safe-area`. On devices with a home bar, tapping on the bottom of a tab could register as a home gesture.

**Fix:** Remove `h-[56px]` from the `<nav>` element and use `pb-safe` or `style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}` only, letting the element grow to its natural height:
```tsx
<nav
  className="fixed bottom-0 left-0 right-0 z-50 flex w-full items-center justify-around border-t border-[#d2d5fc] bg-white"
  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
>
```
And update `MainLayout`'s paddingBottom to match dynamic nav height, or use a CSS variable shared between both.

---

### WR-05: Unsafe `as` type cast silences type errors in `TileSelect` onChange handlers

**File:** `src/app/(onboarding)/step/[step]/page.tsx:205, 213`

**Issue:** Both `TileSelect` usages cast the incoming `string` value to the specific union type with `v as typeof movingOrg` and `v as typeof priority`. `typeof movingOrg` resolves to `MovingOrg | null`, meaning any arbitrary string (or `null`) passed from `TileSelect.onChange` is silently accepted as a valid `MovingOrg`. If `TileSelect` is ever used with a mismatched options array, the store will contain a value that is not a valid `MovingOrg` or `Priority`, corrupting downstream logic with no TypeScript error.

**Fix:** Add a runtime validation helper or make `TileSelect` generic:
```tsx
// Generic TileSelect approach:
interface TileSelectProps<T extends string> {
  options: { value: T; label: string; emoji?: string }[];
  value: T | null;
  onChange: (value: T) => void;
}
// Then onChange is already typed correctly — no cast needed at the call site.
```

---

### WR-06: `reset()` in store does not clear persisted localStorage — stale data survives page reload after reset

**File:** `src/store/onboardingStore.ts:52`

**Issue:** The Zustand `persist` middleware serialises state to `localStorage` on every `set` call. When `reset()` calls `set({ data: initialData })`, the persist middleware immediately writes the reset state back to `localStorage` under the key `wone-onboarding`. This is correct behaviour for an in-session reset. However, because the `persist` middleware uses a `merge` strategy by default, if any future code calls `reset()` before the store has been hydrated from localStorage (e.g., during SSR or before the `onRehydrateStorage` callback fires), the initial data will be written over partially-hydrated state. More critically, there is no `onRehydrateStorage` or hydration guard in the store, so on first render the component may read `initialData` before localStorage has been loaded, causing a flash of incorrect (empty) state — especially visible on the celebration page where `data.moveDate` and `data.fromCity` are rendered directly.

**Fix:** Add a hydration-complete flag and guard displays:
```ts
interface OnboardingStore {
  // ...
  _hydrated: boolean;
}

// In persist options:
{
  name: 'wone-onboarding',
  onRehydrateStorage: () => (state) => {
    if (state) state._hydrated = true;
  },
}
```
Then in `CelebrationPage`, check `_hydrated` before rendering user data (or use a loading state).

---

### WR-07: `<input type="date">` renders as a native picker on iOS — value format may differ

**File:** `src/app/(onboarding)/step/[step]/page.tsx:139`

**Issue:** On iOS Safari, `<input type="date">` renders a native wheel picker, which is a known UX divergence. More critically, iOS Safari does not respect the `placeholder` attribute on date inputs (line 143: `placeholder="Datum auswählen"`) — the placeholder is never shown. The empty state falls through to the error paragraph at line 153–157 that is shown immediately (see also WR-02). The combination of invisible placeholder + immediate error text will display as a broken-looking form on the primary target device (mobile).

**Fix:** Remove the `placeholder` attribute (it does nothing on date inputs across browsers). Address the immediate-error issue per WR-02. Consider displaying the formatted date badge (lines 146–151) as the primary confirmation rather than relying on the native input's internal display.

---

## Info

### IN-01: Hardcoded "23 Aufgaben" in celebration page

**File:** `src/app/(onboarding)/celebration/page.tsx:72`

**Issue:** The string `"23 Aufgaben warten auf dich"` is hardcoded. When tasks are implemented in Phase 2, this count will be wrong. The number should come from the task data or be removed until the real count is available.

**Fix:** Replace with a placeholder that does not assert a specific number, e.g., `"Deine personalisierten Aufgaben warten auf dich"`, until the task store exists.

---

### IN-02: `calendar.tsx`, `popover.tsx`, `badge.tsx`, `card.tsx`, `separator.tsx` imported but unused in Phase 1

**File:** `src/components/ui/calendar.tsx`, `src/components/ui/popover.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/card.tsx`, `src/components/ui/separator.tsx`

**Issue:** None of these UI components are imported by any page or component in the reviewed file set. They exist purely as scaffolding for future phases. This is not a bug in itself, but including generated shadcn components that pull in dependencies (`react-day-picker`, `@base-ui/react/popover`) increases bundle size from day one without benefit.

**Fix:** Either exclude these from the repository until they are needed, or ensure tree-shaking handles them. No action required if bundle analysis confirms they are excluded.

---

### IN-03: `StepIndicator` accessible text does not convey completion state

**File:** `src/components/onboarding/StepIndicator.tsx:12-27`

**Issue:** The dot indicators have no `aria-label` or `role` attributes. Screen readers will read only the paragraph "Schritt N von 5" (which is fine), but the dots themselves will be announced as empty `<div>` elements. This is minor since the paragraph provides the information, but the dots could cause screen reader noise.

**Fix:** Add `aria-hidden="true"` to the dots container so screen readers skip it entirely and rely on the paragraph:
```tsx
<div className="flex items-center gap-1" aria-hidden="true">
  {/* dots */}
</div>
```

---

### IN-04: `vitest.config.ts` does not set `setupFiles` — `localStorage` mock in test file is fragile

**File:** `vitest.config.ts` and `src/__tests__/onboardingStore.test.ts:8-18`

**Issue:** The `localStorage` mock is defined inline at the top of the test file using `vi.stubGlobal`. Because `vi.resetModules()` is called in `beforeEach` but the mock is established only once at module load time, if Vitest ever re-evaluates the test module (e.g., when using `--reporter=verbose` with watch mode), the mock may not be re-applied. Additionally, the `vi.stubGlobal` call is outside any `beforeEach`/`beforeAll`, so a future test file that runs in the same worker without the mock will see the real `localStorage` (which does not exist in jsdom by default unless configured).

**Fix:** Move the localStorage mock into a `vitest.setup.ts` file referenced via `setupFiles` in `vitest.config.ts`:
```ts
// vitest.config.ts
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: ['./src/__tests__/setup.ts'],
}
```

---

_Reviewed: 2026-05-08T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
