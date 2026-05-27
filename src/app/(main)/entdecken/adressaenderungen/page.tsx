'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin } from 'lucide-react';
import { ADRESSAENDERUNGEN } from '@/lib/adressaenderungen';
import { AdressCheckRow } from '@/components/entdecken/AdressCheckRow';

export default function AdressaenderungenPage() {
  const router = useRouter();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const toggle = (id: string) => setChecked((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/entdecken')}
            aria-label="Zurück"
            className="flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={24} color="#20314b" />
          </button>
          <h1 className="flex-1 text-[20px] font-bold text-foreground">Adressänderungen</h1>
          <div className="h-8 w-8" />
        </div>

        {/* Headline card */}
        <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#d2d5fc] bg-white p-4">
          <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-[16px] font-bold text-foreground">Vergiss niemanden — hier sind alle</p>
        </div>

        {/* Progress mini-row */}
        <div className="mt-4">
          <p className="text-[14px] font-normal text-muted-foreground">
            <span className="font-bold text-foreground">{checkedCount}</span> von{' '}
            {ADRESSAENDERUNGEN.length} benachrichtigt
          </p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#d2d5fc]">
            <div
              className="h-full bg-primary transition-[width] duration-200"
              style={{ width: `${(checkedCount / ADRESSAENDERUNGEN.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Checkbox rows */}
        <div className="mt-4 overflow-hidden rounded-[12px] border border-[#d2d5fc] bg-white">
          {ADRESSAENDERUNGEN.map((p) => (
            <AdressCheckRow
              key={p.id}
              partei={p}
              checked={!!checked[p.id]}
              onToggle={() => toggle(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
