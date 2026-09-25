import React, { useState } from 'react';
import { GoodsReceiptRecord } from '../../../types/erp';
import { INITIAL_GRN_RECORDS } from '../../../data/purchaseData';

export const GoodsReceiptSubpage: React.FC = () => {
  const [grnRecords, setGrnRecords] = useState<GoodsReceiptRecord[]>(INITIAL_GRN_RECORDS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New GRN form state
  const [poNumber, setPoNumber] = useState('PO-2025-023');
  const [supplierName, setSupplierName] = useState('Shree Polymers');
  const [vehicleNumber, setVehicleNumber] = useState('RJ-20-EA-3301');
  const [transporter, setTransporter] = useState('TCI Freight');
  const [netWeightKg, setNetWeightKg] = useState<number>(5020);
  const [challanNumber, setChallanNumber] = useState('SP/DC/9912');

  const handleCreateGRN = (e: React.FormEvent) => {
    e.preventDefault();
    const newGRN: GoodsReceiptRecord = {
      id: `grn-${Date.now()}`,
      grnNumber: `GRN-2025-0${Math.floor(25 + Math.random() * 70)}`,
      poNumber,
      supplierName,
      receivedDate: 'Today, 03:00 PM',
      vehicleNumber,
      transporter,
      challanNumber,
      itemsReceived: [
        {
          materialName: 'Pure Acrylic Resin Emulsion',
          orderedQty: 5000,
          receivedQty: 5000,
          rejectedQty: 0,
          unit: 'kg',
          qcStatus: 'Passed',
        },
      ],
      weighbridgeNetWeightKg: netWeightKg,
      receiverName: 'Ramu Meena (Store Incharge)',
      qcInspector: 'Anita Rawat (QC Chemist)',
      status: 'Full Receipt',
    };
    setGrnRecords([newGRN, ...grnRecords]);
    setShowAddModal(false);
  };

  const filteredGRNs = grnRecords.filter(
    (g) =>
      g.grnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-truck-ramp-box" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Goods Receipt Note (GRN) &amp; Warehouse Inbound Gate Entry
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Physical material inward verification, weighbridge gross/tare slips, and QC lab clearance.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search GRN #, PO #, truck #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-60 font-medium"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Generate Inbound GRN</span>
          </button>
        </div>
      </div>

      {/* GRN Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Inbound Goods Receipt Notes (GRN)</h3>
            <span className="text-[11px] text-slate-400">Jaipur Factory Gate #2 Material Reception</span>
          </div>
          <span className="text-xs font-mono text-slate-500 font-bold">
            Total {filteredGRNs.length} GRNs Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">GRN #</th>
                <th className="py-3 px-4">PO Reference</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Received Date</th>
                <th className="py-3 px-4">Vehicle / Transporter</th>
                <th className="py-3 px-4 text-right">Weighbridge Net Wt</th>
                <th className="py-3 px-4">QC Clearance</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Store Incharge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredGRNs.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{g.grnNumber}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{g.poNumber}</td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block font-semibold">{g.supplierName}</strong>
                    <span className="text-[10px] text-slate-400">Challan: {g.challanNumber}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{g.receivedDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-800 block text-[11px]">
                      {g.vehicleNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">{g.transporter}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800 tabular-nums">
                    {g.weighbridgeNetWeightKg.toLocaleString()} kg
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] inline-flex items-center gap-1">
                      <i className="fa-solid fa-check text-[9px]" /> Verified by {g.qcInspector.split('(')[0]}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        g.status === 'Full Receipt'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                    {g.receiverName.split('(')[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New GRN Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowAddModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Record Inbound Gate Entry (GRN)</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleCreateGRN} className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Purchase Order Ref</label>
                  <input
                    type="text"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Supplier Name</label>
                  <input
                    type="text"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Truck / Vehicle No.</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Transporter</label>
                  <input
                    type="text"
                    value={transporter}
                    onChange={(e) => setTransporter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Weighbridge Net Weight (kg)</label>
                  <input
                    type="number"
                    value={netWeightKg}
                    onChange={(e) => setNetWeightKg(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Vendor Delivery Challan #</label>
                  <input
                    type="text"
                    value={challanNumber}
                    onChange={(e) => setChallanNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                >
                  Submit Gate Pass &amp; GRN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
