import React, { useState } from 'react';
import { EWayBillRecord } from '../../../types/erp';
import { INITIAL_EWAY_BILLS } from '../../../data/invoicesData';

export const EWayBillsSubpage: React.FC = () => {
  const [ewayBills, setEwayBills] = useState<EWayBillRecord[]>(INITIAL_EWAY_BILLS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New EWB Form state
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2025-0891');
  const [customer, setCustomer] = useState('Marwar Paints & Hardware Mart');
  const [toCity, setToCity] = useState('Jodhpur');
  const [vehicleNumber, setVehicleNumber] = useState('RJ-14-GA-8821');
  const [transporterName, setTransporterName] = useState('Rajasthan Golden Transport Co.');
  const [distanceKm, setDistanceKm] = useState(345);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerateEWB = (e: React.FormEvent) => {
    e.preventDefault();
    const newEWB: EWayBillRecord = {
      id: `ewb-${Date.now()}`,
      ewbNumber: `2810${Math.floor(10000000 + Math.random() * 90000000)}`,
      invoiceNumber,
      customer,
      fromCity: 'Jaipur (Plant Sitapura)',
      toCity,
      vehicleNumber,
      transporterName,
      transporterId: '08AAACR8821B1Z9',
      distanceKm,
      validUntil: '14 Aug 2025 11:59 PM',
      status: 'Active',
      generatedAt: '12 Aug 2025 01:15 PM',
    };

    setEwayBills([newEWB, ...ewayBills]);
    setIsModalOpen(false);
    showToast(`E-Way Bill ${newEWB.ewbNumber} generated on NIC Portal!`);
  };

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
            <span className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-truck-fast" />
            </span>
            <h2 className="text-lg font-black text-slate-900">National E-Way Bill Portal Sync</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Rule 138 GST compliance: Automated 12-digit E-Way Bill generation, Part-B vehicle updates &amp; road inspection slips.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>Generate New E-Way Bill</span>
        </button>
      </div>

      {/* 4 Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Consignments
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">
              {ewayBills.filter((e) => e.status === 'Active').length} Active
            </span>
            <span className="text-[10px] text-cyan-600 font-bold">In-Transit</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Successfully Delivered
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-emerald-700 font-mono">
              {ewayBills.filter((e) => e.status === 'Delivered').length} Delivered
            </span>
            <span className="text-[10px] text-slate-400">Gate verified</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Jaipur Plant Dispatches
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 font-mono">1,054 KM</span>
            <span className="text-[10px] text-slate-400">Cumulative today</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Portal API Status
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected to NIC
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            E-Way Bills Master Registry
          </h3>
          <span className="text-xs text-slate-500">Validity based on 200 km per day rule</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">E-Way Bill #</th>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Consignee Customer</th>
                <th className="py-3 px-4">Route (From - To)</th>
                <th className="py-3 px-4">Vehicle Number</th>
                <th className="py-3 px-4">Valid Until</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {ewayBills.map((ewb) => (
                <tr key={ewb.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-blue-600 font-mono">
                    {ewb.ewbNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 font-mono">
                    {ewb.invoiceNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{ewb.customer}</span>
                    <span className="text-[10px] text-slate-400">{ewb.transporterName}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800 font-medium">{ewb.toCity}</div>
                    <div className="text-[10px] text-slate-400">
                      from {ewb.fromCity} ({ewb.distanceKm} km)
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {ewb.vehicleNumber}
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-[11px] whitespace-nowrap">
                    {ewb.validUntil}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ewb.status === 'Active'
                          ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      ● {ewb.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => showToast(`Printed E-Way Bill slip for ${ewb.ewbNumber}`)}
                      className="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      Print Slip
                    </button>
                    <button
                      onClick={() => showToast(`Vehicle update requested for ${ewb.vehicleNumber}`)}
                      className="px-2.5 py-1 text-[10px] font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition"
                    >
                      Update Part-B
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Generate E-Way Bill</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleGenerateEWB} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Destination City</label>
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehicle Number</label>
                  <input
                    type="text"
                    placeholder="e.g. RJ-14-GA-8821"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Distance (KM)</label>
                  <input
                    type="number"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Transporter Name</label>
                <input
                  type="text"
                  value={transporterName}
                  onChange={(e) => setTransporterName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Generate 12-Digit EWB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
