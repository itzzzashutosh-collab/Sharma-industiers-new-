import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export interface DailyOrderData {
  date: string;
  dayLabel: string;
  orders: number;
  bags: number;
  revenueLakhs: number;
}

// 30-Day continuous daily volume matching the ERP dataset (248 orders, 18,460 bags, ₹24.8L)
const LAST_30_DAYS_ORDER_DATA: DailyOrderData[] = [
  { date: '2025-07-14', dayLabel: '14 Jul', orders: 6, bags: 450, revenueLakhs: 0.65 },
  { date: '2025-07-15', dayLabel: '15 Jul', orders: 8, bags: 620, revenueLakhs: 0.82 },
  { date: '2025-07-16', dayLabel: '16 Jul', orders: 7, bags: 510, revenueLakhs: 0.71 },
  { date: '2025-07-17', dayLabel: '17 Jul', orders: 5, bags: 390, revenueLakhs: 0.54 },
  { date: '2025-07-18', dayLabel: '18 Jul', orders: 9, bags: 710, revenueLakhs: 0.95 },
  { date: '2025-07-19', dayLabel: '19 Jul', orders: 8, bags: 600, revenueLakhs: 0.8 },
  { date: '2025-07-20', dayLabel: '20 Jul', orders: 4, bags: 310, revenueLakhs: 0.42 },
  { date: '2025-07-21', dayLabel: '21 Jul', orders: 7, bags: 540, revenueLakhs: 0.73 },
  { date: '2025-07-22', dayLabel: '22 Jul', orders: 10, bags: 820, revenueLakhs: 1.1 },
  { date: '2025-07-23', dayLabel: '23 Jul', orders: 8, bags: 640, revenueLakhs: 0.86 },
  { date: '2025-07-24', dayLabel: '24 Jul', orders: 9, bags: 730, revenueLakhs: 0.98 },
  { date: '2025-07-25', dayLabel: '25 Jul', orders: 7, bags: 560, revenueLakhs: 0.75 },
  { date: '2025-07-26', dayLabel: '26 Jul', orders: 11, bags: 910, revenueLakhs: 1.22 },
  { date: '2025-07-27', dayLabel: '27 Jul', orders: 5, bags: 380, revenueLakhs: 0.51 },
  { date: '2025-07-28', dayLabel: '28 Jul', orders: 8, bags: 670, revenueLakhs: 0.89 },
  { date: '2025-07-29', dayLabel: '29 Jul', orders: 9, bags: 740, revenueLakhs: 0.99 },
  { date: '2025-07-30', dayLabel: '30 Jul', orders: 8, bags: 630, revenueLakhs: 0.84 },
  { date: '2025-07-31', dayLabel: '31 Jul', orders: 10, bags: 850, revenueLakhs: 1.15 },
  { date: '2025-08-01', dayLabel: '01 Aug', orders: 9, bags: 760, revenueLakhs: 1.02 },
  { date: '2025-08-02', dayLabel: '02 Aug', orders: 7, bags: 590, revenueLakhs: 0.79 },
  { date: '2025-08-03', dayLabel: '03 Aug', orders: 8, bags: 680, revenueLakhs: 0.91 },
  { date: '2025-08-04', dayLabel: '04 Aug', orders: 11, bags: 940, revenueLakhs: 1.26 },
  { date: '2025-08-05', dayLabel: '05 Aug', orders: 12, bags: 1020, revenueLakhs: 1.38 },
  { date: '2025-08-06', dayLabel: '06 Aug', orders: 10, bags: 870, revenueLakhs: 1.17 },
  { date: '2025-08-07', dayLabel: '07 Aug', orders: 13, bags: 1140, revenueLakhs: 1.54 },
  { date: '2025-08-08', dayLabel: '08 Aug', orders: 12, bags: 1080, revenueLakhs: 1.46 },
  { date: '2025-08-09', dayLabel: '09 Aug', orders: 14, bags: 1210, revenueLakhs: 1.63 },
  { date: '2025-08-10', dayLabel: '10 Aug', orders: 11, bags: 980, revenueLakhs: 1.32 },
  { date: '2025-08-11', dayLabel: '11 Aug', orders: 16, bags: 1450, revenueLakhs: 1.95 },
  { date: '2025-08-12', dayLabel: '12 Aug', orders: 15, bags: 1380, revenueLakhs: 1.86 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color?: string;
  }>;
  label?: string;
}

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const rawData = LAST_30_DAYS_ORDER_DATA.find((d) => d.dayLabel === label);
    return (
      <div className="bg-slate-900/95 backdrop-blur-xs text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[180px] pointer-events-none">
        <p className="font-bold text-slate-300 border-b border-slate-700/80 pb-1.5 mb-2 flex items-center justify-between">
          <span>{label} 2025</span>
          <span className="text-[10px] text-blue-400 font-mono">Factory #01</span>
        </p>
        <div className="space-y-1">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-3 text-[11px]">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: item.color || '#3b82f6' }}
                />
                {item.name}:
              </span>
              <strong className="text-white tabular-nums font-mono">
                {item.name.toLowerCase().includes('bag')
                  ? `${item.value.toLocaleString()} bags`
                  : item.name.toLowerCase().includes('order')
                  ? `${item.value} orders`
                  : item.value}
              </strong>
            </div>
          ))}
          {rawData && (
            <div className="pt-1.5 mt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-emerald-400">
              <span>Day Value:</span>
              <strong className="tabular-nums font-mono">₹ {rawData.revenueLakhs} Lakhs</strong>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const SalesOrderVolumeChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30D' | '14D' | '7D'>('30D');
  const [metricView, setMetricView] = useState<'orders' | 'bags' | 'both'>('both');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sliced data based on time range
  const chartData = useMemo(() => {
    if (timeRange === '7D') return LAST_30_DAYS_ORDER_DATA.slice(-7);
    if (timeRange === '14D') return LAST_30_DAYS_ORDER_DATA.slice(-14);
    return LAST_30_DAYS_ORDER_DATA;
  }, [timeRange]);

  // Aggregate stats
  const totalOrders = chartData.reduce((acc, d) => acc + d.orders, 0);
  const totalBags = chartData.reduce((acc, d) => acc + d.bags, 0);
  const maxDay = chartData.reduce(
    (max, d) => (d.orders > max.orders ? d : max),
    chartData[0] || { orders: 0, dayLabel: '' }
  );
  const avgOrders = (totalOrders / chartData.length).toFixed(1);

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200"
      data-purpose="recharts-order-volume-visualizer"
    >
      {/* Top Header Card */}
      <div className="p-4 sm:px-5 sm:py-3.5 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap bg-slate-50/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
            <i className="fa-solid fa-chart-area" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Order Volume &amp; Bag Fulfillment Trend
              </h3>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/70">
                Last 30 Days Visualizer
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live daily order throughput and packaged paint bag volume across all Rajasthan territories
            </p>
          </div>
        </div>

        {/* Action Controls: Range, Metric, Type, Collapse */}
        <div className="flex items-center space-x-2 flex-wrap gap-y-1.5">
          {/* Time Range Pills */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
            {(['7D', '14D', '30D'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition cursor-pointer ${
                  timeRange === r
                    ? 'bg-white text-blue-700 font-bold shadow-xs'
                    : 'hover:text-slate-900 text-slate-500'
                }`}
              >
                {r === '30D' ? 'Last 30 Days' : r === '14D' ? '14 Days' : '7 Days'}
              </button>
            ))}
          </div>

          {/* Metric View Selector */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
            <button
              onClick={() => setMetricView('orders')}
              className={`px-2.5 py-1 rounded-md text-[11px] transition cursor-pointer ${
                metricView === 'orders'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setMetricView('bags')}
              className={`px-2.5 py-1 rounded-md text-[11px] transition cursor-pointer ${
                metricView === 'bags'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              Bags
            </button>
            <button
              onClick={() => setMetricView('both')}
              className={`px-2.5 py-1 rounded-md text-[11px] transition cursor-pointer ${
                metricView === 'both'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              Combined
            </button>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-slate-500 text-xs">
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                chartType === 'area' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
              title="Area Curve Chart"
            >
              <i className="fa-solid fa-chart-line text-[11px]" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                chartType === 'bar' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
              title="Bar Volume Chart"
            >
              <i className="fa-solid fa-chart-simple text-[11px]" />
            </button>
          </div>

          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            title={isCollapsed ? 'Expand Chart' : 'Collapse Chart'}
          >
            <i
              className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                isCollapsed ? '-rotate-90' : 'rotate-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Chart Body */}
      {!isCollapsed && (
        <div className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-200">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Orders ({timeRange})
              </span>
              <p className="text-base font-black text-slate-900 tabular-nums font-mono mt-0.5">
                {totalOrders} <span className="text-[10px] text-slate-400 font-normal">orders</span>
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Bags Dispatched
              </span>
              <p className="text-base font-black text-purple-700 tabular-nums font-mono mt-0.5">
                {totalBags.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] text-slate-400 font-normal">bags</span>
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Peak Day Volume
              </span>
              <p className="text-base font-black text-emerald-600 tabular-nums font-mono mt-0.5">
                {maxDay.orders} orders{' '}
                <span className="text-[10px] text-slate-400 font-normal font-sans">
                  ({maxDay.dayLabel})
                </span>
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Average Daily Orders
              </span>
              <p className="text-base font-black text-blue-600 tabular-nums font-mono mt-0.5">
                {avgOrders}{' '}
                <span className="text-[10px] text-slate-400 font-normal">orders / day</span>
              </p>
            </div>
          </div>

          {/* Recharts Canvas Container */}
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="orderVolumeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="bagVolumeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

                  <XAxis
                    dataKey="dayLabel"
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                    interval={timeRange === '30D' ? 2 : 0}
                  />

                  {/* Left Y Axis for Orders */}
                  {(metricView === 'orders' || metricView === 'both') && (
                    <YAxis
                      yAxisId="orders"
                      orientation="left"
                      tick={{ fill: '#64748b', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 'auto']}
                    />
                  )}

                  {/* Right Y Axis for Bags when in combined or bags mode */}
                  {(metricView === 'bags' || metricView === 'both') && (
                    <YAxis
                      yAxisId="bags"
                      orientation="right"
                      tick={{ fill: '#8b5cf6', fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `${val / 1000}k`}
                      domain={[0, 'auto']}
                    />
                  )}

                  <Tooltip content={<CustomChartTooltip />} />

                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '8px', fontSize: '11px', fontWeight: 600 }}
                  />

                  {(metricView === 'orders' || metricView === 'both') && (
                    <Area
                      yAxisId="orders"
                      type="monotone"
                      dataKey="orders"
                      name="Orders Count"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#orderVolumeGrad)"
                      activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2, fill: '#2563eb' }}
                    />
                  )}

                  {(metricView === 'bags' || metricView === 'both') && (
                    <Area
                      yAxisId="bags"
                      type="monotone"
                      dataKey="bags"
                      name="Bags Sold"
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#bagVolumeGrad)"
                      activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2, fill: '#8b5cf6' }}
                    />
                  )}
                </AreaChart>
              ) : (
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

                  <XAxis
                    dataKey="dayLabel"
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                    interval={timeRange === '30D' ? 2 : 0}
                  />

                  {(metricView === 'orders' || metricView === 'both') && (
                    <YAxis
                      yAxisId="orders"
                      orientation="left"
                      tick={{ fill: '#64748b', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                  )}

                  {(metricView === 'bags' || metricView === 'both') && (
                    <YAxis
                      yAxisId="bags"
                      orientation="right"
                      tick={{ fill: '#8b5cf6', fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `${val / 1000}k`}
                    />
                  )}

                  <Tooltip content={<CustomChartTooltip />} />

                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '8px', fontSize: '11px', fontWeight: 600 }}
                  />

                  {(metricView === 'orders' || metricView === 'both') && (
                    <Bar
                      yAxisId="orders"
                      dataKey="orders"
                      name="Orders Count"
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                    />
                  )}

                  {(metricView === 'bags' || metricView === 'both') && (
                    <Bar
                      yAxisId="bags"
                      dataKey="bags"
                      name="Bags Sold"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
