'use client';

import { Shield, Flame, AlertCircle, Zap, Droplets, PawPrint, Phone, type LucideIcon } from 'lucide-react';
import { Notfallkontakt } from '@/types/vertraege';

const ICON_MAP: Record<string, LucideIcon> = { Shield, Flame, AlertCircle, Zap, Droplets, PawPrint };

interface Props {
  contact: Notfallkontakt;
}

export function NotfallkontakteRow({ contact }: Props) {
  const Icon = ICON_MAP[contact.iconName];

  return (
    <a
      href={`tel:${contact.nummer.replace(/\s/g, '')}`}
      onClick={(e) => e.preventDefault()}
      className="flex h-14 items-center gap-3 border-b border-[#d2d5fc] px-4 last:border-b-0"
    >
      {Icon && <Icon size={20} style={{ color: contact.iconColor }} />}
      <div className="flex-1">
        <p className="text-[14px] font-bold text-foreground">{contact.name}</p>
        <p className="text-[20px] font-bold text-foreground">{contact.nummer}</p>
      </div>
      <Phone size={20} style={{ color: contact.iconColor }} />
    </a>
  );
}
