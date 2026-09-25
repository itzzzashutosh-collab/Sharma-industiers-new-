import React from 'react';
import { DispatchOrderRecord } from '../../../types/erp';

interface DispatchOrderDrawerProps {
  dispatchOrder: DispatchOrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: DispatchOrderRecord['status']) => void;
  onOpenEWayBill?: (ewayBill: string) => void;
  onOpenPod?: (doNumber: string) => void;
}

export const DispatchOrderDrawer: React.FC<DispatchOrderDrawerProps> = ({
  dispatchOrder,
  isOpen,
  onClose,
  onUpdateStatus,
  onOpenEWayBill,
  onOpenPod,
}) => {
  if (!isOpen || !dispatchOrder) return null;

  const getStatusBadge = (status: DispatchOrderRecord['status']) => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Delayed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {dispatchOrder.doNumber}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                  dispatchOrder.status
                )}`}
              >
                ● {dispatchOrder.status}
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 mt-1">
              {dispatchOrder.customer}
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <i className="fa-solid fa-location-dot text-slate-400" />
              <span>Destination: {dispatchOrder.destination}</span>
              <span className="text-slate-300">•</span>
              <span>Date: {dispatchOrder.date}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Transit Progress Tracker */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Trip Progression</span>
              <span className="font-mono font-bold text-blue-700">
                {dispatchOrder.progressPercent || (dispatchOrder.status === 'Delivered' ? 100 : 50)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  dispatchOrder.status === 'Delayed'
                    ? 'bg-rose-500'
                    : dispatchOrder.status === 'Delivered'
                    ? 'bg-emerald-500'
                    : 'bg-blue-600'
                }`}
                style={{
                  width: `${
                    dispatchOrder.status === 'Delivered'
                      ? 100
                      : Math.min(dispatchOrder.progressPercent || 50, 100)
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Bundi Central Factory</span>
              <span className="font-semibold text-slate-700">{dispatchOrder.destination}</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-400 font-medium">Consignment Volume</div>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {dispatchOrder.bags} Bags / Tubs
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">
                Weight: {(dispatchOrder.bags * 0.02).toFixed(1)} MT
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-400 font-medium">Expected Arrival</div>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {dispatchOrder.expectedDate}
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                {dispatchOrder.status === 'Delivered' ? 'Completed on Schedule' : 'GPS Tracking Active'}
              </div>
            </div>
          </div>

          {/* Vehicle & Logistics Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Transport &amp; Driver Details
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <span className="text-slate-500">Truck / Vehicle</span>
                <span className="font-mono font-bold text-slate-800">
                  {dispatchOrder.vehicle}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <span className="text-slate-500">Assigned Driver</span>
                <span className="font-bold text-slate-800">{dispatchOrder.driver}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <span className="text-slate-500">Driver Contact</span>
                <span className="font-mono text-blue-600 font-semibold">
                  {dispatchOrder.driverPhone || '+91 94140 88219'}
                </span>
              </div>
              <div className="flex items-start justify-between text-xs">
                <span className="text-slate-500">Route Assigned</span>
                <span className="font-medium text-slate-800 text-right max-w-[260px]">
                  {dispatchOrder.route || 'Bundi Factory → Highway Corridor'}
                </span>
              </div>
            </div>
          </div>

          {/* Cargo Products Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Material Items Loaded
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <i className="fa-solid fa-boxes-stacked" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{dispatchOrder.products}</h4>
                  <p className="text-xs text-slate-500">
                    Industrial batch packaging • {dispatchOrder.bags} Units sealed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & E-Way Bill */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Regulatory Compliance
            </h3>
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">GST E-Way Bill Number</div>
                  <div className="text-sm font-mono font-bold text-slate-900 mt-0.5">
                    {dispatchOrder.ewayBillNumber || 'EWB-2025-99218201'}
                  </div>
                </div>
                {onOpenEWayBill && (
                  <button
                    onClick={() =>
                      onOpenEWayBill(dispatchOrder.ewayBillNumber || '992182014589')
                    }
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition border border-sky-200"
                  >
                    <i className="fa-solid fa-file-invoice mr-1.5" />
                    View Slip
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <div className="text-xs text-slate-500">Proof of Delivery (POD)</div>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">
                    {dispatchOrder.podSigned ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <i className="fa-solid fa-circle-check" /> Customer Verified &amp; Signed
                      </span>
                    ) : (
                      <span className="text-amber-600 flex items-center gap-1">
                        <i className="fa-solid fa-clock" /> Awaiting Customer Stamp
                      </span>
                    )}
                  </div>
                </div>
                {onOpenPod && dispatchOrder.podSigned && (
                  <button
                    onClick={() => onOpenPod(dispatchOrder.doNumber)}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
                  >
                    <i className="fa-solid fa-stamp mr-1.5" />
                    View POD
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status Change Controls */}
          {onUpdateStatus && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Update Dispatch Status
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onUpdateStatus(dispatchOrder.id, 'In Transit')}
                  className={`p-2 text-xs font-bold rounded-lg border transition ${
                    dispatchOrder.status === 'In Transit'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  In Transit
                </button>
                <button
                  onClick={() => onUpdateStatus(dispatchOrder.id, 'Delivered')}
                  className={`p-2 text-xs font-bold rounded-lg border transition ${
                    dispatchOrder.status === 'Delivered'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  Delivered
                </button>
                <button
                  onClick={() => onUpdateStatus(dispatchOrder.id, 'Delayed')}
                  className={`p-2 text-xs font-bold rounded-lg border transition ${
                    dispatchOrder.status === 'Delayed'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  Mark Delayed
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-print" />
            <span>Print Challan</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
