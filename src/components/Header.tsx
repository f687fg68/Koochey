import React from 'react';
import { Download } from 'lucide-react';

interface HeaderProps {
  activeTab: 'features' | 'downloads';
  setActiveTab: (tab: 'features' | 'downloads') => void;
  onGoToDownloads?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onGoToDownloads,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/70 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab('features')}
            className="flex items-center gap-1 text-left group"
          >
            <span className="font-editorial-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
              koochey
            </span>
            <span className="text-xl font-bold text-[#8C8270]">.</span>
          </button>
        </div>

        {/* Center: Navigation (Features / Downloads) */}
        <nav className="flex items-center gap-4 sm:gap-8 text-xs uppercase tracking-widest font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('features')}
            className={`py-4 transition-all relative ${
              activeTab === 'features'
                ? 'text-stone-900 font-semibold'
                : 'hover:text-stone-900 text-stone-500'
            }`}
          >
            Features
            {activeTab === 'features' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`py-4 transition-all relative ${
              activeTab === 'downloads'
                ? 'text-stone-900 font-semibold'
                : 'hover:text-stone-900 text-stone-500'
            }`}
          >
            <span className="hidden sm:inline">Downloads (.dmg / .exe)</span>
            <span className="sm:hidden">Binaries</span>
            {activeTab === 'downloads' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 rounded-full" />
            )}
          </button>
        </nav>

        {/* Right: Direct Download CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onGoToDownloads) onGoToDownloads();
              else setActiveTab('downloads');
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>

      </div>
    </header>
  );
};
