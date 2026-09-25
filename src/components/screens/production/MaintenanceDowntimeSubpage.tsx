import React, { useState } from 'react';
import { MaintenanceDowntimeLog } from '../../../types/erp';
import { INITIAL_DOWNTIME_LOGS } from '../../../data/productionData';

export const MaintenanceDowntimeSubpage: React.FC = () => {
  const [logs, setLogs] = useState<MaintenanceDowntimeLog[]>(INITIAL_DOWNTIME_LOGS);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // New Log Form State
  const [newMachineCode, setNewMachineCode] = useState('MCH-LIN-01');
  const [newMachineName, setNewMachineName] = useState('Line 1 - Automated Packaging Line');
  const [newCategory, setNewCategory] = useState<MaintenanceDowntimeLog['category']>('Screen / Filter Clog');
  const [newSeverity, setNewSeverity] = useState<'Critical' | 'Medium' | 'Low'>('Medium');
  const [newDuration, setNewDuration] = useState<number>(30);
  const [newTechnician, setNewTechnician] = useState('Kailash Sharma (Plant Millwright)');
  const [newRootCause, setNewRootCause] = useState('');
  const [newActionTaken, setNewActionTaken] = useState('');

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: MaintenanceDowntimeLog = {
      id: `dwt-${Date.now()}`,
      logNumber: `DWT-2025-${Math.floor(100 + Math.random() * 899)}`,
      machineCode: newMachineCode,
      machineName: newMachineName,
      category: newCategory,
      severity: newSeverity,
      startTime: 'Just now',
      durationMinutes: newDuration,
      reportedBy: 'Ashutosh Sharma',
      assignedTechnician: newTechnician,
      rootCause: newRootCause || 'Operational stoppage and maintenance request.',
      actionTaken: newActionTaken || 'Inspected and repaired by engineering team.',
      status: 'Resolved',
    };
    setLogs([newEntry, ...logs]);
    setShowLogModal(false);
  };

  const filteredLogs = logs.filter((l) => {
    const matchesCategory = filterCategory === 'All' || l.category === filterCategory || l.status === filterCategory;
    const matchesSearch =
      l.logNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.assignedTechnician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.rootCause.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalDowntimeMin = logs.reduce((acc, l) => acc + l.durationMinutes, 0);
  const resolvedCount = logs.filter((l) => l.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* 4 Plant Maintenance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Total Downtime Duration
            </span>
            <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-clock" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">
            {totalDowntimeMin} Mins
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">
            Plant availability exceeds 96.2%
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Work Orders Resolved
            </span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-circle-check" />
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">
            {resolvedCount} / {logs.length}
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">
            Mean Time To Repair (MTTR): 36 min
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Active Stoppage
            </span>
            <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-triangle-exclamation" />
            </span>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2 font-mono">1 Active</p>
          <span className="text-[10px] text-amber-700 font-semibold">
            Tinting dispenser canister calibration
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Lead Millwright
            </span>
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-user-wrench" />
            </span>
          </div>
          <p className="text-base font-black text-slate-900 mt-2">Kailash Sharma</p>
          <span className="text-[10px] text-slate-500 font-semibold">
            On Floor · Mechanical Maintenance Bay
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            'All',
            'Screen / Filter Clog',
            'Unplanned Breakdown',
            'Preventive Servicing',
            'Color Wash & Flush',
            'In Progress',
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search incidents, machines, technician..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 w-60 font-medium"
            />
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Log Stoppage</span>
          </button>
        </div>
      </div>

      {/* Maintenance Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Plant Equipment Stoppage &amp; Preventive Maintenance Log
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Real-time engineering work orders and component overhaul history
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Jaipur Factory #01</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Log #</th>
                <th className="py-3 px-4">Machine Code &amp; Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Severity</th>
                <th className="py-3 px-4 text-right">Duration</th>
                <th className="py-3 px-4">Technician</th>
                <th className="py-3 px-4">Root Cause &amp; Corrective Action</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{log.logNumber}</td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block font-semibold">{log.machineName}</strong>
                    <span className="text-[10px] font-mono text-slate-400">{log.machineCode}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-[10px] text-slate-700">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : log.severity === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800 tabular-nums">
                    {log.durationMinutes} Mins
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{log.assignedTechnician}</td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-slate-900 font-medium truncate" title={log.rootCause}>
                      {log.rootCause}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate" title={log.actionTaken}>
                      Action: {log.actionTaken}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Downtime Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowLogModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-wrench" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Log Machine Stoppage</h3>
                  <p className="text-xs text-slate-500">Record line incident and dispatch plant technician.</p>
                </div>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleCreateLog} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Equipment Line</label>
                  <select
                    value={newMachineCode}
                    onChange={(e) => {
                      setNewMachineCode(e.target.value);
                      if (e.target.value === 'MCH-LIN-01') setNewMachineName('Line 1 - Automated Packaging Line');
                      if (e.target.value === 'MCH-DISP-02') setNewMachineName('Unit 2 - Cowles Disperser 75HP');
                      if (e.target.value === 'MCH-MILL-01') setNewMachineName('Horizontal Dyno Bead Mill 30L');
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="MCH-LIN-01">Line 1 - Automated Packaging</option>
                    <option value="MCH-DISP-02">Unit 2 - Cowles Disperser (75 HP)</option>
                    <option value="MCH-MILL-01">Horizontal Dyno Bead Mill (30L)</option>
                    <option value="MCH-TANK-03">Tank 3 - Thinning Vat (10,000L)</option>
                    <option value="MCH-TINT-04">Automated Color Dispenser</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MaintenanceDowntimeLog['category'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="Screen / Filter Clog">Screen / Filter Clog</option>
                    <option value="Unplanned Breakdown">Unplanned Breakdown</option>
                    <option value="Preventive Servicing">Preventive Servicing</option>
                    <option value="Color Wash & Flush">Color Wash &amp; Flush</option>
                    <option value="Sensor Calibration">Sensor Calibration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Stoppage Duration (Minutes)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as 'Critical' | 'Medium' | 'Low')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="Low">Low (Minor adjustment)</option>
                    <option value="Medium">Medium (Line slowed)</option>
                    <option value="Critical">Critical (Total line halt)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Assigned Technician</label>
                <input
                  type="text"
                  value={newTechnician}
                  onChange={(e) => setNewTechnician(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Observed Symptom / Root Cause</label>
                <textarea
                  rows={2}
                  value={newRootCause}
                  onChange={(e) => setNewRootCause(e.target.value)}
                  placeholder="e.g. Slurry pressure surge, pump packing gland weepage..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs"
                >
                  Submit Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
