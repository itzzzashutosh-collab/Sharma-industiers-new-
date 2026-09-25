import React, { useState } from 'react';
import { QuotationRecord, Order } from '../../../types/erp';
import { INITIAL_QUOTATIONS } from '../../../data/quotationsData';
import { QuotationInspectorDrawer } from './QuotationInspectorDrawer';

interface ConvertedOrdersSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
  onOpenCreateQuotation: () => void;
  onConvertToOrder: (order: Order) => void;
}

export const ConvertedOrdersSubpage: React.FC<ConvertedOrdersSubpageProps> = ({
  onNavigateSubpage,
  onOpenCreateQuotation,
  onConvertToOrder,
}) => {
  const [quotes] = useState<QuotationRecord[]>(
    INITIAL_QUOTATIONS.filter((q) => q.status === 'Converted' || q.status === 'Accepted')
  );
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(quotes[0]?.id || '');

  const activeQuote = quotes.find((q) => q.id === selectedQuoteId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
              🛒
            </span>
            <h2 className="text-xl font-black text-slate-900">Converted Quotations to Sales Orders</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Successfully closed bids transformed into production &amp; dispatch sales orders. 46 won quotes this month.
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
                Closed Deals ({quotes.length})
              </h3>
              <span className="text-[11px] text-emerald-600 font-bold">Booked revenue: ₹ 3,21,000</span>
            </div>

            <div className="divide-y divide-slate-100">
              {quotes.map((q) => {
                const isSelected = selectedQuoteId === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuoteId(q.id)}
                    className={`p-4 cursor-pointer transition hover:bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected ? 'bg-purple-50/50 border-l-4 border-l-purple-600' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{q.quoteNumber}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          {q.status}
                        </span>
                        <span className="text-xs text-emerald-600 font-bold">• SO-1021 Generated</span>
                      </div>
                      <p className="font-bold text-slate-800 text-xs mt-1">{q.customer}</p>
                      <p className="text-[11px] text-slate-500">
                        {q.city} • Converted by {q.salesperson}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                      <span className="font-bold font-mono text-slate-900 text-sm">
                        ₹ {q.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-200">
                        Dispatched from Kota
                      </span>
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
