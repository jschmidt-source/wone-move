# Roadmap: Wone MOVE

## Overview

Four phases build a complete clickable showcase prototype. Each phase adds a working section of the app with realistic mock data and full navigation. The final deliverable is a cost estimation document for real development.

**Prototype goal:** Every screen built, every feature visible, mock data throughout. Not functional — visual. The team uses this to validate the concept before committing to real development.

## Phases

- [ ] **Phase 1: Shell, Brand & Onboarding** — App scaffolding, design system, splash, and the full onboarding questionnaire flow
- [ ] **Phase 2: Core App — Checkliste & Anleitungen** — Dashboard, personalized checklist, step-by-step guide screens, progress
- [ ] **Phase 3: Zeitplan, Good to Know & Feature Screens** — Timeline, FAQ/tips, KI Chatbot, Dokumentenspeicher, Moodboard
- [ ] **Phase 4: Account, Premium & Kosteneinschätzung** — Profile, settings, premium paywall UI, and the final cost estimation document

## Phase Details

### Phase 1: Shell, Brand & Onboarding
**Goal**: The app opens with the correct brand identity and a user can navigate through the complete onboarding questionnaire — all screens, all questions, mock "completion" that lands on the dashboard
**Mode**: mvp
**Depends on**: Nothing
**Requirements**: ONB-01, ONB-02, ONB-03, ONB-04, UX-01, UX-03, UX-04
**Screens**:
  - Splash / Loading screen (logo, brand colors, animation)
  - Welcome screen (headline, subline, CTA "Jetzt starten")
  - Onboarding questionnaire — 6–8 step flow with progress indicator:
    - Schritt 1: Umzugsdatum
    - Schritt 2: PLZ neue Wohnung + Von wo? (Stadt)
    - Schritt 3: Wohnungsgröße (Quadratmeter + Zimmer)
    - Schritt 4: Budget (günstig / mittel / flexibel)
    - Schritt 5: Wie umziehen? (selbst / Freunde / Umzugsunternehmen)
    - Schritt 6: Hast du ein Auto?
    - Schritt 7: Was ist dir am wichtigsten? (günstig / schnell / stressfrei / nachhaltig)
    - Schritt 8: "Hast du bereits?" pre-check (Wohnung, Transport, Strom/Internet, Ummeldung)
  - Completion / Übergang screen ("Dein Plan ist fertig!")
  - Bottom navigation bar (Checkliste, Zeitplan, Anleitungen, Good to Know)
