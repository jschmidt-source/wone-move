---
phase: 03-vertraege-entdecken
reviewed: 2026-05-08T12:00:00Z
depth: standard
files_reviewed: 25
files_reviewed_list:
  - src/types/vertraege.ts
  - src/lib/anbieter.ts
  - src/lib/faq.ts
  - src/lib/spartipps.ts
  - src/lib/notfallkontakte.ts
  - src/lib/adressaenderungen.ts
  - src/store/vertraegeStore.ts
  - src/components/vertraege/VertraegeKachel.tsx
  - src/components/vertraege/FilterPillRow.tsx
  - src/components/vertraege/ProviderCard.tsx
  - src/components/vertraege/AbschlussSheet.tsx
  - src/app/(main)/vertraege/page.tsx
  - src/app/(main)/vertraege/strom/page.tsx
  - src/app/(main)/vertraege/internet/page.tsx
  - src/app/(main)/vertraege/telefon/page.tsx
  - src/app/(main)/vertraege/versicherungen/page.tsx
  - src/components/entdecken/EntdeckenSection.tsx
  - src/components/entdecken/SearchOverlay.tsx
  - src/components/entdecken/NotfallkontakteRow.tsx
  - src/components/entdecken/AdressCheckRow.tsx
  - src/app/(main)/entdecken/page.tsx
  - src/app/(main)/entdecken/faq/page.tsx
  - src/app/(main)/entdecken/spartipps/page.tsx
  - src/app/(main)/entdecken/notfallkontakte/page.tsx
  - src/app/(main)/entdecken/adressaenderungen/page.tsx
findings:
  critical: 4
  warning: 7
  info: 4
  total: 15
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-05-08T12:00:00Z
**Depth:** standard
**Files Reviewed:** 25
**Status:** issues_found

## Summary

Reviewed the full Verträge and Entdecken feature set: type definitions, static data libraries, Zustand store, shared components, and all route pages. The architecture is clean and consistent. The most critical issues are a deliberately broken call-to-action (the Notfall phone link is blocked by `e.preventDefault()`), a filter UI that is fully wired visually but does zero filtering, a type-system gap between the store's hub categories and the library's provider categories, and duplicate data entries in `adressaenderungen.ts` that will confuse users. Several secondary issues concern missing guard rails, non-persistent state, and a `query` prop that is declared but never consumed.

---

## Critical Issues

### CR-01: Notfallkontakte phone links are permanently blocked by `e.preventDefault()`

**File:** `src/components/entdecken/NotfallkontakteRow.tsx:18`

**Issue:** Every emergency contact row is wrapped in an `<a href="tel:...">` element, but `onClick` unconditionally calls `e.preventDefault()`. This means tapping the row on a real mobile device never initiates a phone call — the entire purpose of the component is broken. This is the emergency contacts section; the failure to call 110 or 112 is a critical UX defect.

**Fix:**
```tsx
// Remove the onClick handler entirely — let the tel: link behave natively.
// If the preventDefault was added to block calls in a desktop browser during
// development, gate it on the environment instead:
<a
  href={`tel:${contact.nummer.replace(/\s/g, '')}`}
  className="flex h-14 items-center gap-3 border-b border-[#d2d5fc] px-4 last:border-b-0"
>
```

---

### CR-02: Filter state is computed but never applied — all three filter modes show identical provider lists

**File:** `src/app/(main)/vertraege/strom/page.tsx:20-64` (same pattern in `internet/page.tsx`, `telefon/page.tsx`, `versicherungen/page.tsx`)

**Issue:** `filter` state is declared and passed to `FilterPillRow`, giving the user three visually interactive pills ("Empfohlen", "Günstigste", "Beliebteste"). However, the `anbieter` list passed to the card grid is always the raw result of `getAnbieterByKategorie(KATEGORIE)` — the `filter` value is never used to sort or filter that array. Tapping "Günstigste" or "Beliebteste" changes the active pill highlight but the card order never changes. The user is led to believe they are filtering; they are not.

