import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./ReferralHero.styles";

export function ReferralHero() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.hero}>
      <Text style={styles.title}>{t("referralHeroTitle")}</Text>
      <Ionicons name="gift" size={rf(56)} color={theme.colors.viaWhite} />
    </View>
  );
}
