import React, { useState, useEffect } from 'react';
import { Order, ProductItem, Lead } from '../../types/erp';
import { OrderManagementSubpage } from './sales/OrderManagementSubpage';
import { NewOrderSubpage } from './sales/NewOrderSubpage';
import { OrderApprovalsSubpage } from './sales/OrderApprovalsSubpage';
import { DeliveryDispatchSubpage } from './sales/DeliveryDispatchSubpage';
import { ReturnOrdersSubpage } from './sales/ReturnOrdersSubpage';
import { SalesTargetsSubpage } from './sales/SalesTargetsSubpage';
import { SalesTeamSubpage } from './sales/SalesTeamSubpage';
import { SalesReportsSubpage } from './sales/SalesReportsSubpage';

export type SalesSubPage =
  | 'Order Management'
  | 'New Order'
  | 'Order Approvals'
  | 'Delivery & Dispatch'
  | 'Return Orders'
  | 'Sales Targets'
  | 'Sales Team'
  | 'Reports';

interface SalesOrdersScreenProps {
  orders: Order[];
  products?: ProductItem[];
  leads?: Lead[];
  activeSubPage?: string;
  onSelectSubPage?: (subPage: string) => void;
  onOpenNewOrder: () => void;
  onCreateOrder?: (order: Order) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onNavigateBreadcrumb?: () => void;
}

