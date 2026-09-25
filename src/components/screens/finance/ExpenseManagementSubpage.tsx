import React, { useState } from 'react';
import { ExpenseVoucherRecord } from '../../../types/erp';
import { INITIAL_EXPENSE_VOUCHERS } from '../../../data/financeData';

export const ExpenseManagementSubpage: React.FC = () => {
  const [vouchers, setVouchers] = useState<ExpenseVoucherRecord[]>(INITIAL_EXPENSE_VOUCHERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVoucher, setNewVoucher] = useState<Partial<ExpenseVoucherRecord>>({
    voucherNumber: `EXP-2025-${Math.floor(100 + Math.random() * 900)}`,
    date: '12 Aug 2025',
    category: 'Repairs & Maintenance',
    department: 'Factory Floor',
    amount: 15000,
    paidTo: '',
    paidThrough: 'HDFC Bank (Current A/c)',
    approvedBy: 'Ashutosh Sharma',
    description: '',
    status: 'Approved',
    receiptAttached: true,
  });

  const totalExpenseVouchers = vouchers.reduce((acc, curr) => acc + curr.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoucher.paidTo || !newVoucher.amount) return;

    const created: ExpenseVoucherRecord = {
      id: `vch-${Date.now()}`,
      voucherNumber: newVoucher.voucherNumber || 'EXP-2025-NEW',
      date: newVoucher.date || '12 Aug 2025',
      category: newVoucher.category || 'Repairs & Maintenance',
      department: newVoucher.department || 'Operations',
      amount: Number(newVoucher.amount) || 1000,
      paidTo: newVoucher.paidTo!,
      paidThrough: newVoucher.paidThrough || 'HDFC Bank',
      approvedBy: newVoucher.approvedBy || 'Ashutosh Sharma',
      description: newVoucher.description || 'General factory expense',
      status: 'Approved',
      receiptAttached: true,
    };

    setVouchers([created, ...vouchers]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Expense Claim &amp; Voucher Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Internal department petty vouchers, maintenance bills, marketing flex payments, and supervisor sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Vouchers Approved</span>
            <div className="text-lg font-mono font-black text-slate-900">
              ₹ {totalExpenseVouchers.toLocaleString('en-IN')}
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Create Expense Voucher</span>
          </button>
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Voucher No.</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Category &amp; Dept</th>
                <th className="py-3 px-4">Paid To</th>
                <th className="py-3 px-4">Disbursed Via</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-4">Approval</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-700">
                    {v.voucherNumber}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{v.date}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{v.category}</div>
                    <div className="text-[10px] text-slate-400">{v.department}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{v.paidTo}</td>
                  <td className="py-3.5 px-4 text-slate-600">{v.paidThrough}</td>
                  <td className="py-3.5 px-4 text-slate-600 truncate max-w-[200px]" title={v.description}>
                    {v.description}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-rose-600">
                    ₹{v.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.status === 'Approved' || v.status === 'Settled'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      ● {v.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {v.receiptAttached ? (
                      <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1 justify-end">
                        <i className="fa-solid fa-paperclip" /> Attached
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">No Receipt</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Create Factory Expense Voucher
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Voucher Number
                  </label>
                  <input
                    type="text"
                    required
                    value={newVoucher.voucherNumber}
                    onChange={(e) =>
                      setNewVoucher({ ...newVoucher, voucherNumber: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Expense Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newVoucher.amount}
                    onChange={(e) =>
                      setNewVoucher({ ...newVoucher, amount: parseFloat(e.target.value) })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Expense Category
                  </label>
                  <select
                    value={newVoucher.category}
                    onChange={(e) =>
                      setNewVoucher({ ...newVoucher, category: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Repairs & Maintenance">Repairs &amp; Maintenance</option>
                    <option value="Transport & Logistics">Transport &amp; Freight</option>
                    <option value="Marketing & Sales">Marketing &amp; Promotions</option>
                    <option value="Electricity & Utilities">Electricity &amp; Utilities</option>
                    <option value="Other Expenses">Other Administrative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Disbursed Through
                  </label>
                  <select
                    value={newVoucher.paidThrough}
                    onChange={(e) =>
                      setNewVoucher({ ...newVoucher, paidThrough: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="HDFC Bank (Current A/c)">HDFC Bank (Current A/c)</option>
                    <option value="SBI Bank (Operating A/c)">SBI Bank (Operating A/c)</option>
                    <option value="Cash in Hand (Factory)">Cash in Hand (Factory)</option>
                    <option value="Cash in Hand (Office)">Cash in Hand (Office)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Paid To (Payee / Vendor)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shree Krishna Hydraulics"
                  value={newVoucher.paidTo}
                  onChange={(e) =>
                    setNewVoucher({ ...newVoucher, paidTo: e.target.value })
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Description / Justification
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High shear cowles disperser seal replacement"
                  value={newVoucher.description}
                  onChange={(e) =>
                    setNewVoucher({ ...newVoucher, description: e.target.value })
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Authorize Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
