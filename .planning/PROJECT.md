# Wone MOVE

## What This Is

A mobile-first web app that guides young Germans (18–26) through their first move-out — step by step. Not a comparison portal, not a blog, not a generic to-do app. A structured, personalized companion that turns the overwhelming chaos of a first Auszug into a clear, executable process.

The core promise: you start confused, you finish done.

## Prototype Goal (Current Build)

We are building a **clickable showcase prototype** — not a functional app. Every screen is built with realistic mock data so the team can:
1. Visualize the full navigation and feature set
2. Evaluate what makes sense and what doesn't
3. Concretize the product concept for the startup module
4. Produce a cost estimation for real development

**All features are included in the prototype** — even ones that might be cut in v1 — so the team can see them in context before deciding. Screens use hardcoded mock data; no real business logic is needed.

**Final deliverable alongside the prototype:** A cost estimation document for building the real app.

## Who It's For

Young adults 18–26 in Germany: students, Azubis, Berufseinsteiger. Moving out for the first time, usually alone (Einzelhaushalt). Around 300,000–400,000 per year in Germany.

They're overwhelmed. They don't know what they don't know. They're not looking for information — they're looking for a guide.

## The Problem It Solves

The first move-out involves 30+ tasks across 8+ domains: contracts, registrations, insurance, furniture, logistics, finances, address changes, apartment inspection. Right now this knowledge is scattered across Reddit threads, parent phone calls, and forgotten WhatsApp messages.

Wone MOVE bundles it into one personalized flow.

## Context

- University startup module project (Praxisprojekt Gründung II)
- Team has developed business concept and feature spec (see data/Anfangsfragebogen.pdf)
- Color palette defined (purple #646efb primary, dark navy #1c2642, light #f6f7f7)
- Building a clickable showcase prototype in 1–2 weeks for module presentation
- Germany-only, German language, Einzelhaushalt focus for v1

## Business Model

**Primary: Provision via White-Label-Integration**
Anbieter (Strom, Internet, Versicherungen) werden direkt in der App über eine White-Label- oder API-Partnership eingebunden (wie Stufe 2 — z.B. Verivox Partner-API, Check24 Connect). Nutzer schließt Vertrag ab, ohne die App zu verlassen. Provision pro Abschluss: €20–€100 je nach Produktkategorie.

**Sekundär:** Premium-Platzierungen (Anbieter zahlen für "Empfohlen"-Badge), Premium-Abo (no ads, KI Chatbot unlimited, Dokumentenspeicher).

## Constraints

- **Timeline:** 1–2 weeks to working prototype
- **Platform:** Web app (Next.js), mobile-first design (375px target, iPhone form factor)
- **Language:** German (DE)
- **Scope:** All screens / all features as mockup — real logic not required
- **No real backend:** Mock data only — the prototype is a visual tool, not a product

## Screens to Build (Complete List)

### Onboarding Flow
- Splash / Loading screen
- Welcome screen
- Onboarding questionnaire (6–8 steps, step indicator)
- "Hast du bereits?" pre-check screen

### Core App (Bottom Nav)
- Home / Dashboard (progress overview, quick actions, "Wusstest du schon?" card)
- Checkliste (categories: Organisatorisches, Verträge, Versicherungen, Einrichtung, Finanzen)
- Zeitplan / Timeline (5 time buckets relative to move date)
- Anleitungen (standalone guide browser, sorted by category)
- Good to Know (FAQ, Spartipps, Notfallkontakte, Adressänderungen)

### Feature Screens
- Schritt-für-Schritt Anleitung detail screen (one example fully built out, e.g. Ummeldung)
- Anbieter-Vergleich screen (Strom, Internet, Versicherungen — White-Label-Style vollständig integriert: Nutzer verlässt die App nie, Anbieter-Karten mit Logo, Preis, Rating, Laufzeit, Abschluss direkt im Screen simuliert)
- KI Chatbot screen (chat UI with hardcoded responses)
- Dokumentenspeicher screen (upload UI, mock documents)
- Moodboard screen (Pinterest-style grid, mock images)
- Einweihungsparty checklist screen (bonus)
- Notfallkontakte screen

### Account & Settings
- Profil / Mein Umzug screen (name, move date, PLZ, apartment size)
- Einstellungen screen
- Benachrichtigungen settings
- Premium Upgrade / Paywall screen (shows Free vs. Premium comparison)

### Premium Indicators
- "Werbung" banner (Free version UI)
- Premium badge / lock icons on restricted features

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Showcase prototype, not functional MVP | Team needs to see and evaluate all features before building | All screens, mock data |
| Web app over native | Faster to build, shareable link for presentation | Next.js |
| Include ALL features in prototype | Can't evaluate what to cut without seeing it in context | Everything in |
| Germany-only v1 | Bürgeramt links, PLZ logic, language — concrete beats generic | DE only |
| Einzelhaushalt focus | WG is a different flow; starting focused avoids branching complexity | Single person |
| Cost estimation as final deliverable | Module requires concrete business analysis | Separate document |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-05-08 — updated goal to showcase prototype with cost estimation*
