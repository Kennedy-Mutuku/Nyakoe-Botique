import React from 'react';
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
  Package
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const isAdmin = role === 'admin';

  const menuItems = isAdmin ? [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <TrendingUp size={20} />, label: 'Reports', path: '/admin/reports' },
    { icon: <Package size={20} />, label: 'Inventory', path: '/admin/inventory' },
    { icon: <Scissors size={20} />, label: 'Tailoring', path: '/admin/tailoring' },
    { icon: <Users size={20} />, label: 'Customers', path: '/admin/customers' },
    { icon: <Receipt size={20} />, label: 'Expenses', path: '/admin/expenses' },
  ] : [
    { icon: <LayoutDashboard size={20} />, label: 'Home', path: '/staff/dashboard' },
    { icon: <ShoppingBag size={20} />, label: 'New Sale', path: '/staff/sales' },
    { icon: <Scissors size={20} />, label: 'Tailoring', path: '/staff/tailoring' },
    { icon: <Users size={20} />, label: 'Customers', path: '/staff/customers' },
  ];

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
          <ShoppingBag size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">Nyakoe <span className="premium-text-gradient">Boutique</span></span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group
              ${isActive 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
            `}
          >
            <span className="transition-transform group-hover:scale-110">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-6 border-t border-slate-50 space-y-4">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
            {isAdmin ? 'A' : 'S'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800">{isAdmin ? 'Admin User' : 'Staff Member'}</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{role}</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all font-semibold"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
