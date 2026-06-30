import { useEffect } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import type { CustomerDocument } from "@/schemas";

import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { createStyles } from "./TierProgress.styles";

type Tier = CustomerDocument["loyalty"]["tier"];

const TIER_KEY: Record<Tier, string> = {
  member: "tierMember",
  silver: "tierSilver",
  gold: "tierGold",
  platinum: "tierPlatinum",
};

/** Formats an integer EUR amount, e.g. 1850 -> "€1,850". */
const formatEur = (value: number): string =>
  `€${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

type Props = {
  pointsLabel: string;
  progressPct: number;
  nextTier?: string;
  spendToNextTierEur: number | null;
};

export function TierProgress({
  pointsLabel,
  progressPct,
  nextTier,
  spendToNextTierEur,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(progressPct, { duration: 700 });
  }, [progressPct, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const hasNext = !!nextTier && spendToNextTierEur != null;
  const nextTierLabel = nextTier ? t(TIER_KEY[nextTier as Tier]) : "";

  return (
    <View style={styles.container}>
      <View style={styles.pointsRow}>
        <Text style={styles.points}>{pointsLabel}</Text>
        <Text style={styles.pointsSuffix}>{t("pointsSuffix")}</Text>
      </View>

      <Text style={styles.balanceLabel}>{t("currentBalance")}</Text>

      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillStyle]} />
      </View>

      {hasNext ? (
        <Text style={styles.caption}>
          {t("tierProgressSpend", {
            amount: formatEur(spendToNextTierEur as number),
            tier: nextTierLabel,
          })}
        </Text>
      ) : (
        <Text style={styles.caption}>{t("tierTopLevel")}</Text>
      )}
    </View>
  );
}
