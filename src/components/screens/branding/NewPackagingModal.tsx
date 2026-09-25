import React, { useState } from 'react';
import { PackagingDesignRecord } from '../../../types/erp';

interface NewPackagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newPackaging: PackagingDesignRecord) => void;
}

export const NewPackagingModal: React.FC<NewPackagingModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState<PackagingDesignRecord['category']>('Exterior Weatherguard');
  const [tier, setTier] = useState<PackagingDesignRecord['tier']>('Ultra Luxury');
  const [finishType, setFinishType] = useState<PackagingDesignRecord['finishType']>('Velvet Sheen');
  const [accentColor, setAccentColor] = useState('#0284c7');
  const [gradientChoice, setGradientChoice] = useState('from-sky-600 via-blue-700 to-indigo-900');
  const [tagline, setTagline] = useState('10-Year All-Weather Protection');
  const [warrantyYears, setWarrantyYears] = useState(10);
  const [selectedPackSizes, setSelectedPackSizes] = useState<string[]>(['1L', '4L', '10L', '20L']);
  const [substrate, setSubstrate] = useState('IML (In-Mold Labeling) Food-Grade Polypropylene');
  const [designer, setDesigner] = useState('Siddharth Rao (Lead Art Director)');

  if (!isOpen) return null;

  const handleTogglePackSize = (size: string) => {
    setSelectedPackSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    const newRecord: PackagingDesignRecord = {
      id: `pack-${Date.now()}`,
      skuCode: `PKG-SW-${productName.substring(0, 3).toUpperCase()}-20`,
      productName,
      category,
      tier,
      packSizes: selectedPackSizes.length ? selectedPackSizes : ['20L'],
      finishType,
      eanBarcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      dieLineStatus: 'Print Ready',
      accentColor,
      bucketGradient: gradientChoice,
      designer,
      lastRevision: 'Today',
      printSpecs: {
        substrate,
        colors: 'CMYK + 2 Spot Pantone + High-Precision Screen UV',
        finishing: 'Spot High-Gloss UV on Brand Crest + Scratch-Resistant Matte Base',
      },
      barcodeCompliant: true,
      warrantyYears,
      tagline,
    };

    onCreate(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <i className="fa-solid fa-paint-roller text-lg" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">New Product Packaging & SKU Artwork</h3>
              <p className="text-xs text-slate-300">Design container specifications, die-lines, and barcode metadata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Interactive Live Bucket Preview */}
          <div className="rounded-xl p-4 bg-slate-50 border border-slate-200 flex items-center space-x-6">
            {/* Visual Simulated 3D Bucket */}
            <div className="relative w-28 h-32 flex flex-col items-center justify-end shrink-0">
              {/* Bucket Rim / Lid */}
              <div className="w-24 h-4 bg-slate-300 rounded-t-lg border-t-2 border-x-2 border-slate-400 shadow-sm relative flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-400 rounded-full" />
              </div>
              {/* Bucket Body with Gradient */}
              <div
                className={`w-28 h-26 rounded-b-xl bg-linear-to-b ${gradientChoice} shadow-lg p-2 flex flex-col items-center justify-between text-white relative border-x border-b border-black/20`}
              >
                <div className="text-[7px] font-black tracking-widest uppercase bg-black/30 px-1.5 py-0.5 rounded">
                  SWATCH PAINTS
                </div>
                <div className="text-center px-1">
                  <div className="text-[9px] font-extrabold truncate max-w-[90px] leading-tight">
                    {productName || 'PRODUCT NAME'}
                  </div>
                  <div className="text-[7px] text-white/80 font-medium truncate max-w-[85px]">
                    {tagline || 'Premium Quality'}
                  </div>
                </div>
                <div className="flex items-center justify-between w-full px-1 text-[7px] font-mono text-white/70">
                  <span>{warrantyYears}Y Warranty</span>
                  <span className="font-bold text-white">20L</span>
                </div>
              </div>
            </div>

            {/* Preview Information */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                Live Artwork Preview
              </span>
              <h4 className="text-sm font-bold text-slate-800 mt-1 truncate">
                {productName || 'Specify Product Name Below'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">{tagline}</p>
              <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-600">
                <span>Tier: <strong>{tier}</strong></span>
                <span>•</span>
                <span>Finish: <strong>{finishType}</strong></span>
                <span>•</span>
                <span>EAN: <strong>Compliant</strong></span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title & Grade *</label>
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Ultra Weatherguard RainShield Pro Emulsion"
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 bg-white"
              >
                <option value="Exterior Weatherguard">Exterior Weatherguard</option>
                <option value="Interior Emulsion">Interior Emulsion</option>
                <option value="Rustic Texture">Rustic Texture Finish</option>
                <option value="Waterproofing">Waterproofing Slurry / Matrix</option>
                <option value="Wood & Enamel">Wood & Synthetic Enamels</option>
                <option value="Primers & Putty">Primers, Undercoats & Putty</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Quality Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 bg-white"
              >
                <option value="Ultra Luxury">Ultra Luxury (Gold Badge)</option>
                <option value="Premium">Premium Grade</option>
                <option value="Economy">Economy Value</option>
                <option value="Industrial">Industrial Tough</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Finish Sheen Level</label>
              <select
                value={finishType}
                onChange={(e) => setFinishType(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 bg-white"
              >
                <option value="Velvet Sheen">Velvet Sheen (Soft Glow)</option>
                <option value="Matte Luxury">Matte Luxury (Zero Glare)</option>
                <option value="High Gloss">High Gloss Mirror Finish</option>
                <option value="Rough Granular">Rough Granular Plaster Texture</option>
                <option value="Eggshell">Eggshell Protective Finish</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Warranty Guarantee (Years)</label>
              <input
                type="number"
                min={1}
                max={20}
                value={warrantyYears}
                onChange={(e) => setWarrantyYears(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline / Key Marketing Claim</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. 12-Year Silicon Rain Barrier with Anti-Fungal Guard"
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          {/* Color Gradient Theme for Packaging */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pack Color Palette Theme</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Royal Sky Blue', grad: 'from-sky-600 via-blue-700 to-indigo-900', color: '#0284c7' },
                { label: 'Majestic Purple', grad: 'from-purple-600 via-fuchsia-700 to-indigo-900', color: '#9333ea' },
                { label: 'Earthy Ochre', grad: 'from-amber-600 via-orange-700 to-stone-800', color: '#d97706' },
                { label: 'Hydro Emerald', grad: 'from-emerald-600 via-teal-700 to-stone-900', color: '#059669' },
              ].map((theme) => (
                <button
                  type="button"
                  key={theme.label}
                  onClick={() => {
                    setGradientChoice(theme.grad);
                    setAccentColor(theme.color);
                  }}
                  className={`p-2 rounded-lg border text-left transition flex items-center space-x-2 ${
                    gradientChoice === theme.grad
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="text-[10px] font-semibold text-slate-700 truncate">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Available Pack Sizes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Standard Pack Sizes</label>
            <div className="flex flex-wrap gap-2">
              {['500ml', '1L', '4L', '10L', '20L', '25kg Bucket', '40kg Sack'].map((size) => {
                const isSelected = selectedPackSizes.includes(size);
                return (
                  <button
                    type="button"
                    key={size}
                    onClick={() => handleTogglePackSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Substrate / Container Material</label>
            <input
              type="text"
              value={substrate}
              onChange={(e) => setSubstrate(e.target.value)}
              placeholder="e.g. In-Mold Labeling (IML) on Virgin Polypropylene"
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-indigo-900 rounded-lg shadow-sm transition flex items-center space-x-2"
            >
              <i className="fa-solid fa-palette text-xs" />
              <span>Save & Generate Dieline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
