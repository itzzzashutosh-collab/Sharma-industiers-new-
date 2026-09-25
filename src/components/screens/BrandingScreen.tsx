import React, { useState, useEffect } from 'react';
import {
  BrandAssetRecord,
  PackagingDesignRecord,
  ShadeRecord,
  BrandCreativeRecord,
} from '../../types/erp';
import {
  INITIAL_BRAND_ASSETS,
  INITIAL_PACKAGING_DESIGNS,
  INITIAL_SHADES,
  INITIAL_BRAND_CREATIVES,
  INITIAL_SIGNAGE_SPECS,
  INITIAL_BRAND_AUDITS,
} from '../../data/brandingData';

import { BrandingOverviewSubpage } from './branding/BrandingOverviewSubpage';
import { PackagingDesignsSubpage } from './branding/PackagingDesignsSubpage';
import { BrandAssetLibrarySubpage } from './branding/BrandAssetLibrarySubpage';
import { ColorPaletteSubpage } from './branding/ColorPaletteSubpage';
import { BrandGuidelinesSubpage } from './branding/BrandGuidelinesSubpage';
import { MarketingCreativesSubpage } from './branding/MarketingCreativesSubpage';
import { DealerSignageSpecsSubpage } from './branding/DealerSignageSpecsSubpage';
import { BrandComplianceSubpage } from './branding/BrandComplianceSubpage';

import { UploadAssetModal } from './branding/UploadAssetModal';
import { NewPackagingModal } from './branding/NewPackagingModal';
import { ShadeDetailModal } from './branding/ShadeDetailModal';
import { CreativeCustomizerModal } from './branding/CreativeCustomizerModal';

export const BRANDING_TABS = [
  'Brand Overview',
  'Packaging Designs & SKUs',
  'Brand Asset Library',
  'Color Palette & Shade System',
  'Brand Guidelines & Manual',
  'Marketing Creatives & Collateral',
  'Dealer Signage & POSM Specs',
  'Brand Compliance & Audits',
] as const;

export type BrandingTab = (typeof BRANDING_TABS)[number];

interface BrandingScreenProps {
  activeSubPage?: string;
  onSelectSubPage?: (subPage: string) => void;
}

