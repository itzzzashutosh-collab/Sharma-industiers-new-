import React, { useState } from 'react';
import { BrandCreativeRecord } from '../../../types/erp';

interface MarketingCreativesSubpageProps {
  creatives: BrandCreativeRecord[];
  onOpenCustomizer: (creative: BrandCreativeRecord) => void;
}

export const MarketingCreativesSubpage: React.FC<MarketingCreativesSubpageProps> = ({
  creatives,
  onOpenCustomizer,
}) => {
  const [selectedPurpose, setSelectedPurpose] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const purposes = [
    'All',
    'Festival Greeting',
    'Monsoon Waterproofing',
    'Dealer Launch Post',
    'Painter Club Poster',
    'Truck / Van Livery',
  ];

  const filtered = creatives.filter((cr) => {
    const matchPurpose = selectedPurpose === 'All' || cr.purpose === selectedPurpose;
    const matchSearch =
      cr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cr.creativeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cr.dimensions.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPurpose && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
              Dealer & Social Studio
            </span>
            <span className="text-xs text-slate-500">• {creatives.length} High-Resolution Templates</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Marketing Creatives & Campaign Collateral
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Turnkey festival wishes, monsoon waterproofing advisories, dealer inaugural banners, and vernacular painter posters ready for customized distribution across WhatsApp, Instagram, and local flex printing.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting all social media campaign templates (ZIP 68 MB)...')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shrink-0 shadow-sm"
        >
          <i className="fa-solid fa-file-zipper text-xs text-amber-400" />
          <span>Export All Creatives (ZIP)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {purposes.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPurpose(p)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedPurpose === p
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by creative title or format..."
          className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-pink-500/20 bg-white"
        />
      </div>

      {/* Creatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((creative) => (
          <div
            key={creative.id}
            className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-pink-400 hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
          >
            {/* Visual Canvas Representation */}
            <div
              className={`p-5 bg-linear-to-br ${creative.accentTheme} text-white flex flex-col justify-between min-h-[190px] relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/15" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-wider bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20">
                  {creative.creativeCode}
                </span>
                <span className="text-[9px] font-bold bg-white/25 backdrop-blur-xs px-2 py-0.5 rounded">
                  {creative.format}
                </span>
              </div>

              <div className="relative z-10 my-3">
                <h3 className="text-base font-black tracking-tight drop-shadow-sm leading-tight">
                  {creative.title}
                </h3>
                {creative.previewText && (
                  <p className="text-[11px] text-white/90 mt-1 line-clamp-2 italic drop-shadow-xs">
                    &quot;{creative.previewText}&quot;
                  </p>
                )}
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] text-white/80">
                <span>Audience: <strong>{creative.targetAudience}</strong></span>
                <span>{creative.createdDate}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {creative.purpose}
                </span>
                <div className="flex items-center space-x-2 mt-1 text-xs text-slate-500">
                  <i className="fa-solid fa-ruler-combined text-slate-400" />
                  <span>{creative.dimensions}</span>
                  <span>•</span>
                  <span>{creative.downloadCount} Downloads</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {creative.customizable ? (
                  <button
                    onClick={() => onOpenCustomizer(creative)}
                    className="w-full px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-xs"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles text-[10px]" />
                    <span>Customize For Dealer</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Downloading high-resolution print file for ${creative.title}`)}
                    className="w-full px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5"
                  >
                    <i className="fa-solid fa-download text-[10px]" />
                    <span>Download Print File</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
