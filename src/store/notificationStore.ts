import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppNotification } from '../types';

interface NotificationState {
  notifications: AppNotification[];
  addNotification: (notif: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [
        {
          id: 'n-1',
          type: 'request_created',
          title: 'New Repair Request',
          message: 'Bob Customer submitted a new request RF-2026-0001.',
          audience: 'admin',
          read: false,
          createdAt: new Date().toISOString(),
        }
      ],
      addNotification: (notif) => set((state) => ({
        notifications: [
          {
            ...notif,
            id: `n-${Date.now()}`,
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...state.notifications,
        ]
      })),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
    }),
    { name: 'repairflow-notifications' }
  )
);
