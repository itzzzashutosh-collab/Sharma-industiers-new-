import React from 'react';

export const BrandGuidelinesSubpage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
              Corporate Visual Constitution
            </span>
            <span className="text-xs text-slate-500">• Release v4.2 (2025 Edition)</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Brand Identity Guidelines & Design Rules
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Strict specifications for logo clear space, typography hierarchy, primary color palettes, dealership co-branding ratios, and tone of voice for Swatch Paints nationwide.
          </p>
        </div>

        <button
          onClick={() => alert('Downloading official 64-page Brand Manual PDF (8.4 MB)...')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shrink-0 shadow-sm"
        >
          <i className="fa-solid fa-file-pdf text-xs text-rose-400" />
          <span>Download PDF Manual (64 Pgs)</span>
        </button>
      </div>

      {/* Grid Section 1: Logo Architecture & Prohibitions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Approved Logo Architecture */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-circle-check" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Approved Master Logo Mark</h3>
              <p className="text-[11px] text-slate-500">Geometry, clear space & minimum sizing</p>
            </div>
          </div>

          {/* Logo Preview Canvas with Clear Space Markings */}
          <div className="p-6 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative">
            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-xs border border-slate-200 relative">
              {/* Four petal palette icon */}
              <div className="w-10 h-10 relative flex items-center justify-center shrink-0">
                <svg className="w-10 h-10 drop-shadow-sm" viewBox="0 0 100 100">
                  <path d="M20,65 Q10,35 45,20 Q60,35 35,65 Z" fill="#f97316" />
                  <path d="M45,20 Q80,10 75,45 Q50,45 45,20 Z" fill="#06b6d4" />
                  <path d="M75,45 Q90,80 50,75 Q45,55 75,45 Z" fill="#10b981" />
                  <path d="M50,75 Q20,95 20,65 Q35,60 50,75 Z" fill="#eab308" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-slate-900 leading-none">
                  SWATCH PAINTS
                </h1>
                <p className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
                  Colours for a Brighter India
                </p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-3 font-mono">
              Mandatory Clear-Space Zone: 1.5X petal radius on all 4 quadrants
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Print Minimum</span>
              <p className="font-bold text-slate-800 mt-0.5">24 mm Width</p>
              <span className="text-[10px] text-slate-500">For tins, pouches, and small ads</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Digital Minimum</span>
              <p className="font-bold text-slate-800 mt-0.5">96 px Width</p>
              <span className="text-[10px] text-slate-500">For web app, favicon, and mobile view</span>
            </div>
          </div>
        </div>

        {/* Prohibited Logo Usages */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-ban" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Prohibited Brand Misuse</h3>
              <p className="text-[11px] text-slate-500">Unacceptable distortions, tints & filters</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
              <div className="flex items-center space-x-1.5 text-rose-700 font-bold">
                <i className="fa-solid fa-xmark text-xs" />
                <span>No Aspect Ratio Skew</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Never stretch, condense, or disproportionately rescale the logo or individual wordmark letters.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
              <div className="flex items-center space-x-1.5 text-rose-700 font-bold">
                <i className="fa-solid fa-xmark text-xs" />
                <span>No Gradient Overwrites</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Do not replace corporate colors with unapproved neon, pastel, or low-contrast rainbow hues.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
              <div className="flex items-center space-x-1.5 text-rose-700 font-bold">
                <i className="fa-solid fa-xmark text-xs" />
                <span>No Clashing Backgrounds</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Never place the primary colored logo over busy photograph patterns without a solid backing plate.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
              <div className="flex items-center space-x-1.5 text-rose-700 font-bold">
                <i className="fa-solid fa-xmark text-xs" />
                <span>No Wordmark Re-typing</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Do not substitute the wordmark with custom fonts like Arial, Comic Sans, or Times New Roman.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section 2: Official Typography Hierarchy & Color Codes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Typography */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-font" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Brand Typography</h3>
              <p className="text-[11px] text-slate-500">Primary and secondary font pairings</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">Montserrat (Heavy & Bold)</span>
                <span className="text-[10px] font-mono text-slate-500">Headlines & Pack Titles</span>
              </div>
              <p className="text-sm font-extrabold text-slate-800">
                ABCDEFGH abcdefgh 1234567890
              </p>
              <p className="text-[11px] text-slate-500">
                Used for primary product names, large billboards, and magazine feature covers.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Inter & Roboto (Regular / Medium)</span>
                <span className="text-[10px] font-mono text-slate-500">Technical Specs & Body</span>
              </div>
              <p className="text-xs text-slate-700">
                High legibility at small sizes for coverage instructions, batch codes, and web ERP dashboards.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900">Oswald (Condensed Bold)</span>
                <span className="text-[10px] font-mono text-slate-500">Packaging Numbers & Volume</span>
              </div>
              <p className="text-xs uppercase tracking-wide text-slate-800 font-bold">
                12-YEAR WARRANTY • 20 LITRES • EXTERIOR
              </p>
            </div>
          </div>
        </div>

        {/* Primary Color Palette System */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-palette" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Corporate Brand Palette</h3>
              <p className="text-[11px] text-slate-500">Color harmony and print equivalents</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="h-10 rounded-lg bg-sky-600 shadow-inner flex items-end p-1.5 text-white text-[9px] font-mono font-bold">
                #0284C7
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Swatch Cyan Blue</h4>
                <p className="text-[10px] text-slate-500">Pantone 300C • C:88 M:42 Y:0 K:0</p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="h-10 rounded-lg bg-orange-500 shadow-inner flex items-end p-1.5 text-white text-[9px] font-mono font-bold">
                #F97316
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Swatch Vibrant Saffron</h4>
                <p className="text-[10px] text-slate-500">Pantone 021C • C:0 M:65 Y:100 K:0</p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="h-10 rounded-lg bg-emerald-600 shadow-inner flex items-end p-1.5 text-white text-[9px] font-mono font-bold">
                #10B981
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Eco-Shield Emerald</h4>
                <p className="text-[10px] text-slate-500">Pantone 7726C • C:80 M:0 Y:65 K:0</p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="h-10 rounded-lg bg-slate-900 shadow-inner flex items-end p-1.5 text-white text-[9px] font-mono font-bold">
                #0F172A
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Industrial Slate Dark</h4>
                <p className="text-[10px] text-slate-500">Pantone Black 6C • C:80 M:70 Y:60 K:75</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dealership Co-Branding Rules */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-3">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-store text-amber-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
            Dealer & Franchise Storefront Co-Branding Standards
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Authorized Swatch Paint dealerships are entitled to a 50% to 60% brand subsidy on ACP 3D glow signs, provided that a minimum of <strong>65% of the total storefront signboard fascia</strong> is dedicated to the official Swatch Paints logo and signature color bar. The dealer&apos;s business name and contact number must occupy the remaining 35% dedicated space on the right quadrant.
        </p>
        <div className="flex items-center space-x-4 pt-2 text-xs">
          <span className="text-emerald-400 flex items-center space-x-1.5">
            <i className="fa-solid fa-check" />
            <span>Automatic Co-Op Subsidy Available</span>
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300">Inspection & Approval by Area Sales Manager required prior to release</span>
        </div>
      </div>
    </div>
  );
};
