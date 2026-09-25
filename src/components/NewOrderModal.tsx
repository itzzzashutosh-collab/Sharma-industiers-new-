import React, { useState } from 'react';
import { Order, ProductItem } from '../types/erp';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onCreateOrder: (newOrder: Order) => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  products,
  onCreateOrder,
}) => {
  const [customer, setCustomer] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [qty, setQty] = useState(100);
  const [destination, setDestination] = useState('Jaipur, Rajasthan');
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Pending'>('Pending');

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const unitPrice = currentProduct?.unitPrice || 500;
  const rawTotal = qty * unitPrice;
  const formattedAmount =
    rawTotal >= 100000
      ? `₹ ${(rawTotal / 100000).toFixed(2)}L`
      : `₹ ${Math.round(rawTotal / 1000)}K`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim()) return;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SO-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customer.trim(),
      products: currentProduct ? currentProduct.name.replace('Swatch ', '') : 'Rustic Royale',
      qty,
      amount: formattedAmount,
      amountRaw: rawTotal,
      status: 'New',
      date: '12 Aug 2025',
      paymentStatus,
      destination,
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Create New Sales Order</h3>
            <p className="text-xs text-slate-500">Dispatch from Swatch Paints Factory #01 (Jaipur)</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1 text-slate-600">Customer / Dealer Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Maharana Hardware & Paints"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-600">Select Paint SKU</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.unitWeight}) - ₹{p.unitPrice}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-slate-600">Quantity (Bags / Buckets)</label>
              <input
                type="number"
                min="10"
                step="10"
                value={qty}
                onChange={(e) => setQty(Math.max(10, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-600">Destination (Dispatch City)</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Kota, Rajasthan"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-600">Payment Terms</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as 'Paid' | 'Pending')}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              >
                <option value="Pending">Payment Pending (15 Days Credit)</option>
                <option value="Paid">Prepaid / Instant NEFT</option>
              </select>
            </div>
          </div>

          {/* Pricing Summary Box */}
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] text-blue-900 font-bold block">Estimated Order Total</span>
              <span className="text-[10px] text-blue-600 font-medium">
                {qty} bags @ ₹{unitPrice}/bag + GST
              </span>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-blue-700">{formattedAmount}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition"
            >
              Generate Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
