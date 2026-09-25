import React from 'react';
import { ShowcaseCarousel } from '../ShowcaseCarousel';

interface MarketingScreenProps {
  onInquireProduct?: (productTitle: string) => void;
}

export const MarketingScreen: React.FC<MarketingScreenProps> = ({ onInquireProduct }) => {
  const campaigns = [
    {
      id: 'cmp-1',
      title: 'Monsoon Exterior Weatherguard Campaign',
      budget: '₹ 5.0 Lakhs',
      status: 'Active · Launch Phase',
      channels: 'Highway Hoardings, Painter WhatsApp, Dealer Signboards',
      roi: '↑ 24% Inquiry Growth',
    },
    {
      id: 'cmp-2',
      title: 'Swatch Ustaad Painter Loyalty App',
      budget: '₹ 2.5 Lakhs',
      status: 'Enrolling Painters',
      channels: 'QR Codes inside Bag Liners · Instant UPI Payout',
      roi: '450 Painters Enrolled',
    },
    {
      id: 'cmp-3',
      title: 'Diwali Festive Interior Launch',
      budget: '₹ 8.0 Lakhs',
      status: 'Scheduled (Sept 2025)',
      channels: 'Regional TV, YouTube Ads, Dealer Co-op Branding',
      roi: 'Target: ₹ 1.2 Cr Sales',
    },
  ];

  const colorSwatches = [
    { name: 'Jaipur Terracotta', code: '#E25822', category: 'Rustic Royale' },
    { name: 'Royal Jodhpur Blue', code: '#2563EB', category: 'Shine Emulsion' },
    { name: 'Marwar Desert Ochre', code: '#F59E0B', category: 'Distemper' },
    { name: 'Aravalli Forest Green', code: '#10B981', category: 'Weatherguard' },
    { name: 'Udaipur Pearl White', code: '#F8FAFC', category: 'Base Prime' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-bullhorn" />
            </span>
            <h2 className="text-lg font-black text-slate-900">
              Marketing, Branding &amp; Social Reach
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Brand constitution: &ldquo;Better Walls, Brighter Lives&rdquo; · Painter loyalty programs &amp; dealer promotion.
          </p>
        </div>

        <button className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-1.5">
          <i className="fa-solid fa-plus text-[10px]" />
          <span>Launch Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns.map((cmp) => (
          <div
            key={cmp.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-slate-900">{cmp.title}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                {cmp.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Approved Budget:</span>
                <span className="font-bold text-slate-900">{cmp.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Impact / ROI:</span>
                <span className="font-bold text-emerald-600">{cmp.roi}</span>
              </div>
              <p className="text-slate-500 pt-1 text-[11px]">{cmp.channels}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Visual Showcase Carousel */}
      <ShowcaseCarousel
        onSelectSlideAction={(slide) => {
          if (onInquireProduct) {
            onInquireProduct(slide.title);
          }
        }}
      />

      {/* Brand Color Palettes */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Official Brand Color Swatches</h3>
          <p className="text-xs text-slate-500">
            Heritage pigments formulated and packaged at Swatch Paints Factory #01 (Jaipur)
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {colorSwatches.map((swatch, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 text-center space-y-2">
              <div
                className="w-full h-16 rounded-lg shadow-inner border border-slate-200/50"
                style={{ backgroundColor: swatch.code }}
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{swatch.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{swatch.code}</p>
                <span className="text-[9px] font-semibold text-slate-500 block mt-1">
                  {swatch.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
