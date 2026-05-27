'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SUGGESTIONS = ['Ummeldung', 'Ummeldungsfrist', 'Strom', 'Versicherung'];

// Prototype: results are mock-static for any query (UI-SPEC §8)
const MOCK_RESULTS = {
  aufgaben: [
    { id: 'task-1', title: 'Ummeldung beim Bürgeramt', href: '/anleitungen/ummeldung' },
    { id: 'task-2', title: 'Wohnungsgeberbestätigung holen', href: '/anleitungen/ummeldung' },
  ],
  anleitungen: [
    { id: 'guide-1', title: 'Ummeldung — Schritt für Schritt', href: '/anleitungen/ummeldung' },
  ],
  faq: [
    { id: 'faq-2', title: 'Wie lange habe ich für die Ummeldung Zeit?', href: '/entdecken/faq' },
    { id: 'faq-3', title: 'Was passiert, wenn ich die Ummeldung vergesse?', href: '/entdecken/faq' },
  ],
};

function SuggestionsState({
  query,
  onPick,
}: {
  query: string;
  onPick: (s: string) => void;
}) {
  return (
    <>
      <p className="text-[14px] font-bold text-muted-foreground">Vorschläge</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => {
          const matchIdx = query ? s.toLowerCase().indexOf(query.toLowerCase()) : -1;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onPick(s)}
              className="h-8 rounded-full border border-[#d2d5fc] bg-white px-3 text-[14px] font-bold text-foreground"
            >
              {matchIdx >= 0 && query.length > 0 ? (
                <>
                  {s.slice(0, matchIdx)}
                  <span className="text-primary">{s.slice(matchIdx, matchIdx + query.length)}</span>
                  {s.slice(matchIdx + query.length)}
                </>
              ) : (
                s
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

function ResultsState({ onClose }: { query: string; onClose: () => void }) {
  const sections = [
    { label: 'Aufgaben (2)', items: MOCK_RESULTS.aufgaben },
    { label: 'Anleitungen (1)', items: MOCK_RESULTS.anleitungen },
    { label: 'FAQ (2)', items: MOCK_RESULTS.faq },
  ];

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <div key={section.label}>
          <p className="text-[14px] font-bold text-muted-foreground">{section.label}</p>
          <div className="mt-2">
            {section.items.map((item) => (
              <Link key={item.id} href={item.href} onClick={onClose}>
                <div className="flex h-14 items-center border-b border-[#d2d5fc] text-[16px] font-normal text-foreground last:border-b-0">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [hasResults, setHasResults] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setHasResults(false);
    }
  }, [open]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Schließen"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[rgba(28,38,66,0.4)]"
        />
      )}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-white transition-opacity duration-200',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="flex h-dvh flex-col px-4 pt-4">
          {/* Search input row */}
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-4 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHasResults(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) setHasResults(true);
              }}
              placeholder="Suche nach Aufgaben, Tipps..."
              className="h-11 w-full rounded-[12px] border-[1.5px] border-[#d2d5fc] bg-white pl-11 pr-11 text-[16px] focus:border-primary focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Schließen"
              className="absolute right-3 flex h-8 w-8 items-center justify-center"
            >
              <X size={20} color="#20314b" />
            </button>
          </div>

          {/* Body */}
          <div className="mt-4 flex-1 overflow-y-auto pb-4">
            {!hasResults ? (
              <SuggestionsState
                query={query}
                onPick={(s) => {
                  setQuery(s);
                  setHasResults(true);
                }}
              />
            ) : (
              <ResultsState query={query} onClose={onClose} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
