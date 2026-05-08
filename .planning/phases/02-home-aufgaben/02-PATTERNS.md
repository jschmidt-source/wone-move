# Phase 2: Home + Aufgaben — Pattern Map

**Mapped:** 2026-05-08
**Files analyzed:** 17 new/modified files
**Analogs found:** 17 / 17

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/store/checklistStore.ts` | store | CRUD | `src/store/onboardingStore.ts` | exact |
| `src/lib/tasks.ts` | utility | transform | `src/store/onboardingStore.ts` (data shape) | role-match |
| `src/types/` (Task, ChecklistCategory, TimelineBucket) | model | — | `src/types/onboarding.ts` | exact |
| `src/app/(main)/home/page.tsx` | page/component | request-response | `src/app/(onboarding)/step/[step]/page.tsx` | role-match |
| `src/app/(main)/aufgaben/page.tsx` | page/component | CRUD + event-driven | `src/app/(onboarding)/step/[step]/page.tsx` | role-match |
| `src/app/(main)/home/kostenrechner/page.tsx` | page/component | request-response | `src/app/(onboarding)/step/[step]/page.tsx` | role-match |
| `src/app/(main)/anleitungen/[slug]/page.tsx` | page/component | request-response | `src/app/(onboarding)/step/[step]/page.tsx` | exact (dynamic route) |
| `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` | page/component | event-driven | `src/app/(onboarding)/step/[step]/page.tsx` | role-match |
| `src/components/checklist/ChecklistItem.tsx` | component | event-driven | `src/components/onboarding/ToggleList.tsx` | role-match |
| `src/components/checklist/CategorySection.tsx` | component | CRUD | `src/components/onboarding/TileSelect.tsx` | role-match |
| `src/components/checklist/MustDoSection.tsx` | component | CRUD | `src/components/onboarding/ToggleList.tsx` | role-match |
| `src/components/checklist/AddItemSheet.tsx` | component | CRUD | `src/components/onboarding/WeiterButton.tsx` + `Input` | partial |
| `src/components/timeline/TimelineBucket.tsx` | component | transform | `src/components/onboarding/TileSelect.tsx` | role-match |
| `src/components/guide/GuideStepList.tsx` | component | request-response | `src/components/onboarding/StepIndicator.tsx` | role-match |
| `src/components/ui/SegmentedControl.tsx` | component | event-driven | `src/components/onboarding/TileSelect.tsx` | role-match |
| `src/components/uebergabe/ConditionToggle.tsx` | component | event-driven | `src/components/onboarding/ToggleList.tsx` | exact |
| `src/components/uebergabe/PhotoSlot.tsx` | component | file-I/O | `src/components/onboarding/TileSelect.tsx` | partial |

---

## Pattern Assignments

### `src/store/checklistStore.ts` (store, CRUD)

**Analog:** `src/store/onboardingStore.ts`

**Full file pattern** (lines 1–56):
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OnboardingData, MovingOrg, Priority, AlreadyDone } from '@/types/onboarding';

const initialData: OnboardingData = { /* ... */ };

interface OnboardingStore {
  data: OnboardingData;
  setMoveDate: (date: string) => void;
  // ... action signatures
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      data: initialData,
      setMoveDate: (date) =>
        set((s) => ({ data: { ...s.data, moveDate: date } })),
      // ... actions using spread-update pattern
    }),
    { name: 'wone-onboarding' }   // <-- localStorage key
  )
);
```

**Key rules for checklistStore:**
- localStorage key: `'wone-checklist'` (D-01)
- State shape: `{ checkedIds: string[], customItems: CustomItem[] }` (D-01, D-02)
- Every action uses `set((s) => ({ ... spread ...}))` — never mutate directly
- No `data` wrapper needed (unlike onboardingStore) — flat state is fine for simpler shape
- Export as `useChecklistStore` matching the `use[Name]Store` convention

---

### `src/types/` — Task, ChecklistCategory, TimelineBucket (model)

**Analog:** `src/types/onboarding.ts` (lines 1–22)

