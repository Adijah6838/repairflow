import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color?: string;
}

export function StatCard({ title, value, icon, trend, color = 'var(--primary)' }: StatCardProps) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      padding: '24px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>
          {title}
        </p>
        <h3 style={{ fontSize: '1.75rem', margin: 0 }}>{value}</h3>
        {trend && <p style={{ color: 'var(--success)', fontSize: '0.875rem', marginTop: '8px' }}>↑ {trend}</p>}
      </div>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
        color: color, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {icon}
      </div>
    </div>
  );
}