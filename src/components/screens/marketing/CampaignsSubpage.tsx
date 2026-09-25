import React, { useState } from 'react';
import { MarketingCampaignRecord } from '../../../types/erp';

interface CampaignsSubpageProps {
  campaigns: MarketingCampaignRecord[];
  onOpenNewCampaign: () => void;
  onUpdateCampaignStatus: (id: string, newStatus: MarketingCampaignRecord['status']) => void;
}

export const CampaignsSubpage: React.FC<CampaignsSubpageProps> = ({
  campaigns,
  onOpenNewCampaign,
  onUpdateCampaignStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.campaignCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.managerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetRegion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: MarketingCampaignRecord['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Paused':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Subpage Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-bullhorn" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Strategic Campaigns &amp; Promotions
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track multi-channel promotional drives, BTL activations, budget burn, and pipeline conversion.
          </p>
        </div>

        <button
          onClick={onOpenNewCampaign}
          className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <i className="fa-solid fa-plus text-[10px]" />
          <span>Launch Campaign</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {['All', 'Active', 'Scheduled', 'In Review', 'Completed', 'Paused'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === st
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-pink-500"
          >
            <option value="All">All Categories</option>
            <option value="Outdoor / BTL">Outdoor / BTL</option>
            <option value="Digital & Social">Digital & Social</option>
            <option value="Painter Loyalty">Painter Loyalty</option>
            <option value="Dealer Co-Op">Dealer Co-Op</option>
            <option value="Event / Meet">Event / Meet</option>
            <option value="Festive Launch">Festive Launch</option>
          </select>

          <div className="relative flex-1 md:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search campaigns, manager..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Campaigns Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCampaigns.map((cmp) => {
          const spendPercent = Math.min(
            100,
            Math.round((cmp.actualSpend / (cmp.budgetAllocated || 1)) * 100)
          );

          return (
            <div
              key={cmp.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 hover:shadow-md transition"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400">
                      {cmp.campaignCode}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {cmp.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">{cmp.title}</h3>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(
                    cmp.status
                  )}`}
                >
                  {cmp.status}
                </span>
              </div>

              {/* Progress & Budget */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">
                    Spend: <strong className="text-slate-800">₹{cmp.actualSpend.toLocaleString('en-IN')}</strong> / ₹{cmp.budgetAllocated.toLocaleString('en-IN')}
                  </span>
                  <span className="font-mono font-bold text-slate-700">{spendPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      spendPercent > 90 ? 'bg-amber-500' : 'bg-pink-600'
                    }`}
                    style={{ width: `${spendPercent}%` }}
                  />
                </div>
              </div>

              {/* Performance Stats Pill Grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Leads</p>
                  <p className="text-xs font-bold text-slate-900">{cmp.leadsGenerated}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Revenue</p>
                  <p className="text-xs font-bold text-emerald-600">
                    ₹{(cmp.revenueGenerated / 100000).toFixed(1)}L
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Blended ROI</p>
                  <p className="text-xs font-bold text-purple-600">{cmp.roiPercentage}%</p>
                </div>
              </div>

              {/* Channels & Region */}
              <div className="space-y-1.5 text-xs">
                <div className="flex flex-wrap gap-1">
                  {cmp.channels.map((ch, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 text-[10px] font-semibold"
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    <i className="fa-solid fa-location-dot mr-1 text-slate-400" />
                    {cmp.targetRegion}
                  </span>
                  <span>
                    <i className="fa-regular fa-calendar mr-1 text-slate-400" />
                    {cmp.startDate} – {cmp.endDate}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Lead: <strong className="text-slate-700">{cmp.managerName}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  {cmp.status === 'Active' && (
                    <button
                      onClick={() => onUpdateCampaignStatus(cmp.id, 'Paused')}
                      className="px-2.5 py-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition"
                    >
                      Pause
                    </button>
                  )}
                  {cmp.status === 'Paused' && (
                    <button
                      onClick={() => onUpdateCampaignStatus(cmp.id, 'Active')}
                      className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                    >
                      Resume
                    </button>
                  )}
                  {cmp.status !== 'Completed' && (
                    <button
                      onClick={() => onUpdateCampaignStatus(cmp.id, 'Completed')}
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
