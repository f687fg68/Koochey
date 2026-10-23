import React, { useState } from 'react';
import {
  Download,
  Apple,
  Monitor,
  Layers,
  Shield,
  Check,
  Copy,
  Terminal,
  HardDrive,
  Cpu,
  Lock,
  ExternalLink
} from 'lucide-react';
import { DOWNLOAD_BINARIES } from '../data/mockData.ts';

export const DownloadsSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [selectedCli, setSelectedCli] = useState<'winget' | 'linux'>('winget');

  const handleCopyChecksum = (checksum: string, idx: number) => {
    navigator.clipboard.writeText(checksum);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleTriggerDownload = (platform: string, filename: string) => {
    setDownloadSuccess(`Initiated download for ${filename}. Follow local installation instructions below.`);
    setTimeout(() => setDownloadSuccess(null), 6000);
  };

  const cliCommands = {
    winget: 'winget install Koochey.Desktop',
    linux: 'curl -fsSL https://get.koochey.app/install.sh | bash',
  };

  return (
    <section id="downloads" className="py-20 md:py-28 border-b border-stone-200/80 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
            LOCAL BINARIES &nbsp;/&nbsp; RUN ON YOUR MACHINE
          </p>
          <h2 className="font-editorial-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-stone-900 font-medium">
            Keep your receipts where they belong. On your computer.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Download native binaries for macOS, Windows, and Linux. Koochey runs completely locally with local-first file storage, on-device OCR, and zero cloud logging of your sensitive financial evidence.
          </p>
        </div>

        {downloadSuccess && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{downloadSuccess}</span>
            </div>
            <button
              onClick={() => setDownloadSuccess(null)}
              className="text-emerald-700 hover:text-emerald-950 font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 3 Binary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* macOS DMG */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-stone-400 transition-colors shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                <Apple className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  Version 1.4.0 · Universal DMG
                </span>
                <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 mt-1">
                  macOS
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Apple Silicon (M1/M2/M3/M4) and Intel 64-bit. Requires macOS Monterey 12.0 or newer.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-500">
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-mono text-stone-700">Koochey-1.4.0.dmg</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="text-stone-700 font-mono">86.4 MB</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span>SHA256:</span>
                  <button
                    onClick={() => handleCopyChecksum('d8f1a238e5bc0914a1c0d4812f8623b1897e9d77e48119c82b0f4', 0)}
                    className="font-mono text-[10px] text-stone-500 hover:text-stone-900 flex items-center gap-1"
                  >
                    <span>d8f1a238...</span>
                    {copiedIndex === 0 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleTriggerDownload('macOS', 'Koochey-1.4.0.dmg')}
              className="w-full py-3 bg-stone-900 text-stone-50 text-xs uppercase tracking-widest font-medium rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>Download .dmg</span>
            </button>
          </div>

          {/* Windows EXE */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-stone-400 transition-colors shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                <Monitor className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  Version 1.4.0 · Setup & Portable
                </span>
                <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 mt-1">
                  Windows
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Windows 10 / Windows 11 (64-bit architecture). Standard installer with silent auto-updates.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-500">
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-mono text-stone-700">Koochey-Setup.exe</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="text-stone-700 font-mono">79.2 MB</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span>SHA256:</span>
                  <button
                    onClick={() => handleCopyChecksum('c3b79f18a24558ef930211a7f012e848695021dbab8942365cf', 1)}
                    className="font-mono text-[10px] text-stone-500 hover:text-stone-900 flex items-center gap-1"
                  >
                    <span>c3b79f18...</span>
                    {copiedIndex === 1 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleTriggerDownload('Windows', 'Koochey-Setup-1.4.0.exe')}
              className="w-full py-3 bg-stone-900 text-stone-50 text-xs uppercase tracking-widest font-medium rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>Download .exe</span>
            </button>
          </div>

          {/* Linux AppImage & DEB */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-stone-400 transition-colors shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                <Layers className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  Version 1.4.0 · AppImage & DEB
                </span>
                <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 mt-1">
                  Linux
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Universal standalone .AppImage, Ubuntu/Debian .deb, and Fedora .rpm package formats.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-500">
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-mono text-stone-700">Koochey-1.4.0.AppImage</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="text-stone-700 font-mono">91.8 MB</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span>SHA256:</span>
                  <button
                    onClick={() => handleCopyChecksum('a4e99f0102bc45398201a4e12e99df8932bc6702e88102b8d90', 2)}
                    className="font-mono text-[10px] text-stone-500 hover:text-stone-900 flex items-center gap-1"
                  >
                    <span>a4e99f01...</span>
                    {copiedIndex === 2 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleTriggerDownload('Linux', 'Koochey-1.4.0.AppImage')}
              className="w-full py-3 bg-stone-900 text-stone-50 text-xs uppercase tracking-widest font-medium rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>Download .AppImage</span>
            </button>
          </div>

        </div>

        {/* Command Line Package Managers */}
        <div className="p-6 bg-stone-100/80 border border-stone-200/90 rounded-2xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800">
              <Terminal className="w-4 h-4 text-stone-700" />
              <span>Package Manager Installation</span>
            </div>

            <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-lg text-xs">
              <button
                onClick={() => setSelectedCli('winget')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedCli === 'winget' ? 'bg-white text-stone-900 font-medium shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                winget
              </button>
              <button
                onClick={() => setSelectedCli('linux')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedCli === 'linux' ? 'bg-white text-stone-900 font-medium shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                curl / bash
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-stone-900 text-stone-100 rounded-xl font-mono text-xs">
            <span>$ {cliCommands[selectedCli]}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(cliCommands[selectedCli]);
                setCopiedIndex(99);
                setTimeout(() => setCopiedIndex(null), 2000);
              }}
              className="text-stone-400 hover:text-stone-100 transition-colors p-1"
              title="Copy command"
            >
              {copiedIndex === 99 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Local Security and Architecture Trust Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200/80 pt-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-medium text-sm">
              <HardDrive className="w-4 h-4 text-[#8C8270]" />
              <span>Local SQLite Store</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              All return files, tracking numbers, and receipt images reside locally in your user profile. Nothing is uploaded to central database clusters.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-medium text-sm">
              <Lock className="w-4 h-4 text-[#8C8270]" />
              <span>Automatic Card Redaction</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Credit card primary account numbers (PAN), CVVs, and exact billing street numbers are stripped before excerpt analysis.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-medium text-sm">
              <Cpu className="w-4 h-4 text-[#8C8270]" />
              <span>Bring Your Own Model</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Use your own private model key, local Ollama instance, or server endpoint. Full transparent control over token usage and prompt visibility.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
