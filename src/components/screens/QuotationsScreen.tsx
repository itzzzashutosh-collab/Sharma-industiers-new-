import React, { useState, useEffect } from 'react';
import { Order, ScreenType, QuotationRecord } from '../../types/erp';
import { QuotationsAllSubpage } from './quotations/QuotationsAllSubpage';
import { CreateQuotationSubpage } from './quotations/CreateQuotationSubpage';
import { QuotationDraftsSubpage } from './quotations/QuotationDraftsSubpage';
import { SentQuotationsSubpage } from './quotations/SentQuotationsSubpage';
import { ExpiredQuotationsSubpage } from './quotations/ExpiredQuotationsSubpage';
import { ConvertedOrdersSubpage } from './quotations/ConvertedOrdersSubpage';
import { QuotationTemplatesSubpage } from './quotations/QuotationTemplatesSubpage';
import { PriceListsSubpage } from './quotations/PriceListsSubpage';
import { INITIAL_QUOTATIONS } from '../../data/quotationsData';

export type QuotationSubPageKey =
  | 'All Quotations'
  | 'Create Quotation'
  | 'Drafts'
  | 'Sent Quotations'
  | 'Expired Quotations'
  | 'Converted to Orders'
  | 'Quotation Templates'
  | 'Price Lists';

interface QuotationsScreenProps {
  onConvertToOrder: (order: Order) => void;
  activeSubPage?: string;
  onSelectSubPage?: (subpage: string) => void;
  onNavigateToScreen?: (screen: ScreenType) => void;
}

interface QuotationTabConfig {
  id: QuotationSubPageKey;
  label: string;
  icon: string;
  badge?: string;
  description: string;
}

const QUOTATION_TABS: QuotationTabConfig[] = [
  {
    id: 'All Quotations',
    label: 'All Quotations',
    icon: '📄',
    badge: '220',
    description: 'Master quotation registry, filters, print preview and direct order conversion',
  },
  {
    id: 'Create Quotation',
    label: 'Create Quotation',
    icon: '➕',
    description: 'B2B commercial bid generator, price list discounting & live PDF calculation',
  },
  {
    id: 'Drafts',
    label: 'Drafts',
    icon: '📝',
    badge: '32',
    description: 'Pending commercial estimates under internal manager review',
  },
  {
    id: 'Sent Quotations',
    label: 'Sent Quotations',
    icon: '✈️',
    badge: '98',
    description: 'Proposals dispatched via WhatsApp and Email awaiting client acceptance',
  },
  {
    id: 'Expired Quotations',
    label: 'Expired Quotations',
    icon: '⏰',
    badge: '28',
    description: 'Lapsed validity estimates with 1-click renewal and re-quote capability',
  },
  {
    id: 'Converted to Orders',
    label: 'Converted to Orders',
    icon: '🛒',
    badge: '46',
    description: 'Won quotations converted into official factory sales orders',
  },
  {
    id: 'Quotation Templates',
    label: 'Quotation Templates',
    icon: '🎨',
    badge: '7',
    description: 'Visual template library for Dealers, Contractors, Luxury Homes & Govt Tenders',
  },
  {
    id: 'Price Lists',
    label: 'Price Lists',
    icon: '🏷️',
    badge: '6',
    description: 'Wholesale tiered rate cards and seasonal discount matrices',
  },
];

