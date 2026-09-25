import React, { useState } from 'react';
import { PainterLoyaltyMember } from '../../../types/erp';

interface PainterLoyaltySubpageProps {
  painters: PainterLoyaltyMember[];
  onOpenPainterScan: () => void;
  onQuickPayout: (painterId: string, amount: number) => void;
}

export const PainterLoyaltySubpage: React.FC<PainterLoyaltySubpageProps> = ({
  painters,
  onOpenPainterScan,
  onQuickPayout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedKyc, setSelectedKyc] = useState<string>('All');

  const filteredPainters = painters.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.upiId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'All' || p.tier === selectedTier;
    const matchesKyc = selectedKyc === 'All' || p.kycStatus === selectedKyc;
    return matchesSearch && matchesTier && matchesKyc;
  });

  const totalPoints = painters.reduce((acc, p) => acc + p.totalPointsEarned, 0);
  const totalScans = painters.reduce((acc, p) => acc + p.totalCouponsScanned, 0);
  const totalCashback = painters.reduce((acc, p) => acc + p.lifetimeCashbackClaimed, 0);

  const getTierColor = (tier: PainterLoyaltyMember['tier']) => {
    switch (tier) {
      case 'Platinum Ustaad':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Gold':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Silver':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800 border-orange-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-paintbrush" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Swatch Ustaad Painter Loyalty Program
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Instant QR bag coupon scanning, real-time NPCI UPI cashbacks, point accruals &amp; tier badges.
          </p>
        </div>

        <button
          onClick={onOpenPainterScan}
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <i className="fa-solid fa-qrcode text-[10px]" />
          <span>Simulate QR Coupon Scan</span>
        </button>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled</p>
          <p className="text-xl font-black text-slate-900 mt-1">{painters.length} Applicators</p>
          <p className="text-[10px] text-emerald-600 font-semibold">100% active in Rajasthan</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Coupons Scanned</p>
          <p className="text-xl font-black text-slate-900 mt-1">{totalScans.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-slate-500">Putty &amp; primer bags</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Points Disbursed</p>
          <p className="text-xl font-black text-amber-600 font-mono mt-1">
            {totalPoints.toLocaleString('en-IN')} Pts
          </p>
          <p className="text-[10px] text-slate-500">50 pts / 40kg bag</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">UPI Cashback Paid</p>
          <p className="text-xl font-black text-emerald-600 font-mono mt-1">
            ₹{totalCashback.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-slate-500">Direct bank credit</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Platinum Ustaad', 'Gold', 'Silver', 'Bronze'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedTier === tier
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <select
            value={selectedKyc}
            onChange={(e) => setSelectedKyc(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-amber-500"
          >
            <option value="All">All KYC Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending KYC">Pending KYC</option>
          </select>

          <div className="relative flex-1 sm:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search painter, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Painters Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Painter Member</th>
                <th className="py-3 px-4">City / Contact</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4 text-center">Coupons Scanned</th>
                <th className="py-3 px-4 text-right">Points Balance</th>
                <th className="py-3 px-4 text-right">UPI Cashback</th>
                <th className="py-3 px-4 text-center">KYC</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPainters.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="font-mono text-[10px] text-slate-400">{p.memberCode}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-800 font-medium">{p.city}</div>
                    <div className="text-[11px] text-slate-500">{p.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getTierColor(
                        p.tier
                      )}`}
                    >
                      {p.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {p.totalCouponsScanned}
                    <div className="text-[10px] font-normal text-slate-400">Last: {p.lastScanDate}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="font-mono font-bold text-amber-700 text-sm">
                      {p.pointsBalance} Pts
                    </div>
                    <div className="text-[10px] text-slate-400">Total: {p.totalPointsEarned}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="font-mono font-bold text-emerald-600">
                      ₹{p.lifetimeCashbackClaimed.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">{p.upiId}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        p.kycStatus === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {p.kycStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onQuickPayout(p.id, 500)}
                      disabled={p.pointsBalance < 100}
                      className="px-2.5 py-1 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 disabled:opacity-40 rounded-lg transition"
                      title="Redeem points to direct bank cashback"
                    >
                      Disburse UPI
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
