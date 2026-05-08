---
phase: 04-ich-polish
reviewed: 2026-05-08T00:00:00Z
depth: standard
files_reviewed: 11
files_reviewed_list:
  - src/store/chatbotStore.ts
  - src/app/(main)/ich/page.tsx
  - src/app/(main)/ich/chatbot/page.tsx
  - src/app/(main)/ich/dokumente/page.tsx
  - src/app/(main)/ich/premium/layout.tsx
  - src/app/(main)/ich/premium/page.tsx
  - src/app/(main)/ich/einstellungen/page.tsx
  - src/app/(main)/ich/datenschutz/page.tsx
  - src/app/(main)/ich/impressum/page.tsx
  - src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx
  - src/app/(main)/aufgaben/page.tsx
findings:
  critical: 0
  warning: 7
  info: 4
  total: 11
status: issues_found
---

# Phase 4: Code Review Report

**Reviewed:** 2026-05-08
**Depth:** standard
**Files Reviewed:** 11
**Status:** issues_found

## Summary

Reviewed the Ich-Tab and associated pages (chatbot, dokumente, premium, einstellungen, datenschutz, impressum) plus the Aufgaben and Übergabeprotokoll pages. The code is clean overall and follows established project patterns. No critical bugs (security vulnerabilities, crashes, data loss on the happy path) were found. However, several logic correctness issues and UX defects are present: stale progress calculation on the Ich page, accumulating paywall banners in the chatbot, uncontrolled Switch state in the push notification sheet, a dangling timeout in the Premium page, and protocol state that vanishes on navigation. There are also a handful of hardcoded data values that silently diverge from store state.

---

## Warnings

### WR-01: Progress bar on Ich page counts all checked IDs, not filtered visible tasks

**File:** `src/app/(main)/ich/page.tsx:13`

**Issue:** `completedCount = checkedIds.length` reads raw checked IDs from the store without filtering to the tasks visible to this user. The Aufgaben page computes `allTasks` via `filterTasks(TASKS, data)` which can hide tasks depending on `movingOrg` and pre-check others. As a result the Ich page progress bar can show a different denominator (always `TASKS.length = 32`) and numerator than what Aufgaben shows, producing a mismatch the user will notice — e.g., Aufgaben reports 28/29 while Ich reports 28/32.

**Fix:**
```tsx
// Import filterTasks and useOnboardingStore — same pattern as AufgabenPage
import { useOnboardingStore } from '@/store/onboardingStore';
import { TASKS, filterTasks } from '@/lib/tasks';
import { useMemo } from 'react';

const { data } = useOnboardingStore();
const { tasks: visibleTasks } = useMemo(() => filterTasks(TASKS, data), [data]);
const totalCount = visibleTasks.length;
const completedCount = visibleTasks.filter((t) => checkedIds.includes(t.id)).length;
```

---

### WR-02: Multiple paywall banners accumulate in the chatbot

**File:** `src/app/(main)/ich/chatbot/page.tsx:50-55`

**Issue:** When `chatCount >= FREE_LIMIT`, every subsequent `handleSubmit` call appends a user bubble AND another paywall `Message` to the list. There is no guard against duplicate paywall messages. After the limit is hit, each new submission adds one more `{ type: 'paywall' }` entry. The user sees stacked paywall banners, which is visually broken and spammy.

**Fix:**
```tsx
function handleSubmit() {
  const text = input.trim();
  if (!text) return;
  setInput('');

  // Guard: if paywall already shown, do nothing beyond showing the first one
  const paywallAlreadyShown = messages.some((m) => m.type === 'paywall');
  if (paywallAlreadyShown) return;

  setMessages((prev) => [...prev, { type: 'user', text }]);

  if (chatCount >= FREE_LIMIT) {
    setMessages((prev) => [...prev, { type: 'paywall' }]);
    return;
  }

  incrementCount();

  if (chatCount + 1 >= FREE_LIMIT) {
    setMessages((prev) => [...prev, { type: 'paywall' }]);
  } else {
    setMessages((prev) => [
      ...prev,
      { type: 'ai', text: 'Das ist eine gute Frage! …' },
    ]);
  }
}
```

---

### WR-03: PushSheet Switch values are uncontrolled and never read

**File:** `src/app/(main)/ich/einstellungen/page.tsx:79-84`

**Issue:** The two `Switch` components inside `PushSheet` use `defaultChecked` (uncontrolled). Their checked state is never stored in React state and is invisible to the parent. `handlePushActivate` unconditionally activates push notifications regardless of what the user toggled. Furthermore, every time the sheet is closed and reopened the toggles reset to checked, losing any change the user made. This is a correctness defect: the UI implies granular control that has no effect.

**Fix:** Lift the toggle state into `EinstellungenPage` (or into `PushSheet` with controlled props) and pass the values to `onActivate`:
```tsx
// In PushSheet, accept and control the toggle values:
interface PushSheetProps {
  open: boolean;
  onClose: () => void;
  onActivate: (tasks: boolean, fristen: boolean) => void;
}

function PushSheet({ open, onClose, onActivate }: PushSheetProps) {
  const [tasksEnabled, setTasksEnabled] = useState(true);
  const [fristenEnabled, setFristenEnabled] = useState(true);
  // ...
  <Switch checked={tasksEnabled} onCheckedChange={setTasksEnabled} />
  <Switch checked={fristenEnabled} onCheckedChange={setFristenEnabled} />
  <button onClick={() => onActivate(tasksEnabled, fristenEnabled)}>Aktivieren</button>
}
```

---

### WR-04: Dangling setTimeout in PremiumPage on navigation

**File:** `src/app/(main)/ich/premium/page.tsx:58-61`

