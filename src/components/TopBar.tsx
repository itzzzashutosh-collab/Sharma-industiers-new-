import React, { useState, useRef, useEffect } from 'react';
import { SystemAlert } from '../types/erp';

interface TopBarProps {
  onOpenMobileSidebar: () => void;
  onOpenSearch: () => void;
  alerts: SystemAlert[];
  onOpenNewOrder: () => void;
  onOpenNewLead: () => void;
  onOpenContact: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobileSidebar,
  onOpenSearch,
  alerts,
  onOpenNewOrder,
  onOpenNewLead,
  onOpenContact,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (msgRef.current && !msgRef.current.contains(event.target as Node)) {
        setShowMessages(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 sm:py-3 sticky top-0 z-30 flex items-center justify-between gap-2.5 sm:gap-4 transition-all"
      data-purpose="top-navigation"
    >
      {/* Mobile toggle button */}
      <button
        onClick={onOpenMobileSidebar}
        className="p-2 -ml-1 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95 transition lg:hidden"
        aria-label="Open menu"
      >
        <i className="fa-solid fa-bars text-base" />
      </button>

      {/* Universal Search */}
      <div className="relative flex-1 max-w-xs sm:max-w-md lg:max-w-xl">
        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
        <input
          onClick={onOpenSearch}
          readOnly
          className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 pl-9 pr-14 py-2 rounded-xl cursor-pointer hover:bg-slate-100 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-slate-400 transition-all"
          placeholder="Search customers, orders, stock... (Ctrl + K)"
          type="text"
        />
        <button
          onClick={onOpenSearch}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white font-mono hover:text-slate-700 hover:border-slate-300 transition"
        >
          ⌘K
        </button>
      </div>

      {/* Right Utility Controls */}
      <div className="flex items-center space-x-1.5 sm:space-x-3">
        {/* Quick Action Buttons with rich hover states */}
        <div className="hidden lg:flex items-center space-x-2">
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 active:scale-95 transition-all shadow-2xs"
            title="Open Dealer Contact Desk"
          >
            <i className="fa-regular fa-envelope text-[11px]" />
            <span>Contact Desk</span>
          </button>
          <button
            onClick={onOpenNewOrder}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/25 active:scale-95 rounded-lg shadow-xs transition-all"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>New Order</span>
          </button>
          <button
            onClick={onOpenNewLead}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 active:scale-95 transition-all"
          >
            <i className="fa-solid fa-user-plus text-[10px]" />
            <span>Add Lead</span>
          </button>
        </div>

        {/* Date Badge */}
        <div className="hidden xl:flex items-center space-x-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200/80">
          <i className="fa-regular fa-calendar text-slate-500" />
          <span>Tue, 12 Aug 2025</span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95 transition"
          >
            <i className="fa-regular fa-bell text-sm" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
              {alerts.length}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-900">Plant &amp; Business Alerts</h4>
                  <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded">
                    {alerts.length} Active
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Jaipur Plant #01</span>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {alerts.map((alt) => (
                  <div
                    key={alt.id}
                    className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition flex items-start space-x-2.5 cursor-pointer"
                  >
                    <span
                      className={`w-6 h-6 rounded-lg ${alt.badgeBg} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}
                    >
                      {alt.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 leading-snug">{alt.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{alt.subtitle}</p>
                      <span className="text-[9px] text-slate-400 font-medium">{alt.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message/Chat Dropdown */}
        <div className="relative" ref={msgRef}>
          <button
            onClick={() => setShowMessages(!showMessages)}
            aria-label="Messages"
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 active:scale-95 transition"
          >
            <i className="fa-regular fa-comment-dots text-sm" />
          </button>

          {showMessages && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <h4 className="text-xs font-bold text-slate-900">Operations Chat</h4>
                <span className="text-[10px] text-blue-600 font-semibold">5 online</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="font-bold text-slate-800 text-[11px]">Suresh (Factory):</p>
                  <p className="text-slate-600 text-[10px]">
                    Batch BCH-502 packaged. Tank 3 ready for Weatherguard.
                  </p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <p className="font-bold text-slate-800 text-[11px]">Ramesh (Sales):</p>
                  <p className="text-slate-600 text-[10px]">
                    Kota distributor wants 200 bags additional Primer dispatched by Friday.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Contact Quick Button */}
        <button
          onClick={onOpenContact}
          className="lg:hidden p-2 rounded-xl text-blue-600 hover:bg-blue-50 active:scale-95 transition"
          title="Contact Desk"
          aria-label="Contact Desk"
        >
          <i className="fa-regular fa-envelope text-sm" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-0.5 sm:mx-1" />

        {/* User Profile Pill with Optimized Avatar */}
        <div className="relative" ref={userMenuRef}>
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer p-1 rounded-xl hover:bg-slate-100 active:scale-95 transition"
          >
            <img
              alt="Ashutosh Sharma Avatar"
              width="32"
              height="32"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full border border-blue-400 object-cover shadow-2xs aspect-square"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkTPf3csB-waF_8--xRV_aAC7PlnOcOFagIZdbvcOJisTEYO-HKcWwns8ldfd32Ir0d2WriYOifJKwGrYQb0C9HYie2XqCc2lJCifRW4u0g6nPEGRMTbrX-CAi7aLCjXaABoHzRWEBz96o-EiiZyFvq4ow28jvzHcCyQGw5eWRHChFyUvgtS2YtzdzVg9yfuzHSr8rdniK4Ai0DB1z9km3YD6vixxCfw-JZ0WyX624s7UVIRNgL5SK"
            />
            <div className="text-left hidden md:block">
              <h4 className="text-xs font-bold text-slate-800 leading-tight">Ashutosh Sharma</h4>
              <p className="text-[10px] font-medium text-slate-500">Founder</p>
            </div>
            <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 hidden sm:block" />
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150 text-xs">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-slate-900">Ashutosh Sharma</p>
                <p className="text-[11px] text-slate-400">itzzashutosh@gmail.com</p>
                <span className="inline-block mt-1 text-[9px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                  Admin &amp; Factory Owner
                </span>
              </div>
              <div className="space-y-0.5 font-medium">
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 transition"
                >
                  <i className="fa-solid fa-building-user text-slate-400 w-4" />
                  <span>Jaipur Plant #01 Config</span>
                </button>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 transition"
                >
                  <i className="fa-solid fa-shield-halved text-slate-400 w-4" />
                  <span>GST &amp; Compliance (Rajasthan)</span>
                </button>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 transition"
                >
                  <i className="fa-solid fa-bell text-slate-400 w-4" />
                  <span>Notification Preferences</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
