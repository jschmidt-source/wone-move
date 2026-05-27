'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useChecklistStore } from '@/store/checklistStore';
import { TASKS, CATEGORIES, BUCKETS, filterTasks } from '@/lib/tasks';
import { Task, ChecklistCategoryId } from '@/types/checklist';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { MustDoSection } from '@/components/checklist/MustDoSection';
import { CategorySection } from '@/components/checklist/CategorySection';
import { TimelineBucketSection } from '@/components/timeline/TimelineBucketSection';
import { AddItemSheet } from '@/components/checklist/AddItemSheet';

// Inline Toast component (shadcn useToast not installed — Rule 3 deviation, matches 04-02 pattern)
function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2200);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className="fixed bottom-24 left-4 right-4 z-50 rounded-xl px-4 py-3 text-[14px] text-white shadow-lg"
      style={{ backgroundColor: '#20314b' }}
    >
      {message}
    </div>
  );
}

export default function AufgabenPage() {
  const router = useRouter();
  const { data } = useOnboardingStore();
  const { checkedIds, customItems, toggle, addCustomItem, isChecked } = useChecklistStore();
  const [view, setView] = useState<'checklist' | 'zeitplan'>('checklist');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const confettiTriggered = useRef(false);

  const { tasks: visibleTasks, preChecked } = useMemo(
    () => filterTasks(TASKS, data),
    [data]
  );

  // One-shot pre-check sync (D-04, D-05)
  const didSyncRef = useRef(false);
  useEffect(() => {
    if (didSyncRef.current) return;
    didSyncRef.current = true;
    for (const id of preChecked) {
      if (!checkedIds.includes(id)) toggle(id);
    }
  }, [preChecked, checkedIds, toggle]);

  // Adapt customItems → Task shape so they render with ChecklistItem
  const customAsTasks: Task[] = customItems.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    timelineBucket: 'medium',
    isMustDo: false,
    estimatedMinutes: 0,
    difficulty: 'Leicht',
  }));

  const allTasks = [...visibleTasks, ...customAsTasks];
  const mustDo = allTasks.filter((t) => t.isMustDo);
  const tasksByCategory = (id: ChecklistCategoryId) =>
    allTasks.filter((t) => t.category === id);
  const tasksByBucket = (id: typeof BUCKETS[number]['id']) =>
    allTasks.filter((t) => t.timelineBucket === id);

  const today = new Date();
  const moveDate = data.moveDate ? new Date(data.moveDate) : null;

  // Completion state
  const totalCount = allTasks.length;
  const completedCount = allTasks.filter((t) => isChecked(t.id)).length;
  const isComplete = totalCount > 0 && completedCount === totalCount;

  // Confetti on completion (bounded 3s loop — per celebration page pattern)
  useEffect(() => {
    if (!isComplete || confettiTriggered.current) return;
    confettiTriggered.current = true;
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#646efb', '#d2d5fc', '#20314b', '#ffffff'] });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#646efb', '#d2d5fc', '#20314b', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [isComplete]);

  function handleNavigate(slug: string) {
    router.push(`/anleitungen/${slug}`);
  }

  function showToast(message: string) {
    setToastMessage(message);
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Sticky toggle */}
      <div className="sticky top-0 z-40 border-b border-[#d2d5fc] bg-white px-4 py-2">
        <SegmentedControl
          options={[
            { value: 'checklist', label: 'Checkliste' },
            { value: 'zeitplan', label: 'Zeitplan' },
          ]}
          value={view}
          onChange={(v) => setView(v as 'checklist' | 'zeitplan')}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {view === 'checklist' ? (
          isComplete ? (
            /* Empty State — all tasks done (per UI-SPEC §Empty State) */
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
              <div className="mb-6 text-[64px]">🏠🎉</div>
              <h2 className="mb-3 text-[28px] font-bold leading-[1.15] text-foreground">
                Geschafft! Willkommen in deinem neuen Zuhause
              </h2>
              <p className="mb-8 text-[14px] font-normal text-muted-foreground">
                32 Aufgaben erledigt in 3 Wochen
              </p>
              <button
                type="button"
                onClick={() => showToast('Share-Funktion folgt in der Vollversion.')}
                className="mb-3 h-[52px] w-full rounded-xl text-[16px] font-bold text-white"
                style={{ backgroundColor: '#646efb' }}
              >
                Teile deinen Erfolg
              </button>
              <button
                type="button"
                onClick={() => showToast('Feedback-Funktion folgt in der Vollversion.')}
                className="h-[52px] w-full rounded-xl border border-[#d2d5fc] bg-white text-[16px] font-bold text-muted-foreground"
              >
                Feedback geben
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Werbebanner — 48px, above checklist (per UI-SPEC §Werbebanner) */}
              <div
                className="flex h-[48px] items-center justify-between px-0"
                style={{ backgroundColor: '#f6f7f7', borderBottom: '1px solid #d2d5fc' }}
              >
                <span className="text-[14px] font-normal" style={{ color: '#5b6377' }}>
                  Anzeige: Jetzt Strom vergleichen →
                </span>
                <button
                  type="button"
                  aria-label="Werbung schließen"
                  onClick={() =>
                    showToast('Werbung kann nicht ausgeblendet werden. Upgrade auf Premium.')
                  }
                  className="ml-2 flex h-[32px] w-[32px] items-center justify-center"
                >
                  <X size={16} color="#5b6377" />
                </button>
              </div>
              <MustDoSection
                tasks={mustDo}
                isChecked={isChecked}
                onToggle={toggle}
                onNavigate={handleNavigate}
              />
              {CATEGORIES.map((cat) => (
                <CategorySection
                  key={cat.id}
                  category={cat}
                  tasks={tasksByCategory(cat.id)}
                  isChecked={isChecked}
                  onToggle={toggle}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          )
        ) : (
          <div className="space-y-4">
            {BUCKETS.map((b) => (
              <TimelineBucketSection
                key={b.id}
                bucket={b}
                tasks={tasksByBucket(b.id)}
                isChecked={isChecked}
                onToggle={toggle}
                onNavigate={handleNavigate}
                today={today}
                moveDate={moveDate}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB — hidden in empty state (isComplete) */}
      {view === 'checklist' && !isComplete && (
        <button
          type="button"
          aria-label="Eigenen Punkt hinzufügen"
          onClick={() => setSheetOpen(true)}
          className="fixed right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white"
          style={{
            bottom: 'calc(56px + env(safe-area-inset-bottom) + 24px)',
            boxShadow: '0 4px 12px rgba(100, 110, 251, 0.3)',
          }}
        >
          <Plus size={24} color="#ffffff" />
        </button>
      )}

      <AddItemSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAdd={(title, category) => addCustomItem(title, category)}
      />

      {/* Inline toast (auto-dismisses after 2200ms) */}
      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      )}
    </div>
  );
}