interface NavTabItem {
  id: SalesSubPage;
  label: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

const SALES_SUB_PAGES: NavTabItem[] = [
  { id: 'Order Management', label: 'Order Management', icon: 'fa-solid fa-list-check' },
  { id: 'New Order', label: 'New Order', icon: 'fa-solid fa-cart-plus' },
  { id: 'Order Approvals', label: 'Order Approvals', icon: 'fa-solid fa-clipboard-check', badge: '5', badgeColor: 'bg-amber-100 text-amber-700' },
  { id: 'Delivery & Dispatch', label: 'Delivery & Dispatch', icon: 'fa-solid fa-truck-fast', badge: 'Bay 01', badgeColor: 'bg-indigo-100 text-indigo-700' },
  { id: 'Return Orders', label: 'Return Orders', icon: 'fa-solid fa-rotate-left', badge: '4', badgeColor: 'bg-rose-100 text-rose-700' },
  { id: 'Sales Targets', label: 'Sales Targets', icon: 'fa-solid fa-trophy', badge: '85%', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { id: 'Sales Team', label: 'Sales Team', icon: 'fa-solid fa-user-group', badge: '5 Reps', badgeColor: 'bg-blue-100 text-blue-700' },
  { id: 'Reports', label: 'Reports', icon: 'fa-solid fa-chart-pie' },
];

export const SalesOrdersScreen: React.FC<SalesOrdersScreenProps> = ({
  orders,
  products = [],
  leads = [],
  activeSubPage = 'Order Management',
  onSelectSubPage,
  onOpenNewOrder,
  onCreateOrder,
  onUpdateOrderStatus,
  onNavigateBreadcrumb,
}) => {
  const [currentSubPage, setCurrentSubPage] = useState<SalesSubPage>(
    (activeSubPage as SalesSubPage) || 'Order Management'
  );

  // Sync with prop when prop changes
  useEffect(() => {
    if (activeSubPage && activeSubPage !== currentSubPage) {
      setCurrentSubPage(activeSubPage as SalesSubPage);
    }
  }, [activeSubPage]);

  const handleSelectSub = (sub: string) => {
    setCurrentSubPage(sub as SalesSubPage);
    if (onSelectSubPage) {
      onSelectSubPage(sub);
    }
  };

  // Helper icons and subtitles based on active page
  const getSubpageMeta = () => {
    switch (currentSubPage) {
      case 'New Order':
        return {
          title: 'Sales Order Creation Studio',
          icon: 'fa-solid fa-cart-plus',
          accent: 'text-blue-600 bg-blue-100/70 border-blue-200/80',
          desc: 'Build detailed wholesale and dealer sales orders with line items, volume schemes, and tax invoices.',
        };
      case 'Order Approvals':
        return {
          title: 'Order Approvals & Credit Risk Center',
          icon: 'fa-solid fa-clipboard-check',
          accent: 'text-amber-600 bg-amber-100/70 border-amber-200/80',
          desc: 'Review high-value orders, dealer credit limits, and special discount thresholds before dispatch.',
        };
      case 'Delivery & Dispatch':
        return {
          title: 'Delivery & Dispatch Bay Operations',
          icon: 'fa-solid fa-truck-fast',
          accent: 'text-indigo-600 bg-indigo-100/70 border-indigo-200/80',
          desc: 'Bundi Plant Loading Bays #01 & #02, truck driver manifests, E-Way bills, and highway route tracking.',
        };
      case 'Return Orders':
        return {
          title: 'Return Orders & RMA Claims',
          icon: 'fa-solid fa-rotate-left',
          accent: 'text-rose-600 bg-rose-100/70 border-rose-200/80',
          desc: 'Handle transit packaging damage, shade discrepancies, lab testing, and automated credit notes.',
        };
      case 'Sales Targets':
        return {
          title: 'Sales Targets & Quotas Engine',
          icon: 'fa-solid fa-trophy',
          accent: 'text-emerald-600 bg-emerald-100/70 border-emerald-200/80',
          desc: 'Territory run-rate, regional quotas (Hadoti, Mewar, Dhundhar), and sales representative incentives.',
        };
      case 'Sales Team':
        return {
          title: 'Sales Team & Territory Directory',
          icon: 'fa-solid fa-user-group',
          accent: 'text-sky-600 bg-sky-100/70 border-sky-200/80',
          desc: 'Field officers directory, assigned dealer network, daily call logs, and beat visit outcomes.',
        };
      case 'Reports':
        return {
          title: 'Sales & Orders Analytic Reports',
          icon: 'fa-solid fa-chart-pie',
          accent: 'text-purple-600 bg-purple-100/70 border-purple-200/80',
          desc: 'Velocity analytics, product SKU revenue contributions, dealer purchasing cycles, and logistics SLAs.',
        };
      default:
        return {
          title: 'Sales & Order Management',
          icon: 'fa-solid fa-cart-shopping',
          accent: 'text-blue-600 bg-blue-100/70 border-blue-200/80',
          desc: 'Active orders pipeline, volume charts, customer filters, and dispatch status inspector.',
        };
    }
  };

  const meta = getSubpageMeta();

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f4f7fb] min-h-screen select-none">
      {/* 1. Main Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-2xs shrink-0 ${meta.accent}`}>
            <i className={`${meta.icon} text-xl`} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {meta.title}
            </h1>
            <nav className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium mt-0.5">
              <span
                className="hover:text-slate-600 cursor-pointer"
                onClick={onNavigateBreadcrumb}
              >
                Home
              </span>
              <span>&gt;</span>
              <span
                className="hover:text-slate-600 cursor-pointer"
                onClick={() => handleSelectSub('Order Management')}
              >
                Sales &amp; Orders
              </span>
              <span>&gt;</span>
              <span className="text-blue-600 font-bold">{currentSubPage}</span>
            </nav>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {currentSubPage !== 'New Order' && (
            <button
              onClick={() => handleSelectSub('New Order')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/25 active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Create New Order</span>
            </button>
          )}

          {currentSubPage !== 'Order Management' && (
            <button
              onClick={() => handleSelectSub('Order Management')}
              className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition cursor-pointer"
            >
              <i className="fa-solid fa-list-check text-slate-500 text-xs" />
              <span>All Orders</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Horizontal Sub-Navigation Tab Bar (All 8 Individual Subpages) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-2xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {SALES_SUB_PAGES.map((tab) => {
            const isActive = currentSubPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectSub(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <i className={`${tab.icon} text-xs ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                      isActive ? 'bg-white/20 text-white' : tab.badgeColor || 'bg-slate-100 text-slate-600'
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

      {/* 3. Render the selected Subpage component */}
      <div>
        {currentSubPage === 'Order Management' && (
          <OrderManagementSubpage
            orders={orders}
            onOpenNewOrder={onOpenNewOrder}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onNavigateSubpage={handleSelectSub}
          />
        )}

        {currentSubPage === 'New Order' && (
          <NewOrderSubpage
            products={products}
            onCreateOrder={(order) => {
              if (onCreateOrder) {
                onCreateOrder(order);
              }
            }}
            onNavigateSubpage={handleSelectSub}
          />
        )}

        {currentSubPage === 'Order Approvals' && (
          <OrderApprovalsSubpage
            onNavigateSubpage={handleSelectSub}
            onApproveOrder={(orderNumber) => {
              const matchedOrder = orders.find((o) => o.orderNumber === orderNumber);
              if (matchedOrder) {
                onUpdateOrderStatus(matchedOrder.id, 'Processing');
              }
            }}
          />
        )}

        {currentSubPage === 'Delivery & Dispatch' && (
          <DeliveryDispatchSubpage
            onNavigateSubpage={handleSelectSub}
            onUpdateOrderStatus={onUpdateOrderStatus}
          />
        )}

        {currentSubPage === 'Return Orders' && (
          <ReturnOrdersSubpage onNavigateSubpage={handleSelectSub} />
        )}

        {currentSubPage === 'Sales Targets' && (
          <SalesTargetsSubpage onNavigateSubpage={handleSelectSub} />
        )}

        {currentSubPage === 'Sales Team' && (
          <SalesTeamSubpage onNavigateSubpage={handleSelectSub} />
        )}

        {currentSubPage === 'Reports' && (
          <SalesReportsSubpage orders={orders} onNavigateSubpage={handleSelectSub} />
        )}
      </div>
    </div>
  );
};
