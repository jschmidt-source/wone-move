---
phase: 01-shell-brand-onboarding
plan: 3
type: execute
wave: 2
depends_on:
  - 01-PLAN-1
files_modified:
  - src/components/onboarding/StepIndicator.tsx
  - src/components/onboarding/WeiterButton.tsx
  - src/components/onboarding/TileSelect.tsx
  - src/components/onboarding/ToggleList.tsx
  - src/app/(onboarding)/step/[step]/page.tsx
autonomous: true
requirements:
  - ONB-01
  - ONB-03
  - ONB-04
  - UX-03
  - UX-04

must_haves:
  truths:
    - "Step indicator shows 5 dots with correct active (#646efb 12px), completed (#646efb 8px), and inactive (#d2d5fc 8px) states"
    - "Step 1 shows native date input, selected date displayed in pill badge below picker"
    - "Step 2 shows two stacked inputs — PLZ (inputmode=numeric) and city (inputmode=text)"
    - "Step 3 shows 4-tile 2x2 grid, single-select, Weiter disabled until selection made"
    - "Step 4 shows 4-tile 2x2 grid with emoji labels, same single-select behavior"
    - "Step 5 shows 4 toggle rows using shadcn Switch, starts all OFF, 'Fertig' always enabled"
    - "Each step saves its input to the Zustand store on Weiter/Fertig tap"
    - "Tapping Weiter navigates to next step; step 5 Fertig navigates to /celebration"
  artifacts:
    - path: "src/components/onboarding/StepIndicator.tsx"
      provides: "Reusable dot indicator for steps 1-5"
      exports: ["StepIndicator"]
    - path: "src/components/onboarding/TileSelect.tsx"
      provides: "2x2 single-select tile grid used on steps 3 and 4"
      exports: ["TileSelect"]
    - path: "src/components/onboarding/ToggleList.tsx"
      provides: "Toggle row list for step 5 using shadcn Switch"
      exports: ["ToggleList"]
    - path: "src/app/(onboarding)/step/[step]/page.tsx"
      provides: "Dynamic route rendering all 5 onboarding steps"
      contains: "useParams"
  key_links:
    - from: "src/app/(onboarding)/step/[step]/page.tsx"
      to: "useOnboardingStore"
      via: "store action calls on Weiter/Fertig"
      pattern: "useOnboardingStore"
    - from: "WeiterButton tap on step 5"
      to: "/celebration"
      via: "router.push('/celebration')"
      pattern: "celebration"
---

<objective>
Build all 5 onboarding steps as shared components and a single dynamic route `/step/[step]`. Each step renders the correct UI per UI-SPEC, saves its data to the Zustand store on proceed, and navigates forward.

Purpose: This is the core onboarding flow — ONB-01, ONB-03, ONB-04 all live here. The dynamic route pattern keeps the component tree clean while each step gets its own UI slice.

Output: StepIndicator, WeiterButton, TileSelect, ToggleList components + dynamic step page routing all 5 steps, each with store integration.
</objective>

<execution_context>
@C:/Users/JilSchmidt/Projects/Wone MOVE/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/ROADMAP.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md

<interfaces>
<!-- From 01-PLAN-1 — import from these files -->
From src/types/onboarding.ts:
```typescript
export type MovingOrg = 'alleine' | 'freunde' | 'firma' | 'gemischt';
export type Priority = 'guenstig' | 'schnell' | 'stressfrei' | 'nachhaltig';
export interface AlreadyDone {
  newApartment: boolean;
  transport: boolean;
  electricityInternet: boolean;
  ummeldungPrepared: boolean;
}
export interface OnboardingData { ... }
export type OnboardingStep = 1 | 2 | 3 | 4 | 5;
```

From src/store/onboardingStore.ts:
```typescript
export const useOnboardingStore = create<OnboardingStore>()(persist(...));
// Actions: setMoveDate(date: string), setLocation(plz, city), setMovingOrg(org),
//          setPriority(priority), setAlreadyDone(key, value), complete()
```

From src/components/ui/switch.tsx: shadcn Switch component
From src/components/ui/input.tsx: shadcn Input component
From src/components/ui/button.tsx: shadcn Button component

