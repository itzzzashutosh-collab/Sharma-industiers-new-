import React, { useState } from 'react';
import { BrandSurveyNpsRecord } from '../../../types/erp';

interface BrandNpsSubpageProps {
  surveys: BrandSurveyNpsRecord[];
  onAddSurvey: (survey: BrandSurveyNpsRecord) => void;
}

export const BrandNpsSubpage: React.FC<BrandNpsSubpageProps> = ({
  surveys,
  onAddSurvey,
}) => {
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Survey Form State
  const [respondentType, setRespondentType] = useState<BrandSurveyNpsRecord['respondentType']>('Painter');
  const [respondentName, setRespondentName] = useState('');
  const [city, setCity] = useState('Kota');
  const [npsScore, setNpsScore] = useState(10);
  const [productRated, setProductRated] = useState('Swatch Ultra-White Polymer Putty');
  const [keyFeedback, setKeyFeedback] = useState('');
  const [whitenessRating, setWhitenessRating] = useState(5);
  const [coverageRating, setCoverageRating] = useState(5);
  const [workabilityRating, setWorkabilityRating] = useState(5);

  const filteredSurveys = surveys.filter(
    (s) => filterType === 'All' || s.respondentType === filterType
  );

  const promoters = surveys.filter((s) => s.npsScore >= 9).length;
  const passives = surveys.filter((s) => s.npsScore === 7 || s.npsScore === 8).length;
  const detractors = surveys.filter((s) => s.npsScore <= 6).length;
  const total = surveys.length || 1;
  const npsCalculated = Math.round(((promoters - detractors) / total) * 100);

  const avgWhiteness = (
    surveys.reduce((acc, s) => acc + s.whitenessRating, 0) / total
  ).toFixed(1);
  const avgCoverage = (
    surveys.reduce((acc, s) => acc + s.coverageRating, 0) / total
  ).toFixed(1);
  const avgWorkability = (
    surveys.reduce((acc, s) => acc + s.workabilityRating, 0) / total
  ).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondentName.trim()) return;

    const ratingCategory: BrandSurveyNpsRecord['ratingCategory'] =
      npsScore >= 9 ? 'Promoter' : npsScore >= 7 ? 'Passive' : 'Detractor';

    const newSurvey: BrandSurveyNpsRecord = {
      id: `nps-${Date.now()}`,
      respondentType,
      respondentName,
      city,
      npsScore,
      ratingCategory,
      keyFeedback,
      productRated,
      date: 'Today',
      whitenessRating,
      coverageRating,
      workabilityRating,
    };

    onAddSurvey(newSurvey);
    setIsModalOpen(false);
    setRespondentName('');
    setKeyFeedback('');
  };

  return (
    <div className="space-y-6">
      {/* Subpage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-heart" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Brand NPS &amp; Field Quality Feedback
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real market perception from painters, building contractors, hardware dealers &amp; homeowners.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <i className="fa-solid fa-plus text-[10px]" />
          <span>Record Field Feedback</span>
        </button>
      </div>

      {/* NPS Meter & Quality Scorecards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Net Promoter Score Hero Card */}
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Net Promoter Score (NPS)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-bold">
                World Class Tier
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-4xl font-black text-emerald-400">+{npsCalculated}</span>
              <span className="text-xs text-slate-300">NPS Index</span>
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Calculated across {surveys.length} verified trade surveys. 0-6 Detractors, 7-8 Passives, 9-10 Promoters.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-emerald-400 font-bold text-sm">
                {Math.round((promoters / total) * 100)}%
              </p>
              <p className="text-[10px] text-slate-300">Promoters ({promoters})</p>
            </div>
            <div>
              <p className="text-amber-300 font-bold text-sm">
                {Math.round((passives / total) * 100)}%
              </p>
              <p className="text-[10px] text-slate-300">Passives ({passives})</p>
            </div>
            <div>
              <p className="text-rose-400 font-bold text-sm">
                {Math.round((detractors / total) * 100)}%
              </p>
              <p className="text-[10px] text-slate-300">Detractors ({detractors})</p>
            </div>
          </div>
        </div>

        {/* Quality Dimensions Matrix */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Putty &amp; Paint Technical Field Benchmarks
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Pure Whiteness</span>
                <span className="text-xs font-black text-blue-600 font-mono">{avgWhiteness}/5</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${(Number(avgWhiteness) / 5) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">
                Hunter L-value &gt;94%. High visual purity praised by architects.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Square Feet Coverage</span>
                <span className="text-xs font-black text-emerald-600 font-mono">{avgCoverage}/5</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${(Number(avgCoverage) / 5) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">
                18-20 sq.ft / kg / 2 coats. Superior density coverage.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Blade Workability</span>
                <span className="text-xs font-black text-purple-600 font-mono">
                  {avgWorkability}/5
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full"
                  style={{ width: `${(Number(avgWorkability) / 5) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">
                Butter-smooth paste; effortless applicator glide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {['All', 'Painter', 'Dealer', 'Contractor', 'Homeowner'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === t
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Feedback Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSurveys.map((survey) => (
          <div
            key={survey.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {survey.respondentType}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{survey.respondentName}</h4>
                  <p className="text-[10px] text-slate-400">{survey.city}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md font-mono font-bold text-xs ${
                      survey.npsScore >= 9
                        ? 'bg-emerald-100 text-emerald-800'
                        : survey.npsScore >= 7
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    ★ {survey.npsScore}/10
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl text-xs italic text-slate-700 leading-relaxed">
                &ldquo;{survey.keyFeedback}&rdquo;
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-semibold text-slate-600 truncate">{survey.productRated}</span>
              <span>{survey.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Record Survey Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-amber-600 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Record Customer / Trade NPS Survey</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Respondent Type</label>
                  <select
                    value={respondentType}
                    onChange={(e) => setRespondentType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="Painter">Painter / Applicator</option>
                    <option value="Dealer">Authorized Dealer</option>
                    <option value="Contractor">Civil Contractor</option>
                    <option value="Homeowner">End Homeowner</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Respondent Name *</label>
                <input
                  type="text"
                  required
                  value={respondentName}
                  onChange={(e) => setRespondentName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra (Chandra Paints)"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">NPS Score (0 - 10) *</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={npsScore}
                  onChange={(e) => setNpsScore(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono font-bold text-base focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Product Evaluated</label>
                <input
                  type="text"
                  value={productRated}
                  onChange={(e) => setProductRated(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Verbatim Feedback &amp; Comments *</label>
                <textarea
                  rows={2}
                  required
                  value={keyFeedback}
                  onChange={(e) => setKeyFeedback(e.target.value)}
                  placeholder="Feedback on whiteness, finish, bag packaging, pricing..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
