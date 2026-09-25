import React, { useState } from 'react';
import { StockAdjustmentRecord, CatalogProduct } from '../../../types/erp';
import { INITIAL_STOCK_ADJUSTMENTS } from '../../../data/productsInventoryData';

interface StockAdjustmentSubpageProps {
  products: CatalogProduct[];
}

export const StockAdjustmentSubpage: React.FC<StockAdjustmentSubpageProps> = ({ products }) => {
  const [adjustments, setAdjustments] = useState<StockAdjustmentRecord[]>(INITIAL_STOCK_ADJUSTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New adjustment state
  const [selectedSku, setSelectedSku] = useState(products[0]?.sku || 'SRR-25');
  const [location, setLocation] = useState('Factory (Bundi)');
  const [bookStock, setBookStock] = useState(5200);
  const [physicalStock, setPhysicalStock] = useState(5185);
  const [reason, setReason] = useState<StockAdjustmentRecord['reason']>('Transit Damage / Leaks');
  const [auditor, setAuditor] = useState('Pooja (Internal Auditor)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.sku === selectedSku) || products[0];
    const diff = physicalStock - bookStock;
    const val = diff * prod.dealerPrice;

    const newAdj: StockAdjustmentRecord = {
      id: `adj-${Date.now()}`,
      adjustmentNumber: `ADJ-2025-00${Math.floor(13 + Math.random() * 20)}`,
      productName: prod.name,
      sku: prod.sku,
      location,
      date: '12 Aug 2025',
      bookStock,
      physicalStock,
      varianceQty: diff,
      varianceValue: val,
      reason,
      status: 'Approved',
      auditor,
    };

    setAdjustments([newAdj, ...adjustments]);
    setIsModalOpen(false);
    showToast(`Stock adjustment ${newAdj.adjustmentNumber} recorded & reconciled!`);
  };

  const netVarianceQty = adjustments.reduce((sum, a) => sum + a.varianceQty, 0);
  const netVarianceVal = adjustments.reduce((sum, a) => sum + a.varianceValue, 0);

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
            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-scale-unbalanced" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Physical Stock Count &amp; Reconciliation</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit book inventory vs physical stock counts, calculate variance $\pm$, and post write-off / recovery journals.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>New Stock Adjustment</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Audits Conducted
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              {adjustments.length} Audits
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Reconciled</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
            Net Quantity Variance
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-rose-600 font-mono">
              {netVarianceQty > 0 ? `+${netVarianceQty}` : netVarianceQty} Bags
            </span>
            <span className="text-[10px] text-slate-400">Total variance</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
            Net Variance Value (₹)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-rose-700 font-mono">
              ₹{Math.abs(netVarianceVal).toLocaleString('en-IN')} Write-off
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Inventory Accuracy Rate
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-600 font-mono">99.4%</span>
            <span className="text-[10px] text-slate-400">Within threshold</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Reconciliation Adjustments Journal
          </h3>
          <span className="text-xs text-slate-500">Sign-off by Quality Head</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Adjustment #</th>
                <th className="py-3 px-4">Product Name &amp; SKU</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Book Stock</th>
                <th className="py-3 px-4 text-right">Physical Count</th>
                <th className="py-3 px-4 text-right">Variance Qty</th>
                <th className="py-3 px-4 text-right">Variance Value</th>
                <th className="py-3 px-4">Audit Reason</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {adjustments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-rose-600 font-mono">
                    {a.adjustmentNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{a.productName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{a.sku}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{a.location}</td>
                  <td className="py-3 px-4 text-right font-mono text-slate-600">
                    {a.bookStock.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    {a.physicalStock.toLocaleString('en-IN')}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-mono font-black ${
                      a.varianceQty < 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {a.varianceQty > 0 ? `+${a.varianceQty}` : a.varianceQty}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-mono font-bold ${
                      a.varianceValue < 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    ₹{Math.abs(a.varianceValue).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {a.reason}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ● {a.status}
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
              <h3 className="text-sm font-black text-slate-900">Physical Stock Count Adjustment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateAdjustment} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Paint SKU</label>
                <select
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.sku}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Depot / Plant Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                >
                  <option value="Factory (Bundi)">Factory (Bundi)</option>
                  <option value="Main Warehouse (Kota)">Main Warehouse (Kota)</option>
                  <option value="Jaipur Depot">Jaipur Depot</option>
                  <option value="Udaipur Depot">Udaipur Depot</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Book System Stock</label>
                  <input
                    type="number"
                    value={bookStock}
                    onChange={(e) => setBookStock(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Physical Verified Count</label>
                  <input
                    type="number"
                    value={physicalStock}
                    onChange={(e) => setPhysicalStock(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason for Variance</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                >
                  <option value="Transit Damage / Leaks">Transit Damage / Leaks</option>
                  <option value="Evaporation / Shrinkage">Evaporation / Shrinkage</option>
                  <option value="Physical Count Correction">Physical Count Correction</option>
                  <option value="Expired Paint Disposal">Expired Paint Disposal</option>
                  <option value="Sample Testing">Sample Testing</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Auditor Sign-off</label>
                <input
                  type="text"
                  value={auditor}
                  onChange={(e) => setAuditor(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
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
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Post Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
