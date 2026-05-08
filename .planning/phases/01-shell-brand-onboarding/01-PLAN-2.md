---
phase: 01-shell-brand-onboarding
plan: 2
type: execute
wave: 2
depends_on:
  - 01-PLAN-1
files_modified:
  - src/app/(onboarding)/page.tsx
  - src/app/(onboarding)/welcome/page.tsx
autonomous: true
requirements:
  - UX-03
  - UX-04

must_haves:
  truths:
    - "Splash screen fills 100dvh with #646efb background and a pulsing white logo"
    - "After 1500ms, router automatically pushes to /welcome with no user action"
    - "Welcome screen shows headline 'Dein erster Auszug. Wir begleiten dich.' in #1c2642 at 28px"
    - "Welcome screen shows subline 'Dein persönlicher Umzugsplan in 2 Minuten.' in #5b6377 at 20px"
    - "'Jetzt starten' button navigates to /step/1 on tap"
  artifacts:
    - path: "src/app/(onboarding)/page.tsx"
      provides: "Splash screen with auto-redirect"
      contains: "router.push"
    - path: "src/app/(onboarding)/welcome/page.tsx"
      provides: "Welcome screen with CTA"
      contains: "Jetzt starten"
  key_links:
    - from: "src/app/(onboarding)/page.tsx"
      to: "/welcome"
      via: "setTimeout + router.push after 1500ms"
      pattern: "router\\.push.*welcome"
    - from: "src/app/(onboarding)/welcome/page.tsx"
      to: "/step/1"
      via: "Button onClick"
      pattern: "step/1"
---

<objective>
Build the Splash screen (full-bleed #646efb, pulsing white animation, auto-redirect after 1500ms) and the Welcome screen (brand headline, subline, 'Jetzt starten' CTA navigating to Step 1).

Purpose: First visual impression of the app — establishes brand identity immediately. The Welcome screen is the first interactive screen the user sees.

Output: Two complete, styled screens at `/` and `/welcome` that match the UI-SPEC exactly.
</objective>

<execution_context>
@C:/Users/JilSchmidt/Projects/Wone MOVE/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/ROADMAP.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md

<interfaces>
<!-- From 01-PLAN-1 — verify these exist before building -->
From src/types/onboarding.ts:
```typescript
export interface OnboardingData {
  moveDate: string | null;
  targetPlz: string;
  fromCity: string;
  movingOrg: 'alleine' | 'freunde' | 'firma' | 'gemischt' | null;
  priority: 'guenstig' | 'schnell' | 'stressfrei' | 'nachhaltig' | null;
  alreadyDone: { newApartment: boolean; transport: boolean; electricityInternet: boolean; ummeldungPrepared: boolean; };
  completed: boolean;
}
```

From src/components/ui/button.tsx:
- shadcn Button with className prop
- Variants: default (primary #646efb bg), outline, ghost

From tailwind.config.ts (brand tokens already wired):
- `bg-primary` = #646efb
- `text-foreground` = #1c2642
- `text-muted-foreground` = #5b6377
- `bg-background` = #f6f7f7
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Splash Screen — full-bleed brand background with auto-redirect</name>
  <files>src/app/(onboarding)/page.tsx</files>

  <read_first>
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "1. Splash Screen" — full-bleed #646efb, white logo centered, pulsing animation 1500ms, router.push('/welcome'))
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Animation & Motion Contract" — Splash loading ring row: animate-spin or animate-pulse, 1500ms linear)
  </read_first>

  <action>
Create `src/app/(onboarding)/page.tsx` as a client component:

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome');
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-primary">
      {/* Logo wordmark — white SVG inline */}
      <div className="flex flex-col items-center gap-6">
        {/* Wordmark */}
        <span className="text-white font-sans font-bold text-3xl tracking-tight">
          Wone MOVE
        </span>
        {/* Pulsing loading ring */}
        <div
          className="h-10 w-10 rounded-full border-4 border-white border-t-transparent animate-spin"
          aria-label="Lädt..."
        />
      </div>
    </div>
  );
}
```

Key implementation details:
- `bg-primary` maps to `#646efb` via Tailwind config (wired in Plan 1)
- `h-dvh` covers full dynamic viewport height (handles mobile browser chrome)
- White border ring with transparent top side creates spinner illusion via `animate-spin`
- `clearTimeout` in cleanup prevents navigation after unmount
- No user interaction — purely automatic

