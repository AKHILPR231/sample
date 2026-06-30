import { useMemo } from "react";

import type { ProfileMenuItem } from "@/features/profile/types";

/**
 * Static profile menu configuration.
 *
 * STATIC DATA: these rows are navigation entry points, not fields on the
 * customer schema, so they are defined here rather than read from the DB.
 * Labels resolve through i18n at render time; icons are Ionicons glyphs.
 */
export function useProfileMenu(): ProfileMenuItem[] {
  return useMemo<ProfileMenuItem[]>(
    () => [
      { key: "qrCode", labelKey: "menuMyQrCode", icon: "qr-code-outline" },
      { key: "offers", labelKey: "menuOffers", icon: "pricetags-outline" },
      {
        key: "transactions",
        labelKey: "menuTransactions",
        icon: "time-outline",
      },
      { key: "tier", labelKey: "menuMyTier", icon: "ribbon-outline" },
      { key: "redeem", labelKey: "menuRedeemPoints", icon: "star-outline" },
      { key: "wallet", labelKey: "menuDigitalWallet", icon: "wallet-outline" },
    ],
    [],
  );
}
