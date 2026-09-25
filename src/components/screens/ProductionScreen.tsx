import React, { useState } from 'react';
import { ProductionBatch, ScreenType } from '../../types/erp';
import { BatchScheduleSubpage } from './production/BatchScheduleSubpage';
import { BatchFormulationSubpage } from './production/BatchFormulationSubpage';
import { QualityControlSubpage } from './production/QualityControlSubpage';
import { PlantMachinerySubpage } from './production/PlantMachinerySubpage';
import { MaterialConsumptionSubpage } from './production/MaterialConsumptionSubpage';
import { PackagingFillingSubpage } from './production/PackagingFillingSubpage';
import { YieldWastageSubpage } from './production/YieldWastageSubpage';
import { MaintenanceDowntimeSubpage } from './production/MaintenanceDowntimeSubpage';

export type ProductionSubPageKey =
  | 'Batch Schedule'
  | 'Batch Formulation (BOM)'
  | 'Quality Control (QC Lab)'
  | 'Plant Machinery & OEE'
  | 'Material Consumption'
  | 'Packaging & Filling'
  | 'Yield & Wastage'
  | 'Maintenance & Downtime';

interface ProductionScreenProps {
  batches: ProductionBatch[];
  onAddBatch: (batch: ProductionBatch) => void;
  onUpdateBatchStatus: (batchId: string, status: ProductionBatch['status']) => void;
  activeSubPage?: string;
  onSelectSubPage?: (subpage: string) => void;
  onNavigateToScreen?: (screen: ScreenType) => void;
}

interface ProductionTabConfig {
  id: ProductionSubPageKey;
  label: string;
  icon: string;
  badge?: string;
  description: string;
}

const PRODUCTION_TABS: ProductionTabConfig[] = [
  {
    id: 'Batch Schedule',
    label: 'Batch Schedule',
    icon: 'fa-solid fa-calendar-days',
    badge: '6',
    description: 'Real-time manufacturing batch schedule, line assignment & live stage progression',
  },
  {
    id: 'Batch Formulation (BOM)',
    label: 'Batch Formulation (BOM)',
    icon: 'fa-solid fa-flask',
    description: 'Master paint recipes, raw material phase proportions & dynamic batch weight scaling',
  },
  {
    id: 'Quality Control (QC Lab)',
    label: 'Quality Control (QC Lab)',
    icon: 'fa-solid fa-flask-vial',
    badge: '4',
    description: 'Viscosity (KU), specific gravity, Hegman grind, Delta E spectrophotometer & COA generation',
  },
  {
    id: 'Plant Machinery & OEE',
    label: 'Plant Machinery & OEE',
    icon: 'fa-solid fa-gears',
    description: 'Dispersion tanks, bead mills, automatic packaging conveyors & live OEE scorecards',
  },
  {
    id: 'Material Consumption',
    label: 'Material Consumption',
    icon: 'fa-solid fa-dolly',
    badge: 'RMS',
    description: 'Store requisition slips, warehouse bin picking, lot numbers & BOM variance tracking',
  },
  {
    id: 'Packaging & Filling',
    label: 'Packaging & Filling',
    icon: 'fa-solid fa-box-open',
    description: '20kg valve bags, 20L / 10L pails, checkweighers, leak testers & inkjet batch coding',
  },
  {
    id: 'Yield & Wastage',
    label: 'Yield & Wastage',
    icon: 'fa-solid fa-chart-line-up',
    badge: '98.6%',
    description: 'Batch theoretical vs actual yield reconciliation, kettle residue & wash water recycling',
  },
  {
    id: 'Maintenance & Downtime',
    label: 'Maintenance & Downtime',
    icon: 'fa-solid fa-wrench',
    badge: '1',
    description: 'Machine stoppage logs, root cause analysis, MTTR tracking & preventive work orders',
  },
];

export const ProductionScreen: React.FC<ProductionScreenProps> = ({
  batches,
  onAddBatch,
  onUpdateBatchStatus,
  activeSubPage = 'Batch Schedule',
  onSelectSubPage,
}) => {
  const [currentTab, setCurrentTab] = useState<ProductionSubPageKey>(
    (activeSubPage as ProductionSubPageKey) || 'Batch Schedule'
  );

  // Sync when activeSubPage changes from sidebar
  React.useEffect(() => {
    if (activeSubPage && activeSubPage !== currentTab) {
      setCurrentTab(activeSubPage as ProductionSubPageKey);
    }
  }, [activeSubPage]);

  const handleTabChange = (tabId: ProductionSubPageKey) => {
    setCurrentTab(tabId);
    if (onSelectSubPage) {
      onSelectSubPage(tabId);
    }
  };

  const handleUpdateBatchProgress = (batchId: string, produced: number) => {
    // Progress updated within subpage
  };

  const currentTabConfig = PRODUCTION_TABS.find((t) => t.id === currentTab) || PRODUCTION_TABS[0];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Production Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold shadow-2xs">
              <i className="fa-solid fa-industry" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Plant Operations &amp; Production Floor
              </h2>
              <p className="text-xs text-slate-500">
                Swatch Paints Factory #01 (Jaipur) &amp; Plant #02 (Bundi) · High-shear dispersion, automated packaging, QC &amp; chemical engineering.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Plant Shift: Morning (06:00 - 14:30)</span>
          </div>
        </div>
      </div>

      {/* Production Sub-Pages Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 bg-slate-50/50 px-2 pt-2">
          {PRODUCTION_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition relative border-b-2 ${
                  isActive
                    ? 'bg-white text-slate-900 border-amber-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 border-transparent'
                }`}
              >
                <i
                  className={`${tab.icon} text-xs ${
                    isActive ? 'text-amber-600' : 'text-slate-400'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Context Subtitle */}
        <div className="px-5 py-2.5 bg-white flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
          <span className="flex items-center gap-2 font-medium">
            <i className="fa-solid fa-circle-info text-amber-500 text-[11px]" />
            {currentTabConfig.description}
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
            Active Sub-Page: {currentTab}
          </span>
        </div>
      </div>

      {/* Render Active Subpage */}
      <div>
        {currentTab === 'Batch Schedule' && (
          <BatchScheduleSubpage
            batches={batches}
            onAddBatch={onAddBatch}
            onUpdateBatchStatus={onUpdateBatchStatus}
            onUpdateBatchProgress={handleUpdateBatchProgress}
          />
        )}

        {currentTab === 'Batch Formulation (BOM)' && <BatchFormulationSubpage />}

        {currentTab === 'Quality Control (QC Lab)' && <QualityControlSubpage />}

        {currentTab === 'Plant Machinery & OEE' && <PlantMachinerySubpage />}

        {currentTab === 'Material Consumption' && <MaterialConsumptionSubpage />}

        {currentTab === 'Packaging & Filling' && <PackagingFillingSubpage />}

        {currentTab === 'Yield & Wastage' && <YieldWastageSubpage />}

        {currentTab === 'Maintenance & Downtime' && <MaintenanceDowntimeSubpage />}
      </div>
    </div>
  );
};
