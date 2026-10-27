import React from 'react';
import { Apple, Monitor, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'features' | 'downloads') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#F5F2EB] border-t border-stone-200/90 text-stone-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Callout */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-stone-300/70">
          <div className="space-y-3">
            <span className="font-editorial-serif text-2xl font-bold tracking-tight text-stone-900 block">
              koochey.
            </span>
            <p className="font-editorial-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Calm follow-through for your everyday purchases.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('downloads')}
              className="px-5 py-2.5 bg-stone-900 text-stone-50 text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-stone-800 transition-colors shadow-2xs"
            >
              View Release Artifacts
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-stone-600">
          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wider text-stone-900 text-[11px]">Platform Releases</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('downloads')} className="hover:text-stone-900 flex items-center gap-1.5 text-left">
                  <Apple className="w-3.5 h-3.5 text-stone-700" />
                  <span>macOS Apple Silicon arm64</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('downloads')} className="hover:text-stone-900 flex items-center gap-1.5 text-left">
                  <Monitor className="w-3.5 h-3.5 text-stone-700" />
                  <span>Windows x64 (Setup .exe)</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wider text-stone-900 text-[11px]">Core Capabilities</p>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('features')} className="hover:text-stone-900">Receipt Evidence Extraction</button></li>
              <li><button onClick={() => onNavigate('features')} className="hover:text-stone-900">Return Window Deadline Checker</button></li>
              <li><button onClick={() => onNavigate('features')} className="hover:text-stone-900">Seven Focused Helpers</button></li>
              <li><button onClick={() => onNavigate('features')} className="hover:text-stone-900">In-App Browser Assistant</button></li>
              <li><button onClick={() => onNavigate('features')} className="hover:text-stone-900">Retailer Dispute Drafter</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wider text-stone-900 text-[11px]">Privacy & Local First</p>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('downloads')} className="hover:text-stone-900">On-Device SQLite Storage</button></li>
              <li><button onClick={() => onNavigate('downloads')} className="hover:text-stone-900">Zero Cloud Receipt Logging</button></li>
              <li><button onClick={() => onNavigate('downloads')} className="hover:text-stone-900">Automatic PAN / CVV Redaction</button></li>
              <li><button onClick={() => onNavigate('downloads')} className="hover:text-stone-900">Local Architecture Pledge</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wider text-stone-900 text-[11px]">Human in the Loop</p>
            <p className="text-[11px] leading-relaxed text-stone-500">
              Users review and confirm all communications and case entries. Koochey never acts autonomously without your permission.
            </p>
          </div>
        </div>

        {/* Professional Statement & Legal Advisory */}
        <div className="p-5 bg-stone-200/60 rounded-xl border border-stone-300/70 text-[11px] text-stone-600 leading-relaxed space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-stone-900 uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
            <span>Professional Statement & Assistant Notice</span>
          </div>
          <p>
            <strong className="text-stone-800 font-medium">Assistant Nature of Service:</strong> Koochey is a consumer-facing productivity assistant intended solely to help users organize receipts and return evidence, calculate estimated deadlines from written policies, and draft preliminary correspondence to retailers. Koochey is not an automated refund approval system and does not bind merchants or financial institutions.
          </p>
          <p>
            <strong className="text-stone-800 font-medium">Not Professional or Legal Advice:</strong> Koochey does not provide legal, financial, tax, or official dispute arbitration services, and must not be used as a replacement for qualified professional counsel, licensed attorneys, certified financial planners, or statutory consumer protection authorities (such as consumer ombudsmen or small claims bodies). All dates, policy excerpts, and drafted communications are generated for reference purposes only and must be reviewed, verified, and approved by the user before reliance or transmission.
          </p>
        </div>

        {/* Bottom credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 border-t border-stone-200 pt-6 gap-2">
          <span>© {new Date().getFullYear()} Koochey Desktop. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/f687fg68/Koochey/releases/tag/v1.0.0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-800 transition-colors"
            >
              GitHub Releases
            </a>
            <span>·</span>
            <span>Koochey 1.0.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
