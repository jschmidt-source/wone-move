'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, FileText, Lock, ChevronRight } from 'lucide-react';

const MOCK_DOCS = [
  { name: 'Mietvertrag.pdf', date: '12.03.2026', size: '248 KB' },
  { name: 'Übergabeprotokoll.pdf', date: '01.06.2026', size: '182 KB' },
];

export default function DokumentePage() {
  const router = useRouter();

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#d2d5fc] bg-white px-4 py-3 pt-12">
        <button
          type="button"
          aria-label="Zurück"
          onClick={() => router.back()}
          className="flex h-[36px] w-[36px] items-center justify-center"
        >
          <ChevronLeft size={24} color="#1c2642" />
        </button>
        <h1 className="text-[16px] font-bold text-foreground">Dokumentenspeicher</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-[12px] font-normal text-muted-foreground">
          Free-Version: 2 von 2 Dokumenten gespeichert
        </p>

        {/* 2 Mock doc cards */}
        {MOCK_DOCS.map((doc) => (
          <div
            key={doc.name}
            className="mb-3 flex items-center gap-3 rounded-[14px] bg-white p-4"
          >
            <div
              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px]"
              style={{ backgroundColor: '#d2d5fc' }}
            >
              <FileText size={20} color="#646efb" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[14px] font-bold text-foreground">{doc.name}</p>
              <p className="text-[12px] font-normal text-muted-foreground">
                {doc.date} · {doc.size}
              </p>
            </div>
            <ChevronRight size={16} color="#5b6377" />
          </div>
        ))}

        {/* 3rd slot: Inline Premium-Lock-Card (D-09) */}
        {/* Background #ffffff, dashed border #d2d5fc 2px, tap → /ich/premium */}
        <button
          type="button"
          onClick={() => router.push('/ich/premium')}
          className="flex w-full items-center gap-3 rounded-[14px] bg-white p-4"
          style={{ border: '2px dashed #d2d5fc' }}
        >
          <div
            className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px]"
            style={{ backgroundColor: '#f6f7f7' }}
          >
            <Lock size={20} color="#646efb" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[14px] font-bold text-foreground">Unlimitiert mit Premium speichern</p>
            <p className="text-[12px] font-normal" style={{ color: '#646efb' }}>
              Upgrade →
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
