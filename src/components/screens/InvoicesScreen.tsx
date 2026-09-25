import React, { useState } from 'react';
import { Invoice, InvoicePaymentRecord, ScreenType } from '../../types/erp';
import { INITIAL_EXTENDED_INVOICES } from '../../data/invoicesData';
import { InvoicesAllSubpage } from './invoices/InvoicesAllSubpage';
import { CreateInvoiceSubpage } from './invoices/CreateInvoiceSubpage';
import { UnpaidOverdueSubpage } from './invoices/UnpaidOverdueSubpage';
import { RecurringInvoicesSubpage } from './invoices/RecurringInvoicesSubpage';
import { CreditNotesSubpage } from './invoices/CreditNotesSubpage';
import { DebitNotesSubpage } from './invoices/DebitNotesSubpage';
import { EWayBillsSubpage } from './invoices/EWayBillsSubpage';
import { EInvoicingSubpage } from './invoices/EInvoicingSubpage';
import { PaymentReceiptsSubpage } from './invoices/PaymentReceiptsSubpage';

export type InvoicesSubPageKey =
  | 'All Invoices'
  | 'Create Invoice'
  | 'Unpaid & Overdue'
  | 'Recurring Invoices'
  | 'Credit Notes'
  | 'Debit Notes'
  | 'E-Way Bills'
  | 'E-Invoicing (IRN)'
  | 'Payment Receipts';

interface InvoicesScreenProps {
  invoices?: Invoice[];
  onSelectInvoice?: (invoice: Invoice) => void;
  onMarkAsPaid?: (invoiceId: string) => void;
  activeSubPage?: string;
  onSelectSubPage?: (subpage: string) => void;
  onNavigateToScreen?: (screen: ScreenType) => void;
}

interface InvoicesTabConfig {
  id: InvoicesSubPageKey;
  label: string;
  icon: string;
  badge?: string;
  description: string;
}

const INVOICES_TABS: InvoicesTabConfig[] = [
  {
    id: 'All Invoices',
    label: 'All Invoices',
    icon: 'fa-regular fa-file-lines',
    badge: '142',
    description: 'Master GST tax invoice ledger, dynamic PDF preview, inspector drawer & collection status',
  },
  {
    id: 'Create Invoice',
    label: 'Create Invoice',
    icon: 'fa-solid fa-plus',
    description: 'B2B GST tax invoice generator with automatic HSN (320910/321490) & live calculation',
  },
  {
    id: 'Unpaid & Overdue',
    label: 'Unpaid & Overdue',
    icon: 'fa-solid fa-hourglass-half',
    badge: '24',
    description: 'Credit aging buckets (0-30, 31-60, 60+ days) & WhatsApp payment collection reminders',
  },
  {
    id: 'Recurring Invoices',
    label: 'Recurring Invoices',
    icon: 'fa-solid fa-repeat',
    badge: '4',
    description: 'Automated recurring wholesale supply agreements & project retainers',
  },
  {
    id: 'Credit Notes',
    label: 'Credit Notes',
    icon: 'fa-solid fa-file-invoice-dollar',
    badge: '18',
    description: 'Section 34 GST credit notes for damaged paint cans, batch returns & discount adjustments',
  },
  {
    id: 'Debit Notes',
    label: 'Debit Notes',
    icon: 'fa-solid fa-file-circle-plus',
    badge: '7',
    description: 'Supplementary debit notes for freight adjustments & delayed payment interest',
  },
  {
    id: 'E-Way Bills',
    label: 'E-Way Bills',
    icon: 'fa-solid fa-truck-fast',
    badge: '12',
    description: 'Government 12-digit E-Way Bill generation, vehicle Part-B updates & route tracking',
  },
  {
    id: 'E-Invoicing (IRN)',
    label: 'E-Invoicing (IRN)',
    icon: 'fa-solid fa-qrcode',
    description: 'NIC GST Portal 64-char Hash IRN generation, Signed QR codes & Ack numbers',
  },
  {
    id: 'Payment Receipts',
    label: 'Payment Receipts',
    icon: 'fa-solid fa-money-check-dollar',
    badge: '68',
    description: 'Official money receipts, NEFT/RTGS UTR registry & bank clearance reconciliation',
  },
];

