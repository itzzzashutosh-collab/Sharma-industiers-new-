import React, { useState } from 'react';
import { PodRecord } from '../../../types/erp';

interface ProofOfDeliverySubpageProps {
  podRecords: PodRecord[];
  onOpenPodModal: (pod: PodRecord) => void;
  onAddPodRecord?: (pod: PodRecord) => void;
}

export const ProofOfDeliverySubpage: React.FC<ProofOfDeliverySubpageProps> = ({
  podRecords,
  onOpenPodModal,
  onAddPodRecord,
}) => {
  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPod, setNewPod] = useState<Partial<PodRecord>>({
    podNumber: 'POD-2025-145',
    doNumber: 'DO-2025-142',
    customerName: 'Rajesh Traders Kota',
    deliveredDate: '12 Aug 2025',
    deliveredTime: '05:30 PM',
    receivedBy: 'Rajesh Sharma',
    receiverPhone: '+91 94140 88219',
    bagsDelivered: 500,
    condition: 'Intact & Sealed',
    hasDigitalSignature: true,
    driverName: 'Ramesh Verma',
    status: 'Verified',
  });

  const filteredPods = podRecords.filter(
    (p) =>
      p.podNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.doNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.customerName.toLowerCase().includes(search.toLowerCase()) ||
      p.receivedBy.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPod.podNumber || !newPod.doNumber) return;

    const created: PodRecord = {
      id: `pod-${Date.now()}`,
      podNumber: newPod.podNumber!,
      doNumber: newPod.doNumber!,
      customerName: newPod.customerName || 'Customer Store',
      deliveredDate: newPod.deliveredDate || 'Today',
      deliveredTime: newPod.deliveredTime || '05:00 PM',
      receivedBy: newPod.receivedBy || 'Store Incharge',
      receiverPhone: newPod.receiverPhone || '+91 94140 00000',
      bagsDelivered: Number(newPod.bagsDelivered) || 100,
      condition: (newPod.condition as PodRecord['condition']) || 'Intact & Sealed',
      hasDigitalSignature: true,
      driverName: newPod.driverName || 'Driver',
      status: 'Verified',
    };

    onAddPodRecord?.(created);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Proof of Delivery (e-POD) Register
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographic customer delivery confirmations, signed outward challans, and unloading inspection reports.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
        >
          <i className="fa-solid fa-stamp" />
          <span>Upload Customer POD</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by POD Number, DO reference, customer name, receiver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* POD Cards / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-4">POD Number</th>
                <th className="py-3 px-4">Challan DO Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Delivered Date &amp; Time</th>
                <th className="py-3 px-4">Received By &amp; Phone</th>
                <th className="py-3 px-4">Quantity Received</th>
                <th className="py-3 px-4">Cargo Condition</th>
                <th className="py-3 px-4">Digital Sign</th>
                <th className="py-3 px-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPods.map((pod) => (
                <tr
                  key={pod.id}
                  onClick={() => onOpenPodModal(pod)}
                  className="hover:bg-emerald-50/40 cursor-pointer transition"
                >
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {pod.podNumber}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {pod.doNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {pod.customerName}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-800 font-medium">{pod.deliveredDate}</div>
                    <div className="text-[10px] text-slate-400">{pod.deliveredTime}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{pod.receivedBy}</div>
                    <div className="text-[10px] font-mono text-slate-500">{pod.receiverPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {pod.bagsDelivered} Units
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                      <i className="fa-solid fa-circle-check" />
                      {pod.condition}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {pod.hasDigitalSignature ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        ✓ Verified Sign
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Paper Stamp
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPodModal(pod);
                      }}
                      className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition flex items-center gap-1 ml-auto"
                    >
                      <i className="fa-solid fa-eye text-[11px]" />
                      <span>View POD</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload POD Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Log Customer Proof of Delivery (e-POD)
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    POD Certificate No.
                  </label>
                  <input
                    type="text"
                    required
                    value={newPod.podNumber}
                    onChange={(e) => setNewPod({ ...newPod, podNumber: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Challan DO Reference
                  </label>
                  <input
                    type="text"
                    required
                    value={newPod.doNumber}
                    onChange={(e) => setNewPod({ ...newPod, doNumber: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Customer / Consignee
                </label>
                <input
                  type="text"
                  required
                  value={newPod.customerName}
                  onChange={(e) => setNewPod({ ...newPod, customerName: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Receiver Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    value={newPod.receivedBy}
                    onChange={(e) => setNewPod({ ...newPod, receivedBy: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Receiver Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={newPod.receiverPhone}
                    onChange={(e) => setNewPod({ ...newPod, receiverPhone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Delivered Quantity (Bags)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPod.bagsDelivered}
                    onChange={(e) => setNewPod({ ...newPod, bagsDelivered: parseInt(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Physical Package Condition
                  </label>
                  <select
                    value={newPod.condition}
                    onChange={(e) => setNewPod({ ...newPod, condition: e.target.value as PodRecord['condition'] })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Intact & Sealed">Intact &amp; Sealed (100% OK)</option>
                    <option value="Minor Outer Scuff">Minor Outer Scuff</option>
                    <option value="Damaged">Transit Damage Noted</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Verify &amp; Store POD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
