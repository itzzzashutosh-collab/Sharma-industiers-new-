import React from 'react';
import { Invoice } from '../types/erp';

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onMarkAsPaid: (invoiceId: string) => void;
}

export const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({
  invoice,
  onClose,
  onMarkAsPaid,
}) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header Actions */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold text-slate-900">{invoice.invoiceNumber}</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                invoice.status === 'Paid'
                  ? 'bg-emerald-50 text-emerald-600'
                  : invoice.status === 'Overdue'
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-amber-50 text-amber-600'
              }`}
            >
              {invoice.status}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
            >
              <i className="fa-solid fa-print text-slate-500" />
              <span>Print Tax Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>

        {/* Invoice Body Content */}
        <div className="p-6 space-y-6 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
          {/* Company & Client Lockup */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 100 100">
                    <path d="M20,65 Q10,35 45,20 Q60,35 35,65 Z" fill="#f97316" />
                    <path d="M45,20 Q80,10 75,45 Q50,45 45,20 Z" fill="#06b6d4" />
                    <path d="M75,45 Q90,80 50,75 Q45,55 75,45 Z" fill="#10b981" />
                    <path d="M50,75 Q20,95 20,65 Q35,60 50,75 Z" fill="#eab308" />
                  </svg>
                </div>
                <h2 className="text-sm font-black text-slate-900">SWATCH PAINTS INDIA PVT LTD</h2>
              </div>
              <p className="text-[11px] text-slate-500">
                Factory #01, Plot 44-48, Sitapura Industrial Area,
                <br />
                Jaipur, Rajasthan - 302022
                <br />
                <strong>GSTIN:</strong> 08AAACS1294K1Z8
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Billed To
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">{invoice.customer}</h3>
              <p className="text-[11px] text-slate-500">
                Order Ref: <strong className="text-slate-700">{invoice.orderNumber}</strong>
                <br />
                Issue Date: {invoice.date}
                <br />
                Payment Due: {invoice.dueDate}
              </p>
            </div>
          </div>

          {/* Line items table */}
          <div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold">
                  <th className="pb-2">Description</th>
                  <th className="pb-2 text-center">HSN</th>
                  <th className="pb-2 text-right">Qty</th>
                  <th className="pb-2 text-right">Rate</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="font-medium text-slate-800">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3 text-center text-slate-500 font-mono text-[11px]">320910</td>
                    <td className="py-3 text-right tabular-nums">{item.qty}</td>
                    <td className="py-3 text-right tabular-nums">₹{item.unitPrice}</td>
                    <td className="py-3 text-right font-bold tabular-nums">
                      ₹{item.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Summary */}
          <div className="flex justify-end pt-3 border-t border-slate-100">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Taxable Amount:</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  ₹{Math.round(invoice.amountRaw * 0.82).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>CGST (9%):</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  ₹{Math.round(invoice.amountRaw * 0.09).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>SGST (9%):</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  ₹{Math.round(invoice.amountRaw * 0.09).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2">
                <span>Total Amount:</span>
                <span className="text-blue-600 tabular-nums">{invoice.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Payment recording */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Bank: HDFC Bank · A/c: 5020008472910 · IFSC: HDFC0001244
          </p>

          <div className="flex items-center gap-2">
            {invoice.status !== 'Paid' && (
              <button
                onClick={() => {
                  onMarkAsPaid(invoice.id);
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Mark as Paid (Record Payment)
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
