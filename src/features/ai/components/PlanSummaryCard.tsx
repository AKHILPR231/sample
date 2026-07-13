import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./PlanSummaryCard.styles";

type Props = {
  chips: string[];
  onShare?: () => void;
};

export function PlanSummaryCard({ chips, onShare }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.icon}>
          <Ionicons name="people" size={rf(20)} color={theme.colors.viaWhite} />
        </View>
        <Text style={styles.title}>{t("aiPlanTitle")}</Text>
        {onShare ? (
          <TouchableOpacity
            style={styles.share}
            activeOpacity={0.8}
            onPress={onShare}
          >
            <Ionicons
              name="share-outline"
              size={rf(18)}
              color={theme.colors.viaNavy}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.chips}>
        {chips.map((chip) => (
          <View key={chip} style={styles.chip}>
            <Text style={styles.chipLabel}>{chip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
