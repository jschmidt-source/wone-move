'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Helper = 'ja' | 'nein' | 'firma';

const HELPER_OPTIONS: { value: Helper; label: string }[] = [
  { value: 'ja', label: 'Ja' },
  { value: 'nein', label: 'Nein' },
  { value: 'firma', label: 'Umzugsfirma' },
];

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function calcCosts(distance: number, helper: Helper, qm: number) {
  const kartons = roundToNearest(qm * 1.5 * 1.5, 5);

  let transporter: number;
  if (helper === 'firma') {
    transporter = Math.round(distance * 2.5 + 200);
  } else {
    if (distance < 50) transporter = 80;
    else if (distance < 200) transporter = 150;
    else transporter = 250;
    if (helper === 'ja') transporter = Math.round(transporter * 0.7);
  }

  const sonstiges = 50;
  const gesamt = kartons + transporter + sonstiges;
  return {
    kartons,
    transporter,
    sonstiges,
    gesamtMin: Math.max(0, gesamt - 50),
    gesamtMax: gesamt + 100,
  };
}

export default function KostenrechnerPage() {
  const router = useRouter();
  const [distance, setDistance] = useState(100);
  const [helper, setHelper] = useState<Helper>('nein');
  const [qmText, setQmText] = useState('');
  const qm = Number.isFinite(parseInt(qmText, 10)) ? parseInt(qmText, 10) : 0;

  const costs = calcCosts(distance, helper, qm);

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/home')}
            aria-label="Zurück"
            className="flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={24} color="#1c2642" />
          </button>
          <h1 className="flex-1 text-center text-[20px] font-bold text-foreground">Kostenrechner</h1>
          <div className="h-8 w-8" />
        </div>

        {/* Distance */}
        <section className="mt-6">
          <div className="flex items-baseline justify-between">
            <label className="text-[14px] font-bold text-foreground">Entfernung</label>
            <span className="text-[16px] font-bold text-primary">{distance} km</span>
          </div>
          <Slider
            value={[distance]}
            onValueChange={(v) => {
              const arr = v as number[];
              setDistance(arr[0] ?? distance);
            }}
            min={10}
            max={500}
            step={10}
            className="mt-3"
          />
          <div className="mt-1 flex justify-between text-[14px] font-normal text-muted-foreground">
            <span>10 km</span>
            <span>500 km</span>
          </div>
        </section>

        {/* Helper */}
        <section className="mt-6">
          <label className="text-[14px] font-bold text-foreground">Helfer vorhanden?</label>
          <div className="mt-3 flex gap-1">
            {HELPER_OPTIONS.map((opt) => {
              const selected = opt.value === helper;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setHelper(opt.value)}
                  className={cn(
                    'flex-1 rounded-[8px] text-[14px] font-bold transition-colors duration-150',
                    'h-10',
                    selected
                      ? 'bg-primary text-white'
                      : 'border border-[#d2d5fc] bg-white text-foreground'
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* qm input */}
        <section className="mt-6">
          <label className="text-[14px] font-bold text-foreground">Wohnungsgröße</label>
          <div className="relative mt-3">
            <Input
              value={qmText}
              onChange={(e) => setQmText(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="z.B. 42"
              inputMode="numeric"
              className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 pr-10 text-[16px]"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-normal text-muted-foreground">
              qm
            </span>
          </div>
        </section>

        {/* Result */}
        <Card className="mt-6 rounded-[14px] border border-[#d2d5fc] bg-white p-4">
          <p className="text-[14px] font-bold text-muted-foreground">Geschätzte Kosten</p>
          <div className="mt-3 flex flex-col gap-2">
            <Row label="Kartons" value={`€${costs.kartons}`} />
            <Row label="Transporter" value={`€${costs.transporter}`} />
            <Row label="Sonstiges" value={`€${costs.sonstiges}`} />
            <div className="mt-1 flex items-center justify-between border-t border-[#d2d5fc] pt-2">
              <span className="text-[16px] font-bold text-foreground">Gesamt</span>
              <span className="text-[16px] font-bold text-foreground">
                €{costs.gesamtMin}–€{costs.gesamtMax}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px] font-normal text-foreground">{label}</span>
      <span className="text-[14px] font-bold text-foreground">{value}</span>
    </div>
  );
}
