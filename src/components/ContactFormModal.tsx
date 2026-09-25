import React, { useState } from 'react';
import { Lead } from '../types/erp';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (lead: Lead) => void;
  defaultProductInterest?: string;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitInquiry,
  defaultProductInterest,
}) => {
  const [fullName, setFullName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Jaipur');
  const [category, setCategory] = useState<Lead['type']>('Hardware Dealer');
  const [estimatedBags, setEstimatedBags] = useState(250);
  const [message, setMessage] = useState(
    defaultProductInterest ? `Inquiring about ${defaultProductInterest} pricing and dealership terms.` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const newLead: Lead = {
        id: `inq-${Date.now()}`,
        name: firmName.trim() || `${fullName} Contracting`,
        contactPerson: fullName.trim(),
        phone: phone.trim(),
        city,
        stage: 'Leads',
        value: estimatedBags * 500,
        type: category,
        createdAt: 'Just now (Web Inquiry)',
      };

      onSubmitInquiry(newLead);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-envelope-open-text" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Dealer &amp; Contractor Contact Desk
              </h3>
              <p className="text-[11px] text-slate-500">
                Swatch Paints India Pvt Ltd · Factory #01 (Jaipur)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl">
              <i className="fa-solid fa-check" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Inquiry Received Successfully!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Thank you, {fullName}. Our Rajasthan sales territory officer will contact you within 2 hours.
            </p>
            <span className="inline-block text-[11px] bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full">
              Added to CRM Inbound Leads
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs font-semibold text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-slate-600">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Phone / WhatsApp *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-slate-600">Company / Hardware Store Name</label>
                <input
                  type="text"
                  placeholder="e.g. Singhal Paints & Hardware"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="vikram@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block mb-1 text-slate-600">City / District</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Business Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Lead['type'])}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="Hardware Dealer">Hardware Dealer</option>
                  <option value="Painter Contractor">Painter Contractor</option>
                  <option value="Builder / Infra">Builder / Infra</option>
                  <option value="Retailer">Retail Store</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Estimated Bags Needed</label>
                <input
                  type="number"
                  step="50"
                  min="50"
                  value={estimatedBags}
                  onChange={(e) => setEstimatedBags(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-slate-600">Message / Requirement Details</label>
              <textarea
                rows={2}
                placeholder="Mention specific product formulations (Rustic Royale, Weatherguard, etc.) or distributorship inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/25 active:scale-95 rounded-xl transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane text-[10px]" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
