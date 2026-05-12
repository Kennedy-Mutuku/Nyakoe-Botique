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
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([
    { id: 1, name: 'Cotton Summer Dress', price: 2500, stock: 15, category: 'Dresses', size: 'M' },
    { id: 2, name: 'Men Silk Tie', price: 1200, stock: 42, category: 'Accessories', size: 'One Size' },
    { id: 3, name: 'Linen Trousers', price: 3800, stock: 8, category: 'Pants', size: '34' },
    { id: 4, name: 'Classic White Shirt', price: 2200, stock: 25, category: 'Shirts', size: 'L' },
  ]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const finalTotal = Math.max(0, total - discount);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Reduce Stock Logic
    const updatedProducts = products.map(p => {
      const itemsInCart = cart.filter(item => item.id === p.id).length;
      return { ...p, stock: Math.max(0, p.stock - itemsInCart) };
    });
    
    setProducts(updatedProducts);
    alert(`🎉 Dispatch Successful!\nFinal Total: KSh ${finalTotal.toLocaleString()}\nDiscount Applied: KSh ${discount.toLocaleString()}\n\nStock levels have been automatically reduced.`);
    setCart([]);
    setDiscount(0);
  };

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-x-hidden">
      <Header />
      <Sidebar />
      
      <main className="flex-1 w-full p-3 md:p-8 pt-44 lg:pt-40 grid lg:grid-cols-3 gap-6 md:gap-8 overflow-x-hidden">
        {/* Main Recording Area */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8 max-w-full">
          <header className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">New Sale Recording</h1>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Nyakoe Retail Interface</p>
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
                    {product.stock} in stock
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900 truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1 mb-3">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{product.category}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span className="text-[9px] text-blue-600 font-black uppercase tracking-widest">Size: {product.size}</span>
                </div>
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

        {/* Cart Sidebar - More Compact & Demure */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-32 overflow-hidden">
            <div className="p-5 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Active Cart</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cart.length} Items</p>
                </div>
              </div>
            </div>

            <div className="p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 py-10">
                  <ShoppingCart size={40} strokeWidth={1} className="mb-3 opacity-20" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Ready for Sale</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group hover:bg-blue-50 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800">{item.name}</span>
                        <span className="text-[10px] font-bold text-blue-600">KSh {item.price.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-50 space-y-4 bg-slate-50/30">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Optional Discount (KSh)</label>
                  <input 
                    type="number" 
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-rose-600 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-300 transition-all"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>KSh {total.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[10px] font-bold text-rose-500 uppercase tracking-widest">
                      <span>Discount</span>
                      <span>- KSh {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-black text-slate-900 tracking-tight pt-1">
                    <span>Final Total</span>
                    <span className="text-blue-600">KSh {finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['cash', 'm-pesa'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      paymentMethod === method 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' 
                        : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <button 
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all ${
                  cart.length > 0
                    ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-900/10'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Complete Sale</span>
                <CheckCircle2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
