import React, { useState } from 'react';
import {
  DispatchOrderRecord,
  FleetVehicleRecord,
  DepotRecord,
} from '../../../types/erp';
import { RajasthanShipmentMap } from './RajasthanShipmentMap';

interface DistributionDashboardSubpageProps {
  dispatchOrders: DispatchOrderRecord[];
  vehicles: FleetVehicleRecord[];
  depots: DepotRecord[];
  onSelectDispatchOrder: (order: DispatchOrderRecord) => void;
  onSelectVehicle?: (vehicle: FleetVehicleRecord) => void;
  onOpenCreateDispatchModal: () => void;
  onNavigateToSubpage?: (subpage: string) => void;
}

export const DistributionDashboardSubpage: React.FC<DistributionDashboardSubpageProps> = ({
  dispatchOrders,
  vehicles,
  depots,
  onSelectDispatchOrder,
  onSelectVehicle,
  onOpenCreateDispatchModal,
  onNavigateToSubpage,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [isFullMapModal, setIsFullMapModal] = useState<boolean>(false);

  const inTransitCount = dispatchOrders.filter((d) => d.status === 'In Transit').length;
  const deliveredCount = dispatchOrders.filter((d) => d.status === 'Delivered').length;
  const delayedCount = dispatchOrders.filter((d) => d.status === 'Delayed').length;
  const totalBagsInTransit = dispatchOrders
    .filter((d) => d.status === 'In Transit')
    .reduce((acc, curr) => acc + curr.bags, 0);

  const filteredOrders = dispatchOrders.filter((o) => {
    if (filterType === 'All') return true;
    return o.status === filterType;
  });

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Fleet in Transit
            </span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-truck-fast" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{inTransitCount}</span>
            <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
              {totalBagsInTransit.toLocaleString()} Bags Rolling
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Active consignments moving across Rajasthan corridors
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Successful Deliveries
            </span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-circle-check" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{deliveredCount}</span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
              100% Verified POD
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Customer sign-off &amp; physical counts confirmed
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" />
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Transit Exceptions
            </span>
            <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-triangle-exclamation" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-600">{delayedCount}</span>
            <span className="text-xs text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-md">
              Toll / Weather Hold
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Driver telematics alerted; ETA revisions calculated
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500" />
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Depot Warehouse Stock
            </span>
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-warehouse" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">
              {depots.reduce((a, b) => a + b.currentStockBags, 0).toLocaleString()}
            </span>
            <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
              6 Regional Nodes
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Bundi Plant + Kota, Udaipur, Jaipur depots
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600" />
        </div>
      </div>

      {/* Main Grid: Live GIS Map + Quick Fleet Telematics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-slate-900">
                  Rajasthan Logistics Grid &amp; Live Highway Corridors
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time truck positions, depot inventories, and dispatch route progress from Bundi Central.
              </p>
            </div>
            <button
              onClick={() => setIsFullMapModal(true)}
              className="self-start sm:self-auto px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-expand" />
              <span>Full Screen GIS</span>
            </button>
          </div>

          {/* Interactive Vector GIS Map */}
          <div className="w-full">
            <RajasthanShipmentMap
              vehicles={vehicles}
              onSelectVehicle={onSelectVehicle}
              onOpenFullMap={() => setIsFullMapModal(true)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded-md bg-blue-600 inline-block" /> Factory Origin (Bundi)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block" /> Regional Depots
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded-md bg-amber-500 inline-block" /> Transit Highway Checkpoints
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Auto-sync GPS Telematics: 30s interval
            </div>
          </div>
        </div>

        {/* Right 1 Col: Fleet Status Overview */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Active Fleet Telematics</h3>
              <button
                onClick={() => onNavigateToSubpage?.('Fleet & Vehicle Tracking')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                View All ({vehicles.length})
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {vehicles.map((veh) => (
                <div
                  key={veh.id}
                  onClick={() => onSelectVehicle?.(veh)}
                  className="p-3 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200/80 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800 group-hover:text-blue-700">
                      {veh.plateNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        veh.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-700'
                          : veh.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {veh.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 flex justify-between">
                    <span>{veh.model}</span>
                    <span className="font-bold text-slate-800">{veh.assignedDriver}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>{veh.currentRoute}</span>
                      <span className="font-mono font-bold text-slate-700">
                        {veh.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          veh.status === 'Delayed'
                            ? 'bg-rose-500'
                            : veh.status === 'Delivered'
                            ? 'bg-emerald-500'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(veh.progressPercent, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="truncate max-w-[180px]">📍 {veh.locationCity}</span>
                    <span className="font-mono">{veh.fuelEfficiencyKmpl} km/l</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenCreateDispatchModal}
            className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus" />
            <span>Create New Delivery Order (DO)</span>
          </button>
        </div>
      </div>

      {/* Recent Dispatches Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Active Consignments &amp; Delivery Orders
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any order to inspect freight documentation, e-Way bills, and driver telematics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['All', 'In Transit', 'Delivered', 'Delayed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterType(status)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  filterType === status
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-4">DO Number</th>
                <th className="py-3 px-4">Customer &amp; Type</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Products / Volume</th>
                <th className="py-3 px-4">Vehicle &amp; Driver</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">POD Sign</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => onSelectDispatchOrder(order)}
                  className="hover:bg-blue-50/40 cursor-pointer transition"
                >
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {order.doNumber}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{order.date}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{order.customer}</div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {order.customerType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    📍 {order.destination}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{order.products}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {order.bags} Bags ({(order.bags * 0.02).toFixed(1)} MT)
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-slate-800">{order.vehicle}</div>
                    <div className="text-[10px] text-slate-500">{order.driver}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'In Transit'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      ● {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {order.podSigned ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <i className="fa-solid fa-circle-check" /> Signed
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
                        <i className="fa-solid fa-clock" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDispatchOrder(order);
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100 rounded-lg transition"
                    >
                      Inspect <i className="fa-solid fa-chevron-right text-[10px] ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Screen GIS Modal */}
      {isFullMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <i className="fa-solid fa-map-location-dot" />
                </span>
                <div>
                  <h3 className="text-sm font-bold">
                    Rajasthan Fleet Logistics Command View
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Bundi Central Factory (Factory #01) • 6 Regional Depots &amp; Transporter Highways
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFullMapModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <div className="flex-1 p-4 bg-slate-100 overflow-hidden flex flex-col">
              <div className="flex-1 rounded-xl overflow-hidden shadow-inner">
                <RajasthanShipmentMap
                  vehicles={vehicles}
                  onSelectVehicle={onSelectVehicle}
                  isFullView={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
