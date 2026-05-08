---
phase: 01-shell-brand-onboarding
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - next.config.ts
  - tailwind.config.ts
  - components.json
  - src/app/globals.css
  - src/app/layout.tsx
  - src/types/onboarding.ts
  - src/store/onboardingStore.ts
  - src/lib/utils.ts
  - src/components/ui/button.tsx
  - src/components/ui/input.tsx
  - src/components/ui/switch.tsx
autonomous: true
requirements:
  - ONB-03
  - UX-04

must_haves:
  truths:
    - "npm run dev starts without errors on localhost:3000"
    - "components.json exists confirming shadcn is initialized"
    - "Brand color #646efb is wired as the primary Tailwind token"
    - "Plus Jakarta Sans font loads via next/font/google"
    - "Zustand store persists onboarding data to localStorage key wone-onboarding"
  artifacts:
    - path: "components.json"
      provides: "shadcn configuration"
      contains: "wone"
    - path: "tailwind.config.ts"
      provides: "brand token wiring"
      contains: "#646efb"
    - path: "src/app/globals.css"
      provides: "CSS variables for all brand colors"
      contains: "--primary"
    - path: "src/app/layout.tsx"
      provides: "root layout with Plus Jakarta Sans font"
      contains: "Plus_Jakarta_Sans"
    - path: "src/types/onboarding.ts"
      provides: "OnboardingData interface — contract for all onboarding screens"
      exports: ["OnboardingData"]
    - path: "src/store/onboardingStore.ts"
      provides: "Zustand store with localStorage persistence"
      exports: ["useOnboardingStore"]
  key_links:
    - from: "src/store/onboardingStore.ts"
      to: "localStorage"
      via: "Zustand persist middleware"
      pattern: "persist.*wone-onboarding"
    - from: "src/app/layout.tsx"
      to: "Plus_Jakarta_Sans"
      via: "next/font/google import"
      pattern: "Plus_Jakarta_Sans"
---

<objective>
Bootstrap the Next.js 15 project with the full brand design system wired, all type contracts defined, and Zustand state store ready for onboarding screens to consume.

Purpose: Every subsequent wave depends on this scaffold. Nothing can be built until Next.js runs, shadcn is initialized, brand tokens are live, types are defined, and state persistence is proven.

Output: Running dev server, components.json, brand-wired tailwind.config.ts, OnboardingData interface, useOnboardingStore with localStorage persistence, and 3 shadcn components added (button, input, switch).
</objective>

<execution_context>
@C:/Users/JilSchmidt/Projects/Wone MOVE/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/PROJECT.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/ROADMAP.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-SKELETON.md

<interfaces>
<!-- Contracts defined by this plan. Wave 2+ plans import from these files. -->
<!-- Do not deviate from these definitions without updating downstream plans. -->

