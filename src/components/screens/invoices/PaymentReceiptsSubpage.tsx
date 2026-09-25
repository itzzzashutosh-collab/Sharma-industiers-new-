import React, { useState } from 'react';
import { PaymentReceiptRecord } from '../../../types/erp';
import { INITIAL_PAYMENT_RECEIPTS } from '../../../data/invoicesData';

export const PaymentReceiptsSubpage: React.FC = () => {
  const [receipts, setReceipts] = useState<PaymentReceiptRecord[]>(INITIAL_PAYMENT_RECEIPTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New receipt form state
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2025-0891');
  const [customer, setCustomer] = useState('Marwar Paints & Hardware Mart');
  const [amount, setAmount] = useState<number>(78500);
  const [mode, setMode] = useState<PaymentReceiptRecord['mode']>('NEFT / RTGS');
  const [referenceUtr, setReferenceUtr] = useState('HDFCR52025081299881');
  const [bankName, setBankName] = useState('ICICI Bank (Sitapura Branch)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    const newRec: PaymentReceiptRecord = {
      id: `pr-${Date.now()}`,
      receiptNumber: `REC-2025-04${Math.floor(19 + Math.random() * 20)}`,
      invoiceNumber,
      customer,
      paymentDate: '12 Aug 2025',
      amount,
      mode,
      referenceUtr,
      status: 'Cleared',
      bankName,
    };

    setReceipts([newRec, ...receipts]);
    setIsModalOpen(false);
    showToast(`Money Receipt ${newRec.receiptNumber} issued for ₹${amount.toLocaleString('en-IN')}!`);
  };

  const totalCollected = receipts.reduce((sum, r) => sum + r.amount, 0);

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
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-money-check-dollar" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Payment Collection Receipts</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Official bank-cleared money receipts, NEFT/RTGS UTR verification, cheque registry &amp; TDS deductions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>Issue Money Receipt</span>
        </button>
      </div>

      {/* 4 Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Receipts Issued
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              {receipts.length} Receipts
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Cleared</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Total Collections (₹)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-700 font-mono">
              ₹{(totalCollected / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[10px] text-slate-400">Realized in Bank</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Preferred Payment Mode
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">NEFT / RTGS (83%)</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Average Clearance
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">Same Day (T+0)</span>
            <span className="text-[10px] text-emerald-600 font-bold">Direct ICICI</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Money Receipts Register
          </h3>
          <span className="text-xs text-slate-500">Auto-allocated against invoice ledgers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Receipt #</th>
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Mode &amp; Bank</th>
                <th className="py-3 px-4">Reference UTR</th>
                <th className="py-3 px-4 text-right">Amount Received</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {receipts.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-emerald-600 font-mono">
                    {r.receiptNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 font-mono">
                    {r.invoiceNumber}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.customer}</td>
                  <td className="py-3 px-4 text-slate-500">{r.paymentDate}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block">{r.mode}</span>
                    <span className="text-[10px] text-slate-400">{r.bankName}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                    {r.referenceUtr}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono tabular-nums">
                    ₹{r.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ● {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => showToast(`Money receipt slip printed for ${r.receiptNumber}`)}
                      className="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      Print Receipt
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
              <h3 className="text-sm font-black text-slate-900">Issue Payment Receipt</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateReceipt} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Invoice Number</label>
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
                  <label className="font-bold text-slate-700 block mb-1">Amount Collected (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payment Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="NEFT / RTGS">NEFT / RTGS</option>
                    <option value="Cheque">Cheque</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reference UTR / Cheque #</label>
                <input
                  type="text"
                  value={referenceUtr}
                  onChange={(e) => setReferenceUtr(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Bank Name / Branch</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Issue Receipt Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
