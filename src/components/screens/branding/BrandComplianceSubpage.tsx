import React, { useState } from 'react';
import { BrandAuditRecord } from '../../../types/erp';

interface BrandComplianceSubpageProps {
  audits: BrandAuditRecord[];
}

export const BrandComplianceSubpage: React.FC<BrandComplianceSubpageProps> = ({ audits }) => {
  const [auditList, setAuditList] = useState<BrandAuditRecord[]>(audits);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filtered = auditList.filter((a) => {
    return filterStatus === 'All' || a.status === filterStatus;
  });

  const handleResolveWarning = (id: string) => {
    setAuditList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Resolved' } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Trademark & Quality Enforcement
            </span>
            <span className="text-xs text-slate-500">• 98.4% National Compliance Score</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Brand Compliance & Anti-Counterfeit Audits
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Routine field inspections of dealer signages, packaging label integrity, trademark infringement monitoring, and dispenser spectrophotometer calibration.
          </p>
        </div>

        <button
          onClick={() => alert('Initiating new multi-zone Brand Audit Protocol...')}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-2 shrink-0 shadow-sm"
        >
          <i className="fa-solid fa-clipboard-check text-xs text-emerald-400" />
          <span>New Inspection Audit</span>
        </button>
      </div>

      {/* Anti-Counterfeit Packaging Security Features Breakdown */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Four-Layer Anti-Counterfeit Packaging Defense System
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center space-x-2 text-indigo-700 font-bold">
              <i className="fa-solid fa-qrcode text-sm" />
              <span>Tamper-Proof QR Seal</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Unique encrypted laser-etched QR code under scratch film for instant painter loyalty verification.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center space-x-2 text-amber-700 font-bold">
              <i className="fa-solid fa-certificate text-sm" />
              <span>Rainbow Hologram Lid</span>
            </div>
            <p className="text-[11px] text-slate-600">
              3D optical holographic foil strip with micro-text &quot;SWATCH GENUINE FACTORY SEAL&quot; on every bucket rim.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center space-x-2 text-emerald-700 font-bold">
              <i className="fa-solid fa-barcode text-sm" />
              <span>GS1 EAN-13 Barcodes</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Registered global barcode index allowing instant POS scanning and batch manufacture tracing.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center space-x-2 text-sky-700 font-bold">
              <i className="fa-solid fa-microscope text-sm" />
              <span>Pigment Delta E &lt; 0.8</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Spectrophotometer verification ensures color replication accuracy across all regional retail tinting points.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Audit Log */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Recent Field Audit Inspection Records</h3>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500">Status Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="Compliant">Compliant</option>
            <option value="Warning Issued">Warning Issued</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Audit List Table / Cards */}
      <div className="space-y-3">
        {filtered.map((audit) => (
          <div
            key={audit.id}
            className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-3 hover:border-slate-300 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {audit.auditCode}
                </span>
                <h4 className="text-xs font-bold text-slate-900">{audit.dealerOrLocation}</h4>
                <span className="text-xs text-slate-500">({audit.city})</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-700">
                  Compliance: <strong>{audit.complianceScore}%</strong>
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    audit.status === 'Compliant'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : audit.status === 'Warning Issued'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  {audit.status}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="flex items-center space-x-2 text-slate-500 mb-1">
                <span>Inspection Type: <strong>{audit.auditType}</strong></span>
                <span>•</span>
                <span>Auditor: <strong>{audit.auditorName}</strong></span>
                <span>•</span>
                <span>Date: {audit.inspectionDate}</span>
              </div>
              <p className="text-slate-800">{audit.notes}</p>
              {audit.actionRequired && (
                <div className="mt-2 text-rose-700 font-semibold flex items-center space-x-1.5">
                  <i className="fa-solid fa-triangle-exclamation text-xs" />
                  <span>Action Required: {audit.actionRequired}</span>
                </div>
              )}
            </div>

            {audit.status === 'Warning Issued' && (
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => alert(`Issuing formal legal cease notice to ${audit.dealerOrLocation}`)}
                  className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg text-xs font-semibold"
                >
                  Serve Legal Notice
                </button>
                <button
                  onClick={() => handleResolveWarning(audit.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                >
                  Mark as Rectified & Resolved
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
