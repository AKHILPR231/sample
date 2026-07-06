import type { AccountView } from "@/features/account/types";
import { useProfileData } from "@/features/profile/hooks/useProfileData";

/**
 * STATIC FALLBACK — shown when no customer is available from the DB (e.g. before
 * seeding completes or if the customer record can't be read).
 */
const STATIC_ACCOUNT: AccountView = {
  displayName: "Sophie",
  initials: "S",
  tier: "silver",
  balanceLabel: "4,250",
  spendToNextTierEur: 124,
  nextTier: "gold",
};

type UseAccountResult = {
  account: AccountView;
  loading: boolean;
};

/** Current customer's account/loyalty summary, with static fallback. */
export function useAccount(): UseAccountResult {
  const { view, loading } = useProfileData();

  if (!view) {
    return { account: STATIC_ACCOUNT, loading };
  }

  return {
    account: {
      displayName: view.displayName,
      initials: view.initials,
      avatarUrl: view.avatarUrl,
      tier: view.tier,
      balanceLabel: view.pointsBalanceLabel,
      spendToNextTierEur: view.spendToNextTierEur,
      nextTier: view.nextTier,
    },
    loading,
  };
}
