import React, { useState } from 'react';
import { ProductionBatch } from '../../../types/erp';
import { BatchInspectorDrawer } from './BatchInspectorDrawer';

interface BatchScheduleSubpageProps {
  batches: ProductionBatch[];
  onAddBatch: (batch: ProductionBatch) => void;
  onUpdateBatchStatus: (batchId: string, status: ProductionBatch['status']) => void;
  onUpdateBatchProgress?: (batchId: string, produced: number) => void;
}

export const BatchScheduleSubpage: React.FC<BatchScheduleSubpageProps> = ({
  batches,
  onAddBatch,
  onUpdateBatchStatus,
  onUpdateBatchProgress,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<ProductionBatch | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState<boolean>(false);

  // New Batch Form State
  const [newProductName, setNewProductName] = useState('Swatch Rustic Royale 20kg');
  const [newTargetBags, setNewTargetBags] = useState(500);
  const [newLine, setNewLine] = useState('Line 1 (Automatic Packing)');
  const [newOperator, setNewOperator] = useState('Suresh Verma');
  const [newPriority, setNewPriority] = useState<'Normal' | 'High' | 'Urgent'>('Normal');
  const [newTank, setNewTank] = useState('TK-01 (Dispersion Unit A)');
  const [newNotes, setNewNotes] = useState('');

  const handleLaunchBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: ProductionBatch = {
      id: `bch-${Date.now()}`,
      batchNumber: `BCH-${Math.floor(510 + Math.random() * 80)}`,
      productName: newProductName,
      targetBags: newTargetBags,
      producedBags: 0,
      status: 'Scheduled',
      line: newLine,
      operator: newOperator,
      startTime: 'Just scheduled',
      defectCount: 0,
      qualityPassRate: 100,
      stage: 'Premixing & Charging',
      progressPercent: 0,
      priority: newPriority,
      tankId: newTank,
      targetDate: 'Tomorrow, 04:00 PM',
      notes: newNotes || 'Scheduled on factory manufacturing line.',
    };
    onAddBatch(newBatch);
    setShowAddBatchModal(false);
  };

  const filteredBatches = batches.filter((b) => {
    const matchesFilter = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch =
      b.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.line.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalTarget = batches.reduce((sum, b) => sum + b.targetBags, 0);
  const totalProduced = batches.reduce((sum, b) => sum + b.producedBags, 0);
  const activeBatchesCount = batches.filter((b) => b.status === 'In Progress' || b.status === 'Quality Check').length;

  return (
    <div className="space-y-6">
      {/* 4 Daily KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-blue-600"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${Math.round((totalProduced / (totalTarget || 1)) * 100)}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute font-black text-slate-900 text-xs">
              {Math.round((totalProduced / (totalTarget || 1)) * 100)}%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Shift Production Output
            </span>
            <h3 className="text-base font-black text-slate-900 font-mono">
              {totalProduced.toLocaleString()} / {totalTarget.toLocaleString()}
            </h3>
            <span className="text-[10px] text-emerald-600 font-semibold">Bags &amp; Buckets Produced</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Active Plant Batches
            </span>
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-industry" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">{activeBatchesCount}</p>
          <span className="text-[10px] text-blue-600 font-semibold">
            All 4 factory lines operating at nominal RPM
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Zero Defect Standard
            </span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-shield-halved" />
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">0 Defects</p>
          <span className="text-[10px] text-slate-400 font-semibold">
            Zero batch recalls this week
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              QC Pass Rate
            </span>
            <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-flask-round-potion" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">98.9%</p>
          <span className="text-[10px] text-teal-600 font-semibold">
            Viscosity &amp; ΔE within IS standards
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'In Progress', 'Quality Check', 'Scheduled', 'Completed'].map((st) => (
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

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search batch #, formulation, operator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 font-medium"
            />
          </div>
          <button
            onClick={() => setShowAddBatchModal(true)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Launch Batch</span>
          </button>
        </div>
      </div>

      {/* Batches Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Live Production Work Orders &amp; Batches
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Showing {filteredBatches.length} batch runs on factory floor
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Plant #01 Jaipur · Central Production Cell
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Product Formulation</th>
                <th className="py-3 px-4">Unit / Line</th>
                <th className="py-3 px-4">Supervisor</th>
                <th className="py-3 px-4 text-center">Current Stage</th>
                <th className="py-3 px-4 text-right">Target</th>
                <th className="py-3 px-4 text-right">Produced</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredBatches.map((b) => {
                const batchPct = Math.min(100, Math.round((b.producedBags / (b.targetBags || 1)) * 100));
                return (
                  <tr
                    key={b.id}
                    onClick={() => {
                      setSelectedBatch(b);
                      setIsDrawerOpen(true);
                    }}
                    className="hover:bg-blue-50/40 cursor-pointer transition"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      <div className="flex items-center gap-1.5">
                        <span>{b.batchNumber}</span>
                        {b.priority === 'Urgent' && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Urgent Priority" />
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="text-slate-900 block">{b.productName}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Vessel: {b.tankId || 'TK-01'} · Recipe: {b.recipeCode || 'BOM'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="flex items-center gap-1 text-[11px]">
                        <i className="fa-solid fa-conveyor-belt text-slate-400" />
                        {b.line}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{b.operator}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {b.stage || 'Dispersion & Thinning'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-600">
                      {b.targetBags}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-blue-700 tabular-nums">
                        {b.producedBags}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">({batchPct}%)</span>
                    </td>
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          b.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : b.status === 'Quality Check'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={b.status}
                        onChange={(e) =>
                          onUpdateBatchStatus(b.id, e.target.value as ProductionBatch['status'])
                        }
                        className="text-[10px] bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 font-semibold focus:outline-none hover:bg-slate-100"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Quality Check">Quality Check</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Batch Schedule Modal */}
      {showAddBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowAddBatchModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-industry" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Schedule Factory Batch</h3>
                  <p className="text-xs text-slate-500">
                    Assign recipe, mixing tank, and output target for Jaipur Factory #01.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddBatchModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleLaunchBatch} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 text-slate-600">Product Formulation</label>
                <select
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                >
                  <option value="Swatch Rustic Royale 20kg">Swatch Rustic Royale 20kg (Granular Texture)</option>
                  <option value="Swatch Shine Luxury Emulsion 10L">Swatch Shine Luxury Emulsion 10L (Interior)</option>
                  <option value="Swatch Weatherguard Exterior 20L">Swatch Weatherguard Exterior 20L (Silicone)</option>
                  <option value="Swatch Base Prime 20L">Swatch Base Prime 20L (Deep Sealer)</option>
                  <option value="Swatch Distemper Fine 25kg">Swatch Distemper Fine 25kg (Synthetic White)</option>
                  <option value="Swatch Metallic Lustre Gold 1L">Swatch Metallic Lustre Gold 1L (Specialty)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Target Output (Units)</label>
                  <input
                    type="number"
                    step="50"
                    min="100"
                    value={newTargetBags}
                    onChange={(e) => setNewTargetBags(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Priority Level</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as 'Normal' | 'High' | 'Urgent')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="Normal">Normal Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent / Rush Order</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Production Unit Line</label>
                  <select
                    value={newLine}
                    onChange={(e) => setNewLine(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="Line 1 (Automatic Packing)">Line 1 (Automatic Packing)</option>
                    <option value="Unit 2 (High-Shear Dispersion)">Unit 2 (High-Shear Dispersion)</option>
                    <option value="Tank 3 (Viscosity & Weathering)">Tank 3 (Viscosity &amp; Weathering)</option>
                    <option value="Line 4 (High Precision Can Filler)">Line 4 (High Precision Cans)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Vessel / Tank Allocation</label>
                  <select
                    value={newTank}
                    onChange={(e) => setNewTank(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="TK-01 (Dispersion Unit A)">TK-01 (Dispersion Unit A)</option>
                    <option value="TK-02 (High-Speed Cowles)">TK-02 (High-Speed Cowles)</option>
                    <option value="TK-03 (Bulk Thinning Vat)">TK-03 (Bulk Thinning Vat)</option>
                    <option value="TK-04 (Thinning Tank)">TK-04 (Thinning Tank)</option>
                    <option value="TK-05 (Specialty Pilot Tank)">TK-05 (Specialty Pilot Tank)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Assigned Supervisor</label>
                <input
                  type="text"
                  value={newOperator}
                  onChange={(e) => setNewOperator(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Production Run Notes &amp; Client Reference</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g., Dealer PO dispatch schedule, specific shade tinting request..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBatchModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Schedule &amp; Issue BOM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Batch Inspector Drawer */}
      <BatchInspectorDrawer
        batch={selectedBatch}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateStatus={(id, st) => {
          onUpdateBatchStatus(id, st);
          if (selectedBatch && selectedBatch.id === id) {
            setSelectedBatch({ ...selectedBatch, status: st });
          }
        }}
        onUpdateProgress={(id, prod) => {
          if (onUpdateBatchProgress) onUpdateBatchProgress(id, prod);
          if (selectedBatch && selectedBatch.id === id) {
            setSelectedBatch({ ...selectedBatch, producedBags: prod });
          }
        }}
      />
    </div>
  );
};
