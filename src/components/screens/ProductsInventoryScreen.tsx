import React, { useState } from 'react';
import { ProductItem, CatalogProduct, ScreenType } from '../../types/erp';
import { INITIAL_CATALOG_PRODUCTS } from '../../data/productsInventoryData';
import { ProductCatalogSubpage } from './inventory/ProductCatalogSubpage';
import { InventoryManagementSubpage } from './inventory/InventoryManagementSubpage';
import { StockMovementsSubpage } from './inventory/StockMovementsSubpage';
import { BatchExpirySubpage } from './inventory/BatchExpirySubpage';
import { BarcodeQRSubpage } from './inventory/BarcodeQRSubpage';
import { StockAdjustmentSubpage } from './inventory/StockAdjustmentSubpage';
import { InventoryReportsSubpage } from './inventory/InventoryReportsSubpage';

export type InventorySubPageKey =
  | 'Product Catalog'
  | 'Inventory Management'
  | 'Stock Movements'
  | 'Batch & Expiry'
  | 'Barcode & QR'
  | 'Stock Adjustment'
  | 'Inventory Reports';

interface ProductsInventoryScreenProps {
  products?: ProductItem[];
  onRestock?: (productId: string, additionalBags: number) => void;
  activeSubPage?: string;
  onSelectSubPage?: (subpage: string) => void;
  onNavigateToScreen?: (screen: ScreenType) => void;
}

interface InventoryTabConfig {
  id: InventorySubPageKey;
  label: string;
  icon: string;
  badge?: string;
  description: string;
}

const INVENTORY_TABS: InventoryTabConfig[] = [
  {
    id: 'Product Catalog',
    label: 'Product Catalog',
    icon: 'fa-solid fa-boxes-stacked',
    badge: '28',
    description: 'Master finished products catalog, SKU packaging, pricing, stock levels & details inspector',
  },
  {
    id: 'Inventory Management',
    label: 'Inventory Management',
    icon: 'fa-solid fa-warehouse',
    description: 'Multi-location warehouse monitoring (Bundi, Kota, Jaipur, Udaipur) & inter-depot transfers',
  },
  {
    id: 'Stock Movements',
    label: 'Stock Movements',
    icon: 'fa-solid fa-arrows-up-down-left-right',
    badge: '18',
    description: 'Complete IN/OUT movement audit ledger: Batch receipts, sales dispatches & transfers',
  },
  {
    id: 'Batch & Expiry',
    label: 'Batch & Expiry',
    icon: 'fa-solid fa-hourglass-start',
    badge: '5',
    description: 'Paint manufacturing batch tracking, 24-month shelf life countdown & QC quarantine control',
  },
  {
    id: 'Barcode & QR',
    label: 'Barcode & QR',
    icon: 'fa-solid fa-barcode',
    description: 'GS1 compliant 2D QR codes & EAN-13 barcode sticker generator for paint cans & buckets',
  },
  {
    id: 'Stock Adjustment',
    label: 'Stock Adjustment',
    icon: 'fa-solid fa-scale-unbalanced',
    badge: '3',
    description: 'Physical stock verification, counting discrepancy reconciliation & damage write-offs',
  },
  {
    id: 'Inventory Reports',
    label: 'Inventory Reports',
    icon: 'fa-solid fa-chart-pie',
    description: 'Inventory valuation, stock turnover ratio (STR), aging analysis & Excel/PDF export',
  },
];

