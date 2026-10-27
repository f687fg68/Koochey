import React from 'react';
import { ArrowDown, Download, ShieldCheck, Apple, Monitor } from 'lucide-react';

interface HeroSectionProps {
  onExploreFeatures: () => void;
  onGoToDownloads: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreFeatures,
  onGoToDownloads,
}) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker Row matching Screenshot 3 */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium mb-12">
          <span>KOOCHEY &nbsp;/&nbsp; A CLOSER LOOK</span>
          <span className="font-mono text-stone-400">01 — 06</span>
        </div>

        {/* Hero Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Big Typographic Headline */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500 font-semibold">
              A LITTLE MORE BREATHING ROOM
            </p>
            
            <h1 className="font-editorial-serif text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] tracking-tight text-stone-900">
              <span className="block font-medium">Less chasing.</span>
              <span className="block italic text-[#8C8270] font-normal pt-1">
                More living.
              </span>
            </h1>

            {/* Professional Statement & Assistant Advisory */}
            <div className="pt-6">
              <div className="p-4 bg-[#F5F2EB]/95 border border-stone-200/90 rounded-xl max-w-xl text-xs text-stone-700 leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-semibold text-stone-900 uppercase tracking-wider text-[10px]">
                  <ShieldCheck className="w-4 h-4 text-stone-700" />
                  <span>Assistant Advisory · Professional Notice</span>
                </div>
                <p>
                  Koochey is an AI-powered organizational desktop assistant built to help you organize receipts, calculate potential return windows, and prepare message drafts for your own purchases.
                </p>
                <p className="text-stone-600 border-t border-stone-200/80 pt-2 text-[11px] leading-relaxed">
                  <strong className="text-stone-800 font-medium">Professional Notice:</strong> This software is an administrative assistant and does not provide legal, financial, tax, or formal regulatory advice. It is not a substitute for licensed legal counsel, consumer protection authorities, or certified professional services. All suggestions and drafts require your personal review and verification before submission.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Paragraph, CTAs, and Direct Binaries */}
          <div className="lg:col-span-5 lg:pt-14 space-y-8">
            <div className="w-12 h-px bg-stone-400/80" />

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
              Everyday life comes with enough to keep track of. Koochey brings thoughtful AI help, useful evidence, and practical follow-through into one calm desktop application.
            </p>

            {/* Action buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onGoToDownloads}
                  className="px-5 py-3 bg-stone-900 text-stone-50 text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-stone-800 transition-all shadow-sm flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-stone-100" />
                  <span>View Release Artifacts</span>
                </button>

                <button
                  onClick={onExploreFeatures}
                  className="px-5 py-3 bg-white text-stone-800 border border-stone-300/80 text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-stone-100 transition-all flex items-center gap-2"
                >
                  <span>Explore Features</span>
                  <ArrowDown className="w-3.5 h-3.5 text-stone-600" />
                </button>
              </div>

              {/* Release Binaries (Koochey 1.0.0) */}
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-2">
                  Direct Binaries (Koochey 1.0.0):
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    onClick={onGoToDownloads}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-200/90 rounded-md text-stone-800 transition-colors"
                  >
                    <Apple className="w-3.5 h-3.5 text-stone-700" />
                    <span className="font-medium">macOS</span>
                    <span className="text-[10px] text-stone-500 font-mono">Apple Silicon arm64</span>
                  </button>

                  <button
                    onClick={onGoToDownloads}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-200/90 rounded-md text-stone-800 transition-colors"
                  >
                    <Monitor className="w-3.5 h-3.5 text-stone-700" />
                    <span className="font-medium">Windows</span>
                    <span className="text-[10px] text-stone-500 font-mono">x64 (Setup .exe)</span>
                  </button>
                </div>
              </div>

              {/* Scroll Teaser Link matching Screenshot 3 */}
              <div className="pt-2">
                <button
                  onClick={onExploreFeatures}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-stone-600 transition-colors group"
                >
                  <span>SEE WHAT KOOCHEY CAN DO</span>
                  <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Footer Teaser Ticker matching Screenshot 3 */}
        <div className="mt-16 pt-8 border-t border-stone-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] uppercase tracking-[0.2em] text-stone-500 gap-3">
          <span>GOOD HELP, RIGHT WHEN YOU NEED IT</span>
          <div className="flex items-center gap-3 font-normal text-stone-600">
            <span>Ask</span>
            <span className="text-stone-300">——</span>
            <span>Organise</span>
            <span className="text-stone-300">——</span>
            <span>Follow through</span>
          </div>
        </div>

      </div>
    </section>
  );
};
