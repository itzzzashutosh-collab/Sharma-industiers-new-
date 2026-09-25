import React, { useState } from 'react';
import { Order, ProductItem } from '../../../types/erp';

interface NewOrderSubpageProps {
  products: ProductItem[];
  onCreateOrder: (order: Order) => void;
  onNavigateSubpage: (subpage: string) => void;
}

interface OrderLineItem {
  id: string;
  name: string;
  category: string;
  qty: number;
  rate: number;
  weightPerBagKg: number;
  icon: string;
}

const PRESET_CUSTOMERS = [
  {
    name: 'Rajesh Traders',
    contactPerson: 'Rakesh Jain',
    phone: '+91 98765 43210',
    type: 'Dealer' as const,
    city: 'Kota',
    address: 'Shop 14, Grain Market Rd, Kota, Rajasthan',
    creditLimit: 500000,
    outstanding: 185000,
    gstin: '08AABCR1234F1Z5',
  },
  {
    name: 'Om Painters & Decors',
    contactPerson: 'Suresh Verma',
    phone: '+91 98292 44556',
    type: 'Painter' as const,
    city: 'Bundi',
    address: 'Bundi Main Bazar, Opp. Kotwali, Bundi',
    creditLimit: 150000,
    outstanding: 42000,
    gstin: '08BBNOP9876E1Z2',
  },
  {
    name: 'Neeraj Construction Infrastructure',
    contactPerson: 'Neeraj Sharma',
    phone: '+91 94140 11992',
    type: 'Contractor' as const,
    city: 'Jaipur',
    address: 'Plot 45, Mansarovar Industrial Area, Jaipur',
    creditLimit: 800000,
    outstanding: 230000,
    gstin: '08CCNEJ5544K1ZX',
  },
  {
    name: 'Kota Distributors Private Ltd',
    contactPerson: 'Vikram Singh',
    phone: '+91 98290 77112',
    type: 'Dealer' as const,
    city: 'Kota',
    address: 'Transport Nagar, Plot 18, Kota',
    creditLimit: 600000,
    outstanding: 88000,
    gstin: '08DDKOT8832L1Z9',
  },
  {
    name: 'Mewar Paint Mart',
    contactPerson: 'Karan Dave',
    phone: '+91 94141 33221',
    type: 'Dealer' as const,
    city: 'Udaipur',
    address: 'Surajpole Circle, Udaipur, Rajasthan',
    creditLimit: 450000,
    outstanding: 110000,
    gstin: '08EEMEW3391M1Z4',
  },
  {
    name: 'Hadoti Hardware & Putty Store',
    contactPerson: 'Deepak Meena',
    phone: '+91 97840 99881',
    type: 'Retailer' as const,
    city: 'Bundi',
    address: 'Station Road, Bundi Rural, Rajasthan',
    creditLimit: 200000,
    outstanding: 18000,
    gstin: '08FFHAD1123P1Z1',
  },
];

const SWATCH_PRODUCTS_CATALOG: OrderLineItem[] = [
  {
    id: 'p1',
    name: 'Swatch Super White Cement (50kg)',
    category: 'Cement',
    qty: 150,
    rate: 430,
    weightPerBagKg: 50,
    icon: 'fa-solid fa-fill-drip',
  },
  {
    id: 'p2',
    name: 'Swatch Acrylic Wall Putty (40kg)',
    category: 'Putty',
    qty: 100,
    rate: 380,
    weightPerBagKg: 40,
    icon: 'fa-solid fa-paint-roller',
  },
  {
    id: 'p3',
    name: 'Swatch Waterproof Polymer Putty (30kg)',
    category: 'Putty',
    qty: 50,
    rate: 480,
    weightPerBagKg: 30,
    icon: 'fa-solid fa-shield-halved',
  },
  {
    id: 'p4',
    name: 'Swatch Exterior Wall Primer (20L)',
    category: 'Primer',
    qty: 25,
    rate: 440,
    weightPerBagKg: 20,
    icon: 'fa-solid fa-brush',
  },
  {
    id: 'p5',
    name: 'Swatch Rustic Royale Texture (25kg)',
    category: 'Texture',
    qty: 40,
    rate: 430,
    weightPerBagKg: 25,
    icon: 'fa-solid fa-palette',
  },
  {
    id: 'p6',
    name: 'Swatch Eco Distemper Brilliant White (20kg)',
    category: 'Distemper',
    qty: 30,
    rate: 290,
    weightPerBagKg: 20,
    icon: 'fa-solid fa-bucket',
  },
];

