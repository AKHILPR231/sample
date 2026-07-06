import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { AccountView } from "@/features/account/types";
import { ProfileAvatar } from "@/features/profile/components/ProfileAvatar";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "./AccountHeader.styles";

type Props = {
  account: AccountView;
  onBack: () => void;
  onEditProfile: () => void;
};

export function AccountHeader({ account, onBack, onEditProfile }: Props) {
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
          onPress={onBack}
        >
          <Ionicons
            name="chevron-back"
            size={rf(20)}
            color={theme.colors.viaNavy}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t("myAccount")}</Text>
      </View>

      <View style={styles.identity}>
        <ProfileAvatar uri={account.avatarUrl} initials={account.initials} />
        <Text style={styles.name}>{account.displayName.toUpperCase()}</Text>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.85}
          onPress={onEditProfile}
        >
          <Text style={styles.editLabel}>{t("editProfile")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
