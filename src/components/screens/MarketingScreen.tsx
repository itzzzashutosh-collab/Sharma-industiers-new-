import React, { useState } from 'react';
import {
  MarketingCampaignRecord,
  PainterLoyaltyMember,
  DealerBrandingRecord,
  OutdoorMediaRecord,
  MerchandiseItemRecord,
  MarketingEventRecord,
  DigitalAdCampaignRecord,
  BrandSurveyNpsRecord,
} from '../../types/erp';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_PAINTERS,
  INITIAL_DEALER_BRANDINGS,
  INITIAL_OUTDOOR_MEDIA,
  INITIAL_MERCHANDISE,
  INITIAL_EVENTS,
  INITIAL_DIGITAL_ADS,
  INITIAL_NPS_SURVEYS,
} from '../../data/marketingData';

import { MarketingDashboardSubpage } from './marketing/MarketingDashboardSubpage';
import { CampaignsSubpage } from './marketing/CampaignsSubpage';
import { PainterLoyaltySubpage } from './marketing/PainterLoyaltySubpage';
import { DealerBrandingSubpage } from './marketing/DealerBrandingSubpage';
import { OutdoorMediaSubpage } from './marketing/OutdoorMediaSubpage';
import { MerchandiseInventorySubpage } from './marketing/MerchandiseInventorySubpage';
import { MarketingEventsSubpage } from './marketing/MarketingEventsSubpage';
import { DigitalPerformanceSubpage } from './marketing/DigitalPerformanceSubpage';
import { BrandNpsSubpage } from './marketing/BrandNpsSubpage';

import { NewCampaignModal } from './marketing/NewCampaignModal';
import { PainterScanModal } from './marketing/PainterScanModal';
import { NewBrandingRequestModal } from './marketing/NewBrandingRequestModal';
import { ShowcaseCarousel } from '../ShowcaseCarousel';

interface MarketingScreenProps {
  activeSubPage?: string;
  onSelectSubPage?: (subPage: string) => void;
  onInquireProduct?: (productTitle: string) => void;
}

const TABS = [
  { id: 'Marketing Dashboard', label: 'Marketing Dashboard', icon: 'fa-solid fa-chart-pie' },
  { id: 'Campaigns & Promotions', label: 'Campaigns & Promotions', icon: 'fa-solid fa-bullhorn' },
  { id: 'Painter Loyalty (Ustaad Club)', label: 'Painter Loyalty (Ustaad)', icon: 'fa-solid fa-paintbrush' },
  { id: 'Dealer Co-Op & Shop Branding', label: 'Dealer Co-Op Branding', icon: 'fa-solid fa-store' },
  { id: 'Outdoor & Highway Hoardings', label: 'Outdoor & Hoardings', icon: 'fa-solid fa-signs-post' },
  { id: 'Sample Kits & Merchandising', label: 'Sample Kits & Collateral', icon: 'fa-solid fa-boxes-packing' },
  { id: 'Architect & Contractor Meets', label: 'Architect & Contractor Meets', icon: 'fa-solid fa-champagne-glasses' },
  { id: 'Digital Ads & Performance', label: 'Digital Ads & Growth', icon: 'fa-solid fa-chart-line' },
  { id: 'Brand NPS & Market Research', label: 'Brand NPS & Feedback', icon: 'fa-solid fa-heart' },
];

