import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./AvailableTimeBar.styles";

type Props = {
  available: string;
  total: string;
};

export function AvailableTimeBar({ available, total }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.bar}>
      <Text style={styles.available}>
        {t("aiAvailableTime", { time: available })}
      </Text>

      <View style={styles.totalWrap}>
        <View style={styles.iconWrap}>
          <Ionicons
            name="time-outline"
            size={rf(16)}
            color={theme.colors.viaNavy}
          />
        </View>
        <View>
          <Text style={styles.totalLabel}>{t("aiTotalTime")}</Text>
          <Text style={styles.totalValue}>{total}</Text>
        </View>
      </View>
    </View>
  );
}
