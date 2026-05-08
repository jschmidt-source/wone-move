'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  allHref: string;
  children: React.ReactNode; // 3 preview cards passed in by parent
}

export function EntdeckenSection({ title, allHref, children }: Props) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[20px] font-bold leading-[1.3] text-foreground">{title}</h2>
        <Link href={allHref} className="text-[14px] font-bold text-primary">
          Alle anzeigen →
        </Link>
      </div>
      <div
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' } as React.CSSProperties}
      >
        {children}
      </div>
    </section>
  );
}

export function EntdeckenPreviewCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn('shrink-0 rounded-[12px] border border-[#d2d5fc] bg-white p-4', className)}
      style={{ width: 200, scrollSnapAlign: 'start' }}
    >
      {children}
    </div>
  );
}
