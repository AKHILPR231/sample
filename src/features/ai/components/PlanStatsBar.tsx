import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { PlanStats } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./PlanStatsBar.styles";

type Props = {
  stats: PlanStats;
};

export function PlanStatsBar({ stats }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const items = [
    { key: "time", icon: "time-outline", label: t("aiStatTime"), value: stats.time },
    { key: "stops", icon: "location-outline", label: t("aiStatStops"), value: stats.stops },
    {
      key: "savings",
      icon: "pricetag-outline",
      label: t("aiStatSavings"),
      value: stats.savings,
    },
  ] as const;

  return (
    <View style={styles.bar}>
      {items.map((item) => (
        <View key={item.key} style={styles.item}>
          <View style={styles.iconWrap}>
            <Ionicons
              name={item.icon}
              size={rf(16)}
              color={theme.colors.viaWhite}
            />
          </View>
          <View>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
