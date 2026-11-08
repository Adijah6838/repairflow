import type { DragEvent } from 'react';
import type { Repair } from '../types';

interface RepairCardProps {
  repair: Repair;
  onDragStart: (e: DragEvent, id: string) => void;
}

export function RepairCard({ repair, onDragStart }: RepairCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, repair.id)}
      style={{
        backgroundColor: 'var(--bg-surface)',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)' }}>{repair.id}</span>
        <span style={{ 
          fontSize: '0.75rem', fontWeight: 600,
          color: repair.priority === 'Urgent' ? 'var(--danger)' : repair.priority === 'High' ? 'var(--warning)' : 'var(--text-muted)'
        }}>
          {repair.priority}
        </span>
      </div>
      
      <div>
        <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{repair.deviceBrand} {repair.deviceModel}</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{repair.customerName}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
        <span>Sub: {new Date(repair.dateSubmitted).toLocaleDateString()}</span>
        <span>Due: {new Date(repair.estimatedCompletionDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
