import React, { useState, useEffect } from 'react';
import { Order, Invoice, ProductItem, Lead, ScreenType } from '../types/erp';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  invoices: Invoice[];
  products: ProductItem[];
  leads: Lead[];
  onNavigate: (screen: ScreenType) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  orders,
  invoices,
  products,
  leads,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.products.toLowerCase().includes(q)
  );

  const matchingInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.customer.toLowerCase().includes(q)
  );

  const matchingProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
  );

  const matchingLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.contactPerson.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 px-4 py-3.5 flex items-center gap-3">
          <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders, invoices, products, dealers, leads..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-[10px] font-mono px-2 py-1 rounded bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Quick Shortcuts */}
          {!q && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Navigation
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    onNavigate('sales');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl border border-slate-200/80 hover:bg-blue-50 hover:border-blue-200 text-left transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-chart-line text-blue-600" />
                  <span className="font-semibold text-slate-800">Sales Orders</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('invoices');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl border border-slate-200/80 hover:bg-blue-50 hover:border-blue-200 text-left transition flex items-center gap-2"
                >
                  <i className="fa-regular fa-file-lines text-blue-600" />
                  <span className="font-semibold text-slate-800">Invoices</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('inventory');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl border border-slate-200/80 hover:bg-blue-50 hover:border-blue-200 text-left transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-boxes-stacked text-blue-600" />
                  <span className="font-semibold text-slate-800">Inventory</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('production');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl border border-slate-200/80 hover:bg-blue-50 hover:border-blue-200 text-left transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-industry text-blue-600" />
                  <span className="font-semibold text-slate-800">Factory #01</span>
                </button>
              </div>
            </div>
          )}

          {/* Orders Results */}
          {matchingOrders.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Orders ({matchingOrders.length})
              </p>
              <div className="space-y-1">
                {matchingOrders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => {
                      onNavigate('sales');
                      onClose();
                    }}
                    className="p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-slate-900">{ord.orderNumber}</span>
                      <span className="text-slate-600 font-medium">{ord.customer}</span>
                      <span className="text-slate-400">· {ord.products}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-800">{ord.amount}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Results */}
          {matchingProducts.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Products &amp; Paint SKUs ({matchingProducts.length})
              </p>
              <div className="space-y-1">
                {matchingProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onNavigate('inventory');
                      onClose();
                    }}
                    className="p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <i className={`${p.iconClass} text-slate-500`} />
                      <span className="font-bold text-slate-900">{p.name}</span>
                      <span className="text-slate-400">({p.sku})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-600 font-semibold">{p.bagsAvailable} bags</span>
                      <span className="font-bold text-slate-900">₹{p.unitPrice}/bag</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CRM Leads Results */}
          {matchingLeads.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Dealers &amp; CRM Leads ({matchingLeads.length})
              </p>
              <div className="space-y-1">
                {matchingLeads.map((ld) => (
                  <div
                    key={ld.id}
                    onClick={() => {
                      onNavigate('crm');
                      onClose();
                    }}
                    className="p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{ld.name}</span>
                      <span className="text-slate-400 ml-2 font-medium">
                        {ld.contactPerson} · {ld.city}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                      {ld.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {q &&
            matchingOrders.length === 0 &&
            matchingProducts.length === 0 &&
            matchingInvoices.length === 0 &&
            matchingLeads.length === 0 && (
              <div className="py-8 text-center text-slate-400">
                <i className="fa-solid fa-magnifying-glass text-2xl mb-2 text-slate-300" />
                <p>No results found for &ldquo;{query}&rdquo;</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
