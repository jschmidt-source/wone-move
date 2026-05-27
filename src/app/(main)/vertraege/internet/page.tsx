'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getAnbieterByKategorie, KATEGORIE_META } from '@/lib/anbieter';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useVertraegeStore } from '@/store/vertraegeStore';
import { FilterPillRow } from '@/components/vertraege/FilterPillRow';
import { ProviderCard } from '@/components/vertraege/ProviderCard';
import { AbschlussSheet } from '@/components/vertraege/AbschlussSheet';
import type { Anbieter } from '@/types/vertraege';

const KATEGORIE = 'internet' as const;

export default function InternetPage() {
  const router = useRouter();
  const targetPlz = useOnboardingStore((s) => s.data.targetPlz);
  const markComplete = useVertraegeStore((s) => s.markComplete);
  const [filter, setFilter] = useState<'empfohlen' | 'guenstigste' | 'beliebteste'>('empfohlen');
  const [selectedAnbieter, setSelectedAnbieter] = useState<Anbieter | null>(null);

  const anbieter = getAnbieterByKategorie(KATEGORIE);
  const meta = KATEGORIE_META[KATEGORIE];

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Sticky header */}
        <div className="sticky top-0 z-40 bg-background px-4 pt-4 pb-2">
          {/* Back button row */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push('/vertraege')}
              aria-label="Zurück"
              className="flex h-8 w-8 items-center justify-center"
            >
              <ChevronLeft size={24} color="#20314b" />
            </button>
            <h1 className="flex-1 text-[20px] font-bold text-foreground">
              {meta.headerTitle}
            </h1>
            <div className="h-8 w-8" />
          </div>
          {/* PLZ subline */}
          <p className="ml-10 mt-1 text-[14px] font-normal text-muted-foreground">
            PLZ {targetPlz} · {meta.sublineCount}
          </p>
          {/* Filter pills */}
          <div className="mt-3">
            <FilterPillRow active={filter} onChange={setFilter} />
          </div>
        </div>

        {/* Provider card list */}
        <div className="mt-4 flex flex-col gap-3 px-4">
          {anbieter.map((a) => (
            <ProviderCard
              key={a.id}
              anbieter={a}
              onAbschliessen={() => setSelectedAnbieter(a)}
            />
          ))}
        </div>
      </div>

      <AbschlussSheet
        open={selectedAnbieter !== null}
        anbieter={selectedAnbieter}
        onClose={() => setSelectedAnbieter(null)}
        onComplete={() => {
          markComplete('internet');
          setSelectedAnbieter(null);
        }}
      />
    </div>
  );
}
