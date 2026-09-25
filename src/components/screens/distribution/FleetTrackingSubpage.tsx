import React, { useState } from 'react';
import { FleetVehicleRecord } from '../../../types/erp';

interface FleetTrackingSubpageProps {
  vehicles: FleetVehicleRecord[];
  onSelectVehicle?: (vehicle: FleetVehicleRecord) => void;
  onAddVehicle?: (vehicle: FleetVehicleRecord) => void;
}

export const FleetTrackingSubpage: React.FC<FleetTrackingSubpageProps> = ({
  vehicles,
  onSelectVehicle,
  onAddVehicle,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Partial<FleetVehicleRecord>>({
    plateNumber: 'RJ-08-GA-',
    model: 'Tata 407 LPT Heavy Duty',
    capacityTons: 6.0,
    assignedDriver: '',
    driverPhone: '+91 ',
    currentRoute: 'Bundi Central → Local Delivery',
    origin: 'Bundi Factory',
    destination: 'Kota',
    status: 'Idle / Available',
    progressPercent: 0,
    fuelEfficiencyKmpl: 8.5,
    locationCity: 'Bundi Factory Parking Bay',
    lastLocationUpdate: 'Ready for loading',
    fitnessValidTill: '31 Dec 2026',
    insuranceValidTill: '31 Dec 2026',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.plateNumber || !newVehicle.assignedDriver) return;

    const created: FleetVehicleRecord = {
      id: `veh-${Date.now()}`,
      plateNumber: newVehicle.plateNumber!,
      model: newVehicle.model || 'Tata 407 LPT Heavy Duty',
      capacityTons: Number(newVehicle.capacityTons) || 5.0,
      assignedDriver: newVehicle.assignedDriver!,
      driverPhone: newVehicle.driverPhone || '+91 94140 00000',
      currentRoute: newVehicle.currentRoute || 'Bundi Factory Gate',
      origin: 'Bundi Factory',
      destination: newVehicle.destination || 'Kota Depot',
      status: (newVehicle.status as FleetVehicleRecord['status']) || 'Idle / Available',
      progressPercent: 0,
      fuelEfficiencyKmpl: Number(newVehicle.fuelEfficiencyKmpl) || 8.0,
      locationCity: newVehicle.locationCity || 'Bundi Plant Yard',
      lastLocationUpdate: 'Just Now',
      fitnessValidTill: newVehicle.fitnessValidTill || '31 Dec 2026',
      insuranceValidTill: newVehicle.insuranceValidTill || '31 Dec 2026',
    };

    onAddVehicle?.(created);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Fleet Telematics &amp; Vehicle Master
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor truck capacities, fuel economics, driver assignments, and statutory fitness compliance.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
        >
          <i className="fa-solid fa-truck" />
          <span>Add Truck to Fleet</span>
        </button>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {vehicles.map((v) => (
          <div
            key={v.id}
            onClick={() => onSelectVehicle?.(v)}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 hover:border-blue-300 transition cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-black text-slate-900">
                    {v.plateNumber}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      v.status === 'In Transit'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : v.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : v.status === 'Delayed'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    ● {v.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{v.model}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Payload Capacity
                </span>
                <div className="text-sm font-black text-slate-900 font-mono">
                  {v.capacityTons} MT
                </div>
              </div>
            </div>

            {/* Current Route & GPS */}
            <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Active Corridor:</span>
                <span className="font-semibold text-slate-800">{v.currentRoute}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Live Location:</span>
                <span className="font-medium text-blue-700 flex items-center gap-1">
                  <i className="fa-solid fa-location-crosshairs text-xs" />
                  {v.locationCity}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Last Telemetry Sync:</span>
                <span>{v.lastLocationUpdate}</span>
              </div>
            </div>

            {/* Driver and Fuel Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Driver Assigned
                </span>
                <div className="font-bold text-slate-900 mt-0.5">{v.assignedDriver}</div>
                <div className="text-[11px] text-blue-600 font-mono mt-0.5">
                  {v.driverPhone}
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Mileage Efficiency
                </span>
                <div className="font-black text-slate-900 mt-0.5 font-mono">
                  {v.fuelEfficiencyKmpl} km/L
                </div>
                <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                  Diesel Fuel Normal
                </div>
              </div>
            </div>

            {/* Statutory Compliance Badges */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">
                Fitness: <strong className="text-slate-800 font-mono">{v.fitnessValidTill}</strong>
              </span>
              <span className="text-slate-500">
                Insurance: <strong className="text-slate-800 font-mono">{v.insuranceValidTill}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Truck Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Register New Truck in Fleet
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Registration Plate
                  </label>
                  <input
                    type="text"
                    required
                    value={newVehicle.plateNumber}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, plateNumber: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Payload Capacity (MT)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newVehicle.capacityTons}
                    onChange={(e) =>
                      setNewVehicle({
                        ...newVehicle,
                        capacityTons: parseFloat(e.target.value),
                      })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Truck Make &amp; Model
                </label>
                <input
                  type="text"
                  required
                  value={newVehicle.model}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, model: e.target.value })
                  }
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Assigned Driver
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mukesh Meena"
                    value={newVehicle.assignedDriver}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, assignedDriver: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Driver Mobile Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={newVehicle.driverPhone}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, driverPhone: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Register Truck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
