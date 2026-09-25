import React, { useState } from 'react';
import { QualityTestRecord } from '../../../types/erp';
import { INITIAL_QC_RECORDS } from '../../../data/productionData';
import { QualityCoaModal } from './QualityCoaModal';

export const QualityControlSubpage: React.FC = () => {
  const [qcRecords, setQcRecords] = useState<QualityTestRecord[]>(INITIAL_QC_RECORDS);
  const [filterResult, setFilterResult] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedQcForCoa, setSelectedQcForCoa] = useState<QualityTestRecord | null>(null);
  const [isCoaModalOpen, setIsCoaModalOpen] = useState<boolean>(false);
  const [showAddTestModal, setShowAddTestModal] = useState<boolean>(false);

  // New Test Form State
  const [batchNum, setBatchNum] = useState('BCH-501');
  const [prodName, setProdName] = useState('Swatch Rustic Royale 20kg');
  const [viscosity, setViscosity] = useState<number>(110);
  const [sg, setSg] = useState<number>(1.42);
  const [gloss, setGloss] = useState<number>(62.5);
  const [opacity, setOpacity] = useState<number>(98.6);
  const [fineness, setFineness] = useState<number>(24);
  const [ph, setPh] = useState<number>(8.8);
  const [deltaE, setDeltaE] = useState<number>(0.26);
  const [testedBy, setTestedBy] = useState('Anita Rawat (Lead Chemist)');
  const [testResult, setTestResult] = useState<QualityTestRecord['result']>('Passed');
  const [remarks, setRemarks] = useState('Complies with IS 15489:2004 specification.');

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: QualityTestRecord = {
      id: `qc-${Date.now()}`,
      sampleCode: `SMP-2025-${Math.floor(100 + Math.random() * 899)}`,
      batchNumber: batchNum,
      productName: prodName,
      sampleTime: 'Just now',
      testedBy,
      labLocation: 'Plant #01 Central QC Laboratory (Jaipur)',
      viscosityKU: viscosity,
      viscosityTarget: '105 - 115 KU',
      specificGravity: sg,
      sgTarget: '1.40 ± 0.03 g/ml',
      gloss60Deg: gloss,
      glossTarget: '60 - 65° High Sheen',
      finenessMicrons: fineness,
      finenessTarget: '< 30 µm',
      wetOpacityPercent: opacity,
      opacityTarget: '≥ 98.0%',
      phValue: ph,
      phTarget: '8.5 - 9.2',
      deltaEColor: deltaE,
      deltaETarget: 'ΔE ≤ 0.50 (Pass)',
      dryingTimeMin: 30,
      dryingTarget: '30 - 45 min',
      result: testResult,
      coaNumber: `COA-2025-${Math.floor(200 + Math.random() * 800)}`,
      remarks,
      isCoaGenerated: true,
    };
    setQcRecords([newRecord, ...qcRecords]);
    setShowAddTestModal(false);
  };

  const filteredRecords = qcRecords.filter((r) => {
    const matchesFilter = filterResult === 'All' || r.result === filterResult;
    const matchesSearch =
      r.sampleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.testedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalTested = qcRecords.length;
  const passedCount = qcRecords.filter((r) => r.result === 'Passed').length;
  const passRate = Math.round((passedCount / (totalTested || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* 4 QC KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Batches Tested Today
            </span>
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-flask-vial" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">{totalTested}</p>
          <span className="text-[10px] text-slate-500 font-semibold">100% of finished batches sampled</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              First-Pass Acceptance
            </span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-circle-check" />
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">{passRate}%</p>
          <span className="text-[10px] text-emerald-700 font-semibold">
            Zero customer complaints on paint sheen
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Under Re-Tinting / Lab Hold
            </span>
            <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-paint-roller" />
            </span>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2 font-mono">1 Batch</p>
          <span className="text-[10px] text-amber-700 font-semibold">
            BCH-506 adding 120g Phthalo tint
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Average Lab Turnaround
            </span>
            <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-clock-rotate-left" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">28 Mins</p>
          <span className="text-[10px] text-slate-500 font-semibold">
            Rapid viscosity &amp; ΔE spectrophotometer
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Passed', 'Re-tinting Required', 'Quarantined'].map((res) => (
            <button
              key={res}
              onClick={() => setFilterResult(res)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                filterResult === res
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {res}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search sample, batch, chemist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 font-medium"
            />
          </div>
          <button
            onClick={() => setShowAddTestModal(true)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Log Test Sample</span>
          </button>
        </div>
      </div>

      {/* QC Test Register Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Paint Physicochemical Quality Test Register
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Conforming to IS:15489 &amp; ISO 9001:2015 laboratory audit standards
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Jaipur Central QC Unit</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Sample ID</th>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Product Formulation</th>
                <th className="py-3 px-4 text-right">Viscosity (KU)</th>
                <th className="py-3 px-4 text-right">Density (g/ml)</th>
                <th className="py-3 px-4 text-right">Gloss @ 60°</th>
                <th className="py-3 px-4 text-right">Opacity</th>
                <th className="py-3 px-4 text-right">Fineness</th>
                <th className="py-3 px-4 text-right">Delta E (ΔE)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">COA Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{r.sampleCode}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{r.batchNumber}</td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block font-semibold">{r.productName}</strong>
                    <span className="text-[10px] text-slate-400">Tested by: {r.testedBy.split('(')[0]}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800 tabular-nums">
                    {r.viscosityKU} KU
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-700 tabular-nums">
                    {r.specificGravity}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-700 tabular-nums">
                    {r.gloss60Deg}°
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-700 tabular-nums">
                    {r.wetOpacityPercent}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-700 tabular-nums">
                    {r.finenessMicrons} µm
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`font-mono font-bold text-xs ${
                        r.deltaEColor <= 0.5 ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {r.deltaEColor}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.result === 'Passed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : r.result === 'Re-tinting Required'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {r.result}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedQcForCoa(r);
                        setIsCoaModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ml-auto shadow-2xs"
                    >
                      <i className="fa-solid fa-file-certificate text-blue-600 text-[11px]" />
                      <span>COA</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add QC Test Modal */}
      {showAddTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowAddTestModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-flask-round-potion" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Log Laboratory Test Sample</h3>
                  <p className="text-xs text-slate-500">Record measured physical &amp; optical parameters.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddTestModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Batch Number</label>
                  <input
                    type="text"
                    value={batchNum}
                    onChange={(e) => setBatchNum(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Product Name</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Viscosity (KU)</label>
                  <input
                    type="number"
                    value={viscosity}
                    onChange={(e) => setViscosity(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Density (g/ml)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={sg}
                    onChange={(e) => setSg(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Gloss @ 60°</label>
                  <input
                    type="number"
                    step="0.1"
                    value={gloss}
                    onChange={(e) => setGloss(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Fineness (µm)</label>
                  <input
                    type="number"
                    value={fineness}
                    onChange={(e) => setFineness(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Opacity (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Delta E (ΔE)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={deltaE}
                    onChange={(e) => setDeltaE(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Chemist / Tester</label>
                  <input
                    type="text"
                    value={testedBy}
                    onChange={(e) => setTestedBy(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">QC Verdict</label>
                  <select
                    value={testResult}
                    onChange={(e) => setTestResult(e.target.value as QualityTestRecord['result'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="Passed">Passed</option>
                    <option value="Re-tinting Required">Re-tinting Required</option>
                    <option value="Quarantined">Quarantined</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Lab Remarks</label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTestModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Save &amp; Issue COA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COA Certificate Modal */}
      <QualityCoaModal
        testRecord={selectedQcForCoa}
        isOpen={isCoaModalOpen}
        onClose={() => setIsCoaModalOpen(false)}
      />
    </div>
  );
};
