import React, { useState } from 'react';
import { MarketingCampaignRecord } from '../../../types/erp';

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCampaign: (campaign: MarketingCampaignRecord) => void;
}

export const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  onClose,
  onAddCampaign,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MarketingCampaignRecord['category']>('Outdoor / BTL');
  const [budgetAllocated, setBudgetAllocated] = useState('300000');
  const [startDate, setStartDate] = useState('01 Sep 2025');
  const [endDate, setEndDate] = useState('30 Nov 2025');
  const [targetAudience, setTargetAudience] = useState('Painting Contractors & Building Material Dealers');
  const [targetRegion, setTargetRegion] = useState('Hadoti Region (Kota, Bundi, Baran, Jhalawar)');
  const [managerName, setManagerName] = useState('Vikramaditya Rathore');
  const [channels, setChannels] = useState<string[]>([
    'Highway Unipoles',
    'Dealer Glow Signs',
  ]);
  const [channelInput, setChannelInput] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleAddChannel = () => {
    if (channelInput.trim() && !channels.includes(channelInput.trim())) {
      setChannels([...channels, channelInput.trim()]);
      setChannelInput('');
    }
  };

  const handleRemoveChannel = (ch: string) => {
    setChannels(channels.filter((c) => c !== ch));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCampaign: MarketingCampaignRecord = {
      id: `cmp-${Date.now()}`,
      campaignCode: `CMP-2025-${Math.floor(10 + Math.random() * 90)}`,
      title,
      category,
      budgetAllocated: Number(budgetAllocated) || 200000,
      actualSpend: 0,
      startDate,
      endDate,
      status: 'Active',
      channels: channels.length > 0 ? channels : ['Outdoor Billboards', 'Dealer Showrooms'],
      targetAudience,
      targetRegion,
      leadsGenerated: 0,
      ordersAttributed: 0,
      revenueGenerated: 0,
      roiPercentage: 0,
      managerName,
      notes,
    };

    onAddCampaign(newCampaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-lg">
              <i className="fa-solid fa-bullhorn" />
            </span>
            <div>
              <h3 className="text-base font-bold">Launch New Marketing Campaign</h3>
              <p className="text-xs text-pink-100">
                Create strategic multi-channel campaign for Swatch Paints
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Campaign Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Navratri & Diwali Exterior Glow Drive"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Campaign Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500"
              >
                <option value="Outdoor / BTL">Outdoor / BTL (Hoardings, Gantries)</option>
                <option value="Digital & Social">Digital & Social Ads (Google, Meta)</option>
                <option value="Painter Loyalty">Painter Loyalty (Ustaad Club)</option>
                <option value="Dealer Co-Op">Dealer Co-Op (Shopfront Branding)</option>
                <option value="Event / Meet">Event / Meet (Architects, Contractors)</option>
                <option value="Festive Launch">Festive Launch (Special Offers)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Allocated Budget (₹) *</label>
              <input
                type="number"
                required
                min="10000"
                step="5000"
                value={budgetAllocated}
                onChange={(e) => setBudgetAllocated(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono font-bold focus:outline-hidden focus:border-pink-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Start Date</label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">End Date</label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Target Region / Geography</label>
              <input
                type="text"
                value={targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Campaign Manager Lead</label>
              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500"
            />
          </div>

          {/* Channels tag selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Marketing Channels</label>
            <div className="flex flex-wrap gap-1.5">
              {channels.map((ch) => (
                <span
                  key={ch}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-50 border border-pink-200 text-[11px] font-semibold text-pink-700"
                >
                  {ch}
                  <button
                    type="button"
                    onClick={() => handleRemoveChannel(ch)}
                    className="hover:text-pink-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={channelInput}
                onChange={(e) => setChannelInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddChannel();
                  }
                }}
                placeholder="Add channel (e.g. Bus Shelters, Regional Radio, Instagram Reels)..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500"
              />
              <button
                type="button"
                onClick={handleAddChannel}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Strategic Campaign Brief / Objectives</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Key message, product focus, discount coupons, or launch incentives..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-pink-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl shadow-md transition flex items-center space-x-1.5"
            >
              <i className="fa-solid fa-paper-plane text-[11px]" />
              <span>Launch Campaign</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
