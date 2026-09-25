import React, { useState } from 'react';
import { AuditTrailRecord } from '../../../types/erp';
import { INITIAL_AUDIT_LOGS } from '../../../data/financeData';

export const AuditTrailSubpage: React.FC = () => {
  const [logs] = useState<AuditTrailRecord[]>(INITIAL_AUDIT_LOGS);
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.referenceRecord.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase());
    const matchesModule = moduleFilter === 'All' || l.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-fingerprint" />
            </span>
            <h2 className="text-lg font-black text-slate-900">
              Financial Audit Trail &amp; Forensic Logs
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographic immutable timestamps, authorization logs, and statutory audit compliance tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <i className="fa-solid fa-shield-halved" />
            <span>Audit Integrity: 100% Sealed</span>
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search auditor, user, action details, record ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="All">All Financial Modules</option>
            <option value="Income & Expense">Income &amp; Expense</option>
            <option value="Accounts Payable">Accounts Payable</option>
            <option value="Banking & Cash">Banking &amp; Cash</option>
            <option value="GST Compliance">GST Compliance</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User &amp; Role</th>
                <th className="py-3 px-4">Financial Module</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Record Ref</th>
                <th className="py-3 px-4">Change / Audit Details</th>
                <th className="py-3 px-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">
                    {l.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{l.user}</div>
                    <div className="text-[10px] text-slate-400">{l.userRole}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {l.module}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        l.action === 'Create'
                          ? 'bg-emerald-50 text-emerald-700'
                          : l.action === 'Authorize'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {l.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                    {l.referenceRecord}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-sm">
                    {l.details}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[10px] text-slate-400">
                    {l.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
