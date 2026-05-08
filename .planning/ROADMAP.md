# Roadmap: Wone MOVE

## Overview

Three phases turn an empty Next.js repo into a demo-ready prototype. Phase 1 scaffolds the app and delivers onboarding so there is something to show on day one. Phase 2 adds the personalized checklist, step-by-step guides, and progress tracking — the core value of the product. Phase 3 completes the experience with the timeline view, "Good to Know" content, and polished UX. Phase 4 is optional stretch work if time permits.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Onboarding** - Project scaffold, brand shell, and the onboarding questionnaire
- [ ] **Phase 2: Checkliste & Anleitungen** - Personalized checklist, step-by-step guides, and progress tracking
- [ ] **Phase 3: Zeitplan, Good to Know & UX-Feinschliff** - Timeline view, tips/FAQ section, and polished mobile UX
- [ ] **Phase 4: Suche & Push-Benachrichtigungen (optional)** - Search across content and opt-in browser push notifications

## Phase Details

### Phase 1: Foundation & Onboarding
**Goal**: A user can open the app, see the branded shell with navigation, complete the onboarding questionnaire, and have their answers saved — ready to generate a personalized checklist
**Mode**: mvp
**Depends on**: Nothing (first phase)
**Requirements**: ONB-01, ONB-02, ONB-03, ONB-04, UX-01, UX-03, UX-04
**Success Criteria** (what must be TRUE):
  1. User opens the app on a mobile screen and sees the Wone MOVE brand (correct colors, bottom nav bar) without layout breakage
  2. User completes all 6–8 onboarding questions (including Umzugsdatum, PLZ, Haushaltsgröße) and reaches the checklist screen
  3. After refreshing the browser, the questionnaire answers are still present — nothing is lost
  4. User can mark items as already done during onboarding ("Hast du bereits?") and those items appear pre-checked on the checklist
  5. Navigating via the bottom nav bar between sections works without full page reload
**Plans**: TBD
**UI hint**: yes

### Phase 2: Checkliste & Anleitungen
**Goal**: Users see a personalized, categorized checklist filtered by their onboarding answers, can check off items with persistence, and can open a step-by-step guide for any item — with progress reflected across the app
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: CHK-01, CHK-02, CHK-03, CHK-04, CHK-05, GUIDE-01, GUIDE-02, GUIDE-03, GUIDE-04, GUIDE-05, PROG-01, PROG-02
**Success Criteria** (what must be TRUE):
  1. Checklist is organized into Organisatorisches, Verträge, Versicherungen, Einrichtung, Finanzen categories — and "Must-Do" items are pinned at the top
  2. Items irrelevant to the user's situation are absent (e.g., no KFZ-Ummeldung if no car was indicated)
  3. User checks off an item, reloads the page, and the item is still checked
  4. User can add a custom checklist item that persists after reload
  5. Clicking a checklist item opens a guide explaining the task, required documents, time needed, and (for authority tasks) a city-specific link based on the user's PLZ
  6. A progress bar shows overall completion percentage; each category shows its own count (e.g., "Verträge: 2/5")
**Plans**: TBD
**UI hint**: yes

### Phase 3: Zeitplan, Good to Know & UX-Feinschliff
**Goal**: Users can see all tasks organized on a move-relative timeline, browse tips and FAQ, and experience a polished mobile UX across the full app
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: TIME-01, TIME-02, GTK-01, GTK-02, GTK-03, GTK-04, GTK-05, UX-02
**Success Criteria** (what must be TRUE):
  1. Timeline screen groups all tasks into the correct buckets: 4+ Wochen vorher, 2–4 Wochen, 1 Woche, Am Umzugstag, Danach — and reflects the user's actual move date
  2. User can open "Good to Know" and read FAQ answers about Rundfunkbeitrag, Ummeldungsfrist, and Kaution without leaving the app
  3. Emergency contacts and Spartipps are visible in the "Good to Know" section
  4. User can search for a checklist item or guide by keyword and get relevant results
  5. The full app is usable on a 320px-wide screen — no horizontal scroll, no clipped text, no broken layouts
**Plans**: TBD
**UI hint**: yes

### Phase 4: Suche & Push-Benachrichtigungen (optional)
**Goal**: Users can opt in to browser push notifications for upcoming deadlines — stretch goal only if Phase 3 ships ahead of schedule
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: TIME-03
**Success Criteria** (what must be TRUE):
  1. User is prompted (opt-in) to enable browser push notifications
  2. A test notification fires and is visible on the device
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 (4 optional)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Onboarding | 0/TBD | Not started | - |
| 2. Checkliste & Anleitungen | 0/TBD | Not started | - |
| 3. Zeitplan, Good to Know & UX-Feinschliff | 0/TBD | Not started | - |
| 4. Suche & Push-Benachrichtigungen (optional) | 0/TBD | Not started | - |
