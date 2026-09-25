import React, { useState } from 'react';
import { DealerCustomer } from '../../../types/erp';
import { INITIAL_CUSTOMERS_DEALERS } from '../../../data/crmSubpagesData';

interface CustomersDealersSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const CustomersDealersSubpage: React.FC<CustomersDealersSubpageProps> = ({
  onNavigateSubpage,
}) => {
  const [dealers, setDealers] = useState<DealerCustomer[]>(INITIAL_CUSTOMERS_DEALERS);
  const [selectedDealerId, setSelectedDealerId] = useState<string>(dealers[0]?.id || 'dlr-1');
  const [tierFilter, setTierFilter] = useState('All Tiers');
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [search, setSearch] = useState('');
  const [isAddDealerOpen, setIsAddDealerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New dealer form
  const [newStoreName, setNewStoreName] = useState('');
  const [newProprietor, setNewProprietor] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('Kota');
  const [newTier, setNewTier] = useState<DealerCustomer['tier']>('Gold Dealer');
  const [newCreditLimit, setNewCreditLimit] = useState(300000);

  const selectedDealer = dealers.find((d) => d.id === selectedDealerId) || dealers[0];

  const filteredDealers = dealers.filter((d) => {
    if (tierFilter !== 'All Tiers' && d.tier !== tierFilter) return false;
    if (cityFilter !== 'All Cities' && d.city !== cityFilter) return false;
    if (
      search &&
      !d.storeName.toLowerCase().includes(search.toLowerCase()) &&
      !d.proprietor.toLowerCase().includes(search.toLowerCase()) &&
      !d.city.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const totalOutstanding = dealers.reduce((acc, d) => acc + d.outstandingBalance, 0);
  const totalMonthlyBags = dealers.reduce((acc, d) => acc + d.monthlyBagsSold, 0);
  const totalRevenue = dealers.reduce((acc, d) => acc + d.totalRevenue, 0);

  const handleAddDealer = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: DealerCustomer = {
      id: `dlr-${Date.now()}`,
      dealerCode: `DLR-${newCity.substring(0, 2).toUpperCase()}-0${Math.floor(10 + Math.random() * 90)}`,
      storeName: newStoreName,
      proprietor: newProprietor,
      phone: newPhone,
      email: `${newStoreName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      city: newCity,
      district: `${newCity} District`,
      tier: newTier,
      creditLimit: newCreditLimit,
      outstandingBalance: 0,
      monthlyBagsTarget: 800,
      monthlyBagsSold: 0,
      gstin: '08AABCS9999P1Z8',
      rating: 5.0,
      status: 'Active',
      salesRep: 'Amit Sharma',
      lastOrderDate: 'Just Onboarded',
      totalOrdersCount: 0,
      totalRevenue: 0,
    };

    setDealers([newEntry, ...dealers]);
    setIsAddDealerOpen(false);
    setToastMessage(`Dealer "${newStoreName}" successfully registered & credit limit activated!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
              Distribution Network
            </span>
            <span className="text-xs text-slate-400">• Rajasthan Channel Partners</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight mt-1">
            Customers &amp; Authorized Dealer Accounts
          </h2>
          <p className="text-xs text-slate-500">
            Manage wholesale distributors, credit lines, quarterly volume schemes, and dealer ledger statements.
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
            onClick={() => setIsAddDealerOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Register New Dealer</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-circle-check text-emerald-600 text-sm" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-500 hover:text-emerald-700">
            <i className="fa-solid fa-xmark text-xs" />
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Active Dealers</span>
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-store" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{dealers.length} Stores</span>
            <span className="text-[11px] font-semibold text-emerald-600">100% Verified</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Monthly Volume Sold</span>
            <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-cubes-stacked" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-indigo-600">{totalMonthlyBags.toLocaleString()} Bags</span>
            <span className="text-[11px] text-slate-400">This Month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Total Outstanding</span>
            <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-file-invoice-dollar" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-600">₹ {(totalOutstanding / 100000).toFixed(2)}L</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Under Credit Cap</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Cumulative Revenue</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-indian-rupee-sign" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">₹ {(totalRevenue / 100000).toFixed(2)}L</span>
            <span className="text-[11px] text-slate-400">Lifetime</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-none"
          >
            <option>All Tiers</option>
            <option>Platinum Dealer</option>
            <option>Gold Dealer</option>
            <option>Silver Dealer</option>
            <option>Authorized Retailer</option>
          </select>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium focus:outline-none"
          >
            <option>All Cities</option>
            <option>Kota</option>
            <option>Bundi</option>
            <option>Jaipur</option>
            <option>Udaipur</option>
          </select>
        </div>

        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search dealer, proprietor, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none w-64"
          />
        </div>
      </div>

      {/* Main Dealer Grid + Split Ledger Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Table (8 cols) */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Dealer Name</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Tier</th>
                  <th className="py-3 px-3">Credit Line</th>
                  <th className="py-3 px-3">Outstanding</th>
                  <th className="py-3 px-3 text-right">Monthly Bags</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDealers.map((d) => {
                  const isSelected = d.id === selectedDealerId;
                  const creditUtilization = Math.round((d.outstandingBalance / d.creditLimit) * 100);

                  return (
                    <tr
                      key={d.id}
                      onClick={() => setSelectedDealerId(d.id)}
                      className={`hover:bg-blue-50/40 cursor-pointer transition ${
                        isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className="font-extrabold text-slate-900 block">{d.storeName}</span>
                        <span className="text-[10px] text-slate-400 block">{d.proprietor} • {d.dealerCode}</span>
                      </td>

                      <td className="py-3 px-3 text-slate-600">
                        <span>{d.city}</span>
                        <span className="text-[10px] text-slate-400 block">{d.district}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {d.tier}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-semibold text-slate-700">
                        ₹ {(d.creditLimit / 1000).toFixed(0)}k
                      </td>

                      <td className="py-3 px-3">
                        <span className={`font-extrabold ${creditUtilization > 80 ? 'text-rose-600' : 'text-slate-800'}`}>
                          ₹ {(d.outstandingBalance / 1000).toFixed(0)}k
                        </span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              creditUtilization > 80 ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, creditUtilization)}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3 px-3 text-right font-black text-slate-900">
                        {d.monthlyBagsSold} / {d.monthlyBagsTarget}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDealerId(d.id);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          View Ledger
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Dealer Inspector (4 cols) */}
        {selectedDealer && (
          <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4.5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{selectedDealer.storeName}</h3>
                <span className="text-[11px] text-slate-500">{selectedDealer.dealerCode} • {selectedDealer.city}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ⭐ {selectedDealer.rating} Rating
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Proprietor:</span>
                <span className="font-bold text-slate-800">{selectedDealer.proprietor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-semibold text-blue-600">{selectedDealer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">GSTIN:</span>
                <span className="font-mono text-slate-700">{selectedDealer.gstin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Sales Rep:</span>
                <span className="font-bold text-slate-800">{selectedDealer.salesRep}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Credit Account Overview</span>
              <div className="flex justify-between">
                <span className="text-slate-600">Assigned Limit:</span>
                <span className="font-bold text-slate-900">₹ {selectedDealer.creditLimit.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Current Outstanding:</span>
                <span className="font-bold text-amber-600">₹ {selectedDealer.outstandingBalance.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Available Credit:</span>
                <span className="font-black text-emerald-600">
                  ₹ {(selectedDealer.creditLimit - selectedDealer.outstandingBalance).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <button
                onClick={() => onNavigateSubpage('New Order')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition"
              >
                + Create Order for {selectedDealer.storeName}
              </button>
              <button
                onClick={() => alert(`Ledger statement PDF for ${selectedDealer.storeName} generated.`)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
              >
                Download Account Ledger (PDF)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Dealer Modal */}
      {isAddDealerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddDealer}
            className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Register New Channel Partner</h3>
              <button type="button" onClick={() => setIsAddDealerOpen(false)} className="text-slate-400">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Store / Firm Name *</label>
                <input
                  type="text"
                  required
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  placeholder="e.g. Bundi Shiv Paint Mart"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Proprietor Name *</label>
                <input
                  type="text"
                  required
                  value={newProprietor}
                  onChange={(e) => setNewProprietor(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 98290 XXXXX"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">City *</label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  >
                    <option>Kota</option>
                    <option>Bundi</option>
                    <option>Jaipur</option>
                    <option>Udaipur</option>
                    <option>Baran</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Dealer Tier</label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  >
                    <option>Platinum Dealer</option>
                    <option>Gold Dealer</option>
                    <option>Silver Dealer</option>
                    <option>Authorized Retailer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Credit Limit (₹)</label>
                  <input
                    type="number"
                    value={newCreditLimit}
                    onChange={(e) => setNewCreditLimit(parseInt(e.target.value) || 0)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddDealerOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Register Dealer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
