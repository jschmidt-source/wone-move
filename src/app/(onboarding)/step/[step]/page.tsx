'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { WeiterButton } from '@/components/onboarding/WeiterButton';
import { TileSelect } from '@/components/onboarding/TileSelect';
import { ToggleList } from '@/components/onboarding/ToggleList';
import { Input } from '@/components/ui/input';

// ─── Step 3 tiles ───────────────────────────────────────────────────────────
const ORG_OPTIONS = [
  { value: 'alleine', label: 'Ich alleine' },
  { value: 'freunde', label: 'Mit Freunden' },
  { value: 'firma',   label: 'Umzugsfirma' },
  { value: 'gemischt', label: 'Gemischt' },
];

// ─── Step 4 tiles ───────────────────────────────────────────────────────────
const PRIORITY_OPTIONS = [
  { value: 'guenstig',   label: 'Günstig',    emoji: '💰' },
  { value: 'schnell',    label: 'Schnell',     emoji: '⚡' },
  { value: 'stressfrei', label: 'Stressfrei',  emoji: '😌' },
  { value: 'nachhaltig', label: 'Nachhaltig',  emoji: '🌱' },
];

// ─── Step 5 toggle items ────────────────────────────────────────────────────
const TOGGLE_ITEMS = [
  { key: 'newApartment',        label: 'Neue Wohnung gefunden' },
  { key: 'transport',           label: 'Transport organisiert' },
  { key: 'electricityInternet', label: 'Strom & Internet geregelt' },
  { key: 'ummeldungPrepared',   label: 'Ummeldung vorbereitet' },
];

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  // T-01-07: Clamp step param — invalid params (e.g. /step/99) render step 1 without error
  const stepParam = Number(params.step);
  const currentStep = (stepParam >= 1 && stepParam <= 5 ? stepParam : 1) as 1 | 2 | 3 | 4 | 5;

  const store = useOnboardingStore();
  const data = store.data;

  // ─── Local state (synced from store on mount) ──────────────────────────
  const [moveDate, setMoveDateLocal] = useState(data.moveDate ?? '');
  const [plz, setPlz] = useState(data.targetPlz);
  const [city, setCity] = useState(data.fromCity);
  const [movingOrg, setMovingOrgLocal] = useState(data.movingOrg);
  const [priority, setPriorityLocal] = useState(data.priority);
  const [alreadyDone, setAlreadyDoneLocal] = useState({ ...data.alreadyDone });

  // Sync local state when navigating back (params change)
  useEffect(() => {
    setMoveDateLocal(data.moveDate ?? '');
    setPlz(data.targetPlz);
    setCity(data.fromCity);
    setMovingOrgLocal(data.movingOrg);
    setPriorityLocal(data.priority);
    setAlreadyDoneLocal({ ...data.alreadyDone });
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── PLZ validation (T-01-06) ──────────────────────────────────────────
  const plzIsValid = plz === '' || (/^\d{5}$/.test(plz));
  const showPlzError = plz.length > 0 && !plzIsValid;

  // ─── Navigation ────────────────────────────────────────────────────────
  function handleWeiter() {
    // Persist current step data to store
    if (currentStep === 1) store.setMoveDate(moveDate);
    if (currentStep === 2) store.setLocation(plz, city);
    if (currentStep === 3) store.setMovingOrg(movingOrg);
    if (currentStep === 4) store.setPriority(priority);
    if (currentStep === 5) {
      // alreadyDone is already updated incrementally via toggle handler
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

  // ─── Disabled logic ────────────────────────────────────────────────────
  const isWeiterDisabled =
    (currentStep === 1 && !moveDate) ||
    (currentStep === 2 && showPlzError) ||
    (currentStep === 3 && !movingOrg) ||
    (currentStep === 4 && !priority);

  // ─── Step titles ───────────────────────────────────────────────────────
  const titles: Record<number, string> = {
    1: 'Wann ziehst du um?',
    2: 'Wohin ziehst du?',
    3: 'Wie organisierst du deinen Umzug?',
    4: 'Was ist dir am wichtigsten?',
    5: 'Was hast du schon erledigt?',
  };

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header with back button and step indicator */}
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

      {/* Screen title */}
      <div className="px-4 pt-6">
        <h1 className="text-[20px] font-bold leading-[1.3] text-foreground">
          {titles[currentStep]}
        </h1>

        {/* Schritt 5 hint text */}
        {currentStep === 5 && (
          <p className="mt-2 text-[14px] font-normal leading-[1.5] text-muted-foreground">
            Keine Sorge — du kannst alles jederzeit ändern.
          </p>
        )}
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">

        {/* ── Step 1: Umzugsdatum ── */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4">
            <input
              type="date"
              value={moveDate}
              onChange={(e) => setMoveDateLocal(e.target.value)}
              placeholder="Datum auswählen"
              className="h-[52px] w-full rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] font-normal text-foreground focus:border-primary focus:outline-none"
            />
            {moveDate && (
              <span className="inline-flex self-start rounded-full bg-[#d2d5fc] px-3 py-1 text-[14px] font-bold text-primary">
                {new Date(moveDate + 'T00:00:00').toLocaleDateString('de-DE', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            )}
            {!moveDate && (
              <p className="text-[14px] text-destructive">
                Bitte wähle dein Umzugsdatum aus.
              </p>
            )}
          </div>
        )}

        {/* ── Step 2: Wohin? ── */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-foreground">
                PLZ der neuen Wohnung
              </label>
              <Input
                type="text"
                inputMode="numeric"
                value={plz}
                onChange={(e) => setPlz(e.target.value)}
                placeholder="z.B. 80331"
                maxLength={5}
                className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] font-normal text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
              {/* T-01-06: PLZ validation error */}
              {showPlzError && (
                <p className="text-[14px] text-destructive">
                  Bitte gib eine gültige PLZ ein (5 Ziffern).
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-foreground">
                Von welcher Stadt?
              </label>
              <Input
                type="text"
                inputMode="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="z.B. Hamburg"
                className="h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px] font-normal text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* ── Step 3: Umzugsorganisation ── */}
        {currentStep === 3 && (
          <TileSelect
            options={ORG_OPTIONS}
            value={movingOrg}
            onChange={(v) => setMovingOrgLocal(v as typeof movingOrg)}
          />
        )}

        {/* ── Step 4: Priorität ── */}
        {currentStep === 4 && (
          <TileSelect
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={(v) => setPriorityLocal(v as typeof priority)}
          />
        )}

        {/* ── Step 5: Hast du bereits? ── */}
        {currentStep === 5 && (
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

      {/* Fixed bottom CTA */}
      <WeiterButton
        label={currentStep === 5 ? 'Fertig' : 'Weiter'}
        onClick={handleWeiter}
        disabled={isWeiterDisabled}
      />
    </div>
  );
}