export const InvoicesScreen: React.FC<InvoicesScreenProps> = ({
  invoices: initialPropInvoices,
  onSelectInvoice: propOnSelectInvoice,
  onMarkAsPaid: propOnMarkAsPaid,
  activeSubPage = 'All Invoices',
  onSelectSubPage,
}) => {
  const [internalInvoices, setInternalInvoices] = useState<Invoice[]>(
    initialPropInvoices && initialPropInvoices.length > 0 ? initialPropInvoices : INITIAL_EXTENDED_INVOICES
  );
  const [currentTab, setCurrentTab] = useState<InvoicesSubPageKey>(
    (activeSubPage as InvoicesSubPageKey) || 'All Invoices'
  );

  // Sync when prop changes
  React.useEffect(() => {
    if (activeSubPage) {
      setCurrentTab(activeSubPage as InvoicesSubPageKey);
    }
  }, [activeSubPage]);

  const handleTabChange = (tab: InvoicesSubPageKey) => {
    setCurrentTab(tab);
    if (onSelectSubPage) {
      onSelectSubPage(tab);
    }
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    setInternalInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'Paid',
              amountPaid: inv.amountRaw,
              balanceDue: 0,
            }
          : inv
      )
    );
    if (propOnMarkAsPaid) {
      propOnMarkAsPaid(invoiceId);
    }
  };

  const handleRecordPayment = (invoiceId: string, payment: InvoicePaymentRecord) => {
    setInternalInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const newPayments = [payment, ...(inv.payments || [])];
          const currentPaid = inv.amountPaid || 0;
          const newTotalPaid = currentPaid + payment.amount;
          const newBalance = Math.max(0, inv.amountRaw - newTotalPaid);
          const newStatus = newBalance === 0 ? 'Paid' : 'Partially Paid';

          return {
            ...inv,
            payments: newPayments,
            amountPaid: newTotalPaid,
            balanceDue: newBalance,
            status: newStatus,
          };
        }
        return inv;
      })
    );
  };

  const handleSaveNewInvoice = (newInvoice: Invoice) => {
    setInternalInvoices([newInvoice, ...internalInvoices]);
    handleTabChange('All Invoices');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Banner Navigation & Subpages Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Module Title Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base font-bold shadow-xs">
                <i className="fa-regular fa-file-lines" />
              </span>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  Invoices &amp; Billing Module
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  GST compliant invoicing (HSN 320910), E-Way Bills, E-Invoicing (IRN), Credit Notes &amp; Collections
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              GSTIN: <strong className="text-slate-800">08AAACS1294K1Z8</strong> (Rajasthan)
            </span>
          </div>
        </div>

        {/* Subpages Tabs Navigation */}
        <div className="flex items-center space-x-1 p-2 bg-slate-50/80 overflow-x-auto select-none border-t border-slate-100">
          {INVOICES_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <i className={`${tab.icon} text-xs ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subpage Views Rendering */}
      <div>
        {currentTab === 'All Invoices' && (
          <InvoicesAllSubpage
            invoices={internalInvoices}
            onSelectInvoice={(inv) => {
              if (propOnSelectInvoice) propOnSelectInvoice(inv);
            }}
            onMarkAsPaid={handleMarkAsPaid}
            onRecordPayment={handleRecordPayment}
            onOpenCreateInvoice={() => handleTabChange('Create Invoice')}
          />
        )}

        {currentTab === 'Create Invoice' && (
          <CreateInvoiceSubpage
            onSaveInvoice={handleSaveNewInvoice}
            onCancel={() => handleTabChange('All Invoices')}
          />
        )}

        {currentTab === 'Unpaid & Overdue' && (
          <UnpaidOverdueSubpage
            invoices={internalInvoices}
            onSelectInvoice={(inv) => {
              if (propOnSelectInvoice) propOnSelectInvoice(inv);
            }}
            onMarkAsPaid={handleMarkAsPaid}
          />
        )}

        {currentTab === 'Recurring Invoices' && <RecurringInvoicesSubpage />}

        {currentTab === 'Credit Notes' && <CreditNotesSubpage />}

        {currentTab === 'Debit Notes' && <DebitNotesSubpage />}

        {currentTab === 'E-Way Bills' && <EWayBillsSubpage />}

        {currentTab === 'E-Invoicing (IRN)' && <EInvoicingSubpage />}

        {currentTab === 'Payment Receipts' && <PaymentReceiptsSubpage />}
      </div>
    </div>
  );
};
