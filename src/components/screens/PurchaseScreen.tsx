import React, { useState, useEffect } from 'react';
import { PurchaseOrderRecord, ScreenType } from '../../types/erp';
import { INITIAL_PURCHASE_ORDERS } from '../../data/purchaseData';
import { PurchaseDashboardSubpage } from './purchase/PurchaseDashboardSubpage';
import { PurchaseOrdersSubpage } from './purchase/PurchaseOrdersSubpage';
import { SuppliersSubpage } from './purchase/SuppliersSubpage';
import { GoodsReceiptSubpage } from './purchase/GoodsReceiptSubpage';
import { PurchaseReturnsSubpage } from './purchase/PurchaseReturnsSubpage';
import { PurchaseInvoicesSubpage } from './purchase/PurchaseInvoicesSubpage';
import { PaymentsToSuppliersSubpage } from './purchase/PaymentsToSuppliersSubpage';
import { MaterialCostTrackingSubpage } from './purchase/MaterialCostTrackingSubpage';

export type PurchaseSubPageKey =
  | 'Purchase Dashboard'
  | 'Purchase Orders'
  | 'Suppliers'
  | 'Goods Receipt (GRN)'
  | 'Purchase Returns'
  | 'Purchase Invoices'
  | 'Payments to Suppliers'
  | 'Material Cost Tracking';

interface PurchaseScreenProps {
  activeSubPage?: string;
  onSelectSubPage?: (subpage: string) => void;
  onNavigateToScreen?: (screen: ScreenType) => void;
}

interface PurchaseTabConfig {
  id: PurchaseSubPageKey;
  label: string;
  icon: string;
  badge?: string;
  description: string;
}

const PURCHASE_TABS: PurchaseTabConfig[] = [
  {
    id: 'Purchase Dashboard',
    label: 'Purchase Dashboard',
    icon: 'fa-solid fa-cart-shopping',
    description: 'Manage suppliers, purchase orders, raw materials, GRN (goods receipt), and payments.',
  },
  {
    id: 'Purchase Orders',
    label: 'Purchase Orders',
    icon: 'fa-solid fa-file-invoice',
    badge: '24',
    description: 'Master purchase orders register, supplier dispatch tracking & expected arrivals',
  },
  {
    id: 'Suppliers',
    label: 'Suppliers',
    icon: 'fa-solid fa-handshake',
    badge: '18',
    description: 'Approved chemical and minerals vendor directory, contact persons & payment terms',
  },
  {
    id: 'Goods Receipt (GRN)',
    label: 'Goods Receipt (GRN)',
    icon: 'fa-solid fa-truck-ramp-box',
    badge: '22',
    description: 'Warehouse inbound gate entries, weighbridge slips & QC laboratory clearances',
  },
  {
    id: 'Purchase Returns',
    label: 'Purchase Returns',
    icon: 'fa-solid fa-arrow-rotate-left',
    badge: '2',
    description: 'Return to Vendor (RTV) slips, debit notes & off-spec material recovery',
  },
  {
    id: 'Purchase Invoices',
    label: 'Purchase Invoices',
    icon: 'fa-solid fa-receipt',
    description: 'Vendor tax invoices, 3-way matching (PO vs GRN vs Invoice) & GST ITC claims',
  },
  {
    id: 'Payments to Suppliers',
    label: 'Payments to Suppliers',
    icon: 'fa-solid fa-money-bill-transfer',
    badge: '₹6.2L',
    description: 'Accounts payable ledger, bank RTGS / NEFT disbursements & UTR tracking',
  },
  {
    id: 'Material Cost Tracking',
    label: 'Material Cost Tracking',
    icon: 'fa-solid fa-chart-line-up',
    description: 'Commodity price trends for Titanium Dioxide, Acrylic Polymers & packaging drums',
  },
];

export const PurchaseScreen: React.FC<PurchaseScreenProps> = ({
  activeSubPage = 'Purchase Dashboard',
  onSelectSubPage,
}) => {
  const [orders, setOrders] = useState<PurchaseOrderRecord[]>(INITIAL_PURCHASE_ORDERS);
  const [currentTab, setCurrentTab] = useState<PurchaseSubPageKey>(
    (activeSubPage as PurchaseSubPageKey) || 'Purchase Dashboard'
  );

  // Sync if activeSubPage changes from sidebar
  useEffect(() => {
    if (activeSubPage && activeSubPage !== currentTab) {
      setCurrentTab(activeSubPage as PurchaseSubPageKey);
    }
  }, [activeSubPage]);

  const handleTabChange = (tabId: PurchaseSubPageKey) => {
    setCurrentTab(tabId);
    if (onSelectSubPage) {
      onSelectSubPage(tabId);
    }
  };

  const handleCreateOrder = (newOrder: PurchaseOrderRecord) => {
    setOrders([newOrder, ...orders]);
  };

  const handleUpdateOrderStatus = (poId: string, status: PurchaseOrderRecord['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === poId ? { ...o, status } : o))
    );
  };

  const currentTabConfig = PURCHASE_TABS.find((t) => t.id === currentTab) || PURCHASE_TABS[0];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Top Header Banner matching Screenshot */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold shadow-2xs">
              <i className="fa-solid fa-cart-shopping" />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                Purchase Management
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage suppliers, purchase orders, raw materials, GRN (goods receipt), and payments.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => handleTabChange('Purchase Orders')}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-2xs transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Create Purchase Order</span>
          </button>

          <button
            onClick={() => alert('Import Raw Material PO / GRN data from CSV / Excel file.')}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-2xs transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-download text-slate-500 text-[11px]" />
            <span>Import</span>
          </button>

          <button
            onClick={() => alert('Procurement Settings & Material Reorder Rules')}
            className="w-8 h-8 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center text-xs"
          >
            <i className="fa-solid fa-ellipsis" />
          </button>
        </div>
      </div>

      {/* Sub-Pages Navigation Tabs Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 bg-slate-50/50 px-2 pt-2">
          {PURCHASE_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition relative border-b-2 ${
                  isActive
                    ? 'bg-white text-blue-700 border-blue-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 border-transparent'
                }`}
              >
                <i
                  className={`${tab.icon} text-xs ${
                    isActive ? 'text-blue-600' : 'text-slate-400'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Context Subtitle */}
        <div className="px-5 py-2.5 bg-white flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
          <span className="flex items-center gap-2 font-medium">
            <i className="fa-solid fa-circle-info text-blue-500 text-[11px]" />
            {currentTabConfig.description}
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
            Active Sub-Page: {currentTab}
          </span>
        </div>
      </div>

      {/* Render Active Subpage */}
      <div>
        {currentTab === 'Purchase Dashboard' && (
          <PurchaseDashboardSubpage
            orders={orders}
            onOpenCreatePO={() => handleTabChange('Purchase Orders')}
            onSelectSubpageTab={(tab) => handleTabChange(tab as PurchaseSubPageKey)}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {currentTab === 'Purchase Orders' && (
          <PurchaseOrdersSubpage
            orders={orders}
            onCreateOrder={handleCreateOrder}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        )}

        {currentTab === 'Suppliers' && <SuppliersSubpage />}

        {currentTab === 'Goods Receipt (GRN)' && <GoodsReceiptSubpage />}

        {currentTab === 'Purchase Returns' && <PurchaseReturnsSubpage />}

        {currentTab === 'Purchase Invoices' && <PurchaseInvoicesSubpage />}

        {currentTab === 'Payments to Suppliers' && <PaymentsToSuppliersSubpage />}

        {currentTab === 'Material Cost Tracking' && <MaterialCostTrackingSubpage />}
      </div>
    </div>
  );
};