export const NewOrderSubpage: React.FC<NewOrderSubpageProps> = ({
  products,
  onCreateOrder,
  onNavigateSubpage,
}) => {
  // Customer selection
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(0);
  const [isCustomCustomer, setIsCustomCustomer] = useState(false);
  const [customCustomerName, setCustomCustomerName] = useState('');
  const [customContactPerson, setCustomContactPerson] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [customCity, setCustomCity] = useState('Kota');
  const [customAddress, setCustomAddress] = useState('');
  const [customerType, setCustomerType] = useState<'Dealer' | 'Painter' | 'Contractor' | 'Retailer'>('Dealer');

  // Order logistics
  const [warehouseSource, setWarehouseSource] = useState('Bundi Central Plant #1 (Factory Bay 01)');
  const [targetDeliveryDate, setTargetDeliveryDate] = useState('16 Aug 2025');
  const [transportMode, setTransportMode] = useState('Company Truck Fleet (RJ-20)');
  const [salesperson, setSalesperson] = useState('Ramesh Meena');
  const [priority, setPriority] = useState<'Normal' | 'High' | 'Express Urgent'>('Normal');
  const [paymentTerms, setPaymentTerms] = useState('50% Advance, 50% on Delivery');
  const [discountPercent, setDiscountPercent] = useState<number>(5);
  const [freightCharges, setFreightCharges] = useState<number>(0);
  const [deliveryRemarks, setDeliveryRemarks] = useState('Verify bag sealing at unloading bay. Stack max 8 bags high.');

  // Items in current order builder
  const [lineItems, setLineItems] = useState<OrderLineItem[]>([
    { ...SWATCH_PRODUCTS_CATALOG[0], qty: 200 },
    { ...SWATCH_PRODUCTS_CATALOG[1], qty: 100 },
  ]);

  // Selected SKU to add
  const [selectedCatalogSkuId, setSelectedCatalogSkuId] = useState(SWATCH_PRODUCTS_CATALOG[2].id);
  const [addQty, setAddQty] = useState(50);

  // Form submission feedback
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string | null>(null);

  // Active customer object
  const activeCustomer = isCustomCustomer
    ? {
        name: customCustomerName || 'New Wholesale Dealer',
        contactPerson: customContactPerson || 'Store Manager',
        phone: customPhone || '+91 98765 00000',
        type: customerType,
        city: customCity,
        address: customAddress || 'Rajasthan, India',
        creditLimit: 300000,
        outstanding: 0,
        gstin: '08AABCS9999P1Z8',
      }
    : PRESET_CUSTOMERS[selectedCustomerIndex];

  // Computations
  const totalBags = lineItems.reduce((acc, item) => acc + item.qty, 0);
  const totalWeightKg = lineItems.reduce((acc, item) => acc + item.qty * item.weightPerBagKg, 0);
  const totalMetricTons = (totalWeightKg / 1000).toFixed(1);

  const subtotal = lineItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = subtotal - discountAmount + freightCharges;
  const gstRate = 0.18; // 18% standard for paints and putty
  const cgstAmount = Math.round((taxableAmount * gstRate) / 2);
  const sgstAmount = cgstAmount;
  const totalTax = cgstAmount + sgstAmount;
  const grandTotal = taxableAmount + totalTax;

  // Add Item to Line items
  const handleAddLineItem = () => {
    const catalogItem = SWATCH_PRODUCTS_CATALOG.find((p) => p.id === selectedCatalogSkuId);
    if (!catalogItem) return;

    const existingIndex = lineItems.findIndex((item) => item.name === catalogItem.name);
    if (existingIndex >= 0) {
      const updated = [...lineItems];
      updated[existingIndex].qty += addQty;
      setLineItems(updated);
    } else {
      setLineItems([...lineItems, { ...catalogItem, qty: addQty }]);
    }
  };

  const handleUpdateItemQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setLineItems(lineItems.filter((_, idx) => idx !== index));
    } else {
      const updated = [...lineItems];
      updated[index].qty = newQty;
      setLineItems(updated);
    }
  };

  const handleRemoveItem = (index: number) => {
    setLineItems(lineItems.filter((_, idx) => idx !== index));
  };

  // Submit Order
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (lineItems.length === 0) {
      alert('Please add at least one product line item to the order.');
      return;
    }

    const newOrderNumber = `SO-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      customer: activeCustomer.name,
      contactPerson: activeCustomer.contactPerson,
      initials: activeCustomer.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase(),
      initialsBg: 'bg-blue-100 text-blue-700',
      customerType: activeCustomer.type,
      location: activeCustomer.city,
      destination: `${activeCustomer.city}, Rajasthan`,
      products: lineItems[0].name.replace('Swatch ', ''),
      productsExtraCount: lineItems.length > 1 ? lineItems.length - 1 : 0,
      qty: totalBags,
      amount: `₹ ${grandTotal.toLocaleString('en-IN')}`,
      amountRaw: grandTotal,
      status: 'Processing',
      date: '12 Aug 2025',
      orderTime: '12 Aug 2025, Just now',
      expectedDelivery: targetDeliveryDate,
      salesperson,
      paymentStatus: paymentTerms.includes('100% Advance')
        ? 'Paid'
        : paymentTerms.includes('50%')
        ? 'Advance'
        : 'Credit',
      paymentSub: paymentTerms.includes('50%') ? '50% paid' : 'Terms logged',
      phone: activeCustomer.phone,
      paymentTerms,
      items: lineItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        rate: item.rate,
        total: item.qty * item.rate,
        icon: item.icon,
      })),
      subtotal,
      discountPercent,
      discountAmount,
      taxGst: totalTax,
      finalTotal: grandTotal,
    };

    onCreateOrder(newOrder);
    setCreatedOrderNumber(newOrderNumber);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
              Order Builder Studio
            </span>
            <span className="text-xs text-slate-400">• Bundi Central Plant</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            New Sales Order (SO) Creation
          </h2>
          <p className="text-xs text-slate-500">
            Generate formal Sales Orders with automated GST breakdown, dealer volume schemes &amp; factory bay reservation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateSubpage('Order Management')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Back to Orders List</span>
          </button>
          <button
            onClick={() => onNavigateSubpage('Order Approvals')}
            className="px-3.5 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200/60 transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-clipboard-check text-xs" />
            <span>Review Pending Approvals</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {createdOrderNumber && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
              <i className="fa-solid fa-check" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm">
                Sales Order #{createdOrderNumber} Created Successfully!
              </h3>
              <p className="text-xs text-emerald-700">
                Order for {activeCustomer.name} ({totalBags} bags, ₹{grandTotal.toLocaleString('en-IN')}) has been added to production pipeline &amp; invoice generated.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateSubpage('Order Management')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              View in Orders List
            </button>
            <button
              onClick={() => {
                setCreatedOrderNumber(null);
                setLineItems([{ ...SWATCH_PRODUCTS_CATALOG[0], qty: 150 }]);
              }}
              className="px-3 py-1.5 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-xl border border-slate-200 transition"
            >
              Create Another Order
            </button>
          </div>
        </div>
      )}

      {/* Form & Live Proforma split layout */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Side: Order Builder Form (7 cols) */}
        <div className="xl:col-span-7 space-y-4">
          {/* Section 1: Customer & Dealer Profile */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Dealer / Customer Profile
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomCustomer(!isCustomCustomer)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                {isCustomCustomer ? '← Choose Existing Dealer' : '+ Add Walk-in / New Customer'}
              </button>
            </div>

            {!isCustomCustomer ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Select Registered Swatch Dealer / Contractor:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_CUSTOMERS.map((cust, idx) => (
                    <div
                      key={cust.name}
                      onClick={() => setSelectedCustomerIndex(idx)}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        selectedCustomerIndex === idx
                          ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-xs text-slate-900 block truncate">
                          {cust.name}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {cust.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <i className="fa-solid fa-location-dot text-[9px] text-slate-400" />
                        <span>{cust.city}</span>
                        <span className="text-slate-300">•</span>
                        <span>{cust.phone}</span>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Credit Limit: ₹{(cust.creditLimit / 1000).toFixed(0)}k</span>
                        <span className="font-bold text-emerald-600">
                          Avail: ₹{((cust.creditLimit - cust.outstanding) / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={customCustomerName}
                    onChange={(e) => setCustomCustomerName(e.target.value)}
                    placeholder="e.g. Bundi Shiv Paint Depot"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={customContactPerson}
                    onChange={(e) => setCustomContactPerson(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="+91 98290 XXXXX"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">City / Region *</label>
                  <select
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  >
                    <option>Kota</option>
                    <option>Bundi</option>
                    <option>Jaipur</option>
                    <option>Udaipur</option>
                    <option>Baran</option>
                    <option>Jhalawar</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Delivery Street Address</label>
                  <input
                    type="text"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                    placeholder="Shop #, Street / Road, Market area"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Product Line Items Builder */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Products &amp; Bag Quantity
                </h3>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {totalBags} Bags • {totalMetricTons} MT
              </span>
            </div>

            {/* Quick Add Bar */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <div className="sm:col-span-7">
                <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Select Swatch SKU</label>
                <select
                  value={selectedCatalogSkuId}
                  onChange={(e) => setSelectedCatalogSkuId(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                >
                  {SWATCH_PRODUCTS_CATALOG.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} — ₹{prod.rate}/unit
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Quantity (Bags)</label>
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={addQty}
                  onChange={(e) => setAddQty(Math.max(5, parseInt(e.target.value) || 5))}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="button"
                  onClick={handleAddLineItem}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition shadow-2xs mt-auto cursor-pointer flex items-center justify-center gap-1"
                >
                  <i className="fa-solid fa-plus text-[10px]" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Current Line Items Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-2 text-center">Bags</th>
                    <th className="py-2.5 px-2 text-right">Unit Rate</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                    <th className="py-2.5 px-2 text-center w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lineItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <i className={`${item.icon} text-blue-600 text-xs`} />
                          <span className="font-semibold text-slate-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleUpdateItemQty(idx, item.qty - 25)}
                            className="px-2 py-0.5 text-slate-500 hover:bg-slate-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-slate-900">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateItemQty(idx, item.qty + 25)}
                            className="px-2 py-0.5 text-slate-500 hover:bg-slate-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right text-slate-600">₹{item.rate}</td>
                      <td className="py-2 px-3 text-right font-extrabold text-slate-900">
                        ₹{(item.qty * item.rate).toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition"
                        >
                          <i className="fa-solid fa-trash-can text-xs" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Delivery, Dispatch & Terms */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Logistics &amp; Commercial Terms
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Dispatch Origin</label>
                <select
                  value={warehouseSource}
                  onChange={(e) => setWarehouseSource(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option>Bundi Central Plant #1 (Factory Bay 01)</option>
                  <option>Kota Regional Warehouse Depot</option>
                  <option>Udaipur Sub-Depot</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Delivery Date</label>
                <input
                  type="text"
                  value={targetDeliveryDate}
                  onChange={(e) => setTargetDeliveryDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Transport Fleet</label>
                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option>Company Truck Fleet (RJ-20)</option>
                  <option>Gati KWE Logistics</option>
                  <option>TCI Freight Service</option>
                  <option>Dealer Self-Pickup at Factory Gate</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Assigned Sales Rep</label>
                <select
                  value={salesperson}
                  onChange={(e) => setSalesperson(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option>Ramesh Meena (Kota / Hadoti)</option>
                  <option>Amit Verma (Udaipur / Mewar)</option>
                  <option>Neha Gupta (Jaipur)</option>
                  <option>Suresh Sharma (Bundi)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Payment Terms</label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none font-semibold text-blue-700"
                >
                  <option>100% Advance Payment (RTGS / NEFT)</option>
                  <option>50% Advance, 50% on Delivery</option>
                  <option>15 Days Net Credit</option>
                  <option>30 Days Net Credit</option>
                  <option>Cash On Delivery (COD)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Order Priority</label>
                <div className="flex gap-2">
                  {(['Normal', 'High', 'Express Urgent'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition ${
                        priority === p
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Delivery &amp; Stacking Remarks</label>
                <input
                  type="text"
                  value={deliveryRemarks}
                  onChange={(e) => setDeliveryRemarks(e.target.value)}
                  placeholder="Notes for driver & bay loading crew..."
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Pricing Calculations & Live Proforma Card (5 cols) */}
        <div className="xl:col-span-5 space-y-4">
          {/* Price Calculation Widget */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3.5">
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center justify-between">
              <span>Financial &amp; GST Calculation</span>
              <span className="text-[10px] text-slate-400 font-normal">HSN 3214 / 2523</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-800">₹ {subtotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Volume Discount Selector */}
              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="text-slate-600 block">Dealer Volume Scheme:</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Tier discount on &gt;100 bags</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[0, 5, 8, 12].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDiscountPercent(pct)}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md border transition ${
                        discountPercent === pct
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-emerald-600 font-semibold">
                <span>Discount Deduction:</span>
                <span>- ₹ {discountAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Freight Charges */}
              <div className="flex justify-between items-center text-slate-600 pt-1">
                <span>Freight &amp; Loading:</span>
                <div className="flex items-center space-x-1">
                  <span className="text-[11px] text-slate-400">₹</span>
                  <input
                    type="number"
                    value={freightCharges}
                    onChange={(e) => setFreightCharges(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-16 px-1.5 py-0.5 text-right bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
              </div>

              {/* Tax Breakdowns */}
              <div className="border-t border-dashed border-slate-200 pt-2 space-y-1 text-slate-500 text-[11px]">
                <div className="flex justify-between">
                  <span>Taxable Value:</span>
                  <span>₹ {taxableAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST (9%):</span>
                  <span>₹ {cgstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (9%):</span>
                  <span>₹ {sgstAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="border-t border-slate-200 pt-2.5 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Total Order Payable</span>
                  <span className="text-[10px] text-slate-400">Includes all taxes &amp; cess</span>
                </div>
                <span className="text-xl font-black text-blue-600">
                  ₹ {grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-file-circle-check text-sm" />
                <span>Confirm &amp; Generate Sales Order</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLineItems([{ ...SWATCH_PRODUCTS_CATALOG[0], qty: 100 }]);
                  setDiscountPercent(5);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition"
              >
                Reset Default Values
              </button>
            </div>
          </div>

          {/* Live Proforma Document Preview Card */}
          <div className="bg-slate-900 text-slate-100 p-4.5 rounded-2xl shadow-md border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Proforma Document Preview
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Bundi, RJ</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Consignee:</span>
                <span className="font-bold text-white text-right">{activeCustomer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="text-slate-200">{activeCustomer.city}, RJ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Weight:</span>
                <span className="text-slate-200">{totalMetricTons} MT ({totalBags} Bags)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dispatch Bay:</span>
                <span className="text-slate-200">Plant #1 - Bay 01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment:</span>
                <span className="text-emerald-400 font-semibold">{paymentTerms}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed italic">
              "Swatch Paints guarantees ISI compliant white cement and weather-resistant polymer formulations. Factory test certificate generated upon dispatch."
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
