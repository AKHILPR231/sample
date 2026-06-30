import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { ProfileLoyaltyView } from "@/features/profile/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProfileAvatar } from "./ProfileAvatar";
import { createStyles } from "./ProfileHeader.styles";
import { QrButton } from "./QrButton";
import { TierBadge } from "./TierBadge";
import { TierProgress } from "./TierProgress";

type Props = {
  data: ProfileLoyaltyView;
  onPressBack: () => void;
  onPressQr: () => void;
};

export function ProfileHeader({ data, onPressBack, onPressQr }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.sm }]}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={onPressBack}
        >
          <Ionicons
            name="chevron-back"
            size={rf(20)}
            color={theme.colors.viaNavy}
          />
        </TouchableOpacity>
        <QrButton label={t("profileMyQr")} onPress={onPressQr} />
      </View>

      <View style={styles.identity}>
        <ProfileAvatar uri={data.avatarUrl} initials={data.initials} />
        <Text style={styles.name}>{data.displayName.toUpperCase()}</Text>
        <View style={styles.clubRow}>
          <Text style={styles.club}>{t("loyaltyClub")}</Text>
          <TierBadge tier={data.tier} />
        </View>
      </View>

      <TierProgress
        pointsLabel={data.pointsBalanceLabel}
        progressPct={data.progressPct}
        nextTier={data.nextTier}
        spendToNextTierEur={data.spendToNextTierEur}
      />
    </View>
  );
}
