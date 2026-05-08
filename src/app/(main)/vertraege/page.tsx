'use client';

import { Info } from 'lucide-react';
import { useVertraegeStore } from '@/store/vertraegeStore';
import { VertraegeKachel } from '@/components/vertraege/VertraegeKachel';

export default function VertraegePage() {
  const completed = useVertraegeStore((s) => s.completed);
  const count = useVertraegeStore((s) => s.completedCount());

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        <h1 className="text-[20px] font-bold leading-[1.3] text-foreground">
          Verträge
        </h1>

        {/* Intro transparency card */}
        <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#d2d5fc] bg-white p-4">
          <Info size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-[14px] font-normal text-muted-foreground">
            Schließ deine Verträge direkt hier ab. Wir erhalten eine kleine Provision — für dich entstehen keine Mehrkosten. ✓
          </p>
        </div>

        {/* Progress row */}
        <p className="mt-6 text-[14px] font-bold text-foreground">
          <span className="text-primary">{count}</span> von 4 Verträgen abgeschlossen
        </p>

        {/* 2x2 kachel grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <VertraegeKachel
            kategorie="strom"
            emoji="⚡"
            label="Strom"
            completed={completed.strom}
          />
          <VertraegeKachel
            kategorie="internet"
            emoji="🌐"
            label="Internet"
            completed={completed.internet}
          />
          <VertraegeKachel
            kategorie="telefon"
            emoji="📱"
            label="Telefon"
            completed={completed.telefon}
          />
          <VertraegeKachel
            kategorie="versicherungen"
            emoji="🛡️"
            label="Versicherungen"
            completed={completed.versicherungen}
          />
        </div>
      </div>
    </div>
  );
}
