import React, { useState } from 'react';
import { Invoice } from '../../../types/erp';
import { InvoiceDocumentPdfModal } from './InvoiceDocumentPdfModal';

interface UnpaidOverdueSubpageProps {
  invoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
  onMarkAsPaid: (invoiceId: string) => void;
}

export const UnpaidOverdueSubpage: React.FC<UnpaidOverdueSubpageProps> = ({
  invoices,
  onSelectInvoice,
  onMarkAsPaid,
}) => {
  const [selectedAgingBucket, setSelectedAgingBucket] = useState<'All' | '0-15' | '16-30' | '31-60' | '60+'>('All');
  const [selectedPdfInvoice, setSelectedPdfInvoice] = useState<Invoice | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter only unpaid/overdue/partially paid
  const pendingInvoices = invoices.filter(
    (inv) => inv.status === 'Pending' || inv.status === 'Overdue' || inv.status === 'Partially Paid'
  );

  const totalOverdueAmount = pendingInvoices.reduce(
    (sum, inv) => sum + (inv.balanceDue ?? inv.amountRaw),
    0
  );

  const handleSendReminder = (inv: Invoice, channel: 'WhatsApp' | 'SMS' | 'Email') => {
    const balance = (inv.balanceDue ?? inv.amountRaw).toLocaleString('en-IN');
    if (channel === 'WhatsApp') {
      const msg = encodeURIComponent(
        `Dear ${inv.customer},\nThis is a friendly payment reminder from Swatch Paints India Pvt Ltd.\nInvoice ${inv.invoiceNumber} has a pending balance of ₹${balance} (Due: ${inv.dueDate}).\nPlease initiate NEFT/RTGS to our ICICI account 001205018492.\nThank you!`
      );
      window.open(`https://wa.me/?text=${msg}`, '_blank');
      showToast(`WhatsApp reminder dispatched to ${inv.customer}!`);
    } else {
      showToast(`${channel} reminder sent successfully!`);
    }
  };

  const handleBatchReminder = () => {
    showToast(`Batch payment reminders sent to all ${pendingInvoices.length} outstanding accounts!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
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
            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-hourglass-half" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Unpaid &amp; Overdue Receivables Aging</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Credit control ledger · Dealer credit aging buckets, payment follow-up schedules &amp; WhatsApp reminders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Outstanding</span>
            <span className="text-lg font-black text-rose-600 font-mono">
              ₹{(totalOverdueAmount / 100000).toFixed(2)} Lakhs
            </span>
          </div>
          <button
            onClick={handleBatchReminder}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
          >
            <i className="fa-brands fa-whatsapp" />
            <span>Send Batch Reminders</span>
          </button>
        </div>
      </div>

      {/* Aging Buckets Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div
          onClick={() => setSelectedAgingBucket(selectedAgingBucket === '0-15' ? 'All' : '0-15')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            selectedAgingBucket === '0-15'
              ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200'
              : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
              0 - 15 Days (Current)
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              Normal
            </span>
          </div>
          <p className="text-xl font-black text-slate-900 font-mono mt-2">₹1,78,500</p>
          <p className="text-[10px] text-slate-400 mt-1">1 Account • Due within terms</p>
        </div>

        <div
          onClick={() => setSelectedAgingBucket(selectedAgingBucket === '16-30' ? 'All' : '16-30')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            selectedAgingBucket === '16-30'
              ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-200'
              : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
              16 - 30 Days (Follow-up)
            </span>
            <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
              Caution
            </span>
          </div>
          <p className="text-xl font-black text-slate-900 font-mono mt-2">₹98,600</p>
          <p className="text-[10px] text-slate-400 mt-1">1 Account • Part payment received</p>
        </div>

        <div
          onClick={() => setSelectedAgingBucket(selectedAgingBucket === '31-60' ? 'All' : '31-60')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            selectedAgingBucket === '31-60'
              ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200'
              : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
              31 - 60 Days (Critical)
            </span>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              High Risk
            </span>
          </div>
          <p className="text-xl font-black text-slate-900 font-mono mt-2">₹1,92,800</p>
          <p className="text-[10px] text-slate-400 mt-1">1 Account • Overdue since 14 Aug</p>
        </div>

        <div
          onClick={() => setSelectedAgingBucket(selectedAgingBucket === '60+' ? 'All' : '60+')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            selectedAgingBucket === '60+'
              ? 'bg-red-50/70 border-red-300 ring-2 ring-red-200'
              : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
              60+ Days (Legal/Default)
            </span>
            <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
              Urgent
            </span>
          </div>
          <p className="text-xl font-black text-slate-900 font-mono mt-2">₹8,92,400</p>
          <p className="text-[10px] text-slate-400 mt-1">1 Account • Institutional Contractor</p>
        </div>
      </div>

      {/* Overdue Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Outstanding Accounts Ledger
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
              {pendingInvoices.length} Active Dues
            </span>
          </div>
          <span className="text-xs text-slate-500">Average DSO: <strong>32 Days</strong> (Target: &lt;25)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Customer / Dealer</th>
                <th className="py-3 px-4">Billing Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Invoiced Amount</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Follow-up Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {pendingInvoices.map((inv) => {
                const bal = inv.balanceDue ?? inv.amountRaw;
                return (
                  <tr key={inv.id} className="hover:bg-slate-50 transition">
                    <td
                      onClick={() => onSelectInvoice(inv)}
                      className="py-3 px-4 font-bold text-blue-600 hover:underline cursor-pointer font-mono"
                    >
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{inv.customer}</span>
                      <span className="text-[10px] text-slate-400">
                        {inv.phone} • {inv.customerType || 'Dealer'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{inv.date}</td>
                    <td className="py-3 px-4 font-semibold text-rose-600">{inv.dueDate}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-600 tabular-nums">
                      {inv.amount}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-rose-600 font-mono tabular-nums">
                      ₹{bal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inv.status === 'Overdue'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleSendReminder(inv, 'WhatsApp')}
                        className="px-2.5 py-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                        title="Send WhatsApp Reminder"
                      >
                        <i className="fa-brands fa-whatsapp mr-1" />
                        Remind
                      </button>
                      <button
                        onClick={() => setSelectedPdfInvoice(inv)}
                        className="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                      >
                        View Bill
                      </button>
                      <button
                        onClick={() => onMarkAsPaid(inv.id)}
                        className="px-2.5 py-1 text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                      >
                        Record Paid
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Modal */}
      {selectedPdfInvoice && (
        <InvoiceDocumentPdfModal
          invoice={selectedPdfInvoice}
          isOpen={!!selectedPdfInvoice}
          onClose={() => setSelectedPdfInvoice(null)}
        />
      )}
    </div>
  );
};
