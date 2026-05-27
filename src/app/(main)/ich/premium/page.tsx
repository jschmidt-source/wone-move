'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';

type FeatureRow = { feature: string; free: string; premium: string };
type PlanId = 'monthly' | 'pass' | 'yearly';

const FEATURES: FeatureRow[] = [
  { feature: 'Checkliste & Zeitplan',  free: 'check',     premium: 'check' },
  { feature: 'Anleitungen & FAQ',      free: 'check',     premium: 'check' },
  { feature: 'Verträge abschließen',   free: 'check',     premium: 'check' },
  { feature: 'Werbung',                free: 'Ja',        premium: 'Nein' },
  { feature: 'KI Chatbot',             free: '3 Fragen',  premium: 'Unbegrenzt' },
  { feature: 'Dokumentenspeicher',     free: '2 Docs',    premium: 'Unbegrenzt' },
  { feature: 'Protokoll-Export',       free: 'cross',     premium: 'check' },
  { feature: 'Listen teilen',          free: 'cross',     premium: 'check' },
];

const PLANS: { id: PlanId; label: string; price: string; sub: string; badge?: string; highlight?: boolean }[] = [
  {
    id: 'monthly',
    label: 'Monatlich',
    price: '€2,99',
    sub: 'pro Monat · jederzeit kündbar',
  },
  {
    id: 'pass',
    label: 'Umzugs-Pass',
    price: '€5,99',
    sub: 'einmalig · 3 Monate Zugang',
    badge: 'OPTIMAL',
    highlight: true,
  },
  {
    id: 'yearly',
    label: 'Jährlich',
    price: '€29,99',
    sub: 'pro Jahr · spare ~16%',
    badge: 'Spare 16%',
  },
];

function Cell({ value }: { value: string }) {
  if (value === 'check') return <Check size={18} color="#6c75f4" />;
  if (value === 'cross') return <X size={18} color="#ef4444" />;
  return <span className="text-[14px]" style={{ color: '#20314b' }}>{value}</span>;
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className="fixed bottom-6 left-4 right-4 z-50 rounded-[12px] px-4 py-3 text-[14px] font-bold text-white"
      style={{ backgroundColor: '#20314b', boxShadow: '0 4px 16px rgba(31,38,65,0.2)' }}
    >
      {message}
    </div>
  );
}

export default function PremiumPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('pass');
  const [toast, setToast] = useState<string | null>(null);

  function handleUpgrade() {
    setToast('Danke! Premium-Funktion folgt in der Vollversion.');
    setTimeout(() => router.back(), 2200);
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="pb-6 pt-16 text-center">
          <h1 className="text-[28px] font-bold leading-[1.15] text-foreground">Alles drin. Kein Stress.</h1>
          <p className="mt-2 text-[14px] font-normal text-muted-foreground">
            Upgrade auf Premium und hol das Beste aus Wone MOVE heraus.
          </p>
        </div>

        {/* Feature comparison table */}
        <div className="mb-6 overflow-hidden rounded-[14px] bg-white">
          <div className="grid grid-cols-3 border-b border-[#d2d5fc] px-4 py-3">
            <span className="text-[14px] font-bold text-foreground">Feature</span>
            <span className="text-center text-[14px] font-bold text-muted-foreground">Free</span>
            <span className="text-center text-[14px] font-bold" style={{ color: '#6c75f4' }}>Premium</span>
          </div>
          {FEATURES.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 items-center px-4 py-3"
              style={{ borderBottom: i < FEATURES.length - 1 ? '1px solid #fcf6ec' : undefined }}
            >
              <span className="text-[13px] font-normal text-foreground">{row.feature}</span>
              <div className="flex justify-center"><Cell value={row.free} /></div>
              <div className="flex justify-center"><Cell value={row.premium} /></div>
            </div>
          ))}
        </div>

        {/* Plan selector */}
        <div className="mb-6 flex flex-col gap-3">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className="relative flex items-center justify-between rounded-[14px] px-4 py-4 text-left transition-all"
                style={{
                  backgroundColor: plan.highlight ? (isSelected ? '#20314b' : '#f0eeff') : '#ffffff',
                  border: isSelected
                    ? `2px solid ${plan.highlight ? '#20314b' : '#6c75f4'}`
                    : '1.5px solid #d2d5fc',
                }}
              >
                {/* Selection dot */}
                <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ border: `2px solid ${isSelected ? (plan.highlight ? '#ffffff' : '#6c75f4') : '#d2d5fc'}` }}
                >
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: plan.highlight ? '#ffffff' : '#6c75f4' }}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[15px] font-bold"
                      style={{ color: plan.highlight && isSelected ? '#ffffff' : '#20314b' }}
                    >
                      {plan.label}
                    </span>
                    {plan.badge && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                        style={{
                          backgroundColor: plan.highlight ? (isSelected ? '#6c75f4' : '#6c75f4') : '#d2d5fc',
                          color: '#ffffff',
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-0.5 text-[12px] font-normal"
                    style={{ color: plan.highlight && isSelected ? 'rgba(255,255,255,0.75)' : '#5b6377' }}
                  >
                    {plan.sub}
                  </p>
                </div>

                {/* Price */}
                <span
                  className="text-[18px] font-bold"
                  style={{ color: plan.highlight && isSelected ? '#ffffff' : '#6c75f4' }}
                >
                  {plan.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTAs */}
      <div
        className="border-t border-[#d2d5fc] bg-white px-4 py-4"
        style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={handleUpgrade}
          className="mb-3 h-[52px] w-full rounded-xl text-[16px] font-bold text-white"
          style={{ backgroundColor: '#20314b' }}
        >
          Jetzt freischalten
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="h-[52px] w-full rounded-xl border border-[#d2d5fc] bg-white text-[16px] font-bold text-muted-foreground"
        >
          Kostenlos weitermachen
        </button>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
