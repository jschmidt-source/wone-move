'use client';

type FilterOption = 'empfohlen' | 'guenstigste' | 'beliebteste';

interface Props {
  active: FilterOption;
  onChange: (v: FilterOption) => void;
}

const OPTIONS: { id: FilterOption; label: string }[] = [
  { id: 'empfohlen', label: 'Empfohlen' },
  { id: 'guenstigste', label: 'Günstigste' },
  { id: 'beliebteste', label: 'Beliebteste' },
];

export function FilterPillRow({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={[
            'h-8 shrink-0 rounded-full px-3 text-[14px] font-bold transition-colors',
            active === opt.id
              ? 'bg-primary text-white'
              : 'border border-[#d2d5fc] bg-white text-muted-foreground',
          ].join(' ')}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
