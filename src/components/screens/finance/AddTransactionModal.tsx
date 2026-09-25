import React, { useState } from 'react';
import { FinanceTransaction } from '../../../types/erp';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: FinanceTransaction) => void;
  initialType?: 'Income' | 'Expense' | 'Transfer';
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
  initialType = 'Income',
}) => {
  const [activeTab, setActiveTab] = useState<'Income' | 'Expense' | 'Transfer'>(initialType);
  const [particulars, setParticulars] = useState('');
  const [category, setCategory] = useState('Sales - Emulsion');
  const [amount, setAmount] = useState<number | ''>('');
  const [account, setAccount] = useState('HDFC Bank (Current A/c)');
  const [paymentMethod, setPaymentMethod] = useState('RTGS / Bank Transfer');
  const [reference, setReference] = useState(`TX-${Math.floor(1000 + Math.random() * 9000)}`);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!particulars || !amount || Number(amount) <= 0) return;

    const newTx: FinanceTransaction = {
      id: `tx-${Date.now()}`,
      date: '12 Aug 2025',
      type: activeTab,
      particulars,
      category,
      reference: reference || `REF-${Date.now()}`,
      amount: Number(amount),
      status: activeTab === 'Income' ? 'Received' : 'Paid',
      account,
      paymentMethod,
      notes,
    };

    onAddTransaction(newTx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Record Financial Transaction
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Post an entry to General Ledger, Cash Book &amp; Bank Accounts
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Transaction Type Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setActiveTab('Income');
              setCategory('Sales - Emulsion');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'Income'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-arrow-down-left mr-1.5" />
            Income Receipt
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('Expense');
              setCategory('Raw Materials');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'Expense'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-arrow-up-right mr-1.5" />
            Expense Payment
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('Transfer');
              setCategory('Bank Transfer');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'Transfer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-right-left mr-1.5" />
            Contra Transfer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Particulars / Account Name
            </label>
            <input
              type="text"
              required
              placeholder={
                activeTab === 'Income'
                  ? 'e.g. Om Enterprises (Dealer receipt)'
                  : activeTab === 'Expense'
                  ? 'e.g. Titanium Dioxide Purchase / Worker Wages'
                  : 'e.g. HDFC Current A/c to Cash Safe'
              }
              value={particulars}
              onChange={(e) => setParticulars(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Category
              </label>
              {activeTab === 'Income' ? (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                >
                  <option value="Sales - Rustic">Sales - Rustic Royale</option>
                  <option value="Sales - Emulsion">Sales - Shine Emulsion</option>
                  <option value="Sales - Weatherguard">Sales - Weatherguard</option>
                  <option value="Sales - Distemper">Sales - Distemper / Prime</option>
                  <option value="Other Income">Other Operational Income</option>
                </select>
              ) : activeTab === 'Expense' ? (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                >
                  <option value="Raw Materials">Raw Materials (Pigments/Resins)</option>
                  <option value="Salaries & Wages">Salaries &amp; Factory Wages</option>
                  <option value="Packaging">Packaging Materials (Cans/Buckets)</option>
                  <option value="Transport & Logistics">Transport &amp; Freight</option>
                  <option value="Electricity & Utilities">Electricity &amp; Utilities</option>
                  <option value="Marketing & Sales">Marketing &amp; Branding</option>
                  <option value="Rent & Facility">Plant Rent &amp; Facility</option>
                  <option value="Repairs & Maintenance">Repairs &amp; Spares</option>
                  <option value="Other Expenses">Other Administrative Expenses</option>
                </select>
              ) : (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                >
                  <option value="Bank Transfer">Bank to Bank Transfer</option>
                  <option value="Cash Imprest">Cash Withdrawal (Vault Imprest)</option>
                  <option value="Cash Deposit">Cash Deposit into Bank</option>
                </select>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="50,000"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Bank / Cash Account
              </label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="HDFC Bank (Current A/c)">HDFC Bank (Current A/c)</option>
                <option value="SBI Bank (Operating A/c)">SBI Bank (Operating A/c)</option>
                <option value="Cash in Hand (Factory)">Cash in Hand (Factory)</option>
                <option value="Cash in Hand (Office)">Cash in Hand (Office)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Payment Mode
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="RTGS / Bank Transfer">RTGS / NEFT Online</option>
                <option value="UPI Merchant QR">UPI Instant QR</option>
                <option value="Cheque Clearance">Account Payee Cheque</option>
                <option value="Cash Counter Slip">Physical Cash Voucher</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Reference / Bill / Voucher No.
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Audit Notes / Narration
              </label>
              <input
                type="text"
                placeholder="Optional remark"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 text-white font-bold rounded-xl shadow-xs transition ${
                activeTab === 'Income'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : activeTab === 'Expense'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Post Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
