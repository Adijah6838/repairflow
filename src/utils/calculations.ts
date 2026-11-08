import type { Repair } from '../types';

export function getDashboardStats(repairs: Repair[]) {
  const total = repairs.length;
  const pending = repairs.filter(r => r.status === 'Received').length;
  const inProgress = repairs.filter(r => r.status === 'Diagnosing' || r.status === 'Repairing').length;
  const completed = repairs.filter(r => r.status === 'Completed').length;
  const cancelled = repairs.filter(r => r.status === 'Cancelled').length;
  
  // Revenue generated from completed repairs
  const revenue = repairs
    .filter(r => r.status === 'Completed')
    .reduce((sum, r) => sum + r.estimatedCost, 0);

  return { total, pending, inProgress, completed, cancelled, revenue };
}

export function getChartData(repairs: Repair[]) {
  // 1. Repairs by Category
  const categories = ['Smartphone', 'Laptop', 'Tablet', 'Gaming Console', 'Television'];
  const categoryData = categories.map(cat => ({
    name: cat,
    count: repairs.filter(r => r.deviceCategory === cat).length
  }));

  // 2. Status Breakdown
  const statusData = [
    { name: 'Received', value: repairs.filter(r => r.status === 'Received').length },
    { name: 'Diagnosing', value: repairs.filter(r => r.status === 'Diagnosing').length },
    { name: 'Repairing', value: repairs.filter(r => r.status === 'Repairing').length },
    { name: 'Completed', value: repairs.filter(r => r.status === 'Completed').length },
    { name: 'Cancelled', value: repairs.filter(r => r.status === 'Cancelled').length },
  ];

  // 3. Revenue Trend (mocking last 6 months based on submitted date)
  const revenueData = [
    { month: 'May', revenue: 4000 },
    { month: 'Jun', revenue: 3000 },
    { month: 'Jul', revenue: 5000 },
    { month: 'Aug', revenue: 4500 },
    { month: 'Sep', revenue: 6000 },
    { month: 'Oct', revenue: 5500 },
  ];

  return { categoryData, statusData, revenueData };
}