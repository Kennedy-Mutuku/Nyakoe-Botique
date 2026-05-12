import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Search, 
  Plus, 
  ShoppingCart, 
  Package, 
  User, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Trash2
} from 'lucide-react';

import Header from '../components/Header';

const StaffDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const products = [
    { id: 1, name: 'Cotton Summer Dress', price: 2500, stock: 15, category: 'Dresses' },
    { id: 2, name: 'Men Silk Tie', price: 1200, stock: 42, category: 'Accessories' },
    { id: 3, name: 'Linen Trousers', price: 3800, stock: 8, category: 'Pants' },
    { id: 4, name: 'Classic White Shirt', price: 2200, stock: 25, category: 'Shirts' },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`🎉 Sale Recorded Successfully!\nTotal: KSh ${total.toLocaleString()}\nMethod: ${paymentMethod.toUpperCase()}`);
    setCart([]);
  };

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-x-hidden">
      <Header />
      <Sidebar />
      
      <main className="flex-1 w-full p-3 md:p-8 pt-36 lg:pt-32 grid lg:grid-cols-3 gap-6 md:gap-8 overflow-x-hidden">
        {/* Main Recording Area */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8 max-w-full">
          <header className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">New Sale Recording</h1>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Nyakoe Retail Interface</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Attendant Admin
            </div>
          </header>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3.5 md:py-4 bg-white border border-slate-200 rounded-[2rem] shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-sm md:text-base"
              />
            </div>
            <button 
              onClick={() => alert('Filter feature coming soon!')}
              className="w-full md:w-auto px-6 py-4 bg-white border border-slate-200 rounded-[2rem] text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Product Grid - Denser for efficiency */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                    <Package size={20} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${
                    product.stock < 10 ? 'text-rose-500' : 'text-emerald-500'
                  }`}>
                    {product.stock} left
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate">{product.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-slate-900">KSh {product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-all active:scale-95"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart & Checkout - Compact & Professional */}
        <div className="space-y-6 max-w-full">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-auto lg:h-[calc(100vh-160px)] lg:sticky lg:top-36">
            <div className="p-6 border-b border-slate-50">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCart className="text-blue-500" size={20} />
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active Cart</h2>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{cart.length} items</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-10">
                  <ShoppingCart size={48} className="mb-2" />
                  <p className="text-xs font-bold uppercase tracking-widest">Ready for sale</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl group transition-all">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-tight">KSh {item.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(idx)}
                      className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-500 font-bold text-[10px] uppercase">
                  <span>Subtotal</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-xl pt-1">
                  <span>Total</span>
                  <span className="text-blue-600">KSh {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setPaymentMethod('cash')}
                  className={`py-2 px-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                    paymentMethod === 'cash' ? 'border-blue-500 bg-white text-blue-600' : 'border-slate-200 text-slate-400 bg-transparent'
                  }`}
                >
                  Cash
                </button>
                <button 
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`py-2 px-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                    paymentMethod === 'mpesa' ? 'border-blue-500 bg-white text-blue-600' : 'border-slate-200 text-slate-400 bg-transparent'
                  }`}
                >
                  M-Pesa
                </button>
              </div>

              <button 
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${
                  cart.length > 0 
                  ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                Complete Sale <CheckCircle2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
