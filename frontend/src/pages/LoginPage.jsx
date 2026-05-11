import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const roleParam = searchParams.get('role') || 'attendant';
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAdmin = roleParam === 'admin';

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password, roleParam);
    
    if (result.success) {
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/staff/dashboard');
      }
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-md fade-in">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Landing</span>
        </button>

        <div className="glass rounded-[2.5rem] p-8 md:p-10 border border-white shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 premium-gradient rounded-2xl text-white shadow-lg mb-6">
              {isAdmin ? <Lock size={32} /> : <User size={32} />}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              {isAdmin ? 'Admin Portal' : 'Staff Portal'}
            </h1>
            <p className="text-slate-500">Welcome back to Nyakoe Boutique</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Remember me</span>
              </label>
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              className="w-full py-4 premium-gradient text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
            >
              Log In to Dashboard
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Not {isAdmin ? 'an admin' : 'staff'}? {' '}
              <button 
                onClick={() => navigate(`/login?role=${isAdmin ? 'attendant' : 'admin'}`)}
                className="font-bold text-slate-800 hover:text-blue-600 transition-colors"
              >
                Switch to {isAdmin ? 'Staff Portal' : 'Admin Portal'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
