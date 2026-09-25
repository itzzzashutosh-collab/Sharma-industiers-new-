import React, { useState } from 'react';
import { DispatchConsignment, Order } from '../../../types/erp';
import { INITIAL_DISPATCHES } from '../../../data/salesSubpagesData';

interface DeliveryDispatchSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
  onUpdateOrderStatus?: (orderId: string, status: Order['status']) => void;
}

export const DeliveryDispatchSubpage: React.FC<DeliveryDispatchSubpageProps> = ({
  onNavigateSubpage,
  onUpdateOrderStatus,
}) => {
  const [consignments, setConsignments] = useState<DispatchConsignment[]>(INITIAL_DISPATCHES);
  const [activeTab, setActiveTab] = useState<'All' | 'Loading Bay' | 'In Transit' | 'Out for Delivery' | 'Delivered'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsignment, setSelectedConsignment] = useState<DispatchConsignment | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter
  const filtered = consignments.filter((c) => {
    if (activeTab !== 'All' && c.status !== activeTab) return false;
    if (
      searchQuery &&
      !c.consignmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.truckNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.destination.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const loadingCount = consignments.filter((c) => c.status === 'Loading Bay').length;
  const inTransitCount = consignments.filter((c) => c.status === 'In Transit' || c.status === 'Out for Delivery').length;
  const deliveredCount = consignments.filter((c) => c.status === 'Delivered').length;

  // Actions
  const handleIssueGatePass = (id: string, cnNumber: string) => {
    setConsignments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: 'In Transit', departureTime: 'Just now (Gate Pass #GP-8831 issued)' } : c
      )
    );
    setToastMessage(`Gate Pass & E-Way Bill issued for ${cnNumber}. Truck exited Bundi Plant Gate #1.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmDelivery = (id: string, cnNumber: string, orderNumber: string) => {
    setConsignments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Delivered', eta: 'Delivered just now' } : c))
    );
    setToastMessage(`Consignment ${cnNumber} marked as Delivered! Dealer signature received.`);
    if (onUpdateOrderStatus) {
      // Find matching order id if applicable
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
              Factory Logistics &amp; Fleet Bay
            </span>
            <span className="text-xs text-slate-400">• Bundi Main Plant</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Delivery &amp; Dispatch Bay Management
          </h2>
          <p className="text-xs text-slate-500">
            Real-time loading bay allocation, truck driver manifests, E-Way Bill compliance &amp; GPS highway transit tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateSubpage('Order Management')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Orders List</span>
          </button>
          <button
            onClick={() => onNavigateSubpage('New Order')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-truck-ramp-box text-emerald-600 text-sm" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-500 hover:text-emerald-700">
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </div>
      )}

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Ready at Factory Bay</span>
            <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-dolly" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{loadingCount} Trucks</span>
            <span className="text-[11px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
              Bay 01 &amp; 02
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">In Transit on Highway</span>
            <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-truck-fast" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-indigo-600">{inTransitCount} En Route</span>
            <span className="text-[11px] text-slate-400">NH-52 &amp; NH-27</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Delivered Today</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-circle-check" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">{deliveredCount + 15} Drops</span>
            <span className="text-[11px] text-emerald-600 font-semibold">100% Verified</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">On-Time SLA</span>
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-award" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-600">98.6%</span>
            <span className="text-[11px] text-slate-400">Industry leader</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {(['All', 'Loading Bay', 'In Transit', 'Out for Delivery', 'Delivered'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search truck, consignment #, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none w-56"
          />
        </div>
      </div>

      {/* Consignment Cards Stream */}
      <div className="space-y-4">
        {filtered.map((consign) => {
          let statusColor = 'bg-slate-100 text-slate-700 border-slate-200';
          if (consign.status === 'Loading Bay') statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
          if (consign.status === 'In Transit') statusColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
          if (consign.status === 'Out for Delivery') statusColor = 'bg-blue-50 text-blue-700 border-blue-200';
          if (consign.status === 'Delivered') statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';

          return (
            <div
              key={consign.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-2xs hover:border-slate-300 transition space-y-3.5"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-sm text-indigo-600">{consign.consignmentNumber}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-900 text-sm">Order {consign.orderNumber}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-700">{consign.customer}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                    {consign.status}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <i className="fa-solid fa-clock text-slate-400" />
                  <span>ETA: <strong className="text-slate-800">{consign.eta}</strong></span>
                </div>
              </div>

              {/* Manifest Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Payload Weight</span>
                  <span className="font-black text-slate-900 text-sm">{consign.bagsCount} Bags</span>
                  <span className="text-[11px] text-slate-500 block">({consign.metricTons} Metric Tons)</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Truck &amp; Driver</span>
                  <span className="font-black text-slate-900 text-sm">{consign.truckNumber}</span>
                  <span className="text-[11px] text-slate-500 block">{consign.driverName}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Factory Loading Bay</span>
                  <span className="font-bold text-indigo-600 text-sm">{consign.plantBay}</span>
                  <span className="text-[11px] text-slate-500 block">{consign.transporter}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">E-Way Bill</span>
                  <span className="font-bold text-slate-800 text-xs block truncate">{consign.eWayBill}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">GST Portal Verified</span>
                </div>
              </div>

              {/* Progress Stepper Bar */}
              <div className="pt-1">
                <div className="grid grid-cols-5 gap-1 text-center text-[10px] font-semibold text-slate-500">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] mb-1">
                      <i className="fa-solid fa-check" />
                    </div>
                    <span>Packed in Plant</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] mb-1 ${
                      consign.status !== 'Loading Bay' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white animate-pulse'
                    }`}>
                      <i className="fa-solid fa-boxes-stacked" />
                    </div>
                    <span>Bay Loaded</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] mb-1 ${
                      consign.status === 'In Transit' || consign.status === 'Out for Delivery' || consign.status === 'Delivered'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      <i className="fa-solid fa-receipt" />
                    </div>
                    <span>Gate Pass</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] mb-1 ${
                      consign.status === 'In Transit' || consign.status === 'Out for Delivery' || consign.status === 'Delivered'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      <i className="fa-solid fa-truck-moving" />
                    </div>
                    <span>On Highway</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] mb-1 ${
                      consign.status === 'Delivered' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      <i className="fa-solid fa-location-crosshairs" />
                    </div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
                <div className="flex items-center space-x-2 text-slate-500">
                  <i className="fa-solid fa-map-pin text-slate-400" />
                  <span>Destination: <strong className="text-slate-700">{consign.destination}</strong></span>
                  <span className="text-slate-300">•</span>
                  <span>Driver Contact: <strong className="text-slate-700">{consign.driverPhone}</strong></span>
                </div>

                <div className="flex items-center space-x-2">
                  {consign.status === 'Loading Bay' && (
                    <button
                      onClick={() => handleIssueGatePass(consign.id, consign.consignmentNumber)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket" />
                      <span>Issue Gate Pass &amp; Dispatch</span>
                    </button>
                  )}

                  {(consign.status === 'In Transit' || consign.status === 'Out for Delivery') && (
                    <button
                      onClick={() => handleConfirmDelivery(consign.id, consign.consignmentNumber, consign.orderNumber)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fa-solid fa-check-double" />
                      <span>Confirm Dealer Delivery</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedConsignment(consign)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-print text-xs" />
                    <span>Print Manifest &amp; LR</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lorry Receipt (LR) Slip Preview Modal */}
      {selectedConsignment && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Lorry Receipt (LR) &amp; Dispatch Slip
                </h3>
                <span className="text-[10px] text-slate-400">
                  {selectedConsignment.consignmentNumber} • Bundi Plant #01
                </span>
              </div>
              <button
                onClick={() => setSelectedConsignment(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Number:</span>
                <span className="font-bold text-slate-800">{selectedConsignment.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Consignee:</span>
                <span className="font-bold text-slate-800">{selectedConsignment.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="text-slate-700">{selectedConsignment.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle Number:</span>
                <span className="font-bold text-indigo-600">{selectedConsignment.truckNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Driver / Contact:</span>
                <span className="text-slate-700">{selectedConsignment.driverName} ({selectedConsignment.driverPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payload:</span>
                <span className="font-bold text-slate-900">{selectedConsignment.bagsCount} Bags ({selectedConsignment.metricTons} MT)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">E-Way Bill:</span>
                <span className="font-mono text-slate-800">{selectedConsignment.eWayBill}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setSelectedConsignment(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Dispatch LR sent to factory printer.');
                  setSelectedConsignment(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
              >
                Print Official Gate Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
