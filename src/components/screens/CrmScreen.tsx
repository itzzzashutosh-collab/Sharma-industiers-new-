import React, { useState, useEffect } from 'react';
import { Lead, ScreenType } from '../../types/erp';
import { LeadsManagementSubpage } from './crm/LeadsManagementSubpage';
import { CustomersDealersSubpage } from './crm/CustomersDealersSubpage';
import { PaintersSubpage } from './crm/PaintersSubpage';
import { ContractorsSubpage } from './crm/ContractorsSubpage';
import { FollowUpsTasksSubpage } from './crm/FollowUpsTasksSubpage';
import { MeetingsCallsSubpage } from './crm/MeetingsCallsSubpage';

export type CrmSubPageKey =
  | 'Leads Management'
  | 'Customers / Dealers'
  | 'Painters'
  | 'Contractors'
  | 'Follow-ups & Tasks'
  | 'Meetings & Calls';

interface CrmScreenProps {
  leads: Lead[];
  onOpenNewLead: () => void;
  onUpdateLeadStage: (leadId: string, newStage: Lead['stage']) => void;
  activeSubPage?: string;
  onSelectSubPage?: (subpage: string) => void;
  onNavigateToScreen?: (screen: ScreenType) => void;
}

interface CrmTabConfig {
  id: CrmSubPageKey;
  label: string;
  icon: string;
  badge?: string;
  description: string;
}

const CRM_TABS: CrmTabConfig[] = [
  {
    id: 'Leads Management',
    label: 'Leads Management',
    icon: '🎯',
    badge: '12',
    description: 'Visual Kanban pipeline, inbound channels & lead conversion tracking',
  },
  {
    id: 'Customers / Dealers',
    label: 'Customers / Dealers',
    icon: '🏪',
    badge: '240',
    description: 'Authorized dealer network, credit limits & purchase history',
  },
  {
    id: 'Painters',
    label: 'Painters Club',
    icon: '🖌️',
    badge: '180',
    description: 'Painter contractor loyalty rewards, QR token points & cash redemption',
  },
  {
    id: 'Contractors',
    label: 'Contractors',
    icon: '🏗️',
    badge: '36',
    description: 'Bulk construction builders, institutional projects & bag quotas',
  },
  {
    id: 'Follow-ups & Tasks',
    label: 'Follow-ups & Tasks',
    icon: '✓',
    badge: '8',
    description: 'Automated dealer call reminders, overdue collection tasks & schedule',
  },
  {
    id: 'Meetings & Calls',
    label: 'Meetings & Calls',
    icon: '📞',
    description: 'Daily counter visit logs, field representative discussions & outcomes',
  },
];

export const CrmScreen: React.FC<CrmScreenProps> = ({
  leads,
  onOpenNewLead,
  onUpdateLeadStage,
  activeSubPage = 'Leads Management',
  onSelectSubPage,
  onNavigateToScreen,
}) => {
  // Normalize initial active subpage
  const getNormalizedSubPage = (name: string): CrmSubPageKey => {
    const found = CRM_TABS.find(
      t => t.id.toLowerCase() === name.toLowerCase() || t.label.toLowerCase() === name.toLowerCase()
    );
    return found ? found.id : 'Leads Management';
  };

  const [currentTab, setCurrentTab] = useState<CrmSubPageKey>(getNormalizedSubPage(activeSubPage));

  useEffect(() => {
    if (activeSubPage) {
      setCurrentTab(getNormalizedSubPage(activeSubPage));
    }
  }, [activeSubPage]);

  const handleTabChange = (tabId: CrmSubPageKey) => {
    setCurrentTab(tabId);
    if (onSelectSubPage) {
      onSelectSubPage(tabId);
    }
  };

  const activeTabMeta = CRM_TABS.find(t => t.id === currentTab) || CRM_TABS[0];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto min-h-screen">
      {/* Top Breadcrumb & Page Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
        <div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium mb-1">
            <span
              onClick={() => onNavigateToScreen && onNavigateToScreen('dashboard')}
              className="hover:text-orange-600 cursor-pointer transition"
            >
              Dashboard
            </span>
            <span>/</span>
            <span
              onClick={() => handleTabChange('Leads Management')}
              className="text-gray-700 font-semibold cursor-pointer hover:text-orange-600"
            >
              CRM (Leads &amp; Customers)
            </span>
            <span>/</span>
            <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
              {activeTabMeta.label}
            </span>
          </div>

          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span className="text-2xl">{activeTabMeta.icon}</span>
            <span>{activeTabMeta.label}</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">{activeTabMeta.description}</p>
        </div>

        {/* Global Quick Switcher Dropdown on Mobile */}
        <div className="sm:hidden w-full">
          <select
            value={currentTab}
            onChange={e => handleTabChange(e.target.value as CrmSubPageKey)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          >
            {CRM_TABS.map(tab => (
              <option key={tab.id} value={tab.id}>
                {tab.icon} {tab.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Horizontal Sub-Pages Tab Navigation Bar */}
      <div className="hidden sm:flex items-center space-x-1 p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200/80 shadow-xs overflow-x-auto no-scrollbar">
        {CRM_TABS.map(tab => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200/80'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-200 text-gray-600'
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
        {currentTab === 'Leads Management' && (
          <LeadsManagementSubpage
            onNavigateSubpage={sub => handleTabChange(getNormalizedSubPage(sub))}
            onOpenNewLeadModal={onOpenNewLead}
          />
        )}

        {currentTab === 'Customers / Dealers' && (
          <CustomersDealersSubpage
            onNavigateSubpage={sub => handleTabChange(getNormalizedSubPage(sub))}
          />
        )}

        {currentTab === 'Painters' && (
          <PaintersSubpage
            onNavigateSubpage={sub => handleTabChange(getNormalizedSubPage(sub))}
          />
        )}

        {currentTab === 'Contractors' && (
          <ContractorsSubpage
            onNavigateSubpage={sub => handleTabChange(getNormalizedSubPage(sub))}
          />
        )}

        {currentTab === 'Follow-ups & Tasks' && (
          <FollowUpsTasksSubpage
            onNavigateSubpage={sub => handleTabChange(getNormalizedSubPage(sub))}
          />
        )}

        {currentTab === 'Meetings & Calls' && (
          <MeetingsCallsSubpage
            onNavigateSubpage={sub => handleTabChange(getNormalizedSubPage(sub))}
          />
        )}
      </div>
    </div>
  );
};
