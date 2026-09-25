import React from 'react';
import { EWayBillRecord } from '../../../types/erp';

interface EWayBillModalProps {
  ewayBill: EWayBillRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EWayBillModal: React.FC<EWayBillModalProps> = ({
  ewayBill,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !ewayBill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs">
              <i className="fa-solid fa-file-invoice" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-wide">
                GOVERNMENT OF INDIA • GST e-WAY BILL SYSTEM
              </h3>
              <p className="text-[10px] text-slate-400">
                Form GST EWB-01 (See Rule 138 of Central Goods and Services Tax Rules, 2017)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Modal Content / Printable Document */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-slate-800 bg-white">
          {/* Header Barcode & Details */}
          <div className="flex items-start justify-between border-b pb-4 border-slate-200">
            <div>
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                e-Way Bill No.
              </span>
              <div className="text-xl font-mono font-black text-slate-900 tracking-wider">
                {ewayBill.ewbNumber}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Generated Date: <span className="font-semibold text-slate-700">{ewayBill.docDate}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                Valid Until
              </span>
              <div className="text-sm font-bold text-emerald-700 font-mono">
                {ewayBill.validUntil}
              </div>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ● Status: {ewayBill.status}
              </span>
            </div>
          </div>

          {/* Part A: Details of Consignment */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide border-b border-slate-200">
              PART - A (Consignment Particulars)
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-200 text-xs">
              <div className="p-3 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Consignor (Supplier)</span>
                <p className="font-bold text-slate-900">{ewayBill.consignor}</p>
                <p className="text-slate-500 text-[11px]">GSTIN: 08AAACS9988D1Z9</p>
                <p className="text-slate-500 text-[11px]">Dispatch From: Bundi Plant, RIICO, Rajasthan</p>
              </div>
              <div className="p-3 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Consignee (Recipient)</span>
                <p className="font-bold text-slate-900">{ewayBill.consignee}</p>
                <p className="text-slate-500 text-[11px]">Delivery To: {ewayBill.destinationCity}</p>
                <p className="text-slate-500 text-[11px]">DO Ref: {ewayBill.doNumber}</p>
              </div>
            </div>
          </div>

          {/* Goods Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-700 uppercase tracking-wide border-b border-slate-200">
              Item Details &amp; Taxable Valuation
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[11px] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-2.5">HSN Code</th>
                  <th className="p-2.5">Commodity Description</th>
                  <th className="p-2.5 text-right">Taxable Value</th>
                  <th className="p-2.5 text-right">GST (18%)</th>
                  <th className="p-2.5 text-right">Total Invoice Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-mono font-bold text-slate-700">{ewayBill.hsnCode || '32149090'}</td>
                  <td className="p-2.5 font-medium text-slate-800">{ewayBill.goodsDescription || 'Paint Consignment'}</td>
                  <td className="p-2.5 text-right font-mono">₹{(ewayBill.taxableValue || 0).toLocaleString('en-IN')}</td>
                  <td className="p-2.5 text-right font-mono">₹{(ewayBill.igstCgstAmount || 0).toLocaleString('en-IN')}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                    ₹{((ewayBill.taxableValue || 0) + (ewayBill.igstCgstAmount || 0)).toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Part B: Vehicle & Transporter */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide border-b border-slate-200">
              PART - B (Vehicle &amp; Transporter Details)
            </div>
            <div className="p-3 grid grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Mode &amp; Vehicle</span>
                <p className="font-mono font-bold text-slate-800 mt-0.5">Road / {ewayBill.vehicleNumber}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Approx Distance</span>
                <p className="font-bold text-slate-800 mt-0.5">{ewayBill.distanceKm} km</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Transporter ID &amp; Name</span>
                <p className="font-bold text-slate-800 mt-0.5 truncate">{ewayBill.transporterName}</p>
                <p className="text-[10px] font-mono text-slate-500">{ewayBill.transporterGstin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 rounded-xl shadow-2xs flex items-center gap-2"
          >
            <i className="fa-solid fa-print" />
            <span>Print Official e-Way Bill</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
