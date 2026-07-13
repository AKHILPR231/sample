import { Text, TouchableOpacity, View } from "react-native";

import { WELCOME_CHIPS } from "@/features/ai/constants/flows";
import type { WelcomeChip } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./SuggestionChips.styles";

type Props = {
  onSelect: (chip: WelcomeChip) => void;
  /** Left-aligns the chips when shown inline in the chat. */
  compact?: boolean;
};

export function SuggestionChips({ onSelect, compact = false }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={[styles.wrap, compact ? styles.compact : styles.centered]}>
      {WELCOME_CHIPS.map((chip) => (
        <TouchableOpacity
          key={chip.id}
          style={styles.chip}
          activeOpacity={0.7}
          onPress={() => onSelect(chip)}
        >
          <Text style={styles.label}>{t(chip.labelKey)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
