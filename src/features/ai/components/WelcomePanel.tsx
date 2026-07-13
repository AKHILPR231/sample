import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { WELCOME_CHIPS } from "@/features/ai/constants/flows";
import type { WelcomeChip } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./WelcomePanel.styles";

type Props = {
  onSelect: (chip: WelcomeChip) => void;
};

export function WelcomePanel({ onSelect }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Ionicons name="sparkles" size={rf(44)} color={theme.colors.viaNavy} />
      </View>

      <Text style={styles.subtitle}>{t("aiWelcomeSubtitle")}</Text>
      <Text style={styles.title}>{t("aiWelcomeTitle")}</Text>

      <View style={styles.chips}>
        {WELCOME_CHIPS.map((chip) => (
          <TouchableOpacity
            key={chip.id}
            style={styles.chip}
            activeOpacity={0.7}
            onPress={() => onSelect(chip)}
          >
            <Text style={styles.chipLabel}>{t(chip.labelKey)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
