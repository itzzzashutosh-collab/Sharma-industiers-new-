import React, { useState } from 'react';
import { ContractorProject } from '../../../types/erp';
import { INITIAL_CONTRACTORS_PROJECTS } from '../../../data/crmSubpagesData';

interface ContractorsSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const ContractorsSubpage: React.FC<ContractorsSubpageProps> = ({
  onNavigateSubpage,
}) => {
  const [projects] = useState<ContractorProject[]>(INITIAL_CONTRACTORS_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'cntr-1');
  const [statusFilter, setStatusFilter] = useState('All');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const filtered = projects.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    return true;
  });

  const totalDemand = projects.reduce((acc, p) => acc + p.estPuttyDemandBags, 0);
  const totalSupplied = projects.reduce((acc, p) => acc + p.suppliedBags, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
              Bulk Infrastructure &amp; Projects
            </span>
            <span className="text-xs text-slate-400">• Institutional Channel</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Contractors &amp; Construction Project Sites
          </h2>
          <p className="text-xs text-slate-500">
            Track large-scale real estate projects, direct plant truck allocations, and putty supply milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateSubpage('Leads Management')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Leads Pipeline</span>
          </button>
          <button
            onClick={() => onNavigateSubpage('New Order')}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Schedule Project Consignment</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Active Projects</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{projects.length} Sites</span>
          <span className="text-[10px] text-emerald-600 font-bold">Jaipur, Kota &amp; Udaipur</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Total Putty Demand</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{totalDemand.toLocaleString()} Bags</span>
          <span className="text-[10px] text-slate-400">Total Project Bookings</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Supplied to Date</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{totalSupplied.toLocaleString()} Bags</span>
          <span className="text-[10px] text-emerald-600 font-semibold">{Math.round((totalSupplied / totalDemand) * 100)}% Milestone Completed</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">Pending Consignments</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{(totalDemand - totalSupplied).toLocaleString()} Bags</span>
          <span className="text-[10px] text-slate-400">Next 60 Days Pipeline</span>
        </div>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Projects Cards (8 cols) */}
        <div className="xl:col-span-8 space-y-3.5">
          {filtered.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            const completionPct = Math.round((proj.suppliedBags / proj.estPuttyDemandBags) * 100);

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`bg-white rounded-2xl border p-4.5 shadow-2xs transition cursor-pointer hover:border-slate-300 space-y-3 ${
                  isSelected ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full uppercase">
                      {proj.projectType}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 mt-1">{proj.currentProject}</h3>
                    <span className="text-xs text-slate-500">{proj.companyName} • {proj.city}</span>
                  </div>

                  <span className="text-xs font-bold text-slate-700">Area: {proj.projectSizeSqFt}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-600">Supply Progress: {completionPct}%</span>
                    <span className="text-blue-600">{proj.suppliedBags} / {proj.estPuttyDemandBags} Bags</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1 border-t border-slate-100 text-slate-500">
                  <span>Contact: <strong className="text-slate-700">{proj.contactPerson}</strong></span>
                  <span>Phone: <strong className="text-slate-700">{proj.phone}</strong></span>
                  <span>Channel: <strong className="text-blue-600">{proj.assignedDealer}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project Inspector (4 cols) */}
        {selectedProject && (
          <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4.5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedProject.contractorName}</h3>
                <span className="text-[11px] text-slate-500">{selectedProject.companyName}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                {selectedProject.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Site Information</span>
              <div className="flex justify-between">
                <span className="text-slate-500">Project Name:</span>
                <span className="font-bold text-slate-800 text-right">{selectedProject.currentProject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-700">{selectedProject.city}, Rajasthan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Credit Terms:</span>
                <span className="font-bold text-amber-600">{selectedProject.creditDays} Days Net</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dispatch Routing:</span>
                <span className="font-semibold text-blue-600">{selectedProject.assignedDealer}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => onNavigateSubpage('New Order')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                + Dispatch Truckload (300 Bags)
              </button>
              <button
                onClick={() => alert(`Lab test report for ${selectedProject.currentProject} downloaded.`)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
              >
                Download Adhesion Test Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
