import type { CustomerDocument } from "@/schemas";

/** View-model for the My Account screen. */
export type AccountView = {
  displayName: string;
  initials: string;
  avatarUrl?: string;
  tier: CustomerDocument["loyalty"]["tier"];
  /** Loyalty points balance, formatted (e.g. "8,640"). */
  balanceLabel: string;
  spendToNextTierEur: number | null;
  nextTier?: string;
};
