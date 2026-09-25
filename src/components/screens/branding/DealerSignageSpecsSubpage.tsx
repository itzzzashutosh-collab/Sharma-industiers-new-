import React, { useState } from 'react';
import { SignageSpecRecord } from '../../../types/erp';

interface DealerSignageSpecsSubpageProps {
  signageSpecs: SignageSpecRecord[];
}

export const DealerSignageSpecsSubpage: React.FC<DealerSignageSpecsSubpageProps> = ({
  signageSpecs,
}) => {
  const [selectedWidthFt, setSelectedWidthFt] = useState<number>(15);
  const [selectedHeightFt, setSelectedHeightFt] = useState<number>(4);
  const [selectedType, setSelectedType] = useState<string>('3D Acrylic LED Fascia');

  const sqFt = selectedWidthFt * selectedHeightFt;
  const ratePerSqFt =
    selectedType === '3D Acrylic LED Fascia'
      ? 650
      : selectedType === 'Shopfront Glow Signboard'
      ? 390
      : 550;
  const totalCost = sqFt * ratePerSqFt;
  const brandSubsidy = totalCost * 0.5;
  const dealerShare = totalCost - brandSubsidy;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              Retail Architecture & POSM
            </span>
            <span className="text-xs text-slate-500">• Standardized Shopfront Specifications</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Dealer Store Signage & POSM Engineering Specs
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Standard structural frameworks, Korean/Samsung IP67 LED lighting modules, weather-resistant ACP sheet cladding, and authorized vendor networks for retail storefront fit-outs.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Vendor Blueprint & Dielines (CAD DWG + PDF)')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shrink-0 shadow-sm"
        >
          <i className="fa-solid fa-compass-drafting text-xs text-sky-400" />
          <span>Download CAD Blueprints</span>
        </button>
      </div>

      {/* Interactive Signboard Cost & Co-Op Subsidy Calculator */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
            <i className="fa-solid fa-calculator" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Interactive Storefront Signage Cost & Subsidy Calculator
            </h3>
            <p className="text-[11px] text-slate-500">Instant calculation of Swatch 50% Co-Op subsidy contribution</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Signage Engineering Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
            >
              <option value="3D Acrylic LED Fascia">3D Acrylic LED Fascia (₹650/sq.ft)</option>
              <option value="Shopfront Glow Signboard">Backlit Vinyl Glow Sign (₹390/sq.ft)</option>
              <option value="In-Store Counter Arch">In-Store HDHMR Arch (₹550/sq.ft)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Storefront Width (Feet): {selectedWidthFt} ft
            </label>
            <input
              type="range"
              min={8}
              max={30}
              value={selectedWidthFt}
              onChange={(e) => setSelectedWidthFt(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Storefront Height (Feet): {selectedHeightFt} ft
            </label>
            <input
              type="range"
              min={2}
              max={8}
              value={selectedHeightFt}
              onChange={(e) => setSelectedHeightFt(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Area</span>
            <div className="text-lg font-black text-slate-900">{sqFt} Sq. Feet</div>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Estimated Fabrication</span>
            <div className="text-base font-black text-slate-900">₹{totalCost.toLocaleString('en-IN')}</div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] text-emerald-700 font-bold uppercase">Swatch 50% Co-Op Subsidy</span>
            <div className="text-base font-black text-emerald-800">₹{brandSubsidy.toLocaleString('en-IN')}</div>
          </div>
          <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
            <span className="text-[10px] text-indigo-700 font-bold uppercase">Dealer Net Contribution</span>
            <div className="text-base font-black text-indigo-900">₹{dealerShare.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Standard Specifications Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {signageSpecs.map((spec) => (
          <div
            key={spec.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4 hover:border-blue-300 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{spec.signageType}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                {spec.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Recommended Dimensions:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{spec.recommendedDimensions}</p>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Substrate & Framework:</span>
                <p className="text-slate-700 mt-0.5">{spec.substrateMaterial}</p>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Lighting & Electrical:</span>
                <p className="text-slate-700 mt-0.5">{spec.lightingSpec}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-slate-600">
                <span>Est. Cost: <strong>₹{spec.estimatedFabricationCost.toLocaleString('en-IN')}</strong></span>
                <span className="mx-2">•</span>
                <span className="text-emerald-600 font-bold">{spec.brandCoOpSubsidy}% Subsidy</span>
              </div>
              <span className="text-[11px] text-slate-400">{spec.warrantyPeriod}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-700">Approved Fabrication Vendors:</span>
              <p className="truncate">{spec.sampleApprovedVendors.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
