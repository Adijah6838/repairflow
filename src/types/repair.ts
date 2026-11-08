export type RepairStatus =
  | 'Received'
  | 'Diagnosing'
  | 'Repairing'
  | 'Completed'
  | 'Cancelled';

export type RepairPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type DeviceCategory =
  | 'Smartphone'
  | 'Laptop'
  | 'Tablet'
  | 'Gaming Console'
  | 'Television';

export interface Repair {
  id: string; // e.g. RF-2026-0001
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  deviceBrand: string;
  deviceModel: string;
  deviceCategory: DeviceCategory;
  reportedProblem: string;

  dateSubmitted: string; // ISO date string
  preferredServiceDate?: string; // ISO date string
  estimatedCompletionDate: string; // ISO date string
  completedAt: string | null;

  assignedTechnicianId: string | null;
  priority: RepairPriority;
  status: RepairStatus;

  serviceCharge: number;
  partsCost: number;
  estimatedCost: number; // derived = serviceCharge + partsCost

  diagnosticNotes: string[];
  workPerformed: string[];
}

/* ---------- Tracking timeline (Module E) ---------- */

export type TimelineStageKey =
  | 'received'
  | 'diagnosis'
  | 'approved'
  | 'in_progress'
  | 'inspection'
  | 'completed'
  | 'ready';

export type TimelineStageState = 'pending' | 'current' | 'complete';

export interface RepairTimelineStage {
  key: TimelineStageKey;
  label: string;
  description: string;
  state: TimelineStageState;
  timestamp: string | null; // ISO date string, null while pending
}

/* ---------- Filtering / sorting helpers ---------- */

export interface RepairFilters {
  search: string;
  status: RepairStatus | 'All';
  technicianId: string | 'All';
  priority: RepairPriority | 'All';
  category: DeviceCategory | 'All';
  sortBy: 'dateSubmitted' | 'priority' | 'estimatedCost';
  sortDirection: 'asc' | 'desc';
  page: number;
  pageSize: number;
}