import React, { useState } from 'react';
import {
  DispatchOrderRecord,
  FleetVehicleRecord,
  DepotRecord,
  RoutePlanningRecord,
  PodRecord,
  EWayBillRecord,
  TransporterLedgerRecord,
} from '../../types/erp';
import {
  INITIAL_DISPATCH_ORDERS,
  INITIAL_FLEET_VEHICLES,
  INITIAL_DEPOTS,
  INITIAL_ROUTES,
  INITIAL_POD_RECORDS,
  INITIAL_EWAY_BILLS,
  INITIAL_TRANSPORTERS,
} from '../../data/distributionData';

import { DistributionDashboardSubpage } from './distribution/DistributionDashboardSubpage';
import { DispatchOrdersSubpage } from './distribution/DispatchOrdersSubpage';
import { FleetTrackingSubpage } from './distribution/FleetTrackingSubpage';
import { DepotNetworkSubpage } from './distribution/DepotNetworkSubpage';
import { RouteLogisticsSubpage } from './distribution/RouteLogisticsSubpage';
import { ProofOfDeliverySubpage } from './distribution/ProofOfDeliverySubpage';
import { EWayBillsSubpage } from './distribution/EWayBillsSubpage';
import { FreightLedgerSubpage } from './distribution/FreightLedgerSubpage';

import { DispatchOrderDrawer } from './distribution/DispatchOrderDrawer';
import { EWayBillModal } from './distribution/EWayBillModal';
import { PodViewerModal } from './distribution/PodViewerModal';

interface DistributionScreenProps {
  activeSubPage?: string;
  onSelectSubPage?: (subPage: string) => void;
}

const TABS = [
  { id: 'Distribution Dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-pie' },
  { id: 'Dispatch & Delivery Orders', label: 'Delivery Orders', icon: 'fa-solid fa-truck-ramp-box' },
  { id: 'Fleet & Vehicle Tracking', label: 'Fleet Tracking', icon: 'fa-solid fa-truck' },
  { id: 'Depot & Warehouse Network', label: 'Depot Network', icon: 'fa-solid fa-warehouse' },
  { id: 'Route Planning & Logistics', label: 'Route Planning', icon: 'fa-solid fa-route' },
  { id: 'Proof of Delivery (POD)', label: 'Proof of Delivery', icon: 'fa-solid fa-stamp' },
  { id: 'E-Way Bills & Permits', label: 'e-Way Bills', icon: 'fa-solid fa-file-invoice' },
  { id: 'Transporter & Freight Ledger', label: 'Freight Ledger', icon: 'fa-solid fa-scale-balanced' },
];

