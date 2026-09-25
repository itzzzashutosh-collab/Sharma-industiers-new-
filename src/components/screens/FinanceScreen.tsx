import React, { useState } from 'react';
import {
  FinanceTransaction,
  BankCashAccountRecord,
} from '../../types/erp';
import {
  INITIAL_TRANSACTIONS,
  INITIAL_BANK_ACCOUNTS,
} from '../../data/financeData';

import { FinancialDashboardSubpage } from './finance/FinancialDashboardSubpage';
import { IncomeExpensesSubpage } from './finance/IncomeExpensesSubpage';
import { BankCashSubpage } from './finance/BankCashSubpage';
import { LedgerAccountsSubpage } from './finance/LedgerAccountsSubpage';
import { AccountsReceivableSubpage } from './finance/AccountsReceivableSubpage';
import { AccountsPayableSubpage } from './finance/AccountsPayableSubpage';
import { GstTaxComplianceSubpage } from './finance/GstTaxComplianceSubpage';
import { ProfitLossSubpage } from './finance/ProfitLossSubpage';
import { BalanceSheetSubpage } from './finance/BalanceSheetSubpage';
import { ExpenseManagementSubpage } from './finance/ExpenseManagementSubpage';
import { BudgetingForecastingSubpage } from './finance/BudgetingForecastingSubpage';
import { AuditTrailSubpage } from './finance/AuditTrailSubpage';

import { AddTransactionModal } from './finance/AddTransactionModal';
import { TransactionReceiptModal } from './finance/TransactionReceiptModal';

interface FinanceScreenProps {
  activeSubPage?: string;
  onSelectSubPage?: (subPage: string) => void;
}

const TABS = [
  { id: 'Financial Dashboard', label: 'Financial Dashboard', icon: 'fa-solid fa-chart-pie' },
  { id: 'Income & Expenses', label: 'Income & Expenses', icon: 'fa-solid fa-arrow-right-arrow-left' },
  { id: 'Bank & Cash Management', label: 'Bank & Cash', icon: 'fa-solid fa-building-columns' },
  { id: 'Ledger (Accounts)', label: 'Ledger (Accounts)', icon: 'fa-solid fa-book-journal-whills' },
  { id: 'Accounts Receivable (AR)', label: 'Receivables (AR)', icon: 'fa-solid fa-file-invoice-dollar' },
  { id: 'Accounts Payable (AP)', label: 'Payables (AP)', icon: 'fa-solid fa-hand-holding-dollar' },
  { id: 'GST & Tax Compliance', label: 'GST & Tax', icon: 'fa-solid fa-receipt' },
  { id: 'Profit & Loss Statement', label: 'P&L Statement', icon: 'fa-solid fa-chart-line' },
  { id: 'Balance Sheet', label: 'Balance Sheet', icon: 'fa-solid fa-scale-balanced' },
  { id: 'Expense Management', label: 'Expense Claims', icon: 'fa-solid fa-money-bill-transfer' },
  { id: 'Budgeting & Forecasting', label: 'Budgets & Forecast', icon: 'fa-solid fa-sliders' },
  { id: 'Audit Trail', label: 'Audit Trail', icon: 'fa-solid fa-fingerprint' },
];

