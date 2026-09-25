import React, { useState } from 'react';
import { Invoice, InvoicePaymentRecord } from '../../../types/erp';
import { InvoicePreviewDocument } from './InvoicePreviewDocument';
import { InvoiceDocumentPdfModal } from './InvoiceDocumentPdfModal';

interface InvoiceInspectorDrawerProps {
  invoice: Invoice;
  onClose: () => void;
  onMarkAsPaid: (invoiceId: string) => void;
  onRecordPayment?: (invoiceId: string, payment: InvoicePaymentRecord) => void;
}

export const InvoiceInspectorDrawer: React.FC<InvoiceInspectorDrawerProps> = ({
  invoice,
  onClose,
  onMarkAsPaid,
  onRecordPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'Invoice' | 'Payments' | 'E-Way Bill' | 'Notes' | 'History'>('Invoice');
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick Payment form state
  const [paymentAmount, setPaymentAmount] = useState<number>(invoice.balanceDue ?? invoice.amountRaw);
  const [paymentMode, setPaymentMode] = useState<InvoicePaymentRecord['mode']>('NEFT / RTGS');
  const [paymentUtr, setPaymentUtr] = useState<string>('');
  const [paymentBank, setPaymentBank] = useState<string>('HDFC Bank');
  const [paymentNotes, setPaymentNotes] = useState<string>('');

  // Notes state
  const [notesList, setNotesList] = useState<string[]>(
    invoice.notes ? [invoice.notes] : ['Payment reminder scheduled for 20th Aug.']
  );
  const [newNoteInput, setNewNoteInput] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    setNotesList([newNoteInput.trim(), ...notesList]);
    setNewNoteInput('');
    showToast('Internal note saved!');
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) return;

    const newPayment: InvoicePaymentRecord = {
      id: `pay-${Date.now()}`,
      paymentDate: 'Today',
      amount: paymentAmount,
      mode: paymentMode,
      referenceUtr: paymentUtr || `UTR-${Date.now().toString().slice(-6)}`,
      bankName: paymentBank,
      recordedBy: 'Pooja (Accounts)',
      notes: paymentNotes || 'Payment recorded via Inspector',
    };

    if (onRecordPayment) {
      onRecordPayment(invoice.id, newPayment);
    } else {
      onMarkAsPaid(invoice.id);
    }

    setShowPaymentModal(false);
    showToast(`Payment of ₹${paymentAmount.toLocaleString('en-IN')} recorded successfully!`);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${invoice.customer},\n\nYour GST Tax Invoice ${invoice.invoiceNumber} for ₹${invoice.amountRaw.toLocaleString('en-IN')} is ready.\nDue Date: ${invoice.dueDate}.\n\nThank you, Swatch Paints.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast('WhatsApp dispatch link triggered!');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Tax Invoice ${invoice.invoiceNumber} - Swatch Paints India Pvt Ltd`);
    const body = encodeURIComponent(
      `Dear ${invoice.customer},\n\nPlease find attached your tax invoice ${invoice.invoiceNumber} for amount ${invoice.amount}.\n\nThank you,\nSwatch Paints Accounts Team`
    );
    window.location.href = `mailto:${invoice.email || ''}?subject=${subject}&body=${body}`;
    showToast('Email client opened with invoice details!');
  };

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Partially Paid':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Overdue':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full animate-in slide-in-from-right duration-200 relative select-none">
      {/* Toast notification */}
      {toastMessage && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <i className="fa-solid fa-circle-check text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header matching user screenshot */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-white shrink-0">
        <div className="flex items-start gap-3 truncate">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base shrink-0">
            <i className="fa-regular fa-file-lines text-lg" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight truncate">
                {invoice.invoiceNumber}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(invoice.status)}`}>
                ● {invoice.status}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-0.5 truncate">
              {invoice.customer} • {invoice.customerType || 'Dealer'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Billing Date: <span className="font-semibold text-slate-600">{invoice.date}</span> (Due: {invoice.dueDate})
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition shrink-0"
          title="Close Inspector"
        >
          ✕
        </button>
      </div>

      {/* Action Buttons Row matching screenshot */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Send via WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
          >
            <i className="fa-brands fa-whatsapp" />
            <span>Send via WhatsApp</span>
          </button>

          {/* Send Email */}
          <button
            onClick={handleSendEmail}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <i className="fa-regular fa-envelope text-slate-500" />
            <span>Send Email</span>
          </button>

          {/* Download PDF button */}
          <button
            onClick={() => setShowPdfModal(true)}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <i className="fa-solid fa-file-arrow-down text-blue-600" />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="flex items-center gap-2 relative">
          {invoice.status !== 'Paid' && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <i className="fa-solid fa-indian-rupee-sign text-xs" />
              <span>Record Payment</span>
            </button>
          )}

          {/* More Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition"
              title="More Options"
            >
              <i className="fa-solid fa-ellipsis-vertical text-xs px-1" />
            </button>

            {showMoreActions && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-30 text-xs">
                <button
                  onClick={() => {
                    setShowMoreActions(false);
                    setShowPdfModal(true);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <i className="fa-solid fa-print text-slate-400 text-xs" />
                  <span>Print Tax Invoice</span>
                </button>
                <button
                  onClick={() => {
                    setShowMoreActions(false);
                    onMarkAsPaid(invoice.id);
                    showToast('Marked as full paid!');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 text-emerald-600 font-semibold flex items-center gap-2"
                >
                  <i className="fa-solid fa-check-double text-emerald-500 text-xs" />
                  <span>Quick Settle Full Bill</span>
                </button>
                <button
                  onClick={() => {
                    setShowMoreActions(false);
                    showToast('E-Way Bill 2810 4492 8192 refreshed from NIC!');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <i className="fa-solid fa-truck-fast text-slate-400 text-xs" />
                  <span>Sync E-Way Bill</span>
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => {
                    setShowMoreActions(false);
                    showToast('Duplicate draft created!');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-600 flex items-center gap-2"
                >
                  <i className="fa-regular fa-copy text-slate-400 text-xs" />
                  <span>Duplicate Invoice</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 px-4 sm:px-5 bg-white flex items-center space-x-6 text-xs font-bold shrink-0">
        {(['Invoice', 'Payments', 'E-Way Bill', 'Notes', 'History'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 border-b-2 transition relative ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
            {tab === 'Payments' && invoice.payments && invoice.payments.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-emerald-100 text-emerald-700 text-[10px] rounded-full">
                {invoice.payments.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50">
        {/* Tab 1: Live Formatted Invoice Document */}
        {activeTab === 'Invoice' && (
          <div className="space-y-4">
            <InvoicePreviewDocument invoice={invoice} onDownloadPdf={() => setShowPdfModal(true)} />
          </div>
        )}

        {/* Tab 2: Payments & Collection Ledger */}
        {activeTab === 'Payments' && (
          <div className="space-y-5">
            {/* Payment Summary Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Total Invoiced</span>
                <span className="text-base font-black text-slate-900 font-mono mt-0.5 block">
                  {invoice.amount}
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-semibold text-emerald-600 uppercase block">Total Paid</span>
                <span className="text-base font-black text-emerald-700 font-mono mt-0.5 block">
                  ₹{(invoice.amountPaid ?? (invoice.status === 'Paid' ? invoice.amountRaw : 0)).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-semibold text-rose-500 uppercase block">Balance Due</span>
                <span className="text-base font-black text-rose-600 font-mono mt-0.5 block">
                  ₹{(invoice.balanceDue ?? (invoice.status === 'Paid' ? 0 : invoice.amountRaw)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action to Record Payment */}
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Payment Transactions &amp; Receipts
              </h4>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <i className="fa-solid fa-plus text-xs" />
                <span>Record New Payment</span>
              </button>
            </div>

            {/* Payment List */}
            {invoice.payments && invoice.payments.length > 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100 text-xs">
                {invoice.payments.map((p) => (
                  <div key={p.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-mono">
                          ₹{p.amount.toLocaleString('en-IN')}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {p.mode}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Ref UTR: <strong className="text-slate-700 font-mono">{p.referenceUtr}</strong> • Bank: {p.bankName || 'Direct'}
                      </p>
                      {p.notes && <p className="text-[10px] text-slate-400 italic">{p.notes}</p>}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold">{p.paymentDate}</span>
                      <span className="text-[10px] text-emerald-600 font-bold">Cleared</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs space-y-2">
                <i className="fa-regular fa-money-bill-1 text-2xl text-slate-300" />
                <p>No payment entries logged yet for this invoice.</p>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
                >
                  Log First Payment Entry
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: E-Way Bill */}
        {activeTab === 'E-Way Bill' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Government of India • GST E-Way Bill
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">
                    {invoice.eWayBillNumber || '2810 4492 8192'}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ● Active / In Transit
                  </span>
                </div>

                <button
                  onClick={() => {
                    showToast('E-Way Bill slip print triggered!');
                    window.print();
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <i className="fa-solid fa-print text-xs" />
                  <span>Print E-Way Slip</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Generated Date</span>
                  <span className="font-bold text-slate-800">{invoice.date}, 12:45 PM</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Valid Upto</span>
                  <span className="font-bold text-rose-600">12 Aug 2025, 11:59 PM</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Vehicle Number</span>
                  <span className="font-bold text-slate-800 font-mono">RJ-14-GA-8821</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Transporter</span>
                  <span className="font-bold text-slate-800 truncate block">Rajasthan Golden Transport</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Dispatch From</span>
                  <span className="font-bold text-slate-800">Jaipur Plant (Sitapura)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ship To</span>
                  <span className="font-bold text-slate-800">{invoice.shippingAddress?.split(',')[1]?.trim() || 'Jodhpur'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notes & Terms */}
        {activeTab === 'Notes' && (
          <div className="space-y-4">
            {/* Add note */}
            <form onSubmit={handleAddNote} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Add Internal Accounts Note</label>
              <textarea
                rows={2}
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                placeholder="E.g., Spoke with Mr. Sharma; promised balance via RTGS on Friday..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNoteInput.trim()}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition"
                >
                  Save Note
                </button>
              </div>
            </form>

            {/* List */}
            <div className="space-y-2">
              {notesList.map((n, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-xs">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-600">Pooja (Accounts)</span>
                    <span>Recent</span>
                  </div>
                  <p>{n}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: History */}
        {activeTab === 'History' && (
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">
                Lifecycle &amp; Audit Trail
              </h4>
              <div className="relative pl-6 border-l-2 border-slate-200 space-y-4 text-xs">
                {(invoice.history && invoice.history.length > 0
                  ? invoice.history
                  : [
                      {
                        id: 'h1',
                        time: `${invoice.date}, 10:00 AM`,
                        action: 'Tax invoice created from sales order',
                        user: 'Sales Desk',
                      },
                      {
                        id: 'h2',
                        time: `${invoice.date}, 11:30 AM`,
                        action: 'Dispatched via WhatsApp & Email to dealer',
                        user: 'Auto Dispatcher',
                      },
                    ]
                ).map((ev) => (
                  <div key={ev.id} className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                    <div>
                      <p className="font-bold text-slate-900">{ev.action}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{ev.time}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-600">{ev.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Record Payment Dialog Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-indian-rupee-sign" />
                </span>
                <h3 className="text-sm font-black text-slate-900">
                  Record Payment for {invoice.invoiceNumber}
                </h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Payment Amount (₹)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Remaining balance on invoice: ₹{(invoice.balanceDue ?? invoice.amountRaw).toLocaleString('en-IN')}
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="NEFT / RTGS">NEFT / RTGS</option>
                  <option value="Cheque">Cheque</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Adjustment">Credit Note Adjustment</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Bank Reference UTR / Cheque #</label>
                <input
                  type="text"
                  placeholder="e.g. HDFCR52025081099238"
                  value={paymentUtr}
                  onChange={(e) => setPaymentUtr(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deposited Bank / Branch</label>
                <input
                  type="text"
                  value={paymentBank}
                  onChange={(e) => setPaymentBank(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Save &amp; Generate Money Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Viewer Full Screen Modal */}
      {showPdfModal && (
        <InvoiceDocumentPdfModal
          invoice={invoice}
          isOpen={showPdfModal}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </div>
  );
};
