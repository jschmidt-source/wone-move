'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, HelpCircle, Lightbulb, Phone, MapPin, ChevronRight } from 'lucide-react';
import { SearchOverlay } from '@/components/entdecken/SearchOverlay';

const SECTIONS = [
  {
    href: '/anleitungen',
    icon: BookOpen,
    iconBg: '#eef0fd',
    iconColor: '#6c75f4',
    title: 'Anleitungen',
    description: 'Schritt-für-Schritt erklärt: Ummeldung, Rundfunk, Versicherungen & mehr',
  },
  {
    href: '/entdecken/faq',
    icon: HelpCircle,
    iconBg: '#d2d5fc',
    iconColor: '#6c75f4',
    title: 'Häufige Fragen',
    description: 'Antworten auf die wichtigsten Fragen rund um deinen Umzug',
  },
  {
    href: '/entdecken/spartipps',
    icon: Lightbulb,
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    title: 'Spartipps',
    description: 'Kosten senken beim Umzug — praktische Tipps für jedes Budget',
  },
  {
    href: '/entdecken/notfallkontakte',
    icon: Phone,
    iconBg: '#fee2e2',
    iconColor: '#ef4444',
    title: 'Notfallkontakte',
    description: 'Wichtige Nummern für jede Situation — immer griffbereit',
  },
  {
    href: '/entdecken/adressaenderungen',
    icon: MapPin,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    title: 'Adressänderungen',
    description: 'Wen musst du informieren? Die vollständige Checkliste',
  },
];

export default function EntdeckenPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Sticky search bar */}
      <div className="sticky top-0 z-40 bg-background px-4 py-2">
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

      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6">
        <h1 className="mb-4 text-[20px] font-bold leading-[1.3] text-foreground">Entdecken</h1>

        <div className="flex flex-col gap-3">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="block">
              <div className="flex items-center gap-4 rounded-[16px] bg-white px-4 py-4 active:opacity-80">
                {/* Icon */}
                <div
                  className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px]"
                  style={{ backgroundColor: s.iconBg }}
                >
                  <s.icon size={22} color={s.iconColor} />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold text-foreground">{s.title}</p>
                  <p className="mt-0.5 text-[13px] font-normal leading-[1.4] text-muted-foreground line-clamp-2">
                    {s.description}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight size={18} color="#5b6377" className="shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
