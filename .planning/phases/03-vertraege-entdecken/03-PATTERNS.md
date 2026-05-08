# Phase 3: Verträge + Entdecken - Pattern Map

**Mapped:** 2026-05-08
**Files analyzed:** 26 new/modified files
**Analogs found:** 26 / 26

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/store/vertraegeStore.ts` | store | CRUD | `src/store/checklistStore.ts` | exact |
| `src/lib/anbieter.ts` | data | transform | `src/lib/tasks.ts` | role-match |
| `src/lib/faq.ts` | data | transform | `src/lib/guides.ts` | role-match |
| `src/lib/spartipps.ts` | data | transform | `src/lib/guides.ts` | role-match |
| `src/lib/notfallkontakte.ts` | data | transform | `src/lib/tasks.ts` | role-match |
| `src/lib/adressaenderungen.ts` | data | transform | `src/lib/tasks.ts` | role-match |
| `src/types/` (Anbieter, etc.) | types | — | `src/types/checklist.ts` | exact |
| `src/app/(main)/vertraege/page.tsx` | page (hub) | request-response | `src/app/(main)/anleitungen/page.tsx` | role-match |
| `src/app/(main)/vertraege/strom/page.tsx` | page (list) | request-response | `src/app/(main)/anleitungen/page.tsx` | role-match |
| `src/app/(main)/vertraege/internet/page.tsx` | page (list) | request-response | `src/app/(main)/anleitungen/page.tsx` | role-match |
| `src/app/(main)/vertraege/telefon/page.tsx` | page (list) | request-response | `src/app/(main)/anleitungen/page.tsx` | role-match |
| `src/app/(main)/vertraege/versicherungen/page.tsx` | page (tabs) | request-response | `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` | exact |
| `src/app/(main)/entdecken/page.tsx` | page (hub) | request-response | `src/app/(main)/home/page.tsx` | exact |
| `src/app/(main)/entdecken/faq/page.tsx` | page (list) | request-response | `src/app/(main)/anleitungen/page.tsx` | role-match |
| `src/app/(main)/entdecken/spartipps/page.tsx` | page (list) | request-response | `src/app/(main)/anleitungen/page.tsx` | role-match |
| `src/app/(main)/entdecken/notfallkontakte/page.tsx` | page (list) | request-response | `src/app/(main)/home/kostenrechner/page.tsx` | role-match |
| `src/app/(main)/entdecken/adressaenderungen/page.tsx` | page (interactive) | request-response | `src/app/(main)/home/kostenrechner/page.tsx` | role-match |
| `src/components/vertraege/ProviderCard.tsx` | component | request-response | `src/components/ui/card.tsx` | partial |
| `src/components/vertraege/AbschlussSheet.tsx` | component (sheet) | request-response | `src/components/checklist/AddItemSheet.tsx` | exact |
| `src/components/vertraege/VertraegeKachel.tsx` | component | request-response | `src/app/(main)/anleitungen/page.tsx` Card block | role-match |
| `src/components/vertraege/FilterPillRow.tsx` | component | request-response | `src/components/checklist/AddItemSheet.tsx` category pills | role-match |
| `src/components/entdecken/EntdeckenSection.tsx` | component (scroll) | request-response | `src/app/(main)/home/page.tsx` "Wusstest du schon?" | exact |
| `src/components/entdecken/SearchOverlay.tsx` | component (overlay) | event-driven | `src/components/checklist/AddItemSheet.tsx` (scrim+overlay) | role-match |
| `src/components/entdecken/NotfallkontakteRow.tsx` | component | request-response | `src/app/(main)/home/page.tsx` Fristen rows | role-match |
| `src/components/entdecken/AdressCheckRow.tsx` | component | request-response | `src/app/(main)/home/page.tsx` Fristen rows | role-match |

---

## Pattern Assignments

### `src/store/vertraegeStore.ts` (store, CRUD)

**Analog:** `src/store/checklistStore.ts`

**Full file pattern** (lines 1–44 — copy this structure exactly):
```typescript
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomItem, ChecklistCategoryId } from '@/types/checklist';

