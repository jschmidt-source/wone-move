# Requirements — Wone MOVE

## v1 Requirements

### Onboarding

- [ ] **ONB-01**: User can complete a personalized onboarding questionnaire (6–8 questions covering: Umzugsdatum, PLZ der neuen Wohnung, Haushaltsgröße, Budget, Wohnungsgröße, Transportart, Priorität)
- [x] **ONB-02**: User sees a personalized checklist immediately after completing the questionnaire
- [x] **ONB-03**: Questionnaire answers are persisted locally so the user doesn't lose progress on reload
- [ ] **ONB-04**: User can skip already-completed items during onboarding ("Hast du bereits?") and they appear pre-checked

### Checkliste

- [x] **CHK-01**: Checklist is organized into categories: Organisatorisches, Verträge, Versicherungen, Einrichtung, Finanzen
- [x] **CHK-02**: Each checklist item can be checked off and state persists in localStorage
- [x] **CHK-03**: A "Must-Do" section is pinned at the top of the checklist (highest-priority items)
- [x] **CHK-04**: User can add custom checklist items
- [x] **CHK-05**: Checklist is filtered/tailored based on onboarding answers (e.g., no car → no KFZ-Ummeldung)

### Schritt-für-Schritt Anleitungen

- [x] **GUIDE-01**: Each checklist item links to a step-by-step guide (accessible via click)
- [x] **GUIDE-02**: Each guide explains the task, required documents, and approximate time needed
- [x] **GUIDE-03**: Guides for authority-related tasks (Ummeldung, Rundfunkbeitrag) include city-specific links based on user's PLZ
- [ ] **GUIDE-04**: Guides are also accessible as a standalone section (sorted by category), independent of the checklist
- [x] **GUIDE-05**: Guide for apartment handover (Übergabeprotokoll) with photo checklist is included

### Timeline

- [x] **TIME-01**: App generates a timeline showing when each task should ideally be done (relative to move date)
- [x] **TIME-02**: Timeline groups tasks by: 4+ Wochen vorher, 2–4 Wochen vorher, 1 Woche vorher, Am Umzugstag, Danach
- [ ] **TIME-03**: Browser push notification can be enabled for upcoming deadlines (opt-in)

### Fortschritt

- [ ] **PROG-01**: A progress bar shows overall completion percentage
- [x] **PROG-02**: Each category shows its own completion count (e.g., "Verträge: 2/5")

### Good to Know

- [ ] **GTK-01**: A "Good to Know" section exists with useful tips, FAQ, and Wusstest-du-schon? cards
- [ ] **GTK-02**: FAQ covers common first-mover questions (Rundfunkbeitrag, Ummeldungsfrist, Kaution, etc.)
- [ ] **GTK-03**: Emergency contacts section with standard numbers (Notruf, Giftnotruf, Energieversorger Notfall)
- [ ] **GTK-04**: Savings tips (Spartipps) for budget-conscious users are included
- [ ] **GTK-05**: Address-change reminder list — all parties to notify (employer, bank, Krankenkasse, subscriptions)

### Navigation & UX

- [x] **UX-01**: App has a bottom navigation bar with: Checkliste, Zeitplan, Anleitungen, Good to Know
- [ ] **UX-02**: Search bar allows searching across checklists and guides
- [x] **UX-03**: App is fully mobile-responsive (320px–768px primary target)
- [x] **UX-04**: Color palette matches brand: primary #646efb, dark #1c2242, background #f6f7f7

---

## v2 Requirements (deferred)

- KI-Chatbot (AI assistant for questions)
- Dokumentenspeicher (upload and store documents)
- Listen sharen / Haushalt teilen (multi-user, requires auth)
- WG-Modus (shared apartment flow)
- Rabattlinks und Premium-Platzierungen
- Dienstleistungsvermittlung (service provider marketplace)
- PDF-Export von Checklisten
- Provider comparison (Strom, Internet, Versicherungen embedded)
- Push notifications with scheduling engine

---

## Out of Scope

- Moodboard — Pinterest does this better; not core
- Einweihungsparty checklist — trivial, not v1
- International / multi-language — Germany-only for now
- User accounts / cloud sync — no backend for prototype
- In-app notification banner — push only to keep UI clean
- Family / Paar mode — starts as Einzelhaushalt

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ONB-01 | Phase 1 | Pending |
| ONB-02 | Phase 1 | Complete |
| ONB-03 | Phase 1 | Complete (Plan 1) |
| ONB-04 | Phase 1 | Pending |
| UX-01 | Phase 1 | Complete |
| UX-03 | Phase 1 | Complete |
| UX-04 | Phase 1 | Complete (Plan 1) |
| CHK-01 | Phase 2 | Pending |
| CHK-02 | Phase 2 | Pending |
| CHK-03 | Phase 2 | Complete (Plan 3) |
| CHK-04 | Phase 2 | Complete (Plan 3) |
| CHK-05 | Phase 2 | Complete (Plan 1) |
| GUIDE-01 | Phase 2 | Complete (Plan 3) |
| GUIDE-02 | Phase 2 | Complete (Plan 1) |
| GUIDE-03 | Phase 2 | Complete (Plan 1) |
| GUIDE-04 | Phase 2 | Pending |
| GUIDE-05 | Phase 2 | Complete (Plan 5) |
| PROG-01 | Phase 2 | Complete (Plan 2) |
| PROG-02 | Phase 2 | Complete (Plan 3) |
| TIME-01 | Phase 3 | Pending |
| TIME-02 | Phase 3 | Pending |
| GTK-01 | Phase 3 | Pending |
| GTK-02 | Phase 3 | Pending |
| GTK-03 | Phase 3 | Pending |
| GTK-04 | Phase 3 | Pending |
| GTK-05 | Phase 3 | Pending |
| UX-02 | Phase 3 | Pending |
| TIME-03 | Phase 4 | Pending |
