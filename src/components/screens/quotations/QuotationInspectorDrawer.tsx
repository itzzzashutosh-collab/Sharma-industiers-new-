import React, { useState } from 'react';
import { QuotationRecord, Order } from '../../../types/erp';
import { QuotationPreviewDocument } from './QuotationPreviewDocument';
import { QuotationDocumentPdfModal } from './QuotationDocumentPdfModal';

interface QuotationInspectorDrawerProps {
  quote: QuotationRecord;
  onClose: () => void;
  onConvertToOrder: (quote: QuotationRecord) => void;
  onUpdateQuoteStatus?: (quoteId: string, newStatus: QuotationRecord['status']) => void;
}

export const QuotationInspectorDrawer: React.FC<QuotationInspectorDrawerProps> = ({
  quote,
  onClose,
  onConvertToOrder,
  onUpdateQuoteStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'Quotation Preview' | 'Details' | 'Timeline' | 'Notes'>('Quotation Preview');
  const [selectedTemplateId, setSelectedTemplateId] = useState(quote.templateId || 'tmpl-modern');
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [notesList, setNotesList] = useState<string[]>(
    quote.notes ? [quote.notes] : ['Special 10% dealer scheme rate applied for Kota counter.']
  );
  const [newNoteInput, setNewNoteInput] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    setNotesList([newNoteInput.trim(), ...notesList]);
    setNewNoteInput('');
  };

  const getStatusBadge = (status: QuotationRecord['status']) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Sent':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Expired':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Converted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full animate-in slide-in-from-right duration-200">
      {/* Top Header matching user's screenshot */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-white">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-base shrink-0">
            📄
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">{quote.quoteNumber}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(quote.status)}`}>
                ● {quote.status}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              {quote.customer} • {quote.customerType} • {quote.city}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Created: {quote.date}, {quote.time || '10:30 AM'} by <span className="font-semibold text-slate-600">{quote.createdBy}</span>
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition"
          title="Close Preview Panel"
        >
          ✕
        </button>
      </div>

      {/* Action Buttons Row matching screenshot */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Convert to Order Button */}
          <div className="inline-flex rounded-xl shadow-xs overflow-hidden">
            <button
              onClick={() => onConvertToOrder(quote)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <span>🛒</span>
              <span>Convert to Order</span>
            </button>
            <button
              onClick={() => onConvertToOrder(quote)}
              className="px-2 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs transition border-l border-emerald-500"
            >
              ▾
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={() => setShowPdfModal(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 rounded-xl shadow-xs transition cursor-pointer"
            title="Dynamically format document preview & download PDF"
          >
            <span>📥</span>
            <span>Download PDF</span>
          </button>

          {/* More Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition shadow-2xs"
            >
              <span>More Actions</span>
              <span className="text-[10px]">▾</span>
            </button>

            {showMoreActions && (
              <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30 text-xs">
                <button
                  onClick={() => {
                    setShowPdfModal(true);
                    setShowMoreActions(false);
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-blue-700 hover:bg-blue-50 font-bold flex items-center gap-2"
                >
                  <span>📥</span> Download PDF Document
                </button>
                <hr className="my-1 border-slate-100" />
                {onUpdateQuoteStatus && (
                  <>
                    <button
                      onClick={() => {
                        onUpdateQuoteStatus(quote.id, 'Accepted');
                        setShowMoreActions(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-emerald-700 hover:bg-emerald-50 font-medium flex items-center gap-2"
                    >
                      <span>✓</span> Mark as Accepted
                    </button>
                    <button
                      onClick={() => {
                        onUpdateQuoteStatus(quote.id, 'Sent');
                        setShowMoreActions(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-blue-700 hover:bg-blue-50 font-medium flex items-center gap-2"
                    >
                      <span>✉️</span> Mark as Sent
                    </button>
                    <button
                      onClick={() => {
                        onUpdateQuoteStatus(quote.id, 'Expired');
                        setShowMoreActions(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-rose-700 hover:bg-rose-50 font-medium flex items-center gap-2"
                    >
                      <span>⏰</span> Mark as Expired
                    </button>
                    <hr className="my-1 border-slate-100" />
                  </>
                )}
                <button
                  onClick={() => {
                    setShowPdfModal(true);
                    setShowMoreActions(false);
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
                >
                  <span>🖨️</span> Print / Save as PDF
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Quotation #${quote.quoteNumber} for ${quote.customer} - ₹${quote.totalAmount}`);
                    alert('Quotation summary copied to clipboard!');
                    setShowMoreActions(false);
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
                >
                  <span>📋</span> Copy Summary
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Share Button */}
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <span>↗</span>
            <span>Share</span>
            <span className="text-[10px]">▾</span>
          </button>

          {showShareMenu && (
            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30 text-xs">
              <button
                onClick={() => {
                  const text = `Namaste ${quote.customer}, here is your quotation #${quote.quoteNumber} from Swatch Paints for ₹${quote.totalAmount.toLocaleString('en-IN')}.`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  setShowShareMenu(false);
                }}
                className="w-full text-left px-3.5 py-1.5 text-emerald-700 hover:bg-emerald-50 font-medium flex items-center gap-2"
              >
                <span>💬</span> WhatsApp Direct
              </button>
              <button
                onClick={() => {
                  window.location.href = `mailto:${quote.email || ''}?subject=Swatch Paints Quote ${quote.quoteNumber}&body=Dear ${quote.customer}, quotation total is ₹${quote.totalAmount.toLocaleString('en-IN')}`;
                  setShowShareMenu(false);
                }}
                className="w-full text-left px-3.5 py-1.5 text-blue-700 hover:bg-blue-50 font-medium flex items-center gap-2"
              >
                <span>✉️</span> Email Client
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Bar matching screenshot */}
      <div className="flex items-center px-4 sm:px-5 border-b border-slate-200 bg-white space-x-6 text-xs font-bold overflow-x-auto">
        {(['Quotation Preview', 'Details', 'Timeline', 'Notes'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 relative whitespace-nowrap transition ${
                isActive ? 'text-blue-600 font-black' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50">
        {activeTab === 'Quotation Preview' && (
          <QuotationPreviewDocument
            quote={quote}
            templateId={selectedTemplateId}
            onConvertToOrder={onConvertToOrder}
            onChangeTemplate={setSelectedTemplateId}
            onDownloadPdf={() => setShowPdfModal(true)}
          />
        )}

        {activeTab === 'Details' && (
          <div className="space-y-4">
            {/* Commercial Summary Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Commercial Financials
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Gross Subtotal</span>
                  <span className="font-bold text-slate-800 font-mono text-sm">
                    ₹ {quote.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Discount Applied</span>
                  <span className="font-bold text-emerald-600 font-mono text-sm">
                    {quote.discountPercent}% (₹ {quote.discountAmount.toLocaleString('en-IN')})
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">GST Tax (18%)</span>
                  <span className="font-bold text-slate-800 font-mono text-sm">
                    ₹ {quote.gstAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100">
                  <span className="text-blue-600 block text-[10px] font-bold">Net Payable Value</span>
                  <span className="font-black text-blue-700 font-mono text-base">
                    ₹ {quote.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Client Record Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Client &amp; Shipping Profile</h4>
              <div className="divide-y divide-slate-100">
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Party Name:</span>
                  <span className="font-semibold text-slate-800">{quote.customer}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Contact Person:</span>
                  <span className="font-semibold text-slate-800">{quote.contactPerson || 'Store Owner'}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Customer Segment:</span>
                  <span className="font-semibold text-slate-800">{quote.customerType}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Contact Phone:</span>
                  <span className="font-semibold text-slate-800 font-mono">{quote.phone}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">City / District:</span>
                  <span className="font-semibold text-slate-800">{quote.city}, Rajasthan</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="font-semibold text-slate-800 text-right max-w-[200px]">{quote.address}</span>
                </div>
              </div>
            </div>

            {/* Line Items List */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Materials Quoted ({quote.items.length} items)
              </h4>
              <div className="divide-y divide-slate-100 text-xs">
                {quote.items.map((item, idx) => (
                  <div key={item.id} className="py-2 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">
                        {idx + 1}. {item.productName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {item.qty} {item.unit} @ ₹{item.rate.toLocaleString('en-IN')}/{item.unit}
                      </p>
                    </div>
                    <span className="font-bold font-mono text-slate-900">
                      ₹ {item.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Timeline' && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Audit &amp; Dispatch History</h4>
            <div className="relative pl-6 space-y-4 border-l-2 border-blue-200">
              {(quote.timeline && quote.timeline.length > 0
                ? quote.timeline
                : [
                    { id: '1', time: `${quote.date}, 10:30 AM`, action: 'Quotation Generated', user: quote.salesperson, notes: 'Created from Master Catalog' },
                    { id: '2', time: `${quote.date}, 10:45 AM`, action: 'Shared via WhatsApp PDF', user: quote.salesperson, notes: 'Sent to client phone number' },
                    { id: '3', time: `${quote.date}, 11:15 AM`, action: 'Quote Opened & Reviewed', user: 'Client Device', notes: 'PDF previewed via secure link' },
                  ]
              ).map((tl, i) => (
                <div key={tl.id || i} className="relative text-xs">
                  <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-200" />
                  <p className="font-bold text-slate-800">{tl.action}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {tl.time} • by <strong className="text-slate-600">{tl.user}</strong>
                  </p>
                  {tl.notes && (
                    <p className="mt-1 p-2 bg-slate-50 rounded-lg text-slate-600 text-[11px] border border-slate-100">
                      {tl.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Notes' && (
          <div className="space-y-4">
            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <label className="block text-xs font-bold text-slate-800">Add Internal Sales Note</label>
              <textarea
                rows={3}
                placeholder="Mention payment agreements, dealer margin requests, follow-up conversation notes..."
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Save Note
                </button>
              </div>
            </form>

            {/* Existing Notes */}
            <div className="space-y-2.5">
              {notesList.map((note, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-700">{quote.salesperson}</span>
                    <span>Recent</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Formatted Document PDF Preview & Download Modal */}
      <QuotationDocumentPdfModal
        quote={quote}
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        initialTemplateId={selectedTemplateId}
        onConvertToOrder={onConvertToOrder}
      />
    </div>
  );
};