export const BrandingScreen: React.FC<BrandingScreenProps> = ({
  activeSubPage = 'Brand Overview',
  onSelectSubPage,
}) => {
  const [currentTab, setCurrentTab] = useState<BrandingTab>('Brand Overview');

  // Datasets State
  const [assets, setAssets] = useState<BrandAssetRecord[]>(INITIAL_BRAND_ASSETS);
  const [packagings, setPackagings] = useState<PackagingDesignRecord[]>(INITIAL_PACKAGING_DESIGNS);
  const [shades] = useState<ShadeRecord[]>(INITIAL_SHADES);
  const [creatives] = useState<BrandCreativeRecord[]>(INITIAL_BRAND_CREATIVES);
  const [signageSpecs] = useState(INITIAL_SIGNAGE_SPECS);
  const [audits] = useState(INITIAL_BRAND_AUDITS);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isNewPackagingOpen, setIsNewPackagingOpen] = useState(false);
  const [selectedShadeForModal, setSelectedShadeForModal] = useState<ShadeRecord | null>(null);
  const [selectedCreativeForCustomizer, setSelectedCreativeForCustomizer] =
    useState<BrandCreativeRecord | null>(null);

  // Sync external activeSubPage
  useEffect(() => {
    if (activeSubPage && BRANDING_TABS.includes(activeSubPage as BrandingTab)) {
      setCurrentTab(activeSubPage as BrandingTab);
    }
  }, [activeSubPage]);

  const handleTabChange = (tab: BrandingTab) => {
    setCurrentTab(tab);
    if (onSelectSubPage) {
      onSelectSubPage(tab);
    }
  };

  const handleUploadAsset = (newAsset: BrandAssetRecord) => {
    setAssets((prev) => [newAsset, ...prev]);
  };

  const handleCreatePackaging = (newPack: PackagingDesignRecord) => {
    setPackagings((prev) => [newPack, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Quick Action Bar (Matching User Screenshot) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
            <i className="fa-solid fa-palette text-xl" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Brand Identity & Creative Asset Studio
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                Swatch Paints Core
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Centralized repository for packaging renders, master shade formulations, official vector assets, and dealer co-branding guidelines.
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
          >
            <i className="fa-solid fa-cloud-arrow-up text-xs" />
            <span>Upload Asset</span>
          </button>
          <button
            onClick={() => setIsNewPackagingOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs shadow-indigo-600/20"
          >
            <i className="fa-solid fa-paint-roller text-xs" />
            <span>New Packaging</span>
          </button>
          <button
            onClick={() => alert('Downloading official 64-page Brand Manual PDF (8.4 MB)...')}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5"
          >
            <i className="fa-solid fa-file-pdf text-xs text-rose-500" />
            <span>Brand Manual</span>
          </button>
          <button
            onClick={() => alert('Exporting full Swatch Media Kit 2025 (Vector marks, fonts, color guide - ZIP 42 MB)...')}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5"
          >
            <i className="fa-solid fa-box-archive text-xs text-slate-500" />
            <span>Export Media Kit</span>
          </button>
        </div>
      </div>

      {/* Horizontal Sub-Pages Navigation Tabs */}
      <div className="border-b border-slate-200 overflow-x-auto scrollbar-none bg-white rounded-xl px-2 py-1.5 shadow-xs">
        <nav className="flex space-x-1 whitespace-nowrap min-w-max">
          {BRANDING_TABS.map((tab) => {
            const isActive = currentTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg transition flex items-center space-x-2 ${
                  isActive
                    ? 'bg-rose-50 text-rose-700 shadow-xs ring-1 ring-rose-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'Brand Overview' && <i className="fa-solid fa-chart-pie text-xs" />}
                {tab === 'Packaging Designs & SKUs' && <i className="fa-solid fa-box-archive text-xs" />}
                {tab === 'Brand Asset Library' && <i className="fa-solid fa-folder-open text-xs" />}
                {tab === 'Color Palette & Shade System' && <i className="fa-solid fa-swatchbook text-xs" />}
                {tab === 'Brand Guidelines & Manual' && <i className="fa-solid fa-book-bookmark text-xs" />}
                {tab === 'Marketing Creatives & Collateral' && <i className="fa-solid fa-photo-film text-xs" />}
                {tab === 'Dealer Signage & POSM Specs' && <i className="fa-solid fa-store text-xs" />}
                {tab === 'Brand Compliance & Audits' && <i className="fa-solid fa-shield-halved text-xs" />}
                <span>{tab}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Dynamic Subpage View Content */}
      <div className="transition-all duration-200">
        {currentTab === 'Brand Overview' && (
          <BrandingOverviewSubpage
            assets={assets}
            packagings={packagings}
            shades={shades}
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenNewPackaging={() => setIsNewPackagingOpen(true)}
            onSelectShade={(s) => setSelectedShadeForModal(s)}
            onNavigateSubpage={(sub) => handleTabChange(sub as BrandingTab)}
          />
        )}

        {currentTab === 'Packaging Designs & SKUs' && (
          <PackagingDesignsSubpage
            packagings={packagings}
            onOpenNewPackaging={() => setIsNewPackagingOpen(true)}
          />
        )}

        {currentTab === 'Brand Asset Library' && (
          <BrandAssetLibrarySubpage
            assets={assets}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {currentTab === 'Color Palette & Shade System' && (
          <ColorPaletteSubpage
            shades={shades}
            onSelectShade={(s) => setSelectedShadeForModal(s)}
          />
        )}

        {currentTab === 'Brand Guidelines & Manual' && <BrandGuidelinesSubpage />}

        {currentTab === 'Marketing Creatives & Collateral' && (
          <MarketingCreativesSubpage
            creatives={creatives}
            onOpenCustomizer={(c) => setSelectedCreativeForCustomizer(c)}
          />
        )}

        {currentTab === 'Dealer Signage & POSM Specs' && (
          <DealerSignageSpecsSubpage signageSpecs={signageSpecs} />
        )}

        {currentTab === 'Brand Compliance & Audits' && (
          <BrandComplianceSubpage audits={audits} />
        )}
      </div>

      {/* Modals */}
      <UploadAssetModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadAsset}
      />

      <NewPackagingModal
        isOpen={isNewPackagingOpen}
        onClose={() => setIsNewPackagingOpen(false)}
        onCreate={handleCreatePackaging}
      />

      <ShadeDetailModal
        shade={selectedShadeForModal}
        onClose={() => setSelectedShadeForModal(null)}
      />

      <CreativeCustomizerModal
        creative={selectedCreativeForCustomizer}
        onClose={() => setSelectedCreativeForCustomizer(null)}
      />
    </div>
  );
};
