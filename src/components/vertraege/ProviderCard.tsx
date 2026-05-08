'use client';

import { Anbieter } from '@/types/vertraege';

interface Props {
  anbieter: Anbieter;
  onAbschliessen: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-[14px]">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < rating ? '#f59e0b' : '#d2d5fc' }}>
          ★
        </span>
      ))}
    </span>
  );
}

export function ProviderCard({ anbieter, onAbschliessen }: Props) {
  const initials = anbieter.name.slice(0, 2).toUpperCase();
  const laufzeitText =
    anbieter.laufzeit === 'Keine Laufzeit'
      ? 'Keine Mindestlaufzeit'
      : `${anbieter.laufzeit} Laufzeit`;

  return (
    <div className="relative rounded-[14px] border border-[#d2d5fc] bg-white p-4">
      {/* Badge — mutually exclusive, Empfohlen wins */}
      {anbieter.empfohlen ? (
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-1 text-[14px] font-bold text-white">
          Empfohlen
        </span>
      ) : anbieter.partnerangebot ? (
        <span className="absolute right-3 top-3 rounded-full bg-[#d2d5fc] px-2 py-1 text-[14px] font-bold text-muted-foreground">
          Partnerangebot
        </span>
      ) : null}

      {/* Top row */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#d2d5fc] bg-background text-[14px] font-bold text-muted-foreground">
          {initials}
        </div>
        <span className="flex-1 text-[16px] font-bold text-foreground">
          {anbieter.name}
        </span>
        <StarRating rating={anbieter.rating} />
      </div>

      {/* Price row */}
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[28px] font-bold leading-[1.2] text-foreground">
          {anbieter.preisProMonat} €
        </span>
        <span className="text-[16px] font-normal text-muted-foreground">
          /Monat
        </span>
      </div>

      {/* Duration */}
      <p className="mt-1 text-[14px] font-normal text-muted-foreground">
        {laufzeitText}
      </p>

      {/* Highlight tags */}
      <div className="mt-3 flex flex-wrap gap-1">
        {anbieter.highlights.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#d2d5fc] bg-background px-2 py-1 text-[14px] font-bold text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onAbschliessen}
        className="mt-4 h-[44px] w-full rounded-[10px] bg-primary text-[14px] font-bold text-white transition-all duration-100 active:scale-[0.97]"
      >
        Jetzt abschließen →
      </button>
    </div>
  );
}