interface ChecklistStore {
  checkedIds: string[];
  customItems: CustomItem[];
  toggle: (id: string) => void;
  addCustomItem: (title: string, category: ChecklistCategoryId) => void;
  isChecked: (id: string) => boolean;
  reset: () => void;
}

export const useChecklistStore = create<ChecklistStore>()(
  persist(
    (set, get) => ({
      checkedIds: [],
      // ... actions use (set, get) pattern
      toggle: (id) =>
        set((s) => ({
          checkedIds: s.checkedIds.includes(id)
            ? s.checkedIds.filter((x) => x !== id)
            : [...s.checkedIds, id],
        })),
      reset: () => set({ checkedIds: [], customItems: [] }),
    }),
    { name: 'wone-checklist' }   // <-- change to 'wone-vertraege'
  )
);
```

**Adaptation for vertraegeStore:**
- Interface: `VertraegeStore` with `completed: Record<VertragKategorie, boolean>` and `markComplete(k) / reset()`
- localStorage key: `'wone-vertraege'` (D-04)
- Import from `@/types/vertraege` (new types file)
- No `'use client'` needed at module level (stores are plain modules — follow `onboardingStore.ts` which omits it)

**PLZ access pattern** (from `src/store/onboardingStore.ts` lines 31–56):
```typescript
export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      data: initialData,
      setLocation: (plz, city) =>
        set((s) => ({ data: { ...s.data, targetPlz: plz, fromCity: city } })),
    }),
    { name: 'wone-onboarding' }
  )
);
// Usage in pages: const { data } = useOnboardingStore(); → data.targetPlz
```

---

### `src/lib/anbieter.ts` (data, transform)

**Analog:** `src/lib/tasks.ts` lines 1–58 (named export of typed array)

**Data file structure pattern** (tasks.ts lines 1–9, 20–22):
```typescript
import { Task, CategoryMeta, BucketMeta } from '@/types/checklist';

export const CATEGORIES: CategoryMeta[] = [
  { id: 'organisatorisches', label: 'Organisatorisches', colorHex: '#646efb' },
  // ...
];

export const TASKS: Task[] = [
  { id: 'ummeldung-buergeramt', title: 'Ummeldung beim Bürgeramt', category: 'organisatorisches', ... },
  // ...
];
```

**Adaptation for anbieter.ts:**
```typescript
import { Anbieter, VertragKategorie } from '@/types/vertraege';

export const ANBIETER: Anbieter[] = [
  {
    id: 'eon-strom',
    kategorie: 'strom',
    name: 'E.ON',
    logoUrl: '/logos/eon.svg',   // or inline emoji fallback
    preisProMonat: 89,
    highlights: ['Ökostrom', 'Keine Mindestlaufzeit'],
    empfohlen: true,
    partnerangebot: true,
    affiliateUrl: '#',
  },
  // ...
];

export function getAnbieterByKategorie(k: VertragKategorie): Anbieter[] {
  return ANBIETER.filter((a) => a.kategorie === k);
}
```

---

### `src/lib/faq.ts`, `src/lib/spartipps.ts`, `src/lib/notfallkontakte.ts`, `src/lib/adressaenderungen.ts` (data, transform)

**Analog:** `src/lib/guides.ts` (Record export) and `src/lib/tasks.ts` (array export)

**Typed array export pattern** (guides.ts lines 1–3):
```typescript
import { Guide } from '@/types/checklist';

export const GUIDES: Record<string, Guide> = { ... };
```

**Adaptation — all four files follow the same named-array pattern:**
```typescript
// faq.ts
import { FaqItem } from '@/types/vertraege';
export const FAQ: FaqItem[] = [
  { id: 'faq-1', frage: 'Was brauche ich für die Ummeldung?', antwort: '...', kategorie: 'organisatorisches' },
];

// spartipps.ts
import { Spartipp } from '@/types/vertraege';
export const SPARTIPPS: Spartipp[] = [
  { id: 'tip-1', titel: '...', text: '...', kategorie: 'vertraege' },
];