```typescript
export type MovingOrg = 'alleine' | 'freunde' | 'firma' | 'gemischt';
export type Priority = 'guenstig' | 'schnell' | 'stressfrei' | 'nachhaltig';

export interface AlreadyDone {
  newApartment: boolean;
  transport: boolean;
  electricityInternet: boolean;
  ummeldungPrepared: boolean;
}

export interface OnboardingData {
  moveDate: string | null;
  targetPlz: string;
  fromCity: string;
  movingOrg: MovingOrg | null;
  priority: Priority | null;
  alreadyDone: AlreadyDone;
  completed: boolean;
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;
```

**Key rules for new types:**
- Use `export type` for union types, `export interface` for object shapes
- All in `src/types/` directory; one file per domain group (e.g. `src/types/checklist.ts`)
- `Task` needs: `id: string`, `title: string`, `category: ChecklistCategoryId`, `timelineBucket: TimelineBucketId`, `isMustDo: boolean`, `filterRules?: FilterRule[]`
- `ChecklistCategory`: `id`, `label`, `icon` (lucide icon name)
- `TimelineBucket`: `id`, `label`, `colorClass` (Tailwind color token for status coloring)

---

### `src/lib/tasks.ts` (utility, transform)

**Analog:** `src/store/onboardingStore.ts` (data shape for OnboardingData)

**Pattern:** Pure utility module — no default export, named exports only. Follows the `src/lib/utils.ts` convention of simple named exports.

```typescript
// src/lib/utils.ts pattern (lines 1–6):
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Apply to tasks.ts:**
- Export `TASKS: Task[]` as a named const (static data array)
- Export `filterTasks(tasks: Task[], data: OnboardingData): Task[]` as a pure function (D-04, D-06)
- No `'use client'` directive — this is a pure data/utility module, importable server and client side
- Import `OnboardingData` from `@/types/onboarding` and `Task` from `@/types/checklist`

---

### `src/app/(main)/home/page.tsx` (page, request-response)

**Analog:** `src/app/(onboarding)/step/[step]/page.tsx` (lines 1–10, 36–41, 105–108)

**Imports pattern** (lines 1–9):
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
// ... component imports
import { Input } from '@/components/ui/input';
```

**Page shell pattern** (lines 105–108):
```typescript
return (
  <div className="flex h-dvh flex-col bg-background">
    {/* scrollable content area */}
    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
```

**Key rules for home/page.tsx:**
- `'use client'` at top — reads from stores
- Import `useOnboardingStore` for `data.moveDate`, `data.targetPlz`, `data.fromCity` (D-10)
- Import `useChecklistStore` for first unchecked Must-Do item (D-11)
- Use `<div className="flex h-dvh flex-col bg-background">` as root — matches layout pattern
- Inner scrollable: `<div className="flex-1 overflow-y-auto px-4 pb-4">` — avoids clipping under BottomNav (already padded by `(main)/layout.tsx`)
- Back button pattern when needed: `className="mt-3 flex items-center gap-1 text-[14px] font-bold text-muted-foreground"` with `← Zurück` text

---

### `src/app/(main)/aufgaben/page.tsx` (page, CRUD + event-driven)

**Analog:** `src/app/(onboarding)/step/[step]/page.tsx` (lines 1–10, 36–52)

**Client + multi-store pattern** (lines 1–9):
```typescript
'use client';

import { useState } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
// + useChecklistStore
```

**Local state + store sync pattern** (lines 47–52):
```typescript
const [movingOrg, setMovingOrgLocal] = useState(data.movingOrg);
// store update on interaction:
set((s) => ({ data: { ...s.data, movingOrg: org } }))
```

**Key rules for aufgaben/page.tsx:**
- `'use client'` — interactive checklist with checkbox state
- Use `useState<'checklist' | 'zeitplan'>('checklist')` for tab toggle (SegmentedControl)
- Render `<CategorySection>` loop for checklist view, `<TimelineBucket>` loop for timeline view
- `<MustDoSection>` always pinned at top in checklist view

---

