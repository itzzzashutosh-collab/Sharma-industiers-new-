import React, { useState } from 'react';
import { OutdoorMediaRecord } from '../../../types/erp';

interface OutdoorMediaSubpageProps {
  sites: OutdoorMediaRecord[];
  onRenewSite: (id: string) => void;
}

export const OutdoorMediaSubpage: React.FC<OutdoorMediaSubpageProps> = ({
  sites,
  onRenewSite,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSites = sites.filter((s) => {
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    const matchesSearch =
      s.siteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.corridor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalMonthlyRent = sites.reduce((acc, s) => acc + s.monthlyRent, 0);

  const getStatusBadge = (status: OutdoorMediaRecord['status']) => {
    switch (status) {
      case 'Active Display':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Renewal Due':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Expired':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Under Maintenance':
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-signs-post" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Outdoor (OOH) &amp; Highway Billboards
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Unipoles, expressway toll plaza canopies, gantry signboards &amp; regional traffic impression tracking.
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Monthly Media Burn</p>
          <p className="text-lg font-black text-slate-900 font-mono">
            ₹{totalMonthlyRent.toLocaleString('en-IN')}/mo
          </p>
        </div>
      </div>

      {/* Corridor Highlights */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-5 rounded-2xl text-white shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-road text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-200">
              Key Rajasthan Highway Freight Corridors
            </h3>
          </div>
          <span className="text-[11px] text-slate-300">Total 6 Premium Locations</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
            <p className="text-purple-300 text-[10px] font-bold">NH-52 EXPRESSWAY</p>
            <p className="font-bold text-white mt-0.5">Kota Aerodrome Flyover</p>
            <p className="text-[10px] text-slate-400">4.8 Lakh Monthly Vehicles</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
            <p className="text-purple-300 text-[10px] font-bold">BUNDI BYPASS</p>
            <p className="font-bold text-white mt-0.5">Northbound Toll Plaza</p>
            <p className="text-[10px] text-slate-400">Factory Dispatch Gateway</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
            <p className="text-purple-300 text-[10px] font-bold">JAIPUR RING ROAD</p>
            <p className="font-bold text-white mt-0.5">Agra-Ajmer Interchange</p>
            <p className="text-[10px] text-slate-400">9.2 Lakh Monthly Vehicles</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
            <p className="text-purple-300 text-[10px] font-bold">MEWAR HIGHWAY</p>
            <p className="font-bold text-white mt-0.5">Udaipur Sukher Marble Market</p>
            <p className="text-[10px] text-slate-400">Key Contractor Route</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Active Display', 'Renewal Due', 'Expired'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === st
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:w-64">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search site, highway, vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-purple-500"
          />
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSites.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3.5 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      {site.siteCode}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                      {site.litType}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                    {site.locationName}
                  </h3>
                  <p className="text-[11px] text-slate-500">{site.corridor}</p>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
                    site.status
                  )}`}
                >
                  {site.status}
                </span>
              </div>

              {/* Message Banner */}
              <div className="p-3 bg-pink-50/70 border border-pink-200/80 rounded-xl text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700">
                  Live Creative Copy
                </span>
                <p className="font-semibold text-slate-900 italic">&ldquo;{site.campaignMessage}&rdquo;</p>
              </div>

              {/* Details table */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Media Size:</span>
                  <span className="font-bold text-slate-800">{site.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Rent:</span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{site.monthlyRent.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Traffic Footfall:</span>
                  <span className="font-bold text-blue-600">{site.estMonthlyImpressions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vendor:</span>
                  <span className="text-slate-700 truncate">{site.vendorName}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                {site.daysLeft > 0 ? (
                  <span className={site.daysLeft < 30 ? 'text-amber-600 font-bold' : ''}>
                    {site.daysLeft} days until expiry
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold">Expired</span>
                )}
              </span>

              {site.daysLeft < 60 && (
                <button
                  onClick={() => onRenewSite(site.id)}
                  className="px-3 py-1 text-[11px] font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                >
                  Renew Contract
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
