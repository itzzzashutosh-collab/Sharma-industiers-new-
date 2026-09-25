import React, { useState } from 'react';
import { CatalogProduct } from '../../../types/erp';

interface BarcodeQRSubpageProps {
  products: CatalogProduct[];
}

export const BarcodeQRSubpage: React.FC<BarcodeQRSubpageProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct>(products[0]);
  const [batchNo, setBatchNo] = useState('BCH-502');
  const [labelSize, setLabelSize] = useState<'Standard Bucket (100x60mm)' | 'Compact Can (50x30mm)' | 'Pallet Master (A4)'>('Standard Bucket (100x60mm)');
  const [copiesCount, setCopiesCount] = useState<number>(24);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrintLabels = () => {
    showToast(`Print job sent: ${copiesCount} labels for ${selectedProduct.name} (#${batchNo})!`);
    window.print();
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <i className="fa-solid fa-circle-check text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-barcode" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Barcode &amp; GS1 QR Code Label Engine</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate EAN-13 barcodes, GS1 serial QR labels, and factory packaging stickers with MRP, batch and HSN.
          </p>
        </div>

        <button
          onClick={handlePrintLabels}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-print text-xs" />
          <span>Print {copiesCount} Labels</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Label Print Parameters
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Select Paint SKU</label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const found = products.find((p) => p.id === e.target.value);
                if (found) setSelectedProduct(found);
              }}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sku}) - MRP ₹{p.mrp}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Manufacturing Batch #</label>
              <input
                type="text"
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Copies Count</label>
              <input
                type="number"
                value={copiesCount}
                onChange={(e) => setCopiesCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Label Sticker Template</label>
            <select
              value={labelSize}
              onChange={(e) => setLabelSize(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Standard Bucket (100x60mm)">Standard Bucket Sticker (100 x 60 mm)</option>
              <option value="Compact Can (50x30mm)">Compact Can Tag (50 x 30 mm)</option>
              <option value="Pallet Master (A4)">Pallet Master Logistics Label (A4)</option>
            </select>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
            <span className="font-bold text-slate-800 block text-[11px] uppercase">
              Embedded GS1 QR Payload:
            </span>
            <p className="font-mono text-[10px] break-all bg-white p-2 rounded border border-slate-200 text-slate-700">
              (01)8904018291024(10){batchNo}(21){selectedProduct.sku}(17)270810
            </p>
          </div>
        </div>

        {/* Right: High-Fidelity Live Sticker Label Preview */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Sticker Label Live Mockup
            </h3>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {labelSize}
            </span>
          </div>

          {/* Physical Sticker Mockup */}
          <div className="p-6 bg-slate-100 rounded-2xl flex items-center justify-center">
            <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-xl p-5 shadow-lg space-y-3 select-none">
              {/* Top Branding */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-2">
                <div>
                  <h4 className="text-base font-black text-slate-900 tracking-tight leading-none">
                    SWATCH PAINTS
                  </h4>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mt-0.5">
                    Colors for a Brighter India
                  </p>
                </div>
                <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded uppercase">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold mt-1">
                  <span>SKU: <strong className="text-slate-900 font-mono">{selectedProduct.sku}</strong></span>
                  <span>•</span>
                  <span>Net Qty: <strong className="text-slate-900">{selectedProduct.unit}</strong></span>
                  <span>•</span>
                  <span>HSN: <strong className="text-slate-900 font-mono">{selectedProduct.hsnCode}</strong></span>
                </div>
              </div>

              {/* Barcode & QR Code Lockup */}
              <div className="grid grid-cols-2 gap-3 items-center pt-2 border-t border-slate-200">
                {/* 1D EAN-13 Barcode */}
                <div>
                  <div className="h-12 w-full flex items-end justify-between px-1">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 4, 1].map((w, i) => (
                      <div
                        key={i}
                        className="bg-slate-900"
                        style={{ width: `${w * 1.5}px`, height: i % 2 === 0 ? '100%' : '85%' }}
                      />
                    ))}
                  </div>
                  <p className="text-center font-mono text-[9px] font-bold text-slate-800 tracking-widest mt-1">
                    8904018291024
                  </p>
                </div>

                {/* 2D QR Code */}
                <div className="flex items-center justify-end gap-2">
                  <div className="w-14 h-14 border border-slate-300 p-0.5 rounded bg-white">
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="#0f172a">
                      <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                      <rect x="10" y="10" width="15" height="15" fill="#fff" />
                      <rect x="13" y="13" width="9" height="9" fill="#0f172a" />
                      <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                      <rect x="75" y="10" width="15" height="15" fill="#fff" />
                      <rect x="78" y="13" width="9" height="9" fill="#0f172a" />
                      <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                      <rect x="10" y="75" width="15" height="15" fill="#fff" />
                      <rect x="13" y="78" width="9" height="9" fill="#0f172a" />
                      <rect x="35" y="10" width="10" height="10" />
                      <rect x="50" y="10" width="10" height="10" />
                      <rect x="35" y="50" width="10" height="10" />
                      <rect x="65" y="45" width="10" height="10" />
                    </svg>
                  </div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    <span className="font-bold text-slate-900 block">GS1 QR</span>
                    <span>Scan for shade &amp; batch QA</span>
                  </div>
                </div>
              </div>

              {/* Bottom Commercial Details */}
              <div className="border-t border-slate-900 pt-2 flex items-center justify-between text-[11px] font-bold">
                <div>
                  <span className="text-[9px] text-slate-500 block uppercase">Batch No / Mfg</span>
                  <span className="text-slate-900 font-mono">#{batchNo} (Aug 2025)</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 block uppercase">Max Retail Price</span>
                  <span className="text-sm font-black text-slate-900 font-mono">₹ {selectedProduct.mrp}.00</span>
                  <span className="text-[8px] text-slate-400 block font-normal">(Incl. of all taxes)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
