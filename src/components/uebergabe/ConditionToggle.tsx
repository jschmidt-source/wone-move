'use client';

import { cn } from '@/lib/utils';

export type ConditionState = 'gut' | 'mangel' | null;

interface Props {
  value: ConditionState;
  onChange: (next: ConditionState) => void;
}

export function ConditionToggle({ value, onChange }: Props) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={() => onChange(value === 'gut' ? null : 'gut')}
        className={cn(
          'h-8 w-[68px] rounded-[8px] text-[14px] font-bold',
          value === 'gut'
            ? 'text-white'
            : 'border border-[#d2d5fc] bg-background text-muted-foreground'
        )}
        style={value === 'gut' ? { backgroundColor: '#22c55e' } : undefined}
      >
        Gut
      </button>
      <button
        type="button"
        onClick={() => onChange(value === 'mangel' ? null : 'mangel')}
        className={cn(
          'h-8 w-[68px] rounded-[8px] text-[14px] font-bold',
          value === 'mangel'
            ? 'text-white'
            : 'border border-[#d2d5fc] bg-background text-muted-foreground'
        )}
        style={value === 'mangel' ? { backgroundColor: '#ef4444' } : undefined}
      >
        Mangel
      </button>
    </div>
  );
}
