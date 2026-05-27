'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { WeiterButton } from '@/components/onboarding/WeiterButton';
import { TileSelect } from '@/components/onboarding/TileSelect';
import { ToggleList } from '@/components/onboarding/ToggleList';
import { Input } from '@/components/ui/input';

// ─── Step 2: Umzugsorganisation (multi-select) ───────────────────────────────
const ORG_OPTIONS = [
  { value: 'alleine',  label: 'Ich alleine' },
  { value: 'freunde',  label: 'Mit Freunden' },
  { value: 'firma',    label: 'Umzugsfirma' },
  { value: 'familie',  label: 'Familie hilft mir' },
];

// ─── Step 3: Priorität ───────────────────────────────────────────────────────
const PRIORITY_OPTIONS = [
  { value: 'guenstig',   label: 'Günstig',    emoji: '💰' },
  { value: 'schnell',    label: 'Schnell',     emoji: '⚡' },
  { value: 'stressfrei', label: 'Stressfrei',  emoji: '🍵' },
  { value: 'nachhaltig', label: 'Nachhaltig',  emoji: '🌱' },
];

// ─── Step 4: Erledigtes ──────────────────────────────────────────────────────
const TOGGLE_ITEMS = [
  { key: 'newApartment',        label: 'Neue Wohnung gefunden' },
  { key: 'transport',           label: 'Transport organisiert' },
  { key: 'electricityInternet', label: 'Strom- & Internetverträge abgeschlossen' },
  { key: 'ummeldungPrepared',   label: 'Ummeldung vorbereitet' },
];

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  const stepParam = Number(params.step);
  const currentStep = (stepParam >= 1 && stepParam <= 4 ? stepParam : 1) as 1 | 2 | 3 | 4;

  const store = useOnboardingStore();
  const data = store.data;

  // ─── Local state ────────────────────────────────────────────────────────
  const [moveDate, setMoveDateLocal] = useState(data.moveDate ?? '');
  const [plz, setPlz] = useState(data.targetPlz);
  const [city, setCity] = useState(data.fromCity);
  const [movingOrg, setMovingOrgLocal] = useState<string[]>(data.movingOrg ?? []);
  const [priority, setPriorityLocal] = useState(data.priority);
  const [alreadyDone, setAlreadyDoneLocal] = useState({ ...data.alreadyDone });

  // Sync local state when navigating back
  useEffect(() => {
    setMoveDateLocal(data.moveDate ?? '');
    setPlz(data.targetPlz);
    setCity(data.fromCity);
    setMovingOrgLocal(data.movingOrg ?? []);
    setPriorityLocal(data.priority);
    setAlreadyDoneLocal({ ...data.alreadyDone });
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── PLZ validation ─────────────────────────────────────────────────────
  const plzIsValid = plz === '' || /^\d{5}$/.test(plz);
  const showPlzError = plz.length > 0 && !plzIsValid;

  // ─── Navigation ─────────────────────────────────────────────────────────
  function handleWeiter() {
    if (currentStep === 1) { store.setMoveDate(moveDate); store.setLocation(plz, city); }
    if (currentStep === 2) store.setMovingOrg(movingOrg);
    if (currentStep === 3) store.setPriority(priority);
    if (currentStep === 4) {
      store.complete();
      router.push('/celebration');
      return;
    }
    router.push(`/step/${currentStep + 1}`);
  }

  function handleBack() {
    if (currentStep === 1) { router.push('/welcome'); return; }
    router.push(`/step/${currentStep - 1}`);
  }

  // ─── Disabled logic ─────────────────────────────────────────────────────
  const isWeiterDisabled =
    (currentStep === 1 && (!moveDate || showPlzError)) ||
    (currentStep === 2 && movingOrg.length === 0) ||
    (currentStep === 3 && !priority);

  // ─── Step titles ────────────────────────────────────────────────────────
  const titles: Record<number, string> = {
    1: 'Wann und wohin ziehst du?',
    2: 'Wie organisierst du deinen Umzug?',
    3: 'Was ist dir am wichtigsten?',
    4: 'Was hast du schon erledigt?',
  };

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <div className="px-4">
        <button
          onClick={handleBack}
          className="mt-3 flex items-center gap-1 text-[14px] font-bold text-muted-foreground"
          aria-label="Zurück"
        >
          ← Zurück
        </button>
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Title */}
      <div className="px-4 pt-6">
        <h1 className="text-[20px] font-bold leading-[1.3] text-foreground">
          {titles[currentStep]}
        </h1>
        {currentStep === 4 && (
          <p className="mt-2 text-[14px] font-normal leading-[1.5] text-muted-foreground">
            Keine Sorge — du kannst alles jederzeit ändern.
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">

        {/* ── Step 1: Datum + Wohin? ── */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-5">
            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-foreground">Wann ist dein Umzugsdatum?</label>
              <input
                type="date"
                value={moveDate}
                onChange={(e) => setMoveDateLocal(e.target.value)}
                className="h-[52px] w-full rounded-[10px] border-[1.5px] border-[#d2d5fc] bg-white px-4 text-[16px] font-normal text-foreground focus:border-primary focus:outline-none"
              />
              {moveDate && (
                <span className="inline-flex self-start rounded-full bg-[#d2d5fc] px-3 py-1 text-[14px] font-bold text-primary">
                  {new Date(moveDate + 'T00:00:00').toLocaleDateString('de-DE', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </span>
              )}
            </div>

            {/* PLZ */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-foreground">PLZ der neuen Wohnung</label>
              <Input
                type="text"
                inputMode="numeric"
                value={plz}
                onChange={(e) => setPlz(e.target.value)}
                placeholder="z.B. 80331"
                maxLength={5}
                className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] bg-white px-4 text-[16px] font-normal text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
              {showPlzError && (
                <p className="text-[14px] text-destructive">Bitte gib eine gültige PLZ ein (5 Ziffern).</p>
              )}
            </div>

            {/* From city */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-foreground">Aus welcher Stadt kommst du?</label>
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="z.B. Hamburg"
                className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] bg-white px-4 text-[16px] font-normal text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* ── Step 2: Umzugsorganisation (multi-select) ── */}
        {currentStep === 2 && (
          <TileSelect
            options={ORG_OPTIONS}
            value={movingOrg}
            onChange={(v) => setMovingOrgLocal(v as string[])}
            multiSelect
            hint="Mehrfachauswahl möglich"
          />
        )}

        {/* ── Step 3: Priorität ── */}
        {currentStep === 3 && (
          <TileSelect
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={(v) => setPriorityLocal(v as typeof priority)}
          />
        )}

        {/* ── Step 4: Schon erledigt? ── */}
        {currentStep === 4 && (
          <ToggleList
            items={TOGGLE_ITEMS}
            values={alreadyDone}
            onChange={(key, value) => {
              const updated = { ...alreadyDone, [key]: value };
              setAlreadyDoneLocal(updated);
              store.setAlreadyDone(key as keyof typeof alreadyDone, value);
            }}
          />
        )}
      </div>

      {/* CTA */}
      <WeiterButton
        label={currentStep === 4 ? 'Fertig' : 'Weiter'}
        onClick={handleWeiter}
        disabled={isWeiterDisabled}
      />
    </div>
  );
}
