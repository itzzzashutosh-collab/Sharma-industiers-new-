import React, { useState } from 'react';
import { DispatchOrderRecord } from '../../../types/erp';

interface DispatchOrdersSubpageProps {
  dispatchOrders: DispatchOrderRecord[];
  onSelectOrder: (order: DispatchOrderRecord) => void;
  onOpenCreateModal: () => void;
  onOpenEWayBillModal: (ewbNumber: string) => void;
  onOpenPodModal: (doNumber: string) => void;
  onUpdateStatus: (id: string, newStatus: DispatchOrderRecord['status']) => void;
}

export const DispatchOrdersSubpage: React.FC<DispatchOrdersSubpageProps> = ({
  dispatchOrders,
  onSelectOrder,
  onOpenCreateModal,
  onOpenEWayBillModal,
  onOpenPodModal,
  onUpdateStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string>('All');

  const filteredOrders = dispatchOrders.filter((order) => {
    const matchesSearch =
      order.doNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || order.status === statusFilter;

    const matchesType =
      customerTypeFilter === 'All' || order.customerType === customerTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Action & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Dispatch &amp; Delivery Orders Register
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor consignment progress, transport challans, customer sign-offs, and highway dispatches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <i className="fa-solid fa-plus" />
            <span>Generate Delivery Order (DO)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search DO Number, dealer, city, truck plate, products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Statuses ({dispatchOrders.length})</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={customerTypeFilter}
            onChange={(e) => setCustomerTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Customer Types</option>
            <option value="Dealer">Authorized Dealers</option>
            <option value="Painter">Painter Club</option>
            <option value="Contractor">Contractors</option>
            <option value="Direct">Direct Retail</option>
          </select>
        </div>
      </div>

      {/* Orders Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-4">Order Details</th>
                <th className="py-3 px-4">Customer &amp; Tier</th>
                <th className="py-3 px-4">Destination &amp; Corridor</th>
                <th className="py-3 px-4">Products &amp; Volume</th>
                <th className="py-3 px-4">Truck &amp; Driver</th>
                <th className="py-3 px-4">Transit Status</th>
                <th className="py-3 px-4">POD &amp; e-Way Bill</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <i className="fa-solid fa-truck text-3xl mb-2 block opacity-40" />
                    No delivery orders matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => onSelectOrder(order)}
                    className="hover:bg-blue-50/40 cursor-pointer transition"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-blue-700">
                        {order.doNumber}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {order.date}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{order.customer}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                        {order.customerType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <i className="fa-solid fa-location-dot text-rose-500 text-[11px]" />
                        <span>{order.destination}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[200px] mt-0.5">
                        {order.route || 'Bundi Highway'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{order.products}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {order.bags} Bags / {(order.bags * 0.02).toFixed(1)} MT
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-800">
                        {order.vehicle}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {order.driver} ({order.driverPhone || 'Active'})
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'In Transit'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : order.status === 'Delayed'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        ● {order.status}
                      </span>
                      {order.status === 'In Transit' && (
                        <div className="text-[10px] text-slate-400 mt-1">
                          ETA: {order.expectedDate}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 space-y-1">
                      <div>
                        {order.ewayBillNumber ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenEWayBillModal(order.ewayBillNumber!);
                            }}
                            className="text-[10px] font-mono text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                          >
                            <i className="fa-solid fa-file-invoice" />
                            <span>EWB Active</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400">No EWB</span>
                        )}
                      </div>

                      <div>
                        {order.podSigned ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenPodModal(order.doNumber);
                            }}
                            className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                          >
                            <i className="fa-solid fa-stamp" />
                            <span>e-POD Verified</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-amber-600">Pending Sign</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {order.status !== 'Delivered' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus(order.id, 'Delivered');
                            }}
                            title="Mark Delivered"
                            className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition"
                          >
                            <i className="fa-solid fa-check text-xs" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectOrder(order);
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
