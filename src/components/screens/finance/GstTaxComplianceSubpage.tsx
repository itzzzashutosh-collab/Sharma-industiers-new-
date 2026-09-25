import React, { useState } from 'react';
import { GstComplianceRecord } from '../../../types/erp';
import { INITIAL_GST_RECORDS, ACCOUNTS_SUMMARY } from '../../../data/financeData';

export const GstTaxComplianceSubpage: React.FC = () => {
  const [records] = useState<GstComplianceRecord[]>(INITIAL_GST_RECORDS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-receipt" />
            </span>
            <h2 className="text-lg font-black text-slate-900">
              GST &amp; Statutory Tax Compliance
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            GSTIN: <span className="font-mono font-bold text-slate-800">08AAACS9988D1Z9</span> • State: Rajasthan (08) • Regular Taxpayer
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            ● GST Portal Sync: Live &amp; Reconciled
          </span>
        </div>
      </div>

      {/* Tax Liability vs ITC Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Output GST Liability
          </span>
          <div className="text-2xl font-mono font-black text-rose-600 mt-1">
            ₹ {ACCOUNTS_SUMMARY.gstPayable.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Collected on July-Aug paint deliveries
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Eligible Input Tax Credit (ITC)
          </span>
          <div className="text-2xl font-mono font-black text-emerald-700 mt-1">
            ₹ {ACCOUNTS_SUMMARY.inputGstCredit.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Matched with raw material vendor 2B
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Net Cash Tax to Pay
          </span>
          <div className="text-2xl font-mono font-black text-blue-700 mt-1">
            ₹ {(ACCOUNTS_SUMMARY.gstPayable - ACCOUNTS_SUMMARY.inputGstCredit).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Due by 20 Aug 2025 via Challan PMT-06
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            TDS Tax Liability
          </span>
          <div className="text-2xl font-mono font-black text-purple-700 mt-1">
            ₹ {ACCOUNTS_SUMMARY.tdsPayable.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Section 194C contractor &amp; 194J fees
          </div>
        </div>
      </div>

      {/* GST Returns Register */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">GST Returns Calendar &amp; Filing Logs</h3>
          <span className="text-xs text-slate-500">Financial Year 2025-26</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Return Form</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Filing Due Date</th>
                <th className="py-3 px-4 text-right">Taxable Turnover (₹)</th>
                <th className="py-3 px-4 text-right">IGST</th>
                <th className="py-3 px-4 text-right">CGST + SGST</th>
                <th className="py-3 px-4 text-right">Total Tax (₹)</th>
                <th className="py-3 px-4">Status &amp; ARN</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                    {r.returnType}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{r.period}</td>
                  <td className="py-3.5 px-4 text-slate-600">{r.dueDate}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900">
                    ₹{r.taxableValue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    ₹{r.igst.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                    ₹{(r.cgst + r.sgst).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                    ₹{r.totalTax.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        r.status === 'Filed & Verified'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      ● {r.status}
                    </span>
                    {r.arnNumber && (
                      <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                        ARN: {r.arnNumber}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading official GST portal acknowledgement for ${r.returnType} (${r.period})...`)}
                      className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
