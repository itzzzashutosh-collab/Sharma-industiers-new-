import React from 'react';
import { TEAM_MEMBERS } from '../../data/mockData';
import { ActivityItem } from '../../types/erp';

interface TeamScreenProps {
  activities: ActivityItem[];
}

export const TeamScreen: React.FC<TeamScreenProps> = ({ activities }) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-user-group" />
            </span>
            <h2 className="text-lg font-black text-slate-900">
              Team Roster &amp; Operational Roles
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Plant management, sales heads, financial controllers &amp; distribution dispatchers.
          </p>
        </div>

        <button className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-1.5">
          <i className="fa-solid fa-user-plus text-[10px]" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEAM_MEMBERS.map((tm) => (
          <div
            key={tm.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center space-x-3">
                <img
                  src={tm.avatar}
                  alt={tm.name}
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-xs aspect-square"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{tm.name}</h3>
                  <p className="text-xs font-semibold text-blue-600">{tm.role}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{tm.department}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                <p className="flex items-center gap-2">
                  <i className="fa-regular fa-envelope text-slate-400 text-[11px] w-3" />
                  <span className="truncate">{tm.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <i className="fa-solid fa-phone text-slate-400 text-[11px] w-3" />
                  <span className="font-mono text-slate-700">{tm.phone}</span>
                </p>
                <div className="p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 mt-2">
                  <strong className="text-slate-800">Recent:</strong> {tm.recentAction}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Today
              </span>
              <button className="text-blue-600 font-bold hover:underline text-[11px]">
                Manage Access
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Operational Log */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Live Team Operational Activity Log</h3>
        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={act.avatar}
                  alt={act.author}
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 aspect-square"
                />
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    <strong className="text-slate-900">{act.author}</strong> ({act.department}):{' '}
                    {act.action}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-400 shrink-0 ml-2">
                {act.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
