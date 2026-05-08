'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function CelebrationPage() {
  const router = useRouter();
  const { data } = useOnboardingStore();

  // ── Confetti on mount ────────────────────────────────────────────────────
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#646efb', '#d2d5fc', '#1c2642', '#ffffff'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#646efb', '#d2d5fc', '#1c2642', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  // ── Format date for German display ──────────────────────────────────────
  const formattedDate = data.moveDate
    ? new Date(data.moveDate + 'T00:00:00').toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Noch nicht festgelegt';

  const fromCity = data.fromCity || 'Unbekannt';

  return (
    <div className="relative flex h-dvh flex-col items-center bg-background px-4">
      {/* Content — centered vertically */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Emoji */}
        <div className="mb-4 text-5xl">🎉</div>

        {/* Headline — 28px, bold, #1c2642 */}
        <h1 className="text-[28px] font-bold leading-[1.2] text-foreground">
          Dein Umzugsplan ist fertig!
        </h1>

        {/* Summary card — 24px below headline */}
        <div className="mt-6 w-full rounded-[14px] bg-white p-4 text-left">
          <p className="text-[16px] font-normal leading-[1.5] text-muted-foreground">
            Umzugsdatum:{' '}
            <span className="font-bold text-foreground">{formattedDate}</span>
            {' · '}Von:{' '}
            <span className="font-bold text-foreground">{fromCity}</span>
            {' · '}
            23 Aufgaben warten auf dich
          </p>
        </div>
      </div>

      {/* CTA — pinned to bottom, 16px from edge, 52px height */}
      <div className="w-full pb-8">
        <button
          onClick={() => router.push('/home')}
          className="h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-transform duration-100 active:scale-[0.97]"
        >
          Los geht&apos;s →
        </button>
      </div>
    </div>
  );
}
