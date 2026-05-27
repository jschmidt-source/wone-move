'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative flex h-dvh flex-col bg-background px-4">
      <div className="flex flex-1 flex-col items-center justify-center pb-32 text-center">
        {/* Logo */}
        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://i.postimg.cc/SjPkHWgC/Wone-Move-Logo.png"
            alt="Wone MOVE"
            className="h-20 w-auto object-contain"
          />
        </div>

        <h1 className="text-[28px] font-bold leading-[1.2] text-foreground">
          Dein erster Auszug.{' '}
          <span className="block">Wir begleiten dich.</span>
        </h1>

        <p className="mt-8 text-[20px] font-bold leading-[1.3] text-muted-foreground">
          Dein persönlicher Umzugsplan in 2 Minuten.
        </p>
      </div>

      <div className="pb-8">
        <Button
          onClick={() => router.push('/step/1')}
          className="h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-transform duration-100 active:scale-[0.97]"
        >
          Jetzt starten
        </Button>
      </div>
    </div>
  );
}
