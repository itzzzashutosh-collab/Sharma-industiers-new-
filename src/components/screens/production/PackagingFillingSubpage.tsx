import React, { useState } from 'react';
import { PackagingFillingRun } from '../../../types/erp';
import { INITIAL_PACKAGING_RUNS } from '../../../data/productionData';

export const PackagingFillingSubpage: React.FC = () => {
  const [runs, setRuns] = useState<PackagingFillingRun[]>(INITIAL_PACKAGING_RUNS);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const toggleRunStatus = (id: string) => {
    setRuns((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'Active Running' ? 'Paused' : 'Active Running';
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  const filteredRuns = runs.filter(
    (r) => filterStatus === 'All' || r.status === filterStatus || r.packSize === filterStatus
  );

  const totalPacked = runs.reduce((acc, r) => acc + r.packedCount, 0);
  const totalRejects = runs.reduce((acc, r) => acc + r.rejectedCount, 0);

  return (
    <div className="space-y-6">
      {/* 4 Packaging Line Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Total Units Packed Today
            </span>
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-box-open" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {totalPacked.toLocaleString()} Units
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">
            Across 20L, 10L buckets and 20kg bags
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Container Fill Rejection
            </span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-scale-balanced" />
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">
            {totalRejects} Units (0.3%)
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">
            Auto-rejected by checkweigher &amp; seal tester
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Inkjet Batch Stamping
            </span>
            <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-print" />
            </span>
          </div>
          <p className="text-2xl font-black text-purple-700 mt-2 font-mono">100% Pass</p>
          <span className="text-[10px] text-purple-800 font-semibold">
            MRP, Mfg Date, Expiry &amp; GS1 Barcode legible
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Average Line Speed
            </span>
            <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-gauge-simple" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">16.5 / Min</p>
          <span className="text-[10px] text-amber-700 font-semibold">
            Automatic rotary bucket filler &amp; capper
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Active Running', 'Completed', 'Paused', '20kg Bag', '10L Bucket', '20L Bucket'].map(
            (st) => (
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
            )
          )}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Jaipur Plant Packaging Concourse
        </span>
      </div>

      {/* Packaging Runs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              High-Speed Packaging &amp; Automated Container Filling Lines
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Conveyor lines, dynamic load cell checkweighing, and automated leak integrity testers
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Lines 1 - 4 Operational</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Run Code</th>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Product Formulation</th>
                <th className="py-3 px-4">Pack Size</th>
                <th className="py-3 px-4">Line Equipment</th>
                <th className="py-3 px-4 text-right">Target</th>
                <th className="py-3 px-4 text-right">Filled &amp; Sealed</th>
                <th className="py-3 px-4 text-right">Speed</th>
                <th className="py-3 px-4 text-right">Check Weight</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredRuns.map((run) => {
                const pct = Math.min(100, Math.round((run.packedCount / (run.targetCount || 1)) * 100));
                return (
                  <tr key={run.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{run.runNumber}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{run.batchNumber}</td>
                    <td className="py-3.5 px-4">
                      <strong className="text-slate-900 block font-semibold">{run.productName}</strong>
                      <span className="text-[10px] text-slate-400">Operator: {run.operator}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-[11px] text-slate-700">
                        {run.packSize}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                      {run.packagingLine}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-500 font-semibold">
                      {run.targetCount}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-blue-700 tabular-nums">
                        {run.packedCount}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">({pct}%)</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-700">
                      {run.fillSpeedBagsPerMin} /min
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700">
                      {run.weightCheckAvgKg} kg
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          run.status === 'Active Running'
                            ? 'bg-emerald-100 text-emerald-800'
                            : run.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {run.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleRunStatus(run.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                          run.status === 'Active Running'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {run.status === 'Active Running' ? 'Pause' : 'Resume'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