**Fix:**
```tsx
// Derive a sorted list from the selected filter before rendering:
const sortedAnbieter = useMemo(() => {
  const list = getAnbieterByKategorie(KATEGORIE);
  if (filter === 'guenstigste') {
    return [...list].sort((a, b) =>
      parseFloat(a.preisProMonat.replace(',', '.')) -
      parseFloat(b.preisProMonat.replace(',', '.'))
    );
  }
  if (filter === 'beliebteste') {
    return [...list].sort((a, b) => b.rating - a.rating);
  }
  // 'empfohlen': empfohlen first, then partnerangebot, then rest
  return [...list].sort((a, b) =>
    (b.empfohlen ? 1 : 0) - (a.empfohlen ? 1 : 0)
  );
}, [filter]);
// Then render sortedAnbieter instead of anbieter
```

The same fix applies identically to `internet/page.tsx`, `telefon/page.tsx`, and `versicherungen/page.tsx`.

---

### CR-03: `VertragKategorie` and `VertragHubKategorie` are misaligned — `versicherungen` can never be stored as completed for an individual insurance type

**File:** `src/store/vertraegeStore.ts:4` and `src/types/vertraege.ts:1`

**Issue:** `VertragKategorie` (the provider type) includes `'haftpflicht'` and `'hausrat'` but not `'versicherungen'`. `VertragHubKategorie` (the store key) includes `'versicherungen'` but not `'haftpflicht'` or `'hausrat'`. The store `markComplete('versicherungen')` is called from `VersicherungenPage` regardless of which insurance tab the user was on when they tapped "Jetzt abschließen". This means:

1. Completing only a `hausrat` policy marks the entire "Versicherungen" tile as done, hiding the fact that `haftpflicht` was never completed.
2. There is no way to distinguish between having completed Haftpflicht vs. Hausrat vs. both.

**Fix:** Either add separate hub keys for `'haftpflicht'` and `'hausrat'` in the store and track them independently, or expose the currently active `tab` value when calling `markComplete` so at minimum the sub-type is recorded:

```ts
// Option A — expand the store keys:
export type VertragHubKategorie = 'strom' | 'internet' | 'telefon' | 'haftpflicht' | 'hausrat';

// In VersicherungenPage, call:
onComplete={() => {
  markComplete(tab); // tab is 'haftpflicht' | 'hausrat'
  setSelectedAnbieter(null);
}}
```

---

### CR-04: Duplicate entries in `ADRESSAENDERUNGEN` — `krankenkasse` and `kv` are the same institution

**File:** `src/lib/adressaenderungen.ts:6,12`

**Issue:** The list contains two entries that refer to the same entity:
- Line 6: `{ id: 'krankenkasse', label: 'Krankenkasse' }`
- Line 12: `{ id: 'kv', label: 'Krankenversicherung' }`

A user will check off one and miss the other, or check both and be confused. Both IDs also persist to the in-memory checked state independently, so the progress count and progress bar will inflate by one spurious entry.

**Fix:** Remove the duplicate. Keep `{ id: 'kv', label: 'Krankenversicherung' }` (the more precise label) and delete the `krankenkasse` entry. Update `ADRESSAENDERUNGEN.length` references (the progress bar divisor at `adressaenderungen/page.tsx:43`) will self-correct.

---

## Warnings

### WR-01: `AbschlussSheet` renders while `anbieter` is `null` — success state accesses `anbieter?.name` but form state does not guard safely

**File:** `src/components/vertraege/AbschlussSheet.tsx:60,129`

**Issue:** When `open` is `false` but `selectedAnbieter` was just set to `null` (after `onComplete`), the sheet slides out with `translate-y-full` while still mounted. During the slide-out animation the sheet re-renders with `anbieter = null`. At line 60, `anbieter && (...)` correctly guards the form branch. However, at line 129, the success branch renders `{anbieter?.name}` via optional chaining — if the slide-out animation plays while `step === 'success'` and `anbieter` is `null`, the sentence becomes "undefined bestätigt deinen Vertrag..." Wait — `anbieter?.name` with optional chaining would produce `undefined`, which React renders as nothing, yielding " bestätigt deinen Vertrag innerhalb von 2 Werktagen per E-Mail." — a broken, subject-less sentence visible during the animation frame.

**Fix:** Do not null-clear `selectedAnbieter` immediately on `onComplete`; instead, delay the clear until after the animation (e.g. `onAnimationEnd`) or keep a `lastAnbieter` ref:

