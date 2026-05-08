'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, HelpCircle, Phone, MapPin } from 'lucide-react';
import { EntdeckenSection, EntdeckenPreviewCard } from '@/components/entdecken/EntdeckenSection';
import { SearchOverlay } from '@/components/entdecken/SearchOverlay';
import { FAQ } from '@/lib/faq';
import { SPARTIPPS } from '@/lib/spartipps';
import { NOTFALLKONTAKTE } from '@/lib/notfallkontakte';
import { ADRESSAENDERUNGEN } from '@/lib/adressaenderungen';

export default function EntdeckenPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Sticky search bar (D-08) — height 56px, bg matches page */}
      <div className="sticky top-0 z-40 bg-background px-4 py-1.5">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Suche öffnen"
          className="relative flex h-11 w-full items-center rounded-[12px] border-[1.5px] border-[#d2d5fc] bg-white pl-11 pr-4 text-left text-[16px] font-normal text-muted-foreground"
        >
          <Search size={18} className="absolute left-4 text-muted-foreground" />
          Suche nach Aufgaben, Tipps...
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        <h1 className="text-[20px] font-bold leading-[1.3] text-foreground">Entdecken</h1>

        <div className="mt-6 flex flex-col gap-6">
          {/* Section 1: Anleitungen — D-09: link to existing /anleitungen route from Phase 2 */}
          <EntdeckenSection title="Anleitungen" allHref="/anleitungen">
            {[
              { slug: 'ummeldung', label: 'Organisatorisches', dot: '#646efb', title: 'Ummeldung beim Bürgeramt', time: '~15 Min', diff: 'Mittel' },
              { slug: 'rundfunk', label: 'Organisatorisches', dot: '#646efb', title: 'Rundfunkbeitrag anmelden', time: '~5 Min', diff: 'Leicht' },
              { slug: 'nachsende', label: 'Finanzen', dot: '#22c55e', title: 'Nachsendeauftrag stellen', time: '~10 Min', diff: 'Leicht' },
            ].map((g) => (
              <Link key={g.slug} href={`/anleitungen/${g.slug}`} className="contents">
                <EntdeckenPreviewCard>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full" style={{ background: g.dot }} />
                    <span className="text-[14px] font-bold text-muted-foreground">{g.label}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[16px] font-bold leading-[1.3] text-foreground">{g.title}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-background px-2 py-0.5 text-[14px] font-bold text-muted-foreground">{g.time}</span>
                    <span className="rounded-full bg-background px-2 py-0.5 text-[14px] font-bold text-muted-foreground">{g.diff}</span>
                  </div>
                </EntdeckenPreviewCard>
              </Link>
            ))}
          </EntdeckenSection>

          {/* Section 2: Häufige Fragen */}
          <EntdeckenSection title="Häufige Fragen" allHref="/entdecken/faq">
            {FAQ.slice(0, 3).map((q) => (
              <Link key={q.id} href="/entdecken/faq" className="contents">
                <EntdeckenPreviewCard>
                  <HelpCircle size={16} className="text-primary" />
                  <p className="mt-2 line-clamp-3 text-[14px] font-bold leading-[1.4] text-foreground">{q.frage}</p>
                </EntdeckenPreviewCard>
              </Link>
            ))}
          </EntdeckenSection>

          {/* Section 3: Spartipps */}
          <EntdeckenSection title="Spartipps" allHref="/entdecken/spartipps">
            {SPARTIPPS.slice(0, 3).map((cat) => (
              <Link key={cat.id} href="/entdecken/spartipps" className="contents">
                <EntdeckenPreviewCard>
                  <span className="text-[20px]">{cat.emoji}</span>
                  <p className="mt-1 text-[14px] font-bold text-foreground">{cat.label}</p>
                  <p className="mt-1 text-[14px] font-normal text-muted-foreground">{cat.tipps.length} Tipps</p>
                </EntdeckenPreviewCard>
              </Link>
            ))}
          </EntdeckenSection>

          {/* Section 4: Notfallkontakte */}
          <EntdeckenSection title="Notfallkontakte" allHref="/entdecken/notfallkontakte">
            {NOTFALLKONTAKTE.slice(0, 3).map((n) => (
              <Link key={n.id} href="/entdecken/notfallkontakte" className="contents">
                <EntdeckenPreviewCard>
                  <Phone size={16} className="text-[#ef4444]" />
                  <p className="mt-2 text-[14px] font-bold text-foreground">{n.name}</p>
                  <p className="mt-1 text-[20px] font-bold text-foreground">{n.nummer}</p>
                </EntdeckenPreviewCard>
              </Link>
            ))}
          </EntdeckenSection>

          {/* Section 5: Adressänderungen */}
          <EntdeckenSection title="Adressänderungen" allHref="/entdecken/adressaenderungen">
            {ADRESSAENDERUNGEN.slice(0, 3).map((a) => (
              <Link key={a.id} href="/entdecken/adressaenderungen" className="contents">
                <EntdeckenPreviewCard>
                  <MapPin size={16} className="text-muted-foreground" />
                  <p className="mt-2 text-[14px] font-bold text-foreground">{a.label}</p>
                  <p className="mt-1 text-[14px] font-normal text-primary">Jetzt checken</p>
                </EntdeckenPreviewCard>
              </Link>
            ))}
          </EntdeckenSection>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
