import { Text, View } from "react-native";

import type { HelpStep } from "@/features/help/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./HelpStepCard.styles";

type Props = {
  step: HelpStep;
};

export function HelpStepCard({ step }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{step.number}</Text>
      </View>
      <Text style={styles.text}>{t(step.textKey)}</Text>
    </View>
  );
}
