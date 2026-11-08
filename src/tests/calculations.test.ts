import { describe, it, expect } from 'vitest';
import { getDashboardStats } from '../utils/calculations';
import type { Repair } from '../types';

describe('Dashboard Calculations', () => {
  it('should calculate stats correctly', () => {
    const mockData = [
      { status: 'Received', estimatedCost: 100 },
      { status: 'Completed', estimatedCost: 200 },
      { status: 'Completed', estimatedCost: 300 },
      { status: 'Cancelled', estimatedCost: 50 },
    ] as Repair[];

    const stats = getDashboardStats(mockData);
    expect(stats.total).toBe(4);
    expect(stats.pending).toBe(1);
    expect(stats.completed).toBe(2);
    expect(stats.cancelled).toBe(1);
    expect(stats.revenue).toBe(500);
  });
});
