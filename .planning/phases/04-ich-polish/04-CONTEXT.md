# Phase 4: Ich + Polish + Kosteneinschätzung - Context

**Gathered:** 2026-05-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 4 delivers four things:

1. **Ich-Tab** — Complete personal tab: Profil/Mein Umzug screen (main entry), KI Chatbot, Dokumentenspeicher, Premium Paywall, Einstellungen, Datenschutz/Impressum placeholder screens
2. **App-wide Polish** — Werbebanner (Free-tier ad) on Aufgaben/Checkliste screen, Empty State / Completion screen (100% Aufgaben erledigt)
3. **COST-ESTIMATE.md** — Cost estimation document (3 scenarios, all components)
4. **Navigation Completeness** — No dead ends, every screen has a path back

Out of scope: Real authentication, actual push notification delivery, real payment processing, WG flow, AI/LLM integration.

</domain>

<decisions>
## Implementation Decisions

### Ich-Tab Struktur
- **D-01:** Ich-Tab landet direkt auf dem Profil/Mein Umzug Screen — kein Hub-Screen dazwischen. `/ich` ist der Profil-Screen.
- **D-02:** Profil-Screen hat 2 Header-Icons oben rechts: 💬 → `/ich/chatbot` und ⚙️ → `/ich/einstellungen`. Dokumentenspeicher ist über eine Card/Link-Sektion auf dem Profil-Screen erreichbar → `/ich/dokumente`. Kein separater Hub.
- **D-03:** Push-Benachrichtigungen in Einstellungen: Toggle-Switch öffnet Bottom Sheet mit iOS-Style Dialog Mock + Reminder-Vorschau + Toggle-Liste — kein eigener Sub-Screen `/ich/push`.

### KI Chatbot Modell
- **D-04:** Chat öffnet mit 3 Pre-filled Exchanges bereits als Chat-Bubbles sichtbar (nicht leer). User sieht sofort die Beispiel-Konversation.
- **D-05:** Input-Feld bleibt nach den 3 Exchanges aktiv, Placeholder: "Stell eine Frage...". 4. Absenden zeigt Inline Paywall-Banner direkt im Chat-Feed — kein Sheet, kein Overlay.
- **D-06:** Inline Paywall-Banner im Chat: "Du hast dein Limit erreicht (3/3). Upgrade auf Premium für unbegrenzte Chats." + Upgrade-Button → navigiert zu `/ich/premium`.
- **D-07:** Chat-Limit-Zähler wird via Zustand + persist (localStorage-Key: `wone-chatbot`) gespeichert — demonstriert echte Paywall-Logik, Limit bleibt nach Reload.

### Premium Paywall Route
- **D-08:** Kanonische Paywall-Route: Full-Screen `/ich/premium`. Alle Entry Points navigieren per `router.push('/ich/premium')`:
  - Chatbot-Inline-Banner: Upgrade-Button
  - Dokumentenspeicher: Inline Premium-Lock-Card Upgrade-Link
  - Übergabeprotokoll-Export-Button: direkter Push
- **D-09:** Dokumentenspeicher zeigt statt eines 3. Upload-Slots eine Inline Premium-Lock-Card (Schloss-Icon + "Unlimitiert mit Premium speichern" + Upgrade-Link) — kein Modal beim Tappen.
- **D-10:** Paywall ist Full-Screen `/ich/premium` — kein Bottom Sheet für Paywall. Back-Button kehrt zum vorherigen Screen zurück (router.back()).

### Einstellungen Edge Cases
- **D-11:** "Account löschen" und "Logout" sind visuell sichtbar aber disabled (grau). Tap zeigt Tooltip oder kurzen Hinweis-Toast: "Nur in der Vollversion verfügbar."
- **D-12:** Datenschutz und Impressum navigieren zu internen Placeholder-Screens `/ich/datenschutz` und `/ich/impressum` mit kurzem Mock-Text ("Datenschutzerklärung folgt..."). Kein External Link.

