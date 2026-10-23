/**
 * Core business and calculation logic for Koochey
 * Pure deterministic functions decoupled from UI for testability.
 */

export interface DeadlineResult {
  deadlineDate: string;
  daysRemaining: number;
  isExpired: boolean;
  status: 'urgent' | 'active' | 'expired';
}

export function calculateReturnDeadline(
  purchaseDateStr: string,
  returnWindowDays: number,
  referenceDateStr?: string
): DeadlineResult {
  const purchase = new Date(purchaseDateStr);
  if (isNaN(purchase.getTime())) {
    throw new Error('Invalid purchase date');
  }

  const deadline = new Date(purchase);
  deadline.setDate(deadline.getDate() + returnWindowDays);

  const refDate = referenceDateStr ? new Date(referenceDateStr) : new Date();
  // Normalize to start of day for integer day calculations
  const refStart = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()).getTime();
  const deadlineStart = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate()).getTime();

  const diffMs = deadlineStart - refStart;
  const daysRemaining = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const isExpired = daysRemaining < 0;

  let status: 'urgent' | 'active' | 'expired';
  if (isExpired) {
    status = 'expired';
  } else if (daysRemaining <= 5) {
    status = 'urgent';
  } else {
    status = 'active';
  }

  const formattedDeadline = deadline.toISOString().split('T')[0];

  return {
    deadlineDate: formattedDeadline,
    daysRemaining,
    isExpired,
    status,
  };
}

export interface ParsedReceipt {
  merchant: string;
  orderNumber: string;
  amount: number | null;
  currency: string;
  date: string | null;
  items: string[];
}

export function parseReceiptText(text: string): ParsedReceipt {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  let merchant = 'Unknown Merchant';
  let orderNumber = 'N/A';
  let amount: number | null = null;
  let currency = '$';
  let date: string | null = null;
  const items: string[] = [];

  for (const line of lines) {
    // Check order number / reference
    const orderMatch = line.match(/(?:order|ref|receipt|invoice)\s*(?:#|no\.?|id)?\s*:?\s*([A-Z0-9_-]{5,20})/i);
    if (orderMatch && orderNumber === 'N/A') {
      orderNumber = orderMatch[1].trim();
    }

    // Check merchant name if first few lines
    if (merchant === 'Unknown Merchant') {
      const merchantMatch = line.match(/(?:from|store|merchant|retailer)?\s*([A-Za-z0-9&'.\s]{3,30})\s*(?:store|online|order|receipt)?/i);
      if (merchantMatch && !line.toLowerCase().includes('total') && !line.toLowerCase().includes('date')) {
        merchant = line.replace(/^(store|merchant|retailer|from):\s*/i, '').trim();
      }
    }

    // Check price / total
    const priceMatch = line.match(/(?:total|amount due|grand total|subtotal)?\s*([$€£])\s*([0-9]+(?:\.[0-9]{2})?)/i);
    if (priceMatch) {
      currency = priceMatch[1];
      const parsedNum = parseFloat(priceMatch[2]);
      if (!isNaN(parsedNum) && (amount === null || parsedNum > amount)) {
        amount = parsedNum;
      }
    }

    // Check date pattern
    const dateMatch = line.match(/(\d{4}[-/.]\d{1,2}[-/.]\d{1,2}|\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})/);
    if (dateMatch && !date) {
      date = dateMatch[1];
    }

    // Check item indicators
    if (line.match(/^[-*•]\s*(.+)/)) {
      items.push(line.replace(/^[-*•]\s*/, ''));
    }
  }

  return {
    merchant,
    orderNumber,
    amount,
    currency,
    date,
    items,
  };
}

export function draftRetailerMessage(params: {
  merchant: string;
  orderNumber: string;
  item: string;
  issue: string;
  tone: 'polite' | 'firm' | 'statutory';
  customerName?: string;
}): string {
  const name = params.customerName || '[Your Name]';
  const merchant = params.merchant;
  const orderRef = params.orderNumber;
  const item = params.item;
  const issue = params.issue;

  if (params.tone === 'polite') {
    return `Subject: Return & Refund Request - Order #${orderRef} - ${item}

Hello ${merchant} Customer Support Team,

I recently purchased ${item} under order number #${orderRef}. 

I am contacting you to request a return and refund because ${issue}. 

The item is packaged securely with all original tags and accessories. Could you please confirm the return address and provide a prepaid return shipping label?

Thank you very much for your help and time.

Kind regards,
${name}`;
  }

  if (params.tone === 'firm') {
    return `Subject: Escalation: Refund Request for Defective/Incorrect Order #${orderRef}

Dear ${merchant} Support Management,

I am writing regarding Order #${orderRef} placed with ${merchant} for ${item}.

As documented in my saved purchase evidence, ${issue}. Despite previous attempts to resolve this, the matter remains unresolved.

Please issue a return authorization and provide return instructions with a full refund to my original payment method within 3 business days. 

I look forward to your prompt response.

Sincerely,
${name}`;
  }

  // statutory / formal legal consumer rights tone
  return `Subject: Formal Notice of Return / Consumer Rights Request - Order #${orderRef}

To the Attention of ${merchant} Customer Care & Dispute Resolution,

RE: Notice of Cancellation / Return pursuant to Consumer Rights & Published Merchant Policy
Order Reference: #${orderRef}
Purchased Product: ${item}

Please accept this written notice that I am returning the aforementioned goods due to:
${issue}.

Under applicable consumer protection regulations and your stated return window, I am entitled to a full reimbursement without undue delay. 

Please furnish return dispatch documentation immediately upon receipt of this letter.

Yours faithfully,
${name}`;
}

export function categorizeRefundStatus(
  statusText: string
): 'pending' | 'issued' | 'received' | 'partial' | 'unclear' {
  const lower = statusText.toLowerCase();
  if (lower.includes('pending') || lower.includes('in progress') || lower.includes('awaiting') || lower.includes('under review')) {
    return 'pending';
  }
  if (lower.includes('partial') || lower.includes('portion')) {
    return 'partial';
  }
  if (lower.includes('refund received') || lower.includes('settled') || lower.includes('credited to account') || lower.includes('refund credited')) {
    return 'received';
  }
  if (lower.includes('issued') || lower.includes('processed') || lower.includes('sent to bank') || lower.includes('refund sent')) {
    return 'issued';
  }
  if (lower.includes('received')) {
    return 'received';
  }
  return 'unclear';
}
