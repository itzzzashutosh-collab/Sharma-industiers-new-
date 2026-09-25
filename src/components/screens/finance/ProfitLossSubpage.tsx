import React, { useState } from 'react';
import { PROFIT_LOSS_DATA } from '../../../data/financeData';

export const ProfitLossSubpage: React.FC = () => {
  const [period, setPeriod] = useState('August 2025');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Profit &amp; Loss Statement (Income Statement)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational manufacturing revenues, cost of goods sold (COGS), factory overheads, and net margins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option>August 2025 (Current)</option>
            <option>July 2025</option>
            <option>Q1 FY 2025-26</option>
            <option>FY 2024-25 (Annual)</option>
          </select>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-print" />
            <span>Print P&amp;L</span>
          </button>
        </div>
      </div>

      {/* Main Statement Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs max-w-4xl mx-auto overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/60 text-center space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            SWATCH PAINTS PRIVATE LIMITED • FACTORY UNIT 01
          </span>
          <h3 className="text-lg font-black text-slate-900">
            Statement of Profit and Loss for the Period Ended 12 August 2025
          </h3>
          <p className="text-xs text-slate-500">All amounts stated in Indian Rupees (INR)</p>
        </div>

        <div className="p-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                <th className="py-2.5 text-left">Particulars / Line Item</th>
                <th className="py-2.5 text-right">Schedule Ref</th>
                <th className="py-2.5 text-right">Amount (₹)</th>
                <th className="py-2.5 text-right">% of Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Revenue Section */}
              <tr className="bg-slate-50 font-bold text-slate-800">
                <td colSpan={4} className="py-2 px-1 text-[11px] uppercase tracking-wider">
                  I. REVENUE FROM OPERATIONS
                </td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Gross Invoiced Paint Sales (Emulsion, Distemper, Primer)</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-01</td>
                <td className="py-2 text-right font-mono font-bold text-slate-900">28,45,300</td>
                <td className="py-2 text-right font-mono text-slate-600">96.0%</td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Other Operational Income (Scrap, Packaging, Interest)</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-02</td>
                <td className="py-2 text-right font-mono text-slate-900">1,20,000</td>
                <td className="py-2 text-right font-mono text-slate-600">4.0%</td>
              </tr>
              <tr className="bg-blue-50/50 font-black text-slate-900 border-t border-b border-blue-200">
                <td className="py-2.5 pl-2">TOTAL INCOME (I)</td>
                <td className="py-2.5 text-right font-mono"></td>
                <td className="py-2.5 text-right font-mono text-blue-700 text-sm">29,65,300</td>
                <td className="py-2.5 text-right font-mono text-blue-700">100.0%</td>
              </tr>

              {/* Expenses Section */}
              <tr className="bg-slate-50 font-bold text-slate-800">
                <td colSpan={4} className="py-2 px-1 text-[11px] uppercase tracking-wider">
                  II. DIRECT &amp; OPERATING EXPENSES
                </td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Cost of Raw Materials Consumed (TiO2, Resins, Pigments)</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-03</td>
                <td className="py-2 text-right font-mono text-slate-900">9,12,000</td>
                <td className="py-2 text-right font-mono text-slate-600">30.8%</td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Direct Shop Floor Labor &amp; Machine Operators</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-04</td>
                <td className="py-2 text-right font-mono text-slate-900">3,45,000</td>
                <td className="py-2 text-right font-mono text-slate-600">11.6%</td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Packaging Materials (Plastic Buckets, Tin Cans, Labels)</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-05</td>
                <td className="py-2 text-right font-mono text-slate-900">2,18,000</td>
                <td className="py-2 text-right font-mono text-slate-600">7.4%</td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Freight Outward &amp; Highway Transport Corridors</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-06</td>
                <td className="py-2 text-right font-mono text-slate-900">1,85,000</td>
                <td className="py-2 text-right font-mono text-slate-600">6.2%</td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Plant Electricity (11KV JVVNL) &amp; Factory Fuel</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-07</td>
                <td className="py-2 text-right font-mono text-slate-900">1,22,000</td>
                <td className="py-2 text-right font-mono text-slate-600">4.1%</td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Administrative, Office &amp; Legal Compliance Fees</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-08</td>
                <td className="py-2 text-right font-mono text-slate-900">2,08,000</td>
                <td className="py-2 text-right font-mono text-slate-600">7.0%</td>
              </tr>
              <tr>
                <td className="py-2 pl-4 text-slate-700">Sales, Marketing &amp; Dealer Scheme Incentives</td>
                <td className="py-2 text-right font-mono text-slate-400">SCH-09</td>
                <td className="py-2 text-right font-mono text-slate-900">1,50,000</td>
                <td className="py-2 text-right font-mono text-slate-600">5.1%</td>
              </tr>
              <tr className="bg-rose-50/50 font-black text-slate-900 border-t border-b border-rose-200">
                <td className="py-2.5 pl-2">TOTAL EXPENSES (II)</td>
                <td className="py-2.5 text-right font-mono"></td>
                <td className="py-2.5 text-right font-mono text-rose-700 text-sm">18,20,000</td>
                <td className="py-2.5 text-right font-mono text-rose-700">61.4%</td>
              </tr>

              {/* Net Operating Profit */}
              <tr className="bg-emerald-50 text-emerald-950 font-black text-sm border-t-2 border-emerald-300">
                <td className="py-3 pl-2">NET PROFIT BEFORE TAX (I - II)</td>
                <td className="py-3 text-right font-mono"></td>
                <td className="py-3 text-right font-mono text-emerald-700 text-base">
                  ₹ 10,25,300
                </td>
                <td className="py-3 text-right font-mono text-emerald-700">
                  34.6%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
