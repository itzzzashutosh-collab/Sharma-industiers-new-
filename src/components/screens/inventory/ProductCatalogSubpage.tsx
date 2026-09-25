import React, { useState } from 'react';
import { CatalogProduct } from '../../../types/erp';
import { PaintBucketGraphic } from './PaintBucketGraphic';

interface ProductCatalogSubpageProps {
  products: CatalogProduct[];
  onSelectProduct?: (product: CatalogProduct) => void;
  onOpenAddProduct?: () => void;
}

export const ProductCatalogSubpage: React.FC<ProductCatalogSubpageProps> = ({
  products,
  onOpenAddProduct,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct>(products[0]);
  const [activeItemType, setActiveItemType] = useState<string>('Finished Products');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tableViewMode, setTableViewMode] = useState<'Stock Overview' | 'Batches' | 'Expiry' | 'Locations'>('Stock Overview');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowIds(filteredProducts.map((p) => p.id));
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
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <i className="fa-solid fa-circle-check text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top 6 KPI Metric Cards matching screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* 1: Total Products */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Products</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-boxes-stacked" />
            </div>
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">28</span>
            <span className="text-[10px] text-emerald-600 font-bold">↑ 12%</span>
          </div>
          <span className="text-[9px] text-slate-400 block mt-0.5">vs last month</span>
        </div>

        {/* 2: Total Stock Value */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Stock Value</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-wallet" />
            </div>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-900 font-mono">₹ 38.5 Lakhs</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] text-emerald-600 font-bold">↑ 18%</span>
            <span className="text-[9px] text-slate-400">vs last month</span>
          </div>
        </div>

        {/* 3: Total Stock (Bags) */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Stock (Bags)</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-chart-column" />
            </div>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl font-black text-slate-900 font-mono">45,820</span>
            {/* Sparkline visualization */}
            <svg className="w-12 h-5 text-emerald-500" viewBox="0 0 50 20" fill="none">
              <path d="M 0 15 Q 12 5, 25 12 T 50 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[9px] text-slate-400 block mt-0.5">Active warehouse stock</span>
        </div>

        {/* 4: Low Stock Items */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Low Stock Items</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-triangle-exclamation" />
            </div>
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-xl font-black text-rose-600 font-mono">3</span>
            <span className="text-[10px] text-rose-600 font-bold">↓ 25%</span>
          </div>
          <span className="text-[9px] text-slate-400 block mt-0.5">vs last month</span>
        </div>

        {/* 5: In Transit */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">In Transit</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-truck" />
            </div>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900 font-mono">2,460</span>
          </div>
          <span className="text-[10px] text-blue-600 font-bold block mt-0.5">
            ⚡ 4 shipments
          </span>
        </div>

        {/* 6: Expiring Soon */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Expiring Soon</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-clock-rotate-left" />
            </div>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xl font-black text-amber-600 font-mono">5 Batches</span>
          </div>
          <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
            📍 Within 30 days
          </span>
        </div>
      </div>

      {/* Filter and Item Type Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Item Types Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 overflow-x-auto">
          {['Finished Products', 'Raw Materials', 'Packaging Materials', 'Other Items'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveItemType(t)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                activeItemType === t
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search & Filter Dropdowns */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          <div className="relative min-w-[200px]">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Texture Paint">Texture Paint</option>
            <option value="Interior Emulsion">Interior Emulsion</option>
            <option value="Exterior Emulsion">Exterior Emulsion</option>
            <option value="Primer">Primer</option>
            <option value="Distemper">Distemper</option>
            <option value="Waterproofing">Waterproofing</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
          </select>

          <button
            onClick={() => showToast('Filters reset')}
            className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-sliders text-xs text-slate-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Visual Product Cards Row Carousel (Matching Screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 select-none">
        {products.slice(0, 7).map((p) => {
          const isSelected = selectedProduct.id === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className={`bg-white p-3 rounded-2xl border transition cursor-pointer flex flex-col items-center text-center group ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-100 shadow-md'
                  : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Product Paint Packaging Illustration */}
              <div className="h-24 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <PaintBucketGraphic canType={p.canType} name={p.name} size="sm" />
              </div>

              <h4 className="text-[11px] font-black text-slate-900 leading-tight line-clamp-1">
                {p.name}
              </h4>
              <p className="text-[9px] text-slate-400 font-semibold">{p.category}</p>
              <p className="text-[8px] text-slate-400 mt-0.5 truncate">{p.sizes.join(' | ')}</p>

              <div className="mt-2 w-full pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-900 font-mono">
                  {p.currentStock.toLocaleString('en-IN')} {p.unit.includes('Litre') ? 'Ltr' : 'Bags'}
                </span>
                <span
                  className={`text-[8px] font-bold px-1.5 py-0.2 rounded-full ${
                    p.status === 'Low Stock' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Bottom Section: Split Grid (Left: Product Inventory Table; Right: Product Details Inspector) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column: Product Inventory Table (8 Cols) */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Table Header Bar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Product Inventory</h3>

            <div className="flex items-center space-x-2">
              <div className="flex items-center text-[11px] font-semibold text-slate-600">
                <span className="mr-2 text-slate-400">View:</span>
                <div className="inline-flex p-0.5 bg-slate-100 rounded-lg">
                  {(['Stock Overview', 'Batches', 'Expiry', 'Locations'] as const).map((vm) => (
                    <button
                      key={vm}
                      onClick={() => setTableViewMode(vm)}
                      className={`px-2.5 py-1 rounded-md transition ${
                        tableViewMode === vm
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'hover:text-slate-900'
                      }`}
                    >
                      {vm}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => showToast('Inventory report downloaded (CSV/Excel)')}
                className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-xl transition flex items-center gap-1.5"
              >
                <i className="fa-solid fa-file-arrow-down text-xs" />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200 select-none">
                <tr>
                  <th className="py-3 px-3 text-center w-8">
                    <input
                      type="checkbox"
                      checked={selectedRowIds.length > 0 && selectedRowIds.length === filteredProducts.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                  </th>
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-2">SKU</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-2">Unit</th>
                  <th className="py-3 px-2 text-right">Opening Stock</th>
                  <th className="py-3 px-2 text-right">Current Stock</th>
                  <th className="py-3 px-2 text-right">Reserved</th>
                  <th className="py-3 px-2 text-right">Available</th>
                  <th className="py-3 px-2 text-right">Reorder Level</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredProducts.map((p) => {
                  const isSelected = selectedProduct.id === p.id;
                  const isChecked = selectedRowIds.includes(p.id);

                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRow(p.id)}
                          className="rounded text-blue-600"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 flex items-center justify-center shrink-0">
                            <PaintBucketGraphic canType={p.canType} size="sm" />
                          </div>
                          <span className="font-bold text-slate-900 truncate max-w-[150px]">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono text-[11px] font-bold text-slate-700">
                        {p.sku}
                      </td>
                      <td className="py-3 px-3 text-slate-600 text-[11px] whitespace-nowrap">
                        {p.category}
                      </td>
                      <td className="py-3 px-2 text-slate-500 text-[11px] whitespace-nowrap">
                        {p.unit}
                      </td>
                      <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-600">
                        {p.openingStock.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2 text-right font-mono tabular-nums font-bold text-slate-900">
                        {p.currentStock.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-500">
                        {p.reservedStock.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2 text-right font-mono tabular-nums font-semibold text-emerald-700">
                        {p.availableStock.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-600">
                        {p.reorderLevel.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'Low Stock'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedProduct(p);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded"
                          title="Actions"
                        >
                          <i className="fa-solid fa-ellipsis text-xs px-1" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer matching screenshot */}
          <div className="p-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <span>Showing 1–10 of 28 products</span>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center">
                  &lt;
                </button>
                <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">
                  1
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center">
                  2
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center">
                  3
                </button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center">
                  &gt;
                </button>
              </div>

              <select className="p-1 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white">
                <option>10 / page</option>
                <option>25 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details Inspector (4 Cols - Matching Screenshot) */}
        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Product Details</h3>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
            >
              <i className="fa-solid fa-pen text-[10px]" />
              <span>Edit Product</span>
            </button>
          </div>

          {/* Product Hero Box */}
          <div className="flex flex-col items-center justify-center py-2 bg-slate-50/70 rounded-xl border border-slate-100">
            <PaintBucketGraphic canType={selectedProduct.canType} name={selectedProduct.name} size="md" />
            <div className="flex items-center gap-2 mt-2">
              <h4 className="text-base font-black text-slate-900">{selectedProduct.name}</h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          {/* Product Specifications Grid */}
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs border-b border-slate-100 pb-4">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">SKU</span>
              <span className="font-bold text-slate-800 font-mono">{selectedProduct.sku}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Category</span>
              <span className="font-bold text-slate-800">{selectedProduct.category}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">HSN Code</span>
              <span className="font-bold text-slate-800 font-mono">{selectedProduct.hsnCode}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Unit</span>
              <span className="font-bold text-slate-800">{selectedProduct.unit}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">MRP</span>
              <span className="font-bold text-slate-900 font-mono">₹ {selectedProduct.mrp}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Dealer Price</span>
              <span className="font-bold text-slate-900 font-mono">₹ {selectedProduct.dealerPrice}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Current Stock</span>
              <span className="font-black text-slate-900 font-mono">
                {selectedProduct.currentStock.toLocaleString('en-IN')} Bags
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Available Stock</span>
              <span className="font-bold text-emerald-700 font-mono">
                {selectedProduct.availableStock.toLocaleString('en-IN')} Bags
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Reserved Stock</span>
              <span className="font-bold text-slate-600 font-mono">
                {selectedProduct.reservedStock.toLocaleString('en-IN')} Bags
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Reorder Level</span>
              <span className="font-bold text-slate-800 font-mono">
                {selectedProduct.reorderLevel.toLocaleString('en-IN')} Bags
              </span>
            </div>
          </div>

          {/* Stock by Location */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 tracking-tight">Stock by Location</h4>
              <button
                onClick={() => showToast('Switched to Location View')}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {selectedProduct.locations.map((loc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 text-xs">
                      {idx === 0 ? '🏭' : idx === 1 ? '🏢' : '🏬'}
                    </span>
                    <span className="font-semibold text-slate-700">{loc.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    {loc.stock.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Movements */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 tracking-tight">Recent Movements</h4>
              <button
                onClick={() => showToast('Switched to Stock Movements audit')}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {selectedProduct.recentMovements.length > 0 ? (
                selectedProduct.recentMovements.map((mov, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                          mov.type === 'IN' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {mov.type === 'IN' ? '↑ IN' : '↓ OUT'}
                      </span>
                      <div>
                        <span className="font-semibold text-slate-800 block text-[11px] truncate max-w-[150px]">
                          {mov.title}
                        </span>
                        <span className="text-[9px] text-slate-400">{mov.date}</span>
                      </div>
                    </div>

                    <span
                      className={`font-bold font-mono text-[11px] ${
                        mov.type === 'IN' ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {mov.qty}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-slate-50 text-center text-slate-400 text-xs rounded-xl">
                  No recent movements recorded.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Edit {selectedProduct.name}</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name</label>
                <input
                  type="text"
                  defaultValue={selectedProduct.name}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    defaultValue={selectedProduct.mrp}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dealer Price (₹)</label>
                  <input
                    type="number"
                    defaultValue={selectedProduct.dealerPrice}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reorder Level</label>
                  <input
                    type="number"
                    defaultValue={selectedProduct.reorderLevel}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">HSN Code</label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.hsnCode}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    showToast('Product settings updated successfully!');
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
