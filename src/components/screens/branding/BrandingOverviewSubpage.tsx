import React from 'react';
import { BrandAssetRecord, PackagingDesignRecord, ShadeRecord } from '../../../types/erp';

interface BrandingOverviewSubpageProps {
  assets: BrandAssetRecord[];
  packagings: PackagingDesignRecord[];
  shades: ShadeRecord[];
  onOpenUpload: () => void;
  onOpenNewPackaging: () => void;
  onSelectShade: (shade: ShadeRecord) => void;
  onNavigateSubpage: (subpage: string) => void;
}

export const BrandingOverviewSubpage: React.FC<BrandingOverviewSubpageProps> = ({
  assets,
  packagings,
  shades,
  onOpenUpload,
  onOpenNewPackaging,
  onSelectShade,
  onNavigateSubpage,
}) => {
  return (
    <div className="space-y-6">
      {/* Executive KPI Cards (Matching User Screenshot) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-indigo-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Brand Assets
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-folder-open" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">142</div>
          <div className="flex items-center space-x-1.5 mt-1 text-[11px] text-emerald-600 font-medium">
            <i className="fa-solid fa-arrow-trend-up text-[10px]" />
            <span>+18 new assets this month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-sky-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Packaging SKUs
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-box-archive" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">{packagings.length + 30}</div>
          <div className="flex items-center space-x-1.5 mt-1 text-[11px] text-sky-600 font-medium">
            <i className="fa-solid fa-barcode text-[10px]" />
            <span>100% EAN-13 Barcode verified</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-amber-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Color Formulations
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-swatchbook" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">1,450+</div>
          <div className="flex items-center space-x-1.5 mt-1 text-[11px] text-amber-700 font-medium">
            <i className="fa-solid fa-flask text-[10px]" />
            <span>4 automated tint bases (W/Y/D/TR)</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-pink-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Dealer Collateral Req.
            </span>
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-store" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">86</div>
          <div className="flex items-center space-x-1.5 mt-1 text-[11px] text-pink-600 font-medium">
            <i className="fa-solid fa-circle-check text-[10px]" />
            <span>94% approval SLA</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-emerald-300 transition col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Brand Compliance
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-shield-halved" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">98.4%</div>
          <div className="flex items-center space-x-1.5 mt-1 text-[11px] text-emerald-600 font-medium">
            <i className="fa-solid fa-certificate text-[10px]" />
            <span>ISO 9001:2015 certified standard</span>
          </div>
        </div>
      </div>

      {/* Featured Packaging Renders Carousel Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        {/* Background decorative paint wave */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none">
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <path
              d="M0,150 C120,80 200,240 400,100 L400,300 L0,300 Z"
              fill="currentColor"
              className="text-indigo-400"
            />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-indigo-300 text-xs font-semibold">
              <i className="fa-solid fa-award text-amber-400" />
              <span>Flagship Product Packaging Collection 2025</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight">
              Swatch Ultra Weatherguard & Royale Silk Packaging Suite
            </h2>
            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed max-w-xl">
              Engineered with tamper-proof IML (In-Mold Labeling), holographic authenticity seals, and high-visibility contrast shelf typography designed to stand out across 1,800+ dealer retail counters nationwide.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenNewPackaging}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-md transition flex items-center space-x-2"
              >
                <i className="fa-solid fa-paint-roller text-xs" />
                <span>Create New Packaging SKU</span>
              </button>
              <button
                onClick={() => onNavigateSubpage('Packaging Designs & SKUs')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold border border-white/20 transition flex items-center space-x-2"
              >
                <i className="fa-solid fa-boxes-stacked text-xs" />
                <span>View All 38 SKUs</span>
              </button>
              <button
                onClick={() => onNavigateSubpage('Brand Guidelines & Manual')}
                className="px-4 py-2 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition flex items-center space-x-1.5"
              >
                <i className="fa-solid fa-book-open text-xs" />
                <span>Brand Manual (64 Pgs)</span>
              </button>
            </div>
          </div>

          {/* Realistic 3D Packaging Render Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center space-x-4">
            {/* Bucket 1: Ultra Weatherguard (Sky Blue) */}
            <div className="relative group cursor-pointer" onClick={() => onNavigateSubpage('Packaging Designs & SKUs')}>
              <div className="w-28 sm:w-32 h-36 rounded-b-2xl bg-linear-to-b from-sky-500 via-blue-700 to-indigo-950 p-2.5 shadow-2xl flex flex-col justify-between border-t-4 border-slate-300 text-white text-center transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition duration-300">
                <div className="text-[7px] font-black uppercase tracking-widest bg-black/40 py-0.5 rounded">
                  SWATCH PAINTS
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase leading-tight">WEATHERGUARD</div>
                  <div className="text-[7px] text-sky-200">12Y Silicone Shield</div>
                </div>
                <div className="text-[8px] font-mono text-white/80">20 LITRES</div>
              </div>
              <span className="absolute -bottom-2 -left-1 bg-amber-400 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs uppercase">
                ★ Best Seller
              </span>
            </div>

            {/* Bucket 2: Royale Silk (Purple) */}
            <div className="relative group cursor-pointer" onClick={() => onNavigateSubpage('Packaging Designs & SKUs')}>
              <div className="w-28 sm:w-32 h-36 rounded-b-2xl bg-linear-to-b from-purple-500 via-fuchsia-700 to-indigo-950 p-2.5 shadow-2xl flex flex-col justify-between border-t-4 border-slate-300 text-white text-center transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition duration-300">
                <div className="text-[7px] font-black uppercase tracking-widest bg-black/40 py-0.5 rounded">
                  SWATCH PAINTS
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase leading-tight">ROYALE SILK</div>
                  <div className="text-[7px] text-purple-200">Teflon Anti-Stain</div>
                </div>
                <div className="text-[8px] font-mono text-white/80">20 LITRES</div>
              </div>
              <span className="absolute -bottom-2 -right-1 bg-indigo-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs uppercase">
                Ultra Luxury
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Brand Assets Quick Grid & Master Color Palettes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Brand Asset Library Highlights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Brand Assets</h3>
              <p className="text-xs text-slate-500">Vector logos, product catalogs, and production print files</p>
            </div>
            <button
              onClick={onOpenUpload}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shadow-xs"
            >
              <i className="fa-solid fa-cloud-arrow-up text-xs" />
              <span>Upload Asset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assets.slice(0, 4).map((asset) => (
              <div
                key={asset.id}
                className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {asset.fileType} • {asset.fileSize}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {asset.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{asset.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{asset.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{asset.version}</span>
                  <button
                    onClick={() => alert(`Downloading ${asset.title} (${asset.fileSize})`)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <i className="fa-solid fa-download text-[11px]" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => onNavigateSubpage('Brand Asset Library')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              View all {assets.length} Brand Assets in Library →
            </button>
          </div>
        </div>

        {/* Right Column: Trending Shade Swatches & Dispenser Ready */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Trending Color Swatches</h3>
              <p className="text-xs text-slate-500">1,450+ Swatch Shades mapped with automated formulas</p>
            </div>
            <button
              onClick={() => onNavigateSubpage('Color Palette & Shade System')}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Full Shade Index
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              {shades.slice(0, 6).map((shade) => (
                <div
                  key={shade.id}
                  onClick={() => onSelectShade(shade)}
                  className="p-2.5 rounded-lg border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition cursor-pointer flex items-center space-x-2.5 group"
                >
                  <div
                    className="w-9 h-9 rounded-md shrink-0 shadow-inner border border-black/10 group-hover:scale-105 transition"
                    style={{ backgroundColor: shade.hexCode }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-mono text-slate-400">{shade.shadeCode}</p>
                    <h5 className="text-[11px] font-bold text-slate-800 truncate">{shade.shadeName}</h5>
                    <p className="text-[9px] text-slate-500">{shade.tintBase}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs text-indigo-900">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-wand-magic-sparkles text-indigo-600" />
                <span className="font-semibold">Interactive Room Visualizer</span>
              </div>
              <button
                onClick={() => onSelectShade(shades[0])}
                className="font-bold underline text-indigo-700 hover:text-indigo-900"
              >
                Launch Simulator
              </button>
            </div>
          </div>

          {/* Brand Voice Badge */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-amber-400 text-sm">★</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Swatch Paints Brand Promise
              </h4>
            </div>
            <p className="text-xs text-slate-300 italic">
              &quot;Colours for a Brighter India — Uncompromising durability, German polymer technology, and vibrant finishes built for our tropical climate.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