// notfallkontakte.ts
export const NOTFALLKONTAKTE = [
  { id: 'polizei', name: 'Polizei', nummer: '110', icon: '🚔' },
  { id: 'feuerwehr', name: 'Feuerwehr', nummer: '112', icon: '🚒' },
  { id: 'giftnotruf', name: 'Giftnotruf', nummer: '030 19240', icon: '☠️' },
];

// adressaenderungen.ts
export const ADRESSAENDERUNGEN = [
  { id: 'bank', label: 'Bank / Girokonto', kategorie: 'finanzen' },
  // ~15 parties total
];
```

---

### `src/types/` — Anbieter, VertragKategorie, FaqItem, Spartipp

**Analog:** `src/types/checklist.ts` (full file, lines 1–73)

**Type definition pattern** (checklist.ts lines 1–31):
```typescript
export type ChecklistCategoryId =
  | 'organisatorisches'
  | 'vertraege'
  | 'versicherungen'
  | 'einrichtung'
  | 'finanzen';

export type Difficulty = 'Leicht' | 'Mittel' | 'Schwer';

export interface Task {
  id: string;
  title: string;
  category: ChecklistCategoryId;
  isMustDo: boolean;
  estimatedMinutes: number;
  difficulty: Difficulty;
  guideSlug?: string;
  filterRules?: FilterRule[];
}
```

**New types file (`src/types/vertraege.ts`) pattern:**
```typescript
export type VertragKategorie = 'strom' | 'internet' | 'telefon' | 'haftpflicht' | 'hausrat';

export interface Anbieter {
  id: string;
  kategorie: VertragKategorie;
  name: string;
  logoUrl?: string;
  preisProMonat: number;
  highlights: string[];
  empfohlen?: boolean;
  partnerangebot?: boolean;
  affiliateUrl: string;
}

export interface FaqItem {
  id: string;
  frage: string;
  antwort: string;
  kategorie?: string;
}

export interface Spartipp {
  id: string;
  titel: string;
  text: string;
  kategorie?: string;
}
```

---

### `src/app/(main)/vertraege/page.tsx` (hub page, request-response)

**Analog:** `src/app/(main)/anleitungen/page.tsx` (full file, 53 lines) for card-grid structure; `src/app/(main)/home/page.tsx` for section layout.

**Page shell pattern** (anleitungen/page.tsx lines 9–13):
```typescript
'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function VertraegePage() {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        <h1 className="text-[20px] font-bold leading-[1.3] text-foreground">Verträge</h1>
        {/* 2x2 grid of VertraegeKachel */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* ... */}
        </div>
      </div>
    </div>
  );
}
```

**Store access + PLZ header:**
```typescript
import { useVertraegeStore } from '@/store/vertraegeStore';
import { useOnboardingStore } from '@/store/onboardingStore';
const { completed } = useVertraegeStore();
const { data } = useOnboardingStore();
// Use data.targetPlz for header text
```

---

### `src/app/(main)/vertraege/strom/page.tsx`, `internet/page.tsx`, `telefon/page.tsx` (list pages, request-response)

**Analog:** `src/app/(main)/home/kostenrechner/page.tsx` (sub-screen with back button, lines 56–71)

**Back-button header pattern** (kostenrechner/page.tsx lines 56–71):
```typescript
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function StromPage() {
  const router = useRouter();
  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/vertraege')}
            aria-label="Zurück"
            className="flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={24} color="#1c2642" />
          </button>
          <h1 className="flex-1 text-center text-[20px] font-bold text-foreground">
            Stromanbieter vergleichen
          </h1>
          <div className="h-8 w-8" />
        </div>
        {/* PLZ sub-header, FilterPillRow, ProviderCard list */}
      </div>
    </div>
  );
}
```

---

### `src/app/(main)/vertraege/versicherungen/page.tsx` (tabs page, request-response)

**Analog:** `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` (full file) — this is the ONLY existing example of the Base UI Tabs component in pages.

**Tabs import + usage pattern** (uebergabeprotokoll/page.tsx lines 6, 71–90):
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// State-driven tab:
const [activeTab, setActiveTab] = useState<'haftpflicht' | 'hausrat'>('haftpflicht');

<Tabs
  value={activeTab}
  onValueChange={(v) => setActiveTab(v as 'haftpflicht' | 'hausrat')}
  className="mt-4"
>
  <TabsList className="flex h-11 w-full overflow-x-auto border-b border-[#d2d5fc] bg-white">
    <TabsTrigger
      value="haftpflicht"
      className="h-11 shrink-0 px-3 text-[14px] font-bold text-muted-foreground data-active:text-primary data-active:shadow-[inset_0_-2px_0_0_#646efb]"
    >
      Haftpflicht
    </TabsTrigger>
    <TabsTrigger
      value="hausrat"
      className="h-11 shrink-0 px-3 text-[14px] font-bold text-muted-foreground data-active:text-primary data-active:shadow-[inset_0_-2px_0_0_#646efb]"
    >
      Hausrat
    </TabsTrigger>
  </TabsList>
  <TabsContent value="haftpflicht" className="mt-4">
    {/* ProviderCard list for Haftpflicht */}
  </TabsContent>
  <TabsContent value="hausrat" className="mt-4">
    {/* ProviderCard list for Hausrat */}
  </TabsContent>
</Tabs>
```

