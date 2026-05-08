'use client';

import { cn } from '@/lib/utils';

export interface SegmentedOption {
  value: string;
  label: string;
}

interface Props {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ options, value, onChange, className }: Props) {
  return (
    <div
      className={cn(
        'flex h-[40px] rounded-[8px] border border-[#d2d5fc] bg-white p-[2px]',
        className
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex-1 rounded-[6px] text-[14px] font-bold transition-colors duration-150',
              selected ? 'bg-primary text-white' : 'bg-transparent text-muted-foreground'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
