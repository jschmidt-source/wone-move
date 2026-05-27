'use client';

import { useRouter } from 'next/navigation';
import { MessageCircle, Settings, FileText, ChevronRight, Pencil } from 'lucide-react';
import { useChecklistStore } from '@/store/checklistStore';
import { TASKS } from '@/lib/tasks';

export default function IchPage() {
  const router = useRouter();
  const { checkedIds } = useChecklistStore();

  const totalCount = TASKS.length;
  const completedCount = checkedIds.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <h1 className="text-[20px] font-bold text-foreground">Mein Umzug</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="KI Chatbot"
            onClick={() => router.push('/ich/chatbot')}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white"
          >
            <MessageCircle size={20} color="#6c75f4" />
          </button>
          <button
            type="button"
            aria-label="Einstellungen"
            onClick={() => router.push('/ich/einstellungen')}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white"
          >
            <Settings size={20} color="#5b6377" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {/* Avatar + User Info */}
        <div className="mb-6 flex flex-col items-center text-center">
          {/* Avatar with edit button */}
          <div className="relative mb-3">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 80, height: 80, backgroundColor: '#6c75f4' }}
            >
              <span className="text-[28px] font-bold text-white">LM</span>
            </div>
            {/* Edit pencil button */}
            <button
              type="button"
              aria-label="Profilbild bearbeiten"
              className="absolute bottom-0 right-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-background bg-white shadow-sm"
            >
              <Pencil size={12} color="#20314b" />
            </button>
          </div>
          <h2 className="text-[20px] font-bold text-foreground">Lea Müller</h2>
          <p className="mt-1 text-[12px] font-normal text-muted-foreground">
            Von Hamburg → München · 15. Juni 2026 · 42 qm
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6 rounded-[14px] bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[14px] font-bold text-foreground">
              {completedCount} von {totalCount} Aufgaben erledigt
            </span>
            <span className="text-[14px] font-bold" style={{ color: '#6c75f4' }}>
              {pct}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#d2d5fc]">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${pct}%`, backgroundColor: '#6c75f4' }}
            />
          </div>
        </div>

        {/* Dokumentenspeicher Card */}
        <button
          type="button"
          onClick={() => router.push('/ich/dokumente')}
          className="mb-4 flex w-full items-center justify-between rounded-[14px] bg-white p-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
              style={{ backgroundColor: '#d2d5fc' }}
            >
              <FileText size={20} color="#6c75f4" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-foreground">Dokumentenspeicher</p>
              <p className="text-[12px] font-normal text-muted-foreground">2 Dokumente gespeichert</p>
            </div>
          </div>
          <ChevronRight size={20} color="#5b6377" />
        </button>
      </div>
    </div>
  );
}
