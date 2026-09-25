import React, { useState } from 'react';
import { Order } from '../../../types/erp';

interface SalesReportsSubpageProps {
  orders: Order[];
  onNavigateSubpage: (subpage: string) => void;
}

export const SalesReportsSubpage: React.FC<SalesReportsSubpageProps> = ({
  orders,
  onNavigateSubpage,
}) => {
  const [activeReportTab, setActiveReportTab] = useState<'Velocity' | 'Products' | 'Dealers' | 'Logistics'>('Velocity');
  const [dateRange, setDateRange] = useState('This Month (August 2025)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setToastMessage(`Exporting ${type} report for ${dateRange}... Download initiated.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
              Intelligence &amp; Auditing
            </span>
            <span className="text-xs text-slate-400">• Sales &amp; Order Reporting</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Sales &amp; Orders Analytic Reports
          </h2>
          <p className="text-xs text-slate-500">
            Deep-dive analytics on order velocity, product SKU contributions, dealer buying frequency &amp; fulfillment SLAs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none"
          >
            <option>This Month (August 2025)</option>
            <option>Last Month (July 2025)</option>
            <option>Q2 2025 (Apr - Jun)</option>
            <option>Year to Date (FY 2025-26)</option>
          </select>

          <button
            onClick={() => handleExport('Excel / CSV')}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-file-excel text-emerald-600 text-xs" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => handleExport('PDF Executive Summary')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-file-pdf text-xs" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-cloud-arrow-down text-purple-600 text-sm" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-purple-500 hover:text-purple-700">
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </div>
      )}

      {/* Report Module Navigation Tabs */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center gap-2">
        {[
          { id: 'Velocity', label: '1. Order Velocity & Revenue Trends', icon: 'fa-solid fa-chart-line' },
          { id: 'Products', label: '2. Product SKU Contribution', icon: 'fa-solid fa-cubes-stacked' },
          { id: 'Dealers', label: '3. Dealer Buying Frequency (RFM)', icon: 'fa-solid fa-users' },
          { id: 'Logistics', label: '4. Delivery SLA & Bay Fulfillment', icon: 'fa-solid fa-truck-fast' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveReportTab(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center space-x-2 ${
              activeReportTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <i className={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Order Velocity & Revenue Trends */}
      {activeReportTab === 'Velocity' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Average Order Value (AOV)</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">₹ 74,274</span>
              <span className="text-[10px] font-bold text-emerald-600">+12% vs last month</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Daily Order Run-rate</span>
              <span className="text-2xl font-black text-blue-600 mt-1 block">14 Orders/Day</span>
              <span className="text-[10px] text-slate-400">Peak on Mondays</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Advance Payment Share</span>
              <span className="text-2xl font-black text-indigo-600 mt-1 block">48.2%</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Healthy cashflow</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Repeat Order Rate</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">82.5%</span>
              <span className="text-[10px] text-slate-400">Every 9.4 days</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900">Weekly Revenue Inflow Cadence</h3>
            <div className="space-y-2">
              {[
                { week: 'Week 1 (Aug 1 - Aug 7)', amount: '₹ 8,40,000', bags: '2,100 Bags', width: '70%' },
                { week: 'Week 2 (Aug 8 - Aug 14)', amount: '₹ 11,20,000', bags: '2,800 Bags', width: '92%' },
                { week: 'Week 3 (Aug 15 - Aug 21)', amount: '₹ 9,90,000', bags: '2,450 Bags', width: '80%' },
                { week: 'Week 4 (Aug 22 - Aug 28)', amount: '₹ 8,90,000', bags: '2,100 Bags', width: '75%' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-800">{item.week}</span>
                    <span className="text-blue-600">{item.amount} ({item.bags})</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Product SKU Contribution */}
      {activeReportTab === 'Products' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                Product SKU Revenue Share
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-800">Swatch Super White Cement (50kg)</span>
                    <span className="font-extrabold text-slate-900">₹ 8,40,000 (45.6%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '45.6%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-800">Swatch Acrylic Wall Putty (40kg)</span>
                    <span className="font-extrabold text-slate-900">₹ 4,90,000 (26.6%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '26.6%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-800">Swatch Waterproof Polymer Putty (30kg)</span>
                    <span className="font-extrabold text-slate-900">₹ 2,80,000 (15.2%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '15.2%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-800">Primers, Textures &amp; Distemper</span>
                    <span className="font-extrabold text-slate-900">₹ 2,32,000 (12.6%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '12.6%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                Gross Margin Contribution by Product Line
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Waterproof Polymer Putty</span>
                    <span className="text-[11px] text-slate-500">Premium formulation with silanes</span>
                  </div>
                  <span className="font-black text-emerald-600 text-sm">34.5% Margin</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Acrylic Wall Putty 40kg</span>
                    <span className="text-[11px] text-slate-500">High volume contractor choice</span>
                  </div>
                  <span className="font-black text-emerald-600 text-sm">28.2% Margin</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Super White Cement 50kg</span>
                    <span className="text-[11px] text-slate-500">Flagship volume foundation</span>
                  </div>
                  <span className="font-black text-blue-600 text-sm">22.8% Margin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dealer Buying Frequency */}
      {activeReportTab === 'Dealers' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900">
              Top 10 Dealer Performance &amp; Buying Frequency Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Analysis based on order regularity, credit settlement timeliness, and cumulative bag volumes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Dealer Name</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Tier</th>
                  <th className="py-3 px-3 text-right">Orders Count</th>
                  <th className="py-3 px-3 text-right">Bags Purchased</th>
                  <th className="py-3 px-3 text-right">Total Revenue</th>
                  <th className="py-3 px-4 text-center">Avg Days Between Orders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Rajesh Traders', city: 'Kota', tier: 'Platinum Dealer', orders: 12, bags: 1450, rev: '₹ 6,12,000', days: '6.2 Days' },
                  { name: 'Neeraj Con. Infrastructure', city: 'Jaipur', tier: 'Key Contractor', orders: 8, bags: 1200, rev: '₹ 5,04,000', days: '8.5 Days' },
                  { name: 'Kota Distributors Pvt Ltd', city: 'Kota', tier: 'Wholesale Depot', orders: 9, bags: 980, rev: '₹ 4,11,600', days: '7.8 Days' },
                  { name: 'Om Painters & Decors', city: 'Bundi', tier: 'Gold Dealer', orders: 7, bags: 650, rev: '₹ 2,73,000', days: '11.0 Days' },
                  { name: 'Mewar Paint Mart', city: 'Udaipur', tier: 'Gold Dealer', orders: 6, bags: 540, rev: '₹ 2,26,800', days: '12.4 Days' },
                ].map((dealer, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{dealer.name}</td>
                    <td className="py-3 px-3 text-slate-500">{dealer.city}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {dealer.tier}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-slate-800">{dealer.orders}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">{dealer.bags}</td>
                    <td className="py-3 px-3 text-right font-black text-blue-600">{dealer.rev}</td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-600">{dealer.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Logistics & Delivery SLA */}
      {activeReportTab === 'Logistics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Order-to-Gate Pass Time</span>
              <span className="text-3xl font-black text-slate-900">3.8 Hours</span>
              <p className="text-xs text-slate-500">Average plant bay loading and dispatch clearance.</p>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">On-Time Route Compliance</span>
              <span className="text-3xl font-black text-emerald-600">98.6%</span>
              <p className="text-xs text-slate-500">Consignments reaching dealer shop before 5:00 PM.</p>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">In-Transit Transit Damage</span>
              <span className="text-3xl font-black text-indigo-600">0.38%</span>
              <p className="text-xs text-slate-500">Well below the regional industrial limit of 1.5%.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
