'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useChecklistStore } from '@/store/checklistStore';
import { TASKS, CATEGORIES, BUCKETS, filterTasks } from '@/lib/tasks';
import { Task, ChecklistCategoryId } from '@/types/checklist';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { MustDoSection } from '@/components/checklist/MustDoSection';
import { CategorySection } from '@/components/checklist/CategorySection';
import { TimelineBucketSection } from '@/components/timeline/TimelineBucketSection';
import { AddItemSheet } from '@/components/checklist/AddItemSheet';

export default function AufgabenPage() {
  const router = useRouter();
  const { data } = useOnboardingStore();
  const { checkedIds, customItems, toggle, addCustomItem, isChecked } = useChecklistStore();
  const [view, setView] = useState<'checklist' | 'zeitplan'>('checklist');
  const [sheetOpen, setSheetOpen] = useState(false);

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

  function handleNavigate(slug: string) {
    router.push(`/anleitungen/${slug}`);
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
          <div className="space-y-3">
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

      {/* FAB */}
      {view === 'checklist' && (
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
    </div>
  );
}
