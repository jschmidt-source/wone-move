'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import type { Anbieter } from '@/types/vertraege';

interface Props {
  open: boolean;
  anbieter: Anbieter | null;
  onClose: () => void;
  onComplete: () => void;
}

export function AbschlussSheet({ open, anbieter, onClose, onComplete }: Props) {
  const [step, setStep] = useState<'form' | 'success'>('form');

  useEffect(() => {
    if (open) {
      setStep('form');
    }
  }, [open]);

  return (
    <>
      {/* Scrim */}
      {open && (
        <button
          type="button"
          aria-label="Schließen"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[rgba(28,38,66,0.4)]"
        />
      )}
      {/* Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 rounded-t-[16px] bg-white px-4 pb-6 pt-3 transition-transform duration-[250ms] ease-out',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ minHeight: '60vh', paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
      >
        {/* Handle */}
        <div className="mx-auto h-1 w-8 rounded-full bg-[#d2d5fc]" />

        {/* X button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Schließen"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center"
        >
          <X size={24} color="#1c2642" />
        </button>

        {/* Step content with key for fade-in remount */}
        <div key={step} className="animate-in fade-in duration-200">
          {step === 'form' ? (
            anbieter && (
              <>
                {/* Title */}
                <h3 className="mt-6 text-[20px] font-bold text-foreground">Tarif bestätigen</h3>

                {/* Provider summary */}
                <div className="mt-4">
                  <p className="text-[16px] font-bold text-foreground">
                    {anbieter.name} · {anbieter.preisProMonat} €/Monat
                  </p>
                  <p className="mt-1 text-[14px] font-normal text-muted-foreground">
                    {anbieter.laufzeit} · {anbieter.highlights.join(' · ')}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-[#d2d5fc]" />

                {/* Mock inputs */}
                <div className="flex flex-col gap-3">
                  <Input
                    placeholder="Vor- und Nachname"
                    defaultValue="Max Mustermann"
                    readOnly
                    className="pointer-events-none h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] opacity-70"
                  />
                  <Input
                    placeholder="IBAN"
                    defaultValue="DE00 0000 0000 0000 0000 00"
                    readOnly
                    className="pointer-events-none h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] opacity-70"
                  />
                  <Input
                    placeholder="E-Mail-Adresse"
                    defaultValue="max@beispiel.de"
                    readOnly
                    className="pointer-events-none h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] opacity-70"
                  />
                </div>

                {/* Hint */}
                <p className="mt-2 text-[14px] font-normal text-muted-foreground">
                  Keine Sorge — das sind nur Platzhalter für die Vorschau.
                </p>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => setStep('success')}
                  className="mt-6 h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-all duration-100 active:scale-[0.97]"
                >
                  Weiter →
                </button>
              </>
            )
          ) : (
            <div className="mt-12 flex flex-col items-center">
              {/* Success icon */}
              <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#d2d5fc]">
                <CheckCircle2 size={48} className="text-primary" />
              </div>

              {/* Headline */}
              <h3 className="mt-4 text-center text-[20px] font-bold text-foreground">
                Antrag eingegangen!
              </h3>

              {/* Body */}
              <p className="mt-2 text-center text-[16px] font-normal text-muted-foreground">
                {anbieter?.name} bestätigt deinen Vertrag innerhalb von 2 Werktagen per E-Mail.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={onComplete}
                className="mt-8 h-[52px] w-full rounded-xl border-[1.5px] border-[#d2d5fc] bg-white text-[16px] font-bold text-foreground transition-all duration-100 active:scale-[0.97]"
              >
                Zurück zur Übersicht
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
