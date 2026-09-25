import React, { useState } from 'react';
import { PainterClubMember } from '../../../types/erp';
import { INITIAL_PAINTERS_CLUB } from '../../../data/crmSubpagesData';

interface PaintersSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const PaintersSubpage: React.FC<PaintersSubpageProps> = ({
  onNavigateSubpage,
}) => {
  const [painters, setPainters] = useState<PainterClubMember[]>(INITIAL_PAINTERS_CLUB);
  const [selectedPainter, setSelectedPainter] = useState<PainterClubMember>(painters[0]);
  const [search, setSearch] = useState('');
  const [isSimulateScanOpen, setIsSimulateScanOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredPainters = painters.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  );

  const totalPointsCirculation = painters.reduce((acc, p) => acc + p.pointsBalance, 0);
  const totalCouponsScanned = painters.reduce((acc, p) => acc + p.scannedCouponsCount, 0);

  const handleSimulateScan = () => {
    setPainters((prev) =>
      prev.map((p) =>
        p.id === selectedPainter.id
          ? {
              ...p,
              pointsBalance: p.pointsBalance + 100,
              pointsEarnedLifetime: p.pointsEarnedLifetime + 100,
              scannedCouponsCount: p.scannedCouponsCount + 1,
              lastScanDate: 'Today (Just now)',
            }
          : p
      )
    );
    setSelectedPainter((prev) => ({
      ...prev,
      pointsBalance: prev.pointsBalance + 100,
      scannedCouponsCount: prev.scannedCouponsCount + 1,
      lastScanDate: 'Today (Just now)',
    }));
    setIsSimulateScanOpen(false);
    setToastMessage(`100 Loyalty Points credited to ${selectedPainter.name} for QR coupon #SW-2508-RANG.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
              Swatch Rang Utsav Club
            </span>
            <span className="text-xs text-slate-400">• Applicator Influencer Program</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Master Painters &amp; Applicators Loyalty Network
          </h2>
          <p className="text-xs text-slate-500">
            Track QR code coupon redemptions from wall putty bags, tier badges, contractor linkage &amp; direct UPI rewards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateSubpage('Leads Management')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Leads Pipeline</span>
          </button>
          <button
            onClick={() => setIsSimulateScanOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-qrcode text-xs" />
            <span>Scan Coupon for Painter</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-gift text-purple-600 text-sm" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-purple-500 hover:text-purple-700">
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Enrolled Painters</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{painters.length * 32} Members</span>
          <span className="text-[10px] text-emerald-600 font-bold">In Kota &amp; Bundi Circles</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Coupons Scanned</span>
          <span className="text-2xl font-black text-purple-600 mt-1 block">{totalCouponsScanned.toLocaleString()} Bags</span>
          <span className="text-[10px] text-slate-400">Putty &amp; Cement Bags</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Points in Circulation</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{totalPointsCirculation.toLocaleString()} Pts</span>
          <span className="text-[10px] text-slate-400">1 Pt = ₹1 Direct Cash</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Redemption Ratio</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">94.2%</span>
          <span className="text-[10px] text-emerald-600 font-bold">Fast UPI Payouts</span>
        </div>
      </div>

      {/* Painter Grid + Selected Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left: Painters Cards List (8 cols) */}
        <div className="xl:col-span-8 space-y-3">
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search painter name, city, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">Showing {filteredPainters.length} Master Applicators</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredPainters.map((p) => {
              const isSelected = p.id === selectedPainter.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPainter(p)}
                  className={`bg-white rounded-2xl p-4 border transition cursor-pointer shadow-2xs hover:border-slate-300 space-y-3 ${
                    isSelected ? 'border-purple-600 ring-2 ring-purple-100' : 'border-slate-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        {p.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{p.name}</h4>
                        <span className="text-[11px] text-slate-500 block">{p.city} • {p.membershipId}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {p.tier}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-semibold">Reward Points</span>
                      <span className="font-black text-purple-600 text-sm">{p.pointsBalance.toLocaleString()} Pts</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-semibold">Scans Count</span>
                      <span className="font-black text-slate-800 text-sm">{p.scannedCouponsCount} Bags</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span>Dealer: <strong className="text-slate-700">{p.preferredDealer}</strong></span>
                    <span className="text-emerald-600 font-bold">KYC Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Painter Details (4 cols) */}
        {selectedPainter && (
          <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4.5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedPainter.name}</h3>
                <span className="text-[11px] text-slate-500">{selectedPainter.membershipId} • {selectedPainter.tier}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Active Member
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-950 text-white space-y-2 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-purple-300 block">Available Points Balance</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black">{selectedPainter.pointsBalance.toLocaleString()} Pts</span>
                <span className="text-xs font-semibold text-emerald-400">≈ ₹ {selectedPainter.pointsBalance}</span>
              </div>
              <p className="text-[10px] text-purple-300">Lifetime earned: {selectedPainter.pointsEarnedLifetime.toLocaleString()} points</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-bold text-slate-800">{selectedPainter.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">City / District:</span>
                <span className="font-semibold text-slate-700">{selectedPainter.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preferred Dealer:</span>
                <span className="font-semibold text-blue-600">{selectedPainter.preferredDealer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Painting Sites:</span>
                <span className="font-bold text-slate-800">{selectedPainter.activeSitesCount} Ongoing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Scanned Date:</span>
                <span className="text-slate-600">{selectedPainter.lastScanDate}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setIsSimulateScanOpen(true)}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                + Scan &amp; Add 100 Points
              </button>
              <button
                onClick={() => alert(`Direct UPI transfer of ₹${selectedPainter.pointsBalance} initiated to ${selectedPainter.phone}.`)}
                className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 transition"
              >
                Instant UPI Cashout (₹{selectedPainter.pointsBalance})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Simulate Scan Modal */}
      {isSimulateScanOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900">Scan Wall Putty Bag QR Code</h3>
              <button onClick={() => setIsSimulateScanOpen(false)} className="text-slate-400">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className="text-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
              <i className="fa-solid fa-qrcode text-4xl text-purple-600 animate-pulse" />
              <p className="text-xs font-bold text-slate-800">Coupon #SW-2508-RANG-049</p>
              <p className="text-[11px] text-slate-500">Crediting to {selectedPainter.name} ({selectedPainter.phone})</p>
            </div>

            <div className="flex justify-end space-x-2 pt-1">
              <button
                onClick={() => setIsSimulateScanOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateScan}
                className="px-4 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs"
              >
                Confirm Scan (+100 Pts)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
