import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, X, LogOut, LayoutGrid,
  LayoutDashboard, TrendingUp, Package, Scissors, Users, Receipt
} from 'lucide-react';
import logo from '../assets/logo bq.png';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = !!user;
  const role = user?.role || 'attendant';
  const isAdmin = role === 'admin';

  const menuItems = isAdmin ? [
    { icon: <LayoutDashboard size={14} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <TrendingUp size={14} />, label: 'Reports', path: '/admin/reports' },
    { icon: <Package size={14} />, label: 'Inventory', path: '/admin/inventory' },
    { icon: <Scissors size={14} />, label: 'Tailoring', path: '/admin/tailoring' },
    { icon: <Users size={14} />, label: 'Customers', path: '/admin/customers' },
    { icon: <Receipt size={14} />, label: 'Expenses', path: '/admin/expenses' },
  ] : [
    { icon: <LayoutDashboard size={14} />, label: 'Dashboard', path: '/staff/dashboard' },
    { icon: <Package size={14} />, label: 'Stock View', path: '/staff/inventory' },
    { icon: <Scissors size={14} />, label: 'Tailoring', path: '/staff/tailoring' },
    { icon: <Users size={14} />, label: 'Customers', path: '/staff/customers' },
  ];

  const handleSignOut = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-black/5">
      {/* Top Contact Strip - Vibrant Bright Blue */}
      <div className="bg-blue-600 text-white py-2 px-6 md:px-12 flex justify-between items-center text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium border-b border-white/5">
        <div className="flex items-center gap-6">
          <span className="opacity-80 uppercase">{isLoggedIn ? `AUTHENTICATED: ${user.role.toUpperCase()}` : 'PH: +254 762 053 876'}</span>
          {!isLoggedIn && <span className="hidden sm:inline opacity-80 border-l border-white/20 pl-6 uppercase">info.nyakoeboutique@gmail.com</span>}
        </div>
        <div className="hidden md:block opacity-60 italic serif-font lowercase tracking-normal text-xs">
          {isLoggedIn ? `Welcome back, ${user.name}` : 'Elegance in every stitch'}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between py-4">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-6 cursor-pointer group" onClick={() => navigate(isLoggedIn ? '#' : '/')}>
            <div className="relative">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-12 md:h-16 w-auto mix-blend-multiply"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl md:text-4xl font-black tracking-[-0.05em] uppercase text-black">
                NYAKOE
              </span>
              <span className="serif-font italic text-sm md:text-xl font-light text-amber-800">
                Boutique
              </span>
            </div>
          </div>
          
          {/* Navigation Area */}
          {isLoggedIn ? (
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center gap-8 xl:gap-12">
                {menuItems.map((item, idx) => (
                  <NavLink
                    key={idx}
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-2.5 py-6 px-1 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group
                      border-b-2 
                      ${isActive 
                        ? 'text-blue-600 border-blue-600' 
                        : 'text-slate-400 border-transparent hover:text-slate-900 hover:border-slate-200'}
                    `}
                  >
                    <span className={`transition-transform group-hover:-translate-y-0.5`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            /* Public Navigation - Home First, then Management links */
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center gap-8 xl:gap-12">
                <button 
                  onClick={() => navigate('/')}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-black transition-all py-1 border-b-2 border-transparent hover:border-black"
                >
                  Home
                </button>
                {['Management', 'Tailoring', 'Inventory', 'Insights'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => navigate(item === 'Management' ? '/login?role=admin' : '/login?role=attendant')}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-black transition-all py-1 border-b-2 border-transparent hover:border-black"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Right Control Cluster */}
          <div className="flex items-center gap-3 md:gap-6">
            {isLoggedIn ? (
              /* Logged In View - Simplified & Mobile Optimized */
              <div className="flex items-center gap-3 md:gap-6">
                {/* User Identity Badge - Desktop Only */}
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black shadow-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-[8px] font-bold text-blue-600 uppercase tracking-tighter mt-1">
                      {user?.role === 'admin' ? 'Super Admin' : 'Attendant Admin'}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('toggleSidebar'))}
                  className="lg:hidden flex items-center justify-center p-2.5 bg-slate-50 text-blue-600 rounded-xl hover:bg-blue-50 transition-all active:scale-90 border border-slate-100"
                  title="Management Menu"
                >
                  <LayoutGrid size={20} />
                </button>
                
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/10"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline">Log Out</span>
                </button>
              </div>
            ) : (
              /* Public View - Portal Links */
              <div className="hidden lg:flex items-center gap-10">
                <button 
                  onClick={() => navigate('/login?role=admin')}
                  className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-black transition-all"
                >
                  Admin Portal
                </button>
                <button 
                  onClick={() => navigate('/login?role=attendant')}
                  className="px-8 py-2.5 text-[10px] uppercase tracking-[0.3em] font-bold border border-black bg-black text-white hover:bg-transparent hover:text-black transition-all shadow-xl shadow-black/10"
                >
                  Staff Login
                </button>
              </div>
            )}
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Corner Menu - ONLY for public users */}
      {!isLoggedIn && (
        <div className={`absolute top-full right-0 w-auto min-w-[240px] bg-white z-[60] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top-right border-t border-black/5 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
        <div className="p-10 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            {['Management', 'Tailoring', 'Inventory', 'Insights'].map((item, i) => (
              <a 
                key={item} 
                href="#" 
                className={`block text-2xl serif-font italic transition-all duration-500 hover:translate-x-2 ${
                  isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="flex flex-col gap-4 border-t border-black/5 pt-6">
            <button 
              onClick={() => { navigate('/login?role=attendant'); setIsMenuOpen(false); }}
              className="w-full py-4 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold"
            >
              Staff Login
            </button>
            <button 
              onClick={() => { navigate('/login?role=admin'); setIsMenuOpen(false); }}
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/60 hover:text-black transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Mobile-Only Professional Green Welcome Strip */}
    {isLoggedIn && (
      <div className="lg:hidden bg-emerald-600 text-white h-7 flex items-center justify-center px-6 border-t border-white/10">
        <p className="text-[9px] font-black uppercase tracking-[0.3em]">
          Welcome {user?.role === 'admin' ? 'Super Admin' : 'Attendant Admin'} — Management
        </p>
      </div>
    )}
  </nav>
);
};

export default Header;
