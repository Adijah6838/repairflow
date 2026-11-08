import { describe, it, expect } from 'vitest';
import { newRepairSchema } from '../utils/validation';

describe('Repair Request Validation', () => {
  it('should pass with valid data', () => {
    const validData = {
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '1234567890',
      deviceCategory: 'Smartphone',
      deviceBrand: 'Apple',
      deviceModel: 'iPhone 13',
      reportedProblem: 'Screen is cracked and needs replacement.',
    };
    const result = newRepairSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail with a short name', () => {
    const invalidData = {
      customerName: 'J',
      customerEmail: 'john@example.com',
      customerPhone: '1234567890',
      deviceCategory: 'Smartphone',
      deviceBrand: 'Apple',
      deviceModel: 'iPhone 13',
      reportedProblem: 'Screen is cracked.',
    };
    const result = newRepairSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
