import React, { useState } from 'react';
import { DealerBrandingRecord } from '../../../types/erp';

interface NewBrandingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBranding: (record: DealerBrandingRecord) => void;
}

export const NewBrandingRequestModal: React.FC<NewBrandingRequestModalProps> = ({
  isOpen,
  onClose,
  onAddBranding,
}) => {
  const [dealerName, setDealerName] = useState('');
  const [dealerCity, setDealerCity] = useState('Kota');
  const [dealerPhone, setDealerPhone] = useState('+91 9');
  const [brandingType, setBrandingType] = useState<DealerBrandingRecord['brandingType']>(
    'Shop Fascia Glow-Sign'
  );
  const [boardDimensions, setBoardDimensions] = useState('24 ft x 4 ft (LED Backlit ACP)');
  const [totalCost, setTotalCost] = useState('36000');
  const [fabricatorVendor, setFabricatorVendor] = useState('Rajasthan Arts & Signage, Kota');

  if (!isOpen) return null;

  const costNum = Number(totalCost) || 0;
  // 50% dealer share, 50% company subsidy (unless tinting machine / wall stencil where subsidy can be 100%)
  const isCompanyFullSubsidy = brandingType === 'Tinting Machine Unit' || brandingType === 'Wall Stencil Paint';
  const calculatedSubsidy = isCompanyFullSubsidy ? costNum : Math.round(costNum / 2);
  const calculatedDealerShare = costNum - calculatedSubsidy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealerName.trim()) return;

    const newRecord: DealerBrandingRecord = {
      id: `brd-${Date.now()}`,
      requestNumber: `BRD-2025-${Math.floor(110 + Math.random() * 890)}`,
      dealerName,
      dealerCity,
      dealerPhone,
      brandingType,
      boardDimensions,
      totalCost: costNum,
      dealerShare: calculatedDealerShare,
      companySubsidy: calculatedSubsidy,
      status: 'Approval Pending',
      fabricatorVendor,
    };

    onAddBranding(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-lg">
              <i className="fa-solid fa-store" />
            </span>
            <div>
              <h3 className="text-base font-bold">New Dealer Branding Application</h3>
              <p className="text-xs text-blue-100">
                Shopfront glow-signboard, counter displays &amp; tinting machine setup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg p-1 rounded-lg hover:bg-white/10 transition"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Authorized Dealer / Shop Name *</label>
            <input
              type="text"
              required
              value={dealerName}
              onChange={(e) => setDealerName(e.target.value)}
              placeholder="e.g. Goyal Hardware & Color Gallery"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Dealer City / District</label>
              <input
                type="text"
                value={dealerCity}
                onChange={(e) => setDealerCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Contact Number</label>
              <input
                type="text"
                value={dealerPhone}
                onChange={(e) => setDealerPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Branding Asset Type</label>
              <select
                value={brandingType}
                onChange={(e) => setBrandingType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
              >
                <option value="Shop Fascia Glow-Sign">Shop Fascia Glow-Sign</option>
                <option value="In-Shop Counter Display">In-Shop Counter Display</option>
                <option value="Tinting Machine Unit">Tinting Machine Unit</option>
                <option value="Wall Stencil Paint">Wall Stencil Paint</option>
                <option value="Canopy / Arch Gate">Canopy / Arch Gate</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Dimensions / Spec</label>
              <input
                type="text"
                value={boardDimensions}
                onChange={(e) => setBoardDimensions(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Total Estimated Cost (₹) *</label>
              <input
                type="number"
                required
                min="2000"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono font-bold focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Approved Signage Fabricator</label>
              <input
                type="text"
                value={fabricatorVendor}
                onChange={(e) => setFabricatorVendor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          {/* Co-Op Subsidy Breakdown Card */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>Manufacturer Subsidy Share:</span>
              <span className="font-bold text-blue-700">₹{calculatedSubsidy.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Dealer Contribution Share:</span>
              <span className="font-bold text-slate-800">₹{calculatedDealerShare.toLocaleString('en-IN')}</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1 border-t border-blue-200/60">
              *Co-op policy: 50% manufacturer subsidy on standard fascia boards after photographic site verification.
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition flex items-center space-x-1.5"
            >
              <i className="fa-solid fa-check text-[11px]" />
              <span>Submit Branding Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
