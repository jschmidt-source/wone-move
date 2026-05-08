---
phase: 04-ich-polish
plan: "04-04"
subsystem: docs
tags: [cost-estimate, business, startup, markdown]

# Dependency graph
requires:
  - phase: 04-ich-polish
    provides: completed prototype with all screens — cost estimate documents the full build
provides:
  - "COST-ESTIMATE.md at project root: 3-scenario cost breakdown for full Wone MOVE build"
  - "7 components costed: Design/UX, Frontend, Backend, iOS, Android, Content, Infrastruktur"
  - "Laufende Kosten, Zeitplan per scenario, and Empfehlung für die Startup-Phase"
  - "Break-even analysis linking to EUR 2.99/month and EUR 19.99/year pricing"
affects: [startup-pitch, funding-planning, team-hiring]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created:
    - "COST-ESTIMATE.md — complete cost estimation document with 3 scenarios x 7 components"
  modified: []

key-decisions:
  - "Numbers are Claude's discretion per CONTEXT.md §Claude's Discretion — realistic market rates for Germany, May 2026"
  - "DIY scenario uses AI-Pair-Programming (Cursor + Claude Code) recommendation over classic No-Code tools — more realistic for this tech stack"
  - "Freelancer-Hybrid recommended for Pre-Seed — aligns with existing Next.js prototype as starting point"
  - "Break-even calculation anchored to actual paywall pricing (EUR 2.99/month, EUR 19.99/year) from prototype"

patterns-established: []

requirements-completed:
  - UX-Verfeinerungen

# Metrics
duration: 1min
completed: "2026-05-08"
---

# Phase 4 Plan 04: COST-ESTIMATE.md Summary

**Markdown cost estimation document covering 3 scenarios x 7 components with EUR 4K–323K ranges, laufende Kosten, timelines, and Freelancer-Hybrid recommendation for Pre-Seed phase**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-05-08T20:04:52Z
- **Completed:** 2026-05-08T20:05:04Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Created COST-ESTIMATE.md at project root (final deliverable of prototype engagement)
- Covered all 3 scenarios: DIY/No-Code (EUR 4-7K), Freelancer (EUR 58-104K), Agentur (EUR 175-323K)
- Covered all 7 required components with itemized sub-tables and subtotals per scenario
- Included Laufende Kosten (EUR 26-582/month depending on scenario), Zeitplan per scenario, and Empfehlung
- Break-even analysis at EUR 2,99/Monat and EUR 19,99/Jahr linked to actual prototype paywall pricing
- Provisions model (Strom/Internet/Versicherungen) quantified at EUR 3,000-10,000/month at scale

## Task Commits

1. **Task 1: Write COST-ESTIMATE.md** - `4f4a748` (docs)

**Plan metadata:** (this SUMMARY commit)

## Files Created/Modified
- `COST-ESTIMATE.md` — Cost estimation document: 7 components x 3 scenarios, laufende Kosten, Zeitplan-Schätzungen, Empfehlung für die Startup-Phase

## Decisions Made
- Numbers drawn from realistic German freelancer/agency market rates for May 2026
- DIY scenario explicitly recommends Cursor + Claude Code over traditional No-Code tools (Bubble/Webflow are at complexity limits for this app)
- Recommended approach: Freelancer-Hybrid for Pre-Seed — one senior Full-Stack Freelancer for 2-3 months + React Native/Expo for iOS+Android code sharing
- Provisions model included as key revenue lever alongside premium subscriptions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 4 is complete. All 4 plans executed:
- 04-01: Ich-Tab (Profil, Chatbot, Dokumente, Einstellungen, Datenschutz, Impressum)
- 04-02: Premium Paywall + Push Benachrichtigungen
- 04-03: Werbebanner + Empty State completion screen
- 04-04: COST-ESTIMATE.md (this plan)

The prototype is complete. All screens built, all navigation paths connected, cost estimate delivered.

## Self-Check: PASSED

- `COST-ESTIMATE.md` exists at project root: FOUND
- Commit `4f4a748` exists: FOUND
- All 3 scenarios present (DIY, Freelancer, Agentur): VERIFIED (12, 15, 14 occurrences)
- All 7 components present: VERIFIED
- Laufende Kosten section present: VERIFIED
- EUR 2,99 and EUR 19,99 pricing present: VERIFIED
- GESAMT summary table present: VERIFIED

---
*Phase: 04-ich-polish*
*Completed: 2026-05-08*
