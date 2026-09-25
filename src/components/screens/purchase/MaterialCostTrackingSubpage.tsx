import React, { useState } from 'react';
import { MaterialCostTrendRecord } from '../../../types/erp';
import { INITIAL_MATERIAL_COST_TRENDS } from '../../../data/purchaseData';

export const MaterialCostTrackingSubpage: React.FC = () => {
  const [trends] = useState<MaterialCostTrendRecord[]>(INITIAL_MATERIAL_COST_TRENDS);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialCostTrendRecord>(trends[0]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-chart-line-up" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Raw Material Price Index &amp; Commodity Cost Tracking
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking market fluctuations in Titanium Dioxide, Acrylic Polymers, Calcite Extenders, and packaging drums.
          </p>
        </div>

        <span className="text-xs text-slate-400 font-mono">Jaipur Plant Purchasing Index</span>
      </div>

      {/* Material Cost Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trends.map((t) => {
          const isSelected = selectedMaterial.id === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setSelectedMaterial(t)}
              className={`bg-white p-5 rounded-2xl border cursor-pointer transition shadow-2xs flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-blue-400 ring-2 ring-blue-100 bg-blue-50/20'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {t.category}
                </span>
                <h3 className="font-bold text-slate-900 text-xs mt-2">{t.materialName}</h3>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono font-black text-xl text-slate-900">
                    ₹{t.currentRatePerKg} <span className="text-xs font-normal text-slate-400">/ kg</span>
                  </span>
                  <span
                    className={`font-mono text-xs font-bold flex items-center gap-0.5 ${
                      t.changePercent > 0
                        ? 'text-rose-600'
                        : t.changePercent < 0
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {t.changePercent > 0 ? '↑' : t.changePercent < 0 ? '↓' : ''}{' '}
                    {Math.abs(t.changePercent)}%
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
                  <span>Monthly Spend:</span>
                  <strong className="text-slate-800 font-mono">
                    ₹ {(t.totalMonthlySpend / 100000).toFixed(2)} Lakhs
                  </strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Material Detailed Historical Price Trend */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Price Trend: {selectedMaterial.materialName}
            </h3>
            <span className="text-xs text-slate-500">
              5-Month procurement landed cost history (Apr - Aug 2025)
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="font-bold text-slate-700">
              Procured from {selectedMaterial.suppliersCount} approved vendors
            </span>
            <span className="font-mono font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
              Avg Rate: ₹{selectedMaterial.currentRatePerKg} / kg
            </span>
          </div>
        </div>

        {/* Bar chart representation */}
        <div className="h-56 flex items-end justify-between gap-6 pt-6 pb-2 px-6 border-b border-slate-100">
          {selectedMaterial.priceHistory.map((p, idx) => {
            const minRate = 10;
            const maxRate = Math.max(...selectedMaterial.priceHistory.map((x) => x.rate)) * 1.25;
            const heightPct = Math.round((p.rate / maxRate) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-xs font-mono font-black text-slate-800">
                  ₹{p.rate}
                </span>
                <div
                  className="w-full max-w-[48px] bg-teal-600 hover:bg-teal-700 rounded-t-lg transition-all duration-300"
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-xs font-bold text-slate-600">{p.month}</span>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs text-slate-600">
          <span>
            Monthly Consumption Volume:{' '}
            <strong className="text-slate-900 font-mono">
              {selectedMaterial.monthlyPurchasedKg.toLocaleString()} kg
            </strong>
          </span>
          <span>
            Total August Commitment:{' '}
            <strong className="text-teal-700 font-mono font-bold">
              ₹ {selectedMaterial.totalMonthlySpend.toLocaleString('en-IN')}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
