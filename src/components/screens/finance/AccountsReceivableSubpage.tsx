import React, { useState } from 'react';
import { AccountsReceivableRecord } from '../../../types/erp';
import { INITIAL_AR_RECORDS, RECEIVABLES_AGING_BREAKDOWN } from '../../../data/financeData';

interface AccountsReceivableSubpageProps {
  onOpenRecordReceipt?: () => void;
}

export const AccountsReceivableSubpage: React.FC<AccountsReceivableSubpageProps> = ({
  onOpenRecordReceipt,
}) => {
  const [records] = useState<AccountsReceivableRecord[]>(INITIAL_AR_RECORDS);
  const [selectedBucket, setSelectedBucket] = useState<string>('All');
  const [search, setSearch] = useState('');

  const totalOutstanding = records.reduce((acc, curr) => acc + curr.outstandingAmount, 0);

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.salesRep.toLowerCase().includes(search.toLowerCase());
    const matchesBucket = selectedBucket === 'All' || r.agingBucket === selectedBucket;
    return matchesSearch && matchesBucket;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Accounts Receivable (AR) &amp; Dealer Aging
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor paint dealer credit terms, overdue collection queues, and aged debt recovery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Due from Dealers</span>
            <div className="text-lg font-mono font-black text-slate-900">
              ₹ {totalOutstanding.toLocaleString('en-IN')}
            </div>
          </div>
          {onOpenRecordReceipt && (
            <button
              onClick={onOpenRecordReceipt}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Record Dealer Receipt</span>
            </button>
          )}
        </div>
      </div>

      {/* Aging Buckets Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {RECEIVABLES_AGING_BREAKDOWN.map((b) => (
          <div
            key={b.bucket}
            onClick={() => setSelectedBucket(selectedBucket === b.bucket ? 'All' : b.bucket)}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              selectedBucket === b.bucket
                ? 'bg-blue-50/60 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                : 'bg-white hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{b.bucket}</span>
              <span className="text-[10px] font-bold text-slate-400 font-mono">{b.percent}% of total</span>
            </div>
            <div className="text-xl font-mono font-black text-slate-900 mt-1">
              ₹ {b.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search dealer name, invoice number, territory sales rep..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* AR Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Customer &amp; Tier</th>
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Invoice Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Invoice Value</th>
                <th className="py-3 px-4 text-right">Received</th>
                <th className="py-3 px-4 text-right">Outstanding (₹)</th>
                <th className="py-3 px-4">Aging Bracket</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{r.customerName}</div>
                    <div className="text-[10px] text-slate-400">
                      {r.customerTier} • Rep: {r.salesRep}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                    {r.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{r.invoiceDate}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-semibold">{r.dueDate}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    ₹{r.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-600 font-semibold">
                    ₹{r.receivedAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                    ₹{r.outstandingAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 font-mono">
                      {r.agingBucket}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.status === 'Current'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      ● {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Sending WhatsApp & SMS payment reminder to ${r.customerName} (${r.phone})... Sent successfully!`)}
                      className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      Remind
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