**Key:** Use `data-active:*` selectors (Base UI, NOT Radix `data-[state=active]:*`).

---

### `src/app/(main)/entdecken/page.tsx` (hub page with sticky search + horizontal scroll sections)

**Analog:** `src/app/(main)/home/page.tsx` — provides both the horizontal scroll pattern and the sticky header approach.

**Sticky element + horizontal scroll section pattern** (home/page.tsx lines 59–139):
```typescript
'use client';

// Sticky search bar approach (same as aufgaben sticky toggle — aufgaben/page.tsx lines 65–75):
<div className="sticky top-0 z-40 border-b border-[#d2d5fc] bg-white px-4 py-2">
  <Input placeholder="Suche nach Aufgaben, Tipps..." ... />
</div>

// Horizontal scroll section (home/page.tsx lines 123–139):
<section>
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-[20px] font-bold leading-[1.3] text-foreground">FAQ</h2>
    <Link href="/entdecken/faq" className="text-[14px] font-bold text-primary">
      Alle anzeigen →
    </Link>
  </div>
  <div
    className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1"
    style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
  >
    {items.slice(0, 3).map((item, i) => (
      <div
        key={i}
        className="shrink-0 rounded-[12px] border border-[#d2d5fc] bg-white p-4"
        style={{ width: 200, height: 120, scrollSnapAlign: 'start' }}
      >
        {/* card content */}
      </div>
    ))}
  </div>
</section>
```

**Page shell** (home/page.tsx lines 59–61):
```typescript
<div className="flex h-dvh flex-col bg-background">
  <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
```

---

### `src/app/(main)/entdecken/faq/page.tsx`, `spartipps/page.tsx` (sub-screens, request-response)

**Analog:** `src/app/(main)/anleitungen/page.tsx` + `kostenrechner/page.tsx` (back button)

**Sub-screen with back button** (kostenrechner/page.tsx lines 56–71 — identical back-button header pattern as Verträge sub-screens above). Use `router.push('/entdecken')` for back navigation.

**FAQ-specific: Collapsible accordion pattern** (collapsible.tsx lines 1–21):
```typescript
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
// Base UI Collapsible — no data-[state] needed, use CSS children:
<Collapsible>
  <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-4 text-[16px] font-bold text-foreground">
    {item.frage}
    <ChevronDown size={16} />
  </CollapsibleTrigger>
  <CollapsibleContent className="px-4 pb-4 text-[14px] font-normal text-muted-foreground">
    {item.antwort}
  </CollapsibleContent>
</Collapsible>
```

---

### `src/app/(main)/entdecken/notfallkontakte/page.tsx` (sub-screen, request-response)

**Analog:** `src/app/(main)/home/kostenrechner/page.tsx` — back-button sub-screen shell.

**Row pattern** (home/page.tsx lines 172–191 — Fristen rows):
```typescript
<div className="overflow-hidden rounded-[12px] bg-white">
  <div className="flex h-[44px] items-center justify-between border-b border-[#d2d5fc] px-4">
    <span className="text-[14px] font-bold text-foreground">Polizei</span>
    <a href="tel:110" className="text-[16px] font-bold text-primary">110</a>
  </div>
  {/* repeat rows */}
</div>
```

