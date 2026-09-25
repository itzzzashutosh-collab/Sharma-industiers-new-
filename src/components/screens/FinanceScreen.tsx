import React from 'react';

export const FinanceScreen: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-scale-balanced" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Finance &amp; Executive Accounts</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cash in hand, receivables aging analysis, plant operational expenditure and margins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            ● Working Capital Status: Robust
          </span>
        </div>
      </div>

      {/* Financial Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Cash in Hand &amp; Bank</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
              Healthy
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹ 38.5 Lakhs</p>
          <p className="text-[11px] text-slate-400">HDFC Bank Operating + SBI Cash Credit Limit</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Receivables</span>
            <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded">
              14% overdue
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹ 42.3 Lakhs</p>
          <p className="text-[11px] text-slate-400">Pending from 18 dealers across Rajasthan</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Vendor Payables</span>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">
              Due this month
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹ 18.7 Lakhs</p>
          <p className="text-[11px] text-slate-400">Pigments, binders &amp; packaging bag suppliers</p>
        </div>
      </div>

      {/* P&L Statement and Dealer Aging Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* P&L Breakdown */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Monthly P&amp;L Overview (August 2025)</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 font-semibold">
              <span className="text-slate-700">Gross Sales Revenue</span>
              <span className="text-slate-900 font-bold">₹ 24,80,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 text-slate-500">
              <span>Less: Raw Materials (TiO2, Resins, Packaging)</span>
              <span className="text-rose-600">- ₹ 11,40,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 font-semibold">
              <span className="text-slate-800">Gross Manufacturing Margin (54%)</span>
              <span className="text-emerald-600 font-bold">₹ 13,40,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 text-slate-500">
              <span>Factory Electricity, Fuel &amp; Plant Maintenance</span>
              <span className="text-rose-600">- ₹ 2,80,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 text-slate-500">
              <span>Factory Labor, Supervisors &amp; Operations Team</span>
              <span className="text-rose-600">- ₹ 3,20,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 text-slate-500">
              <span>Sales Logistics &amp; Transport Freights</span>
              <span className="text-rose-600">- ₹ 1,45,000</span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-slate-200 text-sm font-black text-slate-900">
              <span>Net Operating Profit</span>
              <span className="text-blue-600">₹ 5,95,000 (24%)</span>
            </div>
          </div>
        </div>

        {/* Dealer Overdue Action List */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Major Overdue Dealer Accounts</h3>
            <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
              Immediate Follow-up
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/30 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Neeraj Construction (Jodhpur)</h4>
                <p className="text-[11px] text-slate-500">
                  Invoice INV-1003 · Due since 20 Jul 2025 (48 days overdue)
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-rose-600 block">₹ 1,23,000</span>
                <button className="text-[10px] font-bold text-blue-600 hover:underline">
                  Send WhatsApp Reminder
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/30 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Kota Distributors (Kota)</h4>
                <p className="text-[11px] text-slate-500">
                  Invoice INV-1005 · Due since 16 Aug 2025 (Grace period ending)
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-amber-600 block">₹ 88,000</span>
                <button className="text-[10px] font-bold text-blue-600 hover:underline">
                  Call Accounts Mgr
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Om Painters (Kota)</h4>
                <p className="text-[11px] text-slate-500">Invoice INV-1002 · Due in 5 days</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-800 block">₹ 38,000</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Standard Terms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
