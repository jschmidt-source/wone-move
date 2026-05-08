'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useChecklistStore } from '@/store/checklistStore';
import { TASKS, filterTasks } from '@/lib/tasks';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { FileText, CalendarDays, Calculator } from 'lucide-react';

function deadlineColor(targetDate: Date | null, today: Date): string {
  if (!targetDate) return '#5b6377';
  const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return '#ef4444';
  if (diffDays <= 7) return '#f97316';
  return '#5b6377';
}

function offsetDate(base: Date | null, days: number): Date | null {
  if (!base) return null;
  const d = new Date(base);
  d.setDate(d.getDate() - days);
  return d;
}

function formatDate(d: Date | null): string {
  if (!d) return '—';
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

const TIPS = [
  'Die Ummeldung ist in Deutschland kostenlos — und dauert oft weniger als 15 Minuten.',
  'Dein Vermieter MUSS dir eine Wohnungsgeberbestätigung ausstellen. Das ist gesetzlich Pflicht.',
  'Du kannst viele Verträge direkt mit der neuen Adresse kündigen — kein Extra-Brief nötig.',
];

export default function HomePage() {
  const { data } = useOnboardingStore();
  const { checkedIds, isChecked } = useChecklistStore();

  const today = new Date();
  const moveDateObj = data.moveDate ? new Date(data.moveDate) : null;
  const daysUntilMove = moveDateObj
    ? Math.max(0, Math.ceil((moveDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  const { tasks: visibleTasks } = filterTasks(TASKS, data);
  const visibleIds = new Set(visibleTasks.map((t) => t.id));
  const completedCount = checkedIds.filter((id) => visibleIds.has(id)).length;
  const progressPct = visibleTasks.length === 0 ? 0 : Math.round((completedCount / visibleTasks.length) * 100);

  const nextMustDo = visibleTasks.find((t) => t.isMustDo && !isChecked(t.id)) ?? null;

  const deadlineUmmeldung = offsetDate(moveDateObj, 14);
  const deadlineNachsende = offsetDate(moveDateObj, 7);

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        <div className="space-y-6">

          {/* A. Welcome block */}
          <section>
            <div className="mb-3 flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Wone MOVE"
                width={180}
                height={150}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
            <h1 className="text-[28px] font-bold leading-[1.2] text-foreground">Hey Lea 👋</h1>
            {daysUntilMove !== null ? (
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-[40px] font-bold leading-none text-primary">{daysUntilMove}</span>
                <span className="text-[16px] font-normal text-muted-foreground">
                  Tage bis zu deinem Umzug{data.fromCity ? ` aus ${data.fromCity}` : ''}
                </span>
              </div>
            ) : (
              <p className="mt-2 text-[16px] font-normal text-muted-foreground">Bald geht&apos;s los</p>
            )}
          </section>

          {/* B. Progress section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[14px] font-bold text-muted-foreground">Dein Fortschritt</span>
              <span className="text-[14px] font-bold text-foreground">{progressPct}%</span>
            </div>
            <Progress
              value={progressPct}
              className="h-2 rounded bg-[#d2d5fc] [&>[data-slot=progress-track]]:bg-[#d2d5fc] [&>[data-slot=progress-indicator]]:bg-primary"
            />
          </section>

          {/* C. Nächste Aufgabe */}
          <section>
            <h2 className="mb-3 text-[14px] font-bold text-muted-foreground">Nächste Aufgabe</h2>
            {nextMustDo ? (
              <Link href={nextMustDo.guideSlug ? `/anleitungen/${nextMustDo.guideSlug}` : '/aufgaben'} className="block">
                <Card className="rounded-[14px] border border-[#d2d5fc] bg-white p-4">
                  <p className="text-[16px] font-bold text-foreground">{nextMustDo.title}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
                      ~{nextMustDo.estimatedMinutes} Min
                    </span>
                    <span className="text-[14px] font-bold text-primary">Jetzt erledigen →</span>
                  </div>
                </Card>
              </Link>
            ) : (
              <Card className="rounded-[14px] border border-[#d2d5fc] bg-white p-4">
                <p className="text-[16px] font-bold text-foreground">Alle Pflichtaufgaben erledigt 🎉</p>
              </Card>
            )}
          </section>

          {/* D. Wusstest du schon? */}
          <section>
            <h2 className="mb-3 text-[20px] font-bold leading-[1.3] text-foreground">Wusstest du schon?</h2>
            <div
              className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1"
              style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              {TIPS.map((tip, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-[12px] border border-[#d2d5fc] bg-white p-4"
                  style={{ width: 200, height: 120, scrollSnapAlign: 'start' }}
                >
                  <p className="text-[14px] font-normal leading-[1.5] text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* E. Schnellzugriff */}
          <section>
            <h2 className="mb-3 text-[14px] font-bold text-muted-foreground">Schnellzugriff</h2>
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/vertraege"
                className="flex h-[72px] flex-col items-center justify-center gap-1 rounded-[12px] border border-[#d2d5fc] bg-white"
              >
                <FileText size={20} color="#646efb" />
                <span className="text-[14px] font-bold text-foreground">Verträge</span>
              </Link>
              <Link
                href="/aufgaben"
                className="flex h-[72px] flex-col items-center justify-center gap-1 rounded-[12px] border border-[#d2d5fc] bg-white"
              >
                <CalendarDays size={20} color="#646efb" />
                <span className="text-[14px] font-bold text-foreground">Zeitplan</span>
              </Link>
              <Link
                href="/home/kostenrechner"
                className="flex h-[72px] flex-col items-center justify-center gap-1 rounded-[12px] border border-[#d2d5fc] bg-white"
              >
                <Calculator size={20} color="#646efb" />
                <span className="text-[14px] font-bold text-foreground">Kostenrechner</span>
              </Link>
            </div>
          </section>

          {/* F. Anstehende Fristen */}
          <section>
            <h2 className="mb-3 text-[14px] font-bold text-muted-foreground">Anstehende Fristen</h2>
            <div className="overflow-hidden rounded-[12px] bg-white">
              <div className="flex h-[44px] items-center justify-between border-b border-[#d2d5fc] px-4">
                <span
                  className="rounded-full px-2 py-1 text-[14px] font-bold"
                  style={{ color: deadlineColor(deadlineUmmeldung, today), backgroundColor: '#f6f7f7' }}
                >
                  {formatDate(deadlineUmmeldung)}
                </span>
                <span className="text-[14px] font-normal text-foreground">Ummeldung nicht vergessen</span>
              </div>
              <div className="flex h-[44px] items-center justify-between px-4">
                <span
                  className="rounded-full px-2 py-1 text-[14px] font-bold"
                  style={{ color: deadlineColor(deadlineNachsende, today), backgroundColor: '#f6f7f7' }}
                >
                  {formatDate(deadlineNachsende)}
                </span>
                <span className="text-[14px] font-normal text-foreground">Nachsendeauftrag einrichten</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
