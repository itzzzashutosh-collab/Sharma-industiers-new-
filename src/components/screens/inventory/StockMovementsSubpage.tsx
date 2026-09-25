import React, { useState } from 'react';
import { StockMovementRecord } from '../../../types/erp';
import { INITIAL_STOCK_MOVEMENTS } from '../../../data/productsInventoryData';

export const StockMovementsSubpage: React.FC = () => {
  const [movements, setMovements] = useState<StockMovementRecord[]>(INITIAL_STOCK_MOVEMENTS);
  const [filterType, setFilterType] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New movement form
  const [productName, setProductName] = useState('Swatch Rustic Royale (25kg)');
  const [sku, setSku] = useState('SRR-25');
  const [type, setType] = useState<'IN' | 'OUT' | 'TRANSFER'>('IN');
  const [category, setCategory] = useState<StockMovementRecord['category']>('Production Batch');
  const [qty, setQty] = useState(300);
  const [source, setSource] = useState('Bundi Factory Line 2');
  const [destination, setDestination] = useState('Factory Central Bay');
  const [reference, setReference] = useState('BCH-505');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRecordMovement = (e: React.FormEvent) => {
    e.preventDefault();
    const newMov: StockMovementRecord = {
      id: `mov-${Date.now()}`,
      movementNumber: `MOV-2025-08${Math.floor(13 + Math.random() * 20)}`,
      type,
      category,
      date: '12 Aug 2025, Just now',
      productName,
      sku,
      qty,
      unit: 'Bags',
      source,
      destination,
      reference,
      recordedBy: 'Suresh (Warehouse Stores)',
      status: 'Completed',
    };

    setMovements([newMov, ...movements]);
    setIsModalOpen(false);
    showToast(`Stock movement ${newMov.movementNumber} logged successfully!`);
  };

  const filteredMovements = movements.filter((m) => {
    const matchesType = filterType === 'All' || m.type === filterType;
    const matchesSearch =
      m.movementNumber.toLowerCase().includes(search.toLowerCase()) ||
      m.productName.toLowerCase().includes(search.toLowerCase()) ||
      m.reference.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <i className="fa-solid fa-circle-check text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-arrows-up-down-left-right" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Stock Movements Audit Ledger</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full physical traceability: Inbound production receipts (GRN), customer dispatches, and warehouse transfers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>Log Stock Movement</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
          {['All', 'IN', 'OUT', 'TRANSFER'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterType === t ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              {t === 'IN' ? 'Inbound (IN)' : t === 'OUT' ? 'Outbound (OUT)' : t === 'TRANSFER' ? 'Depot Transfers' : 'All Movements'}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search movement #, product, ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Stock Activity Register
          </h3>
          <span className="text-xs text-slate-500">Live system sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Movement #</th>
                <th className="py-3 px-4">Direction</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Product &amp; SKU</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4">Route (Source → Destination)</th>
                <th className="py-3 px-4">Reference Doc</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-indigo-600 font-mono">
                    {m.movementNumber}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.type === 'IN'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : m.type === 'OUT'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {m.type === 'IN' ? '↑ IN' : m.type === 'OUT' ? '↓ OUT' : '⇄ TRANSFER'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{m.category}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{m.productName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{m.sku}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold font-mono text-slate-900 tabular-nums">
                    {m.qty.toLocaleString('en-IN')} {m.unit}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-700 font-medium">{m.source}</span>
                    <span className="text-slate-400 mx-1.5">→</span>
                    <span className="text-slate-900 font-semibold">{m.destination}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{m.reference}</td>
                  <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">{m.date}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      ● {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Log Stock Movement Entry</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleRecordMovement} className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Direction</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="IN">Inbound (IN)</option>
                    <option value="OUT">Outbound (OUT)</option>
                    <option value="TRANSFER">Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Activity Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Production Batch">Production Batch</option>
                    <option value="Purchase Receipt (GRN)">Purchase Receipt (GRN)</option>
                    <option value="Sales Dispatch">Sales Dispatch</option>
                    <option value="Inter-Depot Transfer">Inter-Depot Transfer</option>
                    <option value="Damaged Scrap">Damaged Scrap</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Description</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quantity (Bags/Ltr)</label>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ref Document #</label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Source Bay</label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Destination Bay</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Confirm Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
