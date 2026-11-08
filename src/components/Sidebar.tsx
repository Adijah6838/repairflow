import { LayoutDashboard, Wrench, Users, CreditCard, Settings, LogOut, Search } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const { session, logout } = useAuthStore();
  const location = useLocation();

  if (!session) return null;

  const menuItems = {
    admin: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
      { icon: Wrench, label: 'Repairs', path: '/admin/repairs' },
      { icon: Users, label: 'Technicians', path: '/admin/technicians' },
      { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    ],
    technician: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/technician' },
      { icon: Wrench, label: 'Kanban Board', path: '/technician/kanban' },
    ],
    customer: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/customer' },
      { icon: Search, label: 'Track Repair', path: '/customer/track' },
      { icon: Wrench, label: 'My Repairs', path: '/customer/history' },
      { icon: Settings, label: 'New Request', path: '/customer/new' },
    ],
  };

  const items = menuItems[session.role] || [];

  return (
    <aside style={{
      width: 'var(--sidebar-width)', backgroundColor: 'var(--nav-bg)', color: 'var(--nav-text)',
      height: '100vh', display: 'flex', flexDirection: 'column', position: 'fixed',
      left: 0, top: 0, borderRight: '1px solid var(--border-color)',
    }}>
      <div style={{ padding: '24px', borderBottom: '1px solid var(--nav-item-hover)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>RF</div>
        <h2 style={{ color: '#fff', margin: 0, fontSize: '1.25rem' }}>RepairFlow</h2>
      </div>

      <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                borderRadius: 'var(--radius-sm)', color: isActive ? '#fff' : 'var(--nav-text)',
                backgroundColor: isActive ? 'var(--nav-item-hover)' : 'transparent',
                textDecoration: 'none', transition: 'background-color 0.2s',
            }}>
              <item.icon size={20} />
              <span style={{ fontWeight: 500 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '24px 16px', borderTop: '1px solid var(--nav-item-hover)' }}>
        <button onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', width: '100%',
            color: 'var(--danger)', borderRadius: 'var(--radius-sm)', transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <LogOut size={20} />
          <span style={{ fontWeight: 500 }}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
