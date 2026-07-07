import { Text, TouchableOpacity, View } from "react-native";

import type { TransactionFilter } from "@/features/history/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./HistoryFilterChips.styles";

const FILTERS: { id: TransactionFilter; labelKey: string }[] = [
  { id: "all", labelKey: "historyFilterAll" },
  { id: "earned", labelKey: "historyFilterEarned" },
  { id: "redeemed", labelKey: "historyFilterRedeemed" },
];

type Props = {
  filter: TransactionFilter;
  onChange: (filter: TransactionFilter) => void;
};

export function HistoryFilterChips({ filter, onChange }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      {FILTERS.map((option) => {
        const active = filter === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.chip,
              active ? styles.chipActive : styles.chipInactive,
            ]}
            activeOpacity={0.8}
            onPress={() => onChange(option.id)}
          >
            <Text
              style={[
                styles.label,
                active ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {t(option.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
