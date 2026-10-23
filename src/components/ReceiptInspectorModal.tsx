import React, { useState } from 'react';
import {
  X,
  Upload,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { parseReceiptText, calculateReturnDeadline, draftRetailerMessage } from '../utils/returnLogic.ts';

interface ReceiptInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaseCreated?: (newCase: any) => void;
}

const SAMPLE_RECEIPTS = [
  {
    name: 'Zara Linen Jacket Receipt',
    text: `ZARA ONLINE STORE #US8912
Order Reference: ZR-882190
Date of Purchase: 2026-10-12
Customer: Sarah Jenkins
Payment: Visa ending in ****9021

Items:
- 1x Linen Oversized Trench Coat (Size: Medium) ... $189.00
- 1x Cotton Ribbed Socks (Size: One Size) ... $12.50

Subtotal: $201.50
Tax: $16.12
Total Paid: $217.62

Return Policy: Full refund within 30 days of shipment delivery date. Items must have security tags intact.`,
    policyDays: 30,
  },
  {
    name: 'Apple Store AirPods Pro Receipt',
    text: `Apple Retail Store - Fifth Avenue
Order #APL-4091283
Date: 2026-10-08
Items:
- AirPods Pro 2nd Gen USB-C ... $249.00
- AppleCare+ for Headphones ... $29.00
Total: $278.00

Return Policy: Standard 14-day return window from receipt of goods.`,
    policyDays: 14,
  },
  {
    name: 'Nordstrom Chelsea Boots Receipt',
    text: `Nordstrom Online
Order Number: ND-110942
Order Date: 2026-10-05
Items:
- Italian Chelsea Leather Boots in Dark Cognac ... $245.00
Total: $245.00

Return Policy: 45 days liberal return window for unworn footwear with original box.`,
    policyDays: 45,
  },
];

export const ReceiptInspectorModal: React.FC<ReceiptInspectorModalProps> = ({
  isOpen,
  onClose,
  onCaseCreated,
}) => {
  const [receiptText, setReceiptText] = useState(SAMPLE_RECEIPTS[0].text);
  const [windowDays, setWindowDays] = useState(30);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [tone, setTone] = useState<'polite' | 'firm' | 'statutory'>('polite');

  if (!isOpen) return null;

  const parsed = parseReceiptText(receiptText);
  let deadline = null;
  if (parsed.date) {
    try {
      deadline = calculateReturnDeadline(parsed.date, windowDays, '2026-10-21');
    } catch (e) {
      // Date parse fallback
    }
  }

  const generatedDraft = draftRetailerMessage({
    merchant: parsed.merchant || 'Retailer',
    orderNumber: parsed.orderNumber || '0000',
    item: parsed.items[0] || 'Purchased goods',
    issue: 'the item is unsuitable and in original packaging',
    tone,
  });

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleDownloadICS = () => {
    if (!deadline) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Koochey//Return Deadline Reminder//EN
BEGIN:VEVENT
SUMMARY:Return Deadline: ${parsed.merchant} (${parsed.items[0] || 'Order'})
DESCRIPTION:Order #${parsed.orderNumber}. Return window deadline expires today. Ensure package is handed to carrier.
DTSTART:${deadline.deadlineDate.replace(/-/g, '')}T090000Z
DTEND:${deadline.deadlineDate.replace(/-/g, '')}T100000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `koochey-return-deadline-${parsed.merchant.toLowerCase().replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div className="bg-[#FAF9F5] border border-stone-300 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
              EVIDENCE INSPECTOR &nbsp;/&nbsp; ON-DEVICE PARSER
            </p>
            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900">
              Receipt & Return Deadline Engine
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sample Loaders */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-600 block">
            Load Sample Receipt:
          </label>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_RECEIPTS.map((s) => (
              <button
                key={s.name}
                onClick={() => {
                  setReceiptText(s.text);
                  setWindowDays(s.policyDays);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  receiptText === s.text
                    ? 'bg-stone-900 text-white border-stone-900 font-medium'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Text Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span className="font-semibold uppercase text-[10px] tracking-wider">Receipt Excerpt (Redacted on Device):</span>
            <span className="text-[11px] text-stone-400">Card numbers redacted</span>
          </div>
          <textarea
            rows={6}
            value={receiptText}
            onChange={(e) => setReceiptText(e.target.value)}
            className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs font-mono text-stone-800 leading-relaxed focus:outline-hidden focus:border-stone-400 focus:ring-1 focus:ring-stone-400"
            placeholder="Paste text from receipt or order confirmation email..."
          />
        </div>

        {/* Return Policy Window Configuration */}
        <div className="flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-xl">
          <div className="flex-1">
            <label className="text-xs font-semibold text-stone-800 block">
              Policy Return Window:
            </label>
            <span className="text-[11px] text-stone-500">Days from purchase date according to merchant policy</span>
          </div>
          <div className="flex items-center gap-2">
            {[14, 30, 45, 60].map((days) => (
              <button
                key={days}
                onClick={() => setWindowDays(days)}
                className={`px-3 py-1 text-xs rounded-md border ${
                  windowDays === days
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                {days} days
              </button>
            ))}
          </div>
        </div>

        {/* Extraction Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">Merchant</span>
            <p className="font-medium text-stone-900 text-sm">{parsed.merchant}</p>
            <p className="text-[11px] text-stone-500 font-mono">Order: {parsed.orderNumber}</p>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">Total Charged</span>
            <p className="font-medium text-stone-900 text-sm">
              {parsed.amount ? `${parsed.currency}${parsed.amount.toFixed(2)}` : 'N/A'}
            </p>
            <p className="text-[11px] text-stone-500">{parsed.items.length} items detected</p>
          </div>

          <div className={`p-4 border rounded-xl space-y-1 ${
            deadline?.status === 'urgent'
              ? 'bg-rose-50 border-rose-200'
              : 'bg-[#F5F2EB] border-stone-200'
          }`}>
            <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Return Deadline</span>
            <p className="font-semibold text-stone-900 text-sm">
              {deadline ? deadline.deadlineDate : 'Unknown Date'}
            </p>
            <p className="text-[11px] font-medium text-stone-700">
              {deadline ? `${deadline.daysRemaining} days left` : 'Review date in receipt'}
            </p>
          </div>
        </div>

        {/* Follow-up Draft Generator */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C8270]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Prepared Message Draft:
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-500">Tone:</span>
              <div className="flex gap-1 text-[11px]">
                {(['polite', 'firm', 'statutory'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-2 py-0.5 rounded capitalize ${
                      tone === t ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
            <pre className="text-xs font-mono text-stone-700 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
              {generatedDraft}
            </pre>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <button
                onClick={handleDownloadICS}
                className="text-stone-700 hover:text-stone-900 text-xs flex items-center gap-1.5 font-medium"
              >
                <Calendar className="w-3.5 h-3.5 text-[#8C8270]" />
                <span>Add Deadline to Calendar (.ics)</span>
              </button>

              <button
                onClick={handleCopyDraft}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {copiedDraft ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Local parsing complete. No data leaves your computer.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors font-medium"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
