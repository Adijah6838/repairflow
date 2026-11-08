import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AdminLayout } from './layouts/AdminLayout';
import { useThemeStore } from './store/themeStore';
import { useAuthStore } from './store/authStore';
import { Login } from './pages/auth/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { RepairManagement } from './pages/admin/RepairManagement';
import { TechnicianManagement } from './pages/admin/TechnicianManagement';
import { PaymentManagement } from './pages/admin/PaymentManagement';
import { TechnicianDashboard } from './pages/technician/TechnicianDashboard';
import { KanbanBoard } from './pages/technician/KanbanBoard';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { NewRepairRequest } from './pages/customer/NewRepairRequest';
import { TrackRepair } from './pages/customer/TrackRepair';
import { RepairHistory } from './pages/customer/RepairHistory';
import './App.css';

function App() {
  const theme = useThemeStore((state) => state.theme);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to={`/${session.role}`} replace />} />
        
        <Route element={session ? <AdminLayout /> : <Navigate to="/login" replace />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/repairs" element={<RepairManagement />} />
          <Route path="/admin/technicians" element={<TechnicianManagement />} />
          <Route path="/admin/payments" element={<PaymentManagement />} />
          
          <Route path="/technician" element={<TechnicianDashboard />} />
          <Route path="/technician/kanban" element={<KanbanBoard />} />
          
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/new" element={<NewRepairRequest />} />
          <Route path="/customer/track" element={<TrackRepair />} />
          <Route path="/customer/history" element={<RepairHistory />} />
        </Route>

        <Route path="*" element={<Navigate to={session ? `/${session.role}` : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