```tsx
const lastAnbieterRef = useRef<Anbieter | null>(null);
if (anbieter) lastAnbieterRef.current = anbieter;
const displayAnbieter = anbieter ?? lastAnbieterRef.current;
// Use displayAnbieter in the JSX instead of anbieter
```

---

### WR-02: `ResultsState` receives `query` prop in its signature but the prop is never used inside the component

**File:** `src/components/entdecken/SearchOverlay.tsx:67`

**Issue:** The function signature is `function ResultsState({ onClose }: { query: string; onClose: () => void })`. The `query` parameter is declared in the type but destructured away — it is never referenced inside the component body. Results are always the static `MOCK_RESULTS` regardless of what was searched. This is intentional for the prototype, but the unused prop declaration is misleading: it implies `query` influences rendering when it does not. It also means TypeScript will not catch if the caller stops passing `query`, silently removing a future hook point.

**Fix:** Remove `query` from the type signature entirely since the component does not use it, and document the static-results intent:

```tsx
// Prototype: results are always static regardless of query (UI-SPEC §8)
function ResultsState({ onClose }: { onClose: () => void }) {
```

---

### WR-03: `adressaenderungen/page.tsx` progress state is in-memory only — resets to zero on every navigation

**File:** `src/app/(main)/entdecken/adressaenderungen/page.tsx:11`

**Issue:** The `checked` state is local React state, so every time the user navigates away and returns (e.g., to check the Entdecken overview and come back) all checkbox progress is lost. The Verträge store uses Zustand `persist` middleware correctly; the same pattern should apply here.

**Fix:** Move the `checked` record into a persisted Zustand store (or the existing store, if appropriate):

```ts
// In a new or extended store:
export const useAdressStore = create<AdressStore>()(
  persist(
    (set, get) => ({
      checked: {} as Record<string, boolean>,
      toggle: (id: string) =>
        set((s) => ({ checked: { ...s.checked, [id]: !s.checked[id] } })),
    }),
    { name: 'wone-adressen' }
  )
);
```

---

### WR-04: `ProviderCard` highlight tags use the tag text as the React `key` — duplicate highlight strings across providers would silently suppress renders

**File:** `src/components/vertraege/ProviderCard.tsx:73`

**Issue:** `anbieter.highlights.map((tag) => <span key={tag}>...)` uses the tag string as the key. Two of the data entries share identical highlight strings within the same provider's array (e.g., `'Keine Mindestlaufzeit'` appears in multiple providers, which is fine across cards, but if a single provider ever had two identical highlights the second would be silently dropped by React's reconciler). More immediately, this is a fragile key strategy that will surface as a hard-to-debug rendering bug if content is ever edited to introduce a duplicate.

**Fix:** Use the array index as a secondary tie-breaker:

```tsx
{anbieter.highlights.map((tag, i) => (
  <span key={`${tag}-${i}`} ...>
    {tag}
  </span>
))}
```

---

### WR-05: `anbieter.ts` data integrity — E.ON entry claims "Keine Mindestlaufzeit" but `laufzeit` is set to "12 Monate"

**File:** `src/lib/anbieter.ts:12-13`

**Issue:** The E.ON strom provider (id: `eon-strom`) has `laufzeit: '12 Monate'` and `highlights: ['100% Ökostrom ♻', 'Bonus: €50 Gutschein', 'Keine Mindestlaufzeit']`. "Keine Mindestlaufzeit" directly contradicts the 12-month contract duration shown in `ProviderCard`'s duration row. The user sees "12 Monate Laufzeit" in the price section and "Keine Mindestlaufzeit" in the highlight chips simultaneously — a confusing and misleading contradiction.

**Fix:** Correct the highlight to something accurate, e.g. `'Monatlich kündbar'` if that is the intent, or change `laufzeit` to `'Keine Laufzeit'` to match the highlight claim.

---

### WR-06: `SearchOverlay` scrim and sheet are both z-positioned but the scrim (`z-40`) can receive clicks through the sheet (`z-50`) on some mobile browsers

**File:** `src/components/entdecken/SearchOverlay.tsx:107-120`

