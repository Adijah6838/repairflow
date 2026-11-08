export type TechnicianSpecialization =
  | 'Smartphones'
  | 'Laptops'
  | 'Tablets'
  | 'Gaming Consoles'
  | 'Television Systems';

export type TechnicianAvailability = 'Available' | 'Busy' | 'On Leave';

export interface Technician {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  specialization: TechnicianSpecialization;
  availability: TechnicianAvailability;
  joinedAt: string; // ISO date string
}

/**
 * Assigned / completed counts are NOT stored on the entity.
 * They are derived from the repair store (see utils/calculations.ts)
 * so there is a single source of truth.
 */
export interface TechnicianStats {
  technicianId: string;
  assignedCount: number;
  completedCount: number;
  inProgressCount: number;
  completionRate: number; // 0..100
}