import { useRepairStore } from '../../store/repairStore';
import { useAuthStore } from '../../store/authStore';
import { StatCard } from '../../components/StatCard';
import { Wrench, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CustomerDashboard() {
  const { repairs } = useRepairStore();
  const { session } = useAuthStore();
  
  const myRepairs = repairs.filter(r => r.customerEmail === session?.email);
  const active = myRepairs.filter(r => r.status !== 'Completed' && r.status !== 'Cancelled').length;
  const completed = myRepairs.filter(r => r.status === 'Completed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Welcome, {session?.name}</h1>
        <Link to="/customer/new" style={{ padding: '10px 20px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 500, textDecoration: 'none' }}>
          + New Request
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <StatCard title="Total Repairs" value={myRepairs.length} icon={<Wrench size={24} />} color="var(--primary)" />
        <StatCard title="Active Repairs" value={active} icon={<Clock size={24} />} color="var(--warning)" />
        <StatCard title="Completed" value={completed} icon={<CheckCircle size={24} />} color="var(--success)" />
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Track a Repair</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Enter your Repair ID to see the live status and progress.</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="e.g. RF-2026-0001" id="track-input" style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', flex: 1, maxWidth: '300px' }} />
          <Link to="/customer/history" style={{ padding: '10px 20px', backgroundColor: 'var(--nav-bg)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 500, textDecoration: 'none' }}>
            View My History
          </Link>
        </div>
      </div>
    </div>
  );
}
