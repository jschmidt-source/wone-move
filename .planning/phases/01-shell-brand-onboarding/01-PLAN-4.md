---
phase: 01-shell-brand-onboarding
plan: 4
type: execute
wave: 3
depends_on:
  - 01-PLAN-2
  - 01-PLAN-3
files_modified:
  - src/app/(onboarding)/celebration/page.tsx
  - src/components/nav/BottomNav.tsx
  - src/app/(main)/layout.tsx
  - src/app/(main)/home/page.tsx
  - src/app/(main)/aufgaben/page.tsx
  - src/app/(main)/vertraege/page.tsx
  - src/app/(main)/entdecken/page.tsx
  - src/app/(main)/ich/page.tsx
autonomous: true
requirements:
  - ONB-02
  - UX-01
  - UX-03
  - UX-04

must_haves:
  truths:
    - "Celebration screen shows confetti animation (canvas-confetti) on mount for 3 seconds"
    - "Celebration headline is 'Dein Umzugsplan ist fertig!' at 28px bold #1c2642"
    - "Summary card shows user's stored moveDate (formatted de-DE) and fromCity from Zustand store"
    - "'Los geht's →' CTA navigates to /home"
    - "Bottom navigation has 5 tabs — Home, Aufgaben, Verträge, Entdecken, Ich — visible on all main screens"
    - "Active tab label and icon are #646efb; inactive tabs are #5b6377"
    - "All 5 nav tabs navigate without errors; non-Home tabs show placeholder screens"
  artifacts:
    - path: "src/app/(onboarding)/celebration/page.tsx"
      provides: "Celebration screen with confetti and summary"
      contains: "canvas-confetti"
    - path: "src/components/nav/BottomNav.tsx"
      provides: "5-tab bottom navigation"
      exports: ["BottomNav"]
    - path: "src/app/(main)/layout.tsx"
      provides: "Shared layout with BottomNav for all main tabs"
      contains: "BottomNav"
    - path: "src/app/(main)/home/page.tsx"
      provides: "Home placeholder screen"
      contains: "Home"
  key_links:
    - from: "src/app/(onboarding)/celebration/page.tsx"
      to: "/home"
      via: "Los geht's CTA router.push"
      pattern: "router\\.push.*home"
    - from: "src/app/(main)/layout.tsx"
      to: "src/components/nav/BottomNav.tsx"
      via: "import and render in layout"
      pattern: "BottomNav"
    - from: "src/app/(onboarding)/celebration/page.tsx"
      to: "useOnboardingStore"
      via: "store.data.moveDate and store.data.fromCity"
      pattern: "useOnboardingStore"
---

<objective>
Build the Celebration screen (confetti animation + data summary from store) and the complete Bottom Navigation shell (5 tabs, placeholder screens for non-Home tabs, correct active/inactive styling). This closes the full onboarding-to-main-app flow.

Purpose: ONB-02 requires the user to land on a personalized experience after onboarding — the celebration screen delivers this by reading real data from the store. UX-01 requires the 5-tab bottom nav — this plan wires it to all main screens.

Output: Celebration page that reads from store, BottomNav component, shared (main) layout with nav, and 5 placeholder tab screens.
</objective>

<execution_context>
@C:/Users/JilSchmidt/Projects/Wone MOVE/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/ROADMAP.md
@C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md

<interfaces>
<!-- From 01-PLAN-1 -->
From src/store/onboardingStore.ts:
```typescript
export const useOnboardingStore = create<OnboardingStore>()(persist(..., { name: 'wone-onboarding' }));
// data.moveDate: string | null  (ISO date "YYYY-MM-DD")
// data.fromCity: string         (e.g. "Hamburg")
// data.completed: boolean
```

From src/types/onboarding.ts:
```typescript
export interface OnboardingData {
  moveDate: string | null;
  fromCity: string;
  // ...
}
```

From src/components/ui/button.tsx: shadcn Button