---

### `src/app/(main)/entdecken/adressaenderungen/page.tsx` (interactive sub-screen)

**Analog:** `src/app/(main)/home/kostenrechner/page.tsx` — back-button sub-screen with local UI state (no store needed per D-specifics).

**Local toggle state pattern** (aufgaben/page.tsx line 21 — `useState` for view; AddItemSheet lines 17–18 for local state):
```typescript
const [checked, setChecked] = useState<Record<string, boolean>>({});

function toggle(id: string) {
  setChecked((s) => ({ ...s, [id]: !s[id] }));
}
```

---

### `src/components/vertraege/AbschlussSheet.tsx` (sheet component, request-response)

**Analog:** `src/components/checklist/AddItemSheet.tsx` — full file, 83 lines. This is the ONLY bottom-sheet in the codebase. Copy this pattern exactly.

**Full bottom-sheet pattern** (AddItemSheet.tsx lines 31–83):
```typescript
export function AbschlussSheet({ open, onClose, onConfirm }: Props) {
  const [step, setStep] = useState<'form' | 'success'>('form');

  return (
    <>
      {/* Scrim */}
      {open && (
        <button
          type="button"
          aria-label="Schließen"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}
      {/* Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 rounded-t-[16px] bg-white px-4 pb-4 pt-3 transition-transform duration-250',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ minHeight: 240 }}
      >
        {/* Drag handle */}
        <div className="mx-auto h-1 w-8 rounded-full bg-[#d2d5fc]" />

        {step === 'form' ? (
          <>
            <h3 className="mt-6 text-[16px] font-bold text-foreground">Vertrag abschließen</h3>
            {/* Mock fields — visually present, not interactive (ROADMAP spec) */}
            <button
              type="button"
              onClick={() => setStep('success')}
              className="mt-4 h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-all duration-100 active:scale-[0.97]"
            >
              Weiter →
            </button>
          </>
        ) : (
          <>
            {/* Success state — inline in sheet (D-03) */}
            <p className="mt-6 text-center text-[16px] font-bold text-foreground">✓ Antrag eingegangen!</p>
            <button type="button" onClick={() => { setStep('form'); onClose(); }}
              className="mt-4 h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white">
              Zurück zur Übersicht
            </button>
          </>
        )}
      </div>
    </>
  );
}
```

**Key classes:** `fixed bottom-0 left-0 right-0 z-50 rounded-t-[16px]`, `transition-transform duration-250`, `translate-y-0` / `translate-y-full`, `active:scale-[0.97]`.

---

### `src/components/vertraege/FilterPillRow.tsx` (component, request-response)

**Analog:** `src/components/checklist/AddItemSheet.tsx` lines 57–73 — category pill row pattern.

**Pill row pattern** (AddItemSheet.tsx lines 57–73):
```typescript
<div className="mt-3 flex gap-2 overflow-x-auto pb-1">
  {OPTIONS.map((opt) => (
    <button
      key={opt.id}
      type="button"
      onClick={() => setActive(opt.id)}
      className={cn(
        'flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[14px] font-bold',
        active === opt.id
          ? 'border-primary text-foreground'
          : 'border-[#d2d5fc] text-muted-foreground'
      )}
    >
      {opt.label}
    </button>
  ))}
</div>
```

---

### `src/components/vertraege/VertraegeKachel.tsx` (component, request-response)

**Analog:** `src/app/(main)/anleitungen/page.tsx` lines 18–48 — Card with Link wrapper and status indicators.

**Card with Link pattern** (anleitungen/page.tsx lines 19–48):
```typescript
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

<Link href={`/vertraege/${kategorie}`}>
  <Card className={cn(
    'flex h-full flex-col gap-2 rounded-[12px] border border-[#d2d5fc] bg-white p-4',
    completed && 'ring-2 ring-[#22c55e]'   // D-05: green status ring
  )}>
    {completed && <span className="text-[#22c55e]">✓</span>}
    <p className="text-[16px] font-bold text-foreground">{label}</p>
  </Card>
</Link>
```

