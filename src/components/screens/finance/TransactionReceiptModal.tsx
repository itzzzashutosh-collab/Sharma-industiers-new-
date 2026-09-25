import React from 'react';
import { FinanceTransaction } from '../../../types/erp';

interface TransactionReceiptModalProps {
  transaction: FinanceTransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionReceiptModal: React.FC<TransactionReceiptModalProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                transaction.type === 'Income'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-rose-50 text-rose-600'
              }`}
            >
              <i
                className={
                  transaction.type === 'Income'
                    ? 'fa-solid fa-arrow-down-left'
                    : 'fa-solid fa-arrow-up-right'
                }
              />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Official Accounting Voucher
              </span>
              <h3 className="text-sm font-black text-slate-900">
                {transaction.reference}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Voucher Content */}
        <div className="py-4 space-y-4 text-xs">
          <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                Transaction Amount
              </span>
              <div className="text-2xl font-mono font-black text-slate-900 mt-0.5">
                ₹{transaction.amount.toLocaleString('en-IN')}
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                transaction.status === 'Received' || transaction.status === 'Paid'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              ● {transaction.status}
            </span>
          </div>

          <div className="space-y-2.5 border-t border-b border-slate-100 py-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Particulars:</span>
              <strong className="text-slate-900">{transaction.particulars}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-slate-800">{transaction.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Posting Date:</span>
              <span className="font-mono text-slate-700">{transaction.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Bank / Cash Ledger:</span>
              <span className="font-semibold text-blue-700">{transaction.account || 'HDFC Bank'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Instrument / Mode:</span>
              <span className="text-slate-700">{transaction.paymentMethod || 'NEFT / RTGS'}</span>
            </div>
            {transaction.notes && (
              <div className="pt-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                <span className="font-bold text-slate-700 block mb-0.5">Auditor Narration:</span>
                {transaction.notes}
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5"
          >
            <i className="fa-solid fa-print" />
            <span>Print Voucher</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