### Claude's Discretion
- Exakter Inhalt der 3 KI-Chatbot-Exchanges (empfohlen: Ummeldung / Stromanbieter kündigen / Haftpflicht — aus ROADMAP.md übernehmen)
- Realistische Zahlen, Zeitschätzungen und Empfehlung in COST-ESTIMATE.md (Struktur ist fix per ROADMAP, Zahlen sind Claude's Call)
- Design-Details für Avatar-Placeholder, Edit-Form-Layout auf Profil-Screen
- Werbebanner-Textinhalt ("Anzeige: Jetzt Strom vergleichen") und genaue Platzierung in Aufgaben
- Empty State Confetti-Animation-Details (Tailwind CSS Animation oder bestehende Konfetti-Library aus Phase 1)
- Anzahl und Layout der Spartipps-Cards auf Profil (sofern benötigt)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/ROADMAP.md` §Phase 4 — vollständige Screen-Liste, Success Criteria (8 Kriterien), Requirements-Mapping (TIME-03, UX-Verfeinerungen), COST-ESTIMATE.md Struktur
- `.planning/REQUIREMENTS.md` — TIME-03 (Push-Benachrichtigungen, als Stretch), UX-Verfeinerungen
- `.planning/PROJECT.md` — Brand System, Navigation Structure, Business Model (Provision, Premium-Logik)

### Existing Code (Phase 1–3)
- `src/store/onboardingStore.ts` — Zustand+persist Pattern; `useOnboardingStore()` für Profil-Daten (moveDate, targetPlz, fromCity)
- `src/store/checklistStore.ts` — Pattern für neuen `chatbotStore`; auch für Empty-State-Trigger (alle Tasks erledigt)
- `src/store/vertraegeStore.ts` — Pattern für `chatbotStore` (persist, localStorage-Key-Konvention)
- `src/app/(main)/layout.tsx` — Main-Layout, Route-Struktur, BottomNav
- `src/app/(main)/aufgaben/page.tsx` — Ziel für Werbebanner-Integration (Checkliste-Ansicht)
- `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` — Export-Button muss zu `/ich/premium` navigieren
- `src/app/globals.css` — Brand-Tokens (@theme), Tailwind v4 Config
- `src/components/ui/` — Card, Badge, Button, Input, Tabs, Collapsible verfügbar

### Phase 3 Context (Patterns & Decisions)
- `.planning/phases/03-vertraege-entdecken/03-CONTEXT.md` — D-03 (Bottom Sheet Multi-Step Pattern), D-04 (vertraegeStore als chatbotStore-Vorlage)
- `.planning/phases/03-vertraege-entdecken/03-05-SUMMARY.md` — letzte Phase-3-Summary

No external specs — requirements fully captured in decisions and ROADMAP.md above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/store/vertraegeStore.ts` — Template für neuen `chatbotStore` (Zustand + persist, gleiche Struktur, localStorage-Key: `wone-chatbot`)
- `src/store/checklistStore.ts` — `completedCount` / `totalCount` für Empty-State-Trigger (alle 32 Tasks erledigt)
- `src/components/ui/card.tsx` — Anbieter-Card-Pattern für Profil-Sektionen, Dokumentenspeicher-Cards, Premium-Lock-Card
- `src/components/ui/badge.tsx` — Premium-Badge für gesperrte Features
- `src/components/ui/button.tsx` — Primary + Ghost Buttons für Paywall-CTAs
- Phase 1 Konfetti-Animation — Celebration Screen hat bereits Konfetti; Pattern übernehmen für Empty State
- Phase 3 `AbschlussSheet` — Bottom Sheet Pattern für Push-Opt-in Sheet in Einstellungen

### Established Patterns
- Zustand + persist: `chatbotStore` folgt exakt demselben Pattern (create → persist → named key)
- `'use client'` + `useRouter`/`usePathname` für interaktive Screens
- Tailwind v4 arbitrary values für pixel-exakte UI
- `h-dvh` für volle Viewport-Höhe
- Route-Gruppen: `(main)/ich/[sub]/page.tsx` — neue Screens folgen diesem Muster
- `router.back()` für Back-Navigation (aus Phase 2 D-08)

### Integration Points
- `src/app/(main)/ich/page.tsx` — aktuell Placeholder → wird Profil/Mein Umzug Screen
- Neue Routen unter `/ich/`: chatbot, dokumente, premium, einstellungen, datenschutz, impressum
- `src/app/(main)/aufgaben/page.tsx` → Werbebanner-Integration in Checkliste-Ansicht
- `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx` → Export-Button: `router.push('/ich/premium')`
- `src/store/` → neues File: `chatbotStore.ts` (Zustand + persist, trackt `chatCount: number`)
- COST-ESTIMATE.md liegt im Projekt-Root (kein Unterverzeichnis)

</code_context>

<specifics>
## Specific Ideas

- Profil-Screen: Avatar-Placeholder (großes Initialen-Kreis, #646efb Hintergrund), "Lea Müller", "Von Hamburg → München · 15. Juni 2026 · 42 qm", Fortschrittsbalken "18 von 32 Aufgaben — 56%"
- KI Chatbot: 3 Exchanges exakt aus ROADMAP — (1) Ummeldung-Dokumente, (2) Stromanbieter kündigen, (3) Haftpflicht Pflicht
- Chatbot-Limit-Banner: "Du hast dein Limit erreicht (3/3). Upgrade auf Premium für unbegrenzte Chats." + "Jetzt upgraden →" Button → /ich/premium
- Dokumentenspeicher: 2 Mock-Docs (Mietvertrag.pdf · 12.03.2026, Übergabeprotokoll.pdf · 01.06.2026) + Inline Premium-Lock-Card als 3. Slot
- Premium Paywall: Vergleichstabelle aus ROADMAP.md exakt übernehmen (Free vs Premium, 8 Features) + Preise €2,99/Monat · €19,99/Jahr
- Paywall CTA: "Jetzt upgraden" (Primary #646efb) + "Kostenlos weitermachen" (Ghost) — in Prototyp: beide schließen/navigieren zurück
- Empty State: Konfetti-Animation + "Geschafft! Willkommen in deinem neuen Zuhause 🏠🎉" + "32 Aufgaben erledigt in 3 Wochen" + "Teile deinen Erfolg" + "Feedback geben"
- Werbebanner auf Aufgaben: "Anzeige: Jetzt Strom vergleichen →" + X-Button (X dismissed nicht, zeigt Toast "Werbung kann nicht ausgeblendet werden. Upgrade auf Premium.")
- COST-ESTIMATE.md: Komponenten (Design/UX, Frontend, Backend, iOS, Android, Content, Infrastruktur) × 3 Szenarien (DIY/No-Code, Freelancer, Agentur) + laufende Kosten + Zeitplan-Schätzungen + Empfehlung

</specifics>

<deferred>
## Deferred Ideas

None — Diskussion blieb vollständig im Phase-4-Scope.

</deferred>

---

*Phase: 04-ich-polish*
*Context gathered: 2026-05-08*