Tailwind tokens (from 01-PLAN-1):
- bg-primary = #646efb, bg-primary-light (use bg-[#d2d5fc]) for inactive/selected states
- text-foreground = #1c2642, text-muted-foreground = #5b6377
- border-[#d2d5fc] for rest state, border-primary for active/selected
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Build StepIndicator, WeiterButton, TileSelect, and ToggleList components</name>
  <files>
    src/components/onboarding/StepIndicator.tsx,
    src/components/onboarding/WeiterButton.tsx,
    src/components/onboarding/TileSelect.tsx,
    src/components/onboarding/ToggleList.tsx
  </files>

  <read_first>
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "3. Onboarding Step Indicator" — dot spec: 8px inactive #d2d5fc, 12px active #646efb, 8px completed #646efb, 4px gap; "Schritt X von 5" label 14px bold #5b6377)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "4. Onboarding Schritt 1" — Weiter button: full-width, 52px, #646efb, white text 16px bold, border-radius 12px, 16px above bottom, disabled state opacity 0.4)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "6. Onboarding Schritt 3" — Tile spec: 2 columns 12px gap, height 88px, border-radius 14px, default white border-1.5px #d2d5fc, selected bg #d2d5fc border-2px #646efb; single-select)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "8. Onboarding Schritt 5" — Toggle rows: 56px height, white card bg border-radius 10px, shadcn Switch active #646efb inactive #d2d5fc; 8px gap between rows)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Animation & Motion Contract" — Tile selection: 150ms ease; Toggle switch: shadcn default 200ms)
  </read_first>

  <action>
Create four components. Each is a client component where interactivity is required.

---

**src/components/onboarding/StepIndicator.tsx**

Props: `{ currentStep: number; totalSteps?: number }` (totalSteps defaults to 5)

```tsx
'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function StepIndicator({ currentStep, totalSteps = 5 }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2 pt-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          return (
            <div
              key={step}
              className="rounded-full transition-all duration-150"
              style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '12px' : '8px',
                backgroundColor: isActive || isCompleted ? '#646efb' : '#d2d5fc',
              }}
            />
          );
        })}
      </div>
      <p className="text-[14px] font-bold leading-[1.4] text-muted-foreground">
        Schritt {currentStep} von {totalSteps}
      </p>
    </div>
  );
}
```

---

**src/components/onboarding/WeiterButton.tsx**

Props: `{ label?: string; onClick: () => void; disabled?: boolean }`

```tsx
'use client';

interface WeiterButtonProps {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
}

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

Key: `disabled:opacity-40` satisfies UI-SPEC "opacity 0.4, not tappable" requirement. `pointer-events-none` is not needed — HTML `disabled` attribute prevents click events on `<button>`.

---

**src/components/onboarding/TileSelect.tsx**

Props:
```typescript
interface TileOption {
  value: string;
  label: string;
  emoji?: string;
}
interface TileSelectProps {
  options: TileOption[];
  value: string | null;
  onChange: (value: string) => void;
}
```

```tsx
'use client';

interface TileOption {
  value: string;
  label: string;
  emoji?: string;
}

interface TileSelectProps {
  options: TileOption[];
  value: string | null;
  onChange: (value: string) => void;
}

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
            {option.emoji && (
              <span className="mb-1 text-2xl leading-none">{option.emoji}</span>
            )}
            <span className="text-[14px] font-bold text-foreground">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
```

Single-select enforced: onChange always sets the new value; parent holds state and passes current value down. Selecting an already-selected tile keeps it selected (idempotent, as per UI-SPEC single-select).

---

**src/components/onboarding/ToggleList.tsx**

Props:
```typescript
interface ToggleItem {
  key: string;
  label: string;
}
interface ToggleListProps {
  items: ToggleItem[];
  values: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
}
```

```tsx
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

shadcn Switch uses `data-[state=checked]` CSS selector for active color. Override to `#646efb` (primary) for checked state, `#d2d5fc` (primary-light) for unchecked — matching UI-SPEC "active color #646efb, inactive #d2d5fc".
  </action>

  <verify>
    <automated>
      cd "C:/Users/JilSchmidt/Projects/Wone MOVE" &amp;&amp;
      node -e "const fs=require('fs');
        const files=[
          'src/components/onboarding/StepIndicator.tsx',
          'src/components/onboarding/WeiterButton.tsx',
          'src/components/onboarding/TileSelect.tsx',
          'src/components/onboarding/ToggleList.tsx',
        ];
        const contents=files.map(f=>[f,fs.readFileSync(f,'utf8')]);
        const checks=[
          ['StepIndicator exports', contents[0][1].includes('export function StepIndicator')],
          ['StepIndicator Schritt text', contents[0][1].includes('Schritt')],
          ['StepIndicator #646efb', contents[0][1].includes('#646efb')],
          ['StepIndicator #d2d5fc', contents[0][1].includes('#d2d5fc')],
          ['WeiterButton exports', contents[1][1].includes('export function WeiterButton')],
          ['WeiterButton h-52px', contents[1][1].includes('h-[52px]')],
          ['WeiterButton disabled:opacity', contents[1][1].includes('disabled:opacity')],
          ['TileSelect exports', contents[2][1].includes('export function TileSelect')],
          ['TileSelect h-88px', contents[2][1].includes('h-[88px]')],
          ['TileSelect 2x2 grid', contents[2][1].includes('grid-cols-2')],
          ['ToggleList exports', contents[3][1].includes('export function ToggleList')],
          ['ToggleList Switch', contents[3][1].includes('Switch')],
          ['ToggleList h-56px', contents[3][1].includes('h-[56px]')],
        ];
        const failed=checks.filter(([,v])=>!v).map(([k])=>k);
        if(failed.length){console.error('FAIL:',failed.join(', '));process.exit(1);}
        console.log('PASS: all onboarding components verified');"
    </automated>
  </verify>

  <acceptance_criteria>
    - `src/components/onboarding/StepIndicator.tsx` exports `StepIndicator`, uses inline style with `#646efb` for active/completed dots and `#d2d5fc` for inactive, includes "Schritt X von 5" label
    - `src/components/onboarding/WeiterButton.tsx` exports `WeiterButton`, uses `h-[52px]`, `disabled:opacity-40`
    - `src/components/onboarding/TileSelect.tsx` exports `TileSelect`, uses `grid-cols-2`, `h-[88px]`, `rounded-[14px]`
    - `src/components/onboarding/ToggleList.tsx` exports `ToggleList`, imports `Switch` from shadcn, uses `h-[56px]`, `rounded-[10px]`
    - All four files are TypeScript with proper prop interfaces
    - No TypeScript errors when running `npm run build`
  </acceptance_criteria>

  <done>Four reusable onboarding components created with exact UI-SPEC dimensions, colors, and interaction behaviors.</done>
</task>

<task type="auto">
  <name>Task 2: Dynamic step page — all 5 onboarding steps wired to Zustand store</name>
  <files>src/app/(onboarding)/step/[step]/page.tsx</files>

  <read_first>
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Sections "4. Onboarding Schritt 1" through "8. Onboarding Schritt 5" — screen titles, input specs, tile labels, toggle labels, Weiter/Fertig copy)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Copywriting Contract" — all exact German copy strings locked)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Layout Rules" — 16px screen padding, content area, fixed bottom CTA)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Animation & Motion Contract" — slide left 250ms ease-in-out on step advance)
  </read_first>

  <action>
