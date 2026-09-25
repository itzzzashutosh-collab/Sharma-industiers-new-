import React from 'react';

interface PaintBucketGraphicProps {
  canType?: 'rustic' | 'shine' | 'weather' | 'prime' | 'distemper' | 'roller' | 'waterproof' | 'special';
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PaintBucketGraphic: React.FC<PaintBucketGraphicProps> = ({
  canType = 'rustic',
  name = '',
  size = 'md',
}) => {
  const dim = size === 'sm' ? 'w-12 h-14' : size === 'lg' ? 'w-40 h-44' : 'w-24 h-28';

  // Specific visual styles matching screenshot
  switch (canType) {
    case 'rustic':
      return (
        <div className={`relative ${dim} flex items-center justify-center select-none`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            {/* Handle */}
            <path d="M 20 40 C 20 15, 80 15, 80 40" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="2.5" fill="#64748b" />
            <circle cx="80" cy="40" r="2.5" fill="#64748b" />
            {/* Lid Rim */}
            <ellipse cx="50" cy="30" rx="36" ry="6" fill="#ca8a04" stroke="#a16207" strokeWidth="1.5" />
            <ellipse cx="50" cy="27" rx="34" ry="5" fill="#eab308" />
            {/* Bucket Body */}
            <path
              d="M 16 30 L 22 105 C 22 112, 78 112, 78 105 L 84 30 Z"
              fill="#eab308"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            {/* Label Gradient Band */}
            <path
              d="M 18 48 L 21 88 C 30 92, 70 92, 79 88 L 82 48 C 70 52, 30 52, 18 48 Z"
              fill="#fef08a"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
            {/* Brand Logo & Text */}
            <text x="50" y="65" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#78350f" letterSpacing="0.5">
              SWATCH
            </text>
            <text x="50" y="73" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#92400e">
              Rustic Royale
            </text>
            <text x="50" y="80" textAnchor="middle" fontSize="3.5" fill="#b45309">
              TEXTURE PAINT
            </text>
          </svg>
        </div>
      );

    case 'shine':
      return (
        <div className={`relative ${dim} flex items-center justify-center select-none`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            <path d="M 20 40 C 20 15, 80 15, 80 40" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="2.5" fill="#64748b" />
            <circle cx="80" cy="40" r="2.5" fill="#64748b" />
            <ellipse cx="50" cy="30" rx="36" ry="6" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <ellipse cx="50" cy="27" rx="34" ry="5" fill="#38bdf8" />
            <path
              d="M 16 30 L 22 105 C 22 112, 78 112, 78 105 L 84 30 Z"
              fill="#f8fafc"
              stroke="#0284c7"
              strokeWidth="1.5"
            />
            <path
              d="M 18 48 L 21 88 C 30 92, 70 92, 79 88 L 82 48 C 70 52, 30 52, 18 48 Z"
              fill="#0284c7"
            />
            <text x="50" y="65" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#ffffff" letterSpacing="0.5">
              SWATCH
            </text>
            <text x="50" y="73" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#e0f2fe">
              Shine Emulsion
            </text>
            <text x="50" y="80" textAnchor="middle" fontSize="3.5" fill="#bae6fd">
              LUXURY INTERIOR
            </text>
          </svg>
        </div>
      );

    case 'weather':
      return (
        <div className={`relative ${dim} flex items-center justify-center select-none`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            <path d="M 20 40 C 20 15, 80 15, 80 40" fill="none" stroke="#64748b" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="2.5" fill="#334155" />
            <circle cx="80" cy="40" r="2.5" fill="#334155" />
            <ellipse cx="50" cy="30" rx="36" ry="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
            <ellipse cx="50" cy="27" rx="34" ry="5" fill="#1e3a8a" />
            <path
              d="M 16 30 L 22 105 C 22 112, 78 112, 78 105 L 84 30 Z"
              fill="#1e3a8a"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            <path
              d="M 18 48 L 21 88 C 30 92, 70 92, 79 88 L 82 48 C 70 52, 30 52, 18 48 Z"
              fill="#172554"
            />
            <text x="50" y="65" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#facc15" letterSpacing="0.5">
              SWATCH
            </text>
            <text x="50" y="73" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#ffffff">
              Weatherguard
            </text>
            <text x="50" y="80" textAnchor="middle" fontSize="3.5" fill="#93c5fd">
              ALL-WEATHER PROOF
            </text>
          </svg>
        </div>
      );

    case 'prime':
      return (
        <div className={`relative ${dim} flex items-center justify-center select-none`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            <path d="M 20 40 C 20 15, 80 15, 80 40" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="2.5" fill="#94a3b8" />
            <circle cx="80" cy="40" r="2.5" fill="#94a3b8" />
            <ellipse cx="50" cy="30" rx="36" ry="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
            <ellipse cx="50" cy="27" rx="34" ry="5" fill="#ffffff" />
            <path
              d="M 16 30 L 22 105 C 22 112, 78 112, 78 105 L 84 30 Z"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <path
              d="M 18 48 L 21 88 C 30 92, 70 92, 79 88 L 82 48 C 70 52, 30 52, 18 48 Z"
              fill="#3b82f6"
            />
            <text x="50" y="65" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#ffffff" letterSpacing="0.5">
              SWATCH
            </text>
            <text x="50" y="73" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#ffffff">
              Base Prime
            </text>
            <text x="50" y="80" textAnchor="middle" fontSize="3.5" fill="#dbeafe">
              DEEP PENETRATING
            </text>
          </svg>
        </div>
      );

    case 'distemper':
      return (
        <div className={`relative ${dim} flex items-center justify-center select-none`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            <path d="M 20 40 C 20 15, 80 15, 80 40" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="2.5" fill="#64748b" />
            <circle cx="80" cy="40" r="2.5" fill="#64748b" />
            <ellipse cx="50" cy="30" rx="36" ry="6" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <ellipse cx="50" cy="27" rx="34" ry="5" fill="#ef4444" />
            <path
              d="M 16 30 L 22 105 C 22 112, 78 112, 78 105 L 84 30 Z"
              fill="#fee2e2"
              stroke="#dc2626"
              strokeWidth="1.5"
            />
            <path
              d="M 18 48 L 21 88 C 30 92, 70 92, 79 88 L 82 48 C 70 52, 30 52, 18 48 Z"
              fill="#dc2626"
            />
            <text x="50" y="65" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#ffffff" letterSpacing="0.5">
              SWATCH
            </text>
            <text x="50" y="73" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#ffffff">
              Distemper
            </text>
            <text x="50" y="80" textAnchor="middle" fontSize="3.5" fill="#fecaca">
              ACRYLIC DISTEMPER
            </text>
          </svg>
        </div>
      );

    case 'roller':
      return (
        <div className={`relative ${dim} flex items-center justify-center select-none`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            <path d="M 20 40 C 20 15, 80 15, 80 40" fill="none" stroke="#64748b" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="2.5" fill="#475569" />
            <circle cx="80" cy="40" r="2.5" fill="#475569" />
            <ellipse cx="50" cy="30" rx="36" ry="6" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <ellipse cx="50" cy="27" rx="34" ry="5" fill="#475569" />
            <path
              d="M 16 30 L 22 105 C 22 112, 78 112, 78 105 L 84 30 Z"
              fill="#f1f5f9"
              stroke="#334155"
              strokeWidth="1.5"
            />
            <path
              d="M 18 48 L 21 88 C 30 92, 70 92, 79 88 L 82 48 C 70 52, 30 52, 18 48 Z"
              fill="#0f172a"
            />
            <text x="50" y="65" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#ffffff" letterSpacing="0.5">
              SWATCH
            </text>
            <text x="50" y="73" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#f8fafc">
              Roller Coat
            </text>
            <text x="50" y="80" textAnchor="middle" fontSize="3.5" fill="#cbd5e1">
              ROLLER TEXTURE
            </text>
          </svg>
        </div>
      );

    case 'waterproof':
      return (
        <div className={`relative ${dim} flex items-center justify-center select-none`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            <path d="M 20 40 C 20 15, 80 15, 80 40" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="2.5" fill="#ca8a04" />
            <circle cx="80" cy="40" r="2.5" fill="#ca8a04" />
            <ellipse cx="50" cy="30" rx="36" ry="6" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            <ellipse cx="50" cy="27" rx="34" ry="5" fill="#334155" />
            <path
              d="M 16 30 L 22 105 C 22 112, 78 112, 78 105 L 84 30 Z"
              fill="#eab308"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            <path
              d="M 18 48 L 21 88 C 30 92, 70 92, 79 88 L 82 48 C 70 52, 30 52, 18 48 Z"
              fill="#0f172a"
            />
            <text x="50" y="65" textAnchor="middle" fontSize="6" fontWeight="900" fill="#facc15" letterSpacing="0.5">
              SWATCH
            </text>
            <text x="50" y="73" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#ffffff">
              Waterproof
            </text>
            <text x="50" y="80" textAnchor="middle" fontSize="3.5" fill="#fde047">
              DAMP SHIELD PRO
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative ${dim} flex items-center justify-center select-none`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            <path d="M 20 40 C 20 15, 80 15, 80 40" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="2.5" fill="#64748b" />
            <circle cx="80" cy="40" r="2.5" fill="#64748b" />
            <ellipse cx="50" cy="30" rx="36" ry="6" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1.5" />
            <ellipse cx="50" cy="27" rx="34" ry="5" fill="#8b5cf6" />
            <path
              d="M 16 30 L 22 105 C 22 112, 78 112, 78 105 L 84 30 Z"
              fill="#ede9fe"
              stroke="#7c3aed"
              strokeWidth="1.5"
            />
            <text x="50" y="65" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#6d28d9">
              SWATCH
            </text>
            <text x="50" y="73" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#4c1d95">
              {name.split(' ')[1] || 'Paint'}
            </text>
          </svg>
        </div>
      );
  }
};
