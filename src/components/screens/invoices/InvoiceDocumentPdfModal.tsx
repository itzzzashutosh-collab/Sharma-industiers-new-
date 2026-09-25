import React, { useState, useEffect } from 'react';
import { Invoice } from '../../../types/erp';
import { InvoicePreviewDocument } from './InvoicePreviewDocument';

interface InvoiceDocumentPdfModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceDocumentPdfModal: React.FC<InvoiceDocumentPdfModalProps> = ({
  invoice,
  isOpen,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrintOrDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      window.print();
    }, 300);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello ${invoice.customer},\n\nPlease find your official Tax Invoice ${invoice.invoiceNumber} for amount ${invoice.amount} from Swatch Paints India Pvt. Ltd.\nDue Date: ${invoice.dueDate}.\n\nThank you for choosing Swatch Paints!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Tax Invoice ${invoice.invoiceNumber} - Swatch Paints India Pvt Ltd`);
    const body = encodeURIComponent(
      `Dear ${invoice.customer},\n\nPlease find attached the GST Tax Invoice ${invoice.invoiceNumber} for your recent order ${invoice.orderNumber}.\n\nTotal Payable: ${invoice.amount}\nDue Date: ${invoice.dueDate}\n\nBank Account for RTGS:\nICICI Bank - Sitapura Branch\nA/c: 001205018492\nIFSC: ICIC0000012\n\nRegards,\nSwatch Paints Accounts Team`
    );
    window.location.href = `mailto:${invoice.email || ''}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      {/* Top Floating App Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        {/* Left: Document Info */}
        <div className="flex items-center space-x-3 truncate">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shrink-0">
            <i className="fa-regular fa-file-lines text-sm" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide truncate">
                {invoice.invoiceNumber}.pdf
              </h2>
              <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                GST TAX INVOICE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {invoice.customer} • {invoice.amount} (Due: {invoice.dueDate})
            </p>
          </div>
        </div>

        {/* Center: Zoom Controls */}
        <div className="hidden md:flex items-center bg-slate-800 border border-slate-700 rounded-lg p-1 text-xs">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
            className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition"
            title="Zoom Out"
          >
            <i className="fa-solid fa-minus text-[10px]" />
          </button>
          <span className="px-2.5 py-1 text-slate-300 font-mono text-[11px] min-w-[50px] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(150, prev + 10))}
            className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition"
            title="Zoom In"
          >
            <i className="fa-solid fa-plus text-[10px]" />
          </button>
          <div className="h-4 w-px bg-slate-700 mx-1" />
          <button
            onClick={() => setZoomLevel(100)}
            className="px-2 py-1 text-slate-400 hover:text-white text-[11px] rounded transition"
          >
            Reset
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* WhatsApp share */}
          <button
            onClick={handleWhatsAppShare}
            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Share via WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-sm" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          {/* Email share */}
          <button
            onClick={handleEmailShare}
            className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Send Email"
          >
            <i className="fa-regular fa-envelope text-xs" />
            <span className="hidden sm:inline">Email</span>
          </button>

          {/* Download / Print PDF Button */}
          <button
            onClick={handlePrintOrDownload}
            disabled={isGenerating}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition"
          >
            {isGenerating ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                <span>Preparing PDF...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-file-arrow-down text-xs" />
                <span>Download / Print PDF</span>
              </>
            )}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close Preview (Esc)"
          >
            <i className="fa-solid fa-xmark text-base" />
          </button>
        </div>
      </div>

      {/* Document View Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-slate-950/60">
        <div
          className="transition-transform duration-150 origin-top shadow-2xl rounded-xl"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <InvoicePreviewDocument invoice={invoice} onDownloadPdf={handlePrintOrDownload} />
        </div>
      </div>
    </div>
  );
};
