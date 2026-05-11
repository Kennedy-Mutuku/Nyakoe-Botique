import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import InventoryPage from './pages/InventoryPage';
import TailoringPage from './pages/TailoringPage';
import ReportsPage from './pages/ReportsPage';
import CustomersPage from './pages/CustomersPage';
import ExpensesPage from './pages/ExpensesPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Protected Routes */}
        <Route 
          path="/admin/dashboard" 
          element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/inventory" 
          element={<ProtectedRoute allowedRoles={['admin']}><InventoryPage /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/tailoring" 
          element={<ProtectedRoute allowedRoles={['admin']}><TailoringPage /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/reports" 
          element={<ProtectedRoute allowedRoles={['admin']}><ReportsPage /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/customers" 
          element={<ProtectedRoute allowedRoles={['admin']}><CustomersPage /></ProtectedRoute>} 
        />
        <Route 
          path="/admin/expenses" 
          element={<ProtectedRoute allowedRoles={['admin']}><ExpensesPage /></ProtectedRoute>} 
        />
        
        {/* Staff Protected Routes */}
        <Route 
          path="/staff/dashboard" 
          element={<ProtectedRoute allowedRoles={['attendant', 'tailor']}><StaffDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/staff/sales" 
          element={<ProtectedRoute allowedRoles={['attendant']}><StaffDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/staff/tailoring" 
          element={<ProtectedRoute allowedRoles={['attendant', 'tailor']}><TailoringPage /></ProtectedRoute>} 
        />
        <Route 
          path="/staff/customers" 
          element={<ProtectedRoute allowedRoles={['attendant']}><CustomersPage /></ProtectedRoute>} 
        />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
