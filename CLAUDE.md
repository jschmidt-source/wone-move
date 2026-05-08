# Wone MOVE — Project Guide

## What We're Building

A mobile-first web app (Next.js) that guides young Germans (18–26) through their first move-out. Personalized checklists, step-by-step guides with city-specific authority links, timeline view, and a "Good to Know" section. Germany-only, single-person household, no backend (localStorage only).

## GSD Workflow

This project uses the GSD (Get Shit Done) planning framework.

**Current phase:** Phase 1 — Foundation & Onboarding  
**Mode:** YOLO (auto-execute, no confirmation needed)

### Commands

```
/gsd-discuss-phase 1   # Start Phase 1 with context gathering
/gsd-plan-phase 1      # Plan Phase 1 directly
/gsd-execute-phase 1   # Execute Phase 1 plan
/gsd-progress          # Show current project status
```

### Planning files

| File | Purpose |
|------|---------|
| `.planning/PROJECT.md` | Project context and decisions |
| `.planning/REQUIREMENTS.md` | All v1 requirements with REQ-IDs |
| `.planning/ROADMAP.md` | 4-phase roadmap |
| `.planning/STATE.md` | Current execution state |
| `.planning/config.json` | Workflow preferences |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand
- **Persistence:** localStorage (no backend)
- **Target:** Mobile-first (320px–768px)

## Brand

| Token | Value |
|-------|-------|
| Primary | `#646efb` (purple) |
| Dark | `#1c2642` (navy) |
| Background | `#f6f7f7` |
| Muted | `#5b6377` |
| Primary light | `#d2d5fc` |

## Key Decisions

- **No backend:** localStorage only — removes auth, DB, deployment complexity for prototype
- **Germany-only:** German language, PLZ-based authority links (Bürgeramt, KVR, etc.)
- **Einzelhaushalt only:** Single-person flow for v1; WG is v2
- **No AI chatbot:** Static FAQ + guides cover prototype needs
- **No Moodboard:** Pinterest does this better; cut entirely

## Content Categories

Checklist categories for v1:
1. **Organisatorisches** — Ummeldung, Rundfunkbeitrag, KFZ-Ummeldung
2. **Verträge** — Strom, Internet, Telefon
3. **Versicherungen** — Haftpflicht, Hausrat, Krankenversicherung
4. **Einrichtung** — Möbel, Haushaltsgeräte, Übergabeprotokoll
5. **Finanzen** — Konto, Daueraufträge, Adressänderungen
