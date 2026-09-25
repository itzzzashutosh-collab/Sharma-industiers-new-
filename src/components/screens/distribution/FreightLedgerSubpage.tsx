import React, { useState } from 'react';
import { TransporterLedgerRecord } from '../../../types/erp';

interface FreightLedgerSubpageProps {
  transporters: TransporterLedgerRecord[];
  onRecordPayment?: (transporterId: string, amount: number) => void;
}

export const FreightLedgerSubpage: React.FC<FreightLedgerSubpageProps> = ({
  transporters,
  onRecordPayment,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState<TransporterLedgerRecord>(transporters[0]);
  const [paymentAmount, setPaymentAmount] = useState(45000);
  const [paymentMode, setPaymentMode] = useState('RTGS / NEFT');

  const totalBilled = transporters.reduce((sum, t) => sum + t.totalBilledAmount, 0);
  const totalPaid = transporters.reduce((sum, t) => sum + t.totalPaidAmount, 0);
  const totalPending = transporters.reduce((sum, t) => sum + t.pendingBalance, 0);

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransporter) return;
    onRecordPayment?.(selectedTransporter.id, paymentAmount);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Transporters &amp; Freight Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Logistics partner accounts, freight billing, trip rates, and pending transporter balance reconciliations.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedTransporter(transporters[0]);
            setPaymentAmount(transporters[0].pendingBalance);
            setIsPaymentModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2"
        >
          <i className="fa-solid fa-money-check-dollar" />
          <span>Record Freight Settlement</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Freight Invoiced
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            ₹{totalBilled.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across {transporters.length} registered 3PL transporters
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Freight Paid to Date
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            ₹{totalPaid.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Cleared via corporate bank transfer
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Outstanding Freight Balance
          </div>
          <div className="text-2xl font-black text-amber-600 mt-1 font-mono">
            ₹{totalPending.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Pending verification &amp; POD audits
          </div>
        </div>
      </div>

      {/* Transporter Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-4">Transporter Partner</th>
                <th className="py-3 px-4">Key Contact &amp; Phone</th>
                <th className="py-3 px-4">GSTIN &amp; Trucks</th>
                <th className="py-3 px-4">Trips Completed</th>
                <th className="py-3 px-4">Base Rate</th>
                <th className="py-3 px-4">Billed Amount</th>
                <th className="py-3 px-4">Paid Amount</th>
                <th className="py-3 px-4">Pending Balance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transporters.map((tr) => (
                <tr key={tr.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{tr.transporterName}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-amber-500 font-bold text-[10px]">
                        ★ {tr.rating}
                      </span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] text-slate-500">
                        {tr.panIndiaPermit ? 'National Permit' : 'State Corridor'}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">{tr.contactPerson}</div>
                    <div className="text-[10px] font-mono text-blue-600">{tr.phone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-700">{tr.gstin}</div>
                    <div className="text-[10px] text-slate-400">{tr.vehicleCount} Vehicles Fleet</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {tr.totalTripsCompleted} Loads
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    ₹{tr.standardRatePerKm} / km
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-900 font-bold">
                    ₹{tr.totalBilledAmount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">
                    ₹{tr.totalPaidAmount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      ₹{tr.pendingBalance.toLocaleString('en-IN')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedTransporter(tr);
                        setPaymentAmount(tr.pendingBalance);
                        setIsPaymentModalOpen(true);
                      }}
                      className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition"
                    >
                      Pay Freight
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isPaymentModalOpen && selectedTransporter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Record Freight Payment
              </h3>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handlePaySubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold">Transporter Account:</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {selectedTransporter.transporterName}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  GSTIN: {selectedTransporter.gstin}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs">
                <span>Current Outstanding Due:</span>
                <strong className="block font-mono text-base font-black mt-0.5">
                  ₹{selectedTransporter.pendingBalance.toLocaleString('en-IN')}
                </strong>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Settlement Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="RTGS / NEFT">Bank Transfer (RTGS / NEFT)</option>
                  <option value="Cheque">Corporate Account Payee Cheque</option>
                  <option value="UPI Corporate">Instant UPI Settlement</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Confirm Settlement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
