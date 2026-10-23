import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Sparkles, X, ChevronRight, Play } from 'lucide-react';
import { FOCUSED_HELPERS } from '../data/mockData.ts';
import { FocusedHelper } from '../types/index.ts';

interface FocusedHelpersSectionProps {
  onExploreTracker: () => void;
}

export const FocusedHelpersSection: React.FC<FocusedHelpersSectionProps> = ({
  onExploreTracker,
}) => {
  const [activeHelper, setActiveHelper] = useState<FocusedHelper | null>(null);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 border-b border-stone-200/80 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column matching Screenshot 6 */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
              RETURN TRACKER &nbsp;/&nbsp; FOCUSED HELPERS
            </p>

            <h2 className="font-editorial-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-stone-900 font-medium">
              A little help at every step.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Seven focused helpers make sense of return evidence and keep the case moving. You review their findings and confirm any case updates.
            </p>

            <div className="pt-2">
              <button
                onClick={onExploreTracker}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-stone-600 transition-colors py-1 border-b border-stone-900/60"
              >
                <span>EXPLORE THE RETURN TRACKER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 7 Focused Helpers Grid matching Screenshot 6 */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {FOCUSED_HELPERS.map((helper) => (
                <div
                  key={helper.id}
                  onClick={() => setActiveHelper(helper)}
                  className="space-y-2 group cursor-pointer p-4 -m-4 rounded-xl hover:bg-stone-100/60 transition-colors"
                >
                  {/* Number & Title */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-stone-400">
                      {helper.number}
                    </span>
                    <h3 className="font-editorial-serif text-xl sm:text-2xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                      {helper.title}
                    </h3>
                  </div>

                  {/* Description matching screenshot */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pl-7">
                    {helper.description}
                  </p>

                  <div className="pl-7 pt-1 flex items-center gap-1 text-[11px] text-stone-400 group-hover:text-stone-800 transition-colors">
                    <span>Try sample analysis</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Helper Interactive Inspector Modal */}
      {activeHelper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="bg-[#FAF9F5] border border-stone-300 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveHelper(null)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-900 rounded-md"
              aria-label="Close helper inspector"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="font-mono text-xs text-stone-400">{activeHelper.number}</span>
              <p className="text-[11px] uppercase tracking-widest text-[#8C8270] font-semibold">
                {activeHelper.category}
              </p>
              <h3 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900">
                {activeHelper.title}
              </h3>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed">
              {activeHelper.description}
            </p>

            {/* Live Input Preview */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-600">
                Input Evidence Excerpt:
              </label>
              <div className="p-3 bg-white border border-stone-200 rounded-lg text-xs font-mono text-stone-700 leading-relaxed whitespace-pre-wrap">
                {activeHelper.sampleInput}
              </div>
            </div>

            {/* Helper Finding / Recommendation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C8270]" />
                  <span>Helper Finding (Awaiting Your Review):</span>
                </label>
                <button
                  onClick={() => handleCopy(activeHelper.sampleOutput)}
                  className="text-stone-500 hover:text-stone-900 text-xs flex items-center gap-1 transition-colors"
                >
                  {copiedOutput ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="text-[11px]">Copy result</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 bg-[#F5F2EB] border border-stone-200 rounded-lg text-xs text-stone-800 leading-relaxed">
                {activeHelper.sampleOutput}
              </div>
            </div>

            <div className="p-3 bg-stone-100 rounded-lg text-[11px] text-stone-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span>All evidence parsing runs with local regex & on-device OCR prior to structured model assistance.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveHelper(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-600 hover:text-stone-900"
              >
                Done
              </button>
              <button
                onClick={() => {
                  setActiveHelper(null);
                  onExploreTracker();
                }}
                className="px-5 py-2.5 bg-stone-900 text-stone-50 text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-stone-800 transition-colors"
              >
                Go to Return Tracker
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
