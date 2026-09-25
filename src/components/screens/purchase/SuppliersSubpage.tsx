import React, { useState } from 'react';
import { SupplierRecord } from '../../../types/erp';
import { INITIAL_SUPPLIERS } from '../../../data/purchaseData';

export const SuppliersSubpage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierRecord[]>(INITIAL_SUPPLIERS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showAddSupplierModal, setShowAddSupplierModal] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierRecord | null>(null);

  // New Supplier Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Pigments & Additives');
  const [newContact, setNewContact] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('Jaipur, Rajasthan');
  const [newGstin, setNewGstin] = useState('08AABCS9912K1Z4');
  const [newTerms, setNewTerms] = useState('30 Days Net Credit');

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const newSupp: SupplierRecord = {
      id: `sup-${Date.now()}`,
      name: newName,
      shortCode: newName.substring(0, 2).toUpperCase(),
      category: newCategory,
      contactPerson: newContact,
      phone: newPhone,
      email: `${newName.toLowerCase().replace(/\s+/g, '')}@supplier.com`,
      city: newCity,
      address: `Industrial Area, ${newCity}`,
      gstin: newGstin,
      rating: 4.8,
      paymentTerms: newTerms,
      outstandingBalance: 0,
      activeOrdersCount: 0,
      totalPurchases: 0,
      status: 'Active',
    };
    setSuppliers([newSupp, ...suppliers]);
    setShowAddSupplierModal(false);
  };

  const filteredSuppliers = suppliers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'All' || s.status === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* 4 Supplier Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Approved Suppliers
            </span>
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-handshake" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">18 Vendors</p>
          <span className="text-[10px] text-slate-500 font-semibold">
            Raw materials, minerals, pigments &amp; drums
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Preferred Strategic Partners
            </span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-star" />
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">4 Partners</p>
          <span className="text-[10px] text-emerald-700 font-semibold">
            RG Chemicals, Vardhman, Raj Minerals
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Total Spend (FY 25-26)
            </span>
            <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-chart-line" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">₹ 82.4 Lakhs</p>
          <span className="text-[10px] text-slate-500 font-semibold">Cumulative raw materials invoiced</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Accounts Payable Balance
            </span>
            <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-serif">
              ₹
            </span>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2 font-mono">₹ 6.2 Lakhs</p>
          <span className="text-[10px] text-amber-700 font-semibold">
            Average credit period: 24.5 days
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Preferred', 'Active'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search vendor name, contact, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 font-medium"
            />
          </div>
          <button
            onClick={() => setShowAddSupplierModal(true)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>

      {/* Supplier Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSuppliers.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 hover:border-slate-300 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-sm">
                  {s.shortCode}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">{s.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {s.category}
                  </span>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  s.status === 'Preferred'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {s.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Contact:</span>
                <span className="font-semibold text-slate-800">{s.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-mono text-slate-700">{s.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GSTIN:</span>
                <span className="font-mono text-slate-700">{s.gstin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-slate-700">{s.city}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">
                  Outstanding Due
                </span>
                <span className="font-mono font-black text-slate-900">
                  ₹ {s.outstandingBalance.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <i className="fa-solid fa-star text-[10px]" />
                <span>{s.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Supplier Modal */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowAddSupplierModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Raw Material Supplier</h3>
              <button
                onClick={() => setShowAddSupplierModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 text-slate-600">Company / Supplier Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Modern Chemicals & Minerals"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Contact Person</label>
                  <input
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder="e.g. Mr. Alok Sharma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Phone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 98290 XXXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">City / State</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">GSTIN</label>
                  <input
                    type="text"
                    value={newGstin}
                    onChange={(e) => setNewGstin(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSupplierModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
