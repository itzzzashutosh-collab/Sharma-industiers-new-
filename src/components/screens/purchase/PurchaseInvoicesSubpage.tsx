import React, { useState } from 'react';
import { PurchaseInvoiceRecord } from '../../../types/erp';
import { INITIAL_PURCHASE_INVOICES } from '../../../data/purchaseData';

export const PurchaseInvoicesSubpage: React.FC = () => {
  const [invoices] = useState<PurchaseInvoiceRecord[]>(INITIAL_PURCHASE_INVOICES);
  const [filterMatch, setFilterMatch] = useState<string>('All');

  const filteredInvoices = invoices.filter(
    (i) => filterMatch === 'All' || i.matchingStatus === filterMatch || i.paymentStatus === filterMatch
  );

  const totalInvoiced = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalGstItc = invoices.reduce((acc, i) => acc + i.gstAmount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-receipt" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Vendor Purchase Invoices &amp; 3-Way Matching
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated verification of Purchase Order (PO) ↔ Goods Receipt (GRN) ↔ Supplier Tax Invoice for GST ITC claim.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-1.5">
            <i className="fa-solid fa-cloud-arrow-down text-emerald-600" />
            <span>GSTR-2B Auto-Reconciled</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Total Invoiced Amount
          </span>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">
            ₹ {totalInvoiced.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-slate-500">Gross purchase bills processed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            GST Input Tax Credit (ITC)
          </span>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-mono">
            ₹ {totalGstItc.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-emerald-700">Eligible for GST Set-off (18% GST)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            3-Way Match Verification
          </span>
          <p className="text-2xl font-black text-blue-700 mt-2 font-mono">100% Passed</p>
          <span className="text-[10px] text-blue-800">Zero price or quantity discrepancy</span>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Supplier Invoices Ledger</h3>
          <span className="text-xs text-slate-400 font-mono">Direct GSTR-2B Matching</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">PO Ref</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Invoice Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Taxable (₹)</th>
                <th className="py-3 px-4 text-right">GST (18%)</th>
                <th className="py-3 px-4 text-right">Total Invoice Value</th>
                <th className="py-3 px-4 text-center">3-Way Match</th>
                <th className="py-3 px-4 text-center">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{inv.poNumber}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{inv.supplierName}</td>
                  <td className="py-3.5 px-4 text-slate-500">{inv.invoiceDate}</td>
                  <td className="py-3.5 px-4 text-slate-500">{inv.dueDate}</td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-700">
                    ₹ {inv.taxableAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-emerald-700 font-bold">
                    ₹ {inv.gstAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900 tabular-nums">
                    ₹ {inv.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">
                      <i className="fa-solid fa-check-double text-[9px]" /> {inv.matchingStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inv.paymentStatus}
                    </span>
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
