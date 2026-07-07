import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./TierBar.styles";

const TIER_KEY: Record<string, string> = {
  member: "tierMember",
  silver: "tierSilver",
  gold: "tierGold",
  platinum: "tierPlatinum",
};

type Props = {
  tier: string;
};

export function TierBar({ tier }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.bar}>
      <Text style={styles.club}>{t("loyaltyClub")}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{t(TIER_KEY[tier] ?? "tierMember")}</Text>
      </View>
    </View>
  );
}