Tailwind tokens (from 01-PLAN-1):
- text-primary / bg-primary = #646efb
- text-muted-foreground = #5b6377
- text-foreground = #1c2642
- bg-background = #f6f7f7
- border-[#d2d5fc]

Lucide React icons available (installed with shadcn):
- Home, CheckSquare, FileText, Lightbulb, User
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Celebration Screen — confetti animation and store-data summary</name>
  <files>src/app/(onboarding)/celebration/page.tsx</files>

  <read_first>
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "9. Celebration Screen" — bg #f6f7f7, canvas-confetti 3s on mount colors #646efb/#d2d5fc/#1c2642/white, headline 28px bold #1c2642, emoji 🎉, summary card white bg border-radius 14px 16px padding 24px below headline, summary text 16px 400 #5b6377 with bold values, CTA "Los geht's →" 52px #646efb white text border-radius 12px, no back nav)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Copywriting Contract" — "Los geht's →" CTA copy; summary: "Umzugsdatum: [date] · Von: [city] · 23 Aufgaben warten auf dich")
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Animation & Motion Contract" — canvas-confetti, 3000ms, colors: #646efb, #d2d5fc, #1c2642, white)
  </read_first>

  <action>
Create `src/app/(onboarding)/celebration/page.tsx` as a client component:

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function CelebrationPage() {
  const router = useRouter();
  const { data } = useOnboardingStore();

  // ── Confetti on mount ────────────────────────────────────────────────────
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#646efb', '#d2d5fc', '#1c2642', '#ffffff'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#646efb', '#d2d5fc', '#1c2642', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  // ── Format date for German display ──────────────────────────────────────
  const formattedDate = data.moveDate
    ? new Date(data.moveDate + 'T00:00:00').toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Noch nicht festgelegt';

  const fromCity = data.fromCity || 'Unbekannt';

  return (
    <div className="relative flex h-dvh flex-col items-center bg-background px-4">
      {/* Content — centered vertically */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Emoji */}
        <div className="mb-4 text-5xl">🎉</div>

        {/* Headline — 28px, bold, #1c2642 */}
        <h1 className="text-[28px] font-bold leading-[1.2] text-foreground">
          Dein Umzugsplan ist fertig!
        </h1>

        {/* Summary card — 24px below headline */}
        <div className="mt-6 w-full rounded-[14px] bg-white p-4 text-left">
          <p className="text-[16px] font-normal leading-[1.5] text-muted-foreground">
            Umzugsdatum:{' '}
            <span className="font-bold text-foreground">{formattedDate}</span>
            {' · '}Von:{' '}
            <span className="font-bold text-foreground">{fromCity}</span>
            {' · '}
            23 Aufgaben warten auf dich
          </p>
        </div>
      </div>

      {/* CTA — pinned to bottom, 16px from edge, 52px height */}
      <div className="w-full pb-8">
        <button
          onClick={() => router.push('/home')}
          className="h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-transform duration-100 active:scale-[0.97]"
        >
          Los geht's →
        </button>
      </div>
    </div>
  );
}
```

**Key implementation notes:**

1. `canvas-confetti` fires via `requestAnimationFrame` loop for 3000ms — matching Animation Contract duration. Fires from both sides (`x:0` and `x:1`) for a shower effect.
2. Colors match Animation Contract exactly: `['#646efb', '#d2d5fc', '#1c2642', '#ffffff']`
3. `data.moveDate + 'T00:00:00'` prevents timezone offset issues when constructing Date from ISO string
4. Summary text format exactly matches Copywriting Contract: "Umzugsdatum: [date] · Von: [city] · 23 Aufgaben warten auf dich"
5. Bold values (`formattedDate`, `fromCity`) use `font-bold text-foreground` per UI-SPEC "Date and city values: weight 700, #1c2642"
6. No back navigation per UI-SPEC: "No back navigation on this screen (onboarding is complete, data already saved)"
7. CTA navigates to `/home` (the main tab after onboarding is complete)
8. Fallback display strings for null/empty store values prevent empty UI on direct route access
  </action>

  <verify>
    <automated>
      cd "C:/Users/JilSchmidt/Projects/Wone MOVE" &amp;&amp;
      node -e "const fs=require('fs');
        const src=fs.readFileSync('src/app/(onboarding)/celebration/page.tsx','utf8');
        const checks=[
          ['use client', src.includes(\"'use client'\")],
          ['canvas-confetti import', src.includes('canvas-confetti')],
          ['confetti() call', src.includes('confetti(')],
          ['#646efb confetti color', src.includes(\"'#646efb'\")],
          ['#d2d5fc confetti color', src.includes(\"'#d2d5fc'\")],
          ['3000ms duration', src.includes('3000')],
          ['useOnboardingStore', src.includes('useOnboardingStore')],
          ['Dein Umzugsplan ist fertig', src.includes('Dein Umzugsplan ist fertig')],
          ['text-[28px]', src.includes('text-[28px]')],
          ['summary Umzugsdatum', src.includes('Umzugsdatum')],
          ['summary Von:', src.includes('Von:')],
          ['23 Aufgaben', src.includes('23 Aufgaben warten auf dich')],
          ['Los geht\\'s', src.includes(\"Los geht's →\")],
          ['route /home', src.includes('/home')],
          ['h-[52px]', src.includes('h-[52px]')],
          ['bg-primary CTA', src.includes('bg-primary')],
          ['de-DE locale', src.includes('de-DE')],
        ];
        const failed=checks.filter(([,v])=>!v).map(([k])=>k);
        if(failed.length){console.error('FAIL:',failed.join(', '));process.exit(1);}
        console.log('PASS: celebration screen verified');"
    </automated>
  </verify>

  <acceptance_criteria>
    - `src/app/(onboarding)/celebration/page.tsx` exists and is a `'use client'` component
    - File imports `canvas-confetti` and calls `confetti()` in a useEffect with 3000ms duration
    - Confetti colors array includes `'#646efb'` and `'#d2d5fc'`
    - File imports `useOnboardingStore` and reads `data.moveDate` and `data.fromCity`
    - File contains exact headline `"Dein Umzugsplan ist fertig!"`
    - File contains `"Umzugsdatum"` and `"23 Aufgaben warten auf dich"` in summary
    - File contains CTA copy `"Los geht's →"` (exact string with arrow)
    - CTA navigates to `/home`
    - File uses `h-[52px]` for CTA button
    - File uses `bg-primary` for CTA button
    - File uses `de-DE` locale for date formatting
    - File has `text-[28px]` on headline
    - No back button present on this screen
  </acceptance_criteria>

  <done>Celebration screen fires canvas-confetti for 3s, displays "Dein Umzugsplan ist fertig!" headline, shows summary card with real store data, and navigates to /home on CTA tap.</done>
</task>

<task type="auto">
  <name>Task 2: Bottom Navigation and main tab layout with placeholder screens</name>
  <files>
    src/components/nav/BottomNav.tsx,
    src/app/(main)/layout.tsx,
    src/app/(main)/home/page.tsx,
    src/app/(main)/aufgaben/page.tsx,
    src/app/(main)/vertraege/page.tsx,
    src/app/(main)/entdecken/page.tsx,
    src/app/(main)/ich/page.tsx
  </files>

  <read_first>
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "10. Bottom Navigation" — height 56px, white bg, top border 1px #d2d5fc, 5 tabs, active #646efb icon+label, inactive #5b6377, label 14px bold, icon 24px, tab hit area 56px height, safe-area-inset-bottom padding, phase 1 Home active others placeholder)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "11. Placeholder Tab Screens" — bg #f6f7f7, centered icon 40px #d2d5fc, label 16px 400 #5b6377)
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Copywriting Contract" — Placeholder copy: "Deine Aufgaben kommen bald." / "Vertragsvergleich kommt bald." / "Tipps & Anleitungen kommen bald." / "Dein Profil kommt bald.")
    - C:/Users/JilSchmidt/Projects/Wone MOVE/.planning/phases/01-shell-brand-onboarding/01-UI-SPEC.md
      (Section "Layout Rules" — fixed nav at bottom:0 z-50, content scrolls behind nav, content height 100dvh - 56px - safe-area-inset-bottom)
  </read_first>

  <action>
**src/components/nav/BottomNav.tsx**

Uses `usePathname` to determine active tab. Active: icon + label `#646efb`. Inactive: `#5b6377`. Label 14px bold. Icon 24px from Lucide React.

```tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, CheckSquare, FileText, Lightbulb, User } from 'lucide-react';

const TABS = [
  { href: '/home',      label: 'Home',      Icon: Home },
  { href: '/aufgaben',  label: 'Aufgaben',  Icon: CheckSquare },
  { href: '/vertraege', label: 'Verträge',  Icon: FileText },
  { href: '/entdecken', label: 'Entdecken', Icon: Lightbulb },
  { href: '/ich',       label: 'Ich',       Icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex h-[56px] w-full items-center justify-around border-t border-[#d2d5fc] bg-white"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map(({ href, label, Icon }) => {
        const isActive = pathname === href;
        const color = isActive ? '#646efb' : '#5b6377';

        return (
          <button
            key={href}
            onClick={() => router.push(href)}
            className="flex h-[56px] flex-1 flex-col items-center justify-center gap-[2px]"
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon
              size={24}
              color={color}
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className="text-[14px] font-bold leading-[1.4]"
              style={{ color }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
```

Key details:
- `fixed bottom-0` + `z-50` — always above content
- `border-t border-[#d2d5fc]` — 1px top border per spec
- `bg-white` — white background per spec (not bg-background which is #f6f7f7)
- `style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}` — iOS safe area support
- Each tab button is `h-[56px] flex-1` — full hit area per spec "full tab width × 56px"
- Active tab: `strokeWidth: 2.5` (filled-looking), Inactive: `strokeWidth: 1.8` (outlined-looking) — approximates filled vs outlined icon spec using Lucide stroke weights
- `aria-current="page"` on active tab for accessibility
- `usePathname` from `next/navigation` — works in App Router without any context

---

**src/app/(main)/layout.tsx**

Shared layout for all 5 main tabs. Renders BottomNav and wraps children in a scrollable content area.

```tsx
import { BottomNav } from '@/components/nav/BottomNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-background">
      {/* Scrollable content — padded bottom to clear fixed nav */}
      <main
        className="overflow-y-auto"
        style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom))' }}
      >
        {children}
      </main>

      {/* Fixed bottom navigation */}
      <BottomNav />
    </div>
  );
}
```

This layout.tsx is a Server Component (no 'use client'). BottomNav is a Client Component and is imported here. Next.js handles the boundary automatically.

---

**src/app/(main)/home/page.tsx**

Home is Phase 2's primary deliverable. In Phase 1, render a minimal placeholder that clearly shows the app shell is working, with the greeting that will be expanded in Phase 2.

```tsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-4 text-4xl">🏠</div>
      <h1 className="text-[20px] font-bold text-foreground">
        Willkommen bei Wone MOVE!
      </h1>
      <p className="mt-2 text-[16px] font-normal text-muted-foreground">
        Dein Dashboard kommt in Phase 2.
      </p>
    </div>
  );
}
```

---

**Placeholder screens for Aufgaben, Verträge, Entdecken, Ich**

Each follows UI-SPEC Section 11: bg-background, centered icon 40px #d2d5fc, label 16px weight 400 #5b6377.

**src/app/(main)/aufgaben/page.tsx:**
```tsx
export default function AufgabenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-3 text-[40px] opacity-30">✅</div>
      <p className="text-[16px] font-normal text-muted-foreground">
        Deine Aufgaben kommen bald.
      </p>
    </div>
  );
}
```

**src/app/(main)/vertraege/page.tsx:**
```tsx
export default function VertraegePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-3 text-[40px] opacity-30">📋</div>
      <p className="text-[16px] font-normal text-muted-foreground">
        Vertragsvergleich kommt bald.
      </p>
    </div>
  );
}
```

**src/app/(main)/entdecken/page.tsx:**
```tsx
export default function EntdeckenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-3 text-[40px] opacity-30">💡</div>
      <p className="text-[16px] font-normal text-muted-foreground">
        Tipps &amp; Anleitungen kommen bald.
      </p>
    </div>
  );
}
```

**src/app/(main)/ich/page.tsx:**
```tsx
export default function IchPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-3 text-[40px] opacity-30">👤</div>
      <p className="text-[16px] font-normal text-muted-foreground">
        Dein Profil kommt bald.
      </p>
    </div>
  );
}
```

All placeholder copy matches Copywriting Contract exactly.
  </action>

  <verify>
    <automated>
      cd "C:/Users/JilSchmidt/Projects/Wone MOVE" &amp;&amp;
      node -e "const fs=require('fs');
        const nav=fs.readFileSync('src/components/nav/BottomNav.tsx','utf8');
        const layout=fs.readFileSync('src/app/(main)/layout.tsx','utf8');
        const checks=[
          ['BottomNav export', nav.includes('export function BottomNav')],
          ['5 tabs defined', (nav.match(/href:/g)||[]).length>=5],
          ['Home tab', nav.includes('/home')],
          ['Aufgaben tab', nav.includes('/aufgaben')],
          ['Verträge tab', nav.includes('Verträge') || nav.includes('Vertraege')],
          ['Entdecken tab', nav.includes('/entdecken')],
          ['Ich tab', nav.includes('/ich')],
          ['#646efb active', nav.includes('#646efb')],
          ['#5b6377 inactive', nav.includes('#5b6377')],
          ['border-[#d2d5fc]', nav.includes('#d2d5fc')],
          ['fixed bottom-0', nav.includes('fixed bottom-0')],
          ['z-50', nav.includes('z-50')],
          ['safe-area-inset-bottom', nav.includes('safe-area-inset-bottom')],
          ['usePathname', nav.includes('usePathname')],
          ['layout has BottomNav', layout.includes('BottomNav')],
          ['aufgaben placeholder', fs.readFileSync('src/app/(main)/aufgaben/page.tsx','utf8').includes('Deine Aufgaben kommen bald')],
          ['vertraege placeholder', fs.readFileSync('src/app/(main)/vertraege/page.tsx','utf8').includes('Vertragsvergleich kommt bald')],
          ['entdecken placeholder', fs.readFileSync('src/app/(main)/entdecken/page.tsx','utf8').includes('Anleitungen kommen bald')],
          ['ich placeholder', fs.readFileSync('src/app/(main)/ich/page.tsx','utf8').includes('Dein Profil kommt bald')],
        ];
        const failed=checks.filter(([,v])=>!v).map(([k])=>k);
        if(failed.length){console.error('FAIL:',failed.join(', '));process.exit(1);}
        console.log('PASS: bottom nav and placeholder screens verified');"
    </automated>
  </verify>

  <acceptance_criteria>
    - `src/components/nav/BottomNav.tsx` exports `BottomNav`, contains 5 tab routes (`/home`, `/aufgaben`, `/vertraege`, `/entdecken`, `/ich`)
    - BottomNav uses `usePathname` to determine active tab
    - Active tab color is `#646efb`, inactive is `#5b6377`
    - Nav has `fixed bottom-0`, `z-50`, `border-[#d2d5fc]` (or inline style with `#d2d5fc`), white background
    - Nav uses `env(safe-area-inset-bottom)` for iOS safe area
    - `src/app/(main)/layout.tsx` imports and renders `BottomNav`
    - `src/app/(main)/aufgaben/page.tsx` contains exact copy `"Deine Aufgaben kommen bald."`
    - `src/app/(main)/vertraege/page.tsx` contains exact copy `"Vertragsvergleich kommt bald."`
    - `src/app/(main)/entdecken/page.tsx` contains exact copy `"Tipps & Anleitungen kommen bald."`
    - `src/app/(main)/ich/page.tsx` contains exact copy `"Dein Profil kommt bald."`
    - `npm run build` passes with no TypeScript errors
  </acceptance_criteria>

  <done>BottomNav renders 5 tabs with correct active/inactive colors, fixed at bottom with safe-area support. All 5 main screens exist. The (main) layout wraps all tab content with the nav.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| URL routing → component render | User can navigate directly to any /main route; no auth gate |
| Store data → DOM display | Stored city/date strings rendered directly to DOM in celebration screen |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-09 | Cross-Site Scripting | Celebration screen DOM render | mitigate | React renders all values as text nodes by default (no dangerouslySetInnerHTML used); `fromCity` and `formattedDate` are rendered via JSX expression `{value}` — XSS not possible through this path |
| T-01-10 | Elevation of Privilege | /home direct access without onboarding | accept | Prototype has no auth; placeholder screens are intentionally accessible directly; Phase 2 can add redirect logic if onboarding is incomplete |
| T-01-11 | Denial of Service | canvas-confetti requestAnimationFrame loop | mitigate | Loop bounded by `Date.now() < end` with fixed 3000ms duration — cannot run indefinitely; no cleanup needed as it terminates naturally |
</threat_model>

<verification>
After Plan 4 completes — full end-to-end flow test:
1. http://localhost:3000 → splash (#646efb, spinning ring)
2. Auto-redirect to /welcome after 1500ms → headline + "Jetzt starten"
3. Tap "Jetzt starten" → /step/1 (date picker, StepIndicator dot 1 active)
4. Enter date, tap Weiter → /step/2 (PLZ + city inputs)
5. Enter PLZ "80331" and city "Hamburg", tap Weiter → /step/3 (2×2 tiles)
6. Select tile "Ich alleine", tap Weiter → /step/4 (emoji tiles)
7. Select "💰 Günstig", tap Weiter → /step/5 (4 toggle rows, Fertig button)
8. Tap Fertig → /celebration (confetti fires, headline visible, summary shows "Hamburg" and formatted date)
9. Tap "Los geht's →" → /home (placeholder + bottom nav visible)
10. Tap each bottom nav tab → Aufgaben/Verträge/Entdecken/Ich placeholder screens, no 404, nav tab highlights correctly
11. Reload /step/1 → previously entered date visible in store (localStorage persisted)
</verification>

<success_criteria>
- Celebration screen: confetti fires 3s on mount with correct colors, headline + emoji visible, summary shows real store data (formatted date + city), CTA navigates to /home
- BottomNav: 5 tabs visible, active tab shows #646efb icon+label, inactive shows #5b6377, fixed at bottom, no content hidden beneath it (content padded correctly)
- All 5 main routes return valid screens with exact placeholder copy from Copywriting Contract
- Complete Phase 1 success criteria met:
  1. App opens at 375px with correct colors and Plus Jakarta Sans
  2. User taps through all 5 onboarding steps and lands on celebration screen
  3. Celebration screen shows personalized summary from store data
  4. Bottom navigation is visible and correctly structured with 5 tabs
  5. Tapping each nav tab navigates without errors (placeholder screens in Phase 1)
</success_criteria>

<output>
After completion, create `.planning/phases/01-shell-brand-onboarding/01-04-SUMMARY.md`
</output>
