import React, { useState } from 'react';
import { MachineryLine } from '../../../types/erp';
import { INITIAL_MACHINERY_LINES } from '../../../data/productionData';

export const PlantMachinerySubpage: React.FC = () => {
  const [machines, setMachines] = useState<MachineryLine[]>(INITIAL_MACHINERY_LINES);
  const [filterType, setFilterType] = useState<string>('All');

  const toggleMachineStatus = (id: string) => {
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus = m.status === 'Running' ? 'Idle' : 'Running';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  const filteredMachines = machines.filter(
    (m) => filterType === 'All' || m.unitType === filterType || m.status === filterType
  );

  const avgOEE = Math.round(machines.reduce((acc, m) => acc + m.oeePercent, 0) / machines.length);
  const runningCount = machines.filter((m) => m.status === 'Running').length;
  const totalPowerKw = machines
    .filter((m) => m.status === 'Running')
    .reduce((acc, m) => acc + (m.powerConsumptionKw || 0), 0)
    .toFixed(1);

  return (
    <div className="space-y-6">
      {/* 4 OEE & Plant Equipment Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Plant Average OEE
            </span>
            <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-gauge-high" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">{avgOEE}%</p>
          <span className="text-[10px] text-emerald-600 font-semibold">
            World-class benchmark target is &gt; 85%
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Online Machinery
            </span>
            <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-gears" />
            </span>
          </div>
          <p className="text-2xl font-black text-blue-700 mt-2 font-mono">
            {runningCount} / {machines.length} Units
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">
            1 unit in Standby Tinting Calibration
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Live Connected Power
            </span>
            <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-bolt" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">{totalPowerKw} kW</p>
          <span className="text-[10px] text-slate-500 font-semibold">
            Factory 415V 3-Phase substation draw
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Preventive Maintenance
            </span>
            <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-wrench" />
            </span>
          </div>
          <p className="text-2xl font-black text-purple-700 mt-2 font-mono">1 Overdue</p>
          <span className="text-[10px] text-rose-600 font-semibold">
            Bead Mill seal inspection due
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Running', 'Idle', 'Dispersion Tank', 'Bead Mill', 'Automated Filling Line'].map(
            (ft) => (
              <button
                key={ft}
                onClick={() => setFilterType(ft)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                  filterType === ft
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {ft}
              </button>
            )
          )}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Jaipur Plant Floor SCADA / PLC Telemetry
        </span>
      </div>

      {/* Machinery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMachines.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  {m.machineCode}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    m.status === 'Running'
                      ? 'bg-emerald-100 text-emerald-800'
                      : m.status === 'Idle'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      m.status === 'Running'
                        ? 'bg-emerald-600 animate-pulse'
                        : 'bg-amber-600'
                    }`}
                  />
                  {m.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm mt-2">{m.name}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{m.location}</p>

              {/* Current Batch Tag */}
              {m.currentBatch && (
                <div className="mt-3 p-2.5 bg-blue-50/70 border border-blue-200/70 rounded-xl text-[11px]">
                  <span className="text-[9px] uppercase font-bold text-blue-800 block">
                    Active Production Batch
                  </span>
                  <strong className="text-blue-900 font-bold block truncate">
                    {m.currentBatch}
                  </strong>
                </div>
              )}
            </div>

            {/* OEE Triad breakdown */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Overall Equipment OEE</span>
                <span className="font-mono font-black text-slate-900 text-sm">{m.oeePercent}%</span>
              </div>

              <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-200 text-center text-[10px]">
                <div>
                  <span className="text-slate-400 block font-semibold">Availability</span>
                  <strong className="text-slate-800 font-mono font-bold">
                    {m.availabilityPercent}%
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Performance</span>
                  <strong className="text-slate-800 font-mono font-bold">
                    {m.performancePercent}%
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Quality</span>
                  <strong className="text-slate-800 font-mono font-bold">
                    {m.qualityPercent}%
                  </strong>
                </div>
              </div>
            </div>

            {/* Sensors telemetry */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Speed / RPM</span>
                <span className="font-mono font-bold text-slate-800">
                  {m.motorRpm ? `${m.motorRpm} RPM` : 'Standby'}
                </span>
              </div>
              <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Temperature</span>
                <span className="font-mono font-bold text-slate-800">
                  {m.temperatureC ? `${m.temperatureC} °C` : 'Ambient'}
                </span>
              </div>
              <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Power Draw</span>
                <span className="font-mono font-bold text-slate-800">
                  {m.powerConsumptionKw} kW
                </span>
              </div>
              <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-100">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Run Hours</span>
                <span className="font-mono font-bold text-slate-800">
                  {m.totalRunHours.toLocaleString()} hrs
                </span>
              </div>
            </div>

            {/* Bottom Actions and Maintenance status */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-[10px] text-slate-500">
                <span>Next Service: </span>
                <strong className={m.nextServiceDueDate.includes('Overdue') ? 'text-rose-600' : 'text-slate-700'}>
                  {m.nextServiceDueDate}
                </strong>
              </div>

              <button
                onClick={() => toggleMachineStatus(m.id)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                  m.status === 'Running'
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                }`}
              >
                {m.status === 'Running' ? 'Pause Line' : 'Start Motor'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