export const ProductsInventoryScreen: React.FC<ProductsInventoryScreenProps> = ({
  onRestock,
  activeSubPage = 'Product Catalog',
  onSelectSubPage,
}) => {
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>(INITIAL_CATALOG_PRODUCTS);
  const [currentTab, setCurrentTab] = useState<InventorySubPageKey>(
    (activeSubPage as InventorySubPageKey) || 'Product Catalog'
  );
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Interior Emulsion');
  const [newProdSku, setNewProdSku] = useState('SPE-20');
  const [newProdMrp, setNewProdMrp] = useState(1350);
  const [newProdDealerPrice, setNewProdDealerPrice] = useState(680);
  const [newProdStock, setNewProdStock] = useState(1500);

  // Sync tab with external prop
  React.useEffect(() => {
    if (activeSubPage) {
      setCurrentTab(activeSubPage as InventorySubPageKey);
    }
  }, [activeSubPage]);

  const handleTabChange = (tab: InventorySubPageKey) => {
    setCurrentTab(tab);
    if (onSelectSubPage) {
      onSelectSubPage(tab);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRestockInternal = (productId: string, additionalBags: number) => {
    setCatalogProducts((prev) =>
      prev.map((p) =>
        p.id === productId || p.sku === productId
          ? {
              ...p,
              currentStock: p.currentStock + additionalBags,
              availableStock: p.availableStock + additionalBags,
              status: 'In Stock',
            }
          : p
      )
    );
    if (onRestock) {
      onRestock(productId, additionalBags);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newProduct: CatalogProduct = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      sku: newProdSku || `SKU-${Date.now().toString().slice(-4)}`,
      category: newProdCategory,
      brand: 'Swatch Paints',
      itemType: 'Finished Products',
      unit: 'Bag (20L)',
      sizes: ['20 L', '10 L', '4 L'],
      openingStock: newProdStock,
      currentStock: newProdStock,
      reservedStock: 0,
      availableStock: newProdStock,
      reorderLevel: 500,
      hsnCode: '320910',
      mrp: newProdMrp,
      dealerPrice: newProdDealerPrice,
      status: 'In Stock',
      canType: 'shine',
      locations: [
        { name: 'Factory (Bundi)', stock: newProdStock },
        { name: 'Main Warehouse (Kota)', stock: 0 },
        { name: 'Jaipur Depot', stock: 0 },
        { name: 'Udaipur Depot', stock: 0 },
      ],
      recentMovements: [
        { type: 'IN', title: 'Initial Stock Onboarding', qty: `+ ${newProdStock} Bags`, date: '12 Aug 2025', reference: 'INIT-01' },
      ],
    };

    setCatalogProducts([newProduct, ...catalogProducts]);
    setIsAddProductModalOpen(false);
    setNewProdName('');
    showToast(`Product "${newProduct.name}" added to master catalog!`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <i className="fa-solid fa-circle-check text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header matching screenshot */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Module Header Bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold shadow-xs">
              <i className="fa-solid fa-boxes-stacked" />
            </span>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Products &amp; Inventory
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage your product catalog, stock levels, batches, and inventory across factory, warehouse and dealers.
              </p>
            </div>
          </div>

          {/* Action Buttons matching screenshot */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Add Product</span>
            </button>

            <button
              onClick={() => showToast('Import catalog CSV/Excel template ready')}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <i className="fa-solid fa-file-arrow-up text-xs text-slate-500" />
              <span>Import</span>
            </button>

            <button
              onClick={() => showToast('Exporting full inventory dataset (.xlsx)...')}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <i className="fa-solid fa-file-arrow-down text-xs text-slate-500" />
              <span>Export</span>
            </button>

            <button
              onClick={() => showToast('More settings opened')}
              className="p-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 rounded-xl transition"
              title="More options"
            >
              <i className="fa-solid fa-ellipsis text-xs px-1" />
            </button>
          </div>
        </div>

        {/* Subpages Navigation Tabs */}
        <div className="flex items-center space-x-1 p-2 bg-slate-50/80 overflow-x-auto select-none border-t border-slate-100">
          {INVENTORY_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <i className={`${tab.icon} text-xs ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subpage Views Rendering */}
      <div>
        {currentTab === 'Product Catalog' && (
          <ProductCatalogSubpage
            products={catalogProducts}
            onOpenAddProduct={() => setIsAddProductModalOpen(true)}
          />
        )}

        {currentTab === 'Inventory Management' && (
          <InventoryManagementSubpage
            products={catalogProducts}
            onRestock={handleRestockInternal}
          />
        )}

        {currentTab === 'Stock Movements' && <StockMovementsSubpage />}

        {currentTab === 'Batch & Expiry' && <BatchExpirySubpage />}

        {currentTab === 'Barcode & QR' && <BarcodeQRSubpage products={catalogProducts} />}

        {currentTab === 'Stock Adjustment' && <StockAdjustmentSubpage products={catalogProducts} />}

        {currentTab === 'Inventory Reports' && <InventoryReportsSubpage products={catalogProducts} />}
      </div>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Add New Paint Product</h3>
              <button onClick={() => setIsAddProductModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Commercial Name</label>
                <input
                  type="text"
                  placeholder="e.g. Swatch WeatherProof Ultra Pro"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product SKU</label>
                  <input
                    type="text"
                    placeholder="e.g. SWP-PRO"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Interior Emulsion">Interior Emulsion</option>
                    <option value="Exterior Emulsion">Exterior Emulsion</option>
                    <option value="Texture Paint">Texture Paint</option>
                    <option value="Primer">Primer</option>
                    <option value="Distemper">Distemper</option>
                    <option value="Waterproofing">Waterproofing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={newProdMrp}
                    onChange={(e) => setNewProdMrp(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dealer Price (₹)</label>
                  <input
                    type="number"
                    value={newProdDealerPrice}
                    onChange={(e) => setNewProdDealerPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Initial Opening Stock (Bags/Buckets)</label>
                <input
                  type="number"
                  value={newProdStock}
                  onChange={(e) => setNewProdStock(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Create Product SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
