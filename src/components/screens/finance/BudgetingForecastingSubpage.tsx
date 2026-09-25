import React, { useState } from 'react';
import { BudgetForecastRecord } from '../../../types/erp';
import { INITIAL_BUDGET_RECORDS } from '../../../data/financeData';

export const BudgetingForecastingSubpage: React.FC = () => {
  const [budgets] = useState<BudgetForecastRecord[]>(INITIAL_BUDGET_RECORDS);

  const totalMonthlyBudget = budgets.reduce((acc, curr) => acc + curr.monthBudget, 0);
  const totalMonthlyActual = budgets.reduce((acc, curr) => acc + curr.monthActual, 0);
  const totalVariance = totalMonthlyActual - totalMonthlyBudget;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Budgeting, Variance &amp; Financial Forecasting
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational expenditure limits, department cost controls, and Q3 predictive run rates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            FY 2025-26 Budget Plan (Phase 1)
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            August Allocated Budget
          </span>
          <div className="text-2xl font-mono font-black text-slate-900 mt-1">
            ₹ {totalMonthlyBudget.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across 5 operational factory departments
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            August Actual Utilization
          </span>
          <div className="text-2xl font-mono font-black text-blue-700 mt-1">
            ₹ {totalMonthlyActual.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            {totalVariance <= 0 ? 'Favorable variance (Underspend)' : 'Over budget'}
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Net Monthly Variance
          </span>
          <div className="text-2xl font-mono font-black text-emerald-700 mt-1">
            ₹ {Math.abs(totalVariance).toLocaleString('en-IN')} Saved
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Strict chemical consumption audits
          </div>
        </div>
      </div>

      {/* Budget Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Expense Head</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-right">Annual Plan (₹)</th>
                <th className="py-3 px-4 text-right">Month Budget (₹)</th>
                <th className="py-3 px-4 text-right">Actual Spent (₹)</th>
                <th className="py-3 px-4 text-right">Variance (₹)</th>
                <th className="py-3 px-4">Burn Status</th>
                <th className="py-3 px-4 text-right">Next Month Forecast</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {budgets.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{b.category}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {b.department}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    ₹{b.annualBudget.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900">
                    ₹{b.monthBudget.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    ₹{b.monthActual.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold">
                    <span
                      className={b.varianceAmount <= 0 ? 'text-emerald-600' : 'text-rose-600'}
                    >
                      {b.varianceAmount <= 0 ? '-' : '+'}₹
                      {Math.abs(b.varianceAmount).toLocaleString('en-IN')} ({b.variancePercent}%)
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Within Budget'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      ● {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-blue-700">
                    ₹{b.forecastNextMonth.toLocaleString('en-IN')}
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
