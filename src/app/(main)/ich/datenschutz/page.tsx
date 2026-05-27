'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function DatenschutzPage() {
  const router = useRouter();

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex items-center gap-3 border-b border-[#d2d5fc] bg-white px-4 py-3 pt-12">
        <button
          type="button"
          aria-label="Zurück"
          onClick={() => router.back()}
          className="flex h-[36px] w-[36px] items-center justify-center"
        >
          <ChevronLeft size={24} color="#20314b" />
        </button>
        <h1 className="text-[16px] font-bold text-foreground">Datenschutz</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="text-[14px] font-normal text-muted-foreground">
          Datenschutzerklärung folgt in der Vollversion.
        </p>
      </div>
    </div>
  );
}