**Issue:** `handleUpgrade` sets `toast` state and schedules `router.back()` with `setTimeout(..., 2200)`. The timeout is not cancelled on component unmount. If the user taps the "Kostenlos weitermachen" back button within 2200ms after tapping "Jetzt upgraden", the component navigates back immediately, but 2200ms later `router.back()` fires a second time — navigating the user one extra page back beyond their intended destination.

**Fix:** Use `useEffect` to clean up the timer:
```tsx
const backTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

function handleUpgrade() {
  setToast('Danke! Premium-Funktion folgt in der Vollversion.');
  backTimerRef.current = setTimeout(() => router.back(), 2200);
}

useEffect(() => {
  return () => {
    if (backTimerRef.current) clearTimeout(backTimerRef.current);
  };
}, []);
```

---

### WR-05: Übergabeprotokoll data lost on navigation (not persisted)

**File:** `src/app/(main)/aufgaben/uebergabeprotokoll/page.tsx:38`

**Issue:** `protocol` is local React state initialized from `emptyProtocol()`. All room condition toggles, defect notes, and any future signature data are discarded the moment the user navigates back to Aufgaben or switches tabs. The rest of the app persists user data to localStorage via Zustand. This inconsistency means the user loses work without warning — a particularly bad outcome for a document meant to be filled out during a physical apartment walkthrough.

**Fix:** Persist the protocol state via Zustand with the `persist` middleware (same pattern as `checklistStore`/`chatbotStore`), or at minimum warn the user before navigating away if any field has been filled:
```tsx
// Minimal warning approach:
useEffect(() => {
  const hasData = ROOMS.some((r) =>
    FIELDS.some((f) => protocol[r][f].state !== null || protocol[r][f].note !== '')
  );
  if (!hasData) return;
  const handleBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [protocol]);
```
A full Zustand store is the correct long-term fix.

---

### WR-06: Ich page displays hardcoded user identity and move details instead of onboarding store data

**File:** `src/app/(main)/ich/page.tsx:49-53`

**Issue:** The avatar initials ("LM"), the displayed name ("Lea Müller"), and the move summary ("Von Hamburg → München · 15. Juni 2026 · 42 qm") are hardcoded strings. The app collects city, move date, and apartment size during onboarding via `useOnboardingStore`. Showing fixture data after the user completed their own onboarding is a correctness failure — it will confuse real users and make the prototype unacceptable for any user test.

**Fix:** Read from `useOnboardingStore`:
```tsx
const { data } = useOnboardingStore();
// derive initials from data.name if available, or use placeholder
const displayName = data.name ?? 'Mein Profil';
const initials = displayName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
const moveSummary = [
  data.fromCity && data.toCity ? `${data.fromCity} → ${data.toCity}` : null,
  data.moveDate ? new Date(data.moveDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }) : null,
  data.apartmentSize ? `${data.apartmentSize} qm` : null,
].filter(Boolean).join(' · ');
```
If onboarding does not collect name/city, use neutral placeholders and track it as a missing data field.

---

### WR-07: Completion empty state hardcodes "32 Aufgaben erledigt in 3 Wochen"

**File:** `src/app/(main)/aufgaben/page.tsx:132`

**Issue:** The celebration message reads "32 Aufgaben erledigt in 3 Wochen" but neither value is derived from state. `allTasks.length` is already computed and available in scope (as `totalCount`); the "3 Wochen" duration is not computed anywhere. If a user has custom tasks or filtered tasks, `totalCount` may not be 32. The hardcoded text will be factually wrong.

**Fix:**
```tsx
// Replace the hardcoded string with dynamic values:
<p className="mb-8 text-[14px] font-normal text-muted-foreground">
  {totalCount} Aufgaben erledigt
</p>
```
The duration ("3 Wochen") requires computing elapsed time from `data.moveDate` and should be omitted unless that calculation is implemented.

---

## Info

### IN-01: Dokumentenspeicher document count is hardcoded

**File:** `src/app/(main)/ich/dokumente/page.tsx:31` and `src/app/(main)/ich/page.tsx:91`

**Issue:** "Free-Version: 2 von 2 Dokumenten gespeichert" (dokumente page) and "2 Dokumente gespeichert" (ich page) are string literals. If a document store is added, both will require manual updates and will silently be wrong until then.

**Fix:** Define a constant `FREE_DOC_LIMIT = 2` and derive displayed counts from `MOCK_DOCS.length` for now, so the number stays consistent if mock data changes.

---

### IN-02: Array index used as React list key in chatbot message list

**File:** `src/app/(main)/ich/chatbot/page.tsx:91`

**Issue:** `key={i}` on the messages map. Messages are append-only so this is functionally safe today, but it violates React best practices and will cause rendering issues if any reordering or removal is ever added.

**Fix:** Add a stable `id` field to the `Message` type (e.g., `crypto.randomUUID()` or a monotonic counter) and use it as the key.

---

### IN-03: `showToast` wrapper function adds no value in EinstellungenPage

**File:** `src/app/(main)/ich/einstellungen/page.tsx:106-108`

**Issue:** `showToast(message)` is a one-line wrapper that simply calls `setToast(message)`. It adds an indirection with no logic, and the same pattern exists inline in other pages (PremiumPage calls `setToast` directly). This is dead abstraction.

**Fix:** Remove `showToast` and call `setToast(message)` directly at the three call sites.

---

### IN-04: `PremiumLayout` is a no-op wrapper

**File:** `src/app/(main)/ich/premium/layout.tsx:1-3`

**Issue:** The layout file renders `<>{children}</>` with no added behaviour. Next.js App Router only requires a `layout.tsx` when it adds something (metadata, wrappers, providers). An empty passthrough layout is dead code.

**Fix:** Delete the file. Next.js will use the parent `(main)` layout automatically.

---

_Reviewed: 2026-05-08_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
