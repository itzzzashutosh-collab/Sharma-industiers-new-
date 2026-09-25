import React, { useState } from 'react';
import { BrandAssetRecord } from '../../../types/erp';

interface BrandAssetLibrarySubpageProps {
  assets: BrandAssetRecord[];
  onOpenUpload: () => void;
}

export const BrandAssetLibrarySubpage: React.FC<BrandAssetLibrarySubpageProps> = ({
  assets,
  onOpenUpload,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFileType, setSelectedFileType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Logo & Icon',
    'Packaging Render',
    'Brochure & Catalog',
    'Social Creative',
    'Store Signage',
    'Typography & Guidelines',
  ];

  const fileTypes = ['All', 'PDF', 'SVG', 'EPS', 'AI', 'PNG', 'ZIP'];

  const filteredAssets = assets.filter((asset) => {
    const matchCat = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchType = selectedFileType === 'All' || asset.fileType === selectedFileType;
    const matchQuery =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchType && matchQuery;
  });

  const getFileTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'SVG':
      case 'EPS':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'AI':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'PNG':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'ZIP':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              Digital Brand Repository
            </span>
            <span className="text-xs text-slate-500">• {assets.length} Verified Media Files</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Centralized Brand Asset Library
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Official high-resolution print files, vector marks, packaging mockups, authorized dealership collateral, and digital media kits for national brand consistency.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shrink-0 shadow-sm"
        >
          <i className="fa-solid fa-cloud-arrow-up text-xs" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
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
            placeholder="Search by title, tag, or code..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 bg-white"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-500 font-medium">Format:</span>
          <select
            value={selectedFileType}
            onChange={(e) => setSelectedFileType(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            {fileTypes.map((ft) => (
              <option key={ft} value={ft}>
                {ft === 'All' ? 'All Formats' : ft}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
          >
            {/* Asset Preview Header Card */}
            <div
              className="h-28 p-3 flex flex-col justify-between relative overflow-hidden text-white"
              style={{
                backgroundColor: asset.previewColor || '#1e293b',
              }}
            >
              <div className="absolute inset-0 bg-black/20" />

              <div className="relative z-10 flex items-center justify-between">
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${getFileTypeBadgeColor(
                    asset.fileType
                  )}`}
                >
                  {asset.fileType}
                </span>
                <span className="text-[10px] font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white">
                  {asset.fileSize}
                </span>
              </div>

              <div className="relative z-10 flex items-end justify-between">
                <span className="text-[10px] font-mono text-white/80">{asset.assetCode}</span>
                <span className="text-[10px] text-white/90 font-medium">{asset.version}</span>
              </div>
            </div>

            {/* Asset Content Details */}
            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {asset.category}
                </span>
                <h3 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2 leading-snug">
                  {asset.title}
                </h3>
                {asset.description && (
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{asset.description}</p>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {asset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer Meta & Download Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  <i className="fa-solid fa-download text-[10px] mr-1" />
                  {asset.downloadsCount} dl
                </span>
                <button
                  onClick={() => alert(`Starting download for ${asset.title} (${asset.fileSize})`)}
                  className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md font-semibold transition flex items-center space-x-1"
                >
                  <i className="fa-solid fa-arrow-down-to-line text-[10px]" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
