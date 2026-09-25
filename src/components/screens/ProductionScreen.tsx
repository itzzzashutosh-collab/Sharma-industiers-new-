import React, { useState } from 'react';
import { ProductionBatch } from '../../types/erp';

interface ProductionScreenProps {
  batches: ProductionBatch[];
  onAddBatch: (batch: ProductionBatch) => void;
  onUpdateBatchStatus: (batchId: string, status: ProductionBatch['status']) => void;
}

export const ProductionScreen: React.FC<ProductionScreenProps> = ({
  batches,
  onAddBatch,
  onUpdateBatchStatus,
}) => {
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [productName, setProductName] = useState('Swatch Rustic Royale 20kg');
  const [targetBags, setTargetBags] = useState(500);
  const [line, setLine] = useState('Line 1 (Automatic Packing)');
  const [operator, setOperator] = useState('Suresh Verma');

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: ProductionBatch = {
      id: `bch-${Date.now()}`,
      batchNumber: `BCH-${Math.floor(510 + Math.random() * 80)}`,
      productName,
      targetBags,
      producedBags: 0,
      status: 'In Progress',
      line,
      operator,
      startTime: 'Just now',
      defectCount: 0,
      qualityPassRate: 99.5,
    };
    onAddBatch(newBatch);
    setShowAddBatch(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-industry" />
            </span>
            <h2 className="text-lg font-black text-slate-900">
              Plant Operations &amp; Production Floor
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Swatch Paints Factory #01 (Jaipur) · Dispersion units, automatic packaging &amp; QC lab.
          </p>
        </div>

        <button
          onClick={() => setShowAddBatch(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
        >
          <i className="fa-solid fa-plus text-[10px]" />
          <span>Schedule New Batch</span>
        </button>
      </div>

      {/* Daily Metrics Dashboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Progress Donut */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center space-x-4">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-emerald-500"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="92, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute font-black text-slate-800 text-xs">92%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              Today&apos;s Output
            </span>
            <h3 className="text-base font-black text-slate-900">21,000 / 23,000</h3>
            <span className="text-[10px] text-slate-500 font-medium">Bags Manufactured</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active Batches</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{batches.length}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">
            All 3 plant lines operational
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Defects Detected</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">0</p>
          <span className="text-[10px] text-slate-400 font-semibold">Zero batch recall today</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Quality Pass Rate</span>
          <p className="text-2xl font-black text-slate-900 mt-1">98.4%</p>
          <span className="text-[10px] text-teal-600 font-semibold">Viscosity &amp; Sheen Verified</span>
        </div>
      </div>

      {/* Active Batches Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Live Production Batches</h3>
          <span className="text-xs text-slate-400 font-semibold">Updated 5m ago by Suresh Verma</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Batch #</th>
                <th className="py-3 px-4">Product Formulation</th>
                <th className="py-3 px-4">Plant Unit / Line</th>
                <th className="py-3 px-4">Supervisor</th>
                <th className="py-3 px-4 text-right">Target (Bags)</th>
                <th className="py-3 px-4 text-right">Produced</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-900 font-mono">{b.batchNumber}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{b.productName}</td>
                  <td className="py-3 px-4 text-slate-500">{b.line}</td>
                  <td className="py-3 px-4">{b.operator}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">{b.targetBags}</td>
                  <td className="py-3 px-4 text-right font-bold text-blue-600 tabular-nums">
                    {b.producedBags}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600'
                          : b.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-600'
                          : b.status === 'Quality Check'
                          ? 'bg-purple-50 text-purple-600'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        onUpdateBatchStatus(b.id, e.target.value as ProductionBatch['status'])
                      }
                      className="text-[10px] bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 font-semibold focus:outline-none"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Quality Check">Quality Check</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Batch Modal */}
      {showAddBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowAddBatch(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900">Schedule Factory Batch</h3>
            <p className="text-xs text-slate-500 mt-1">
              Assign mixing tank and target bags for Jaipur Factory #01.
            </p>

            <form onSubmit={handleCreateBatch} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 text-slate-600">Product Formulation</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                >
                  <option value="Swatch Rustic Royale 20kg">Swatch Rustic Royale 20kg</option>
                  <option value="Swatch Shine Emulsion 10L">Swatch Shine Emulsion 10L</option>
                  <option value="Swatch Weatherguard Exterior">Swatch Weatherguard Exterior</option>
                  <option value="Swatch Base Prime 20L">Swatch Base Prime 20L</option>
                  <option value="Swatch Distemper Fine 25kg">Swatch Distemper Fine 25kg</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Target Output (Bags)</label>
                  <input
                    type="number"
                    step="50"
                    min="100"
                    value={targetBags}
                    onChange={(e) => setTargetBags(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Supervisor</label>
                  <input
                    type="text"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Production Unit Line</label>
                <select
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="Line 1 (Automatic Packing)">Line 1 (Automatic Packing)</option>
                  <option value="Unit 2 (High-Shear Dispersion)">Unit 2 (High-Shear Dispersion)</option>
                  <option value="Tank 3 (Viscosity & Weathering)">Tank 3 (Viscosity &amp; Weathering)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBatch(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Launch Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
