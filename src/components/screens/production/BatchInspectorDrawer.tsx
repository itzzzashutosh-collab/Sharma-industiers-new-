import React, { useState } from 'react';
import { ProductionBatch } from '../../../types/erp';

interface BatchInspectorDrawerProps {
  batch: ProductionBatch | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (batchId: string, status: ProductionBatch['status']) => void;
  onUpdateProgress?: (batchId: string, produced: number) => void;
}

export const BatchInspectorDrawer: React.FC<BatchInspectorDrawerProps> = ({
  batch,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Stages' | 'Parameters' | 'QC Tests' | 'Logs'>('Overview');
  const [adjustProduced, setAdjustProduced] = useState<number>(batch?.producedBags || 0);

  if (!isOpen || !batch) return null;

  const progressPercent = Math.min(100, Math.round((batch.producedBags / (batch.targetBags || 1)) * 100));

  const stagesList = [
    { name: 'Premixing & Charging', desc: 'Water charging, biocide & cellulose thickener swelling', status: 'Completed', time: '07:30 AM' },
    { name: 'High-Shear Grinding', desc: 'Cowles 1,450 RPM dispersion & Hegman fineness < 25µm', status: batch.status === 'Scheduled' ? 'Pending' : 'Completed', time: '08:45 AM' },
    { name: 'Thinning & Tinting', desc: 'Acrylic binder let-down & machine tint color matching', status: batch.status === 'In Progress' ? 'In Progress' : batch.status === 'Scheduled' ? 'Pending' : 'Completed', time: '10:15 AM' },
    { name: 'QC Testing', desc: 'Viscosity (KU), specific gravity & spectrophotometer Delta E', status: batch.status === 'Quality Check' ? 'In Progress' : batch.status === 'Completed' ? 'Completed' : 'Pending', time: '11:45 AM' },
    { name: 'Automated Packaging', desc: 'Auger valve filling, robotic weight check & inkjet stamping', status: batch.status === 'Completed' ? 'Completed' : 'In Progress', time: '01:00 PM' },
    { name: 'Palletized & Wrapped', desc: 'Shrink-wrapped on wooden pallets & moved to FG warehouse', status: batch.status === 'Completed' ? 'Completed' : 'Pending', time: '03:30 PM' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col z-10 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-base font-bold shadow-xs">
                <i className="fa-solid fa-industry" />
              </span>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-black px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                    {batch.batchNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      batch.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : batch.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : batch.status === 'Quality Check'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {batch.status}
                  </span>
                  {batch.priority && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        batch.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-700'
                          : batch.priority === 'High'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {batch.priority} Priority
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-black text-slate-900 mt-0.5">{batch.productName}</h3>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                title="Print Manufacturing Batch Ticket"
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg border border-slate-200 text-xs transition"
              >
                <i className="fa-solid fa-print mr-1" />
                <span className="hidden sm:inline font-semibold">Batch Sheet</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 px-5 bg-white space-x-6 text-xs font-bold text-slate-500 overflow-x-auto">
            {(['Overview', 'Stages', 'Parameters', 'QC Tests', 'Logs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700">
            {activeTab === 'Overview' && (
              <>
                {/* Progress bar card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">
                      Yield Completion Progress
                    </span>
                    <span className="font-mono font-black text-blue-700">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>
                      Manufactured:{' '}
                      <strong className="text-slate-900 font-mono font-bold">
                        {batch.producedBags}
                      </strong>{' '}
                      units
                    </span>
                    <span>
                      Target:{' '}
                      <strong className="text-slate-900 font-mono font-bold">
                        {batch.targetBags}
                      </strong>{' '}
                      units
                    </span>
                  </div>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Production Line / Unit
                    </span>
                    <span className="font-bold text-slate-800 text-xs mt-0.5 block flex items-center gap-1.5">
                      <i className="fa-solid fa-conveyor-belt text-blue-500 text-[11px]" />
                      {batch.line}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Assigned Supervisor
                    </span>
                    <span className="font-bold text-slate-800 text-xs mt-0.5 block flex items-center gap-1.5">
                      <i className="fa-solid fa-user-gear text-emerald-500 text-[11px]" />
                      {batch.operator}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Mixing Vessel / Tank
                    </span>
                    <span className="font-mono font-bold text-slate-800 text-xs mt-0.5 block">
                      {batch.tankId || 'TK-01 (Dispersion Unit)'}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      BOM Master Recipe
                    </span>
                    <span className="font-mono font-bold text-blue-600 text-xs mt-0.5 block">
                      {batch.recipeCode || 'REC-TEX-02'}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Start Time
                    </span>
                    <span className="font-medium text-slate-700 text-xs mt-0.5 block">
                      {batch.startTime}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Target Completion
                    </span>
                    <span className="font-medium text-slate-700 text-xs mt-0.5 block">
                      {batch.targetDate || 'Today, 05:00 PM'}
                    </span>
                  </div>
                </div>

                {/* Quality & Defect telemetry */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">
                      Quality Pass Benchmark
                    </span>
                    <p className="text-base font-black text-emerald-900 mt-0.5">
                      {batch.qualityPassRate}% Pass Rate
                    </p>
                    <span className="text-[10px] text-emerald-700 font-medium">
                      Viscosity &amp; dry film opacity verified in QC Lab #1
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Defects
                    </span>
                    <span className="text-base font-black text-slate-800 font-mono">
                      {batch.defectCount}
                    </span>
                  </div>
                </div>

                {/* Operator notes */}
                {batch.notes && (
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900 text-xs">
                    <strong className="font-bold flex items-center gap-1.5 mb-1 text-[11px]">
                      <i className="fa-solid fa-note-sticky text-amber-600" /> Plant Supervisor Notes:
                    </strong>
                    <p className="text-slate-700 font-medium leading-relaxed">{batch.notes}</p>
                  </div>
                )}

                {/* Live Controls */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs">Floor Supervisor Quick Actions</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onUpdateStatus(batch.id, 'In Progress')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        batch.status === 'In Progress'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Set In Progress
                    </button>
                    <button
                      onClick={() => onUpdateStatus(batch.id, 'Quality Check')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        batch.status === 'Quality Check'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Send to QC Lab
                    </button>
                    <button
                      onClick={() => {
                        onUpdateStatus(batch.id, 'Completed');
                        if (onUpdateProgress) onUpdateProgress(batch.id, batch.targetBags);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        batch.status === 'Completed'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Mark Completed (100%)
                    </button>
                  </div>

                  {onUpdateProgress && (
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-medium text-slate-600">
                        Quick produced count:
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={adjustProduced}
                          onChange={(e) => setAdjustProduced(parseInt(e.target.value) || 0)}
                          className="w-24 px-2.5 py-1 text-xs border border-slate-200 rounded-lg text-right font-mono font-bold"
                        />
                        <button
                          onClick={() => onUpdateProgress(batch.id, adjustProduced)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'Stages' && (
              <div className="space-y-4">
                <div className="border-l-2 border-blue-200 pl-4 space-y-5 ml-2">
                  {stagesList.map((stg, i) => (
                    <div key={i} className="relative">
                      <span
                        className={`absolute -left-[23px] top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold ${
                          stg.status === 'Completed'
                            ? 'bg-emerald-500 text-white'
                            : stg.status === 'In Progress'
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-slate-300 text-slate-600'
                        }`}
                      >
                        {stg.status === 'Completed' ? '✓' : i + 1}
                      </span>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-xs">{stg.name}</h4>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                              stg.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : stg.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {stg.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{stg.desc}</p>
                        <span className="text-[10px] text-slate-400 font-mono mt-1.5 block">
                          Timestamp: {stg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Parameters' && (
              <div className="space-y-3">
                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Specific Gravity Target</span>
                  <span className="font-mono font-bold text-slate-900">{batch.density || '1.42 g/ml'}</span>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Viscosity (Krebs Units)</span>
                  <span className="font-mono font-bold text-slate-900">{batch.viscosity || '115 KU'}</span>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Cowles Mixing Speed</span>
                  <span className="font-mono font-bold text-slate-900">1,450 RPM (Dispersing) / 350 RPM (Thinning)</span>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Slurry Temp Limit</span>
                  <span className="font-mono font-bold text-emerald-700">Max 48°C (Prevent resin coagulation)</span>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-700">Grind Fineness Hegman Target</span>
                  <span className="font-mono font-bold text-slate-900">&lt; 30 µm (Hegman 6.5)</span>
                </div>
              </div>
            )}

            {activeTab === 'QC Tests' && (
              <div className="space-y-3">
                <div className="p-4 border border-emerald-200 bg-emerald-50/50 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-900 text-xs">QC-TEST-2025-081</span>
                    <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold">
                      Passed
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Tested by Anita Rawat (Lead Chemist). Contrast Ratio 98.7%, Specular Gloss 62.4°, Delta E 0.28.
                  </p>
                  <div className="pt-2 flex justify-between items-center border-t border-emerald-200/80 text-[10px] text-slate-500">
                    <span>COA Certificate: #COA-2025-081</span>
                    <span className="font-bold text-blue-600 cursor-pointer hover:underline">
                      View Certificate
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Logs' && (
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-mono text-slate-400 block text-[10px]">10:00 AM - Batch created</span>
                  <span className="font-medium text-slate-700">
                    Supervisor Suresh Verma loaded 500 bags order into Line 1.
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-mono text-slate-400 block text-[10px]">10:45 AM - Raw Materials Charged</span>
                  <span className="font-medium text-slate-700">
                    Requisition RMS-2025-104 released from Store Bin EXT-04.
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-mono text-slate-400 block text-[10px]">12:15 PM - QC Sample Picked</span>
                  <span className="font-medium text-slate-700">
                    500ml sample delivered to Central Quality Lab.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-xs transition"
            >
              Close Drawer
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onUpdateStatus(batch.id, 'Completed');
                  if (onUpdateProgress) onUpdateProgress(batch.id, batch.targetBags);
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition shadow-xs flex items-center gap-1.5"
              >
                <i className="fa-solid fa-check text-[10px]" />
                <span>Complete Batch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
