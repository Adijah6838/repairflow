import { useState } from 'react';
import { Search, UserPlus, Trash2, Wrench, CheckCircle } from 'lucide-react';
import { useTechnicianStore } from '../../store/technicianStore';
import { useRepairStore } from '../../store/repairStore';
import type { TechnicianSpecialization, TechnicianAvailability } from '../../types';

export function TechnicianManagement() {
  const { technicians, addTechnician, deleteTechnician } = useTechnicianStore();
  const { repairs } = useRepairStore();
  
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState<TechnicianSpecialization | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Tech Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSpec, setNewSpec] = useState<TechnicianSpecialization>('Smartphones');

  const filteredTechs = technicians.filter(t => {
    const matchesSearch = t.fullName.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = specFilter === 'All' || t.specialization === specFilter;
    return matchesSearch && matchesSpec;
  });

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    const newTech = {
      id: `t-${Date.now()}`,
      fullName: newName,
      email: newEmail,
      specialization: newSpec,
      availability: 'Available' as TechnicianAvailability,
      joinedAt: new Date().toISOString(),
    };
    addTechnician(newTech);
    setIsModalOpen(false);
    setNewName(''); setNewEmail(''); setNewSpec('Smartphones');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Technician Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 500 }}
        >
          <UserPlus size={18} /> Add Technician
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" placeholder="Search name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}
          />
        </div>
        <select 
          value={specFilter} onChange={(e) => setSpecFilter(e.target.value as any)}
          style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}
        >
          <option value="All">All Specializations</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Laptops">Laptops</option>
          <option value="Tablets">Tablets</option>
          <option value="Gaming Consoles">Gaming Consoles</option>
          <option value="Television Systems">Television Systems</option>
        </select>
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600 }}>Technician</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Specialization</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Availability</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Performance</th>
              <th style={{ padding: '16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechs.map((tech) => {
              // Calculate stats dynamically from the repair store
              const assigned = repairs.filter(r => r.assignedTechnicianId === tech.id).length;
              const completed = repairs.filter(r => r.assignedTechnicianId === tech.id && r.status === 'Completed').length;
              
              return (
                <tr key={tech.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{tech.fullName}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{tech.email}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.875rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--bg-main)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                      <Wrench size={14} /> {tech.specialization}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      color: tech.availability === 'Available' ? 'var(--success)' : tech.availability === 'Busy' ? 'var(--warning)' : 'var(--text-muted)',
                      fontWeight: 500, fontSize: '0.875rem'
                    }}>
                      • {tech.availability}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{completed} / {assigned} Completed</div>
                    <div style={{ width: '100px', height: '6px', backgroundColor: 'var(--bg-main)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${assigned > 0 ? (completed / assigned) * 100 : 0}%`, height: '100%', backgroundColor: 'var(--success)' }}></div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button onClick={() => deleteTechnician(tech.id)} style={{ color: 'var(--danger)', padding: '8px' }} title="Remove Technician">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>Add New Technician</h2>
            <form onSubmit={handleAddTech} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input required value={newName} onChange={e => setNewName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Email</label>
                <input required type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Specialization</label>
                <select value={newSpec} onChange={e => setNewSpec(e.target.value as any)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Tablets">Tablets</option>
                  <option value="Gaming Consoles">Gaming Consoles</option>
                  <option value="Television Systems">Television Systems</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', fontWeight: 500, border: '1px solid var(--border-color)' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 500 }}>Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
