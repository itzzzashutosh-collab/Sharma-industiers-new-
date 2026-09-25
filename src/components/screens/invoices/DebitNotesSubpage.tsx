import React, { useState } from 'react';
import { DebitNoteRecord } from '../../../types/erp';
import { INITIAL_DEBIT_NOTES } from '../../../data/invoicesData';

export const DebitNotesSubpage: React.FC = () => {
  const [debitNotes, setDebitNotes] = useState<DebitNoteRecord[]>(INITIAL_DEBIT_NOTES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Debit Note state
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2025-0890');
  const [customer, setCustomer] = useState('Apex Infra & Builders Consortium');
  const [amount, setAmount] = useState<number>(15000);
  const [reason, setReason] = useState<DebitNoteRecord['reason']>('Additional Freight Charges');
  const [notes, setNotes] = useState('Emergency weekend crane unloading at site.');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateDebitNote = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: DebitNoteRecord = {
      id: `dn-${Date.now()}`,
      debitNoteNumber: `DN-2025-00${Math.floor(19 + Math.random() * 20)}`,
      invoiceNumber,
      customer,
      date: '12 Aug 2025',
      amount,
      reason,
      status: 'Issued',
      notes,
    };

    setDebitNotes([newNote, ...debitNotes]);
    setIsModalOpen(false);
    showToast(`Debit Note ${newNote.debitNoteNumber} issued successfully!`);
  };

  const totalDebitAmount = debitNotes.reduce((sum, d) => sum + d.amount, 0);

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
              <i className="fa-solid fa-file-circle-plus" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Supplementary Debit Notes</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Issue supplementary charges for additional freight, special pallet delivery, raw material price index revisions, or interest.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>Issue Debit Note</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Debit Notes
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              {debitNotes.length} Notes
            </span>
            <span className="text-[10px] text-amber-600 font-bold">Pending Clearance</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
            Total Surcharge Value (₹)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-amber-700 font-mono">
              ₹{totalDebitAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400">Added to Receivables</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Settled by Dealers
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-700 font-mono">
              {debitNotes.filter((d) => d.status === 'Settled').length} Settled
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">100% Verified</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Top Charge Category
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900 truncate">Dedicated Express Freight</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Debit Notes Registry
          </h3>
          <span className="text-xs text-slate-500">Includes applicable 18% GST</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Debit Note #</th>
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Reason / Surcharge</th>
                <th className="py-3 px-4 text-right">Debit Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {debitNotes.map((dn) => (
                <tr key={dn.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-amber-600 font-mono">
                    {dn.debitNoteNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 font-mono">
                    {dn.invoiceNumber}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{dn.customer}</td>
                  <td className="py-3 px-4 text-slate-500">{dn.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800">
                      {dn.reason}
                    </span>
                    {dn.notes && (
                      <p className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                        {dn.notes}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono tabular-nums">
                    ₹{dn.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        dn.status === 'Settled'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {dn.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => showToast(`Debit Note ${dn.debitNoteNumber} slip sent to client!`)}
                      className="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      Share Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Issue Supplementary Debit Note</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateDebitNote} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Invoice Reference</label>
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
                  <label className="font-bold text-slate-700 block mb-1">Debit Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Charge Reason</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Additional Freight Charges">Additional Freight Charges</option>
                    <option value="Interest on Delayed Payment">Interest on Delayed Payment</option>
                    <option value="Price Revision / Escalation">Price Revision / Escalation</option>
                    <option value="Quantity Dispute">Quantity Dispute</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Charge Details &amp; Authorization</label>
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
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Issue Debit Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
