import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles, X, FileText, Globe, ShieldCheck } from 'lucide-react';
import { CORE_FEATURES } from '../data/mockData.ts';
import { FeatureItem } from '../types/index.ts';

interface FeaturesListProps {
  onGoToDownloads?: () => void;
  onOpenReceiptInspector: () => void;
}

export const FeaturesList: React.FC<FeaturesListProps> = ({
  onGoToDownloads,
  onOpenReceiptInspector,
}) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  return (
    <section id="features-section" className="py-20 md:py-28 border-b border-stone-200/80 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Title matching Screenshot 4 & 5 */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
              MADE FOR REAL LIFE
            </p>

            <h2 className="font-editorial-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-stone-900 font-medium">
              One thoughtful place for the things that add up.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              From a quick question to a return that needs following up, Koochey helps you move from uncertainty to a useful next step.
            </p>

            <div className="pt-4 space-y-3">
              <div className="p-4 rounded-xl bg-stone-100/90 border border-stone-200/90 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
                  <ShieldCheck className="w-4 h-4 text-stone-700" />
                  <span>Assistant Scope & Professional Notice</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Koochey serves solely as a consumer productivity assistant. It does not replace professional legal representation, statutory consumer dispute bodies, or merchant return authorizations. Users review, edit, and confirm all proposed actions.
                </p>
              </div>

              <button
                onClick={onOpenReceiptInspector}
                className="w-full text-left p-3.5 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 flex items-center justify-between transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8C8270]" />
                  <span>Test Receipt Evidence Parser</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Rows 01 - 06 matching Screenshots 4 & 5 */}
          <div className="lg:col-span-8 divide-y divide-stone-200/80 border-t lg:border-t-0 border-b border-stone-200/80">
            {CORE_FEATURES.map((feature) => (
              <article
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
                className="py-10 first:pt-0 last:pb-8 group cursor-pointer hover:bg-stone-100/40 px-3 sm:px-6 rounded-lg transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  
                  {/* Row Number & Category */}
                  <div className="md:col-span-3 space-y-1">
                    <span className="font-mono text-xs text-stone-400">
                      {feature.number}
                    </span>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">
                      {feature.category}
                    </p>
                  </div>

                  {/* Title & Description */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                        {feature.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                    </div>

                    <p className="text-stone-600 text-sm leading-relaxed font-normal">
                      {feature.description}
                    </p>

                    {/* Unboxed Metadata Tags (Zero-Pill Discipline with subtle separators) */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-stone-400 font-normal">
                      {feature.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          <span className="hover:text-stone-700 transition-colors">{tag}</span>
                          {idx < feature.tags.length - 1 && (
                            <span aria-hidden="true" className="text-stone-300">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>

        </div>

      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="bg-[#FAF9F5] border border-stone-300 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-xl space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-900 rounded-md"
              aria-label="Close feature details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="font-mono text-xs text-stone-400">{selectedFeature.number}</span>
              <p className="text-[11px] uppercase tracking-widest text-[#8C8270] font-semibold">
                {selectedFeature.category}
              </p>
              <h3 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900">
                {selectedFeature.title}
              </h3>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed">
              {selectedFeature.description}
            </p>

            <div className="p-4 bg-stone-100 rounded-xl space-y-2 border border-stone-200">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-700">
                How this works on your desktop:
              </span>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                <li>Zero merchant lock-in: works across any store or receipt format.</li>
                <li>Redacts personal payment card details before model review.</li>
                <li>Human in the loop: you confirm and dispatch every drafted communication.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-600 hover:text-stone-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedFeature(null);
                  if (onGoToDownloads) {
                    onGoToDownloads();
                  }
                }}
                className="px-5 py-2.5 bg-stone-900 text-stone-50 text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-stone-800 transition-colors"
              >
                View Release Artifacts
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
