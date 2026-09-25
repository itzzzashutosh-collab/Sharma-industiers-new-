import React, { useState } from 'react';
import { RoutePlanningRecord } from '../../../types/erp';

interface RouteLogisticsSubpageProps {
  routes: RoutePlanningRecord[];
}

export const RouteLogisticsSubpage: React.FC<RouteLogisticsSubpageProps> = ({
  routes,
}) => {
  const [selectedRoute, setSelectedRoute] = useState<RoutePlanningRecord>(routes[0]);
  const [simulatedWeightTons, setSimulatedWeightTons] = useState<number>(8.0);

  const calculateEstimatedFreight = (route: RoutePlanningRecord, weightTons: number) => {
    const baseKmCost = route.distanceKm * 40;
    const tonnageSurcharge = weightTons * 120;
    const tollCost = route.tollPlazasCount * 450;
    return Math.round(baseKmCost + tonnageSurcharge + tollCost);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-lg font-black text-slate-900">
          Highway Corridors &amp; Freight Route Planning
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Transit distance benchmarks, toll plazas, waypoint routing, and trip cost estimations for Rajasthan supply chains.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Route Cards */}
        <div className="space-y-3">
          {routes.map((rt) => {
            const isSelected = selectedRoute.id === rt.id;
            return (
              <div
                key={rt.id}
                onClick={() => setSelectedRoute(rt)}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/60 border-blue-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {rt.routeCode}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {rt.distanceKm} km
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2">{rt.routeName}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>⏱ {rt.estimatedHours} hrs transit</span>
                  <span>🛣 {rt.tollPlazasCount} Toll Plazas</span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Avg Trip Cost:</span>
                  <strong className="text-slate-900 font-mono">
                    ₹{rt.avgFreightCost.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Detailed Waypoint Breakdown & Cost Calculator */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                Corridor: {selectedRoute.routeCode}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-2">
                {selectedRoute.routeName}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Benchmark Distance</span>
              <div className="text-lg font-mono font-black text-slate-900">
                {selectedRoute.distanceKm} Kilometers
              </div>
            </div>
          </div>

          {/* Route Milestones / Waypoint Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Transit Waypoints &amp; Checkpoints
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="relative pl-6 space-y-4">
                {/* Vertical Line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-blue-300" />

                {selectedRoute.waypoints.map((wp, idx) => (
                  <div key={idx} className="relative flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                        idx === 0
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : idx === selectedRoute.waypoints.length - 1
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : 'bg-white border-2 border-blue-500 text-blue-700'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-800">{wp}</span>
                      <span className="text-[10px] text-slate-400 ml-2 font-mono">
                        {idx === 0
                          ? 'Origin Dispatch Gate'
                          : idx === selectedRoute.waypoints.length - 1
                          ? 'Destination Depot Inward'
                          : 'Highway Intersection Point'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Freight Cost Estimation Simulator */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Freight Cost Estimator (Fuel + Toll + Tonnage)
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Calculate projected transporter charges based on payload tonnage.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-blue-700">
                ₹{calculateEstimatedFreight(selectedRoute, simulatedWeightTons).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Simulate Truck Payload (Metric Tons):</span>
                <span className="font-mono font-bold text-slate-900">
                  {simulatedWeightTons} MT ({Math.round(simulatedWeightTons / 0.02)} Bags)
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="16.0"
                step="0.5"
                value={simulatedWeightTons}
                onChange={(e) => setSimulatedWeightTons(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-600 border-t border-blue-200">
              <div>
                <span className="text-slate-400">Diesel / Distance:</span>
                <div className="font-mono font-bold text-slate-800">
                  ₹{(selectedRoute.distanceKm * 40).toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <span className="text-slate-400">FASTag Toll Plazas:</span>
                <div className="font-mono font-bold text-slate-800">
                  ₹{(selectedRoute.tollPlazasCount * 450).toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Total Projected Freight:</span>
                <div className="font-mono font-black text-blue-800">
                  ₹{calculateEstimatedFreight(selectedRoute, simulatedWeightTons).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
