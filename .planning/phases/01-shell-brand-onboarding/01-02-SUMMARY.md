---
phase: 01-shell-brand-onboarding
plan: 2
subsystem: ui
tags: [nextjs, tailwind, shadcn, onboarding, splash, welcome, router]

# Dependency graph
requires:
  - 01-PLAN-1 (scaffold, brand tokens, shadcn button, route skeleton)
provides:
  - Splash screen at / (full-bleed #646efb, spinning white ring, auto-redirect to /welcome after 1500ms)
  - Welcome screen at /welcome (brand headline + subline + 'Jetzt starten' CTA navigating to /step/1)
affects: [plan 3 main screens, plan 4 onboarding steps]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - useRouter + setTimeout pattern for auto-redirect (cleanup via clearTimeout)
    - h-dvh for full dynamic viewport height (handles mobile browser chrome)
    - Tailwind arbitrary values (text-[28px], text-[20px], h-[52px]) for pixel-exact spec compliance
    - active:scale-[0.97] + transition-transform for button press micro-animation

key-files:
  created: []
  modified:
    - src/app/(onboarding)/page.tsx (replaced placeholder — Splash screen)
    - src/app/(onboarding)/welcome/page.tsx (replaced placeholder — Welcome screen)

key-decisions:
  - "Used h-dvh (dynamic viewport height) instead of h-screen to correctly handle mobile browser chrome on iOS Safari"
  - "Arbitrary Tailwind values (text-[28px] etc.) used for pixel-exact UI spec compliance — CSS variables would have required additional @theme entries"
  - "No (onboarding)/layout.tsx exists — confirmed before implementation, onboarding screens render without bottom nav"

# Metrics
duration: 5min
completed: 2026-05-08
---

# Phase 1 Plan 2: Splash Screen and Welcome Screen Summary

**Splash screen (full-bleed #646efb, animate-spin ring, 1500ms auto-redirect) and Welcome screen (28px headline, 20px subline, 52px bg-primary CTA) replacing Wave 1 placeholder pages**

## Performance

- **Duration:** 5 min
- **Completed:** 2026-05-08
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Splash screen: full-bleed bg-primary (#646efb), h-dvh, Wone MOVE wordmark, animated white border-ring (animate-spin), auto-navigates to /welcome after 1500ms with cleanup on unmount
- Welcome screen: brand headline "Dein erster Auszug. Wir begleiten dich." (text-[28px] font-bold text-foreground), subline "Dein persönlicher Umzugsplan in 2 Minuten." (text-[20px] font-bold text-muted-foreground), full-width 52px 'Jetzt starten' CTA (bg-primary, rounded-xl, active:scale-[0.97]) navigating to /step/1
- Build passes with zero TypeScript errors (npm run build)
- No (onboarding)/layout.tsx — confirmed onboarding group has no shared layout, no bottom nav

## Task Commits

Each task was committed atomically:

1. **Task 1: Splash Screen** - `09eef14` (feat)
2. **Task 2: Welcome Screen** - `62811fe` (feat)

## Files Modified

- `src/app/(onboarding)/page.tsx` - Replaced placeholder with full Splash screen implementation
- `src/app/(onboarding)/welcome/page.tsx` - Replaced placeholder with full Welcome screen implementation

## Decisions Made

- **h-dvh over h-screen:** Dynamic viewport height unit correctly handles mobile browser chrome (iOS Safari address bar) where h-screen would overflow. Critical for mobile-first target.
- **Arbitrary Tailwind values:** text-[28px], text-[20px], h-[52px] provide pixel-exact spec compliance without adding new CSS variables.
- **No onboarding layout:** Verified before implementation — (onboarding)/ has no layout.tsx. Splash and Welcome screens render full-bleed without any shell chrome.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None. Both screens are fully implemented:
- Splash: auto-redirect fires after 1500ms (not hardcoded empty state)
- Welcome: CTA navigates to /step/1 (Step 1 onboarding, implemented in Plan 3)

The /step/1 route exists as a placeholder from Plan 1 — it will be replaced by Plan 3 (onboarding steps).

## Threat Flags

No new security surface introduced. Both screens are purely client-side UI with no data access, no auth, no network calls. Consistent with T-01-04 and T-01-05 dispositions (accept).

## Self-Check: PASSED

- src/app/(onboarding)/page.tsx: FOUND
- src/app/(onboarding)/welcome/page.tsx: FOUND
- Commit 09eef14: FOUND
- Commit 62811fe: FOUND
- npm run build: PASSED (zero TypeScript errors)
