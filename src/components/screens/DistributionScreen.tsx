import React from 'react';

export const DistributionScreen: React.FC = () => {
  const shipments = [
    {
      id: 'shp-1',
      dispatchId: 'DSP-8091',
      orderRef: 'SO-1002',
      customer: 'Om Painters (Kota)',
      vehicle: 'Tata 407 (RJ-14-GA-8120)',
      driver: 'Mahesh Meena',
      contact: '+91 94140 88219',
      route: 'Jaipur Factory #01 → Tonk → Kota',
      status: 'In Transit',
      eta: 'Today, 06:30 PM',
      load: '100 Buckets (Shine Emulsion)',
      badge: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'shp-2',
      dispatchId: 'DSP-8092',
      orderRef: 'SO-1003',
      customer: 'Neeraj Con. (Jodhpur)',
      vehicle: 'Eicher Pro 1110 (RJ-14-GB-4011)',
      driver: 'Balram Saini',
      contact: '+91 98291 33410',
      route: 'Jaipur Factory #01 → Ajmer → Jodhpur',
      status: 'Delivered',
      eta: 'Delivered at 11:45 AM',
      load: '300 Drums (Weatherguard)',
      badge: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'shp-3',
      dispatchId: 'DSP-8093',
      orderRef: 'SO-1005',
      customer: 'Kota Distributors',
      vehicle: 'Mahindra Bolero Maxi (RJ-14-TA-9912)',
      driver: 'Ramdev Gurjar',
      contact: '+91 97840 22345',
      route: 'Jaipur Factory #01 → Kota Industrial Area',
      status: 'Loading at Bay 2',
      eta: 'Dispatching 04:00 PM',
      load: '200 Bags (Base Prime)',
      badge: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-truck-moving" />
            </span>
            <h2 className="text-lg font-black text-slate-900">
              Distribution &amp; Supply Chain Logistics
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Fleet tracking, dispatch bay status &amp; transit routes from Factory #01 (Jaipur).
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            ● 2 Shipments In Transit (On Time)
          </span>
        </div>
      </div>

      {/* Shipment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shipments.map((shp) => (
          <div
            key={shp.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {shp.dispatchId}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{shp.customer}</h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${shp.badge}`}>
                {shp.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-truck text-slate-400 text-[10px] w-3" />
                <span className="font-semibold text-slate-800">{shp.vehicle}</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-id-card text-slate-400 text-[10px] w-3" />
                <span>
                  {shp.driver} ({shp.contact})
                </span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-route text-slate-400 text-[10px] w-3" />
                <span>{shp.route}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-700 font-semibold">
                <i className="fa-solid fa-boxes-packing text-slate-400 text-[10px] w-3" />
                <span>{shp.load}</span>
              </p>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-slate-400">ETA / Time:</span>
              <strong className="text-slate-900">{shp.eta}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
