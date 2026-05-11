import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  AlertTriangle,
  ArrowUpDown,
  Download,
  Trash2,
  Edit3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const InventoryPage = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const inventory = [
    { id: 'PRD-001', name: 'Cotton Summer Dress', category: 'Dresses', buying: 1500, selling: 2500, stock: 15, supplier: 'Global Textiles' },
    { id: 'PRD-002', name: 'Men Silk Tie', category: 'Accessories', buying: 500, selling: 1200, stock: 42, supplier: 'Silk Road' },
    { id: 'PRD-003', name: 'Linen Trousers', category: 'Pants', buying: 2200, selling: 3800, stock: 8, supplier: 'Quality Linens' },
    { id: 'PRD-004', name: 'Classic White Shirt', category: 'Shirts', buying: 1200, selling: 2200, stock: 25, supplier: 'Shirt Co.' },
    { id: 'PRD-005', name: 'School Uniform Set', category: 'Uniforms', buying: 1800, selling: 3500, stock: 5, supplier: 'Local Garments' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-0 lg:ml-72 p-4 md:p-8 pt-20 lg:pt-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Inventory Management</h1>
            <p className="text-slate-500 font-medium mt-1">Manage stock, prices, and suppliers professionally.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => alert('Inventory CSV Export started...')}
              className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Download size={20} />
              <span>Export CSV</span>
            </button>
            {user?.role === 'admin' && (
              <button 
                onClick={() => setShowModal(true)}
                className="px-6 py-3 premium-gradient text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </header>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Products', value: '1,245', icon: <Package className="text-blue-500" />, color: 'bg-blue-50' },
            { label: 'Total Value', value: 'KSh 1.2M', icon: <Package className="text-emerald-500" />, color: 'bg-emerald-50' },
            { label: 'Low Stock Items', value: '12', icon: <AlertTriangle className="text-rose-500" />, color: 'bg-rose-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name, ID or category..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
            />
          </div>
          <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-all border border-transparent">
            <Filter size={20} />
            <span>Category</span>
          </button>
          <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-all border border-transparent">
            <ArrowUpDown size={20} />
            <span>Sort by</span>
          </button>
        </div>

        {/* Inventory Table (Desktop) / Cards (Mobile) */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              {/* ... table content remains ... */}
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Buying Price</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Selling Price</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 w-20 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventory.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase())).map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          <Package size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{row.name}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold">KSh {row.buying.toLocaleString()}</td>
                    <td className="px-8 py-6 text-slate-900 font-black">KSh {row.selling.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <span className="font-black text-slate-900">{row.stock}</span>
                      <span className="text-slate-400 text-xs font-bold ml-1">units</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        row.stock < 10 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {row.stock < 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {user?.role === 'admin' ? (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Edit3 size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 uppercase">View Only</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-slate-50">
            {inventory.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase())).map((row) => (
              <div key={row.id} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{row.name}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    row.stock < 10 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {row.stock} Units
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Price</p>
                    <p className="text-sm font-black text-slate-900">KSh {row.selling.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</p>
                    <p className="text-xs font-bold text-slate-600 uppercase">{row.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Product Modal (Simplified) */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden fade-in">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900">Add New Product</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors">✕</button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 ml-1">Product Name</label>
                  <input type="text" placeholder="Enter product name..." className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">Category</label>
                    <select className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium appearance-none">
                      <option>Dresses</option>
                      <option>Suits</option>
                      <option>Shirts</option>
                      <option>Pants</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">Initial Stock</label>
                    <input type="number" placeholder="0" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">Buying Price (KSh)</label>
                    <input type="number" placeholder="0" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">Selling Price (KSh)</label>
                    <input type="number" placeholder="0" className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-white/80 transition-all">Cancel</button>
                <button 
                  onClick={() => { alert('🎉 Product Saved Successfully!'); setShowModal(false); }}
                  className="px-10 py-3 premium-gradient text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InventoryPage;
