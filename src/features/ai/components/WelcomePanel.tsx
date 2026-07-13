import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { WelcomeChip } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { SuggestionChips } from "./SuggestionChips";
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

      <SuggestionChips onSelect={onSelect} />
    </View>
  );
}
