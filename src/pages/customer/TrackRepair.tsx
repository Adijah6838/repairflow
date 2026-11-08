import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useRepairStore } from '../../store/repairStore';
import { RepairTimeline } from '../../components/RepairTimeline';
import { StatusBadge } from '../../components/StatusBadge';
import type { Repair } from '../../types';

export function TrackRepair() {
  const location = useLocation();
  const { repairs } = useRepairStore();
  const [searchId, setSearchId] = useState('');
  const [searchedRepair, setSearchedRepair] = useState<Repair | null>(null);
  const [error, setError] = useState('');

  // Auto-search if an ID was passed via Link state
  useEffect(() => {
    const prefillId = location.state?.prefillId;
    if (prefillId) {
      setSearchId(prefillId);
      const found = repairs.find(r => r.id.toLowerCase() === prefillId.toLowerCase());
      if (found) setSearchedRepair(found);
    }
  }, [location.state, repairs]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSearchedRepair(null);

    if (!searchId.trim()) {
      setError('Please enter a Repair ID.');
      return;
    }

    const found = repairs.find(r => r.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setSearchedRepair(found);
    } else {
      setError('No repair found with that ID. Please check and try again.');
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', margin: '0 0 8px 0' }}>Track Your Repair</h1>
        <p style={{ color: 'var(--text-muted)' }}>Enter your unique Repair ID to see the live status and progress.</p>
      </div>

      <form onSubmit={handleTrack} style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="e.g. RF-2026-0001" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none' }}
          />
        </div>
        <button type="submit" style={{ padding: '12px 24px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
          Track
        </button>
      </form>

      {error && (
        <div style={{ padding: '16px', backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', marginBottom: '32px' }}>
          {error}
        </div>
      )}

      {searchedRepair && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* Left Side: Details */}
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {searchedRepair.id}
              <StatusBadge status={searchedRepair.status} />
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Device</span>
                <strong style={{ fontSize: '1rem' }}>{searchedRepair.deviceBrand} {searchedRepair.deviceModel}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Reported Problem</span>
                <strong>{searchedRepair.reportedProblem}</strong>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Date Submitted</span>
                  <strong>{new Date(searchedRepair.dateSubmitted).toLocaleDateString()}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Est. Completion</span>
                  <strong>{new Date(searchedRepair.estimatedCompletionDate).toLocaleDateString()}</strong>
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Assigned Technician</span>
                <strong>{searchedRepair.assignedTechnicianId ? 'Alice Smartphone' : 'Pending Assignment'}</strong>
              </div>
            </div>
          </div>

          {/* Right Side: Timeline */}
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '32px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px' }}>Repair Progress</h3>
            <RepairTimeline repair={searchedRepair} />
          </div>

        </div>
      )}
    </div>
  );
}
