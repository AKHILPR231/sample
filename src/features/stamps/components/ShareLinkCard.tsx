import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { ShareOption } from "@/features/stamps/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./ShareLinkCard.styles";

type Props = {
  options: ShareOption[];
  onShare: (id: string) => void;
};

export function ShareLinkCard({ options, onShare }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <Text style={styles.header}>{t("shareReferralLink")}</Text>
      <View style={styles.row}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            activeOpacity={0.8}
            onPress={() => onShare(option.id)}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={option.icon}
                size={rf(20)}
                color={theme.colors.viaNavy}
              />
            </View>
            <Text style={styles.label}>{t(option.labelKey)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
