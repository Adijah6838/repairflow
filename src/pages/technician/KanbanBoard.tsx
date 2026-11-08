import { useState } from 'react';
import type { DragEvent } from 'react';
import { useRepairStore } from '../../store/repairStore';
import { useNotificationStore } from '../../store/notificationStore';
import { RepairCard } from '../../components/RepairCard';
import type { RepairStatus } from '../../types';

const COLUMNS: { id: RepairStatus; title: string }[] = [
  { id: 'Received', title: 'Received' },
  { id: 'Diagnosing', title: 'Diagnosing' },
  { id: 'Repairing', title: 'Repairing' },
  { id: 'Completed', title: 'Completed' },
];

export function KanbanBoard() {
  const { repairs, updateRepair } = useRepairStore();
  const { addNotification } = useNotificationStore();
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<RepairStatus | null>(null);

  const myRepairs = repairs.filter(r => r.assignedTechnicianId === 't-1' && r.status !== 'Cancelled');

  const handleDragStart = (e: DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => (e.currentTarget as HTMLElement).style.opacity = '0.5', 0);
  };

  const handleDragEnd = (e: DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
    setDraggedId(null);
    setHoveredColumn(null);
  };

  const handleDragOver = (e: DragEvent, columnId: RepairStatus) => {
    e.preventDefault();
    setHoveredColumn(columnId);
  };

  const handleDrop = (e: DragEvent, status: RepairStatus) => {
    e.preventDefault();
    if (draggedId) {
      const repair = repairs.find(r => r.id === draggedId);
      if (repair && repair.status !== status) {
        updateRepair(draggedId, { status });
        if (status === 'Completed') {
          updateRepair(draggedId, { completedAt: new Date().toISOString() });
        }
        
        // Trigger Notification for Admin
        addNotification({
          type: 'status_updated',
          title: 'Repair Status Updated',
          message: `${repair.id} moved to ${status}.`,
          audience: 'admin',
        });
      }
    }
    setDraggedId(null);
    setHoveredColumn(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', margin: '0 0 8px 0' }}>My Workspace (Kanban)</h1>
        <p style={{ color: 'var(--text-muted)' }}>Drag and drop repairs to update their status.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', flex: 1, minHeight: '500px' }}>
        {COLUMNS.map((col) => {
          const columnRepairs = myRepairs.filter(r => r.status === col.id);
          const isHovered = hoveredColumn === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              onDragLeave={() => setHoveredColumn(null)}
              style={{
                backgroundColor: isHovered ? 'var(--bg-surface-hover)' : 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                border: `1px solid ${isHovered ? 'var(--primary)' : 'var(--border-color)'}`,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>{col.title}</h3>
                <span style={{ backgroundColor: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                  {columnRepairs.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {columnRepairs.map(repair => (
                  <RepairCard 
                    key={repair.id} 
                    repair={repair} 
                    onDragStart={handleDragStart} 
                  />
                ))}
                {columnRepairs.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '0.875rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    Drop items here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
