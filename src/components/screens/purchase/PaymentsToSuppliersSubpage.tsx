import React, { useState } from 'react';
import { SupplierPaymentRecord } from '../../../types/erp';
import { INITIAL_SUPPLIER_PAYMENTS } from '../../../data/purchaseData';

export const PaymentsToSuppliersSubpage: React.FC = () => {
  const [payments, setPayments] = useState<SupplierPaymentRecord[]>(INITIAL_SUPPLIER_PAYMENTS);
  const [showModal, setShowModal] = useState<boolean>(false);

  // New Payment Form
  const [vendor, setVendor] = useState('RG Chemicals');
  const [invRef, setInvRef] = useState('RG-INV-1987');
  const [amount, setAmount] = useState<number>(124250);
  const [mode, setMode] = useState<SupplierPaymentRecord['mode']>('RTGS');
  const [utr, setUtr] = useState('HDFCR202508129999123');
  const [bank, setBank] = useState('HDFC Bank CC A/c 50200018992');

  const handleMakePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newPay: SupplierPaymentRecord = {
      id: `pay-${Date.now()}`,
      paymentNumber: `PAY-2025-0${Math.floor(90 + Math.random() * 50)}`,
      supplierName: vendor,
      invoiceNumber: invRef,
      paymentDate: 'Today, 12 Aug 2025',
      amount,
      mode,
      utrRef: utr,
      bankAccount: bank,
      status: 'Cleared',
    };
    setPayments([newPay, ...payments]);
    setShowModal(false);
  };

  const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold font-serif">
              ₹
            </span>
            <h2 className="text-base font-black text-slate-900">
              Supplier Payments &amp; Accounts Payable Ledger
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Bank RTGS / NEFT transfer disbursements, UTR references, advance adjustments, and aging balances.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <i className="fa-solid fa-money-bill-transfer text-[10px]" />
          <span>Record Supplier Payment</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Total Disbursed (August)
          </span>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">
            ₹ {totalPaid.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">100% Cleared via Bank RTGS/NEFT</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Current Outstanding Balance
          </span>
          <p className="text-2xl font-black text-amber-600 mt-2 font-mono">₹ 6.2 Lakhs</p>
          <span className="text-[10px] text-slate-500">Due across 6 suppliers over 30 days</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Early Payment Discounts Saved
          </span>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">₹ 42,500</p>
          <span className="text-[10px] text-emerald-700">2% cash discount on prompt 10-day RTGS</span>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Payment Disbursements Register</h3>
          <span className="text-xs text-slate-400 font-mono">Bank Statement UTR Reconciliation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Payment #</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Invoice Reference</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payment Mode</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-4">Bank UTR Reference</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{p.paymentNumber}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{p.supplierName}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{p.invoiceNumber}</td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{p.paymentDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-[10px] text-slate-800">
                      {p.mode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900 tabular-nums">
                    ₹ {p.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 text-[11px]">{p.utrRef}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Record Supplier Payment</h3>
              <button onClick={() => setShowModal(false)} className="w-7 h-7 text-slate-400">
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleMakePayment} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Supplier Name</label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Invoice Ref</label>
                  <input
                    type="text"
                    value={invRef}
                    onChange={(e) => setInvRef(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Payment Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as SupplierPaymentRecord['mode'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="RTGS">RTGS</option>
                    <option value="NEFT">NEFT</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Advance Adjustment">Advance Adjustment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Bank UTR / Transaction Reference</label>
                <input
                  type="text"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Debited Bank Account</label>
                <input
                  type="text"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
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
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs"
                >
                  Confirm Disbursement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
