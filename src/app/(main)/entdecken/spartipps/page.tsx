'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { SPARTIPPS } from '@/lib/spartipps';

export default function SpartippsPage() {
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
          <h1 className="flex-1 text-[20px] font-bold text-foreground">Spartipps</h1>
          <div className="h-8 w-8" />
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-col gap-6">
          {SPARTIPPS.map((cat) => (
            <section key={cat.id}>
              <h2 className="text-[20px] font-bold text-foreground">
                <span className="mr-1">{cat.emoji}</span>
                {cat.label}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {cat.tipps.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-[12px] border border-[#d2d5fc] bg-white p-4"
                  >
                    <p className="text-[16px] font-normal leading-[1.5] text-foreground">
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
