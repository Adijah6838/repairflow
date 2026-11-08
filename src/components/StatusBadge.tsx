import type { RepairStatus } from '../types';

export function StatusBadge({ status }: { status: RepairStatus }) {
  const getStyle = () => {
    switch (status) {
      case 'Received': return { bg: 'var(--info-bg)', color: 'var(--info)' };
      case 'Diagnosing': return { bg: 'var(--warning-bg)', color: 'var(--warning)' };
      case 'Repairing': return { bg: '#e0e7ff', color: '#4338ca' }; // Indigo
      case 'Completed': return { bg: 'var(--success-bg)', color: 'var(--success)' };
      case 'Cancelled': return { bg: 'var(--danger-bg)', color: 'var(--danger)' };
      default: return { bg: 'var(--bg-main)', color: 'var(--text-main)' };
    }
  };

  const style = getStyle();

  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      backgroundColor: style.bg,
      color: style.color,
      whiteSpace: 'nowrap'
    }}>
      {status}
    </span>
  );
}