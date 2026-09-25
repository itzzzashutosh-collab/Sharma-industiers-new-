import React, { useState } from 'react';
import { ReturnOrderClaim } from '../../../types/erp';
import { INITIAL_RETURNS } from '../../../data/salesSubpagesData';

interface ReturnOrdersSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const ReturnOrdersSubpage: React.FC<ReturnOrdersSubpageProps> = ({
  onNavigateSubpage,
}) => {
  const [returns, setReturns] = useState<ReturnOrderClaim[]>(INITIAL_RETURNS);
  const [filterReason, setFilterReason] = useState('All Reasons');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [isNewRmaOpen, setIsNewRmaOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New RMA modal form state
  const [dealerName, setDealerName] = useState('Rajesh Traders');
  const [orderNumber, setOrderNumber] = useState('SO-1001');
  const [productName, setProductName] = useState('Swatch Acrylic Wall Putty (40kg)');
  const [bagsQuantity, setBagsQuantity] = useState(15);
  const [claimAmount, setClaimAmount] = useState(5700);
  const [reason, setReason] = useState<ReturnOrderClaim['reason']>('Transit Damage');
  const [notes, setNotes] = useState('Bags damaged due to torn tarpaulin in transit.');

  // Filtering
  const filtered = returns.filter((r) => {
    if (filterReason !== 'All Reasons' && r.reason !== filterReason) return false;
    if (filterStatus !== 'All Statuses' && r.inspectionStatus !== filterStatus) return false;
    return true;
  });

  const totalClaimValue = returns.reduce((acc, curr) => acc + curr.claimAmount, 0);
  const pendingCount = returns.filter((r) => r.inspectionStatus === 'Pending Inspection').length;

  // Actions
  const handleIssueCreditNote = (id: string, rmaNum: string) => {
    const cnNumber = `CN-2025-0${Math.floor(85 + Math.random() * 20)}`;
    setReturns((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              inspectionStatus: 'Credit Note Issued',
              resolutionAction: 'Credit Note',
              creditNoteNumber: cnNumber,
            }
          : r
      )
    );
    setToastMessage(`Credit Note ${cnNumber} issued for ${rmaNum}. Ledger adjusted.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDispatchReplacement = (id: string, rmaNum: string) => {
    setReturns((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              inspectionStatus: 'Replacement Dispatched',
              resolutionAction: 'Replacement',
            }
          : r
      )
    );
    setToastMessage(`Replacement batch scheduled for ${rmaNum} from Factory Bay 01.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateRma = (e: React.FormEvent) => {
    e.preventDefault();
    const newRma: ReturnOrderClaim = {
      id: `rma-${Date.now()}`,
      rmaNumber: `RMA-2025-0${Math.floor(46 + Math.random() * 20)}`,
      orderNumber,
      invoiceNumber: `INV-${orderNumber.replace('SO-', '')}`,
      customer: dealerName,
      location: 'Rajasthan',
      requestDate: '12 Aug 2025',
      productName,
      bagsQuantity,
      claimAmount,
      reason,
      inspectionStatus: 'Pending Inspection',
      resolutionAction: 'Under Review',
      inspectorNotes: notes,
    };

    setReturns([newRma, ...returns]);
    setIsNewRmaOpen(false);
    setToastMessage(`New return claim ${newRma.rmaNumber} initiated for ${dealerName}.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
              Quality Assurance &amp; Claims
            </span>
            <span className="text-xs text-slate-400">• Bundi Factory Lab</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Return Orders &amp; RMA Claims
          </h2>
          <p className="text-xs text-slate-500">
            Process damaged transit bags, batch shade discrepancies, quality inspection reports &amp; automated GST credit notes.
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
            onClick={() => setIsNewRmaOpen(true)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Initiate RMA Claim</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Active Return Claims</span>
            <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-rotate-left" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{returns.length}</span>
            <span className="text-[11px] text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full">
              {pendingCount} Pending QA
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Claim Value</span>
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-indian-rupee-sign" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">₹ {(totalClaimValue / 1000).toFixed(1)}k</span>
            <span className="text-[11px] text-slate-400">This Month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Credit Notes Issued</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-file-invoice-dollar" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">₹ 1.42L</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Processed</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Return Rate</span>
            <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-shield-halved" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-indigo-600">0.38%</span>
            <span className="text-[11px] text-slate-400">Target &lt; 1.5%</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterReason}
            onChange={(e) => setFilterReason(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-none"
          >
            <option>All Reasons</option>
            <option>Transit Damage</option>
            <option>Moisture Hardened</option>
            <option>Batch Shade Mismatch</option>
            <option>Contractor Surplus</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-none"
          >
            <option>All Statuses</option>
            <option>Pending Inspection</option>
            <option>Inspected &amp; Verified</option>
            <option>Credit Note Issued</option>
            <option>Replacement Dispatched</option>
          </select>
        </div>

        <span className="text-xs text-slate-500">
          Showing {filtered.length} claims
        </span>
      </div>

      {/* Returns Claims Stream */}
      <div className="space-y-3.5">
        {filtered.map((claim) => {
          let statusBadge = 'bg-slate-100 text-slate-700 border-slate-200';
          if (claim.inspectionStatus === 'Pending Inspection') statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
          if (claim.inspectionStatus === 'Inspected & Verified') statusBadge = 'bg-blue-50 text-blue-700 border-blue-200';
          if (claim.inspectionStatus === 'Credit Note Issued') statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          if (claim.inspectionStatus === 'Replacement Dispatched') statusBadge = 'bg-purple-50 text-purple-700 border-purple-200';

          return (
            <div
              key={claim.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-2xs hover:border-slate-300 transition space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-sm text-rose-600">{claim.rmaNumber}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-900 text-sm">{claim.customer}</span>
                  <span className="text-xs text-slate-500">({claim.location})</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge}`}>
                    {claim.inspectionStatus}
                  </span>
                  {claim.creditNoteNumber && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      CN: {claim.creditNoteNumber}
                    </span>
                  )}
                </div>

                <span className="text-xs text-slate-400">Claimed: {claim.requestDate}</span>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Product &amp; Quantity</span>
                  <span className="font-bold text-slate-900">{claim.productName}</span>
                  <span className="text-[11px] text-rose-600 font-semibold block">{claim.bagsQuantity} Bags Damaged/Returned</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Claim Value</span>
                  <span className="font-black text-slate-900 text-sm">₹ {claim.claimAmount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block">Ref: {claim.orderNumber}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Return Reason</span>
                  <span className="font-bold text-slate-800">{claim.reason}</span>
                  <span className="text-[10px] text-slate-500 block">Warehouse Inspection</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Resolution Action</span>
                  <span className="font-bold text-indigo-600">{claim.resolutionAction}</span>
                  <span className="text-[10px] text-slate-400 block">Ledger Sync</span>
                </div>
              </div>

              {/* Quality Lab Inspector Notes */}
              {claim.inspectorNotes && (
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                  <i className="fa-solid fa-microscope text-slate-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700">Lab &amp; QA Inspection Log: </span>
                    <span>{claim.inspectorNotes}</span>
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
                <span className="text-slate-400 text-[11px]">
                  Original Tax Invoice: <strong>{claim.invoiceNumber}</strong>
                </span>

                <div className="flex items-center space-x-2">
                  {claim.inspectionStatus !== 'Credit Note Issued' && (
                    <button
                      onClick={() => handleIssueCreditNote(claim.id, claim.rmaNumber)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fa-solid fa-file-invoice" />
                      <span>Issue Credit Note</span>
                    </button>
                  )}

                  {claim.inspectionStatus !== 'Replacement Dispatched' && (
                    <button
                      onClick={() => handleDispatchReplacement(claim.id, claim.rmaNumber)}
                      className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fa-solid fa-truck" />
                      <span>Dispatch Replacement Bags</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Initiate New RMA Modal */}
      {isNewRmaOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateRma}
            className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-xl border border-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">
                Initiate New Return Material Authorization (RMA)
              </h3>
              <button
                type="button"
                onClick={() => setIsNewRmaOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Dealer / Customer *</label>
                <input
                  type="text"
                  required
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Original Order # *</label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Product SKU *</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option>Swatch Super White Cement (50kg)</option>
                  <option>Swatch Acrylic Wall Putty (40kg)</option>
                  <option>Swatch Waterproof Polymer Putty (30kg)</option>
                  <option>Swatch Exterior Wall Primer (20L)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Damaged Bags *</label>
                <input
                  type="number"
                  required
                  value={bagsQuantity}
                  onChange={(e) => setBagsQuantity(parseInt(e.target.value) || 0)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Claim Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(parseInt(e.target.value) || 0)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Return Reason *</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option>Transit Damage</option>
                  <option>Moisture Hardened</option>
                  <option>Batch Shade Mismatch</option>
                  <option>Wrong Product Shipped</option>
                  <option>Contractor Surplus</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Initial Observations</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewRmaOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Submit RMA Claim
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
