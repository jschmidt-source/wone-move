'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Info } from 'lucide-react';
import { NOTFALLKONTAKTE } from '@/lib/notfallkontakte';
import { NotfallkontakteRow } from '@/components/entdecken/NotfallkontakteRow';

export default function NotfallkontaktePage() {
  const router = useRouter();

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
            <ChevronLeft size={24} color="#1c2642" />
          </button>
          <h1 className="flex-1 text-[20px] font-bold text-foreground">Notfallkontakte</h1>
          <div className="h-8 w-8" />
        </div>

        {/* Intro text */}
        <p className="mt-2 text-[14px] font-normal text-muted-foreground">
          Speicher diese Nummern — im Notfall zählt jede Sekunde.
        </p>

        {/* Contact rows */}
        <div className="mt-4 overflow-hidden rounded-[12px] border border-[#d2d5fc] bg-white">
          {NOTFALLKONTAKTE.map((c) => (
            <NotfallkontakteRow key={c.id} contact={c} />
          ))}
        </div>

        {/* Regional note */}
        <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#d2d5fc] bg-white p-4">
          <Info size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-[14px] font-normal text-muted-foreground">
            Hinweis: Nummern für Energieversorger und Notdienste können sich je nach Region
            unterscheiden. Im Ernstfall die Nummer deines lokalen Anbieters nutzen.
          </p>
        </div>
      </div>
    </div>
  );
}
