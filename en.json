import { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type {
  ProfileMenuItem as MenuItem,
  ProfileMenuKey,
} from "@/features/profile/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";

import { createStyles } from "./ProfileMenuItem.styles";

type Props = {
  item: MenuItem;
  onPress: (key: ProfileMenuKey) => void;
};

function ProfileMenuItemComponent({ item, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const handlePress = useCallback(
    () => onPress(item.key),
    [onPress, item.key],
  );

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={item.icon} size={rf(20)} color={theme.colors.viaNavy} />
      </View>
      <Text style={styles.label}>{t(item.labelKey)}</Text>
      <Ionicons
        name="chevron-forward"
        size={rf(18)}
        color={theme.colors.textgray}
      />
    </TouchableOpacity>
  );
}

export const ProfileMenuItem = memo(ProfileMenuItemComponent);
