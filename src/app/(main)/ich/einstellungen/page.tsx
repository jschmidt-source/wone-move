'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Bell, Globe, Shield, FileText, Trash2, LogOut } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed bottom-6 left-4 right-4 z-50 rounded-[12px] px-4 py-3 text-[14px] font-bold text-white"
      style={{ backgroundColor: '#1c2642', boxShadow: '0 4px 16px rgba(28,38,66,0.2)' }}
    >
      {message}
    </div>
  );
}

interface PushSheetProps {
  open: boolean;
  onClose: () => void;
  onActivate: () => void;
}

function PushSheet({ open, onClose, onActivate }: PushSheetProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Schließen"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 rounded-t-[20px] bg-white px-4 pb-8 pt-4 transition-transform duration-250',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Drag handle */}
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-[#d2d5fc]" />
        </div>

        <h2 className="mb-4 text-center text-[18px] font-bold text-foreground">
          Erinnerungen aktivieren
        </h2>

        {/* iOS-style notification preview */}
        <div className="mb-4 rounded-[14px] bg-[#f6f7f7] p-4">
          <div className="flex items-start gap-3">
            <div
              className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px]"
              style={{ backgroundColor: '#646efb' }}
            >
              <span className="text-[16px]">🏠</span>
            </div>
            <div>
              <p className="text-[13px] font-bold text-foreground">Wone MOVE</p>
              <p className="text-[13px] font-normal text-foreground">
                In 3 Tagen: Ummeldung nicht vergessen! ⏰
              </p>
            </div>
          </div>
        </div>

        {/* Toggle list */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-normal text-foreground">Aufgaben-Erinnerungen</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-normal text-foreground">Fristen-Benachrichtigungen</span>
            <Switch defaultChecked />
          </div>
        </div>

        <button
          type="button"
          onClick={onActivate}
          className="h-[52px] w-full rounded-xl text-[16px] font-bold text-white"
          style={{ backgroundColor: '#646efb' }}
        >
          Aktivieren
        </button>
      </div>
    </>
  );
}

export default function EinstellungenPage() {
  const router = useRouter();
  const [pushSheetOpen, setPushSheetOpen] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
  }

  function handleDisabledAction() {
    showToast('Nur in der Vollversion verfügbar.');
  }

  function handlePushActivate() {
    setPushEnabled(true);
    setPushSheetOpen(false);
    showToast('Erinnerungen aktiviert.');
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#d2d5fc] bg-white px-4 py-3 pt-12">
        <button
          type="button"
          aria-label="Zurück"
          onClick={() => router.back()}
          className="flex h-[36px] w-[36px] items-center justify-center"
        >
          <ChevronLeft size={24} color="#1c2642" />
        </button>
        <h1 className="text-[16px] font-bold text-foreground">Einstellungen</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Benachrichtigungen */}
        <p className="mb-2 px-1 text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
          Benachrichtigungen
        </p>
        <div className="mb-4 rounded-[14px] bg-white">
          <div className="flex min-h-[52px] items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Bell size={18} color="#5b6377" />
              <span className="text-[14px] font-normal text-foreground">Push-Benachrichtigungen</span>
            </div>
            <Switch
              checked={pushEnabled}
              onCheckedChange={(checked) => {
                if (checked) {
                  setPushSheetOpen(true);
                } else {
                  setPushEnabled(false);
                }
              }}
            />
          </div>
        </div>

        {/* Allgemein */}
        <p className="mb-2 px-1 text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
          Allgemein
        </p>
        <div className="mb-4 rounded-[14px] bg-white">
          <div className="flex min-h-[52px] items-center justify-between border-b border-[#f6f7f7] px-4">
            <div className="flex items-center gap-3">
              <Globe size={18} color="#5b6377" />
              <span className="text-[14px] font-normal text-foreground">Sprache</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-normal text-muted-foreground">Deutsch</span>
              <ChevronRight size={16} color="#5b6377" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push('/ich/datenschutz')}
            className="flex min-h-[52px] w-full items-center justify-between border-b border-[#f6f7f7] px-4"
          >
            <div className="flex items-center gap-3">
              <Shield size={18} color="#5b6377" />
              <span className="text-[14px] font-normal text-foreground">Datenschutz</span>
            </div>
            <ChevronRight size={16} color="#5b6377" />
          </button>
          <button
            type="button"
            onClick={() => router.push('/ich/impressum')}
            className="flex min-h-[52px] w-full items-center justify-between px-4"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} color="#5b6377" />
              <span className="text-[14px] font-normal text-foreground">Impressum</span>
            </div>
            <ChevronRight size={16} color="#5b6377" />
          </button>
        </div>

        {/* Account — disabled rows */}
        <p className="mb-2 px-1 text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
          Account
        </p>
        <div className="rounded-[14px] bg-white">
          <button
            type="button"
            onClick={handleDisabledAction}
            className="flex min-h-[52px] w-full items-center gap-3 border-b border-[#f6f7f7] px-4"
          >
            <LogOut size={18} color="#5b6377" />
            <span className="text-[14px] font-normal" style={{ color: '#5b6377' }}>
              Logout
            </span>
          </button>
          <button
            type="button"
            onClick={handleDisabledAction}
            className="flex min-h-[52px] w-full items-center gap-3 px-4"
          >
            <Trash2 size={18} color="#ef4444" style={{ opacity: 0.5 }} />
            <span className="text-[14px] font-normal" style={{ color: '#ef4444', opacity: 0.5 }}>
              Account löschen
            </span>
          </button>
        </div>
      </div>

      {/* Push Bottom Sheet */}
      <PushSheet
        open={pushSheetOpen}
        onClose={() => setPushSheetOpen(false)}
        onActivate={handlePushActivate}
      />

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
