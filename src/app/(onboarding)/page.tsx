'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome');
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-primary">
      <div className="flex flex-col items-center gap-6">
        {/* Wordmark */}
        <span className="text-white font-sans font-bold text-3xl tracking-tight">
          Wone MOVE
        </span>
        {/* Spinning loading ring */}
        <div
          className="h-10 w-10 rounded-full border-4 border-white border-t-transparent animate-spin"
          aria-label="Lädt..."
        />
      </div>
    </div>
  );
}
