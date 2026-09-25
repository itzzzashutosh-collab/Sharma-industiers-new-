import React, { useState } from 'react';
import { Invoice, InvoiceItem } from '../../../types/erp';
import { InvoicePreviewDocument } from './InvoicePreviewDocument';

interface CreateInvoiceSubpageProps {
  onSaveInvoice: (newInvoice: Invoice) => void;
  onCancel: () => void;
}

const PRESET_CUSTOMERS = [
  {
    name: 'Marwar Paints & Hardware Mart',
    type: 'Dealer' as const,
    gstin: '08AABCM4591B1Z3',
    phone: '+91 98290 14820',
    email: 'contact@marwarpaints.com',
    billingAddress: 'Shop #14-16, Nehru Hardware Bazar, Jodhpur, Rajasthan - 342001',
    shippingAddress: 'Godown 3, Industrial Area Phase II, Jodhpur, Rajasthan - 342003',
    state: 'Rajasthan',
  },
  {
    name: 'Apex Infra & Builders Consortium',
    type: 'Contractor' as const,
    gstin: '07AAACA9921D1ZO',
    phone: '+91 99100 82711',
    email: 'billing@apexinfra.org',
    billingAddress: 'Corporate Tower B, Okhla Industrial Area Phase III, New Delhi - 110020',
    shippingAddress: 'Apex Smart City Project Site, Sector 82, Gurugram, Haryana - 122004',
    state: 'Delhi',
  },
  {
    name: 'Shree Balaji Color World',
    type: 'Dealer' as const,
    gstin: '08AABCS8891G1ZQ',
    phone: '+91 94140 33819',
    email: 'balajipaints.jaipur@gmail.com',
    billingAddress: 'G-12, Pink City Market, MI Road, Jaipur, Rajasthan - 302001',
    shippingAddress: 'G-12, Pink City Market, MI Road, Jaipur, Rajasthan - 302001',
    state: 'Rajasthan',
  },
  {
    name: 'Udaipur Royale Palace Living',
    type: 'Contractor' as const,
    gstin: '08AABCU7721H1ZQ',
    phone: '+91 98291 00293',
    email: 'accounts@royalepalaceliving.in',
    billingAddress: 'Swaroop Sagar Road, Udaipur, Rajasthan - 313001',
    shippingAddress: 'Villa Project Site 4, Kodiyat Road, Udaipur - 313031',
    state: 'Rajasthan',
  },
];

const PRESET_PRODUCTS = [
  {
    name: 'WeatherShield Max Acrylic Exterior Emulsion (White 20L Bucket)',
    category: 'Exterior Weatherproof',
    hsnCode: '320910',
    unit: 'Buckets',
    unitPrice: 2850,
  },
  {
    name: 'Royal Velvet Silk Interior Luxury Sheen (Base A, 10L)',
    category: 'Emulsion',
    hsnCode: '320910',
    unit: 'Buckets',
    unitPrice: 2200,
  },
  {
    name: 'UltraWhite Premium Polymer Wall Putty (40kg Bag)',
    category: 'Texture / Distemper',
    hsnCode: '321490',
    unit: 'Bags',
    unitPrice: 720,
  },
  {
    name: 'SuperCoat Hydro-Lock Exterior Damp Proof Primer (20kg Bag)',
    category: 'Primer',
    hsnCode: '321490',
    unit: 'Bags',
    unitPrice: 850,
  },
  {
    name: 'Contractor Grade Alkali Resistant Primer (50L Drum)',
    category: 'Primer',
    hsnCode: '320910',
    unit: 'Drums',
    unitPrice: 4200,
  },
];

