import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useProfileData } from "@/features/profile/hooks/useProfileData";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "./HistoryHeader.styles";

const TIER_KEY: Record<"member" | "silver" | "gold" | "platinum", string> = {
  member: "tierMember",
  silver: "tierSilver",
  gold: "tierGold",
  platinum: "tierPlatinum",
};

type Props = {
  onBack: () => void;
};

export function HistoryHeader({ onBack }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { view } = useProfileData();
  const tier = view?.tier ?? "silver";
  const balance = view?.pointsBalanceLabel ?? "4,250";

  return (
    <View style={[styles.header, { paddingTop: insets.top + theme.spacing.sm }]}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.back} activeOpacity={0.8} onPress={onBack}>
          <Ionicons
            name="chevron-back"
            size={rf(20)}
            color={theme.colors.viaNavy}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t("history")}</Text>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.clubRow}>
          <Text style={styles.club}>{t("loyaltyClub")}</Text>
          <View style={styles.tierBadge}>
            <Text style={styles.tierText}>{t(TIER_KEY[tier])}</Text>
          </View>
        </View>

        <View style={styles.balanceBox}>
          <View style={styles.balanceRow}>
            <Text style={styles.balance}>{balance}</Text>
            <Text style={styles.balanceSuffix}>{t("pointsSuffix")}</Text>
          </View>
          <Text style={styles.balanceLabel}>{t("currentBalance")}</Text>
        </View>
      </View>
    </View>
  );
}
