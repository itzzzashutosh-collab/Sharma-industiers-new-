import React, { useState } from 'react';
import { FinanceTransaction } from '../../../types/erp';

interface IncomeExpensesSubpageProps {
  transactions: FinanceTransaction[];
  onOpenAddModal: (type?: 'Income' | 'Expense' | 'Transfer') => void;
  onSelectTransaction: (tx: FinanceTransaction) => void;
}

export const IncomeExpensesSubpage: React.FC<IncomeExpensesSubpageProps> = ({
  transactions,
  onOpenAddModal,
  onSelectTransaction,
}) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Income' | 'Expense' | 'Transfer'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.particulars.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      (t.account || '').toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Income &amp; Expense Transaction Register
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time ledger entries of incoming sales revenues and factory operating disbursements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAddModal('Income')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Record Income</span>
          </button>
          <button
            onClick={() => onOpenAddModal('Expense')}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-minus text-[10px]" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Revenue Booked
          </span>
          <div className="text-2xl font-mono font-black text-emerald-700 mt-1">
            ₹ {totalIncome.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            From dealer paint sales &amp; direct supplies
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Expenses Paid
          </span>
          <div className="text-2xl font-mono font-black text-rose-700 mt-1">
            ₹ {totalExpense.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Raw materials, plant salaries, power &amp; freight
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Net Operational Spread
          </span>
          <div className="text-2xl font-mono font-black text-blue-700 mt-1">
            ₹ {netBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Positive Cash Margin (36% Operating Margin)
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search particulars, invoice ref, category, account..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="All">All Types ({transactions.length})</option>
            <option value="Income">Income Receipts</option>
            <option value="Expense">Expense Payments</option>
            <option value="Transfer">Contra Transfers</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="All">All Categories</option>
            <option value="Sales - Rustic">Sales - Rustic Royale</option>
            <option value="Sales - Emulsion">Sales - Shine Emulsion</option>
            <option value="Sales - Weatherguard">Sales - Weatherguard</option>
            <option value="Raw Materials">Raw Materials</option>
            <option value="Salaries & Wages">Salaries &amp; Wages</option>
            <option value="Packaging">Packaging</option>
            <option value="Transport & Logistics">Transport</option>
          </select>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Date &amp; Ref</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Particulars</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Account / Bank</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => onSelectTransaction(tx)}
                  className="hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {tx.reference}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{tx.date}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        tx.type === 'Income'
                          ? 'bg-emerald-50 text-emerald-700'
                          : tx.type === 'Expense'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      ● {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{tx.particulars}</td>
                  <td className="py-3 px-4 text-slate-600">{tx.category}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {tx.account || 'HDFC Bank'}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {tx.paymentMethod || 'Bank Transfer'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-slate-900 text-sm">
                    {tx.type === 'Expense' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.status === 'Received' || tx.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTransaction(tx);
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      View
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
