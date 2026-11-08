import type { UserRole } from './user';

export type NotificationType =
  | 'request_created'
  | 'technician_assigned'
  | 'status_updated'
  | 'repair_completed'
  | 'estimate_changed';

/**
 * Named AppNotification (not "Notification") to avoid colliding with
 * the browser's built-in DOM Notification interface.
 */
export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  repairId?: string;
  /** Who should see it. 'all' = every role. */
  audience: UserRole | 'all';
  read: boolean;
  createdAt: string; // ISO date string
}