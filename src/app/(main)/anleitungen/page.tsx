'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { GUIDES } from '@/lib/guides';
import { CATEGORIES } from '@/lib/tasks';
import { cn } from '@/lib/utils';

export default function AnleitungenBrowserPage() {
  const guides = Object.values(GUIDES);
  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        <h1 className="text-[20px] font-bold leading-[1.3] text-foreground">Anleitungen</h1>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {guides.map((g) => {
            const cat = CATEGORIES.find((c) => c.id === g.category);
            return (
              <Link key={g.slug} href={`/anleitungen/${g.slug}`}>
                <Card
                  className={cn(
                    'flex h-full flex-col gap-2 rounded-[12px] border border-[#d2d5fc] bg-white p-4',
                    !g.isFullyAuthored && 'opacity-85'
                  )}
                >
                  <div className="flex items-center gap-1">
                    <span
                      aria-hidden
                      className="block h-2 w-2 rounded-full"
                      style={{ backgroundColor: cat?.colorHex ?? '#d2d5fc' }}
                    />
                    <span className="text-[14px] font-bold text-muted-foreground">
                      {cat?.label ?? '—'}
                    </span>
                  </div>
                  <p className="text-[16px] font-bold text-foreground line-clamp-2">{g.title}</p>
                  <div className="mt-auto flex flex-wrap gap-1">
                    <span className="rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
                      ~{g.estimatedMinutes} Min
                    </span>
                    <span className="rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
                      {g.difficulty}
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
