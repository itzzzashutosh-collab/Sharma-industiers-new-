import React, { useState } from 'react';
import { ShadeRecord } from '../../../types/erp';

interface ColorPaletteSubpageProps {
  shades: ShadeRecord[];
  onSelectShade: (shade: ShadeRecord) => void;
}

export const ColorPaletteSubpage: React.FC<ColorPaletteSubpageProps> = ({
  shades,
  onSelectShade,
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareShade1, setCompareShade1] = useState<ShadeRecord>(shades[0]);
  const [compareShade2, setCompareShade2] = useState<ShadeRecord>(shades[2] || shades[1]);

  const families = [
    'All',
    'Whites & Off-Whites',
    'Warm Tones',
    'Cool Blues',
    'Earthy Greens',
    'Royal Accents',
    'Textures & Metallics',
  ];

  const filteredShades = shades.filter((shade) => {
    const matchFamily = selectedFamily === 'All' || shade.family === selectedFamily;
    const matchQuery =
      shade.shadeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shade.shadeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shade.recommendedRoom.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFamily && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
              Master Color Index
            </span>
            <span className="text-xs text-slate-500">• 1,450+ Calibrated Formulations</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Swatch Color Palette & Tinting Machine System
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Calibrated color standards mapped with exact milliliter pigment formulations for computerized automatic dispensers across 4 base matrices (Base White, Base Yellow, Base Deep, Base Transparent).
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Swatch Master Shade Index (Excel + CIE L*a*b calibration)')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shrink-0 shadow-sm"
        >
          <i className="fa-solid fa-file-excel text-xs text-emerald-400" />
          <span>Export Dispenser DB</span>
        </button>
      </div>

      {/* Interactive Dual-Shade Wall Comparator */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-columns" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Dual Accent Wall Comparator</h3>
              <p className="text-[11px] text-slate-500">Test complementary and contrasting room combinations</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">Wall A:</span>
            <select
              value={compareShade1.id}
              onChange={(e) => {
                const found = shades.find((s) => s.id === e.target.value);
                if (found) setCompareShade1(found);
              }}
              className="px-2 py-1 border border-slate-200 rounded-md bg-white font-medium text-slate-700"
            >
              {shades.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.shadeCode} - {s.shadeName}
                </option>
              ))}
            </select>

            <span className="text-slate-500 ml-2">Wall B:</span>
            <select
              value={compareShade2.id}
              onChange={(e) => {
                const found = shades.find((s) => s.id === e.target.value);
                if (found) setCompareShade2(found);
              }}
              className="px-2 py-1 border border-slate-200 rounded-md bg-white font-medium text-slate-700"
            >
              {shades.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.shadeCode} - {s.shadeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Render Area */}
        <div className="grid grid-cols-2 h-36 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
          {/* Left Wall */}
          <div
            className="p-4 flex flex-col justify-between text-white relative transition-colors duration-300"
            style={{ backgroundColor: compareShade1.hexCode }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <span className="text-[9px] font-mono font-bold bg-white/25 px-2 py-0.5 rounded">
                WALL A: {compareShade1.shadeCode}
              </span>
              <h4 className="text-sm font-black mt-1">{compareShade1.shadeName}</h4>
            </div>
            <div className="relative z-10 flex items-center justify-between text-[10px] text-white/90">
              <span>LRV: {compareShade1.lrv}%</span>
              <span>Base: {compareShade1.tintBase}</span>
            </div>
          </div>

          {/* Right Wall */}
          <div
            className="p-4 flex flex-col justify-between text-white relative transition-colors duration-300 border-l-2 border-white/40"
            style={{ backgroundColor: compareShade2.hexCode }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <span className="text-[9px] font-mono font-bold bg-white/25 px-2 py-0.5 rounded">
                WALL B: {compareShade2.shadeCode}
              </span>
              <h4 className="text-sm font-black mt-1">{compareShade2.shadeName}</h4>
            </div>
            <div className="relative z-10 flex items-center justify-between text-[10px] text-white/90">
              <span>LRV: {compareShade2.lrv}%</span>
              <span>Base: {compareShade2.tintBase}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Family Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {families.map((fam) => (
          <button
            key={fam}
            onClick={() => setSelectedFamily(fam)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedFamily === fam
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {fam}
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
          placeholder="Search by shade name, code, or room..."
          className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 bg-white"
        />
      </div>

      {/* Shade Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredShades.map((shade) => (
          <div
            key={shade.id}
            onClick={() => onSelectShade(shade)}
            className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between overflow-hidden group"
          >
            {/* Color Swatch Block */}
            <div
              className="h-32 p-3 relative flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ backgroundColor: shade.hexCode }}
            >
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative z-10 flex items-center justify-between text-white">
                <span className="text-[10px] font-mono font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  {shade.shadeCode}
                </span>
                {shade.isTrending && (
                  <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">
                    ★ Trend
                  </span>
                )}
              </div>
              <div className="relative z-10 flex items-end justify-between text-white">
                <span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded">
                  {shade.hexCode}
                </span>
                <span className="text-[10px] font-medium text-white/90">LRV {shade.lrv}%</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {shade.family}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1">{shade.shadeName}</h4>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  Base: <strong>{shade.tintBase}</strong>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-indigo-600 font-semibold group-hover:underline flex items-center space-x-1">
                  <i className="fa-solid fa-wand-magic-sparkles text-[10px]" />
                  <span>Inspect Formula</span>
                </span>
                <i className="fa-solid fa-arrow-right text-[10px] text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
