import React, { useState } from 'react';
import { CrmLead } from '../../../types/erp';
import { INITIAL_CRM_LEADS } from '../../../data/crmSubpagesData';

interface LeadsManagementSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
  onOpenNewLeadModal: () => void;
  onConvertToQuotation?: (lead: CrmLead) => void;
}

export const LeadsManagementSubpage: React.FC<LeadsManagementSubpageProps> = ({
  onNavigateSubpage,
  onOpenNewLeadModal,
  onConvertToQuotation,
}) => {
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_CRM_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('crm-ld-1');
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [detailTab, setDetailTab] = useState<'Overview' | 'Activity' | 'Quotes' | 'Orders' | 'Notes'>('Overview');
  const [pipelineTab, setPipelineTab] = useState<'All Leads' | 'My Leads' | 'Today Followups' | 'Overdue'>('All Leads');
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [typeFilter, setTypeFilter] = useState('All Leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected lead
  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  // Pipeline stage buckets
  const newLeads = leads.filter((l) => l.status === 'New');
  const contactedLeads = leads.filter((l) => l.status === 'Contacted');
  const qualifiedLeads = leads.filter((l) => l.status === 'Qualified');
  const quoteSentLeads = leads.filter((l) => l.status === 'Quotation Sent');
  const convertedLeads = leads.filter((l) => l.status === 'Converted');

  // Filtered for table
  const filteredTableLeads = leads.filter((l) => {
    if (typeFilter !== 'All Leads') {
      if (typeFilter === 'Dealers' && l.type !== 'Dealer') return false;
      if (typeFilter === 'Painters' && l.type !== 'Painter') return false;
      if (typeFilter === 'Contractors' && l.type !== 'Contractor') return false;
      if (typeFilter === 'Retailers' && l.type !== 'Retailer') return false;
      if (typeFilter === 'Architects' && l.type !== 'Architect') return false;
      if (typeFilter === 'Builders' && l.type !== 'Builder') return false;
      if (typeFilter === 'Others' && ['Dealer', 'Painter', 'Contractor', 'Retailer'].includes(l.type)) return false;
    }

    if (
      searchQuery &&
      !l.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !l.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !l.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !l.leadId.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(filteredTableLeads.map((l) => l.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleActionToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleMarkActionDone = (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              nextActionNote: 'Action completed. Next quarterly review scheduled.',
              nextActionTime: 'Completed',
            }
          : l
      )
    );
    handleActionToast(`Action for ${selectedLead.name} marked as completed.`);
  };

  return (
    <div className="space-y-5">
      {/* 1. Header Banner matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center text-xl shadow-xs shadow-orange-500/20 shrink-0">
            <i className="fa-solid fa-address-book" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
              Leads Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Capture, track and convert leads into customers. Build your dealer, painter and contractor network.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenNewLeadModal}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-xs shadow-blue-500/25 transition cursor-pointer"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Add New Lead</span>
            <i className="fa-solid fa-chevron-down text-[10px] ml-0.5 opacity-70" />
          </button>

          <button
            onClick={() => onNavigateSubpage('Import Leads')}
            className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl border border-slate-200 transition cursor-pointer"
          >
            <i className="fa-solid fa-file-arrow-up text-xs text-slate-500" />
            <span>Import Leads</span>
          </button>

          <button
            onClick={() => handleActionToast('More CRM options loaded.')}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition cursor-pointer"
          >
            <i className="fa-solid fa-ellipsis-vertical text-xs" />
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-circle-check text-blue-600 text-sm" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-blue-500 hover:text-blue-700">
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </div>
      )}

      {/* 2. KPI Cards Row (6 stats with sparkline visuals from user screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total Leads */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-users" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-semibold text-slate-500 block">Total Leads</span>
            <span className="text-xl font-black text-slate-900 block leading-tight mt-0.5">1,240</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> 18%
                <span className="text-slate-400 font-normal ml-0.5 text-[9px]">vs last month</span>
              </span>
              {/* Mini Sparkline SVG */}
              <svg className="w-10 h-4 text-blue-500" viewBox="0 0 40 16" fill="none">
                <path d="M0 12 Q 10 14, 20 8 T 40 2" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Contacted */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
            <i className="fa-solid fa-filter" />
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-semibold text-slate-500 block">Contacted</span>
            <span className="text-xl font-black text-slate-900 block leading-tight mt-0.5">680</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> 25%
                <span className="text-slate-400 font-normal ml-0.5 text-[9px]">vs last month</span>
              </span>
              <svg className="w-10 h-4 text-purple-500" viewBox="0 0 40 16" fill="none">
                <path d="M0 14 Q 10 10, 20 6 T 40 2" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Qualified */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
            <i className="fa-solid fa-user-check" />
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-semibold text-slate-500 block">Qualified</span>
            <span className="text-xl font-black text-slate-900 block leading-tight mt-0.5">420</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> 32%
                <span className="text-slate-400 font-normal ml-0.5 text-[9px]">vs last month</span>
              </span>
              <svg className="w-10 h-4 text-emerald-500" viewBox="0 0 40 16" fill="none">
                <path d="M0 12 Q 10 12, 20 4 T 40 1" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Quotation Sent */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
            <i className="fa-solid fa-handshake" />
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-semibold text-slate-500 block">Quotation Sent</span>
            <span className="text-xl font-black text-slate-900 block leading-tight mt-0.5">220</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> 14%
                <span className="text-slate-400 font-normal ml-0.5 text-[9px]">vs last month</span>
              </span>
              <svg className="w-10 h-4 text-amber-500" viewBox="0 0 40 16" fill="none">
                <path d="M0 10 Q 15 14, 25 6 T 40 4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 5: Converted */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-yellow-50 text-amber-600 flex items-center justify-center text-xs">
            <i className="fa-solid fa-trophy" />
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-semibold text-slate-500 block">Converted</span>
            <span className="text-xl font-black text-slate-900 block leading-tight mt-0.5">148</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> 22%
                <span className="text-slate-400 font-normal ml-0.5 text-[9px]">vs last month</span>
              </span>
              <svg className="w-10 h-4 text-amber-500" viewBox="0 0 40 16" fill="none">
                <path d="M0 12 Q 10 10, 20 4 T 40 2" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 6: Conversion Rate */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xs">
            <i className="fa-solid fa-bullseye" />
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-semibold text-slate-500 block">Conversion Rate</span>
            <span className="text-xl font-black text-slate-900 block leading-tight mt-0.5">12%</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                <i className="fa-solid fa-arrow-up text-[8px]" /> 3%
                <span className="text-slate-400 font-normal ml-0.5 text-[9px]">vs last month</span>
              </span>
              <svg className="w-10 h-4 text-rose-500" viewBox="0 0 40 16" fill="none">
                <path d="M0 10 Q 15 12, 25 4 T 40 3" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Lead Pipeline Kanban + Split Inspector Grid */}
      <div className="space-y-4">
        {/* Pipeline Control Header */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-sm font-extrabold text-slate-900">Lead Pipeline</h3>
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
              <button
                onClick={() => setPipelineTab('All Leads')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  pipelineTab === 'All Leads'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Leads (1,240)
              </button>
              <button
                onClick={() => setPipelineTab('My Leads')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  pipelineTab === 'My Leads'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                My Leads
              </button>
              <button
                onClick={() => setPipelineTab('Today Followups')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  pipelineTab === 'Today Followups'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Today's Follow-ups (28)
              </button>
              <button
                onClick={() => setPipelineTab('Overdue')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  pipelineTab === 'Overdue'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Overdue (45)
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-semibold focus:outline-none"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>All Time</option>
            </select>

            <button
              onClick={() => setIsInspectorOpen(!isInspectorOpen)}
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <i className={`fa-solid ${isInspectorOpen ? 'fa-arrow-right-to-bracket' : 'fa-arrow-left-to-line'}`} />
              <span>{isInspectorOpen ? 'Hide Detail' : 'Show Detail'}</span>
            </button>
          </div>
        </div>

        {/* 5-Column Kanban Board with Split Detail Inspector */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          {/* Kanban Columns (7 cols or 12 cols) */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 ${
            isInspectorOpen ? 'xl:col-span-8' : 'xl:col-span-12'
          }`}>
            {/* Column 1: New Leads (320) */}
            <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                <span className="text-xs font-extrabold text-blue-700">New Leads</span>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-100/80 px-2 py-0.2 rounded-full">
                  320
                </span>
              </div>

              <div className="space-y-2">
                {newLeads.map((lead) => {
                  const isSelected = lead.id === selectedLeadId;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setIsInspectorOpen(true);
                      }}
                      className={`p-3 rounded-xl border bg-white cursor-pointer transition shadow-2xs hover:shadow-xs hover:border-slate-300 ${
                        isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${lead.initialsBg}`}>
                            {lead.initials}
                          </div>
                          <div className="min-w-0">
                            <span className="font-extrabold text-xs text-slate-900 block truncate max-w-[110px]">
                              {lead.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {lead.type} • {lead.city}
                            </span>
                          </div>
                        </div>

                        {lead.source === 'WhatsApp' ? (
                          <i className="fa-brands fa-whatsapp text-emerald-500 text-xs shrink-0" />
                        ) : (
                          <i className="fa-solid fa-phone text-slate-400 text-[10px] shrink-0" />
                        )}
                      </div>

                      <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{lead.timeAgo}</span>
                        <span className="text-blue-600 font-semibold">{lead.assignedTo.split(' ')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onOpenNewLeadModal}
                className="w-full py-2 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 text-slate-600 hover:text-blue-600 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]" />
                <span>Add Lead</span>
              </button>
            </div>

            {/* Column 2: Contacted (260) */}
            <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                <span className="text-xs font-extrabold text-purple-700">Contacted</span>
                <span className="text-xs font-extrabold text-purple-700 bg-purple-100/80 px-2 py-0.2 rounded-full">
                  260
                </span>
              </div>

              <div className="space-y-2">
                {contactedLeads.map((lead) => {
                  const isSelected = lead.id === selectedLeadId;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setIsInspectorOpen(true);
                      }}
                      className={`p-3 rounded-xl border bg-white cursor-pointer transition shadow-2xs hover:shadow-xs hover:border-slate-300 ${
                        isSelected ? 'border-purple-500 ring-2 ring-purple-100' : 'border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${lead.initialsBg}`}>
                            {lead.initials}
                          </div>
                          <div className="min-w-0">
                            <span className="font-extrabold text-xs text-slate-900 block truncate max-w-[110px]">
                              {lead.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {lead.type} • {lead.city}
                            </span>
                          </div>
                        </div>

                        {lead.source === 'WhatsApp' ? (
                          <i className="fa-brands fa-whatsapp text-emerald-500 text-xs shrink-0" />
                        ) : (
                          <i className="fa-solid fa-phone text-slate-400 text-[10px] shrink-0" />
                        )}
                      </div>

                      <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{lead.timeAgo}</span>
                        <span className="text-purple-600 font-semibold">{lead.assignedTo.split(' ')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onOpenNewLeadModal}
                className="w-full py-2 border border-dashed border-slate-300 hover:border-purple-400 hover:bg-purple-50/50 text-slate-600 hover:text-purple-600 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]" />
                <span>Add Lead</span>
              </button>
            </div>

            {/* Column 3: Qualified (180) */}
            <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                <span className="text-xs font-extrabold text-amber-700">Qualified</span>
                <span className="text-xs font-extrabold text-amber-700 bg-amber-100/80 px-2 py-0.2 rounded-full">
                  180
                </span>
              </div>

              <div className="space-y-2">
                {qualifiedLeads.map((lead) => {
                  const isSelected = lead.id === selectedLeadId;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setIsInspectorOpen(true);
                      }}
                      className={`p-3 rounded-xl border bg-white cursor-pointer transition shadow-2xs hover:shadow-xs hover:border-slate-300 ${
                        isSelected ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${lead.initialsBg}`}>
                            {lead.initials}
                          </div>
                          <div className="min-w-0">
                            <span className="font-extrabold text-xs text-slate-900 block truncate max-w-[110px]">
                              {lead.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {lead.type} • {lead.city}
                            </span>
                          </div>
                        </div>

                        {lead.source === 'WhatsApp' ? (
                          <i className="fa-brands fa-whatsapp text-emerald-500 text-xs shrink-0" />
                        ) : (
                          <i className="fa-solid fa-phone text-slate-400 text-[10px] shrink-0" />
                        )}
                      </div>

                      <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{lead.timeAgo}</span>
                        <span className="text-amber-700 font-semibold">{lead.assignedTo.split(' ')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onOpenNewLeadModal}
                className="w-full py-2 border border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50/50 text-slate-600 hover:text-amber-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]" />
                <span>Add Lead</span>
              </button>
            </div>

            {/* Column 4: Quotation Sent (120) */}
            <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                <span className="text-xs font-extrabold text-orange-700">Quotation Sent</span>
                <span className="text-xs font-extrabold text-orange-700 bg-orange-100/80 px-2 py-0.2 rounded-full">
                  120
                </span>
              </div>

              <div className="space-y-2">
                {quoteSentLeads.map((lead) => {
                  const isSelected = lead.id === selectedLeadId;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setIsInspectorOpen(true);
                      }}
                      className={`p-3 rounded-xl border bg-white cursor-pointer transition shadow-2xs hover:shadow-xs hover:border-slate-300 ${
                        isSelected ? 'border-orange-500 ring-2 ring-orange-100' : 'border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${lead.initialsBg}`}>
                            {lead.initials}
                          </div>
                          <div className="min-w-0">
                            <span className="font-extrabold text-xs text-slate-900 block truncate max-w-[110px]">
                              {lead.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {lead.type} • {lead.city}
                            </span>
                          </div>
                        </div>

                        {lead.source === 'WhatsApp' ? (
                          <i className="fa-brands fa-whatsapp text-emerald-500 text-xs shrink-0" />
                        ) : (
                          <i className="fa-solid fa-clock text-slate-400 text-[10px] shrink-0" />
                        )}
                      </div>

                      <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{lead.timeAgo}</span>
                        <span className="text-orange-600 font-semibold">{lead.assignedTo.split(' ')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onOpenNewLeadModal}
                className="w-full py-2 border border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50/50 text-slate-600 hover:text-orange-600 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]" />
                <span>Add Lead</span>
              </button>
            </div>

            {/* Column 5: Converted (148) */}
            <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                <span className="text-xs font-extrabold text-emerald-700">Converted</span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.2 rounded-full">
                  148
                </span>
              </div>

              <div className="space-y-2">
                {convertedLeads.map((lead) => {
                  const isSelected = lead.id === selectedLeadId;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setIsInspectorOpen(true);
                      }}
                      className={`p-3 rounded-xl border bg-white cursor-pointer transition shadow-2xs hover:shadow-xs hover:border-slate-300 ${
                        isSelected ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${lead.initialsBg}`}>
                            {lead.initials}
                          </div>
                          <div className="min-w-0">
                            <span className="font-extrabold text-xs text-slate-900 block truncate max-w-[110px]">
                              {lead.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {lead.type} • {lead.city}
                            </span>
                          </div>
                        </div>

                        <i className="fa-solid fa-file-invoice text-emerald-600 text-xs shrink-0" />
                      </div>

                      <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-700 font-bold">{lead.orderReference || 'Order Confirmed'}</span>
                        <span className="text-slate-400">{lead.assignedTo.split(' ')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onOpenNewLeadModal}
                className="w-full py-2 border border-dashed border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/50 text-slate-600 hover:text-emerald-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-plus text-[10px]" />
                <span>Add Lead</span>
              </button>
            </div>
          </div>

          {/* Right-Side Lead Detail Inspector Card (4 cols, matches screenshot exactly!) */}
          {isInspectorOpen && selectedLead && (
            <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col animate-fadeIn">
              {/* Card Header */}
              <div className="p-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/40">
                <div className="flex items-center space-x-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${selectedLead.initialsBg}`}>
                    {selectedLead.initials}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm leading-tight">
                      {selectedLead.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-500 font-medium">
                        {selectedLead.type} • Lead ID: {selectedLead.leadId}
                      </span>
                      {selectedLead.isHotLead && (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                          🔥 Hot Lead
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsInspectorOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>

              {/* Inspector Nav Tabs */}
              <div className="flex border-b border-slate-100 text-xs font-bold px-4 pt-2 gap-4">
                {(['Overview', 'Activity', 'Quotes', 'Orders', 'Notes'] as const).map((tab) => {
                  let label = tab as string;
                  if (tab === 'Quotes') label = `Quotes (${selectedLead.quotesCount || 2})`;
                  if (tab === 'Orders') label = `Orders (${selectedLead.ordersCount || 1})`;

                  return (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`pb-2.5 transition cursor-pointer relative ${
                        detailTab === tab
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Inspector Body */}
              <div className="p-4 space-y-4 text-xs overflow-y-auto max-h-[640px]">
                {detailTab === 'Overview' && (
                  <>
                    {/* Contact Information & Lead Details 2-col box */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Left: Contact Info */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Contact Information
                        </span>

                        <div className="flex items-center space-x-2 text-slate-700">
                          <i className="fa-solid fa-user text-slate-400 text-xs w-4" />
                          <span className="font-semibold">{selectedLead.contactPerson}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-700">
                          <i className="fa-solid fa-phone text-slate-400 text-xs w-4" />
                          <span className="font-semibold">{selectedLead.phone}</span>
                          <a
                            href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-500 hover:text-emerald-600 ml-1"
                          >
                            <i className="fa-brands fa-whatsapp text-sm" />
                          </a>
                        </div>

                        <div className="flex items-center space-x-2 text-slate-700">
                          <i className="fa-solid fa-envelope text-slate-400 text-xs w-4" />
                          <span className="truncate">{selectedLead.email}</span>
                        </div>

                        <div className="flex items-start space-x-2 text-slate-700">
                          <i className="fa-solid fa-location-dot text-slate-400 text-xs w-4 mt-0.5" />
                          <div className="flex items-center gap-1">
                            <span>{selectedLead.address}</span>
                            <i className="fa-solid fa-map-location-dot text-blue-500 text-[10px]" />
                          </div>
                        </div>
                      </div>

                      {/* Right: Lead Details */}
                      <div className="space-y-1.5 text-[11px]">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Lead Details
                        </span>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Type</span>
                          <span className="font-bold text-slate-800">{selectedLead.type}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Source</span>
                          <span className="font-bold text-slate-800">{selectedLead.source}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Status</span>
                          <span className="px-2 py-0.2 rounded-full font-bold text-[10px] bg-amber-50 text-amber-700 border border-amber-200">
                            {selectedLead.status}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Priority</span>
                          <span className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${
                            selectedLead.priority === 'High'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {selectedLead.priority}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Assigned To</span>
                          <span className="font-bold text-blue-600">{selectedLead.assignedTo}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Created</span>
                          <span className="text-slate-600">{selectedLead.createdAt}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-400">Next Follow-up</span>
                          <span className="font-bold text-slate-800">{selectedLead.nextFollowUp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Requirements Box */}
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Requirements
                      </span>

                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Interested Products</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLead.interestedProducts.map((prod) => (
                            <span
                              key={prod}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60"
                            >
                              {prod}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">Estimated Order Quantity</span>
                        <span className="font-bold text-slate-900 text-xs">
                          {selectedLead.estimatedMonthlyBags || '200–300 bags per month'}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">Notes</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed italic bg-slate-50 p-2 rounded-xl border border-slate-100">
                          "{selectedLead.notes}"
                        </p>
                      </div>
                    </div>

                    {/* Next Action Box */}
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Next Action
                      </span>

                      <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl space-y-2">
                        <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
                          <i className="fa-regular fa-calendar-check text-blue-600" />
                          <span>{selectedLead.nextActionTime || `${selectedLead.nextFollowUp}, 10:00 AM`}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-snug">
                          {selectedLead.nextActionNote}
                        </p>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleMarkActionDone(selectedLead.id)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg shadow-2xs transition cursor-pointer flex items-center gap-1.5"
                          >
                            <i className="fa-solid fa-check text-[10px]" />
                            <span>Mark as Done</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer Buttons */}
                    <div className="pt-2 border-t border-slate-100 grid grid-cols-4 gap-2">
                      <button
                        onClick={() => handleActionToast(`Initiating call with ${selectedLead.contactPerson}...`)}
                        className="py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <i className="fa-solid fa-phone text-[10px]" />
                        <span>Call</span>
                      </button>

                      <button
                        onClick={() => handleActionToast(`Opening WhatsApp chat with ${selectedLead.name}...`)}
                        className="py-2 px-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-2xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <i className="fa-brands fa-whatsapp text-sm" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onConvertToQuotation) {
                            onConvertToQuotation(selectedLead);
                          } else {
                            onNavigateSubpage('Quotations');
                          }
                        }}
                        className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer truncate"
                      >
                        <span className="truncate">Create Quote</span>
                      </button>

                      <button
                        onClick={() => handleActionToast('More actions: Schedule Visit, Assign Rep, Mark as Lost')}
                        className="py-2 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>More</span>
                        <i className="fa-solid fa-chevron-down text-[9px]" />
                      </button>
                    </div>
                  </>
                )}

                {detailTab === 'Activity' && (
                  <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
                    <div className="relative pl-3">
                      <div className="absolute -left-[19px] top-0.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                      <span className="text-[10px] text-slate-400 block">{selectedLead.createdAt}, 11:30 AM</span>
                      <span className="font-bold text-slate-800 block">Lead Captured</span>
                      <span className="text-[11px] text-slate-500">Source: {selectedLead.source} by {selectedLead.assignedTo}</span>
                    </div>

                    <div className="relative pl-3">
                      <div className="absolute -left-[19px] top-0.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white" />
                      <span className="text-[10px] text-slate-400 block">{selectedLead.nextFollowUp}, 10:00 AM</span>
                      <span className="font-bold text-slate-800 block">Scheduled Follow-up Call</span>
                      <span className="text-[11px] text-slate-500">{selectedLead.nextActionNote}</span>
                    </div>
                  </div>
                )}

                {detailTab === 'Quotes' && (
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-blue-600 block">QT-2025-081</span>
                        <span className="text-[10px] text-slate-400">250 bags • ₹1,17,000</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Under Review
                      </span>
                    </div>
                  </div>
                )}

                {detailTab === 'Orders' && (
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 block">SO-1001 (Wholesale Order)</span>
                        <span className="text-[10px] text-slate-400">250 Bags • Dispatched via Bay 01</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Delivered
                      </span>
                    </div>
                  </div>
                )}

                {detailTab === 'Notes' && (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      defaultValue={selectedLead.notes}
                      placeholder="Add conversation notes, price negotiations or contractor site details..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleActionToast('Lead notes updated successfully.')}
                        className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-2xs"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 4. Leads Data Table Section (below Kanban, matching user screenshot) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4.5 space-y-4">
          {/* Table Toolbar & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            {/* Filter category pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                'All Leads',
                'Dealers',
                'Painters',
                'Contractors',
                'Retailers',
                'Architects',
                'Builders',
                'Others',
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setTypeFilter(category)}
                  className={`px-3 py-1 text-xs font-semibold rounded-xl transition cursor-pointer ${
                    typeFilter === category
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search + Action Buttons */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none w-48 sm:w-56"
                />
              </div>

              <button
                onClick={() => handleActionToast('Advanced Filters drawer opened.')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-sliders text-xs text-slate-400" />
                <span>Filters</span>
              </button>

              <button
                onClick={() => handleActionToast('Exporting leads list as CSV...')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-file-export text-xs text-slate-400" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      onChange={handleToggleSelectAll}
                      checked={
                        filteredTableLeads.length > 0 &&
                        selectedRowIds.length === filteredTableLeads.length
                      }
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Source</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Assigned To</th>
                  <th className="py-3 px-3">Next Follow-up</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTableLeads.map((lead) => {
                  const isChecked = selectedRowIds.includes(lead.id);
                  const isSelected = lead.id === selectedLeadId;

                  // Status badge styling matching user screenshot
                  let statusBadge = 'bg-blue-50 text-blue-700 border-blue-200';
                  if (lead.status === 'Contacted') statusBadge = 'bg-sky-50 text-sky-700 border-sky-200';
                  if (lead.status === 'Qualified') statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
                  if (lead.status === 'Quotation Sent') statusBadge = 'bg-orange-50 text-orange-700 border-orange-200';
                  if (lead.status === 'Converted') statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';

                  // Priority badge
                  let priorityBadge = 'text-slate-600';
                  if (lead.priority === 'High') priorityBadge = 'text-rose-600 font-bold';
                  if (lead.priority === 'Medium') priorityBadge = 'text-amber-600 font-semibold';
                  if (lead.priority === 'Low') priorityBadge = 'text-emerald-600';

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setIsInspectorOpen(true);
                      }}
                      className={`hover:bg-blue-50/40 cursor-pointer transition ${
                        isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelectRow(lead.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>

                      {/* Name with initials badge */}
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${lead.initialsBg}`}>
                            {lead.initials}
                          </div>
                          <span className="font-bold text-slate-800 hover:text-blue-600 block truncate">
                            {lead.name}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3 px-3 text-slate-600">{lead.type}</td>

                      {/* Location */}
                      <td className="py-3 px-3 text-slate-600">{lead.city}</td>

                      {/* Source */}
                      <td className="py-3 px-3 text-slate-600">{lead.source}</td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}`}>
                          {lead.status}
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-3">
                        <span className={`text-xs ${priorityBadge}`}>
                          {lead.priority}
                        </span>
                      </td>

                      {/* Assigned To */}
                      <td className="py-3 px-3 font-semibold text-slate-700">
                        {lead.assignedTo.split(' ')[0]}
                      </td>

                      {/* Next Follow-up */}
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {lead.nextFollowUp || '-'}
                      </td>

                      {/* Actions (WhatsApp, Phone, ...) */}
                      <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-2">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-500 hover:text-emerald-600 p-1"
                            title="WhatsApp Chat"
                          >
                            <i className="fa-brands fa-whatsapp text-sm" />
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="text-slate-400 hover:text-slate-700 p-1"
                            title="Phone Call"
                          >
                            <i className="fa-solid fa-phone text-xs" />
                          </a>

                          <button
                            onClick={() => handleActionToast(`More options for ${lead.name}`)}
                            className="text-slate-400 hover:text-slate-600 p-1"
                          >
                            <i className="fa-solid fa-ellipsis text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
