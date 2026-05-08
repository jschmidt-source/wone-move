# Roadmap: Wone MOVE

## Overview

Four phases build a complete clickable showcase prototype. Each phase adds a working section of the app with realistic mock data and full navigation. The final deliverable includes the prototype and a cost estimation document.

**Prototype goal:** Every screen built, every feature visible, mock data throughout. The team uses this to validate the concept and present to the startup module.

**Navigation structure:** 5-tab bottom nav — Home | Aufgaben | Verträge | Entdecken | Ich

## Phases

- [x] **Phase 1: Shell, Brand & Onboarding** — App scaffolding, design system, splash, 5-step onboarding flow, celebration screen, bottom navigation
- [ ] **Phase 2: Home + Aufgaben (Checkliste & Zeitplan)** — Dashboard, checklist with all categories, timeline toggle, step-by-step guide (Ummeldung), Übergabeprotokoll screen, progress
- [ ] **Phase 3: Verträge + Entdecken** — White-label provider comparison, FAQ/tips/emergency contacts, Kostenrechner, Adressänderungen
- [ ] **Phase 4: Ich + Polish + Kosteneinschätzung** — Profile, KI Chatbot, Dokumentenspeicher, Premium Paywall, empty state, final polish, cost estimate document

## Phase Details

### Phase 1: Shell, Brand & Onboarding
**Goal**: The app opens with the correct brand identity, a user can tap through the complete 5-step onboarding, and land on a celebration screen — then see the full bottom navigation with placeholder tabs
**Mode**: mvp
**Depends on**: Nothing
**Requirements**: ONB-01, ONB-02, ONB-03, ONB-04, UX-01, UX-03, UX-04
**Screens**:
  - Splash screen (Logo auf #646efb Hintergrund, Ladeanimation)
  - Welcome screen:
    - Headline: "Dein erster Auszug. Wir begleiten dich."
    - Subline: "Dein persönlicher Umzugsplan in 2 Minuten."
    - CTA: "Jetzt starten" (Primary Button #646efb)
  - Onboarding Schritt 1 — Umzugsdatum:
    - Schritt-Indikator (1/5)
    - Date Picker Mock
    - Weiter-Button
  - Onboarding Schritt 2 — Wohin?:
    - PLZ neue Wohnung (Input)
    - Von welcher Stadt? (Input)
  - Onboarding Schritt 3 — Umzugsorganisation:
    - Kachel-Auswahl: Ich alleine / Mit Freunden / Umzugsfirma / Gemischt
  - Onboarding Schritt 4 — Priorität:
    - Kachel-Auswahl: 💰 Günstig / ⚡ Schnell / 😌 Stressfrei / 🌱 Nachhaltig
  - Onboarding Schritt 5 — Hast du bereits?:
    - Toggle-Liste: Neue Wohnung ✓ / Transport ✓ / Strom+Internet ✓ / Ummeldung vorbereitet ✓
    - Hinweis: "Keine Sorge — du kannst alles jederzeit ändern"
  - Celebration Screen:
    - Animation (Konfetti oder ähnliches)
    - "Dein Umzugsplan ist fertig! 🎉"
    - Kurze Zusammenfassung: "Umzugsdatum: 15. Juni · Von: Hamburg · 23 Aufgaben warten auf dich"
    - CTA: "Los geht's →"
  - Bottom Navigation (5 Tabs, alle sichtbar, Home aktiv, andere als Placeholder):
    - 🏠 Home | ✅ Aufgaben | 📋 Verträge | 💡 Entdecken | 👤 Ich
**Success Criteria**:
  1. App öffnet auf 375px mit korrekten Farben (#646efb, #1c2642, #f6f7f7, Plus Jakarta Sans)
  2. Nutzer tippt durch alle 5 Onboarding-Schritte und landet auf dem Celebration-Screen
  3. Celebration-Screen zeigt Zusammenfassung der Eingaben
  4. Bottom Navigation ist sichtbar und korrekt aufgebaut
  5. Tapping auf jeden Nav-Tab navigiert ohne Fehler (Placeholder-Screens in Phase 1 OK)
**UI hint**: yes
**Plans**: 4 plans
Plans:
- [x] 01-PLAN-1.md — Project scaffold: Next.js 15, shadcn init, brand tokens, Zustand store, OnboardingData types
- [x] 01-PLAN-2.md — Splash screen (auto-redirect 1500ms) + Welcome screen (headline, CTA)
- [x] 01-PLAN-3.md — Onboarding steps 1–5 dynamic route with store integration
- [x] 01-PLAN-4.md — Celebration screen (confetti + summary) + Bottom Navigation + placeholder tabs

### Phase 2: Home + Aufgaben (Checkliste & Zeitplan)
**Goal**: The two most important tabs are fully built — Dashboard with progress and quick actions, Aufgaben with checklist view and timeline toggle, a complete Ummeldung guide, and the Übergabeprotokoll screen
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: CHK-01, CHK-02, CHK-03, CHK-04, CHK-05, GUIDE-01, GUIDE-02, GUIDE-03, GUIDE-04, GUIDE-05, PROG-01, PROG-02, TIME-01, TIME-02
**Screens**:
  - Home / Dashboard:
    - Persönliche Begrüßung: "Hey Lea 👋 Noch 23 Tage bis zu deinem Umzug"
    - Gesamt-Fortschrittsbalken (#646efb, Prozentangabe)
    - "Nächste Aufgabe"-Card: Aufgabentitel + Zeitschätzung + "Jetzt erledigen →"
    - "Wusstest du schon?"-Card (horizontal scrollbar, 3 Mock-Tips)
    - Quick-Actions: Verträge abschließen / Zeitplan / Kostenrechner
    - Upcoming Deadlines Strip (2–3 Mock-Items mit Datum)
  - Kostenrechner screen:
    - Slider: Entfernung (10–500 km)
    - Toggle: Helfer vorhanden? (Ja / Nein / Umzugsfirma)
    - Input: Wohnungsgröße (qm)
    - Ergebnis-Card: Geschätzte Kosten aufgeteilt (Kartons €X / Transporter €X / Sonstiges €X / Gesamt €X–€X)
  - Aufgaben — Checkliste-Ansicht:
    - Toggle oben: [Checkliste] / Zeitplan
    - Must-Do Sektion gepinnt (roter Badge, 3–5 Items):
      - Ummeldung (~15 Min) ⬜
      - Stromanbieter wählen (~20 Min) ⬜
      - Haftpflichtversicherung abschließen (~10 Min) ⬜
    - 5 Kategorien (kollabierbar):
      - Organisatorisches (8 Items mit Zeitschätzungen)
      - Verträge (6 Items — bei Klick: direkt zu Verträge-Tab)
      - Versicherungen (5 Items)
      - Einrichtung (7 Items — inkl. Übergabeprotokoll)
      - Finanzen (6 Items)
    - Item-Design: Checkbox + Titel + "~X Min"-Badge + Kategorie-Farbpunkt
    - Check-Animation (Mini-Celebration bei Abhaken)
    - "Eigenen Punkt hinzufügen"-Button (Floating oder am Ende)
  - Aufgaben — Zeitplan-Ansicht (Toggle):
    - Gleiche Items, in 5 Zeitbuckets sortiert:
      - "4+ Wochen vorher" (Strom, Internet, Möbel bestellen...)
      - "2–4 Wochen vorher" (Ummeldung vorbereiten, Versicherungen...)
      - "1 Woche vorher" (Nachsendeauftrag, Reinigung, Kartons packen...)
      - "Am Umzugstag" (Übergabeprotokoll, Schlüssel, Strom ablesen...)
      - "Danach erledigen" (Ummeldung Bürgeramt, Rundfunkbeitrag, Bank...)
    - Farbcodierung: grün = erledigt, orange = diese Woche, rot = überfällig
  - Aufgabe-Detail / Anleitung — Ummeldung (vollständig):
    - Header: "Ummeldung beim Bürgeramt" + Tag: Organisatorisches + "~15 Min" + "Mittel"
    - Dokumente-Box: Ausweis, Wohnungsgeberbestätigung (Mieterbescheinigung), ggf. Reisepass
    - Schritt 1: "Termin beim Bürgeramt buchen" (online oder vor Ort)
    - Schritt 2: "Wohnungsgeberbestätigung vom Vermieter holen"
    - Schritt 3: "Zum Termin erscheinen" (was mitbringen)
    - Schritt 4: "Ummeldung bestätigen lassen — du bekommst eine Meldebestätigung"
    - Wichtiger Hinweis: "Frist: 14 Tage nach Einzug!"
    - City-Link: "Zum Bürgeramt München →" (Mock-Link, hervorgehoben)
    - CTAs: "Als erledigt markieren ✓" / "← Zurück"
  - Übergabeprotokoll screen:
    - Intro: "Dokumentiere den Zustand deiner neuen Wohnung beim Einzug"
    - Zimmer-Tabs: Wohnzimmer / Küche / Bad / Schlafzimmer / Flur
    - Pro Zimmer: Zustandsfelder (Wände, Boden, Fenster, Türen, Beleuchtung)
    - Zustand-Toggle: ✓ Gut / ⚠ Mangel (mit Freitext-Option bei Mangel)
    - Foto-Slots (Mock: "Foto hinzufügen +" Platzhalter)
    - Unterschriften-Bereich: Mieter + Vermieter (Mock)
    - "Protokoll exportieren" → Premium-Badge
  - Anleitungen-Browser screen (aus Entdecken erreichbar, hier auch verlinkt):
    - Karten-Grid nach Kategorie
    - Jede Karte: Titel + Zeitschätzung + Schwierigkeit + Kategorie-Farbpunkt
    - Tapping → öffnet Anleitung-Detail (min. 6 Mock-Anleitungen als Preview, Ummeldung vollständig)
**Success Criteria**:
  1. Dashboard zeigt Begrüßung, Fortschrittsbalken, Nächste Aufgabe, Wusstest du schon? Card
  2. Checkliste zeigt Must-Do gepinnt + alle 5 Kategorien mit mind. 4 Items je Kategorie
  3. Jedes Item hat Zeitschätzung ("~X Min") sichtbar
  4. Toggle Checkliste ↔ Zeitplan funktioniert, alle 5 Zeitbuckets sichtbar
  5. Klick auf Aufgaben-Item öffnet Ummeldung-Anleitung vollständig
  6. Übergabeprotokoll zeigt Zimmer-Tabs + Zustands-Toggles + Foto-Slots
  7. Fortschrittsbalken und Kategorie-Counts aktualisieren sich visuell beim Abhaken
**UI hint**: yes

### Phase 3: Verträge + Entdecken
**Goal**: The monetization tab (Verträge) and the knowledge tab (Entdecken) are fully built — users can go through the full provider comparison and in-app "sign-up" flow, and access all guides, FAQ, tips, and emergency contacts
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: GTK-01, GTK-02, GTK-03, GTK-04, GTK-05, UX-02
**Screens**:
  - Verträge Hub screen:
    - Intro: "Schließ deine Verträge direkt hier ab. Wir erhalten eine kleine Provision — für dich entstehen keine Mehrkosten. ✓"
    - Fortschritt: "2 von 4 Verträgen abgeschlossen"
    - 4 Produkt-Kacheln: ⚡ Strom / 🌐 Internet / 📱 Telefon / 🛡️ Versicherungen
    - Bereits abgeschlossene Kacheln: grün markiert
  - Anbieter-Vergleich — Strom (White-Label-Style):
    - Header: "Stromanbieter vergleichen · PLZ 80331 · ~40 Anbieter"
    - Filter/Sort: Empfohlen / Günstigste / Beliebteste
    - 4–5 Anbieter-Karten:
      - Logo + Name + ⭐⭐⭐⭐☆ Rating
      - "X,XX €/Monat" groß + "12 Monate Laufzeit" klein
      - Highlights-Tags: z.B. "100% Ökostrom ♻" / "Keine Mindestlaufzeit" / "Bonus: €50 Gutschein"
      - "Empfohlen" Badge (#646efb) auf Top-Angebot
      - "Partnerangebot" Badge (#d2d5fc) auf gesponsorten Karten
      - CTA: "Jetzt abschließen →"
    - Abschluss-Modal (Bottom Sheet):
      - Tarif-Zusammenfassung
      - Mock Eingabefelder (Name, IBAN, E-Mail — nicht ausfüllbar im Prototyp)
      - "Weiter →" CTA
    - Erfolgs-Screen:
      - ✓ Animation
      - "Antrag eingegangen! E.ON bestätigt deinen Vertrag innerhalb von 2 Werktagen per E-Mail."
      - "Zurück zur Übersicht"
  - Anbieter-Vergleich — Internet, Telefon, Versicherungen:
    - Gleiche Struktur wie Strom, andere Mock-Anbieter und Highlights
    - Versicherungen: Haftpflicht + Hausrat als separate Unterkategorien
  - Entdecken Hub screen:
    - Suchleiste oben (Mock Autocomplete: "Umm..." → "Ummeldung", "Ummeldungsfrist")
    - Sektionen mit Vorschau-Cards: Anleitungen / FAQ / Spartipps / Notfallkontakte / Adressänderungen
  - Anleitungen-Browser (aus Entdecken):
    - 6+ Guide-Cards sortiert nach Kategorie
    - Vollständig: Ummeldung (aus Phase 2 verlinkt)
    - Preview-Cards: Rundfunkbeitrag, Hausrat-Versicherung, Nachsendeauftrag, Übergabeprotokoll, Strom ummelden, Konto eröffnen
  - FAQ screen:
    - Accordion, ~10 echte Fragen:
      - "Was ist eine Wohnungsgeberbestätigung?"
      - "Wie lange habe ich für die Ummeldung Zeit?" → Antwort: 14 Tage
      - "Was passiert wenn ich die Ummeldung vergesse?" → Bußgeld bis €1.000
      - "Wie hoch ist die Kaution normalerweise?" → max. 3 Kaltmieten
      - "Brauche ich eine Haftpflichtversicherung?" → Ja, dringend empfohlen
      - "Was ist der Rundfunkbeitrag?"
      - "Wie kündige ich meinen alten Strom-/Internetvertrag?"
      - "Kann ich meine GEZ von der alten Wohnung übernehmen?"
      - "Wann sollte ich Möbel bestellen?"
      - "Wie erkenne ich versteckte Schäden bei der Wohnungsübergabe?"
  - Notfallkontakte screen:
    - Notruf Polizei: 110 (Tap-to-call Mock)
    - Notruf Feuerwehr / Rettung: 112
    - Giftnotruf: 030 19240
    - Energieversorger Notfall: 0800 XXX (PLZ-Mock)
    - Wasserrohrbruch / Hausnotruf: Platzhalter
    - Tiernotruf: Platzhalter
  - Spartipps screen:
    - Kategorien: 🛋️ Einrichtung günstig / ⚡ Strom sparen / 🛒 Lebensmittel / 🚛 Umzug günstig
    - Je 3–4 konkrete Tipps als Cards
  - Adressänderungen-Checkliste screen:
    - Headline: "Vergiss niemanden — hier sind alle"
    - 15 Parteien mit Checkboxen:
      - Arbeitgeber, Finanzamt, Krankenkasse, Bank, Uni/BAföG-Amt
      - Amazon, PayPal, Netflix, Spotify, App Stores
      - Kfz-Versicherung, Krankenversicherung, sonstige Versicherungen
      - Freunde + Familie, Abonnements (Zeitungen, Magazine)
    - Abhakbar (Mock-State)
  - Suche-Ergebnis screen:
    - Input mit Cursor, Mock-Query "Ummeldung"
    - Ergebnisse unterteilt: Aufgaben (2) / Anleitungen (1) / FAQ (2)
**Success Criteria**:
  1. Verträge-Hub zeigt 4 Produkt-Kacheln mit Fortschrittsanzeige
  2. Strom-Vergleich zeigt min. 4 Anbieter-Karten mit korrekten Badges
  3. Abschluss-Modal öffnet sich und Erfolgs-Screen ist erreichbar
  4. Alle 4 Produkt-Kategorien (Strom, Internet, Telefon, Versicherungen) haben einen Vergleichs-Screen
  5. FAQ zeigt min. 8 echte Fragen mit vollständigen Antworten
  6. Notfallkontakte, Spartipps und Adressänderungen sind vollständig aufgebaut
  7. Suche zeigt kategorisierte Mock-Ergebnisse
**UI hint**: yes

### Phase 4: Ich + Polish + Kosteneinschätzung
**Goal**: The personal tab is complete with profile, chatbot, document storage, and the premium paywall — plus full-app polish (empty state, animations, Free-tier ad banner) and the cost estimation document
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: TIME-03, alle UX-Verfeinerungen
**Screens**:
  - Profil / Mein Umzug screen:
    - Avatar Platzhalter + "Lea Müller"
    - Umzugs-Info: Von Hamburg → München · 15. Juni 2026 · 42 qm
    - Fortschritt: "18 von 32 Aufgaben erledigt — 56%"
    - "Bearbeiten" Button → öffnet Edit-Form (Mock)
    - "Teile deinen Fortschritt" Button → Share-Sheet Mock
  - KI Chatbot screen:
    - Chat-Interface (Blasen-Design)
    - 3 hardcoded Exchanges:
      - "Was brauche ich für die Ummeldung?" → vollständige Antwort
      - "Wie kündige ich meinen alten Stromanbieter?" → vollständige Antwort
      - "Ist eine Haftpflichtversicherung Pflicht?" → vollständige Antwort
    - 4. Eingabe → "Du hast dein Limit erreicht (3/3). Upgrade auf Premium für unbegrenzte Chats."
    - Upgrade-Button → öffnet Paywall
  - Dokumentenspeicher screen:
    - Upload-Bereich (Drag & Drop Optik)
    - 2 Mock-Dokumente (Mietvertrag.pdf · 12.03.2026 · 📄, Übergabeprotokoll.pdf · 01.06.2026 · 📄)
    - "+ Dokument hinzufügen" (3. Dokument → Premium-Lock-Modal)
    - Premium-Lock-Modal: "Mit Premium unlimitiert Dokumente speichern"
  - Premium Paywall screen:
    - Headline: "Alles drin. Kein Stress."
    - Free vs. Premium Tabelle:
      | Feature | Free | Premium |
      |---------|------|---------|
      | Checkliste & Zeitplan | ✓ | ✓ |
      | Anleitungen & FAQ | ✓ | ✓ |
      | Verträge abschließen | ✓ | ✓ |
      | Werbung | ✓ Ja | ✗ Nein |
      | KI Chatbot | 3 Fragen | Unbegrenzt |
      | Dokumentenspeicher | 2 Docs | Unbegrenzt |
      | Protokoll-Export | ✗ | ✓ |
      | Listen teilen | ✗ | ✓ |
    - Preise: €2,99/Monat · €19,99/Jahr ("Spare 44%")
    - CTA: "Jetzt upgraden" (Primary) + "Kostenlos weitermachen" (Ghost)
  - Einstellungen screen:
    - Benachrichtigungen Toggle → öffnet Push-Opt-in
    - Sprache: Deutsch (Mock)
    - Datenschutz & Impressum Links
    - "Account löschen" (rot, destructive)
    - Logout
  - Push Benachrichtigungen opt-in:
    - iOS-Style System-Dialog Mock: "Wone MOVE möchte dir Mitteilungen senden"
    - Reminder-Vorschau: "In 3 Tagen: Ummeldung nicht vergessen! ⏰"
    - Toggle-Liste: welche Reminder aktiv
  - Werbebanner (Free Version):
    - Dezenter Banner unten auf der Checkliste: "Anzeige: Jetzt Strom vergleichen" + X-Button (bleibt, da Free)
  - Empty State / Completion screen:
    - Große Konfetti-Animation
    - "Geschafft! Willkommen in deinem neuen Zuhause 🏠🎉"
    - Kurze Stats: "32 Aufgaben erledigt in 3 Wochen"
    - CTA: "Teile deinen Erfolg" + "Feedback geben"
  - Profil-Tab korrekt in Bottom Nav verankert

  **Kosteneinschätzung** (Datei: `COST-ESTIMATE.md`):
    - Komponenten: Design/UX, Frontend, Backend, iOS App, Android App, Content, Infrastruktur
    - 3 Szenarien: DIY/No-Code, Freelancer, Agentur
    - Laufende Kosten: Hosting, Wartung, Support, API-Kosten
    - Zeitplan-Schätzungen pro Szenario
    - Empfehlung für Startup-Phase
**Success Criteria**:
  1. Profil-Screen zeigt Mock-User-Daten + Share-Button
  2. KI Chatbot zeigt 3 vollständige Exchanges + Paywall beim 4. Versuch
  3. Dokumentenspeicher zeigt Upload-UI + 2 Mock-Docs + Premium-Gate beim 3.
  4. Premium Paywall zeigt vollständige Vergleichstabelle mit Preisen
  5. Werbebanner sichtbar auf Checkliste (Free-Version UI)
  6. Empty State / Completion screen ist erreichbar und vollständig animiert
  7. Gesamte App-Navigation hat keine Dead Ends — jeder Screen hat einen Weg zurück
  8. COST-ESTIMATE.md ist vollständig mit allen 3 Szenarien
**UI hint**: yes

## Progress

| Phase | Status | Completed |
|-------|--------|-----------|
| 1. Shell, Brand & Onboarding | Complete (4/4 plans) | 2026-05-08 |
| 2. Home + Aufgaben | Not started | - |
| 3. Verträge + Entdecken | Not started | - |
| 4. Ich + Polish + Kosteneinschätzung | Not started | - |
