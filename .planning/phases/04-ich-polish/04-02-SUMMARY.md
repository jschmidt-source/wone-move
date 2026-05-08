---
phase: 4
plan: "04-02"
subsystem: ich-tab
tags: [paywall, premium, einstellungen, push-notifications, datenschutz, impressum, uebergabeprotokoll]
dependency_graph:
  requires: [04-01 (/ich core screens, chatbotStore)]
  provides: [/ich/premium, /ich/einstellungen, /ich/datenschutz, /ich/impressum]
  affects: [/aufgaben/uebergabeprotokoll (export row patched), /ich/chatbot (premium nav target), /ich/dokumente (premium nav target)]
tech_stack:
  added: []
  patterns: [inline Toast component (no external dep), custom PushSheet (AddItemSheet pattern), PremiumLayout (BottomNav suppression via nested layout)]
key_files:
  created:
    - src/app/(main)/ich/premium/layout.tsx
    - src/app/(main)/ich/premium/page.tsx
    - src/app/(main)/ich/einstellungen/page.tsx
    - src/app/(main)/ich/datenschutz/page.tsx
    - src/app/(main)/ich/impressum/page.tsx
  modified:
    - src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx
decisions:
  - "D-08: PremiumLayout at /ich/premium/layout.tsx renders only {children} — suppresses BottomNav from parent (main)/layout.tsx without moving route outside (main) group"
  - "D-03: PushSheet uses AddItemSheet pattern (fixed bottom overlay, translate-y animation) — shadcn Sheet not installed; @base-ui/react has no Sheet primitive"
  - "D-10: Both CTAs on paywall use router.back() — Jetzt upgraden shows 2.2s inline Toast first, then back; Kostenlos weitermachen goes back immediately"
  - "D-11: Logout + Account löschen are tappable (not truly disabled) — show toast 'Nur in der Vollversion verfügbar.' on tap; visual treatment is grey/reduced-opacity"
  - "D-12: Datenschutz and Impressum navigate to internal placeholder screens from Einstellungen"
  - "Toast: Implemented as inline React component with useEffect setTimeout (2200ms auto-dismiss) — useToast/shadcn not installed in project"
metrics:
  duration: "~6 min"
  completed_date: "2026-05-08"
  tasks_completed: 2
  files_created: 5
  files_modified: 1
---

# Phase 4 Plan 02: Premium Paywall + Einstellungen + Subpages Summary

**One-liner:** PremiumLayout (no bottom nav) + 8-row Free/Premium comparison table + Einstellungen with PushSheet bottom sheet + Datenschutz/Impressum placeholder screens + Übergabeprotokoll export button wired to /ich/premium.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| T-04-02-01 | Build /ich/premium full-screen paywall | 03937f7 | src/app/(main)/ich/premium/layout.tsx, src/app/(main)/ich/premium/page.tsx |
| T-04-02-02 | Build Einstellungen, Datenschutz, Impressum + patch Übergabeprotokoll | f911b66 | src/app/(main)/ich/einstellungen/page.tsx, src/app/(main)/ich/datenschutz/page.tsx, src/app/(main)/ich/impressum/page.tsx, src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx |

## Decisions Implemented

- **D-08 (Premium layout):** `/ich/premium/layout.tsx` exports `PremiumLayout` that renders only `{children}` — this overrides the parent `(main)/layout.tsx` for this route, suppressing BottomNav without relocating the route outside the `(main)` group.
- **D-03 (Push sheet):** `PushSheet` is built using the same custom bottom-sheet pattern as `AddItemSheet.tsx` (fixed bottom overlay, `translate-y` CSS transition, backdrop button). Shadcn Sheet and Base UI Sheet are not available in this project.
- **D-10 (CTA behavior):** "Jetzt upgraden" shows an inline toast for 2.2s then calls `router.back()`. "Kostenlos weitermachen" calls `router.back()` directly.
- **D-11 (Disabled actions):** Logout and Account löschen rows are tappable buttons that show the toast "Nur in der Vollversion verfügbar." Visual treatment: grey color at 50% opacity for "Account löschen", muted grey for Logout.
- **D-12 (Internal nav):** Datenschutz and Impressum buttons in Einstellungen use `router.push('/ich/datenschutz')` and `router.push('/ich/impressum')` respectively.

