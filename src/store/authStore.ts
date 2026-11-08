import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthSession, UserRole } from '../types';
import { mockUsers } from '../data/mockUsers';

interface AuthState {
  session: AuthSession | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      login: (email, password) => {
        if (password !== 'demo123') {
          return { success: false, error: 'Invalid password. Use "demo123" for all demo accounts.' };
        }
        
        const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
          return { success: false, error: 'No account found with that email address.' };
        }

        set({
          session: {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            loggedInAt: new Date().toISOString(),
          }
        });
        return { success: true };
      },
      logout: () => set({ session: null }),
    }),
    { name: 'repairflow-auth' }
  )
);
