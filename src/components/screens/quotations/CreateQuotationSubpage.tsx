import React, { useState, useEffect } from 'react';
import { QuotationRecord, QuotationItem } from '../../../types/erp';
import { CATALOG_PRODUCTS, INITIAL_QUOTATION_TEMPLATES, INITIAL_PRICE_LISTS } from '../../../data/quotationsData';

interface CreateQuotationSubpageProps {
  onBack: () => void;
  onSaveQuote: (newQuote: QuotationRecord) => void;
  initialTemplateId?: string;
}

export const CreateQuotationSubpage: React.FC<CreateQuotationSubpageProps> = ({
  onBack,
  onSaveQuote,
  initialTemplateId = 'tmpl-modern',
}) => {
  // Form state
  const [customerName, setCustomerName] = useState('Shree Krishna Paint Store');
  const [customerType, setCustomerType] = useState<QuotationRecord['customerType']>('Dealer');
  const [city, setCity] = useState('Jaipur');
  const [address, setAddress] = useState('Shop 12, Sanganer Market, Jaipur, Rajasthan - 302029');
  const [gstin, setGstin] = useState('08AABCS9876Q1Z2');
  const [phone, setPhone] = useState('+91 98291 55667');
  const [email, setEmail] = useState('shreekrishna.paints@gmail.com');
  const [contactPerson, setContactPerson] = useState('Radheshyam Ji');
  const [salesperson, setSalesperson] = useState('Amit Sharma');
  const [validDays, setValidDays] = useState('15');
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId);
  const [selectedPriceListId, setSelectedPriceListId] = useState('pl-1');

  useEffect(() => {
    if (initialTemplateId) {
      setSelectedTemplateId(initialTemplateId);
    }
  }, [initialTemplateId]);

  // Items state
  const [items, setItems] = useState<QuotationItem[]>([
    {
      id: 'it-1',
      productName: 'Swatch Rustic Royale 25kg',
      category: 'Wall Putty',
      qty: 100,
      unit: 'Bags',
      rate: 430,
      amount: 43000,
    },
    {
      id: 'it-2',
      productName: 'Swatch Shine Emulsion 20L',
      category: 'Emulsion',
      qty: 30,
      unit: 'Buckets',
      rate: 1200,
      amount: 36000,
    },
  ]);

  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [gstPercent, setGstPercent] = useState<number>(18);
  const [customTerms, setCustomTerms] = useState<string>(
    'Prices are valid for 15 days.\n50% advance, balance within 30 days.\nTransportation extra at actuals.\nMaterial subject to factory stock availability.'
  );
  const [internalNotes, setInternalNotes] = useState('Requested priority delivery for shop inauguration.');

  // Selected template
  const currentTemplate =
    INITIAL_QUOTATION_TEMPLATES.find((t) => t.id === selectedTemplateId) ||
    INITIAL_QUOTATION_TEMPLATES[0];

  // Recalculations
  const subtotal = items.reduce((acc, curr) => acc + curr.amount, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const afterDiscount = subtotal - discountAmount;
  const gstAmount = Math.round((afterDiscount * gstPercent) / 100);
  const totalAmount = afterDiscount + gstAmount;

  // Add Item Row
  const handleAddItem = (productName?: string, defaultRate?: number, defaultUnit?: string) => {
    const newItem: QuotationItem = {
      id: `it-${Date.now()}`,
      productName: productName || 'Swatch Super White Putty 40kg',
      category: 'Wall Putty',
      qty: 50,
      unit: defaultUnit || 'Bags',
      rate: defaultRate || 440,
      amount: (defaultRate || 440) * 50,
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof QuotationItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'qty' || field === 'rate') {
            updated.amount = (Number(updated.qty) || 0) * (Number(updated.rate) || 0);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      alert('Quotation must contain at least 1 line item.');
      return;
    }
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSave = (status: QuotationRecord['status']) => {
    if (!customerName.trim()) {
      alert('Please enter a customer name.');
      return;
    }

    const today = new Date();
    const validDate = new Date();
    validDate.setDate(today.getDate() + (Number(validDays) || 15));

    const newQuote: QuotationRecord = {
      id: `qt-${Date.now()}`,
      quoteNumber: `QT-${Math.floor(233 + Math.random() * 50)}`,
      date: '12 Aug 2025',
      time: '12:00 PM',
      customer: customerName,
      customerType,
      city,
      address,
      gstin,
      phone,
      email,
      contactPerson,
      items,
      subtotal,
      discountPercent,
      discountAmount,
      gstPercent,
      gstAmount,
      totalAmount,
      status,
      validTill: validDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdBy: salesperson.split(' ')[0],
      salesperson,
      termsAndConditions: customTerms.split('\n').filter((t) => t.trim().length > 0),
      templateId: selectedTemplateId,
      notes: internalNotes,
    };

    onSaveQuote(newQuote);
    alert(`Quotation ${newQuote.quoteNumber} successfully saved with status: ${status}!`);
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
          >
            ←
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-blue-600">Create New Quotation</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                QT-233
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Configure dealer margins, select product line items, choose template and preview instantly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave('Draft')}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition shadow-2xs"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave('Sent')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <span>✉️</span>
            <span>Save &amp; Generate Quote</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Client & commercial terms */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>👤</span> Customer &amp; Billing Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer / Store Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Segment</label>
                <select
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="Dealer">Dealer (Authorized Hardware / Paint Store)</option>
                  <option value="Painter">Painter (Master Applicator)</option>
                  <option value="Contractor">Contractor (Institutional Builder)</option>
                  <option value="Retailer">Retailer (Local Counter)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">City / District</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="08AAAAA0000A1Z5"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none uppercase"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Delivery / Billing Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Template & Price List Settings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>🎨</span> Template &amp; Price List Selection
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quotation Template Design</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-semibold text-slate-800"
                >
                  {INITIAL_QUOTATION_TEMPLATES.map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      {tmpl.name} ({tmpl.badgeText})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1">{currentTemplate.tagline}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Applicable Rate Card</label>
                <select
                  value={selectedPriceListId}
                  onChange={(e) => setSelectedPriceListId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none font-semibold text-slate-800"
                >
                  {INITIAL_PRICE_LISTS.map((pl) => (
                    <option key={pl.id} value={pl.id}>
                      {pl.name} (-{pl.discountFromMrp}% MRP)
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1">Automatic wholesale rate computation enabled</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Sales Officer</label>
                <select
                  value={salesperson}
                  onChange={(e) => setSalesperson(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="Amit Sharma">Amit Sharma (Kota Zone)</option>
                  <option value="Suresh Sharma">Suresh Sharma (Bundi/Tonk)</option>
                  <option value="Ramesh Meena">Ramesh Meena (Jaipur Area)</option>
                  <option value="Neha Gupta">Neha Gupta (Institutional)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quote Validity Period</label>
                <select
                  value={validDays}
                  onChange={(e) => setValidDays(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="7">7 Days (Short estimate)</option>
                  <option value="15">15 Days (Standard commercial)</option>
                  <option value="30">30 Days (Institutional project)</option>
                  <option value="45">45 Days (Tender period)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 3: Line Items */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>📦</span> Line Items ({items.length})
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddItem()}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <span>+</span> Add Custom Line
                </button>
              </div>
            </div>

            {/* Quick Catalog Adder Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
              <span className="text-[11px] font-semibold text-slate-400">Quick add:</span>
              {CATALOG_PRODUCTS.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleAddItem(p.name, p.defaultRate, p.unit)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                >
                  <span>+</span> {p.name} (₹{p.defaultRate})
                </button>
              ))}
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Product Description</th>
                    <th className="py-2.5 px-3 w-24">Qty</th>
                    <th className="py-2.5 px-3 w-24">Unit</th>
                    <th className="py-2.5 px-3 w-28 text-right">Rate (₹)</th>
                    <th className="py-2.5 px-3 w-32 text-right">Amount (₹)</th>
                    <th className="py-2.5 px-2 w-10 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.productName}
                          onChange={(e) => handleUpdateItem(item.id, 'productName', e.target.value)}
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleUpdateItem(item.id, 'qty', Number(e.target.value))}
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <select
                          value={item.unit}
                          onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value)}
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center focus:outline-none"
                        >
                          <option value="Bags">Bags</option>
                          <option value="Buckets">Buckets</option>
                          <option value="Ltr">Ltr</option>
                          <option value="Kg">Kg</option>
                        </select>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => handleUpdateItem(item.id, 'rate', Number(e.target.value))}
                          className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-mono font-bold focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-right font-bold font-mono text-slate-900">
                        ₹ {item.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 font-bold text-base transition"
                          title="Delete row"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 4: Terms & Conditions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>📜</span> Terms &amp; Conditions &amp; Notes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Terms &amp; Conditions (One per line)
                </label>
                <textarea
                  rows={4}
                  value={customTerms}
                  onChange={(e) => setCustomTerms(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Internal Sales Remarks</label>
                <textarea
                  rows={4}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Confidential margin note, delivery priority..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Panel: 4 cols */}
        <div className="lg:col-span-4 space-y-5">
          {/* Commercial Calculation Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 sticky top-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Quotation Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Gross Subtotal</span>
                <span className="font-mono font-bold text-slate-900">
                  ₹ {subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Discount Selector */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Scheme Discount:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      className="w-14 p-1 bg-white border border-slate-300 rounded-lg text-right font-bold focus:outline-none"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Rebate Deducted</span>
                  <span className="font-mono">- ₹ {discountAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* GST */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">GST Slab:</span>
                  <select
                    value={gstPercent}
                    onChange={(e) => setGstPercent(Number(e.target.value))}
                    className="p-1 bg-white border border-slate-300 rounded-lg font-bold focus:outline-none"
                  >
                    <option value="18">18% (Standard GST)</option>
                    <option value="12">12% (Concessional)</option>
                    <option value="0">0% (Exempt)</option>
                  </select>
                </div>
                <div className="flex justify-between text-slate-700 font-bold">
                  <span>Tax Amount</span>
                  <span className="font-mono">₹ {gstAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-center">
                <span className="text-sm font-black text-slate-900">Total Quote Value</span>
                <span className="text-xl font-black text-blue-600 font-mono">
                  ₹ {totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => handleSave('Sent')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-2"
              >
                <span>🚀</span>
                <span>Generate &amp; Dispatch Quote</span>
              </button>
              <button
                type="button"
                onClick={() => handleSave('Draft')}
                className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
