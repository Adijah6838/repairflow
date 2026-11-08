import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Wrench, Mail, Lock, ShieldCheck, User, Briefcase } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = login(email, password);
    if (result.success) {
      // The App.tsx routing will automatically redirect based on role
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setError('');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Left Branding Panel */}
      <div style={{ 
        flex: 1, backgroundColor: 'var(--nav-bg)', display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', padding: '64px', color: '#fff', position: 'relative', overflow: 'hidden' 
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wrench size={28} color="#fff" />
            </div>
            <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 700, letterSpacing: '-0.5px' }}>RepairFlow</h1>
          </div>
          <h2 style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '24px', color: '#f8fafc' }}>
            Smart Device Repair & Service Management.
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--nav-text)', lineHeight: 1.6 }}>
            Streamline your repair operations, track device diagnostics, and manage customer expectations all in one modern platform.
          </p>
        </div>
        {/* Abstract background decoration */}
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0) 70%)' }}></div>
      </div>

      {/* Right Form Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ width: '100%', maxWidth: '420px', padding: '40px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Welcome back</h2>
            <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to access your workspace.</p>
          </div>

          {error && (
            <div style={{ padding: '12px', backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', marginBottom: '24px', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@repairflow.test"
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
            </div>

            <button type="submit" style={{ padding: '12px', backgroundColor: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '1rem', marginTop: '8px' }}>
              Sign in
            </button>
          </form>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Demo Accounts (Password: demo123)</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => fillDemo('admin@repairflow.test')} style={{ flex: 1, padding: '8px', fontSize: '0.75rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><ShieldCheck size={14} /> Admin</button>
              <button onClick={() => fillDemo('technician@repairflow.test')} style={{ flex: 1, padding: '8px', fontSize: '0.75rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><Briefcase size={14} /> Tech</button>
              <button onClick={() => fillDemo('customer@repairflow.test')} style={{ flex: 1, padding: '8px', fontSize: '0.75rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><User size={14} /> Customer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
