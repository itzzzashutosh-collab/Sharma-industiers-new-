import React, { useState } from 'react';
import { PurchaseOrderRecord } from '../../../types/erp';
import { PurchaseInspectorPanel } from './PurchaseInspectorPanel';
import { PurchaseOrderPdfModal } from './PurchaseOrderPdfModal';

interface PurchaseDashboardSubpageProps {
  orders: PurchaseOrderRecord[];
  onOpenCreatePO: () => void;
  onSelectSubpageTab?: (tabName: string) => void;
  onUpdateOrderStatus?: (poId: string, status: PurchaseOrderRecord['status']) => void;
}

export const PurchaseDashboardSubpage: React.FC<PurchaseDashboardSubpageProps> = ({
  orders,
  onOpenCreatePO,
  onSelectSubpageTab,
  onUpdateOrderStatus,
}) => {
  const [selectedPO, setSelectedPO] = useState<PurchaseOrderRecord | null>(orders[0] || null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [activeTabFilter, setActiveTabFilter] = useState<string>('Purchase Orders');
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState<string>('All Suppliers');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All Status');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All Categories');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pdfModalPO, setPdfModalPO] = useState<PurchaseOrderRecord | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filtered rows
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSupplier =
      selectedSupplierFilter === 'All Suppliers' || o.supplierName === selectedSupplierFilter;
    const matchesStatus =
      selectedStatusFilter === 'All Status' || o.status === selectedStatusFilter;

    // Tab-based filtering
    let matchesTab = true;
    if (activeTabFilter === 'GRN (22)') {
      matchesTab = !!(o.grnNumbers && o.grnNumbers.length > 0);
    } else if (activeTabFilter === 'Pending Deliveries (4)') {
      matchesTab = o.status === 'In Transit' || o.status === 'Pending';
    } else if (activeTabFilter === 'Returns (2)') {
      matchesTab = o.status === 'Partially Received' || o.status === 'Cancelled';
    }

    return matchesSearch && matchesSupplier && matchesStatus && matchesTab;
  });

  const pageSize = 10;
  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Material-wise donut data
  const materialDonutData = [
    { label: 'White Cement', pct: 28, color: '#3b82f6' },
    { label: 'Calcium Carbonate', pct: 18, color: '#60a5fa' },
    { label: 'Acrylic Binder', pct: 15, color: '#34d399' },
    { label: 'Titanium Dioxide', pct: 12, color: '#a78bfa' },
    { label: 'Additives', pct: 10, color: '#f87171' },
    { label: 'Packaging', pct: 8, color: '#fb923c' },
    { label: 'Others', pct: 9, color: '#059669' },
  ];

  // Monthly values for chart
  const monthlyData = [
    { month: 'Mar', val: 9.2 },
    { month: 'Apr', val: 11.5 },
    { month: 'May', val: 13.8 },
    { month: 'Jun', val: 15.4 },
    { month: 'Jul', val: 17.0 },
    { month: 'Aug', val: 18.6 },
  ];

  // Top Suppliers
  const topSuppliers = [
    { name: 'RG Chemicals', spend: '₹ 4.8L', pct: 96 },
    { name: 'Rajasthan Minerals', spend: '₹ 3.1L', pct: 64 },
    { name: 'Om Traders', spend: '₹ 2.1L', pct: 44 },
    { name: 'S.K. Additives', spend: '₹ 1.8L', pct: 38 },
    { name: 'Vardhman Packaging', spend: '₹ 1.4L', pct: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* 5 KPI Metric Cards Row (Exactly matching Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Purchase Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center space-x-3.5">
            <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
              <i className="fa-solid fa-cart-shopping" />
            </span>
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">
                Total Purchase Value
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                ₹ 18.6 Lakhs
              </h3>
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-emerald-600 font-bold">
            <i className="fa-solid fa-arrow-up mr-1 text-[10px]" />
            <span>22%</span>
            <span className="text-slate-400 font-normal ml-1">vs last month</span>
          </div>
        </div>

        {/* Card 2: Purchase Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center space-x-3.5">
            <span className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold">
              <i className="fa-solid fa-file-invoice" />
            </span>
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">
                Purchase Orders
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                24
              </h3>
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-emerald-600 font-bold">
            <i className="fa-solid fa-arrow-up mr-1 text-[10px]" />
            <span>9%</span>
            <span className="text-slate-400 font-normal ml-1">vs last month</span>
          </div>
        </div>

        {/* Card 3: Goods Received (GRN) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center space-x-3.5">
            <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
              <i className="fa-solid fa-truck-ramp-box" />
            </span>
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">
                Goods Received (GRN)
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                22
              </h3>
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-emerald-600 font-bold">
            <i className="fa-solid fa-arrow-up mr-1 text-[10px]" />
            <span>16%</span>
            <span className="text-slate-400 font-normal ml-1">vs last month</span>
          </div>
        </div>

        {/* Card 4: Pending Deliveries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center space-x-3.5">
            <span className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold">
              <i className="fa-solid fa-clock-rotate-left" />
            </span>
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">
                Pending Deliveries
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                4
              </h3>
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-rose-600 font-bold">
            <i className="fa-solid fa-arrow-down mr-1 text-[10px]" />
            <span>33%</span>
            <span className="text-slate-400 font-normal ml-1">vs last month</span>
          </div>
        </div>

        {/* Card 5: Outstanding Payments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center space-x-3.5">
            <span className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold font-serif">
              ₹
            </span>
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">
                Outstanding Payments
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                ₹ 6.2 Lakhs
              </h3>
            </div>
          </div>
          <div className="mt-3 flex items-center text-[11px] text-rose-600 font-bold">
            <i className="fa-solid fa-arrow-up mr-1 text-[10px]" />
            <span>18%</span>
            <span className="text-slate-400 font-normal ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Tabs & Tools Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center space-x-6 text-xs font-bold text-slate-500 overflow-x-auto no-scrollbar">
          {[
            'Purchase Orders (24)',
            'GRN (22)',
            'Suppliers (18)',
            'Pending Deliveries (4)',
            'Returns (2)',
          ].map((tab) => {
            const isTabActive =
              activeTabFilter === tab ||
              (activeTabFilter === 'Purchase Orders' && tab.startsWith('Purchase Orders'));
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTabFilter(tab);
                  if (tab.startsWith('Suppliers') && onSelectSubpageTab) {
                    onSelectSubpageTab('Suppliers');
                  } else if (tab.startsWith('GRN') && onSelectSubpageTab) {
                    onSelectSubpageTab('Goods Receipt (GRN)');
                  } else if (tab.startsWith('Returns') && onSelectSubpageTab) {
                    onSelectSubpageTab('Purchase Returns');
                  }
                }}
                className={`pb-2.5 transition whitespace-nowrap relative font-semibold ${
                  isTabActive
                    ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search purchase orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 font-medium shadow-2xs"
            />
          </div>

          <button
            onClick={() => {
              setSelectedStatusFilter('All Status');
              setSelectedSupplierFilter('All Suppliers');
            }}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-filter text-slate-400 text-[11px]" />
            <span>Filters</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-up-from-bracket text-slate-400 text-[11px]" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Date Range & Dropdown Filter Row */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-2xs text-slate-700 font-medium">
          <i className="fa-regular fa-calendar text-slate-400 text-xs" />
          <span>01 Aug 2025</span>
          <span className="text-slate-400">→</span>
          <span>12 Aug 2025</span>
        </div>

        <select
          value={selectedSupplierFilter}
          onChange={(e) => setSelectedSupplierFilter(e.target.value)}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-2xs text-slate-700 font-medium focus:outline-none hover:bg-slate-50 cursor-pointer"
        >
          <option value="All Suppliers">All Suppliers</option>
          <option value="RG Chemicals">RG Chemicals</option>
          <option value="Shree Polymers">Shree Polymers</option>
          <option value="Rajasthan Minerals">Rajasthan Minerals</option>
          <option value="Colour Chem Industries">Colour Chem Industries</option>
          <option value="Vardhman Packaging">Vardhman Packaging</option>
          <option value="S.K. Additives">S.K. Additives</option>
          <option value="Om Traders">Om Traders</option>
        </select>

        <select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-2xs text-slate-700 font-medium focus:outline-none hover:bg-slate-50 cursor-pointer"
        >
          <option value="All Status">All Status</option>
          <option value="Received">Received</option>
          <option value="In Transit">In Transit</option>
          <option value="Partially Received">Partially Received</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={selectedCategoryFilter}
          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-2xs text-slate-700 font-medium focus:outline-none hover:bg-slate-50 cursor-pointer"
        >
          <option value="All Categories">All Categories</option>
          <option value="Raw Materials">Raw Materials</option>
          <option value="Pigments">Pigments</option>
          <option value="Packaging Materials">Packaging Materials</option>
          <option value="Additives">Additives</option>
        </select>
      </div>

      {/* Main Split Layout: Orders Table (left) + PO Inspector (right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Purchase Orders Table Column */}
        <div className={isInspectorOpen && selectedPO ? 'xl:col-span-7 space-y-4' : 'xl:col-span-12 space-y-4'}>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200/80">
                  <tr>
                    <th className="py-3 px-3 w-8">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                    </th>
                    <th className="py-3 px-3 font-semibold">PO #</th>
                    <th className="py-3 px-3 font-semibold">Date</th>
                    <th className="py-3 px-3 font-semibold">Supplier</th>
                    <th className="py-3 px-3 font-semibold">Material Items</th>
                    <th className="py-3 px-3 font-semibold">Total Qty</th>
                    <th className="py-3 px-3 font-semibold">Total Amount (₹)</th>
                    <th className="py-3 px-3 font-semibold text-center">Status</th>
                    <th className="py-3 px-3 font-semibold">Expected Date</th>
                    <th className="py-3 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {paginatedOrders.map((po) => {
                    const isSelected = selectedPO?.id === po.id;
                    return (
                      <tr
                        key={po.id}
                        onClick={() => {
                          setSelectedPO(po);
                          setIsInspectorOpen(true);
                        }}
                        className={`hover:bg-blue-50/40 cursor-pointer transition select-none ${
                          isSelected ? 'bg-blue-50/70' : ''
                        }`}
                      >
                        <td className="py-3.5 px-3" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                          {po.poNumber}
                        </td>
                        <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">{po.date}</td>
                        <td className="py-3.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                          {po.supplierName}
                        </td>
                        <td className="py-3.5 px-3 text-slate-500">
                          {po.itemsCount || po.items.length} items
                        </td>
                        <td className="py-3.5 px-3 text-slate-700 whitespace-nowrap">{po.totalQty}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {po.totalAmount}
                        </td>
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              po.status === 'Received'
                                ? 'bg-emerald-100 text-emerald-800'
                                : po.status === 'In Transit'
                                ? 'bg-blue-100 text-blue-800'
                                : po.status === 'Partially Received'
                                ? 'bg-amber-100 text-amber-800'
                                : po.status === 'Pending'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {po.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                          {po.expectedDate}
                        </td>
                        <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              setSelectedPO(po);
                              setIsInspectorOpen(true);
                            }}
                            className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center mx-auto"
                          >
                            <i className="fa-solid fa-ellipsis text-xs" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Row */}
            <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Showing 1–{paginatedOrders.length} of {filteredOrders.length} purchase orders
              </span>

              <div className="flex items-center space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                >
                  <i className="fa-solid fa-chevron-left text-[10px]" />
                </button>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
                    currentPage === 1 ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-700'
                  }`}
                >
                  1
                </button>
                {totalPages > 1 && (
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
                      currentPage === 2 ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-700'
                    }`}
                  >
                    2
                  </button>
                )}
                {totalPages > 2 && (
                  <button
                    onClick={() => setCurrentPage(3)}
                    className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
                      currentPage === 3 ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-700'
                    }`}
                  >
                    3
                  </button>
                )}
                <span className="text-slate-400 px-1">...</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                >
                  <i className="fa-solid fa-chevron-right text-[10px]" />
                </button>

                <select className="ml-2 px-2 py-1 border border-slate-200 rounded-lg text-slate-600 text-xs bg-white">
                  <option>10 / page</option>
                  <option>25 / page</option>
                  <option>50 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Inspector Panel Column (Exactly matching Screenshot) */}
        {isInspectorOpen && selectedPO && (
          <div className="xl:col-span-5 sticky top-4">
            <PurchaseInspectorPanel
              po={selectedPO}
              onClose={() => setIsInspectorOpen(false)}
              onOpenPdf={setPdfModalPO}
              onUpdateStatus={(id, st) => {
                if (onUpdateOrderStatus) onUpdateOrderStatus(id, st);
                setSelectedPO({ ...selectedPO, status: st });
              }}
            />
          </div>
        )}
      </div>

      {/* Bottom Row Charts (3 Charts Exactly Matching Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Chart 1: Monthly Purchase Value Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs">Monthly Purchase Value</h3>
            <span className="flex items-center gap-1.5 text-[11px] text-blue-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Purchase Value
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
            {monthlyData.map((d, i) => {
              const maxVal = 25;
              const heightPct = Math.round((d.val / maxVal) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-700 font-bold opacity-0 group-hover:opacity-100 transition">
                    ₹{d.val}L
                  </span>
                  <div
                    className="w-full max-w-[28px] bg-blue-600 hover:bg-blue-700 rounded-t-md transition-all duration-300"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[11px] font-bold text-slate-500">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-1">
            <span>Range: Mar - Aug 2025</span>
            <span className="text-slate-700 font-bold font-mono">Current: ₹ 18.6L</span>
          </div>
        </div>

        {/* Chart 2: Material-wise Purchase (Donut Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs">
              Material-wise Purchase (This Month)
            </h3>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Donut representation */}
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray="28, 100"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="4"
                  strokeDasharray="18, 100"
                  strokeDashoffset="-28"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="4"
                  strokeDasharray="15, 100"
                  strokeDashoffset="-46"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="4"
                  strokeDasharray="12, 100"
                  strokeDashoffset="-61"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="4"
                  strokeDasharray="10, 100"
                  strokeDashoffset="-73"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="4"
                  strokeDasharray="8, 100"
                  strokeDashoffset="-83"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="4"
                  strokeDasharray="9, 100"
                  strokeDashoffset="-91"
                />
              </svg>

              <div className="absolute text-center">
                <span className="text-xs font-black text-slate-900 block font-mono">
                  ₹ 18.6
                </span>
                <span className="text-[9px] text-slate-400 block font-bold leading-tight">
                  Lakhs Total
                </span>
              </div>
            </div>

            {/* Legend list */}
            <div className="space-y-1 text-[11px] flex-1">
              {materialDonutData.map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                    <span className="text-slate-600 truncate">{m.label}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800 text-[10px]">
                    {m.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 3: Top Suppliers (This Month) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs">Top Suppliers (This Month)</h3>
          </div>

          <div className="space-y-3.5 pt-1">
            {topSuppliers.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{s.name}</span>
                  <span className="font-mono font-black text-slate-900">{s.spend}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official PO Document PDF Preview Modal */}
      <PurchaseOrderPdfModal
        po={pdfModalPO}
        isOpen={!!pdfModalPO}
        onClose={() => setPdfModalPO(null)}
      />
    </div>
  );
};
