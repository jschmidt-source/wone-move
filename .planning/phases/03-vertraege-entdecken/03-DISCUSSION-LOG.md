# Phase 3: Verträge + Entdecken - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-08
**Phase:** 03-vertraege-entdecken
**Areas discussed:** Versicherungen-Subkategorien, Entdecken Hub-Layout, Verträge Sign-up-Flow, Entdecken Search

---

## Versicherungen-Subkategorien

### Frage 1: Navigationsstruktur für Haftpflicht + Hausrat

| Option | Description | Selected |
|--------|-------------|----------|
| Ein Screen mit Tabs | /vertraege/versicherungen mit Tabs [Haftpflicht] [Hausrat]. Nutzt bestehende Tabs-Komponente. | ✓ |
| Zwei separate Screens | Eigene Routes für jede Unterkategorie. Mehr Routing-Aufwand. | |
| Hub-Kachel aufgeteilt | Zwei Kacheln im Hub für Haftpflicht + Hausrat direkt. | |

**User's choice:** Ein Screen mit Tabs

### Frage 2: Einstiegspunkt der Versicherungen-Kachel

| Option | Description | Selected |
|--------|-------------|----------|
| Übergeordneter Screen mit Tabs | Kachel → /vertraege/versicherungen, Tabs oben. Konsistent mit anderen Vergleichs-Screens. | ✓ |
| Direkt zu Haftpflicht | Kachel → /vertraege/versicherungen/haftpflicht, Tabs vorhanden. Spart einen Klick. | |

**User's choice:** Übergeordneter Screen mit Tabs

### Frage 3: Kartenstruktur für Versicherungs-Anbieter

| Option | Description | Selected |
|--------|-------------|----------|
| Gleiche Struktur wie Strom | Konsistenz über alle 4 Kategorien. Nur Inhalte ändern sich. | ✓ |
| Angepasste Darstellung | Zusatzfelder für Deckungssumme, jährliche Preisnennug, etc. Mehr Realismus. | |

**User's choice:** Gleiche Struktur wie Strom

---

## Entdecken Hub-Layout

### Frage 1: Sektions-Darstellung

| Option | Description | Selected |
|--------|-------------|----------|
| Horizontal-Scroll-Reihe | Header + horizontal scrollbare Preview-Cards. Nutzer sieht sofort Content. Wie Home-Tips. | ✓ |
| Section-List mit Chevron | Jede Sektion = ein Listeneintrag. Cleaner, kein Preview. | |
| Kachel-Grid + List | Anleitungen/FAQ als Kacheln, Rest als Liste. | |

**User's choice:** Horizontal-Scroll-Reihe

### Frage 2: Anleitungen-Verlinkung

| Option | Description | Selected |
|--------|-------------|----------|
| Entdecken verlinkt zu /anleitungen | Kein doppelter Screen. Phase-2-gebaut. Konsistent. | ✓ |
| Eigener Screen /entdecken/anleitungen | Separate Ansicht. Dupliziert bestehenden Screen. | |

**User's choice:** Entdecken verlinkt zu /anleitungen

### Frage 3: Suchleisten-Sichtbarkeit

| Option | Description | Selected |
|--------|-------------|----------|
| Immer sichtbar / sticky | Suchleiste klebt oben. Search immer erreichbar. | ✓ |
| Scroll-away | Scrollt weg. Mehr Platz für Content. | |

**User's choice:** Immer sichtbar / sticky

### Frage 4: Anzahl Preview-Cards pro Sektion

| Option | Description | Selected |
|--------|-------------|----------|
| 3 Cards sichtbar | Guter Überblick. Ummeldung, Rundfunkbeitrag, Nachsendeauftrag. | ✓ |
| 2 Cards sichtbar | Kompakter, drittes Card angeschnitten zeigt "mehr". | |
| Ich entscheide selbst | Claude legt Layout-Detail fest. | |

**User's choice:** 3 Cards sichtbar

---

## Verträge Sign-up-Flow

### Frage 1: Erfolgs-Screen-Platzierung

| Option | Description | Selected |
|--------|-------------|----------|
| Inline im Sheet (multi-step) | Sheet-Inhalt wechselt zu Erfolg. Kein neuer Screen. Modal bleibt. | ✓ |
| Neuer Full-Screen | Navigation zu /vertraege/strom/erfolg. Mehr Platz, tieferer Pfad. | |

**User's choice:** Inline im Sheet

### Frage 2: State-Management

| Option | Description | Selected |
|--------|-------------|----------|
| Neuer vertraegeStore | Saubere Trennung. Gleices Zustand+persist-Pattern. | ✓ |
| Im checklistStore | Kein neues File, aber Store-Scope wird breiter. | |

**User's choice:** Neuer vertraegeStore

### Frage 3: Kachel-Darstellung nach Abschluss

| Option | Description | Selected |
|--------|-------------|----------|
| Nur grüner Status-Ring / Checkmark | Kachel bekommt grünen Rand + ✓-Icon. Einfach. | ✓ |
| Anbieter-Name im State | Kachel zeigt "E.ON ✓". Mehr Info, mehr Store-Aufwand. | |

**User's choice:** Nur grüner Status-Ring / Checkmark

---

## Entdecken Search

### Frage 1: Search-Interaktionsmuster

| Option | Description | Selected |
|--------|-------------|----------|
| Overlay über den Hub | Gleitet über Hub, kein Page-Navigate. Autocomplete + Ergebnisse im Overlay. | ✓ |
| Navigation zu /entdecken/suche | Eigene Suchseite. Saubere URL, extra Screen. | |
| Inline im Hub | Hub-Sektionen werden live gefiltert. Kein Overlay. | |

**User's choice:** Overlay über den Hub

### Frage 2: Ergebnis-Screen

| Option | Description | Selected |
|--------|-------------|----------|
| Im Overlay — kein separater Screen | Overlay zeigt Autocomplete → Ergebnisse inline. Ein Pattern, keine Route. | ✓ |
| Ergebnis-Screen zusätzlich | Overlay für Autocomplete, dann Navigation zu /entdecken/suche?q=. | |

**User's choice:** Im Overlay — kein separater Screen

---

## Claude's Discretion

- Mock-Anbieter-Namen, Logos, Preise und Highlights (E.ON, Vattenfall, O2, Telekom, ERGO, HUK-COBURG, etc.)
- Sortierung der Preview-Cards im Entdecken-Hub
- Genaue Autocomplete-Vorschläge für den Mock-Search
- Layout-Details des Suchoverlay (Scrim, Animation)
- Spartipps-Inhalte (je 3–4 pro Kategorie)

## Deferred Ideas

Keine — Diskussion blieb vollständig im Phase-3-Scope.
