import { z } from 'zod';

export const newRepairSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(5, 'Phone number is required'),
  deviceCategory: z.enum(['Smartphone', 'Laptop', 'Tablet', 'Gaming Console', 'Television']),
  deviceBrand: z.string().min(1, 'Brand is required'),
  deviceModel: z.string().min(1, 'Model is required'),
  reportedProblem: z.string().min(10, 'Please describe the problem (min 10 characters)'),
  preferredServiceDate: z.string().optional(),
});

export type NewRepairFormValues = z.infer<typeof newRepairSchema>;
