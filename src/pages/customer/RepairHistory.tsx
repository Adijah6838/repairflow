import { useState } from 'react';
import { useRepairStore } from '../../store/repairStore';
import { useAuthStore } from '../../store/authStore';
import { StatusBadge } from '../../components/StatusBadge';
import { Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RepairHistory() {
  const { repairs } = useRepairStore();
  const { session } = useAuthStore();
  const [search, setSearch] = useState('');

  // Filter by customer email and search
  const myRepairs = repairs.filter(r => 
    r.customerEmail.toLowerCase() === session?.email.toLowerCase() &&
    (r.id.toLowerCase().includes(search.toLowerCase()) || r.deviceModel.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>My Repair History</h1>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by ID or Device..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '10px 10px 10px 36px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none', width: '300px' }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600 }}>Repair ID</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Device</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Date Submitted</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Est. Cost</th>
              <th style={{ padding: '16px', fontWeight: 600, textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {myRepairs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No repair history found.</td>
              </tr>
            ) : (
              myRepairs.map((repair) => (
                <tr key={repair.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 500 }}>{repair.id}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{repair.deviceBrand} {repair.deviceModel}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{repair.deviceCategory}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.875rem' }}>
                    {new Date(repair.dateSubmitted).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px' }}><StatusBadge status={repair.status} /></td>
                  <td style={{ padding: '16px', fontWeight: 500 }}>
                    ${repair.estimatedCost}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <Link to="/customer/track" state={{ prefillId: repair.id }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                      <Eye size={16} /> Track
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
