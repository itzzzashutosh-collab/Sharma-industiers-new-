/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ScreenType,
  Order,
  Invoice,
  ProductItem,
  Lead,
  ProductionBatch,
  SystemAlert,
  ActivityItem,
} from './types/erp';
import {
  INITIAL_ORDERS,
  INITIAL_INVOICES,
  TOP_PRODUCTS,
  INITIAL_LEADS,
  INITIAL_BATCHES,
  INITIAL_ALERTS,
  INITIAL_ACTIVITIES,
} from './data/mockData';
import { INITIAL_EXTENDED_INVOICES } from './data/invoicesData';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { SearchModal } from './components/SearchModal';
import { NewOrderModal } from './components/NewOrderModal';
import { NewLeadModal } from './components/NewLeadModal';
import { InvoiceDetailModal } from './components/InvoiceDetailModal';
import { ContactFormModal } from './components/ContactFormModal';

// Screens
import { DashboardScreen } from './components/screens/DashboardScreen';
import { CrmScreen } from './components/screens/CrmScreen';
import { SalesOrdersScreen } from './components/screens/SalesOrdersScreen';
import { QuotationsScreen } from './components/screens/QuotationsScreen';
import { InvoicesScreen } from './components/screens/InvoicesScreen';
import { ProductsInventoryScreen } from './components/screens/ProductsInventoryScreen';
import { ProductionScreen } from './components/screens/ProductionScreen';
import { PurchaseScreen } from './components/screens/PurchaseScreen';
import { DistributionScreen } from './components/screens/DistributionScreen';
import { FinanceScreen } from './components/screens/FinanceScreen';
import { MarketingScreen } from './components/screens/MarketingScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { TeamScreen } from './components/screens/TeamScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inventory'); // Set default to Products & Inventory as requested!
  const [activeSalesSubItem, setActiveSalesSubItem] = useState('Order Management');
  const [activeCrmSubItem, setActiveCrmSubItem] = useState('Leads Management');
  const [activeQuotationsSubItem, setActiveQuotationsSubItem] = useState('All Quotations');
  const [activeInvoicesSubItem, setActiveInvoicesSubItem] = useState('All Invoices');
  const [activeInventorySubItem, setActiveInventorySubItem] = useState('Product Catalog');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Core ERP State
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_EXTENDED_INVOICES);
  const [products, setProducts] = useState<ProductItem[]>(TOP_PRODUCTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [batches, setBatches] = useState<ProductionBatch[]>(INITIAL_BATCHES);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactProductInterest, setContactProductInterest] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Handlers
  const handleCreateOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    // Also auto-generate corresponding pending invoice
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${newOrder.orderNumber.replace('SO-', '')}`,
      orderNumber: newOrder.orderNumber,
      customer: newOrder.customer,
      date: '12 Aug 2025',
      dueDate: '27 Aug 2025',
      amount: newOrder.amount,
      amountRaw: newOrder.amountRaw,
      status: newOrder.paymentStatus === 'Paid' ? 'Paid' : 'Pending',
      items: [
        {
          name: `Swatch ${newOrder.products}`,
          qty: newOrder.qty,
          unitPrice: Math.round(newOrder.amountRaw / newOrder.qty),
          total: newOrder.amountRaw,
        },
      ],
    };
    setInvoices((prev) => [newInvoice, ...prev]);

    // Add activity
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      author: 'Ashutosh Sharma (Founder)',
      department: 'Executive',
      action: `Created new order ${newOrder.orderNumber} for ${newOrder.customer} (${newOrder.amount})`,
      timeAgo: 'Just now',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAkTPf3csB-waF_8--xRV_aAC7PlnOcOFagIZdbvcOJisTEYO-HKcWwns8ldfd32Ir0d2WriYOifJKwGrYQb0C9HYie2XqCc2lJCifRW4u0g6nPEGRMTbrX-CAi7aLCjXaABoHzRWEBz96o-EiiZyFvq4ow28jvzHcCyQGw5eWRHChFyUvgtS2YtzdzVg9yfuzHSr8rdniK4Ai0DB1z9km3YD6vixxCfw-JZ0WyX624s7UVIRNgL5SK',
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleCreateLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      author: 'Ramesh (Sales)',
      department: 'Sales',
      action: `Added new dealer lead: ${newLead.name} (${newLead.city})`,
      timeAgo: 'Just now',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDbeViRYFyUfWPCUgUF5D3be7MbENHU6KXYwPYgatoPwR23Px6ha5EQNzi48aFWiies4jgqOVIB0og6eUqF9ekdWP_nQIfAtOQ-Cf_7GPs6rn3ADqRNQJYD0mRiT6yQr0Lu26jrYHtZtHUePgsR8lMZ2OC3IUV8nvWYFeHxHu3-Cb3IsvN6l87XqVz6SHJHot1iVz0Lgm9WmJ5DYXo68O4C2NvHeKMYs81y3hdNVm-Bjuqdj70sF-pR',
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleUpdateLeadStage = (leadId: string, newStage: Lead['stage']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  const handleMarkInvoicePaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Paid' } : inv))
    );

    const targetInv = invoices.find((i) => i.id === invoiceId);
    if (targetInv) {
      // Also update matching order if present
      setOrders((prev) =>
        prev.map((ord) =>
          ord.orderNumber === targetInv.orderNumber
            ? { ...ord, paymentStatus: 'Paid' }
            : ord
        )
      );

      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        author: 'Pooja (Accounts)',
        department: 'Accounts',
        action: `Recorded full payment of ${targetInv.amount} (${targetInv.invoiceNumber})`,
        timeAgo: 'Just now',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDKUZ6ipjmH8-vZ26ZiWQAme39cO9bSj_9jxNPTLZosuSpY0wyowF_Xpq0mS0lJElQ5tIDIjQI9y61AhvhZO5IkbeB4fXs24zfkZbnXngEIBG-50N9Yj83kj4O6vp0HeQdFKb5OT3TFrQTQNiYswxV453prZUvtB05vH_6p_8wTn1Atd9VP9c-MG_w8m8QwYjhDntXz2gwWeEC-e_9z01DNcMRSIaRsykqAW9dMD_GsLqEBEnItvAR-',
      };
      setActivities((prev) => [newActivity, ...prev]);
    }
  };

  const handleRestockProduct = (productId: string, additionalBags: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, bagsAvailable: p.bagsAvailable + additionalBags }
          : p
      )
    );
  };

  const handleAddBatch = (batch: ProductionBatch) => {
    setBatches((prev) => [batch, ...prev]);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      author: 'Suresh (Factory)',
      department: 'Factory',
      action: `Scheduled batch #${batch.batchNumber} (${batch.targetBags} bags) on ${batch.line}`,
      timeAgo: 'Just now',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC_9bnF2kSQJis-pdl9IOlKFlXGmXlrN2HMqGhQW7xQc1WtWfW_MHU1N6XQpMlGf2TR_YIf9za-3mdEGqf42Q2r3oA56gT7oOz7NM1PJnpZdoUijlDYlbILT65TkRDVLiSnvakzZMDw-StGSZ5QNozl-5dlBBbO-dGI91kHSFsr2axzakv0FGtFOZmX44gpUXszHDsQhjrzW2ADc7AnBKPXBXDVMzX560_ZzAdC0jEO-SuBi1J8YgZV',
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleUpdateBatchStatus = (
    batchId: string,
    status: ProductionBatch['status']
  ) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? {
              ...b,
              status,
              producedBags: status === 'Completed' ? b.targetBags : b.producedBags,
            }
          : b
      )
    );
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  return (
    <div className="flex h-screen bg-[#f4f7fb] overflow-hidden antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        activeSalesSubItem={activeSalesSubItem}
        onSelectSalesSubItem={setActiveSalesSubItem}
        activeCrmSubItem={activeCrmSubItem}
        onSelectCrmSubItem={setActiveCrmSubItem}
        activeQuotationsSubItem={activeQuotationsSubItem}
        onSelectQuotationsSubItem={setActiveQuotationsSubItem}
        activeInvoicesSubItem={activeInvoicesSubItem}
        onSelectInvoicesSubItem={setActiveInvoicesSubItem}
        activeInventorySubItem={activeInventorySubItem}
        onSelectInventorySubItem={setActiveInventorySubItem}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Navigation Bar */}
        <TopBar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          alerts={alerts}
          onOpenNewOrder={() => setIsNewOrderOpen(true)}
          onOpenNewLead={() => setIsNewLeadOpen(true)}
          onOpenContact={() => {
            setContactProductInterest('');
            setIsContactOpen(true);
          }}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              orders={orders}
              invoices={invoices}
              products={products}
              alerts={alerts}
              activities={activities}
              onNavigate={setCurrentScreen}
              onOpenOrderModal={() => setIsNewOrderOpen(true)}
              onSelectInvoice={setSelectedInvoice}
              onResolveAlert={handleResolveAlert}
              onOpenContactWithProduct={(prodName) => {
                setContactProductInterest(prodName);
                setIsContactOpen(true);
              }}
            />
          )}

          {currentScreen === 'crm' && (
            <CrmScreen
              leads={leads}
              onOpenNewLead={() => setIsNewLeadOpen(true)}
              onUpdateLeadStage={handleUpdateLeadStage}
              activeSubPage={activeCrmSubItem}
              onSelectSubPage={setActiveCrmSubItem}
              onNavigateToScreen={(s) => setCurrentScreen(s as ScreenType)}
            />
          )}

          {currentScreen === 'sales' && (
            <SalesOrdersScreen
              orders={orders}
              products={products}
              leads={leads}
              activeSubPage={activeSalesSubItem}
              onSelectSubPage={setActiveSalesSubItem}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
              onCreateOrder={handleCreateOrder}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onNavigateBreadcrumb={() => setCurrentScreen('dashboard')}
            />
          )}

          {currentScreen === 'quotations' && (
            <QuotationsScreen
              onConvertToOrder={(order) => {
                handleCreateOrder(order);
                setCurrentScreen('sales');
              }}
              activeSubPage={activeQuotationsSubItem}
              onSelectSubPage={setActiveQuotationsSubItem}
              onNavigateToScreen={(s) => setCurrentScreen(s as ScreenType)}
            />
          )}

          {currentScreen === 'invoices' && (
            <InvoicesScreen
              invoices={invoices}
              onSelectInvoice={setSelectedInvoice}
              onMarkAsPaid={handleMarkInvoicePaid}
              activeSubPage={activeInvoicesSubItem}
              onSelectSubPage={setActiveInvoicesSubItem}
              onNavigateToScreen={(s) => setCurrentScreen(s as ScreenType)}
            />
          )}

          {currentScreen === 'inventory' && (
            <ProductsInventoryScreen
              products={products}
              onRestock={handleRestockProduct}
              activeSubPage={activeInventorySubItem}
              onSelectSubPage={setActiveInventorySubItem}
              onNavigateToScreen={(s) => setCurrentScreen(s as ScreenType)}
            />
          )}

          {currentScreen === 'production' && (
            <ProductionScreen
              batches={batches}
              onAddBatch={handleAddBatch}
              onUpdateBatchStatus={handleUpdateBatchStatus}
            />
          )}

          {currentScreen === 'purchase' && <PurchaseScreen />}

          {currentScreen === 'distribution' && <DistributionScreen />}

          {currentScreen === 'finance' && <FinanceScreen />}

          {(currentScreen === 'marketing' ||
            currentScreen === 'branding' ||
            currentScreen === 'social') && (
            <MarketingScreen
              onInquireProduct={(prod) => {
                setContactProductInterest(prod);
                setIsContactOpen(true);
              }}
            />
          )}

          {currentScreen === 'reports' && <ReportsScreen />}

          {currentScreen === 'team' && <TeamScreen activities={activities} />}

          {currentScreen === 'settings' && <SettingsScreen />}
        </main>
      </div>

      {/* ⌘K Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        orders={orders}
        invoices={invoices}
        products={products}
        leads={leads}
        onNavigate={setCurrentScreen}
      />

      {/* New Sales Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        products={products}
        onCreateOrder={handleCreateOrder}
      />

      {/* New CRM Lead Modal */}
      <NewLeadModal
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
        onCreateLead={handleCreateLead}
      />

      {/* Tax Invoice Detail & Payment Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onMarkAsPaid={handleMarkInvoicePaid}
      />

      {/* Interactive Contact & Dealer Inquiry Modal */}
      <ContactFormModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onSubmitInquiry={handleCreateLead}
        defaultProductInterest={contactProductInterest}
      />
    </div>
  );
}
