import React, { useState } from 'react';
import { Invoice, InvoicePaymentRecord } from '../../../types/erp';
import { InvoiceInspectorDrawer } from './InvoiceInspectorDrawer';
import { InvoiceDocumentPdfModal } from './InvoiceDocumentPdfModal';

interface InvoicesAllSubpageProps {
  invoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
  onMarkAsPaid: (invoiceId: string) => void;
  onRecordPayment?: (invoiceId: string, payment: InvoicePaymentRecord) => void;
  onOpenCreateInvoice: () => void;
}

export const InvoicesAllSubpage: React.FC<InvoicesAllSubpageProps> = ({
  invoices,
  onSelectInvoice,
  onMarkAsPaid,
  onRecordPayment,
  onOpenCreateInvoice,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(invoices[0]?.id || null);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [pdfModalInvoice, setPdfModalInvoice] = useState<Invoice | null>(null);

  // Active invoice for drawer
  const activeInvoice = invoices.find((inv) => inv.id === selectedInvoiceId) || invoices[0];

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus = filterStatus === 'All' || inv.status === filterStatus;
    const q = search.toLowerCase();
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.customer.toLowerCase().includes(q) ||
      inv.orderNumber.toLowerCase().includes(q) ||
      (inv.customerType && inv.customerType.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amountRaw, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + (inv.amountPaid ?? (inv.status === 'Paid' ? inv.amountRaw : 0)), 0);
  const totalPending = invoices
    .filter((inv) => inv.status === 'Pending' || inv.status === 'Partially Paid')
    .reduce((sum, inv) => sum + (inv.balanceDue ?? inv.amountRaw), 0);
  const totalOverdue = invoices
    .filter((inv) => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + (inv.balanceDue ?? inv.amountRaw), 0);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowIds(filteredInvoices.map((i) => i.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter((item) => item !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  return (
    <div className="space-y-5">
      {/* 4 Top KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Invoiced
            </span>
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-file-invoice" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              ₹{(totalAmount / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">{invoices.length} Bills</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
              Paid &amp; Realized
            </span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-circle-check" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-700 font-mono">
              ₹{(totalPaid / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">
              {Math.round((totalPaid / (totalAmount || 1)) * 100)}%
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
              Pending Receivables
            </span>
            <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-clock" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-amber-600 font-mono">
              ₹{(totalPending / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[10px] text-amber-600 font-semibold">Current cycle</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">
              Overdue &gt; 15 Days
            </span>
            <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-triangle-exclamation" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-rose-600 font-mono">
              ₹{(totalOverdue / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded">
              Action Req.
            </span>
          </div>
        </div>
      </div>

      {/* Action and Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Status Filter Chips */}
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 overflow-x-auto">
          {['All', 'Paid', 'Pending', 'Partially Paid', 'Overdue'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                filterStatus === st
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              {st}
              {st !== 'All' && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({invoices.filter((i) => i.status === st).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search & New Invoice Action */}
        <div className="flex items-center space-x-2.5">
          <div className="relative flex-1 sm:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search invoice #, dealer, SO..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <button
            onClick={onOpenCreateInvoice}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs shrink-0"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Invoices Table + Inspector Drawer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Invoices Table Column */}
        <div className={`${selectedInvoiceId ? 'xl:col-span-7' : 'xl:col-span-12'} transition-all`}>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200 select-none">
                  <tr>
                    <th className="py-3 px-3 text-center w-8">
                      <input
                        type="checkbox"
                        checked={
                          selectedRowIds.length > 0 &&
                          selectedRowIds.length === filteredInvoices.length
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-3 px-3">Invoice #</th>
                    <th className="py-3 px-3">Customer / Dealer</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 text-right">Total (Incl GST)</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {filteredInvoices.map((inv) => {
                    const isSelected = selectedInvoiceId === inv.id;
                    const isRowChecked = selectedRowIds.includes(inv.id);

                    return (
                      <tr
                        key={inv.id}
                        onClick={() => setSelectedInvoiceId(inv.id)}
                        className={`transition cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/70 border-l-4 border-l-blue-600 font-semibold'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td
                          className="py-3 px-3 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={isRowChecked}
                            onChange={() => handleToggleRow(inv.id)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-blue-600 hover:underline block font-mono">
                            {inv.invoiceNumber}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Ref: {inv.orderNumber}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 block truncate max-w-[180px]">
                            {inv.customer}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {inv.customerType || 'Dealer'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                          <div>{inv.date}</div>
                          <div className="text-[10px] text-slate-400">Due: {inv.dueDate}</div>
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono tabular-nums whitespace-nowrap">
                          {inv.amount}
                          {inv.amountPaid !== undefined && inv.amountPaid > 0 && inv.status !== 'Paid' && (
                            <span className="block text-[9px] text-emerald-600 font-normal">
                              Paid: ₹{inv.amountPaid.toLocaleString('en-IN')}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inv.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : inv.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : inv.status === 'Partially Paid'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td
                          className="py-3 px-3 text-right space-x-1 whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setPdfModalInvoice(inv)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
                            title="Download / Print PDF"
                          >
                            <i className="fa-solid fa-file-arrow-down text-xs" />
                          </button>
                          <button
                            onClick={() => setSelectedInvoiceId(inv.id)}
                            className="px-2 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                          >
                            Inspector
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Invoice Inspector Drawer Right Column */}
        {selectedInvoiceId && activeInvoice && (
          <div className="xl:col-span-5 h-[800px] sticky top-4">
            <InvoiceInspectorDrawer
              invoice={activeInvoice}
              onClose={() => setSelectedInvoiceId(null)}
              onMarkAsPaid={onMarkAsPaid}
              onRecordPayment={onRecordPayment}
            />
          </div>
        )}
      </div>

      {/* Standalone PDF Modal for direct download from table */}
      {pdfModalInvoice && (
        <InvoiceDocumentPdfModal
          invoice={pdfModalInvoice}
          isOpen={!!pdfModalInvoice}
          onClose={() => setPdfModalInvoice(null)}
        />
      )}
    </div>
  );
};
