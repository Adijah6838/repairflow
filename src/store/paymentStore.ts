import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Invoice } from '../types';
import { mockRepairs } from '../data/mockRepairs';

// Generate initial mock invoices based on completed repairs
const initialInvoices: Invoice[] = mockRepairs
  .filter(r => r.status === 'Completed' || r.status === 'Repairing')
  .slice(0, 15)
  .map((r, i) => ({
    id: `INV-2026-${String(i + 1).padStart(4, '0')}`,
    repairId: r.id,
    customerName: r.customerName,
    serviceCharge: r.serviceCharge,
    partsCost: r.partsCost,
    total: r.estimatedCost,
    status: r.status === 'Completed' ? 'Paid' : 'Pending',
    issuedAt: r.dateSubmitted,
    dueDate: r.estimatedCompletionDate,
    paidAt: r.status === 'Completed' ? r.completedAt : null,
  }));

interface PaymentState {
  invoices: Invoice[];
  markAsPaid: (id: string) => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      invoices: initialInvoices,
      markAsPaid: (id) => set((state) => ({
        invoices: state.invoices.map(inv => 
          inv.id === id ? { ...inv, status: 'Paid', paidAt: new Date().toISOString() } : inv
        )
      })),
    }),
    { name: 'repairflow-invoices' }
  )
);
