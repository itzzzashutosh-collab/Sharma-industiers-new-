import React, { useState } from 'react';
import { SalesTargetRep } from '../../../types/erp';
import { INITIAL_SALES_TARGETS } from '../../../data/salesSubpagesData';

interface SalesTargetsSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const SalesTargetsSubpage: React.FC<SalesTargetsSubpageProps> = ({
  onNavigateSubpage,
}) => {
  const [reps, setReps] = useState<SalesTargetRep[]>(INITIAL_SALES_TARGETS);
  const [selectedRep, setSelectedRep] = useState<SalesTargetRep | null>(null);
  const [isAdjustTargetsOpen, setIsAdjustTargetsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Computations
  const totalTargetAmount = reps.reduce((acc, r) => acc + r.targetAmount, 0);
  const totalAchievedAmount = reps.reduce((acc, r) => acc + r.achievedAmount, 0);
  const overallPercentage = ((totalAchievedAmount / totalTargetAmount) * 100).toFixed(1);

  const totalTargetBags = reps.reduce((acc, r) => acc + r.targetBags, 0);
  const totalSoldBags = reps.reduce((acc, r) => acc + r.soldBags, 0);
  const totalIncentives = reps.reduce((acc, r) => acc + r.incentiveEarned, 0);

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Commercial Quota &amp; KPI Engine
            </span>
            <span className="text-xs text-slate-400">• August 2025 Cycle</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Sales Targets &amp; Quota Achievements
          </h2>
          <p className="text-xs text-slate-500">
            Monitor revenue run-rate, bag volume quotas by territory, dealer penetration &amp; team sales incentive calculations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateSubpage('Order Management')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Orders List</span>
          </button>
          <button
            onClick={() => onNavigateSubpage('Sales Team')}
            className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200/60 transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-users text-xs" />
            <span>Sales Force Directory</span>
          </button>
          <button
            onClick={() => setIsAdjustTargetsOpen(true)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-sliders text-xs" />
            <span>Adjust Monthly Targets</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-trophy text-emerald-600 text-sm" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-500 hover:text-emerald-700">
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </div>
      )}

      {/* Top Banner KPI Progress Box */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-5 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
              Swatch Paints Combined Rajasthan Quota
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-black text-white">
                ₹ {(totalAchievedAmount / 100000).toFixed(2)}L
              </span>
              <span className="text-sm font-semibold text-slate-300">
                / ₹ {(totalTargetAmount / 100000).toFixed(2)}L Target
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 block font-semibold">Volume Achieved</span>
              <span className="text-lg font-black text-white">{totalSoldBags.toLocaleString()} Bags</span>
              <span className="text-[10px] text-slate-400">of {totalTargetBags.toLocaleString()}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 block font-semibold">Incentive Pool</span>
              <span className="text-lg font-black text-emerald-400">₹ {totalIncentives.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-400">Earned so far</span>
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-300">Quota Fulfillment: {overallPercentage}%</span>
            <span className="text-emerald-400">₹ {((totalTargetAmount - totalAchievedAmount) / 100000).toFixed(2)}L gap • 6 days left</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, parseFloat(overallPercentage))}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 Regional Territory Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Territory 1: Hadoti */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                Zone #1
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-1">Hadoti Region</h3>
              <p className="text-[11px] text-slate-500">Kota, Bundi, Baran, Jhalawar</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              98%
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Target:</span>
              <span className="font-bold text-slate-800">₹ 18.00 Lakhs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Achieved:</span>
              <span className="font-extrabold text-emerald-600">₹ 17.70 Lakhs</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '98%' }} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
            <span>Lead: Ramesh Meena</span>
            <span className="font-bold text-emerald-600">On Track</span>
          </div>
        </div>

        {/* Territory 2: Mewar */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                Zone #2
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-1">Mewar Region</h3>
              <p className="text-[11px] text-slate-500">Udaipur, Chittorgarh, Rajsamand</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
              91%
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Target:</span>
              <span className="font-bold text-slate-800">₹ 12.00 Lakhs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Achieved:</span>
              <span className="font-extrabold text-indigo-600">₹ 10.90 Lakhs</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '91%' }} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
            <span>Lead: Amit Verma</span>
            <span className="font-bold text-indigo-600">On Track</span>
          </div>
        </div>

        {/* Territory 3: Dhundhar */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase">
                Zone #3
              </span>
              <h3 className="font-extrabold text-sm text-slate-900 mt-1">Dhundhar Region</h3>
              <p className="text-[11px] text-slate-500">Jaipur Urban &amp; Infra Projects</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              77%
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Target:</span>
              <span className="font-bold text-slate-800">₹ 15.00 Lakhs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Achieved:</span>
              <span className="font-extrabold text-amber-600">₹ 11.60 Lakhs</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '77%' }} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
            <span>Lead: Neha Gupta</span>
            <span className="font-bold text-amber-600">Sprint Needed</span>
          </div>
        </div>
      </div>

      {/* Sales Representative Leaderboard Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">
          Sales Representative Quota Leaderboard
        </h3>

        <div className="space-y-3">
          {reps.map((rep, idx) => {
            const pct = Math.round((rep.achievedAmount / rep.targetAmount) * 100);
            const isExceeded = pct >= 100;

            return (
              <div
                key={rep.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:border-slate-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Rep profile */}
                  <div className="flex items-center space-x-3.5">
                    <div className="relative">
                      <img
                        src={rep.avatar}
                        alt={rep.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                      />
                      {isExceeded && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 rounded-full text-[10px] flex items-center justify-center shadow-xs">
                          👑
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{rep.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                          {rep.designation}
                        </span>
                        {isExceeded && (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                            Target Exceeded!
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{rep.territory}</p>
                    </div>
                  </div>

                  {/* Middle: Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-xs text-center sm:text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Revenue Achieved</span>
                      <span className="font-black text-slate-900 text-sm">
                        ₹ {(rep.achievedAmount / 1000).toFixed(0)}k
                      </span>
                      <span className="text-[10px] text-slate-400 block">/ ₹ {(rep.targetAmount / 1000).toFixed(0)}k</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Bags Sold</span>
                      <span className="font-extrabold text-blue-600 text-sm">{rep.soldBags}</span>
                      <span className="text-[10px] text-slate-400 block">Target: {rep.targetBags}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Incentive Earned</span>
                      <span className="font-black text-emerald-600 text-sm">
                        ₹ {rep.incentiveEarned.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Dealers: {rep.dealersCovered}</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600">Fulfillment: {pct}%</span>
                    <span className={isExceeded ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
                      {isExceeded ? `+₹ ${((rep.achievedAmount - rep.targetAmount) / 1000).toFixed(0)}k above quota` : `₹ ${((rep.targetAmount - rep.achievedAmount) / 1000).toFixed(0)}k remaining`}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isExceeded ? 'bg-emerald-500' : pct >= 85 ? 'bg-blue-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Adjust Targets Modal */}
      {isAdjustTargetsOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">
                Adjust Sales Quotas &amp; Incentive Schemes
              </h3>
              <button
                onClick={() => setIsAdjustTargetsOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Set monthly revenue quotas and commission rates for September 2025:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span>Base Incentive Rate:</span>
                <span className="font-bold text-slate-800">3.0% of Net Revenue</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Exceeding Quota Bonus:</span>
                <span className="font-bold text-emerald-600">+1.5% on Surplus Revenue</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Minimum Bag Threshold:</span>
                <span className="font-bold text-slate-800">1,200 Bags / Rep</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsAdjustTargetsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setToastMessage('New quotas and incentive tier successfully saved!');
                  setIsAdjustTargetsOpen(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                Save Quotas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
