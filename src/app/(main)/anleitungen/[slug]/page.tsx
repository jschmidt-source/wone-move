'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, FileText, AlertTriangle, MapPin } from 'lucide-react';
import { GUIDES, cityFromPlz } from '@/lib/guides';
import { CATEGORIES } from '@/lib/tasks';
import { GuideStepList } from '@/components/guide/GuideStepList';
import { useChecklistStore } from '@/store/checklistStore';
import { useOnboardingStore } from '@/store/onboardingStore';

const SLUG_TO_TASK_ID: Record<string, string> = {
  ummeldung: 'ummeldung-buergeramt',
  rundfunkbeitrag: 'rundfunkbeitrag-anmelden',
  nachsendeauftrag: 'nachsendeauftrag',
  hausrat: 'hausrat-pruefen',
  'strom-wechseln': 'stromanbieter-waehlen',
  'konto-ummelden': 'girokonto-ummelden',
};

export default function GuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';
  const guide = GUIDES[slug];

  const { toggle, isChecked } = useChecklistStore();
  const { data } = useOnboardingStore();

  function handleBack() {
    router.back();
  }

  function handleMarkDone() {
    const taskId = SLUG_TO_TASK_ID[slug];
    if (taskId && !isChecked(taskId)) toggle(taskId);
    router.back();
  }

  if (!guide) {
    return (
      <div className="flex h-dvh flex-col bg-background">
        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
          <button
            type="button"
            onClick={handleBack}
            className="mt-3 flex items-center gap-1 text-[14px] font-bold text-muted-foreground"
            aria-label="Zurück"
          >
            <ChevronLeft size={20} /> Zurück
          </button>
          <h1 className="mt-4 text-[20px] font-bold text-foreground">Anleitung nicht verfügbar</h1>
          <p className="mt-2 text-[16px] text-muted-foreground">
            Diese Anleitung existiert nicht oder wird noch erstellt.
          </p>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === guide.category);

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Zurück"
            className="flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={24} color="#1c2642" />
          </button>
          <h1 className="flex-1 truncate text-[20px] font-bold leading-[1.3] text-foreground">
            {guide.title}
          </h1>
        </div>

        {/* Meta row */}
        <div className="mt-3 flex flex-wrap gap-1">
          <span className="flex items-center gap-1 rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
            <span aria-hidden className="block h-2 w-2 rounded-full" style={{ backgroundColor: cat?.colorHex ?? '#d2d5fc' }} />
            {cat?.label}
          </span>
          <span className="rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
            ~{guide.estimatedMinutes} Min
          </span>
          <span className="rounded-full bg-background px-2 py-1 text-[14px] font-bold text-muted-foreground">
            {guide.difficulty}
          </span>
        </div>

        {!guide.isFullyAuthored ? (
          <p className="mt-6 text-[16px] text-muted-foreground">
            Diese Anleitung wird bald verfügbar sein.
          </p>
        ) : (
          <>
            {/* Dokumente */}
            {guide.documents && guide.documents.length > 0 && (
              <div className="mt-4 rounded-[12px] border border-[#d2d5fc] bg-white p-4" style={{ borderLeft: '4px solid #646efb' }}>
                <div className="flex items-center gap-2">
                  <FileText size={16} color="#646efb" />
                  <span className="text-[14px] font-bold text-foreground">Benötigte Dokumente</span>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {guide.documents.map((d) => (
                    <li key={d} className="text-[14px] text-foreground">
                      <span style={{ color: '#646efb' }}>• </span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {guide.steps && guide.steps.length > 0 && (
              <div className="mt-6">
                <GuideStepList steps={guide.steps} />
              </div>
            )}

            {/* Warning */}
            {guide.warning && (
              <div
                className="mt-6 rounded-[8px] p-4"
                style={{ backgroundColor: '#fff7ed', borderLeft: '4px solid #f97316' }}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} color="#f97316" />
                  <div>
                    <p className="text-[14px] font-bold" style={{ color: '#f97316' }}>{guide.warning.title}</p>
                    <p className="mt-1 text-[14px] text-muted-foreground">{guide.warning.body}</p>
                  </div>
                </div>
              </div>
            )}

            {/* City link — Ummeldung only (D-09 / GUIDE-03) */}
            {slug === 'ummeldung' && (
              <a
                href="#"
                className="mt-4 flex h-[52px] items-center gap-2 rounded-[12px] border border-[#d2d5fc] bg-white px-4"
                onClick={(e) => e.preventDefault()}
              >
                <MapPin size={20} color="#646efb" />
                <span className="text-[14px] font-bold text-primary">
                  Zum Bürgeramt {cityFromPlz(data.targetPlz)} →
                </span>
              </a>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleMarkDone}
                className="h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-all duration-100 active:scale-[0.97]"
              >
                Als erledigt markieren ✓
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="h-[52px] w-full rounded-xl border-[1.5px] border-[#d2d5fc] bg-white text-[16px] font-bold text-foreground"
              >
                ← Zurück
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
