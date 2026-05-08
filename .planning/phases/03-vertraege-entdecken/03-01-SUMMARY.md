---
phase: 03-vertraege-entdecken
plan: 01
subsystem: ui
tags: [zustand, typescript, mock-data, vertraege, entdecken]

# Dependency graph
requires:
  - phase: 02-home-aufgaben
    provides: Zustand+persist pattern (checklistStore, onboardingStore), src/types/checklist.ts shape, src/lib/tasks.ts typed-array pattern
provides:
  - src/types/vertraege.ts — 7 TypeScript interfaces for Phase 3 UI (Anbieter, VertragKategorie, FaqItem, Spartipp, SpartippKategorie, Notfallkontakt, Adresspartei)
  - src/lib/anbieter.ts — 20 mock Anbieter (4 per Kategorie), KATEGORIE_META, getAnbieterByKategorie helper
  - src/lib/faq.ts — 10 FAQ-Einträge verbatim aus UI-SPEC
  - src/lib/spartipps.ts — 4 Kategorien, 14 Tipps
  - src/lib/notfallkontakte.ts — 6 Notfallkontakte
  - src/lib/adressaenderungen.ts — 15 Adressparteien
  - src/store/vertraegeStore.ts — Zustand+persist Store, key 'wone-vertraege', 4 Hub-Kategorien
affects:
  - 03-02 (Verträge Hub + Anbieter-Vergleich)
  - 03-03 (Entdecken Hub + Search)
  - 03-04 (FAQ + Spartipps + Notfallkontakte)
  - 03-05 (Adressänderungen)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Typed array export ohne 'use client' für reine Datendateien (faq.ts, anbieter.ts etc.)
    - Zustand+persist ohne 'use client' auf Modulebene (onboardingStore-Pattern)
    - VertragHubKategorie als eigener Typ im Store (strom/internet/telefon/versicherungen), getrennt von VertragKategorie in types (inkl. haftpflicht/hausrat)

key-files:
  created:
    - src/types/vertraege.ts
    - src/lib/anbieter.ts
    - src/lib/faq.ts
    - src/lib/spartipps.ts
    - src/lib/notfallkontakte.ts
    - src/lib/adressaenderungen.ts
    - src/store/vertraegeStore.ts
  modified: []

key-decisions:
  - "VertragHubKategorie im Store hat 4 Kategorien (strom/internet/telefon/versicherungen); VertragKategorie in types hat 5 (inkl. haftpflicht/hausrat) — Trennung weil Hub Versicherungen als eine Kachel zeigt, Vergleichs-Screens aber Tab-intern zwischen Haftpflicht und Hausrat unterscheiden"
  - "preisProMonat als String ('8,90') statt number — deutsches Dezimalformat direkt in Daten, kein Formatierungs-Helper nötig"
  - "Kein 'use client' im Store (folgt onboardingStore-Pattern, nicht checklistStore)"

patterns-established:
  - "Datendateien (lib/*.ts) ohne 'use client' — plain TypeScript Module"
  - "Store ohne 'use client' auf Modulebene — Zustand stores sind framework-agnostisch"
  - "Preisformat als String mit Komma als Dezimaltrennzeichen für deutsches Locale"

requirements-completed: [GTK-01, GTK-02, GTK-03, GTK-04, GTK-05]

# Metrics
duration: 3min
completed: 2026-05-08
---

# Phase 3 Plan 01: Data Foundation Summary

**7 neue Dateien — TypeScript-Typen, Mock-Anbieter (20 Einträge), FAQ (10), Spartipps (14), Notfallkontakte (6), Adressänderungen (15) und Zustand-Store mit localStorage-Key 'wone-vertraege'**

## Performance

- **Duration:** 3 min
- **Started:** 2026-05-08T17:24:57Z
- **Completed:** 2026-05-08T17:28:48Z
- **Tasks:** 3
- **Files modified:** 7 (alle neu erstellt)

## Accomplishments

- Vollständige TypeScript-Typen für Phase 3 (7 Interfaces/Types), die alle Wave-2-Pläne als stabile Contracts nutzen können
- 20 Mock-Anbieter-Einträge (4 je Kategorie: Strom, Internet, Telefon, Haftpflicht, Hausrat) verbatim aus UI-SPEC plus KATEGORIE_META und getAnbieterByKategorie-Helper
- vertraegeStore mit Zustand+persist (key: 'wone-vertraege') trackt 4 Hub-Kategorien als boolean flags — sauber getrennt vom checklistStore

## Task Commits

Jede Task wurde atomisch committed:

1. **Task 1: Types und Core Mock Data** - `1e5253e` (feat)
2. **Task 2: Verbleibende Mock Data** - `ed393f4` (feat)
3. **Task 3: vertraegeStore** - `562e55b` (feat)

**Plan metadata:** *(dieser Commit)*

## Files Created/Modified

- `src/types/vertraege.ts` — 7 Exports: VertragKategorie, Anbieter, FaqItem, Spartipp, SpartippKategorie, Notfallkontakt, Adresspartei
- `src/lib/anbieter.ts` — ANBIETER (20), KATEGORIE_META (5 Kategorien), getAnbieterByKategorie()
- `src/lib/faq.ts` — FAQ (10 Einträge, IDs faq-01 bis faq-10, verbatim aus UI-SPEC)
- `src/lib/spartipps.ts` — SPARTIPPS (4 Kategorien: einrichtung/strom/lebensmittel/umzug, 14 Tipps gesamt)
- `src/lib/notfallkontakte.ts` — NOTFALLKONTAKTE (6: polizei/feuerwehr/gift/energie/wasser/tier)
- `src/lib/adressaenderungen.ts` — ADRESSAENDERUNGEN (15 Parteien in UI-SPEC-Reihenfolge)
- `src/store/vertraegeStore.ts` — useVertraegeStore, VertragHubKategorie, persist key 'wone-vertraege'

## Decisions Made

- `preisProMonat` als `string` (z.B. `"8,90"`) statt `number` — das Plan-Interface schreibt String vor; deutsches Dezimalformat direkt in den Daten, kein Formatierungs-Helper in UI-Komponenten nötig
- `VertragHubKategorie` im Store hat 4 Kategorien (Versicherungen zusammengefasst), `VertragKategorie` in types hat 5 (mit haftpflicht/hausrat getrennt für Anbieter-Daten und Tabs)
- Kein `'use client'` im Store-File — folgt `onboardingStore.ts`-Pattern (D-04: Stores sind framework-agnostisch auf Modulebene)

## Deviations from Plan

Keine — Plan exakt wie spezifiziert ausgeführt.

## Issues Encountered

Keine.

## Known Stubs

Keine — dieses Plan liefert nur Daten und Store, keine UI-Komponenten.

## Next Phase Readiness

Alle 7 Dateien sind bereit. Wave-2-Pläne (03-02 bis 03-05) können sofort importieren:
- `@/types/vertraege` — alle Typen
- `@/lib/anbieter` — ANBIETER, KATEGORIE_META, getAnbieterByKategorie
- `@/lib/faq` — FAQ
- `@/lib/spartipps` — SPARTIPPS
- `@/lib/notfallkontakte` — NOTFALLKONTAKTE
- `@/lib/adressaenderungen` — ADRESSAENDERUNGEN
- `@/store/vertraegeStore` — useVertraegeStore, VertragHubKategorie

TypeScript-Build ist sauber. Kein weiteres Setup erforderlich.

---
*Phase: 03-vertraege-entdecken*
*Completed: 2026-05-08*
