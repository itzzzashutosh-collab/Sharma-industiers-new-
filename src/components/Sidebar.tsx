import React from 'react';
import { ScreenType } from '../types/erp';

interface SidebarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  activeSalesSubItem?: string;
  onSelectSalesSubItem?: (subItem: string) => void;
  activeCrmSubItem?: string;
  onSelectCrmSubItem?: (subItem: string) => void;
  activeQuotationsSubItem?: string;
  onSelectQuotationsSubItem?: (subItem: string) => void;
  activeInvoicesSubItem?: string;
  onSelectInvoicesSubItem?: (subItem: string) => void;
  activeInventorySubItem?: string;
  onSelectInventorySubItem?: (subItem: string) => void;
  activeProductionSubItem?: string;
  onSelectProductionSubItem?: (subItem: string) => void;
}

interface NavItem {
  id: ScreenType;
  label: string;
  icon: string;
  badge?: string;
}

export const PRODUCTION_SUB_ITEMS = [
  'Batch Schedule',
  'Batch Formulation (BOM)',
  'Quality Control (QC Lab)',
  'Plant Machinery & OEE',
  'Material Consumption',
  'Packaging & Filling',
  'Yield & Wastage',
  'Maintenance & Downtime',
] as const;

export const INVENTORY_SUB_ITEMS = [
  'Product Catalog',
  'Inventory Management',
  'Stock Movements',
  'Batch & Expiry',
  'Barcode & QR',
  'Stock Adjustment',
  'Inventory Reports',
] as const;

export const INVOICES_SUB_ITEMS = [
  'All Invoices',
  'Create Invoice',
  'Unpaid & Overdue',
  'Recurring Invoices',
  'Credit Notes',
  'Debit Notes',
  'E-Way Bills',
  'E-Invoicing (IRN)',
  'Payment Receipts',
] as const;

export const CRM_SUB_ITEMS = [
  'Leads Management',
  'Customers / Dealers',
  'Painters',
  'Contractors',
  'Follow-ups & Tasks',
  'Meetings & Calls',
] as const;

export const QUOTATIONS_SUB_ITEMS = [
  'All Quotations',
  'Create Quotation',
  'Drafts',
  'Sent Quotations',
  'Expired Quotations',
  'Converted to Orders',
  'Quotation Templates',
  'Price Lists',
] as const;

