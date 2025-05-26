export type BillingCycle = 'month' | 'year';

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  billingCycle: BillingCycle;
  description: string;
  isPopular?: boolean;
  features: string[];
  discount: number;
  bottleCredits: number;
  freeShipping: boolean;
  exclusiveAccess: boolean;
}
