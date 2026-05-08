'use client';

import { Task, BucketMeta, TimelineBucketId } from '@/types/checklist';
import { ChecklistItem } from '@/components/checklist/ChecklistItem';

function bucketRowColor(
  bucketId: TimelineBucketId,
  checked: boolean,
  today: Date,
  moveDate: Date | null
): string {
  if (checked) return '#22c55e';
  if (!moveDate) return '#d2d5fc';
  const diffDays = Math.ceil((moveDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (bucketId === 'soon' && diffDays <= 7 && diffDays >= 0) return '#f97316';
  if (bucketId === 'moving-day' && Math.abs(diffDays) <= 1) return '#f97316';
  if (bucketId === 'after' && diffDays < 0) return '#ef4444';
  return '#d2d5fc';
}

interface Props {
  bucket: BucketMeta;
  tasks: Task[];
  isChecked: (id: string) => boolean;
  onToggle: (id: string) => void;
  onNavigate?: (slug: string) => void;
  today: Date;
  moveDate: Date | null;
}

export function TimelineBucketSection({ bucket, tasks, isChecked, onToggle, onNavigate, today, moveDate }: Props) {
  return (
    <section>
      <div className="mb-2 flex h-[52px] items-center justify-between px-1">
        <h3 className="text-[20px] font-bold leading-[1.3] text-foreground">{bucket.label}</h3>
        <span className="rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((t) => {
          const checked = isChecked(t.id);
          const color = bucketRowColor(bucket.id, checked, today, moveDate);
          return (
            <div
              key={t.id}
              className="overflow-hidden rounded-[10px] bg-white"
              style={{ borderLeft: `4px solid ${color}` }}
            >
              <ChecklistItem
                task={t}
                checked={checked}
                onToggle={onToggle}
                onNavigate={onNavigate}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
