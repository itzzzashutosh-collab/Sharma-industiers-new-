import React, { useState, useEffect } from 'react';
import { QuotationRecord, QuotationTemplate } from '../../../types/erp';
import { INITIAL_QUOTATION_TEMPLATES, INITIAL_QUOTATIONS } from '../../../data/quotationsData';

interface QuotationFullModalPreviewProps {
  template: QuotationTemplate;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (templateId: string) => void;
  onSetDefaultTemplate?: (templateId: string) => void;
  isDefault?: boolean;
}

export const QuotationFullModalPreview: React.FC<QuotationFullModalPreviewProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
  onSetDefaultTemplate,
  isDefault = false,
}) => {
  // Current active template inside the modal (can cycle between all templates)
  const [currentTemplateId, setCurrentTemplateId] = useState<string>(template.id);
  // Sample data selection
  const [sampleQuoteIndex, setSampleQuoteIndex] = useState<number>(0);
  // Zoom level: 0.75, 0.9, 1, 1.15, 1.25
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Sync when template prop changes
  useEffect(() => {
    setCurrentTemplateId(template.id);
  }, [template.id]);

  // Keyboard navigation: Escape to close, ArrowLeft / ArrowRight to cycle templates
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNextTemplate();
      } else if (e.key === 'ArrowLeft') {
        handlePrevTemplate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentTemplateId]);

  if (!isOpen) return null;

  const currentTemplate: QuotationTemplate =
    INITIAL_QUOTATION_TEMPLATES.find((t) => t.id === currentTemplateId) || template;

  const currentTemplateIndex = INITIAL_QUOTATION_TEMPLATES.findIndex(
    (t) => t.id === currentTemplate.id
  );

  const sampleQuote: QuotationRecord = INITIAL_QUOTATIONS[sampleQuoteIndex] || INITIAL_QUOTATIONS[0];

  const handleNextTemplate = () => {
    const nextIdx = (currentTemplateIndex + 1) % INITIAL_QUOTATION_TEMPLATES.length;
    setCurrentTemplateId(INITIAL_QUOTATION_TEMPLATES[nextIdx].id);
  };

  const handlePrevTemplate = () => {
    const prevIdx =
      (currentTemplateIndex - 1 + INITIAL_QUOTATION_TEMPLATES.length) %
      INITIAL_QUOTATION_TEMPLATES.length;
    setCurrentTemplateId(INITIAL_QUOTATION_TEMPLATES[prevIdx].id);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Professional PDF Viewer Toolbar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 py-3 shrink-0 flex flex-wrap items-center justify-between gap-3 shadow-lg z-20">
        {/* Left: Template Info & Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={handlePrevTemplate}
              className="w-7 h-7 rounded-lg hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition"
              title="Previous Template (Left Arrow)"
            >
              ←
            </button>
            <span className="text-[11px] font-mono px-2 font-bold text-slate-300">
              {currentTemplateIndex + 1} / {INITIAL_QUOTATION_TEMPLATES.length}
            </span>
            <button
              onClick={handleNextTemplate}
              className="w-7 h-7 rounded-lg hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition"
              title="Next Template (Right Arrow)"
            >
              →
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
                <span>{currentTemplate.name}</span>
              </h2>
              <span
                className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md text-white"
                style={{ backgroundColor: currentTemplate.themeColor }}
              >
                {currentTemplate.badgeText}
              </span>
              {isDefault && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  ★ Default Active
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-md hidden sm:block">
              {currentTemplate.tagline}
            </p>
          </div>
        </div>

        {/* Center: Sample Data & Zoom Controls */}
        <div className="flex items-center gap-3">
          {/* Sample Client Data Switcher */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Data:
            </span>
            <select
              value={sampleQuoteIndex}
              onChange={(e) => setSampleQuoteIndex(Number(e.target.value))}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value={0} className="bg-slate-900 text-white">
                Rajesh Traders (Dealer - ₹1.78L)
              </option>
              <option value={2} className="bg-slate-900 text-white">
                Neeraj Constructions (Contractor - ₹2.45L)
              </option>
              <option value={1} className="bg-slate-900 text-white">
                Om Painters (Painter - ₹38K)
              </option>
              <option value={4} className="bg-slate-900 text-white">
                Modern Builders (Township - ₹3.18L)
              </option>
            </select>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.65, z - 0.1))}
              className="w-7 h-7 rounded-lg hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold transition text-xs"
              title="Zoom Out"
            >
              −
            </button>
            <span className="text-[11px] font-mono font-bold px-2 text-slate-300 min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="w-7 h-7 rounded-lg hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold transition text-xs"
              title="Zoom In"
            >
              +
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="text-[10px] font-semibold px-2 py-1 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition"
              title="Reset Zoom"
            >
              Reset
            </button>
          </div>

          {/* Print / Download Button */}
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition"
            title="Print or Save PDF"
          >
            <span>🖨️</span>
            <span>Print PDF</span>
          </button>
        </div>

        {/* Right: Default Button, "Use Template", Close Button */}
        <div className="flex items-center gap-2">
          {onSetDefaultTemplate && !isDefault && (
            <button
              onClick={() => onSetDefaultTemplate(currentTemplate.id)}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-semibold border border-slate-700 transition"
            >
              <span>★</span>
              <span>Set as Default</span>
            </button>
          )}

          {/* Primary Call-to-Action: Use Template */}
          <button
            onClick={() => onUseTemplate(currentTemplate.id)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-md transition flex items-center gap-2 transform active:scale-95"
          >
            <span>Use Template</span>
            <span className="text-sm font-bold">→</span>
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition"
            title="Close Preview (Esc)"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Template Quick Feature Ribbon */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-6 py-2 shrink-0 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center gap-3 text-[11px]">
          <span className="font-semibold text-slate-300">Format:</span>
          <span className="text-white font-bold">{currentTemplate.category}</span>
          <span>•</span>
          <span className="font-semibold text-slate-300">Best for:</span>
          <span className="text-slate-300 font-medium">{currentTemplate.popularFor}</span>
          <span>•</span>
          <span className="font-semibold text-slate-300">GST Breakdown:</span>
          <span className="text-emerald-400 font-bold">
            {currentTemplate.showGstColumn ? 'Detailed HSN & Tax' : 'All-Inclusive Net'}
          </span>
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">←</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">→</kbd> to cycle
          templates, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">Esc</kbd> to exit
        </div>
      </div>

      {/* Main Viewport: Scrollable workspace with realistic centered A4 page document */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-slate-950/90 custom-scrollbar">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full max-w-[840px] my-2"
        >
          {/* A4 Realistic Document Paper Sheet */}
          <div
            id="quotation-print-area"
            className="bg-white text-slate-900 rounded-sm shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] border border-slate-300 p-8 sm:p-10 relative font-sans text-xs min-h-[1120px] flex flex-col justify-between"
          >
            {/* Subtle Watermark if enabled in template */}
            {currentTemplate.watermark && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
                <span className="text-8xl font-black rotate-[-28deg] uppercase tracking-widest text-slate-900">
                  SWATCH PAINTS
                </span>
              </div>
            )}

            <div>
              {/* TOP HEADER: DYNAMIC BASED ON TEMPLATE LAYOUT */}

              {/* 1. Industrial Bulk Layout */}
              {currentTemplate.headerLayout === 'industrial' ? (
                <div className="border-b-4 border-slate-900 pb-5 mb-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-block bg-orange-600 text-white font-black px-3 py-1 text-[10px] tracking-widest uppercase rounded-sm mb-2">
                        HEAVY INDUSTRIAL BIDS &amp; BULK TOWNSHIP SUPPLY
                      </div>
                      <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <span>SWATCH PAINTS PRIVATE LIMITED</span>
                      </h1>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                        MANUFACTURING FACILITY: RIICO INDUSTRIAL AREA, KOTA, RAJASTHAN
                      </p>
                      <p className="text-[9px] text-slate-500 mt-1">
                        ISO 9001:2015 &amp; IS 15489 COMPLIANT • CIN: U24222RJ2022PTC081290 • GSTIN: 08AAACF7891L1Z4
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="inline-block border-2 border-slate-900 px-3 py-1 font-black text-sm uppercase tracking-wider text-slate-900 bg-slate-50">
                        CONTRACTOR RATE PROPOSAL
                      </span>
                      <p className="text-lg font-black font-mono text-slate-900 mt-1.5">
                        #{sampleQuote.quoteNumber}
                      </p>
                      <p className="text-[11px] text-slate-500 font-semibold">
                        Date: <span className="text-slate-900 font-bold">{sampleQuote.date}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : currentTemplate.headerLayout === 'clean' ? (
                /* 2. Luxury Architectural Clean Layout */
                <div className="border-b border-emerald-900/20 pb-6 mb-6 font-serif">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-[0.3em] font-semibold text-emerald-800 block mb-1">
                        ARCHITECTURAL SPECIFICATION &amp; COMMERCIAL PROPOSAL
                      </span>
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        SWATCH PAINTS LUXURY DIVISION
                      </h1>
                      <p className="text-[10px] font-sans text-slate-500 tracking-wide mt-1">
                        High-Performance Wall Coatings • Anti-Efflorescence Formulations
                      </p>
                    </div>

                    <div className="text-right font-sans">
                      <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
                        PROPOSAL #{sampleQuote.quoteNumber}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Issued: <strong className="text-slate-800">{sampleQuote.date}</strong>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Valid Until:{' '}
                        <strong className="text-emerald-700">{sampleQuote.validTill}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ) : currentTemplate.headerLayout === 'formal' ? (
                /* 3. Formal Government / Tax Layout */
                <div className="border-2 border-slate-900 p-4 mb-5 bg-slate-50/50">
                  <div className="text-center pb-3 border-b border-slate-300">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block">
                      SCHEDULE OF RATES / COMMERCIAL PROFORMA
                    </span>
                    <h1 className="text-xl font-black tracking-tight text-slate-900">
                      SWATCH PAINTS PRIVATE LIMITED
                    </h1>
                    <p className="text-[10px] text-slate-600 font-medium">
                      Registered Office: RIICO Growth Centre, Kota, Rajasthan - 324005 • State Code: 08 (Rajasthan)
                    </p>
                    <p className="text-[9px] text-slate-500">
                      GSTIN: 08AAACF7891L1Z4 • PAN: AAACF7891L • CIN: U24222RJ2022PTC081290
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-[11px]">
                    <div>
                      <span className="font-bold text-slate-700">Document No:</span>{' '}
                      <span className="font-mono font-bold text-slate-900">{sampleQuote.quoteNumber}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Issue Date:</span>{' '}
                      <span className="text-slate-900">{sampleQuote.date}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Validity:</span>{' '}
                      <span className="font-bold text-blue-700">{sampleQuote.validTill}</span>
                    </div>
                  </div>
                </div>
              ) : currentTemplate.headerLayout === 'compact' ? (
                /* 4. WhatsApp / Quick Counter Estimate */
                <div className="border-b-2 border-dashed border-emerald-600 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-sm">
                        SP
                      </div>
                      <div>
                        <h1 className="text-base font-black text-slate-900">SWATCH PAINTS</h1>
                        <p className="text-[10px] text-emerald-700 font-bold uppercase">
                          Quick Counter Estimate / WhatsApp Delivery
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">#{sampleQuote.quoteNumber}</p>
                      <p className="text-[10px] text-slate-500">{sampleQuote.date}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* 5. Modern Standard / Classic Header */
                <div className="flex items-start justify-between pb-6 border-b border-slate-200 mb-5">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm"
                      style={{ backgroundColor: currentTemplate.themeColor }}
                    >
                      SP
                    </div>
                    <div>
                      <h1 className="text-lg font-black tracking-tight text-slate-900">
                        SWATCH PAINTS PRIVATE LIMITED
                      </h1>
                      <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                        COLOURS FOR A BRIGHTER INDIA
                      </p>
                      <p className="text-[9px] text-slate-400 mt-0.5">
                        RIICO Industrial Area, Kota, Rajasthan - 324005 • CIN: U24222RJ2022PTC081290
                      </p>
                      <p className="text-[9px] text-slate-500">
                        GSTIN: 08AAACF7891L1Z4 • info@swatchpaints.com • +91 744 2490123
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className="text-xl font-black tracking-wider uppercase block"
                      style={{ color: currentTemplate.themeColor }}
                    >
                      COMMERCIAL QUOTATION
                    </span>
                    <p className="text-sm font-bold font-mono text-slate-800 mt-0.5">
                      # {sampleQuote.quoteNumber}
                    </p>
                    <div className="mt-1">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {currentTemplate.name.split(' ')[0]} Layout
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* BILLED TO / SHIP TO & QUOTE META ROW */}
              <div className="grid grid-cols-2 gap-6 py-4 border-b border-slate-200 text-[11px] mb-5">
                {/* Party Details */}
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Quotation Prepared For:
                  </p>
                  <p className="font-black text-slate-900 text-sm">{sampleQuote.customer}</p>
                  <p className="text-slate-600 mt-1 leading-relaxed">{sampleQuote.address}</p>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-600">
                    {sampleQuote.contactPerson && (
                      <p>
                        <span className="font-bold text-slate-700">Attn:</span> {sampleQuote.contactPerson}
                      </p>
                    )}
                    {sampleQuote.phone && (
                      <p>
                        <span className="font-bold text-slate-700">Phone:</span> {sampleQuote.phone}
                      </p>
                    )}
                    {sampleQuote.gstin && (
                      <p>
                        <span className="font-bold text-slate-700">GSTIN:</span> {sampleQuote.gstin}
                      </p>
                    )}
                  </div>
                </div>

                {/* Commercial Quotation Meta */}
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Commercial Parameters:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Proposal Date:</span>
                        <span className="font-bold text-slate-900">{sampleQuote.date}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Quote Validity:</span>
                        <span className="font-bold text-amber-700">{sampleQuote.validTill}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Customer Segment:</span>
                        <span className="font-bold text-slate-800">{sampleQuote.customerType}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Sales Officer:</span>
                        <span className="font-bold text-slate-800">{sampleQuote.salesperson}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
                    <span>Dispatch Depot: </span>
                    <strong className="text-slate-700">Kota Central Warehouse (Rajasthan)</strong>
                  </div>
                </div>
              </div>

              {/* Special Template Callout Box (For Dealer Scheme or Contractor Specs) */}
              {currentTemplate.id === 'tmpl-dealer' && (
                <div className="mb-5 p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎁</span>
                    <div>
                      <p className="font-bold">Festive Season Wholesale Slab Applied</p>
                      <p className="text-[10px] text-purple-700">
                        Includes ₹20 Painter QR coupon per bag + 2% prompt cash discount eligibility
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold">
                    Wholesale Slab A
                  </span>
                </div>
              )}

              {currentTemplate.id === 'tmpl-contractor' && (
                <div className="mb-5 p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏗️</span>
                    <div>
                      <p className="font-bold">Palletized Project Site Delivery Terms</p>
                      <p className="text-[10px] text-orange-800">
                        Moisture-proof laminated 40kg packaging with lot quality test certificate
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-orange-600 text-white rounded-lg text-[10px] font-bold">
                    Bulk Truckload Rate
                  </span>
                </div>
              )}

              {/* PRODUCTS TABLE */}
              <div className="overflow-hidden rounded-xl border border-slate-200 mb-5">
                <table className="w-full text-left text-[11px]">
                  <thead
                    className="text-white text-[10px] uppercase font-bold"
                    style={{ backgroundColor: currentTemplate.themeColor || '#1e293b' }}
                  >
                    <tr>
                      <th className="py-2.5 px-3 w-8 text-center">#</th>
                      <th className="py-2.5 px-3">Product Description &amp; Packaging</th>
                      {currentTemplate.showHsn && (
                        <th className="py-2.5 px-3 text-center w-20">HSN/SAC</th>
                      )}
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                      <th className="py-2.5 px-3 text-right">Total Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {sampleQuote.items.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                        <td className="py-2.5 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                        <td className="py-2.5 px-3">
                          <span className="font-bold text-slate-900">{item.productName}</span>
                          {item.category && (
                            <span className="ml-2 text-[10px] text-slate-400">({item.category})</span>
                          )}
                        </td>
                        {currentTemplate.showHsn && (
                          <td className="py-2.5 px-3 text-center font-mono text-[10px] text-slate-500">
                            32149020
                          </td>
                        )}
                        <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                          {item.qty} {item.unit}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-600 font-mono">
                          {item.rate.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900 font-mono">
                          {item.amount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* FINANCIAL TOTALS & TAX BREAKDOWN */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                {/* Bank Details / Tax Proforma info */}
                <div className="w-full sm:w-1/2 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                    Company Bank Account Details:
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Bank Name:</span> HDFC Bank Ltd, Kota
                    Main Branch
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Account Name:</span> Swatch Paints
                    Private Limited
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Current A/C No:</span> 50200088912345
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">RTGS/NEFT IFSC:</span> HDFC0001234
                  </p>
                </div>

                {/* Subtotals & Grand Total */}
                <div className="w-full sm:w-64 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Gross Subtotal:</span>
                    <span className="font-mono font-bold text-slate-800">
                      ₹ {sampleQuote.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {sampleQuote.discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Scheme Discount ({sampleQuote.discountPercent}%):</span>
                      <span className="font-mono font-bold">
                        - ₹ {sampleQuote.discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {sampleQuote.gstPercent > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>GST Tax (18%):</span>
                      <span className="font-mono font-bold text-slate-800">
                        ₹ {sampleQuote.gstAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2.5 border-t-2 border-slate-900 text-sm font-black text-slate-900">
                    <span>Total Amount:</span>
                    <span
                      className="font-mono text-base"
                      style={{ color: currentTemplate.themeColor || '#2563eb' }}
                    >
                      ₹ {sampleQuote.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400 text-right italic">
                    (Inclusive of all taxes &amp; applicable cess)
                  </p>
                </div>
              </div>

              {/* TERMS & CONDITIONS AND OFFICIAL SIGNATURE SEAL */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-end justify-between gap-6">
                {/* Legal Terms List */}
                <div className="flex-1 text-[10px] text-slate-500 space-y-1">
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                    {currentTemplate.termsTitle || 'Terms & Conditions:'}
                  </p>
                  <ul className="space-y-0.5 list-disc list-inside">
                    {currentTemplate.terms.map((term, tIdx) => (
                      <li key={tIdx} className="leading-relaxed">
                        {term}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[9px] text-slate-400 mt-2">
                    Subject to Kota, Rajasthan jurisdiction only.
                  </p>
                </div>

                {/* Digital Authorised Signatory Seal & Signature */}
                <div className="text-center sm:text-right shrink-0">
                  <div className="inline-block relative">
                    {/* Simulated Authentic Company Seal Stamp */}
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-blue-600/40 mx-auto sm:ml-auto flex items-center justify-center p-1 text-[7px] text-blue-700/60 font-black uppercase text-center rotate-[-12deg] mb-1 select-none pointer-events-none">
                      SWATCH PAINTS PVT LTD
                      <br />★ KOTA (RAJ) ★
                      <br />VERIFIED
                    </div>

                    <div className="border-b border-slate-400 pb-0.5 px-6">
                      <span className="font-serif italic text-lg tracking-widest text-slate-900 font-bold block">
                        Ashutosh Sharma
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-900 mt-1">
                      For Swatch Paints Pvt. Ltd.
                    </p>
                    <p className="text-[9px] text-slate-500 font-semibold">(Authorised Signatory)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Stamp */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
              <span>Page 1 of 1 • System-Generated B2B Commercial Proforma</span>
              <span>Swatch Paints ERP v2.4 • Kota, Rajasthan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-3.5 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-white z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            Selected Template:{' '}
            <strong className="text-white font-bold">{currentTemplate.name}</strong>
          </span>
          <span
            className="w-3 h-3 rounded-full border border-white/20"
            style={{ backgroundColor: currentTemplate.themeColor }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition"
          >
            Close Preview
          </button>

          <button
            onClick={() => onUseTemplate(currentTemplate.id)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <span>Use This Template</span>
            <span className="text-base font-bold">→</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