From src/types/onboarding.ts (CREATE THIS):
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
  moveDate: string | null;       // ISO date string "YYYY-MM-DD" or null
  targetPlz: string;             // e.g. "80331"
  fromCity: string;              // e.g. "Hamburg"
  movingOrg: MovingOrg | null;
  priority: Priority | null;
  alreadyDone: AlreadyDone;
  completed: boolean;
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;
```

From src/store/onboardingStore.ts (CREATE THIS):
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OnboardingData } from '@/types/onboarding';

interface OnboardingStore {
  data: OnboardingData;
  setMoveDate: (date: string) => void;
  setLocation: (plz: string, city: string) => void;
  setMovingOrg: (org: OnboardingData['movingOrg']) => void;
  setPriority: (priority: OnboardingData['priority']) => void;
  setAlreadyDone: (key: keyof OnboardingData['alreadyDone'], value: boolean) => void;
  complete: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(/* ... */, { name: 'wone-onboarding' })
);
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Scaffold Next.js 15 project and initialize shadcn with brand tokens</name>
  <files>
    package.json, tsconfig.json, next.config.ts, tailwind.config.ts, components.json,
    src/app/globals.css, src/app/layout.tsx, src/lib/utils.ts, src/components/ui/button.tsx,
    src/components/ui/input.tsx, src/components/ui/switch.tsx
  </files>

  <read_first>
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Color section — exact hex values and CSS variable names; Typography section — font family and weight rules; Component Inventory section — which shadcn components to add)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-SKELETON.md
      (Directory layout — exact folder structure to create)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/CLAUDE.md
      (Tech stack section — Next.js 15, TypeScript, Tailwind, shadcn)
  </read_first>

  <action>
Run the following sequence exactly. The working directory is C:/Users/JilSchmidt/Projects/Wone MOVE.

**Step A — Create Next.js 15 app (if not already scaffolded):**
Check if package.json exists. If not, run:
```
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```
If package.json already exists (project may be partially initialized), skip creation and proceed to Step B.

**Step B — Install additional dependencies:**
```
npm install zustand canvas-confetti
npm install --save-dev @types/canvas-confetti
```

**Step C — Initialize shadcn:**
```
npx shadcn@latest init
```
When prompted:
- Style: Default
- Base color: Slate (we will override with brand tokens immediately after)
- CSS variables: Yes

**Step D — Add required shadcn components:**
```
npx shadcn@latest add button input switch calendar popover card badge
```

**Step E — Wire brand tokens in tailwind.config.ts.**
Replace the default `colors` extend section with:
```typescript
colors: {
  background: '#f6f7f7',
  foreground: '#1c2642',
  primary: {
    DEFAULT: '#646efb',
    foreground: '#ffffff',
  },
  'primary-light': '#d2d5fc',
  muted: {
    DEFAULT: '#f6f7f7',
    foreground: '#5b6377',
  },
  destructive: {
    DEFAULT: '#ef4444',
    foreground: '#ffffff',
  },
  border: '#d2d5fc',
  input: '#d2d5fc',
  ring: '#646efb',
  card: {
    DEFAULT: '#ffffff',
    foreground: '#1c2642',
  },
},
fontFamily: {
  sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
},
```

**Step F — Wire CSS variables in src/app/globals.css.**
In the `:root` block, set:
```css
:root {
  --background: 0 0% 96.5%;       /* #f6f7f7 */
  --foreground: 226 40% 18%;      /* #1c2642 */
  --primary: 237 95% 65%;         /* #646efb */
  --primary-foreground: 0 0% 100%;
  --muted: 220 14% 58%;           /* #5b6377 */
  --muted-foreground: 220 14% 58%;
  --border: 235 90% 90%;          /* #d2d5fc */
  --input: 235 90% 90%;
  --ring: 237 95% 65%;
  --card: 0 0% 100%;
  --card-foreground: 226 40% 18%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --radius: 0.75rem;
}
```

**Step G — Load Plus Jakarta Sans font in src/app/layout.tsx:**
```typescript
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={plusJakartaSans.variable}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

Set metadata: `title: 'Wone MOVE'`, `description: 'Dein persönlicher Umzugsbegleiter'`.

**Step H — Create directory structure** per SKELETON.md layout:
```
src/app/(onboarding)/
src/app/(onboarding)/welcome/
src/app/(onboarding)/step/[step]/
src/app/(onboarding)/celebration/
src/app/(main)/
src/app/(main)/home/
src/app/(main)/aufgaben/
src/app/(main)/vertraege/
src/app/(main)/entdecken/
src/app/(main)/ich/
src/components/onboarding/
src/components/nav/
src/types/
src/store/
```

Place an empty `page.tsx` (returning `<div>placeholder</div>`) in each route directory so Next.js recognizes the routes. These are replaced in Wave 2 and Wave 3.

