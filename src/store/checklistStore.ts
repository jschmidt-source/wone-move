'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomItem, ChecklistCategoryId } from '@/types/checklist';

interface ChecklistStore {
  checkedIds: string[];
  customItems: CustomItem[];
  toggle: (id: string) => void;
  addCustomItem: (title: string, category: ChecklistCategoryId) => void;
  isChecked: (id: string) => boolean;
  reset: () => void;
}

export const useChecklistStore = create<ChecklistStore>()(
  persist(
    (set, get) => ({
      checkedIds: [],
      customItems: [],
      toggle: (id) =>
        set((s) => ({
          checkedIds: s.checkedIds.includes(id)
            ? s.checkedIds.filter((x) => x !== id)
            : [...s.checkedIds, id],
        })),
      addCustomItem: (title, category) =>
        set((s) => ({
          customItems: [
            ...s.customItems,
            {
              id: `custom-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()}`,
              title,
              category,
              createdAt: Date.now(),
            },
          ],
        })),
      isChecked: (id) => get().checkedIds.includes(id),
      reset: () => set({ checkedIds: [], customItems: [] }),
    }),
    { name: 'wone-checklist' }
  )
);
