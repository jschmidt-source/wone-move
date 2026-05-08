# Phase 2: Home + Aufgaben (Checkliste & Zeitplan) - Context

**Gathered:** 2026-05-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 2 delivers the two core working tabs:

1. **Home/Dashboard** — Persönliche Begrüßung, Countdown, Fortschrittsbalken, "Nächste Aufgabe"-Card, "Wusstest du schon?"-Card, Quick-Actions (Verträge, Zeitplan, Kostenrechner), Upcoming Deadlines
2. **Aufgaben** — Checkliste-Ansicht (default) mit Must-Do gepinnt + 5 kollabierbare Kategorien + Zeitplan-Toggle (gleiche Daten, 5 Zeitbuckets)
3. **Ummeldung-Anleitung** — vollständig ausgearbeitet, plus 2–3 weitere Guides vollständig
4. **Übergabeprotokoll** — eigener Screen mit Zimmer-Tabs, Zustand-Toggles, Foto-Slots
5. **Kostenrechner** — eigener Screen unter /home/kostenrechner

Out of scope for Phase 2: Verträge-Tab, Entdecken-Tab, Ich-Tab, Phase-3-Guides-Browser, FAQ, Notfallkontakte, Spartipps.

</domain>

<decisions>
## Implementation Decisions

### Task Check State
- **D-01:** Task-Check-State wird in einem neuen `checklistStore` (Zustand + persist) gespeichert, getrennt vom `onboardingStore`. localStorage-Key: `wone-checklist`.
- **D-02:** Custom Items (CHK-04: "Eigenen Punkt hinzufügen") werden ebenfalls im `checklistStore` als separates Array gespeichert und persistiert.
- **D-03:** Check-Animation beim Abhaken: einfacher CSS-Übergang (Tailwind transition, Scale + Farbe), kein Konfetti-Burst pro Item.

### Onboarding-based Filtering
- **D-04:** Vollständiges Filtering via `filterTasks(tasks, onboardingData)` in `src/lib/tasks.ts`. Regeln:
  - `alreadyDone.electricityInternet === true` → "Stromanbieter wählen" startet abgehakt
  - `alreadyDone.ummeldungPrepared === true` → Ummeldung startet abgehakt
  - `alreadyDone.transport === true` → "Transporter mieten" startet abgehakt
  - `movingOrg === 'Umzugsfirma'` → transportbezogene Items werden ausgeblendet
  - `movingOrg === 'Ich alleine'` → keine Filterung nötig
- **D-05:** Must-Do Items die durch alreadyDone als erledigt gelten, bleiben in der Must-Do-Sektion sichtbar, aber als abgehakt markiert — Fortschritt soll positiv kommuniziert werden.
- **D-06:** `filterTasks()` ist eine reine Utility-Funktion in `src/lib/tasks.ts`, nutzbar sowohl von der Checkliste als auch der Zeitplan-Ansicht.

### Guide Routing
- **D-07:** Schritt-für-Schritt-Anleitungen leben unter `/anleitungen/[slug]` — eigenes Route-Segment, das von Aufgaben (Phase 2) und Entdecken (Phase 3) gleichermaßen verlinkt wird. Keine Duplizierung.
- **D-08:** Back-Navigation aus Guides via `router.back()` — navigiert korrekt zurück zu Aufgaben oder Entdecken je nach Herkunft.
- **D-09:** Phase 2 liefert Ummeldung vollständig ausgearbeitet + 2–3 weitere Guides vollständig (z.B. Rundfunkbeitrag, Nachsendeauftrag). Alle anderen Guides erscheinen als Preview-Cards mit Placeholder-Content.

### Dashboard Data
- **D-10:** Home-Dashboard liest echte Onboarding-Daten aus dem `useOnboardingStore`:
  - `moveDate` → Countdown-Berechnung ("Noch X Tage bis zum Umzug")
  - `targetPlz` / `fromCity` → PLZ und Herkunftsstadt anzeigen
  - Name: immer hardcoded "Lea" (kein Namensfeld im Onboarding)
- **D-11:** "Nächste Aufgabe"-Card: zeigt die erste unerledigte Aufgabe aus der Must-Do-Liste (deterministisch, basiert auf checklistStore-State).
- **D-12:** Kostenrechner wird unter `/home/kostenrechner` als eigene Route geführt; Back-Button → `/home`.

