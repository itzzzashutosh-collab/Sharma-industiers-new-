import React from 'react';
import { DigitalAdCampaignRecord } from '../../../types/erp';

interface DigitalPerformanceSubpageProps {
  ads: DigitalAdCampaignRecord[];
  onToggleAdStatus: (id: string) => void;
}

export const DigitalPerformanceSubpage: React.FC<DigitalPerformanceSubpageProps> = ({
  ads,
  onToggleAdStatus,
}) => {
  const totalSpend = ads.reduce((acc, a) => acc + a.totalSpend, 0);
  const totalImpressions = ads.reduce((acc, a) => acc + a.impressions, 0);
  const totalClicks = ads.reduce((acc, a) => acc + a.clicks, 0);
  const totalLeads = ads.reduce((acc, a) => acc + a.leadsReceived, 0);
  const avgCpl = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 0;

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-chart-line" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Digital Ads &amp; Performance Marketing Engine
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Google search ads, Meta video reels, YouTube shorts, WhatsApp broadcast API &amp; B2B portal campaigns.
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Digital Ad Burn</p>
          <p className="text-lg font-black text-pink-600 font-mono">
            ₹{totalSpend.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Ribbon Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Impressions</p>
          <p className="text-xl font-black text-slate-900 mt-1 font-mono">
            {(totalImpressions / 1000).toFixed(0)}k Views
          </p>
          <p className="text-[10px] text-slate-500">Across Rajasthan/Hadoti</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Clicks / Visits</p>
          <p className="text-xl font-black text-slate-900 mt-1 font-mono">
            {totalClicks.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold">
            Avg CTR: {((totalClicks / (totalImpressions || 1)) * 100).toFixed(2)}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contractor Inquiries</p>
          <p className="text-xl font-black text-emerald-600 font-mono mt-1">{totalLeads} Leads</p>
          <p className="text-[10px] text-slate-500">Verified phone inquiries</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cost Per Lead (CPL)</p>
          <p className="text-xl font-black text-purple-600 font-mono mt-1">₹{avgCpl}</p>
          <p className="text-[10px] text-purple-700 font-semibold">Industry avg: ₹380</p>
        </div>
      </div>

      {/* Table of Digital Ad Campaigns */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Active Digital Ad Sets &amp; Conversions
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">Real-time API sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Ad Campaign</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4 text-right">Daily Budget</th>
                <th className="py-3 px-4 text-right">Total Spend</th>
                <th className="py-3 px-4 text-center">Impressions</th>
                <th className="py-3 px-4 text-center">CTR %</th>
                <th className="py-3 px-4 text-center">Leads (CPL)</th>
                <th className="py-3 px-4 text-center">Conv %</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-slate-900 leading-snug">{ad.adName}</div>
                    <div className="text-[10px] text-slate-500 truncate">{ad.targetAudience}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 text-[10px] font-bold">
                      {ad.platform}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                    ₹{ad.budgetDaily}/d
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    ₹{ad.totalSpend.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {ad.impressions.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-blue-600">{ad.ctr}%</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-emerald-600 text-sm">{ad.leadsReceived}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">₹{ad.cpl}/lead</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-purple-700">
                    {ad.conversionRate}%
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onToggleAdStatus(ad.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                        ad.status === 'Running'
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {ad.status === 'Running' ? '● Running' : '❚❚ Paused'}
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
