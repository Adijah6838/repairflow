import { useState, useMemo } from 'react';
import { Search, Trash2, Edit, Save, X } from 'lucide-react';
import { useRepairStore } from '../../store/repairStore';
import { useTechnicianStore } from '../../store/technicianStore';
import { StatusBadge } from '../../components/StatusBadge';
import type { RepairStatus, RepairPriority, Repair } from '../../types';

const inputStyle = { width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', marginTop: '4px' };

export function RepairManagement() {
  const { repairs, deleteRepair, updateRepair } = useRepairStore();
  const { technicians } = useTechnicianStore();

  // Table State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<RepairStatus | 'All'>('All');
  const [techFilter, setTechFilter] = useState<string | 'All'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  // Edit Modal State
  const [editingRepair, setEditingRepair] = useState<Repair | null>(null);

  // Derived Data (Filtering & Sorting)
  const filteredData = useMemo(() => {
    let result = repairs;

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(r => 
        r.id.toLowerCase().includes(lowerSearch) || 
        r.customerName.toLowerCase().includes(lowerSearch) ||
        r.deviceModel.toLowerCase().includes(lowerSearch)
      );
    }

    if (statusFilter !== 'All') result = result.filter(r => r.status === statusFilter);
    if (techFilter !== 'All') result = result.filter(r => r.assignedTechnicianId === techFilter);

    const priorityWeight: Record<RepairPriority, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
    
    result = [...result].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime();
      } else if (sortBy === 'priority') {
        comparison = priorityWeight[a.priority] - priorityWeight[b.priority];
      }
      return sortDesc ? -comparison : comparison;
    });

    return result;
  }, [repairs, search, statusFilter, techFilter, sortBy, sortDesc]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleSort = (type: 'date' | 'priority') => {
    if (sortBy === type) setSortDesc(!sortDesc);
    else { setSortBy(type); setSortDesc(true); }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this repair record?')) {
      deleteRepair(id);
    }
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRepair) {
      // Recalculate total cost
      const updatedCost = editingRepair.serviceCharge + editingRepair.partsCost;
      updateRepair(editingRepair.id, { ...editingRepair, estimatedCost: updatedCost });
      setEditingRepair(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Repair Management</h1>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" placeholder="Search ID, Customer..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ padding: '10px 10px 10px 36px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none' }}
            />
          </div>

          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as any); setPage(1); }}
            style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}
          >
            <option value="All">All Statuses</option>
            <option value="Received">Received</option>
            <option value="Diagnosing">Diagnosing</option>
            <option value="Repairing">Repairing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select value={techFilter} onChange={(e) => { setTechFilter(e.target.value); setPage(1); }}
            style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}
          >
            <option value="All">All Technicians</option>
            {technicians.map(t => (
              <option key={t.id} value={t.id}>{t.fullName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600 }}>Repair ID</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Customer & Device</th>
              <th style={{ padding: '16px', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('date')}>
                Date {sortBy === 'date' && (sortDesc ? '↓' : '↑')}
              </th>
              <th style={{ padding: '16px', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleSort('priority')}>
                Priority {sortBy === 'priority' && (sortDesc ? '↓' : '↑')}
              </th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Technician</th>
              <th style={{ padding: '16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No repairs found.</td>
              </tr>
            ) : (
              paginatedData.map((repair) => (
                <tr key={repair.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 500 }}>{repair.id}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{repair.customerName}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{repair.deviceBrand} {repair.deviceModel}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.875rem' }}>
                    {new Date(repair.dateSubmitted).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ color: repair.priority === 'Urgent' ? 'var(--danger)' : repair.priority === 'High' ? 'var(--warning)' : 'var(--text-main)' }}>
                      {repair.priority}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}><StatusBadge status={repair.status} /></td>
                  <td style={{ padding: '16px', fontSize: '0.875rem' }}>
                    {technicians.find(t => t.id === repair.assignedTechnicianId)?.fullName || 'Unassigned'}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button onClick={() => setEditingRepair({...repair})} style={{ color: 'var(--text-muted)', marginRight: '12px' }} title="Edit"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(repair.id)} style={{ color: 'var(--danger)' }} title="Delete"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} entries
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)', opacity: page === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)}
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)', opacity: (page === totalPages || totalPages === 0) ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingRepair && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '24px' }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '600px', boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0 }}>Edit Repair: {editingRepair.id}</h2>
              <button onClick={() => setEditingRepair(null)} style={{ color: 'var(--text-muted)' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleEditSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Status</label>
                  <select value={editingRepair.status} onChange={e => setEditingRepair({...editingRepair, status: e.target.value as RepairStatus})} style={inputStyle}>
                    <option value="Received">Received</option>
                    <option value="Diagnosing">Diagnosing</option>
                    <option value="Repairing">Repairing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Priority</label>
                  <select value={editingRepair.priority} onChange={e => setEditingRepair({...editingRepair, priority: e.target.value as RepairPriority})} style={inputStyle}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Assigned Technician</label>
                <select value={editingRepair.assignedTechnicianId || ''} onChange={e => setEditingRepair({...editingRepair, assignedTechnicianId: e.target.value || null})} style={inputStyle}>
                  <option value="">Unassigned</option>
                  {technicians.map(t => (
                    <option key={t.id} value={t.id}>{t.fullName} ({t.specialization})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Service Charge ($)</label>
                  <input type="number" value={editingRepair.serviceCharge} onChange={e => setEditingRepair({...editingRepair, serviceCharge: Number(e.target.value)})} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Parts Cost ($)</label>
                  <input type="number" value={editingRepair.partsCost} onChange={e => setEditingRepair({...editingRepair, partsCost: Number(e.target.value)})} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Add Diagnostic Note (Optional)</label>
                <textarea 
                  rows={2} 
                  placeholder="Type a note and click Save..."
                  onChange={e => {
                    if (e.target.value) {
                      setEditingRepair({ ...editingRepair, diagnosticNotes: [...editingRepair.diagnosticNotes, e.target.value] });
                      e.target.value = ''; // clear input
                    }
                  }}
                  style={{ ...inputStyle, resize: 'vertical' }} 
                />
                <div style={{ marginTop: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {editingRepair.diagnosticNotes.map((note, i) => (
                    <div key={i} style={{ padding: '4px 0', borderBottom: '1px dashed var(--border-color)' }}>- {note}</div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setEditingRepair(null)} style={{ flex: 1, padding: '12px', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', fontWeight: 500, border: '1px solid var(--border-color)' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
