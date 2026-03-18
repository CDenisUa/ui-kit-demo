// Core
import { create } from 'zustand';
// Types
import type { Event } from '@/types/event';

interface ModalStore {
  isOpen: boolean;
  editingEvent: Event | null;
  openAdd: () => void;
  openEdit: (event: Event) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  editingEvent: null,

  openAdd: () => set({ isOpen: true, editingEvent: null }),
  openEdit: (event) => set({ isOpen: true, editingEvent: event }),
  close: () => set({ isOpen: false, editingEvent: null }),
}));
