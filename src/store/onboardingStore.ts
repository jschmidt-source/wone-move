import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OnboardingData, Priority, AlreadyDone } from '@/types/onboarding';

const initialData: OnboardingData = {
  moveDate: null,
  targetPlz: '',
  fromCity: '',
  movingOrg: [],
  priority: null,
  alreadyDone: {
    newApartment: false,
    transport: false,
    electricityInternet: false,
    ummeldungPrepared: false,
  },
  completed: false,
};

interface OnboardingStore {
  data: OnboardingData;
  setMoveDate: (date: string) => void;
  setLocation: (plz: string, city: string) => void;
  setMovingOrg: (org: string[]) => void;
  setPriority: (priority: Priority | null) => void;
  setAlreadyDone: (key: keyof AlreadyDone, value: boolean) => void;
  complete: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      data: initialData,
      setMoveDate: (date) =>
        set((s) => ({ data: { ...s.data, moveDate: date } })),
      setLocation: (plz, city) =>
        set((s) => ({ data: { ...s.data, targetPlz: plz, fromCity: city } })),
      setMovingOrg: (org) =>
        set((s) => ({ data: { ...s.data, movingOrg: org } })),
      setPriority: (priority) =>
        set((s) => ({ data: { ...s.data, priority } })),
      setAlreadyDone: (key, value) =>
        set((s) => ({
          data: {
            ...s.data,
            alreadyDone: { ...s.data.alreadyDone, [key]: value },
          },
        })),
      complete: () =>
        set((s) => ({ data: { ...s.data, completed: true } })),
      reset: () => set({ data: initialData }),
    }),
    { name: 'wone-onboarding' }
  )
);
