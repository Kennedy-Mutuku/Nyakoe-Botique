import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import logo from '../assets/logo bq.png';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = !!user;

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
              <span className="text-2xl md:text-4xl font-black tracking-[-0.05em] uppercase text-black">
                NYAKOE
              </span>
              <span className="serif-font italic text-lg md:text-xl font-light text-amber-800">
                Boutique
              </span>
            </div>
          </div>
          
          {/* Navigation Links - ONLY for landing page (not logged in) */}
          {!isLoggedIn && (
            <div className="hidden lg:flex items-center gap-8">
              {['Management', 'Tailoring', 'Inventory', 'Insights'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-[10px] uppercase tracking-[0.3em] font-bold text-black hover:opacity-60 transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            /* Logged In View - Simplified */
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-bold border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/10"
            >
              <LogOut size={14} />
              <span>Log Out Securely</span>
            </button>
          ) : (
            /* Public View - Portal Links */
            <>
              <button 
                onClick={() => navigate('/login?role=admin')}
                className="hidden md:block text-[10px] uppercase tracking-[0.3em] font-bold text-black hover:opacity-60 transition-all"
              >
                Admin Portal
              </button>
              <button 
                onClick={() => navigate('/login?role=attendant')}
                className="hidden sm:block px-8 py-2.5 text-[10px] uppercase tracking-[0.3em] font-bold border bg-black text-white border-black hover:bg-transparent hover:text-black transition-all"
              >
                Staff Login
              </button>
            </>
          )}
          
          {/* Mobile Menu Toggle - Only if not logged in (sidebar handles dashboard mobile) */}
          {!isLoggedIn && (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden transition-all relative z-[60] text-black"
            >
              {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          )}
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
  </nav>
);
};

export default Header;
