import React from 'react';
import {
  MarketingCampaignRecord,
  PainterLoyaltyMember,
  DealerBrandingRecord,
  OutdoorMediaRecord,
  DigitalAdCampaignRecord,
  BrandSurveyNpsRecord,
} from '../../../types/erp';

interface MarketingDashboardSubpageProps {
  campaigns: MarketingCampaignRecord[];
  painters: PainterLoyaltyMember[];
  dealerBrandings: DealerBrandingRecord[];
  outdoorMedia: OutdoorMediaRecord[];
  digitalAds: DigitalAdCampaignRecord[];
  npsSurveys: BrandSurveyNpsRecord[];
  onNavigateTab: (tabId: string) => void;
  onOpenNewCampaign: () => void;
  onOpenPainterScan: () => void;
  onOpenNewBranding: () => void;
}

export const MarketingDashboardSubpage: React.FC<MarketingDashboardSubpageProps> = ({
  campaigns,
  painters,
  dealerBrandings,
  outdoorMedia,
  digitalAds,
  npsSurveys,
  onNavigateTab,
  onOpenNewCampaign,
  onOpenPainterScan,
  onOpenNewBranding,
}) => {
  // Aggregate Metrics
  const totalBudget = campaigns.reduce((acc, c) => acc + c.budgetAllocated, 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + c.actualSpend, 0);
  const totalRevenueAttributed = campaigns.reduce((acc, c) => acc + c.revenueGenerated, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const activeCampaignCount = campaigns.filter((c) => c.status === 'Active').length;

  const totalPainterPoints = painters.reduce((acc, p) => acc + p.totalPointsEarned, 0);
  const totalCashbackPaid = painters.reduce((acc, p) => acc + p.lifetimeCashbackClaimed, 0);

  const avgNpsScore = (
    npsSurveys.reduce((acc, s) => acc + s.npsScore, 0) / (npsSurveys.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner with Brand Constitution & Quick Action Hub */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-950 to-pink-950 rounded-2xl p-6 text-white shadow-xl border border-pink-900/30">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-pink-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-sparkles text-[10px]" />
              Brand Motto: &ldquo;Better Walls, Brighter Lives&rdquo;
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Swatch Marketing &amp; Field Brand Hub
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Driving regional dominance across Rajasthan with highway unipoles, dealer glow-signboards,
              Swatch Ustaad instant UPI painter loyalty rewards, and high-converting contractor lead channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenNewCampaign}
              className="px-4 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-2"
            >
              <i className="fa-solid fa-plus text-[10px]" />
              <span>Launch Campaign</span>
            </button>

            <button
              onClick={onOpenPainterScan}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-2"
            >
              <i className="fa-solid fa-qrcode text-[10px]" />
              <span>Scan QR Coupon</span>
            </button>

            <button
              onClick={onOpenNewBranding}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold backdrop-blur-xs transition flex items-center space-x-2"
            >
              <i className="fa-solid fa-store text-[10px]" />
              <span>Dealer Signboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Campaigns</span>
            <i className="fa-solid fa-bullhorn text-pink-500 text-sm" />
          </div>
          <div className="text-xl font-black text-slate-900">{activeCampaignCount}</div>
          <div className="text-[10px] font-medium text-slate-500">
            Across 6 distinct marketing channels
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Budget Allocated</span>
            <i className="fa-solid fa-wallet text-blue-500 text-sm" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono">
            ₹{(totalBudget / 100000).toFixed(1)}L
          </div>
          <div className="text-[10px] font-medium text-slate-500">
            Spend: ₹{(totalSpend / 100000).toFixed(1)}L ({Math.round((totalSpend / totalBudget) * 100)}%)
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pipeline Attributed</span>
            <i className="fa-solid fa-coins text-emerald-500 text-sm" />
          </div>
          <div className="text-xl font-black text-emerald-600 font-mono">
            ₹{(totalRevenueAttributed / 100000).toFixed(1)}L
          </div>
          <div className="text-[10px] font-bold text-emerald-600">
            ROI: {((totalRevenueAttributed / totalSpend) * 100).toFixed(0)}% return
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Leads</span>
            <i className="fa-solid fa-users text-amber-500 text-sm" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalLeads.toLocaleString('en-IN')}</div>
          <div className="text-[10px] font-medium text-slate-500">Contractors &amp; Dealers</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ustaad Painters</span>
            <i className="fa-solid fa-paintbrush text-purple-500 text-sm" />
          </div>
          <div className="text-xl font-black text-purple-700">{painters.length} Active</div>
          <div className="text-[10px] font-medium text-purple-600">
            ₹{(totalCashbackPaid / 1000).toFixed(0)}k UPI cashback
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Brand NPS Score</span>
            <i className="fa-solid fa-star text-amber-500 text-sm" />
          </div>
          <div className="text-xl font-black text-amber-600">{avgNpsScore} / 10</div>
          <div className="text-[10px] font-bold text-emerald-600">92% Promoters</div>
        </div>
      </div>

      {/* Strategic Channel Matrix & High-Performing Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Strategic Channel Breakdown */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Marketing Channels &amp; ROI Efficiency</h3>
              <p className="text-xs text-slate-500">
                Evaluating lead generation, dealer conversion, and revenue attribution per channel
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('Campaigns & Promotions')}
              className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
            >
              <span>View All</span>
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                channel: 'Painter Loyalty (Ustaad Club QR)',
                leads: 620,
                revenue: '₹ 48.2 Lakhs',
                spend: '₹ 2.95 Lakhs',
                roi: '1533%',
                color: 'bg-emerald-500',
                tab: 'Painter Loyalty (Ustaad Club)',
              },
              {
                channel: 'Outdoor Unipoles & Highway Gantries',
                leads: 342,
                revenue: '₹ 24.5 Lakhs',
                spend: '₹ 4.20 Lakhs',
                roi: '483%',
                color: 'bg-indigo-500',
                tab: 'Outdoor & Highway Hoardings',
              },
              {
                channel: 'Dealer Co-Op Fascia Glow-Signs',
                leads: 215,
                revenue: '₹ 31.8 Lakhs',
                spend: '₹ 3.10 Lakhs',
                roi: '925%',
                color: 'bg-blue-500',
                tab: 'Dealer Co-Op & Shop Branding',
              },
              {
                channel: 'Digital Search & WhatsApp Leads',
                leads: 489,
                revenue: '₹ 29.8 Lakhs',
                spend: '₹ 1.68 Lakhs',
                roi: '1673%',
                color: 'bg-pink-500',
                tab: 'Digital Ads & Performance',
              },
              {
                channel: 'Architect & Contractor Conclaves',
                leads: 78,
                revenue: '₹ 54.0 Lakhs',
                spend: '₹ 2.42 Lakhs',
                roi: '2131%',
                color: 'bg-amber-500',
                tab: 'Architect & Contractor Meets',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateTab(item.tab)}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/60 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-xs font-bold text-slate-800">{item.channel}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500">
                    <span>Leads: <strong className="text-slate-700">{item.leads}</strong></span>
                    <span>Spend: <strong className="text-slate-700">{item.spend}</strong></span>
                    <span>Revenue: <strong className="text-emerald-700">{item.revenue}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono font-bold text-xs border border-emerald-200">
                    {item.roi} ROI
                  </span>
                  <i className="fa-solid fa-chevron-right text-[10px] text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Top Ustaad Painters & QR Scan Feed */}
        <div className="space-y-6">
          {/* Ustaad Club Highlight */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/60 p-5 rounded-2xl border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                  👑
                </span>
                <div>
                  <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider">
                    Ustaad Club Loyalty
                  </h4>
                  <p className="text-[11px] text-amber-800">Top Putty Applicators</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('Painter Loyalty (Ustaad Club)')}
                className="text-[11px] font-bold text-amber-900 underline"
              >
                Directory
              </button>
            </div>

            <div className="space-y-2">
              {painters.slice(0, 4).map((painter) => (
                <div
                  key={painter.id}
                  className="bg-white/80 p-2.5 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-900 truncate">{painter.name}</p>
                    <p className="text-[10px] text-slate-500">
                      {painter.city} · {painter.tier}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-bold text-amber-700 text-xs">
                      {painter.pointsBalance} Pts
                    </p>
                    <p className="text-[10px] text-emerald-600 font-semibold">
                      ₹{painter.lifetimeCashbackClaimed.toLocaleString('en-IN')} paid
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenPainterScan}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-qrcode" />
              <span>Scan QR Coupon Token</span>
            </button>
          </div>

          {/* Quick Highway Hoardings Glance */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">Active Highway Unipoles</h4>
              <button
                onClick={() => onNavigateTab('Outdoor & Highway Hoardings')}
                className="text-[11px] font-bold text-pink-600"
              >
                View Map
              </button>
            </div>

            <div className="space-y-2">
              {outdoorMedia.slice(0, 3).map((site) => (
                <div key={site.id} className="p-2.5 bg-slate-50 rounded-xl space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-800 text-[11px] leading-tight">
                      {site.siteCode} — {site.city}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                      {site.daysLeft}d left
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{site.locationName}</p>
                  <p className="text-[10px] text-pink-600 font-medium truncate">&ldquo;{site.campaignMessage}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
