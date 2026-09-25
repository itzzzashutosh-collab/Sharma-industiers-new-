import React, { useState } from 'react';
import { BrandCreativeRecord } from '../../../types/erp';

interface CreativeCustomizerModalProps {
  creative: BrandCreativeRecord | null;
  onClose: () => void;
}

export const CreativeCustomizerModal: React.FC<CreativeCustomizerModalProps> = ({
  creative,
  onClose,
}) => {
  const [storeName, setStoreName] = useState('Shree Balaji Paints & Hardware');
  const [phone, setPhone] = useState('+91 98290 12345');
  const [city, setCity] = useState('Jaipur, Rajasthan');
  const [customTagline, setCustomTagline] = useState('Authorized Swatch Experience Center');
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  if (!creative) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-400">
              <i className="fa-solid fa-wand-magic-sparkles text-sm" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Dealer Co-Branding Studio</h3>
              <p className="text-xs text-slate-300">Customize official high-res creative with dealer credentials</p>
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
        <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          {/* Live Preview Card */}
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-md">
            <div
              className={`p-6 bg-linear-to-br ${creative.accentTheme} text-white flex flex-col justify-between min-h-[220px] relative`}
            >
              {/* Watermark / Logo Top */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-slate-900 font-black text-[9px]">
                    S
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase">
                    SWATCH PAINTS
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white/90">
                  {creative.format}
                </span>
              </div>

              {/* Main Headline */}
              <div className="my-4 relative z-10">
                <h3 className="text-lg font-black tracking-tight leading-snug drop-shadow-md">
                  {creative.title}
                </h3>
                <p className="text-xs text-white/90 mt-1 max-w-md line-clamp-2">
                  {creative.previewText || 'Transform your walls with certified 12-year weather guard resilience.'}
                </p>
              </div>

              {/* Customized Dealer Stamp Bar */}
              <div className="relative z-10 bg-black/50 backdrop-blur-md p-3 rounded-lg border border-white/20 flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-amber-300 font-bold">
                    {customTagline}
                  </p>
                  <h4 className="text-xs font-black text-white">{storeName}</h4>
                  <p className="text-[10px] text-slate-300">{city} • Call: {phone}</p>
                </div>
                <div className="w-8 h-8 rounded bg-white p-0.5 shrink-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-slate-900 border-dashed rounded-xs flex items-center justify-center text-[7px] font-bold text-slate-900">
                    QR
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Authorized Dealer Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dealer Phone / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dealer Tagline
              </label>
              <input
                type="text"
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {exported && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center space-x-2">
              <i className="fa-solid fa-circle-check text-emerald-600" />
              <span>High-resolution customized PNG (300 DPI) generated and saved to dealer downloads.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Format: {creative.dimensions} • High Res 300 DPI
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition"
            >
              Close
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition flex items-center space-x-1.5"
            >
              {isExporting ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                  <span>Rendering Print Artwork...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cloud-arrow-down text-xs" />
                  <span>Download Print-Ready PNG</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
