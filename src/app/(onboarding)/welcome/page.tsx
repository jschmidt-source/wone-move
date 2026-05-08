'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative flex h-dvh flex-col bg-background px-4">
      {/* Content block — vertically centered in upper 2/3 */}
      <div className="flex flex-1 flex-col items-center justify-center pb-32 text-center">
        {/* App icon / logo mark */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <span className="text-3xl">🏠</span>
        </div>

        {/* Headline — 28px, weight 700, #1c2642 */}
        <h1 className="text-[28px] font-bold leading-[1.2] text-foreground">
          Dein erster Auszug.{' '}
          <span className="block">Wir begleiten dich.</span>
        </h1>

        {/* Subline — 20px, weight 700, #5b6377 — 32px below headline block */}
        <p className="mt-8 text-[20px] font-bold leading-[1.3] text-muted-foreground">
          Dein persönlicher Umzugsplan in 2 Minuten.
        </p>
      </div>

      {/* CTA — pinned to lower third with 16px margin, 52px height, #646efb */}
      <div className="pb-8">
        <Button
          onClick={() => router.push('/step/1')}
          className="h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white active:scale-[0.97] transition-transform duration-100"
        >
          Jetzt starten
        </Button>
      </div>
    </div>
  );
}
