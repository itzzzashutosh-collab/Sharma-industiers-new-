import React, { useState } from 'react';
import { PriceListRecord } from '../../../types/erp';
import { INITIAL_PRICE_LISTS } from '../../../data/quotationsData';

interface PriceListsSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const PriceListsSubpage: React.FC<PriceListsSubpageProps> = () => {
  const [priceLists, setPriceLists] = useState<PriceListRecord[]>(INITIAL_PRICE_LISTS);
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Price list form
  const [newName, setNewName] = useState('');
  const [newTier, setNewTier] = useState<PriceListRecord['targetTier']>('Authorized Dealers');
  const [newDiscount, setNewDiscount] = useState('25');
  const [newEffective, setNewEffective] = useState('01 Sep 2025');
  const [newValid, setNewValid] = useState('31 Dec 2025');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newPL: PriceListRecord = {
      id: `pl-${Date.now()}`,
      code: `PL-${newTier.substring(0, 3).toUpperCase()}-2025`,
      name: newName,
      targetTier: newTier,
      discountFromMrp: Number(newDiscount) || 20,
      currency: 'INR (₹)',
      effectiveDate: newEffective,
      validUntil: newValid,
      status: 'Active',
      itemsCount: 38,
      managedBy: 'Amit Sharma',
    };

    setPriceLists([newPL, ...priceLists]);
    setShowCreateModal(false);
    setNewName('');
    alert(`Price List "${newPL.name}" created successfully!`);
  };

  const filteredLists = priceLists.filter((pl) => {
    if (tierFilter !== 'All' && pl.targetTier !== tierFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        pl.name.toLowerCase().includes(q) ||
        pl.code.toLowerCase().includes(q) ||
        pl.targetTier.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              🏷️
            </span>
            <h2 className="text-xl font-black text-slate-900">Commercial Price Lists &amp; Rate Cards</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Segmented wholesale pricing rules for Authorized Dealers, High-Rise Contractors, Painters, and Government Tenders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Create New Price List</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Tier:</span>
          {['All', 'Authorized Dealers', 'Bulk Contractors', 'Painter Club', 'Retail Counters', 'Institutional Projects'].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                tierFilter === tier
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <input
            type="text"
            placeholder="Search price list or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Price Lists Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Rate Card Code</th>
                <th className="py-3 px-4">Price List Name</th>
                <th className="py-3 px-4">Target Customer Segment</th>
                <th className="py-3 px-4 text-center">Discount vs MRP</th>
                <th className="py-3 px-4">SKUs Covered</th>
                <th className="py-3 px-4">Validity Period</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredLists.map((pl) => (
                <tr key={pl.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{pl.code}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{pl.name}</p>
                    <p className="text-[10px] text-slate-400">Owner: {pl.managedBy}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {pl.targetTier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                      -{pl.discountFromMrp}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-bold">{pl.itemsCount} Products</td>
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                    {pl.effectiveDate} → {pl.validUntil}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        pl.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {pl.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading price list ${pl.code} in Excel...`)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                    >
                      Export PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Create Master Price List</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Price List Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Dealer Wholesale Rate Card"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Customer Tier</label>
                <select
                  value={newTier}
                  onChange={(e) => setNewTier(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Authorized Dealers">Authorized Dealers</option>
                  <option value="Bulk Contractors">Bulk Contractors</option>
                  <option value="Painter Club">Painter Club</option>
                  <option value="Retail Counters">Retail Counters</option>
                  <option value="Institutional Projects">Institutional Projects</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Discount % From Catalog MRP</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Effective Date</label>
                  <input
                    type="text"
                    value={newEffective}
                    onChange={(e) => setNewEffective(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Valid Until</label>
                  <input
                    type="text"
                    value={newValid}
                    onChange={(e) => setNewValid(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Price List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
