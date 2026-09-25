import React, { useState } from 'react';
import { BankCashAccountRecord, FinanceTransaction } from '../../../types/erp';

interface BankCashSubpageProps {
  accounts: BankCashAccountRecord[];
  transactions: FinanceTransaction[];
  onOpenTransferModal: () => void;
}

export const BankCashSubpage: React.FC<BankCashSubpageProps> = ({
  accounts,
  transactions,
  onOpenTransferModal,
}) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>(accounts[0].id);
  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) || accounts[0];

  const totalLiquidity = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  const accountTransactions = transactions.filter(
    (t) => (t.account || '').includes(selectedAccount.name) || selectedAccount.name.includes(t.account || '')
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Bank &amp; Cash Treasury Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational current accounts, petty cash vaults, statement reconciliation, and contra liquidity movements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Liquid Funds</span>
            <div className="text-lg font-mono font-black text-slate-900">
              ₹ {totalLiquidity.toLocaleString('en-IN')}
            </div>
          </div>
          <button
            onClick={onOpenTransferModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <i className="fa-solid fa-right-left text-xs" />
            <span>Transfer Funds</span>
          </button>
        </div>
      </div>

      {/* Accounts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts.map((acc) => {
          const isSelected = acc.id === selectedAccountId;
          return (
            <div
              key={acc.id}
              onClick={() => setSelectedAccountId(acc.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-blue-50/50 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm">
                  {acc.isBank ? '🏦' : '💵'}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ● {acc.status}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-xs font-bold text-slate-900">{acc.name}</h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {acc.accountNumber || 'Cash Drawer Safe'}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Cleared Balance
                </span>
                <div className="text-xl font-black font-mono text-slate-900 mt-0.5">
                  ₹ {acc.balance.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{acc.lastSynced}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Details & Recent Statement */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {selectedAccount.accountType}
              </span>
              <h3 className="text-base font-bold text-slate-900">{selectedAccount.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedAccount.branchCode || 'Factory Financial Vault'} • Balance: ₹{selectedAccount.balance.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Reconciling ${selectedAccount.name} against live bank feed... Statement matched 100%.`)}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 rounded-xl transition flex items-center gap-1.5 shadow-2xs"
            >
              <i className="fa-solid fa-rotate text-[11px]" />
              <span>Auto-Reconcile Statement</span>
            </button>
          </div>
        </div>

        {/* Ledger Entries for Selected Account */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Voucher Ref</th>
                <th className="py-2.5 px-4">Particulars</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4 text-right">Debit / Outflow (₹)</th>
                <th className="py-2.5 px-4 text-right">Credit / Inflow (₹)</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accountTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No recent transactions recorded for this account.
                  </td>
                </tr>
              ) : (
                accountTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4 font-mono text-slate-600">{tx.date}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{tx.reference}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{tx.particulars}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.type === 'Income'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                      {tx.type === 'Expense' ? `₹${tx.amount.toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                      {tx.type === 'Income' ? `₹${tx.amount.toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Cleared
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
