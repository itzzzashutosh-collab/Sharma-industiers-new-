import React, { useState } from 'react';
import {
  FinanceTransaction,
  BankCashAccountRecord,
} from '../../../types/erp';
import {
  MONTHLY_INCOME_EXPENSE_DATA,
  CASH_FLOW_DATA,
  EXPENSE_BREAKDOWN_DATA,
  ACCOUNTS_SUMMARY,
  RECEIVABLES_AGING_BREAKDOWN,
  PROFIT_LOSS_DATA,
  BALANCE_SHEET_DATA,
} from '../../../data/financeData';

interface FinancialDashboardSubpageProps {
  transactions: FinanceTransaction[];
  bankAccounts: BankCashAccountRecord[];
  onOpenAddTransactionModal: (type?: 'Income' | 'Expense' | 'Transfer') => void;
  onSelectTransaction: (tx: FinanceTransaction) => void;
  onNavigateSubpage?: (subpage: string) => void;
}

export const FinancialDashboardSubpage: React.FC<FinancialDashboardSubpageProps> = ({
  transactions,
  bankAccounts,
  onOpenAddTransactionModal,
  onSelectTransaction,
  onNavigateSubpage,
}) => {
  const [txFilter, setTxFilter] = useState<'All' | 'Income' | 'Expense' | 'Transfers' | 'Adjustments'>('All');

  const filteredTransactions = transactions.filter((t) => {
    if (txFilter === 'All') return true;
    if (txFilter === 'Income') return t.type === 'Income';
    if (txFilter === 'Expense') return t.type === 'Expense';
    if (txFilter === 'Transfers') return t.type === 'Transfer';
    if (txFilter === 'Adjustments') return t.type === 'Adjustment';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 7 TOP KPI METRIC CARDS (Exact match to screenshot)           */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* KPI 1: Total Income */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Income</span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-wallet" />
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹ 28.45 Lakhs
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span>↑ 24%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* KPI 2: Total Expenses */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Expenses</span>
            <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-receipt" />
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹ 18.20 Lakhs
          </div>
          <div className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
            <span>↑ 12%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* KPI 3: Net Profit */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Net Profit</span>
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-chart-line" />
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹ 10.25 Lakhs
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span>↑ 38%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* KPI 4: Cash in Hand */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Cash in Hand</span>
            <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-money-bill-wave" />
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹ 6.80 Lakhs
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span>↑ 18%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* KPI 5: Bank Balance */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Bank Balance</span>
            <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-building-columns" />
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹ 12.40 Lakhs
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span>↑ 9%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* KPI 6: Outstanding Receivables */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Outstanding Receivables</span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-file-invoice" />
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹ 15.60 Lakhs
          </div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span>↓ 6%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* KPI 7: Outstanding Payables */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Outstanding Payables</span>
            <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-hand-holding-dollar" />
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 tracking-tight">
            ₹ 9.20 Lakhs
          </div>
          <div className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
            <span>↑ 11%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MIDDLE SECTION (4 COLUMNS / CARDS)                           */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Income vs Expense Chart */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Income vs Expense</h3>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Income
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Expenses
                </span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">₹ (Lakhs)</div>

            {/* Custom SVG Bar Chart */}
            <div className="h-44 mt-3 flex items-end justify-between gap-1 pt-4 pb-2 border-b border-slate-100">
              {MONTHLY_INCOME_EXPENSE_DATA.map((item) => {
                const maxVal = 30;
                const incomeHeight = (item.income / maxVal) * 100;
                const expenseHeight = (item.expense / maxVal) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-0.5 h-36">
                      {/* Income Bar */}
                      <div
                        className="w-2.5 bg-blue-500 rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                        style={{ height: `${incomeHeight}%` }}
                        title={`${item.month} Income: ₹${item.income}L`}
                      />
                      {/* Expense Bar */}
                      <div
                        className="w-2.5 bg-rose-500 rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                        style={{ height: `${expenseHeight}%` }}
                        title={`${item.month} Expense: ₹${item.expense}L`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 mt-1">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-2 text-[10px] text-slate-400 flex justify-between">
            <span>Aug Margin: 36% Net</span>
            <span className="font-mono text-emerald-600 font-bold">+₹10.25L</span>
          </div>
        </div>

        {/* Card 2: Cash Flow Chart */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Cash Flow</h3>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Inflow
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Outflow
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" /> Net
                </span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">₹ (Lakhs)</div>

            {/* Custom SVG Line + Bar Hybrid Cash Flow */}
            <div className="h-44 mt-3 flex items-end justify-between gap-1 pt-4 pb-2 border-b border-slate-100">
              {CASH_FLOW_DATA.map((item) => {
                const maxVal = 30;
                const inflowHeight = (item.inflow / maxVal) * 100;
                const outflowHeight = (item.outflow / maxVal) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-0.5 h-36">
                      <div
                        className="w-2 bg-emerald-500 rounded-t-sm"
                        style={{ height: `${inflowHeight}%` }}
                        title={`${item.month} Inflow: ₹${item.inflow}L`}
                      />
                      <div
                        className="w-2 bg-rose-400 rounded-t-sm"
                        style={{ height: `${outflowHeight}%` }}
                        title={`${item.month} Outflow: ₹${item.outflow}L`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 mt-1">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-2 text-[10px] text-slate-400 flex justify-between">
            <span>Operating Inflow Surplus</span>
            <span className="font-mono text-cyan-600 font-bold">Positive Trend</span>
          </div>
        </div>

        {/* Card 3: Expense Breakdown (Donut Chart) */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800">Expense Breakdown</h3>
            <div className="relative flex items-center justify-center my-3">
              {/* SVG Donut */}
              <svg width="120" height="120" viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                {/* Segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="16"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 32) / 100}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#06b6d4"
                  strokeWidth="16"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 18) / 100}
                  className="rotate-45 origin-center"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="16"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 12) / 100}
                  className="rotate-90 origin-center"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="16"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 10) / 100}
                  className="rotate-180 origin-center"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[11px] font-black text-slate-900 leading-tight">
                  ₹ 18.20
                </span>
                <span className="text-[8px] text-slate-400 font-bold uppercase">
                  Lakhs
                </span>
                <span className="text-[7px] text-slate-400 leading-none">
                  Total Expenses
                </span>
              </div>
            </div>

            {/* Compact Legend */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] text-slate-600">
              {EXPENSE_BREAKDOWN_DATA.slice(0, 8).map((exp) => (
                <div key={exp.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-1 truncate max-w-[85px]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: exp.color }} />
                    <span className="truncate">{exp.name}</span>
                  </span>
                  <span className="font-mono font-bold text-slate-700">{exp.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Quick Actions Grid */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => onOpenAddTransactionModal('Income')}
                className="p-2 text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-emerald-200 shadow-2xs"
              >
                <i className="fa-solid fa-plus text-[10px]" />
                <span>Record Income</span>
              </button>

              <button
                onClick={() => onOpenAddTransactionModal('Expense')}
                className="p-2 text-[11px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-rose-200 shadow-2xs"
              >
                <i className="fa-solid fa-plus text-[10px]" />
                <span>Record Expense</span>
              </button>

              <button
                onClick={() => onOpenAddTransactionModal('Transfer')}
                className="p-2 text-[11px] font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <i className="fa-solid fa-right-left text-[10px]" />
                <span>Transfer Funds</span>
              </button>

              <button
                onClick={() => onNavigateSubpage?.('Bank & Cash Management')}
                className="p-2 text-[11px] font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <i className="fa-solid fa-building-columns text-[10px]" />
                <span>Reconcile Bank</span>
              </button>

              <button
                onClick={() => onNavigateSubpage?.('Profit & Loss Statement')}
                className="p-2 text-[11px] font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <i className="fa-solid fa-file-lines text-[10px]" />
                <span>Generate Report</span>
              </button>

              <button
                onClick={() => onNavigateSubpage?.('GST & Tax Compliance')}
                className="p-2 text-[11px] font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <i className="fa-solid fa-receipt text-[10px]" />
                <span>File GST Return</span>
              </button>

              <button
                onClick={() => onNavigateSubpage?.('Budgeting & Forecasting')}
                className="p-2 text-[11px] font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <i className="fa-solid fa-sliders text-[10px]" />
                <span>Manage Budgets</span>
              </button>

              <button
                onClick={() => window.print()}
                className="p-2 text-[11px] font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <i className="fa-solid fa-download text-[10px]" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM SECTION: TRANSACTIONS + ACCOUNTS SUMMARY + BANK ACCOUNTS */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (lg:col-span-7): Recent Transactions Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {(['All', 'Income', 'Expense', 'Transfers', 'Adjustments'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTxFilter(tab)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                      txFilter === tab
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-2.5 px-3">
                      <input type="checkbox" className="rounded text-blue-600" />
                    </th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Particulars</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Reference</th>
                    <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">•••</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.slice(0, 8).map((tx) => (
                    <tr
                      key={tx.id}
                      onClick={() => onSelectTransaction(tx)}
                      className="hover:bg-slate-50/80 cursor-pointer transition"
                    >
                      <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded text-blue-600" />
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-500 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.type === 'Income'
                              ? 'bg-emerald-50 text-emerald-700'
                              : tx.type === 'Expense'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800 truncate max-w-[150px]">
                        {tx.particulars}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-500 truncate max-w-[120px]">
                        {tx.category}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-600">
                        {tx.reference}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {tx.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.status === 'Received' || tx.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTransaction(tx);
                          }}
                          className="w-6 h-6 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition"
                        >
                          <i className="fa-solid fa-ellipsis" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing recent 8 of {transactions.length} vouchers</span>
            <button
              onClick={() => onNavigateSubpage?.('Income & Expenses')}
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              View Full Register →
            </button>
          </div>
        </div>

        {/* Center Column (lg:col-span-2.5 / 3): Accounts Summary & Aging */}
        <div className="lg:col-span-3 space-y-4">
          {/* Accounts Summary Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800">Accounts Summary</h3>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                This Month ▾
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Receivables (AR)</span>
                <strong className="font-mono text-slate-900">
                  ₹ {ACCOUNTS_SUMMARY.totalReceivablesAR.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Payables (AP)</span>
                <strong className="font-mono text-slate-900">
                  ₹ {ACCOUNTS_SUMMARY.totalPayablesAP.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Advance from Customers</span>
                <span className="font-mono text-slate-700">
                  ₹ {ACCOUNTS_SUMMARY.advanceFromCustomers.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Advance to Suppliers</span>
                <span className="font-mono text-slate-700">
                  ₹ {ACCOUNTS_SUMMARY.advanceToSuppliers.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TDS Receivable</span>
                <span className="font-mono text-slate-700">
                  ₹ {ACCOUNTS_SUMMARY.tdsReceivable.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TDS Payable</span>
                <span className="font-mono text-slate-700">
                  ₹ {ACCOUNTS_SUMMARY.tdsPayable.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">GST Payable</span>
                <span className="font-mono text-rose-600 font-semibold">
                  ₹ {ACCOUNTS_SUMMARY.gstPayable.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Input GST Credit</span>
                <span className="font-mono text-emerald-600 font-semibold">
                  ₹ {ACCOUNTS_SUMMARY.inputGstCredit.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-500">Outstanding Expenses</span>
                <strong className="font-mono text-slate-900">
                  ₹ {ACCOUNTS_SUMMARY.outstandingExpenses.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
          </div>

          {/* Aging Summary (Receivables) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Aging Summary (Receivables)</h3>
              <button
                onClick={() => onNavigateSubpage?.('Accounts Receivable (AR)')}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
              >
                View All
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              {RECEIVABLES_AGING_BREAKDOWN.map((item) => (
                <div key={item.bucket} className="flex justify-between items-center py-0.5">
                  <span className="text-slate-500">{item.bucket}</span>
                  <span className="font-mono font-bold text-slate-800">
                    {item.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-2): Bank Accounts & Expense Categories */}
        <div className="lg:col-span-2 space-y-4">
          {/* Bank & Cash Accounts Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Bank &amp; Cash Accounts</h3>
              <button
                onClick={() => onNavigateSubpage?.('Bank & Cash Management')}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {bankAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center text-[10px] font-bold">
                        {acc.isBank ? '🏦' : '💵'}
                      </span>
                      <span className="text-[11px] font-bold text-slate-800 truncate max-w-[110px]">
                        {acc.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-black text-slate-900">
                      ₹ {acc.balance.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{acc.lastSynced}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Categories (This Month) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Expense Categories</h3>
              <button
                onClick={() => onNavigateSubpage?.('Expense Management')}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
              >
                View All
              </button>
            </div>

            <div className="space-y-1.5 text-[11px]">
              {EXPENSE_BREAKDOWN_DATA.slice(0, 5).map((cat) => (
                <div key={cat.name} className="flex justify-between items-center text-slate-600">
                  <span className="truncate max-w-[100px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="truncate">{cat.name}</span>
                  </span>
                  <span className="font-mono text-slate-800 font-semibold">
                    ₹ {cat.value.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900 text-xs">
                <span>Total</span>
                <span className="font-mono">₹ 18,20,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM ROW: PROFIT & LOSS STATEMENT + BALANCE SHEET (Exact match) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Profit & Loss Statement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Profit &amp; Loss Statement</h3>
            <button
              onClick={() => onNavigateSubpage?.('Profit & Loss Statement')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              View All
            </button>
          </div>

          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-1.5 text-left">Particulars</th>
                <th className="py-1.5 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PROFIT_LOSS_DATA.particulars.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${
                    row.isTotal ? 'bg-slate-50/80 font-bold text-slate-900' : 'text-slate-600'
                  }`}
                >
                  <td className="py-1.5">{row.label}</td>
                  <td className="py-1.5 text-right font-mono">
                    {row.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
              <tr className="bg-emerald-50 text-emerald-900 font-black text-xs border-t-2 border-emerald-200">
                <td className="py-2 font-bold">Net Profit</td>
                <td className="py-2 text-right font-mono text-emerald-700">
                  {PROFIT_LOSS_DATA.netProfit.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right: Balance Sheet (As on 12 Aug 2025) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Balance Sheet (As on {BALANCE_SHEET_DATA.asOnDate})
            </h3>
            <button
              onClick={() => onNavigateSubpage?.('Balance Sheet')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs divide-x divide-slate-100">
            {/* Assets */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase pb-1 border-b border-slate-100">
                <span>Assets</span>
                <span>Amount (₹)</span>
              </div>
              {BALANCE_SHEET_DATA.assets.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-600 py-0.5">
                  <span className="truncate max-w-[130px]">{item.name}</span>
                  <span className="font-mono text-slate-800">
                    {item.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-slate-900 text-xs">
                <span>Total Assets</span>
                <span className="font-mono">
                  {BALANCE_SHEET_DATA.totalAssets.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Liabilities & Equity */}
            <div className="pl-4 space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase pb-1 border-b border-slate-100">
                <span>Liabilities &amp; Equity</span>
                <span>Amount (₹)</span>
              </div>
              {BALANCE_SHEET_DATA.liabilitiesAndEquity.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-600 py-0.5">
                  <span className="truncate max-w-[130px]">{item.name}</span>
                  <span className="font-mono text-slate-800">
                    {item.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-slate-900 text-xs">
                <span>Total Liabilities &amp; Equity</span>
                <span className="font-mono">
                  {BALANCE_SHEET_DATA.totalLiabilitiesAndEquity.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
