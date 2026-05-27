'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, CheckSquare, FileText, Lightbulb, User } from 'lucide-react';

const TABS = [
  { href: '/home',      label: 'Home',      Icon: Home },
  { href: '/aufgaben',  label: 'Aufgaben',  Icon: CheckSquare },
  { href: '/vertraege', label: 'Verträge',  Icon: FileText },
  { href: '/entdecken', label: 'Entdecken', Icon: Lightbulb },
  { href: '/ich',       label: 'Ich',       Icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex h-[56px] w-full items-center justify-around border-t border-[#d2d5fc] bg-background"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map(({ href, label, Icon }) => {
        const isActive = pathname === href;
        const color = isActive ? '#1e2f4b' : 'rgba(30,47,75,0.4)';

        return (
          <button
            key={href}
            onClick={() => router.push(href)}
            className="relative flex h-[56px] flex-1 flex-col items-center justify-center gap-[2px]"
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <div
                className="absolute top-0 left-1/2 h-[3px] w-[20px] -translate-x-1/2 rounded-b-full"
                style={{ backgroundColor: '#6c75f4' }}
              />
            )}
            <Icon
              size={24}
              color={color}
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className="text-[14px] font-bold leading-[1.4]"
              style={{ color }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
