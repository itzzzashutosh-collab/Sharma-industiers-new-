import React, { useState } from 'react';
import { QuotationRecord, Order } from '../../../types/erp';
import { INITIAL_QUOTATIONS } from '../../../data/quotationsData';
import { QuotationInspectorDrawer } from './QuotationInspectorDrawer';

interface QuotationsAllSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
  onOpenCreateQuotation: () => void;
  onConvertToOrder: (order: Order) => void;
}

export const QuotationsAllSubpage: React.FC<QuotationsAllSubpageProps> = ({
  onNavigateSubpage,
  onOpenCreateQuotation,
  onConvertToOrder,
}) => {
  const [quotations, setQuotations] = useState<QuotationRecord[]>(INITIAL_QUOTATIONS);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('qt-232'); // Default selected quote as in screenshot
  const [statusFilter, setStatusFilter] = useState<'All' | 'Draft' | 'Sent' | 'Accepted' | 'Expired' | 'Converted'>('All');
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string>('All');
  const [salespersonFilter, setSalespersonFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuoteIds, setSelectedQuoteIds] = useState<string[]>([]);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeMenuQuoteId, setActiveMenuQuoteId] = useState<string | null>(null);

  // Selected quote object for right inspector
  const activeQuote = quotations.find((q) => q.id === selectedQuoteId);

  // KPI Calculations matching screenshot counts
  const totalCount = 220; // Overall database count
  const draftCount = 32;
  const sentCount = 98;
  const acceptedCount = 42;
  const expiredCount = 28;
  const convertedCount = 46;

  // Filtered quotes for table
  const filteredQuotations = quotations.filter((q) => {
    if (statusFilter !== 'All' && q.status !== statusFilter) return false;
    if (customerTypeFilter !== 'All' && q.customerType !== customerTypeFilter) return false;
    if (salespersonFilter !== 'All' && q.salesperson.split(' ')[0] !== salespersonFilter && q.createdBy !== salespersonFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        q.quoteNumber.toLowerCase().includes(query) ||
        q.customer.toLowerCase().includes(query) ||
        q.city.toLowerCase().includes(query) ||
        q.createdBy.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedQuoteIds(filteredQuotations.map((q) => q.id));
    } else {
      setSelectedQuoteIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    if (selectedQuoteIds.includes(id)) {
      setSelectedQuoteIds(selectedQuoteIds.filter((item) => item !== id));
    } else {
      setSelectedQuoteIds([...selectedQuoteIds, id]);
    }
  };

  const handleConvertQuoteToOrder = (quote: QuotationRecord) => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SO-${Math.floor(1008 + Math.random() * 500)}`,
      customer: quote.customer,
      contactPerson: quote.contactPerson,
      customerType: quote.customerType === 'Direct' ? 'Dealer' : quote.customerType,
      destination: quote.address,
      products: quote.items[0]?.productName || 'Wall Putty Materials',
      productsExtraCount: quote.items.length > 1 ? quote.items.length - 1 : undefined,
      qty: quote.items.reduce((acc, curr) => acc + curr.qty, 0),
      amount: `₹ ${(quote.totalAmount / 100000).toFixed(2)}L`,
      amountRaw: quote.totalAmount,
      status: 'Processing',
      date: '12 Aug 2025',
      paymentStatus: 'Advance',
      phone: quote.phone,
      salesperson: quote.salesperson,
    };

    onConvertToOrder(newOrder);

    // Update status in local quotes
    setQuotations((prev) =>
      prev.map((q) => (q.id === quote.id ? { ...q, status: 'Converted' } : q))
    );
    alert(`Quotation ${quote.quoteNumber} converted into Sales Order ${newOrder.orderNumber}!`);
  };

  const handleUpdateStatus = (quoteId: string, newStatus: QuotationRecord['status']) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
    );
  };

  const getTypeBadge = (type: QuotationRecord['customerType']) => {
    switch (type) {
      case 'Dealer':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Painter':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contractor':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'Retailer':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: QuotationRecord['status']) => {
    switch (status) {
      case 'Sent':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Expired':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Converted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner exactly matching user screenshot */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-2xl shadow-xs">
            📄
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Quotations</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Create, manage and track quotations for dealers, painters, contractors and customers.
            </p>
          </div>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-2xs"
          >
            <span>📥</span>
            <span>Import</span>
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-2xs"
          >
            <span>📤</span>
            <span>Export</span>
          </button>

          <button
            onClick={() => onNavigateSubpage('Quotation Templates')}
            className="w-9 h-9 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl flex items-center justify-center transition shadow-2xs"
            title="Quotation Templates & Settings"
          >
            ⚙️
          </button>

          <button
            onClick={onOpenCreateQuotation}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <span className="text-base leading-none">+</span>
            <span>Create New Quotation</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row (6 Cards matching user screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Total Quotations */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
            📄
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Quotations</p>
            <p className="text-xl font-black text-slate-900 leading-tight">{totalCount}</p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
              <span>↑ 14%</span> <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </div>
        </div>

        {/* Card 2: Draft */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-lg font-bold">
            📝
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Draft</p>
            <p className="text-xl font-black text-slate-900 leading-tight">{draftCount}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">In preparation</p>
          </div>
        </div>

        {/* Card 3: Sent */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
            ✈️
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Sent</p>
            <p className="text-xl font-black text-slate-900 leading-tight">{sentCount}</p>
            <p className="text-[10px] text-blue-600 font-medium mt-0.5">Awaiting reply</p>
          </div>
        </div>

        {/* Card 4: Accepted */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
            ✅
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Accepted</p>
            <p className="text-xl font-black text-slate-900 leading-tight">{acceptedCount}</p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">19% conversion</p>
          </div>
        </div>

        {/* Card 5: Expired */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold">
            ⏰
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Expired</p>
            <p className="text-xl font-black text-slate-900 leading-tight">{expiredCount}</p>
            <p className="text-[10px] text-rose-500 font-medium mt-0.5">Follow-up needed</p>
          </div>
        </div>

        {/* Card 6: Converted to Order */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold">
            🛒
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Converted to Order</p>
            <p className="text-xl font-black text-slate-900 leading-tight">{convertedCount}</p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
              <span>↑ 21%</span> <span className="text-slate-400 font-normal">conversion rate</span>
            </p>
          </div>
        </div>
      </div>

      {/* Primary Filter Tabs Bar & Search matching screenshot */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Status Tabs Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {(
              [
                { id: 'All', label: `All (${totalCount})` },
                { id: 'Draft', label: `Draft (${draftCount})` },
                { id: 'Sent', label: `Sent (${sentCount})` },
                { id: 'Accepted', label: `Accepted (${acceptedCount})` },
                { id: 'Expired', label: `Expired (${expiredCount})` },
                { id: 'Converted', label: `Converted (${convertedCount})` },
              ] as const
            ).map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search bar & Filter Trigger */}
          <div className="flex items-center gap-2">
            <div className="relative min-w-[260px]">
              <input
                type="text"
                placeholder="Search quotations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            <button
              onClick={() => setShowFiltersModal(true)}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
            >
              <span>⚙️</span>
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Secondary Filter Row matching screenshot */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100 text-xs">
          {/* Date Picker Button */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700">
            <span>📅</span>
            <span>01 Aug 2025 → 12 Aug 2025</span>
          </div>

          {/* All Customers Dropdown */}
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none">
            <option>All Customers</option>
            <option>Rajesh Traders</option>
            <option>Om Painters</option>
            <option>Neeraj Constructions</option>
            <option>Modern Builders</option>
          </select>

          {/* Customer Type Dropdown */}
          <select
            value={customerTypeFilter}
            onChange={(e) => setCustomerTypeFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All Customer Types</option>
            <option value="Dealer">Dealer</option>
            <option value="Painter">Painter</option>
            <option value="Contractor">Contractor</option>
            <option value="Retailer">Retailer</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Expired">Expired</option>
            <option value="Converted">Converted</option>
          </select>

          {/* Salespersons Dropdown */}
          <select
            value={salespersonFilter}
            onChange={(e) => setSalespersonFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All Salespersons</option>
            <option value="Amit">Amit Sharma</option>
            <option value="Suresh">Suresh Sharma</option>
            <option value="Ramesh">Ramesh Meena</option>
            <option value="Neha">Neha Gupta</option>
          </select>
        </div>
      </div>

      {/* Split Main Content Area: Left Table & Right Inspector Drawer */}
      <div className={`grid grid-cols-1 ${activeQuote ? 'xl:grid-cols-12 gap-5' : ''}`}>
        {/* Left Side: Quotations Table */}
        <div className={`${activeQuote ? 'xl:col-span-7' : 'col-span-12'} space-y-4`}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-3.5 w-8">
                      <input
                        type="checkbox"
                        checked={
                          selectedQuoteIds.length === filteredQuotations.length &&
                          filteredQuotations.length > 0
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-3.5 px-3">Quote #</th>
                    <th className="py-3.5 px-3">Date</th>
                    <th className="py-3.5 px-3">Customer</th>
                    <th className="py-3.5 px-3">Type</th>
                    <th className="py-3.5 px-3">Products</th>
                    <th className="py-3.5 px-3 text-right">Total Amount (₹)</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                    <th className="py-3.5 px-3">Valid Till</th>
                    <th className="py-3.5 px-3">Created By</th>
                    <th className="py-3.5 px-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {filteredQuotations.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="py-12 text-center text-slate-400">
                        No quotations found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredQuotations.map((quote) => {
                      const isSelected = selectedQuoteId === quote.id;
                      const isChecked = selectedQuoteIds.includes(quote.id);

                      return (
                        <tr
                          key={quote.id}
                          onClick={() => setSelectedQuoteId(quote.id)}
                          className={`cursor-pointer transition hover:bg-blue-50/40 ${
                            isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : ''
                          }`}
                        >
                          {/* Checkbox */}
                          <td
                            className="py-3 px-3.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleRow(quote.id);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>

                          {/* Quote # */}
                          <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                            <span className="text-blue-600 hover:underline">{quote.quoteNumber}</span>
                          </td>

                          {/* Date */}
                          <td className="py-3 px-3 text-slate-600 whitespace-nowrap">{quote.date}</td>

                          {/* Customer */}
                          <td className="py-3 px-3">
                            <p className="font-bold text-slate-900 whitespace-nowrap">{quote.customer}</p>
                            <p className="text-[10px] text-slate-400">{quote.city}</p>
                          </td>

                          {/* Type */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getTypeBadge(
                                quote.customerType
                              )}`}
                            >
                              {quote.customerType}
                            </span>
                          </td>

                          {/* Products Count */}
                          <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                            {quote.items.length} items
                          </td>

                          {/* Total Amount */}
                          <td className="py-3 px-3 text-right font-bold font-mono text-slate-900 whitespace-nowrap">
                            ₹ {quote.totalAmount.toLocaleString('en-IN')}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                                quote.status
                              )}`}
                            >
                              {quote.status}
                            </span>
                          </td>

                          {/* Valid Till */}
                          <td className="py-3 px-3 text-slate-600 whitespace-nowrap">{quote.validTill}</td>

                          {/* Created By */}
                          <td className="py-3 px-3 text-slate-600 whitespace-nowrap">{quote.createdBy}</td>

                          {/* Actions Menu */}
                          <td
                            className="py-3 px-3 text-center relative"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() =>
                                setActiveMenuQuoteId(activeMenuQuoteId === quote.id ? null : quote.id)
                              }
                              className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 font-bold transition flex items-center justify-center mx-auto"
                            >
                              •••
                            </button>

                            {activeMenuQuoteId === quote.id && (
                              <div className="absolute right-4 top-8 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-40 text-left text-xs">
                                <button
                                  onClick={() => {
                                    setSelectedQuoteId(quote.id);
                                    setActiveMenuQuoteId(null);
                                  }}
                                  className="w-full px-3.5 py-1.5 hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
                                >
                                  <span>👁️</span> View &amp; Inspect
                                </button>
                                <button
                                  onClick={() => {
                                    handleConvertQuoteToOrder(quote);
                                    setActiveMenuQuoteId(null);
                                  }}
                                  className="w-full px-3.5 py-1.5 hover:bg-emerald-50 font-medium text-emerald-700 flex items-center gap-2"
                                >
                                  <span>🛒</span> Convert to Order
                                </button>
                                <button
                                  onClick={() => {
                                    window.print();
                                    setActiveMenuQuoteId(null);
                                  }}
                                  className="w-full px-3.5 py-1.5 hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
                                >
                                  <span>🖨️</span> Print PDF
                                </button>
                                <hr className="my-1 border-slate-100" />
                                <button
                                  onClick={() => {
                                    handleUpdateStatus(quote.id, 'Expired');
                                    setActiveMenuQuoteId(null);
                                  }}
                                  className="w-full px-3.5 py-1.5 hover:bg-rose-50 font-medium text-rose-600 flex items-center gap-2"
                                >
                                  <span>⏰</span> Mark Expired
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer matching user screenshot */}
            <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <p>
                Showing <strong className="text-slate-900">1–10</strong> of{' '}
                <strong className="text-slate-900">{totalCount}</strong> quotations
              </p>

              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 font-bold">
                  ‹
                </button>
                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center shadow-xs">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center">
                  3
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center">
                  4
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center">
                  5
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 flex items-center justify-center">
                  22
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 font-bold">
                  ›
                </button>

                <div className="ml-2">
                  <select className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none">
                    <option>10 / page</option>
                    <option>25 / page</option>
                    <option>50 / page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quotation Inspector & Preview Panel exactly matching screenshot */}
        {activeQuote && (
          <div className="xl:col-span-5 mt-5 xl:mt-0 sticky top-4">
            <QuotationInspectorDrawer
              quote={activeQuote}
              onClose={() => setSelectedQuoteId('')}
              onConvertToOrder={handleConvertQuoteToOrder}
              onUpdateQuoteStatus={handleUpdateStatus}
            />
          </div>
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Bulk Import Quotations</h3>
              <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Upload quotations created from external ERPs or Excel spreadsheets. Supported format: .xlsx, .csv.
            </p>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-500 transition cursor-pointer bg-slate-50/50">
              <span className="text-3xl block mb-2">📁</span>
              <p className="text-xs font-bold text-slate-700">Click or drag &amp; drop Excel file</p>
              <p className="text-[10px] text-slate-400 mt-1">Download template with sample quotation rows</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Template downloaded!');
                  setShowImportModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
              >
                Download Sample Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Export Quotations Data</h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input type="radio" name="exportFormat" defaultChecked />
                <span>Export as Detailed Excel (.xlsx) with Line Items</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input type="radio" name="exportFormat" />
                <span>Export as PDF Summary Report</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input type="radio" name="exportFormat" />
                <span>Export as CSV for Tally / SAP Integration</span>
              </label>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Export file generated successfully!');
                  setShowExportModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
              >
                Start Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
