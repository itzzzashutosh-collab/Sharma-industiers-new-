import React, { useState } from 'react';
import { PackagingDesignRecord } from '../../../types/erp';

interface PackagingDesignsSubpageProps {
  packagings: PackagingDesignRecord[];
  onOpenNewPackaging: () => void;
}

export const PackagingDesignsSubpage: React.FC<PackagingDesignsSubpageProps> = ({
  packagings,
  onOpenNewPackaging,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackForModal, setSelectedPackForModal] = useState<PackagingDesignRecord | null>(null);

  const categories = [
    'All',
    'Interior Emulsion',
    'Exterior Weatherguard',
    'Rustic Texture',
    'Waterproofing',
    'Wood & Enamel',
    'Primers & Putty',
  ];

  const filteredPacks = packagings.filter((pack) => {
    const matchCat = selectedCategory === 'All' || pack.category === selectedCategory;
    const matchTier = selectedTier === 'All' || pack.tier === selectedTier;
    const matchQuery =
      pack.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.skuCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.finishType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchTier && matchQuery;
  });

  return (
    <div className="space-y-5">
      {/* Top Banner and Quick Stats */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              Container & Die-Line Registry
            </span>
            <span className="text-xs text-slate-500">• {packagings.length} Active Master Designs</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Product Packaging Designs & Master SKUs
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Production-ready vector artworks, container die-lines, holographic anti-counterfeit labels, and barcode registrations compliant with GS1 India specifications.
          </p>
        </div>

        <button
          onClick={onOpenNewPackaging}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shrink-0 shadow-sm"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>New Packaging SKU</span>
        </button>
      </div>

      {/* Category Filter Pills (Matching User's Uploaded Screenshot) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search and Secondary Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by SKU, product name or finish..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 bg-white"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-500 font-medium">Filter Tier:</span>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Tiers</option>
            <option value="Ultra Luxury">Ultra Luxury</option>
            <option value="Premium">Premium</option>
            <option value="Economy">Economy</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
      </div>

      {/* Packaging Grid (High Fidelity Container Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPacks.map((pack) => (
          <div
            key={pack.id}
            className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Container Render Area */}
            <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex flex-col items-center justify-center relative min-h-[170px]">
              {/* Top Badges */}
              <div className="w-full flex items-center justify-between absolute top-2.5 px-3">
                <span className="text-[9px] font-mono font-bold bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                  {pack.skuCode}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    pack.dieLineStatus === 'Print Ready'
                      ? 'bg-emerald-100 text-emerald-800'
                      : pack.dieLineStatus === 'Under Review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {pack.dieLineStatus}
                </span>
              </div>

              {/* Realistic Simulated 3D Bucket Render */}
              <div className="relative mt-4 flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                {/* Bucket Rim */}
                <div className="w-24 h-3.5 bg-slate-300 rounded-t-md border-t-2 border-x-2 border-slate-400 shadow-xs flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-400 rounded-full" />
                </div>
                {/* Bucket Body */}
                <div
                  className={`w-28 h-26 rounded-b-xl bg-linear-to-b ${pack.bucketGradient} p-2 shadow-lg flex flex-col items-center justify-between text-white border-x border-b border-black/20`}
                >
                  <div className="text-[7px] font-black uppercase tracking-widest bg-black/35 px-1 py-0.5 rounded">
                    SWATCH
                  </div>
                  <div className="text-center px-1">
                    <div className="text-[9px] font-black uppercase leading-tight line-clamp-2">
                      {pack.productName.split(' ')[0]} {pack.productName.split(' ')[1] || ''}
                    </div>
                    {pack.warrantyYears && (
                      <span className="text-[7px] text-amber-300 font-bold">
                        {pack.warrantyYears}Y Guarantee
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full px-1 text-[7px] font-mono text-white/80">
                    <span>{pack.finishType.split(' ')[0]}</span>
                    <span className="font-bold">20L</span>
                  </div>
                </div>
              </div>

              {/* Available Sizes Pills below bucket */}
              <div className="flex items-center space-x-1 mt-2.5">
                {pack.packSizes.map((size) => (
                  <span
                    key={size}
                    className="text-[9px] font-mono font-medium px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-600"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Container Details & Specifications */}
            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {pack.category}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600">{pack.tier}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1 leading-snug">
                  {pack.productName}
                </h3>
                {pack.tagline && (
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{pack.tagline}</p>
                )}
              </div>

              {/* Print Technical Specs */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[10px] space-y-1">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Substrate:</span>
                  <span className="truncate max-w-[140px] text-slate-800 font-mono">
                    {pack.printSpecs.substrate.split(' ')[0]} {pack.printSpecs.substrate.split(' ')[1] || ''}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Barcode:</span>
                  <span className="font-mono text-slate-800 flex items-center space-x-1">
                    <i className="fa-solid fa-barcode text-xs" />
                    <span>{pack.eanBarcode.slice(0, 8)}...</span>
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPackForModal(pack)}
                  className="text-xs font-semibold text-slate-700 hover:text-indigo-600 flex items-center space-x-1"
                >
                  <i className="fa-solid fa-eye text-[11px]" />
                  <span>Inspect Specs</span>
                </button>
                <button
                  onClick={() =>
                    alert(`Downloading Vector Packaging Dieline & Print Manual for ${pack.skuCode}`)
                  }
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                >
                  <i className="fa-solid fa-download text-[11px]" />
                  <span>Vector Dieline</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Specs Modal */}
      {selectedPackForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-cube text-indigo-400" />
                <h3 className="text-sm font-bold">{selectedPackForModal.productName}</h3>
              </div>
              <button
                onClick={() => setSelectedPackForModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Master SKU</span>
                  <p className="font-mono font-bold text-slate-800">{selectedPackForModal.skuCode}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">EAN-13 Barcode</span>
                  <p className="font-mono font-bold text-slate-800">{selectedPackForModal.eanBarcode}</p>
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-700">Substrate Material:</span>
                <p className="text-slate-600 mt-0.5">{selectedPackForModal.printSpecs.substrate}</p>
              </div>
              <div>
                <span className="font-bold text-slate-700">Color Separations:</span>
                <p className="text-slate-600 mt-0.5">{selectedPackForModal.printSpecs.colors}</p>
              </div>
              <div>
                <span className="font-bold text-slate-700">Surface Finishing:</span>
                <p className="text-slate-600 mt-0.5">{selectedPackForModal.printSpecs.finishing}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedPackForModal(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Approved ${selectedPackForModal.skuCode} for Factory Batch Printing.`);
                    setSelectedPackForModal(null);
                  }}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
                >
                  Approve For Factory Run
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
