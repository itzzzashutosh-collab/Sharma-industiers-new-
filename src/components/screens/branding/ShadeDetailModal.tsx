import React, { useState } from 'react';
import { ShadeRecord } from '../../../types/erp';

interface ShadeDetailModalProps {
  shade: ShadeRecord | null;
  onClose: () => void;
}

export const ShadeDetailModal: React.FC<ShadeDetailModalProps> = ({ shade, onClose }) => {
  const [selectedRoom, setSelectedRoom] = useState<'living' | 'bedroom' | 'exterior'>('living');
  const [copied, setCopied] = useState(false);

  if (!shade) return null;

  const handleCopyHex = () => {
    navigator.clipboard?.writeText(shade.hexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header with shade swatch banner */}
        <div
          className="p-6 relative text-white transition-colors duration-300"
          style={{ backgroundColor: shade.hexCode }}
        >
          {/* Overlay to ensure readability regardless of light/dark hex */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
          
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono font-black tracking-widest uppercase bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">
                  {shade.shadeCode}
                </span>
                {shade.isTrending && (
                  <span className="text-[10px] font-bold uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                    ★ 2025 Trend
                  </span>
                )}
                <span className="text-[11px] text-white/90">Rank #{shade.popularityRank}</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight mt-1 text-white drop-shadow-sm">
                {shade.shadeName}
              </h2>
              <p className="text-xs text-white/90 font-medium">Family: {shade.family}</p>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Color Values Table */}
          <div className="grid grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center relative group">
              <span className="text-[10px] font-bold text-slate-400 uppercase">HEX Code</span>
              <p className="text-xs font-mono font-bold text-slate-800 mt-0.5">{shade.hexCode}</p>
              <button
                onClick={handleCopyHex}
                className="mt-1 text-[10px] text-indigo-600 font-semibold hover:underline flex items-center justify-center space-x-1 mx-auto"
              >
                <i className={`fa-solid ${copied ? 'fa-check text-emerald-600' : 'fa-copy'}`} />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">RGB Model</span>
              <p className="text-xs font-mono font-bold text-slate-800 mt-0.5 truncate">{shade.rgb}</p>
              <span className="text-[10px] text-slate-500">Screen sRGB</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">CMYK Print</span>
              <p className="text-xs font-mono font-bold text-slate-800 mt-0.5 truncate">{shade.cmyk}</p>
              <span className="text-[10px] text-slate-500">Four-Color Litho</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Reflectance (LRV)</span>
              <p className="text-xs font-mono font-bold text-slate-800 mt-0.5">{shade.lrv}%</p>
              <span className="text-[10px] text-slate-500">{shade.lrv > 50 ? 'High Light' : 'Deep Tone'}</span>
            </div>
          </div>

          {/* Computerized Tinting Machine Formulation */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                <i className="fa-solid fa-flask-vial text-amber-600" />
                <span>Automated Tinting Machine Dispenser Formula</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded">
                Base Required: {shade.tintBase}
              </span>
            </div>
            <p className="text-xs text-amber-950 font-mono bg-white p-2.5 rounded-lg border border-amber-200/80">
              {shade.formulationPerLiter}
            </p>
            <div className="flex items-center justify-between text-[11px] text-amber-800 pt-1">
              <span>Standard Dispense Tolerance: ±0.01ml</span>
              <span>Asian Paints Equiv: Apex Ultima 8214 / Royale Silk</span>
            </div>
          </div>

          {/* Interactive Room Visualizer Simulation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Simulated Room Surface Visualization
              </h4>
              <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setSelectedRoom('living')}
                  className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition ${
                    selectedRoom === 'living' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Living Room
                </button>
                <button
                  onClick={() => setSelectedRoom('bedroom')}
                  className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition ${
                    selectedRoom === 'bedroom' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Master Bedroom
                </button>
                <button
                  onClick={() => setSelectedRoom('exterior')}
                  className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition ${
                    selectedRoom === 'exterior' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Exterior Villa Façade
                </button>
              </div>
            </div>

            {/* Room Canvas Representation */}
            <div className="relative h-44 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
              {/* Wall Backdrop Tinted with Current Shade */}
              <div
                className="absolute inset-0 transition-colors duration-500"
                style={{ backgroundColor: shade.hexCode }}
              />

              {/* Architectural furniture and room overlay */}
              <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 bg-linear-to-t from-black/40 via-transparent to-transparent">
                {/* Floor simulation */}
                <div className="w-full h-12 bg-linear-to-r from-amber-100 via-amber-200 to-amber-100 rounded-t-lg border-t-2 border-stone-300 shadow-lg flex items-center justify-around px-4">
                  {/* Furniture silhouettes */}
                  <div className="w-24 h-7 bg-slate-800/80 rounded-t-md shadow-xs flex items-center justify-center text-[9px] text-white/90 font-medium">
                    {selectedRoom === 'exterior' ? 'Stone Planter' : 'Modern Sofa'}
                  </div>
                  <div className="w-10 h-9 bg-amber-900/80 rounded-t-md shadow-xs flex items-center justify-center text-[8px] text-amber-200">
                    Floor Lamp
                  </div>
                  <div className="w-20 h-6 bg-slate-700/80 rounded-t-md shadow-xs flex items-center justify-center text-[8px] text-white/80">
                    Coffee Table
                  </div>
                </div>

                <div className="absolute top-3 left-4 text-xs font-bold text-white drop-shadow-md bg-black/40 px-2 py-1 rounded backdrop-blur-xs">
                  {selectedRoom === 'living' && 'Accent Wall in Luxury Living Room'}
                  {selectedRoom === 'bedroom' && 'Headboard Feature Wall in Master Suite'}
                  {selectedRoom === 'exterior' && 'Double-Height Villa Weatherguard Façade'}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Recommended architectural application: {shade.recommendedRoom}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Available in all Swatch 1L, 4L, 10L, 20L Base Packs
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Exporting Shade Spec Sheet for ${shade.shadeName} (${shade.shadeCode}) with formulation.`);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition flex items-center space-x-1.5"
            >
              <i className="fa-solid fa-download text-xs" />
              <span>Export Shade Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
