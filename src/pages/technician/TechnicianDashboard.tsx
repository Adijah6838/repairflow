import { Wrench, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { useRepairStore } from '../../store/repairStore';

export function TechnicianDashboard() {
  const repairs = useRepairStore(state => state.repairs);
  const myRepairs = repairs.filter(r => r.assignedTechnicianId === 't-1');
  
  const active = myRepairs.filter(r => r.status === 'Diagnosing' || r.status === 'Repairing').length;
  const completed = myRepairs.filter(r => r.status === 'Completed').length;
  const pending = myRepairs.filter(r => r.status === 'Received').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Technician Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <StatCard title="Assigned (Pending)" value={pending} icon={<Clock size={24} />} color="var(--warning)" />
        <StatCard title="Active Work" value={active} icon={<Wrench size={24} />} color="var(--info)" />
        <StatCard title="Total Completed" value={completed} icon={<CheckCircle size={24} />} color="var(--success)" />
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginTop: 0 }}>Welcome back, Alice!</h3>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>You currently have {active} active jobs in progress. Head over to the Kanban Board to update your tasks.</p>
      </div>
    </div>
  );
}