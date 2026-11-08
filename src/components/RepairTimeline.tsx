import type { Repair } from '../types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export function RepairTimeline({ repair }: { repair: Repair }) {
  // Define the 7 stages
  const stages = [
    { key: 'received', label: 'Request Received', desc: 'We have received your device.' },
    { key: 'diagnosis', label: 'Device Diagnosis', desc: 'Technician is inspecting the device.' },
    { key: 'approved', label: 'Repair Approved', desc: 'Estimate approved, waiting for parts.' },
    { key: 'in_progress', label: 'Repair in Progress', desc: 'Technician is working on the device.' },
    { key: 'inspection', label: 'Quality Inspection', desc: 'Final checks before handover.' },
    { key: 'completed', label: 'Repair Completed', desc: 'Device is fixed and ready.' },
    { key: 'ready', label: 'Ready for Collection', desc: 'Please pick up your device.' },
  ];

  // Map the repair status to an index (0 to 6)
  let currentIndex = 0;
  if (repair.status === 'Received') currentIndex = 0;
  else if (repair.status === 'Diagnosing') currentIndex = 1;
  else if (repair.status === 'Repairing') currentIndex = 3;
  else if (repair.status === 'Completed') currentIndex = 6;
  else if (repair.status === 'Cancelled') currentIndex = -1;

  if (repair.status === 'Cancelled') {
    return (
      <div style={{ padding: '24px', backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>Repair Cancelled</h3>
        <p style={{ marginTop: '8px' }}>This repair request has been cancelled.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {stages.map((stage, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <div key={stage.key} style={{ display: 'flex', gap: '16px' }}>
            {/* Timeline Line and Icon */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: isComplete ? 'var(--success)' : isCurrent ? 'var(--primary)' : 'var(--bg-main)',
                color: isComplete || isCurrent ? '#fff' : 'var(--text-muted)',
                border: `2px solid ${isComplete ? 'var(--success)' : isCurrent ? 'var(--primary)' : 'var(--border-color)'}`,
                zIndex: 1
              }}>
                {isComplete ? <CheckCircle2 size={18} /> : isCurrent ? <Clock size={18} /> : <Circle size={18} />}
              </div>
              {index !== stages.length - 1 && (
                <div style={{ 
                  width: '2px', height: '40px', 
                  backgroundColor: isComplete ? 'var(--success)' : 'var(--border-color)' 
                }} />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: index === stages.length - 1 ? '0' : '32px', paddingTop: '4px' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: isPending ? 'var(--text-muted)' : 'var(--text-main)' }}>
                {stage.label}
              </h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {stage.desc}
              </p>
              {isCurrent && (
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', marginTop: '4px', display: 'inline-block' }}>
                  Current Stage
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
