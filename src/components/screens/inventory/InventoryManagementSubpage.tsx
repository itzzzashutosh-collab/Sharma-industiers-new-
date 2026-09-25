import React, { useState } from 'react';
import { CatalogProduct, WarehouseLocationRecord } from '../../../types/erp';
import { INITIAL_WAREHOUSE_LOCATIONS } from '../../../data/productsInventoryData';

interface InventoryManagementSubpageProps {
  products: CatalogProduct[];
  onRestock: (productId: string, additionalBags: number) => void;
}

export const InventoryManagementSubpage: React.FC<InventoryManagementSubpageProps> = ({
  products,
  onRestock,
}) => {
  const [locations] = useState<WarehouseLocationRecord[]>(INITIAL_WAREHOUSE_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Transfer form state
  const [transferProduct, setTransferProduct] = useState(products[0]?.name || '');
  const [sourceLoc, setSourceLoc] = useState('Factory (Bundi)');
  const [destLoc, setDestLoc] = useState('Jaipur Depot');
  const [transferQty, setTransferQty] = useState(200);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransferModalOpen(false);
    showToast(`Stock transfer of ${transferQty} bags of ${transferProduct} initiated from ${sourceLoc} to ${destLoc}!`);
  };

  const totalCapacity = locations.reduce((sum, l) => sum + l.totalCapacity, 0);
  const totalOccupancy = locations.reduce((sum, l) => sum + l.currentOccupancy, 0);

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
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-warehouse" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Multi-Location Inventory Management</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time stock distribution across Bundi Factory, Kota Central Warehouse, Jaipur Depot, and Udaipur Depot.
          </p>
        </div>

        <button
          onClick={() => setIsTransferModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-truck-ramp-box text-xs" />
          <span>Inter-Depot Stock Transfer</span>
        </button>
      </div>

      {/* 4 Warehouse Locations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((loc) => {
          const utilPercent = Math.round((loc.currentOccupancy / loc.totalCapacity) * 100);
          return (
            <div
              key={loc.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {loc.type}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 mt-0.5">{loc.name}</h3>
                  <p className="text-[11px] text-slate-500">{loc.city}</p>
                </div>
                <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-sm">
                  🏢
                </span>
              </div>

              {/* Capacity Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Occupancy</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {loc.currentOccupancy.toLocaleString('en-IN')} / {loc.totalCapacity.toLocaleString('en-IN')} Bags
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      utilPercent > 80 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${utilPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{utilPercent}% utilized</span>
                  <span>{(loc.totalCapacity - loc.currentOccupancy).toLocaleString('en-IN')} space free</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-600 space-y-1">
                <div>
                  <strong className="text-slate-800">Incharge:</strong> {loc.manager}
                </div>
                <div>
                  <strong className="text-slate-800">Contact:</strong> {loc.phone}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Stock Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-base font-bold shrink-0">
            <i className="fa-solid fa-triangle-exclamation" />
          </span>
          <div>
            <h4 className="text-xs font-bold text-amber-900">
              Low Safety Stock Alert: Swatch Roller Coat (180 Bags available)
            </h4>
            <p className="text-[11px] text-amber-700">
              Current stock is below the minimum reorder threshold of 300 Bags. Trigger batch production or depot transfer.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            onRestock('prod-src20', 500);
            showToast('Production replenishment order #PO-BATCH-99 issued for 500 Bags!');
          }}
          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shrink-0"
        >
          Replenish +500 Bags
        </button>
      </div>

      {/* ABC Inventory Analysis Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              ABC Inventory Classification &amp; Valuation
            </h3>
            <p className="text-[11px] text-slate-400">
              Class A (Top 70% value), Class B (20% value), Class C (10% high volume standard paints)
            </p>
          </div>
          <span className="text-xs text-slate-500">
            Total Inventory Valuation: <strong>₹ 38.5 Lakhs</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">ABC Class</th>
                <th className="py-3 px-4 text-right">Available Stock</th>
                <th className="py-3 px-4 text-right">Dealer Unit Rate</th>
                <th className="py-3 px-4 text-right">Inventory Holding Value</th>
                <th className="py-3 px-4 text-center">Safety Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {products.map((p, idx) => {
                const holdingVal = p.currentStock * p.dealerPrice;
                const abcClass = idx < 3 ? 'Class A (Critical)' : idx < 7 ? 'Class B (Standard)' : 'Class C (Bulk)';
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">{p.sku}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          idx < 3
                            ? 'bg-purple-50 text-purple-700'
                            : idx < 7
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {abcClass}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                      {p.currentStock.toLocaleString('en-IN')} {p.unit}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-600">
                      ₹{p.dealerPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      ₹{holdingVal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'Low Stock'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Inter-Depot Stock Transfer</h3>
              <button onClick={() => setIsTransferModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Product</label>
                <select
                  value={transferProduct}
                  onChange={(e) => setTransferProduct(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Source Depot / Plant</label>
                  <select
                    value={sourceLoc}
                    onChange={(e) => setSourceLoc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Factory (Bundi)">Factory (Bundi)</option>
                    <option value="Main Warehouse (Kota)">Main Warehouse (Kota)</option>
                    <option value="Jaipur Depot">Jaipur Depot</option>
                    <option value="Udaipur Depot">Udaipur Depot</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Destination Depot</label>
                  <select
                    value={destLoc}
                    onChange={(e) => setDestLoc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Jaipur Depot">Jaipur Depot</option>
                    <option value="Udaipur Depot">Udaipur Depot</option>
                    <option value="Main Warehouse (Kota)">Main Warehouse (Kota)</option>
                    <option value="Factory (Bundi)">Factory (Bundi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Quantity to Transfer</label>
                <input
                  type="number"
                  value={transferQty}
                  onChange={(e) => setTransferQty(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Dispatch Transfer Manifest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