### Claude's Discretion
- Welche 2–3 weiteren Guides neben Ummeldung vollständig ausgearbeitet werden (Empfehlung: Rundfunkbeitrag + Nachsendeauftrag — beide kurz und für die Zielgruppe relevant)
- Genaue Zeitschätzungen und Schwierigkeitsgrad-Labels für einzelne Guide-Cards
- "Wusstest du schon?"-Card Content (3 Mock-Tips)
- Upcoming Deadlines Strip: 2–3 Mock-Items mit realistischen Datum-Offsets

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/ROADMAP.md` §Phase 2 — vollständige Screen-Liste, Success Criteria, Requirements-Mapping
- `.planning/REQUIREMENTS.md` — CHK-01–05, GUIDE-01–05, PROG-01–02, TIME-01–02 (alle Phase 2)
- `.planning/PROJECT.md` — Brand System, Tone of Voice, Navigation Structure, Design-Prinzipien

### Existing Code (Phase 1)
- `src/store/onboardingStore.ts` — Zustand+persist Pattern, OnboardingData-Typen (moveDate, targetPlz, fromCity, movingOrg, priority, alreadyDone)
- `src/app/(main)/layout.tsx` — Main-Layout mit BottomNav, Route-Struktur für neue Screens
- `src/components/nav/BottomNav.tsx` — Tab-Navigation, aktiver State
- `src/app/globals.css` — Brand-Tokens (@theme), Tailwind v4 Config
- `src/components/ui/` — shadcn/ui: Card, Badge, Button, Input, Switch verfügbar

### Phase 1 Summary (Patterns & Decisions)
- `.planning/phases/01-shell-brand-onboarding/01-04-SUMMARY.md` — letzte Phase-1-Summary mit Tech-Decisions

No external specs — requirements fully captured in decisions and ROADMAP.md above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/card.tsx` — shadcn Card für Dashboard-Cards, Aufgaben-Items, Guide-Cards
- `src/components/ui/badge.tsx` — für Zeitschätzungs-Badges ("~15 Min"), Kategorie-Tags, "Must-Do"-Badge
- `src/components/ui/switch.tsx` — für Checkliste ↔ Zeitplan Toggle (oben in Aufgaben)
- `src/components/ui/input.tsx` — für Kostenrechner-Eingabefelder
- `src/components/onboarding/TileSelect.tsx` — Kachel-Pattern (möglicherweise für Kostenrechner-Helfer-Toggle wiederverwendbar)
- `src/store/onboardingStore.ts` — `useOnboardingStore()` für Dashboard-Personalisierung

### Established Patterns
- Zustand + persist: neuer `checklistStore` folgt exakt demselben Pattern (create → persist → named key)
- Client Components: `'use client'` für interaktive Komponenten, `usePathname`/`useRouter` aus next/navigation
- Tailwind v4: arbitrary values (`text-[15px]`, `h-[56px]`) für pixel-exakte UI-Spec
- `h-dvh` für volle Viewport-Höhe (iOS Safari safe)
- Route-Gruppen: `(main)/[tab]/page.tsx` — alle neuen Screens folgen diesem Muster
- Dynamic routes: `[slug]/page.tsx` Pattern für `/anleitungen/[slug]`

### Integration Points
- `src/app/(main)/home/page.tsx` — aktuell Placeholder → wird Home Dashboard
- `src/app/(main)/aufgaben/page.tsx` — aktuell Placeholder → wird Checkliste + Zeitplan Toggle
- `src/app/(main)/` → neue Verzeichnisse: `home/kostenrechner/`, `anleitungen/[slug]/`, `aufgaben/uebgabeprotokoll/`
- `src/store/` → neues File: `checklistStore.ts`
- `src/lib/` → neues File: `tasks.ts` (Task-Daten + filterTasks Utility)
- `src/types/` → neue Types: Task, ChecklistCategory, TimelineBucket

</code_context>

<specifics>
## Specific Ideas

- "Wusstest du schon?"-Card auf Home: horizontal scrollbar mit 3 Mock-Tips (aus ROADMAP.md)
- Must-Do gepinnt: roter Badge, 3–5 kritische Items (Ummeldung, Stromanbieter, Haftpflicht)
- Zeitplan-Farbcodierung: grün = erledigt, orange = diese Woche, rot = überfällig (aus ROADMAP.md)
- City-Link in Ummeldungs-Guide: Mock-Link "Zum Bürgeramt München →" (basiert auf targetPlZ 80xxx)
- Übergabeprotokoll: "Protokoll exportieren" zeigt Premium-Badge (nicht funktional)
- Kostenrechner: Slider Entfernung 10–500km, Toggle Helfer (Ja/Nein/Umzugsfirma), Input qm → Ergebnis-Card mit aufgeteilten Kosten

</specifics>

<deferred>
## Deferred Ideas

None — discussion blieb vollständig im Phase-2-Scope.

</deferred>

---

*Phase: 02-home-aufgaben*
*Context gathered: 2026-05-08*
