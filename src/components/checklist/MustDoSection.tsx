'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Task } from '@/types/checklist';
import { ChecklistItem } from './ChecklistItem';

interface Props {
  tasks: Task[];
  isChecked: (id: string) => boolean;
  onToggle: (id: string) => void;
  onNavigate?: (slug: string) => void;
}

export function MustDoSection({ tasks, isChecked, onToggle, onNavigate }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  if (tasks.length === 0) return null;

  const doneCount = tasks.filter((t) => isChecked(t.id)).length;

  return (
    <div
      className="overflow-hidden rounded-[12px] bg-white"
      style={{ border: '1.5px solid #20314b' }}
    >
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-[52px] w-full items-center justify-between gap-2 px-4"
        style={{ borderBottom: collapsed ? 'none' : '1px solid #d2d5fc' }}
      >
        {/* Left: WICHTIG badge + counter */}
        <div className="flex items-center gap-2">
          <span
            className="rounded-[6px] px-2 py-0.5 text-[12px] font-bold tracking-wide text-white"
            style={{ backgroundColor: '#20314b' }}
          >
            WICHTIG
          </span>
          <span className="text-[13px] font-normal text-muted-foreground">
            {doneCount}/{tasks.length} erledigt
          </span>
        </div>

        {/* Right: Must-Do tag + chevron */}
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[12px] font-bold"
            style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}
          >
            Must-Do
          </span>
          <ChevronDown
            size={18}
            color="#5b6377"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          />
        </div>
      </button>

      {!collapsed && (
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
      )}
    </div>
  );
}