### `src/app/(main)/home/kostenrechner/page.tsx` (page, request-response)

**Analog:** `src/app/(onboarding)/step/[step]/page.tsx` (lines 84–88, 108–116)

**Back navigation pattern** (lines 84–88):
```typescript
function handleBack() {
  if (currentStep === 1) { router.push('/welcome'); return; }
  router.push(`/step/${currentStep - 1}`);
}
```

**Key rules for kostenrechner/page.tsx:**
- `'use client'` — slider + input interactions
- Back button navigates to `/home` explicitly (D-12): `router.push('/home')`
- Page shell: `<div className="flex h-dvh flex-col bg-background">`
- Header with back button: `className="mt-3 flex items-center gap-1 text-[14px] font-bold text-muted-foreground"`
- Use `shadcn/ui Input` for qm field, custom range `<input type="range">` for distance slider
- Local `useState` only — no store persistence needed for calculator

---

### `src/app/(main)/anleitungen/[slug]/page.tsx` (page, dynamic route)

**Analog:** `src/app/(onboarding)/step/[step]/page.tsx` (lines 1–4, 36–42)

**Dynamic params pattern** (lines 1–4, 36–42):
```typescript
'use client';

import { useParams, useRouter } from 'next/navigation';

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  const stepParam = Number(params.step);
```

**Back navigation with router.back()** (lines 84–88):
```typescript
function handleBack() {
  router.push(`/step/${currentStep - 1}`);
  // For guides: use router.back() — D-08
}
```

**Key rules for anleitungen/[slug]/page.tsx:**
- `'use client'` — needs `useParams`, `useRouter`
- `const { slug } = useParams()` to look up guide data from static `GUIDES` map in `src/lib/guides.ts`
- Back: `router.back()` — returns to Aufgaben or Entdecken depending on origin (D-08)
- Render `<GuideStepList steps={guide.steps} />` as main content

---

### `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` (page, event-driven)

**Analog:** `src/app/(onboarding)/step/[step]/page.tsx` (lines 84–88, 105–120)

**Key rules:**
- `'use client'` — tab state, condition toggles, photo slots
- Use `useState<string>` for active room tab
- Back button: `router.back()` or `router.push('/aufgaben')`
- Room tabs rendered as horizontal scrolling button row (same pattern as SegmentedControl but multi-item)
- Each room renders `<ConditionToggle>` list + `<PhotoSlot>` grid

---

### `src/components/checklist/ChecklistItem.tsx` (component, event-driven)

**Analog:** `src/components/onboarding/ToggleList.tsx` (lines 1–34)

**Full component pattern** (lines 1–34):
```typescript
'use client';

import { Switch } from '@/components/ui/switch';

interface ToggleItem {
  key: string;
  label: string;
}

interface ToggleListProps {
  items: ToggleItem[];
  values: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
}

export function ToggleList({ items, values, onChange }: ToggleListProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex h-[56px] items-center justify-between rounded-[10px] bg-white px-4"
        >
          <span className="text-[16px] font-normal text-foreground">{item.label}</span>
          <Switch
            checked={values[item.key] ?? false}
            onCheckedChange={(checked) => onChange(item.key, checked)}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#d2d5fc]"
          />
        </div>
      ))}
    </div>
  );
}
```

**Key rules for ChecklistItem.tsx:**
- `'use client'` — interactive checkbox
- Props: `task: Task`, `isChecked: boolean`, `onToggle: (id: string) => void`
- Replace Switch with a custom circular checkbox (`<button>` with checkmark SVG)
- Check animation: `transition-all duration-150` + `scale-[0.95]` on active (D-03)
- Checked state: strike-through text + `text-muted-foreground`, icon fill `#646efb`
- Named export: `export function ChecklistItem`

---

### `src/components/checklist/CategorySection.tsx` (component, CRUD)

**Analog:** `src/components/onboarding/TileSelect.tsx` (lines 1–39)