Note on layout: The `(onboarding)` route group must NOT have a layout.tsx that adds bottom navigation. Bottom nav only applies to `(main)` group. Verify no `(onboarding)/layout.tsx` exists; if it does, remove it.
  </action>

  <verify>
    <automated>
      cd "C:/Users/JilSchmidt/Projects/Wone MOVE" &amp;&amp;
      node -e "const fs=require('fs');
        const src=fs.readFileSync('src/app/(onboarding)/page.tsx','utf8');
        const checks=[
          ['use client', src.includes(\"'use client'\")],
          ['router.push welcome', src.includes('welcome')],
          ['setTimeout 1500', src.includes('1500')],
          ['bg-primary', src.includes('bg-primary')],
          ['animate-spin', src.includes('animate-spin')],
          ['h-dvh', src.includes('h-dvh')],
          ['clearTimeout cleanup', src.includes('clearTimeout')],
        ];
        const failed=checks.filter(([,v])=>!v).map(([k])=>k);
        if(failed.length){console.error('FAIL:',failed.join(', '));process.exit(1);}
        console.log('PASS: splash screen verified');"
    </automated>
  </verify>

  <acceptance_criteria>
    - `src/app/(onboarding)/page.tsx` exists and is a `'use client'` component
    - File contains `router.push` targeting `/welcome`
    - File contains `setTimeout` with `1500` ms duration
    - File contains `clearTimeout` in useEffect cleanup
    - File uses `bg-primary` Tailwind class (maps to #646efb)
    - File uses `animate-spin` for loading indicator
    - File uses `h-dvh` for full viewport height
    - No `src/app/(onboarding)/layout.tsx` exists (no shared layout for onboarding group that would add bottom nav)
  </acceptance_criteria>

  <done>Splash screen displays full-bleed #646efb background with spinning white ring, auto-navigates to /welcome after 1500ms with cleanup on unmount.</done>
</task>

<task type="auto">
  <name>Task 2: Welcome Screen — brand headline, subline, and 'Jetzt starten' CTA</name>
  <files>src/app/(onboarding)/welcome/page.tsx</files>

  <read_first>
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "2. Welcome Screen" — exact copy, font sizes, colors, button spec: height 52px, bg #646efb, border-radius 12px, white text 16px weight 700, 16px horizontal margin, lower-third position)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Copywriting Contract" — "Jetzt starten" copy locked)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Animation & Motion Contract" — CTA button press: active:scale-97, 100ms ease)
  </read_first>

  <action>
Create `src/app/(onboarding)/welcome/page.tsx` as a client component:

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative flex h-dvh flex-col bg-background px-4">
      {/* Content block — vertically centered in upper 2/3 */}
      <div className="flex flex-1 flex-col items-center justify-center pb-32 text-center">
        {/* App icon / logo mark */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <span className="text-3xl">🏠</span>
        </div>

        {/* Headline — 28px, weight 700, #1c2642 */}
        <h1 className="text-[28px] font-bold leading-[1.2] text-foreground">
          Dein erster Auszug.{' '}
          <span className="block">Wir begleiten dich.</span>
        </h1>

        {/* Subline — 20px, weight 700, #5b6377 — 32px below headline block */}
        <p className="mt-8 text-[20px] font-bold leading-[1.3] text-muted-foreground">
          Dein persönlicher Umzugsplan in 2 Minuten.
        </p>
      </div>

      {/* CTA — pinned to lower third with 16px margin, 52px height, #646efb */}
      <div className="pb-8">
        <Button
          onClick={() => router.push('/step/1')}
          className="h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white active:scale-[0.97] transition-transform duration-100"
        >
          Jetzt starten
        </Button>
      </div>
    </div>
  );
}
```

Exact values from UI-SPEC:
- Headline: 28px (`text-[28px]`), weight 700 (`font-bold`), line-height 1.2, color `#1c2642` (`text-foreground`)
- Subline: 20px (`text-[20px]`), weight 700 (`font-bold`), line-height 1.3, color `#5b6377` (`text-muted-foreground`)
- Gap between headline block and CTA: 32px (achieved via `pb-32` on content block pushing CTA to bottom)
- Button: height 52px (`h-[52px]`), full width (`w-full`), bg `#646efb` (`bg-primary`), text white 16px bold, border-radius 12px (`rounded-xl`)
- Button press animation: `active:scale-[0.97]` + `transition-transform duration-100` (100ms ease per spec)
- No secondary CTA — single button only per spec
- 16px horizontal screen padding via `px-4` on container
  </action>

  <verify>
    <automated>
      cd "C:/Users/JilSchmidt/Projects/Wone MOVE" &amp;&amp;
      node -e "const fs=require('fs');
        const src=fs.readFileSync('src/app/(onboarding)/welcome/page.tsx','utf8');
        const checks=[
          ['use client', src.includes(\"'use client'\")],
          ['Dein erster Auszug', src.includes('Dein erster Auszug')],
          ['Dein persönlicher', src.includes('Dein persönlicher Umzugsplan in 2 Minuten')],
          ['Jetzt starten', src.includes('Jetzt starten')],
          ['step/1 route', src.includes('step/1')],
          ['h-[52px]', src.includes('h-[52px]')],
          ['bg-primary', src.includes('bg-primary')],
          ['text-[28px]', src.includes('text-[28px]')],
          ['text-[20px]', src.includes('text-[20px]')],
          ['font-bold', src.includes('font-bold')],
          ['active:scale', src.includes('active:scale')],
        ];
        const failed=checks.filter(([,v])=>!v).map(([k])=>k);
        if(failed.length){console.error('FAIL:',failed.join(', '));process.exit(1);}
        console.log('PASS: welcome screen verified');"
    </automated>
  </verify>

  <acceptance_criteria>
    - `src/app/(onboarding)/welcome/page.tsx` exists and is a `'use client'` component
    - File contains exact German copy: `"Dein erster Auszug. Wir begleiten dich."`
    - File contains exact German copy: `"Dein persönlicher Umzugsplan in 2 Minuten."`
    - File contains exact German CTA copy: `"Jetzt starten"`
    - File navigates to `/step/1` on CTA click
    - File uses `h-[52px]` for button height
    - File uses `bg-primary` on button (maps to #646efb)
    - File uses `text-[28px]` for headline
    - File uses `text-[20px]` for subline
    - File uses `font-bold` (weight 700) for both headline and subline
    - File uses `active:scale` for button press animation
    - No second CTA button present
  </acceptance_criteria>

  <done>Welcome screen displays brand headline, subline, and full-width #646efb CTA. Tapping 'Jetzt starten' navigates to /step/1.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Browser URL → router | User can manually navigate to any route |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-04 | Elevation of Privilege | Onboarding route group | accept | No auth in Phase 1 prototype; all routes are public by design; onboarding screens have no privileged data |
| T-01-05 | Tampering | router.push('/welcome') timing | accept | Timer manipulation via DevTools has no security impact; auto-redirect is UX-only |
</threat_model>

<verification>
After Plan 2 completes:
- Visiting http://localhost:3000 shows full-bleed #646efb background with spinning white ring
- After 1500ms, browser auto-navigates to http://localhost:3000/welcome
- Welcome screen shows "Dein erster Auszug. Wir begleiten dich." in dark navy at 28px
- Welcome screen shows "Dein persönlicher Umzugsplan in 2 Minuten." in muted gray at 20px
- "Jetzt starten" button is visible, full-width, #646efb background
- Tapping "Jetzt starten" navigates to http://localhost:3000/step/1
- Background is #f6f7f7 (not white, not #646efb)
</verification>

<success_criteria>
- Splash screen: full-bleed #646efb, spinning white ring, auto-redirect to /welcome after 1500ms
- Welcome screen: exact German headline (28px, #1c2642), exact German subline (20px, #5b6377), full-width 52px CTA (#646efb) navigating to /step/1
- Both screens display correctly at 375px viewport width
- No bottom navigation visible on either screen
</success_criteria>

<output>
After completion, create `.planning/phases/01-shell-brand-onboarding/01-02-SUMMARY.md`
</output>
