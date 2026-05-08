'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Task, CategoryMeta } from '@/types/checklist';
import { ChecklistItem } from './ChecklistItem';
import { cn } from '@/lib/utils';

interface Props {
  category: CategoryMeta;
  tasks: Task[];
  isChecked: (id: string) => boolean;
  onToggle: (id: string) => void;
  onNavigate?: (slug: string) => void;
}

export function CategorySection({ category, tasks, isChecked, onToggle, onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const completed = tasks.filter((t) => isChecked(t.id)).length;
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#d2d5fc] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[52px] w-full items-center justify-between gap-2 px-4"
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block h-2 w-2 rounded-full"
            style={{ backgroundColor: category.colorHex }}
          />
          <span className="text-[16px] font-bold text-foreground">{category.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-normal text-muted-foreground">
            {completed}/{tasks.length}
          </span>
          <ChevronDown
            size={20}
            color="#5b6377"
            className={cn('transition-transform duration-200', open && 'rotate-180')}
          />
        </div>
      </button>
      {open && (
        <div className="flex flex-col border-t border-[#d2d5fc]">
          {tasks.map((t) => (
            <ChecklistItem
              key={t.id}
              task={t}
              checked={isChecked(t.id)}
              onToggle={onToggle}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
