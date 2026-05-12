import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Scissors, 
  Users, 
  Receipt, 
  Settings, 
  LogOut,
  TrendingUp,
  Package,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const role = user?.role || 'attendant';
  const isAdmin = role === 'admin';

  const menuItems = isAdmin ? [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <TrendingUp size={20} />, label: 'Reports', path: '/admin/reports' },
    { icon: <Package size={20} />, label: 'Inventory', path: '/admin/inventory' },
    { icon: <Scissors size={20} />, label: 'Tailoring', path: '/admin/tailoring' },
    { icon: <Users size={20} />, label: 'Customers', path: '/admin/customers' },
    { icon: <Receipt size={20} />, label: 'Expenses', path: '/admin/expenses' },
  ] : [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/staff/dashboard' },
    { icon: <Package size={20} />, label: 'Stock View', path: '/staff/inventory' },
    { icon: <Scissors size={20} />, label: 'Tailoring', path: '/staff/tailoring' },
    { icon: <Users size={20} />, label: 'Customers', path: '/staff/customers' },
  ];

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Toggle Button - Even more compact & demure */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-32 left-4 z-50 p-2.5 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-blue-600 transition-all active:scale-90"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container - Floating Dropdown style for Mobile */}
      <div className={`
        fixed left-0 top-[114px] bg-white border-r border-slate-100 flex flex-col z-40
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isOpen 
          ? 'translate-x-0 w-56 h-auto max-h-[calc(100vh-140px)] rounded-br-[2.5rem] shadow-2xl visible' 
          : '-translate-x-full lg:translate-x-0 lg:w-56 lg:h-[calc(100vh-114px)] lg:visible invisible'}
      `}>
        <div className="p-5 border-b border-slate-50">
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] opacity-80">Management</p>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-60">Menu</p>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-50/50 text-blue-600 font-bold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
              `}
            >
              <span className="transition-transform group-hover:scale-110 scale-90">{item.icon}</span>
              <span className="text-[12px] tracking-tight">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-slate-50 space-y-3 bg-slate-50/30">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-blue-600 font-black shadow-sm text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] font-black text-slate-800 truncate uppercase tracking-tight">{user?.name || 'User'}</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{user?.role}</span>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-bold text-[11px] uppercase tracking-wider"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