## Toast Implementation Note

The plan specified `useToast` from `@/hooks/use-toast` or `@/components/ui/use-toast`. Neither exists in the project — shadcn's toast package was not installed. Instead, an inline `Toast` component was created in each file that uses it (`/ich/premium/page.tsx` and `/ich/einstellungen/page.tsx`). The component auto-dismisses via `useEffect` + `setTimeout(2200ms)`. This is a Rule 3 deviation (blocking issue resolved inline).

## Sheet Component Note

The plan specified `Sheet, SheetContent, SheetHeader, SheetTitle` from `@/components/ui/sheet`. This component does not exist. The project uses `AddItemSheet.tsx` as the established bottom-sheet pattern. `PushSheet` was implemented following the same pattern: `fixed bottom-0 left-0 right-0 z-50 rounded-t-[20px]` with `translate-y` CSS transition and backdrop overlay.

## Übergabeprotokoll Patch

The export row `<div className="mt-6 flex h-[52px]...">` was replaced with `<button type="button" onClick={() => router.push('/ich/premium')} className="mt-6 flex h-[52px] w-full...">`. The `useRouter` import and `router` const were already present in the file.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] useToast not installed — inline Toast component used**
- **Found during:** Task 1 (premium page), carried through Task 2 (Einstellungen)
- **Issue:** Plan referenced `@/hooks/use-toast` and `@/components/ui/use-toast` — neither exists; shadcn toast package not installed
- **Fix:** Inline `Toast` component with `useEffect` auto-dismiss at 2.2s
- **Files modified:** src/app/(main)/ich/premium/page.tsx, src/app/(main)/ich/einstellungen/page.tsx
- **Commits:** 03937f7, f911b66

**2. [Rule 3 - Blocking] Sheet component not installed — PushSheet built with AddItemSheet pattern**
- **Found during:** Task 2 (Einstellungen)
- **Issue:** Plan referenced `Sheet, SheetContent, SheetHeader, SheetTitle` from `@/components/ui/sheet` — file does not exist
- **Fix:** `PushSheet` component using the project's established bottom-sheet pattern from `AddItemSheet.tsx`
- **Files modified:** src/app/(main)/ich/einstellungen/page.tsx
- **Commit:** f911b66

## Known Stubs

- `/ich/einstellungen` Sprache row shows static "Deutsch" with ChevronRight but no navigation (stub — language is always DE in this prototype)
- `/ich/datenschutz` shows "Datenschutzerklärung folgt in der Vollversion." (intentional placeholder per plan)
- `/ich/impressum` shows "Impressum folgt in der Vollversion." (intentional placeholder per plan)
- Push toggle state is local to page — does not persist via localStorage (prototype scope; no real push API)

## Threat Flags

None — all trust boundaries pre-identified in plan's threat model and accepted as prototype scope.

## Self-Check: PASSED

- src/app/(main)/ich/premium/layout.tsx: FOUND
- src/app/(main)/ich/premium/page.tsx: FOUND (contains "Alles drin", "Spare 44%", "router.back", 8 FEATURES rows)
- src/app/(main)/ich/einstellungen/page.tsx: FOUND (contains "Nur in der Vollversion verfügbar.", "Erinnerungen aktivieren", datenschutz/impressum push routes)
- src/app/(main)/ich/datenschutz/page.tsx: FOUND (contains "Datenschutzerklärung")
- src/app/(main)/ich/impressum/page.tsx: FOUND (contains "Impressum")
- src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx: FOUND (contains "router.push('/ich/premium')")
- Commits 03937f7, f911b66: FOUND in git log
- `npm run build` completed without TypeScript errors — all 6 routes built successfully (/ich/premium, /ich/einstellungen, /ich/datenschutz, /ich/impressum confirmed in build output)