export const QuotationsScreen: React.FC<QuotationsScreenProps> = ({
  onConvertToOrder,
  activeSubPage = 'All Quotations',
  onSelectSubPage,
  onNavigateToScreen,
}) => {
  const [quotesList, setQuotesList] = useState<QuotationRecord[]>(INITIAL_QUOTATIONS);
  const [selectedTemplateForCreate, setSelectedTemplateForCreate] = useState<string>('tmpl-modern');

  const getNormalizedSubPage = (name: string): QuotationSubPageKey => {
    const found = QUOTATION_TABS.find(
      (t) =>
        t.id.toLowerCase() === name.toLowerCase() ||
        t.label.toLowerCase() === name.toLowerCase()
    );
    return found ? found.id : 'All Quotations';
  };

  const [currentTab, setCurrentTab] = useState<QuotationSubPageKey>(getNormalizedSubPage(activeSubPage));

  useEffect(() => {
    if (activeSubPage) {
      setCurrentTab(getNormalizedSubPage(activeSubPage));
    }
  }, [activeSubPage]);

  const handleTabChange = (tabId: QuotationSubPageKey) => {
    setCurrentTab(tabId);
    if (onSelectSubPage) {
      onSelectSubPage(tabId);
    }
  };

  const handleSaveNewQuote = (newQuote: QuotationRecord) => {
    setQuotesList([newQuote, ...quotesList]);
  };

  const activeTabMeta = QUOTATION_TABS.find((t) => t.id === currentTab) || QUOTATION_TABS[0];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto min-h-screen">
      {/* Top Breadcrumb & Page Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium mb-1">
            <span
              onClick={() => onNavigateToScreen && onNavigateToScreen('dashboard')}
              className="hover:text-blue-600 cursor-pointer transition"
            >
              Dashboard
            </span>
            <span>/</span>
            <span
              onClick={() => handleTabChange('All Quotations')}
              className="text-slate-700 font-semibold cursor-pointer hover:text-blue-600"
            >
              Quotations
            </span>
            <span>/</span>
            <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {activeTabMeta.label}
            </span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="text-2xl">{activeTabMeta.icon}</span>
            <span>{activeTabMeta.label}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">{activeTabMeta.description}</p>
        </div>

        {/* Mobile Dropdown Switcher */}
        <div className="sm:hidden w-full">
          <select
            value={currentTab}
            onChange={(e) => handleTabChange(e.target.value as QuotationSubPageKey)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {QUOTATION_TABS.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.icon} {tab.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Horizontal Sub-Pages Tab Navigation Bar */}
      <div className="hidden sm:flex items-center space-x-1 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto no-scrollbar">
        {QUOTATION_TABS.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
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

      {/* Active Subpage Component Rendering */}
      <div>
        {currentTab === 'All Quotations' && (
          <QuotationsAllSubpage
            onNavigateSubpage={(sub) => handleTabChange(getNormalizedSubPage(sub))}
            onOpenCreateQuotation={() => handleTabChange('Create Quotation')}
            onConvertToOrder={onConvertToOrder}
          />
        )}

        {currentTab === 'Create Quotation' && (
          <CreateQuotationSubpage
            onBack={() => handleTabChange('All Quotations')}
            onSaveQuote={handleSaveNewQuote}
            initialTemplateId={selectedTemplateForCreate}
          />
        )}

        {currentTab === 'Drafts' && (
          <QuotationDraftsSubpage
            onNavigateSubpage={(sub) => handleTabChange(getNormalizedSubPage(sub))}
            onOpenCreateQuotation={() => handleTabChange('Create Quotation')}
            onConvertToOrder={onConvertToOrder}
          />
        )}

        {currentTab === 'Sent Quotations' && (
          <SentQuotationsSubpage
            onNavigateSubpage={(sub) => handleTabChange(getNormalizedSubPage(sub))}
            onOpenCreateQuotation={() => handleTabChange('Create Quotation')}
            onConvertToOrder={onConvertToOrder}
          />
        )}

        {currentTab === 'Expired Quotations' && (
          <ExpiredQuotationsSubpage
            onNavigateSubpage={(sub) => handleTabChange(getNormalizedSubPage(sub))}
            onOpenCreateQuotation={() => handleTabChange('Create Quotation')}
            onConvertToOrder={onConvertToOrder}
          />
        )}

        {currentTab === 'Converted to Orders' && (
          <ConvertedOrdersSubpage
            onNavigateSubpage={(sub) => handleTabChange(getNormalizedSubPage(sub))}
            onOpenCreateQuotation={() => handleTabChange('Create Quotation')}
            onConvertToOrder={onConvertToOrder}
          />
        )}

        {currentTab === 'Quotation Templates' && (
          <QuotationTemplatesSubpage
            onNavigateSubpage={(sub) => handleTabChange(getNormalizedSubPage(sub))}
            onSelectTemplateToCreate={(tmplId) => {
              setSelectedTemplateForCreate(tmplId);
              handleTabChange('Create Quotation');
            }}
          />
        )}

        {currentTab === 'Price Lists' && (
          <PriceListsSubpage
            onNavigateSubpage={(sub) => handleTabChange(getNormalizedSubPage(sub))}
          />
        )}
      </div>
    </div>
  );
};
