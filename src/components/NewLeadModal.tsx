import React, { useState } from 'react';
import { Lead } from '../types/erp';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateLead: (lead: Lead) => void;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({
  isOpen,
  onClose,
  onCreateLead,
}) => {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Jaipur');
  const [type, setType] = useState<Lead['type']>('Hardware Dealer');
  const [value, setValue] = useState(250000);
  const [stage, setStage] = useState<Lead['stage']>('Leads');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newLead: Lead = {
      id: `ld-${Date.now()}`,
      name: name.trim(),
      contactPerson: contactPerson.trim() || 'Managing Partner',
      phone: phone.trim() || '+91 98290 00000',
      city,
      stage,
      value,
      type,
      createdAt: 'Today',
    };

    onCreateLead(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Add CRM Dealer / Contractor Lead</h3>
            <p className="text-xs text-slate-500">Pipeline acquisition for Rajasthan &amp; North India</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1 text-slate-600">Business / Firm Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Decor Paints & Hardware"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-600">Contact Person</label>
              <input
                type="text"
                placeholder="e.g. Mahendra Bishnoi"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-600">Mobile Phone</label>
              <input
                type="text"
                placeholder="+91 98..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-600">City / District</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-600">Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as Lead['type'])}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              >
                <option value="Hardware Dealer">Hardware Dealer</option>
                <option value="Painter Contractor">Painter Contractor</option>
                <option value="Builder / Infra">Builder / Infra</option>
                <option value="Retailer">Retailer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-600">Initial Pipeline Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as Lead['stage'])}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              >
                <option value="Leads">1. Leads (New)</option>
                <option value="Contacted">2. Contacted</option>
                <option value="Qualified">3. Qualified</option>
                <option value="Quotation">4. Quotation</option>
                <option value="Won">5. Won (Signed)</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-slate-600">Projected Value (₹)</label>
              <input
                type="number"
                step="50000"
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
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
              Add to CRM Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
