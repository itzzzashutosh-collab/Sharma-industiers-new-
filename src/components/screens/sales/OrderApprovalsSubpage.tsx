import React, { useState } from 'react';
import { OrderApproval } from '../../../types/erp';
import { INITIAL_APPROVALS } from '../../../data/salesSubpagesData';

interface OrderApprovalsSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
  onApproveOrder?: (orderNumber: string) => void;
}

export const OrderApprovalsSubpage: React.FC<OrderApprovalsSubpageProps> = ({
  onNavigateSubpage,
  onApproveOrder,
}) => {
  const [approvals, setApprovals] = useState<OrderApproval[]>(INITIAL_APPROVALS);
  const [activeFilter, setActiveFilter] = useState<'All' | 'High Risk' | 'Discount Alert' | 'Credit Limit' | 'Approved' | 'Rejected'>('All');
  const [approvalFeedback, setApprovalFeedback] = useState<string | null>(null);
  const [conditionModalOrder, setConditionModalOrder] = useState<OrderApproval | null>(null);
  const [conditionalNote, setConditionalNote] = useState('Requires 40% advance RTGS prior to truck bay loading.');

  // Filtering
  const filteredApprovals = approvals.filter((item) => {
    if (activeFilter === 'All') return item.status === 'Pending';
    if (activeFilter === 'High Risk') return item.status === 'Pending' && item.riskLevel === 'High';
    if (activeFilter === 'Discount Alert') return item.status === 'Pending' && item.requestedDiscount > 8;
    if (activeFilter === 'Credit Limit') return item.status === 'Pending' && item.currentOutstanding > item.dealerCreditLimit;
    if (activeFilter === 'Approved') return item.status === 'Approved' || item.status === 'Conditional';
    if (activeFilter === 'Rejected') return item.status === 'Rejected';
    return true;
  });

  const pendingCount = approvals.filter((a) => a.status === 'Pending').length;
  const highRiskCount = approvals.filter((a) => a.status === 'Pending' && a.riskLevel === 'High').length;
  const totalPendingAmount = approvals
    .filter((a) => a.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Approve action
  const handleApprove = (id: string, orderNumber: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Approved' } : a))
    );
    setApprovalFeedback(`Order ${orderNumber} approved successfully. Released to factory dispatch bay.`);
    if (onApproveOrder) onApproveOrder(orderNumber);
    setTimeout(() => setApprovalFeedback(null), 4000);
  };

  // Reject action
  const handleReject = (id: string, orderNumber: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Rejected' } : a))
    );
    setApprovalFeedback(`Order ${orderNumber} was rejected. Notification dispatched to sales representative.`);
    setTimeout(() => setApprovalFeedback(null), 4000);
  };

  // Conditional approve
  const handleConfirmConditional = () => {
    if (!conditionModalOrder) return;
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === conditionModalOrder.id
          ? { ...a, status: 'Conditional', conditionNote: conditionalNote }
          : a
      )
    );
    setApprovalFeedback(`Conditional approval applied to ${conditionModalOrder.orderNumber}: "${conditionalNote}"`);
    setConditionModalOrder(null);
    setTimeout(() => setApprovalFeedback(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
              Executive Governance
            </span>
            <span className="text-xs text-slate-400">• Sales &amp; Finance Risk Center</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Order Approvals &amp; Credit Risk Gate
          </h2>
          <p className="text-xs text-slate-500">
            Review high-value dealer orders, special margin discount overrides (&gt;10%), and credit exposure before production line dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateSubpage('Order Management')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Order Pipeline</span>
          </button>
          <button
            onClick={() => onNavigateSubpage('New Order')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Create New Order</span>
          </button>
        </div>
      </div>

      {/* Action Toast Alert */}
      {approvalFeedback && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-circle-check text-blue-600 text-sm" />
            <span>{approvalFeedback}</span>
          </div>
          <button onClick={() => setApprovalFeedback(null)} className="text-blue-500 hover:text-blue-700">
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </div>
      )}

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Pending Approvals</span>
            <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-hourglass-half" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{pendingCount}</span>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Action Required
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Pending Value</span>
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-indian-rupee-sign" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">₹ {(totalPendingAmount / 100000).toFixed(2)}L</span>
            <span className="text-[11px] text-slate-400">1,600 bags</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">High Credit Risk</span>
            <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-triangle-exclamation" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-rose-600">{highRiskCount}</span>
            <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              Breached Limits
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Avg Decision SLA</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-bolt" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">1.4 Hrs</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Fast Turnaround</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {[
            { id: 'All', label: 'All Pending Queue', count: pendingCount },
            { id: 'High Risk', label: 'High Risk Only', count: highRiskCount },
            { id: 'Discount Alert', label: 'Special Discount >8%' },
            { id: 'Credit Limit', label: 'Credit Limit Override' },
            { id: 'Approved', label: 'Approved History' },
            { id: 'Rejected', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1.5 ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 rounded-full ${
                  activeFilter === tab.id ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Approvals Cards Stream */}
      <div className="space-y-3.5">
        {filteredApprovals.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
            <i className="fa-solid fa-clipboard-check text-4xl text-slate-300 mb-2 block" />
            <p className="font-semibold text-sm">No orders currently waiting in this approval view.</p>
          </div>
        ) : (
          filteredApprovals.map((approval) => {
            const isHighRisk = approval.riskLevel === 'High';
            const isMediumRisk = approval.riskLevel === 'Medium';
            const isPending = approval.status === 'Pending';

            return (
              <div
                key={approval.id}
                className={`bg-white rounded-2xl border p-4.5 shadow-2xs transition hover:border-slate-300 ${
                  isHighRisk && isPending
                    ? 'border-l-4 border-l-rose-500 border-slate-200/90'
                    : isMediumRisk && isPending
                    ? 'border-l-4 border-l-amber-500 border-slate-200/90'
                    : 'border-slate-200/80'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Context & Details */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-blue-600 text-sm">{approval.orderNumber}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-bold text-slate-900 text-sm">{approval.customer}</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                        {approval.customerType} ({approval.location})
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        approval.riskLevel === 'High'
                          ? 'bg-rose-100 text-rose-700'
                          : approval.riskLevel === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {approval.riskLevel} Risk
                      </span>

                      {approval.status !== 'Pending' && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          approval.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : approval.status === 'Conditional'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          Status: {approval.status}
                        </span>
                      )}
                    </div>

                    {/* Flag Reason */}
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2">
                      <i className="fa-solid fa-circle-exclamation text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold">Approval Trigger: </span>
                        <span>{approval.flagReason}</span>
                      </div>
                    </div>

                    {/* Rep Justification Note */}
                    <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-700">Sales Rep Note ({approval.salesperson}): </span>
                      <span className="italic text-slate-600">"{approval.salespersonNote}"</span>
                    </div>

                    {/* Exposure Metrics Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                      <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-semibold">Order Value</span>
                        <span className="font-black text-slate-900 text-sm">
                          ₹ {approval.amount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-500 block">({approval.qty} bags)</span>
                      </div>

                      <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-semibold">Discount Requested</span>
                        <span className="font-extrabold text-amber-700 text-sm">{approval.requestedDiscount}%</span>
                        <span className="text-[10px] text-slate-500 block">Standard: {approval.standardDiscount}%</span>
                      </div>

                      <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-semibold">Credit Limit</span>
                        <span className="font-bold text-slate-800 text-sm">
                          ₹ {(approval.dealerCreditLimit / 1000).toFixed(0)}k
                        </span>
                        <span className="text-[10px] text-slate-500 block">Assigned Cap</span>
                      </div>

                      <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-semibold">Current Exposure</span>
                        <span className={`font-bold text-sm ${
                          approval.currentOutstanding > approval.dealerCreditLimit ? 'text-rose-600' : 'text-slate-800'
                        }`}>
                          ₹ {(approval.currentOutstanding / 1000).toFixed(0)}k
                        </span>
                        <span className="text-[10px] text-slate-500 block">Outstanding</span>
                      </div>
                    </div>

                    {approval.conditionNote && (
                      <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-900">
                        <span className="font-bold">Approval Condition: </span>
                        <span>{approval.conditionNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Manager Action Buttons */}
                  {isPending && (
                    <div className="flex flex-row lg:flex-col gap-2 shrink-0 justify-end pt-2 lg:pt-0">
                      <button
                        onClick={() => handleApprove(approval.id, approval.orderNumber)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <i className="fa-solid fa-check" />
                        <span>Approve Order</span>
                      </button>

                      <button
                        onClick={() => setConditionModalOrder(approval)}
                        className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <i className="fa-solid fa-handshake" />
                        <span>Conditional</span>
                      </button>

                      <button
                        onClick={() => handleReject(approval.id, approval.orderNumber)}
                        className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <i className="fa-solid fa-xmark" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Conditional Approval Modal */}
      {conditionModalOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">
                Set Approval Conditions ({conditionModalOrder.orderNumber})
              </h3>
              <button
                onClick={() => setConditionModalOrder(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Specify payment terms or collateral conditions required for {conditionModalOrder.customer} before loading bay clearance:
            </p>

            <textarea
              rows={3}
              value={conditionalNote}
              onChange={(e) => setConditionalNote(e.target.value)}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setConditionModalOrder(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmConditional}
                className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition"
              >
                Apply Conditional Release
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