**Collapsible container pattern** (lines 15–38 of TileSelect):
```typescript
export function TileSelect({ options, value, onChange }: TileSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className="flex h-[88px] flex-col items-center justify-center rounded-[14px] transition-all duration-150"
            style={{
              backgroundColor: isSelected ? '#d2d5fc' : '#ffffff',
              border: isSelected ? '2px solid #646efb' : '1.5px solid #d2d5fc',
            }}
          >
```

**Key rules for CategorySection.tsx:**
- `'use client'` — collapsible with local `useState<boolean>` for open/closed
- Props: `category: ChecklistCategory`, `tasks: Task[]`, `checkedIds: string[]`, `onToggle: (id: string) => void`
- Header row: category icon + label + count badge + chevron (rotates on open)
- Body: `{isOpen && <div className="flex flex-col gap-2 pt-2">{tasks.map(...)}</div>}`
- Chevron rotation: `className={\`transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`}`
- Named export: `export function CategorySection`

---

### `src/components/checklist/MustDoSection.tsx` (component, CRUD)

**Analog:** `src/components/onboarding/ToggleList.tsx` (lines 1–34)

**Key rules for MustDoSection.tsx:**
- `'use client'` — delegates toggle to parent via callback
- Props: `tasks: Task[]`, `checkedIds: string[]`, `onToggle: (id: string) => void`
- Always expanded (no collapse toggle)
- Red "Must-Do" badge on header: `<Badge variant="destructive">Must-Do</Badge>`
- Per-item: `<ChecklistItem>` — reuse the ChecklistItem component
- Named export: `export function MustDoSection`

---

### `src/components/checklist/AddItemSheet.tsx` (component, CRUD)

**Analog:** `src/components/onboarding/WeiterButton.tsx` (lines 1–21) + `src/components/ui/input.tsx`

**Button/submit pattern** (WeiterButton lines 9–20):
```typescript
export function WeiterButton({ label = 'Weiter', onClick, disabled = false }: WeiterButtonProps) {
  return (
    <div className="px-4 pb-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className="h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-all duration-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {label}
      </button>
    </div>
  );
}
```

**Key rules for AddItemSheet.tsx:**
- `'use client'` — controlled input + submit
- Props: `onAdd: (title: string) => void`, `onClose: () => void`
- Bottom sheet pattern: fixed overlay + slide-up panel (no shadcn Sheet dependency needed — custom)
- Input: `<Input className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] ..." />`
- Submit button: copy WeiterButton class exactly — `h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white`
- Named export: `export function AddItemSheet`

---

### `src/components/timeline/TimelineBucket.tsx` (component, transform)

**Analog:** `src/components/onboarding/TileSelect.tsx` (lines 15–38)

**Key rules for TimelineBucket.tsx:**
- `'use client'` — delegates onToggle
- Props: `bucket: TimelineBucket`, `tasks: Task[]`, `checkedIds: string[]`, `onToggle: (id: string) => void`
- Color coding via `bucket.colorClass` (Tailwind class string): green=done, orange=this week, red=overdue
- Always expanded — no collapse
- Header shows bucket label + color dot + count
- Renders `<ChecklistItem>` per task
- Named export: `export function TimelineBucket`

---

### `src/components/guide/GuideStepList.tsx` (component, request-response)

**Analog:** `src/components/onboarding/StepIndicator.tsx` (numbered step visual pattern)

**Key rules for GuideStepList.tsx:**
- No `'use client'` needed if purely presentational (no interaction)
- Props: `steps: GuideStep[]` where `GuideStep = { number: number; title: string; body: string; link?: { label: string; href: string } }`
- Render numbered step cards: step number circle (bg `#646efb`, text white) + title + body text
- Optional city link: `<a href={step.link.href} className="text-primary underline">` (D-09)
- Named export: `export function GuideStepList`

---

### `src/components/ui/SegmentedControl.tsx` (component, event-driven)

**Analog:** `src/components/onboarding/TileSelect.tsx` (lines 1–39)

