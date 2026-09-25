import React, { useState } from 'react';
import { PainterLoyaltyMember } from '../../../types/erp';

interface PainterScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  painters: PainterLoyaltyMember[];
  onScanSuccess: (painterId: string, pointsEarned: number, cashbackAmount: number) => void;
}

export const PainterScanModal: React.FC<PainterScanModalProps> = ({
  isOpen,
  onClose,
  painters,
  onScanSuccess,
}) => {
  const [selectedPainterId, setSelectedPainterId] = useState(painters[0]?.id || '');
  const [productType, setProductType] = useState('Swatch Ultra-White Polymer Putty 40kg');
  const [batchCode, setBatchCode] = useState('SWP-2025-08-412');
  const [qrCodeToken, setQrCodeToken] = useState(`SWTCH-QR-${Math.floor(100000 + Math.random() * 900000)}`);
  const [scannedQuantity, setScannedQuantity] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReward, setCompletedReward] = useState<{
    points: number;
    cashback: number;
    upiRef: string;
    painterName: string;
  } | null>(null);

  if (!isOpen) return null;

  const selectedPainter = painters.find((p) => p.id === selectedPainterId) || painters[0];

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Calculate reward: e.g. 50 points per bag + ₹30 cashback per bag
      const points = scannedQuantity * 50;
      const cashback = scannedQuantity * 30;
      const upiRef = `UPI${Math.floor(100000000000 + Math.random() * 900000000000)}`;

      onScanSuccess(selectedPainter.id, points, cashback);

      setCompletedReward({
        points,
        cashback,
        upiRef,
        painterName: selectedPainter.name,
      });
      setIsProcessing(false);
    }, 800);
  };

  const handleReset = () => {
    setCompletedReward(null);
    setQrCodeToken(`SWTCH-QR-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-lg">
              <i className="fa-solid fa-qrcode" />
            </span>
            <div>
              <h3 className="text-base font-bold">Swatch Ustaad QR Coupon Scanner</h3>
              <p className="text-xs text-emerald-100">
                Simulate bag coupon scan &amp; instant UPI cashback disbursement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg p-1 rounded-lg hover:bg-white/10 transition"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Content */}
        {completedReward ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <i className="fa-solid fa-check" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">QR Coupon Successfully Verified!</h4>
              <p className="text-xs text-slate-500">
                Reward credited to <span className="font-bold text-slate-700">{completedReward.painterName}</span>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Reward Points Credited:</span>
                <span className="font-mono font-bold text-emerald-600 text-sm">
                  +{completedReward.points} Pts
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Instant UPI Cashback:</span>
                <span className="font-mono font-black text-slate-900 text-sm">
                  ₹{completedReward.cashback} credited
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">UPI Payout VPA:</span>
                <span className="font-mono font-medium text-slate-700">{selectedPainter?.upiId}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">NPCI Ref Transaction ID:</span>
                <span className="font-mono text-[11px] text-blue-600 font-bold">{completedReward.upiRef}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Scan Another Coupon
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSimulateScan} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Select Registered Painter *</label>
              <select
                value={selectedPainterId}
                onChange={(e) => setSelectedPainterId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500"
              >
                {painters.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.city}) — Tier: {p.tier} · {p.phone}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 text-[11px]">Linked UPI VPA: </span>
                <span className="font-mono font-bold text-slate-800">{selectedPainter?.upiId}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                {selectedPainter?.kycStatus}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Product / Putty Bag</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Swatch Ultra-White Polymer Putty 40kg">
                  Swatch Ultra-White Polymer Putty 40kg (₹30 cashback / bag)
                </option>
                <option value="Swatch Weatherguard High-Build Putty 30kg">
                  Swatch Weatherguard High-Build Putty 30kg (₹40 cashback / bag)
                </option>
                <option value="Fine Finish Interior Putty 20kg">
                  Fine Finish Interior Putty 20kg (₹20 cashback / bag)
                </option>
                <option value="Swatch Damp-Proof Exterior Base 20L Bucket">
                  Swatch Damp-Proof Exterior Base 20L Bucket (₹75 cashback / bucket)
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Quantity of Bags Scanned</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={scannedQuantity}
                  onChange={(e) => setScannedQuantity(Number(e.target.value) || 1)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold font-mono focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Factory Batch Code</label>
                <input
                  type="text"
                  value={batchCode}
                  onChange={(e) => setBatchCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Simulated QR Code Token</label>
              <input
                type="text"
                readOnly
                value={qrCodeToken}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-md transition flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-[11px]" />
                    <span>Verifying QR &amp; Routing UPI...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-bolt text-[11px]" />
                    <span>Validate QR &amp; Pay Instant Cashback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
