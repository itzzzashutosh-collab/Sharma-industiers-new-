import React, { useState } from 'react';
import { MarketingEventRecord } from '../../../types/erp';

interface MarketingEventsSubpageProps {
  events: MarketingEventRecord[];
  onAddEvent: (event: MarketingEventRecord) => void;
}

export const MarketingEventsSubpage: React.FC<MarketingEventsSubpageProps> = ({
  events,
  onAddEvent,
}) => {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<MarketingEventRecord['eventType']>('Contractor Meet');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('Kota');
  const [eventDate, setEventDate] = useState('15 Sep 2025');
  const [expectedAttendees, setExpectedAttendees] = useState('100');
  const [totalBudget, setTotalBudget] = useState('90000');
  const [organizerLead, setOrganizerLead] = useState('Vikramaditya Rathore');
  const [chiefGuest, setChiefGuest] = useState('');

  const filteredEvents = events.filter((ev) => {
    const matchesType = filterType === 'All' || ev.eventType === filterType;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.organizerLead.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalAttendees = events.reduce((acc, ev) => acc + ev.registeredAttendees, 0);
  const totalLeads = events.reduce((acc, ev) => acc + ev.newLeadsCaptured, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEv: MarketingEventRecord = {
      id: `evt-${Date.now()}`,
      eventCode: `EVT-2025-${Math.floor(10 + Math.random() * 90)}`,
      title,
      eventType,
      venue,
      city,
      eventDate,
      expectedAttendees: Number(expectedAttendees) || 50,
      registeredAttendees: 0,
      totalBudget: Number(totalBudget) || 50000,
      actualSpend: 0,
      organizerLead,
      status: 'Upcoming',
      newLeadsCaptured: 0,
      chiefGuest,
    };

    onAddEvent(newEv);
    setIsModalOpen(false);
    setTitle('');
    setVenue('');
  };

  const getStatusBadge = (status: MarketingEventRecord['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Upcoming':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Planning':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-champagne-glasses" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Architect, Contractor &amp; Painter Meets
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            B2B technical workshops, contractor reward galas, architect specification conclaves &amp; live demos.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <i className="fa-solid fa-plus text-[10px]" />
          <span>Schedule New Event</span>
        </button>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Meets</p>
          <p className="text-xl font-black text-slate-900 mt-1">{events.length} Conclaves</p>
          <p className="text-[10px] text-slate-500">Across Rajasthan cities</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendees Hosted</p>
          <p className="text-xl font-black text-amber-600 font-mono mt-1">
            {totalAttendees} Professionals
          </p>
          <p className="text-[10px] text-slate-500">Architects &amp; contractors</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Project Leads Won</p>
          <p className="text-xl font-black text-emerald-600 font-mono mt-1">{totalLeads} Projects</p>
          <p className="text-[10px] text-emerald-600 font-semibold">Attributed to conclaves</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming Meets</p>
          <p className="text-xl font-black text-blue-600 mt-1">
            {events.filter((e) => e.status === 'Upcoming' || e.status === 'In Planning').length} Scheduled
          </p>
          <p className="text-[10px] text-blue-700 font-semibold">Q3 FY 2025-26</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Architect Conclave', 'Contractor Meet', 'Painter Training Workshop', 'Dealer Annual Gala'].map(
            (t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterType === t
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            )
          )}
        </div>

        <div className="relative flex-1 sm:w-64">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search venue, city, lead..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3.5 hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    {ev.eventCode}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">{ev.title}</h3>
                  <p className="text-[11px] text-amber-700 font-semibold">{ev.eventType}</p>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
                    ev.status
                  )}`}
                >
                  {ev.status}
                </span>
              </div>

              {/* Venue & Date */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <i className="fa-regular fa-calendar text-slate-400" />
                  <span className="font-bold">{ev.eventDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <i className="fa-solid fa-location-dot text-slate-400" />
                  <span>{ev.venue}, {ev.city}</span>
                </div>
                {ev.chiefGuest && (
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    Chief Guest: <strong className="text-slate-700">{ev.chiefGuest}</strong>
                  </div>
                )}
              </div>

              {/* Budget & Attendance */}
              <div className="grid grid-cols-3 gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Attendees</p>
                  <p className="font-bold text-slate-900">
                    {ev.registeredAttendees || ev.expectedAttendees}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Budget</p>
                  <p className="font-bold text-slate-800">₹{(ev.totalBudget / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Leads Captured</p>
                  <p className="font-bold text-emerald-600">{ev.newLeadsCaptured}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Organizer: <strong className="text-slate-700">{ev.organizerLead}</strong></span>
              <span className="font-semibold text-amber-700">View Dossier →</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-amber-600 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Schedule B2B Event or Meet</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mewar Contractors Waterproofing Clinic"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="Architect Conclave">Architect Conclave</option>
                    <option value="Contractor Meet">Contractor Meet</option>
                    <option value="Painter Training Workshop">Painter Training Workshop</option>
                    <option value="Dealer Annual Gala">Dealer Annual Gala</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Venue &amp; Hall</label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Hotel Surya Royal Banquet"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Date</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Attendees</label>
                  <input
                    type="number"
                    value={expectedAttendees}
                    onChange={(e) => setExpectedAttendees(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold font-mono focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Budget (₹)</label>
                  <input
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold font-mono focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Event Lead</label>
                  <input
                    type="text"
                    value={organizerLead}
                    onChange={(e) => setOrganizerLead(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Chief Guest (Optional)</label>
                  <input
                    type="text"
                    value={chiefGuest}
                    onChange={(e) => setChiefGuest(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Confirm Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
