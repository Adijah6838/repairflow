import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockRepairs } from '../data/mockRepairs';
import type { Repair } from '../types';

interface RepairState {
  repairs: Repair[];
  addRepair: (repair: Repair) => void;
  updateRepair: (id: string, updates: Partial<Repair>) => void;
  deleteRepair: (id: string) => void;
}

export const useRepairStore = create<RepairState>()(
  persist(
    (set) => ({
      repairs: mockRepairs,
      addRepair: (repair) => set((state) => ({ repairs: [repair, ...state.repairs] })),
      updateRepair: (id, updates) => set((state) => ({
        repairs: state.repairs.map((r) => (r.id === id ? { ...r, ...updates } : r)),
      })),
      deleteRepair: (id) => set((state) => ({
        repairs: state.repairs.filter((r) => r.id !== id),
      })),
    }),
    {
      name: 'repairflow-repairs', // LocalStorage key
    }
  )
);