**Selected state pattern** (lines 19–31):
```typescript
const isSelected = option.value === value;
return (
  <button
    key={option.value}
    onClick={() => onChange(option.value)}
    className="flex h-[88px] flex-col items-center justify-center rounded-[14px] transition-all duration-150"
    style={{
      backgroundColor: isSelected ? '#d2d5fc' : '#ffffff',
      border: isSelected ? '2px solid #646efb' : '1.5px solid #d2d5fc',
    }}
  >
```

**Key rules for SegmentedControl.tsx:**
- `'use client'` — interactive selection
- Generic props: `options: { value: string; label: string }[]`, `value: string`, `onChange: (value: string) => void`
- Layout: `<div className="flex rounded-[10px] border border-[#d2d5fc] bg-white p-[2px]">`
- Each segment: `<button>` filling equal width (`flex-1`)
- Active segment: `bg-primary text-white rounded-[8px]`; inactive: `text-muted-foreground`
- Height: `h-[36px]` — compact toggle, not tall tile
- Named export: `export function SegmentedControl`

---

### `src/components/uebergabe/ConditionToggle.tsx` (component, event-driven)

**Analog:** `src/components/onboarding/ToggleList.tsx` (lines 1–34) — exact pattern

**Full file pattern to copy** (ToggleList lines 1–34):
```typescript
'use client';

import { Switch } from '@/components/ui/switch';

// ... props interface

export function ToggleList({ items, values, onChange }: ToggleListProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex h-[56px] items-center justify-between rounded-[10px] bg-white px-4"
        >
          <span className="text-[16px] font-normal text-foreground">{item.label}</span>
          <Switch
            checked={values[item.key] ?? false}
            onCheckedChange={(checked) => onChange(item.key, checked)}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#d2d5fc]"
          />
        </div>
      ))}
    </div>
  );
}
```

**Key rules for ConditionToggle.tsx:**
- Props: `label: string`, `checked: boolean`, `onChange: (checked: boolean) => void`
- Single-item variant of ToggleList (not a list — one row per condition)
- Keep `h-[56px]`, `rounded-[10px] bg-white px-4` row styling exactly
- Switch `className` identical: `data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#d2d5fc]`
- Named export: `export function ConditionToggle`

---

### `src/components/uebergabe/PhotoSlot.tsx` (component, file-I/O)

**Analog:** `src/components/onboarding/TileSelect.tsx` (lines 20–32) — button + selected state

**Button selected state pattern** (lines 20–32):
```typescript
<button
  key={option.value}
  onClick={() => onChange(option.value)}
  className="flex h-[88px] flex-col items-center justify-center rounded-[14px] transition-all duration-150"
  style={{
    backgroundColor: isSelected ? '#d2d5fc' : '#ffffff',
    border: isSelected ? '2px solid #646efb' : '1.5px solid #d2d5fc',
  }}
>
```

**Key rules for PhotoSlot.tsx:**
- `'use client'` — file input interaction
- Props: `slotIndex: number`, `imageUrl: string | null`, `onCapture: (index: number, dataUrl: string) => void`
- Empty state: dashed border box `border-[1.5px] border-dashed border-[#d2d5fc]` with `+` icon, `bg-white`
- Filled state: `<img>` preview filling the slot, `rounded-[10px]`
- Hidden `<input type="file" accept="image/*" capture="environment">` triggered on button click
- Note: Phase 2 "Protokoll exportieren" shows Premium badge — not functional (from CONTEXT specifics)
- Named export: `export function PhotoSlot`

---

## Shared Patterns

### Brand Color Usage
**Source:** `src/app/globals.css` (lines 52–87) and `src/components/nav/BottomNav.tsx` (lines 24–26)

CSS custom properties (use these everywhere — never hardcode hex outside of inline styles matching these values):
```css
--primary: #646efb;
--primary-light: #d2d5fc;
--foreground: #1c2642;
--muted-foreground: #5b6377;
--background: #f6f7f7;
--destructive: #ef4444;
--card: #ffffff;
--border: #d2d5fc;
```

Inline style vs Tailwind rule: when a hex value IS a CSS token, prefer Tailwind semantic class (`text-foreground`, `bg-primary`, `border-border`). Use inline `style={{ color: '#646efb' }}` only for SVG/icon color as in BottomNav line 25.

