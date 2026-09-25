import React, { useState } from 'react';
import { DealerBrandingRecord } from '../../../types/erp';

interface DealerBrandingSubpageProps {
  brandings: DealerBrandingRecord[];
  onOpenNewBranding: () => void;
  onUpdateStatus: (id: string, newStatus: DealerBrandingRecord['status']) => void;
}

export const DealerBrandingSubpage: React.FC<DealerBrandingSubpageProps> = ({
  brandings,
  onOpenNewBranding,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrandings = brandings.filter((b) => {
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch =
      b.dealerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.dealerCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.fabricatorVendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalSubsidy = brandings.reduce((acc, b) => acc + b.companySubsidy, 0);
  const totalCost = brandings.reduce((acc, b) => acc + b.totalCost, 0);

  const getStatusBadge = (status: DealerBrandingRecord['status']) => {
    switch (status) {
      case 'Installed & Verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Vendor Fabrication':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Approval Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Under Inspection':
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-store" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Dealer Co-Op &amp; Retail Shop Branding
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Shop fascia glow-signs, in-store counters, computerized tinting units &amp; 50-50 manufacturer subsidies.
          </p>
        </div>

        <button
          onClick={onOpenNewBranding}
          className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <i className="fa-solid fa-plus text-[10px]" />
          <span>New Branding Request</span>
        </button>
      </div>

      {/* Ribbon Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Signages</p>
          <p className="text-xl font-black text-slate-900 mt-1">{brandings.length} Outlets</p>
          <p className="text-[10px] text-slate-500">Authorized retail shops</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Signage CapEx</p>
          <p className="text-xl font-black text-slate-900 font-mono mt-1">
            ₹{totalCost.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-slate-500">Fabrication value</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company Subsidy</p>
          <p className="text-xl font-black text-indigo-600 font-mono mt-1">
            ₹{totalSubsidy.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-slate-500">50% promotional funding</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified &amp; Live</p>
          <p className="text-xl font-black text-emerald-600 mt-1">
            {brandings.filter((b) => b.status === 'Installed & Verified').length} Sites
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold">Photographic audit passed</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Installed & Verified', 'Vendor Fabrication', 'Approval Pending', 'Under Inspection'].map(
            (st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterStatus === st
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>

        <div className="relative flex-1 sm:w-64">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search dealer, city, vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Branding Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBrandings.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3.5 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    {b.requestNumber}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{b.dealerName}</h3>
                  <p className="text-[11px] text-slate-500">
                    <i className="fa-solid fa-location-dot text-slate-400 mr-1" />
                    {b.dealerCity} · {b.dealerPhone}
                  </p>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
              </div>

              {/* Spec Badge */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="font-bold text-slate-800">{b.brandingType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dimensions:</span>
                  <span className="font-medium text-slate-700">{b.boardDimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fabricator:</span>
                  <span className="text-slate-700 truncate">{b.fabricatorVendor}</span>
                </div>
              </div>

              {/* Financial Co-Op Share */}
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Invoice:</span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{b.totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Company Subsidy:</span>
                  <span className="font-mono font-bold text-indigo-700">
                    ₹{b.companySubsidy.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dealer Paid:</span>
                  <span className="font-mono font-bold text-slate-800">
                    ₹{b.dealerShare.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                {b.installationDate ? `Date: ${b.installationDate}` : 'Under processing'}
              </span>

              {b.status !== 'Installed & Verified' && (
                <button
                  onClick={() => onUpdateStatus(b.id, 'Installed & Verified')}
                  className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                >
                  Verify Installation
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