export const CreateInvoiceSubpage: React.FC<CreateInvoiceSubpageProps> = ({
  onSaveInvoice,
  onCancel,
}) => {
  const [selectedCustomerPreset, setSelectedCustomerPreset] = useState(PRESET_CUSTOMERS[0].name);
  const [customerName, setCustomerName] = useState(PRESET_CUSTOMERS[0].name);
  const [customerType, setCustomerType] = useState<'Dealer' | 'Painter' | 'Contractor' | 'Retailer' | 'Direct'>('Dealer');
  const [gstin, setGstin] = useState(PRESET_CUSTOMERS[0].gstin);
  const [phone, setPhone] = useState(PRESET_CUSTOMERS[0].phone);
  const [email, setEmail] = useState(PRESET_CUSTOMERS[0].email);
  const [billingAddress, setBillingAddress] = useState(PRESET_CUSTOMERS[0].billingAddress);
  const [shippingAddress, setShippingAddress] = useState(PRESET_CUSTOMERS[0].shippingAddress);
  const [isInterState, setIsInterState] = useState(false);

  // Invoice Meta
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-2025-08${Math.floor(92 + Math.random() * 8)}`);
  const [orderNumber, setOrderNumber] = useState(`SO-${Math.floor(1043 + Math.random() * 50)}`);
  const [date, setDate] = useState('12 Aug 2025');
  const [dueDate, setDueDate] = useState('27 Aug 2025');
  const [paymentTerms, setPaymentTerms] = useState('15 Days Net Credit');
  const [salesperson, setSalesperson] = useState('Ramesh Sharma');
  const [generateEwayBill, setGenerateEwayBill] = useState(true);
  const [generateIRN, setGenerateIRN] = useState(true);
  const [notes, setNotes] = useState('Goods dispatched through authorized logistics carrier. 18% GST applicable.');
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Line items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item-1',
      name: 'WeatherShield Max Acrylic Exterior Emulsion (White 20L Bucket)',
      category: 'Exterior Weatherproof',
      hsnCode: '320910',
      qty: 40,
      unit: 'Buckets',
      unitPrice: 2850,
      discountPercent: 10,
      taxableAmount: 102600,
      gstRate: 18,
      total: 121068,
    },
    {
      id: 'item-2',
      name: 'UltraWhite Premium Polymer Wall Putty (40kg Bag)',
      category: 'Texture / Distemper',
      hsnCode: '321490',
      qty: 100,
      unit: 'Bags',
      unitPrice: 720,
      discountPercent: 5,
      taxableAmount: 68400,
      gstRate: 18,
      total: 80712,
    },
  ]);

  const handleCustomerPresetChange = (name: string) => {
    setSelectedCustomerPreset(name);
    const found = PRESET_CUSTOMERS.find((c) => c.name === name);
    if (found) {
      setCustomerName(found.name);
      setCustomerType(found.type);
      setGstin(found.gstin);
      setPhone(found.phone);
      setEmail(found.email);
      setBillingAddress(found.billingAddress);
      setShippingAddress(found.shippingAddress);
      setIsInterState(found.state !== 'Rajasthan');
    }
  };

  const handleAddItem = (presetIndex = 0) => {
    const prod = PRESET_PRODUCTS[presetIndex] || PRESET_PRODUCTS[0];
    const gross = prod.unitPrice * 10;
    const taxable = Math.round(gross * 0.9);
    const gst = Math.round(taxable * 0.18);

    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      name: prod.name,
      category: prod.category,
      hsnCode: prod.hsnCode,
      qty: 10,
      unit: prod.unit,
      unitPrice: prod.unitPrice,
      discountPercent: 10,
      taxableAmount: taxable,
      gstRate: 18,
      total: taxable + gst,
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    const target = { ...newItems[index], [field]: value };

    // recalculate totals
    const qty = Number(target.qty) || 0;
    const price = Number(target.unitPrice) || 0;
    const disc = Number(target.discountPercent) || 0;
    const gross = qty * price;
    const taxable = Math.round(gross * (1 - disc / 100));
    const gst = Math.round(taxable * 0.18);

    target.taxableAmount = taxable;
    target.total = taxable + gst;

    newItems[index] = target;
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Summary calculations
  const totalTaxable = items.reduce((sum, item) => sum + (item.taxableAmount || 0), 0);
  const totalCgst = isInterState ? 0 : Math.round(totalTaxable * 0.09);
  const totalSgst = isInterState ? 0 : Math.round(totalTaxable * 0.09);
  const totalIgst = isInterState ? Math.round(totalTaxable * 0.18) : 0;
  const grandTotal = totalTaxable + totalCgst + totalSgst + totalIgst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const createdInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      orderNumber,
      customer: customerName,
      customerType,
      gstin,
      phone,
      email,
      billingAddress,
      shippingAddress,
      date,
      dueDate,
      paymentTerms,
      salesperson,
      amount: `₹ ${(grandTotal / 100000).toFixed(2)}L`,
      amountRaw: grandTotal,
      taxableAmount: totalTaxable,
      cgstAmount: totalCgst,
      sgstAmount: totalSgst,
      igstAmount: totalIgst,
      status: 'Pending',
      amountPaid: 0,
      balanceDue: grandTotal,
      eWayBillNumber: generateEwayBill ? `2810${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
      irnNumber: generateIRN ? '6b8a21ef45a89019bca012894590124890124809124890124890124890124890' : undefined,
      irnDate: generateIRN ? `${date} 12:00 PM` : undefined,
      irnAcknowledgmentNumber: generateIRN ? '11202508920045' : undefined,
      notes,
      items,
      payments: [],
      history: [
        {
          id: `h-${Date.now()}`,
          time: `${date}, Just now`,
          action: `Invoice ${invoiceNumber} created manually by ${salesperson}`,
          user: salesperson,
        },
      ],
    };

    onSaveInvoice(createdInvoice);
  };

  // Virtual invoice object for live preview
  const previewInvoiceData: Invoice = {
    id: 'preview',
    invoiceNumber,
    orderNumber,
    customer: customerName,
    customerType,
    gstin,
    phone,
    email,
    billingAddress,
    shippingAddress,
    date,
    dueDate,
    paymentTerms,
    salesperson,
    amount: `₹ ${(grandTotal / 100000).toFixed(2)}L`,
    amountRaw: grandTotal,
    taxableAmount: totalTaxable,
    cgstAmount: totalCgst,
    sgstAmount: totalSgst,
    igstAmount: totalIgst,
    status: 'Pending',
    amountPaid: 0,
    balanceDue: grandTotal,
    eWayBillNumber: generateEwayBill ? '2810 4492 8812' : undefined,
    irnNumber: generateIRN ? '6b8a21ef45a89019bca012894590124890124809124890124890124890124890' : undefined,
    items,
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-receipt" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Create B2B GST Tax Invoice</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Issue official GST-compliant tax invoices with automatic HSN (320910/321490), CGST/SGST/IGST breakdown and E-Way Bill generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
              showLivePreview
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <i className="fa-regular fa-eye" />
            <span>{showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${showLivePreview ? 'xl:grid-cols-12' : ''} gap-6 items-start`}>
        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className={`${showLivePreview ? 'xl:col-span-6' : 'max-w-4xl mx-auto'} bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6`}
        >
          {/* Preset Customer Dropdown */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Select Dealer / Customer
              </label>
              <span className="text-[10px] text-slate-500 font-semibold">
                Auto-fills GSTIN &amp; Address
              </span>
            </div>
            <select
              value={selectedCustomerPreset}
              onChange={(e) => handleCustomerPresetChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PRESET_CUSTOMERS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.type} - {c.state})
                </option>
              ))}
            </select>
          </div>

          {/* Customer Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer / Legal Entity</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 font-semibold"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Type</label>
              <select
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value as any)}
                className="w-full p-2 rounded-xl border border-slate-200 font-semibold"
              >
                <option value="Dealer">Authorized Dealer</option>
                <option value="Contractor">Project Contractor</option>
                <option value="Retailer">Retail Counter</option>
                <option value="Painter">Painter Club</option>
                <option value="Direct">Direct Client</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">GSTIN Number</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 font-mono"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Billing Address</label>
              <input
                type="text"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Shipping / Delivery Address</label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          {/* Invoice Parameters */}
          <div className="border-t border-slate-100 pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Invoice Number</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 font-mono font-bold"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Sales Order Ref</label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Billing Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Due Date</label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 font-semibold text-rose-600"
              />
            </div>
          </div>

          {/* Line Items Builder */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Line Items &amp; Products
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAddItem(0)}
                  className="px-2.5 py-1 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                >
                  + Add WeatherShield
                </button>
                <button
                  type="button"
                  onClick={() => handleAddItem(2)}
                  className="px-2.5 py-1 text-[11px] font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                >
                  + Add Putty
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-800 text-[11px]">#{idx + 1}</span>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                      className="flex-1 p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-xs"
                      placeholder="Product Description"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <i className="fa-regular fa-trash-can text-xs" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-[11px]">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">HSN</span>
                      <input
                        type="text"
                        value={item.hsnCode || '320910'}
                        onChange={(e) => handleUpdateItem(idx, 'hsnCode', e.target.value)}
                        className="w-full p-1 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Quantity</span>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleUpdateItem(idx, 'qty', Number(e.target.value))}
                        className="w-full p-1 rounded-lg border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Unit</span>
                      <input
                        type="text"
                        value={item.unit || 'Buckets'}
                        onChange={(e) => handleUpdateItem(idx, 'unit', e.target.value)}
                        className="w-full p-1 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Rate (₹)</span>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(idx, 'unitPrice', Number(e.target.value))}
                        className="w-full p-1 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Disc %</span>
                      <input
                        type="number"
                        value={item.discountPercent || 0}
                        onChange={(e) => handleUpdateItem(idx, 'discountPercent', Number(e.target.value))}
                        className="w-full p-1 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Total (₹)</span>
                      <div className="p-1 font-bold text-slate-900 font-mono">
                        ₹{item.total.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GST Supply Selection */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Tax Type Configuration:</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                <input
                  type="radio"
                  name="gstType"
                  checked={!isInterState}
                  onChange={() => setIsInterState(false)}
                />
                <span>Intra-State (CGST 9% + SGST 9%)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                <input
                  type="radio"
                  name="gstType"
                  checked={isInterState}
                  onChange={() => setIsInterState(true)}
                />
                <span>Inter-State (IGST 18%)</span>
              </label>
            </div>
          </div>

          {/* Compliance Checkboxes */}
          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generateEwayBill}
                onChange={(e) => setGenerateEwayBill(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="font-semibold text-slate-800">
                Auto-generate Government E-Way Bill (Consignment value &gt; ₹50,000)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generateIRN}
                onChange={(e) => setGenerateIRN(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="font-semibold text-slate-800">
                Generate 64-char Hash IRN &amp; Signed QR Code via NIC E-Invoice Portal
              </span>
            </label>
          </div>

          {/* Summary Box */}
          <div className="border-t border-slate-200 pt-4 bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Value:</span>
              <span className="font-mono font-bold text-slate-900">₹{totalTaxable.toLocaleString('en-IN')}</span>
            </div>
            {!isInterState ? (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>CGST (9%):</span>
                  <span className="font-mono font-bold text-slate-900">₹{totalCgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SGST (9%):</span>
                  <span className="font-mono font-bold text-slate-900">₹{totalSgst.toLocaleString('en-IN')}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-slate-600">
                <span>IGST (18%):</span>
                <span className="font-mono font-bold text-slate-900">₹{totalIgst.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="border-t border-slate-300 pt-2 flex justify-between items-baseline text-sm font-black text-slate-900">
              <span>Final Grand Total:</span>
              <span className="text-lg font-mono text-blue-600">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-600/30 transition text-xs flex items-center gap-1.5"
            >
              <i className="fa-solid fa-check text-xs" />
              <span>Save &amp; Issue Tax Invoice</span>
            </button>
          </div>
        </form>

        {/* Live Preview Column if toggled */}
        {showLivePreview && (
          <div className="xl:col-span-6 bg-slate-100 p-4 rounded-2xl border border-slate-200 shadow-inner">
            <div className="text-center mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Live A4 Document Rendering
              </span>
            </div>
            <InvoicePreviewDocument invoice={previewInvoiceData} />
          </div>
        )}
      </div>
    </div>
  );
};
