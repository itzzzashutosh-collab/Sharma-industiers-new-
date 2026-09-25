import React, { useState } from 'react';
import { Order } from '../../../types/erp';
import { SalesOrderVolumeChart } from '../../SalesOrderVolumeChart';

interface OrderManagementSubpageProps {
  orders: Order[];
  onOpenNewOrder: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onNavigateSubpage: (subpage: string) => void;
}

export const OrderManagementSubpage: React.FC<OrderManagementSubpageProps> = ({
  orders,
  onOpenNewOrder,
  onUpdateOrderStatus,
  onNavigateSubpage,
}) => {
  const [activeTab, setActiveTab] = useState<string>('All Orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || 'ord-1');
  const [selectedOrdersForBatch, setSelectedOrdersForBatch] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailTab, setDetailTab] = useState<'Overview' | 'Products' | 'Payments' | 'Timeline' | 'Notes'>('Overview');
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('All Customer Types');
  const [productFilter, setProductFilter] = useState('All Products');
  const [salespersonFilter, setSalespersonFilter] = useState('All Salespersons');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  // Selected Order Object
  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Filtering orders
  const filteredOrders = orders.filter((o) => {
    // Tab filter
    if (activeTab === 'Pending' && o.status !== 'Pending') return false;
    if (activeTab === 'Processing' && o.status !== 'Processing') return false;
    if (activeTab === 'Dispatched' && o.status !== 'Dispatched') return false;
    if (activeTab === 'Delivered' && o.status !== 'Delivered') return false;
    if (activeTab === 'Cancelled' && o.status !== 'Cancelled') return false;

    // Search query
    if (
      searchQuery &&
      !o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(o.contactPerson && o.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !o.products.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(o.location && o.location.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }

    // Dropdown filters
    if (regionFilter !== 'All Regions' && o.location !== regionFilter) return false;
    if (customerTypeFilter !== 'All Customer Types' && o.customerType !== customerTypeFilter) return false;
    if (productFilter !== 'All Products' && !o.products.includes(productFilter)) return false;
    if (salespersonFilter !== 'All Salespersons' && o.salesperson !== salespersonFilter) return false;

    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrdersForBatch(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrdersForBatch([]);
    }
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedOrdersForBatch((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkAsDispatched = (orderId: string) => {
    onUpdateOrderStatus(orderId, 'Dispatched');
  };

  return (
    <div className="space-y-5">
      {/* Quick Action Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            Active Order Pipeline &amp; Dealer Inquiries
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time sales orders across Hadoti, Mewar and Jaipur distribution routes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateSubpage('New Order')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Open Order Creation Studio</span>
          </button>
          <button
            onClick={() => onNavigateSubpage('Order Approvals')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200/60 transition cursor-pointer"
          >
            <i className="fa-solid fa-clipboard-check text-xs text-amber-600" />
            <span>Approvals Queue (5)</span>
          </button>
          <button
            onClick={() => onNavigateSubpage('Delivery & Dispatch')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition cursor-pointer"
          >
            <i className="fa-solid fa-truck text-xs text-blue-600" />
            <span>Factory Dispatch Bay</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Card 1: Total Orders */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition">
          <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center text-xs mb-2">
            <i className="fa-solid fa-bag-shopping" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Total Orders</span>
            <span className="text-xl font-black text-slate-900 leading-tight block mt-0.5">248</span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
              <i className="fa-solid fa-arrow-up text-[8px]" /> 18%
              <span className="text-slate-400 font-normal ml-0.5">vs last month</span>
            </span>
          </div>
        </div>

        {/* Card 2: Total Order Value */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xs mb-2">
            <i className="fa-solid fa-indian-rupee-sign" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block truncate">Total Value</span>
            <span className="text-xl font-black text-slate-900 leading-tight block mt-0.5">₹ 18.42L</span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
              <i className="fa-solid fa-arrow-up text-[8px]" /> 24%
              <span className="text-slate-400 font-normal ml-0.5">growth</span>
            </span>
          </div>
        </div>

        {/* Card 3: Bags Ordered */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs mb-2">
            <i className="fa-solid fa-cubes-stacked" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Bags Ordered</span>
            <span className="text-xl font-black text-slate-900 leading-tight block mt-0.5">6,240</span>
            <span className="text-[10px] font-bold text-blue-600 flex items-center gap-0.5 mt-1">
              <i className="fa-solid fa-circle-check text-[8px]" /> Target 82%
            </span>
          </div>
        </div>

        {/* Card 4: Pending */}
        <div
          onClick={() => setActiveTab('Pending')}
          className={`bg-white p-3.5 rounded-2xl border shadow-2xs flex flex-col justify-between cursor-pointer transition ${
            activeTab === 'Pending' ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xs mb-2">
            <i className="fa-solid fa-clock" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Pending</span>
            <span className="text-xl font-black text-amber-600 leading-tight block mt-0.5">12</span>
            <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5 mt-1">
              Needs approval
            </span>
          </div>
        </div>

        {/* Card 5: Processing */}
        <div
          onClick={() => setActiveTab('Processing')}
          className={`bg-white p-3.5 rounded-2xl border shadow-2xs flex flex-col justify-between cursor-pointer transition ${
            activeTab === 'Processing' ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xs mb-2">
            <i className="fa-solid fa-arrows-rotate" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Processing</span>
            <span className="text-xl font-black text-sky-600 leading-tight block mt-0.5">8</span>
            <span className="text-[10px] font-bold text-sky-500 flex items-center gap-0.5 mt-1">
              In Plant line
            </span>
          </div>
        </div>

        {/* Card 6: Dispatched */}
        <div
          onClick={() => setActiveTab('Dispatched')}
          className={`bg-white p-3.5 rounded-2xl border shadow-2xs flex flex-col justify-between cursor-pointer transition ${
            activeTab === 'Dispatched' ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs mb-2">
            <i className="fa-solid fa-truck-fast" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Dispatched</span>
            <span className="text-xl font-black text-indigo-600 leading-tight block mt-0.5">42</span>
            <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-0.5 mt-1">
              On route (Gati/Fleet)
            </span>
          </div>
        </div>

        {/* Card 7: Delivered */}
        <div
          onClick={() => setActiveTab('Delivered')}
          className={`bg-white p-3.5 rounded-2xl border shadow-2xs flex flex-col justify-between cursor-pointer transition ${
            activeTab === 'Delivered' ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs mb-2">
            <i className="fa-solid fa-circle-check" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block">Delivered</span>
            <span className="text-xl font-black text-emerald-600 leading-tight block mt-0.5">186</span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
              98.4% On-time SLA
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Volume Chart Container */}
      <SalesOrderVolumeChart />

      {/* Main Grid: Order Table + Split Details Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Table Area (8 cols on large screens if detail open, or 12 if closed) */}
        <div className={`space-y-4 ${isDetailOpen ? 'xl:col-span-8' : 'xl:col-span-12'}`}>
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              {/* Tab Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['All Orders', 'Pending', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'].map((tab) => {
                  const count =
                    tab === 'All Orders'
                      ? orders.length
                      : orders.filter((o) => o.status === tab).length;
                  const isCurrent = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition cursor-pointer flex items-center space-x-1.5 ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                      }`}
                    >
                      <span>{tab}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Inspector Toggle */}
              <button
                onClick={() => setIsDetailOpen(!isDetailOpen)}
                className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              >
                <i className={`fa-solid ${isDetailOpen ? 'fa-arrow-right-to-bracket' : 'fa-arrow-left-to-line'}`} />
                <span>{isDetailOpen ? 'Hide Inspector' : 'Show Inspector'}</span>
              </button>
            </div>

            {/* Filter Inputs & Search */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 pt-1">
              <div className="relative md:col-span-2">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search by order #, dealer, product, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              {/* Region Filter */}
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-blue-500"
              >
                <option>All Regions</option>
                <option>Kota</option>
                <option>Bundi</option>
                <option>Jaipur</option>
                <option>Udaipur</option>
              </select>

              {/* Customer Type */}
              <select
                value={customerTypeFilter}
                onChange={(e) => setCustomerTypeFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-blue-500"
              >
                <option>All Customer Types</option>
                <option>Dealer</option>
                <option>Painter</option>
                <option>Contractor</option>
                <option>Retailer</option>
              </select>

              {/* Salesperson Filter */}
              <select
                value={salespersonFilter}
                onChange={(e) => setSalespersonFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-blue-500"
              >
                <option>All Salespersons</option>
                <option>Ramesh</option>
                <option>Amit</option>
                <option>Neha</option>
                <option>Suresh</option>
              </select>
            </div>
          </div>

          {/* Bulk Selection Notice Banner */}
          {selectedOrdersForBatch.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-blue-900 animate-fadeIn">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-square-check text-blue-600 text-sm" />
                <span className="font-semibold">{selectedOrdersForBatch.length} orders selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    selectedOrdersForBatch.forEach((id) => onUpdateOrderStatus(id, 'Dispatched'));
                    setSelectedOrdersForBatch([]);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                >
                  Mark as Dispatched
                </button>
                <button
                  onClick={() => setSelectedOrdersForBatch([])}
                  className="px-2.5 py-1 text-slate-600 hover:text-slate-800"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}

          {/* Orders Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-3.5 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          filteredOrders.length > 0 &&
                          selectedOrdersForBatch.length === filteredOrders.length
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer / Dealer</th>
                    <th className="py-3 px-3">Destination</th>
                    <th className="py-3 px-3">Products &amp; Bags</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-12 text-center text-slate-400">
                        <i className="fa-regular fa-folder-open text-3xl mb-2 block" />
                        No orders match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const isSelected = order.id === selectedOrderId;
                      const isChecked = selectedOrdersForBatch.includes(order.id);

                      // Status badge styles
                      let statusBadge = 'bg-slate-100 text-slate-700 border-slate-200';
                      let statusDot = 'bg-slate-400';
                      if (order.status === 'Processing') {
                        statusBadge = 'bg-sky-50 text-sky-700 border-sky-200';
                        statusDot = 'bg-sky-500';
                      } else if (order.status === 'Dispatched') {
                        statusBadge = 'bg-indigo-50 text-indigo-700 border-indigo-200';
                        statusDot = 'bg-indigo-500';
                      } else if (order.status === 'Delivered') {
                        statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                        statusDot = 'bg-emerald-500';
                      } else if (order.status === 'Pending') {
                        statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
                        statusDot = 'bg-amber-500';
                      } else if (order.status === 'Cancelled') {
                        statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';
                        statusDot = 'bg-rose-500';
                      }

                      return (
                        <tr
                          key={order.id}
                          onClick={() => setSelectedOrderId(order.id)}
                          className={`hover:bg-blue-50/40 cursor-pointer transition ${
                            isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : ''
                          }`}
                        >
                          <td className="py-3 px-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleSelectRow(order.id)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>

                          {/* Order ID */}
                          <td className="py-3 px-3 font-bold text-blue-600 hover:underline">
                            {order.orderNumber}
                          </td>

                          {/* Customer */}
                          <td className="py-3 px-3">
                            <div className="flex items-center space-x-2.5">
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                                  order.initialsBg || 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {order.initials || order.customer.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <span className="font-bold text-slate-800 block truncate">
                                  {order.customer}
                                </span>
                                <span className="text-[10px] text-slate-400 block truncate">
                                  {order.contactPerson || order.customerType || 'Dealer'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Destination */}
                          <td className="py-3 px-3 text-slate-600">
                            <div className="flex items-center space-x-1">
                              <i className="fa-solid fa-location-dot text-[10px] text-slate-400" />
                              <span className="truncate max-w-[100px]">{order.location || order.destination}</span>
                            </div>
                          </td>

                          {/* Products & Bag Count */}
                          <td className="py-3 px-3 text-slate-700">
                            <div className="font-semibold truncate max-w-[130px]">{order.products}</div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {order.qty} bags
                              {order.productsExtraCount ? ` +${order.productsExtraCount} items` : ''}
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="py-3 px-3 font-extrabold text-slate-900">
                            {order.amount}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                              {order.status}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                            <span className="block">{order.date}</span>
                            <span className="text-[10px] text-slate-400">
                              Rep: {order.salesperson || 'Direct'}
                            </span>
                          </td>

                          {/* Payment */}
                          <td className="py-3 px-3">
                            <span className="font-semibold text-slate-700 block">{order.paymentStatus}</span>
                            {order.paymentSub && (
                              <span className="text-[10px] text-slate-400 block">{order.paymentSub}</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-1">
                              {order.status === 'Processing' && (
                                <button
                                  onClick={() => handleMarkAsDispatched(order.id)}
                                  title="Dispatch Consignment"
                                  className="p-1.5 text-blue-600 hover:bg-blue-100/60 rounded-lg transition"
                                >
                                  <i className="fa-solid fa-truck text-xs" />
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedOrderId(order.id)}
                                title="View Details"
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                              >
                                <i className="fa-solid fa-eye text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-3 bg-slate-50/50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing 1 to {filteredOrders.length} of {orders.length} total orders
              </span>
              <div className="flex items-center space-x-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="px-2 font-bold text-blue-600">1</span>
                <button
                  disabled
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Split Detail Inspector Drawer (4 cols) */}
        {isDetailOpen && selectedOrder && (
          <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
            {/* Inspector Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${
                    selectedOrder.initialsBg || 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {selectedOrder.initials || 'SO'}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                    {selectedOrder.orderNumber}
                  </h3>
                  <span className="text-[11px] text-slate-500 block">
                    {selectedOrder.customer} ({selectedOrder.location || 'Rajasthan'})
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            {/* Inspector Navigation Tabs */}
            <div className="flex border-b border-slate-100 text-xs font-semibold px-4 pt-2 gap-4">
              {(['Overview', 'Products', 'Payments', 'Timeline'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`pb-2 transition cursor-pointer relative ${
                    detailTab === tab
                      ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Inspector Tab Content */}
            <div className="p-4 space-y-4 text-xs">
              {detailTab === 'Overview' && (
                <>
                  {/* Order Financials Summary */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Total Value:</span>
                      <span className="text-sm font-extrabold text-slate-900">{selectedOrder.amount}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Total Bags:</span>
                      <span className="font-bold text-slate-800">{selectedOrder.qty} bags</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Payment Terms:</span>
                      <span className="font-medium text-slate-700">{selectedOrder.paymentTerms || 'Standard'}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500">
                      <span>Sales Rep:</span>
                      <span className="font-bold text-blue-600">{selectedOrder.salesperson || 'Unassigned'}</span>
                    </div>
                  </div>

                  {/* Customer Information Box */}
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Customer &amp; Dispatch Details
                    </h4>
                    <div className="border border-slate-100 rounded-xl p-3 space-y-2">
                      <div className="flex items-start space-x-2">
                        <i className="fa-solid fa-phone text-slate-400 mt-0.5" />
                        <div>
                          <span className="text-slate-500 block text-[10px]">Phone Contact</span>
                          <span className="font-semibold text-slate-800">{selectedOrder.phone || '+91 98290 12345'}</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <i className="fa-solid fa-location-dot text-slate-400 mt-0.5" />
                        <div>
                          <span className="text-slate-500 block text-[10px]">Delivery Destination</span>
                          <span className="font-semibold text-slate-800">{selectedOrder.destination}</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <i className="fa-solid fa-truck text-slate-400 mt-0.5" />
                        <div>
                          <span className="text-slate-500 block text-[10px]">Expected Delivery</span>
                          <span className="font-semibold text-slate-800">{selectedOrder.expectedDelivery || '14 Aug 2025'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="pt-2 flex flex-col gap-2">
                    {selectedOrder.status !== 'Dispatched' && selectedOrder.status !== 'Delivered' && (
                      <button
                        onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Dispatched')}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                      >
                        <i className="fa-solid fa-truck" />
                        <span>Dispatch from Plant #01</span>
                      </button>
                    )}
                    {selectedOrder.status === 'Dispatched' && (
                      <button
                        onClick={() => onUpdateOrderStatus(selectedOrder.id, 'Delivered')}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                      >
                        <i className="fa-solid fa-check" />
                        <span>Confirm Dealer Delivery</span>
                      </button>
                    )}
                  </div>
                </>
              )}

              {detailTab === 'Products' && (
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Ordered Line Items
                  </div>
                  <div className="space-y-2">
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-100/60 text-blue-600 flex items-center justify-center text-xs">
                              <i className={item.icon || 'fa-solid fa-paint-roller'} />
                            </div>
                            <div>
                              <span className="font-bold text-slate-800 block">{item.name}</span>
                              <span className="text-[10px] text-slate-400">
                                {item.qty} bags × ₹{item.rate}
                              </span>
                            </div>
                          </div>
                          <span className="font-extrabold text-slate-900">₹ {item.total.toLocaleString('en-IN')}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl text-slate-500">
                        <span>{selectedOrder.products}</span> — {selectedOrder.qty} bags ({selectedOrder.amount})
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal:</span>
                      <span className="font-medium text-slate-700">
                        ₹ {(selectedOrder.subtotal || selectedOrder.amountRaw).toLocaleString('en-IN')}
                      </span>
                    </div>
                    {selectedOrder.discountAmount ? (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount ({selectedOrder.discountPercent}%):</span>
                        <span>- ₹ {selectedOrder.discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between text-slate-500">
                      <span>GST (18%):</span>
                      <span className="font-medium text-slate-700">
                        ₹ {(selectedOrder.taxGst || Math.round(selectedOrder.amountRaw * 0.18)).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-1.5">
                      <span>Grand Total:</span>
                      <span className="text-blue-600">{selectedOrder.amount}</span>
                    </div>
                  </div>
                </div>
              )}

              {detailTab === 'Payments' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Status:</span>
                      <span className="font-bold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Terms:</span>
                      <span className="font-medium text-slate-700">{selectedOrder.paymentTerms || 'Advance'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Invoice:</span>
                      <span className="font-bold text-blue-600">INV-{selectedOrder.orderNumber.replace('SO-', '')}</span>
                    </div>
                  </div>
                </div>
              )}

              {detailTab === 'Timeline' && (
                <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
                  <div className="relative pl-3">
                    <div className="absolute -left-[19px] top-0.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                    <span className="text-[10px] text-slate-400 block">{selectedOrder.orderTime || selectedOrder.date}</span>
                    <span className="font-bold text-slate-800 block">Sales Order Created</span>
                    <span className="text-[11px] text-slate-500">Placed by {selectedOrder.customer} via {selectedOrder.salesperson || 'Rep'}</span>
                  </div>
                  <div className="relative pl-3">
                    <div className="absolute -left-[19px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    <span className="text-[10px] text-slate-400 block">{selectedOrder.date}, 02:00 PM</span>
                    <span className="font-bold text-slate-800 block">Payment Verified</span>
                    <span className="text-[11px] text-slate-500">{selectedOrder.paymentStatus} status logged</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
