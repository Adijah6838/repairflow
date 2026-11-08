import type { User, Technician, Customer } from '../types';

// The demo password for ALL accounts is: demo123
export const mockUsers: User[] = [
  {
    id: 'u-1',
    name: 'Admin Sarah',
    email: 'admin@repairflow.test',
    role: 'admin',
    phone: '555-0100',
    createdAt: '2026-01-01T08:00:00Z',
  },
  {
    id: 'u-2',
    name: 'Alice Smartphone',
    email: 'technician@repairflow.test',
    role: 'technician',
    phone: '555-0101',
    createdAt: '2026-01-02T08:00:00Z',
  },
  {
    id: 'u-3',
    name: 'Bob Customer',
    email: 'customer@repairflow.test',
    role: 'customer',
    phone: '555-0102',
    createdAt: '2026-01-03T08:00:00Z',
  },
  // Additional Technicians
  { id: 'u-4', name: 'David Laptops', email: 'david@repairflow.test', role: 'technician', createdAt: '2026-01-04T08:00:00Z' },
  { id: 'u-5', name: 'Eve Tablets', email: 'eve@repairflow.test', role: 'technician', createdAt: '2026-01-05T08:00:00Z' },
  { id: 'u-6', name: 'Frank Consoles', email: 'frank@repairflow.test', role: 'technician', createdAt: '2026-01-06T08:00:00Z' },
  { id: 'u-7', name: 'Grace TVs', email: 'grace@repairflow.test', role: 'technician', createdAt: '2026-01-07T08:00:00Z' },
  // Additional Customers
  { id: 'u-8', name: 'Charlie Delta', email: 'charlie@example.com', role: 'customer', createdAt: '2026-02-01T08:00:00Z' },
  { id: 'u-9', name: 'Diana Prince', email: 'diana@example.com', role: 'customer', createdAt: '2026-02-02T08:00:00Z' },
  { id: 'u-10', name: 'Ethan Hunt', email: 'ethan@example.com', role: 'customer', createdAt: '2026-02-03T08:00:00Z' },
  { id: 'u-11', name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'customer', createdAt: '2026-02-04T08:00:00Z' },
];

export const mockTechnicians: Technician[] = [
  {
    id: 't-1',
    fullName: 'Alice Smartphone',
    email: 'technician@repairflow.test',
    specialization: 'Smartphones',
    availability: 'Available',
    joinedAt: '2026-01-02T08:00:00Z',
  },
  { id: 't-2', fullName: 'David Laptops', email: 'david@repairflow.test', specialization: 'Laptops', availability: 'Busy', joinedAt: '2026-01-04T08:00:00Z' },
  { id: 't-3', fullName: 'Eve Tablets', email: 'eve@repairflow.test', specialization: 'Tablets', availability: 'Available', joinedAt: '2026-01-05T08:00:00Z' },
  { id: 't-4', fullName: 'Frank Consoles', email: 'frank@repairflow.test', specialization: 'Gaming Consoles', availability: 'Available', joinedAt: '2026-01-06T08:00:00Z' },
  { id: 't-5', fullName: 'Grace TVs', email: 'grace@repairflow.test', specialization: 'Television Systems', availability: 'On Leave', joinedAt: '2026-01-07T08:00:00Z' },
];

export const mockCustomers: Customer[] = [
  {
    id: 'c-1',
    fullName: 'Bob Customer',
    email: 'customer@repairflow.test',
    phone: '555-0102',
    registeredAt: '2026-01-03T08:00:00Z',
  },
  { id: 'c-2', fullName: 'Charlie Delta', email: 'charlie@example.com', phone: '555-0201', registeredAt: '2026-02-01T08:00:00Z' },
  { id: 'c-3', fullName: 'Diana Prince', email: 'diana@example.com', phone: '555-0202', registeredAt: '2026-02-02T08:00:00Z' },
  { id: 'c-4', fullName: 'Ethan Hunt', email: 'ethan@example.com', phone: '555-0203', registeredAt: '2026-02-03T08:00:00Z' },
  { id: 'c-5', fullName: 'Fiona Gallagher', email: 'fiona@example.com', phone: '555-0204', registeredAt: '2026-02-04T08:00:00Z' },
];