export const MarketingScreen: React.FC<MarketingScreenProps> = ({
  activeSubPage,
  onSelectSubPage,
  onInquireProduct,
}) => {
  const [internalSubPage, setInternalSubPage] = useState('Marketing Dashboard');
  const currentSubPage = activeSubPage || internalSubPage;

  const handleSubPageChange = (tabId: string) => {
    setInternalSubPage(tabId);
    onSelectSubPage?.(tabId);
  };

  // Marketing State
  const [campaigns, setCampaigns] = useState<MarketingCampaignRecord[]>(INITIAL_CAMPAIGNS);
  const [painters, setPainters] = useState<PainterLoyaltyMember[]>(INITIAL_PAINTERS);
  const [dealerBrandings, setDealerBrandings] = useState<DealerBrandingRecord[]>(INITIAL_DEALER_BRANDINGS);
  const [outdoorMedia, setOutdoorMedia] = useState<OutdoorMediaRecord[]>(INITIAL_OUTDOOR_MEDIA);
  const [merchandise, setMerchandise] = useState<MerchandiseItemRecord[]>(INITIAL_MERCHANDISE);
  const [events, setEvents] = useState<MarketingEventRecord[]>(INITIAL_EVENTS);
  const [digitalAds, setDigitalAds] = useState<DigitalAdCampaignRecord[]>(INITIAL_DIGITAL_ADS);
  const [npsSurveys, setNpsSurveys] = useState<BrandSurveyNpsRecord[]>(INITIAL_NPS_SURVEYS);

  // Modals state
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [isPainterScanOpen, setIsPainterScanOpen] = useState(false);
  const [isNewBrandingOpen, setIsNewBrandingOpen] = useState(false);

  // Handlers
  const handleAddCampaign = (newCamp: MarketingCampaignRecord) => {
    setCampaigns([newCamp, ...campaigns]);
  };

  const handleUpdateCampaignStatus = (id: string, newStatus: MarketingCampaignRecord['status']) => {
    setCampaigns(campaigns.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
  };

  const handlePainterScanSuccess = (painterId: string, pointsEarned: number, cashbackAmount: number) => {
    setPainters((prev) =>
      prev.map((p) => {
        if (p.id === painterId) {
          return {
            ...p,
            totalPointsEarned: p.totalPointsEarned + pointsEarned,
            pointsBalance: p.pointsBalance + pointsEarned,
            totalCouponsScanned: p.totalCouponsScanned + 1,
            lifetimeCashbackClaimed: p.lifetimeCashbackClaimed + cashbackAmount,
            lastScanDate: '12 Aug 2025',
          };
        }
        return p;
      })
    );
  };

  const handleQuickPayout = (painterId: string, amount: number) => {
    setPainters((prev) =>
      prev.map((p) => {
        if (p.id === painterId) {
          const pointsDeducted = Math.min(p.pointsBalance, Math.round(amount * 1.5));
          return {
            ...p,
            pointsBalance: Math.max(0, p.pointsBalance - pointsDeducted),
            lifetimeCashbackClaimed: p.lifetimeCashbackClaimed + amount,
          };
        }
        return p;
      })
    );
  };

  const handleAddBranding = (newRecord: DealerBrandingRecord) => {
    setDealerBrandings([newRecord, ...dealerBrandings]);
  };

  const handleUpdateBrandingStatus = (id: string, newStatus: DealerBrandingRecord['status']) => {
    setDealerBrandings(
      dealerBrandings.map((b) =>
        b.id === id ? { ...b, status: newStatus, verifiedBy: 'Vikramaditya Rathore' } : b
      )
    );
  };

  const handleRenewOutdoorSite = (id: string) => {
    setOutdoorMedia(
      outdoorMedia.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'Active Display',
              daysLeft: 180,
              endDate: '28 Feb 2026',
            }
          : s
      )
    );
  };

  const handleAllocateStock = (itemId: string, qty: number, _recipient: string) => {
    setMerchandise(
      merchandise.map((m) =>
        m.id === itemId
          ? {
              ...m,
              currentStock: Math.max(0, m.currentStock - qty),
              allocatedThisMonth: m.allocatedThisMonth + qty,
              status: m.currentStock - qty <= m.minimumBuffer ? 'Low Stock' : 'In Stock',
            }
          : m
      )
    );
  };

  const handleAddEvent = (newEvent: MarketingEventRecord) => {
    setEvents([newEvent, ...events]);
  };

  const handleToggleDigitalAd = (id: string) => {
    setDigitalAds(
      digitalAds.map((ad) =>
        ad.id === id
          ? { ...ad, status: ad.status === 'Running' ? 'Paused' : 'Running' }
          : ad
      )
    );
  };

  const handleAddNpsSurvey = (newSurvey: BrandSurveyNpsRecord) => {
    setNpsSurveys([newSurvey, ...npsSurveys]);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-base font-bold shadow-2xs">
              <i className="fa-solid fa-bullhorn" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Marketing, Branding &amp; Growth
              </h2>
              <p className="text-xs text-slate-500">
                Swatch Paints &amp; Polymer Putty · Hadoti &amp; Rajasthan Regional Brand Management
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsPainterScanOpen(true)}
            className="px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition flex items-center gap-1.5 shadow-2xs"
          >
            <i className="fa-solid fa-qrcode text-[11px]" />
            <span>Scan QR Coupon</span>
          </button>

          <button
            onClick={() => setIsNewCampaignOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>Launch Campaign</span>
          </button>
        </div>
      </div>

      {/* Horizontal Subpages Navigation Tabs */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto">
        <div className="flex items-center space-x-1 min-w-max">
          {TABS.map((tab) => {
            const isActive = currentSubPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSubPageChange(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <i className={`${tab.icon} text-[11px]`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Subpage Rendering */}
      <div>
        {currentSubPage === 'Marketing Dashboard' && (
          <div className="space-y-6">
            <MarketingDashboardSubpage
              campaigns={campaigns}
              painters={painters}
              dealerBrandings={dealerBrandings}
              outdoorMedia={outdoorMedia}
              digitalAds={digitalAds}
              npsSurveys={npsSurveys}
              onNavigateTab={handleSubPageChange}
              onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
              onOpenPainterScan={() => setIsPainterScanOpen(true)}
              onOpenNewBranding={() => setIsNewBrandingOpen(true)}
            />

            {/* Showcase Carousel */}
            <div className="pt-2">
              <ShowcaseCarousel
                onSelectSlideAction={(slide) => {
                  if (onInquireProduct) {
                    onInquireProduct(slide.title);
                  }
                }}
              />
            </div>
          </div>
        )}

        {currentSubPage === 'Campaigns & Promotions' && (
          <CampaignsSubpage
            campaigns={campaigns}
            onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
            onUpdateCampaignStatus={handleUpdateCampaignStatus}
          />
        )}

        {currentSubPage === 'Painter Loyalty (Ustaad Club)' && (
          <PainterLoyaltySubpage
            painters={painters}
            onOpenPainterScan={() => setIsPainterScanOpen(true)}
            onQuickPayout={handleQuickPayout}
          />
        )}

        {currentSubPage === 'Dealer Co-Op & Shop Branding' && (
          <DealerBrandingSubpage
            brandings={dealerBrandings}
            onOpenNewBranding={() => setIsNewBrandingOpen(true)}
            onUpdateStatus={handleUpdateBrandingStatus}
          />
        )}

        {currentSubPage === 'Outdoor & Highway Hoardings' && (
          <OutdoorMediaSubpage
            sites={outdoorMedia}
            onRenewSite={handleRenewOutdoorSite}
          />
        )}

        {currentSubPage === 'Sample Kits & Merchandising' && (
          <MerchandiseInventorySubpage
            items={merchandise}
            onAllocateStock={handleAllocateStock}
          />
        )}

        {currentSubPage === 'Architect & Contractor Meets' && (
          <MarketingEventsSubpage
            events={events}
            onAddEvent={handleAddEvent}
          />
        )}

        {currentSubPage === 'Digital Ads & Performance' && (
          <DigitalPerformanceSubpage
            ads={digitalAds}
            onToggleAdStatus={handleToggleDigitalAd}
          />
        )}

        {currentSubPage === 'Brand NPS & Market Research' && (
          <BrandNpsSubpage
            surveys={npsSurveys}
            onAddSurvey={handleAddNpsSurvey}
          />
        )}
      </div>

      {/* Global Modals */}
      <NewCampaignModal
        isOpen={isNewCampaignOpen}
        onClose={() => setIsNewCampaignOpen(false)}
        onAddCampaign={handleAddCampaign}
      />

      <PainterScanModal
        isOpen={isPainterScanOpen}
        onClose={() => setIsPainterScanOpen(false)}
        painters={painters}
        onScanSuccess={handlePainterScanSuccess}
      />

      <NewBrandingRequestModal
        isOpen={isNewBrandingOpen}
        onClose={() => setIsNewBrandingOpen(false)}
        onAddBranding={handleAddBranding}
      />
    </div>
  );
};