---

### `src/components/vertraege/ProviderCard.tsx` (component, request-response)

**Analog:** `src/app/(main)/home/page.tsx` lines 104–119 — Card with Badge elements; `src/components/ui/badge.tsx` for badge tokens.

**Card + Badge pattern** (home/page.tsx lines 104–119):
```typescript
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

<Card className="rounded-[14px] border border-[#d2d5fc] bg-white p-4">
  {/* Badge: empfohlen → bg-[#646efb] text-white; partnerangebot → bg-[#d2d5fc] text-foreground */}
  {anbieter.empfohlen && <Badge className="bg-primary text-white">Empfohlen</Badge>}
  <p className="text-[16px] font-bold text-foreground">{anbieter.name}</p>
  <p className="text-[20px] font-bold text-primary">{anbieter.preisProMonat} €/Monat</p>
  <div className="mt-2 flex flex-wrap gap-1">
    {anbieter.highlights.map((h) => (
      <span key={h} className="rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
        {h}
      </span>
    ))}
  </div>
  <button
    type="button"
    onClick={onAbschliessen}
    className="mt-3 h-[48px] w-full rounded-xl bg-primary text-[16px] font-bold text-white active:scale-[0.97]"
  >
    Abschließen
  </button>
</Card>
```

---

### `src/components/entdecken/EntdeckenSection.tsx` (horizontal scroll section component)

**Analog:** `src/app/(main)/home/page.tsx` lines 122–139 — "Wusstest du schon?" section. Exact match.

**Horizontal scroll section pattern** (home/page.tsx lines 122–139):
```typescript
<section>
  <h2 className="mb-3 text-[20px] font-bold leading-[1.3] text-foreground">Wusstest du schon?</h2>
  <div
    className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1"
    style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
  >
    {TIPS.map((tip, i) => (
      <div
        key={i}
        className="shrink-0 rounded-[12px] border border-[#d2d5fc] bg-white p-4"
        style={{ width: 200, height: 120, scrollSnapAlign: 'start' }}
      >
        <p className="text-[14px] font-normal leading-[1.5] text-foreground">{tip}</p>
      </div>
    ))}
  </div>
</section>
```

**Component interface:**
```typescript
interface Props {
  title: string;
  allHref: string;
  items: React.ReactNode[];  // or typed preview cards
}
```

---

### `src/components/entdecken/SearchOverlay.tsx` (overlay component, event-driven)

**Analog:** `src/components/checklist/AddItemSheet.tsx` lines 31–44 — scrim + overlay structure.

**Scrim + overlay pattern** (AddItemSheet.tsx lines 31–44):
```typescript
<>
  {/* Scrim */}
  {open && (
    <button
      type="button"
      aria-label="Schließen"
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/30"
    />
  )}
  {/* Overlay panel — full screen for search (not bottom sheet) */}
  <div
    className={cn(
      'fixed inset-0 z-50 bg-white transition-opacity duration-200',
      open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    )}
  >
    {/* Search input + autocomplete suggestions + results */}
  </div>
</>
```

**Input pattern** (AddItemSheet.tsx lines 50–54):
```typescript
import { Input } from '@/components/ui/input';
<Input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Suche nach Aufgaben, Tipps..."
  className="mt-3 h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px]"
/>
```

---

### `src/components/entdecken/NotfallkontakteRow.tsx` and `AdressCheckRow.tsx` (row components)

**Analog:** `src/app/(main)/home/page.tsx` lines 172–191 — Fristen row list pattern.

**Row list pattern** (home/page.tsx lines 172–191):
```typescript
<div className="overflow-hidden rounded-[12px] bg-white">
  <div className="flex h-[44px] items-center justify-between border-b border-[#d2d5fc] px-4">
    <span className="text-[14px] font-normal text-foreground">{label}</span>
    <span className="text-[14px] font-bold text-foreground">{value}</span>
  </div>
</div>
```

**NotfallkontakteRow** — right side is `<a href="tel:{nummer}">` with `text-primary`.
**AdressCheckRow** — right side is a checkbox toggle; use local `useState<Record<string,boolean>>({})` (no store, per spec).