const SALES_SUB_ITEMS = [
  'Order Management',
  'New Order',
  'Order Approvals',
  'Delivery & Dispatch',
  'Return Orders',
  'Sales Targets',
  'Sales Team',
  'Reports',
];

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-house' },
  { id: 'crm', label: 'CRM (Leads & Customers)', icon: 'fa-solid fa-users', badge: '6' },
  { id: 'sales', label: 'Sales & Orders', icon: 'fa-solid fa-chart-line' },
  { id: 'quotations', label: 'Quotations', icon: 'fa-solid fa-file-invoice' },
  { id: 'invoices', label: 'Invoices & Billing', icon: 'fa-regular fa-file-lines' },
  { id: 'inventory', label: 'Products & Inventory', icon: 'fa-solid fa-boxes-stacked' },
  { id: 'production', label: 'Production (Factory)', icon: 'fa-solid fa-industry' },
  { id: 'purchase', label: 'Purchase (Raw Materials)', icon: 'fa-solid fa-cart-shopping' },
  { id: 'distribution', label: 'Distribution & Supply Chain', icon: 'fa-solid fa-truck-moving' },
  { id: 'finance', label: 'Finance & Accounts', icon: 'fa-solid fa-scale-balanced' },
  { id: 'marketing', label: 'Marketing', icon: 'fa-solid fa-bullhorn' },
  { id: 'branding', label: 'Branding', icon: 'fa-solid fa-palette' },
  { id: 'social', label: 'Social Media', icon: 'fa-solid fa-hashtag' },
  { id: 'reports', label: 'Reports & Analytics', icon: 'fa-solid fa-chart-pie' },
  { id: 'team', label: 'Team Management', icon: 'fa-solid fa-user-group' },
  { id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  isOpenMobile,
  onCloseMobile,
  activeSalesSubItem = 'Order Management',
  onSelectSalesSubItem,
  activeCrmSubItem = 'Leads Management',
  onSelectCrmSubItem,
  activeQuotationsSubItem = 'All Quotations',
  onSelectQuotationsSubItem,
  activeInvoicesSubItem = 'All Invoices',
  onSelectInvoicesSubItem,
  activeInventorySubItem = 'Product Catalog',
  onSelectInventorySubItem,
  activeProductionSubItem = 'Batch Schedule',
  onSelectProductionSubItem,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none transition-transform duration-200 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        data-purpose="sidebar-navigation"
      >
        <div className="p-3.5 overflow-y-auto max-h-[calc(100vh-100px)]">
          {/* Logo Branding Header */}
          <div className="flex items-center justify-between px-2 py-2 mb-3">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => {
                onSelectScreen('dashboard');
                onCloseMobile();
              }}
            >
              <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                <svg className="w-9 h-9 drop-shadow-sm" viewBox="0 0 100 100">
                  <path d="M20,65 Q10,35 45,20 Q60,35 35,65 Z" fill="#f97316" />
                  <path d="M45,20 Q80,10 75,45 Q50,45 45,20 Z" fill="#06b6d4" />
                  <path d="M75,45 Q90,80 50,75 Q45,55 75,45 Z" fill="#10b981" />
                  <path d="M50,75 Q20,95 20,65 Q35,60 50,75 Z" fill="#eab308" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                  SWATCH PAINTS
                </h1>
                <p className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
                  Colours for a Brighter India
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>

          {/* Navigation Link List */}
          <nav className="space-y-0.5 text-xs font-semibold" data-purpose="main-nav-links">
            {NAV_ITEMS.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <div key={item.id} className="space-y-0.5">
                  <button
                    onClick={() => {
                      onSelectScreen(item.id);
                      if (item.id !== 'sales') {
                        onCloseMobile();
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <i
                        className={`${item.icon} w-4 text-center shrink-0 ${
                          isActive ? 'text-white' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && !isActive && (
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Expandable sub-tree for CRM (Leads & Customers) when active */}
                  {item.id === 'crm' && isActive && (
                    <div className="relative pl-6 py-1 my-1 ml-3 border-l-2 border-orange-200 space-y-1">
                      {CRM_SUB_ITEMS.map((sub) => {
                        const isSubActive = activeCrmSubItem === sub;
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              onSelectScreen('crm');
                              if (onSelectCrmSubItem) {
                                onSelectCrmSubItem(sub);
                              }
                              onCloseMobile();
                            }}
                            className={`w-full flex items-center space-x-2.5 py-1 px-2 text-[11px] rounded-lg text-left transition ${
                              isSubActive
                                ? 'text-orange-600 font-bold bg-orange-50/70'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSubActive ? 'bg-orange-500 ring-2 ring-orange-200' : 'bg-slate-300'
                              }`}
                            />
                            <span className="truncate">{sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Expandable sub-tree for Quotations when active */}
                  {item.id === 'quotations' && isActive && (
                    <div className="relative pl-6 py-1 my-1 ml-3 border-l-2 border-blue-200 space-y-1">
                      {QUOTATIONS_SUB_ITEMS.map((sub) => {
                        const isSubActive = activeQuotationsSubItem === sub;
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              onSelectScreen('quotations');
                              if (onSelectQuotationsSubItem) {
                                onSelectQuotationsSubItem(sub);
                              }
                              onCloseMobile();
                            }}
                            className={`w-full flex items-center space-x-2.5 py-1 px-2 text-[11px] rounded-lg text-left transition ${
                              isSubActive
                                ? 'text-blue-600 font-bold bg-blue-50/70'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSubActive ? 'bg-blue-600 ring-2 ring-blue-300' : 'bg-slate-300'
                              }`}
                            />
                            <span className="truncate">{sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Expandable sub-tree for Invoices & Billing when active */}
                  {item.id === 'invoices' && isActive && (
                    <div className="relative pl-6 py-1 my-1 ml-3 border-l-2 border-emerald-200 space-y-1">
                      {INVOICES_SUB_ITEMS.map((sub) => {
                        const isSubActive = activeInvoicesSubItem === sub;
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              onSelectScreen('invoices');
                              if (onSelectInvoicesSubItem) {
                                onSelectInvoicesSubItem(sub);
                              }
                              onCloseMobile();
                            }}
                            className={`w-full flex items-center space-x-2.5 py-1 px-2 text-[11px] rounded-lg text-left transition ${
                              isSubActive
                                ? 'text-emerald-700 font-bold bg-emerald-50/80'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSubActive ? 'bg-emerald-600 ring-2 ring-emerald-300' : 'bg-slate-300'
                              }`}
                            />
                            <span className="truncate">{sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Expandable sub-tree for Products & Inventory when active (Matching Screenshot) */}
                  {item.id === 'inventory' && isActive && (
                    <div className="relative pl-6 py-1 my-1 ml-3 border-l-2 border-blue-200 space-y-1">
                      {INVENTORY_SUB_ITEMS.map((sub) => {
                        const isSubActive = activeInventorySubItem === sub;
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              onSelectScreen('inventory');
                              if (onSelectInventorySubItem) {
                                onSelectInventorySubItem(sub);
                              }
                              onCloseMobile();
                            }}
                            className={`w-full flex items-center space-x-2.5 py-1 px-2 text-[11px] rounded-lg text-left transition ${
                              isSubActive
                                ? 'text-blue-600 font-bold bg-blue-50/80'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSubActive ? 'bg-blue-600 ring-2 ring-blue-300' : 'bg-slate-300'
                              }`}
                            />
                            <span className="truncate">{sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Expandable sub-tree for Production (Factory) when active */}
                  {item.id === 'production' && isActive && (
                    <div className="relative pl-6 py-1 my-1 ml-3 border-l-2 border-amber-200 space-y-1">
                      {PRODUCTION_SUB_ITEMS.map((sub) => {
                        const isSubActive = activeProductionSubItem === sub;
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              onSelectScreen('production');
                              if (onSelectProductionSubItem) {
                                onSelectProductionSubItem(sub);
                              }
                              onCloseMobile();
                            }}
                            className={`w-full flex items-center space-x-2.5 py-1 px-2 text-[11px] rounded-lg text-left transition ${
                              isSubActive
                                ? 'text-amber-700 font-bold bg-amber-50/80'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSubActive ? 'bg-amber-600 ring-2 ring-amber-300' : 'bg-slate-300'
                              }`}
                            />
                            <span className="truncate">{sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Expandable sub-tree for Sales & Orders when active */}
                  {item.id === 'sales' && isActive && (
                    <div className="relative pl-6 py-1 my-1 ml-3 border-l-2 border-slate-200 space-y-1">
                      {SALES_SUB_ITEMS.map((sub) => {
                        const isSubActive = activeSalesSubItem === sub;
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              onSelectScreen('sales');
                              if (onSelectSalesSubItem) {
                                onSelectSalesSubItem(sub);
                              }
                              onCloseMobile();
                            }}
                            className={`w-full flex items-center space-x-2.5 py-1 px-2 text-[11px] rounded-lg text-left transition ${
                              isSubActive
                                ? 'text-blue-600 font-bold bg-blue-50/70'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSubActive ? 'bg-blue-600 ring-2 ring-blue-300' : 'bg-slate-300'
                              }`}
                            />
                            <span className="truncate">{sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Need Help Card (Matching user screenshot) */}
        <div className="p-3 m-2.5 rounded-2xl bg-slate-900 text-white flex items-center space-x-3 shadow-md shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 text-sm">
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[11px] font-bold text-white leading-tight">Need Help?</h4>
            <p className="text-[9px] text-slate-400 truncate">Check Documentation</p>
          </div>
          <i className="fa-solid fa-arrow-right text-[10px] text-slate-400" />
        </div>
      </aside>
    </>
  );
};
