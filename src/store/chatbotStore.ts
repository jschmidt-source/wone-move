import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatbotState {
  chatCount: number;
  incrementCount: () => void;
  resetCount: () => void;
}

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set) => ({
      chatCount: 0,
      incrementCount: () => set((s) => ({ chatCount: s.chatCount + 1 })),
      resetCount: () => set({ chatCount: 0 }),
    }),
    { name: 'wone-chatbot' }
  )
);
