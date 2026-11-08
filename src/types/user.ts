export type UserRole = 'admin' | 'technician' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  /** Accent color used for avatar initials */
  avatarColor?: string;
  createdAt: string; // ISO date string
}

/** What we persist in LocalStorage after a simulated login. */
export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  loggedInAt: string; // ISO date string
}