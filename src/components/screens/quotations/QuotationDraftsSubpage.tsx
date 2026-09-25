import React, { useState } from 'react';
import { QuotationRecord, Order } from '../../../types/erp';
import { INITIAL_QUOTATIONS } from '../../../data/quotationsData';
import { QuotationInspectorDrawer } from './QuotationInspectorDrawer';

interface QuotationDraftsSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
  onOpenCreateQuotation: () => void;
  onConvertToOrder: (order: Order) => void;
}

export const QuotationDraftsSubpage: React.FC<QuotationDraftsSubpageProps> = ({
  onNavigateSubpage,
  onOpenCreateQuotation,
  onConvertToOrder,
}) => {
  const [quotes, setQuotes] = useState<QuotationRecord[]>(
    INITIAL_QUOTATIONS.filter((q) => q.status === 'Draft')
  );
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(quotes[0]?.id || '');

  const activeQuote = quotes.find((q) => q.id === selectedQuoteId);

  const handleMarkAsSent = (quoteId: string) => {
    setQuotes(quotes.filter((q) => q.id !== quoteId));
    alert('Quotation dispatched and moved to Sent folder!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">
              📝
            </span>
            <h2 className="text-xl font-black text-slate-900">Quotation Drafts &amp; Approvals</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quotes in progress awaiting sales manager sign-off or custom margin authorization before client dispatch.
          </p>
        </div>

        <button
          onClick={onOpenCreateQuotation}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
        >
          <span>+</span>
          <span>Create New Quote</span>
        </button>
      </div>

      <div className={`grid grid-cols-1 ${activeQuote ? 'xl:grid-cols-12 gap-5' : ''}`}>
        <div className={`${activeQuote ? 'xl:col-span-7' : 'col-span-12'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Pending Drafts ({quotes.length})
              </h3>
              <span className="text-[11px] text-slate-400">Total pipeline: ₹ 1,50,000</span>
            </div>

            <div className="divide-y divide-slate-100">
              {quotes.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No draft quotations currently in the queue.
                </div>
              ) : (
                quotes.map((q) => {
                  const isSelected = selectedQuoteId === q.id;
                  return (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuoteId(q.id)}
                      className={`p-4 cursor-pointer transition hover:bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected ? 'bg-blue-50/60 border-l-4 border-l-blue-600' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{q.quoteNumber}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            Draft
                          </span>
                          <span className="text-xs text-slate-400">• {q.customerType}</span>
                        </div>
                        <p className="font-bold text-slate-800 text-xs mt-1">{q.customer}</p>
                        <p className="text-[11px] text-slate-500">
                          {q.city} • By {q.createdBy} on {q.date}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                        <span className="font-bold font-mono text-slate-900 text-sm">
                          ₹ {q.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsSent(q.id);
                            }}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-2xs"
                          >
                            Send Quote ↗
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {activeQuote && (
          <div className="xl:col-span-5 mt-5 xl:mt-0 sticky top-4">
            <QuotationInspectorDrawer
              quote={activeQuote}
              onClose={() => setSelectedQuoteId('')}
              onConvertToOrder={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};
