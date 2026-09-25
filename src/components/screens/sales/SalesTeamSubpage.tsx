import React, { useState } from 'react';
import { SalesFieldVisit, SalesTargetRep } from '../../../types/erp';
import { INITIAL_SALES_TARGETS, INITIAL_FIELD_VISITS } from '../../../data/salesSubpagesData';

interface SalesTeamSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const SalesTeamSubpage: React.FC<SalesTeamSubpageProps> = ({
  onNavigateSubpage,
}) => {
  const [reps] = useState<SalesTargetRep[]>(INITIAL_SALES_TARGETS);
  const [fieldVisits, setFieldVisits] = useState<SalesFieldVisit[]>(INITIAL_FIELD_VISITS);
  const [isLogVisitOpen, setIsLogVisitOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New visit log form
  const [repName, setRepName] = useState('Ramesh Meena');
  const [dealerName, setDealerName] = useState('Hadoti Hardware Store');
  const [location, setLocation] = useState('Bundi Rural');
  const [purpose, setPurpose] = useState<SalesFieldVisit['purpose']>('Order Booking');
  const [outcome, setOutcome] = useState('Discussed stocking Swatch Acrylic Wall Putty. Dealer took 80 bags trial.');
  const [bagsBooked, setBagsBooked] = useState(80);
  const [amountCollected, setAmountCollected] = useState(0);

  const handleCreateVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisit: SalesFieldVisit = {
      id: `vst-${Date.now()}`,
      salesperson: repName,
      dealerName,
      location,
      time: 'Just now',
      purpose,
      outcome,
      bagsBooked: bagsBooked > 0 ? bagsBooked : undefined,
      amountCollected: amountCollected > 0 ? amountCollected : undefined,
    };

    setFieldVisits([newVisit, ...fieldVisits]);
    setIsLogVisitOpen(false);
    setToastMessage(`Field visit logged for ${repName} at ${dealerName}.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
              Field Force Management
            </span>
            <span className="text-xs text-slate-400">• Rajasthan Sales Operations</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Sales Team &amp; Territory Operations
          </h2>
          <p className="text-xs text-slate-500">
            Field representatives, territory assignments, active dealer coverage &amp; daily field call / visit logs.
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
            onClick={() => onNavigateSubpage('Sales Targets')}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200/60 transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-trophy text-xs" />
            <span>Sales Quotas</span>
          </button>
          <button
            onClick={() => setIsLogVisitOpen(true)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Log Dealer Visit</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-circle-check text-blue-600 text-sm" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-blue-500 hover:text-blue-700">
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </div>
      )}

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Active Field Officers</span>
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-user-tie" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">5 Reps</span>
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              100% In Field
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Managed Dealers</span>
            <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-store" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-indigo-600">48 Stores</span>
            <span className="text-[11px] text-slate-400">Rajasthan Key Hubs</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Visits Logged Today</span>
            <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-clipboard-list" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-600">24 Visits</span>
            <span className="text-[11px] text-amber-600 font-semibold">Active Beats</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Conversion Rate</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-chart-line" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">78.4%</span>
            <span className="text-[11px] text-slate-400">Orders/Visit</span>
          </div>
        </div>
      </div>

      {/* Field Reps Grid Cards */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-900 mb-3">
          Field Sales Representatives &amp; Territory Officers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {reps.map((rep) => (
            <div
              key={rep.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:border-slate-300 transition space-y-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={rep.avatar}
                  alt={rep.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-sm text-slate-900 truncate">{rep.name}</h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active in Field"></span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 block">{rep.designation}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{rep.territory}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Dealers Assigned</span>
                  <span className="font-bold text-slate-800">{rep.dealersCovered} Accounts</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Quota Sold</span>
                  <span className="font-bold text-emerald-600">{rep.soldBags} Bags</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-[11px]">
                  <i className="fa-solid fa-phone text-slate-400 text-[10px]" />
                  <span>+91 98290 XXXXX</span>
                </span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Status: In Field
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Field Visits & Call Logs Stream */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Live Dealer Visit &amp; Daily Beat Logs
            </h3>
            <p className="text-xs text-slate-500">
              Field visits, cheque collections, and order bookings submitted by sales reps today.
            </p>
          </div>
          <button
            onClick={() => setIsLogVisitOpen(true)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            + Log New Visit
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Sales Officer</th>
                <th className="py-3 px-3">Dealer / Store</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Purpose</th>
                <th className="py-3 px-3">Visit Outcome &amp; Remarks</th>
                <th className="py-3 px-3 text-right">Value / Bags</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fieldVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">{visit.salesperson}</td>
                  <td className="py-3 px-3 font-semibold text-blue-600">{visit.dealerName}</td>
                  <td className="py-3 px-3 text-slate-500">{visit.location}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {visit.purpose}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs">{visit.outcome}</td>
                  <td className="py-3 px-3 text-right">
                    {visit.bagsBooked && (
                      <span className="font-bold text-slate-900 block">{visit.bagsBooked} Bags</span>
                    )}
                    {visit.amountCollected && (
                      <span className="text-[10px] font-extrabold text-emerald-600 block">
                        ₹ {visit.amountCollected.toLocaleString('en-IN')}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400 whitespace-nowrap">{visit.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Visit Modal */}
      {isLogVisitOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateVisit}
            className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">
                Log Dealer Field Visit / Beat Call
              </h3>
              <button
                type="button"
                onClick={() => setIsLogVisitOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Sales Officer *</label>
                <select
                  value={repName}
                  onChange={(e) => setRepName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option>Ramesh Meena</option>
                  <option>Amit Verma</option>
                  <option>Neha Gupta</option>
                  <option>Suresh Sharma</option>
                  <option>Vikas Choudhary</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Dealer / Hardware Store *</label>
                <input
                  type="text"
                  required
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Market Location *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Purpose of Visit *</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option>Order Booking</option>
                  <option>Payment Collection</option>
                  <option>Product Sampling</option>
                  <option>Complaint Resolution</option>
                  <option>New Dealer Onboarding</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Bags Booked</label>
                  <input
                    type="number"
                    value={bagsBooked}
                    onChange={(e) => setBagsBooked(parseInt(e.target.value) || 0)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Amount Collected (₹)</label>
                  <input
                    type="number"
                    value={amountCollected}
                    onChange={(e) => setAmountCollected(parseInt(e.target.value) || 0)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Meeting Notes &amp; Outcome</label>
                <textarea
                  rows={2}
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsLogVisitOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Save Beat Log
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
