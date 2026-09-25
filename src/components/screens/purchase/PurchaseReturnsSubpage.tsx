import React, { useState } from 'react';
import { PurchaseReturnRecord } from '../../../types/erp';
import { INITIAL_PURCHASE_RETURNS } from '../../../data/purchaseData';

export const PurchaseReturnsSubpage: React.FC = () => {
  const [returns, setReturns] = useState<PurchaseReturnRecord[]>(INITIAL_PURCHASE_RETURNS);
  const [showModal, setShowModal] = useState<boolean>(false);

  // New Return form
  const [poNumber, setPoNumber] = useState('PO-2025-021');
  const [vendorName, setVendorName] = useState('Colour Chem Industries');
  const [material, setMaterial] = useState('Phthalo Blue Pigment');
  const [returnQty, setReturnQty] = useState<number>(100);
  const [debitNoteVal, setDebitNoteVal] = useState<number>(14800);
  const [reason, setReason] = useState('Viscosity agglomerates in slurry dispersion test.');

  const handleCreateReturn = (e: React.FormEvent) => {
    e.preventDefault();
    const newRtv: PurchaseReturnRecord = {
      id: `rtv-${Date.now()}`,
      returnNumber: `RTV-2025-00${returns.length + 1}`,
      poNumber,
      supplierName: vendorName,
      returnDate: 'Today, 12 Aug 2025',
      reason,
      materialName: material,
      returnQty,
      unit: 'kg',
      debitNoteValue: debitNoteVal,
      debitNoteNumber: `DN-2025-0${Math.floor(20 + Math.random() * 80)}`,
      status: 'Dispatched',
    };
    setReturns([newRtv, ...returns]);
    setShowModal(false);
  };

  const totalDebitValue = returns.reduce((acc, r) => acc + r.debitNoteValue, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-arrow-rotate-left" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Purchase Returns (RTV) &amp; Vendor Debit Notes
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Defective chemical lots, off-spec pigments, transit-damaged drums, and supplier debit adjustments.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <i className="fa-solid fa-plus text-[10px]" />
          <span>Issue Return (RTV)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Total Material Returned
          </span>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {returns.length} Consignments
          </p>
          <span className="text-[10px] text-slate-500">QC laboratory rejection</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Debit Notes Issued Value
          </span>
          <p className="text-2xl font-black text-rose-600 mt-2 font-mono">
            ₹ {totalDebitValue.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-rose-700">Deducted from supplier ledger balances</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Vendor Recovery Rate
          </span>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">100%</p>
          <span className="text-[10px] text-emerald-700">Credit notes confirmed by suppliers</span>
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Return to Vendor (RTV) Register</h3>
          <span className="text-xs text-slate-400 font-mono">Factory Gate Outward Pass</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">RTV Slip #</th>
                <th className="py-3 px-4">PO Reference</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Return Date</th>
                <th className="py-3 px-4">Defective Material</th>
                <th className="py-3 px-4 text-right">Return Qty</th>
                <th className="py-3 px-4 text-right">Debit Note (₹)</th>
                <th className="py-3 px-4">Reason for Return</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {returns.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-700">{r.returnNumber}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{r.poNumber}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{r.supplierName}</td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{r.returnDate}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-semibold">{r.materialName}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold">
                    {r.returnQty.toLocaleString()} {r.unit}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-rose-700">
                    ₹ {r.debitNoteValue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs text-[11px] text-slate-600 truncate" title={r.reason}>
                    {r.reason}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Issue Return to Vendor (RTV)</h3>
              <button onClick={() => setShowModal(false)} className="w-7 h-7 text-slate-400">
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleCreateReturn} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">PO Ref</label>
                  <input
                    type="text"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Supplier</label>
                  <input
                    type="text"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Defective Material</label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Quantity (kg / units)</label>
                  <input
                    type="number"
                    value={returnQty}
                    onChange={(e) => setReturnQty(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Debit Note Amount (₹)</label>
                <input
                  type="number"
                  value={debitNoteVal}
                  onChange={(e) => setDebitNoteVal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Rejection Cause (Lab / Physical Test)</label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
                >
                  Confirm &amp; Debit Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