Run `npm run dev` and confirm no TypeScript errors in the terminal output before marking done.
  </action>

  <verify>
    <automated>
      cd "C:/Users/JilSchmidt/Projects/Wone MOVE" &amp;&amp;
      node -e "const fs=require('fs');
        const checks = [
          ['components.json', fs.existsSync('components.json')],
          ['tailwind #646efb', fs.readFileSync('tailwind.config.ts','utf8').includes('#646efb')],
          ['globals --primary', fs.readFileSync('src/app/globals.css','utf8').includes('--primary')],
          ['layout font', fs.readFileSync('src/app/layout.tsx','utf8').includes('Plus_Jakarta_Sans')],
          ['button.tsx', fs.existsSync('src/components/ui/button.tsx')],
          ['switch.tsx', fs.existsSync('src/components/ui/switch.tsx')],
          ['input.tsx', fs.existsSync('src/components/ui/input.tsx')],
        ];
        const failed = checks.filter(([,v])=>!v).map(([k])=>k);
        if(failed.length) { console.error('FAIL:', failed.join(', ')); process.exit(1); }
        console.log('PASS: all scaffold checks passed');"
    </automated>
  </verify>

  <acceptance_criteria>
    - `components.json` exists at project root
    - `tailwind.config.ts` contains the string `'#646efb'`
    - `src/app/globals.css` contains the string `--primary`
    - `src/app/layout.tsx` contains `Plus_Jakarta_Sans` imported from `'next/font/google'`
    - `src/app/layout.tsx` contains `lang="de"`
    - `src/components/ui/button.tsx` exists
    - `src/components/ui/switch.tsx` exists
    - `src/components/ui/input.tsx` exists
    - `src/app/(onboarding)/` directory exists
    - `src/app/(main)/` directory exists
    - `npm run build` (or `npm run dev`) exits without TypeScript compilation errors
  </acceptance_criteria>

  <done>Next.js 15 app scaffolded, shadcn initialized with brand tokens, Plus Jakarta Sans wired, and all required route directories exist with placeholder pages.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: Define OnboardingData types and Zustand store with localStorage persistence</name>
  <files>
    src/types/onboarding.ts,
    src/store/onboardingStore.ts
  </files>

  <read_first>
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-SKELETON.md
      (State Architecture section — exact interface shape and localStorage key)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Screen 8 — Schritt 5 toggle items list; Screen 4, 5 — field names used across onboarding steps)
  </read_first>

  <behavior>
    - Initial state: moveDate null, targetPlz empty string, fromCity empty string, movingOrg null, priority null, alreadyDone all false, completed false
    - setMoveDate('2026-06-15') → store.data.moveDate equals '2026-06-15'
    - setLocation('80331', 'Hamburg') → store.data.targetPlz equals '80331' AND store.data.fromCity equals 'Hamburg'
    - setMovingOrg('alleine') → store.data.movingOrg equals 'alleine'
    - setPriority('guenstig') → store.data.priority equals 'guenstig'
    - setAlreadyDone('newApartment', true) → store.data.alreadyDone.newApartment equals true
    - complete() → store.data.completed equals true
    - reset() → store.data returns to full initial state (all nulls/falses/empty strings)
    - Data written to localStorage key 'wone-onboarding' — after setMoveDate, JSON.parse(localStorage.getItem('wone-onboarding')).state.data.moveDate equals '2026-06-15'
  </behavior>

  <action>
**src/types/onboarding.ts** — Create with exact types:
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

**src/store/onboardingStore.ts** — Create with Zustand + persist middleware:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OnboardingData, MovingOrg, Priority, AlreadyDone } from '@/types/onboarding';

const initialData: OnboardingData = {
  moveDate: null,
  targetPlz: '',
  fromCity: '',
  movingOrg: null,
  priority: null,
  alreadyDone: {
    newApartment: false,
    transport: false,
    electricityInternet: false,
    ummeldungPrepared: false,
  },
  completed: false,
};

