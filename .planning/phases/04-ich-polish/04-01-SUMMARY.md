---
phase: 4
plan: "04-01"
subsystem: ich-tab
tags: [zustand, localStorage, chatbot, paywall, profil, dokumente]
dependency_graph:
  requires: [checklistStore, TASKS, vertraegeStore pattern]
  provides: [chatbotStore, /ich, /ich/chatbot, /ich/dokumente]
  affects: [/ich/premium (navigation target — built in 04-02)]
tech_stack:
  added: [chatbotStore (Zustand+persist, wone-chatbot key)]
  patterns: [Zustand+persist no-use-client store, inline paywall banner, Premium-Lock-Card]
key_files:
  created:
    - src/store/chatbotStore.ts
    - src/app/(main)/ich/chatbot/page.tsx
    - src/app/(main)/ich/dokumente/page.tsx
  modified:
    - src/app/(main)/ich/page.tsx
decisions:
  - "D-01: /ich screen is Profil/Mein Umzug with hardcoded Lea Müller mock data and live checklist progress"
  - "D-02: Two header icons: MessageCircle → /ich/chatbot, Settings → /ich/einstellungen"
  - "D-04: 3 pre-filled exchanges (6 messages) visible on chatbot open — no scroll needed"
  - "D-05: 4th submit renders inline paywall banner instead of AI response"
  - "D-06: Banner text: 'Du hast dein Limit erreicht (3/3). Upgrade auf Premium für unbegrenzte Chats.'"
  - "D-07: chatCount persists via wone-chatbot localStorage key"
  - "D-09: Dokumentenspeicher 3rd slot is inline Premium-Lock-Card with dashed border → /ich/premium"
metrics:
  duration: "~8 min"
  completed_date: "2026-05-08"
  tasks_completed: 3
  files_created: 3
  files_modified: 1
---

# Phase 4 Plan 01: Ich-Tab Core Screens Summary

**One-liner:** chatbotStore (wone-chatbot persist key) + Profil/Mein-Umzug screen with live progress + KI-Chatbot with FREE_LIMIT=3 paywall logic + Dokumentenspeicher with Premium-Lock-Card.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| T-04-01-01 | Create chatbotStore | 3f5ee4a | src/store/chatbotStore.ts |
| T-04-01-02 | Build /ich Profil screen | b1f813d | src/app/(main)/ich/page.tsx |
| T-04-01-03 | Build /ich/chatbot and /ich/dokumente | e73fb51 | src/app/(main)/ich/chatbot/page.tsx, src/app/(main)/ich/dokumente/page.tsx |

## Decisions Implemented

- **D-01:** /ich screen replaced placeholder "Dein Profil kommt bald" with full Profil/Mein Umzug layout: 80px avatar (#646efb background, white "LM" initials), "Lea Müller" name, sub-info line "Von Hamburg → München · 15. Juni 2026 · 42 qm", live progress bar reading from checklistStore.checkedIds vs TASKS.length.
- **D-02:** Two header icon buttons: MessageCircle (purple, #646efb) → /ich/chatbot; Settings (muted, #5b6377) → /ich/einstellungen.
- **D-04/05/06:** Chatbot opens with PREFILLED array (6 messages = 3 user + 3 AI exchanges). FREE_LIMIT=3. On 4th submit: inline paywall banner appears with Lock icon, limit text, and "Jetzt upgraden →" button. chatCount increments via useChatbotStore.incrementCount() and persists via wone-chatbot key.
- **D-07:** chatbotStore uses Zustand+persist with `name: 'wone-chatbot'` — no `'use client'` at module level, matching vertraegeStore pattern.
- **D-09:** Dokumentenspeicher shows 2 mock doc cards (Mietvertrag.pdf, Übergabeprotokoll.pdf) then an inline Premium-Lock-Card as 3rd slot with `border: '2px dashed #d2d5fc'` and tap → /ich/premium.

## Patterns Established for Remaining Plans

- **chatbotStore** is the template for any future count-tracking store with persist
- **Inline paywall banner** pattern (Lock icon + text + Upgrade button) can be reused in 04-02 Premium screen
- **Premium-Lock-Card** with dashed border is the standard locked-slot indicator
- Both /ich/chatbot and /ich/dokumente use the standard header pattern (ChevronLeft back button + title + optional badge)

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- `/ich/einstellungen` — referenced by Settings icon tap but not yet built (planned for 04-02 or 04-03)
- `/ich/premium` — referenced by chatbot paywall and Dokumente lock card but not yet built (planned for 04-02)
- Chatbot mock AI response for messages 1–2 within free limit is a generic fallback string (prototype scope; pre-filled exchanges cover the primary demo path)

## Threat Flags

None — all trust boundaries were pre-identified in the plan's threat model and accepted as prototype scope.

## Self-Check: PASSED

- src/store/chatbotStore.ts: FOUND
- src/app/(main)/ich/page.tsx: FOUND (Lea Müller present, old placeholder removed)
- src/app/(main)/ich/chatbot/page.tsx: FOUND
- src/app/(main)/ich/dokumente/page.tsx: FOUND
- Commits 3f5ee4a, b1f813d, e73fb51: FOUND in git log
- `npx next build` completed without TypeScript errors — all 4 routes built successfully
