import React, { useState } from 'react';
import { DepotRecord } from '../../../types/erp';

interface DepotNetworkSubpageProps {
  depots: DepotRecord[];
  onInitiateTransfer?: (sourceId: string, destId: string, bags: number) => void;
}

export const DepotNetworkSubpage: React.FC<DepotNetworkSubpageProps> = ({
  depots,
  onInitiateTransfer,
}) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [sourceDepot, setSourceDepot] = useState('dep-01');
  const [targetDepot, setTargetDepot] = useState('dep-02');
  const [transferBags, setTransferBags] = useState(300);
  const [transferProduct, setTransferProduct] = useState('Rustic Royale 20L');

  const totalNetworkStock = depots.reduce((sum, d) => sum + d.currentStockBags, 0);
  const totalCapacity = depots.reduce((sum, d) => sum + d.capacityBags, 0);
  const networkUtilization = Math.round((totalNetworkStock / totalCapacity) * 100);

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceDepot === targetDepot) return;
    onInitiateTransfer?.(sourceDepot, targetDepot, transferBags);
    setIsTransferModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Regional Depot &amp; Warehouse Network
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Decentralized warehousing across Rajasthan with real-time stock balances, buffer alerts, and SKU storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <i className="fa-solid fa-arrows-split-up-and-left" />
            <span>Inter-Depot Stock Transfer</span>
          </button>
        </div>
      </div>

      {/* Network Overview Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Warehouse Inventory
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {totalNetworkStock.toLocaleString()} Bags
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">
            Across {depots.length} Regional Fulfillment Centers
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Aggregate Storage Capacity
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {totalCapacity.toLocaleString()} Bags
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Buffer headroom: {(totalCapacity - totalNetworkStock).toLocaleString()} Bags
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Network Storage Utilization
          </div>
          <div className="text-2xl font-black text-purple-700 mt-1">
            {networkUtilization}%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-purple-600 h-full rounded-full"
              style={{ width: `${networkUtilization}%` }}
            />
          </div>
        </div>
      </div>

      {/* Depots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {depots.map((depot) => {
          const usagePercent = Math.round((depot.currentStockBags / depot.capacityBags) * 100);

          return (
            <div
              key={depot.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 relative overflow-hidden"
            >
              {depot.isFactory && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                  Central Manufacturing Plant
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xs font-bold">
                    <i className={depot.isFactory ? 'fa-solid fa-industry' : 'fa-solid fa-warehouse'} />
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{depot.name}</h3>
                    <p className="text-[11px] text-slate-500">{depot.city}</p>
                  </div>
                </div>
              </div>

              {/* Stock Bar */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500">Stock on Floor:</span>
                  <span className="font-mono font-black text-slate-900">
                    {depot.currentStockBags.toLocaleString()} / {depot.capacityBags.toLocaleString()} Bags
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      usagePercent > 85 ? 'bg-amber-500' : 'bg-purple-600'
                    }`}
                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                  <span>Capacity Utilization:</span>
                  <strong className="text-purple-700">{usagePercent}%</strong>
                </div>
              </div>

              {/* Depot Specs */}
              <div className="text-xs space-y-2">
                <div className="flex justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Address / Location:</span>
                  <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">
                    {depot.address}
                  </span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Depot Manager:</span>
                  <span className="font-bold text-slate-800">{depot.depotManager}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Contact Helpline:</span>
                  <span className="font-mono text-blue-600 font-semibold">{depot.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SKUs Stocked:</span>
                  <span className="font-mono font-bold text-slate-800">{depot.skuCount} Paint SKUs</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inter-Depot Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Dispatch Inter-Depot Stock Transfer
              </h3>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleTransferSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Source Warehouse (Origin)
                  </label>
                  <select
                    value={sourceDepot}
                    onChange={(e) => setSourceDepot(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    {depots.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.currentStockBags} Bags)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Target Warehouse (Destination)
                  </label>
                  <select
                    value={targetDepot}
                    onChange={(e) => setTargetDepot(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    {depots.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} (Cap: {d.capacityBags})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Product Variant
                </label>
                <input
                  type="text"
                  required
                  value={transferProduct}
                  onChange={(e) => setTransferProduct(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Quantity (Bags / Tubs)
                </label>
                <input
                  type="number"
                  min="10"
                  max="2000"
                  required
                  value={transferBags}
                  onChange={(e) => setTransferBags(parseInt(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div className="p-3 bg-purple-50 rounded-xl text-purple-800 text-[11px] space-y-1">
                <p className="font-bold">Inter-Branch Stock Movement Note:</p>
                <p>
                  Generates an automatic Stock Transfer Note (STN) and internal e-Way bill under GST Rule 138.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Issue Transfer Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
