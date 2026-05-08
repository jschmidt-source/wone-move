---
phase: 03-vertraege-entdecken
plan: "03"
subsystem: vertraege
tags:
  - bottom-sheet
  - abschluss-flow
  - zustand
  - multi-step-ui
dependency_graph:
  requires:
    - "03-01"  # vertraegeStore + types
    - "03-02"  # ProviderCard + comparison pages
  provides:
    - AbschlussSheet component (reusable multi-step bottom sheet)
    - Vertical slice closure: hub → comparison → abschluss → success → hub green ring
  affects:
    - src/app/(main)/vertraege/strom/page.tsx
    - src/app/(main)/vertraege/internet/page.tsx
    - src/app/(main)/vertraege/telefon/page.tsx
    - src/app/(main)/vertraege/versicherungen/page.tsx
tech_stack:
  added:
    - AbschlussSheet (new component)
  patterns:
    - Multi-step inline sheet (form → success, no route change, D-03)
    - key={step} React remount for CSS animate-in fade-in cross-fade
    - useEffect([open]) to reset step to 'form' on each open
    - selectedAnbieter: Anbieter | null pattern for sheet open state
key_files:
  created:
    - src/components/vertraege/AbschlussSheet.tsx
  modified:
    - src/app/(main)/vertraege/strom/page.tsx
    - src/app/(main)/vertraege/internet/page.tsx
    - src/app/(main)/vertraege/telefon/page.tsx
    - src/app/(main)/vertraege/versicherungen/page.tsx
decisions:
  - "key={step} on step content div triggers React remount — pairs with Tailwind animate-in fade-in duration-200 for cross-fade; avoids custom CSS keyframe injection"
  - "defaultValue (nicht value) für readonly Inputs — verhindert React-Controlled-Component-Warnung bei readOnly Inputs ohne onChange"
  - "AbschlussSheet liegt außerhalb des overflow-y-auto Containers — position:fixed funktioniert korrekt ohne Clipping durch Scroll-Container"
  - "Versicherungen: ein AbschlussSheet für beide Tabs (Haftpflicht + Hausrat) — markComplete('versicherungen') gilt für beide, kein Tab-Tracking nötig (D-01)"
metrics:
  duration: "8 min"
  completed: "2026-05-08"
  tasks_completed: 2
  files_changed: 5
---

# Phase 3 Plan 03: AbschlussSheet — Abschluss-Flow Summary

AbschlussSheet multi-step bottom sheet (Tarif bestätigen → Antrag eingegangen) gebaut und in alle 4 Vergleichsseiten eingebunden; Hub-Kacheln werden via vertraegeStore.markComplete grün.

## Was wurde gebaut

### AbschlussSheet (`src/components/vertraege/AbschlussSheet.tsx`)

Neues Client-Component nach dem AddItemSheet-Muster. Props: `open`, `anbieter: Anbieter | null`, `onClose`, `onComplete`.

**Step 1 — Tarif bestätigen:**
- Provider-Zusammenfassung (Name, Preis, Laufzeit, Highlights)
- 3 readonly Mock-Inputs (Vor- und Nachname / IBAN / E-Mail-Adresse) mit `pointer-events-none opacity-70`
- Hint: "Keine Sorge — das sind nur Platzhalter für die Vorschau."
- CTA: "Weiter →" → `setStep('success')`

**Step 2 — Erfolg:**
- CheckCircle2 48px in 60px-Kreis mit `bg-[#d2d5fc]`
- Headline: "Antrag eingegangen!"
- Body: `{anbieter.name} bestätigt deinen Vertrag innerhalb von 2 Werktagen per E-Mail.`
- CTA: "Zurück zur Übersicht" → ruft `onComplete` auf (Parent handled markComplete + close)

**Animation:**
- Sheet: `translate-y-0` / `translate-y-full`, `transition-transform duration-[250ms] ease-out`
- Scrim: `bg-[rgba(28,38,66,0.4)]`
- Step-Übergang: `key={step}` auf Content-Div → React Remount + `animate-in fade-in duration-200` (Tailwind v4)
- Step-Reset: `useEffect([open])` → `setStep('form')` bei jedem Öffnen

### 4 Vergleichsseiten (Wire-up)

Jede Seite erhält:
- `import { AbschlussSheet } from '@/components/vertraege/AbschlussSheet'`
- `import { useVertraegeStore } from '@/store/vertraegeStore'`
- State: `const [selectedAnbieter, setSelectedAnbieter] = useState<Anbieter | null>(null)`
- `markComplete = useVertraegeStore((s) => s.markComplete)`
- `onAbschliessen={() => setSelectedAnbieter(a)}` auf jedem ProviderCard
- `<AbschlussSheet>` außerhalb des Scroll-Containers (position:fixed korrekt)

**Completion-Mapping:**

| Seite | markComplete-Key |
|-------|-----------------|
| strom/page.tsx | `'strom'` |
| internet/page.tsx | `'internet'` |
| telefon/page.tsx | `'telefon'` |
| versicherungen/page.tsx | `'versicherungen'` (beide Tabs — Haftpflicht und Hausrat) |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — alle Daten kommen aus dem typisierten `Anbieter`-Objekt (hardcoded in 03-01). Keine UI-Platzhalter für fehlende Daten.

## Threat Flags

Keine neuen Sicherheitsoberflächen eingeführt. AbschlussSheet verwendet keine `dangerouslySetInnerHTML`. React escaped `anbieter.name` automatisch (T-03-07 mitigiert wie geplant).

## Self-Check: PASSED

- `src/components/vertraege/AbschlussSheet.tsx` vorhanden
- `src/app/(main)/vertraege/strom/page.tsx` enthält `AbschlussSheet` und `markComplete('strom')`
- `src/app/(main)/vertraege/internet/page.tsx` enthält `AbschlussSheet` und `markComplete('internet')`
- `src/app/(main)/vertraege/telefon/page.tsx` enthält `AbschlussSheet` und `markComplete('telefon')`
- `src/app/(main)/vertraege/versicherungen/page.tsx` enthält `AbschlussSheet` und `markComplete('versicherungen')`
- Commits 06c628d und e425f4c vorhanden
- `npx tsc --noEmit` bestanden
- `npx next build` bestanden — alle 4 Vertrags-Routen kompilieren
