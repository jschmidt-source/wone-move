'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAnbieterByKategorie } from '@/lib/anbieter';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useVertraegeStore } from '@/store/vertraegeStore';
import { FilterPillRow } from '@/components/vertraege/FilterPillRow';
import { ProviderCard } from '@/components/vertraege/ProviderCard';
import { AbschlussSheet } from '@/components/vertraege/AbschlussSheet';
import type { Anbieter } from '@/types/vertraege';

export default function VersicherungenPage() {
  const router = useRouter();
  const targetPlz = useOnboardingStore((s) => s.data.targetPlz);
  const markComplete = useVertraegeStore((s) => s.markComplete);
  const [filter, setFilter] = useState<'empfohlen' | 'guenstigste' | 'beliebteste'>('empfohlen');
  const [tab, setTab] = useState<'haftpflicht' | 'hausrat'>('haftpflicht');
  const [selectedAnbieter, setSelectedAnbieter] = useState<Anbieter | null>(null);

  const haftpflichtAnbieter = getAnbieterByKategorie('haftpflicht');
  const hausratAnbieter = getAnbieterByKategorie('hausrat');

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
              Versicherungen vergleichen
            </h1>
            <div className="h-8 w-8" />
          </div>
          {/* PLZ subline */}
          <p className="ml-10 mt-1 text-[14px] font-normal text-muted-foreground">
            PLZ {targetPlz} · ~20 Anbieter
          </p>
          {/* Filter pills */}
          <div className="mt-3">
            <FilterPillRow active={filter} onChange={setFilter} />
          </div>
        </div>

        {/* Haftpflicht / Hausrat Tabs */}
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as 'haftpflicht' | 'hausrat')}
          className="mt-4"
        >
          <TabsList className="flex h-11 w-full border-b border-[#d2d5fc] bg-white">
            <TabsTrigger
              value="haftpflicht"
              className="h-11 flex-1 px-3 text-[14px] font-bold text-muted-foreground data-active:text-primary data-active:shadow-[inset_0_-2px_0_0_#646efb]"
            >
              Haftpflicht
            </TabsTrigger>
            <TabsTrigger
              value="hausrat"
              className="h-11 flex-1 px-3 text-[14px] font-bold text-muted-foreground data-active:text-primary data-active:shadow-[inset_0_-2px_0_0_#646efb]"
            >
              Hausrat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="haftpflicht" className="mt-4 flex flex-col gap-3 px-4">
            {haftpflichtAnbieter.map((a) => (
              <ProviderCard
                key={a.id}
                anbieter={a}
                onAbschliessen={() => setSelectedAnbieter(a)}
              />
            ))}
          </TabsContent>

          <TabsContent value="hausrat" className="mt-4 flex flex-col gap-3 px-4">
            {hausratAnbieter.map((a) => (
              <ProviderCard
                key={a.id}
                anbieter={a}
                onAbschliessen={() => setSelectedAnbieter(a)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <AbschlussSheet
        open={selectedAnbieter !== null}
        anbieter={selectedAnbieter}
        onClose={() => setSelectedAnbieter(null)}
        onComplete={() => {
          markComplete('versicherungen');
          setSelectedAnbieter(null);
        }}
      />
    </div>
  );
}