### `'use client'` Placement
**Source:** `src/components/nav/BottomNav.tsx` line 1, `src/components/onboarding/ToggleList.tsx` line 1

```typescript
'use client';
// blank line
import ...
```

Apply to: all interactive components and all page files that read from Zustand stores.
Do NOT add to: `src/lib/tasks.ts`, `src/types/`, pure presentational components with no hooks.

### Tailwind Typography Scale
**Source:** `src/app/(onboarding)/step/[step]/page.tsx` (lines 108–129)

```typescript
// Page title
<h1 className="text-[20px] font-bold leading-[1.3] text-foreground">

// Body / description
<p className="mt-2 text-[14px] font-normal leading-[1.5] text-muted-foreground">

// Labels
<label className="text-[14px] font-bold text-foreground">

// Small / hint
<span className="text-[14px] font-normal text-muted-foreground">
```

### Input / Form Field Styling
**Source:** `src/app/(onboarding)/step/[step]/page.tsx` (lines 144, 175)

```typescript
className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] font-normal text-foreground focus:border-primary focus:outline-none"
```

Apply to: Kostenrechner inputs, AddItemSheet input.

### Layout Shell (scrollable page under BottomNav)
**Source:** `src/app/(main)/layout.tsx` (lines 3–17)

```typescript
// layout.tsx already adds paddingBottom: 'calc(56px + env(safe-area-inset-bottom))'
// Page components use:
<div className="flex h-dvh flex-col bg-background">
  {/* header — fixed height */}
  <div className="px-4 pt-4"> ... </div>
  {/* scrollable body */}
  <div className="flex-1 overflow-y-auto px-4 pb-4"> ... </div>
</div>
```

Apply to: all `(main)` page files.

### Back Button
**Source:** `src/app/(onboarding)/step/[step]/page.tsx` (lines 109–115)

```typescript
<button
  onClick={handleBack}
  className="mt-3 flex items-center gap-1 text-[14px] font-bold text-muted-foreground"
  aria-label="Zurück"
>
  ← Zurück
</button>
```

Apply to: kostenrechner/page.tsx, anleitungen/[slug]/page.tsx, uebergabeprotokoll/page.tsx.

### Named Export Convention
**Source:** All component files (`BottomNav.tsx`, `TileSelect.tsx`, `ToggleList.tsx`, `WeiterButton.tsx`)

Pattern: `export function ComponentName(...)` — never `export default` for components.
Exception: Next.js page files use `export default function PageName()`.

### `cn()` Utility for Class Merging
**Source:** `src/lib/utils.ts` (lines 1–6)

```typescript
import { cn } from "@/lib/utils"
// Usage:
className={cn("base-classes", conditionalClass && "conditional", className)}
```

Apply to: all components that accept a `className` prop or have conditional class logic.

### Zustand Store Action Pattern
**Source:** `src/store/onboardingStore.ts` (lines 35–53)

```typescript
// Spread-update — never mutate state directly
setMoveDate: (date) =>
  set((s) => ({ data: { ...s.data, moveDate: date } })),

// Nested spread for nested objects:
setAlreadyDone: (key, value) =>
  set((s) => ({
    data: {
      ...s.data,
      alreadyDone: { ...s.data.alreadyDone, [key]: value },
    },
  })),
```

Apply to: `checklistStore.ts` — use same spread pattern for `checkedIds` array toggle and `customItems` push/remove.

### Switch (shadcn) Color Classes
**Source:** `src/components/onboarding/ToggleList.tsx` (line 27)

```typescript
className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#d2d5fc]"
```

Apply to: ConditionToggle.tsx and any other Switch usage.

---

## No Analog Found

All 17 files have analogs. No files require RESEARCH.md patterns as primary reference.

---

## Metadata

**Analog search scope:** `src/store/`, `src/components/`, `src/app/`, `src/types/`, `src/lib/`
**Files scanned:** 29 source files
**Pattern extraction date:** 2026-05-08
