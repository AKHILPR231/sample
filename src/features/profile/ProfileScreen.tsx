import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import type { ProfileMenuKey } from "@/features/profile/types";
import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileMenuItem } from "./components/ProfileMenuItem";
import { useProfileData } from "./hooks/useProfileData";
import { useProfileMenu } from "./hooks/useProfileMenu";
import { createStyles } from "./ProfileScreen.styles";

export function ProfileScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { view, loading, error } = useProfileData();
  const menu = useProfileMenu();

  const handleMenuPress = useCallback((key: ProfileMenuKey) => {
    // Navigation targets are out of scope for this screen — wire these up
    // when the corresponding routes exist.
    console.log("profile menu pressed:", key);
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleQr = useCallback(() => {
    console.log("open my qr code");
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <StatusBar style="dark" backgroundColor={theme.colors.webBg1} />
        <Text style={styles.stateText}>{t("loading")}</Text>
      </View>
    );
  }

  if (error || !view) {
    return (
      <View style={styles.centered}>
        <StatusBar style="dark" backgroundColor={theme.colors.webBg1} />
        <Text style={styles.stateText}>{t("profileError")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={theme.colors.charcoal} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader data={view} onPressBack={handleBack} onPressQr={handleQr} />

        <View style={styles.menu}>
          {menu.map((item) => (
            <ProfileMenuItem
              key={item.key}
              item={item}
              onPress={handleMenuPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