export const FinanceScreen: React.FC<FinanceScreenProps> = ({
  activeSubPage,
  onSelectSubPage,
}) => {
  const [internalSubPage, setInternalSubPage] = useState('Financial Dashboard');
  const currentSubPage = activeSubPage || internalSubPage;

  const handleSubPageChange = (tabId: string) => {
    setInternalSubPage(tabId);
    onSelectSubPage?.(tabId);
  };

  // State
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(INITIAL_TRANSACTIONS);
  const [bankAccounts, setBankAccounts] = useState<BankCashAccountRecord[]>(INITIAL_BANK_ACCOUNTS);

  // Modals state
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);
  const [txModalType, setTxModalType] = useState<'Income' | 'Expense' | 'Transfer'>('Income');
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<FinanceTransaction | null>(null);
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);

  const handleAddTransaction = (newTx: FinanceTransaction) => {
    setTransactions([newTx, ...transactions]);

    // Update bank/cash balances accordingly
    setBankAccounts((prev) =>
      prev.map((acc) => {
        if ((newTx.account || '').includes(acc.name) || acc.name.includes(newTx.account || '')) {
          if (newTx.type === 'Income') {
            return { ...acc, balance: acc.balance + newTx.amount };
          }
          if (newTx.type === 'Expense') {
            return { ...acc, balance: Math.max(0, acc.balance - newTx.amount) };
          }
        }
        return acc;
      })
    );
  };

  const openAddModal = (type: 'Income' | 'Expense' | 'Transfer' = 'Income') => {
    setTxModalType(type);
    setIsAddTxModalOpen(true);
    setIsAddDropdownOpen(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Screen Header (Matches Screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base font-bold shadow-2xs">
              <i className="fa-solid fa-chart-simple" />
            </span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Finance &amp; Accounts
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track income, expenses, cash flow, GST, and overall financial health of Swatch Paints.
          </p>
        </div>

        {/* Header Right Controls (Matches Screenshot) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Picker Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
            <i className="fa-regular fa-calendar text-slate-400 text-[11px]" />
            <span>01 Aug 2025 → 12 Aug 2025</span>
          </div>

          {/* Period Dropdown */}
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>Financial Year 2025-26</option>
          </select>

          {/* Add Transaction Button with Dropdown (Matches Screenshot) */}
          <div className="relative">
            <button
              onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Add Transaction</span>
              <i className="fa-solid fa-chevron-down text-[10px] ml-0.5" />
            </button>

            {isAddDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => openAddModal('Income')}
                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 transition"
                >
                  <i className="fa-solid fa-arrow-down-left text-emerald-600" />
                  <span>Record Income</span>
                </button>
                <button
                  onClick={() => openAddModal('Expense')}
                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2 transition"
                >
                  <i className="fa-solid fa-arrow-up-right text-rose-600" />
                  <span>Record Expense</span>
                </button>
                <button
                  onClick={() => openAddModal('Transfer')}
                  className="w-full text-left px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 transition"
                >
                  <i className="fa-solid fa-right-left text-blue-600" />
                  <span>Transfer Funds</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Subpage Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200/80">
        {TABS.map((tab) => {
          const isActive = currentSubPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSubPageChange(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/70'
              }`}
            >
              <i className={`${tab.icon} text-[11px]`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Subpage Rendering */}
      {currentSubPage === 'Financial Dashboard' && (
        <FinancialDashboardSubpage
          transactions={transactions}
          bankAccounts={bankAccounts}
          onOpenAddTransactionModal={openAddModal}
          onSelectTransaction={setSelectedTxForReceipt}
          onNavigateSubpage={handleSubPageChange}
        />
      )}

      {currentSubPage === 'Income & Expenses' && (
        <IncomeExpensesSubpage
          transactions={transactions}
          onOpenAddModal={openAddModal}
          onSelectTransaction={setSelectedTxForReceipt}
        />
      )}

      {currentSubPage === 'Bank & Cash Management' && (
        <BankCashSubpage
          accounts={bankAccounts}
          transactions={transactions}
          onOpenTransferModal={() => openAddModal('Transfer')}
        />
      )}

      {currentSubPage === 'Ledger (Accounts)' && <LedgerAccountsSubpage />}

      {currentSubPage === 'Accounts Receivable (AR)' && (
        <AccountsReceivableSubpage
          onOpenRecordReceipt={() => openAddModal('Income')}
        />
      )}

      {currentSubPage === 'Accounts Payable (AP)' && (
        <AccountsPayableSubpage
          onOpenRecordPayment={() => openAddModal('Expense')}
        />
      )}

      {currentSubPage === 'GST & Tax Compliance' && <GstTaxComplianceSubpage />}

      {currentSubPage === 'Profit & Loss Statement' && <ProfitLossSubpage />}

      {currentSubPage === 'Balance Sheet' && <BalanceSheetSubpage />}

      {currentSubPage === 'Expense Management' && <ExpenseManagementSubpage />}

      {currentSubPage === 'Budgeting & Forecasting' && <BudgetingForecastingSubpage />}

      {currentSubPage === 'Audit Trail' && <AuditTrailSubpage />}

      {/* Record Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddTxModalOpen}
        onClose={() => setIsAddTxModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        initialType={txModalType}
      />

      {/* Transaction Receipt Voucher Modal */}
      <TransactionReceiptModal
        transaction={selectedTxForReceipt}
        isOpen={!!selectedTxForReceipt}
        onClose={() => setSelectedTxForReceipt(null)}
      />
    </div>
  );
};
