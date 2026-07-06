import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { OfferCategory, OfferCategoryId } from "@/features/offers/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./OfferFilterChips.styles";

type Props = {
  categories: OfferCategory[];
  activeCategory: OfferCategoryId | null;
  onSelect: (id: OfferCategoryId) => void;
  onClear: () => void;
};

export function OfferFilterChips({
  categories,
  activeCategory,
  onSelect,
  onClear,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
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

      {categories.map((category) => {
        const active = activeCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.chip,
              active ? styles.chipActive : styles.chipInactive,
            ]}
            activeOpacity={0.8}
            onPress={() => onSelect(category.id)}
          >
            <Text
              style={[
                styles.label,
                active ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {t(category.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
