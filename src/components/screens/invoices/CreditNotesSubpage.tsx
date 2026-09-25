import React, { useState } from 'react';
import { CreditNoteRecord } from '../../../types/erp';
import { INITIAL_CREDIT_NOTES } from '../../../data/invoicesData';

export const CreditNotesSubpage: React.FC = () => {
  const [creditNotes, setCreditNotes] = useState<CreditNoteRecord[]>(INITIAL_CREDIT_NOTES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Credit Note state
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2025-0891');
  const [customer, setCustomer] = useState('Marwar Paints & Hardware Mart');
  const [amount, setAmount] = useState<number>(12000);
  const [reason, setReason] = useState<CreditNoteRecord['reason']>('Damaged Goods');
  const [notes, setNotes] = useState('Transit damage verified by regional sales executive.');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateCreditNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: CreditNoteRecord = {
      id: `cn-${Date.now()}`,
      creditNoteNumber: `CN-2025-00${Math.floor(43 + Math.random() * 20)}`,
      invoiceNumber,
      customer,
      date: '12 Aug 2025',
      amount,
      reason,
      status: 'Approved',
      itemsCount: 4,
      adjustedAgainstInvoice: true,
      notes,
    };

    setCreditNotes([newNote, ...creditNotes]);
    setIsModalOpen(false);
    showToast(`Credit Note ${newNote.creditNoteNumber} issued and adjusted against ${invoiceNumber}!`);
  };

  const totalCreditAmount = creditNotes.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      {/* Toast */}
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
            <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-file-invoice-dollar" />
            </span>
            <h2 className="text-lg font-black text-slate-900">GST Credit Notes &amp; Sales Returns</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Section 34 GST compliant credit notes for paint damage, bucket leaks, rate concessions &amp; return claims.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>Issue New Credit Note</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Credit Notes Issued
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              {creditNotes.length} Notes
            </span>
            <span className="text-[10px] text-purple-600 font-bold">GST Compliant</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
            Total Credit Value (₹)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-purple-700 font-mono">
              ₹{totalCreditAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400">Net Tax Adjustment</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Adjusted in Ledger
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-700 font-mono">
              {creditNotes.filter((c) => c.adjustedAgainstInvoice).length} Notes
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">Immediate Offset</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Common Reason
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">Transit Damage</span>
            <span className="text-[10px] text-slate-400">48% of claims</span>
          </div>
        </div>
      </div>

      {/* Credit Notes Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Credit Notes Ledger
          </h3>
          <span className="text-xs text-slate-500">Auto-synced with GSTR-1 Table 9B</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Credit Note #</th>
                <th className="py-3 px-4">Original Invoice</th>
                <th className="py-3 px-4">Customer / Dealer</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Reason for Credit</th>
                <th className="py-3 px-4 text-right">Credit Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {creditNotes.map((cn) => (
                <tr key={cn.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-purple-600 font-mono">
                    {cn.creditNoteNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 font-mono">
                    {cn.invoiceNumber}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{cn.customer}</td>
                  <td className="py-3 px-4 text-slate-500">{cn.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {cn.reason}
                    </span>
                    {cn.notes && (
                      <p className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                        {cn.notes}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono tabular-nums">
                    ₹{cn.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        cn.status === 'Adjusted'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {cn.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => showToast(`Credit Note ${cn.creditNoteNumber} slip print ready`)}
                      className="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      Print Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Credit Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Issue GST Credit Note</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateCreditNote} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Original Invoice Reference</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer / Dealer</label>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Credit Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reason</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Damaged Goods">Damaged Goods</option>
                    <option value="Rate Difference">Rate Difference</option>
                    <option value="Sales Return">Sales Return</option>
                    <option value="Discount Adjustment">Discount Adjustment</option>
                    <option value="Order Cancellation">Order Cancellation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Claim Verification Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
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
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Authorize &amp; Issue Credit Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
