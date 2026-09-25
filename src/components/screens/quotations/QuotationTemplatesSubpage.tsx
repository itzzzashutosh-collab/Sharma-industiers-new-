import React, { useState } from 'react';
import { QuotationTemplate } from '../../../types/erp';
import { INITIAL_QUOTATION_TEMPLATES, INITIAL_QUOTATIONS } from '../../../data/quotationsData';
import { QuotationPreviewDocument } from './QuotationPreviewDocument';
import { QuotationFullModalPreview } from './QuotationFullModalPreview';

interface QuotationTemplatesSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
  onSelectTemplateToCreate?: (templateId: string) => void;
}

export const QuotationTemplatesSubpage: React.FC<QuotationTemplatesSubpageProps> = ({
  onNavigateSubpage,
  onSelectTemplateToCreate,
}) => {
  const [templates, setTemplates] = useState<QuotationTemplate[]>(INITIAL_QUOTATION_TEMPLATES);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<QuotationTemplate | null>(null);
  const [defaultTemplateId, setDefaultTemplateId] = useState<string>('tmpl-modern');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New template form state
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCategory, setNewCategory] = useState<QuotationTemplate['category']>('Modern Standard');
  const [newThemeColor, setNewThemeColor] = useState('#2563eb');
  const [newBadgeText, setNewBadgeText] = useState('Custom Pro');

  const categories = ['All', 'Modern Standard', 'Industrial Bulk', 'Dealer Wholesale', 'Luxury Architectural', 'Government & Tender', 'Minimalist Receipt'];

  const filteredTemplates = templates.filter((t) => {
    if (activeCategory !== 'All' && t.category !== activeCategory) return false;
    return true;
  });

  const handleSetDefault = (id: string) => {
    setDefaultTemplateId(id);
    alert('Default quotation template updated!');
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newTmpl: QuotationTemplate = {
      id: `tmpl-${Date.now()}`,
      name: newName,
      tagline: newTagline || 'Customized commercial quotation format for Rajasthan market',
      category: newCategory,
      themeColor: newThemeColor,
      accentColor: '#f97316',
      fontStyle: 'font-sans',
      headerLayout: 'modern',
      badgeText: newBadgeText || 'Custom',
      watermark: true,
      termsTitle: 'Terms & Conditions:',
      terms: [
        'Prices valid for 15 days from quote date.',
        '50% advance along with order confirmation.',
        'Transportation extra unless specified.',
      ],
      showGstColumn: true,
      showHsn: true,
      showSignature: true,
      popularFor: 'Special trade partners & tenders',
    };

    setTemplates([newTmpl, ...templates]);
    setShowCreateModal(false);
    setNewName('');
    setNewTagline('');
    alert(`Template "${newTmpl.name}" created successfully!`);
  };

  // Sample quote used for previewing templates
  const sampleQuote = INITIAL_QUOTATIONS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
              🎨
            </span>
            <h2 className="text-xl font-black text-slate-900">Quotation Template Studio</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Choose from high-converting industry templates designed for Wholesale Dealers, Industrial Contractors, Luxury Architects, and Government Tenders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Design New Template</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((template) => {
          const isDefault = defaultTemplateId === template.id;

          return (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-purple-300 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header Strip with Color */}
                <div
                  className="h-20 p-4 flex items-start justify-between relative overflow-hidden text-white"
                  style={{ backgroundColor: template.themeColor }}
                >
                  <div className="z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/25 backdrop-blur-xs">
                      {template.category}
                    </span>
                    <h3 className="text-sm font-black mt-1 leading-tight">{template.name}</h3>
                  </div>

                  <span className="z-10 text-[10px] px-2 py-0.5 rounded-full font-bold bg-white text-slate-900 shadow-xs">
                    {template.badgeText}
                  </span>

                  {/* Decorative background circle */}
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10" />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 text-xs">
                  <p className="text-slate-600 leading-relaxed text-[11px] min-h-[34px]">
                    {template.tagline}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Best for:</span>
                      <span className="font-semibold text-slate-800 text-right max-w-[170px] truncate">
                        {template.popularFor}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Watermark:</span>
                      <span className="font-semibold text-slate-700">
                        {template.watermark ? 'Enabled' : 'None'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">HSN &amp; GST Columns:</span>
                      <span className="font-semibold text-slate-700">
                        {template.showGstColumn ? 'Compliant' : 'Simple Rate'}
                      </span>
                    </div>
                  </div>

                  {/* Sample Terms preview */}
                  <div className="text-[10px] text-slate-400 italic">
                    Includes {template.terms.length} pre-approved legal clauses
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                >
                  <span>👁️</span>
                  <span>Live Preview</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {isDefault ? (
                    <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                      ✓ Default
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(template.id)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
                    >
                      Set Default
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (onSelectTemplateToCreate) {
                        onSelectTemplateToCreate(template.id);
                      } else {
                        onNavigateSubpage('Create Quotation');
                      }
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition shadow-xs"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-Fidelity Full-Page Modal Preview */}
      {previewTemplate && (
        <QuotationFullModalPreview
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUseTemplate={(templateId) => {
            setPreviewTemplate(null);
            if (onSelectTemplateToCreate) {
              onSelectTemplateToCreate(templateId);
            } else {
              onNavigateSubpage('Create Quotation');
            }
          }}
          onSetDefaultTemplate={(templateId) => {
            handleSetDefault(templateId);
          }}
          isDefault={defaultTemplateId === previewTemplate.id}
        />
      )}

      {/* Create New Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Design Custom Quotation Template</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTemplate} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Template Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festive Diwali Wholesale Scheme"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tagline / Subtext</label>
                <input
                  type="text"
                  placeholder="e.g. Tailored for festive dealer bonuses & bumper discounts"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Modern Standard">Modern Standard</option>
                    <option value="Industrial Bulk">Industrial Bulk</option>
                    <option value="Dealer Wholesale">Dealer Wholesale</option>
                    <option value="Luxury Architectural">Luxury Architectural</option>
                    <option value="Government & Tender">Government &amp; Tender</option>
                    <option value="Minimalist Receipt">Minimalist Receipt</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Badge Text</label>
                  <input
                    type="text"
                    placeholder="e.g. VIP Dealer"
                    value={newBadgeText}
                    onChange={(e) => setNewBadgeText(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Theme Brand Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={newThemeColor}
                    onChange={(e) => setNewThemeColor(e.target.value)}
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={newThemeColor}
                    onChange={(e) => setNewThemeColor(e.target.value)}
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save &amp; Activate Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
