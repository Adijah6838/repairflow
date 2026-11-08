import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRepairStore } from '../../store/repairStore';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { newRepairSchema } from '../../utils/validation';
import type { NewRepairFormValues } from '../../utils/validation';
import { generateRepairId } from '../../utils/generateRepairId';
import type { Repair } from '../../types';

const inputStyle = { width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', marginTop: '4px' };
const errorStyle = { color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px' };

export function NewRepairRequest() {
  const { repairs, addRepair } = useRepairStore();
  const { session } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [successId, setSuccessId] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewRepairFormValues>({
    resolver: zodResolver(newRepairSchema),
    defaultValues: {
      customerName: session?.name || '',
      customerEmail: session?.email || '',
      deviceCategory: 'Smartphone',
    }
  });

  const onSubmit = (data: NewRepairFormValues) => {
    const newId = generateRepairId(repairs.map(r => r.id));
    const newRepair: Repair = {
      id: newId,
      customerId: session?.userId || 'c-1',
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      deviceBrand: data.deviceBrand,
      deviceModel: data.deviceModel,
      deviceCategory: data.deviceCategory,
      reportedProblem: data.reportedProblem,
      dateSubmitted: new Date().toISOString(),
      preferredServiceDate: data.preferredServiceDate,
      estimatedCompletionDate: new Date(Date.now() + 7 * 86400000).toISOString(),
      completedAt: null,
      assignedTechnicianId: null,
      priority: 'Medium',
      status: 'Received',
      serviceCharge: 50,
      partsCost: 0,
      estimatedCost: 50,
      diagnosticNotes: [],
      workPerformed: [],
    };

    addRepair(newRepair);
    
    // Trigger Notification for Admin
    addNotification({
      type: 'request_created',
      title: 'New Repair Request',
      message: `${data.customerName} submitted a new request ${newId}.`,
      audience: 'admin',
    });

    setSuccessId(newId);
    reset();
  };

  if (successId) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 24px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ color: 'var(--success)', marginBottom: '16px' }}>Request Submitted Successfully!</h2>
        <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>Your repair request has been received.</p>
        <div style={{ display: 'inline-block', padding: '16px 32px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--primary)', marginBottom: '24px' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Your Tracking ID</span>
          <strong style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{successId}</strong>
        </div>
        <br />
        <button onClick={() => setSuccessId(null)} style={{ padding: '10px 20px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)' }}>
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>New Repair Request</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
          <input {...register('customerName')} style={inputStyle} />
          {errors.customerName && <p style={errorStyle}>{errors.customerName.message}</p>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
            <input type="email" {...register('customerEmail')} style={inputStyle} />
            {errors.customerEmail && <p style={errorStyle}>{errors.customerEmail.message}</p>}
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Phone</label>
            <input type="tel" {...register('customerPhone')} style={inputStyle} />
            {errors.customerPhone && <p style={errorStyle}>{errors.customerPhone.message}</p>}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Category</label>
            <select {...register('deviceCategory')} style={inputStyle}>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>
              <option value="Gaming Console">Gaming Console</option>
              <option value="Television">Television</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Brand</label>
            <input {...register('deviceBrand')} placeholder="e.g. Apple" style={inputStyle} />
            {errors.deviceBrand && <p style={errorStyle}>{errors.deviceBrand.message}</p>}
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Model</label>
            <input {...register('deviceModel')} placeholder="e.g. iPhone 14" style={inputStyle} />
            {errors.deviceModel && <p style={errorStyle}>{errors.deviceModel.message}</p>}
          </div>
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Problem Description</label>
          <textarea {...register('reportedProblem')} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe the issue in detail..." />
          {errors.reportedProblem && <p style={errorStyle}>{errors.reportedProblem.message}</p>}
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Preferred Service Date (Optional)</label>
          <input type="date" {...register('preferredServiceDate')} style={inputStyle} />
        </div>
        <button type="submit" style={{ marginTop: '8px', padding: '12px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
          Submit Request
        </button>
      </form>
    </div>
  );
}
