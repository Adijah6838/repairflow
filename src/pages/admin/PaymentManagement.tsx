import { useState } from 'react';
import { Search, Printer, CheckCircle } from 'lucide-react';
import { usePaymentStore } from '../../store/paymentStore';
import type { PaymentStatus } from '../../types';

export function PaymentManagement() {
  const { invoices, markAsPaid } = usePaymentStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'All'>('All');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.customerName.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase()) || inv.repairId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0);
  const outstanding = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((sum, inv) => sum + inv.total, 0);

  const handlePrint = () => {
    window.print();
  };

  // Find the invoice to preview
  const activeInvoice = invoices.find(i => i.id === selectedInvoice);

  if (activeInvoice) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }} className="no-print">
          <button onClick={() => setSelectedInvoice(null)} style={{ color: 'var(--primary)', fontWeight: 500 }}>← Back to Invoices</button>
          <button onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--nav-bg)', color: '#fff', borderRadius: 'var(--radius-sm)' }}>
            <Printer size={18} /> Print Invoice
          </button>
        </div>

        {/* Invoice Layout */}
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '48px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--border-color)', paddingBottom: '24px', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--primary)' }}>RepairFlow</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>123 Tech Avenue, Silicon Valley</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>INVOICE</h2>
              <p style={{ fontWeight: 600, marginTop: '4px' }}>{activeInvoice.id}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
            <div>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Billed To</h4>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>{activeInvoice.customerName}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h4 style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Details</h4>
              <p style={{ margin: 0 }}><strong>Repair ID:</strong> {activeInvoice.repairId}</p>
              <p style={{ margin: '4px 0 0 0' }}><strong>Issued:</strong> {new Date(activeInvoice.issuedAt).toLocaleDateString()}</p>
              <p style={{ margin: '4px 0 0 0' }}><strong>Due:</strong> {new Date(activeInvoice.dueDate).toLocaleDateString()}</p>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Service Charge (Labor)</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${activeInvoice.serviceCharge.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Parts Cost</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${activeInvoice.partsCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ padding: '16px 12px', fontWeight: 700, fontSize: '1.1rem' }}>Total</td>
                <td style={{ padding: '16px 12px', fontWeight: 700, fontSize: '1.1rem', textAlign: 'right', color: 'var(--primary)' }}>${activeInvoice.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ textAlign: 'center', marginTop: '64px', paddingTop: '24px', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Thank you for choosing RepairFlow!
          </div>
        </div>
        
        {/* Print styles */}
        <style>{`
          @media print {
            .no-print { display: none !important; }
            aside, header { display: none !important; }
            main { padding: 0 !important; }
            div[style*="marginLeft"] { margin: 0 !important; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Payments & Invoices</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--success)' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 500, margin: '0 0 8px 0' }}>Total Paid Revenue</p>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>${totalRevenue.toFixed(2)}</h2>
        </div>
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--warning)' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 500, margin: '0 0 8px 0' }}>Outstanding Payments</p>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>${outstanding.toFixed(2)}</h2>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" placeholder="Search invoice or customer..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}
          />
        </div>
        <select 
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}
          style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 600 }}>Invoice ID</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Repair ID</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Total</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>{inv.id}</td>
                <td style={{ padding: '16px' }}>{inv.customerName}</td>
                <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{inv.repairId}</td>
                <td style={{ padding: '16px', fontWeight: 600 }}>${inv.total.toFixed(2)}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
                    backgroundColor: inv.status === 'Paid' ? 'var(--success-bg)' : 'var(--warning-bg)',
                    color: inv.status === 'Paid' ? 'var(--success)' : 'var(--warning)'
                  }}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button onClick={() => setSelectedInvoice(inv.id)} style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.875rem', marginRight: '16px' }}>
                    View Invoice
                  </button>
                  {inv.status !== 'Paid' && (
                    <button onClick={() => markAsPaid(inv.id)} style={{ color: 'var(--success)', fontWeight: 500, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={16} /> Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
