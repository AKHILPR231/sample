import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { AccountView } from "@/features/account/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./LoyaltyCard.styles";

const TIER_KEY: Record<AccountView["tier"], string> = {
  member: "tierMember",
  silver: "tierSilver",
  gold: "tierGold",
  platinum: "tierPlatinum",
};

const formatEur = (value: number): string =>
  `€${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

type Props = {
  account: AccountView;
  onRedeem: () => void;
  onViewHistory: () => void;
  onTierPress: () => void;
  onQr: () => void;
};

export function LoyaltyCard({
  account,
  onRedeem,
  onViewHistory,
  onTierPress,
  onQr,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const nextTierLabel = account.nextTier
    ? t(TIER_KEY[account.nextTier as AccountView["tier"]])
    : "";

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.clubRow}
        activeOpacity={0.8}
        onPress={onTierPress}
      >
        <Text style={styles.club}>{t("loyaltyClub")}</Text>
        <Text style={styles.tier}>{t(TIER_KEY[account.tier])}</Text>
        <View style={styles.clubSpacer} />
        <Ionicons
          name="chevron-forward"
          size={rf(18)}
          color={theme.colors.textgray}
        />
      </TouchableOpacity>

      <View style={styles.balanceRow}>
        <View style={styles.balanceText}>
          <Text style={styles.balanceLabel}>{t("currentBalance")}</Text>
          <View style={styles.balanceValueRow}>
            <Text style={styles.balance}>{account.balanceLabel}</Text>
            <Text style={styles.balanceSuffix}>{t("pointsSuffix")}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.qr} activeOpacity={0.8} onPress={onQr}>
          <Ionicons
            name="qr-code-outline"
            size={rf(18)}
            color={theme.colors.onSurface}
          />
          <Text style={styles.qrLabel}>{t("profileMyQr")}</Text>
        </TouchableOpacity>
      </View>

      {account.spendToNextTierEur != null && account.nextTier ? (
        <Text style={styles.spend}>
          {t("accountSpendToTier", {
            amount: formatEur(account.spendToNextTierEur),
            tier: nextTierLabel,
          })}
        </Text>
      ) : null}

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          activeOpacity={0.85}
          onPress={onRedeem}
        >
          <Text style={styles.buttonPrimaryLabel}>{t("menuRedeemPoints")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          activeOpacity={0.85}
          onPress={onViewHistory}
        >
          <Text style={styles.buttonSecondaryLabel}>{t("viewHistory")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
