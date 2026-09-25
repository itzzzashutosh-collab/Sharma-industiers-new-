import React, { useState } from 'react';
import { QuotationRecord, Order } from '../../../types/erp';
import { INITIAL_QUOTATIONS } from '../../../data/quotationsData';
import { QuotationInspectorDrawer } from './QuotationInspectorDrawer';

interface ExpiredQuotationsSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
  onOpenCreateQuotation: () => void;
  onConvertToOrder: (order: Order) => void;
}

export const ExpiredQuotationsSubpage: React.FC<ExpiredQuotationsSubpageProps> = ({
  onNavigateSubpage,
  onOpenCreateQuotation,
  onConvertToOrder,
}) => {
  const [quotes, setQuotes] = useState<QuotationRecord[]>(
    INITIAL_QUOTATIONS.filter((q) => q.status === 'Expired')
  );
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(quotes[0]?.id || '');

  const activeQuote = quotes.find((q) => q.id === selectedQuoteId);

  const handleRenewQuote = (quote: QuotationRecord) => {
    alert(`Quotation ${quote.quoteNumber} renewed with validity extended by +15 days!`);
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quote.id
          ? { ...q, status: 'Sent', validTill: '28 Aug 2025' }
          : q
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
              ⏰
            </span>
            <h2 className="text-xl font-black text-slate-900">Expired &amp; Lapsed Quotations</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quotations whose validity deadline passed without order booking. 1-click renewal with current factory batch pricing.
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
                Lapsed Proposals ({quotes.length})
              </h3>
              <span className="text-[11px] text-rose-500 font-bold">Lost/Pending: ₹ 1,62,200</span>
            </div>

            <div className="divide-y divide-slate-100">
              {quotes.map((q) => {
                const isSelected = selectedQuoteId === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuoteId(q.id)}
                    className={`p-4 cursor-pointer transition hover:bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected ? 'bg-rose-50/50 border-l-4 border-l-rose-500' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{q.quoteNumber}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Expired
                        </span>
                        <span className="text-xs text-slate-400">• Expired on {q.validTill}</span>
                      </div>
                      <p className="font-bold text-slate-800 text-xs mt-1">{q.customer}</p>
                      <p className="text-[11px] text-slate-500">
                        {q.city} • Originally created by {q.salesperson}
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
                            handleRenewQuote(q);
                          }}
                          className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition shadow-2xs flex items-center gap-1"
                        >
                          <span>🔄</span>
                          <span>Re-Quote / Renew</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
