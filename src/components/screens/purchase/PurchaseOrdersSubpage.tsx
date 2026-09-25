import React, { useState } from 'react';
import { PurchaseOrderRecord, PurchaseOrderItem } from '../../../types/erp';
import { PurchaseOrderPdfModal } from './PurchaseOrderPdfModal';

interface PurchaseOrdersSubpageProps {
  orders: PurchaseOrderRecord[];
  onCreateOrder: (newOrder: PurchaseOrderRecord) => void;
  onUpdateStatus: (poId: string, status: PurchaseOrderRecord['status']) => void;
}

export const PurchaseOrdersSubpage: React.FC<PurchaseOrdersSubpageProps> = ({
  orders,
  onCreateOrder,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedPdfPO, setSelectedPdfPO] = useState<PurchaseOrderRecord | null>(null);

  // New PO Form State
  const [vendorName, setVendorName] = useState('RG Chemicals');
  const [expectedDate, setExpectedDate] = useState('18 Aug 2025');
  const [paymentTerms, setPaymentTerms] = useState('50% Advance, 50% on Delivery');
  const [department, setDepartment] = useState('Production');
  const [items, setItems] = useState<PurchaseOrderItem[]>([
    {
      id: 'item-1',
      materialName: 'Titanium Dioxide Rutile (R-902+)',
      specification: 'Chloride Process Pigment',
      qty: 1000,
      unit: 'kg',
      rate: 210,
      amount: 210000,
    },
    {
      id: 'item-2',
      materialName: 'Pure Acrylic Polymer Emulsion AR-800',
      specification: '50% Solid Content',
      qty: 2000,
      unit: 'kg',
      rate: 85,
      amount: 170000,
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        materialName: 'Calcite Powder Snow White',
        specification: '325 Mesh',
        qty: 3000,
        unit: 'kg',
        rate: 18,
        amount: 54000,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const totalOrderAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const totalOrderQty = items.reduce((sum, item) => sum + item.qty, 0);

  const handleSavePO = (e: React.FormEvent) => {
    e.preventDefault();
    const newPO: PurchaseOrderRecord = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2025-0${Math.floor(25 + Math.random() * 70)}`,
      date: 'Today, 12 Aug 2025',
      expectedDate,
      supplierId: `sup-${Date.now()}`,
      supplierName: vendorName,
      supplierContact: vendorName === 'RG Chemicals' ? 'Mr. Rajesh Gupta' : 'Vendor Representative',
      supplierPhone: '+91 98765 43210',
      supplierAddress: 'RIICO Industrial Area, Rajasthan',
      itemsCount: items.length,
      totalQty: `${totalOrderQty.toLocaleString()} kg`,
      totalQtyRaw: totalOrderQty,
      totalAmount: `₹ ${totalOrderAmount.toLocaleString('en-IN')}`,
      totalAmountRaw: totalOrderAmount,
      status: 'Pending',
      paymentTerms,
      createdBy: 'Amit Sharma',
      department,
      items,
      timeline: [
        { step: 'PO Created', date: 'Today', detail: 'by Amit Sharma', completed: true },
        { step: 'Dispatched', date: 'Pending', detail: 'Awaiting Vendor', completed: false, isPending: true },
        { step: 'Received', date: expectedDate, detail: 'Pending', completed: false },
        { step: 'Invoice', date: 'Pending', detail: 'Pending', completed: false },
        { step: 'Payment', date: 'Pending', detail: 'Pending', completed: false },
      ],
    };
    onCreateOrder(newPO);
    setShowCreateModal(false);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = filterStatus === 'All' || o.status === filterStatus;
    const matchesSearch =
      o.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-file-invoice" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Purchase Orders Ledger &amp; Management
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official B2B procurement purchase orders issued to chemical, mineral, and packaging suppliers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search PO #, supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 font-medium"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Create Purchase Order</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Received', 'In Transit', 'Partially Received', 'Pending', 'Cancelled'].map(
            (st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                  filterStatus === st
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredOrders.length} Purchase Orders
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">PO Number</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total Qty</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Expected Date</th>
                <th className="py-3 px-4 text-right">Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredOrders.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{po.poNumber}</td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{po.date}</td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block font-semibold">{po.supplierName}</strong>
                    <span className="text-[10px] text-slate-400">Attn: {po.supplierContact}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold">
                      {po.items.length} materials
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{po.totalQty}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900 tabular-nums">
                    {po.totalAmount}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        po.status === 'Received'
                          ? 'bg-emerald-100 text-emerald-800'
                          : po.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : po.status === 'Partially Received'
                          ? 'bg-amber-100 text-amber-800'
                          : po.status === 'Pending'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {po.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{po.expectedDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedPdfPO(po)}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ml-auto shadow-2xs"
                    >
                      <i className="fa-solid fa-file-pdf text-rose-600 text-[11px]" />
                      <span>View PO</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Purchase Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowCreateModal(false)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-cart-plus" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Create Purchase Order</h3>
                  <p className="text-xs text-slate-500">Generate an official procurement order for raw materials.</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form onSubmit={handleSavePO} className="space-y-4 mt-4 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Select Supplier</label>
                  <select
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="RG Chemicals">RG Chemicals (Kota, Rajasthan)</option>
                    <option value="Shree Polymers">Shree Polymers (Bundi, Rajasthan)</option>
                    <option value="Rajasthan Minerals">Rajasthan Minerals (Kishangarh)</option>
                    <option value="Colour Chem Industries">Colour Chem Industries (Ahmedabad)</option>
                    <option value="Vardhman Packaging">Vardhman Packaging (Jaipur)</option>
                    <option value="S.K. Additives">S.K. Additives (Jaipur)</option>
                    <option value="Om Traders">Om Traders (Udaipur)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Expected Delivery Date</label>
                  <input
                    type="text"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="50% Advance, 50% on Delivery">50% Advance, 50% on Delivery</option>
                    <option value="30 Days Net Credit">30 Days Net Credit</option>
                    <option value="Immediate RTGS on Inspection">Immediate RTGS on Inspection</option>
                    <option value="15 Days Credit">15 Days Credit</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Requesting Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-slate-700 font-bold">Raw Material Line Items</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1"
                  >
                    <i className="fa-solid fa-plus text-[10px]" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {items.map((it, idx) => (
                    <div
                      key={it.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-12 gap-2 items-center"
                    >
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={it.materialName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setItems(items.map((x) => (x.id === it.id ? { ...x, materialName: val } : x)));
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                          placeholder="Material name"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={it.specification}
                          onChange={(e) => {
                            const val = e.target.value;
                            setItems(items.map((x) => (x.id === it.id ? { ...x, specification: val } : x)));
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                          placeholder="Specification"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={it.qty}
                          onChange={(e) => {
                            const q = parseInt(e.target.value) || 0;
                            setItems(
                              items.map((x) => (x.id === it.id ? { ...x, qty: q, amount: q * x.rate } : x))
                            );
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-right font-mono"
                          placeholder="Qty"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={it.rate}
                          onChange={(e) => {
                            const r = parseFloat(e.target.value) || 0;
                            setItems(
                              items.map((x) => (x.id === it.id ? { ...x, rate: r, amount: x.qty * r } : x))
                            );
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-right font-mono"
                          placeholder="Rate"
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(it.id)}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <i className="fa-solid fa-trash-can text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center">
                  <span className="font-bold text-blue-900">Total Purchase Order Value:</span>
                  <span className="font-mono font-black text-blue-900 text-sm">
                    ₹ {totalOrderAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Issue Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Modal */}
      <PurchaseOrderPdfModal
        po={selectedPdfPO}
        isOpen={!!selectedPdfPO}
        onClose={() => setSelectedPdfPO(null)}
      />
    </div>
  );
};
