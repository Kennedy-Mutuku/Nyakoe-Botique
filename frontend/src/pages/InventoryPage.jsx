import React, { useState } from 'react';
import Header from '../components/Header';
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
  Edit3,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const InventoryPage = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [variants, setVariants] = useState([]);
  const [newSize, setNewSize] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // Initial Data
  const initialItems = [
    { id: 'PRD-001', name: 'Cotton Summer Dress', category: 'Dresses', buying: 1500, selling: 2500, stock: 15, supplier: 'Global Textiles' },
    { id: 'PRD-002', name: 'Men Silk Tie', category: 'Accessories', buying: 500, selling: 1200, stock: 42, supplier: 'Silk Road' },
    { id: 'PRD-003', name: 'Linen Trousers', category: 'Pants', buying: 2200, selling: 3800, stock: 8, supplier: 'Quality Linens' },
    { id: 'PRD-004', name: 'Classic White Shirt', category: 'Shirts', buying: 1200, selling: 2200, stock: 25, supplier: 'Shirt Co.' },
    { id: 'PRD-005', name: 'School Uniform Set', category: 'Uniforms', buying: 1800, selling: 3500, stock: 5, supplier: 'Local Garments' },
  ];

  const [inventoryData, setInventoryData] = useState(() => {
    const saved = localStorage.getItem('nyakoe_inventory');
    return saved ? JSON.parse(saved) : initialItems;
  });

  // Sync with LocalStorage
  React.useEffect(() => {
    localStorage.setItem('nyakoe_inventory', JSON.stringify(inventoryData));
  }, [inventoryData]);

  // Form States
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Dresses');
  const [prodSupplier, setProdSupplier] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [prodImage, setProdImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addVariant = () => {
    if (newSize && newQty && newPrice) {
      setVariants([...variants, { 
        size: newSize, 
        qty: parseInt(newQty), 
        price: parseInt(newPrice) 
      }]);
      setNewSize('');
      setNewQty('');
      setNewPrice('');
    }
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const totalStock = variants.reduce((sum, v) => sum + v.qty, 0);

  const handleSaveProduct = () => {
    if (!prodName || !buyingPrice || !sellingPrice || variants.length === 0) {
      alert('❌ Please complete all mandatory fields and add at least one size!');
      return;
    }

    const newProduct = {
      id: `PRD-00${inventoryData.length + 1}`,
      name: prodName,
      category: prodCategory,
      buying: parseInt(buyingPrice),
      selling: parseInt(sellingPrice),
      stock: totalStock,
      supplier: prodSupplier,
      image: prodImage,
      variantsList: variants // Store the detailed variants
    };

    setInventoryData([newProduct, ...inventoryData]);
    setShowModal(false);
    
    // Reset Form
    setProdName('');
    setProdSupplier('');
    setBuyingPrice('');
    setSellingPrice('');
    setVariants([]);
    setProdImage(null);
    
    alert('🎉 Product Successfully Added to Digital Vault!');
  };

  const totalProductsCount = inventoryData.length;
  const totalInventoryValue = inventoryData.reduce((sum, item) => sum + (item.selling * item.stock), 0);
  const lowStockCount = inventoryData.filter(item => item.stock < 10).length;

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-x-hidden">
      <Header />
      <Sidebar />
      
      <main className="w-full p-3 md:p-8 pt-44 lg:pt-40 overflow-x-hidden">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Inventory Management</h1>
            <p className="text-slate-500 font-bold mt-0.5 text-xs md:text-sm tracking-tight">Manage stock, prices, and suppliers professionally.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => alert('Inventory CSV Export started...')}
              className="px-4 py-2 text-xs bg-white border border-slate-200 text-slate-600 rounded-xl font-black flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            {user?.role === 'attendant' && (
              <button 
                onClick={() => setShowModal(true)}
                className="px-5 py-2 text-xs premium-gradient text-white rounded-xl font-black flex items-center gap-2 shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </header>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Products', value: totalProductsCount.toLocaleString(), icon: <Package size={20} className="text-blue-500" />, color: 'bg-blue-50' },
            { label: 'Total Value', value: `KSh ${(totalInventoryValue / 1000000).toFixed(1)}M`, icon: <Package size={20} className="text-emerald-500" />, color: 'bg-emerald-50' },
            { label: 'Low Stock Items', value: lowStockCount.toString(), icon: <AlertTriangle size={20} className="text-rose-500" />, color: 'bg-rose-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                <h3 className="text-xl font-black text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-2 items-center">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold"
            />
          </div>
          <button className="px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-slate-100 transition-all border border-transparent">
            <Filter size={16} />
            <span>Category</span>
          </button>
          <button className="px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-slate-100 transition-all border border-transparent">
            <ArrowUpDown size={16} />
            <span>Sort by</span>
          </button>
        </div>

        {/* Inventory Table (Desktop) / Cards (Mobile) */}
        <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Product</th>
                  <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                  <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Buying Price</th>
                  <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Selling Price</th>
                  <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Stock</th>
                  <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-3 w-20 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventoryData.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase())).map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold overflow-hidden">
                          {row.image ? (
                            <img src={row.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Package size={18} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{row.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[8px] font-black uppercase tracking-widest">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-500 font-bold">KSh {row.buying.toLocaleString()}</td>
                    <td className="px-6 py-3 text-sm text-slate-900 font-black">KSh {row.selling.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <span className="text-sm font-black text-slate-900">{row.stock}</span>
                      <span className="text-slate-400 text-[10px] font-bold ml-1 uppercase">qty</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        row.stock < 10 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {row.stock < 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      {user?.role === 'attendant' ? (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <Edit3 size={14} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">Read Only View</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-slate-50">
            {inventoryData.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase())).map((row) => (
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

        {/* Add Product Modal (Professional & Comprehensive) */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col fade-in">
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">New Stock Entry</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Initialize product specifications professionally</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 bg-slate-50 text-slate-400 hover:text-rose-500 rounded-xl transition-all">✕</button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="space-y-8">
                  {/* Section 1: Core Product Identity (Mandatory First) */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        Product Identity <span className="text-rose-500">* REQUIRED</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="e.g., Luxury Silk Evening Gown" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-black text-lg placeholder:font-bold placeholder:text-slate-300" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Left Column: Media & Classification */}
                    <div className="space-y-8">
                      {/* Image Upload Area */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          Visual Representation <span className="text-rose-500">* REQUIRED</span>
                        </label>
                        <input 
                          type="file" 
                          id="photo-upload" 
                          className="hidden" 
                          accept="image/*" 
                          capture="environment" 
                          onChange={handleImageChange}
                        />
                        <label 
                          htmlFor="photo-upload"
                          className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 group hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden relative"
                        >
                          {prodImage ? (
                            <img src={prodImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-blue-500 transition-all">
                                <Plus size={32} />
                              </div>
                              <div className="text-center px-6">
                                <p className="text-sm font-black text-slate-900">Upload Photo or Use Camera</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">PNG, JPG or Instant Snap</p>
                              </div>
                            </>
                          )}
                          {/* Camera Icon Overlay */}
                          <div className="absolute bottom-6 right-6 p-3 bg-white shadow-lg rounded-xl text-slate-400 group-hover:text-blue-500 transition-all">
                            <Camera size={20} />
                          </div>
                        </label>
                      </div>

                      {/* Classification */}
                      <div className="space-y-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category *</label>
                            <select 
                              required 
                              value={prodCategory}
                              onChange={(e) => setProdCategory(e.target.value)}
                              className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-sm appearance-none"
                            >
                              <option>Dresses</option>
                              <option>Suits</option>
                              <option>Shirts</option>
                              <option>Pants</option>
                              <option>Accessories</option>
                              <option>Footwear</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Supplier *</label>
                            <input 
                              type="text" 
                              required 
                              value={prodSupplier}
                              onChange={(e) => setProdSupplier(e.target.value)}
                              placeholder="Global Garments Ltd" 
                              className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-sm" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Pricing & Multi-Size Inventory */}
                    <div className="space-y-8">
                      {/* Financial Information */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Financial Specifications *</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 bg-emerald-50/30 border border-emerald-100 rounded-3xl space-y-2 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Buying Price</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-emerald-600/60">KSh</span>
                              <input 
                                type="number" 
                                required 
                                value={buyingPrice}
                                onChange={(e) => setBuyingPrice(e.target.value)}
                                placeholder="0" 
                                className="w-full bg-transparent border-none p-0 focus:ring-0 text-xl font-black text-emerald-700 placeholder:text-emerald-200" 
                              />
                            </div>
                          </div>
                          <div className="p-5 bg-blue-50/30 border border-blue-100 rounded-3xl space-y-2 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Selling Price</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-blue-600/60">KSh</span>
                              <input 
                                type="number" 
                                required 
                                value={sellingPrice}
                                onChange={(e) => setSellingPrice(e.target.value)}
                                placeholder="0" 
                                className="w-full bg-transparent border-none p-0 focus:ring-0 text-xl font-black text-blue-700 placeholder:text-blue-200" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Multi-Size Inventory Management */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-end px-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mandatory Size Entry *</label>
                          <span className="text-[10px] font-black text-blue-600 uppercase">Total Stock: {totalStock} pcs</span>
                        </div>
                        
                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                          <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-4">
                          <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-4 gap-3">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Size Label</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Quantity</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Price</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Action</p>
                          </div>
                          <div className="max-h-[200px] overflow-y-auto divide-y divide-slate-100">
                            {/* Entry Row */}
                            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-center bg-blue-50/10">
                              <select 
                                value={newSize}
                                onChange={(e) => setNewSize(e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-black w-full appearance-none cursor-pointer"
                              >
                                <option value="">Size</option>
                                <optgroup label="Letters">
                                  <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
                                </optgroup>
                                <optgroup label="Trousers/Suits">
                                  <option>28</option><option>30</option><option>32</option><option>34</option><option>36</option><option>38</option><option>40</option><option>42</option>
                                </optgroup>
                                <optgroup label="Shoes">
                                  <option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option>
                                </optgroup>
                              </select>
                              <input 
                                type="number" 
                                value={newQty}
                                onChange={(e) => setNewQty(e.target.value)}
                                placeholder="Qty" 
                                className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold w-full" 
                              />
                              <input 
                                type="number" 
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                placeholder="Price" 
                                className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold w-full" 
                              />
                              <div className="flex justify-end">
                                <button 
                                  onClick={addVariant}
                                  className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg transition-all font-black text-[10px] uppercase shadow-sm active:scale-95 disabled:opacity-50"
                                  disabled={!newSize || !newQty || !newPrice}
                                >
                                  Add Size
                                </button>
                              </div>
                            </div>

                            {/* Dynamic List */}
                            {variants.length === 0 ? (
                              <div className="p-4 flex flex-col items-center justify-center text-slate-300 py-8 italic text-xs font-medium text-center">
                                Minimum 1 size variant required...<br/>
                                <span className="text-[10px] uppercase mt-2 font-black not-italic text-blue-400">Add size, quantity and specific price above</span>
                              </div>
                            ) : (
                              variants.map((v, idx) => (
                                <div key={idx} className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-center hover:bg-slate-50 transition-colors">
                                  <span className="text-sm font-black text-slate-700 uppercase">{v.size}</span>
                                  <span className="text-sm font-black text-blue-600">{v.qty} <span className="text-[10px] text-slate-400 ml-1 uppercase">pieces</span></span>
                                  <span className="text-sm font-black text-emerald-600">KSh {Number(v.price).toLocaleString()}</span>
                                  <div className="flex justify-end">
                                    <button onClick={() => removeVariant(idx)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4 sticky bottom-0 z-10">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-xs hover:bg-white/80 transition-all uppercase tracking-widest">Cancel</button>
                <button 
                  onClick={handleSaveProduct}
                  className="px-10 py-3 premium-gradient text-white rounded-xl font-black text-xs shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all uppercase tracking-[0.2em]"
                >
                  Initialize Stock
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