Create `src/app/(onboarding)/step/[step]/page.tsx` as a single dynamic route rendering all 5 steps.

This is a client component (reads params + manages local state before persisting to store).

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { WeiterButton } from '@/components/onboarding/WeiterButton';
import { TileSelect } from '@/components/onboarding/TileSelect';
import { ToggleList } from '@/components/onboarding/ToggleList';
import { Input } from '@/components/ui/input';

// ─── Step 3 tiles ───────────────────────────────────────────────────────────
const ORG_OPTIONS = [
  { value: 'alleine', label: 'Ich alleine' },
  { value: 'freunde', label: 'Mit Freunden' },
  { value: 'firma',   label: 'Umzugsfirma' },
  { value: 'gemischt', label: 'Gemischt' },
];

// ─── Step 4 tiles ───────────────────────────────────────────────────────────
const PRIORITY_OPTIONS = [
  { value: 'guenstig',   label: 'Günstig',    emoji: '💰' },
  { value: 'schnell',    label: 'Schnell',     emoji: '⚡' },
  { value: 'stressfrei', label: 'Stressfrei',  emoji: '😌' },
  { value: 'nachhaltig', label: 'Nachhaltig',  emoji: '🌱' },
];

// ─── Step 5 toggle items ────────────────────────────────────────────────────
const TOGGLE_ITEMS = [
  { key: 'newApartment',        label: 'Neue Wohnung gefunden' },
  { key: 'transport',           label: 'Transport organisiert' },
  { key: 'electricityInternet', label: 'Strom & Internet geregelt' },
  { key: 'ummeldungPrepared',   label: 'Ummeldung vorbereitet' },
];

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  const stepParam = Number(params.step);
  const currentStep = (stepParam >= 1 && stepParam <= 5 ? stepParam : 1) as 1 | 2 | 3 | 4 | 5;

  const store = useOnboardingStore();
  const data = store.data;

  // ─── Local state (synced from store on mount) ──────────────────────────
  const [moveDate, setMoveDateLocal] = useState(data.moveDate ?? '');
  const [plz, setPlz] = useState(data.targetPlz);
  const [city, setCity] = useState(data.fromCity);
  const [movingOrg, setMovingOrgLocal] = useState(data.movingOrg);
  const [priority, setPriorityLocal] = useState(data.priority);
  const [alreadyDone, setAlreadyDoneLocal] = useState({ ...data.alreadyDone });

  // Sync local state when navigating back (params change)
  useEffect(() => {
    setMoveDateLocal(data.moveDate ?? '');
    setPlz(data.targetPlz);
    setCity(data.fromCity);
    setMovingOrgLocal(data.movingOrg);
    setPriorityLocal(data.priority);
    setAlreadyDoneLocal({ ...data.alreadyDone });
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Navigation ────────────────────────────────────────────────────────
  function handleWeiter() {
    // Persist current step data to store
    if (currentStep === 1) store.setMoveDate(moveDate);
    if (currentStep === 2) store.setLocation(plz, city);
    if (currentStep === 3) store.setMovingOrg(movingOrg);
    if (currentStep === 4) store.setPriority(priority);
    if (currentStep === 5) {
      // alreadyDone is already updated incrementally via toggle handler
      store.complete();
      router.push('/celebration');
      return;
    }
    router.push(`/step/${currentStep + 1}`);
  }

  function handleBack() {
    if (currentStep === 1) { router.push('/welcome'); return; }
    router.push(`/step/${currentStep - 1}`);
  }

  // ─── Disabled logic ────────────────────────────────────────────────────
  const isWeiterDisabled =
    (currentStep === 1 && !moveDate) ||
    (currentStep === 3 && !movingOrg) ||
    (currentStep === 4 && !priority);

  // ─── Step titles ───────────────────────────────────────────────────────
  const titles: Record<number, string> = {
    1: 'Wann ziehst du um?',
    2: 'Wohin ziehst du?',
    3: 'Wie organisierst du deinen Umzug?',
    4: 'Was ist dir am wichtigsten?',
    5: 'Was hast du schon erledigt?',
  };

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header with back button and step indicator */}
      <div className="px-4">
        <button
          onClick={handleBack}
          className="mt-3 flex items-center gap-1 text-[14px] font-bold text-muted-foreground"
          aria-label="Zurück"
        >
          ← Zurück
        </button>
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Screen title */}
      <div className="px-4 pt-6">
        <h1 className="text-[20px] font-bold leading-[1.3] text-foreground">
          {titles[currentStep]}
        </h1>

        {/* Schritt 5 hint text */}
        {currentStep === 5 && (
          <p className="mt-2 text-[14px] font-normal leading-[1.5] text-muted-foreground">
            Keine Sorge — du kannst alles jederzeit ändern.
          </p>
        )}
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">

        {/* ── Step 1: Umzugsdatum ── */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4">
            <input
              type="date"
              value={moveDate}
              onChange={(e) => setMoveDateLocal(e.target.value)}
              placeholder="Datum auswählen"
              className="h-[52px] w-full rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] font-normal text-foreground focus:border-primary focus:outline-none"
            />
            {moveDate && (
              <span className="inline-flex self-start rounded-full bg-[#d2d5fc] px-3 py-1 text-[14px] font-bold text-primary">
                {new Date(moveDate + 'T00:00:00').toLocaleDateString('de-DE', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            )}
            {!moveDate && (
              <p className="text-[14px] text-destructive">
                Bitte wähle dein Umzugsdatum aus.
              </p>
            )}
          </div>
        )}

        {/* ── Step 2: Wohin? ── */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-foreground">
                PLZ der neuen Wohnung
              </label>
              <Input
                type="text"
                inputMode="numeric"
                value={plz}
                onChange={(e) => setPlz(e.target.value)}
                placeholder="z.B. 80331"
                maxLength={5}
                className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] font-normal text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-foreground">
                Von welcher Stadt?
              </label>
              <Input
                type="text"
                inputMode="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="z.B. Hamburg"
                className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] font-normal text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* ── Step 3: Umzugsorganisation ── */}
        {currentStep === 3 && (
          <TileSelect
            options={ORG_OPTIONS}
            value={movingOrg}
            onChange={(v) => setMovingOrgLocal(v as typeof movingOrg)}
          />
        )}

        {/* ── Step 4: Priorität ── */}
        {currentStep === 4 && (
          <TileSelect
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={(v) => setPriorityLocal(v as typeof priority)}
          />
        )}

        {/* ── Step 5: Hast du bereits? ── */}
        {currentStep === 5 && (
          <ToggleList
            items={TOGGLE_ITEMS}
            values={alreadyDone}
            onChange={(key, value) => {
              const updated = { ...alreadyDone, [key]: value };
              setAlreadyDoneLocal(updated);
              store.setAlreadyDone(key as keyof typeof alreadyDone, value);
            }}
          />
        )}
      </div>

      {/* Fixed bottom CTA */}
      <WeiterButton
        label={currentStep === 5 ? 'Fertig' : 'Weiter'}
        onClick={handleWeiter}
        disabled={isWeiterDisabled}
      />
    </div>
  );
}
```

**Important implementation notes:**
- Step 1 error message "Bitte wähle dein Umzugsdatum aus." shows only when moveDate is empty — satisfies Copywriting Contract
- Step 1 date displayed as German locale pill: `toLocaleDateString('de-DE', ...)` per UI-SPEC "Selected date displayed in a pill badge"
- Step 2 PLZ input has `inputMode="numeric"` and `maxLength={5}` per UI-SPEC
- Steps 3 and 4 Weiter is disabled until a tile is selected — `isWeiterDisabled` logic handles both
- Step 5 Fertig is always enabled (all toggles optional per UI-SPEC)
- Step 5 toggles write to store incrementally (each toggle tap calls `store.setAlreadyDone`)
- `store.complete()` is called on step 5 Fertig before navigating to /celebration
- Back button on step 1 returns to /welcome
- `h-dvh` for full dynamic viewport height on mobile
- Content area is scrollable (`flex-1 overflow-y-auto`) while CTA is fixed at bottom
  </action>

  <verify>
    <automated>
      cd "C:/Users/JilSchmidt/Projects/Wone MOVE" &amp;&amp;
      node -e "const fs=require('fs');
        const src=fs.readFileSync('src/app/(onboarding)/step/[step]/page.tsx','utf8');
        const checks=[
          ['use client', src.includes(\"'use client'\")],
          ['useParams', src.includes('useParams')],
          ['useOnboardingStore', src.includes('useOnboardingStore')],
          ['StepIndicator', src.includes('StepIndicator')],
          ['TileSelect', src.includes('TileSelect')],
          ['ToggleList', src.includes('ToggleList')],
          ['WeiterButton', src.includes('WeiterButton')],
          ['Wann ziehst du um', src.includes('Wann ziehst du um')],
          ['Wohin ziehst du', src.includes('Wohin ziehst du')],
          ['Wie organisierst', src.includes('Wie organisierst')],
          ['Was ist dir', src.includes('Was ist dir am wichtigsten')],
          ['Was hast du', src.includes('Was hast du schon erledigt')],
          ['Keine Sorge', src.includes('Keine Sorge')],
          ['Fertig label step5', src.includes(\"'Fertig'\") || src.includes('\"Fertig\"')],
          ['celebration route', src.includes('celebration')],
          ['store.complete()', src.includes('store.complete()')],
          ['PLZ placeholder', src.includes('z.B. 80331')],
          ['Hamburg placeholder', src.includes('z.B. Hamburg')],
          ['inputMode numeric', src.includes('numeric')],
        ];
        const failed=checks.filter(([,v])=>!v).map(([k])=>k);
        if(failed.length){console.error('FAIL:',failed.join(', '));process.exit(1);}
        console.log('PASS: dynamic step page verified');"
    </automated>
  </verify>

  <acceptance_criteria>
    - `src/app/(onboarding)/step/[step]/page.tsx` exists and is a `'use client'` component
    - File imports `useOnboardingStore`, `StepIndicator`, `WeiterButton`, `TileSelect`, `ToggleList`
    - File uses `useParams` to read the dynamic `[step]` segment
    - Step 1 title is `"Wann ziehst du um?"` (exact string)
    - Step 2 title is `"Wohin ziehst du?"` (exact string)
    - Step 3 title is `"Wie organisierst du deinen Umzug?"` (exact string)
    - Step 4 title is `"Was ist dir am wichtigsten?"` (exact string)
    - Step 5 title is `"Was hast du schon erledigt?"` (exact string)
    - Step 5 hint `"Keine Sorge — du kannst alles jederzeit ändern."` is present
    - Step 5 button label is `"Fertig"` (not "Weiter")
    - File navigates to `/celebration` after step 5
    - File calls `store.complete()` before navigating to celebration
    - PLZ input placeholder is `"z.B. 80331"`, city placeholder is `"z.B. Hamburg"`
    - PLZ input has `inputMode` set to `"numeric"` (or `inputmode="numeric"`)
    - `npm run build` passes with no TypeScript errors
  </acceptance_criteria>

  <done>All 5 onboarding steps rendered by a single dynamic route, each saving correct data to Zustand store, with navigation to /celebration after step 5.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| User form input → Zustand store | PLZ and city strings from text inputs written to store without server validation |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-06 | Tampering | PLZ input | mitigate | `maxLength={5}` enforced on input; PLZ is display-only in prototype (no server lookup); Copywriting Contract defines inline error "Bitte gib eine gültige PLZ ein (5 Ziffern)." — add this validation in Step 2 if PLZ is non-numeric or length != 5 |
| T-01-07 | Denial of Service | Dynamic route [step] | mitigate | Clamp step param: `stepParam >= 1 and <= 5` check with fallback to 1; invalid params (e.g., /step/99) render step 1 without error |
| T-01-08 | Information Disclosure | Onboarding data in localStorage | accept | No PII beyond move date, PLZ, city — same as T-01-02 |
</threat_model>

<verification>
After Plan 3 completes:
- http://localhost:3000/step/1 shows "Wann ziehst du um?" with date input and StepIndicator showing dot 1 active
- Selecting a date shows German-locale pill badge below input
- Tapping Weiter navigates to /step/2 and stores moveDate in localStorage
- /step/2 shows PLZ and city inputs with correct placeholders
- /step/3 shows 2×2 tile grid, Weiter disabled until tile selected
- /step/4 shows emoji tile grid, same disabled behavior
- /step/5 shows 4 toggle rows with shadcn Switch, Fertig always enabled
- Tapping Fertig on step 5 navigates to /celebration
- After reloading /step/1, previously entered date is present in store
</verification>

<success_criteria>
- 4 reusable onboarding components created with exact UI-SPEC specs
- Dynamic route handles all 5 steps with correct titles, copy, inputs, and components
- Each step saves data to Zustand store (persisted to localStorage) before navigating forward
- Weiter disabled on steps 1, 3, 4 when required selection is missing
- Step 5 Fertig always enabled, calls store.complete(), navigates to /celebration
</success_criteria>

<output>
After completion, create `.planning/phases/01-shell-brand-onboarding/01-03-SUMMARY.md`
</output>
