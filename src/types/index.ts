export interface ReturnCase {
  id: string;
  merchant: string;
  item: string;
  price: string;
  orderNumber: string;
  orderDate: string;
  deadlineDate: string;
  daysRemaining: number;
  status: 'active' | 'urgent' | 'shipped' | 'refunded' | 'expired';
  refundState: 'pending' | 'issued' | 'received' | 'partial' | 'unclear';
  returnReason: string;
  trackingNumber?: string;
  carrier?: string;
  receiptExcerpt: string;
  suggestedAction: string;
  evidenceFilesCount: number;
}

export interface FocusedHelper {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  sampleInput: string;
  sampleOutput: string;
}

export interface FeatureItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ReleaseArtifact {
  filename: string;
  size: string;
  checksum: string;
  format: string;
  downloadUrl: string;
  label?: string;
}

export interface PlatformRelease {
  platform: 'macOS' | 'Windows' | 'Linux';
  arch: string;
  version: string;
  badge: string;
  description: string;
  artifacts: ReleaseArtifact[];
}
