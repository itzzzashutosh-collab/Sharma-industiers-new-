import React, { useState } from 'react';
import { CrmMeetingCall } from '../../../types/erp';
import { INITIAL_CRM_MEETINGS } from '../../../data/crmSubpagesData';

interface MeetingsCallsSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const MeetingsCallsSubpage: React.FC<MeetingsCallsSubpageProps> = () => {
  const [meetings, setMeetings] = useState<CrmMeetingCall[]>(INITIAL_CRM_MEETINGS);
  const [typeFilter, setTypeFilter] = useState<'All' | 'In-Person Meet' | 'Phone Call' | 'WhatsApp Call' | 'Site Inspection'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);

  // New Log form state
  const [newClientName, setNewClientName] = useState('');
  const [newContactPerson, setNewContactPerson] = useState('');
  const [newType, setNewType] = useState<CrmMeetingCall['type']>('Phone Call');
  const [newExecutive, setNewExecutive] = useState('Amit Sharma');
  const [newLocationOrPhone, setNewLocationOrPhone] = useState('+91 98290 12345');
  const [newDuration, setNewDuration] = useState('20 mins');
  const [newAgenda, setNewAgenda] = useState('');
  const [newKeyOutcome, setNewKeyOutcome] = useState('');
  const [newNextStep, setNewNextStep] = useState('Share formal quotation on WhatsApp');

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newAgenda.trim()) return;

    const newMeeting: CrmMeetingCall = {
      id: `meet-${Date.now()}`,
      type: newType,
      clientName: newClientName,
      contactPerson: newContactPerson || 'Store Owner',
      locationOrPhone: newLocationOrPhone,
      dateTime: '12 Aug 2025, 12:30 PM',
      duration: newDuration,
      executive: newExecutive,
      agenda: newAgenda,
      keyOutcome: newKeyOutcome || 'Discussion completed positively',
      nextStep: newNextStep,
      nextStepDate: '13 Aug 2025, 10:00 AM',
    };

    setMeetings([newMeeting, ...meetings]);
    setShowLogModal(false);
    setNewClientName('');
    setNewContactPerson('');
    setNewAgenda('');
    setNewKeyOutcome('');
  };

  const filteredMeetings = meetings.filter(m => {
    if (typeFilter !== 'All' && m.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        m.clientName.toLowerCase().includes(q) ||
        m.contactPerson.toLowerCase().includes(q) ||
        m.executive.toLowerCase().includes(q) ||
        m.agenda.toLowerCase().includes(q) ||
        m.keyOutcome.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const inPersonCount = meetings.filter(m => m.type === 'In-Person Meet').length;
  const phoneCallCount = meetings.filter(m => m.type === 'Phone Call').length;
  const siteInspectionCount = meetings.filter(m => m.type === 'Site Inspection').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-black">
              📞
            </span>
            Meetings &amp; Field Call Logs
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time tracking of on-ground dealer counter visits, phone pitches, contractor site consultations, and call summaries.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowLogModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <span className="text-base font-bold">+</span> Log New Meeting / Call
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Total Interactions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{meetings.length}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">+18 today across Rajasthan</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
          <p className="text-xs font-medium text-blue-600">Field Counter Visits</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{inPersonCount}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Physical dealer visits</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
          <p className="text-xs font-medium text-amber-600">Telephonic Calls</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{phoneCallCount}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Avg duration: 21 mins</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
          <p className="text-xs font-medium text-emerald-600">Site Inspections</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{siteInspectionCount}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Putty application audits</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Interaction Type Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100">
            {(['All', 'In-Person Meet', 'Phone Call', 'WhatsApp Call', 'Site Inspection'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setTypeFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  typeFilter === tab
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search client, executive, notes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          </div>
        </div>

        <div className="text-xs text-gray-400">
          Showing <strong className="text-gray-700">{filteredMeetings.length}</strong> logged interactions
        </div>
      </div>

      {/* Log Feed / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeetings.map(meeting => {
          return (
            <div
              key={meeting.id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm">
                      {meeting.type === 'In-Person Meet'
                        ? '🏢'
                        : meeting.type === 'Site Inspection'
                        ? '🏗️'
                        : meeting.type === 'WhatsApp Call'
                        ? '💬'
                        : '📞'}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{meeting.clientName}</h4>
                      <p className="text-[11px] text-gray-500">
                        {meeting.contactPerson} • {meeting.locationOrPhone}
                      </p>
                    </div>
                  </div>

                  {/* Type Tag */}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                    {meeting.type}
                  </span>
                </div>

                {/* Agenda */}
                <div className="mt-3 bg-gray-50/70 p-3 rounded-xl border border-gray-100 space-y-1.5 text-xs">
                  <p className="text-gray-800 font-medium">
                    <span className="text-gray-400 font-bold uppercase text-[10px]">Agenda: </span>
                    {meeting.agenda}
                  </p>
                  <p className="text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-100 font-medium">
                    <span className="font-bold text-emerald-900">Key Outcome: </span>
                    {meeting.keyOutcome}
                  </p>
                </div>

                {/* Next Step */}
                {meeting.nextStep && (
                  <p className="text-[11px] text-orange-800 mt-2 font-medium flex items-center gap-1.5">
                    <span className="font-bold">➡️ Next Step:</span> {meeting.nextStep}
                    {meeting.nextStepDate && <span className="text-gray-400">({meeting.nextStepDate})</span>}
                  </p>
                )}
              </div>

              {/* Footer details */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-500">
                <span>
                  Sales Officer: <strong className="text-gray-700">{meeting.executive}</strong>
                </span>
                <span>
                  {meeting.dateTime} ({meeting.duration})
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Record Meeting / Call Details</h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Client / Store Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahaveer Paint Store"
                  value={newClientName}
                  onChange={e => setNewClientName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="Owner name"
                    value={newContactPerson}
                    onChange={e => setNewContactPerson(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Interaction Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  >
                    <option value="In-Person Meet">In-Person Meet</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp Call">WhatsApp Call</option>
                    <option value="Site Inspection">Site Inspection</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Location or Phone</label>
                  <input
                    type="text"
                    value={newLocationOrPhone}
                    onChange={e => setNewLocationOrPhone(e.target.value)}
                    placeholder="Kota Counter / +91..."
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    placeholder="25 mins"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Sales Officer</label>
                <select
                  value={newExecutive}
                  onChange={e => setNewExecutive(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                >
                  <option value="Amit Sharma">Amit Sharma</option>
                  <option value="Ramesh Meena">Ramesh Meena</option>
                  <option value="Suresh Sharma">Suresh Sharma</option>
                  <option value="Neha Gupta">Neha Gupta</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Agenda / Discussion Topic *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wall putty dealer margin discussion and sampling"
                  value={newAgenda}
                  onChange={e => setNewAgenda(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Key Outcome</label>
                <textarea
                  rows={2}
                  placeholder="Key agreement, pricing negotiated, feedback on bag quality..."
                  value={newKeyOutcome}
                  onChange={e => setNewKeyOutcome(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Next Step</label>
                <input
                  type="text"
                  value={newNextStep}
                  onChange={e => setNewNextStep(e.target.value)}
                  placeholder="e.g. Follow-up on Tuesday with order form"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
