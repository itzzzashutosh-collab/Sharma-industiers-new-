import React, { useState } from 'react';
import { CatalogProduct } from '../../../types/erp';

interface InventoryReportsSubpageProps {
  products: CatalogProduct[];
}

export const InventoryReportsSubpage: React.FC<InventoryReportsSubpageProps> = ({ products }) => {
  const [activeReportTab, setActiveReportTab] = useState<'Valuation' | 'Fast / Slow Moving' | 'Aging Analysis'>('Valuation');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalValuation = products.reduce((sum, p) => sum + p.currentStock * p.dealerPrice, 0);
  const totalBags = products.reduce((sum, p) => sum + p.currentStock, 0);

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <i className="fa-solid fa-circle-check text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-chart-pie" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Inventory Analytics &amp; Valuation Reports</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cost accounting analysis, stock velocity ratios, aging distribution, and dead-stock mitigation reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Report exported as Microsoft Excel spreadsheet (.xlsx)')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
          >
            <i className="fa-solid fa-file-excel text-xs" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => {
              showToast('Print-ready PDF report generated');
              window.print();
            }}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
          >
            <i className="fa-solid fa-file-pdf text-xs" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Inventory Value
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              ₹{(totalValuation / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">↑ 18%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
            Annual Stock Turnover (STR)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-blue-700 font-mono">6.4x</span>
            <span className="text-[10px] text-slate-400">Industry avg: 5.2x</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Days Sales of Inventory (DSI)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">57 Days</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Healthy</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
            Dead / Slow Moving Stock
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-rose-700 font-mono">2.1%</span>
            <span className="text-[10px] text-slate-400">Target &lt; 3%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 w-fit">
        {(['Valuation', 'Fast / Slow Moving', 'Aging Analysis'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveReportTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg transition ${
              activeReportTab === tab ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1: Valuation */}
      {activeReportTab === 'Valuation' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Itemized Stock Valuation Report
            </h3>
            <span className="text-xs text-slate-500">Method: Weighted Average Cost</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">In-Stock Quantity</th>
                  <th className="py-3 px-4 text-right">Dealer Price (₹)</th>
                  <th className="py-3 px-4 text-right">MRP (₹)</th>
                  <th className="py-3 px-4 text-right">Total Asset Value</th>
                  <th className="py-3 px-4 text-right">% of Inventory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {products.map((p) => {
                  const val = p.currentStock * p.dealerPrice;
                  const pct = ((val / (totalValuation || 1)) * 100).toFixed(1);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">{p.sku}</td>
                      <td className="py-3 px-4 text-slate-600">{p.category}</td>
                      <td className="py-3 px-4 text-right font-bold font-mono text-slate-900">
                        {p.currentStock.toLocaleString('en-IN')} {p.unit}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600">
                        ₹{p.dealerPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600">
                        ₹{p.mrp.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono tabular-nums">
                        ₹{val.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-blue-600 font-mono">
                        {pct}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Fast / Slow Moving */}
      {activeReportTab === 'Fast / Slow Moving' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <i className="fa-solid fa-bolt" /> Fast Moving Paint SKUs
              </span>
              <span className="text-[10px] text-slate-400">High Velocity (&gt; 3,000 bags/mo)</span>
            </div>

            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{p.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{p.sku} • {p.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 font-mono block">
                    {p.currentStock.toLocaleString('en-IN')} {p.unit}
                  </span>
                  <span className="text-[9px] text-emerald-600 font-semibold">Turns every 14 days</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <i className="fa-solid fa-shield-halved" /> Slow Moving / Seasonal SKUs
              </span>
              <span className="text-[10px] text-slate-400">Requires Promotions</span>
            </div>

            {products.slice(5, 9).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/50 border border-amber-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{p.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{p.sku} • {p.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-800 font-mono block">
                    {p.currentStock.toLocaleString('en-IN')} {p.unit}
                  </span>
                  <span className="text-[9px] text-amber-700 font-semibold">Turns every 65 days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Aging Analysis */}
      {activeReportTab === 'Aging Analysis' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Inventory Shelf-Age Distribution
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-700">0 - 30 Days (Fresh)</span>
              <p className="text-lg font-black text-slate-900 font-mono mt-1">28,450 Bags</p>
              <span className="text-[10px] text-emerald-600 font-semibold">62% of inventory</span>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-[10px] uppercase font-bold text-blue-700">31 - 90 Days</span>
              <p className="text-lg font-black text-slate-900 font-mono mt-1">12,100 Bags</p>
              <span className="text-[10px] text-blue-600 font-semibold">26% of inventory</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-700">91 - 180 Days</span>
              <p className="text-lg font-black text-slate-900 font-mono mt-1">4,280 Bags</p>
              <span className="text-[10px] text-amber-600 font-semibold">9% of inventory</span>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-[10px] uppercase font-bold text-rose-700">&gt; 180 Days (Aging)</span>
              <p className="text-lg font-black text-slate-900 font-mono mt-1">990 Bags</p>
              <span className="text-[10px] text-rose-600 font-semibold">Action required</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
