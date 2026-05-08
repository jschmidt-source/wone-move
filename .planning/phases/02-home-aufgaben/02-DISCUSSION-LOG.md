# Phase 2: Home + Aufgaben (Checkliste & Zeitplan) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 02-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-08
**Phase:** 02-home-aufgaben
**Areas discussed:** Task check state, Onboarding-based filtering, Guide routing, Dashboard data source

---

## Task Check State

| Option | Description | Selected |
|--------|-------------|----------|
| Ja, persistieren | Neuer checklistStore mit Zustand + persist. Demo-Effekt: Abhaken bleibt über Navigation hinweg. | ✓ |
| Nein, nur lokaler UI-State | Kein neuer Store. State reset beim Navigieren. Schneller zu bauen. | |

**User's choice:** Ja, persistieren

---

| Option | Description | Selected |
|--------|-------------|----------|
| Neuer checklistStore | Saubere Trennung von onboardingStore. Gleiches Pattern. | ✓ |
| In onboardingStore erweitern | Alles in einem Store, aber vermischt Verantwortlichkeiten. | |

**User's choice:** Neuer checklistStore

---

| Option | Description | Selected |
|--------|-------------|----------|
| Auch im checklistStore | Custom items persistent, kein separater Mechanismus. | ✓ |
| Nur visuell, nicht persistent | Custom item verschwindet beim Reload. | |

**User's choice:** Auch im checklistStore

---

| Option | Description | Selected |
|--------|-------------|----------|
| Einfach: CSS-Übergang | Tailwind transition, Scale + Farbe. Schnell, sauber. | ✓ |
| Kleines Konfetti-Burst | Partikel wie Celebration-Screen. Mehr Aufwand. | |
| Claude entscheiden lassen | Implementierungsdetail dem Planner überlassen. | |

**User's choice:** Einfach: CSS-Übergang

---

## Onboarding-based Filtering

| Option | Description | Selected |
|--------|-------------|----------|
| Vollständiges Filtering | alreadyDone → pre-check; movingOrg 'Umzugsfirma' → Items ausblenden. | ✓ |
| Nur alreadyDone pre-checken | Items starten abgehakt, nichts wird ausgeblendet. | |
| Keine Filterung | Alle Tasks immer anzeigen. | |

**User's choice:** Vollständiges Filtering

---

| Option | Description | Selected |
|--------|-------------|----------|
| Utility-Funktion | filterTasks(tasks, onboardingData) in src/lib/tasks.ts. Testbar, wiederverwendbar. | ✓ |
| Direkt im Component | Inline, weniger Dateien. | |

**User's choice:** Utility-Funktion in src/lib/tasks.ts

---

| Option | Description | Selected |
|--------|-------------|----------|
| Abgehakt anzeigen | Item bleibt sichtbar, zeigt Fortschritt positiv. | ✓ |
| Aus Must-Do entfernen | Sauberer visuell, aber versteckt Fortschritt. | |

**User's choice:** Abgehakt anzeigen

---

## Guide Routing

| Option | Description | Selected |
|--------|-------------|----------|
| /anleitungen/[slug] | Shared route, nutzbar von Aufgaben + Entdecken (Phase 3). | ✓ |
| /aufgaben/[slug] | Unter Aufgaben verschachtelt; Phase 3 bräuchte Redirect. | |

**User's choice:** /anleitungen/[slug]

---

| Option | Description | Selected |
|--------|-------------|----------|
| router.back() | Browser-History-Stack — korrekt egal von wo. | ✓ |
| Fester Link zu /aufgaben | Bricht Navigation aus Entdecken. | |

**User's choice:** router.back()

---

| Option | Description | Selected |
|--------|-------------|----------|
| Nur Ummeldung vollständig | Rest als Preview-Cards. Fokussiert. | |
| Ummeldung + 2-3 weitere | Z.B. Rundfunkbeitrag, Nachsendeauftrag. Überzeugenderer Browser. | ✓ |
| Alle 6+ Guides vollständig | Maximaler Inhalt, hoher Aufwand. | |

**User's choice:** Ummeldung + 2–3 weitere vollständig

---

## Dashboard Data Source

| Option | Description | Selected |
|--------|-------------|----------|
| Store-Daten + Mock-Name | moveDate → echter Countdown; PLZ/Stadt aus Store; Name = "Lea". | ✓ |
| Alles hardcoded | Immer "Hey Lea, Noch 23 Tage, Hamburg → München". Einfacher. | |

**User's choice:** Store-Daten + Mock-Name

---

| Option | Description | Selected |
|--------|-------------|----------|
| Erste unerledigte Must-Do | Deterministisch, konsistent mit Checklist-State. | ✓ |
| Hardcoded 'Ummeldung' | Kein Bezug zum State. | |
| Erste unerledigte aus allen | Weniger fokussiert als Must-Do-only. | |

**User's choice:** Erste unerledigte Must-Do-Aufgabe

---

| Option | Description | Selected |
|--------|-------------|----------|
| /home/kostenrechner | Eigene Route, saubere Back-Navigation. | ✓ |
| Bottom Sheet / Modal | Kein Routing, aber komplexer. | |

**User's choice:** /home/kostenrechner

---

## Claude's Discretion

- Welche 2–3 weiteren Guides neben Ummeldung ausgearbeitet werden
- Genaue Zeitschätzungen und Schwierigkeitsgrad-Labels
- "Wusstest du schon?"-Card Content
- Upcoming Deadlines: 2–3 Mock-Items mit Datum-Offsets

## Deferred Ideas

Keine — Diskussion blieb vollständig im Phase-2-Scope.
