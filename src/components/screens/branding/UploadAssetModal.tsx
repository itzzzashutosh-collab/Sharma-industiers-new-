import React, { useState } from 'react';
import { BrandAssetRecord } from '../../types/erp';

interface UploadAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newAsset: BrandAssetRecord) => void;
}

export const UploadAssetModal: React.FC<UploadAssetModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BrandAssetRecord['category']>('Packaging Render');
  const [fileType, setFileType] = useState<BrandAssetRecord['fileType']>('PDF');
  const [fileSize, setFileSize] = useState('4.5 MB');
  const [version, setVersion] = useState('v1.0');
  const [tagsInput, setTagsInput] = useState('Brand, Packaging, 2025');
  const [description, setDescription] = useState('');
  const [previewColor, setPreviewColor] = useState('#0284c7');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const newAsset: BrandAssetRecord = {
        id: `asset-${Date.now()}`,
        assetCode: `BA-2025-${Math.floor(10 + Math.random() * 90)}`,
        title,
        category,
        fileType,
        fileSize,
        version,
        updatedDate: 'Just now',
        tags: tags.length ? tags : ['Branding', 'Swatch'],
        downloadsCount: 0,
        status: 'Approved',
        description: description || 'Official Swatch Paints brand collateral asset.',
        previewColor,
      };

      onUpload(newAsset);
      setIsUploading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-linear-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <i className="fa-solid fa-cloud-arrow-up text-lg" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Upload New Brand Asset</h3>
              <p className="text-xs text-slate-300">Publish high-resolution packaging, vector logos, or brochures</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
          {/* Dropzone Simulation */}
          <div className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-xl p-6 text-center bg-indigo-50/30 cursor-pointer transition">
            <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-indigo-100 mx-auto flex items-center justify-center text-indigo-600 mb-2">
              <i className="fa-solid fa-file-arrow-up text-xl" />
            </div>
            <p className="text-xs font-semibold text-slate-700">Drag & drop asset file or <span className="text-indigo-600 underline">browse files</span></p>
            <p className="text-[10px] text-slate-400 mt-1">Supports AI, EPS, SVG, PDF, PSD, 3D ZIP, PNG up to 250 MB</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Asset Title / Document Name *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Swatch Weatherguard 3D Bucket Dielines 2025"
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              >
                <option value="Packaging Render">Packaging Render</option>
                <option value="Logo & Icon">Logo & Vector Icon</option>
                <option value="Brochure & Catalog">Brochure & Catalog</option>
                <option value="Social Creative">Social Creative</option>
                <option value="Store Signage">Store Signage / Dieline</option>
                <option value="Typography & Guidelines">Typography & Guidelines</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">File Format</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              >
                <option value="PDF">PDF Document</option>
                <option value="SVG">SVG Vector</option>
                <option value="EPS">EPS Vector</option>
                <option value="AI">Adobe Illustrator (AI)</option>
                <option value="PNG">High-Res PNG</option>
                <option value="ZIP">ZIP Archive (Assets Pack)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Approx Size</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="4.5 MB"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Version</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v1.0"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Accent Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={previewColor}
                  onChange={(e) => setPreviewColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0.5"
                />
                <span className="text-[11px] font-mono text-slate-600">{previewColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Weatherguard, 20L, Dieline, Print Ready"
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Print Guidelines</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context, color specs, or target substrate information..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow-indigo-500/20 transition flex items-center space-x-2"
            >
              {isUploading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check text-xs" />
                  <span>Publish Asset</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
