import React, { useState } from 'react';
import { PurchaseOrderRecord } from '../../../types/erp';

interface PurchaseInspectorPanelProps {
  po: PurchaseOrderRecord | null;
  onClose: () => void;
  onOpenPdf: (po: PurchaseOrderRecord) => void;
  onUpdateStatus?: (poId: string, status: PurchaseOrderRecord['status']) => void;
}

export const PurchaseInspectorPanel: React.FC<PurchaseInspectorPanelProps> = ({
  po,
  onClose,
  onOpenPdf,
  onUpdateStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Items' | 'GRN' | 'Invoices' | 'Payments' | 'Notes'>('Overview');
  const [showMoreActions, setShowMoreActions] = useState(false);

  if (!po) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden text-xs text-slate-700 select-none">
      {/* Inspector Header */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold shadow-2xs">
            <i className="fa-solid fa-file-lines" />
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-black text-sm text-slate-900">{po.poNumber}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  po.status === 'Received'
                    ? 'bg-emerald-100 text-emerald-800'
                    : po.status === 'In Transit'
                    ? 'bg-blue-100 text-blue-800'
                    : po.status === 'Partially Received'
                    ? 'bg-amber-100 text-amber-800'
                    : po.status === 'Pending'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {po.status}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
        >
          <i className="fa-solid fa-xmark text-sm" />
        </button>
      </div>

      {/* Action Buttons Row */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 relative">
        <button
          onClick={() => {
            alert(`Purchase Order ${po.poNumber} emailed and dispatched to ${po.supplierContact} (${po.supplierName})`);
          }}
          className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-2xs transition flex items-center justify-center gap-1.5"
        >
          <i className="fa-solid fa-paper-plane text-[10px]" />
          <span>Send to Supplier</span>
        </button>

        <button
          onClick={() => onOpenPdf(po)}
          className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
        >
          <i className="fa-solid fa-download text-[11px]" />
          <span className="hidden sm:inline">Download PDF</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMoreActions(!showMoreActions)}
            className="px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition flex items-center gap-1"
          >
            <span>More Actions</span>
            <i className="fa-solid fa-chevron-down text-[9px]" />
          </button>

          {showMoreActions && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1 text-xs">
              <button
                onClick={() => {
                  if (onUpdateStatus) onUpdateStatus(po.id, 'Received');
                  setShowMoreActions(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
              >
                Mark as Received
              </button>
              <button
                onClick={() => {
                  if (onUpdateStatus) onUpdateStatus(po.id, 'In Transit');
                  setShowMoreActions(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
              >
                Set In Transit
              </button>
              <button
                onClick={() => {
                  window.print();
                  setShowMoreActions(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
              >
                Print PO Sheet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inspector Tabs */}
      <div className="flex border-b border-slate-200 px-4 bg-white space-x-4 text-xs font-bold text-slate-500 overflow-x-auto">
        {(['Overview', 'Items', 'GRN', 'Invoices', 'Payments', 'Notes'] as const).map((tab) => {
          const tabLabel =
            tab === 'Items'
              ? `Items (${po.items.length})`
              : tab === 'GRN'
              ? `GRN (${po.grnNumbers?.length || 2})`
              : tab === 'Invoices'
              ? 'Invoices (1)'
              : tab === 'Payments'
              ? 'Payments (1)'
              : tab;
          const isCurrent = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2.5 border-b-2 transition whitespace-nowrap ${
                isCurrent
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>

      {/* Inspector Body */}
      <div className="p-4 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
        {activeTab === 'Overview' && (
          <>
            {/* Supplier Details & PO Details 2-Column Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-slate-100">
              {/* Supplier Details */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Supplier Details
                </span>
                <div className="flex items-start space-x-2.5">
                  <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {po.supplierName.substring(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{po.supplierName}</h4>
                    <span className="text-[11px] text-slate-500 block">
                      Contact: {po.supplierContact}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <i className="fa-solid fa-phone text-[9px] text-slate-400" />
                      {po.supplierPhone}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-start gap-1 mt-1 leading-tight">
                      <i className="fa-solid fa-location-dot text-[9px] text-slate-400 mt-0.5 shrink-0" />
                      {po.supplierAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* PO Details */}
              <div className="space-y-1.5 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[10px] font-semibold">PO Number</span>
                  <span className="font-mono font-bold text-slate-900 text-[11px]">{po.poNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[10px] font-semibold">Date</span>
                  <span className="font-medium text-slate-800 text-[11px]">{po.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[10px] font-semibold">Expected Date</span>
                  <span className="font-medium text-slate-800 text-[11px]">{po.expectedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[10px] font-semibold">Status</span>
                  <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                    {po.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[10px] font-semibold">Payment Terms</span>
                  <span className="text-slate-700 font-medium text-[10px] text-right max-w-[140px] truncate">
                    {po.paymentTerms}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[10px] font-semibold">Created By</span>
                  <span className="text-slate-700 font-medium text-[10px]">{po.createdBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[10px] font-semibold">Department</span>
                  <span className="text-slate-700 font-medium text-[10px]">{po.department}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-700 font-bold text-[11px]">Total Amount</span>
                  <span className="font-mono font-black text-slate-900 text-xs">{po.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Material Items Table */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Material Items ({po.items.length})
              </span>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-[10px] uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-2.5">#</th>
                      <th className="py-2 px-2.5">Material</th>
                      <th className="py-2 px-2.5">Specification</th>
                      <th className="py-2 px-2.5 text-right">Qty</th>
                      <th className="py-2 px-2.5 text-right">Rate (₹)</th>
                      <th className="py-2 px-2.5 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {po.items.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/70">
                        <td className="py-2 px-2.5 font-mono text-slate-400 text-[10px]">{idx + 1}</td>
                        <td className="py-2 px-2.5 font-semibold text-slate-900">{item.materialName}</td>
                        <td className="py-2 px-2.5 text-slate-500 text-[10px]">{item.specification}</td>
                        <td className="py-2 px-2.5 text-right font-mono tabular-nums text-slate-700">
                          {item.qty.toLocaleString()} {item.unit}
                        </td>
                        <td className="py-2 px-2.5 text-right font-mono tabular-nums text-slate-700">
                          {item.rate}
                        </td>
                        <td className="py-2 px-2.5 text-right font-mono font-bold text-slate-900 tabular-nums">
                          {item.amount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50/80 border-t border-slate-200 font-bold text-slate-900">
                    <tr>
                      <td colSpan={5} className="py-2 px-2.5 text-right">
                        Total Amount
                      </td>
                      <td className="py-2 px-2.5 text-right font-mono font-black text-slate-900 text-xs">
                        {po.totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Delivery & Payment Status Progress Timeline */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Delivery &amp; Payment Status
              </span>

              <div className="relative flex items-center justify-between px-2 pt-2 pb-4">
                {/* Connecting track line */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />

                {po.timeline.map((t, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border-2 ${
                        t.completed
                          ? 'bg-emerald-500 text-white border-white ring-2 ring-emerald-200'
                          : t.isPending
                          ? 'bg-amber-500 text-white border-white ring-2 ring-amber-200 animate-pulse'
                          : 'bg-white text-slate-400 border-slate-300'
                      }`}
                    >
                      {t.completed ? '✓' : idx + 1}
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 mt-1.5 block">
                      {t.step}
                    </span>
                    <span className="text-[9px] text-slate-400 leading-tight block max-w-[80px]">
                      {t.date}
                    </span>
                    {t.detail && (
                      <span className="text-[8px] text-slate-500 block max-w-[85px] truncate">
                        {t.detail}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'Items' && (
          <div className="space-y-2">
            {po.items.map((item, idx) => (
              <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-mono text-[10px] text-slate-400">Item #{idx + 1}</span>
                  <h4 className="font-bold text-slate-900 text-xs">{item.materialName}</h4>
                  <span className="text-[11px] text-slate-500">Spec: {item.specification}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-800 block">
                    {item.qty.toLocaleString()} {item.unit} @ ₹{item.rate}
                  </span>
                  <span className="font-mono font-black text-blue-700 text-xs">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'GRN' && (
          <div className="space-y-2.5">
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-emerald-900 text-xs">GRN-2025-024</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                  Passed QC
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Received 8,500 kg by Ramu Meena. Vehicle RJ-20-GA-4521. Tested by Anita Rawat.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Invoices' && (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold text-slate-900">{po.invoiceNumber || 'RG-INV-1987'}</span>
              <span className="text-emerald-700 font-bold text-[10px]">3-Way Matched</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Invoice Date: 14 Aug 2025</span>
              <span>Amount: {po.totalAmount}</span>
            </div>
          </div>
        )}

        {activeTab === 'Payments' && (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800">50% Advance Cleared</span>
              <span className="font-mono font-bold text-emerald-700">₹ 1,24,250 (Paid)</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-slate-500">
              <span>Balance Pending on Delivery</span>
              <span className="font-mono font-bold text-amber-700">₹ 1,24,250</span>
            </div>
          </div>
        )}

        {activeTab === 'Notes' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
            <p className="font-medium text-xs leading-relaxed">
              {po.notes || 'Raw materials booked with standard manufacturer warranty and delivery schedule.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
