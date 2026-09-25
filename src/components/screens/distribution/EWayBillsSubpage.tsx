import React, { useState } from 'react';
import { EWayBillRecord } from '../../../types/erp';

interface EWayBillsSubpageProps {
  ewayBills: EWayBillRecord[];
  onOpenEWayBillModal: (bill: EWayBillRecord) => void;
  onAddEWayBill?: (bill: EWayBillRecord) => void;
}

export const EWayBillsSubpage: React.FC<EWayBillsSubpageProps> = ({
  ewayBills,
  onOpenEWayBillModal,
  onAddEWayBill,
}) => {
  const [search, setSearch] = useState('');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [newBill, setNewBill] = useState<Partial<EWayBillRecord>>({
    ewbNumber: '992183401290',
    doNumber: 'DO-2025-143',
    docDate: '12 Aug 2025',
    validUntil: '15 Aug 2025, 11:59 PM',
    consignor: 'Swatch Paints Pvt Ltd (Bundi Plant)',
    consignee: 'New Rajasthan Hardware',
    destinationCity: 'Ajmer, RJ',
    hsnCode: '32149090',
    goodsDescription: 'Rustic Royale & Prime Putty',
    taxableValue: 310000,
    igstCgstAmount: 55800,
    distanceKm: 180,
    vehicleNumber: 'RJ-08-GA-1234',
    transporterName: 'Jaipur Golden Transport Co.',
    transporterGstin: '08AAACJ1234F1Z2',
    status: 'Active',
  });

  const filteredBills = ewayBills.filter(
    (b) =>
      b.ewbNumber.toLowerCase().includes(search.toLowerCase()) ||
      (b.doNumber || b.invoiceNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.consignee || b.customer || '').toLowerCase().includes(search.toLowerCase()) ||
      b.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      (b.destinationCity || b.toCity || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBill.ewbNumber || !newBill.consignee) return;

    const created: EWayBillRecord = {
      id: `ewb-${Date.now()}`,
      ewbNumber: newBill.ewbNumber!,
      doNumber: newBill.doNumber || 'DO-2025-GEN',
      docDate: newBill.docDate || '12 Aug 2025',
      validUntil: newBill.validUntil || '15 Aug 2025',
      consignor: newBill.consignor || 'Swatch Paints Pvt Ltd',
      consignee: newBill.consignee!,
      destinationCity: newBill.destinationCity || 'Rajasthan',
      hsnCode: newBill.hsnCode || '32149090',
      goodsDescription: newBill.goodsDescription || 'Paint Consignment',
      taxableValue: Number(newBill.taxableValue) || 100000,
      igstCgstAmount: Number(newBill.igstCgstAmount) || 18000,
      distanceKm: Number(newBill.distanceKm) || 100,
      vehicleNumber: newBill.vehicleNumber || 'RJ-08-GA-0000',
      transporterName: newBill.transporterName || 'Transporter',
      transporterGstin: newBill.transporterGstin || '08AAACJ1234F1Z2',
      status: 'Active',
    };

    onAddEWayBill?.(created);
    setIsGenerateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            GST e-Way Bills &amp; Transit Permits
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time compliance tracking under Rule 138, Part-A / Part-B validation, and highway transport approvals.
          </p>
        </div>

        <button
          onClick={() => setIsGenerateModalOpen(true)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
        >
          <i className="fa-solid fa-file-invoice" />
          <span>Generate e-Way Bill</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search e-Way Bill number, DO reference, consignee, truck plate, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
          />
        </div>
      </div>

      {/* E-Way Bill Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-4">e-Way Bill No.</th>
                <th className="py-3 px-4">Challan Ref</th>
                <th className="py-3 px-4">Consignee &amp; City</th>
                <th className="py-3 px-4">Commodity / HSN</th>
                <th className="py-3 px-4">Taxable &amp; GST</th>
                <th className="py-3 px-4">Vehicle &amp; Distance</th>
                <th className="py-3 px-4">Validity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.map((bill) => (
                <tr
                  key={bill.id}
                  onClick={() => onOpenEWayBillModal(bill)}
                  className="hover:bg-sky-50/40 cursor-pointer transition"
                >
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                      {bill.ewbNumber}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{bill.docDate}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {bill.doNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{bill.consignee}</div>
                    <div className="text-[10px] text-slate-500">📍 {bill.destinationCity}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800 truncate max-w-[180px]">
                      {bill.goodsDescription}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      HSN: {bill.hsnCode}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-900">
                      ₹{((bill.taxableValue || 0) + (bill.igstCgstAmount || 0)).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Tax: ₹{(bill.igstCgstAmount || 0).toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-800">{bill.vehicleNumber}</div>
                    <div className="text-[10px] text-slate-500">{bill.distanceKm} km route</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-emerald-700 font-bold text-[11px] font-mono">
                      {bill.validUntil}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        bill.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      ● {bill.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEWayBillModal(bill);
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-sky-700 hover:bg-sky-100 rounded-lg transition"
                    >
                      View EWB <i className="fa-solid fa-chevron-right text-[10px] ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate E-Way Bill Modal */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Generate Form GST EWB-01 Transit Permit
              </h3>
              <button
                onClick={() => setIsGenerateModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    e-Way Bill No. (NIC Govt)
                  </label>
                  <input
                    type="text"
                    required
                    value={newBill.ewbNumber}
                    onChange={(e) => setNewBill({ ...newBill, ewbNumber: e.target.value })}
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
                    value={newBill.doNumber}
                    onChange={(e) => setNewBill({ ...newBill, doNumber: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Consignee (Customer / Dealer)
                </label>
                <input
                  type="text"
                  required
                  value={newBill.consignee}
                  onChange={(e) => setNewBill({ ...newBill, consignee: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Destination City
                  </label>
                  <input
                    type="text"
                    required
                    value={newBill.destinationCity}
                    onChange={(e) => setNewBill({ ...newBill, destinationCity: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newBill.hsnCode}
                    onChange={(e) => setNewBill({ ...newBill, hsnCode: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Taxable Value (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newBill.taxableValue}
                    onChange={(e) => setNewBill({ ...newBill, taxableValue: parseFloat(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Truck Number (Part-B)
                  </label>
                  <input
                    type="text"
                    required
                    value={newBill.vehicleNumber}
                    onChange={(e) => setNewBill({ ...newBill, vehicleNumber: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Generate E-Way Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
