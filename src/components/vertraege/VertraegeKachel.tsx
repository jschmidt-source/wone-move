'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  kategorie: 'strom' | 'internet' | 'telefon' | 'versicherungen';
  emoji: string;
  label: string;
  completed: boolean;
}

export function VertraegeKachel({ kategorie, emoji, label, completed }: Props) {
  return (
    <Link href={`/vertraege/${kategorie}`}>
      <div
        className={[
          'relative flex h-[88px] flex-col items-center justify-center gap-1 rounded-[14px] bg-white p-3 transition-transform active:scale-[0.97]',
          completed
            ? 'border-2 border-[#22c55e]'
            : 'border-[1.5px] border-[#d2d5fc]',
        ].join(' ')}
      >
        <span className="text-[24px] leading-none">{emoji}</span>
        <span className="text-[14px] font-bold text-foreground">{label}</span>
        {completed && (
          <CheckCircle2
            size={16}
            className="absolute right-2 bottom-2 text-[#22c55e]"
          />
        )}
      </div>
    </Link>
  );
}
