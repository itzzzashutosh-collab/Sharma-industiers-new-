import React from 'react';
import { PodRecord } from '../../../types/erp';

interface PodViewerModalProps {
  pod: PodRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PodViewerModal: React.FC<PodViewerModalProps> = ({
  pod,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !pod) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full flex flex-col border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
              <i className="fa-solid fa-stamp" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-wide">
                ELECTRONIC PROOF OF DELIVERY (e-POD)
              </h3>
              <p className="text-[10px] text-emerald-200">
                Swatch Paints Distribution Network • Gate Inward Acknowledgment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-emerald-800 flex items-center justify-center text-emerald-200 hover:text-white transition"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-slate-800 bg-white">
          <div className="flex items-start justify-between border-b pb-4 border-slate-200">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                POD Certificate No.
              </span>
              <div className="text-lg font-mono font-black text-slate-900">
                {pod.podNumber}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Challan Ref: <span className="font-mono font-bold text-slate-800">{pod.doNumber}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ● {pod.status}
              </span>
              <div className="text-xs text-slate-500 mt-1">
                {pod.deliveredDate} • {pod.deliveredTime}
              </div>
            </div>
          </div>

          {/* Consignee Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Delivered To Customer:</span>
              <span className="font-bold text-slate-900">{pod.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Received By (Authorized Person):</span>
              <span className="font-bold text-slate-900">{pod.receivedBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Contact Number:</span>
              <span className="font-mono text-slate-800">{pod.receiverPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivering Driver:</span>
              <span className="font-semibold text-slate-800">{pod.driverName}</span>
            </div>
          </div>

          {/* Physical Verification */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium">Bags / Buckets Received</span>
              <div className="text-lg font-black text-emerald-700 mt-0.5">
                {pod.bagsDelivered} Units
              </div>
              <p className="text-[10px] text-slate-500 mt-1">100% Count Verified at Unloading</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-medium">Package Physical Condition</span>
              <div className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                <i className="fa-solid fa-shield-check" />
                <span>{pod.condition}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">No leakage or transit tampering</p>
            </div>
          </div>

          {/* Digital Signature Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-center space-y-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              Customer Digital Stamp &amp; Signature
            </span>
            <div className="h-20 bg-white rounded-lg border border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden">
              <div className="font-serif italic text-xl font-bold text-slate-800 tracking-wide rotate-[-5deg]">
                {pod.receivedBy}
              </div>
              <div className="absolute bottom-1 right-2 text-[9px] font-mono text-emerald-600 font-bold">
                ✓ Cryptographically Verified Sign
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Acknowledged receipt of materials in full and sound condition per GST delivery terms.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 rounded-xl shadow-2xs flex items-center gap-2"
          >
            <i className="fa-solid fa-print" />
            <span>Print POD Slip</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
