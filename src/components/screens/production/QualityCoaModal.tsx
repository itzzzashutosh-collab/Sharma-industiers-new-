import React from 'react';
import { QualityTestRecord } from '../../../types/erp';

interface QualityCoaModalProps {
  testRecord: QualityTestRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QualityCoaModal: React.FC<QualityCoaModalProps> = ({
  testRecord,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !testRecord) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-file-certificate" />
            </span>
            <div>
              <h3 className="text-sm font-bold leading-tight">
                Certificate of Analysis (COA) Preview
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {testRecord.coaNumber} · Batch: {testRecord.batchNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-xs"
            >
              <i className="fa-solid fa-print text-[11px]" />
              <span>Print COA</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Document */}
        <div className="p-6 md:p-8 overflow-y-auto bg-slate-100 flex justify-center">
          <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border border-slate-300 text-slate-800 space-y-6 text-xs">
            {/* Certificate Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 bg-blue-700 text-white font-black rounded flex items-center justify-center text-sm">
                    S
                  </span>
                  <span className="text-base font-black tracking-wider uppercase text-slate-900">
                    Swatch Paints Manufacturing Ltd.
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Plant #01: RIICO Industrial Area, Mansarovar, Jaipur, Rajasthan 302020
                </p>
                <p className="text-[10px] text-slate-500">
                  NABL Accredited Quality Testing Lab · ISO 9001:2015 &amp; ISO 14001:2015 Certified
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Document No.
                </span>
                <span className="font-mono font-black text-sm text-blue-700 block">
                  {testRecord.coaNumber}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Date: {testRecord.sampleTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center py-1 bg-slate-50 border border-slate-200 rounded-lg">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
                Official Certificate of Analysis (COA)
              </h2>
              <span className="text-[10px] text-slate-500 font-semibold">
                Conforming to Indian Standard Specification (IS:15489-2004)
              </span>
            </div>

            {/* Product & Batch Specs */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/70 border border-slate-200 rounded-xl">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Product</span>
                <strong className="text-xs font-bold text-slate-900">{testRecord.productName}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Batch Number</span>
                <strong className="text-xs font-mono font-bold text-blue-700">{testRecord.batchNumber}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Sample ID</span>
                <span className="font-mono font-bold text-slate-700">{testRecord.sampleCode}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Testing Laboratory</span>
                <span className="font-medium text-slate-700">{testRecord.labLocation}</span>
              </div>
            </div>

            {/* Laboratory Test Results Table */}
            <div>
              <h4 className="text-[11px] font-black uppercase text-slate-700 mb-2">
                Physicochemical Laboratory Test Results
              </h4>
              <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-[10px] font-bold uppercase text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Test Parameter</th>
                    <th className="p-2.5">Test Method</th>
                    <th className="p-2.5">Specification Target</th>
                    <th className="p-2.5 text-right">Observed Value</th>
                    <th className="p-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Viscosity (30°C)</td>
                    <td className="p-2.5 text-slate-500 font-mono">ASTM D562</td>
                    <td className="p-2.5 font-mono text-slate-600">{testRecord.viscosityTarget}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-slate-900">
                      {testRecord.viscosityKU} KU
                    </td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Specific Gravity / Density</td>
                    <td className="p-2.5 text-slate-500 font-mono">IS 101 (Part 1/Sec 2)</td>
                    <td className="p-2.5 font-mono text-slate-600">{testRecord.sgTarget}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-slate-900">
                      {testRecord.specificGravity} g/ml
                    </td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Specular Gloss @ 60°</td>
                    <td className="p-2.5 text-slate-500 font-mono">ASTM D523</td>
                    <td className="p-2.5 font-mono text-slate-600">{testRecord.glossTarget}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-slate-900">
                      {testRecord.gloss60Deg}°
                    </td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Fineness of Grind</td>
                    <td className="p-2.5 text-slate-500 font-mono">ISO 1524 (Hegman)</td>
                    <td className="p-2.5 font-mono text-slate-600">{testRecord.finenessTarget}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-slate-900">
                      {testRecord.finenessMicrons} µm
                    </td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Wet Opacity / Contrast Ratio</td>
                    <td className="p-2.5 text-slate-500 font-mono">IS 101 (Part 4/Sec 1)</td>
                    <td className="p-2.5 font-mono text-slate-600">{testRecord.opacityTarget}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-slate-900">
                      {testRecord.wetOpacityPercent}%
                    </td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">pH Value</td>
                    <td className="p-2.5 text-slate-500 font-mono">Digital pH Probe</td>
                    <td className="p-2.5 font-mono text-slate-600">{testRecord.phTarget}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-slate-900">
                      {testRecord.phValue}
                    </td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">PASS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Color Shade Variance (ΔE)</td>
                    <td className="p-2.5 text-slate-500 font-mono">CIE L*a*b* D65/10°</td>
                    <td className="p-2.5 font-mono text-slate-600">{testRecord.deltaETarget}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-slate-900">
                      {testRecord.deltaEColor}
                    </td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">
                      {testRecord.deltaEColor <= 0.5 ? 'PASS' : 'WARN'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800">Drying Time (Touch Dry)</td>
                    <td className="p-2.5 text-slate-500 font-mono">IS 101 (Part 3/Sec 1)</td>
                    <td className="p-2.5 font-mono text-slate-600">{testRecord.dryingTarget}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-slate-900">
                      {testRecord.dryingTimeMin} mins
                    </td>
                    <td className="p-2.5 text-center font-bold text-emerald-600">PASS</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Verdict and remarks */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Chemist Evaluation &amp; Verdict
              </span>
              <p className="font-bold text-slate-800 mt-1">{testRecord.remarks}</p>
            </div>

            {/* Signatures */}
            <div className="pt-6 border-t border-slate-300 flex justify-between items-end text-center">
              <div>
                <div className="w-36 border-b border-slate-400 pb-1 mx-auto font-serif italic text-slate-700">
                  {testRecord.testedBy.split('(')[0]}
                </div>
                <span className="text-[10px] font-bold text-slate-700 block mt-1">
                  Tested By (QC Chemist)
                </span>
                <span className="text-[9px] text-slate-400">Jaipur Central QC Unit</span>
              </div>

              <div className="p-2 border-2 border-emerald-600 rounded-lg text-emerald-700 font-black text-[11px] uppercase tracking-widest rotate-[-3deg]">
                QUALITY VERIFIED · APPROVED FOR PACKAGING
              </div>

              <div>
                <div className="w-36 border-b border-slate-400 pb-1 mx-auto font-serif italic text-slate-700">
                  Dr. R.K. Singhal
                </div>
                <span className="text-[10px] font-bold text-slate-700 block mt-1">
                  Approved By (Head of R&amp;D / QA)
                </span>
                <span className="text-[9px] text-slate-400">Swatch Paints Technical Division</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition"
          >
            Close Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