---

## Shared Patterns

### Client Component Declaration
**Source:** Every interactive page/component in the codebase
**Apply to:** All page and component files that use hooks or events
```typescript
'use client';
```
Note: Store files (`vertraegeStore.ts`) do NOT need `'use client'` — see `onboardingStore.ts` (no directive) vs `checklistStore.ts` (has directive but is unused at module level). Follow `onboardingStore.ts` for stores.

### Page Shell (scrollable content area)
**Source:** `src/app/(main)/home/page.tsx` lines 59–61 and `src/app/(main)/aufgaben/page.tsx` lines 64–77
**Apply to:** All new page files
```typescript
<div className="flex h-dvh flex-col bg-background">
  <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
    {/* content */}
  </div>
</div>
```
Use `h-dvh` (iOS Safari safe). The main layout in `src/app/(main)/layout.tsx` already pads bottom for BottomNav.

### Sub-Screen Header (back button)
**Source:** `src/app/(main)/home/kostenrechner/page.tsx` lines 60–71; `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` lines 51–64
**Apply to:** All `/vertraege/[sub]` and `/entdecken/[sub]` pages
```typescript
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const router = useRouter();
// ...
<div className="flex items-center gap-2">
  <button
    type="button"
    onClick={() => router.push('/vertraege')}  // or router.back()
    aria-label="Zurück"
    className="flex h-8 w-8 items-center justify-center"
  >
    <ChevronLeft size={24} color="#1c2642" />
  </button>
  <h1 className="flex-1 text-center text-[20px] font-bold text-foreground">Title</h1>
  <div className="h-8 w-8" />  {/* spacer for centering */}
</div>
```

### Sticky Top Bar
**Source:** `src/app/(main)/aufgaben/page.tsx` lines 65–75
**Apply to:** `entdecken/page.tsx` search bar, `vertraege/[sub]` filter row
```typescript
<div className="sticky top-0 z-40 border-b border-[#d2d5fc] bg-white px-4 py-2">
  {/* content */}
</div>
```

### Primary Action Button
**Source:** `src/components/checklist/AddItemSheet.tsx` line 73–79
**Apply to:** All CTA buttons (AbschlussSheet, ProviderCard)
```typescript
<button
  type="button"
  className="mt-4 h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-all duration-100 active:scale-[0.97]"
>
  Label
</button>
```

### Brand Token Reference
**Source:** `src/app/globals.css` (Tailwind v4 @theme)
**Apply to:** All new files

| Token | Class | Hex |
|---|---|---|
| Primary | `text-primary` / `bg-primary` | `#646efb` |
| Foreground | `text-foreground` | `#1c2642` |
| Muted | `text-muted-foreground` | `#5b6377` |
| Background | `bg-background` | `#f6f7f7` |
| Primary light | `border-[#d2d5fc]` / `bg-[#d2d5fc]` | `#d2d5fc` |

### Path Alias
**Source:** Every import in the codebase
**Apply to:** All imports
```typescript
import { X } from '@/components/...'  // not '../../../'
import { Y } from '@/store/...'
import { Z } from '@/lib/...'
import { W } from '@/types/...'
```

### Card + Border Pattern
**Source:** Multiple pages (home, anleitungen)
**Apply to:** All card-like elements
```typescript
className="rounded-[12px] border border-[#d2d5fc] bg-white p-4"
// or for larger cards:
className="rounded-[14px] border border-[#d2d5fc] bg-white p-4"
```

### Base UI Tabs Selector Rule
**Source:** `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` line 81
**Apply to:** `vertraege/versicherungen/page.tsx`
```
data-active:text-primary data-active:shadow-[inset_0_-2px_0_0_#646efb]
// NOT: data-[state=active]:* — that is Radix UI syntax, NOT used here
```

---

## No Analog Found

All files have at least a role-match analog. No files require falling back to RESEARCH.md-only patterns.

---

## Metadata

**Analog search scope:** `src/store/`, `src/app/(main)/`, `src/components/`, `src/lib/`, `src/types/`
**Files read:** 16 source files
**Pattern extraction date:** 2026-05-08
