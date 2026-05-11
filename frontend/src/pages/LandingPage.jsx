import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Scissors, BarChart3, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
            <ShoppingBag size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Nyakoe <span className="premium-text-gradient">Boutique</span></span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/login?role=attendant')}
            className="hidden md:block px-5 py-2 text-slate-600 font-medium hover:text-slate-900 transition-colors"
          >
            Staff Login
          </button>
          <button 
            onClick={() => navigate('/login?role=admin')}
            className="px-6 py-2.5 premium-gradient text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Admin Portal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6">
              <CheckCircle2 size={16} />
              <span>Professional Business Management</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              Elevate Your <br />
              <span className="premium-text-gradient">Boutique Operations</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Streamline your sales, manage complex tailoring orders, and monitor business growth with our all-in-one professional management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/login?role=attendant')}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                Start Recording Sales <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/login?role=admin')}
                className="px-8 py-4 glass text-slate-800 rounded-2xl font-bold border border-slate-200 hover:bg-white transition-all active:scale-95"
              >
                View Insights
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-slate-400">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-800">100%</span>
                <span className="text-xs uppercase tracking-wider font-semibold">Reliable</span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-800">Real-time</span>
                <span className="text-xs uppercase tracking-wider font-semibold">Analytics</span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-800">Secure</span>
                <span className="text-xs uppercase tracking-wider font-semibold">Encryption</span>
              </div>
            </div>
          </div>
          
          <div className="relative fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl rounded-full"></div>
            <div className="relative glass rounded-[2.5rem] p-8 border border-white shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-4">
                  <div className="h-40 bg-blue-50 rounded-3xl p-6 flex flex-col justify-end">
                    <BarChart3 className="text-blue-500 mb-2" size={32} />
                    <span className="text-slate-800 font-bold">Sales Insights</span>
                  </div>
                  <div className="h-32 bg-purple-50 rounded-3xl p-6 flex flex-col justify-end">
                    <Users className="text-purple-500 mb-2" size={32} />
                    <span className="text-slate-800 font-bold">Customers</span>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-32 bg-amber-50 rounded-3xl p-6 flex flex-col justify-end">
                    <Scissors className="text-amber-500 mb-2" size={32} />
                    <span className="text-slate-800 font-bold">Tailoring</span>
                  </div>
                  <div className="h-40 bg-emerald-50 rounded-3xl p-6 flex flex-col justify-end">
                    <ShoppingBag className="text-emerald-500 mb-2" size={32} />
                    <span className="text-slate-800 font-bold">Inventory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Features for Your Business</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Designed to make your boutique and tailoring shop run smoothly and profitably.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <ShoppingBag className="text-blue-500" />, title: 'Smart POS', desc: 'Record sales instantly with automatic stock reduction and profit tracking.' },
              { icon: <Scissors className="text-purple-500" />, title: 'Tailoring Management', desc: 'Track measurements, design notes, and order progress in one place.' },
              { icon: <BarChart3 className="text-emerald-500" />, title: 'Advanced Reports', desc: 'Beautiful graphs for daily, weekly, and monthly business performance.' }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center text-white">
              <ShoppingBag size={18} />
            </div>
            <span className="font-bold text-slate-800">Nyakoe Boutique</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Nyakoe Boutique. Built for professional management.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
