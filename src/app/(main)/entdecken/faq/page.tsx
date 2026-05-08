'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { FAQ } from '@/lib/faq';
import { cn } from '@/lib/utils';

export default function FaqPage() {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/entdecken')}
            aria-label="Zurück"
            className="flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={24} color="#1c2642" />
          </button>
          <h1 className="flex-1 text-[20px] font-bold text-foreground">Häufige Fragen</h1>
          <div className="h-8 w-8" />
        </div>

        {/* FAQ Accordion */}
        <div className="mt-4 overflow-hidden rounded-[12px] border border-[#d2d5fc] bg-white">
          {FAQ.map((q, i) => (
            <Collapsible
              key={q.id}
              open={openId === q.id}
              onOpenChange={(o) => setOpenId(o ? q.id : null)}
              className={cn(i < FAQ.length - 1 && 'border-b border-[#d2d5fc]')}
            >
              <CollapsibleTrigger className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-[16px] font-bold text-foreground">
                <span className="flex-1">{q.frage}</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    'shrink-0 text-muted-foreground transition-transform duration-200',
                    openId === q.id && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 text-[16px] font-normal leading-[1.5] text-foreground">
                {q.antwort}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
