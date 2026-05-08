'use client';

import { Check, ChevronRight } from 'lucide-react';
import { Task } from '@/types/checklist';
import { CATEGORIES } from '@/lib/tasks';
import { cn } from '@/lib/utils';

interface Props {
  task: Task;
  checked: boolean;
  onToggle: (id: string) => void;
  onNavigate?: (slug: string) => void;
}

export function ChecklistItem({ task, checked, onToggle, onNavigate }: Props) {
  const categoryColor = CATEGORIES.find((c) => c.id === task.category)?.colorHex ?? '#d2d5fc';
  const hasGuide = Boolean(task.guideSlug && onNavigate);

  function handleRowClick() {
    if (hasGuide && task.guideSlug) onNavigate!(task.guideSlug);
  }

  return (
    <div className="flex min-h-[56px] items-center gap-2 bg-white px-4 py-2">
      <button
        type="button"
        aria-label={checked ? 'Aufgabe abhaken rückgängig machen' : 'Aufgabe abhaken'}
        onClick={() => onToggle(task.id)}
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] transition-all duration-150',
          checked
            ? 'border-0 bg-primary scale-[1.1]'
            : 'border-2 border-[#d2d5fc] bg-white scale-100'
        )}
      >
        {checked && <Check size={14} color="#ffffff" strokeWidth={3} />}
      </button>
      <button
        type="button"
        onClick={handleRowClick}
        disabled={!hasGuide}
        className="flex flex-1 items-center justify-between gap-2 text-left disabled:cursor-default"
      >
        <div className="flex flex-1 flex-col gap-1">
          <span
            className={cn(
              'text-[16px] font-normal transition-colors duration-150',
              checked ? 'text-muted-foreground line-through' : 'text-foreground'
            )}
          >
            {task.title}
          </span>
          <div className="flex items-center gap-1">
            <span
              aria-hidden
              className="block h-2 w-2 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
            <span className="rounded-full bg-background px-2 py-0.5 text-[14px] font-bold text-muted-foreground">
              ~{task.estimatedMinutes} Min
            </span>
          </div>
        </div>
        {hasGuide && <ChevronRight size={16} color="#5b6377" />}
      </button>
    </div>
  );
}
