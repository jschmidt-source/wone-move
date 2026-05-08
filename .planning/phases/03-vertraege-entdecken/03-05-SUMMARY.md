---
phase: 03-vertraege-entdecken
plan: "05"
subsystem: entdecken-sub-screens
tags: [entdecken, faq, spartipps, notfallkontakte, adressaenderungen, sub-screens]
dependency_graph:
  requires: [03-01]
  provides: [GTK-02, GTK-03, GTK-04, GTK-05]
  affects: [entdecken-hub]
tech_stack:
  added: []
  patterns:
    - Controlled Collapsible accordion (openId state for single-open)
    - Dynamic Lucide icon map via Record<string, LucideIcon>
    - Local useState<Record<string, boolean>> progress bar (no store)
    - Custom div progress bar (4px h-1) instead of shadcn Progress
key_files:
  created:
    - src/components/entdecken/NotfallkontakteRow.tsx
    - src/components/entdecken/AdressCheckRow.tsx
    - src/app/(main)/entdecken/faq/page.tsx
    - src/app/(main)/entdecken/spartipps/page.tsx
    - src/app/(main)/entdecken/notfallkontakte/page.tsx
    - src/app/(main)/entdecken/adressaenderungen/page.tsx
  modified: []
decisions:
  - "FAQ accordion: controlled openId state (useState<string|null>) in parent — single-open accordion without shadcn Accordion component; uses existing Collapsible primitive"
  - "Adressaenderungen progress bar: custom div with h-1 + transition-[width] instead of shadcn Progress — avoids height-override complexity, matches 4px spec with one element"
  - "Tap-to-call mock: onClick={(e) => e.preventDefault()} on all <a href='tel:'> elements — blocks dialer in prototype per T-03-13"
metrics:
  duration: 8 min
  completed_date: "2026-05-08"
  tasks_completed: 3
  files_created: 6
  files_modified: 0
---

# Phase 3 Plan 05: Entdecken Sub-Screens Summary

**One-liner:** 4 Entdecken sub-screens mit FAQ-Accordion (controlled openId), Spartipps-Kategorienliste, tap-to-call Notfallkontakte-Rows und lokalem Adressänderungen-Fortschrittsbalken.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Build NotfallkontakteRow + AdressCheckRow | 6c69be8 | NotfallkontakteRow.tsx, AdressCheckRow.tsx |
| 2 | Build FAQ + Spartipps sub-screens | 31f8a44 | faq/page.tsx, spartipps/page.tsx |
| 3 | Build Notfallkontakte + Adressänderungen sub-screens | e6f1d13 | notfallkontakte/page.tsx, adressaenderungen/page.tsx |

## What Was Built

### Komponenten (Task 1)

**NotfallkontakteRow.tsx** — Wiederverwendbare Zeile für Notfallkontakte:
- Dynamische Lucide-Icon-Map via `Record<string, LucideIcon>` für Shield, Flame, AlertCircle, Zap, Droplets, PawPrint
- `<a href="tel:...">` mit `onClick={e => e.preventDefault()}` (T-03-13 Mitigation)
- Row-Höhe `h-14` (56px), Phone-Icon rechts in `contact.iconColor`

**AdressCheckRow.tsx** — Checkbox-Zeile für Adressänderungen-Liste:
- `<button aria-pressed>` (kein div) für Accessibility
- Benutzerdefiniertes Checkbox-UI: `border-[#d2d5fc]` unchecked → `bg-primary` checked, 150ms Transition
- Check-Icon (14px, strokeWidth 3) nur wenn `checked === true`

### FAQ Sub-Screen (`/entdecken/faq`) — Task 2

- 10 Fragen aus `lib/faq.ts` in Collapsible-Accordion
- Controlled state: `useState<string | null>(null)` → `openId` — nur eine Frage gleichzeitig geöffnet
- ChevronDown rotiert 180° via `rotate-180` Klasse bei geöffnetem Item
- Back-Header navigiert zu `/entdecken`

### Spartipps Sub-Screen (`/entdecken/spartipps`) — Task 2

- 4 Kategorien aus `lib/spartipps.ts` (Einrichtung: 4, Strom: 3, Lebensmittel: 3, Umzug: 4 = 14 Tipps gesamt)
- Jede Kategorie als `<section>` mit Emoji + Label als h2, darunter gestapelte Tipp-Cards
- Back-Header navigiert zu `/entdecken`

### Notfallkontakte Sub-Screen (`/entdecken/notfallkontakte`) — Task 3

- 6 Kontakte aus `lib/notfallkontakte.ts` via NotfallkontakteRow-Komponente
- Intro-Text: "Speicher diese Nummern — im Notfall zählt jede Sekunde."
- Regionale Hinweis-Card mit Info-Icon unten

### Adressänderungen Sub-Screen (`/entdecken/adressaenderungen`) — Task 3

- 15 Checkboxen aus `lib/adressaenderungen.ts` via AdressCheckRow-Komponente
- Lokaler State: `useState<Record<string, boolean>>({})` — kein Zustand-Store (per CONTEXT-Spec D)
- Fortschrittsbalken: custom div `h-1 bg-primary transition-[width] duration-200` mit `width: checkedCount/15 * 100%`
- Headline-Card mit MapPin-Icon: "Vergiss niemanden — hier sind alle"

## Key Decisions

1. **FAQ Accordion: Collapsible statt Accordion** — Das shadcn-Projekt hat `Collapsible` installiert. Statt `accordion` extra zu installieren, wurde `Collapsible` mit `openId`-State im Parent für Single-Open-Verhalten genutzt. Spart eine shadcn-Abhängigkeit, identisches UX.

2. **Progress Bar: Custom div statt shadcn Progress** — Custom `<div class="h-1">` mit inline-style `width` für den Fortschrittsbalken. Vermeidet Height-Override-Komplexität mit dem base-nova Progress-Preset und erfüllt die 4px-Spec exakt mit einem Element.

3. **Tap-to-Call Mock** — `onClick={(e) => e.preventDefault()}` auf allen `<a href="tel:...">` Elementen in NotfallkontakteRow implementiert gemäß T-03-13 (Prototype-Sicherheit: kein Dialer-Launch).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — alle Screens rendern echte Daten aus den `lib/*.ts`-Dateien.

## Threat Flags

No new threat surface introduced beyond plan's threat model.

## Self-Check: PASSED

- [x] src/components/entdecken/NotfallkontakteRow.tsx — exists
- [x] src/components/entdecken/AdressCheckRow.tsx — exists
- [x] src/app/(main)/entdecken/faq/page.tsx — exists
- [x] src/app/(main)/entdecken/spartipps/page.tsx — exists
- [x] src/app/(main)/entdecken/notfallkontakte/page.tsx — exists
- [x] src/app/(main)/entdecken/adressaenderungen/page.tsx — exists
- [x] Commits 6c69be8, 31f8a44, e6f1d13 — confirmed
- [x] `npx next build` — alle 4 Routen erscheinen in Build-Output
