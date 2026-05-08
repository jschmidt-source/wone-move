'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';

type FeatureRow = {
  feature: string;
  free: string;
  premium: string;
};

const FEATURES: FeatureRow[] = [
  { feature: 'Checkliste & Zeitplan', free: 'check', premium: 'check' },
  { feature: 'Anleitungen & FAQ', free: 'check', premium: 'check' },
  { feature: 'Verträge abschließen', free: 'check', premium: 'check' },
  { feature: 'Werbung', free: 'Ja', premium: 'Nein' },
  { feature: 'KI Chatbot', free: '3 Fragen', premium: 'Unbegrenzt' },
  { feature: 'Dokumentenspeicher', free: '2 Docs', premium: 'Unbegrenzt' },
  { feature: 'Protokoll-Export', free: 'cross', premium: 'check' },
  { feature: 'Listen teilen', free: 'cross', premium: 'check' },
];

function Cell({ value }: { value: string }) {
  if (value === 'check') {
    return <Check size={18} color="#646efb" />;
  }
  if (value === 'cross') {
    return <X size={18} color="#ef4444" />;
  }
  return (
    <span className="text-[14px]" style={{ color: '#1c2642' }}>
      {value}
    </span>
  );
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed bottom-6 left-4 right-4 z-50 rounded-[12px] px-4 py-3 text-[14px] font-bold text-white"
      style={{ backgroundColor: '#1c2642', boxShadow: '0 4px 16px rgba(28,38,66,0.2)' }}
    >
      {message}
    </div>
  );
}

export default function PremiumPage() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  function handleUpgrade() {
    setToast('Danke! Premium-Funktion folgt in der Vollversion.');
    setTimeout(() => router.back(), 2200);
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {/* Top spacing */}
        <div className="pb-8 pt-16 text-center">
          <h1 className="text-[28px] font-bold leading-[1.15] text-foreground">
            Alles drin. Kein Stress.
          </h1>
          <p className="mt-2 text-[14px] font-normal text-muted-foreground">
            Upgrade auf Premium und hol das Beste aus Wone MOVE heraus.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mb-8 overflow-hidden rounded-[14px] bg-white">
          {/* Column headers */}
          <div className="grid grid-cols-3 border-b border-[#d2d5fc] px-4 py-3">
            <span className="text-[14px] font-bold text-foreground">Feature</span>
            <span className="text-center text-[14px] font-bold text-muted-foreground">Free</span>
            <span className="text-center text-[14px] font-bold" style={{ color: '#646efb' }}>
              Premium
            </span>
          </div>
          {FEATURES.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 items-center px-4 py-3"
              style={{ borderBottom: i < FEATURES.length - 1 ? '1px solid #f6f7f7' : undefined }}
            >
              <span className="text-[13px] font-normal text-foreground">{row.feature}</span>
              <div className="flex justify-center">
                <Cell value={row.free} />
              </div>
              <div className="flex justify-center">
                <Cell value={row.premium} />
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mb-8 rounded-[14px] bg-white p-6 text-center">
          <p className="mb-1 text-[12px] font-normal text-muted-foreground">Nur</p>
          <p className="text-[28px] font-bold leading-[1.15]" style={{ color: '#646efb' }}>
            €2,99<span className="text-[16px]">/Monat</span>
          </p>
          <p className="mt-2 text-[14px] font-normal text-muted-foreground">
            oder{' '}
            <span className="font-bold text-foreground">€19,99/Jahr</span>
            {'  '}
            <span
              className="rounded-full px-2 py-0.5 text-[12px] font-bold"
              style={{ backgroundColor: '#d2d5fc', color: '#646efb' }}
            >
              Spare 44%
            </span>
          </p>
        </div>
      </div>

      {/* CTAs — pinned to bottom */}
      <div
        className="border-t border-[#d2d5fc] bg-white px-4 py-4"
        style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={handleUpgrade}
          className="mb-3 h-[52px] w-full rounded-xl text-[16px] font-bold text-white"
          style={{ backgroundColor: '#646efb' }}
        >
          Jetzt upgraden
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="h-[52px] w-full rounded-xl border border-[#d2d5fc] bg-white text-[16px] font-bold text-muted-foreground"
        >
          Kostenlos weitermachen
        </button>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
