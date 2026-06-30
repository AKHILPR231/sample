import { useMemo } from "react";

import type { ProfileLoyaltyView } from "@/features/profile/types";
import { useCurrentCustomer } from "@/hooks";

/**
 * Current authenticated customer id.
 *
 * In production this is resolved from the auth session / store. The seed data
 * ships an active session for `cust_sophie_001`, so we use it here.
 */
export const CURRENT_CUSTOMER_ID = "cust_sophie_001";

/** Groups an integer with thousands separators (Hermes-safe, no Intl needed). */
const groupThousands = (value: number): string =>
  Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

type ProfileDataResult = {
  view: ProfileLoyaltyView | null;
  loading: boolean;
  error: Error | null;
};

/**
 * Subscribes to the current customer and maps the loyalty data into a stable,
 * memoized view-model. The component re-renders only when the derived view
 * actually changes.
 */
export function useProfileData(): ProfileDataResult {
  const {
    data: customer,
    loading,
    error,
  } = useCurrentCustomer(CURRENT_CUSTOMER_ID);

  const view = useMemo<ProfileLoyaltyView | null>(() => {
    if (!customer) return null;

    const { profile, loyalty } = customer;
    const first = profile.first_name?.trim() ?? "";
    const last = profile.last_name?.trim() ?? "";
    const initials = `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    const progressPct = Math.max(0, Math.min(100, loyalty.tier_progress_pct ?? 0));

    return {
      displayName: first || last || "Member",
      initials: initials || "M",
      avatarUrl: profile.avatar_url,
      tier: loyalty.tier,
      pointsBalanceLabel: groupThousands(loyalty.points_balance),
      progressPct,
      nextTier: loyalty.next_tier,
      spendToNextTierEur: loyalty.spend_to_next_tier_eur ?? null,
    };
  }, [customer]);

  return { view, loading, error };
}
