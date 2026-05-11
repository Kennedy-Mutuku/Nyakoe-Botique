import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import InventoryPage from './pages/InventoryPage';
import TailoringPage from './pages/TailoringPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboards */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/inventory" element={<InventoryPage />} />
        <Route path="/admin/tailoring" element={<TailoringPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
        
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/tailoring" element={<TailoringPage />} />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
