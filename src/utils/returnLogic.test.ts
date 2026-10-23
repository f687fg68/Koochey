import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateReturnDeadline,
  parseReceiptText,
  draftRetailerMessage,
  categorizeRefundStatus,
} from './returnLogic.ts';

test('calculateReturnDeadline calculates remaining days accurately', () => {
  const result = calculateReturnDeadline('2026-10-01', 30, '2026-10-21');
  assert.equal(result.deadlineDate, '2026-10-31');
  assert.equal(result.daysRemaining, 10);
  assert.equal(result.isExpired, false);
  assert.equal(result.status, 'active');
});

test('calculateReturnDeadline flags urgent deadline when 5 days or fewer remain', () => {
  const result = calculateReturnDeadline('2026-10-01', 25, '2026-10-23');
  assert.equal(result.deadlineDate, '2026-10-26');
  assert.equal(result.daysRemaining, 3);
  assert.equal(result.status, 'urgent');
});

test('calculateReturnDeadline flags expired return window', () => {
  const result = calculateReturnDeadline('2026-09-01', 14, '2026-10-21');
  assert.equal(result.isExpired, true);
  assert.equal(result.status, 'expired');
});

test('parseReceiptText extracts merchant, order reference, and amount', () => {
  const rawText = `
    Zara Online Store
    Order #ZR-992144
    Date: 2026-10-15
    - Oversized Wool Coat
    - Ribbed Knit Scarf
    Total: $189.50
  `;
  const parsed = parseReceiptText(rawText);
  assert.equal(parsed.orderNumber, 'ZR-992144');
  assert.equal(parsed.amount, 189.50);
  assert.equal(parsed.currency, '$');
  assert.ok(parsed.items.length >= 2);
});

test('draftRetailerMessage produces expected polite draft with human-in-the-loop tone', () => {
  const draft = draftRetailerMessage({
    merchant: 'Zara',
    orderNumber: 'ZR-992144',
    item: 'Wool Coat',
    issue: 'the size was larger than described and fits loosely',
    tone: 'polite',
    customerName: 'Sarah Jenkins',
  });
  assert.ok(draft.includes('Zara'));
  assert.ok(draft.includes('ZR-992144'));
  assert.ok(draft.includes('Sarah Jenkins'));
  assert.ok(draft.includes('prepaid return shipping label'));
});

test('categorizeRefundStatus categorizes various merchant updates', () => {
  assert.equal(categorizeRefundStatus('Refund has been settled and credited to account'), 'received');
  assert.equal(categorizeRefundStatus('Refund of $45 issued to Visa card'), 'issued');
  assert.equal(categorizeRefundStatus('Return item received at warehouse, awaiting inspection'), 'pending');
  assert.equal(categorizeRefundStatus('Partial reimbursement of $20 approved'), 'partial');
  assert.equal(categorizeRefundStatus('Random notice with no status'), 'unclear');
});
