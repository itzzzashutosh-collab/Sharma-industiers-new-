import React from 'react';
import { QuotationRecord, QuotationTemplate } from '../../../types/erp';
import { INITIAL_QUOTATION_TEMPLATES } from '../../../data/quotationsData';

interface QuotationPreviewDocumentProps {
  quote: QuotationRecord;
  templateId?: string;
  onClose?: () => void;
  onConvertToOrder?: (quote: QuotationRecord) => void;
  onShareWhatsApp?: (quote: QuotationRecord) => void;
  onSendEmail?: (quote: QuotationRecord) => void;
  onChangeTemplate?: (templateId: string) => void;
  onDownloadPdf?: () => void;
  compact?: boolean;
}

export const QuotationPreviewDocument: React.FC<QuotationPreviewDocumentProps> = ({
  quote,
  templateId,
  onConvertToOrder,
  onShareWhatsApp,
  onSendEmail,
  onChangeTemplate,
  onDownloadPdf,
}) => {
  const currentTemplate: QuotationTemplate =
    INITIAL_QUOTATION_TEMPLATES.find((t) => t.id === (templateId || quote.templateId)) ||
    INITIAL_QUOTATION_TEMPLATES[0];

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    if (onShareWhatsApp) {
      onShareWhatsApp(quote);
    } else {
      const text = `Namaste ${quote.customer}, here is your commercial quotation #${quote.quoteNumber} for ₹${quote.totalAmount.toLocaleString('en-IN')} from Swatch Paints. Valid till ${quote.validTill}. Please confirm your order.`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleEmail = () => {
    if (onSendEmail) {
      onSendEmail(quote);
    } else {
      const subject = `Swatch Paints Quotation ${quote.quoteNumber} for ${quote.customer}`;
      const body = `Dear ${quote.customer},\n\nPlease find attached quotation #${quote.quoteNumber} for total amount ₹${quote.totalAmount.toLocaleString('en-IN')}.\n\nRegards,\n${quote.salesperson}\nSwatch Paints Pvt. Ltd.`;
      window.location.href = `mailto:${quote.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Printable Sheet */}
      <div id="quotation-print-area" className="p-6 sm:p-7 relative text-slate-800 bg-white font-sans text-xs flex-1 flex flex-col justify-between">
        {/* Subtle Watermark if enabled */}
        {currentTemplate.watermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <span className="text-8xl font-black rotate-[-25deg] uppercase tracking-widest text-slate-900">
              SWATCH PAINTS
            </span>
          </div>
        )}

        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between pb-5 border-b border-slate-100">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-blue-600 flex items-center justify-center shadow-xs">
                <span className="text-white font-black text-lg tracking-tighter">SP</span>
              </div>
              <div>
                <h2 className="text-base font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  <span>SWATCH PAINTS</span>
                </h2>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                  COLOURS FOR A BRIGHTER INDIA
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  RIICO Industrial Area, Kota, Rajasthan - 324005 • CIN: U24222RJ2022PTC081290
                </p>
              </div>
            </div>

            {/* Document Title & Number */}
            <div className="text-right">
              <span
                className="text-lg font-black tracking-wider uppercase"
                style={{ color: currentTemplate.themeColor || '#2563eb' }}
              >
                QUOTATION
              </span>
              <p className="text-sm font-bold text-slate-800 mt-0.5"># {quote.quoteNumber}</p>
              <div className="flex items-center justify-end gap-1.5 mt-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {currentTemplate.name.split(' ')[0]} Format
                </span>
              </div>
            </div>
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-100 text-[11px]">
            {/* Bill To */}
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">To,</p>
              <p className="font-bold text-slate-900 text-xs">{quote.customer}</p>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{quote.address}</p>
              {quote.gstin && (
                <p className="text-slate-500 font-medium mt-1">
                  <span className="font-semibold text-slate-700">GSTIN:</span> {quote.gstin}
                </p>
              )}
              {quote.phone && (
                <p className="text-slate-500 font-medium">
                  <span className="font-semibold text-slate-700">Phone:</span> {quote.phone}
                </p>
              )}
            </div>

            {/* Quote Details */}
            <div className="text-right space-y-1">
              <p className="text-slate-600">
                <span className="font-semibold text-slate-700">Date:</span> {quote.date}
              </p>
              <p className="text-slate-600">
                <span className="font-semibold text-slate-700">Valid Till:</span>{' '}
                <span className="font-bold text-amber-700">{quote.validTill}</span>
              </p>
              <p className="text-slate-600">
                <span className="font-semibold text-slate-700">Salesperson:</span> {quote.salesperson}
              </p>
              <p className="text-slate-600">
                <span className="font-semibold text-slate-700">Customer Type:</span>{' '}
                <span className="inline-block px-2 py-0.2 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                  {quote.customerType}
                </span>
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="my-4 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-[11px]">
              <thead
                className="text-white text-[10px] uppercase font-bold"
                style={{ backgroundColor: currentTemplate.themeColor || '#1e293b' }}
              >
                <tr>
                  <th className="py-2.5 px-3 w-8 text-center">#</th>
                  <th className="py-2.5 px-3">Product Description</th>
                  <th className="py-2.5 px-3 text-center">Qty ({quote.items[0]?.unit || 'Bags'})</th>
                  <th className="py-2.5 px-3 text-right">Rate (₹)</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {quote.items.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="py-2.5 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900">{item.productName}</span>
                      {item.category && (
                        <span className="ml-2 text-[10px] text-slate-400">({item.category})</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-800">{item.qty}</td>
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

          {/* Subtotals & Grand Total Section */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-slate-800">
                  ₹ {quote.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {quote.discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({quote.discountPercent}%):</span>
                  <span className="font-mono font-bold">
                    - ₹ {quote.discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {quote.gstPercent > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>GST ({quote.gstPercent}%):</span>
                  <span className="font-mono font-bold text-slate-800">
                    ₹ {quote.gstAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t-2 border-slate-900 text-sm font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="font-mono text-base" style={{ color: currentTemplate.themeColor || '#2563eb' }}>
                  ₹ {quote.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions and Signature Row */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-end justify-between gap-4">
            {/* Terms List */}
            <div className="flex-1 text-[10px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                {currentTemplate.termsTitle || 'Terms & Conditions:'}
              </p>
              <ul className="space-y-0.5 list-disc list-inside">
                {(quote.termsAndConditions.length > 0
                  ? quote.termsAndConditions
                  : currentTemplate.terms
                ).map((term, tIdx) => (
                  <li key={tIdx} className="leading-relaxed">
                    {term}
                  </li>
                ))}
              </ul>
            </div>

            {/* Signature Block */}
            <div className="text-center sm:text-right shrink-0 pt-2 sm:pt-0">
              <div className="inline-block border-b border-slate-300 pb-1 px-4 mb-1">
                {/* Clean signature simulation font */}
                <span className="font-serif italic text-base tracking-widest text-slate-800 font-bold block">
                  Ashutosh Sharma
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-800">For Swatch Paints Pvt. Ltd.</p>
              <p className="text-[9px] text-slate-400 font-medium">(Authorised Signatory)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer matching screenshot */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {/* Template Switcher Dropdown */}
          {onChangeTemplate && (
            <select
              value={currentTemplate.id}
              onChange={(e) => onChangeTemplate(e.target.value)}
              className="text-[11px] font-bold bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              title="Change Template Layout"
            >
              {INITIAL_QUOTATION_TEMPLATES.map((tmpl) => (
                <option key={tmpl.id} value={tmpl.id}>
                  📄 {tmpl.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={onDownloadPdf || handlePrint}
            className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
            title="Dynamically format document preview & download PDF"
          >
            <span>📥</span>
            <span>Download PDF</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsApp}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <span>💬</span>
            <span>Send on WhatsApp</span>
          </button>

          <button
            onClick={handleEmail}
            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
          >
            <span>✉️</span>
            <span>Send Email</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
          >
            <span>🖨️</span>
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};
