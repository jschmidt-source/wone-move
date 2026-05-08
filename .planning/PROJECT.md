# Wone MOVE

## What This Is

A mobile-first web app that guides young Germans (18–26) through their first move-out — step by step. Not a comparison portal, not a blog, not a generic to-do app. A structured, personalized companion that turns the overwhelming chaos of a first Auszug into a clear, executable process.

The core promise: you start confused, you finish done.

## Core Value

**The ONE thing that must work:** A user sets their move-out date, answers 6–8 questions, and immediately gets a personalized checklist with step-by-step instructions — including links to the right authorities for their city.

Without this working flawlessly, nothing else matters.

## Who It's For

Young adults 18–26 in Germany: students, Azubis, Berufseinsteiger. Moving out for the first time, usually alone (Einzelhaushalt focus for v1). Around 300,000–400,000 per year in Germany.

They're overwhelmed. They don't know what they don't know. They're not looking for information — they're looking for a guide.

## The Problem It Solves

The first move-out involves 30+ tasks across 8+ domains: contracts, registrations, insurance, furniture, logistics, finances, address changes, apartment inspection. Right now this knowledge is scattered across Reddit threads, parent phone calls, and forgotten WhatsApp messages.

Wone MOVE bundles it into one personalized flow.

## Context

- University startup module project (Praxisprojekt Gründung II)
- Team has developed business concept and feature spec (see data/Anfangsfragebogen.pdf)
- Color palette defined (purple #646efb primary, dark navy #1c2642, light #f6f7f7)
- Building a functional web prototype in 1–2 weeks for module presentation
- Germany-only, German language, Einzelhaushalt focus for v1

## Business Model

Affiliate commissions when users sign up for utilities (electricity, internet), insurance, or other contracts via the app. Secondary: partnerships and premium placements with providers.

## Constraints

- **Timeline:** 1–2 weeks to working prototype
- **Platform:** Web app (Next.js), mobile-first design
- **Language:** German (DE)
- **Scope:** Germany only, Einzelhaushalt (single-person household)
- **No backend for v1:** Local state (localStorage) only — no user accounts, no DB

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User completes onboarding questionnaire (6–8 questions) and gets personalized checklist
- [ ] Personalized checklist organized by category with progress tracking
- [ ] Each checklist item links to step-by-step guide with city-specific external links
- [ ] Timeline view showing what needs to be done when (relative to move date)
- [ ] Progress indicator (overall + per category)
- [ ] "Good to know" section (FAQ, Wusstest du schon? tips, emergency contacts)
- [ ] Checklist items can be checked off and persisted locally

### Out of Scope (v1)

- KI Chatbot — FAQ + Good to Know covers this for prototype
- Dokumentenspeicher — no backend, no uploads
- Listen sharen / Haushalt teilen — needs auth and realtime sync
- Moodboard — not core to the problem
- Dienstleistungsvermittlung — separate product
- Rabattlinks — v2 premium feature
- Einweihungsparty checklist — trivial bonus, cuts after prototype
- Provider comparison engine — affiliate links to Check24 suffice
- In-app notification bar — push notifications only (browser), simpler
- WG / Familie mode — v2, separate flow

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Web app over native | Faster to build, no App Store, shareable for module presentation | Web (Next.js) |
| Germany-only v1 | Bürgeramt links, PLZ logic, language — concrete beats generic | DE only |
| Einzelhaushalt focus | WG is a different flow; starting focused avoids branching complexity | Single person |
| No backend for prototype | Removes auth, DB, deployment complexity; localStorage sufficient for demo | localStorage |
| Skip AI chatbot in v1 | Good FAQ + step-by-step guides make chatbot redundant for prototype | Static FAQ |
| Skip Moodboard | Competitor analysis: Pinterest is better; distraction from core value | Cut entirely |
| Affiliate links not comparison engine | Provider comparison is a commodity; our value is the guided flow | Link out |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-08 after initialization*
