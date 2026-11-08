import { Menu, Bell, Check } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { ThemeToggle } from './ThemeToggle';
import { useNotificationStore } from '../store/notificationStore';

export function Navbar() {
  const { session } = useAuthStore();
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter notifications meant for this role
  const myNotifs = notifications.filter(n => n.audience === 'all' || n.audience === session?.role);
  const unreadCount = myNotifs.filter(n => !n.read).length;

  return (
    <header style={{
      height: 'var(--navbar-height)', backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ color: 'var(--text-muted)', display: 'flex' }}>
          <Menu size={24} />
        </button>
        <h1 style={{ fontSize: '1.25rem', margin: 0, textTransform: 'capitalize' }}>
          {session?.role} Portal
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ThemeToggle />
        
        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            style={{ color: 'var(--text-muted)', position: 'relative', display: 'flex', padding: '8px', borderRadius: '50%', backgroundColor: isDropdownOpen ? 'var(--bg-main)' : 'transparent' }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, width: '10px', height: '10px', backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--bg-surface)' }}></span>
            )}
          </button>

          {/* Dropdown Panel */}
          {isDropdownOpen && (
            <>
              {/* Backdrop to close */}
              <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setIsDropdownOpen(false)} />
              
              <div style={{ 
                position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '320px', 
                backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 100, overflow: 'hidden' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
                  <h4 style={{ margin: 0, fontSize: '0.875rem' }}>Notifications</h4>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                      <Check size={14} /> Mark all read
                    </button>
                  )}
                </div>
                
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {myNotifs.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>No notifications</div>
                  ) : (
                    myNotifs.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => markAsRead(n.id)}
                        style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', backgroundColor: n.read ? 'transparent' : 'var(--bg-main)', cursor: 'pointer', transition: 'background-color 0.2s' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '0.875rem', color: n.read ? 'var(--text-muted)' : 'var(--text-main)' }}>{n.title}</strong>
                          {!n.read && <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', marginTop: '4px' }} />}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{n.message}</p>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>
                          {new Date(n.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          {session?.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}
