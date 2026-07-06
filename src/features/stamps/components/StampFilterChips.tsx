import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { StampFilter, StampFilterId } from "@/features/stamps/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./StampFilterChips.styles";

type Props = {
  filters: StampFilter[];
  activeFilter: StampFilterId | null;
  onSelect: (id: StampFilterId) => void;
  onClear: () => void;
};

export function StampFilterChips({
  filters,
  activeFilter,
  onSelect,
  onClear,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.filterButton}
        activeOpacity={0.8}
        onPress={onClear}
      >
        <Ionicons
          name="options-outline"
          size={rf(18)}
          color={theme.colors.onSurface}
        />
      </TouchableOpacity>

      {filters.map((filter) => {
        const active = activeFilter === filter.id;
        return (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.chip,
              active ? styles.chipActive : styles.chipInactive,
            ]}
            activeOpacity={0.8}
            onPress={() => onSelect(filter.id)}
          >
            <Text
              style={[
                styles.label,
                active ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {t(filter.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.end} />
    </ScrollView>
  );
}
