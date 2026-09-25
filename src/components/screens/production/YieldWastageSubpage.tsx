import React, { useState } from 'react';
import { YieldWastageRecord } from '../../../types/erp';
import { INITIAL_YIELD_WASTAGE_RECORDS } from '../../../data/productionData';

export const YieldWastageSubpage: React.FC = () => {
  const [yieldRecords] = useState<YieldWastageRecord[]>(INITIAL_YIELD_WASTAGE_RECORDS);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredRecords = yieldRecords.filter(
    (r) => filterStatus === 'All' || r.status === filterStatus
  );

  const totalTheoretical = yieldRecords.reduce((acc, r) => acc + r.theoreticalYieldKg, 0);
  const totalActual = yieldRecords.reduce((acc, r) => acc + r.actualYieldKg, 0);
  const avgYield = ((totalActual / (totalTheoretical || 1)) * 100).toFixed(2);
  const totalLoss = yieldRecords.reduce((acc, r) => acc + r.totalLossKg, 0);
  const totalRecycledWater = yieldRecords.reduce((acc, r) => acc + r.recycledToSlurryLiters, 0);

  return (
    <div className="space-y-6">
      {/* 4 Yield & Sustainability Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Overall Factory Yield
            </span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-chart-line-up" />
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">{avgYield}%</p>
          <span className="text-[10px] text-emerald-700 font-semibold">
            Industry gold standard is &gt; 98.0%
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Total Production Mass
            </span>
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-weight-hanging" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {(totalActual / 1000).toFixed(1)} Tons
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">
            Finished paint &amp; textures manufactured
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Total Material Loss
            </span>
            <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-filter" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {totalLoss.toLocaleString()} kg
          </p>
          <span className="text-[10px] text-amber-700 font-semibold">
            Kettle walls + filter residue (1.4% avg)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Wash Water Recycled
            </span>
            <span className="w-6 h-6 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-recycle" />
            </span>
          </div>
          <p className="text-2xl font-black text-cyan-700 mt-2 font-mono">
            {totalRecycledWater.toLocaleString()} Liters
          </p>
          <span className="text-[10px] text-cyan-800 font-semibold">
            Zero liquid discharge (ZLD) plant compliance
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Optimal Efficiency', 'Within Tolerances'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                filterStatus === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Batch Yield vs Theoretical BOM Recipe Reconciliation
        </span>
      </div>

      {/* Yield & Loss Analysis Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Paint Formulation Batch Yield &amp; Scrap Reconciliation
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Daily material balance audit conforming to ISO 14001 Environmental Standards
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Jaipur Central Factory Floor</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Product Formulation</th>
                <th className="py-3 px-4">Logged Date</th>
                <th className="py-3 px-4 text-right">Theoretical (kg)</th>
                <th className="py-3 px-4 text-right font-bold text-emerald-700">Actual Filled (kg)</th>
                <th className="py-3 px-4 text-right font-bold text-blue-700">Yield %</th>
                <th className="py-3 px-4 text-right">Kettle Residue</th>
                <th className="py-3 px-4 text-right">Filter Sludge</th>
                <th className="py-3 px-4 text-right">Water Recycled</th>
                <th className="py-3 px-4 text-center">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{r.batchNumber}</td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block font-semibold">{r.productName}</strong>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{r.date}</td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-500">
                    {r.theoreticalYieldKg.toLocaleString()} kg
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 tabular-nums">
                    {r.actualYieldKg.toLocaleString()} kg
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-blue-700 tabular-nums">
                    {r.yieldPercent}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    {r.lossesBreakdown.kettleResidueKg} kg
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    {r.lossesBreakdown.filterBagSludgeKg} kg
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-cyan-700 font-bold">
                    {r.recycledToSlurryLiters} L
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        r.status === 'Optimal Efficiency'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {r.status}
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
