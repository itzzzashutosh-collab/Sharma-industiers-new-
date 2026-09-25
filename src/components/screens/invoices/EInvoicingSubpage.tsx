import React, { useState } from 'react';
import { EInvoiceIRNRecord } from '../../../types/erp';
import { INITIAL_EINVOICES } from '../../../data/invoicesData';

export const EInvoicingSubpage: React.FC = () => {
  const [eInvoices] = useState<EInvoiceIRNRecord[]>(INITIAL_EINVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<EInvoiceIRNRecord | null>(eInvoices[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalValue = eInvoices.reduce((sum, e) => sum + e.totalAmount, 0);

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <i className="fa-solid fa-circle-check text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-qrcode" />
            </span>
            <h2 className="text-lg font-black text-slate-900">B2B E-Invoicing &amp; IRN Compliance</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time integration with Goods and Services Tax Network (GSTN) IRP for 64-char Hash IRN &amp; Signed QR.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('All B2B tax invoices successfully synced with GST IRP!')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
          >
            <i className="fa-solid fa-rotate text-xs" />
            <span>Sync All Pending with NIC</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Generated E-Invoices
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              {eInvoices.length} Documents
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">100% Compliant</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Total E-Invoiced Value
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-700 font-mono">
              ₹{(totalValue / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[10px] text-slate-400">IRP Authenticated</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            IRP Portal Status
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live &amp; Operational
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            QR Signature Algorithm
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900 font-mono">RSA-SHA256</span>
            <span className="text-[10px] text-slate-400">2048-bit</span>
          </div>
        </div>
      </div>

      {/* Split Details: Master Table + QR Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Table Column */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              IRN Registry
            </h3>
            <span className="text-xs text-slate-500">Government Portal Ack Numbers</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer &amp; GSTIN</th>
                  <th className="py-3 px-4">Ack No &amp; Date</th>
                  <th className="py-3 px-4 text-right">Taxable</th>
                  <th className="py-3 px-4 text-right">Total Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {eInvoices.map((e) => {
                  const isSelected = selectedInvoice?.id === e.id;
                  return (
                    <tr
                      key={e.id}
                      onClick={() => setSelectedInvoice(e)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-blue-600 font-mono">
                        {e.invoiceNumber}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{e.customer}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{e.gstin}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-800 font-semibold">{e.ackNo}</div>
                        <div className="text-[10px] text-slate-400">{e.ackDate}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600 tabular-nums">
                        ₹{e.taxableAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono tabular-nums">
                        ₹{e.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ● {e.portalSync}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            showToast(`Signed JSON for ${e.invoiceNumber} downloaded!`);
                          }}
                          className="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        >
                          Signed JSON
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR & Cryptographic IRN Inspector Column */}
        {selectedInvoice && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                IRP Verification Certificate
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            {/* QR Code Presentation */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <svg className="w-28 h-28" viewBox="0 0 100 100" fill="#0f172a">
                <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="10" y="10" width="15" height="15" fill="#fff" />
                <rect x="13" y="13" width="9" height="9" fill="#0f172a" />

                <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="75" y="10" width="15" height="15" fill="#fff" />
                <rect x="78" y="13" width="9" height="9" fill="#0f172a" />

                <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                <rect x="10" y="75" width="15" height="15" fill="#fff" />
                <rect x="13" y="78" width="9" height="9" fill="#0f172a" />

                <rect x="35" y="10" width="10" height="10" />
                <rect x="50" y="10" width="10" height="10" />
                <rect x="35" y="25" width="10" height="10" />
                <rect x="50" y="35" width="10" height="10" />
                <rect x="65" y="45" width="10" height="10" />
                <rect x="35" y="50" width="10" height="10" />
                <rect x="50" y="65" width="10" height="10" />
                <rect x="65" y="70" width="10" height="10" />
                <rect x="80" y="55" width="10" height="10" />
              </svg>
              <p className="text-[10px] text-slate-500 font-semibold mt-2">
                Scan via official GST e-Invoice QR App
              </p>
            </div>

            {/* Cryptographic IRN Hash */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                64-Character IRN Hash
              </span>
              <p className="font-mono text-[10px] bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-700 break-all leading-tight select-all">
                {selectedInvoice.irnHash}
              </p>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Invoice Ref:</span>
                <span className="font-bold text-slate-800 font-mono">{selectedInvoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recipient GSTIN:</span>
                <span className="font-mono text-slate-800 font-bold">{selectedInvoice.gstin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Acknowledgment:</span>
                <span className="font-mono text-slate-800">{selectedInvoice.ackNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-800">{selectedInvoice.ackDate}</span>
              </div>
            </div>

            <button
              onClick={() => showToast(`Signed Payload downloaded for ${selectedInvoice.invoiceNumber}`)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <i className="fa-solid fa-download text-xs" />
              <span>Download Signed Invoice Payload</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
