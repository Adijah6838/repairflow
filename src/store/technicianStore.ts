import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTechnicians } from '../data/mockUsers';
import type { Technician } from '../types';

interface TechnicianState {
  technicians: Technician[];
  addTechnician: (tech: Technician) => void;
  updateTechnician: (id: string, updates: Partial<Technician>) => void;
  deleteTechnician: (id: string) => void;
}

export const useTechnicianStore = create<TechnicianState>()(
  persist(
    (set) => ({
      technicians: mockTechnicians,
      addTechnician: (tech) => set((state) => ({ technicians: [...state.technicians, tech] })),
      updateTechnician: (id, updates) => set((state) => ({
        technicians: state.technicians.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      })),
      deleteTechnician: (id) => set((state) => ({
        technicians: state.technicians.filter((t) => t.id !== id),
      })),
    }),
    { name: 'repairflow-technicians' }
  )
);
