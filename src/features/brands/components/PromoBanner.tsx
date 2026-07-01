import { Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";

import { createStyles } from "./PromoBanner.styles";

type Props = {
  onPressJoin: () => void;
};

export function PromoBanner({ onPressJoin }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.banner}>
      <Text style={styles.title}>{t("promoTitle")}</Text>
      <Text style={styles.subtitle}>{t("promoSubtitle")}</Text>

      <View style={styles.row}>
        <Text style={styles.club}>{t("loyaltyClub")}</Text>
        <TouchableOpacity
          style={styles.joinButton}
          activeOpacity={0.85}
          onPress={onPressJoin}
        >
          <Text style={styles.joinLabel}>{t("promoJoin")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
