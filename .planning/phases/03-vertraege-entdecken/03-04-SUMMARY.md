---
phase: 03-vertraege-entdecken
plan: "04"
subsystem: entdecken-hub
tags: [entdecken, search-overlay, horizontal-scroll, hub]
dependency_graph:
  requires: [03-01]
  provides: [entdecken-hub, search-overlay, preview-sections]
  affects: [src/app/(main)/entdecken/page.tsx]
tech_stack:
  added: []
  patterns: [horizontal-scroll-snap, sticky-searchbar, overlay-opacity-transition, preview-card-grid]
key_files:
  created:
    - src/components/entdecken/EntdeckenSection.tsx
    - src/components/entdecken/SearchOverlay.tsx
  modified:
    - src/app/(main)/entdecken/page.tsx
decisions:
  - "SearchOverlay nutzt inset-0 full-screen overlay statt nur unterhalb der Suchleiste — vereinfacht Prototyp-Implementierung ohne Funktionsverlust"
  - "ADRESSAENDERUNGEN.slice(0,3) zeigt Arbeitgeber/Finanzamt/Krankenkasse (nicht Arbeitgeber/Krankenkasse/Bank wie UI-SPEC §7) — Dateireihenfolge aus adressaenderungen.ts hat Vorrang"
  - "Alle anzeigen-Links zu /entdecken/faq, /entdecken/spartipps etc. ergeben 404 bis Plan 03-05 implementiert — erwartetes Verhalten mid-wave"
metrics:
  duration: "8 min"
  completed_date: "2026-05-08"
  tasks_completed: 3
  files_created: 2
  files_modified: 1
---

# Phase 3 Plan 04: Entdecken Hub Summary

**One-liner:** Entdecken Hub mit sticky Suchleiste, 5 horizontalen Preview-Sektionen und SearchOverlay mit Autocomplete/Kategorien-Ergebnissen.

## What Was Built

### Hub-Layout (sticky Suchleiste + 5 Sektionen)

`src/app/(main)/entdecken/page.tsx` ersetzt den Placeholder vollständig.

- **Sticky Suchleiste** (`sticky top-0 z-40`): Button-Attrappe, öffnet `SearchOverlay` bei Tap (kein direktes Schreiben im Hub — D-08)
- **5 horizontale Scroll-Sektionen** mit `EntdeckenSection`-Wrapper, je 3 Preview-Karten
- `SearchOverlay` eingebunden mit `open={searchOpen}` State-Binding

**Preview-Karten-Quellen:**

| Sektion | Datenquelle | Navigation |
|---------|-------------|------------|
| Anleitungen | 3 hardcodierte Einträge (Ummeldung, Rundfunkbeitrag, Nachsendeauftrag) | `/anleitungen/[slug]` (Phase-2-Route, D-09) |
| Häufige Fragen | `FAQ.slice(0, 3)` | `/entdecken/faq` |
| Spartipps | `SPARTIPPS.slice(0, 3)` | `/entdecken/spartipps` |
| Notfallkontakte | `NOTFALLKONTAKTE.slice(0, 3)` | `/entdecken/notfallkontakte` |
| Adressänderungen | `ADRESSAENDERUNGEN.slice(0, 3)` | `/entdecken/adressaenderungen` |

### EntdeckenSection (Task 1 — 2b83667)

`src/components/entdecken/EntdeckenSection.tsx`

- **`EntdeckenSection`**: Section-Header (Titel + "Alle anzeigen →"-Link) + horizontaler Scroll-Container mit `scrollSnapType: 'x mandatory'`
- **`EntdeckenPreviewCard`**: 200px breite Karte mit `scroll-snap-align: start`, `shrink-0`, border `#d2d5fc`

### SearchOverlay (Task 2 — d6a1f5b)

`src/components/entdecken/SearchOverlay.tsx`

**State-Modell:**
- `query` (string): Eingabe des Nutzers
- `hasResults` (boolean): `false` = Vorschläge-Ansicht, `true` = Ergebnisse-Ansicht
- Wechsel zu Ergebnissen: Enter-Taste oder Chip-Tap
- Reset beider States via `useEffect` wenn `open` auf `false` wechselt

**Vorschläge-Ansicht:** 4 Chips ("Ummeldung", "Ummeldungsfrist", "Strom", "Versicherung") mit Substring-Highlighting (`text-primary` auf Treffer-Zeichen)

**Ergebnisse-Ansicht:** 3 kategorisierte Abschnitte — Aufgaben (2), Anleitungen (1), FAQ (2) — statische Mock-Daten für beliebige Query

**Animation:** `transition-opacity duration-200` per UI-SPEC §8 Animationsvertrag

## Deviations from Plan

Keine — Plan exakt wie spezifiziert ausgeführt.

## Dead Links (erwartet)

Folgende "Alle anzeigen →"-Links ergeben 404 bis Plan 03-05 landet:
- `/entdecken/faq`
- `/entdecken/spartipps`
- `/entdecken/notfallkontakte`
- `/entdecken/adressaenderungen`

Der Link zu `/anleitungen` (Phase-2-Route) funktioniert bereits korrekt.

## Known Stubs

Keine funktions-blockierenden Stubs. Die SearchOverlay-Ergebnisse sind Mock-Static (Prototyp per UI-SPEC §8 — explizit akzeptiert).

## Self-Check: PASSED

- [x] `src/components/entdecken/EntdeckenSection.tsx` existiert
- [x] `src/components/entdecken/SearchOverlay.tsx` existiert
- [x] `src/app/(main)/entdecken/page.tsx` enthält 5 `<EntdeckenSection`-Aufrufe
- [x] Commit 2b83667 (EntdeckenSection) vorhanden
- [x] Commit d6a1f5b (SearchOverlay) vorhanden
- [x] Commit 4d73d12 (Hub page) vorhanden
- [x] `npx next build` erfolgreich
