'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ConditionToggle, ConditionState } from '@/components/uebergabe/ConditionToggle';
import { PhotoSlot } from '@/components/uebergabe/PhotoSlot';

const ROOMS = ['Wohnzimmer', 'Küche', 'Bad', 'Schlafzimmer', 'Flur'] as const;
type Room = typeof ROOMS[number];

const FIELDS = ['Wände', 'Boden', 'Fenster', 'Türen', 'Beleuchtung'] as const;
type Field = typeof FIELDS[number];

type FieldState = { state: ConditionState; note: string };
type RoomState = Record<Field, FieldState>;
type ProtocolState = Record<Room, RoomState>;

function emptyRoom(): RoomState {
  return FIELDS.reduce((acc, f) => {
    acc[f] = { state: null, note: '' };
    return acc;
  }, {} as RoomState);
}

function emptyProtocol(): ProtocolState {
  return ROOMS.reduce((acc, r) => {
    acc[r] = emptyRoom();
    return acc;
  }, {} as ProtocolState);
}

export default function UebergabeprotokollPage() {
  const router = useRouter();
  const [activeRoom, setActiveRoom] = useState<Room>('Wohnzimmer');
  const [protocol, setProtocol] = useState<ProtocolState>(emptyProtocol);

  function setField(room: Room, field: Field, next: Partial<FieldState>) {
    setProtocol((p) => ({
      ...p,
      [room]: { ...p[room], [field]: { ...p[room][field], ...next } },
    }));
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push('/aufgaben')}
            aria-label="Zurück"
            className="flex h-8 w-8 items-center justify-center"
          >
            <ChevronLeft size={24} color="#20314b" />
          </button>
          <h1 className="flex-1 text-center text-[20px] font-bold text-foreground">
            Übergabeprotokoll
          </h1>
          <div className="h-8 w-8" />
        </div>

        <p className="mt-2 text-[14px] font-normal text-muted-foreground">
          Dokumentiere den Zustand deiner neuen Wohnung beim Einzug.
        </p>

        {/* Tabs */}
        <Tabs
          value={activeRoom}
          onValueChange={(v) => setActiveRoom(v as Room)}
          className="mt-4"
        >
          <TabsList className="flex h-11 w-full overflow-x-auto border-b border-[#d2d5fc] bg-white">
            {ROOMS.map((r) => (
              <TabsTrigger
                key={r}
                value={r}
                className="h-11 shrink-0 px-3 text-[14px] font-bold text-muted-foreground data-active:text-primary data-active:shadow-[inset_0_-2px_0_0_#646efb]"
              >
                {r}
              </TabsTrigger>
            ))}
          </TabsList>

          {ROOMS.map((room) => (
            <TabsContent key={room} value={room} className="mt-4">
              {/* Condition rows */}
              <div className="overflow-hidden rounded-[12px] bg-white">
                {FIELDS.map((field, idx) => {
                  const fs = protocol[room][field];
                  return (
                    <div key={field}>
                      <div
                        className={`flex h-[56px] items-center justify-between px-4 ${idx < FIELDS.length - 1 ? 'border-b border-[#d2d5fc]' : ''}`}
                      >
                        <span className="text-[16px] font-bold text-foreground">{field}</span>
                        <ConditionToggle
                          value={fs.state}
                          onChange={(next) => setField(room, field, { state: next })}
                        />
                      </div>
                      {fs.state === 'mangel' && (
                        <div className="px-4 pb-3">
                          <Input
                            value={fs.note}
                            onChange={(e) => setField(room, field, { note: e.target.value })}
                            placeholder="Mangel beschreiben..."
                            className="h-12 rounded-[8px] border-[1.5px] border-[#d2d5fc] text-[14px]"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Photo slots */}
              <div className="mt-4">
                <p className="text-[14px] font-bold text-muted-foreground">Fotos</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <PhotoSlot />
                  <PhotoSlot />
                  <PhotoSlot />
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-4">
                <p className="text-[14px] font-bold text-muted-foreground">Unterschriften</p>
                <div className="mt-2 flex gap-2">
                  <SignatureBox label="Mieter" />
                  <SignatureBox label="Vermieter" />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Export row */}
        <button
          type="button"
          onClick={() => router.push('/ich/premium')}
          className="mt-6 flex h-[52px] w-full items-center justify-between rounded-[12px] border border-[#d2d5fc] bg-white px-4"
        >
          <div className="flex items-center gap-2">
            <Download size={20} color="#5b6377" />
            <span className="text-[14px] font-bold text-foreground">Protokoll exportieren</span>
          </div>
          <span
            className="rounded-full px-2 py-1 text-[14px] font-bold"
            style={{ color: '#f97316', backgroundColor: '#fff7ed' }}
          >
            Premium
          </span>
        </button>
      </div>
    </div>
  );
}

function SignatureBox({ label }: { label: string }) {
  return (
    <div
      className="flex h-[60px] flex-1 items-center justify-center rounded-[8px]"
      style={{ border: '1.5px dashed #d2d5fc' }}
    >
      <span className="text-[14px] font-normal text-muted-foreground">{label}</span>
    </div>
  );
}
