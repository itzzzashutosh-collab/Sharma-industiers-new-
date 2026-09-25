import React, { useState } from 'react';
import { RAW_MATERIALS } from '../../data/mockData';
import { RawMaterial } from '../../types/erp';

export const PurchaseScreen: React.FC = () => {
  const [materials, setMaterials] = useState<RawMaterial[]>(RAW_MATERIALS);
  const [showPOModal, setShowPOModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [orderQty, setOrderQty] = useState(1000);

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === selectedMaterial.id
          ? { ...m, stockKg: m.stockKg + orderQty, status: 'Healthy' }
          : m
      )
    );
    setShowPOModal(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-cart-shopping" />
            </span>
            <h2 className="text-lg font-black text-slate-900">Purchase &amp; Raw Materials Inventory</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Titanium Dioxide pigments, acrylic polymers, calcite fillers &amp; packaging supplies.
          </p>
        </div>

        <button
          onClick={() => setShowPOModal(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
        >
          <i className="fa-solid fa-plus text-[10px]" />
          <span>New Supplier PO</span>
        </button>
      </div>

      {/* Raw Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((rm) => {
          const isLow = rm.stockKg <= rm.minKg;
          return (
            <div
              key={rm.id}
              className={`bg-white p-5 rounded-2xl border transition shadow-xs flex flex-col justify-between ${
                isLow ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{rm.name}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{rm.category}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isLow
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    ● {rm.status}
                  </span>
                </div>

                <div className="my-4 py-3 border-y border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      In-Stock
                    </span>
                    <p className="text-xl font-black text-slate-900 tabular-nums">
                      {rm.stockKg.toLocaleString('en-IN')} {rm.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Safety Threshold
                    </span>
                    <p className="text-xs font-bold text-slate-600 tabular-nums">
                      {rm.minKg.toLocaleString('en-IN')} {rm.unit}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500">
                  <span>Vendor: </span>
                  <strong className="text-slate-700 font-semibold">{rm.supplier}</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedMaterial(rm);
                  setShowPOModal(true);
                }}
                className="w-full mt-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              >
                Order Replenishment
              </button>
            </div>
          );
        })}
      </div>

      {/* PO Modal */}
      {showPOModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowPOModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900">Issue Purchase Order</h3>
            <p className="text-xs text-slate-500 mt-1">Order raw material consignment to Jaipur Factory #01.</p>

            <form onSubmit={handleCreatePO} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 text-slate-600">Raw Material</label>
                <select
                  value={selectedMaterial.id}
                  onChange={(e) =>
                    setSelectedMaterial(materials.find((m) => m.id === e.target.value) || materials[0])
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.stockKg} {m.unit} left)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Quantity to Procure ({selectedMaterial.unit})</label>
                <input
                  type="number"
                  step="500"
                  value={orderQty}
                  onChange={(e) => setOrderQty(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">Approved Vendor</label>
                <input
                  type="text"
                  readOnly
                  value={selectedMaterial.supplier}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPOModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Approve &amp; Send PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
