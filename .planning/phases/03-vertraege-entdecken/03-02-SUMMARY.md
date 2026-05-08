---
phase: 03-vertraege-entdecken
plan: "02"
subsystem: vertraege-ui
tags: [vertraege, components, comparison-screens, tabs, hub]
dependency_graph:
  requires: [03-01]
  provides: [vertraege-hub, strom-screen, internet-screen, telefon-screen, versicherungen-screen, VertraegeKachel, FilterPillRow, ProviderCard]
  affects: [03-03]
tech_stack:
  added: []
  patterns: [Base UI Tabs data-active selectors, sticky header pattern, 2x2 kachel grid, ProviderCard with absolute badges]
key_files:
  created:
    - src/components/vertraege/VertraegeKachel.tsx
    - src/components/vertraege/FilterPillRow.tsx
    - src/components/vertraege/ProviderCard.tsx
    - src/app/(main)/vertraege/strom/page.tsx
    - src/app/(main)/vertraege/internet/page.tsx
    - src/app/(main)/vertraege/telefon/page.tsx
    - src/app/(main)/vertraege/versicherungen/page.tsx
  modified:
    - src/app/(main)/vertraege/page.tsx
decisions:
  - "ProviderCard badge is absolute-positioned top-right; Empfohlen takes priority (mutually exclusive with Partnerangebot)"
  - "Filter pill sorting is visual-only for prototype — no list reordering logic"
  - "Versicherungen Hub-Kachel maps to single /vertraege/versicherungen route (D-01); markComplete('versicherungen') covers both tabs"
  - "onAbschliessen() is a no-op stub in all comparison pages — AbschlussSheet wired in plan 03-03"
metrics:
  duration_seconds: 174
  completed_date: "2026-05-08"
  tasks_completed: 3
  files_changed: 8
---

# Phase 3 Plan 02: Verträge UI — Hub + Comparison Screens Summary

Delivered the Verträge tab end-to-end: 3 reusable components + hub replacement + 4 comparison screens (Strom, Internet, Telefon, Versicherungen with Haftpflicht/Hausrat tabs), all driven by vertraegeStore and onboardingStore.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Build 3 Verträge components | c50dd88 | VertraegeKachel.tsx, FilterPillRow.tsx, ProviderCard.tsx |
| 2 | Replace Hub + build Strom/Internet/Telefon screens | c05a198 | vertraege/page.tsx, strom/page.tsx, internet/page.tsx, telefon/page.tsx |
| 3 | Build Versicherungen comparison with Haftpflicht/Hausrat tabs | 7c56ae5 | versicherungen/page.tsx |

## Components Shipped

**VertraegeKachel** (`src/components/vertraege/VertraegeKachel.tsx`)
- 88px kachel with `border-2 border-[#22c55e]` green ring for completed state (D-05)
- Lucide `CheckCircle2` icon bottom-right when completed
- Wraps full tile in `<Link>` for navigation

**FilterPillRow** (`src/components/vertraege/FilterPillRow.tsx`)
- "Empfohlen" / "Günstigste" / "Beliebteste" pills, horizontal scroll
- Active state: `bg-primary text-white`; inactive: `border border-[#d2d5fc] bg-white text-muted-foreground`
- Presentation-only — sorting is visual-only (prototype spec)

**ProviderCard** (`src/components/vertraege/ProviderCard.tsx`)
- Logo: 2-letter initials in 40×40 bordered box
- Star rating: ★/★ characters, amber `#f59e0b` / empty `#d2d5fc`
- Price: `text-[28px] font-bold` for number + `/Monat` at 16px muted
- Laufzeit: "Keine Laufzeit" → displayed as "Keine Mindestlaufzeit"
- Badges: `Empfohlen` (bg-primary white text) wins over `Partnerangebot` (bg-[#d2d5fc] muted text), absolute top-right
- CTA: "Jetzt abschließen →" with `onAbschliessen` callback stub

## Routes Created

| Route | Screen | Provider Count |
|-------|--------|----------------|
| `/vertraege` | Hub — 2×2 kacheln + progress counter | — |
| `/vertraege/strom` | Strom comparison | 4 |
| `/vertraege/internet` | Internet comparison | 4 |
| `/vertraege/telefon` | Telefon comparison | 4 |
| `/vertraege/versicherungen` | Versicherungen with Haftpflicht/Hausrat tabs | 4 + 4 |

## Implementation Notes

**Filter sorting (visual-only):** The FilterPillRow changes `filter` state but the provider list is not reordered. The spec explicitly states "sorting is visual-only — no real sort" for prototype. Cards retain ANBIETER array order (empfohlen cards are already first in the data).

**Versicherungen completion mapping:** The Hub kachel `kategorie="versicherungen"` maps to `markComplete('versicherungen')` in vertraegeStore — single key covers both Haftpflicht and Hausrat tabs. This aligns with D-01: one screen, two tabs; `markComplete` wiring added in plan 03-03.

**Base UI Tabs selectors:** Versicherungen screen uses `data-active:text-primary data-active:shadow-[inset_0_-2px_0_0_#646efb]` (Base UI syntax), not Radix `data-[state=active]:*` — consistent with uebergabeprotokoll pattern.

**Sticky header:** All comparison screens use `sticky top-0 z-40 bg-background` block containing back button row + PLZ subline + FilterPillRow. Content scrolls underneath.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| `onAbschliessen={() => {}}` | strom/page.tsx, internet/page.tsx, telefon/page.tsx, versicherungen/page.tsx | AbschlussSheet wiring deferred to plan 03-03 per spec comment |

These stubs are intentional — plan 03-03 introduces AbschlussSheet and wires all four screens.

## Threat Surface Scan

No new security surface introduced. All provider data comes from the hardcoded `ANBIETER` array (plan 03-01). ProviderCard CTA uses `onClick` button (no `<a href>`), preventing URL injection (T-03-04). No `dangerouslySetInnerHTML` used — React auto-escapes highlight tags (T-03-05).

## Self-Check

Files created:
- [x] src/components/vertraege/VertraegeKachel.tsx
- [x] src/components/vertraege/FilterPillRow.tsx
- [x] src/components/vertraege/ProviderCard.tsx
- [x] src/app/(main)/vertraege/strom/page.tsx
- [x] src/app/(main)/vertraege/internet/page.tsx
- [x] src/app/(main)/vertraege/telefon/page.tsx
- [x] src/app/(main)/vertraege/versicherungen/page.tsx

Commits verified:
- [x] c50dd88 (Task 1)
- [x] c05a198 (Task 2)
- [x] 7c56ae5 (Task 3)

## Self-Check: PASSED
