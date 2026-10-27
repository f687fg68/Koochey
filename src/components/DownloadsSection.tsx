import React, { useState } from 'react';
import {
  Apple,
  Monitor,
  Layers,
  Check,
  Copy,
  Download,
  HardDrive,
  Cpu,
  Lock,
  ExternalLink,
  FileArchive
} from 'lucide-react';
import { PLATFORM_RELEASES, GITHUB_RELEASE_URL } from '../data/mockData.ts';

export const DownloadsSection: React.FC = () => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (checksum: string) => {
    navigator.clipboard.writeText(checksum);
    setCopiedHash(checksum);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const macRelease = PLATFORM_RELEASES.find((r) => r.platform === 'macOS');
  const winRelease = PLATFORM_RELEASES.find((r) => r.platform === 'Windows');
  const linuxRelease = PLATFORM_RELEASES.find((r) => r.platform === 'Linux');

  return (
    <section id="downloads" className="py-20 md:py-28 border-b border-stone-200/80 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold">
            OFFICIAL RELEASE BINARIES &nbsp;/&nbsp; RUN ON YOUR MACHINE
          </p>
          <h2 className="font-editorial-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-stone-900 font-medium">
            Keep your receipts where they belong. On your computer.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Koochey is designed to run completely on your device with local-first SQLite file storage, on-device OCR, and zero cloud logging of your private financial evidence.
          </p>
        </div>

        {/* Release Banner with Direct GitHub Release Tag Link */}
        <div className="mb-12 p-5 bg-[#F5F2EB] border border-stone-200/90 rounded-2xl text-xs text-stone-700 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              <span>Koochey 1.0.0 Release Artifacts</span>
            </div>
            <p className="text-stone-600">
              Direct binaries for macOS (Apple Silicon arm64), Windows (x64), and Linux (x86_64). Verify cryptographic SHA-256 hashes before running.
            </p>
          </div>
          <a
            href={GITHUB_RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors shrink-0 shadow-2xs"
          >
            <span>View Release on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start">
          
          {/* macOS Apple Silicon arm64 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                  <Apple className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-mono font-medium tracking-wider px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md border border-stone-200">
                  {macRelease?.badge}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Version {macRelease?.version} · Apple Silicon
                </span>
                <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 mt-1">
                  macOS
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {macRelease?.description}
                </p>
              </div>

              {/* Artifacts with Individual Download Actions */}
              <div className="space-y-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="font-medium text-[11px] uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <FileArchive className="w-3.5 h-3.5 text-stone-500" />
                  <span>Release Artifacts:</span>
                </div>

                {macRelease?.artifacts?.map((artifact) => (
                  <div key={artifact.filename} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-stone-900 break-all">
                        {artifact.filename}
                      </span>
                      <span className="text-stone-500 font-mono text-[11px] whitespace-nowrap shrink-0">
                        {artifact.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[10px] text-stone-500">
                      <span className="font-mono truncate" title={artifact.checksum}>
                        SHA-256: {artifact.checksum.slice(0, 14)}...{artifact.checksum.slice(-6)}
                      </span>
                      <button
                        onClick={() => handleCopyHash(artifact.checksum)}
                        className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-mono shrink-0 transition-colors"
                        title="Copy full SHA-256 checksum"
                      >
                        {copiedHash === artifact.checksum ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy SHA</span>
                          </>
                        )}
                      </button>
                    </div>

                    <a
                      href={artifact.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs mt-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{artifact.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Windows x64 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-mono font-medium tracking-wider px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md border border-stone-200">
                  {winRelease?.badge}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Version {winRelease?.version} · Portable Executable
                </span>
                <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 mt-1">
                  Windows
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {winRelease?.description}
                </p>
              </div>

              {/* Artifacts with Individual Download Actions */}
              <div className="space-y-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="font-medium text-[11px] uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <FileArchive className="w-3.5 h-3.5 text-stone-500" />
                  <span>Release Artifacts:</span>
                </div>

                {winRelease?.artifacts?.map((artifact) => (
                  <div key={artifact.filename} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-stone-900 break-all">
                        {artifact.filename}
                      </span>
                      <span className="text-stone-500 font-mono text-[11px] whitespace-nowrap shrink-0">
                        {artifact.size}
                      </span>
                    </div>

                    <p className="text-[10px] text-stone-500 font-medium">
                      Portable executable (no setup or installer required)
                    </p>

                    <div className="flex items-center justify-between gap-2 text-[10px] text-stone-500">
                      <span className="font-mono truncate" title={artifact.checksum}>
                        SHA-256: {artifact.checksum.slice(0, 14)}...{artifact.checksum.slice(-6)}
                      </span>
                      <button
                        onClick={() => handleCopyHash(artifact.checksum)}
                        className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-mono shrink-0 transition-colors"
                        title="Copy full SHA-256 checksum"
                      >
                        {copiedHash === artifact.checksum ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy SHA</span>
                          </>
                        )}
                      </button>
                    </div>

                    <a
                      href={artifact.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs mt-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{artifact.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Linux x86_64 */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-mono font-medium tracking-wider px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md border border-stone-200">
                  {linuxRelease?.badge}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Version {linuxRelease?.version} · x86_64
                </span>
                <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 mt-1">
                  Linux
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {linuxRelease?.description}
                </p>
              </div>

              {/* Artifacts with Individual Download Actions */}
              <div className="space-y-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="font-medium text-[11px] uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <FileArchive className="w-3.5 h-3.5 text-stone-500" />
                  <span>Release Artifacts:</span>
                </div>

                {linuxRelease?.artifacts?.map((artifact) => (
                  <div key={artifact.filename} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-stone-900 break-all">
                        {artifact.filename}
                      </span>
                      <span className="text-stone-500 font-mono text-[11px] whitespace-nowrap shrink-0">
                        {artifact.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[10px] text-stone-500">
                      <span className="font-mono truncate" title={artifact.checksum}>
                        SHA-256: {artifact.checksum.slice(0, 14)}...{artifact.checksum.slice(-6)}
                      </span>
                      <button
                        onClick={() => handleCopyHash(artifact.checksum)}
                        className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-mono shrink-0 transition-colors"
                        title="Copy full SHA-256 checksum"
                      >
                        {copiedHash === artifact.checksum ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy SHA</span>
                          </>
                        )}
                      </button>
                    </div>

                    <a
                      href={artifact.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs mt-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{artifact.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Local Security and Architecture Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200/80 pt-12">
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
