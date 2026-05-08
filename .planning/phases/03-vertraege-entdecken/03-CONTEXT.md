# Phase 3: Verträge + Entdecken - Context

**Gathered:** 2026-05-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 3 delivers two tabs vollständig:

1. **Verträge-Tab** — Hub mit 4 Produkt-Kacheln (Strom, Internet, Telefon, Versicherungen), je ein Anbieter-Vergleichs-Screen, Abschluss-Bottom-Sheet (multi-step, Erfolg inline), vertraegeStore für Abschluss-State
2. **Entdecken-Tab** — Hub mit sticky Suchleiste + 5 horizontale Scroll-Sektionen, Suchoverlay (Autocomplete + Ergebnisse inline, kein eigener Screen), separate Sub-Screens: FAQ, Spartipps, Notfallkontakte, Adressänderungen

Out of scope: Ich-Tab, KI Chatbot, Dokumentenspeicher, Premium Paywall, Push-Benachrichtigungen, Werbebanner (alles Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Verträge — Versicherungen-Subkategorien
- **D-01:** Versicherungen nutzt einen übergeordneten Screen `/vertraege/versicherungen` mit zwei Tabs oben: [Haftpflicht] [Hausrat]. Die Hub-Kachel navigiert zu diesem Screen (nicht direkt zu einer Unterkategorie).
- **D-02:** Haftpflicht und Hausrat verwenden die gleiche Anbieter-Karten-Struktur wie Strom/Internet/Telefon (Logo, Preis/Monat, Highlights-Tags, "Empfohlen"-Badge, "Partnerangebot"-Badge). Nur Inhalte ändern sich (versicherungsspezifische Highlights wie "Schutz ab 1€/Tag", "Keine Selbstbeteiligung").

### Verträge — Sign-up-Flow
- **D-03:** Nach dem Abschluss-Modal (Bottom Sheet) und Tipp auf "Weiter →" bleibt der Flow im Sheet — der Sheet-Inhalt wechselt inline zur Erfolgs-Ansicht (multi-step Bottom Sheet). Kein neuer Full-Screen. "Zurück zur Übersicht" / X schließt das Sheet.
- **D-04:** Abschluss-State wird in einem neuen `vertraegeStore` (Zustand + persist, localStorage-Key: `wone-vertraege`) gespeichert — sauber getrennt vom `checklistStore`. Store trackt welche der 4 Kategorien abgeschlossen sind (boolean flags, kein Anbieter-Name).
- **D-05:** Abgeschlossene Kacheln im Hub erhalten nur einen grünen Status-Ring + ✓-Icon — kein Anbieter-Name wird in der Kachel angezeigt.

### Entdecken — Hub-Layout
- **D-06:** Entdecken-Hub zeigt 5 Sektionen als horizontale Scroll-Reihen (je Section Header + horizontal scrollbare Preview-Cards + "Alle anzeigen →"-Link am Ende). Gleiche Scroll-Mechanik wie "Wusstest du schon?"-Cards auf dem Home-Dashboard.
- **D-07:** Jede Sektion zeigt 3 Preview-Cards sichtbar, bevor "Alle anzeigen →" erscheint.
- **D-08:** Suchleiste ist sticky (immer oben sichtbar), scrollt nicht weg.
- **D-09:** "Alle anzeigen →" für Anleitungen navigiert zu `/anleitungen` (bereits in Phase 2 gebaut) — kein separater Anleitungs-Screen unter Entdecken.

### Entdecken — Search
- **D-10:** Tippen auf die Suchleiste öffnet ein Overlay über den Hub (kein Page-Navigate zu einer eigenen Route). Das Overlay zeigt zuerst Mock-Autocomplete-Vorschläge. Nach Tipp auf einen Vorschlag (oder Enter) wechselt das Overlay zur Ergebnisansicht (kategorisiert: Aufgaben / Anleitungen / FAQ). Kein separater Suche-Ergebnis-Screen.

### Claude's Discretion
- Mock-Anbieter-Namen, Logos, Preise und Highlights für alle 4 Vertragstypen (realistisch deutsch: E.ON, Vattenfall, O2, Telekom, ERGO, HUK-COBURG, etc.)
- Sortierung der Preview-Cards im Entdecken-Hub pro Sektion
- Genaue Autocomplete-Vorschläge für den Mock-Search (z.B. "Umm..." → "Ummeldung", "Ummeldungsfrist")
- Layout-Details des Suchoverlay (Hintergrund-Scrim, Animation)
- Anzahl und Inhalt der Spartipps (je 3–4 pro Kategorie laut ROADMAP)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/ROADMAP.md` §Phase 3 — vollständige Screen-Liste, Success Criteria (7 Kriterien), Requirements-Mapping (GTK-01–05, UX-02)
- `.planning/REQUIREMENTS.md` — GTK-01, GTK-02, GTK-03, GTK-04, GTK-05, UX-02 (alle Phase 3)
- `.planning/PROJECT.md` — Brand System, Tone of Voice, Navigation Structure, Design-Prinzipien, Business Model (Provision-Logik für Verträge-Tab)

### Existing Code (Phase 1 + 2)
- `src/store/checklistStore.ts` — Zustand+persist-Pattern für neuen `vertraegeStore` übernehmen
- `src/store/onboardingStore.ts` — Zustand+persist-Pattern, `targetPlz` für PLZ-Anzeige im Vergleichs-Header
- `src/app/(main)/layout.tsx` — Main-Layout mit BottomNav, Route-Struktur für neue Screens
- `src/app/(main)/anleitungen/page.tsx` — Anleitungs-Browser (Phase 2 gebaut), Entdecken verlinkt hierher
- `src/app/(main)/anleitungen/[slug]/page.tsx` — Guide-Detail-Route (Phase 2 gebaut)
- `src/app/globals.css` — Brand-Tokens (@theme), Tailwind v4 Config
- `src/components/ui/` — Card, Badge, Button, Input, Tabs, Collapsible, SegmentedControl, Slider, Progress, Separator verfügbar

### Phase 2 Context (Patterns & Decisions)
- `.planning/phases/02-home-aufgaben/02-CONTEXT.md` — D-07 (Guide-Routing /anleitungen/[slug]), D-08 (router.back()), D-09 (Guide-Scope)
- `.planning/phases/02-home-aufgaben/02-05-SUMMARY.md` — letzte Phase-2-Summary

No external specs — requirements fully captured in decisions and ROADMAP.md above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/tabs.tsx` — für Versicherungen-Screen (Haftpflicht | Hausrat Tabs) und bestehende Tab-Patterns
- `src/components/ui/card.tsx` — für Anbieter-Karten im Vergleich + Preview-Cards im Entdecken-Hub
- `src/components/ui/badge.tsx` — für "Empfohlen"-Badge (#646efb), "Partnerangebot"-Badge (#d2d5fc), Highlights-Tags
- `src/components/ui/input.tsx` — für Suchleiste im Entdecken-Hub
- `src/components/ui/collapsible.tsx` — könnte für FAQ-Accordion genutzt werden
- `src/store/checklistStore.ts` — Template für neuen `vertraegeStore` (Zustand + persist, gleiches Pattern)
- `src/app/(main)/home/page.tsx` → "Wusstest du schon?"-Cards — horizontales Scroll-Pattern für Entdecken-Hub-Sektionen übernehmen

### Established Patterns
- Zustand + persist: `vertraegeStore` folgt exakt demselben Pattern (create → persist → named key `wone-vertraege`)
- Client Components: `'use client'` + `usePathname`/`useRouter` für interaktive Screens
- Tailwind v4: arbitrary values für pixel-exakte UI-Spec
- `h-dvh` für volle Viewport-Höhe (iOS Safari safe)
- Route-Gruppen: `(main)/[tab]/[sub]/page.tsx` — neue Screens folgen diesem Muster
- Base UI Tabs: `data-active:*` Selektoren (nicht Radix `data-[state=active]:*`) — wie in Phase 2 Übergabeprotokoll

### Integration Points
- `src/app/(main)/vertraege/page.tsx` — aktuell Placeholder → wird Verträge-Hub
- `src/app/(main)/entdecken/page.tsx` — aktuell Placeholder → wird Entdecken-Hub
- Neue Routen: `/vertraege/strom`, `/vertraege/internet`, `/vertraege/telefon`, `/vertraege/versicherungen`
- Kein neuer Route für Suche — Overlay-Pattern, kein eigener Screen
- `src/store/` → neues File: `vertraegeStore.ts`
- `src/lib/` → neue Files: `anbieter.ts` (Mock-Anbieter-Daten), `faq.ts`, `spartipps.ts`, `notfallkontakte.ts`, `adressaenderungen.ts`
- `src/types/` → neue Types: Anbieter, VertragKategorie, FaqItem, Spartipp

</code_context>

<specifics>
## Specific Ideas

- Verträge-Hub Intro-Text: "Schließ deine Verträge direkt hier ab. Wir erhalten eine kleine Provision — für dich entstehen keine Mehrkosten. ✓" (aus ROADMAP.md)
- Vergleichs-Header: "Stromanbieter vergleichen · PLZ 80331 · ~40 Anbieter" (PLZ aus onboardingStore.targetPlz)
- Abschluss-Modal: Mock-Felder Name + IBAN (visuell vorhanden, aber nicht ausfüllbar im Prototyp — wie in ROADMAP spezifiziert)
- Erfolgs-Screen im Sheet: ✓ Animation + "Antrag eingegangen! E.ON bestätigt deinen Vertrag innerhalb von 2 Werktagen per E-Mail."
- Entdecken-Hub Suchleiste: sticky oben, Placeholder "Suche nach Aufgaben, Tipps..."
- Autocomplete-Mock: "Umm..." → "Ummeldung" / "Ummeldungsfrist" als Vorschläge
- Suchergebnis-Mock für "Ummeldung": Aufgaben (2) / Anleitungen (1) / FAQ (2)
- Notfallkontakte: Polizei 110, Feuerwehr 112, Giftnotruf 030 19240, tap-to-call UI (Mock)
- Adressänderungen: 15 Parteien mit Checkboxen, abhakbar (Mock-State, kein Store nötig — reiner UI-State)

</specifics>

<deferred>
## Deferred Ideas

None — Diskussion blieb vollständig im Phase-3-Scope.

</deferred>

---

*Phase: 03-vertraege-entdecken*
*Context gathered: 2026-05-08*
