import type { Ionicons } from "@expo/vector-icons";

import type { CustomerDocument } from "@/schemas";

/** Stable identifiers for each profile menu action. */
export type ProfileMenuKey =
  | "qrCode"
  | "offers"
  | "transactions"
  | "tier"
  | "redeem"
  | "wallet";

/** A single row in the profile menu list. */
export type ProfileMenuItem = {
  key: ProfileMenuKey;
  /** i18n key resolved at render time. */
  labelKey: string;
  /** Ionicons glyph name (typed against the icon set). */
  icon: keyof typeof Ionicons.glyphMap;
};

/**
 * View-model the header consumes. Derived from the customer document so the
 * UI never reaches into the raw schema directly.
 */
export type ProfileLoyaltyView = {
  displayName: string;
  initials: string;
  avatarUrl?: string;
  tier: CustomerDocument["loyalty"]["tier"];
  pointsBalanceLabel: string;
  progressPct: number;
  nextTier?: string;
  spendToNextTierEur: number | null;
};
