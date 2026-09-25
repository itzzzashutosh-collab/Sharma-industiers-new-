import React, { useState } from 'react';
import { InventoryBatchRecord } from '../../../types/erp';
import { INITIAL_INVENTORY_BATCHES } from '../../../data/productsInventoryData';

export const BatchExpirySubpage: React.FC = () => {
  const [batches, setBatches] = useState<InventoryBatchRecord[]>(INITIAL_INVENTORY_BATCHES);
  const [filterShelfLife, setFilterShelfLife] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleQC = (batchId: string) => {
    setBatches(
      batches.map((b) =>
        b.id === batchId
          ? {
              ...b,
              qcStatus: b.qcStatus === 'Passed' ? 'Quarantined' : 'Passed',
            }
          : b
      )
    );
    showToast('Batch Quality Control status updated');
  };

  const filteredBatches = batches.filter((b) => {
    if (filterShelfLife === 'All') return true;
    return b.shelfLifeStatus === filterShelfLife;
  });

  const expiringCount = batches.filter((b) => b.shelfLifeStatus === 'Expiring Soon').length;
  const expiredCount = batches.filter((b) => b.shelfLifeStatus === 'Expired').length;

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
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-hourglass-start" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Batch Traceability &amp; Shelf-Life Expiry</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            24-month warranty tracking for emulsion polymer shelf stability, pigment settling &amp; quarantine holds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 font-bold px-3 py-1.5 rounded-xl">
            {expiringCount} Batches Expiring in &lt;30 Days
          </span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Factory Batches
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              {batches.length} Batches
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Traceable</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
            Expiring Within 30 Days
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-amber-700 font-mono">
              {expiringCount} Batches
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
              Priority Dispatch
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
            Quarantined / Expired
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-rose-700 font-mono">
              {expiredCount} Batches
            </span>
            <span className="text-[10px] text-rose-600 font-bold">Hold for QC</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Standard Shelf Life
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">24 Months</span>
            <span className="text-[10px] text-slate-400">from date of mfg</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 w-fit">
        {['All', 'Good', 'Expiring Soon', 'Expired'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterShelfLife(st)}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterShelfLife === st ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Batch Master &amp; Expiry Tracker
          </h3>
          <span className="text-xs text-slate-500">FIFO Stock Rotation Applied</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Mfg Date</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4 text-center">Days to Expiry</th>
                <th className="py-3 px-4 text-right">Batch Stock</th>
                <th className="py-3 px-4">Depot Location</th>
                <th className="py-3 px-4 text-center">QC Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredBatches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-amber-700 font-mono">
                    #{b.batchNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{b.productName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.sku}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{b.mfgDate}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{b.expiryDate}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.daysToExpiry <= 0
                          ? 'bg-rose-100 text-rose-700'
                          : b.daysToExpiry <= 30
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {b.daysToExpiry <= 0 ? 'Expired' : `${b.daysToExpiry} days`}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono tabular-nums">
                    {b.availableStock.toLocaleString('en-IN')} {b.unit}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{b.location}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.qcStatus === 'Passed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {b.qcStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleToggleQC(b.id)}
                      className="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      {b.qcStatus === 'Passed' ? 'Hold / Quarantine' : 'Approve QC'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
