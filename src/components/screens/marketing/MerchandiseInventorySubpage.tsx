import React, { useState } from 'react';
import { MerchandiseItemRecord } from '../../../types/erp';

interface MerchandiseInventorySubpageProps {
  items: MerchandiseItemRecord[];
  onAllocateStock: (itemId: string, qty: number, recipient: string) => void;
}

export const MerchandiseInventorySubpage: React.FC<MerchandiseInventorySubpageProps> = ({
  items,
  onAllocateStock,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allocatingItem, setAllocatingItem] = useState<MerchandiseItemRecord | null>(null);
  const [allocateQty, setAllocateQty] = useState('10');
  const [recipientName, setRecipientName] = useState('Hadoti Area Sales Team');

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.storageRack.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalStockValue = items.reduce((acc, it) => acc + it.currentStock * it.unitCost, 0);
  const totalAllocatedThisMonth = items.reduce((acc, it) => acc + it.allocatedThisMonth, 0);

  const handleAllocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocatingItem) return;
    onAllocateStock(allocatingItem.id, Number(allocateQty) || 1, recipientName);
    setAllocatingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-boxes-packing" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Sample Kits, Fandecks &amp; Merchandising Inventory
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track dealer showroom display kits, 1200-shade fandecks, trial sample pouches &amp; painter apparel stock.
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Collateral Inventory Cap</p>
          <p className="text-lg font-black text-slate-900 font-mono">
            ₹{totalStockValue.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Ribbon Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Catalog Items</p>
          <p className="text-xl font-black text-slate-900 mt-1">{items.length} SKUs</p>
          <p className="text-[10px] text-slate-500">Marketing collateral types</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Allocated This Month</p>
          <p className="text-xl font-black text-teal-600 font-mono mt-1">
            {totalAllocatedThisMonth.toLocaleString('en-IN')} Units
          </p>
          <p className="text-[10px] text-slate-500">Dispatched to field reps &amp; dealers</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Low Stock SKUs</p>
          <p className="text-xl font-black text-amber-600 mt-1">
            {items.filter((i) => i.status === 'Low Stock' || i.status === 'Reorder Placed').length} Items
          </p>
          <p className="text-[10px] text-amber-700 font-semibold">Replenishment needed</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Storage Bay</p>
          <p className="text-xl font-black text-slate-900 mt-1">Bundi Central</p>
          <p className="text-[10px] text-slate-500">Aisles M-01 to M-08</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-teal-500"
        >
          <option value="All">All Merchandising Categories</option>
          <option value="Color Fandeck">Color Fandecks</option>
          <option value="Shade Card">Shade Cards &amp; Folders</option>
          <option value="Putty Sample Trial Pouch">Trial Sample Pouches</option>
          <option value="Painter Cap & T-Shirt">Painter Apparel</option>
          <option value="Dealer Glow Clock">Dealer Gifts &amp; Clocks</option>
          <option value="Wall Apron">Painter Aprons</option>
        </select>

        <div className="relative flex-1 sm:w-64">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search item, code, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-teal-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Collateral Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Unit Cost</th>
                <th className="py-3 px-4 text-center">Current Stock</th>
                <th className="py-3 px-4 text-center">Allocated (Mo.)</th>
                <th className="py-3 px-4">Storage Location</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.itemName}</div>
                    <div className="font-mono text-[10px] text-slate-400">{item.itemCode}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                    ₹{item.unitCost}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-slate-900 text-sm">{item.currentStock}</span>{' '}
                    <span className="text-[10px] text-slate-400">{item.unit}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-teal-700">
                    {item.allocatedThisMonth}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">{item.storageRack}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        item.status === 'In Stock'
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.status === 'Low Stock'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setAllocatingItem(item)}
                      disabled={item.currentStock === 0}
                      className="px-2.5 py-1 text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 disabled:opacity-40 rounded-lg transition"
                    >
                      Issue / Allocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Allocation Modal */}
      {allocatingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-teal-600 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Issue / Allocate Marketing Collateral</h3>
              <button
                onClick={() => setAllocatingItem(null)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAllocateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <p className="text-slate-500">Selected SKU:</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{allocatingItem.itemName}</p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Available Stock: {allocatingItem.currentStock} {allocatingItem.unit}
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Quantity to Issue *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={allocatingItem.currentStock}
                  value={allocateQty}
                  onChange={(e) => setAllocateQty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold font-mono focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Recipient / Dealer / Sales Rep *</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAllocatingItem(null)}
                  className="px-3.5 py-1.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
