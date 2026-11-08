export type PaymentStatus = 'Pending' | 'Paid' | 'Overdue' | 'Refunded';

export type PaymentMethod = 'Card' | 'Cash' | 'Bank Transfer' | 'Mobile Money';

export interface Invoice {
  id: string; // e.g. INV-2026-0001
  repairId: string;
  customerName: string;
  serviceCharge: number;
  partsCost: number;
  total: number; // derived = serviceCharge + partsCost
  status: PaymentStatus;
  issuedAt: string; // ISO date string
  dueDate: string; // ISO date string
  paidAt: string | null;
}

export interface Payment {
  id: string;
  invoiceId: string;
  repairId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string; // ISO date string
}