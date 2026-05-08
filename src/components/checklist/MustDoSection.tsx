'use client';

import { Task } from '@/types/checklist';
import { ChecklistItem } from './ChecklistItem';

interface Props {
  tasks: Task[];
  isChecked: (id: string) => boolean;
  onToggle: (id: string) => void;
  onNavigate?: (slug: string) => void;
}

export function MustDoSection({ tasks, isChecked, onToggle, onNavigate }: Props) {
  if (tasks.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#fecaca] bg-white">
      <div className="flex h-[52px] items-center justify-between gap-2 border-b border-[#d2d5fc] px-4">
        <span className="text-[14px] font-bold text-foreground">Muss erledigt werden</span>
        <span
          className="rounded-full px-2 py-1 text-[14px] font-bold"
          style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
        >
          Must-Do
        </span>
      </div>
      <div className="flex flex-col">
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
    </div>
  );
}
