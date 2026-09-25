import React, { useState } from 'react';
import { LedgerAccountRecord } from '../../../types/erp';
import { INITIAL_LEDGER_ACCOUNTS } from '../../../data/financeData';

export const LedgerAccountsSubpage: React.FC = () => {
  const [accounts] = useState<LedgerAccountRecord[]>(INITIAL_LEDGER_ACCOUNTS);
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.code.includes(search);
    const matchesGroup = selectedGroup === 'All' || acc.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const totalDebits = accounts.reduce((acc, curr) => acc + curr.debitTotal, 0);
  const totalCredits = accounts.reduce((acc, curr) => acc + curr.creditTotal, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Chart of Accounts &amp; General Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Standard double-entry accounting ledger codes, trial balances, and financial classifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-2">
            <i className="fa-solid fa-scale-balanced" />
            <span>Trial Balance In Sync</span>
          </span>
        </div>
      </div>

      {/* Trial Balance Health Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Ledger Debits
          </span>
          <div className="text-2xl font-mono font-black text-slate-900 mt-1">
            ₹ {totalDebits.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Debit entries across assets, expense &amp; cash accounts
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Ledger Credits
          </span>
          <div className="text-2xl font-mono font-black text-slate-900 mt-1">
            ₹ {totalCredits.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Credit entries across liabilities, revenue &amp; equity
          </div>
        </div>
      </div>

      {/* Search & Group Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by ledger code or account title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="All">All Account Groups</option>
            <option value="Assets">Assets</option>
            <option value="Liabilities">Liabilities</option>
            <option value="Income">Income / Turnover</option>
            <option value="Direct Expenses">Direct Expenses</option>
          </select>
        </div>
      </div>

      {/* Ledger Accounts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Account Title</th>
                <th className="py-3 px-4">Group Classification</th>
                <th className="py-3 px-4 text-right">Opening Balance (₹)</th>
                <th className="py-3 px-4 text-right">Debit Total (₹)</th>
                <th className="py-3 px-4 text-right">Credit Total (₹)</th>
                <th className="py-3 px-4 text-right">Closing Balance (₹)</th>
                <th className="py-3 px-4">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAccounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                    {acc.code}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{acc.name}</div>
                    <div className="text-[10px] text-slate-400">{acc.description}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {acc.group}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    {acc.openingBalance.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-rose-600 font-semibold">
                    {acc.debitTotal.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-600 font-semibold">
                    {acc.creditTotal.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                    ₹{acc.closingBalance.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      {acc.normalBalance}
                    </span>
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
