import React, { useState } from 'react';

export const SettingsScreen: React.FC = () => {
  const [factoryName, setFactoryName] = useState('Swatch Paints Factory #01 (Jaipur)');
  const [address, setAddress] = useState(
    'Plot 44-48, RIICO Industrial Area, Sitapura, Jaipur, Rajasthan 302022'
  );
  const [gstin, setGstin] = useState('08AAACS1294K1Z8');
  const [dailyTarget, setDailyTarget] = useState(23000);
  const [lowStockThreshold, setLowStockThreshold] = useState(500);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-gear" />
            </span>
            <h2 className="text-lg font-black text-slate-900">ERP Settings &amp; Plant Configuration</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure manufacturing facility details, GST parameters, unit defaults and alerts.
          </p>
        </div>

        {isSaved && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 animate-in fade-in">
            ✓ Plant Settings Saved Successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
        {/* Factory Details */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Manufacturing Plant Identity</h3>

          <div className="space-y-3 font-semibold text-slate-700">
            <div>
              <label className="block mb-1 text-slate-600">Factory / Unit Name</label>
              <input
                type="text"
                value={factoryName}
                onChange={(e) => setFactoryName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-600">Physical Plant Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-slate-600">GSTIN Number (Rajasthan)</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Base Currency</label>
                <input
                  type="text"
                  readOnly
                  value="INR (₹ Indian Rupee - Lakhs)"
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Operational Thresholds */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Production &amp; Inventory Limits</h3>

          <div className="space-y-3 font-semibold text-slate-700">
            <div>
              <label className="block mb-1 text-slate-600">Daily Bag Production Target</label>
              <input
                type="number"
                step="500"
                value={dailyTarget}
                onChange={(e) => setDailyTarget(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
              <span className="text-[10px] text-slate-400">Current target: 23,000 bags/day</span>
            </div>

            <div>
              <label className="block mb-1 text-slate-600">Default Low Stock Alert Threshold</label>
              <input
                type="number"
                step="50"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
              <span className="text-[10px] text-slate-400">
                Triggers notification when SKU drops below threshold
              </span>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
