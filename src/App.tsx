/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { FeaturesList } from './components/FeaturesList.tsx';
import { FocusedHelpersSection } from './components/FocusedHelpersSection.tsx';
import { DownloadsSection } from './components/DownloadsSection.tsx';
import { ReceiptInspectorModal } from './components/ReceiptInspectorModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<'features' | 'downloads'>('features');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const handleOpenReceiptInspector = () => {
    setIsReceiptModalOpen(true);
  };

  const handleScrollToFeatures = () => {
    setActiveTab('features');
    setTimeout(() => {
      const el = document.getElementById('features-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleScrollToDownloads = () => {
    setActiveTab('downloads');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 selection:bg-stone-200">
      
      {/* Top Application Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToDownloads={handleScrollToDownloads}
      />

      {/* Main Content Rendered According to Active View */}
      {activeTab === 'downloads' ? (
        <main>
          <DownloadsSection />
          <Footer
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        /* Features / Editorial Overview Page matching Screenshots 3, 4, 5, 6 */
        <main>
          <HeroSection
            onExploreFeatures={handleScrollToFeatures}
            onGoToDownloads={handleScrollToDownloads}
          />

          <FeaturesList
            onGoToDownloads={handleScrollToDownloads}
            onOpenReceiptInspector={handleOpenReceiptInspector}
          />

          <FocusedHelpersSection
            onExploreTracker={() => handleScrollToDownloads()}
          />

          <DownloadsSection />

          <Footer
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {/* Evidence & Receipt Inspector Modal */}
      <ReceiptInspectorModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
      />

    </div>
  );
}
