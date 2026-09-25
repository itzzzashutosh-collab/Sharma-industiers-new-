import React, { useState } from 'react';
import { MaterialRequisitionSlip } from '../../../types/erp';
import { INITIAL_REQUISITION_SLIPS } from '../../../data/productionData';

export const MaterialConsumptionSubpage: React.FC = () => {
  const [requisitions, setRequisitions] = useState<MaterialRequisitionSlip[]>(INITIAL_REQUISITION_SLIPS);
  const [selectedSlipId, setSelectedSlipId] = useState<string>(requisitions[0]?.id || '');
  const [showNewSlipModal, setShowNewSlipModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedSlip = requisitions.find((r) => r.id === selectedSlipId) || requisitions[0];

  const filteredSlips = requisitions.filter(
    (s) =>
      s.requisitionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-dolly" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Raw Material Floor Requisition &amp; Consumption Ledger
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Requisition slips, store issue notes, warehouse bin picking, and BOM variance tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search slip, batch #, supervisor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 w-56 font-medium"
            />
          </div>
          <button
            onClick={() => setShowNewSlipModal(true)}
            className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>New Requisition Slip</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Requisition Slips List (left) + Slip Detail & Item consumption (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Requisition Slips */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1">
            Store Material Issue Slips ({filteredSlips.length})
          </span>

          <div className="space-y-2.5">
            {filteredSlips.map((slip) => {
              const isSelected = slip.id === selectedSlip.id;
              return (
                <div
                  key={slip.id}
                  onClick={() => setSelectedSlipId(slip.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-xs select-none ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-300 ring-2 ring-teal-200 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-white border border-slate-200 text-teal-700 shadow-2xs">
                      {slip.requisitionNo}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        slip.status === 'Fulfilled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {slip.status}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      Batch: <strong className="font-mono text-blue-700">{slip.batchNumber}</strong>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{slip.shift}</span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate">{slip.requestedBy.split('(')[0]}</span>
                    <span className="font-semibold text-slate-700">{slip.items.length} Materials</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Slip Itemized Breakdown */}
        <div className="lg:col-span-8 space-y-5">
          {/* Slip Header Info */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-black text-sm px-2.5 py-0.5 bg-teal-50 text-teal-700 rounded-lg border border-teal-200">
                    {selectedSlip.requisitionNo}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                    {selectedSlip.shift}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Floor Issue Note for Batch {selectedSlip.batchNumber}
                </h3>
                <span className="text-xs text-slate-500">
                  Requested by {selectedSlip.requestedBy} · {selectedSlip.department}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-print text-[11px]" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>

            {/* Quick Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Issue Date</span>
                <span className="font-medium text-slate-800 block mt-0.5">{selectedSlip.date}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Batch</span>
                <span className="font-mono font-bold text-blue-700 block mt-0.5">
                  {selectedSlip.batchNumber}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Items</span>
                <span className="font-mono font-bold text-slate-800 block mt-0.5">
                  {selectedSlip.items.length} Lots
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                <span className="font-bold text-emerald-700 block mt-0.5">
                  {selectedSlip.status}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Requisition Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Chemical &amp; Packaging Components Issued
              </h3>
              <span className="text-[11px] text-teal-700 font-mono font-bold">
                Verification complete by Store Keeper
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Raw Material Component</th>
                    <th className="py-2.5 px-4">Warehouse Bin</th>
                    <th className="py-2.5 px-4">Batch Lot Number</th>
                    <th className="py-2.5 px-4 text-right">Required</th>
                    <th className="py-2.5 px-4 text-right font-bold text-teal-700">Issued</th>
                    <th className="py-2.5 px-4 text-center">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {selectedSlip.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <strong className="text-slate-900 block font-semibold">
                          {item.rawMaterialName}
                        </strong>
                        <span className="text-[10px] text-slate-400">{item.category}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 text-xs">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                          {item.warehouseBin}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-800 text-xs">
                        {item.lotNumber}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600">
                        {item.requiredQtyKg.toLocaleString()} {item.unit}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-black text-teal-700 tabular-nums">
                        {item.issuedQtyKg.toLocaleString()} {item.unit}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-[10px]">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                          0% (Exact)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* New Requisition Modal */}
      {showNewSlipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowNewSlipModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-dolly" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Create Material Requisition Slip</h3>
                  <p className="text-xs text-slate-500">Request warehouse release for scheduled batch.</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewSlipModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowNewSlipModal(false);
              }}
              className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Batch Number</label>
                  <input
                    type="text"
                    defaultValue="BCH-505"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Factory Shift</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <option value="Morning Shift">Morning Shift</option>
                    <option value="Evening Shift">Evening Shift</option>
                    <option value="Night Shift">Night Shift</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Supervisor / Requester</label>
                <input
                  type="text"
                  defaultValue="Suresh Verma (Line 1 Supervisor)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Production Department</label>
                <input
                  type="text"
                  defaultValue="Emulsion & High-Shear Dispersion Floor"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewSlipModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs"
                >
                  Issue Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