**Issue:** When the overlay is open, a full-screen `<button>` scrim sits at `z-40` and the white search sheet sits at `z-50`. However, the sheet itself is `fixed inset-0` — it covers the entire screen. The scrim button can never be tapped because the sheet always sits on top of it. This means `onClose` via the scrim can never fire when the overlay is open; only the `X` button inside the sheet works. The scrim is dead code in the open state.

**Fix:** Remove the separate scrim element from `SearchOverlay`. The sheet already fills the screen. If a partial-overlay design is desired (sheet only partially covers the screen), restructure the layout to expose the scrim below the sheet boundary.

---

### WR-07: `VersicherungenPage` hardcodes PLZ subline count instead of reading from `KATEGORIE_META`

**File:** `src/app/(main)/vertraege/versicherungen/page.tsx:48`

**Issue:** The strom, internet, and telefon pages correctly read `meta.sublineCount` from `KATEGORIE_META[KATEGORIE]`. The versicherungen page bypasses this and hardcodes `~20 Anbieter` directly in JSX. If the copy is updated in `KATEGORIE_META`, the versicherungen page will be stale. Both `haftpflicht` and `hausrat` share the same `~20 Anbieter` subline in `KATEGORIE_META`, so reading from there is straightforward.

**Fix:**
```tsx
// Replace the hardcoded subline:
PLZ {targetPlz} · ~20 Anbieter
// With:
PLZ {targetPlz} · {getAnbieterByKategorie(tab).length > 0
  ? KATEGORIE_META[tab].sublineCount
  : '~20 Anbieter'}
```
Or simply: `PLZ {targetPlz} · {KATEGORIE_META['haftpflicht'].sublineCount}` since both tabs share the same value.

---

## Info

### IN-01: `FilterPillRow` is a 'use client' component with no client-side state or effects of its own

**File:** `src/components/vertraege/FilterPillRow.tsx:1`

**Issue:** The `'use client'` directive is present but the component is entirely props-driven with no hooks, no state, no effects, and no browser APIs. It does not need the directive. Removing it allows Next.js to potentially render it as a shared component.

**Fix:** Remove `'use client'` from line 1. All interactivity is delegated to the `onChange` prop provided by the already-client parent.

---

### IN-02: `VertraegeKachel` re-declares the kategorie union inline instead of importing `VertragHubKategorie`

**File:** `src/components/vertraege/VertraegeKachel.tsx:7`

**Issue:** The `Props` interface declares `kategorie: 'strom' | 'internet' | 'telefon' | 'versicherungen'` inline. This is the exact same union as `VertragHubKategorie` from the store. If the hub categories ever change, this component's inline union must be updated separately and TypeScript will not enforce it.

**Fix:**
```tsx
import type { VertragHubKategorie } from '@/store/vertraegeStore';
// Then in Props:
kategorie: VertragHubKategorie;
```

---

### IN-03: `EntdeckenSection` scroll container suppresses scrollbar via inline style but uses a type cast

**File:** `src/components/entdecken/EntdeckenSection.tsx:23`

**Issue:** `scrollbarWidth: 'none'` requires a cast to `React.CSSProperties` because `scrollbarWidth` is a non-standard property not yet in the TypeScript DOM lib. The cast silently suppresses any future type errors on the entire style object. Consider using a CSS class (`[&::-webkit-scrollbar]:hidden` Tailwind utility) instead to avoid widening the type.

**Fix:**
```tsx
// Replace the style prop with Tailwind utilities:
className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
// Remove the style prop and its cast entirely
```

---

### IN-04: Anleitungen preview cards in `entdecken/page.tsx` link to routes that may not exist (`/anleitungen/rundfunk`, `/anleitungen/nachsende`)

**File:** `src/app/(main)/entdecken/page.tsx:39-41`

**Issue:** The hardcoded Anleitungen preview data references three slugs: `ummeldung`, `rundfunk`, `nachsende`. The comment says Phase 2 built `/anleitungen/ummeldung`. If `rundfunk` and `nachsende` routes were not implemented, those cards are dead links that silently navigate to a 404. This is a content/routing issue that should be verified against Phase 2 deliverables.

**Fix:** Verify that `/anleitungen/rundfunk` and `/anleitungen/nachsende` exist as implemented routes. If they do not, either link them to the existing `/anleitungen/ummeldung` route temporarily or remove the unimplemented cards from the preview until the routes are built.

---

_Reviewed: 2026-05-08T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
