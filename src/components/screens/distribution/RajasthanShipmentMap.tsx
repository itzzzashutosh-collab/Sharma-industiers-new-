import React, { useState } from 'react';
import { FleetVehicleRecord } from '../../../types/erp';

interface RajasthanShipmentMapProps {
  vehicles: FleetVehicleRecord[];
  onSelectVehicle?: (vehicle: FleetVehicleRecord) => void;
  isFullView?: boolean;
  onOpenFullMap?: () => void;
}

export const RajasthanShipmentMap: React.FC<RajasthanShipmentMapProps> = ({
  vehicles,
  onSelectVehicle,
  isFullView = false,
  onOpenFullMap,
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeMarkerInfo, setActiveMarkerInfo] = useState<{
    name: string;
    type: 'factory' | 'depot' | 'truck';
    details: string;
    x: number;
    y: number;
  } | null>(null);

  // Map coordinate projections scaled to 800x480 viewBox
  const nodes = {
    jaipur: { x: 440, y: 70, name: 'Jaipur', type: 'depot', stock: '2,880 Bags' },
    ajmer: { x: 310, y: 140, name: 'Ajmer', type: 'hub', stock: 'Via Point' },
    tonk: { x: 450, y: 175, name: 'Tonk', type: 'hub', stock: 'Via Point' },
    sawai: { x: 550, y: 140, name: 'Sawai Madhopur', type: 'hub', stock: 'En-route' },
    bundi: { x: 400, y: 260, name: 'Factory Bundi', type: 'factory', stock: '12,480 Bags (Central)' },
    kota: { x: 455, y: 310, name: 'Kota', type: 'depot', stock: '5,320 Bags' },
    baran: { x: 550, y: 290, name: 'Baran', type: 'hub', stock: 'En-route' },
    jhalawar: { x: 505, y: 390, name: 'Jhalawar', type: 'hub', stock: 'En-route' },
    chittorgarh: { x: 300, y: 310, name: 'Chittorgarh', type: 'hub', stock: 'Via Point' },
    bhilwara: { x: 310, y: 230, name: 'Bhilwara', type: 'depot', stock: '850 Bags' },
    udaipur: { x: 190, y: 390, name: 'Udaipur', type: 'depot', stock: '3,650 Bags' },
  };

  return (
    <div className={`relative bg-[#f1f5f3] rounded-2xl border border-slate-200 overflow-hidden select-none ${isFullView ? 'h-[620px]' : 'h-[360px]'}`}>
      {/* Top Map Filter Header */}
      {!isFullView && (
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-2 pointer-events-auto">
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="px-2.5 py-1 text-[11px] bg-white/95 backdrop-blur-xs border border-slate-300 rounded-lg text-slate-700 font-medium shadow-2xs hover:bg-white cursor-pointer"
            >
              <option value="all">All Vehicles</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.plateNumber} ({v.currentRoute})
                </option>
              ))}
            </select>

            <select className="px-2.5 py-1 text-[11px] bg-white/95 backdrop-blur-xs border border-slate-300 rounded-lg text-slate-700 font-medium shadow-2xs hover:bg-white cursor-pointer">
              <option>Today</option>
              <option>Yesterday</option>
              <option>This Week</option>
            </select>
          </div>

          <div className="pointer-events-auto flex items-center space-x-2">
            {onOpenFullMap && (
              <button
                onClick={onOpenFullMap}
                className="px-2.5 py-1 text-[11px] font-bold bg-white/95 hover:bg-white text-emerald-800 border border-slate-300 rounded-lg shadow-2xs transition flex items-center gap-1"
              >
                <i className="fa-solid fa-expand text-[10px]" />
                <span>View Full Map</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Status Legend (Matching Screenshot Top Right) */}
      <div className="absolute top-12 right-3 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 p-2.5 rounded-xl shadow-xs text-[10px] space-y-1.5 font-semibold text-slate-600">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-2xs" />
          <span>Delivered (6)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-2xs" />
          <span>In Transit (4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-2xs" />
          <span>Delayed (2)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-2xs" />
          <span>Not Started (1)</span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <svg
        viewBox="0 0 760 460"
        className="w-full h-full object-cover"
        style={{ background: 'linear-gradient(135deg, #eef5f0 0%, #e8f0eb 100%)' }}
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d5e2d9" strokeWidth="0.5" opacity="0.6" />
          </pattern>
          {/* Gradients */}
          <linearGradient id="route-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="route-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="route-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        {/* Topographic Grid Texture */}
        <rect width="760" height="460" fill="url(#grid-pattern)" />

        {/* Ambient Topography Silhouettes */}
        <path
          d="M 60,80 Q 140,50 260,90 T 480,40 T 700,70 L 740,420 Q 560,440 380,430 T 40,400 Z"
          fill="#eaf2ec"
          opacity="0.8"
        />

        {/* High-speed Highway Routes (Dashed & Solid Lines matching screenshot) */}
        {/* Bundi to Kota */}
        <path
          d={`M ${nodes.bundi.x} ${nodes.bundi.y} Q 425 285 ${nodes.kota.x} ${nodes.kota.y}`}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeDasharray="6,4"
        />

        {/* Bundi to Jaipur via Tonk */}
        <path
          d={`M ${nodes.bundi.x} ${nodes.bundi.y} Q 420 215 ${nodes.tonk.x} ${nodes.tonk.y} T ${nodes.jaipur.x} ${nodes.jaipur.y}`}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
        />

        {/* Bundi to Ajmer to Jaipur */}
        <path
          d={`M ${nodes.bundi.x} ${nodes.bundi.y} Q 350 200 ${nodes.ajmer.x} ${nodes.ajmer.y} Q 380 100 ${nodes.jaipur.x} ${nodes.jaipur.y}`}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="4,4"
        />

        {/* Bundi to Sawai Madhopur */}
        <path
          d={`M ${nodes.bundi.x} ${nodes.bundi.y} Q 480 190 ${nodes.sawai.x} ${nodes.sawai.y}`}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="4,4"
        />

        {/* Bundi to Baran */}
        <path
          d={`M ${nodes.bundi.x} ${nodes.bundi.y} Q 480 270 ${nodes.baran.x} ${nodes.baran.y}`}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="4,4"
        />

        {/* Kota to Jhalawar */}
        <path
          d={`M ${nodes.kota.x} ${nodes.kota.y} Q 480 350 ${nodes.jhalawar.x} ${nodes.jhalawar.y}`}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
          strokeDasharray="5,3"
        />

        {/* Bundi to Bhilwara */}
        <path
          d={`M ${nodes.bundi.x} ${nodes.bundi.y} Q 350 240 ${nodes.bhilwara.x} ${nodes.bhilwara.y}`}
          fill="none"
          stroke="#dc2626"
          strokeWidth="3"
        />

        {/* Bundi to Chittorgarh to Udaipur */}
        <path
          d={`M ${nodes.bundi.x} ${nodes.bundi.y} Q 340 280 ${nodes.chittorgarh.x} ${nodes.chittorgarh.y} Q 240 350 ${nodes.udaipur.x} ${nodes.udaipur.y}`}
          fill="none"
          stroke="#059669"
          strokeWidth="3.5"
        />

        {/* City Node Markers & Labels */}
        {Object.entries(nodes).map(([key, n]) => {
          const isFactory = n.type === 'factory';
          return (
            <g
              key={key}
              className="cursor-pointer transition transform hover:scale-110"
              onMouseEnter={() => {
                setHoveredNode(key);
                setActiveMarkerInfo({
                  name: n.name,
                  type: n.type as 'factory' | 'depot' | 'truck',
                  details: n.stock,
                  x: n.x,
                  y: n.y,
                });
              }}
              onMouseLeave={() => setActiveMarkerInfo(null)}
            >
              {isFactory ? (
                <>
                  <circle cx={n.x} cy={n.y} r="18" fill="#3b82f6" opacity="0.25" className="animate-ping" />
                  <circle cx={n.x} cy={n.y} r="14" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    🏭
                  </text>
                  {/* Factory Badge Banner matching Screenshot */}
                  <g transform={`translate(${n.x - 28}, ${n.y + 12})`}>
                    <rect width="56" height="28" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))" />
                    <text x="28" y="12" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">
                      Factory
                    </text>
                    <text x="28" y="22" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="semibold">
                      Bundi
                    </text>
                  </g>
                </>
              ) : (
                <>
                  <circle cx={n.x} cy={n.y} r="6" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
                  <text
                    x={n.x}
                    y={n.y - 10}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="11"
                    fontWeight="bold"
                    className="select-none"
                    style={{ textShadow: '0 1px 3px rgba(255,255,255,0.9)' }}
                  >
                    {n.name}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Dynamic Moving Truck Icons on Routes (Matching Screenshot) */}
        {/* Truck 1: En route to Kota (In Transit) */}
        <g
          transform="translate(425, 290)"
          className="cursor-pointer"
          onClick={() => onSelectVehicle && onSelectVehicle(vehicles[0])}
        >
          <circle cx="12" cy="12" r="14" fill="#2563eb" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
          <text x="12" y="16" textAnchor="middle" fill="#ffffff" fontSize="10">
            🚚
          </text>
        </g>

        {/* Truck 2: Delivered at Udaipur */}
        <g
          transform="translate(195, 365)"
          className="cursor-pointer"
          onClick={() => onSelectVehicle && onSelectVehicle(vehicles[1])}
        >
          <circle cx="12" cy="12" r="14" fill="#059669" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
          <text x="12" y="16" textAnchor="middle" fill="#ffffff" fontSize="10">
            🚚
          </text>
        </g>

        {/* Truck 3: En route to Jaipur near Tonk */}
        <g
          transform="translate(425, 130)"
          className="cursor-pointer"
          onClick={() => onSelectVehicle && onSelectVehicle(vehicles[2])}
        >
          <circle cx="12" cy="12" r="14" fill="#2563eb" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
          <text x="12" y="16" textAnchor="middle" fill="#ffffff" fontSize="10">
            🚚
          </text>
        </g>

        {/* Truck 4: Delayed near Bhilwara */}
        <g
          transform="translate(330, 240)"
          className="cursor-pointer"
          onClick={() => onSelectVehicle && onSelectVehicle(vehicles[3])}
        >
          <circle cx="12" cy="12" r="14" fill="#dc2626" stroke="#ffffff" strokeWidth="2" className="animate-pulse" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
          <text x="12" y="16" textAnchor="middle" fill="#ffffff" fontSize="10">
            🚚
          </text>
        </g>
      </svg>

      {/* Floating Hover Tooltip */}
      {activeMarkerInfo && (
        <div
          className="absolute z-20 pointer-events-none bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs -translate-x-1/2 -translate-y-16 animate-in fade-in duration-100"
          style={{ left: `${(activeMarkerInfo.x / 760) * 100}%`, top: `${(activeMarkerInfo.y / 460) * 100}%` }}
        >
          <strong className="block font-bold text-white text-[11px]">{activeMarkerInfo.name}</strong>
          <span className="text-[10px] text-slate-300 block">{activeMarkerInfo.details}</span>
        </div>
      )}
    </div>
  );
};