interface OnboardingStore {
  data: OnboardingData;
  setMoveDate: (date: string) => void;
  setLocation: (plz: string, city: string) => void;
  setMovingOrg: (org: MovingOrg | null) => void;
  setPriority: (priority: Priority | null) => void;
  setAlreadyDone: (key: keyof AlreadyDone, value: boolean) => void;
  complete: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      data: initialData,
      setMoveDate: (date) =>
        set((s) => ({ data: { ...s.data, moveDate: date } })),
      setLocation: (plz, city) =>
        set((s) => ({ data: { ...s.data, targetPlz: plz, fromCity: city } })),
      setMovingOrg: (org) =>
        set((s) => ({ data: { ...s.data, movingOrg: org } })),
      setPriority: (priority) =>
        set((s) => ({ data: { ...s.data, priority } })),
      setAlreadyDone: (key, value) =>
        set((s) => ({
          data: {
            ...s.data,
            alreadyDone: { ...s.data.alreadyDone, [key]: value },
          },
        })),
      complete: () =>
        set((s) => ({ data: { ...s.data, completed: true } })),
      reset: () => set({ data: initialData }),
    }),
    { name: 'wone-onboarding' }
  )
);
```

Note: Zustand persist with localStorage is a client-side operation. These files are pure TypeScript with no JSX — no 'use client' directive needed on the store itself. Components that use the store will be client components.
  </action>

  <verify>
    <automated>
      cd "C:/Users/JilSchmidt/Projects/Wone MOVE" &amp;&amp;
      node -e "const fs=require('fs');
        const types = fs.readFileSync('src/types/onboarding.ts','utf8');
        const store = fs.readFileSync('src/store/onboardingStore.ts','utf8');
        const checks = [
          ['types: OnboardingData', types.includes('OnboardingData')],
          ['types: MovingOrg union', types.includes('alleine')],
          ['types: Priority union', types.includes('guenstig')],
          ['types: AlreadyDone', types.includes('AlreadyDone')],
          ['store: persist', store.includes(\"persist\")],
          ['store: wone-onboarding', store.includes('wone-onboarding')],
          ['store: setMoveDate', store.includes('setMoveDate')],
          ['store: setLocation', store.includes('setLocation')],
          ['store: setAlreadyDone', store.includes('setAlreadyDone')],
          ['store: complete', store.includes('complete:')],
          ['store: reset', store.includes('reset:')],
        ];
        const failed=checks.filter(([,v])=>!v).map(([k])=>k);
        if(failed.length){console.error('FAIL:',failed.join(', '));process.exit(1);}
        console.log('PASS: types and store verified');"
    </automated>
  </verify>

  <acceptance_criteria>
    - `src/types/onboarding.ts` exports `OnboardingData`, `MovingOrg`, `Priority`, `AlreadyDone`, `OnboardingStep`
    - `src/store/onboardingStore.ts` exports `useOnboardingStore`
    - Store uses `persist` from `zustand/middleware` with `name: 'wone-onboarding'`
    - Store has action methods: `setMoveDate`, `setLocation`, `setMovingOrg`, `setPriority`, `setAlreadyDone`, `complete`, `reset`
    - `npm run build` passes with no TypeScript errors in these files
  </acceptance_criteria>

  <done>OnboardingData interface and Zustand store with localStorage persistence defined. All downstream onboarding screen components can import from these two files.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| User input → localStorage | User-supplied strings (PLZ, city) written directly to localStorage |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01 | Tampering | localStorage `wone-onboarding` | accept | Client-only prototype with no backend; no PII beyond date/city strings; attacker modifying their own localStorage has no impact on others |
| T-01-02 | Information Disclosure | localStorage | accept | No sensitive PII (no name, email, credentials); move date and PLZ are low-sensitivity; localStorage is same-origin only |
| T-01-03 | Denial of Service | localStorage quota | mitigate | Catch `localStorage.setItem` QuotaExceededError in persist middleware; Zustand persist handles this gracefully by default |
</threat_model>

<verification>
After Wave 1 completes:
- `npm run dev` starts on port 3000 with no errors
- Browser loads `http://localhost:3000` without crashing
- `components.json` exists at project root
- `tailwind.config.ts` contains `'#646efb'`
- `src/app/globals.css` contains `--primary`
- `src/app/layout.tsx` contains `Plus_Jakarta_Sans`
- `src/types/onboarding.ts` exports `OnboardingData`
- `src/store/onboardingStore.ts` exports `useOnboardingStore` with `persist` middleware and key `wone-onboarding`
</verification>

<success_criteria>
- Running Next.js 15 dev server with zero console errors
- shadcn initialized with brand colors wired via CSS variables
- Plus Jakarta Sans font active globally
- All required route directories created with placeholder pages
- OnboardingData TypeScript interface defined and exported
- Zustand store persists to localStorage key 'wone-onboarding'
</success_criteria>

<output>
After completion, create `.planning/phases/01-shell-brand-onboarding/01-01-SUMMARY.md`
</output>
