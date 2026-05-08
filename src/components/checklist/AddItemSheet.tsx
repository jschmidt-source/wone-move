'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '@/lib/tasks';
import { ChecklistCategoryId } from '@/types/checklist';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string, category: ChecklistCategoryId) => void;
}

export function AddItemSheet({ open, onClose, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ChecklistCategoryId>(CATEGORIES[0].id);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    if (title.trim().length === 0) {
      setError('Bitte gib einen Namen für den Punkt ein.');
      return;
    }
    onAdd(title.trim(), category);
    setTitle('');
    setError(null);
    onClose();
  }

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
          'fixed bottom-0 left-0 right-0 z-50 rounded-t-[16px] bg-white px-4 pb-4 pt-3 transition-transform duration-250',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ minHeight: 240 }}
      >
        <div className="mx-auto h-1 w-8 rounded-full bg-[#d2d5fc]" />
        <h3 className="mt-6 text-[16px] font-bold text-foreground">Eigenen Punkt hinzufügen</h3>
        <Input
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(null); }}
          placeholder="z.B. Nachsendeauftrag einrichten"
          className="mt-3 h-[52px] rounded-[10px] border-[1.5px] border-[#d2d5fc] px-4 text-[16px]"
        />
        {error && <p className="mt-1 text-[14px] font-bold text-destructive">{error}</p>}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                'flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[14px] font-bold',
                category === c.id ? 'border-primary text-foreground' : 'border-[#d2d5fc] text-muted-foreground'
              )}
            >
              <span aria-hidden className="block h-2 w-2 rounded-full" style={{ backgroundColor: c.colorHex }} />
              {c.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-all duration-100 active:scale-[0.97]"
        >
          Punkt hinzufügen
        </button>
      </div>
    </>
  );
}
