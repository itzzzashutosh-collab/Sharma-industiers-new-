import React, { useState } from 'react';
import { RecurringInvoiceRecord } from '../../../types/erp';
import { INITIAL_RECURRING_INVOICES } from '../../../data/invoicesData';

export const RecurringInvoicesSubpage: React.FC = () => {
  const [profiles, setProfiles] = useState<RecurringInvoiceRecord[]>(INITIAL_RECURRING_INVOICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New profile form
  const [profileName, setProfileName] = useState('');
  const [customer, setCustomer] = useState('Marwar Paints & Hardware Mart');
  const [amount, setAmount] = useState(200000);
  const [frequency, setFrequency] = useState<RecurringInvoiceRecord['frequency']>('Monthly');
  const [itemSummary, setItemSummary] = useState('50 Buckets WeatherShield Max + 30 Bags Putty');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Paused' : 'Active' } : p
      )
    );
    showToast('Recurring billing profile status updated');
  };

  const handleTriggerNow = (profile: RecurringInvoiceRecord) => {
    showToast(`Invoice for ${profile.customer} (₹${profile.amount.toLocaleString('en-IN')}) generated & dispatched!`);
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) return;

    const newProfile: RecurringInvoiceRecord = {
      id: `rec-${Date.now()}`,
      profileName,
      customer,
      customerType: 'Authorized Dealer',
      amount,
      frequency,
      startDate: '01 Sep 2025',
      nextRunDate: '01 Oct 2025',
      status: 'Active',
      autoSend: true,
      itemSummary,
    };

    setProfiles([newProfile, ...profiles]);
    setIsModalOpen(false);
    setProfileName('');
    showToast('New recurring invoice agreement created!');
  };

  const totalMRR = profiles
    .filter((p) => p.status === 'Active')
    .reduce((sum, p) => sum + (p.frequency === 'Monthly' ? p.amount : p.amount / 3), 0);

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <i className="fa-solid fa-circle-check text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-repeat" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Recurring Billing &amp; Contracts</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automate monthly wholesale quotas, institutional contracts, and annual paint maintenance schedules.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>New Recurring Agreement</span>
        </button>
      </div>

      {/* 4 Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Billing Schedules
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              {profiles.filter((p) => p.status === 'Active').length} Profiles
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">100% On Schedule</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
            Estimated Monthly Pipeline (MRR)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-indigo-700 font-mono">
              ₹{(totalMRR / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[10px] text-slate-400">/ month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Next Trigger Date
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">30 Aug 2025</span>
            <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold">
              Apex Infra
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Auto-Dispatch Mode
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-600 font-mono">Enabled</span>
            <span className="text-[10px] text-slate-400 font-semibold">WhatsApp + PDF</span>
          </div>
        </div>
      </div>

      {/* Profiles Cards / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-slate-300 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  {p.frequency} Billing
                </span>
                <h3 className="text-sm font-black text-slate-900 mt-0.5">{p.profileName}</h3>
                <p className="text-xs text-slate-500 font-semibold">
                  {p.customer} • {p.customerType}
                </p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  p.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                ● {p.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                Contracted Materials
              </span>
              <p className="font-semibold text-slate-800 mt-0.5">{p.itemSummary}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-100 pt-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Amount</span>
                <span className="font-bold text-slate-900 font-mono">
                  ₹{p.amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Next Invoice</span>
                <span className="font-bold text-slate-800">{p.nextRunDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Last Invoiced</span>
                <span className="font-medium text-slate-600">{p.lastRunDate || 'Pending'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={p.autoSend}
                  readOnly
                  className="rounded text-indigo-600"
                />
                <span className="text-[11px] text-slate-600 font-semibold">
                  Auto-email &amp; WhatsApp on generation
                </span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(p.id)}
                  className="px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                >
                  {p.status === 'Active' ? 'Pause' : 'Activate'}
                </button>
                <button
                  onClick={() => handleTriggerNow(p)}
                  className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded-lg transition"
                >
                  Trigger Run Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">New Recurring Invoice Agreement</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Agreement Name</label>
                <input
                  type="text"
                  placeholder="e.g. Udaipur Royale Palace Monthly Quota"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Dealer / Customer</label>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Invoice Value (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-Monthly">Bi-Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Materials Specification</label>
                <textarea
                  rows={2}
                  value={itemSummary}
                  onChange={(e) => setItemSummary(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Create Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
