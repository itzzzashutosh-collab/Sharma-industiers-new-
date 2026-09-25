import React, { useState } from 'react';
import { BALANCE_SHEET_DATA } from '../../../data/financeData';

export const BalanceSheetSubpage: React.FC = () => {
  const [asOfDate] = useState('12 August 2025');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Balance Sheet &amp; Financial Position
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Classified statement of company assets, current liabilities, working capital, and owner's net worth.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <i className="fa-solid fa-check-double" />
            <span>Balanced: ₹63.11 Lakhs</span>
          </span>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-print" />
            <span>Print Balance Sheet</span>
          </button>
        </div>
      </div>

      {/* Balance Sheet Document */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs max-w-4xl mx-auto overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/60 text-center space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            SWATCH PAINTS PRIVATE LIMITED • FACTORY UNIT 01
          </span>
          <h3 className="text-lg font-black text-slate-900">
            Balance Sheet as on {asOfDate}
          </h3>
          <p className="text-xs text-slate-500">In accordance with Indian Accounting Standards (Ind AS)</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs">
          {/* ASSETS COLUMN */}
          <div className="space-y-4">
            <div className="border-b-2 border-slate-300 pb-2 flex justify-between font-black text-slate-900 uppercase tracking-wider text-sm">
              <span>ASSETS</span>
              <span>AMOUNT (₹)</span>
            </div>

            {/* Current Assets */}
            <div className="space-y-2">
              <span className="font-bold text-blue-700 block text-[11px] uppercase tracking-wide">
                A. Current Assets
              </span>
              <div className="pl-2 space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Cash &amp; Bank Balances</span>
                  <span className="font-mono font-bold text-slate-800">19,20,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Trade Receivables (Debtors)</span>
                  <span className="font-mono font-bold text-slate-800">15,60,300</span>
                </div>
                <div className="flex justify-between">
                  <span>Finished Goods Inventory (Putty &amp; Paint)</span>
                  <span className="font-mono font-bold text-slate-800">8,45,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Raw Materials Stock (Pigments/Resin)</span>
                  <span className="font-mono font-bold text-slate-800">6,20,500</span>
                </div>
              </div>
            </div>

            {/* Non-Current Assets */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-bold text-blue-700 block text-[11px] uppercase tracking-wide">
                B. Non-Current &amp; Fixed Assets
              </span>
              <div className="pl-2 space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Plant, Machinery &amp; Bead Mills</span>
                  <span className="font-mono font-bold text-slate-800">10,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Furniture &amp; Office IT Equipment</span>
                  <span className="font-mono font-bold text-slate-800">1,25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Capital Assets &amp; Utility Deposits</span>
                  <span className="font-mono font-bold text-slate-800">2,40,000</span>
                </div>
              </div>
            </div>

            {/* Total Assets */}
            <div className="pt-4 border-t-2 border-slate-300 flex justify-between font-black text-slate-900 text-sm">
              <span>TOTAL ASSETS</span>
              <span className="font-mono text-blue-700 text-base">
                ₹ {BALANCE_SHEET_DATA.totalAssets.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* LIABILITIES & EQUITY COLUMN */}
          <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
            <div className="border-b-2 border-slate-300 pb-2 flex justify-between font-black text-slate-900 uppercase tracking-wider text-sm">
              <span>LIABILITIES &amp; EQUITY</span>
              <span>AMOUNT (₹)</span>
            </div>

            {/* Current Liabilities */}
            <div className="space-y-2">
              <span className="font-bold text-rose-700 block text-[11px] uppercase tracking-wide">
                A. Current Liabilities
              </span>
              <div className="pl-2 space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Trade Payables (Creditors)</span>
                  <span className="font-mono font-bold text-slate-800">9,20,450</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Statutory Payable</span>
                  <span className="font-mono font-bold text-slate-800">1,17,700</span>
                </div>
                <div className="flex justify-between">
                  <span>TDS Withholding Tax Payable</span>
                  <span className="font-mono font-bold text-slate-800">32,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Outstanding Operating Liabilities</span>
                  <span className="font-mono font-bold text-slate-800">3,80,000</span>
                </div>
              </div>
            </div>

            {/* Non-Current Liabilities */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-bold text-rose-700 block text-[11px] uppercase tracking-wide">
                B. Non-Current Liabilities
              </span>
              <div className="pl-2 space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Long Term Bank Loan (Machinery Refinancing)</span>
                  <span className="font-mono font-bold text-slate-800">8,00,000</span>
                </div>
              </div>
            </div>

            {/* Equity */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-bold text-emerald-700 block text-[11px] uppercase tracking-wide">
                C. Shareholders' Equity &amp; Reserves
              </span>
              <div className="pl-2 space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Owner's Paid-up Capital</span>
                  <span className="font-mono font-bold text-slate-800">30,61,850</span>
                </div>
                <div className="flex justify-between">
                  <span>Retained Earnings &amp; Reserves</span>
                  <span className="font-mono font-bold text-slate-800">10,25,000</span>
                </div>
              </div>
            </div>

            {/* Total Liabilities & Equity */}
            <div className="pt-4 border-t-2 border-slate-300 flex justify-between font-black text-slate-900 text-sm">
              <span>TOTAL LIABILITIES &amp; EQUITY</span>
              <span className="font-mono text-emerald-700 text-base">
                ₹ {BALANCE_SHEET_DATA.totalLiabilitiesAndEquity.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
