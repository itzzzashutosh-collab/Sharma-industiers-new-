import React from 'react';
import { PurchaseOrderRecord } from '../../../types/erp';

interface PurchaseOrderPdfModalProps {
  po: PurchaseOrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseOrderPdfModal: React.FC<PurchaseOrderPdfModalProps> = ({
  po,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !po) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-file-invoice" />
            </span>
            <div>
              <h3 className="text-sm font-bold leading-tight">
                Official Purchase Order Document
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {po.poNumber} · Vendor: {po.supplierName}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
            >
              <i className="fa-solid fa-print text-[11px]" />
              <span>Print PO</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="p-6 md:p-8 overflow-y-auto bg-slate-100 flex justify-center">
          <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border border-slate-300 text-slate-800 space-y-6 text-xs">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 bg-blue-700 text-white font-black rounded flex items-center justify-center text-sm">
                    S
                  </span>
                  <span className="text-base font-black tracking-wider uppercase text-slate-900">
                    Swatch Paints Manufacturing Ltd.
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Factory #01: RIICO Industrial Area, Mansarovar, Jaipur, Rajasthan 302020
                </p>
                <p className="text-[10px] text-slate-500">
                  GSTIN: 08AAACS1234F1Z5 · CIN: U24222RJ2021PLC074890
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  PURCHASE ORDER
                </span>
                <span className="font-mono font-black text-sm text-blue-700 block">
                  {po.poNumber}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Date: {po.date}
                </span>
              </div>
            </div>

            {/* Vendor & Shipping Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/70 border border-slate-200 rounded-xl">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Vendor</span>
                <strong className="text-xs font-bold text-slate-900 block">{po.supplierName}</strong>
                <span className="text-[11px] text-slate-600 block mt-0.5">Attn: {po.supplierContact}</span>
                <span className="text-[11px] text-slate-600 block">{po.supplierPhone}</span>
                <span className="text-[10px] text-slate-500 block mt-1 leading-tight">
                  {po.supplierAddress}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ship To Delivery Address</span>
                <strong className="text-xs font-bold text-slate-900 block">
                  Swatch Paints Central Warehouse
                </strong>
                <span className="text-[10px] text-slate-600 block mt-0.5">
                  Gate #2, Raw Material Store Incharge
                </span>
                <span className="text-[10px] text-slate-600 block">
                  RIICO Industrial Area, Mansarovar, Jaipur 302020
                </span>
                <span className="text-[10px] text-blue-700 font-semibold block mt-1">
                  Expected Delivery: {po.expectedDate}
                </span>
              </div>
            </div>

            {/* Material Items Table */}
            <div>
              <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-[10px] font-bold uppercase text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Material Description</th>
                    <th className="p-2.5">Specification</th>
                    <th className="p-2.5 text-right">Quantity</th>
                    <th className="p-2.5 text-right">Unit Rate (₹)</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  {po.items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="p-2.5 font-mono text-slate-400">{idx + 1}</td>
                      <td className="p-2.5 font-bold text-slate-900">{item.materialName}</td>
                      <td className="p-2.5 text-slate-600">{item.specification}</td>
                      <td className="p-2.5 font-mono text-right text-slate-800 font-bold">
                        {item.qty.toLocaleString()} {item.unit}
                      </td>
                      <td className="p-2.5 font-mono text-right text-slate-800">
                        ₹{item.rate}
                      </td>
                      <td className="p-2.5 font-mono text-right font-black text-slate-900">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t-2 border-slate-300 font-bold">
                  <tr>
                    <td colSpan={5} className="p-2.5 text-right text-xs">
                      Grand Total (INR)
                    </td>
                    <td className="p-2.5 font-mono text-right font-black text-blue-700 text-sm">
                      {po.totalAmount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Terms and Signatures */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-[11px]">
              <div>
                <span className="font-bold text-slate-800 block text-[11px] mb-1">
                  Terms &amp; Instructions:
                </span>
                <ul className="list-disc pl-4 text-slate-600 space-y-1 text-[10px]">
                  <li>Payment Terms: {po.paymentTerms}</li>
                  <li>Certificate of Analysis (COA) must accompany consignment.</li>
                  <li>Weighbridge slip at Swatch Paints factory gate will be final.</li>
                  <li>Material subject to QC laboratory pass prior to unloading.</li>
                </ul>
              </div>

              <div className="text-right flex flex-col justify-end">
                <span className="text-[10px] text-slate-400 block">Authorized Signature</span>
                <span className="font-serif italic font-bold text-slate-800 text-sm mt-4">
                  Amit Sharma
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Head of Procurement · Swatch Paints Ltd.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
