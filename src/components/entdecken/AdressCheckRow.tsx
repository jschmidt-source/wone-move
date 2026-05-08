'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Adresspartei } from '@/types/vertraege';

interface Props {
  partei: Adresspartei;
  checked: boolean;
  onToggle: () => void;
}

export function AdressCheckRow({ partei, checked, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className="flex h-14 w-full items-center gap-3 border-b border-[#d2d5fc] px-4 text-left last:border-b-0"
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-150',
          checked ? 'border-primary bg-primary' : 'border-[#d2d5fc] bg-white'
        )}
      >
        {checked && <Check size={14} className="text-white" strokeWidth={3} />}
      </span>
      <span className="text-[16px] font-normal text-foreground">{partei.label}</span>
    </button>
  );
}
