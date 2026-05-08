import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type VertragHubKategorie = 'strom' | 'internet' | 'telefon' | 'versicherungen';

interface VertraegeStore {
  completed: Record<VertragHubKategorie, boolean>;
  markComplete: (k: VertragHubKategorie) => void;
  isComplete: (k: VertragHubKategorie) => boolean;
  completedCount: () => number;
  reset: () => void;
}

const initial: Record<VertragHubKategorie, boolean> = {
  strom: false,
  internet: false,
  telefon: false,
  versicherungen: false,
};

export const useVertraegeStore = create<VertraegeStore>()(
  persist(
    (set, get) => ({
      completed: { ...initial },
      markComplete: (k) =>
        set((s) => ({ completed: { ...s.completed, [k]: true } })),
      isComplete: (k) => get().completed[k] === true,
      completedCount: () =>
        Object.values(get().completed).filter(Boolean).length,
      reset: () => set({ completed: { ...initial } }),
    }),
    { name: 'wone-vertraege' }
  )
);