export const DistributionScreen: React.FC<DistributionScreenProps> = ({
  activeSubPage,
  onSelectSubPage,
}) => {
  const [internalSubPage, setInternalSubPage] = useState('Distribution Dashboard');
  const currentSubPage = activeSubPage || internalSubPage;

  const handleSubPageChange = (tabId: string) => {
    setInternalSubPage(tabId);
    onSelectSubPage?.(tabId);
  };

  // State
  const [dispatchOrders, setDispatchOrders] = useState<DispatchOrderRecord[]>(INITIAL_DISPATCH_ORDERS);
  const [vehicles, setVehicles] = useState<FleetVehicleRecord[]>(INITIAL_FLEET_VEHICLES);
  const [depots, setDepots] = useState<DepotRecord[]>(INITIAL_DEPOTS);
  const [routes] = useState<RoutePlanningRecord[]>(INITIAL_ROUTES);
  const [podRecords, setPodRecords] = useState<PodRecord[]>(INITIAL_POD_RECORDS);
  const [ewayBills, setEwayBills] = useState<EWayBillRecord[]>(INITIAL_EWAY_BILLS);
  const [transporters, setTransporters] = useState<TransporterLedgerRecord[]>(INITIAL_TRANSPORTERS);

  // Modals & Drawers
  const [selectedOrderForDrawer, setSelectedOrderForDrawer] = useState<DispatchOrderRecord | null>(null);
  const [selectedEWayBillModal, setSelectedEWayBillModal] = useState<EWayBillRecord | null>(null);
  const [selectedPodModal, setSelectedPodModal] = useState<PodRecord | null>(null);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);

  // New DO Form State
  const [newOrderForm, setNewOrderForm] = useState<Partial<DispatchOrderRecord>>({
    doNumber: `DO-2025-${Math.floor(144 + Math.random() * 20)}`,
    customer: '',
    customerType: 'Dealer',
    destination: 'Kota',
    products: 'Rustic Royale (20L), Shine Emulsion (10L)',
    bags: 350,
    vehicle: 'RJ-08-GA-1234',
    driver: 'Ramesh Verma',
    driverPhone: '+91 94140 88219',
    expectedDate: 'Tomorrow, 04:00 PM',
    status: 'In Transit',
    route: 'Bundi Factory → NH-52 → Kota Industrial Area',
    progressPercent: 15,
    podSigned: false,
    ewayBillNumber: `9921${Math.floor(10000000 + Math.random() * 90000000)}`,
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderForm.customer || !newOrderForm.doNumber) return;

    const newOrder: DispatchOrderRecord = {
      id: `do-${Date.now()}`,
      doNumber: newOrderForm.doNumber!,
      date: 'Today, 12 Aug 2025',
      customer: newOrderForm.customer!,
      customerType: newOrderForm.customerType || 'Dealer',
      destination: newOrderForm.destination || 'Kota',
      products: newOrderForm.products || 'Paint Emulsion',
      bags: Number(newOrderForm.bags) || 100,
      vehicle: newOrderForm.vehicle || 'RJ-08-GA-1234',
      driver: newOrderForm.driver || 'Driver',
      driverPhone: newOrderForm.driverPhone || '+91 94140 88219',
      expectedDate: newOrderForm.expectedDate || 'Tomorrow',
      status: 'In Transit',
      route: newOrderForm.route || 'Bundi Factory Corridor',
      progressPercent: 15,
      podSigned: false,
      ewayBillNumber: newOrderForm.ewayBillNumber,
    };

    setDispatchOrders([newOrder, ...dispatchOrders]);

    // Also auto-generate corresponding E-Way bill
    const autoEwb: EWayBillRecord = {
      id: `ewb-${Date.now()}`,
      ewbNumber: newOrder.ewayBillNumber || '992189912011',
      doNumber: newOrder.doNumber,
      docDate: '12 Aug 2025',
      validUntil: '14 Aug 2025, 11:59 PM',
      consignor: 'Swatch Paints Pvt Ltd (Bundi Plant)',
      consignee: newOrder.customer,
      destinationCity: `${newOrder.destination}, RJ`,
      hsnCode: '32149090',
      goodsDescription: `${newOrder.products} (${newOrder.bags} Bags)`,
      taxableValue: newOrder.bags * 490,
      igstCgstAmount: Math.round(newOrder.bags * 490 * 0.18),
      distanceKm: 42,
      vehicleNumber: newOrder.vehicle,
      transporterName: 'Jaipur Golden Transport Co.',
      transporterGstin: '08AAACJ1234F1Z2',
      status: 'Active',
    };
    setEwayBills([autoEwb, ...ewayBills]);

    setIsCreateOrderModalOpen(false);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: DispatchOrderRecord['status']) => {
    setDispatchOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              progressPercent: newStatus === 'Delivered' ? 100 : o.progressPercent,
              podSigned: newStatus === 'Delivered' ? true : o.podSigned,
            }
          : o
      )
    );

    if (selectedOrderForDrawer && selectedOrderForDrawer.id === orderId) {
      setSelectedOrderForDrawer({
        ...selectedOrderForDrawer,
        status: newStatus,
        progressPercent: newStatus === 'Delivered' ? 100 : selectedOrderForDrawer.progressPercent,
        podSigned: newStatus === 'Delivered' ? true : selectedOrderForDrawer.podSigned,
      });
    }
  };

  const handleOpenEWayBillModalByNumber = (ewbNumber: string) => {
    const found = ewayBills.find((b) => b.ewbNumber === ewbNumber) || ewayBills[0];
    setSelectedEWayBillModal(found);
  };

  const handleOpenPodModalByDoNumber = (doNumber: string) => {
    const found = podRecords.find((p) => p.doNumber === doNumber) || podRecords[0];
    setSelectedPodModal(found);
  };

  const handleInitiateDepotTransfer = (sourceId: string, destId: string, bags: number) => {
    setDepots((prev) =>
      prev.map((d) => {
        if (d.id === sourceId) {
          return { ...d, currentStockBags: Math.max(0, d.currentStockBags - bags) };
        }
        if (d.id === destId) {
          return { ...d, currentStockBags: d.currentStockBags + bags };
        }
        return d;
      })
    );
  };

  const handleRecordFreightPayment = (transporterId: string, amount: number) => {
    setTransporters((prev) =>
      prev.map((t) => {
        if (t.id === transporterId) {
          return {
            ...t,
            totalPaidAmount: t.totalPaidAmount + amount,
            pendingBalance: Math.max(0, t.pendingBalance - amount),
          };
        }
        return t;
      })
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-truck-moving" />
            </span>
            <h1 className="text-xl font-black text-slate-900">
              Distribution &amp; Supply Chain Logistics
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end fleet tracking, regional depot inventory, route planning, GST e-Way bills &amp; POD compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>4 Highway Corridors Active</span>
          </span>

          <button
            onClick={() => setIsCreateOrderModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>New Dispatch Order</span>
          </button>
        </div>
      </div>

      {/* Navigation Subpage Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200/80">
        {TABS.map((tab) => {
          const isActive = currentSubPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSubPageChange(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/70'
              }`}
            >
              <i className={`${tab.icon} text-[11px]`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Subpage Contents */}
      {currentSubPage === 'Distribution Dashboard' && (
        <DistributionDashboardSubpage
          dispatchOrders={dispatchOrders}
          vehicles={vehicles}
          depots={depots}
          onSelectDispatchOrder={(order) => setSelectedOrderForDrawer(order)}
          onSelectVehicle={() => handleSubPageChange('Fleet & Vehicle Tracking')}
          onOpenCreateDispatchModal={() => setIsCreateOrderModalOpen(true)}
          onNavigateToSubpage={(sub) => handleSubPageChange(sub)}
        />
      )}

      {currentSubPage === 'Dispatch & Delivery Orders' && (
        <DispatchOrdersSubpage
          dispatchOrders={dispatchOrders}
          onSelectOrder={(order) => setSelectedOrderForDrawer(order)}
          onOpenCreateModal={() => setIsCreateOrderModalOpen(true)}
          onOpenEWayBillModal={handleOpenEWayBillModalByNumber}
          onOpenPodModal={handleOpenPodModalByDoNumber}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}

      {currentSubPage === 'Fleet & Vehicle Tracking' && (
        <FleetTrackingSubpage
          vehicles={vehicles}
          onAddVehicle={(v) => setVehicles([v, ...vehicles])}
        />
      )}

      {currentSubPage === 'Depot & Warehouse Network' && (
        <DepotNetworkSubpage
          depots={depots}
          onInitiateTransfer={handleInitiateDepotTransfer}
        />
      )}

      {currentSubPage === 'Route Planning & Logistics' && (
        <RouteLogisticsSubpage routes={routes} />
      )}

      {currentSubPage === 'Proof of Delivery (POD)' && (
        <ProofOfDeliverySubpage
          podRecords={podRecords}
          onOpenPodModal={(pod) => setSelectedPodModal(pod)}
          onAddPodRecord={(pod) => setPodRecords([pod, ...podRecords])}
        />
      )}

      {currentSubPage === 'E-Way Bills & Permits' && (
        <EWayBillsSubpage
          ewayBills={ewayBills}
          onOpenEWayBillModal={(bill) => setSelectedEWayBillModal(bill)}
          onAddEWayBill={(b) => setEwayBills([b, ...ewayBills])}
        />
      )}

      {currentSubPage === 'Transporter & Freight Ledger' && (
        <FreightLedgerSubpage
          transporters={transporters}
          onRecordPayment={handleRecordFreightPayment}
        />
      )}

      {/* Right Drawer Inspector */}
      <DispatchOrderDrawer
        dispatchOrder={selectedOrderForDrawer}
        isOpen={!!selectedOrderForDrawer}
        onClose={() => setSelectedOrderForDrawer(null)}
        onUpdateStatus={handleUpdateOrderStatus}
        onOpenEWayBill={handleOpenEWayBillModalByNumber}
        onOpenPod={handleOpenPodModalByDoNumber}
      />

      {/* GST E-Way Bill Modal */}
      <EWayBillModal
        ewayBill={selectedEWayBillModal}
        isOpen={!!selectedEWayBillModal}
        onClose={() => setSelectedEWayBillModal(null)}
      />

      {/* Proof of Delivery Modal */}
      <PodViewerModal
        pod={selectedPodModal}
        isOpen={!!selectedPodModal}
        onClose={() => setSelectedPodModal(null)}
      />

      {/* Create Delivery Order Modal */}
      {isCreateOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Generate Delivery Order (DO) &amp; Outward Challan
              </h3>
              <button
                onClick={() => setIsCreateOrderModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    DO Order Reference
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrderForm.doNumber}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, doNumber: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Customer Type
                  </label>
                  <select
                    value={newOrderForm.customerType}
                    onChange={(e) =>
                      setNewOrderForm({
                        ...newOrderForm,
                        customerType: e.target.value as DispatchOrderRecord['customerType'],
                      })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Dealer">Authorized Dealer</option>
                    <option value="Painter">Painter Club</option>
                    <option value="Contractor">Contractor Project</option>
                    <option value="Direct">Direct Retail Counter</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Customer / Dealer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahaveer Paint Store (Ajmer)"
                  value={newOrderForm.customer}
                  onChange={(e) =>
                    setNewOrderForm({ ...newOrderForm, customer: e.target.value })
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Destination City / Depot
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrderForm.destination}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, destination: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Total Volume (Bags / Tubs)
                  </label>
                  <input
                    type="number"
                    required
                    value={newOrderForm.bags}
                    onChange={(e) =>
                      setNewOrderForm({
                        ...newOrderForm,
                        bags: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Paint Products Consigned
                </label>
                <input
                  type="text"
                  required
                  value={newOrderForm.products}
                  onChange={(e) =>
                    setNewOrderForm({ ...newOrderForm, products: e.target.value })
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Vehicle Number Plate
                  </label>
                  <select
                    value={newOrderForm.vehicle}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, vehicle: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.plateNumber}>
                        {v.plateNumber} ({v.model})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Assigned Driver
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrderForm.driver}
                    onChange={(e) =>
                      setNewOrderForm({ ...newOrderForm, driver: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-blue-800 text-[11px] space-y-1">
                <span className="font-bold">Auto-generated Outward e-Way Bill:</span>
                <p>
                  Will automatically generate an active GST e-Way Bill reference ({newOrderForm.ewayBillNumber}) linked to Bundi Plant dispatch.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOrderModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Dispatch Consignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
