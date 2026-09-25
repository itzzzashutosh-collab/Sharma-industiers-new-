import React, { useState } from 'react';
import { ProductionBOMRecipe } from '../../../types/erp';
import { INITIAL_BOM_RECIPES } from '../../../data/productionData';

export const BatchFormulationSubpage: React.FC = () => {
  const [recipes, setRecipes] = useState<ProductionBOMRecipe[]>(INITIAL_BOM_RECIPES);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || '');
  const [scalingBatchKg, setScalingBatchKg] = useState<number>(recipes[0]?.standardBatchSizeKg || 1000);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];

  // Scale multiplier
  const multiplier = scalingBatchKg / (selectedRecipe.standardBatchSizeKg || 1000);

  const filteredRecipes = recipes.filter(
    (r) =>
      r.recipeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner and Formulation Search */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-flask" />
            </span>
            <h2 className="text-base font-black text-slate-900">
              Master Bill of Materials (BOM) &amp; Chemical Formulations
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standard chemical recipes, raw material phase proportions, high-shear dispersion instructions, and batch scaling.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search formulations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56 font-medium"
            />
          </div>
          <button
            onClick={() => setShowAddRecipeModal(true)}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-plus text-[10px]" />
            <span>New Recipe</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Recipe List Sidebar (left) + Interactive Recipe Builder / Scaler (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recipe Selection Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1">
            Approved Master Paint Recipes ({filteredRecipes.length})
          </span>

          <div className="space-y-2.5">
            {filteredRecipes.map((rec) => {
              const isSelected = rec.id === selectedRecipe.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => {
                    setSelectedRecipeId(rec.id);
                    setScalingBatchKg(rec.standardBatchSizeKg);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-xs select-none ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-200 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-white border border-slate-200 text-indigo-700 shadow-2xs">
                      {rec.recipeCode}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {rec.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 mt-2 text-xs leading-snug">
                    {rec.productName}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">
                        Std Batch
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        {rec.standardBatchSizeKg.toLocaleString()} kg
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">
                        Cycle Time
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        {rec.cycleTimeHours} Hours
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recipe Detailed View & Interactive Batch Scaler (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header Card for Selected Recipe */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-black text-sm px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200">
                    {selectedRecipe.recipeCode}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {selectedRecipe.revision}
                  </span>
                </div>
                <h2 className="text-base font-black text-slate-900 mt-1">
                  {selectedRecipe.productName}
                </h2>
                <span className="text-xs text-slate-500">
                  Approved by {selectedRecipe.approvedBy} · Paint Manufacturing Specification
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-print text-[11px]" />
                  <span>Print Formula</span>
                </button>
              </div>
            </div>

            {/* Target Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Viscosity</span>
                <span className="font-mono font-bold text-slate-800 block mt-0.5">
                  {selectedRecipe.viscosityTarget}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Density</span>
                <span className="font-mono font-bold text-slate-800 block mt-0.5">
                  {selectedRecipe.densityTarget}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Fineness</span>
                <span className="font-mono font-bold text-slate-800 block mt-0.5">
                  {selectedRecipe.grindFinenessTarget}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">pH Range</span>
                <span className="font-mono font-bold text-slate-800 block mt-0.5">
                  {selectedRecipe.phTarget}
                </span>
              </div>
            </div>

            {/* Interactive Batch Scaling Tool */}
            <div className="p-4 bg-gradient-to-r from-indigo-50/70 to-blue-50/70 border border-indigo-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-slate-900 block font-bold text-xs flex items-center gap-1.5">
                  <i className="fa-solid fa-calculator text-indigo-600" /> Dynamic Batch Scaling Calculator
                </strong>
                <span className="text-[11px] text-slate-600">
                  Scale formulation ingredients dynamically for plant batch reactor capacity.
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
                  Desired Batch Output:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="250"
                    min="250"
                    max="50000"
                    value={scalingBatchKg}
                    onChange={(e) => setScalingBatchKg(parseFloat(e.target.value) || 1000)}
                    className="w-28 pl-2.5 pr-8 py-1.5 text-xs font-mono font-bold bg-white border border-indigo-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
                    kg
                  </span>
                </div>
                <button
                  onClick={() => setScalingBatchKg(selectedRecipe.standardBatchSizeKg)}
                  title="Reset to Standard 1,000kg"
                  className="px-2 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Scaled Bill of Materials Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Formula Ingredients Breakdown ({selectedRecipe.ingredients.length} Components)
              </h3>
              <span className="text-[11px] text-indigo-700 font-mono font-bold">
                Scaled Total: {scalingBatchKg.toLocaleString()} kg ({multiplier.toFixed(2)}x)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">#</th>
                    <th className="py-2.5 px-4">Raw Material Component</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4">Phase / Addition Stage</th>
                    <th className="py-2.5 px-4 text-right">Standard %</th>
                    <th className="py-2.5 px-4 text-right font-bold text-indigo-700">
                      Scaled Qty ({scalingBatchKg} kg)
                    </th>
                    <th className="py-2.5 px-4 text-center">Tolerance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {selectedRecipe.ingredients.map((ing, idx) => {
                    const scaledQuantity = (ing.percentage / 100) * scalingBatchKg;
                    return (
                      <tr key={ing.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{idx + 1}</td>
                        <td className="py-3 px-4">
                          <strong className="text-slate-900 block font-semibold">
                            {ing.rawMaterialName}
                          </strong>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ing.category === 'Pigment'
                                ? 'bg-amber-100 text-amber-800'
                                : ing.category === 'Polymer Binder'
                                ? 'bg-blue-100 text-blue-800'
                                : ing.category === 'Extender / Filler'
                                ? 'bg-stone-100 text-stone-700'
                                : ing.category === 'Additive'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-cyan-100 text-cyan-800'
                            }`}
                          >
                            {ing.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 text-[11px]">
                          <span className="font-mono text-[10px]">{ing.phase}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold">
                          {ing.percentage.toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-black text-indigo-700 tabular-nums">
                          {scaledQuantity.toFixed(1)} {ing.unit}
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-[10px] text-slate-400">
                          ±{ing.tolerancePercent}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mixing Sequence Standard Operating Procedure (SOP) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <i className="fa-solid fa-list-check text-indigo-600" />
              Standard Mixing &amp; Grinding Procedure (SOP)
            </h3>

            <div className="space-y-2.5">
              {selectedRecipe.mixingInstructions.map((inst, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">{inst}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add New Recipe Modal */}
      {showAddRecipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setShowAddRecipeModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-flask" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Create Paint Master Formula</h3>
                  <p className="text-xs text-slate-500">
                    Register a new formulation code and standard manufacturing parameters.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddRecipeModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddRecipeModal(false);
              }}
              className="space-y-3.5 mt-4 text-xs font-semibold text-slate-700"
            >
              <div>
                <label className="block mb-1 text-slate-600">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Swatch Polyurethane Floor Coating"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Recipe Code</label>
                  <input
                    type="text"
                    defaultValue="REC-FLR-05"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Category</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium">
                    <option value="Interior Emulsion">Interior Emulsion</option>
                    <option value="Exterior Weatherproof">Exterior Weatherproof</option>
                    <option value="Wall Primer">Wall Primer</option>
                    <option value="Texture / Distemper">Texture / Distemper</option>
                    <option value="Enamel & Gloss">Enamel &amp; Gloss</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600">Standard Batch Size (kg)</label>
                  <input
                    type="number"
                    defaultValue={1000}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600">Cycle Time (Hours)</label>
                  <input
                    type="number"
                    defaultValue={3.5}
                    step="0.5"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRecipeModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Save Formula
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