**Success Criteria**:
  1. App opens at 375px width with correct colors (#646efb, #1c2642, #f6f7f7) — no layout issues
  2. User can tap through all 8 onboarding steps and reach the dashboard
  3. Bottom nav bar is visible and tapping each item navigates to the correct section (placeholder screens OK in Phase 1)
  4. "Hast du bereits?" screen shows pre-check options that carry through to checklist
**UI hint**: yes

### Phase 2: Core App — Checkliste & Anleitungen
**Goal**: The main app experience — dashboard with progress overview, full categorized checklist with mock data, and at least one fully detailed step-by-step guide (Ummeldung) with all other guides as realistic previews
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: CHK-01, CHK-02, CHK-03, CHK-04, CHK-05, GUIDE-01, GUIDE-02, GUIDE-03, GUIDE-04, GUIDE-05, PROG-01, PROG-02
**Screens**:
  - Home / Dashboard:
    - Greeting + overall progress bar
    - "Wusstest du schon?" card (rotating tips)
    - Quick-action cards (Nächste Aufgabe, Zeitplan, Good to Know)
    - Upcoming deadlines strip
  - Checkliste screen:
    - "Must-Do" section pinned at top (3–5 items)
    - Categories: Organisatorisches, Verträge, Versicherungen, Einrichtung, Finanzen
    - Each category collapsible, shows completion count
    - Items checkable (mock state)
    - "Eigenen Punkt hinzufügen" button
  - Schritt-für-Schritt Anleitung detail (Ummeldung — fully written out):
    - Task title + time estimate + required documents
    - Numbered steps with explanations
    - City-specific link (hardcoded for mock city)
    - "Erledigt" / "Zurück" actions
  - Anleitungen browser screen (standalone guide library):
    - Sorted by category (Organisatorisches, Verträge, etc.)
    - Each guide shown as card with title, time estimate, category tag
    - Tapping opens the guide detail
  - Übergabeprotokoll guide (photo checklist format)
**Success Criteria**:
  1. Dashboard shows progress bar + "Wusstest du schon?" card
  2. Checklist shows all 5 categories with at least 4 mock items each — Must-Do pinned at top
  3. Tapping a checklist item opens a guide detail screen
  4. Ummeldung guide is fully written with all steps, required documents, and a mock link
  5. Standalone Anleitungen browser shows guides sorted by category
  6. Progress counts update visually when items are checked (mock state OK)
**UI hint**: yes

### Phase 3: Zeitplan, Good to Know & Feature Screens
**Goal**: Complete the core navigation with timeline and FAQ screens, then build all the "extended feature" screens so the team can evaluate every feature in context
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: TIME-01, TIME-02, GTK-01, GTK-02, GTK-03, GTK-04, GTK-05, UX-02
**Screens**:
  - Zeitplan / Timeline:
    - 5 time buckets: "4+ Wochen vorher", "2–4 Wochen", "1 Woche", "Am Umzugstag", "Danach"
    - Mock tasks distributed across buckets based on move date
    - Color-coded by urgency
  - Good to Know hub:
    - FAQ section (accordion, ~10 mock questions with answers)
    - Notfallkontakte (Notruf 110/112, Giftnotruf, Energieversorger)
    - Spartipps cards
    - Adressänderungen checklist (employer, bank, Krankenkasse, subscriptions)
  - Anbieter-Vergleich screen (White-Label-Style — Nutzer verlässt die App nie):
    - Tabs: Strom, Internet, Telefon, Versicherungen
    - Anbieter-Karten: Logo, Anbieter-Name, Preis/Monat, Sterne-Rating, Laufzeit, Highlights (z.B. "Ökostrom", "Keine Mindestlaufzeit")
    - "Jetzt abschließen" Button → öffnet Bestätigungs-Modal direkt in der App (simuliert den White-Label-Flow)
    - Bestätigungs-Modal: Zusammenfassung, "Weiter zum Abschluss" → Erfolgsmeldung "Vertrag beantragt!"
    - "Empfohlen" / "Partnerangebot" Badges auf ausgewählten Karten
    - Hinweis: "Wir erhalten eine Provision — für dich entstehen keine Mehrkosten"
  - KI Chatbot screen:
    - Chat UI (bubbles, input field)
    - 3 hardcoded example Q&A exchanges
    - "Limit erreicht — Upgrade auf Premium" prompt for 4th question (Free tier)
  - Dokumentenspeicher screen:
    - Upload area + mock uploaded documents (Mietvertrag, Übergabeprotokoll)
    - File list with name, date, type
    - "Premium feature" lock indicator
  - Moodboard screen:
    - Pinterest-style grid with mock interior images
    - "Bild hinzufügen" button
    - "Mit Pinterest verknüpfen" option
  - Einweihungsparty screen:
    - Fun checklist (Einladungen, Getränke, Musik, etc.)
    - Categorized under Good to Know
  - Search results screen (UX-02):
    - Search bar with mock autocomplete
    - Results showing checklist items + guides
**Success Criteria**:
  1. Timeline screen shows all 5 time buckets with mock tasks in each
  2. Good to Know shows FAQ accordion + emergency contacts + Spartipps — all tappable
  3. KI Chatbot shows a functional-looking chat UI with 3 mock exchanges and a paywall prompt
  4. Anbieter-Vergleich shows provider cards for Strom and Internet
  5. Dokumentenspeicher shows upload UI and mock documents
  6. Moodboard shows image grid
  7. Search bar returns mock results
**UI hint**: yes

### Phase 4: Account, Premium & Kosteneinschätzung
**Goal**: Complete the app with profile/settings screens and the premium paywall UI — then produce the cost estimation document for real development
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: TIME-03 (push opt-in UI), all UX polish
**Screens**:
  - Profil / Mein Umzug screen:
    - User name (mock: "Lea")
    - Move date, from/to cities, apartment size
    - Edit button (opens mock edit form)
    - Umzugsfortschritt summary
  - Einstellungen screen:
    - Benachrichtigungen (toggle, leads to Push opt-in UI)
    - Sprache (DE mock)
    - Datenschutz / Impressum links
    - Account löschen (destructive action)
  - Push Benachrichtigungen opt-in:
    - Permission prompt mock-up
    - Upcoming reminders list
  - Premium Upgrade / Paywall screen:
    - Free vs. Premium comparison table
    - Features locked: KI Chatbot unlimited, Dokumentenspeicher, Listen sharen, kein Werbung
    - Pricing mock (€2.99/month, €19.99/year)
    - CTA "Jetzt upgraden"
  - "Werbung" UI (Free version):
    - Banner ad placeholder at bottom of checklist screen
  - Profil-Tab added to bottom nav (5th icon)

**Kosteneinschätzung document** (`COST-ESTIMATE.md`):
  - Breakdown by component: Design, Frontend, Backend, iOS App, Android App, Content, Infrastructure
  - Three scenarios: DIY/No-Code, Freelancer, Agency
  - Ongoing costs (hosting, maintenance, customer support)
  - Timeline estimates per scenario
  - Recommendations for startup stage

**Success Criteria**:
  1. Profile screen shows mock user data with edit option
  2. Settings screen has toggles for notifications + premium
  3. Premium paywall shows clear Free/Premium feature comparison with pricing
  4. Free-tier "Werbung" banner is visible on the checklist screen
  5. COST-ESTIMATE.md is complete with all three scenarios
  6. Full app navigation works end-to-end without dead ends
**UI hint**: yes

## Progress

| Phase | Status | Completed |
|-------|--------|-----------|
| 1. Shell, Brand & Onboarding | Not started | - |
| 2. Core App — Checkliste & Anleitungen | Not started | - |
| 3. Zeitplan, Good to Know & Feature Screens | Not started | - |
| 4. Account, Premium & Kosteneinschätzung | Not started | - |
