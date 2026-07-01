import { Text, TouchableOpacity, View } from "react-native";

import type { SearchResultType } from "@/features/search/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./FilterChips.styles";

type Chip = {
  type: SearchResultType;
  labelKey: string;
};

const CHIPS: Chip[] = [
  { type: "store", labelKey: "chipStore" },
  { type: "movie", labelKey: "chipMovie" },
  { type: "event", labelKey: "chipEvent" },
  { type: "dining", labelKey: "chipDining" },
];

type Props = {
  activeType: SearchResultType | null;
  onSelect: (type: SearchResultType) => void;
};

export function FilterChips({ activeType, onSelect }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      {CHIPS.map((chip) => {
        const active = activeType === chip.type;
        return (
          <TouchableOpacity
            key={chip.type}
            style={[
              styles.chip,
              active ? styles.chipActive : styles.chipInactive,
            ]}
            activeOpacity={0.8}
            onPress={() => onSelect(chip.type)}
          >
            <Text
              style={[
                styles.label,
                active ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {t(chip.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
