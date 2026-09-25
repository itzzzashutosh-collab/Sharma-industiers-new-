import React, { useState } from 'react';
import { AccountsPayableRecord } from '../../../types/erp';
import { INITIAL_AP_RECORDS } from '../../../data/financeData';

interface AccountsPayableSubpageProps {
  onOpenRecordPayment?: () => void;
}

export const AccountsPayableSubpage: React.FC<AccountsPayableSubpageProps> = ({
  onOpenRecordPayment,
}) => {
  const [records] = useState<AccountsPayableRecord[]>(INITIAL_AP_RECORDS);
  const [search, setSearch] = useState('');

  const totalPayable = records.reduce((acc, curr) => acc + curr.outstandingAmount, 0);

  const filteredRecords = records.filter(
    (r) =>
      r.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      r.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.billNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Accounts Payable (AP) &amp; Vendor Liabilities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Raw material supplier bills, container packaging dues, plant utility bills, and payment schedules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Due to Vendors</span>
            <div className="text-lg font-mono font-black text-rose-600">
              ₹ {totalPayable.toLocaleString('en-IN')}
            </div>
          </div>
          {onOpenRecordPayment && (
            <button
              onClick={onOpenRecordPayment}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <i className="fa-solid fa-credit-card text-xs" />
              <span>Disburse Vendor Payment</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search vendor supplier name, purchase order PO#, invoice ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* AP Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Vendor &amp; Category</th>
                <th className="py-3 px-4">PO Ref</th>
                <th className="py-3 px-4">Bill No.</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Bill Value</th>
                <th className="py-3 px-4 text-right">Paid to Date</th>
                <th className="py-3 px-4 text-right">Outstanding (₹)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{r.vendorName}</div>
                    <div className="text-[10px] text-slate-400">
                      {r.vendorCategory} • Contact: {r.contactPerson}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                    {r.poNumber}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{r.billNumber}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-semibold">{r.dueDate}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    ₹{r.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-600 font-semibold">
                    ₹{r.paidAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-rose-600">
                    ₹{r.outstandingAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.status === 'Due Soon'
                          ? 'bg-amber-50 text-amber-700'
                          : r.status === 'Overdue'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      ● {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Initiating payment transfer of ₹${r.outstandingAmount.toLocaleString('en-IN')} to ${r.vendorName}...`)}
                      className="px-2.5 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                    >
                      Pay Bill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
