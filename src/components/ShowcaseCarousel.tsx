import React, { useState, useEffect, useCallback } from 'react';

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badgeColor: string;
  bgGradient: string;
  accentColor: string;
  sku: string;
  coverage: string;
  sheen: string;
  svgGraphic: React.ReactNode;
}

interface ShowcaseCarouselProps {
  onSelectSlideAction?: (slide: CarouselSlide) => void;
}

export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({ onSelectSlideAction }) => {
  const slides: CarouselSlide[] = [
    {
      id: 'slide-1',
      title: 'Rustic Royale — Terracotta Accent Finish',
      subtitle: 'Natural earthy stone texture inspired by Rajasthan heritage courtyards',
      tag: 'Interior Texture',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      bgGradient: 'from-amber-900 via-orange-900 to-stone-900',
      accentColor: '#f97316',
      sku: 'SP-RR-20KG',
      coverage: '35-40 sq.ft / kg',
      sheen: 'Natural Matte Textured',
      svgGraphic: (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="wall-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9a3412" />
              <stop offset="50%" stopColor="#c2410c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </linearGradient>
            <radialGradient id="light-cast" cx="30%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#wall-grad)" />
          {/* Subtle architectural stucco texture lines */}
          <path d="M0,150 Q200,120 400,160 T800,140 L800,450 L0,450 Z" fill="#7c2d12" opacity="0.6" />
          <path d="M0,260 Q300,240 600,280 T800,260 L800,450 L0,450 Z" fill="#431407" opacity="0.7" />
          {/* Sunlight shadow cast */}
          <polygon points="120,0 360,0 240,450 0,450" fill="#ffffff" opacity="0.08" />
          <polygon points="420,0 580,0 480,450 320,450" fill="#ffffff" opacity="0.05" />
          <rect width="800" height="450" fill="url(#light-cast)" />
          {/* Living room furniture silhouettes */}
          <rect x="520" y="240" width="220" height="150" rx="8" fill="#1c1917" opacity="0.75" />
          <rect x="540" y="200" width="180" height="70" rx="6" fill="#292524" opacity="0.8" />
          <circle cx="200" cy="340" r="45" fill="#f97316" opacity="0.5" />
        </svg>
      ),
    },
    {
      id: 'slide-2',
      title: 'Weatherguard Exterior — All-Weather Defense',
      subtitle: 'Heavy monsoon protection & 100% anti-fungal barrier for modern facades',
      tag: 'Exterior Weatherproof',
      badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
      bgGradient: 'from-slate-950 via-slate-900 to-sky-950',
      accentColor: '#0284c7',
      sku: 'SP-WG-20L',
      coverage: '55-65 sq.ft / liter (2 coats)',
      sheen: 'Silicone Soft Sheen',
      svgGraphic: (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill="url(#sky-grad)" />
          {/* Contemporary Villa Geometry */}
          <polygon points="100,100 450,80 450,420 100,420" fill="#f8fafc" opacity="0.9" />
          <polygon points="450,80 720,120 720,420 450,420" fill="#cbd5e1" opacity="0.8" />
          {/* Glass Windows */}
          <rect x="140" y="140" width="130" height="90" rx="4" fill="#0284c7" opacity="0.3" stroke="#64748b" strokeWidth="2" />
          <rect x="300" y="140" width="120" height="90" rx="4" fill="#0284c7" opacity="0.3" stroke="#64748b" strokeWidth="2" />
          <rect x="140" y="270" width="280" height="150" rx="4" fill="#0284c7" opacity="0.25" stroke="#64748b" strokeWidth="2" />
          {/* Weatherproof water droplets */}
          <path d="M480,180 Q485,160 488,180 A5,5 0 1,1 480,180" fill="#38bdf8" opacity="0.8" />
          <path d="M540,240 Q545,220 548,240 A5,5 0 1,1 540,240" fill="#38bdf8" opacity="0.8" />
          <path d="M620,190 Q625,170 628,190 A5,5 0 1,1 620,190" fill="#38bdf8" opacity="0.8" />
        </svg>
      ),
    },
    {
      id: 'slide-3',
      title: 'Shine Emulsion — High-Gloss Luxury Interiors',
      subtitle: 'Micro-pigment dispersion yielding radiant washability and silky sheen',
      tag: 'Interior Emulsion',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      bgGradient: 'from-blue-950 via-indigo-950 to-slate-900',
      accentColor: '#3b82f6',
      sku: 'SP-SE-10L',
      coverage: '120-140 sq.ft / liter',
      sheen: 'High Radiant Sheen',
      svgGraphic: (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="emulsion-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <radialGradient id="high-gloss" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#emulsion-grad)" />
          <circle cx="400" cy="180" r="260" fill="url(#high-gloss)" />
          <path d="M100,320 C250,220 550,420 700,300 L800,450 L0,450 Z" fill="#1e3a8a" opacity="0.5" />
          {/* Paint roller path graphic */}
          <path d="M220,180 L580,180" stroke="#60a5fa" strokeWidth="32" strokeLinecap="round" opacity="0.4" />
          <path d="M220,240 L540,240" stroke="#60a5fa" strokeWidth="32" strokeLinecap="round" opacity="0.5" />
        </svg>
      ),
    },
    {
      id: 'slide-4',
      title: 'Factory #01 Jaipur — Automated Plant Floor',
      subtitle: 'Sitapura plant with 23,000 bags/day high-shear dispersion capacity',
      tag: 'Manufacturing Operations',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      bgGradient: 'from-slate-950 via-zinc-900 to-emerald-950',
      accentColor: '#10b981',
      sku: 'FAC-JP-01',
      coverage: '3 Mixing Lines Operational',
      sheen: 'ISO 9001 Certified',
      svgGraphic: (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="factory-steel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill="#090d16" />
          {/* Stainless steel dispersion silos */}
          <rect x="80" y="80" width="130" height="280" rx="12" fill="url(#factory-steel)" stroke="#475569" strokeWidth="2" />
          <rect x="250" y="60" width="150" height="300" rx="12" fill="url(#factory-steel)" stroke="#475569" strokeWidth="2" />
          <rect x="440" y="90" width="140" height="270" rx="12" fill="url(#factory-steel)" stroke="#475569" strokeWidth="2" />
          <rect x="620" y="70" width="120" height="290" rx="12" fill="url(#factory-steel)" stroke="#475569" strokeWidth="2" />
          {/* Conveyor belt */}
          <rect x="0" y="360" width="800" height="40" fill="#1e293b" />
          <line x1="0" y1="380" x2="800" y2="380" stroke="#10b981" strokeWidth="3" strokeDasharray="16,8" />
          {/* Paint bags on conveyor */}
          <rect x="120" y="330" width="50" height="40" rx="4" fill="#f97316" />
          <rect x="280" y="330" width="50" height="40" rx="4" fill="#2563eb" />
          <rect x="460" y="330" width="50" height="40" rx="4" fill="#10b981" />
          <rect x="640" y="330" width="50" height="40" rx="4" fill="#eab308" />
        </svg>
      ),
    },
    {
      id: 'slide-5',
      title: 'Architectural Fan Deck — Palette of Rajasthan',
      subtitle: '240 curated regional hues designed for Indian lighting conditions',
      tag: 'Color Consultation',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      bgGradient: 'from-purple-950 via-slate-900 to-pink-950',
      accentColor: '#a855f7',
      sku: 'SP-SHADE-2025',
      coverage: '240 Curated Shades',
      sheen: 'Multi-finish Fan Deck',
      svgGraphic: (
        <svg className="w-full h-full object-cover" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
          <rect width="800" height="450" fill="#1e1b4b" />
          {/* Fan Deck Swatches radiating out */}
          <g transform="translate(400, 390)">
            <rect x="-35" y="-320" width="70" height="320" rx="8" fill="#e25822" transform="rotate(-50)" />
            <rect x="-35" y="-320" width="70" height="320" rx="8" fill="#f59e0b" transform="rotate(-30)" />
            <rect x="-35" y="-320" width="70" height="320" rx="8" fill="#eab308" transform="rotate(-10)" />
            <rect x="-35" y="-320" width="70" height="320" rx="8" fill="#10b981" transform="rotate(10)" />
            <rect x="-35" y="-320" width="70" height="320" rx="8" fill="#06b6d4" transform="rotate(30)" />
            <rect x="-35" y="-320" width="70" height="320" rx="8" fill="#2563eb" transform="rotate(50)" />
            <circle cx="0" cy="-20" r="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="4" />
          </g>
        </svg>
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const activeSlide = slides[currentIndex];

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
      data-purpose="interactive-image-carousel"
    >
      {/* Carousel Top Bar */}
      <div className="p-4 md:px-6 md:py-3.5 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center space-x-2.5">
          <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
            <i className="fa-solid fa-images" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              Product &amp; Factory Showcase
            </h3>
            <p className="text-[10px] text-slate-400">
              Interactive high-resolution paint finish &amp; plant gallery
            </p>
          </div>
        </div>

        {/* Controls: Play/Pause, slide counter, prev/next */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5 transition active:scale-95"
            title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-[10px]`} />
            <span className="hidden sm:inline text-[11px]">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-500 px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
            {currentIndex + 1} / {slides.length}
          </span>

          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 flex items-center justify-center text-slate-600 transition active:scale-95"
          >
            <i className="fa-solid fa-chevron-left text-xs" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 flex items-center justify-center text-slate-600 transition active:scale-95"
          >
            <i className="fa-solid fa-chevron-right text-xs" />
          </button>
        </div>
      </div>

      {/* Main Slide Viewport (Responsive aspect ratio: 16/9 on desktop, taller on mobile) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] bg-slate-900 overflow-hidden select-none group">
        {/* Render Slide Vector Graphic with CSS aspect-ratio constraint */}
        <div className="absolute inset-0 transition-opacity duration-300">
          {activeSlide.svgGraphic}
        </div>

        {/* Ambient Dark Gradient Scrim to ensure WCAG text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

        {/* Floating Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${activeSlide.badgeColor}`}
          >
            {activeSlide.tag}
          </span>
        </div>

        {/* Slide Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl text-white">
            <h4 className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-snug drop-shadow-md">
              {activeSlide.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1 leading-relaxed drop-shadow-sm">
              {activeSlide.subtitle}
            </p>

            {/* Micro specs */}
            <div className="flex items-center gap-3 sm:gap-4 mt-2.5 text-[11px] text-slate-300 font-medium flex-wrap">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-barcode text-slate-400" />
                <strong className="text-white font-mono">{activeSlide.sku}</strong>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-layer-group text-slate-400" />
                <span>{activeSlide.coverage}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-sparkles text-amber-300" />
                <span>{activeSlide.sheen}</span>
              </span>
            </div>
          </div>

          {/* Action on slide */}
          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={() => onSelectSlideAction && onSelectSlideAction(activeSlide)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-circle-info text-[10px]" />
              <span>Inquire &amp; Order</span>
            </button>
          </div>
        </div>

        {/* Arrow overlay buttons visible on hover */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-sm text-white hover:bg-blue-600 transition flex items-center justify-center opacity-80 md:opacity-0 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <i className="fa-solid fa-chevron-left text-sm" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-sm text-white hover:bg-blue-600 transition flex items-center justify-center opacity-80 md:opacity-0 group-hover:opacity-100"
          aria-label="Next image"
        >
          <i className="fa-solid fa-chevron-right text-sm" />
        </button>
      </div>

      {/* Thumbnails Navigation Row */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2.5 overflow-x-auto">
        {slides.map((s, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-1 min-w-[140px] p-2 rounded-xl text-left border transition cursor-pointer flex items-center space-x-2.5 ${
                isActive
                  ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div
                className="w-3.5 h-3.5 rounded-full shrink-0"
                style={{ backgroundColor: s.accentColor }}
              />
              <div className="truncate">
                <p className="text-[11px] font-bold text-slate-800 truncate">{s.title.split('—')[0]}</p>
                <p className="text-[9px] text-slate-400 truncate">{s.tag}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
