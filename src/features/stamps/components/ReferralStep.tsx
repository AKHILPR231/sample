import { Text, View } from "react-native";

import type { ReferralStep as ReferralStepModel } from "@/features/stamps/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./ReferralStep.styles";

type Props = {
  step: ReferralStepModel;
  width: number;
};

export function ReferralStep({ step, width }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={[styles.step, { width }]}>
      <Text style={styles.number}>{step.number}</Text>
      <Text style={styles.title}>{t(step.titleKey)}</Text>
      <Text style={styles.description}>{t(step.descKey)}</Text>
    </View>
  );
}
