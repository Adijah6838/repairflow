export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  registeredAt: string; // ISO date string
}