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
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 w-full lg:ml-72 p-3 md:p-8 pt-20 lg:pt-8 grid lg:grid-cols-3 gap-6 md:gap-8 overflow-x-hidden">
        {/* Main Recording Area */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8 max-w-full">
          <header>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">New Sale Recording</h1>
            <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Search products and add to cart for checkout.</p>
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

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <Package size={28} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    product.stock < 10 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {product.stock} in stock
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h3>
                <p className="text-slate-400 text-sm font-semibold mb-4">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-slate-900">KSh {product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart & Checkout */}
        <div className="space-y-6 md:space-y-8 max-w-full">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-auto lg:h-[calc(100vh-64px)] lg:sticky lg:top-8">
            <div className="p-8 border-b border-slate-50">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart className="text-blue-500" />
                <h2 className="text-2xl font-black text-slate-900">Current Cart</h2>
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{cart.length} items added</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingCart size={64} className="mb-4" />
                  <p className="font-bold">Your cart is empty</p>
                  <p className="text-sm">Start adding products to record a sale</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl group animate-in slide-in-from-right-4 duration-300">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 font-bold border border-slate-100">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs font-black text-slate-400">KSh {item.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(idx)}
                      className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Subtotal</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Tax (0%)</span>
                  <span>KSh 0</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-2xl pt-2">
                  <span>Total</span>
                  <span className="premium-text-gradient">KSh {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Payment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
                      paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    Cash
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
                      paymentMethod === 'mpesa' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    M-Pesa
                  </button>
                </div>
              </div>

              <button 
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] ${
                  cart.length > 0 
                  ? 'premium-gradient text-white shadow-blue-500/20 hover:shadow-blue-500/40' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                Complete Recording <CheckCircle2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
