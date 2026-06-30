import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import type { CustomerDocument } from "@/schemas";

import { useTranslation } from "react-i18next";

import { createStyles } from "./TierBadge.styles";

type Tier = CustomerDocument["loyalty"]["tier"];

const TIER_KEY: Record<Tier, string> = {
  member: "tierMember",
  silver: "tierSilver",
  gold: "tierGold",
  platinum: "tierPlatinum",
};

type Props = {
  tier: Tier;
};

export function TierBadge({ tier }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{t(TIER_KEY[tier])}</Text>
    </View>
  );
}
