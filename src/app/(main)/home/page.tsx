'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useChecklistStore } from '@/store/checklistStore';
import { TASKS, filterTasks } from '@/lib/tasks';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { HouseProgress } from '@/components/home/HouseProgress';
import { FileText, CalendarDays, Calculator, BookOpen, Info } from 'lucide-react';

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

const QUICK_LINKS = [
  { href: '/vertraege',         Icon: FileText,    label: 'Verträge' },
  { href: '/anleitungen',       Icon: BookOpen,    label: 'Anleitungen' },
  { href: '/aufgaben',          Icon: CalendarDays, label: 'Zeitplan' },
  { href: '/home/kostenrechner', Icon: Calculator,  label: 'Kostenrechner' },
];

export default function HomePage() {
  const { data } = useOnboardingStore();
  const { checkedIds, isChecked } = useChecklistStore();
  const [showInfo, setShowInfo] = useState(false);
  const [tipsIndex, setTipsIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleTipsScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    setTipsIndex(Math.round(scrollLeft / clientWidth));
  };

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
        <div className="space-y-5">

          {/* A. Welcome block */}
          <section>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[28px] font-bold leading-[1.2] text-foreground">Hey Lea 👋</h1>
                {daysUntilMove !== null ? (
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-[38px] font-bold leading-none" style={{ color: '#1e2f4b' }}>{daysUntilMove}</span>
                    <span className="text-[14px] font-normal text-muted-foreground">
                      Tage bis zum Umzug{data.fromCity ? ` aus ${data.fromCity}` : ''}
                    </span>
                  </div>
                ) : (
                  <p className="mt-1 text-[16px] font-normal text-muted-foreground">Bald geht&apos;s los</p>
                )}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.postimg.cc/SjPkHWgC/Wone-Move-Logo.png"
                alt="Wone MOVE"
                className="h-16 w-auto object-contain"
              />
            </div>
          </section>

          {/* B+C. Fortschritt + Gamification combined */}
          <section>
            <div className="rounded-[16px] border border-[#d2d5fc] bg-white p-4">
              {/* Header row */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[14px] font-bold" style={{ color: '#1e2f4b' }}>Dein Fortschritt</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold" style={{ color: '#6c75f4' }}>{progressPct}%</span>
                  <button
                    type="button"
                    aria-label="Info"
                    onClick={() => setShowInfo((v) => !v)}
                    className="flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#d2d5fc] bg-background"
                  >
                    <Info size={11} color="#5b6377" />
                  </button>
                </div>
              </div>

              {/* Info tooltip */}
              {showInfo && (
                <div className="mb-3 rounded-[10px] bg-[#d2d5fc] px-3 py-2">
                  <p className="text-[13px] leading-[1.4]" style={{ color: '#1e2f4b' }}>
                    Durch das Abschließen von Aufgaben kannst du diese Bruchbude noch retten. 🏚️
                  </p>
                </div>
              )}

              {/* Progress bar + House side by side — house rechts */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress
                    value={progressPct}
                    className="h-3 rounded-full bg-[#d2d5fc] [&>[data-slot=progress-indicator]]:bg-[#6c75f4]"
                  />
                </div>
                <div className="shrink-0" style={{ width: 76, height: 60 }}>
                  <HouseProgress progressPct={progressPct} />
                </div>
              </div>
            </div>
          </section>

          {/* D. Nächste Aufgabe */}
          <section>
            <h2 className="mb-3 text-[14px] font-bold" style={{ color: '#1e2f4b' }}>Nächste Aufgabe</h2>
            {nextMustDo ? (
              <Link href={nextMustDo.guideSlug ? `/anleitungen/${nextMustDo.guideSlug}` : '/aufgaben'} className="block">
                <Card className="rounded-[14px] border border-[#d2d5fc] bg-white p-4">
                  <p className="text-[16px] font-bold text-foreground">{nextMustDo.title}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
                      ~{nextMustDo.estimatedMinutes} Min
                    </span>
                    <span className="text-[14px] font-bold" style={{ color: '#6c75f4' }}>Jetzt erledigen →</span>
                  </div>
                </Card>
              </Link>
            ) : (
              <Card className="rounded-[14px] border border-[#d2d5fc] bg-white p-4">
                <p className="text-[16px] font-bold text-foreground">Alle Pflichtaufgaben erledigt 🎉</p>
              </Card>
            )}
          </section>

          {/* E. Schnellzugriff — 2×2 grid */}
          <section>
            <h2 className="mb-3 text-[14px] font-bold" style={{ color: '#1e2f4b' }}>Schnellzugriff</h2>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_LINKS.map(({ href, Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-[12px] bg-white border border-[#d2d5fc]"
                >
                  <div
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px]"
                    style={{ backgroundColor: 'rgba(30, 47, 75, 0.09)' }}
                  >
                    <Icon size={16} color="#1e2f4b" />
                  </div>
                  <span className="text-[13px] font-bold text-foreground">{label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* F. Anstehende Fristen */}
          <section>
            <h2 className="mb-3 text-[14px] font-bold" style={{ color: '#1e2f4b' }}>Anstehende Fristen</h2>
            <div className="overflow-hidden rounded-[12px] bg-white">
              <div className="flex h-[44px] items-center justify-between border-b border-[#d2d5fc] px-4">
                <span
                  className="rounded-full px-2 py-1 text-[14px] font-bold"
                  style={{ color: deadlineColor(deadlineUmmeldung, today), backgroundColor: '#fcf6ec' }}
                >
                  {formatDate(deadlineUmmeldung)}
                </span>
                <span className="text-[14px] font-normal text-foreground">Ummeldung nicht vergessen</span>
              </div>
              <div className="flex h-[44px] items-center justify-between px-4">
                <span
                  className="rounded-full px-2 py-1 text-[14px] font-bold"
                  style={{ color: deadlineColor(deadlineNachsende, today), backgroundColor: '#fcf6ec' }}
                >
                  {formatDate(deadlineNachsende)}
                </span>
                <span className="text-[14px] font-normal text-foreground">Nachsendeauftrag einrichten</span>
              </div>
            </div>
          </section>

          {/* G. Wusstest du schon? — full-width snap slider with dots */}
          <section>
            <h2 className="mb-3 text-[14px] font-bold" style={{ color: '#1e2f4b' }}>Wusstest du schon?</h2>
            <div
              ref={sliderRef}
              className="-mx-4 overflow-x-auto scrollbar-none"
              style={{ scrollSnapType: 'x mandatory' }}
              onScroll={handleTipsScroll}
            >
              <div className="flex">
                {TIPS.map((tip, i) => (
                  <div
                    key={i}
                    className="w-screen shrink-0 px-4"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className="rounded-[12px] border border-[#d2d5fc] bg-white p-4">
                      <p className="text-[14px] font-normal leading-[1.6] text-foreground">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-2">
              {TIPS.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === tipsIndex ? 18 : 6,
                    height: 6,
                    backgroundColor: i === tipsIndex ? '#1e2f4b' : '#d2d5fc',
                  }}
                />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
