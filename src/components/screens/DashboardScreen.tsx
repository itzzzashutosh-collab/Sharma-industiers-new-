import React, { useState } from 'react';
import {
  Order,
  Invoice,
  ProductItem,
  SystemAlert,
  ActivityItem,
  ScreenType,
} from '../../types/erp';
import { ShowcaseCarousel, CarouselSlide } from '../ShowcaseCarousel';

interface DashboardScreenProps {
  orders: Order[];
  invoices: Invoice[];
  products: ProductItem[];
  alerts: SystemAlert[];
  activities: ActivityItem[];
  onNavigate: (screen: ScreenType) => void;
  onOpenOrderModal: () => void;
  onSelectInvoice: (invoice: Invoice) => void;
  onResolveAlert: (alertId: string) => void;
  onOpenContactWithProduct?: (productName: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  orders,
  invoices,
  alerts,
  activities,
  onNavigate,
  onOpenOrderModal,
  onSelectInvoice,
  onResolveAlert,
  onOpenContactWithProduct,
}) => {
  const [productRankingMetric, setProductRankingMetric] = useState<
    'revenue' | 'quantity' | 'profit'
  >('revenue');
  const [chartTimeframe, setChartTimeframe] = useState('Last 30 Days');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(7); // Default to 8 Aug point index 7

  // Data for combo chart points
  const chartPoints = [
    { date: '14 Jul', rev: '₹ 8.5L', revVal: 40, bags: '8,200', prod: '11,000', x: 50 },
    { date: '18 Jul', rev: '₹ 6.2L', revVal: 30, bags: '6,400', prod: '9,500', x: 90 },
    { date: '22 Jul', rev: '₹ 11.0L', revVal: 50, bags: '10,800', prod: '12,500', x: 130 },
    { date: '26 Jul', rev: '₹ 13.4L', revVal: 60, bags: '12,900', prod: '14,200', x: 170 },
    { date: '30 Jul', rev: '₹ 7.8L', revVal: 35, bags: '8,100', prod: '10,500', x: 210 },
    { date: '3 Aug', rev: '₹ 9.6L', revVal: 45, bags: '9,500', prod: '11,200', x: 250 },
    { date: '7 Aug', rev: '₹ 14.2L', revVal: 65, bags: '13,800', prod: '15,600', x: 290 },
    { date: '8 Aug 2025', rev: '₹ 18.2L', revVal: 85, bags: '16,400', prod: '18,000', x: 330 },
    { date: '9 Aug', rev: '₹ 16.0L', revVal: 75, bags: '15,100', prod: '17,200', x: 370 },
    { date: '11 Aug', rev: '₹ 20.4L', revVal: 95, bags: '17,800', prod: '19,500', x: 410 },
    { date: '12 Aug', rev: '₹ 22.1L', revVal: 100, bags: '18,460', prod: '21,000', x: 450 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* BEGIN: HeroWelcomeBanner */}
      <section
        className="relative rounded-2xl overflow-hidden shadow-sm bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4"
        data-purpose="hero-banner"
      >
        {/* Background Factory Graphic Emulation */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <svg className="w-full h-full object-cover" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <path
              d="M0 200 L120 180 L180 220 L300 150 L400 230 L550 170 L700 220 L850 140 L1000 210 L1000 300 L0 300 Z"
              fill="#ffffff"
            />
            <rect fill="#ffffff" height="100" width="18" x="150" y="80" />
            <rect fill="#ffffff" height="120" width="18" x="180" y="60" />
            <rect fill="#ffffff" height="120" width="22" x="680" y="90" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
            Good Morning, Ashutosh! <span className="text-amber-300">☀️</span>
          </h2>
          <p className="text-xs md:text-sm text-blue-100 font-normal mt-1 leading-relaxed">
            Here&apos;s your complete business overview. Keep building a brighter India.
          </p>
        </div>

        {/* Banner Right Tagline */}
        <div className="relative z-10 flex flex-col items-end self-end md:self-center">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
            <p className="text-sm md:text-base font-extrabold italic tracking-wide text-white font-serif">
              “Better Walls, Brighter Lives”
            </p>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-blue-200 mt-1 mr-1 font-semibold">
            Swatch Paints Factory #01 (Jaipur)
          </span>
        </div>
      </section>
      {/* END: HeroWelcomeBanner */}

      {/* BEGIN: KpiMetricsRow */}
      <section
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5"
        data-purpose="kpi-summary-cards"
      >
        {/* KPI 1: Revenue */}
        <div
          onClick={() => onNavigate('finance')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Total Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-chart-simple" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-black text-slate-900">₹ 24.8 Lakhs</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> +12%
                <span className="text-slate-400 font-normal text-[9px]">vs last mo</span>
              </span>
              <svg className="w-12 h-4 text-emerald-500 stroke-current fill-none stroke-2" viewBox="0 0 50 15">
                <path d="M0,13 Q10,12 18,7 T32,9 T50,2" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 2: Orders */}
        <div
          onClick={() => onNavigate('sales')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Total Orders</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-basket-shopping" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-black text-slate-900">{orders.length + 241}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-blue-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> +18%
                <span className="text-slate-400 font-normal text-[9px]">vs last mo</span>
              </span>
              <svg className="w-12 h-4 text-blue-500 stroke-current fill-none stroke-2" viewBox="0 0 50 15">
                <path d="M0,14 Q12,14 22,6 T36,11 T50,3" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 3: Bags Sold */}
        <div
          onClick={() => onNavigate('inventory')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Bags Sold</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-cube" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-black text-slate-900">18,460</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-purple-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> +8%
                <span className="text-slate-400 font-normal text-[9px]">vs last mo</span>
              </span>
              <svg className="w-12 h-4 text-purple-500 stroke-current fill-none stroke-2" viewBox="0 0 50 15">
                <path d="M0,12 Q14,8 24,11 T38,5 T50,7" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 4: Production Today */}
        <div
          onClick={() => onNavigate('production')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Production Today</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-industry" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-black text-slate-900">
              21,000 <span className="text-xs font-semibold text-slate-400 font-normal">Bags</span>
            </h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[9px] bg-teal-50 text-teal-700 font-bold px-1.5 py-0.5 rounded border border-teal-200">
                92%
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Target: 23,000</span>
            </div>
          </div>
        </div>

        {/* KPI 5: Cash in Hand */}
        <div
          onClick={() => onNavigate('finance')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Cash in Hand</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-wallet" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-black text-slate-900">₹ 38.5 Lakhs</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy
              </span>
              <svg className="w-12 h-4 text-emerald-500 stroke-current fill-none stroke-2" viewBox="0 0 50 15">
                <path d="M0,10 Q12,12 25,6 T40,8 T50,2" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 6: Pending Receivables */}
        <div
          onClick={() => onNavigate('invoices')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Pending Receivables</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-regular fa-clock" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-black text-slate-900">₹ 42.3 Lakhs</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[9px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <i className="fa-solid fa-triangle-exclamation text-[8px]" /> 14% overdue
              </span>
              <svg className="w-12 h-4 text-rose-500 stroke-current fill-none stroke-2" viewBox="0 0 50 15">
                <path d="M0,12 Q10,7 20,11 T35,5 T50,3" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      {/* END: KpiMetricsRow */}

      {/* BEGIN: MidSectionChartsAndFunnel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5" data-purpose="charts-and-funnel-row">
        {/* Left: Revenue, Orders & Production Combo Chart (6 cols) */}
        <div
          className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="combo-line-bar-chart"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Revenue, Orders &amp; Production</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={chartTimeframe}
                  onChange={(e) => setChartTimeframe(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 text-slate-600 font-medium px-2.5 py-1 rounded-lg focus:outline-none cursor-pointer hover:bg-slate-100"
                >
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 14 Days">Last 14 Days</option>
                  <option value="This Quarter">This Quarter</option>
                </select>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center space-x-4 text-[11px] font-semibold text-slate-600 mb-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-xs" /> Revenue (₹)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Bags Sold
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-purple-500 rounded-full" /> Production
              </span>
            </div>
          </div>

          {/* Chart Visual Container with Interactive Tooltip */}
          <div className="relative h-60 w-full pt-2">
            {/* Active Tooltip Container */}
            {hoveredChartPoint !== null && (
              <div
                className="absolute top-2 z-20 bg-slate-900/95 backdrop-blur-xs text-white px-2.5 py-2 rounded-xl text-[10px] shadow-xl border border-slate-700 pointer-events-none transition-all duration-100"
                style={{
                  left: `${(chartPoints[hoveredChartPoint].x / 500) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <p className="font-bold text-slate-300 border-b border-slate-700 pb-1 mb-1">
                  {chartPoints[hoveredChartPoint].date}
                </p>
                <p className="flex items-center justify-between gap-3 text-slate-200 font-medium">
                  <span>Revenue:</span>
                  <strong className="text-white">{chartPoints[hoveredChartPoint].rev}</strong>
                </p>
                <p className="flex items-center justify-between gap-3 text-amber-300 font-medium">
                  <span>Bags Sold:</span>
                  <strong>{chartPoints[hoveredChartPoint].bags}</strong>
                </p>
                <p className="flex items-center justify-between gap-3 text-purple-300 font-medium">
                  <span>Production:</span>
                  <strong>{chartPoints[hoveredChartPoint].prod}</strong>
                </p>
              </div>
            )}

            {/* SVG Graph canvas */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
              {/* Y Axis Grid Lines */}
              <line stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="1" x1="30" x2="490" y1="20" y2="20" />
              <line stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="1" x1="30" x2="490" y1="65" y2="65" />
              <line stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="1" x1="30" x2="490" y1="110" y2="110" />
              <line stroke="#f1f5f9" strokeWidth="1" x1="30" x2="490" y1="155" y2="155" />

              {/* Y Axis Labels */}
              <text fill="#94a3b8" fontFamily="sans-serif" fontSize="9" x="5" y="24">25L</text>
              <text fill="#94a3b8" fontFamily="sans-serif" fontSize="9" x="5" y="69">20L</text>
              <text fill="#94a3b8" fontFamily="sans-serif" fontSize="9" x="5" y="114">15L</text>
              <text fill="#94a3b8" fontFamily="sans-serif" fontSize="9" x="5" y="159">0</text>

              {/* Blue Revenue Bars with Hover Handlers */}
              {chartPoints.map((pt, idx) => {
                const isHovered = hoveredChartPoint === idx;
                const barHeight = pt.revVal;
                const barY = 155 - barHeight;
                return (
                  <rect
                    key={idx}
                    x={pt.x - 6}
                    y={barY}
                    width="12"
                    height={barHeight}
                    rx="3"
                    fill={isHovered ? '#2563eb' : '#60a5fa'}
                    opacity={isHovered ? 1 : 0.85}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredChartPoint(idx)}
                  />
                );
              })}

              {/* Bags Sold Line (Amber) */}
              <polyline
                fill="none"
                points="50,128 90,118 130,112 170,98 210,108 250,114 290,102 330,92 370,96 410,84 450,72"
                stroke="#f59e0b"
                strokeLinecap="round"
                strokeWidth="2.5"
              />

              {/* Production Line (Purple) */}
              <polyline
                fill="none"
                points="50,112 90,104 130,100 170,82 210,92 250,96 290,90 330,80 370,82 410,70 450,64"
                stroke="#8b5cf6"
                strokeLinecap="round"
                strokeWidth="2.5"
              />

              {/* Highlight Nodes on Active Hovered Point */}
              {hoveredChartPoint !== null && (
                <>
                  <line
                    stroke="#94a3b8"
                    strokeDasharray="2,2"
                    strokeWidth="1.5"
                    x1={chartPoints[hoveredChartPoint].x}
                    x2={chartPoints[hoveredChartPoint].x}
                    y1="20"
                    y2="155"
                  />
                  <circle
                    cx={chartPoints[hoveredChartPoint].x}
                    cy={155 - chartPoints[hoveredChartPoint].revVal}
                    fill="#2563eb"
                    r="4.5"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={chartPoints[hoveredChartPoint].x}
                    cy={92}
                    fill="#f59e0b"
                    r="4.5"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={chartPoints[hoveredChartPoint].x}
                    cy={80}
                    fill="#8b5cf6"
                    r="4.5"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </>
              )}

              {/* X Axis Labels */}
              <text fill="#94a3b8" fontSize="9" textAnchor="middle" x="50" y="175">14 Jul</text>
              <text fill="#94a3b8" fontSize="9" textAnchor="middle" x="90" y="175">18 Jul</text>
              <text fill="#94a3b8" fontSize="9" textAnchor="middle" x="130" y="175">22 Jul</text>
              <text fill="#94a3b8" fontSize="9" textAnchor="middle" x="170" y="175">26 Jul</text>
              <text fill="#94a3b8" fontSize="9" textAnchor="middle" x="210" y="175">30 Jul</text>
              <text fill="#94a3b8" fontSize="9" textAnchor="middle" x="250" y="175">3 Aug</text>
              <text fill="#94a3b8" fontSize="9" textAnchor="middle" x="330" y="175">8 Aug</text>
              <text fill="#94a3b8" fontSize="9" textAnchor="middle" x="450" y="175">12 Aug</text>
            </svg>
          </div>
        </div>

        {/* Middle: Top Selling Products (3 cols) */}
        <div
          className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="top-selling-products"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Top Selling Products</h3>
              <button
                onClick={() => onNavigate('inventory')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            {/* Segmented Buttons for Ranking */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-[10px] font-bold text-slate-600 mb-3">
              <button
                onClick={() => setProductRankingMetric('revenue')}
                className={`flex-1 py-1 rounded transition ${
                  productRankingMetric === 'revenue'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                By Revenue
              </button>
              <button
                onClick={() => setProductRankingMetric('quantity')}
                className={`flex-1 py-1 rounded transition ${
                  productRankingMetric === 'quantity'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                By Quantity
              </button>
              <button
                onClick={() => setProductRankingMetric('profit')}
                className={`flex-1 py-1 rounded transition ${
                  productRankingMetric === 'profit'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                By Profit
              </button>
            </div>

            {/* Products List */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div
                onClick={() => onNavigate('inventory')}
                className="flex items-center justify-between cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-bold text-slate-400 w-3">1</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-800">
                    <i className="fa-solid fa-fill-drip" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Swatch Rustic Royale</h4>
                    <p className="text-[10px] text-slate-400">8,460 bags</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">₹ 51.6L</p>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 22%</span>
                </div>
              </div>

              {/* Item 2 */}
              <div
                onClick={() => onNavigate('inventory')}
                className="flex items-center justify-between cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-bold text-slate-400 w-3">2</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-800">
                    <i className="fa-solid fa-paint-roller" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Swatch Shine Emulsion</h4>
                    <p className="text-[10px] text-slate-400">4,200 bags</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">₹ 26.8L</p>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 18%</span>
                </div>
              </div>

              {/* Item 3 */}
              <div
                onClick={() => onNavigate('inventory')}
                className="flex items-center justify-between cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-bold text-slate-400 w-3">3</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white border border-slate-700 flex items-center justify-center text-xs font-bold">
                    <i className="fa-solid fa-shield-halved" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Swatch Weatherguard</h4>
                    <p className="text-[10px] text-slate-400">3,850 bags</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">₹ 15.4L</p>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 16%</span>
                </div>
              </div>

              {/* Item 4 */}
              <div
                onClick={() => onNavigate('inventory')}
                className="flex items-center justify-between cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-bold text-slate-400 w-3">4</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                    <i className="fa-solid fa-brush" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Swatch Base Prime</h4>
                    <p className="text-[10px] text-slate-400">1,950 bags</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">₹ 4.3L</p>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 8%</span>
                </div>
              </div>

              {/* Item 5 */}
              <div
                onClick={() => onNavigate('inventory')}
                className="flex items-center justify-between cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-bold text-slate-400 w-3">5</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center text-xs font-bold text-rose-800">
                    <i className="fa-solid fa-bucket" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Swatch Distemper</h4>
                    <p className="text-[10px] text-slate-400">1,420 bags</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">₹ 1.7L</p>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sales Funnel (CRM) (3 cols) */}
        <div
          className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="crm-sales-funnel"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Sales Funnel (CRM)</h3>
              <button
                onClick={() => onNavigate('crm')}
                className="text-xs bg-slate-50 border border-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded flex items-center gap-1 hover:bg-slate-100"
              >
                This Month <i className="fa-solid fa-chevron-down text-[8px] text-slate-400" />
              </button>
            </div>

            {/* Sleek Funnel Hierarchy with Clip Paths */}
            <div
              className="mt-4 space-y-1.5 flex flex-col items-center w-full cursor-pointer"
              onClick={() => onNavigate('crm')}
            >
              {/* Tier 1: Leads */}
              <div className="relative w-full text-center">
                <div className="h-8 bg-purple-600 text-white rounded-md funnel-trap-1 flex items-center justify-between px-6 text-xs font-bold shadow-xs hover:brightness-105 transition">
                  <span />
                  <span>
                    1,240 <span className="font-normal text-[10px] text-purple-200">Leads</span>
                  </span>
                  <span className="text-[10px] font-medium text-purple-200">100%</span>
                </div>
              </div>

              {/* Tier 2: Contacted */}
              <div className="relative w-[88%] text-center">
                <div className="h-8 bg-sky-500 text-white rounded-md funnel-trap-2 flex items-center justify-between px-5 text-xs font-bold shadow-xs hover:brightness-105 transition">
                  <span />
                  <span>
                    680 <span className="font-normal text-[10px] text-sky-100">Contacted</span>
                  </span>
                  <span className="text-[10px] font-medium text-sky-100">55%</span>
                </div>
              </div>

              {/* Tier 3: Qualified */}
              <div className="relative w-[76%] text-center">
                <div className="h-8 bg-emerald-500 text-white rounded-md funnel-trap-3 flex items-center justify-between px-4 text-xs font-bold shadow-xs hover:brightness-105 transition">
                  <span />
                  <span>
                    420 <span className="font-normal text-[10px] text-emerald-100">Qualified</span>
                  </span>
                  <span className="text-[10px] font-medium text-emerald-100">34%</span>
                </div>
              </div>

              {/* Tier 4: Quotation Sent */}
              <div className="relative w-[64%] text-center">
                <div className="h-8 bg-amber-500 text-white rounded-md funnel-trap-4 flex items-center justify-between px-3 text-xs font-bold shadow-xs hover:brightness-105 transition">
                  <span />
                  <span className="truncate">
                    220 <span className="font-normal text-[9px] text-amber-100">Quotation</span>
                  </span>
                  <span className="text-[10px] font-medium text-amber-100">18%</span>
                </div>
              </div>

              {/* Tier 5: Closed Won */}
              <div className="relative w-[52%] text-center">
                <div className="h-8 bg-rose-500 text-white rounded-md funnel-trap-5 flex items-center justify-between px-3 text-xs font-bold shadow-xs hover:brightness-105 transition">
                  <span />
                  <span>
                    148 <span className="font-normal text-[9px] text-rose-100">Won</span>
                  </span>
                  <span className="text-[10px] font-medium text-rose-100">12%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] font-semibold text-slate-500">
              Overall Conversion: <strong className="text-slate-800">11.9%</strong>
            </span>
          </div>
        </div>
      </section>
      {/* END: MidSectionChartsAndFunnel */}

      {/* BEGIN: OperationalStatusAndAlertsRow */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" data-purpose="operations-row">
        {/* Card 1: Inventory Status */}
        <div
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="inventory-status"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Inventory Status</h3>
              <button
                onClick={() => onNavigate('inventory')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5 text-slate-700 font-medium">
                  <i className="fa-solid fa-boxes-stacked text-slate-400 w-4" />
                  <span>Raw Materials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ● Healthy
                  </span>
                  <span className="text-slate-500 font-semibold text-[11px]">12 items</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5 text-slate-700 font-medium">
                  <i className="fa-solid fa-dolly text-slate-400 w-4" />
                  <span>Finished Goods</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    ● Adequate
                  </span>
                  <span className="text-slate-500 font-semibold text-[11px]">8 items</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5 text-slate-700 font-medium">
                  <i className="fa-solid fa-triangle-exclamation text-rose-500 w-4" />
                  <span>Low Stock Items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    ● 3 items
                  </span>
                  <button
                    onClick={() => onNavigate('inventory')}
                    className="text-blue-600 font-semibold text-[11px] underline"
                  >
                    View List
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5 text-slate-700 font-medium">
                  <i className="fa-solid fa-truck-fast text-slate-400 w-4" />
                  <span>In Transit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ● On time
                  </span>
                  <span className="text-slate-500 font-semibold text-[11px]">2 shipments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Production Status */}
        <div
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="production-status"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Production Status</h3>
              <span className="text-xs bg-slate-50 border border-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded">
                Today
              </span>
            </div>
            <div className="flex items-center space-x-4 my-2">
              {/* Radial Donut Progress */}
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-emerald-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="92, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute font-black text-slate-800 text-xs">92%</span>
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900">21,000 / 23,000</h4>
                <p className="text-[11px] text-slate-500 font-medium">Bags Produced</p>
              </div>
            </div>

            {/* Sub stats row */}
            <div className="grid grid-cols-3 gap-2 text-center py-2 border-t border-slate-100">
              <div className="bg-slate-50 p-1.5 rounded-lg">
                <span className="block text-xs font-black text-slate-800">3</span>
                <span className="text-[9px] text-slate-400 font-medium uppercase">Batches</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg">
                <span className="block text-xs font-black text-slate-800">0</span>
                <span className="text-[9px] text-slate-400 font-medium uppercase">Defects</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg">
                <span className="block text-xs font-black text-emerald-600">98%</span>
                <span className="text-[9px] text-slate-400 font-medium uppercase">Quality Pass</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('production')}
            className="w-full text-center text-xs font-bold text-blue-600 py-1.5 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-1 mt-2"
          >
            View Production <i className="fa-solid fa-arrow-right text-[10px]" />
          </button>
        </div>

        {/* Card 3: Cash Flow */}
        <div
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="cash-flow-status"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Cash Flow</h3>
              <span className="text-xs bg-slate-50 border border-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded">
                This Month
              </span>
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">₹ 38.5 Lakhs</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    ● Healthy
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-400">Cash in Hand</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">₹ 42.3 Lakhs</span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                    14% overdue
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-400">Receivables</p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">₹ 18.7 Lakhs</span>
                  <span className="text-[10px] font-semibold text-blue-600">Due this month</span>
                </div>
                <p className="text-[10px] font-medium text-slate-400">Payables</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('finance')}
            className="w-full text-center text-xs font-bold text-blue-600 py-1.5 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-1 mt-2"
          >
            View Finance Dashboard <i className="fa-solid fa-arrow-right text-[10px]" />
          </button>
        </div>

        {/* Card 4: Alerts & Action Required */}
        <div
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="alerts-action-required"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Alerts &amp; Action Required</h3>
              <span className="text-xs font-semibold text-blue-600">
                Active ({alerts.length})
              </span>
            </div>
            <div className="space-y-2.5">
              {alerts.slice(0, 5).map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => onResolveAlert(alt.id)}
                  className="flex items-start space-x-2 group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition"
                >
                  <span
                    className={`w-4 h-4 rounded-full ${alt.badgeBg} flex items-center justify-center text-[9px] shrink-0 mt-0.5 font-bold`}
                  >
                    {alt.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600">
                      {alt.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="truncate">{alt.subtitle}</span>
                      <span className="shrink-0 ml-1">{alt.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* END: OperationalStatusAndAlertsRow */}

      {/* BEGIN: InteractiveShowcaseCarouselSection */}
      <section data-purpose="interactive-product-factory-carousel">
        <ShowcaseCarousel
          onSelectSlideAction={(slide) => {
            if (onOpenContactWithProduct) {
              onOpenContactWithProduct(slide.title);
            } else {
              onNavigate('inventory');
            }
          }}
        />
      </section>
      {/* END: InteractiveShowcaseCarouselSection */}

      {/* BEGIN: BottomTablesAndActivityRow */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5" data-purpose="tables-and-activity-row">
        {/* Table 1: Recent Orders (5 cols) */}
        <div
          className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="recent-orders-table"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Recent Orders</h3>
                <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded">
                  {orders.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenOrderModal}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <i className="fa-solid fa-plus text-[9px]" /> New
                </button>
                <button
                  onClick={() => onNavigate('sales')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase font-bold">
                    <th className="pb-2">Order #</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Products</th>
                    <th className="pb-2 text-right">Qty</th>
                    <th className="pb-2 text-right">Amount</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {orders.slice(0, 5).map((ord) => (
                    <tr
                      key={ord.id}
                      onClick={() => onNavigate('sales')}
                      className="hover:bg-slate-50 cursor-pointer transition"
                    >
                      <td className="py-2.5 font-semibold text-slate-900">{ord.orderNumber}</td>
                      <td className="py-2.5 max-w-[120px] truncate">{ord.customer}</td>
                      <td className="py-2.5 text-slate-500 max-w-[110px] truncate">{ord.products}</td>
                      <td className="py-2.5 text-right tabular-nums">{ord.qty}</td>
                      <td className="py-2.5 text-right font-semibold tabular-nums">{ord.amount}</td>
                      <td className="py-2.5 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ord.status === 'Processing'
                              ? 'bg-amber-50 text-amber-600'
                              : ord.status === 'Dispatched'
                              ? 'bg-sky-50 text-sky-600'
                              : ord.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Table 2: Recent Invoices (4 cols) */}
        <div
          className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="recent-invoices-table"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Recent Invoices</h3>
              <button
                onClick={() => onNavigate('invoices')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase font-bold">
                    <th className="pb-2">Invoice #</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2 text-right">Amount</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {invoices.slice(0, 5).map((inv) => (
                    <tr
                      key={inv.id}
                      onClick={() => onSelectInvoice(inv)}
                      className="hover:bg-slate-50 cursor-pointer transition"
                    >
                      <td className="py-2.5 font-semibold text-slate-900">{inv.invoiceNumber}</td>
                      <td className="py-2.5 max-w-[100px] truncate">{inv.customer}</td>
                      <td className="py-2.5 text-slate-400 text-[11px] whitespace-nowrap">{inv.date}</td>
                      <td className="py-2.5 text-right font-semibold tabular-nums">{inv.amount}</td>
                      <td className="py-2.5 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-600'
                              : inv.status === 'Pending'
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-rose-50 text-rose-600'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Activity Feed: Team Activity (3 cols) */}
        <div
          className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
          data-purpose="team-activity-feed"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Team Activity</h3>
              <button
                onClick={() => onNavigate('team')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="flex items-start space-x-2.5">
                  <img
                    alt={act.author}
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200 aspect-square"
                    src={act.avatar}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-800 leading-snug">
                      <strong className="font-bold">{act.author}</strong>: {act.action}
                    </p>
                    <span className="text-[10px] text-slate-400">{act.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* END: BottomTablesAndActivityRow */}
    </div>
  );
};
