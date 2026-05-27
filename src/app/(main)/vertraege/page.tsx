'use client';

import { useVertraegeStore } from '@/store/vertraegeStore';
import { VertraegeKachel } from '@/components/vertraege/VertraegeKachel';

export default function VertraegePage() {
  const completed = useVertraegeStore((s) => s.completed);
  const count = useVertraegeStore((s) => s.completedCount());

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        <h1 className="text-[20px] font-bold leading-[1.3] text-foreground">Verträge</h1>

        <p className="mt-4 text-[14px] font-bold text-foreground">
          <span style={{ color: '#20314b' }}>{count}</span> von 4 Verträgen abgeschlossen
        </p>

        {/* 2×2 kachel grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <VertraegeKachel kategorie="strom"          emoji="⚡"  label="Strom"          completed={completed.strom} />
          <VertraegeKachel kategorie="internet"       emoji="🌐" label="Internet"        completed={completed.internet} />
          <VertraegeKachel kategorie="telefon"        emoji="📱" label="Telefon"         completed={completed.telefon} />
          <VertraegeKachel kategorie="versicherungen" emoji="🛡️" label="Versicherungen"  completed={completed.versicherungen} />
        </div>
      </div>
    </div>
  );
}
